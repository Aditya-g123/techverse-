"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false)
  const phoneNumber = "919120984300"

  const handleWhatsAppClick = (message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
    setShowPopup(false)
  }

  const quickMessages = [
    {
      emoji: "🎓",
      text: "Course Inquiry",
      message: "Hi! 😊 I'm interested in learning more about your courses. Can you help me choose the right one? 🤔✨",
    },
    {
      emoji: "🏠",
      text: "Accommodation",
      message: "Hello! 🏠 I need help with accommodation services. Can you provide more details? 😊🌟",
    },
    {
      emoji: "📚",
      text: "College Admission",
      message: "Hi there! 📚 I need guidance for college admission process. Can you assist me? 🎯💫",
    },
    {
      emoji: "💬",
      text: "General Query",
      message: "Hello! 👋 I have some questions about Techverse services. Can we chat? 😊💭",
    },
  ]

  return (
    <>
      <Button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 animate-bounce group"
        size="icon"
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        <span className="sr-only">Contact us on WhatsApp</span>
        <div className="absolute -top-2 -right-2 text-lg animate-bounce">💬</div>
        <div className="absolute -top-1 -left-2 text-sm animate-pulse">✨</div>
      </Button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 border-green-500/30 text-white shadow-2xl animate-in zoom-in-95 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-green-400">💚 Chat with us!</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowPopup(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-green-100 mb-6 text-center">🌟 Choose what you'd like to chat about! 😊</p>

              <div className="space-y-3">
                {quickMessages.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => handleWhatsAppClick(item.message)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 justify-start text-left"
                  >
                    <span className="text-xl mr-3">{item.emoji}</span>
                    <span className="font-semibold">{item.text}</span>
                  </Button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-green-200 text-sm">💫 We'll respond super fast! ⚡</p>
                <p className="text-green-300 text-xs mt-1">📱 +91 9120984300 • Available 24/7 🕐</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

