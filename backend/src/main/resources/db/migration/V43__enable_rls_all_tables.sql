-- ============================================================
-- V43: Enable Row Level Security (RLS) on all application tables
-- Fixes Supabase Security Advisor "RLS Disabled in Public" warning
-- Excludes flyway_schema_history to prevent lock timeout during migration
-- ============================================================

DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
          AND tablename NOT IN ('flyway_schema_history')
    ) LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.tablename);
    END LOOP;
END $$;
