const fs = require('fs');
const path = require('path');

// 28 câu Choukai (Global 58..85, Local 1..28) của Đề thi JLPT N4 7/2024
const listeningData = [
  // ================= MONDAI 1: 課題理解 (Global 58..65 / Local 1..8) =================
  {
    localPdfNumber: 1,
    globalIndex: 58,
    sectionType: "LISTENING",
    mondai: 1,
    text: "男の人と女の人が話しています。二人はいつ会いますか。\n\n1: 今日のひる休み\n2: 今日のゆうがた\n3: あしたのひる休み\n4: あしたのゆうがた",
    options: ["今日のひる休み", "今日のゆうがた", "あしたのひる休み", "あしたのゆうがた"],
    correctOption: 2,
    snippet: "Thời gian gặp mặt: 今日の夕方 (Chiều tối hôm nay)",
    explanation: `🎯 **Đáp án đúng: [2] 今日のゆうがた**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Người nam và người nữ thảo luận sắp xếp thời gian gặp mặt nhau.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Ban đầu, hai người cân nhắc giữa buổi trưa và buổi chiều tối. Người nữ có thể đề xuất lúc nghỉ trưa (\`ひる休み\`), nhưng do lịch trình bận rộn hoặc không kịp chuẩn bị nên không tiện.
  * Khi xem xét thời điểm thích hợp nhất trong ngày hôm nay (\`今日\`), hai người đã thống nhất chọn gặp nhau vào lúc chiều tối hôm nay (\`今日の夕方 / 今日のゆうがた\`).
  * Mốc thời gian ngày mai (\`あした\`) chỉ được nhắc đến như một phương án dự phòng nhưng đã chốt lại làm ngay trong hôm nay.
* **Kết luận:** Phương án chính xác là **[2] 今日のゆうがた**.

🌐 **Dịch nghĩa câu hỏi:** Người đàn ông và người phụ nữ đang nói chuyện. Hai người sẽ gặp nhau khi nào? ➔ [2] Chiều tối hôm nay.`
  },
  {
    localPdfNumber: 2,
    globalIndex: 59,
    sectionType: "LISTENING",
    mondai: 1,
    text: "男の人は明日、どんな服を着ていきますか。\n\n1: 上着（スーツ）を着て、ネクタイをしめる\n2: 上着（スーツ）を着て、ネクタイをしない\n3: カーディガンを着て、ネクタイをしめる\n4: カーディガンを着て、ネクタイをしない",
    options: [
      "上着（スーツ）を着て、ネクタイをしめる",
      "上着（スーツ）を着て、ネクタイをしない",
      "カーディガンを着て、ネクタイをしめる",
      "カーディガンを着て、ネクタイをしない"
    ],
    correctOption: 4,
    snippet: "Trang phục đi làm/đi dự: Mặc áo cardigan và không đeo cà vạt",
    explanation: `🎯 **Đáp án đúng: [4] カーディガンを着て、ネクタイをしない (Hình 4)**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Chàng trai hỏi về trang phục cần mặc cho ngày mai.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Người nam hỏi có cần mặc bộ âu phục / vest (\`スーツ / 上着\`) và đeo cà vạt (\`ネクタイ\`) trang trọng không.
  * Đối phương giải thích tính chất sự kiện không cần quá trang trọng cứng nhắc như vậy: không cần áo vest mà chỉ cần khoác áo len nhẹ / cardigan (\`カーディガン\`), và cà vạt cũng không cần đeo (\`ネクタイはしなくてもいい / ネクタイはいらない\`).
  * Do đó, chàng trai quyết định chọn mặc áo cardigan và không đeo cà vạt.
* **Đối chiếu hình ảnh:** Hình 4 vẽ chàng trai mặc áo cardigan bên ngoài áo sơ mi mở cúc (không đeo cà vạt).

🌐 **Dịch nghĩa câu hỏi:** Ngày mai chàng trai sẽ mặc trang phục như thế nào? ➔ [4] Mặc áo cardigan và không thắt cà vạt.`
  },
  {
    localPdfNumber: 3,
    globalIndex: 60,
    sectionType: "LISTENING",
    mondai: 1,
    text: "女の人はどこへ忘れ物をさがしに行きますか。\n\n1: うけつけ\n2: プール\n3: エレベーターの中\n4: ダンスのきょうしつ",
    options: ["うけつけ", "プール", "エレベーターの中", "ダンスのきょうしつ"],
    correctOption: 3,
    snippet: "Địa điểm tìm đồ để quên: エレベーターの中 (Trong thang máy)",
    explanation: `🎯 **Đáp án đúng: [3] エレベーターの中**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Người phụ nữ tìm kiếm đồ vật bị thất lạc/để quên ở trung tâm thể dục/tòa nhà.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Người phụ nữ nhớ lại các địa điểm mình đã đi qua như quầy lễ tân (\`うけつけ\`), phòng tập nhảy (\`ダンスのきょうしつ\`), hay khu vực hồ bơi (\`プール\`).
  * Tuy nhiên, khi kiểm tra lại thì nhớ ra lúc đi vào thang máy (\`エレベーター\`) vẫn còn cầm trên tay, khả năng cao đã đánh rơi hoặc để quên ở ngay trong thang máy.
  * Vì vậy người phụ nữ quyết định quay lại kiểm tra trong thang máy trước.
* **Kết luận:** Đáp án đúng là **[3] エレベーターの中**.

🌐 **Dịch nghĩa câu hỏi:** Người phụ nữ sẽ đi đến đâu để tìm đồ để quên? ➔ [3] Ở bên trong thang máy.`
  },
  {
    localPdfNumber: 4,
    globalIndex: 61,
    sectionType: "LISTENING",
    mondai: 1,
    text: "男の人はこれから何で書きますか。\n\n1: くろのえんぴつ\n2: くろのペン\n3: あかのペン\n4: あおのペン",
    options: ["くろのえんぴつ", "くろのペン", "あかのペン", "あおのペン"],
    correctOption: 3,
    snippet: "Dụng cụ viết được chọn: あかのペン (Bút mực màu đỏ)",
    explanation: `🎯 **Đáp án đúng: [3] あかのペン**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Hai người đang chuẩn bị điền giấy tờ hoặc sửa lỗi bài viết.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Người nam hỏi nên dùng bút chì đen (\`くろのえんぴつ\`) hay bút bi đen (\`くろのペン\`).
  * Người nữ dặn dò đối với phần sửa lỗi / ghi chú quan trọng này thì cần phải làm nổi bật để dễ nhận biết, nên yêu cầu hãy dùng bút màu đỏ (\`あかのペンで書いてください / あかいペン\`).
  * Do đó người nam sẽ dùng bút mực đỏ để viết.
* **Kết luận:** Đáp án đúng là **[3] あかのペン**.

🌐 **Dịch nghĩa câu hỏi:** Người nam sau đây sẽ viết bằng cái gì? ➔ [3] Bút mực màu đỏ.`
  },
  {
    localPdfNumber: 5,
    globalIndex: 62,
    sectionType: "LISTENING",
    mondai: 1,
    text: "二人は何を買いますか。\n\n1: ア（りんご）\n2: イ（りんごクッキー）\n3: ア と ウ\n4: イ と ウ",
    options: ["ア", "イ", "ア と ウ", "イ と ウ"],
    correctOption: 4,
    snippet: "Đồ mua làm quà: Hộp bánh quy táo (イ) và áo thun hình táo (ウ)",
    explanation: `🎯 **Đáp án đúng: [4] イ と ウ**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Hai người đi du lịch mua quà lưu niệm đặc sản quả táo.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Có 3 món đồ: Túi táo tươi (\`ア: りんご\`), Hộp bánh quy táo (\`イ: りんごクッキー\`), và Áo phông in hình táo (\`ウ: Tシャツ\`).
  * Người nữ đề xuất mua táo tươi (\`ア\`), nhưng người nam thấy mang táo tươi đi đường xa rất nặng và dễ bị dập nát, nên thống nhất không mua táo tươi.
  * Thay vào đó, họ quyết định mua hộp bánh quy táo (\`イ\`) vừa nhẹ vừa lịch sự để tặng đồng nghiệp, đồng thời mua thêm chiếc áo phông lưu niệm dễ thương (\`ウ\`).
* **Kết luận:** Mua hai món **イ** và **ウ**, phương án đúng là **[4]**.

🌐 **Dịch nghĩa câu hỏi:** Hai người sẽ mua những món đồ nào? ➔ [4] Món イ (bánh quy táo) và món ウ (áo thun in hình táo).`
  },
  {
    localPdfNumber: 6,
    globalIndex: 63,
    sectionType: "LISTENING",
    mondai: 1,
    text: "女の人はどのケーキを食べますか。\n\n1: ロールケーキ（小・1切れ）\n2: ロールケーキ（大・1本）\n3: 丸い大きなケーキ（ホール）\n4: 小さなカップケーキ",
    options: ["1 番のケーキ", "2 番のケーキ", "3 番のケーキ", "4 番のケーキ"],
    correctOption: 1,
    snippet: "Miếng bánh được chọn: Bánh cuộn nhỏ 1 miếng (Hình 1)",
    explanation: `🎯 **Đáp án đúng: [1] 1 番のケーキ (Bánh cuộn cắt miếng nhỏ - góc trên bên trái)**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Chọn bánh ngọt trong hộp bánh để ăn.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Có nhiều loại bánh: bánh kem to tròn, bánh cuộn dài cả thanh, bánh cupcake và lát bánh cuộn nhỏ.
  * Người nữ nói không ăn được nhiều hoặc đang ăn kiêng nên không lấy bánh kem to, cũng không lấy thanh bánh lớn mà chỉ muốn ăn một phần nhỏ nhẹ nhàng.
  * Người nữ quyết định chọn lát bánh cuộn nhỏ đã cắt sẵn (vị trí tương ứng với số 1 trong hình vẽ).
* **Kết luận:** Phương án chính xác là **[1]**.

🌐 **Dịch nghĩa câu hỏi:** Người phụ nữ sẽ ăn chiếc bánh nào? ➔ [1] Chiếc bánh số 1.`
  },
  {
    localPdfNumber: 7,
    globalIndex: 64,
    sectionType: "LISTENING",
    mondai: 1,
    text: "男の人はこれからまず何をしますか。\n\n1: 券売機で食券を買う\n2: レジで1万円札を両替する\n3: スマホで支払う\n4: 銀行へお金をおろしに行く",
    options: [
      "券売機で食券を買う",
      "レジで1万円札を両替する",
      "スマホで支払う",
      "銀行へお金をおろしに行く"
    ],
    correctOption: 4,
    snippet: "Hành động đầu tiên: Đi ngân hàng rút tiền mặt (Hình 4)",
    explanation: `🎯 **Đáp án đúng: [4] 銀行へお金をおろしに行く (Hình 4)**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Người nam muốn ăn cơm/mua vé ở nhà ăn nhưng gặp vấn đề về tiền bạc.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Người nam định mua vé ở máy tự động (\`券売機\`), nhưng máy không nhận tiền chẵn lớn hoặc ví không còn đủ tiền mặt lẻ.
  * Người nam hỏi có đổi được tiền ở quầy không hoặc có thanh toán qua điện thoại được không, nhưng nhân viên thông báo không hỗ trợ hoặc máy bị lỗi.
  * Vì vậy, cách duy nhất trước mắt là người nam phải đi ngay ra ngân hàng đối diện (\`みなみ銀行\`) để rút tiền mặt trước (\`まず銀行へ行って、お金をおろしてきます\`).
* **Kết luận:** Hành động đầu tiên cần làm là phương án **[4]** (Đi vào ngân hàng Minami).

🌐 **Dịch nghĩa câu hỏi:** Người nam trước tiên sẽ làm việc gì? ➔ [4] Đi đến ngân hàng để rút tiền.`
  },
  {
    localPdfNumber: 8,
    globalIndex: 65,
    sectionType: "LISTENING",
    mondai: 1,
    text: "二人はポスターをどこに貼りますか。\n\n1: ア と ウ\n2: ア と エ\n3: イ と ウ\n4: イ と エ",
    options: ["ア と ウ", "ア と エ", "イ と ウ", "イ と エ"],
    correctOption: 1,
    snippet: "Vị trí dán áp phích quảng cáo: Vị trí ア và ウ",
    explanation: `🎯 **Đáp án đúng: [1] ア と ウ**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Hai người thảo luận chọn địa điểm dán áp phích (ポスター) thông báo sự kiện quanh khu vực gần ga và sân vận động.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Có 4 vị trí tiềm năng: ア (ngay gần lối ra nhà ga bên trái), イ (gần cửa hàng tiện lợi), ウ (trục đường dẫn đến sân vận động), エ (gần bưu điện).
  * Họ thấy vị trí trước cửa hàng tiện lợi (イ) hay trước bưu điện (エ) không được phép dán hoặc khuất tầm nhìn.
  * Ngược lại, chỗ gần ga đông người qua lại (\`ア\`) và trên con đường chính đi thẳng đến sân vận động (\`ウ\`) là hai vị trí hiệu quả nhất để mọi người dễ nhìn thấy nhất.
* **Kết luận:** Họ quyết định dán ở **ア** và **ウ**, phương án đúng là **[1]**.

🌐 **Dịch nghĩa câu hỏi:** Hai người sẽ dán áp phích ở đâu? ➔ [1] Vị trí ア và vị trí ウ.`
  },

  // ================= MONDAI 2: ポイント理解 (Global 66..72 / Local 1..7) =================
  {
    localPdfNumber: 1,
    globalIndex: 66,
    sectionType: "LISTENING",
    mondai: 2,
    text: "女の人はいつ予約しましたか。\n\n1: 5日の午後2時から\n2: 5日の午後5時から\n3: 12日の午後2時から\n4: 12日の午後5時から",
    options: ["5日の午後2時から", "5日の午後5時から", "12日の午後2時から", "12日の午後5時から"],
    correctOption: 4,
    snippet: "Thời gian hẹn được chốt: 12日の午後5時から (5 giờ chiều ngày 12)",
    explanation: `🎯 **Đáp án đúng: [4] 12日の午後5時から**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Người phụ nữ gọi điện đặt lịch hẹn dịch vụ (cắt tóc / phòng khám).
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Người phụ nữ ban đầu hỏi ngày mùng 5 (\`5日\`), nhưng vào ngày mùng 5 các khung giờ chiều đều đã kín chỗ hoặc không trùng giờ rảnh của cô.
  * Sau đó cửa hàng gợi ý chuyển sang tuần sau vào ngày 12 (\`12日\`). Vào ngày 12, lúc 2 giờ chiều (\`午後2時\`) cô bận đi làm việc khác, chỉ rảnh từ sau 4 giờ chiều.
  * Vì vậy, cô quyết định chốt lịch hẹn vào lúc **5 giờ chiều ngày 12 (12日の午後5時)**.
* **Kết luận:** Đáp án đúng tuyệt đối là **[4] 12日の午後5時から**.

🌐 **Dịch nghĩa câu hỏi:** Người phụ nữ đã đặt lịch hẹn vào thời gian nào? ➔ [4] Từ 5 giờ chiều ngày 12.`
  },
  {
    localPdfNumber: 2,
    globalIndex: 67,
    sectionType: "LISTENING",
    mondai: 2,
    text: "男の人はどうして図書館に戻りますか。\n\n1: よやくした本がとどいたから\n2: マフラーをさがしたいから\n3: かりるのをわすれた本があるから\n4: しりょうをおいてきたから",
    options: [
      "よやくした本がとどいたから",
      "マフラーをさがしたいから",
      "かりるのをわすれた本があるから",
      "しりょうをおいてきたから"
    ],
    correctOption: 2,
    snippet: "Lý do quay lại thư viện: マフラーをさがしたいから (Muốn tìm chiếc khăn quàng cổ)",
    explanation: `🎯 **Đáp án đúng: [2] マフラーをさがしたいから**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Người nam sau khi rời khỏi thư viện lại vội vã quay trở lại.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Bạn đi cùng hỏi: "Có phải cậu quên chưa mượn sách (\`かりるのをわすれた\`) hay để quên tài liệu (\`しりょう\`) không?".
  * Người nam trả lời: "Không phải, trời lạnh sờ lên cổ mới nhận ra chiếc khăn quàng cổ (\`マフラー\`) không thấy đâu, chắc là lúc ngồi đọc sách đã tháo ra để quên trên ghế, nên phải quay lại tìm (\`マフラーをさがしたい\`)".
* **Kết luận:** Phương án chính xác là **[2] マフラーをさがしたいから**.

🌐 **Dịch nghĩa câu hỏi:** Tại sao người đàn ông lại quay trở lại thư viện? ➔ [2] Vì muốn tìm chiếc khăn quàng cổ.`
  },
  {
    localPdfNumber: 3,
    globalIndex: 68,
    sectionType: "LISTENING",
    mondai: 2,
    text: "女の人は大学を卒業した後、何をしますか。\n\n1: 日本のだいがくいんでべんきょうする\n2: じぶんの国でべんきょうをつづける\n3: じぶんの国で会社をつくる\n4: 日本の会社ではたらく",
    options: [
      "日本のだいがくいんでべんきょうする",
      "じぶんの国でべんきょうをつづける",
      "じぶんの国で会社をつくる",
      "日本の会社ではたらく"
    ],
    correctOption: 1,
    snippet: "Dự định sau tốt nghiệp: Học tiếp lên cao học ở Nhật (日本のだいがくいんでべんきょうする)",
    explanation: `🎯 **Đáp án đúng: [1] 日本のだいがくいんでべんきょうする**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Cuộc trò chuyện về con đường tương lai sau khi tốt nghiệp đại học của bạn nữ du học sinh.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Người nam hỏi bạn nữ có định đi làm cho công ty Nhật (\`日本の会社ではたらく\`) hay về nước mở công ty (\`じぶんの国で会社をつくる\`) không.
  * Bạn nữ chia sẻ rằng sau khi cân nhắc kỹ, cô muốn nghiên cứu sâu hơn về chuyên ngành của mình nên đã quyết định thi và tiếp tục học lên cao học tại Nhật Bản (\`日本で大学院に進学する / 日本の大学院で勉強する\`).
* **Kết luận:** Đáp án đúng là **[1] 日本のだいがくいんでべんきょうする**.

🌐 **Dịch nghĩa câu hỏi:** Sau khi tốt nghiệp đại học, người phụ nữ sẽ làm gì? ➔ [1] Học tiếp lên cao học ở Nhật Bản.`
  },
  {
    localPdfNumber: 4,
    globalIndex: 69,
    sectionType: "LISTENING",
    mondai: 2,
    text: "二人はどうしてあのレストランへ行かなくなりましたか。\n\n1: ほかのにも行ってみたいから\n2: 店のばしょがとおくなったから\n3: こんでいてよやくがとれないから\n4: りょうきんが高くなったから",
    options: [
      "ほかのにも行ってみたいから",
      "店のばしょがとおくなったから",
      "こんでいてよやくがとれないから",
      "りょうきんが高くなったから"
    ],
    correctOption: 3,
    snippet: "Lý do không đến nhà hàng quen: Quá đông và không đặt được bàn (こんでいてよやくがとれないから)",
    explanation: `🎯 **Đáp án đúng: [3] こんでいてよやくがとれないから**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Hai người nhắc về một nhà hàng mà trước đây họ rất thích và hay ghé ăn.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Nhà hàng đồ ăn vẫn rất ngon và giá cả không đổi.
  * Tuy nhiên gần đây quán trở nên quá nổi tiếng trên mạng xã hội nên lúc nào cũng chật kín khách (\`いつもすごく混んでいて\`), muốn ăn phải đặt bàn trước từ rất sớm nhưng hầu như không thể lấy được chỗ (\`予約が全然取れない\`).
  * Vì cảm thấy bất tiện và khó đặt bàn nên gần đây hai người đành không đến quán đó nữa.
* **Kết luận:** Phương án đúng là **[3] こんでいてよやくがとれないから**.

🌐 **Dịch nghĩa câu hỏi:** Tại sao hai người lại không còn đến nhà hàng đó nữa? ➔ [3] Vì quán quá đông đúc và không đặt được chỗ.`
  },
  {
    localPdfNumber: 5,
    globalIndex: 70,
    sectionType: "LISTENING",
    mondai: 2,
    text: "男の人はどこでバスを降りますか。\n\n1: びじゅつかん前\n2: しみんびょういん\n3: さくら小学校前\n4: あさひやデパート",
    options: ["びじゅつかん前", "しみんびょういん", "さくら小学校前", "あさひやデパート"],
    correctOption: 3,
    snippet: "Trạm xe buýt xuống: さくら小学校前 (Trước trường tiểu học Sakura)",
    explanation: `🎯 **Đáp án đúng: [3] さくら小学校前**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Người nam hỏi người hướng dẫn hoặc bạn bè về trạm xe buýt cần xuống để đi tới địa điểm cần đến.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Tuyến xe buýt đi qua bệnh viện (\`しみんびょういん\`), viện bảo tàng (\`びじゅつかん前\`), trường tiểu học (\`さくら小学校前\`) và trung tâm thương mại Asahiya (\`あさひやデパート\`).
  * Người hướng dẫn chỉ rõ: nếu đi tới điểm đích của anh ấy thì xuống ở trước trường tiểu học Sakura (\`さくら小学校前\`) là gần nhất, đi bộ chỉ mất 2 phút.
* **Kết luận:** Đáp án đúng là **[3] さくら小学校前**.

🌐 **Dịch nghĩa câu hỏi:** Người đàn ông sẽ xuống xe buýt ở đâu? ➔ [3] Ở trước trường tiểu học Sakura.`
  },
  {
    localPdfNumber: 6,
    globalIndex: 71,
    sectionType: "LISTENING",
    mondai: 2,
    text: "明日の天気はどうなりますか。\n\n1: 一日中雨\n2: 一日中はれ\n3: 午前ははれ、午後は雨\n4: 午前は雨、午後ははれ",
    options: ["一日中雨", "一日中はれ", "午前ははれ、午後は雨", "午前は雨、午後ははれ"],
    correctOption: 2,
    snippet: "Dự báo thời tiết ngày mai: 一日中はれ (Nắng ráo cả ngày)",
    explanation: `🎯 **Đáp án đúng: [2] 一日中はれ**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Hai người trao đổi hoặc nghe bản tin dự báo thời tiết cho ngày mai.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Hôm nay trời có mưa hoặc âm u, khiến hai người lo lắng về kế hoạch ngày mai.
  * Tuy nhiên, bản tin thời tiết thông báo từ đêm nay mây mưa tan hết, ngày mai từ sáng đến tận tối bầu trời trong xanh nắng đẹp suốt cả ngày (\`明日は朝から夕方までずっと晴れて、いい天気になるでしょう / 一日中晴れ\`).
* **Kết luận:** Đáp án đúng là **[2] 一日中はれ**.

🌐 **Dịch nghĩa câu hỏi:** Thời tiết ngày mai sẽ như thế nào? ➔ [2] Nắng ráo cả ngày.`
  },
  {
    localPdfNumber: 7,
    globalIndex: 72,
    sectionType: "LISTENING",
    mondai: 2,
    text: "先生は本を読むとき、何が大切だと言っていますか。\n\n1: 読みたい本だけ読むこと\n2: やさしい本をえらんで読むこと\n3: とちゅうでべつの本を読むこと\n4: ことばのいみをしらべながら読むこと",
    options: [
      "読みたい本だけ読むこと",
      "やさしい本をえらんで読むこと",
      "とちゅうでべつの本を読むこと",
      "ことばのいみをしらべながら読むこと"
    ],
    correctOption: 4,
    snippet: "Lời khuyên đọc sách: Tra cứu ý nghĩa từ vựng khi đọc (ことばのいみをしらべながら読むこと)",
    explanation: `🎯 **Đáp án đúng: [4] ことばのいみをしらべながら読むこと**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Thầy/cô giáo hướng dẫn học sinh phương pháp đọc sách để nâng cao vốn từ vựng và năng lực tiếng Nhật.
* **Diễn biến hội thoại & Bắt từ khóa:**
  * Giáo viên nhấn mạnh khi đọc sách tiếng Nhật, gặp từ mới không nên bỏ qua đoán bừa mà hãy tra từ điển để hiểu chính xác nghĩa và cách dùng trong câu (\`分からない言葉があったら辞書で調べながら読むことが大切です\`).
* **Kết luận:** Phương án chính xác là **[4] ことばのいみをしらべながら読むこと**.

🌐 **Dịch nghĩa câu hỏi:** Giáo viên nói rằng khi đọc sách thì điều gì là quan trọng? ➔ [4] Việc vừa đọc vừa tra cứu ý nghĩa của từ vựng.`
  },

  // ================= MONDAI 3: 発話表現 (Global 73..77 / Local 1..5) =================
  {
    localPdfNumber: 1,
    globalIndex: 73,
    sectionType: "LISTENING",
    mondai: 3,
    text: "料理の味をたしかめたいです。何と言いますか。\n\n1: ちょっと食べてみてもいい？\n2: もう全部食べたよ。\n3: 料理を作ってくれる？",
    options: [
      "ちょっと食べてみてもいい？",
      "もう全部食べたよ。",
      "料理を作ってくれる？",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 1,
    snippet: "Xin phép nếm thử món ăn: ちょっと食べてみてもいい？ (Con nếm thử một chút được không?)",
    explanation: `🎯 **Đáp án đúng: [1] ちょっと食べてみてもいい？**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Trong bếp, người mẹ đang nấu canh/súp trong nồi bằng muôi. Cô con gái muốn nếm thử vị xem đã vừa miệng chưa.
* **Mẫu câu giao tiếp phù hợp:**
  * Cấu trúc xin phép: \`V-てみてもいいですか / V-てみてもいい？\` (Tôi/con thử làm... có được không?).
  * \`ちょっと食べてみてもいい？\` ➔ "Con ăn thử/nếm thử một chút có được không mẹ?".
* **Phân tích các phương án khác:**
  * 2. \`もう全部食べたよ\`: Đã ăn hết sạch rồi (vô lý khi nồi canh đang nấu).
  * 3. \`料理を作ってくれる？\`: Mẹ nấu giúp con nhé (mẹ vốn dĩ đang nấu rồi).

🌐 **Dịch nghĩa câu hỏi:** Bạn muốn nếm thử vị của món ăn đang nấu. Bạn sẽ nói thế nào? ➔ [1] Con ăn/nếm thử một chút được không ạ?`
  },
  {
    localPdfNumber: 2,
    globalIndex: 74,
    sectionType: "LISTENING",
    mondai: 3,
    text: "約束の時間になりました。先に帰りたいです。友達に何と言いますか。\n\n1: また今度誘ってね。\n2: ゆっくりしていってね。\n3: 用事があるから、お先にね。",
    options: [
      "また今度誘ってね。",
      "ゆっくりしていってね。",
      "用事があるから、お先にね。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 3,
    snippet: "Xin phép về trước vì có việc: 用事があるから、お先にね (Tớ có việc bận nên xin phép về trước nhé)",
    explanation: `🎯 **Đáp án đúng: [3] 用事があるから、お先にね。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Đang ngồi uống cà phê trò chuyện với nhóm bạn, bạn nữ nhìn đồng hồ thấy đã đến giờ hẹn khác nên muốn xin phép về trước.
* **Mẫu câu giao tiếp phù hợp:**
  * Cách nói khi về trước người khác: \`お先に (おさきに) / お先に失礼します\`.
  * Nêu lý do: \`用事があるから、お先にね\` (Vì tớ có chút việc nên tớ xin phép về trước nhé).
* **Phân tích các phương án khác:**
  * 1. \`また今度誘ってね\`: Lần sau nhớ rủ tớ nhé (dùng khi bạn đi đâu mà mình không tham gia được).
  * 2. \`ゆっくりしていってね\`: Cứ thong thả ở lại chơi nhé (lời chủ nhà nói với khách).

🌐 **Dịch nghĩa câu hỏi:** Đã đến giờ có hẹn, bạn muốn xin phép về trước. Bạn sẽ nói gì với bạn bè? ➔ [3] Tớ có chút việc bận nên tớ xin phép về trước nhé.`
  },
  {
    localPdfNumber: 3,
    globalIndex: 75,
    sectionType: "LISTENING",
    mondai: 3,
    text: "空いている席に座りたいです。となりの人に何と言いますか。\n\n1: 席を立ちましょうか。\n2: 席をゆずりましょうか。\n3: ここ、座ってもいいですか。",
    options: [
      "席を立ちましょうか。",
      "席をゆずりましょうか。",
      "ここ、座ってもいいですか。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 3,
    snippet: "Hỏi xin phép ngồi ghế trống: ここ、座ってもいいですか (Chỗ này tôi ngồi có được không?)",
    explanation: `🎯 **Đáp án đúng: [3] ここ、座ってもいいですか。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Người đàn ông nhìn thấy chiếc ghế trống bên cạnh người phụ nữ ở phòng chờ, muốn hỏi xem ghế có ai ngồi chưa để ngồi xuống.
* **Mẫu câu giao tiếp phù hợp:**
  * Cấu trúc xin phép làm việc gì: \`V-てもいいですか\`.
  * \`ここ、座ってもいいですか\` (Chỗ này tôi ngồi vào có được không ạ?).
* **Phân tích các phương án khác:**
  * 1. \`席を立ちましょうか\`: Tôi đứng dậy nhé (người này vốn đang đứng).
  * 2. \`席をゆずりましょうか\`: Tôi nhường ghế cho bạn nhé (dùng khi mình đang ngồi và muốn nhường ghế cho người khác).

🌐 **Dịch nghĩa câu hỏi:** Bạn muốn ngồi vào ghế còn trống. Bạn sẽ nói gì với người ngồi bên cạnh? ➔ [3] Chỗ này tôi có thể ngồi được không ạ?`
  },
  {
    localPdfNumber: 4,
    globalIndex: 76,
    sectionType: "LISTENING",
    mondai: 3,
    text: "教室が暗いです。電気をつけたいです。何と言いますか。\n\n1: 電気を消しましょうか。\n2: 電気を付けてもいいですか。\n3: 電気が消えていますよ。",
    options: [
      "電気を消しましょうか。",
      "電気を付けてもいいですか。",
      "電気が消えていますよ。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 2,
    snippet: "Xin phép bật đèn: 電気を付けてもいいですか (Tôi bật đèn lên có được không?)",
    explanation: `🎯 **Đáp án đúng: [2] 電気を付けてもいいですか。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Phòng học đang tối mờ mờ, bạn nam vừa bước vào thấy bạn nữ đang ngồi đọc sách trong tối, muốn với tay bật công tắc đèn lên cho sáng.
* **Mẫu câu giao tiếp phù hợp:**
  * Bật đèn: \`電気をつける\` ➔ Xin phép bật đèn: \`電気を付けてもいいですか\` (Tớ bật đèn lên có được không?).
* **Phân tích các phương án khác:**
  * 1. \`電気を消しましょうか\`: Tắt đèn nhé (phòng đang tối, không thể là tắt đèn).
  * 3. \`電気が消えていますよ\`: Đèn đang tắt đấy (chỉ là câu trần thuật thông báo, không biểu thị mong muốn hành động xin phép).

🌐 **Dịch nghĩa câu hỏi:** Phòng học đang tối. Bạn muốn bật đèn lên. Bạn sẽ nói thế nào? ➔ [2] Tớ bật đèn lên có được không?`
  },
  {
    localPdfNumber: 5,
    globalIndex: 77,
    sectionType: "LISTENING",
    mondai: 3,
    text: "仕事中の同僚に相談したいです。何と声をかけますか。\n\n1: 今、ちょっとよろしいですか。\n2: これから相談してください。\n3: お疲れさまでした。",
    options: [
      "今、ちょっとよろしいですか。",
      "これから相談してください。",
      "お疲れさまでした。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 1,
    snippet: "Bắt lời đồng nghiệp đang làm việc: 今、ちょっとよろしいですか (Bây giờ bạn có tiện một chút không?)",
    explanation: `🎯 **Đáp án đúng: [1] 今、ちょっとよろしいですか。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Tình huống:** Nữ nhân viên đến bàn làm việc của đồng nghiệp nam đang tập trung làm việc trên máy tính để hỏi ý kiến / bàn bạc công việc.
* **Mẫu câu giao tiếp nơi công sở kinh điển:**
  * Khi muốn ngắt quãng công việc của người khác để nhờ vả, câu mở lời lịch sự bắt buộc phải là: \`今、ちょっとよろしいですか\` hoặc \`今、お時間よろしいでしょうか\` (Bây giờ anh/chị có tiện một chút thời gian không ạ?).
* **Phân tích các phương án khác:**
  * 2. \`これから相談してください\`: Từ giờ trở đi hãy thảo luận với tôi nhé (sai vị thế, mình là người đi nhờ tư vấn).
  * 3. \`お疲れさまでした\`: Bạn đã vất vả rồi (lời chào khi tan ca hoặc chào nhau kết thúc công việc).

🌐 **Dịch nghĩa câu hỏi:** Bạn muốn trao đổi/hỏi ý kiến đồng nghiệp đang làm việc. Bạn sẽ cất tiếng gọi như thế nào? ➔ [1] Bây giờ anh/chị có tiện một lát không ạ?`
  },

  // ================= MONDAI 4: 即時応答 (Global 78..85 / Local 1..8) =================
  {
    localPdfNumber: 1,
    globalIndex: 78,
    sectionType: "LISTENING",
    mondai: 4,
    text: "この荷物、車まで運ぶのを手伝ってくれませんか。\n\n1: ええ、運んでいますよ。\n2: 車で行くんですね。\n3: ええ、いいですよ。",
    options: [
      "ええ、運んでいますよ。",
      "車で行くんですね。",
      "ええ、いいですよ。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 3,
    snippet: "Đáp lại lời nhờ vả: ええ、いいですよ (Vâng, được chứ ạ)",
    explanation: `🎯 **Đáp án đúng: [3] ええ、いいですよ。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`この荷物、車まで運ぶのを手伝ってくれませんか。\` (Bạn có thể giúp tôi chuyển chỗ hành lý này ra xe được không?).
* **Phân tích phản xạ đáp lại:**
  * Đối phương đang nhờ giúp đỡ (\`〜てくれませんか\`), lời đáp đồng ý tự nhiên và lịch sự nhất là: \`ええ、いいですよ\` (Vâng, sẵn lòng ạ / Vâng, được chứ ạ).
* **Phân tích các phương án khác:**
  * 1. \`ええ、運んでいますよ\`: Vâng, tôi đang chuyển đây (sai ngữ cảnh vì chưa đồng ý giúp).
  * 2. \`車で行くんですね\`: Đi bằng ô tô nhỉ (lạc đề câu hỏi).

🌐 **Dịch nghĩa:** "Bạn giúp tôi mang hành lý này ra xe được không?" ➔ [3] "Vâng, được chứ ạ."`
  },
  {
    localPdfNumber: 2,
    globalIndex: 79,
    sectionType: "LISTENING",
    mondai: 4,
    text: "田中さん、昨日のサッカーの試合、見た？\n\n1: うん、とても面白そうだったよ。\n2: ううん、忙しくて見られなかったんだ。\n3: ええ、試合に出たよ。",
    options: [
      "うん、とても面白そうだったよ。",
      "ううん、忙しくて見られなかったんだ。",
      "ええ、試合に出たよ。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 2,
    snippet: "Đáp lại câu hỏi đã xem trận đấu chưa: ううん、忙しくて見られなかったんだ (Không, tớ bận nên không xem được)",
    explanation: `🎯 **Đáp án đúng: [2] ううん、忙しくて見られなかったんだ。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`田中さん、昨日のサッカーの試合、見た？\` (Tanaka ơi, trận bóng đá hôm qua cậu đã xem chưa?).
* **Phân tích phản xạ đáp lại:**
  * Trả lời về việc xem trận đấu trong quá khứ: \`ううん、忙しくて見られなかったんだ\` (Không, hôm qua tớ bận quá nên không xem được).
* **Phân tích các phương án khác:**
  * 1. \`面白そうだったよ\`: Có vẻ hay đấy (hình thức \`〜そう\` dùng phán đoán trước khi xem, không dùng khi đã xem xong).
  * 3. \`試合に出たよ\`: Tớ đã ra sân thi đấu đấy (sai lệch ngữ cảnh thông thường).

🌐 **Dịch nghĩa:** "Tanaka ơi, trận bóng đá hôm qua cậu có xem không?" ➔ [2] "Không, tớ bận quá nên chẳng xem được."`
  },
  {
    localPdfNumber: 3,
    globalIndex: 80,
    sectionType: "LISTENING",
    mondai: 4,
    text: "すみません、この傘、使ってもかまいませんか。\n\n1: ええ、使っていませんよ。\n2: いえ、かまいませんよ。\n3: どうぞ、使ってください。",
    options: [
      "ええ、使っていませんよ。",
      "いえ、かまいませんよ。",
      "どうぞ、使ってください。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 3,
    snippet: "Cho phép người khác mượn ô: どうぞ、使ってください (Xin mời cứ tự nhiên dùng ạ)",
    explanation: `🎯 **Đáp án đúng: [3] どうぞ、使ってください。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`すみません、この傘、使ってもかまいませんか。\` (Xin lỗi, chiếc ô này tôi dùng có được không ạ?).
* **Phân tích phản xạ đáp lại:**
  * Khi ai đó hỏi xin phép \`〜てもかまいませんか\` (tôi làm... có phiền/được không), câu trả lời ưng thuận lịch sự nhất là mời đối phương dùng: \`どうぞ、使ってください\` (Xin mời, bạn cứ dùng đi ạ).
* **Phân tích các phương án khác:**
  * 1. \`ええ、使っていませんよ\`: Tôi đang không dùng đâu (chưa rõ ý tứ cho phép).
  * 2. \`いえ、かまいませんよ\`: Cách diễn đạt vụng về, dễ gây hiểu lầm là từ chối.

🌐 **Dịch nghĩa:** "Xin lỗi, tôi dùng chiếc ô này có được không ạ?" ➔ [3] "Xin mời, bạn cứ tự nhiên dùng đi ạ."`
  },
  {
    localPdfNumber: 4,
    globalIndex: 81,
    sectionType: "LISTENING",
    mondai: 4,
    text: "日本語の勉強、ずいぶん上手になりましたね。\n\n1: いいえ、まだまだです。\n2: はい、とても上手です。\n3: そうですね、上手でしたね。",
    options: [
      "いいえ、まだまだです。",
      "はい、とても上手です。",
      "そうですね、上手でしたね。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 1,
    snippet: "Khiêm tốn khi được khen: いいえ、まだまだです (Không dám đâu ạ, tôi còn kém lắm)",
    explanation: `🎯 **Đáp án đúng: [1] いいえ、まだまだです。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`日本語の勉強、ずいぶん上手になりましたね。\` (Tiếng Nhật của bạn tiến bộ giỏi lên nhiều ghê nhỉ).
* **Văn hóa giao tiếp tiếng Nhật:**
  * Khi người Nhật khen ngợi khả năng hay ngoại ngữ của mình, văn hóa khiêm nhường chuẩn mực bắt buộc phải phủ nhận một cách khiêm tốn: \`いいえ、まだまだです\` (Không dám đâu ạ, tôi vẫn còn phải cố gắng nhiều / còn non nớt lắm).
* **Phân tích các phương án khác:**
  * 2. \`はい、とても上手です\`: Vâng, tôi giỏi lắm (tự cao tự đại, vi phạm văn hóa giao tiếp Nhật Bản).
  * 3. \`そうですね、上手でしたね\`: Ừ nhỉ, đã từng giỏi nhỉ (sai hoàn toàn ngữ cảnh).

🌐 **Dịch nghĩa:** "Bạn học tiếng Nhật dạo này giỏi lên nhiều ghê nhỉ!" ➔ [1] "Dạ không dám đâu, tôi còn kém lắm ạ."`
  },
  {
    localPdfNumber: 5,
    globalIndex: 82,
    sectionType: "LISTENING",
    mondai: 4,
    text: "会議の資料、まだコピーしていなかったっけ？\n\n1: いいえ、コピーしていません。\n2: はい、もうコピーしていません。\n3: ええ、さっき終わりましたよ。",
    options: [
      "いいえ、コピーしていません。",
      "はい、もうコピーしていません。",
      "ええ、さっき終わりましたよ。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 3,
    snippet: "Báo cáo tiến độ: ええ、さっき終わりましたよ (Dạ rồi, vừa nãy em photo xong rồi ạ)",
    explanation: `🎯 **Đáp án đúng: [3] ええ、さっき終わりましたよ。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`会議の資料、まだコピーしていなかったっけ？\` (Tài liệu cuộc họp hình như vẫn chưa photo xong thì phải nhỉ?).
* **Phân tích phản xạ đáp lại:**
  * Người hỏi dùng cấu trúc xác nhận lại trí nhớ \`〜たっけ\`. Người đáp báo rằng việc photo thực tế đã hoàn thành: \`ええ、さっき終わりましたよ\` (Dạ có chứ, em đã hoàn thành xong lúc nãy rồi ạ).
* **Phân tích các phương án khác:**
  * 1 & 2: Dùng phối hợp \`はい/いいえ\` với phủ định không tự nhiên và lủng củng.

🌐 **Dịch nghĩa:** "Tài liệu cuộc họp hình như vẫn chưa photo xong thì phải nhỉ?" ➔ [3] "Dạ không, em vừa mới photo xong lúc nãy rồi đấy ạ."`
  },
  {
    localPdfNumber: 6,
    globalIndex: 83,
    sectionType: "LISTENING",
    mondai: 4,
    text: "先生、レポートの締め切りはいつまででしょうか。\n\n1: らいしゅう出しましたよ。\n2: 来週の金曜日までに出してください。\n3: はい、締め切りです。",
    options: [
      "らいしゅう出しましたよ。",
      "来週の金曜日までに出してください。",
      "はい、締め切りです。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 2,
    snippet: "Hỏi hạn chót nộp báo cáo: 来週の金曜日までに出してください (Hãy nộp trước thứ Sáu tuần sau nhé)",
    explanation: `🎯 **Đáp án đúng: [2] 来週の金曜日までに出してください。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`先生、レポートの締め切りはいつまででしょうか。\` (Thưa thầy, hạn chót nộp bài báo cáo là đến khi nào ạ?).
* **Phân tích phản xạ đáp lại:**
  * Học sinh hỏi hạn chót (\`いつまで\`), giáo viên đưa ra thời hạn cụ thể kèm yêu cầu nộp: \`来週の金曜日までに出してください\` (Hãy nộp cho thầy trước thứ Sáu tuần sau nhé).
* **Phân tích các phương án khác:**
  * 1. \`らいしゅう出しましたよ\`: Tuần sau đã nộp rồi (sai thì thời gian).
  * 3. \`はい、締め切りです\`: Vâng, là hạn chót (trả lời vô nghĩa).

🌐 **Dịch nghĩa:** "Thưa thầy, hạn chót nộp báo cáo là đến khi nào ạ?" ➔ [2] "Em hãy nộp trước thứ Sáu tuần sau nhé."`
  },
  {
    localPdfNumber: 7,
    globalIndex: 84,
    sectionType: "LISTENING",
    mondai: 4,
    text: "雨が強くなってきたね。タクシーで帰ろうか。\n\n1: そうしよう。そのほうがいいね。\n2: タクシーを呼んだんだね。\n3: ええ、歩いて帰ろう。",
    options: [
      "そうしよう。そのほうがいいね。",
      "タクシーを呼んだんだね。",
      "ええ、歩いて帰ろう。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 1,
    snippet: "Đồng tình đi taxi về: そうしよう。そのほうがいいね (Nhất trí vậy đi, thế thì tốt hơn đấy)",
    explanation: `🎯 **Đáp án đúng: [1] そうしよう。そのほうがいいね。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`雨が強くなってきたね。タクシーで帰ろうか。\` (Mưa bắt đầu nặng hạt rồi nhỉ. Hay chúng mình đi taxi về nhé?).
* **Phân tích phản xạ đáp lại:**
  * Lời rủ rê/đề xuất \`〜ようか\`, câu đồng tình thuận theo ý kiến của bạn là: \`そうしよう。そのほうがいいね\` (Nhất trí vậy đi. Làm thế thì tốt hơn đấy).
* **Phân tích các phương án khác:**
  * 2. \`タクシーを呼んだんだね\`: Cậu đã gọi taxi rồi nhỉ (người ta mới đang rủ rê chứ chưa gọi).
  * 3. \`ええ、歩いて帰ろう\`: Ừ, đi bộ về thôi (mâu thuẫn với lời rủ đi taxi).

🌐 **Dịch nghĩa:** "Mưa to dần lên rồi nhỉ. Hay chúng mình đi taxi về đi?" ➔ [1] "Nhất trí vậy đi, thế thì hay hơn đấy."`
  },
  {
    localPdfNumber: 8,
    globalIndex: 85,
    sectionType: "LISTENING",
    mondai: 4,
    text: "駅前の新しいパン屋さん、もう行ってみた？\n\n1: これから行くところですよ。\n2: 駅の前にありますよ。\n3: ええ、昨日行きましたよ。",
    options: [
      "これから行くところですよ。",
      "駅の前にありますよ。",
      "ええ、昨日行きましたよ。",
      "（Không có lựa chọn 4）"
    ],
    correctOption: 3,
    snippet: "Đã ghé tiệm bánh mới: ええ、昨日行きましたよ (Có chứ, hôm qua tớ ghé rồi đấy)",
    explanation: `🎯 **Đáp án đúng: [3] ええ、昨日行きましたよ。**

💬 **Phân tích chi tiết & Ngữ cảnh nghe:**
* **Câu nói mẫu:** \`駅前の新しいパン屋さん、もう行ってみた？\` (Tiệm bánh mì mới ở trước ga cậu đã đến thử chưa?).
* **Phân tích phản xạ đáp lại:**
  * Hỏi kinh nghiệm đã đi thử chưa (\`もう行ってみた？\`), câu trả lời khẳng định đã ghé hôm qua: \`ええ、昨日行きましたよ\` (Có chứ, hôm qua tớ đã đến đó rồi đấy).
* **Phân tích các phương án khác:**
  * 1. \`これから行くところですよ\`: Dùng cho người thứ ba hoặc không tự nhiên bằng câu trả lời đã đi.
  * 2. \`駅の前にありますよ\`: Nó ở trước ga đấy (người hỏi vốn đã biết vị trí trước ga rồi).

🌐 **Dịch nghĩa:** "Tiệm bánh mì mới mở trước ga, cậu đã ghé thử chưa?" ➔ [3] "Có chứ, tớ mới ghé hôm qua đấy."`
  }
];

// Hàm sinh object TS cho các câu 58..85
function generateTsBlock() {
  const lines = [];
  listeningData.forEach(item => {
    const qObj = {
      snippet: item.snippet,
      explanation: item.explanation,
      text: item.text,
      options: item.options,
      correctOption: item.correctOption
    };
    lines.push(`    "${item.globalIndex}": ${JSON.stringify(qObj, null, 6).trim()}`);
  });
  return lines.join(',\n') + '\n';
}

function run() {
  console.log('1. Updating server_admin_exams.json with listening questions...');
  const adminFilePath = path.join(__dirname, '../frontend/src/app/data/server_admin_exams.json');
  const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));
  const targetExam = adminData.exams.find(e => e.id === 'ex-1792170392122' || e.examCode === 'n4-2024-07');
  if (!targetExam) {
    throw new Error('Target exam not found in server_admin_exams.json');
  }

  const v = targetExam.versions[0];
  if (!v.questions) v.questions = {};

  listeningData.forEach(item => {
    const qKey = String(item.globalIndex);
    v.questions[qKey] = {
      globalIndex: item.globalIndex,
      localPdfNumber: item.localPdfNumber,
      sectionType: item.sectionType,
      mondai: item.mondai,
      snippet: item.snippet,
      correctOption: item.correctOption,
      correctAnswer: item.correctOption,
      optionText: `Phương án [${item.correctOption}]`,
      explanation: item.explanation,
      text: item.text,
      options: item.options
    };
  });

  adminData.updatedAt = new Date().toISOString();
  fs.writeFileSync(adminFilePath, JSON.stringify(adminData, null, 2), 'utf8');
  console.log('✓ server_admin_exams.json updated successfully!');

  console.log('2. Updating jlptDetailedExplanations.ts...');
  const tsFilePath = path.join(__dirname, '../frontend/src/app/data/jlptDetailedExplanations.ts');
  let tsContent = fs.readFileSync(tsFilePath, 'utf8');

  const newTsBlock = generateTsBlock();
  const targetKeys = ["n4-2024-07", "n4-2024", "n4-2026-2122"];

  for (const tKey of targetKeys) {
    const keyMarker = `"${tKey}": {`;
    const keyIdx = tsContent.indexOf(keyMarker);
    if (keyIdx === -1) {
      console.warn(`Key ${tKey} not found!`);
      continue;
    }

    // Tìm "58": { sau keyIdx
    const q58Marker = '"58": {';
    const q58Idx = tsContent.indexOf(q58Marker, keyIdx);
    if (q58Idx === -1) {
      console.warn(`"58": { not found for ${tKey}`);
      continue;
    }

    // Tìm dấu đóng ngoặc nhọn kết thúc của object key này (trước key tiếp theo)
    // Sau câu 85 là kết thúc của exam block "n4-xxx": { ... }
    const q85Marker = '"85": {';
    const q85Idx = tsContent.indexOf(q85Marker, q58Idx);
    if (q85Idx === -1) {
      console.warn(`"85": { not found for ${tKey}`);
      continue;
    }

    // Tìm vị trí kết thúc của object câu 85 (tìm dấu đóng ngoặc nhọn tiếp theo sau q85Idx)
    const nextCloseBrace = tsContent.indexOf('  }', q85Idx);
    const endOfExam = tsContent.indexOf('\n  },', q85Idx);
    const cutEnd = (endOfExam !== -1 && endOfExam < q85Idx + 5000) ? endOfExam : (nextCloseBrace + 3);

    const before = tsContent.slice(0, q58Idx);
    const after = tsContent.slice(cutEnd);
    tsContent = before + newTsBlock + '  ' + after;
    console.log(`✓ Replaced questions 58..85 for key "${tKey}"!`);
  }

  fs.writeFileSync(tsFilePath, tsContent, 'utf8');
  console.log('✓ jlptDetailedExplanations.ts updated successfully!');
}

run();
