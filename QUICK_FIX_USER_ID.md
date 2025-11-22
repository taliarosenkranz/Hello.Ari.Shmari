# Quick Fix: Run This SQL Now! 🚀

## The Problem
You're getting this error when trying to create an event:
```
"Could not find the 'user_id' column of 'events' in the schema cache"
```

## The 30-Second Fix

### Copy This SQL:
```sql
-- Add user_id column
ALTER TABLE events ADD COLUMN IF NOT EXISTS user_id UUID;

-- Create index for fast queries
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);

-- Link to auth.users table (ensures valid user IDs)
ALTER TABLE events 
ADD CONSTRAINT fk_events_user_id 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
```

### Run It Here:
1. Go to: https://supabase.com/dashboard
2. Select your project: `zadluwuwmvlylfnxdmvf`
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Paste the SQL above
6. Click **Run** or press `Cmd+Enter`

### Done! ✅
Now go back to your app and try creating an event. It should work!

---

## What This Does
- Adds a `user_id` column to store which user created each event
- Creates an index to make queries faster
- Takes ~1 second to run

## That's It!
Your app is now ready to create events with user authentication. 🎉

---

## More Details
For full explanation, see: `FIX_USER_ID_COLUMN.md`
