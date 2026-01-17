# How to Check Your Database Schema

## Option 1: Use Supabase Dashboard (EASIEST) ✅

1. Go to: https://supabase.com/dashboard
2. Select your project: `zadluwuwmvlylfnxdmvf`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Open the file: `CHECK_DATABASE_SCHEMA.sql`
6. Copy ALL the SQL and paste it into the editor
7. Click **Run** or press `Cmd+Enter`
8. Scroll through the results to see:
   - All table names
   - All columns in each table
   - Data types
   - Whether columns are nullable
   - Default values

---

## Option 2: Use Terminal (Advanced)

If you want to query from the terminal, you need your database password.

### Get Your Database Password:
1. Go to Supabase Dashboard
2. Click **Project Settings** (gear icon)
3. Click **Database** in the left menu
4. Find **Database Password** section
5. Copy or reset your password

### Run the Query:
```bash
# Set your password (replace with actual password)
export PGPASSWORD='your-database-password-here'

# Run the schema check script
./check_database_schema.sh
```

---

## What You'll See

### Tables List:
```
events
guests
event_status
messages
```

### For Each Table:
```
column_name          | data_type | is_nullable | column_default
---------------------|-----------|-------------|---------------
event_id             | uuid      | NO          | gen_random_uuid()
name                 | text      | NO          | 
date                 | timestamp | YES         | NULL
venue                | text      | YES         | NULL
user_id              | uuid      | YES         | NULL
dress_code           | text      | YES         | NULL
...
```

---

## Key Things to Check

### ✅ Does `events` table have:
- `user_id` column?
- `dress_code` column (nullable)?
- `start_time` and `end_time` columns?

### ✅ Does `guests` table have:
- `invitations_sent_out` column?
- `invitation_received` column?
- `invitation_sent_date` column?

### ✅ Does `event_status` table have:
- `invitations_sent` column?
- `total_guests` column?
- `invitations_sent_out` column?

---

## After Checking Schema

Based on what you find, you'll know which SQL scripts to run:

1. **Missing `user_id`?** → Run `ADD_USER_ID_COLUMN.sql`
2. **Missing other columns?** → Run `FIX_MISSING_COLUMNS.sql`
3. **All columns exist?** → You're good to go! Just disable RLS.

---

## Pro Tip

Run `CHECK_DATABASE_SCHEMA.sql` first to see what you actually have, then only run the migration scripts for columns that are actually missing. This prevents errors from trying to add columns that already exist!
