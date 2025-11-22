# Quick Fix: White Page on /events

## Problem
After Google sign-in, the `/events` page shows white/blank with this error:
```
Failed to load resource: the server responded with a status of 400 ()
Error fetching events: – Object
TypeError: e.split is not a function
```

## Root Cause
Row Level Security (RLS) is **enabled** on your Supabase tables but **no policies exist yet**. This blocks all queries from the frontend.

## Quick Fix (Option 1): Disable RLS Temporarily

### Steps:
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `zadluwuwmvlylfnxdmvf`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Disable RLS temporarily
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE event_status DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
```

6. Click **Run** (or press Cmd+Enter)
7. Refresh your website

✅ Your `/events` page should now load successfully!

---

## Proper Fix (Option 2): Enable RLS with Policies

For production security, you should enable RLS with proper policies:

### Steps:
1. Go to Supabase Dashboard → SQL Editor
2. Open the file `/Users/taliarosenkranz/Documents/GitHub/AriShmari/RLS_POLICIES.sql` on your computer
3. Copy all the SQL from that file
4. Paste it into a new query in Supabase SQL Editor
5. Click **Run**

This will:
- Enable RLS on all tables
- Create policies so users can only see their own events
- Allow authenticated users to create events with their user_id

### Testing:
After running the policies:
- Sign in to your app
- Try creating an event
- Check that you can only see your own events

---

## What is RLS?

Row Level Security (RLS) is a Supabase/PostgreSQL feature that:
- **Protects your data** - Users can only access their own data
- **Enforces access control** - SQL policies define who can read/write what
- **Works automatically** - No code changes needed in your app

Without RLS policies, **all queries are blocked by default** when RLS is enabled.

---

## Recommendation

For development/testing: **Use Option 1** (Disable RLS)
- Faster to get started
- Good for testing functionality
- No security concerns with test data

For production: **Use Option 2** (Enable RLS with policies)
- Proper security
- Multi-user support
- Production-ready

---

## Current Status

✅ Error handling added to Events page (shows friendly message if query fails)
⏳ Need to run SQL to fix database access

Choose an option above and run the SQL in your Supabase dashboard!
