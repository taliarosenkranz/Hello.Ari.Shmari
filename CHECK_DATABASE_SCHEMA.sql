-- ========================================
-- QUERY DATABASE SCHEMA
-- Run this in Supabase SQL Editor to see your actual database structure
-- ========================================

-- 1. LIST ALL TABLES
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- ========================================
-- 2. EVENTS TABLE - Show all columns
-- ========================================

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'events'
ORDER BY ordinal_position;

-- ========================================
-- 3. GUESTS TABLE - Show all columns
-- ========================================

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'guests'
ORDER BY ordinal_position;

-- ========================================
-- 4. EVENT_STATUS TABLE - Show all columns
-- ========================================

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'event_status'
ORDER BY ordinal_position;

-- ========================================
-- 5. MESSAGES TABLE - Show all columns
-- ========================================

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'messages'
ORDER BY ordinal_position;

-- ========================================
-- 6. CHECK IF USER_ID COLUMN EXISTS
-- ========================================

SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND column_name = 'user_id';

-- ========================================
-- 7. CHECK FOR INVITATION-RELATED COLUMNS IN GUESTS
-- ========================================

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'guests'
    AND column_name LIKE '%invitation%';

-- ========================================
-- 8. SAMPLE DATA - Check if any events exist
-- ========================================

SELECT COUNT(*) as total_events FROM events;
SELECT COUNT(*) as total_guests FROM guests;
SELECT COUNT(*) as total_event_status FROM event_status;

-- ========================================
-- INSTRUCTIONS:
-- 1. Go to Supabase Dashboard > SQL Editor
-- 2. Copy this entire file and paste it
-- 3. Click Run or press Cmd+Enter
-- 4. Review the results to see your actual database structure
-- ========================================
