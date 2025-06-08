import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { cookies } from "next/headers"

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  const supabaseUrl = "https://ovsjphatiwxggmvbdpas.supabase.co"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2pwaGF0aXd4Z2dtdmJkcGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDgzODEsImV4cCI6MjA2MzQ4NDM4MX0.6_uwzsfJilbISS6zVqvBsBP3JUfS1WYVXD_xTdRq1kg"

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.delete({ name, ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
        }
      },
    },
  })
}
