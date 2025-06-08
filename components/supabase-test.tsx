"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupabaseTest() {
  const [status, setStatus] = useState<string>("Not tested")
  const [testing, setTesting] = useState(false)

  const testConnection = async () => {
    setTesting(true)
    try {
      const supabase = createClient()

      // Test basic connection
      const { data, error } = await supabase.from("inquiries").select("count").limit(1)

      if (error) {
        setStatus(`❌ Error: ${error.message}`)
      } else {
        setStatus("✅ Supabase connection successful!")
      }
    } catch (error: any) {
      setStatus(`❌ Connection failed: ${error.message}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="bg-slate-900 border-slate-700 max-w-md">
      <CardHeader>
        <CardTitle className="text-cyan-400">Supabase Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300">Status: {status}</p>
        <Button onClick={testConnection} disabled={testing} className="w-full">
          {testing ? "Testing..." : "Test Connection"}
        </Button>
      </CardContent>
    </Card>
  )
}
