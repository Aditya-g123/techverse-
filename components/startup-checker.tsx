"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Database, Wifi, Globe, RefreshCw } from "lucide-react"

interface SystemCheck {
  name: string
  status: "checking" | "success" | "error"
  message: string
  icon: React.ReactNode
}

export default function StartupChecker() {
  const [checks, setChecks] = useState<SystemCheck[]>([
    {
      name: "Supabase Connection",
      status: "checking",
      message: "Connecting to database...",
      icon: <Database className="w-5 h-5" />,
    },
    {
      name: "Database Tables",
      status: "checking",
      message: "Checking table structure...",
      icon: <Wifi className="w-5 h-5" />,
    },
    {
      name: "Environment Config",
      status: "checking",
      message: "Validating configuration...",
      icon: <Globe className="w-5 h-5" />,
    },
  ])

  const [isVisible, setIsVisible] = useState(true)

  const runChecks = async () => {
    // Reset all checks
    setChecks((prev) =>
      prev.map((check) => ({
        ...check,
        status: "checking",
        message: "Running check...",
      })),
    )

    // Check 1: Supabase Connection
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("inquiries").select("count").limit(1)

      setChecks((prev) =>
        prev.map((check) =>
          check.name === "Supabase Connection"
            ? {
                ...check,
                status: error ? "error" : "success",
                message: error ? `Connection failed: ${error.message}` : "✅ Connected successfully",
              }
            : check,
        ),
      )

      // Check 2: Database Tables
      if (!error) {
        const { data: tableData, error: tableError } = await supabase
          .from("inquiries")
          .select("id, name, email, phone, course_interest, message")
          .limit(1)

        setChecks((prev) =>
          prev.map((check) =>
            check.name === "Database Tables"
              ? {
                  ...check,
                  status: tableError ? "error" : "success",
                  message: tableError
                    ? `Table issue: ${tableError.message}`
                    : "✅ All tables ready (inquiries table verified)",
                }
              : check,
          ),
        )
      } else {
        setChecks((prev) =>
          prev.map((check) =>
            check.name === "Database Tables"
              ? {
                  ...check,
                  status: "error",
                  message: "❌ Cannot check tables (connection failed)",
                }
              : check,
          ),
        )
      }
    } catch (error: any) {
      setChecks((prev) =>
        prev.map((check) =>
          check.name === "Supabase Connection"
            ? {
                ...check,
                status: "error",
                message: `❌ Connection error: ${error.message}`,
              }
            : check,
        ),
      )
    }

    // Check 3: Environment Config
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setChecks((prev) =>
      prev.map((check) =>
        check.name === "Environment Config"
          ? {
              ...check,
              status: supabaseUrl && supabaseKey ? "success" : "error",
              message:
                supabaseUrl && supabaseKey ? "✅ Environment variables configured" : "❌ Missing environment variables",
            }
          : check,
      ),
    )
  }

  useEffect(() => {
    runChecks()
  }, [])

  const allSuccess = checks.every((check) => check.status === "success")
  const hasErrors = checks.some((check) => check.status === "error")

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 w-96">
      <Card className="bg-slate-900 border-slate-700 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-400 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              System Status
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={runChecks}>
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)}>
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {checks.map((check) => (
            <div key={check.name} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center space-x-3">
                {check.icon}
                <div>
                  <div className="font-medium text-slate-200">{check.name}</div>
                  <div className="text-sm text-slate-400">{check.message}</div>
                </div>
              </div>
              <div>
                {check.status === "checking" && (
                  <div className="animate-spin w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
                )}
                {check.status === "success" && <CheckCircle className="w-5 h-5 text-green-400" />}
                {check.status === "error" && <XCircle className="w-5 h-5 text-red-400" />}
              </div>
            </div>
          ))}

          <div className="pt-3 border-t border-slate-700">
            {allSuccess && (
              <Badge className="w-full justify-center bg-green-500/20 text-green-400 border-green-500/30">
                🎉 All Systems Ready! Website is fully functional.
              </Badge>
            )}
            {hasErrors && (
              <div className="space-y-2">
                <Badge className="w-full justify-center bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  ⚠️ Some issues detected - Fallback methods available
                </Badge>
                <div className="text-xs text-slate-400 text-center">
                  Google Form and WhatsApp will work as backup contact methods
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
