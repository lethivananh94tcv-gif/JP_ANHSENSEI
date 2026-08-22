-- Flyway Migration V20: Automatically publish all draft vocabulary, kanji, grammar, and quizzes for published lessons

UPDATE vocabulary SET status = 'PUBLISHED', published_at = COALESCE(published_at, NOW()) WHERE status = 'DRAFT' AND deleted_at IS NULL;
UPDATE kanji SET status = 'PUBLISHED', published_at = COALESCE(published_at, NOW()) WHERE status = 'DRAFT' AND deleted_at IS NULL;
UPDATE grammar_points SET status = 'PUBLISHED', published_at = COALESCE(published_at, NOW()) WHERE status = 'DRAFT' AND deleted_at IS NULL;
UPDATE quizzes SET status = 'PUBLISHED', published_at = COALESCE(published_at, NOW()) WHERE status = 'DRAFT' AND deleted_at IS NULL;
