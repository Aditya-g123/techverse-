import Image from "next/image"
import type { Testimonial } from "@/app/data/testimonials"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 text-slate-200 p-6 h-full flex flex-col shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center justify-between">
          <Quote className="w-8 h-8 text-cyan-500 mb-2" />
          <div className="flex items-center space-x-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <p className="italic text-slate-300 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
      </CardContent>
      <CardFooter className="p-0 mt-6 flex items-center">
        <Image
          src={testimonial.avatarUrl || "/placeholder.svg"}
          alt={testimonial.name}
          width={48}
          height={48}
          className="rounded-full mr-4 border-2 border-cyan-500"
        />
        <div>
          <p className="font-semibold text-cyan-400">{testimonial.name}</p>
          <p className="text-sm text-slate-400">{testimonial.course}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
