import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="flex items-center justify-center space-x-1">
          <span>Made with</span>
          <Heart className="w-5 h-5 text-red-500" />
          <span>by Aditya Gupta</span>
        </p>
        <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Techverse. All rights reserved.</p>
      </div>
    </footer>
  )
}
