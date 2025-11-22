# Fix: Event Creation Error - Missing user_id Column

## Error Message
```
Error creating event: – Object
code: "PGRST204"
message: "Could not find the 'user_id' column of 'events' in the schema cache"
```

## Problem
The `events` table in your Supabase database is missing the `user_id` column. This column is required for:
1. Multi-user support (each user has their own events)
2. Row Level Security (RLS) to work properly
3. The frontend to create events with proper authentication

## Solution

### Step 1: Add user_id Column to Database

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: `zadluwuwmvlylfnxdmvf`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Add user_id column to events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
```

**Note:** We're NOT adding a foreign key constraint to `auth.users` since that table is managed by Supabase Auth and may have restrictions. The column will work perfectly fine without it!

6. Click **Run** (or press Cmd+Enter)
7. You should see: `Success. No rows returned`

### Step 2: Test Event Creation

1. Go back to your website
2. Click "Create Event"
3. Fill in all the details:
   - Event name
   - Date and venue
   - Upload guest list CSV
   - Set invitation message
   - Set scheduling dates
4. Click "Launch Event"
5. You should see: ✅ **"Event Launched!"**

---

## What This Does

### user_id Column
- **Type**: UUID (matches Supabase Auth user IDs)
- **Purpose**: Links each event to the user who created it
- **Nullable**: Yes (allows existing events, if any)
- **No Foreign Key**: We don't add a foreign key to avoid conflicts with Supabase's auth schema

### Index
- **Purpose**: Speeds up queries like `WHERE user_id = '...'`
- **Used by**: Events list page, dashboard, RLS policies
- **Performance**: Makes filtering by user much faster

---

## How It Works Now

### Before (Broken):
```typescript
// Frontend tries to create event with user_id
await api.events.create({
  name: "My Event",
  user_id: "abc-123-def" // ❌ Column doesn't exist
})

// Database rejects: "user_id column not found"
```

### After (Fixed):
```typescript
// Frontend creates event with user_id
await api.events.create({
  name: "My Event",
  user_id: "abc-123-def" // ✅ Column exists
})

// Database accepts and stores user_id
// User can now see their own events
```

---

## Verification Steps

After running the SQL:

1. **Check column exists:**
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'events' 
   AND column_name = 'user_id';
   ```
   Should return: `user_id | uuid`

2. **Create a test event:**
   - Go through event creation flow
   - Should succeed without errors

3. **View event in database:**
   ```sql
   SELECT event_id, name, user_id 
   FROM events 
   ORDER BY created_date DESC 
   LIMIT 5;
   ```
   Should show your events with user_id populated

---

## Next Steps (Optional)

### Enable RLS for Security

Once the `user_id` column is added, you can enable Row Level Security:

1. **Run RLS policies** (see `../RLS_POLICIES.sql`):
   - Users can only see their own events
   - Users can only create events for themselves
   - Proper multi-user isolation

2. **Or keep RLS disabled** for development:
   - All users can see all events
   - Good for testing
   - Not secure for production

---

## Troubleshooting

### Error: "column already exists"
✅ Good! The column was already added. You can proceed.

### Error: "relation 'events' does not exist"
❌ The events table doesn't exist. Run your full database schema first.

### Events still show "400 error"
This is the RLS issue we fixed earlier. Make sure you ran:
```sql
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
```

### Can create events but can't see them
Run this to check if RLS is blocking:
```sql
SELECT * FROM events WHERE user_id = auth.uid();
```
If empty, your events might have NULL user_id. Enable RLS or filter by user_id.

---

## Summary

✅ **What we're fixing**: Missing `user_id` column causing event creation to fail

✅ **How to fix**: Run the SQL in `ADD_USER_ID_COLUMN.sql`

✅ **Expected result**: Events can be created successfully with user association

✅ **Time to fix**: < 1 minute

Run that SQL and you'll be able to create events! 🎉
