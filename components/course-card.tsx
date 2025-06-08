"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Course } from "@/app/data/courses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { enrollInCourse, isUserEnrolled } from "@/lib/enrollments"
import {
  ArrowRight,
  IndianRupee,
  Clock,
  BarChart3,
  BookmarkPlus,
  ExternalLink,
  CheckCircle,
  UserPlus,
} from "lucide-react"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [checkingEnrollment, setCheckingEnrollment] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const enrolled = await isUserEnrolled(course.id)
        setIsEnrolled(enrolled)
      } catch (error) {
        console.error("Error checking enrollment:", error)
      } finally {
        setCheckingEnrollment(false)
      }
    }

    checkEnrollment()
  }, [course.id])

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const handleEnrollment = async () => {
    setIsEnrolling(true)
    try {
      await enrollInCourse({
        courseId: course.id,
        courseName: course.name,
        coursePrice: course.price,
        paymentLink: course.paymentLink,
        notes: "Enrolled via website",
      })

      setIsEnrolled(true)
      toast({
        title: "Enrollment Successful! 🎉",
        description: `You've been enrolled in ${course.name}. Check your dashboard for payment details.`,
      })

      // Optional: Redirect to dashboard after enrollment
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message || "Please sign in to enroll in courses.",
        variant: "destructive",
      })
    } finally {
      setIsEnrolling(false)
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700 text-slate-100 flex flex-col h-full shadow-xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group backdrop-blur-sm">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
          <Image
            src={course.imageUrl || "/placeholder.svg"}
            alt={course.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3">
            <Badge className={getLevelColor(course.level)}>
              <BarChart3 className="w-3 h-3 mr-1" />
              {course.level}
            </Badge>
          </div>
          {isEnrolled && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-500/90 text-white animate-pulse">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enrolled
              </Badge>
            </div>
          )}
        </div>
        <div className="p-6 pb-2">
          <CardTitle className="text-xl font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
            {course.name}
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm leading-relaxed">{course.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-slate-400">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <Badge variant="outline" className="text-cyan-400 border-cyan-500/30">
            {course.category}
          </Badge>
        </div>
        <div className="flex items-center text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
          <IndianRupee className="w-6 h-6 mr-1" />
          {course.priceFormatted.replace("₹", "")}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-2 space-y-2">
        {checkingEnrollment ? (
          <Button disabled className="w-full">
            <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
            Checking enrollment...
          </Button>
        ) : isEnrolled ? (
          <div className="space-y-2 w-full">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
              <Link href="/dashboard">
                <CheckCircle className="mr-2 w-4 h-4" />
                View in Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900"
            >
              <Link href={course.paymentLink} target="_blank" rel="noopener noreferrer">
                Complete Payment <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleEnrollment}
            disabled={isEnrolling}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            {isEnrolling ? (
              <>
                <BookmarkPlus className="mr-2 w-4 h-4 animate-spin" />
                Enrolling...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 w-4 h-4" />
                Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
