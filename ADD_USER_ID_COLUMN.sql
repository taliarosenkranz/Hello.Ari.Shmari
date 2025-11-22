-- Add user_id column to events table for multi-user support
-- This allows each user to have their own events

-- Step 1: Add user_id column (nullable to allow existing data)
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- Step 2: Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);

-- Step 3: Add foreign key constraint to auth.users
-- This ensures data integrity: user_id must be a valid user
-- If you get an error, it means auth.users doesn't exist yet (shouldn't happen with Supabase Auth)
ALTER TABLE events 
ADD CONSTRAINT fk_events_user_id 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Note: ON DELETE CASCADE means if a user is deleted, their events are automatically deleted too
-- This keeps your database clean and prevents orphaned events

-- Optional: Update existing events to have a user_id (if any exist)
-- You can get your user ID from: SELECT id FROM auth.users;
-- Then run: UPDATE events SET user_id = 'YOUR_USER_ID_HERE' WHERE user_id IS NULL;

-- After adding this column, you can enable RLS with proper policies
-- See ../RLS_POLICIES.sql for the full security setup
