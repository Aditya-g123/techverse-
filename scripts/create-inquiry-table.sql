-- Create inquiry table to store form submissions
CREATE TABLE IF NOT EXISTS public.inquiries (
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
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert inquiries (for the contact form)
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Only admins can view inquiries
CREATE POLICY "Admins can view all inquiries" ON public.inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'aadigupta2356@gmail.com' -- Replace with your admin email
    )
  );

-- Only admins can update inquiries
CREATE POLICY "Admins can update inquiries" ON public.inquiries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'aadigupta2356@gmail.com' -- Replace with your admin email
    )
  );
