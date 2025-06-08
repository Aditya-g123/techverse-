-- Create a simple inquiries table that will definitely work
DROP TABLE IF EXISTS public.inquiries CASCADE;

-- Create the table with basic structure
CREATE TABLE public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows anyone to insert
CREATE POLICY "Enable insert for all users" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to read (you can restrict this later)
CREATE POLICY "Enable read for all users" ON public.inquiries
  FOR SELECT USING (true);

-- Insert a test record to verify it works
INSERT INTO public.inquiries (name, email, phone, message) 
VALUES ('Test User', 'test@example.com', '+91 9876543210', 'Test message from setup');

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
AND table_schema = 'public'
ORDER BY ordinal_position;
