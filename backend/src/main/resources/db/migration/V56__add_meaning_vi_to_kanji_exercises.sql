-- Migration V56: Add meaning_vi to kanji_exercises table and populate translations
ALTER TABLE kanji_exercises ADD COLUMN IF NOT EXISTS meaning_vi TEXT;

-- Update N5 Lesson 1 reading sentence translations
UPDATE kanji_exercises SET meaning_vi = 'A: Bây giờ là mấy giờ? B: Bây giờ là 1 giờ 3 phút.' WHERE sentence_jp LIKE '%何時ですか%' OR sentence_jp LIKE '%一時三分%';
UPDATE kanji_exercises SET meaning_vi = 'Sinh nhật của tôi là ngày 4 tháng 2.' WHERE sentence_jp LIKE '%二月四日%';
UPDATE kanji_exercises SET meaning_vi = 'A: Mấy giờ bạn ăn cơm? B: Tôi ăn cơm lúc 7 giờ.' WHERE sentence_jp LIKE '%七時%ごはん%';
UPDATE kanji_exercises SET meaning_vi = 'A: Khi nào bạn đi Tokyo? B: Tôi sẽ đi vào ngày 5 tháng 5.' WHERE sentence_jp LIKE '%五月五日%';
UPDATE kanji_exercises SET meaning_vi = 'A: Sinh nhật anh Santos là khi nào? B: Là ngày 7 tháng 6.' WHERE sentence_jp LIKE '%六月七日%';

-- Update N5 Lesson 2 reading sentence translations
UPDATE kanji_exercises SET meaning_vi = 'Tôi sẽ đi vào ngày mùng 8.' WHERE sentence_jp LIKE '%八日%行%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi sẽ đi vào ngày mùng 9.' WHERE sentence_jp LIKE '%九日%行%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi đã đến Nhật Bản vào tháng 8 năm ngoái.' WHERE sentence_jp LIKE '%去年%八月%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi sẽ đi vào tháng 9 năm sau.' WHERE sentence_jp LIKE '%来年%九月%';
UPDATE kanji_exercises SET meaning_vi = 'Hôm qua tôi đi ngủ lúc 10 giờ.' WHERE sentence_jp LIKE '%十時%寝%';
UPDATE kanji_exercises SET meaning_vi = 'Thỏi socola này giá 300 yên.' WHERE sentence_jp LIKE '%三百円%';
UPDATE kanji_exercises SET meaning_vi = 'Chiếc cặp này giá 2.000 yên.' WHERE sentence_jp LIKE '%二千円%';
UPDATE kanji_exercises SET meaning_vi = 'Chiếc máy tính này giá 93.600 yên.' WHERE sentence_jp LIKE '%九万三千六百円%';

-- Update N4 reading sentence translations
UPDATE kanji_exercises SET meaning_vi = 'Tôi đã bị trễ cuộc họp của công ty.' WHERE sentence_jp LIKE '%会議%遅%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi đi dạo và đi bộ trong công viên.' WHERE sentence_jp LIKE '%散歩%公園%';
UPDATE kanji_exercises SET meaning_vi = 'Xe cứu thương đang vội vã chạy đi.' WHERE sentence_jp LIKE '%救急車%急%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi gửi bức thư.' WHERE sentence_jp LIKE '%手紙%送%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi thảo luận với bác sĩ rồi đến bệnh viện.' WHERE sentence_jp LIKE '%医者%相談%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi xem tin tức quốc tế của thế giới.' WHERE sentence_jp LIKE '%世界%国際%';
UPDATE kanji_exercises SET meaning_vi = 'Thầy giáo giảng dạy ở trong phòng học.' WHERE sentence_jp LIKE '%教室%先生%';

-- Update N3 reading sentence translations
UPDATE kanji_exercises SET meaning_vi = 'Tôi lắng nghe ý kiến của thầy cô giáo.' WHERE sentence_jp LIKE '%先生%意見%';
UPDATE kanji_exercises SET meaning_vi = 'Anh ấy rất giỏi môn bóng chày.' WHERE sentence_jp LIKE '%彼%野球%';
UPDATE kanji_exercises SET meaning_vi = 'Tôi xác nhận lại lịch trình đã đặt trước.' WHERE sentence_jp LIKE '%予約%予定%';
UPDATE kanji_exercises SET meaning_vi = 'Ánh nắng mặt trời thật ấm áp.' WHERE sentence_jp LIKE '%太陽%光%';
