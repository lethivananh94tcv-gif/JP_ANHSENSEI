-- Fix flashcard content_id column type to BIGINT
ALTER TABLE flashcard_progress ALTER COLUMN content_id TYPE BIGINT USING content_id::bigint;
ALTER TABLE flashcard_review_logs ALTER COLUMN content_id TYPE BIGINT USING content_id::bigint;
