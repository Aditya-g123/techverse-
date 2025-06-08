import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider" // Assuming this exists from shadcn setup
import { Toaster } from "@/components/ui/toaster" // For displaying messages

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Techverse - Unlock Your Potential",
  description: "Expert-led courses in technology, management, and finance.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark bg-slate-950 text-slate-100 flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
