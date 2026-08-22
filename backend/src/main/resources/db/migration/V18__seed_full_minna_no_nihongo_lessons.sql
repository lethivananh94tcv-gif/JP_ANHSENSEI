-- Flyway Migration V18: Seed complete 50 lessons of Minna no Nihongo curriculum (N5: Lesson 1-25 | N4: Lesson 26-50)

-- N5: Minna no Nihongo I (Bài 1 -> Bài 25)
INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 1: Giới thiệu bản thân & Chào hỏi (わたしは～です)', 'Giới thiệu tên, quốc tịch, nghề nghiệp, câu chào hỏi ban đầu.', 1, TRUE, 30, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 1);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 2: Đồ vật & Chỉ định từ (これ・それ・あれ)', 'Hỏi và trả lời về đồ vật xung quanh, quyền sở hữu đồ đạc.', 2, FALSE, 30, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 2);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 3: Nơi chốn & Phương hướng (ここ・そこ・あそこ)', 'Hỏi vị trí địa điểm, tầng lầu, xuất xứ sản phẩm và giá tiền.', 3, FALSE, 30, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 3);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 4: Thời gian & Giờ giấc (今～時です / ～から～まで)', 'Hỏi giờ, phút, thứ, ngày tháng và khung thời gian làm việc.', 4, FALSE, 35, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 4);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 5: Đi lại & Phương tiện (～へ行きます / ～で)', 'Di chuyển đi đâu, bằng phương tiện gì, đi cùng với ai.', 5, FALSE, 35, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 5);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 6: Hành động & Ngoại động từ (～をします / ～を買いま)', 'Diễn tả hành động ăn, uống, mua sắm và rủ rê cùng làm.', 6, FALSE, 35, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 6);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 7: Công cụ & Cho nhận quà (～で / あげます・もらいます)', 'Sử dụng công cụ/ngôn ngữ làm gì, hành động tặng/nhận quà.', 7, FALSE, 40, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 7);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 8: Tính từ & Miêu tả (い形容詞・な形容詞)', 'Miêu tả đặc điểm, tính chất của sự vật, người và nơi chốn.', 8, FALSE, 40, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 8);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 9: Sở thích & Năng lực (～が好きです / 分かります)', 'Bày tỏ sở thích, mức độ hiểu biết và lý do (から).', 9, FALSE, 40, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 9);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 10: Tồn tại & Vị trí (～があります / います)', 'Sự tồn tại của người, vật, động vật và vị trí không gian.', 10, FALSE, 40, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 10);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 11: Số lượng & Đếm (～つ / ～人 / ～回)', 'Cách đếm đồ vật, số người, thời gian và tần suất.', 11, FALSE, 45, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 11);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 12: Quá khứ & So sánh (～でした / ～より～)', 'Thì quá khứ của tính từ và các cấu trúc so sánh hơn/nhất.', 12, FALSE, 45, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 12);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 13: Mong muốn & Muốn làm (～が欲しいです / ～たいです)', 'Bày tỏ mong muốn có đồ vật hoặc muốn làm hành động gì.', 13, FALSE, 45, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 13);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 14: Thể Te & Nhờ vả (～てください / ～ています)', 'Cách chia thể Te, nhờ vả lịch sự và hành động đang diễn ra.', 14, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 14);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 15: Cho phép & Cấm đoán (～てもいいです / ～てはいけません)', 'Xin phép làm gì và cấu trúc cấm đoán không được làm.', 15, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 15);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 16: Trình tự hành động (～てから / ～は～が)', 'Nối các động từ theo trình tự và miêu tả đặc điểm chi tiết.', 16, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 16);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 17: Thể Nai & Bắt buộc (～ないでください / ～なければなりません)', 'Cách chia thể Nai, khuyên không làm và nghĩa vụ bắt buộc.', 17, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 17);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 18: Thể Nguyên dạng & Khả năng (～ことができます / 趣味は～です)', 'Thể từ điển (Jishokei), nói về khả năng và sở thích.', 18, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 18);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 19: Thể Ta & Kinh nghiệm (～たことがあります / ～たり～たり)', 'Cách chia thể Ta, nói về kinh nghiệm đã từng làm và liệt kê.', 19, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 19);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 20: Thể Thông thường (普通形 - Giao tiếp hàng ngày)', 'Chuyển đổi giữa thể Lịch sự (Masu) và thể Thông thường (Futsuu).', 20, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 20);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 21: Ý kiến & Trích dẫn (～と思います / ～と言いました)', 'Bày tỏ suy nghĩ cá nhân và trích dẫn lời nói người khác.', 21, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 21);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 22: Mệnh đề bổ nghĩa danh từ (名詞修飾)', 'Dùng mệnh đề động từ để bổ nghĩa chi tiết cho danh từ.', 22, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 22);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 23: Khi nào & Điều kiện tự nhiên (～とき / ～と)', 'Diễn tả thời điểm xảy ra hành động và kết quả tự nhiên.', 23, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 23);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 24: Cho nhận hành động (～てあげます / ～てもらいます)', 'Hành động làm giúp ai việc gì hoặc được ai làm giúp.', 24, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 24);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 25: Điều kiện Tara & Mặc dù (～たら / ～ても)', 'Giả định điều kiện nếu... thì... và quan hệ nhượng bộ mặc dù...', 25, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N5' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 25);


