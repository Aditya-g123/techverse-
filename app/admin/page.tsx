import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboard, Settings, Users, BookCopy, CreditCard } from "lucide-react"

export default async function AdminPage() {
  let user = null

  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data } = await supabase.auth.getUser()
    user = data.user

    if (!user) {
      return redirect("/?message=Session expired. Please log in again.")
    }
  } catch (error) {
    console.error("Error fetching user:", error)
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-red-400 mb-4">Authentication Error</h1>
        <p className="text-slate-300 mb-6">
          There was an error connecting to the authentication service. Please check your environment configuration.
        </p>
        <Button variant="link" asChild className="text-cyan-400 hover:text-cyan-300">
          <Link href="/">← Back to Homepage</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-cyan-400">Admin Dashboard</h1>
        <p className="mt-2 text-slate-300">
          Welcome back, <span className="font-semibold text-cyan-500">{user.email}</span>!
        </p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-700">
          <LayoutDashboard className="w-10 h-10 text-cyan-500 mb-3" />
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Overview</h2>
          <p className="text-slate-400 mb-4">View site statistics and summaries.</p>
          <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-900">
            View Statistics (Coming Soon)
          </Button>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-700">
          <CreditCard className="w-10 h-10 text-cyan-500 mb-3" />
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Manage Enrollments</h2>
          <p className="text-slate-400 mb-4">Track and manage student course enrollments.</p>
          <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
            <Link href="/admin/enrollments">View Enrollments</Link>
          </Button>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-700">
          <BookCopy className="w-10 h-10 text-cyan-500 mb-3" />
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Manage Courses</h2>
          <p className="text-slate-400 mb-4">Add, edit, or remove course listings.</p>
          <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-900">
            Course Management (Coming Soon)
          </Button>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-700">
          <Users className="w-10 h-10 text-cyan-500 mb-3" />
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Manage Users</h2>
          <p className="text-slate-400 mb-4">View and manage user accounts.</p>
          <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-900">
            User Management (Coming Soon)
          </Button>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-700">
          <Settings className="w-10 h-10 text-cyan-500 mb-3" />
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Site Settings</h2>
          <p className="text-slate-400 mb-4">Configure website settings.</p>
          <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-900">
            Configure Settings (Coming Soon)
          </Button>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Button variant="link" asChild className="text-cyan-400 hover:text-cyan-300">
          <Link href="/">← Back to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
