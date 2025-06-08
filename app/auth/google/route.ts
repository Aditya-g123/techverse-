import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Get the origin for the redirect URL
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const host = process.env.NEXT_PUBLIC_SITE_URL || "localhost:3000"
  const redirectTo = `${protocol}://${host.replace(/^https?:\/\//, "")}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  })

  if (error) {
    console.error("Error signing in with Google:", error)
    return NextResponse.redirect(new URL("/?message=Error signing in with Google", redirectTo))
  }

  if (data?.url) {
    return NextResponse.redirect(data.url)
  }

  return NextResponse.redirect(new URL("/?message=Authentication failed", redirectTo))
}
