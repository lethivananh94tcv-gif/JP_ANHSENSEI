-- Flyway Migration V4: Curriculum Schema Adjustments & Optimistic Locking Version Columns

-- 1. Add version column for Optimistic Locking across core aggregate tables
ALTER TABLE levels ADD COLUMN IF NOT EXISTS version BIGINT NOT NULL DEFAULT 0;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS version BIGINT NOT NULL DEFAULT 0;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS version BIGINT NOT NULL DEFAULT 0;
ALTER TABLE kanji ADD COLUMN IF NOT EXISTS version BIGINT NOT NULL DEFAULT 0;
ALTER TABLE grammar_points ADD COLUMN IF NOT EXISTS version BIGINT NOT NULL DEFAULT 0;

-- 2. Partial unique indexes excluding ARCHIVED items
DROP INDEX IF EXISTS uq_levels_sort_active;
CREATE UNIQUE INDEX IF NOT EXISTS uq_levels_sort_active_status
    ON levels(sort_order) WHERE status <> 'ARCHIVED' AND deleted_at IS NULL;

DROP INDEX IF EXISTS uq_lessons_level_sort_active;
CREATE UNIQUE INDEX IF NOT EXISTS uq_lessons_level_sort_status
    ON lessons(level_id, sort_order) WHERE status <> 'ARCHIVED' AND deleted_at IS NULL;

-- 3. Unique index for examples sort_order per content
CREATE UNIQUE INDEX IF NOT EXISTS uq_examples_content_sort
    ON examples(content_type, content_id, sort_order);
