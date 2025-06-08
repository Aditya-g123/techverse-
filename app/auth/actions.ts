"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Error signing out:", error)
    return redirect("/?message=Error signing out. Please try again.")
  }

  revalidatePath("/", "layout")
  return redirect("/")
}

export async function signInWithGoogle() {
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
    return redirect("/?message=Error signing in with Google. Please try again.")
  }

  // Important: Don't wrap this redirect in try/catch
  if (data?.url) {
    return redirect(data.url)
  }

  return redirect("/?message=Authentication failed. Please try again.")
}
