-- Migration V10: Ensure all 5 JLPT levels (N5, N4, N3, N2, N1) exist in database

INSERT INTO levels(code, name, description, sort_order, status, version)
SELECT 'N5', 'JLPT N5', 'Trình độ nhập môn N5', 1, 'PUBLISHED', 0
WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N5');

INSERT INTO levels(code, name, description, sort_order, status, version)
SELECT 'N4', 'JLPT N4', 'Trình độ sơ cấp N4', 2, 'PUBLISHED', 0
WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N4');

INSERT INTO levels(code, name, description, sort_order, status, version)
SELECT 'N3', 'JLPT N3', 'Trình độ trung cấp N3', 3, 'PUBLISHED', 0
WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N3');

INSERT INTO levels(code, name, description, sort_order, status, version)
SELECT 'N2', 'JLPT N2', 'Trình độ trung cao cấp N2', 4, 'PUBLISHED', 0
WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N2');

INSERT INTO levels(code, name, description, sort_order, status, version)
SELECT 'N1', 'JLPT N1', 'Trình độ cao cấp N1', 5, 'PUBLISHED', 0
WHERE NOT EXISTS (SELECT 1 FROM levels WHERE code = 'N1');
