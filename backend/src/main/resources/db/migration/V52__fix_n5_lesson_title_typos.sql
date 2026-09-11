-- Flyway Migration V52: Fix minor typos in N5 Lesson titles (Bài 6 & Bài 18)

UPDATE lessons 
SET title = 'Bài 6: Hành động & Ngoại động từ (～をします / ～を買います)'
WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6;

UPDATE lessons 
SET title = 'Bài 18: Thể Nguyên dạng & Khả năng (～ことができます / 趣味は～です)'
WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 18;
