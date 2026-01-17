#!/bin/bash
# Query Supabase Database Schema
# This script will show all tables and their columns

# Supabase connection details
HOST="aws-0-us-east-1.pooler.supabase.com"
PORT="6543"
DATABASE="postgres"
USER="postgres.zadluwuwmvlylfnxdmvf"

echo "=========================================="
echo "QUERYING SUPABASE DATABASE SCHEMA"
echo "=========================================="
echo ""
echo "You will be prompted for your database password."
echo "Get it from: Supabase Dashboard > Project Settings > Database > Connection String"
echo ""

# SQL query to get all tables and their columns
SQL_QUERY="
-- List all tables in public schema
SELECT 
    table_name
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

\echo ''
\echo '=========================================='
\echo 'EVENTS TABLE STRUCTURE'
\echo '=========================================='

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'events'
ORDER BY ordinal_position;

\echo ''
\echo '=========================================='
\echo 'GUESTS TABLE STRUCTURE'
\echo '=========================================='

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'guests'
ORDER BY ordinal_position;

\echo ''
\echo '=========================================='
\echo 'EVENT_STATUS TABLE STRUCTURE'
\echo '=========================================='

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'event_status'
ORDER BY ordinal_position;

\echo ''
\echo '=========================================='
\echo 'MESSAGES TABLE STRUCTURE'
\echo '=========================================='

SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'messages'
ORDER BY ordinal_position;
"

# Connect and run query
echo "$SQL_QUERY" | PGPASSWORD="$PGPASSWORD" psql \
    -h "$HOST" \
    -p "$PORT" \
    -U "$USER" \
    -d "$DATABASE"
