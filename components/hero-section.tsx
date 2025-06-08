import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-slate-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Zap className="w-16 h-16 text-cyan-400 mx-auto lg:mx-0 mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Welcome to <span className="text-cyan-400">Techverse</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-10">
              Unlock your potential with our expert-led courses in technology, management, and finance. Start your
              learning journey today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                asChild
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold text-lg px-8 py-3"
              >
                <Link href="/#courses">
                  Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-900 font-semibold text-lg px-8 py-3"
              >
                <Link href="/#inquiry">Make an Inquiry</Link>
              </Button>
            </div>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/O4rFfYmiNygEL6Oov75e3.jpg-a9trkgwjbFToVDXgjddzBvJyiI548c.jpeg"
                  alt="Students learning technology"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HSCBuWy4eGsU8DMBNuQLb-9u8lA8FZuHVfIVASkVk2PAY5MFqjhe.png"
                  alt="Programming and coding"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="relative h-32 rounded-lg overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JilLGQnaxXsVMtd5-0_kt%20%281%29-Csr66URDEXEnysQIL1NDw3dH9ruKa8.png"
                  alt="Professional development"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/00mHA8EXoIb_by0fwMxfN-kvQvxcRGMS8Gwsbv7ObvwvPVJNgRkk.png"
                  alt="Tech solutions and education"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
