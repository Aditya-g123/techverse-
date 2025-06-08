import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, BookOpen, Target, Linkedin, Twitter, Mail } from "lucide-react"

export default function AboutSection() {
  const teamMembers = [
    {
      name: "Aditya Gupta",
      role: "Founder & CEO",
      image: " ",
      description:
        "Visionary leader with 3+ years in tech education. Passionate about democratizing quality education.",
      achievements: ["10,000+ Students Mentored", "95% Placement Rate", "Industry Expert"],
      social: {
        linkedin: "https://www.linkedin.com/in/aditya-gupta-297575323/",
        twitter: "#",
        email: "aditya@techverse.com",
      },
    },
    {
      name: "Priya Sharma",
      role: "Head of Curriculum",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description:
        "Expert curriculum designer with experience at top tech companies. Ensures industry-relevant content.",
      achievements: ["15+ Years Experience", "Curriculum Expert", "Industry Consultant"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "priya@techverse.com",
      },
    },
    {
      name: "Rahul Verma",
      role: "Technical Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Full-stack developer and architect. Leads technical training and hands-on project development.",
      achievements: ["Tech Architect", "Open Source Contributor", "Mentor"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "rahul@techverse.com",
      },
    },
  ]

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-500 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* About Company */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            About Techverse
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Techverse is dedicated to providing high-quality, accessible education to empower individuals for the
            future. Our courses are designed by industry experts to equip you with practical skills and knowledge that
            matter in today's competitive landscape.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">10,000+</div>
                <div className="text-sm text-slate-400">Students Enrolled</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">18</div>
                <div className="text-sm text-slate-400">Expert Courses</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">95%</div>
                <div className="text-sm text-slate-400">Placement Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">5+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">Meet Our Team</h3>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our passionate team of educators and industry experts are committed to your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-cyan-500 shadow-lg object-cover group-hover:border-cyan-400 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-slate-900 p-2 rounded-full group-hover:bg-cyan-400 transition-colors duration-300">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-cyan-400 mb-1">{member.name}</h4>
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white mb-3">{member.role}</Badge>

                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{member.description}</p>

                <div className="space-y-1 mb-4">
                  {member.achievements.map((achievement, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-cyan-500/30 text-cyan-400 mr-1">
                      {achievement}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-center space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
