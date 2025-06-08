"use client"

import { useEffect, useState } from "react"
import { getAllEnrollments, getEnrollmentStats, updatePaymentStatus, type Enrollment } from "@/lib/enrollments"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  IndianRupee,
  RefreshCw,
  Filter,
  Search,
  Download,
} from "lucide-react"

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchData = async () => {
    try {
      const [enrollmentsData, statsData] = await Promise.all([getAllEnrollments(), getEnrollmentStats()])
      setEnrollments(enrollmentsData)
      setFilteredEnrollments(enrollmentsData)
      setStats(statsData)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch enrollment data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = enrollments

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((e) => e.payment_status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.course_id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredEnrollments(filtered)
  }, [statusFilter, searchTerm, enrollments])

  const handleStatusUpdate = async (enrollmentId: string, newStatus: string) => {
    try {
      await updatePaymentStatus(enrollmentId, newStatus as any)
      await fetchData() // Refresh data
      toast({
        title: "Status Updated",
        description: "Payment status has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update payment status.",
        variant: "destructive",
      })
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Course Name", "User ID", "Price", "Status", "Enrolled Date", "Discount", "Payment Link"].join(","),
      ...filteredEnrollments.map((e) =>
        [
          e.course_name,
          e.user_id,
          e.course_price,
          e.payment_status,
          new Date(e.enrolled_at).toLocaleDateString(),
          e.discount_amount,
          e.payment_link,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `enrollments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-slate-400">Loading enrollment data...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">Enrollment Management</h1>
        <div className="flex space-x-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Enrollments</p>
                  <p className="text-2xl font-bold text-cyan-400">{stats.total}</p>
                </div>
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
                </div>
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.thisMonth}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="bg-slate-900 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <Filter className="w-5 h-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-400">Status:</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <Search className="w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by course name, user ID, or course ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-slate-600"
              />
            </div>
            <div className="text-sm text-slate-400 flex items-center">
              Showing {filteredEnrollments.length} of {enrollments.length} enrollments
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments List */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">All Enrollments</CardTitle>
          <CardDescription className="text-slate-400">Manage student course enrollments and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEnrollments.map((enrollment) => (
              <Card key={enrollment.id} className="bg-slate-800 border-slate-600">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <h3 className="font-semibold text-cyan-400 mb-2 text-lg">{enrollment.course_name}</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-400 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />₹{enrollment.course_price.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {enrollment.user_id.slice(0, 8)}...
                        </div>
                        <div>
                          <Badge className={getStatusColor(enrollment.payment_status)}>
                            {enrollment.payment_status.charAt(0).toUpperCase() + enrollment.payment_status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      {enrollment.discount_applied && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                            Discount: ₹{enrollment.discount_amount}
                          </Badge>
                          {enrollment.discount_code && (
                            <Badge variant="outline" className="text-green-400 border-green-400/30">
                              Code: {enrollment.discount_code}
                            </Badge>
                          )}
                        </div>
                      )}
                      {enrollment.notes && (
                        <div className="bg-slate-700/50 p-2 rounded text-xs text-slate-300">
                          Notes: {enrollment.notes}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={enrollment.payment_status}
                        onValueChange={(value) => handleStatusUpdate(enrollment.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
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
