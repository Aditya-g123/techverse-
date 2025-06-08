import { createClient } from "@/lib/supabase/client"

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  course_name: string
  course_price: number
  enrolled_at: string
  payment_status: "pending" | "completed" | "failed" | "cancelled"
  payment_link: string
  payment_reference?: string
  discount_applied: boolean
  discount_code?: string
  discount_amount: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface EnrollmentData {
  courseId: string
  courseName: string
  coursePrice: number
  paymentLink: string
  discountCode?: string
  discountAmount?: number
  notes?: string
}

// Enroll a user in a course
export async function enrollInCourse(enrollmentData: EnrollmentData): Promise<Enrollment> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User must be logged in to enroll")
  }

  // Check if user is already enrolled in this course
  const { data: existingEnrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", enrollmentData.courseId)
    .single()

  if (existingEnrollment) {
    throw new Error("You are already enrolled in this course")
  }

  const enrollmentRecord = {
    user_id: user.id,
    course_id: enrollmentData.courseId,
    course_name: enrollmentData.courseName,
    course_price: enrollmentData.coursePrice,
    payment_link: enrollmentData.paymentLink,
    payment_status: "pending" as const,
    discount_applied: !!enrollmentData.discountCode,
    discount_code: enrollmentData.discountCode || null,
    discount_amount: enrollmentData.discountAmount || 0,
    notes: enrollmentData.notes || null,
  }

  const { data, error } = await supabase.from("enrollments").insert(enrollmentRecord).select().single()

  if (error) {
    console.error("Enrollment error:", error)
    throw new Error(`Failed to enroll: ${error.message}`)
  }

  return data as Enrollment
}

// Get user's enrollments
export async function getUserEnrollments(): Promise<Enrollment[]> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .order("enrolled_at", { ascending: false })

  if (error) {
    console.error("Error fetching enrollments:", error)
    throw new Error(`Failed to fetch enrollments: ${error.message}`)
  }

  return data as Enrollment[]
}

// Update payment status
export async function updatePaymentStatus(
  enrollmentId: string,
  status: "pending" | "completed" | "failed" | "cancelled",
  paymentReference?: string,
): Promise<Enrollment> {
  const supabase = createClient()

  const updateData: any = {
    payment_status: status,
    updated_at: new Date().toISOString(),
  }

  if (paymentReference) {
    updateData.payment_reference = paymentReference
  }

  const { data, error } = await supabase.from("enrollments").update(updateData).eq("id", enrollmentId).select().single()

  if (error) {
    console.error("Error updating payment status:", error)
    throw new Error(`Failed to update payment status: ${error.message}`)
  }

  return data as Enrollment
}

// Check if user is enrolled in a specific course
export async function isUserEnrolled(courseId: string): Promise<boolean> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single()

  return !!data && !error
}

// Get enrollment statistics (for admin)
export async function getEnrollmentStats() {
  const supabase = createClient()

  const { data, error } = await supabase.from("enrollments").select("payment_status, course_id, enrolled_at")

  if (error) {
    console.error("Error fetching enrollment stats:", error)
    throw new Error(`Failed to fetch enrollment stats: ${error.message}`)
  }

  const stats = {
    total: data.length,
    pending: data.filter((e) => e.payment_status === "pending").length,
    completed: data.filter((e) => e.payment_status === "completed").length,
    failed: data.filter((e) => e.payment_status === "failed").length,
    cancelled: data.filter((e) => e.payment_status === "cancelled").length,
    thisMonth: data.filter((e) => {
      const enrolledDate = new Date(e.enrolled_at)
      const now = new Date()
      return enrolledDate.getMonth() === now.getMonth() && enrolledDate.getFullYear() === now.getFullYear()
    }).length,
  }

  return stats
}

// Get all enrollments (for admin)
export async function getAllEnrollments(): Promise<Enrollment[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("enrollments").select("*").order("enrolled_at", { ascending: false })

  if (error) {
    console.error("Error fetching all enrollments:", error)
    throw new Error(`Failed to fetch all enrollments: ${error.message}`)
  }

  return data as Enrollment[]
}
