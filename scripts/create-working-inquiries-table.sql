-- First, completely drop the table and start fresh
DROP TABLE IF EXISTS public.inquiries CASCADE;

-- Create the inquiries table with the exact structure we need
CREATE TABLE public.inquiries (
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

-- Create indexes
CREATE INDEX idx_inquiries_email ON public.inquiries(email);
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for all users" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for all users" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Enable update for all users" ON public.inquiries FOR UPDATE USING (true);

-- Test the table by inserting a record
INSERT INTO public.inquiries (name, email, phone, course_interest, message) 
VALUES ('Test User', 'test@example.com', '+91 9876543210', 'Web Development', 'Test message');

-- Verify the table structure
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'inquiries' AND table_schema = 'public' 
ORDER BY ordinal_position;
