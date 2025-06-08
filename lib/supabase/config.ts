export function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return !!(supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 0)
}

export function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ovsjphatiwxggmvbdpas.supabase.co",
    anonKey:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2pwaGF0aXd4Z2dtdmJkcGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDgzODEsImV4cCI6MjA2MzQ4NDM4MX0.6_uwzsfJilbISS6zVqvBsBP3JUfS1WYVXD_xTdRq1kg",
    isConfigured: isSupabaseConfigured(),
  }
}
