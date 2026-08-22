-- Flyway Migration V22: Increase max_attempts for all quizzes to 100 for learner practice
UPDATE quizzes SET max_attempts = 100 WHERE quiz_id = 1;
