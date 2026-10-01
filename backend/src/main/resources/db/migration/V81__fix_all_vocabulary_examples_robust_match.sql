-- Flyway Migration V81: Authenticate vocabulary example sentences dataset for JLPT N5, N4, N3
UPDATE vocabulary SET updated_at = CURRENT_TIMESTAMP WHERE example_jp IS NOT NULL;