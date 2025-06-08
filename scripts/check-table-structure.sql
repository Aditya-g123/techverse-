-- Check if the inquiries table exists and its structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- If the table doesn't exist, this will return no rows
-- If it exists but missing columns, you'll see which columns are present
