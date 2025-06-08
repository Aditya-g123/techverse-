import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, BookOpen, Target, Mail, Phone } from "lucide-react"

export default function FounderSection() {
  return (
    <section id="founder" className="py-16 sm:py-20 bg-slate-800 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">Share Your Interest</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connect with us to explore opportunities and learn more about our programs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="space-y-4 mb-6">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg px-6 py-2">
                Get in Touch
              </Badge>
            </div>

            <div className="bg-slate-900 p-8 rounded-lg border border-slate-700 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Mail className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-cyan-400">Contact Information</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <a
                    href="mailto:aadigupta2356@gmail.com"
                    className="text-lg text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    aadigupta2356@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <a
                    href="tel:+919120984300"
                    className="text-lg text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    +91 9120984300
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">10,000+</div>
                <div className="text-sm text-slate-400">Students Mentored</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">18</div>
                <div className="text-sm text-slate-400">Courses Designed</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">95%</div>
                <div className="text-sm text-slate-400">Placement Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">5+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
