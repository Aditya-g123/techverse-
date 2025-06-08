-- Alternative approach: Add missing column if table exists
DO $$ 
BEGIN
    -- Check if course_interest column exists, if not add it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inquiries' 
        AND column_name = 'course_interest'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.inquiries ADD COLUMN course_interest TEXT;
    END IF;
    
    -- Check if other columns exist and add them if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inquiries' 
        AND column_name = 'phone'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.inquiries ADD COLUMN phone TEXT;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inquiries' 
        AND column_name = 'message'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.inquiries ADD COLUMN message TEXT;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inquiries' 
        AND column_name = 'source'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.inquiries ADD COLUMN source TEXT DEFAULT 'website';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inquiries' 
        AND column_name = 'status'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.inquiries ADD COLUMN status TEXT DEFAULT 'new';
    END IF;
END $$;
