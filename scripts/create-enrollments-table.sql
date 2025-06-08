-- Create enrollments table to track user course enrollments
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  course_name TEXT NOT NULL,
  course_price DECIMAL(10,2) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_link TEXT,
  payment_reference TEXT,
  discount_applied BOOLEAN DEFAULT FALSE,
  discount_code TEXT,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_payment_status ON public.enrollments(payment_status);
CREATE INDEX IF NOT EXISTS idx_enrollments_enrolled_at ON public.enrollments(enrolled_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON public.enrollments;

-- Create RLS policies
-- Users can view their own enrollments
CREATE POLICY "Users can view their own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own enrollments
CREATE POLICY "Users can insert their own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own enrollments
CREATE POLICY "Users can update their own enrollments" ON public.enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view all enrollments (you can modify this based on your admin setup)
CREATE POLICY "Admins can view all enrollments" ON public.enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@techverse.com' -- Replace with your admin email
    )
  );

-- Admins can manage all enrollments
CREATE POLICY "Admins can manage all enrollments" ON public.enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'aadigupta2356@gmail.com' -- Replace with your admin email
    )
  );
