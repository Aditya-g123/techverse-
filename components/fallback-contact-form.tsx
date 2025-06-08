"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { courses } from "@/app/data/courses"
import { Send, CheckCircle, ExternalLink } from "lucide-react"

export default function FallbackContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course_interest: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields",
        variant: "destructive",
      })
      return
    }

    // Create email content
    const emailSubject = `Inquiry from ${formData.name} - Techverse`
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Course Interest: ${formData.course_interest || "General inquiry"}
Message: ${formData.message || "No additional message"}

Sent from Techverse website contact form.
    `.trim()

    // Create mailto link
    const mailtoLink = `mailto:aadigupta2356@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    // Open email client
    window.location.href = mailtoLink

    setIsSubmitted(true)
    toast({
      title: "Email Client Opened! 📧",
      description: "Please send the email from your email client to complete your inquiry.",
    })

    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        course_interest: "",
        message: "",
      })
      setIsSubmitted(false)
    }, 5000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm ${formData.name}. I'm interested in ${formData.course_interest || "your courses"}. ${formData.message ? `Additional message: ${formData.message}` : "aadigupta2356@gmail.com"} Please contact me at ${formData.email}.`
    const whatsappUrl = `https://wa.me/919120984300?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-cyan-400">Send us an Inquiry</CardTitle>
        <CardDescription className="text-slate-400">
          Fill out the form below and we'll get back to you soon!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-green-400 mb-2">Email Client Opened!</h3>
            <p className="text-slate-300 mb-4">Please send the email to complete your inquiry.</p>
            <p className="text-slate-400 text-sm mb-4">
              If your email client didn't open, you can manually email us at{""}
              <a href="mailto:aadigupta2356@gmail.com" className="text-cyan-400 hover:underline">
                aadigupta2356@gmail.com
              </a>
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-cyan-500 hover:bg-cyan-600">
              Submit Another Inquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-500"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-500"
                placeholder="+91 9120984300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course" className="text-slate-300">
                Course Interest
              </Label>
              <Select
                value={formData.course_interest}
                onValueChange={(value) => handleChange("course_interest", value)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.name}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-300">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100 focus:border-cyan-500 min-h-[120px]"
                placeholder="Tell us about your learning goals and any questions you have..."
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                Send via Email <Send className="ml-2 w-4 h-4" />
              </Button>

              <Button
                type="button"
                onClick={handleWhatsAppContact}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
              >
                Send via WhatsApp <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Choose your preferred contact method. We'll respond within 24 hours!
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
