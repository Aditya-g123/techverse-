"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { getUserEnrollments, type Enrollment } from "@/lib/enrollments"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  BookOpen,
  ExternalLink,
  User,
  IndianRupee,
  Calendar,
  CreditCard,
  GraduationCap,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function EnrollmentSection() {
  const [user, setUser] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
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
    }

    fetchData()
  }, [toast])

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
      <section className="py-16 sm:py-20 bg-slate-900 text-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading your enrollments...</p>
        </div>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="py-16 sm:py-20 bg-slate-900 text-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">Your Learning Journey</h2>
          <p className="text-lg text-slate-400 mb-6">Sign in to track your course enrollments and progress</p>
          <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
            <Link href="/auth/google">Sign In to View Enrollments</Link>
          </Button>
        </div>
      </section>
    )
  }

  const totalSpent = enrollments
    .filter((e) => e.payment_status === "completed")
    .reduce((sum, e) => sum + (e.course_price - e.discount_amount), 0)

  const totalSavings = enrollments.reduce((sum, e) => sum + e.discount_amount, 0)

  return (
    <section id="enrollments" className="py-16 sm:py-20 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <GraduationCap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">My Enrollments</h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Track your learning progress and manage your enrolled courses
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
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

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Investment</p>
                  <p className="text-2xl font-bold text-green-400">₹{totalSpent.toLocaleString()}</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
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

        {/* Enrollments List */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-400">
              <BookOpen className="w-6 h-6 mr-2" />
              Your Course Enrollments
            </CardTitle>
            <CardDescription className="text-slate-400">
              Manage your enrolled courses and track payment status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {enrollments.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No Enrollments Yet</h3>
                <p className="text-slate-500 mb-6">Start your learning journey by enrolling in a course!</p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Link href="/#courses">Browse Courses</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {enrollments.map((enrollment) => (
                  <Card
                    key={enrollment.id}
                    className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-semibold text-cyan-400 text-xl">{enrollment.course_name}</h3>
                            <Badge className={getStatusColor(enrollment.payment_status)}>
                              {enrollment.payment_status.charAt(0).toUpperCase() + enrollment.payment_status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-400 mb-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
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
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              Course ID: {enrollment.course_id}
                            </div>
                          </div>

                          {enrollment.discount_code && (
                            <div className="mb-3">
                              <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                                Discount Code: {enrollment.discount_code}
                              </Badge>
                            </div>
                          )}

                          {enrollment.notes && (
                            <div className="bg-slate-600/30 p-3 rounded-lg mb-3">
                              <p className="text-slate-300 text-sm">{enrollment.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                          {enrollment.payment_status === "pending" && (
                            <Button
                              size="sm"
                              asChild
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            >
                              <Link href={enrollment.payment_link} target="_blank" rel="noopener noreferrer">
                                Complete Payment <ExternalLink className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                          {enrollment.payment_status === "completed" && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm">
                              ✅ Payment Completed
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900"
                          >
                            <Link href="/dashboard">View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900"
            >
              <Link href="/#courses">Browse More Courses</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
