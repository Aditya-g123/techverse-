"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { testDatabaseConnection } from "@/lib/inquiries"

export default function DatabaseTest() {
  const [status, setStatus] = useState<string>("Not tested")
  const [testing, setTesting] = useState(false)

  const testConnection = async () => {
    setTesting(true)
    try {
      const isConnected = await testDatabaseConnection()
      setStatus(isConnected ? "✅ Database connection successful!" : "❌ Database connection failed")
    } catch (error: any) {
      setStatus(`❌ Connection failed: ${error.message}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="bg-slate-900 border-slate-700 max-w-md">
      <CardHeader>
        <CardTitle className="text-cyan-400">Database Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300">Status: {status}</p>
        <Button onClick={testConnection} disabled={testing} className="w-full">
          {testing ? "Testing..." : "Test Database Connection"}
        </Button>
      </CardContent>
    </Card>
  )
}
