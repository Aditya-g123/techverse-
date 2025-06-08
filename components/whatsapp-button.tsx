"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppButton() {
  const phoneNumber = "919120984300" // Your WhatsApp number
  const message = "Hi! I'm interested in learning more about Techverse courses. Can you help me?"

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
      size="icon"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="sr-only">Contact us on WhatsApp</span>
    </Button>
  )
}
