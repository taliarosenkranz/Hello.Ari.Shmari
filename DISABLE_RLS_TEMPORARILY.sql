-- TEMPORARY FIX: Disable RLS to allow app to work
-- This allows any authenticated user to access all data
-- For production, use the RLS_POLICIES.sql in the parent directory

-- Disable RLS on all tables
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE event_status DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- Note: To re-enable RLS later and add proper policies, run:
-- 1. Enable RLS: ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
-- 2. Run the ../RLS_POLICIES.sql script
