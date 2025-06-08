import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = "https://ovsjphatiwxggmvbdpas.supabase.co"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2pwaGF0aXd4Z2dtdmJkcGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDgzODEsImV4cCI6MjA2MzQ4NDM4MX0.6_uwzsfJilbISS6zVqvBsBP3JUfS1WYVXD_xTdRq1kg"

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({ name, value: "", ...options })
      },
    },
  })

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
