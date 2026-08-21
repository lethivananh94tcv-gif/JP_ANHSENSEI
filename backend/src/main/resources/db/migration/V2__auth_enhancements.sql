-- Flyway Migration V2: Auth Enhancements and Constraints

CREATE INDEX IF NOT EXISTS ix_email_verification_tokens_user 
    ON email_verification_tokens(user_id, expires_at) WHERE used_at IS NULL;

CREATE INDEX IF NOT EXISTS ix_password_reset_tokens_user 
    ON password_reset_tokens(user_id, expires_at) WHERE used_at IS NULL;

CREATE INDEX IF NOT EXISTS ix_refresh_tokens_family 
    ON refresh_tokens(token_family);
