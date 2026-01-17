-- ========================================
-- CHECK AND FIX GUEST_ID AUTO-GENERATION
-- ========================================

-- 1. CHECK CURRENT GUEST_ID SETUP
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'guests' 
    AND column_name = 'guest_id';

-- Expected result:
-- guest_id | uuid | gen_random_uuid() | NO

-- ========================================
-- 2. CHECK CURRENT GUESTS IN DATABASE
-- ========================================

SELECT 
    guest_id,
    name,
    phone_number,
    event_id
FROM guests
ORDER BY created_date DESC
LIMIT 5;

-- ========================================
-- 3. FIX: Make guest_id use UUID with auto-generation
-- ========================================

-- ONLY RUN THIS IF guest_id is INTEGER (not UUID)
-- This will:
-- 1. Back up existing data
-- 2. Change guest_id to UUID
-- 3. Set default to gen_random_uuid()

-- UNCOMMENT THESE LINES IF NEEDED:

-- -- Backup existing guests (optional)
-- CREATE TABLE IF NOT EXISTS guests_backup AS SELECT * FROM guests;

-- -- If guest_id is INTEGER, we need to recreate it as UUID
-- -- WARNING: This will delete existing guests! Only do if testing.
-- -- For production, you'd need a more complex migration.
-- DROP TABLE IF EXISTS guests CASCADE;
-- 
-- CREATE TABLE guests (
--     guest_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     event_id UUID NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
--     name TEXT NOT NULL,
--     phone_number TEXT NOT NULL,
--     rsvp_status TEXT DEFAULT 'pending',
--     messaging_preference TEXT DEFAULT 'whatsapp',
--     invitation_received BOOLEAN DEFAULT false,
--     created_date TIMESTAMPTZ DEFAULT NOW(),
--     updated_date TIMESTAMPTZ DEFAULT NOW()
-- );

-- ========================================
-- 4. ALTERNATIVE: Just delete test data and keep UUID
-- ========================================

-- If you just want to clear test data and start fresh:
-- UNCOMMENT TO DELETE ALL GUESTS:
-- DELETE FROM guests;

-- UNCOMMENT TO DELETE ALL EVENTS (and their guests via CASCADE):
-- DELETE FROM events;
-- DELETE FROM event_status;

-- ========================================
-- 5. VERIFY FIX
-- ========================================

-- After making changes, verify guest_id is UUID with default:
-- SELECT 
--     column_name,
--     data_type,
--     column_default
-- FROM information_schema.columns
-- WHERE table_name = 'guests' AND column_name = 'guest_id';

-- Expected: 
-- guest_id | uuid | gen_random_uuid()

-- ========================================
-- RECOMMENDATION
-- ========================================

/*
SAFE APPROACH FOR TESTING:

1. First run section 1 and 2 to see current state
2. If guest_id is INTEGER (not UUID), and you have only test data:
   - Uncomment the DELETE commands in section 4
   - Run them to clear test data
   - Then recreate table with UUID in section 3
   
3. If guest_id is already UUID:
   - Just clear test data with DELETE commands
   - No need to recreate table

4. After cleaning, try creating event again
*/
