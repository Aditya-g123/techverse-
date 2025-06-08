"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Gift, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function GladifyPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 border-cyan-500/30 text-white shadow-2xl animate-in zoom-in-95 duration-300">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <Badge className="bg-yellow-500 text-black font-bold">EXCLUSIVE PARTNERSHIP</Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-cyan-400">🎉 Special Gladify Partnership!</CardTitle>
          <CardDescription className="text-slate-200">
            Get exclusive discounts on all courses through our partnership with Gladify
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/10 p-4 rounded-lg border border-cyan-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold text-yellow-400">Extra Discount Available!</span>
            </div>
            <p className="text-sm text-slate-200">
              Submit an inquiry through our form and mention "GLADIFY" to unlock additional savings on your course
              enrollment! 💰
            </p>
          </div>
          <div className="space-y-2">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
            >
              <Link href="/#inquiry">
                Submit Inquiry Now <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
