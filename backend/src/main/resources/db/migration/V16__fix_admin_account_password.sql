-- Flyway Migration V16: Reset default admin account password hash and active status
UPDATE users 
SET 
    password_hash = '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xD00DMxs.AQ840/a', -- BCrypt for 'AdminPass123!'
    status = 'ACTIVE',
    failed_login_count = 0,
    lock_until = NULL
WHERE email = 'admin@anhsensei.com';
