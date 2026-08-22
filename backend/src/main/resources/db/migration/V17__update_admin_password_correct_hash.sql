-- Flyway Migration V17: Update admin account password hash with verified BCrypt hash
UPDATE users 
SET 
    password_hash = '$2a$10$B4x4C8aQZ.x1bLD8Yd87guckOf9c.d8tfenVChntCPRS3yajOzcv.', -- Verified Spring BCrypt for 'AdminPass123!'
    status = 'ACTIVE',
    failed_login_count = 0,
    lock_until = NULL
WHERE email = 'admin@anhsensei.com';
