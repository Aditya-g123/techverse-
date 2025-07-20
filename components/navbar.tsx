import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-slate-950 text-slate-100 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-slate-950/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-105"
          >
            <BookOpen size={28} className="animate-pulse" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Techverse</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Button
              variant="link"
              asChild
              className="text-slate-200 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              <Link href="/#about">About</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-slate-200 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              <Link href="/#courses">Courses</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-slate-200 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              <Link href="/#testimonials">Testimonials</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-slate-200 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              <Link href="/#inquiry">Inquiry</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-slate-200 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              <Link href="/#contact">Explore</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
