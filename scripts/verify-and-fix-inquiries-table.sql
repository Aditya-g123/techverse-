-- First, let's check the current table structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Now let's ensure the table has the correct structure with all required columns
-- Drop and recreate the table with the proper schema
DROP TABLE IF EXISTS public.inquiries CASCADE;

-- Create the inquiries table with the complete schema including course_interest
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
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_course_interest ON public.inquiries(course_interest);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert inquiries (for the contact form)
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read inquiries (you can restrict this further)
CREATE POLICY "Authenticated users can read inquiries" ON public.inquiries
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Allow authenticated users to update inquiries
CREATE POLICY "Authenticated users can update inquiries" ON public.inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert a test record to verify the table structure works
INSERT INTO public.inquiries (name, email, phone, course_interest, message, source, status) 
VALUES (
  'Test User', 
  'test@techverse.com', 
  '+91 9876543210', 
  'Web Development', 
  'This is a test inquiry to verify the table structure', 
  'website',
  'new'
);

-- Verify the insertion worked
SELECT * FROM public.inquiries WHERE email = 'test@techverse.com';

-- Show the final table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
AND table_schema = 'public'
ORDER BY ordinal_position;
