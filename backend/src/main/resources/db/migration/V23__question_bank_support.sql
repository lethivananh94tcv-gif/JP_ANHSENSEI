-- Flyway Migration V23: Add Question Bank configuration columns and update option sort orders
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS questions_per_attempt INT DEFAULT 15;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS shuffle_questions BOOLEAN DEFAULT TRUE;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS shuffle_options BOOLEAN DEFAULT TRUE;

-- Update Quiz #1 settings
UPDATE quizzes 
SET questions_per_attempt = 5, 
    shuffle_questions = TRUE, 
    shuffle_options = TRUE 
WHERE quiz_id = 1;

-- Redistribute correct options in question_options for questions 2, 3, 4, 5 so option A is not always correct
UPDATE question_options SET is_correct = FALSE WHERE question_id IN (2, 3, 4, 5);

-- Question 2: Correct option is 'Tôi' (option_id 5) -> sort_order = 3
UPDATE question_options SET is_correct = TRUE WHERE option_id = 5;

-- Question 3: Correct option is 'アメリカ (Mỹ)' (option_id 9) -> sort_order = 2
UPDATE question_options SET is_correct = TRUE WHERE option_id = 9;

-- Question 4: Correct option is 'だれ (Ai)' (option_id 13) -> sort_order = 4
UPDATE question_options SET is_correct = TRUE WHERE option_id = 13;

-- Question 5: Correct option is 'はじめまして' (option_id 17) -> sort_order = 2
UPDATE question_options SET is_correct = TRUE WHERE option_id = 17;
