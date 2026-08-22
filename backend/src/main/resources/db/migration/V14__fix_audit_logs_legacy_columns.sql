-- Flyway Migration V14: Drop NOT NULL constraints on legacy user_id, created_by, updated_by in audit_logs
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'audit_logs' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE audit_logs ALTER COLUMN user_id DROP NOT NULL;
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'audit_logs' AND column_name = 'created_by'
    ) THEN
        ALTER TABLE audit_logs ALTER COLUMN created_by DROP NOT NULL;
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'audit_logs' AND column_name = 'updated_by'
    ) THEN
        ALTER TABLE audit_logs ALTER COLUMN updated_by DROP NOT NULL;
    END IF;
END $$;
