import { testimonials } from "@/app/data/testimonials"
import TestimonialCard from "./testimonial-card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">Student Success Stories</h2>
          <p className="text-lg text-slate-400 mt-2 max-w-xl mx-auto">
            Hear what our students have to say about their transformative learning experience at Techverse.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-slate-300 font-semibold">4.9/5 from 1000+ reviews</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
