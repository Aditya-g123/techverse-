"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { enrollInCourse } from "@/lib/enrollments"
import { UserPlus, BookmarkPlus, ArrowRight } from "lucide-react"
import type { Course } from "@/app/data/courses"

interface EnrollButtonProps {
  course: Course
  onEnrollmentSuccess?: () => void
  className?: string
  size?: "sm" | "default" | "lg"
}

export default function EnrollButton({ course, onEnrollmentSuccess, className, size = "default" }: EnrollButtonProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)
  const { toast } = useToast()

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

      toast({
        title: "Enrollment Successful! 🎉",
        description: `You've been enrolled in ${course.name}. Check your dashboard for payment details.`,
      })

      if (onEnrollmentSuccess) {
        onEnrollmentSuccess()
      }
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message || "📝 Please fill out the form completely to continue. Thanks for your interest!.",
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-300", // Tailwind override for green styling 
      })
    } finally {
      setIsEnrolling(false)
    }
  }

  return (
    <Button
      onClick={handleEnrollment}
      disabled={isEnrolling}
      size={size}
      className={`bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-semibold transition-all duration-300 hover:scale-105 ${className}`}
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
  )
}
