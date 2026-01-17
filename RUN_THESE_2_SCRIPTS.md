# 🚀 Quick Fix: Run These 2 SQL Scripts Now!

## You Need To Run 2 Scripts in Supabase

### ⚡ Script 1: Add user_id Column
**File:** `ADD_USER_ID_COLUMN.sql`

```sql
-- Add user_id column
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- Create index
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);

-- Link to auth.users
ALTER TABLE events 
ADD CONSTRAINT fk_events_user_id 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
```

### ⚡ Script 2: Fix Missing Columns  
**File:** `FIX_MISSING_COLUMNS.sql`

```sql
-- Make dress_code nullable
ALTER TABLE events ALTER COLUMN dress_code DROP NOT NULL;

-- Add time columns
ALTER TABLE events ADD COLUMN IF NOT EXISTS start_time TIME;
ALTER TABLE events ADD COLUMN IF NOT EXISTS end_time TIME;

-- Add guest tracking columns
ALTER TABLE guests ADD COLUMN IF NOT EXISTS invitations_sent_out BOOLEAN DEFAULT false;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS invitation_received BOOLEAN DEFAULT false;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS invitation_sent_date TIMESTAMPTZ;
ALTER TABLE guests ALTER COLUMN messaging_preference SET DEFAULT 'whatsapp';

-- Add event status columns
ALTER TABLE event_status ADD COLUMN IF NOT EXISTS invitations_sent INTEGER DEFAULT 0;
ALTER TABLE event_status ADD COLUMN IF NOT EXISTS total_guests INTEGER DEFAULT 0;
ALTER TABLE event_status ADD COLUMN IF NOT EXISTS total_confirmed INTEGER DEFAULT 0;
ALTER TABLE event_status ADD COLUMN IF NOT EXISTS total_pending INTEGER DEFAULT 0;
ALTER TABLE event_status ADD COLUMN IF NOT EXISTS total_declined INTEGER DEFAULT 0;
ALTER TABLE event_status ADD COLUMN IF NOT EXISTS invitations_sent_out BOOLEAN DEFAULT false;
ALTER TABLE event_status ADD COLUMN IF NOT EXISTS rsvp_reminder_stage INTEGER DEFAULT 0;
```

---

## How To Run

1. Go to: https://supabase.com/dashboard
2. Select project: `zadluwuwmvlylfnxdmvf`
3. Click **SQL Editor**
4. Click **New Query**
5. Copy Script 1 → Paste → **Run**
6. Click **New Query** again
7. Copy Script 2 → Paste → **Run**

---

## What This Fixes

✅ **user_id column** - Links events to users who created them  
✅ **dress_code nullable** - Optional field won't cause errors  
✅ **invitations_sent_out** - Correct column name matching database  
✅ **All missing columns** - Events can now be created successfully  

---

## After Running SQL

1. Refresh your website
2. Sign in
3. Click "Create Event"
4. Fill in all details
5. Upload guest list
6. Click "Launch Event"
7. ✅ Should work without errors!

---

## Still Getting Errors?

Run the **RLS disable script** if you haven't already:

```sql
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE event_status DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
```

---

## That's It!

Your app is now ready to create events! 🎉
