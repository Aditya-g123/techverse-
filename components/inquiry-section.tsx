"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { submitInquiry, submitBasicInquiry, testDatabaseConnection } from "@/lib/inquiries"
import { courses } from "@/app/data/courses"
import { HelpCircle, ExternalLink, Gift, Sparkles, Send, CheckCircle, Database, AlertTriangle } from "lucide-react"

export default function InquirySection() {
  const [showDiscountHint, setShowDiscountHint] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course_interest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [dbStatus, setDbStatus] = useState<string>("Not tested")
  const [dbColumns, setDbColumns] = useState<string[]>([])
  const { toast } = useToast()

  const inquiryFormLink = "https://forms.gle/qUh9ZwGpM8fBagcn9"

  const handleFormClick = () => {
    setShowDiscountHint(true)
    setTimeout(() => setShowDiscountHint(false), 5000)
  }

  const testDatabase = async () => {
    const result = await testDatabaseConnection()
    if (result.connected) {
      setDbStatus(`✅ Connected (${result.columns?.length || 0} columns)`)
      setDbColumns(result.columns || [])
    } else {
      setDbStatus(`❌ ${result.error}`)
      setDbColumns([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Form submission started with data:", formData)

      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error("Name is required")
      }

      if (!formData.email.trim()) {
        throw new Error("Email is required")
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error("Please enter a valid email address")
      }

      console.log("Form validation passed")

      let result
      try {
        // Try the full submission first
        result = await submitInquiry(formData)
        console.log("Full inquiry submitted successfully:", result)
      } catch (fullError: any) {
        console.log("Full submission failed, trying basic submission:", fullError.message)

        // If full submission fails, try basic submission
        result = await submitBasicInquiry(formData)
        console.log("Basic inquiry submitted successfully:", result)

        toast({
          title: "Inquiry Submitted (Basic Mode)",
          description: "Your inquiry was saved with basic information. We'll contact you soon!",
        })
      }

      if (result) {
        setIsSubmitted(true)
        toast({
          title: "Inquiry Submitted Successfully! 🎉",
          description: "We'll get back to you within 24 hours.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          course_interest: "",
          message: "",
        })
      }
    } catch (error: any) {
      console.error("Form submission error:", error)

      toast({
        title: "Submission Failed",
        description: "Please use the Google Form above for guaranteed delivery.",
        variant: "destructive",
      })

      // Offer alternative contact methods
      setTimeout(() => {
        const emailSubject = `Inquiry from ${formData.name} - Techverse`
        const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Course Interest: ${formData.course_interest || "General inquiry"}
Message: ${formData.message || "No additional message"}

Sent from Techverse website contact form.
        `.trim()

        toast({
          title: "Alternative Contact Methods",
          description: "Use Google Form, email, or WhatsApp",
          action: (
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => {
                  const mailtoLink = `mailto:info@techverse.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
                  window.location.href = mailtoLink
                }}
              >
                Email
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const whatsappMessage = `Hi! I'm ${formData.name}. I'm interested in ${formData.course_interest || "your courses"}. Please contact me at ${formData.email}.`
                  const whatsappUrl = `https://wa.me/919120984300?text=${encodeURIComponent(whatsappMessage)}`
                  window.open(whatsappUrl, "_blank")
                }}
              >
                WhatsApp
              </Button>
            </div>
          ),
        })
      }, 2000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="inquiry" className="py-16 sm:py-20 bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-400">Have Questions?</h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Our team is here to help you with any inquiries about our courses, admission process, or career guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Card className="bg-slate-900 border-slate-700 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Recommended Method</span>
                </div>
                <CardTitle className="text-2xl text-cyan-400">Quick Inquiry via Google Form</CardTitle>
                <CardDescription className="text-slate-300">
                  Fast, reliable, and guaranteed delivery - our preferred method for inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="font-semibold text-cyan-400 mb-2">🎯 Why Use Google Form:</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Instant delivery and confirmation</li>
                    <li>• No technical issues or delays</li>
                    <li>• Faster response time (within 2-4 hours)</li>
                    <li>• Automatic backup and tracking</li>
                  </ul>
                </div>

                {showDiscountHint && (
                  <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 rounded-lg border border-yellow-400/50 animate-pulse">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-5 w-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">💰 Discount Opportunity!</span>
                    </div>
                    <p className="text-sm text-slate-200 mt-1">
                      Mention "GLADIFY PARTNERSHIP" in your inquiry for exclusive discounts! 🎉
                    </p>
                  </div>
                )}

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold text-lg"
                  onClick={handleFormClick}
                >
                  <Link href={inquiryFormLink} target="_blank" rel="noopener noreferrer">
                    Submit Google Form <ExternalLink className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  💡 Pro tip: Mention your preferred course and "GLADIFY" for additional benefits!
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <CardTitle className="text-cyan-400">Share Your Interest</CardTitle>
                  </div>
                  <Button size="sm" variant="outline" onClick={testDatabase} className="text-xs">
                    
                  </Button>
                </div>
                <CardDescription className="text-slate-400">
                
                  {dbColumns.length > 0 && <div className="text-xs mt-1">Columns: {dbColumns.join(", ")}</div>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!dbStatus.includes("✅") && (
                  <div className="mb-4 p-3 bg-green-900/30 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                     
                      <span className="text-yellow-400 text-sm font-semibold">Thanks For Share Your interest</span>
                    </div>
                    <p className="text-yellow-200 text-xs mt-1">
                      
                    </p>
                  </div>
                )}

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Inquiry Submitted!</h3>
                    <p className="text-slate-300 mb-4">We'll get back to you within 24 hours.</p>
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

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Send Inquiry <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <div className="text-center space-y-2">
                      <p className="text-xs text-slate-400">
                        Having issues? Use the Google Form above or contact us directly:
                      </p>
                      <div className="flex justify-center space-x-4 text-xs">
                        <a href="tel:+919120984300" className="text-cyan-400 hover:underline">
                          📞 +91 9120984300
                        </a>
                        <a href="mailto:info@techverse.com" className="text-cyan-400 hover:underline">
                          ✉️ info@techverse.com
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
