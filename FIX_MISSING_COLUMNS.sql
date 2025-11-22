-- Fix missing columns in events and guests tables
-- Run this in Supabase SQL Editor to fix schema mismatches

-- ============================================
-- EVENTS TABLE FIXES
-- ============================================

-- 1. Make dress_code nullable (frontend might not always provide it)
ALTER TABLE events 
ALTER COLUMN dress_code DROP NOT NULL;

-- 2. Add missing columns to events table (if they don't exist)
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS start_time TIME;

ALTER TABLE events 
ADD COLUMN IF NOT EXISTS end_time TIME;

-- ============================================
-- GUESTS TABLE FIXES
-- ============================================

-- 3. Ensure invitations_sent_out column exists (tracks if invitation was sent to this guest)
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS invitations_sent_out BOOLEAN DEFAULT false;

-- 4. Make sure invitation_received exists
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS invitation_received BOOLEAN DEFAULT false;

-- 5. Add invitation_sent_date column
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS invitation_sent_date TIMESTAMPTZ;

-- 6. Ensure messaging_preference has a default
ALTER TABLE guests 
ALTER COLUMN messaging_preference SET DEFAULT 'whatsapp';

-- ============================================
-- EVENT_STATUS TABLE FIXES
-- ============================================

-- 7. Ensure event_status table has all needed columns
ALTER TABLE event_status 
ADD COLUMN IF NOT EXISTS invitations_sent INTEGER DEFAULT 0;

ALTER TABLE event_status 
ADD COLUMN IF NOT EXISTS total_guests INTEGER DEFAULT 0;

ALTER TABLE event_status 
ADD COLUMN IF NOT EXISTS total_confirmed INTEGER DEFAULT 0;

ALTER TABLE event_status 
ADD COLUMN IF NOT EXISTS total_pending INTEGER DEFAULT 0;

ALTER TABLE event_status 
ADD COLUMN IF NOT EXISTS total_declined INTEGER DEFAULT 0;

ALTER TABLE event_status 
ADD COLUMN IF NOT EXISTS invitations_sent_out BOOLEAN DEFAULT false;

ALTER TABLE event_status 
ADD COLUMN IF NOT EXISTS rsvp_reminder_stage INTEGER DEFAULT 0;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Run these to verify the changes:

-- Check events table columns:
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'events' 
-- ORDER BY ordinal_position;

-- Check guests table columns:
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'guests' 
-- ORDER BY ordinal_position;

-- Check event_status table columns:
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'event_status' 
-- ORDER BY ordinal_position;
