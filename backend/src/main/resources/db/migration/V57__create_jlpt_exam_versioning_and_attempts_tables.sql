-- V57: Create JLPT Exam Versioning, 5-State Admin Workflow Status & Attempt Tables

-- 1. JLPT Exams Parent Table
CREATE TABLE IF NOT EXISTS jlpt_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    level_code VARCHAR(10) NOT NULL, -- N5, N4, N3
    year_session VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    current_published_version_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. JLPT Exam Versions Table (Versioning & 5-stage Status Lifecycle)
-- Status: DRAFT -> AI_GENERATED -> ADMIN_REVIEW -> APPROVED -> PUBLISHED
CREATE TABLE IF NOT EXISTS jlpt_exam_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES jlpt_exams(id) ON DELETE CASCADE,
    version_number INT NOT NULL DEFAULT 1,
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    pdf_url TEXT NOT NULL,
    audio_url TEXT,
    duration_minutes INT NOT NULL DEFAULT 105,
    change_log TEXT,
    created_by BIGINT REFERENCES users(user_id),
    approved_by BIGINT REFERENCES users(user_id),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_exam_version UNIQUE (exam_id, version_number)
);

-- 3. JLPT Exam Questions Snapshot Table
CREATE TABLE IF NOT EXISTS jlpt_exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_version_id UUID NOT NULL REFERENCES jlpt_exam_versions(id) ON DELETE CASCADE,
    global_index INT NOT NULL,
    local_pdf_number INT NOT NULL,
    section_type VARCHAR(30) NOT NULL, -- VOCAB, GRAMMAR, LISTENING
    question_snippet TEXT,
    correct_option INT NOT NULL,
    option_text TEXT,
    explanation TEXT,
    audio_script TEXT, -- Japanese script + Vietnamese translation for Choukai
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_version_question UNIQUE (exam_version_id, global_index)
);

-- 4. JLPT Exam Attempts Table (Learner Historical Result)
CREATE TABLE IF NOT EXISTS jlpt_exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    exam_version_id UUID NOT NULL REFERENCES jlpt_exam_versions(id) ON DELETE CASCADE,
    total_score INT NOT NULL,
    vocab_score INT NOT NULL,
    grammar_score INT NOT NULL,
    listening_score INT NOT NULL,
    is_pass BOOLEAN NOT NULL,
    time_spent_seconds INT NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(30) NOT NULL DEFAULT 'IN_PROGRESS',
    questions_snapshot_json JSONB,
    user_answers_json JSONB
);

CREATE INDEX IF NOT EXISTS idx_jlpt_exams_level ON jlpt_exams(level_code);
CREATE INDEX IF NOT EXISTS idx_jlpt_versions_exam ON jlpt_exam_versions(exam_id);
CREATE INDEX IF NOT EXISTS idx_jlpt_attempts_user ON jlpt_exam_attempts(user_id);

ALTER TABLE jlpt_exam_attempts ALTER COLUMN questions_snapshot_json TYPE JSONB USING questions_snapshot_json::jsonb;
ALTER TABLE jlpt_exam_attempts ALTER COLUMN user_answers_json TYPE JSONB USING user_answers_json::jsonb;

