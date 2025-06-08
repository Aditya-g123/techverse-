"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Zap, Gift, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function InstantOfferPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isOpen, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 border-orange-500/30 text-white shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-6 h-6 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 left-8 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
        </div>

        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-center justify-center space-x-2 mb-2">
            <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
            <Badge className="bg-yellow-500 text-black font-bold text-lg px-4 py-1 animate-bounce">FLASH SALE!</Badge>
            <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>

          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🔥 Limited Time Offer!
          </CardTitle>

          <CardDescription className="text-center text-orange-100 text-lg">
            Get up to 50% OFF on all courses!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          {/* Countdown Timer */}
          <div className="bg-black/30 p-4 rounded-lg border border-orange-500/30 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-orange-400" />
              <span className="font-semibold text-orange-400">Offer Expires In:</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400 animate-pulse">{formatTime(timeLeft)}</div>
          </div>

          {/* Offer Details */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-orange-100">🎯 50% OFF on Premium Courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-orange-100">🎁 Free Certification</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-orange-100">💼 Placement Assistance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-orange-100">📚 Lifetime Access</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg py-3 animate-pulse"
            >
              <Link href="https://forms.gle/UEiTfJDUu5sCSzyh9" target="_blank" rel="noopener noreferrer">
                <Gift className="mr-2 h-5 w-5" />
                Claim Offer Now!
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black"
            >
              <Link href="/#contact">Get More Details</Link>
            </Button>
          </div>

          <p className="text-center text-orange-200 text-sm">⚡ Don't miss out! This offer won't last long!</p>
        </CardContent>
      </Card>
    </div>
  )
}
