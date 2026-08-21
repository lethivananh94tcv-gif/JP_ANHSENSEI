-- Flyway Migration V3: Fix ip_address column type to VARCHAR(45) for JPA compatibility

ALTER TABLE refresh_tokens ALTER COLUMN ip_address TYPE VARCHAR(45) USING ip_address::text;
ALTER TABLE audit_logs ALTER COLUMN ip_address TYPE VARCHAR(45) USING ip_address::text;
