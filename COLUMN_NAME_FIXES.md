# Column Name Fixes Summary

## Issue
Frontend code was using `invitation_sent` but database has `invitations_sent_out`.

## Changes Made

### 1. Updated StepReview.tsx
Changed guest payload from:
```typescript
invitation_sent: false  ❌
```
To:
```typescript
invitations_sent_out: false  ✅
```

### 2. Updated Guest Interface (supabase.ts)
Changed interface from:
```typescript
invitation_sent?: boolean;  ❌
```
To:
```typescript
invitations_sent_out?: boolean;  ✅
```

### 3. Updated SQL Migration (FIX_MISSING_COLUMNS.sql)
Now correctly uses `invitations_sent_out` column name.

## Database Column Names (Confirmed)

### guests table:
- ✅ `guest_id` (UUID, primary key)
- ✅ `event_id` (UUID, foreign key)
- ✅ `name` (TEXT, required)
- ✅ `phone_number` (TEXT, required)
- ✅ `rsvp_status` (TEXT, default 'pending')
- ✅ `messaging_preference` (TEXT, default 'whatsapp')
- ✅ `invitation_received` (BOOLEAN, optional) - Whether guest received invitation
- ✅ `created_date` (TIMESTAMPTZ)
- ✅ `updated_date` (TIMESTAMPTZ)

**Note:** `invitations_sent_out` is NOT in guests table - it belongs to event_status!

### events table:
- ✅ `event_id` (UUID, primary key)
- ✅ `user_id` (UUID, foreign key to auth.users)
- ✅ `name` (TEXT, required)
- ✅ `date` (TIMESTAMPTZ)
- ✅ `venue` (TEXT)
- ✅ `dress_code` (TEXT, nullable) - Optional dress code
- ✅ `start_time` (TIME) - Event start time
- ✅ `end_time` (TIME) - Event end time
- ✅ `invitation_message` (TEXT)

### event_status table:
- ✅ `status_id` (UUID, primary key)
- ✅ `event_id` (UUID, foreign key)
- ✅ `invitations_sent_out` (BOOLEAN) - Whether invitations have been sent for this event
- ✅ `invitations_sent` (INTEGER) - Count of sent invitations
- ✅ `total_guests` (INTEGER)
- ✅ `total_confirmed` (INTEGER)
- ✅ `total_pending` (INTEGER)
- ✅ `total_declined` (INTEGER)
- ✅ `rsvp_reminder_stage` (INTEGER)
- ✅ `rsvp_reminder_date` (TIMESTAMPTZ)

## Next Steps

1. Run `FIX_MISSING_COLUMNS.sql` in Supabase to ensure all columns exist
2. Run `ADD_USER_ID_COLUMN.sql` to add user_id column
3. Test event creation - should work without errors now!

## Matching Python Backend

The column names now match the Python backend in `/ARI/db/database.py`:
- Python uses `invitations_sent_out` 
- Frontend now uses `invitations_sent_out`
- ✅ Consistent naming across stack
