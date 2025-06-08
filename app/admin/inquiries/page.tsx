"use client"

import { useEffect, useState } from "react"
import { getAllInquiries, updateInquiryStatus, type Inquiry } from "@/lib/inquiries"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Mail, Phone, Calendar, User, Filter, RefreshCw, BookOpen } from "lucide-react"

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  const fetchInquiries = async () => {
    try {
      const data = await getAllInquiries()
      setInquiries(data)
      setFilteredInquiries(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch inquiries.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredInquiries(inquiries)
    } else {
      setFilteredInquiries(inquiries.filter((i) => i.status === statusFilter))
    }
  }, [statusFilter, inquiries])

  const handleStatusUpdate = async (inquiryId: string, newStatus: string) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus as any)
      await fetchInquiries() // Refresh data
      toast({
        title: "Status Updated",
        description: "Inquiry status has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update inquiry status.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "converted":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-slate-400">Loading inquiries...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">Inquiry Management</h1>
        <Button onClick={fetchInquiries} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Inquiries</p>
                <p className="text-2xl font-bold text-cyan-400">{inquiries.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">New</p>
                <p className="text-2xl font-bold text-blue-400">{inquiries.filter((i) => i.status === "new").length}</p>
              </div>
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Contacted</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {inquiries.filter((i) => i.status === "contacted").length}
                </p>
              </div>
              <Phone className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Converted</p>
                <p className="text-2xl font-bold text-green-400">
                  {inquiries.filter((i) => i.status === "converted").length}
                </p>
              </div>
              <User className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-900 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-400">Status:</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-slate-400">
              Showing {filteredInquiries.length} of {inquiries.length} inquiries
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">All Inquiries</CardTitle>
          <CardDescription className="text-slate-400">Manage customer inquiries and follow-ups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="bg-slate-800 border-slate-600">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-cyan-400 text-lg">{inquiry.name}</h3>
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400 mb-4">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          <a href={`mailto:${inquiry.email}`} className="hover:text-cyan-400 transition-colors">
                            {inquiry.email}
                          </a>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            <a href={`tel:${inquiry.phone}`} className="hover:text-cyan-400 transition-colors">
                              {inquiry.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </div>
                        {inquiry.course_interest && (
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {inquiry.course_interest}
                          </div>
                        )}
                      </div>

                      {inquiry.message && (
                        <div className="bg-slate-700/50 p-3 rounded-lg">
                          <p className="text-slate-300 text-sm">{inquiry.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Select value={inquiry.status} onValueChange={(value) => handleStatusUpdate(inquiry.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
