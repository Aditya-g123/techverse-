-- Create inquiry table with basic structure
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course_interest TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create basic indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Simple policies
CREATE POLICY "Enable insert for all users" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Enable update for authenticated users" ON inquiries FOR UPDATE USING (true);
