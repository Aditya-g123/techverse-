import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // Get the origin for redirects
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const host = process.env.NEXT_PUBLIC_SITE_URL || "localhost:3000"
  const origin = `${protocol}://${host.replace(/^https?:\/\//, "")}`

  if (code) {
    const cookieStore = cookies()
    const supabaseUrl = "https://wagfyylbrrddvvmfzrqr.supabase.co"
    const supabaseAnonKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZ2Z5eWxicnJkZHZ2bWZ6cnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDkxNzAsImV4cCI6MjA2MzQ4NTE3MH0.Xm4UMKhXS9eqdZ0-cK6qCsDRdSt0p41yalnV_f6GV08"

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options })
        },
      },
    })

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(`${origin}/?message=Successfully signed in!`)
      }
      console.error("Error exchanging code for session:", error.message)
      return NextResponse.redirect(`${origin}/?message=Authentication failed. Please try again.`)
    } catch (error) {
      console.error("Error in auth callback:", error)
      return NextResponse.redirect(`${origin}/?message=Authentication error. Please try again.`)
    }
  }

  console.warn("No code found in auth callback.")
  return NextResponse.redirect(`${origin}/?message=Authentication callback error.`)
}
