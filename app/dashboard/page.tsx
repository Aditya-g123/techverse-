"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getUserEnrollments, updatePaymentStatus, type Enrollment } from "@/lib/enrollments"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, ExternalLink, User, IndianRupee, Calendar, CreditCard, RefreshCw, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  const fetchData = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      setUser(user)
      try {
        const userEnrollments = await getUserEnrollments()
        setEnrollments(userEnrollments)
      } catch (error) {
        console.error("Error fetching enrollments:", error)
        toast({
          title: "Error",
          description: "Failed to fetch your enrollments. Please try again.",
          variant: "destructive",
        })
      }
    }
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchData()
  }

  const handleMarkCompleted = async (enrollmentId: string, courseName: string) => {
    try {
      await updatePaymentStatus(enrollmentId, "completed")
      await fetchData() // Refresh the data
      toast({
        title: "Payment Updated! 🎉",
        description: `Payment for ${courseName} marked as completed.`,
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update payment status.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-slate-400">Loading your dashboard...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">Please Sign In</h1>
        <p className="text-slate-400 mb-6">You need to be signed in to view your dashboard.</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    )
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

  const totalSpent = enrollments
    .filter((e) => e.payment_status === "completed")
    .reduce((sum, e) => sum + (e.course_price - e.discount_amount), 0)

  const totalSavings = enrollments.reduce((sum, e) => sum + e.discount_amount, 0)

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-cyan-400">My Dashboard</h1>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <p className="text-slate-300">
          Welcome back,{" "}
          <span className="font-semibold text-cyan-500">{user.user_metadata?.full_name || user.email}</span>!
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Enrollments</p>
                <p className="text-2xl font-bold text-cyan-400">{enrollments.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-green-400">₹{totalSpent.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Savings</p>
                <p className="text-2xl font-bold text-yellow-400">₹{totalSavings.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollments */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <BookOpen className="w-6 h-6 mr-2" />
            My Course Enrollments
          </CardTitle>
          <CardDescription className="text-slate-400">Track your enrolled courses and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No course enrollments yet.</p>
              <Button asChild>
                <Link href="/#courses">Browse Courses</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="bg-slate-800 border-slate-600">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-cyan-400 mb-2 text-lg">{enrollment.course_name}</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 mr-1" />₹{enrollment.course_price.toLocaleString()}
                          </div>
                          {enrollment.discount_applied && (
                            <div className="flex items-center text-yellow-400">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              Saved ₹{enrollment.discount_amount}
                            </div>
                          )}
                          <div>
                            <Badge className={getStatusColor(enrollment.payment_status)}>
                              {enrollment.payment_status.charAt(0).toUpperCase() + enrollment.payment_status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        {enrollment.discount_code && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                              Code: {enrollment.discount_code}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {enrollment.payment_status === "pending" && (
                          <>
                            <Button size="sm" asChild>
                              <Link href={enrollment.payment_link} target="_blank" rel="noopener noreferrer">
                                Complete Payment <ExternalLink className="ml-1 w-3 h-3" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkCompleted(enrollment.id, enrollment.course_name)}
                            >
                              Mark Completed
                            </Button>
                          </>
                        )}
                        {enrollment.payment_status === "completed" && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                            ✅ Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
