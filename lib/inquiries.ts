import { createClient } from "@/lib/supabase/client"

export interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  course_interest?: string
  message?: string
  source?: string
  status?: string
  created_at: string
  updated_at?: string
}

export interface InquiryFormData {
  name: string
  email: string
  phone?: string
  course_interest?: string
  message?: string
}

// Check what columns actually exist in the table
async function getTableColumns(): Promise<string[]> {
  const supabase = createClient()

  try {
    // Try to get a single record to see what columns are available
    const { data, error } = await supabase.from("inquiries").select("*").limit(1)

    if (error) {
      console.error("Error checking table structure:", error)
      return ["name", "email", "phone", "message"] // fallback to basic columns
    }

    if (data && data.length > 0) {
      return Object.keys(data[0])
    }

    // If no data, try to insert a test record to see what columns work
    const testRecord = {
      name: "test",
      email: "test@test.com",
      phone: "test",
      course_interest: "test",
      message: "test",
      source: "test",
      status: "new",
    }

    const { error: insertError } = await supabase.from("inquiries").insert(testRecord).select()

    if (!insertError) {
      // Delete the test record
      await supabase.from("inquiries").delete().eq("email", "test@test.com")
      return Object.keys(testRecord)
    }

    return ["name", "email", "phone", "message"] // fallback
  } catch (error) {
    console.error("Error in getTableColumns:", error)
    return ["name", "email", "phone", "message"] // fallback
  }
}

// Submit inquiry with dynamic column detection
export async function submitInquiry(inquiryData: InquiryFormData): Promise<Inquiry> {
  const supabase = createClient()

  try {
    console.log("Starting inquiry submission with data:", inquiryData)

    // Validate required fields
    if (!inquiryData.name?.trim()) {
      throw new Error("Name is required")
    }

    if (!inquiryData.email?.trim()) {
      throw new Error("Email is required")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inquiryData.email.trim())) {
      throw new Error("Please enter a valid email address")
    }

    // Get available columns
    const availableColumns = await getTableColumns()
    console.log("Available columns:", availableColumns)

    // Build the inquiry record based on available columns
    const inquiryRecord: any = {
      name: inquiryData.name.trim(),
      email: inquiryData.email.trim(),
    }

    // Add optional fields only if columns exist
    if (availableColumns.includes("phone") && inquiryData.phone?.trim()) {
      inquiryRecord.phone = inquiryData.phone.trim()
    }

    if (availableColumns.includes("course_interest") && inquiryData.course_interest?.trim()) {
      inquiryRecord.course_interest = inquiryData.course_interest.trim()
    }

    if (availableColumns.includes("message")) {
      // Combine course interest with message if course_interest column doesn't exist
      if (!availableColumns.includes("course_interest") && inquiryData.course_interest?.trim()) {
        const courseInfo = `Course Interest: ${inquiryData.course_interest.trim()}`
        const userMessage = inquiryData.message?.trim() || ""
        inquiryRecord.message = userMessage ? `${courseInfo}\n\n${userMessage}` : courseInfo
      } else {
        inquiryRecord.message = inquiryData.message?.trim() || null
      }
    }

    if (availableColumns.includes("source")) {
      inquiryRecord.source = "website"
    }

    if (availableColumns.includes("status")) {
      inquiryRecord.status = "new"
    }

    console.log("Prepared inquiry record:", inquiryRecord)

    // Insert the inquiry
    const { data, error } = await supabase.from("inquiries").insert([inquiryRecord]).select().single()

    if (error) {
      console.error("Inquiry insertion error:", error)
      throw new Error(`Failed to submit inquiry: ${error.message}`)
    }

    if (!data) {
      throw new Error("No data returned from inquiry submission")
    }

    console.log("Inquiry submitted successfully:", data)
    return data as Inquiry
  } catch (error: any) {
    console.error("Inquiry submission error:", error)
    throw new Error(error.message || "Failed to submit inquiry. Please try the Google Form instead.")
  }
}

// Fallback submission method using minimal columns
export async function submitBasicInquiry(inquiryData: InquiryFormData): Promise<Inquiry> {
  const supabase = createClient()

  try {
    // Combine all information into the message field
    let combinedMessage = ""

    if (inquiryData.course_interest && inquiryData.course_interest !== "general") {
      combinedMessage += `Course Interest: ${inquiryData.course_interest}\n\n`
    }

    if (inquiryData.message) {
      combinedMessage += `Message: ${inquiryData.message}\n\n`
    }

    if (inquiryData.phone) {
      combinedMessage += `Phone: ${inquiryData.phone}`
    }

    const basicRecord = {
      name: inquiryData.name.trim(),
      email: inquiryData.email.trim(),
      message: combinedMessage.trim() || "General inquiry",
    }

    console.log("Submitting basic inquiry:", basicRecord)

    const { data, error } = await supabase.from("inquiries").insert([basicRecord]).select().single()

    if (error) {
      console.error("Basic inquiry insertion error:", error)
      throw new Error(`Failed to submit basic inquiry: ${error.message}`)
    }

    return data as Inquiry
  } catch (error: any) {
    console.error("Basic inquiry submission error:", error)
    throw new Error(error.message || "Failed to submit inquiry")
  }
}

// Get all inquiries
export async function getAllInquiries(): Promise<Inquiry[]> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching inquiries:", error)
      throw new Error(`Failed to fetch inquiries: ${error.message}`)
    }

    return data as Inquiry[]
  } catch (error: any) {
    console.error("Get inquiries error:", error)
    throw new Error(error.message || "Failed to fetch inquiries")
  }
}

// Update inquiry status
export async function updateInquiryStatus(inquiryId: string, status: string): Promise<Inquiry> {
  const supabase = createClient()

  try {
    const updateData: any = { status }

    // Add updated_at if column exists
    const availableColumns = await getTableColumns()
    if (availableColumns.includes("updated_at")) {
      updateData.updated_at = new Date().toISOString()
    }

    const { data, error } = await supabase.from("inquiries").update(updateData).eq("id", inquiryId).select().single()

    if (error) {
      console.error("Error updating inquiry status:", error)
      throw new Error(`Failed to update inquiry status: ${error.message}`)
    }

    return data as Inquiry
  } catch (error: any) {
    console.error("Update inquiry status error:", error)
    throw new Error(error.message || "Failed to update inquiry status")
  }
}

// Test database connection
export async function testDatabaseConnection(): Promise<{ connected: boolean; columns?: string[]; error?: string }> {
  try {
    const supabase = createClient()

    // Test basic connection
    const { data, error } = await supabase.from("inquiries").select("*").limit(1)

    if (error) {
      return {
        connected: false,
        error: `Connection failed: ${error.message}`,
      }
    }

    // Get available columns
    const columns = await getTableColumns()

    return {
      connected: true,
      columns,
    }
  } catch (error: any) {
    return {
      connected: false,
      error: `Test failed: ${error.message}`,
    }
  }
}

// Validate inquiry data before submission
export function validateInquiryData(data: InquiryFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name?.trim()) {
    errors.push("Name is required")
  }

  if (!data.email?.trim()) {
    errors.push("Email is required")
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email.trim())) {
      errors.push("Please enter a valid email address")
    }
  }

  if (data.phone && data.phone.trim()) {
    // Basic phone validation (optional)
    const phoneRegex = /^[+]?[\d\s\-$$$$]{10,}$/
    if (!phoneRegex.test(data.phone.trim())) {
      errors.push("Please enter a valid phone number")
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
