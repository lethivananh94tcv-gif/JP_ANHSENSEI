-- Fix ease_factor column types in flashcard_progress and flashcard_review_logs to NUMERIC(5,2)
ALTER TABLE flashcard_progress ALTER COLUMN ease_factor TYPE NUMERIC(5,2) USING ease_factor::numeric(5,2);
ALTER TABLE flashcard_review_logs ALTER COLUMN previous_ease_factor TYPE NUMERIC(5,2) USING previous_ease_factor::numeric(5,2);
ALTER TABLE flashcard_review_logs ALTER COLUMN new_ease_factor TYPE NUMERIC(5,2) USING new_ease_factor::numeric(5,2);
