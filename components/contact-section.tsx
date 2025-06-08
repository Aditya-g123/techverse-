"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { submitInquiry } from "@/lib/inquiries"
import { MapPin, Phone, Mail, MessageSquare, Clock } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import FallbackContactForm from "./fallback-contact-form"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course_interest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim()) {
        throw new Error("Name and email are required fields")
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address")
      }

      await submitInquiry(formData)
      setIsSubmitted(true)
      toast({
        title: "Inquiry Submitted Successfully! 🎉",
        description: "We'll get back to you within 24 hours. Check your email for confirmation.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        course_interest: "",
        message: "",
      })
    } catch (error: any) {
      console.error("Form submission error:", error)

      // Show specific error message or fallback
      const errorMessage = error.message || "Failed to submit inquiry. Please try again."

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })

      // If database submission fails, offer alternative contact methods
      if (errorMessage.includes("Database") || errorMessage.includes("connection")) {
        toast({
          title: "Alternative Contact",
          description: "You can also reach us directly at +91 9120984300 or aadigupta2356@gmail.com",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Contact Animation Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <DotLottieReact
          src="https://lottie.host/c75336cb-7738-48f8-ac33-425acd1abf62/OpdsGRXUGd.lottie"
          loop
          autoplay
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <MessageSquare className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Have questions about our courses? We're here to help you start your learning journey!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm hover:bg-slate-900/90 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Prayagraj, Uttar Pradesh, India</p>
                <p className="text-slate-400 text-sm mt-2">Serving students across India with quality education</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm hover:bg-slate-900/90 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Phone className="w-6 h-6 mr-2" />
                  Contact Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+919120984300"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-lg font-semibold"
                >
                  +91 9120984300
                </a>
                <p className="text-slate-400 text-sm mt-2">Available Mon-Sat, 9 AM - 7 PM</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm hover:bg-slate-900/90 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Mail className="w-6 h-6 mr-2" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:aadigupta2356@gmail.com"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  aadigupta2356@gmail.com
                </a>
                <p className="text-slate-400 text-sm mt-2">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm hover:bg-slate-900/90 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-slate-300">
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                  <p className="text-slate-400">Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Form */}
          <FallbackContactForm />
        </div>
      </div>
    </section>
  )
}
