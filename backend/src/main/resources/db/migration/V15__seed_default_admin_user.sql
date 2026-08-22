-- Flyway Migration V15: Seed default ADMIN user for local & staging administration
INSERT INTO users (email, password_hash, full_name, role_id, status, target_level, timezone)
SELECT 
    'admin@anhsensei.com',
    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', -- BCrypt hash of 'AdminPass123!'
    'Quản Trị Viên ANH SENSEI',
    (SELECT role_id FROM roles WHERE role_name = 'ADMIN' LIMIT 1),
    'ACTIVE',
    'N5',
    'Asia/Ho_Chi_Minh'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@anhsensei.com'
);