-- N4: Minna no Nihongo II (Bài 26 -> Bài 50)
INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 26: Giải thích lý do & Nhấn mạnh (～んです)', 'Dùng Ndesu để giải thích hoàn cảnh, lý do và yêu cầu lời khuyên.', 1, TRUE, 45, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 1);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 27: Động từ Khả năng (可能形)', 'Cách chia động từ thể khả năng (có thể làm gì).', 2, FALSE, 45, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 2);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 28: Vừa làm vừa & Thói quen (～ながら / ～し)', 'Thực hiện 2 hành động song song và liệt kê lý do tương đồng.', 3, FALSE, 45, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 3);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 29: Trạng thái kết quả & Hoàn thành (～ています / ～てしまいました)', 'Diễn tả trạng thái tự động từ và sự nuối tiếc lỡ làm gì.', 4, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 4);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 30: Chuẩn bị & Sắp đặt sẵn (～てあります / ～ておきます)', 'Trạng thái tha động từ có mục đích và hành động chuẩn bị sẵn.', 5, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 5);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 31: Ý định Volitional (意向形 / ～つもりです)', 'Cách chia thể Ý định và diễn tả dự định trong tương lai.', 6, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 6);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 32: Khuyên bảo & Suy đoán (～ほうがいいです / ～でしょう)', 'Đưa ra lời khuyên nên/không nên và phỏng đoán có lẽ.', 7, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 7);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 33: Mệnh lệnh & Cấm đoán (命令形 / 禁止形)', 'Chia thể Mệnh lệnh và thể Cấm đoán (dùng trong khẩn cấp/biển báo).', 8, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 8);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 34: Theo như & Sau khi (～とおりに / ～あとで)', 'Làm theo chỉ dẫn và trình tự hành động sau khi làm việc gì.', 9, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 9);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 35: Thể Điều kiện Ba (条件形 - ば)', 'Cách chia thể điều kiện Ba và mẫu câu càng... càng...', 10, FALSE, 50, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 10);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 36: Cố gắng & Thay đổi trạng thái (～ようにします / ～ようになります)', 'Cố gắng tạo thói quen và sự thay đổi khả năng từ không thành có.', 11, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 11);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 37: Thể Bị động Passive (受身形)', 'Cách chia thể bị động, bị ai đó làm phiền hoặc sự kiện công cộng.', 12, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 12);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 38: Danh từ hóa mệnh đề (～のは / ～のが)', 'Biến mệnh đề động từ thành danh từ để miêu tả, thích/giỏi.', 13, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 13);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 39: Nguyên nhân & Lý do khách quan (～て/で / ～ので)', 'Chỉ nguyên nhân kết quả tự nhiên, tai nạn, lý do khách quan.', 14, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 14);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 40: Dạng nghi vấn phụ & Thử làm (～かどうか / ～てみます)', 'Lồng câu hỏi vào trong câu lớn và thử làm hành động gì.', 15, FALSE, 55, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 15);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 41: Cho nhận kính ngữ (～ていただきます / ～てくださいます)', 'Hành động cho/nhận mang tính lịch sự với người trên.', 16, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 16);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 42: Mục đích để làm gì (～ために / ～のに)', 'Dùng cho mục đích cá nhân và công dụng của đồ vật.', 17, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 17);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 43: Sắp sửa & Trông có vẻ (～そうです / ～てきます)', 'Phỏng đoán trực quan có vẻ sắp xảy ra và đi rồi về.', 18, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 18);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 44: Quá mức & Dễ/Khó làm (～すぎます / ～やすい・にくい)', 'Hành động quá đà và mức độ dễ/khó thực hiện.', 19, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 19);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 45: Trong trường hợp & Mặc dù (～ばあいは / ～のに)', 'Giả định tình huống trường hợp và sự bất ngờ trái kỳ vọng.', 20, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 20);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 46: Vừa mới làm xong (～ところです / ～ばかりです)', 'Các giai đoạn thời điểm của hành động và vừa mới làm.', 21, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 21);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 47: Nghe nói & Hình như (～そうです / ～ようです)', 'Truyền đạt thông tin nghe đồn và suy đoán từ căn cứ.', 22, FALSE, 60, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 22);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 48: Thể Sai khiến Causative (使役形 - させる)', 'Chia thể sai khiến, cho phép hoặc bắt người khác làm.', 23, FALSE, 65, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 23);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 49: Tôn kính ngữ (尊敬語 - Keigo)', 'Kính ngữ dùng khi nói về hành động của cấp trên, khách hàng.', 24, FALSE, 65, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 24);

INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
SELECT l.level_id, 'Bài 50: Khiêm nhường ngữ (謙譲語 - Kenjougo)', 'Khiêm nhường ngữ dùng khi nói về hành động của bản thân.', 25, FALSE, 65, 'PUBLISHED', 0
FROM levels l WHERE l.code = 'N4' AND NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = l.level_id AND sort_order = 25);
