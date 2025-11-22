# Verify auth.users Table Exists

## Quick Check

Run this in Supabase SQL Editor:

```sql
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;
```

### Expected Result:
```
id                                   | email                    | created_at
-------------------------------------|--------------------------|---------------------------
abc-123-def-456-xyz                  | your.email@gmail.com     | 2024-01-15 10:30:00
```

✅ **If you see your email** → auth.users exists! Proceed with the foreign key.

❌ **If you get "relation 'auth.users' does not exist"** → Supabase Auth not enabled yet.

---

## What is auth.users?

**`auth.users`** is Supabase's built-in table that stores:
- User IDs (UUID)
- Email addresses
- Authentication metadata
- OAuth provider info (Google, GitHub, etc.)

### It's Created Automatically When:
- You enable Email/Password auth
- You enable OAuth providers (Google, GitHub, etc.)
- A user signs up or logs in

### You Already Have It!
Since you successfully logged in with Google OAuth, the `auth.users` table already exists and contains your user record.

---

## Benefits of Foreign Key to auth.users

### 1. **Data Integrity**
```sql
-- This will FAIL if user_id doesn't exist in auth.users
INSERT INTO events (user_id, name) 
VALUES ('invalid-user-id', 'My Event');
-- Error: violates foreign key constraint
```

### 2. **Automatic Cleanup**
```sql
-- When a user is deleted from auth.users...
DELETE FROM auth.users WHERE id = 'abc-123';

-- ...their events are automatically deleted too (CASCADE)
-- No orphaned events left behind!
```

### 3. **Query Validation**
```sql
-- You can join events with user info
SELECT e.name, u.email 
FROM events e 
JOIN auth.users u ON e.user_id = u.id;
```

---

## The Complete SQL (With Foreign Key)

```sql
-- Add user_id column
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_events_user_id 
ON events(user_id);

-- Add foreign key for data integrity
ALTER TABLE events 
ADD CONSTRAINT fk_events_user_id 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
```

---

## What If Foreign Key Fails?

If you get an error like:
```
relation "auth.users" does not exist
```

Then just run the first two commands (skip the foreign key):
```sql
ALTER TABLE events ADD COLUMN IF NOT EXISTS user_id UUID;
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
```

Your app will still work fine, just without the automatic data integrity checks.

---

## Recommendation

✅ **Include the foreign key** - It's best practice and provides:
- Data integrity
- Automatic cleanup
- Better database design

The `auth.users` table already exists from your Google OAuth setup, so the foreign key will work! 🎉
