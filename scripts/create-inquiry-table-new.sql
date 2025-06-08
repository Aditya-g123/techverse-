-- Drop the table if it exists to recreate with correct structure
DROP TABLE IF EXISTS public.inquiries;

-- Create inquiry table for the new Supabase project with all required columns
CREATE TABLE public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course_interest TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_inquiries_email ON public.inquiries(email);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can update inquiries" ON public.inquiries;

-- Create policies for the new project
-- Allow anyone to insert inquiries (for the contact form)
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read inquiries (you can restrict this later)
CREATE POLICY "Anyone can read inquiries" ON public.inquiries
  FOR SELECT USING (true);

-- Allow anyone to update inquiries (you can restrict this later)
CREATE POLICY "Anyone can update inquiries" ON public.inquiries
  FOR UPDATE USING (true);

-- Insert a test record to verify the table structure
INSERT INTO public.inquiries (name, email, phone, course_interest, message, source) 
VALUES ('Test User', 'test@example.com', '+91 9876543210', 'Web Development', 'This is a test inquiry', 'website');
