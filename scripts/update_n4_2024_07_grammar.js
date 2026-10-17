const fs = require('fs');
const path = require('path');

// 29 câu Bunpou - Dokkai (Global 29..57, Local 1..29) của Đề thi JLPT N4 7/2024
const grammarData = [
  // ================= MONDAI 1 (Câu 1..13 / Global 29..41) =================
  {
    localPdfNumber: 1,
    globalIndex: 29,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "うでにつける時計を「うでどけい」(　　)いいます。",
    options: ["が", "に", "で", "と"],
    correctOption: 4,
    snippet: "〜を…と言う (Gọi cái gì là...)",
    explanation: `🎯 **Đáp án đúng: [4] と**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`[Danh từ 1] を [Danh từ 2] と言います\` mang nghĩa "Gọi [Danh từ 1] là [Danh từ 2]" hoặc "Người ta gọi [Danh từ 1] là [Danh từ 2]". Trợ từ **と** ở đây có vai trò trích dẫn nội dung tên gọi / định nghĩa.
* Trong câu này: \`うでにつける時計を「うでどけい」といいます\` ➔ Đồng hồ đeo ở cổ tay thì được gọi là "đồng hồ đeo tay" (腕時計).
* **Phân tích các phương án khác:**
  * 1. \`が\`: Chỉ chủ ngữ, không đứng trước động từ trích dẫn \`いいます\` theo cấu trúc định nghĩa tên gọi.
  * 2. \`に\`: Chỉ mục đích, thời gian hoặc hướng tác động, không dùng để trích dẫn tên gọi sau danh từ.
  * 3. \`で\`: Chỉ phương tiện, nơi chốn xảy ra hành động, không dùng trong mẫu câu định nghĩa tên gọi.

🌐 **Dịch nghĩa:** Đồng hồ đeo ở cổ tay thì người ta gọi là "đồng hồ đeo tay".`
  },
  {
    localPdfNumber: 2,
    globalIndex: 30,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "このかばんは軽いから、旅行(　　)便利です。",
    options: ["と", "を", "に", "の"],
    correctOption: 3,
    snippet: "〜に便利だ (Tiện lợi cho việc gì/mục đích gì)",
    explanation: `🎯 **Đáp án đúng: [3] に**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`[Danh từ/V-るの] + に + 便利だ / いい / 役に立つ\` mang ý nghĩa "tiện lợi / tốt / có ích cho một mục đích hoặc trường hợp nào đó".
* Trợ từ **に** dùng để chỉ phạm vi đánh giá, mục đích sử dụng.
* \`旅行に便利です\` nghĩa là "rất tiện cho việc đi du lịch".
* **Phân tích các phương án khác:**
  * 1. \`と\`: Đi cùng với ai/cái gì hoặc liệt kê, không phù hợp.
  * 2. \`を\`: Bổ ngữ trực tiếp của ngoại động từ, trong khi \`便利\` là tính từ đuôi na.
  * 4. \`の\`: Đứng giữa 2 danh từ (\`旅行の便利\` không đi được trực tiếp trước vị ngữ \`です\`).

🌐 **Dịch nghĩa:** Chiếc cặp này nhẹ nên rất tiện lợi cho những chuyến du lịch.`
  },
  {
    localPdfNumber: 3,
    globalIndex: 31,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "父はネクタイを 30 本以上持っていますが、私は 2 本(　　)持っていません。",
    options: ["が", "ずつ", "しか", "ぐらい"],
    correctOption: 3,
    snippet: "Số lượng + しか + V-nai (Chỉ có...)",
    explanation: `🎯 **Đáp án đúng: [3] しか**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`[Số từ] + しか + Động từ thể phủ định (〜ない/〜ません)\` mang ý nghĩa "chỉ có... (ít ỏi, không đủ so với mong đợi, mang sắc thái phủ định)".
* Vế sau câu là thể phủ định \`持っていません\` (không có), đối lập với bố có hơn 30 chiếc cà vạt (\`30本以上\`), tôi chỉ có vỏn vẹn 2 chiếc nên phải dùng **しか**.
* **Phân tích các phương án khác:**
  * 1. \`が\`: Trợ từ chỉ chủ ngữ, không thể hiện hàm ý "chỉ vỏn vẹn".
  * 2. \`ずつ\`: Từng... một (phân chia đều, ví dụ mỗi người 2 cái: \`2本ずつ\`), không hợp ngữ cảnh so sánh tương phản.
  * 4. \`ぐらい\`: Khoảng chừng, thường đi với câu khẳng định biểu thị ước lượng, không nhấn mạnh tính ít ỏi đi với phủ định như \`しか\`.

🌐 **Dịch nghĩa:** Bố tôi có hơn 30 chiếc cà vạt nhưng tôi thì chỉ có vỏn vẹn 2 chiếc.`
  },
  {
    localPdfNumber: 4,
    globalIndex: 32,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "きのう読んだ本(　　)、赤は元気が出る色だそうです。",
    options: ["について", "からは", "より", "によると"],
    correctOption: 4,
    snippet: "〜によると 〜そうだ (Theo như... nghe nói là...)",
    explanation: `🎯 **Đáp án đúng: [4] によると**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`[Nguồn thông tin (N)] + によると 〜 そうだ / ということだ\` mang ý nghĩa "Theo như nguồn thông tin... thì nghe nói là...".
* Đuôi câu có dạng truyền đạt thông tin \`〜だそうです\`, đi cùng danh từ nguồn tin \`きのう読んだ本\` (cuốn sách đọc hôm qua), cấu trúc cố định chuẩn xác bắt buộc là **によると**.
* **Phân tích các phương án khác:**
  * 1. \`について\`: Về (vấn đề/chủ đề nào đó, ví dụ: \`日本の文化について調べる\`), không dùng làm nguồn dẫn truyền đạt thông tin với \`〜そうだ\`.
  * 2. \`からは\`: Từ..., không dùng với mẫu câu truyền đạt nguồn tin.
  * 3. \`より\`: So với..., dùng trong câu so sánh hơn kém, không phù hợp.

🌐 **Dịch nghĩa:** Theo cuốn sách tôi đã đọc ngày hôm qua thì nghe nói màu đỏ là màu sắc đem lại năng lượng/sự hoạt bát.`
  },
  {
    localPdfNumber: 5,
    globalIndex: 33,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "毎週日曜日の朝は、(　　)10 時ごろまで寝ています。",
    options: ["だいたい", "だんだん", "なかなか", "ひじょうに"],
    correctOption: 1,
    snippet: "だいたい (Đại khái / Hầu như / Khoảng chừng)",
    explanation: `🎯 **Đáp án đúng: [1] だいたい**

💬 **Giải thích chi tiết:**
* **Ý nghĩa phó từ:** **だいたい (大体)** có nghĩa là "khoảng chừng, đại khái, thường là". Đi với mốc thời gian ước chừng \`10時ごろまで\` (đến tầm khoảng 10 giờ) tạo nên thói quen: "sáng chủ nhật hàng tuần thường ngủ đến tầm 10 giờ".
* **Phân tích các phó từ khác:**
  * 2. \`だんだん\`: Dần dần, từ từ (biểu thị sự biến đổi trạng thái theo thời gian, ví dụ: \`だんだん暖かくなる\`).
  * 3. \`なかなか\`: Mãi mà (đi với phủ định: \`なかなか〜ない\`) hoặc khá là (đi với tính từ: \`なかなか上手だ\`).
  * 4. \`ひじょうに\`: Rất, cực kỳ (chỉ mức độ cao, đi cùng tính từ/trạng từ: \`非常に高い\`).

🌐 **Dịch nghĩa:** Vào các buổi sáng chủ nhật hàng tuần, tôi thường ngủ đại khái đến khoảng 10 giờ.`
  },
  {
    localPdfNumber: 6,
    globalIndex: 34,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "青木「石川さん、きのう(　　)パーティーこなかったんですか。」\\n石川「ようじがあったんです。」",
    options: ["どの", "どうして", "どのぐらい", "どうやって"],
    correctOption: 2,
    snippet: "どうして〜んですか (Tại sao... thế?)",
    explanation: `🎯 **Đáp án đúng: [2] どうして**

💬 **Giải thích chi tiết:**
* **Từ để hỏi:** **どうして** có nghĩa là "tại sao, vì lý do gì".
* Người đáp lại bằng câu giải thích nguyên nhân/lý do: \`ようじがあったんです\` (Vì tôi có việc bận). Do đó câu hỏi phía trước phải là hỏi lý do "Tại sao hôm qua bạn lại không đến bữa tiệc?".
* **Phân tích các phương án khác:**
  * 1. \`どの\`: Cái nào (từ hạn định đi trực tiếp trước danh từ: \`どの本\`).
  * 3. \`どのぐらい\`: Bao lâu, khoảng bao nhiêu (hỏi về lượng thời gian, khoảng cách, số tiền).
  * 4. \`どうやって\`: Bằng cách nào, làm thế nào (hỏi phương thức, cách thức di chuyển/thực hiện).

🌐 **Dịch nghĩa:** Aoki: "Anh Ishikawa ơi, hôm qua tại sao anh không đến bữa tiệc thế?" - Ishikawa: "Tại vì tôi có chút việc bận ạ."`
  },
  {
    localPdfNumber: 7,
    globalIndex: 35,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "うちのむすこはいつもそうじ(　　)ほかのことを始めてしまうので、そうじがぜんぜん終わらない。",
    options: ["あいだ", "ときに", "のとちゅうで", "のあと"],
    correctOption: 3,
    snippet: "〜の途中で (Giữa chừng lúc đang...)",
    explanation: `🎯 **Đáp án đúng: [3] のとちゅうで**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`[Danh từ] + の途中で (のとちゅうで)\` hoặc \`[V-る] + 途中で\` mang nghĩa "ở giữa chừng lúc đang làm gì đó thì một hành động khác xen ngang vào".
* Trong câu: Con trai tôi luôn luôn giữa chừng lúc đang dọn dẹp (\`そうじのとちゅうで\`) lại bắt đầu làm việc khác, nên việc dọn dẹp mãi không xong.
* **Phân tích các phương án khác:**
  * 1. \`あいだ\`: Cần trợ từ \`の\` sau danh từ (\`そうじのあいだ\`), và \`あいだ\` biểu thị suốt cả khoảng thời gian diễn ra song song chứ không mang nghĩa ngắt quãng giữa chừng làm dở dang.
  * 2. \`ときに\`: Cần \`の\` sau danh từ (\`そうじのときに\`), diễn tả thời điểm chung chung không làm nổi bật tính ngắt quãng giữa chừng.
  * 4. \`のあと\`: Sau khi dọn dẹp xong mà làm việc khác thì việc dọn dẹp đã hoàn thành rồi, mâu thuẫn với câu kết \`そうじがぜんぜん終わらない\` (dọn dẹp mãi không xong).

🌐 **Dịch nghĩa:** Con trai nhà tôi lúc nào cũng đang giữa chừng lúc dọn dẹp lại bày việc khác ra làm, nên việc dọn dẹp mãi mà chẳng xong.`
  },
  {
    localPdfNumber: 8,
    globalIndex: 36,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "山下「チンさんは京都に(　　)ことがありますか。」\\nチン「はい、あります。」",
    options: ["行き", "行った", "行こう", "行って"],
    correctOption: 2,
    snippet: "V-たことがある (Đã từng làm gì...)",
    explanation: `🎯 **Đáp án đúng: [2] 行った**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`Động từ thể Quá khứ ngắn (V-た) + ことがある\` biểu thị kinh nghiệm trong quá khứ: "Đã từng làm gì...".
* Động từ \`行く\` chia sang thể \`た\` là **行った**.
* Câu hỏi kinh nghiệm: \`京都に行ったことがありますか\` ➔ "Bạn đã từng đi Kyoto bao giờ chưa?".
* **Phân tích các phương án khác:**
  * 1. \`行き\`: Thể liên dụng (Masu bỏ masu), không kết hợp với \`ことがあります\`.
  * 3. \`行こう\`: Thể ý chí (V-ou), không đi với \`ことがあります\`.
  * 4. \`行って\`: Thể Te (V-te), không tạo thành mẫu câu kinh nghiệm quá khứ.

🌐 **Dịch nghĩa:** Yamashita: "Bạn Chin đã từng đi Kyoto bao giờ chưa?" - Chin: "Vâng, tôi đã từng đi rồi ạ."`
  },
  {
    localPdfNumber: 9,
    globalIndex: 37,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "私が山田さんに初めて(　　)3年前です。",
    options: ["会って", "会ってから", "会ったまま", "会ったのは"],
    correctOption: 4,
    snippet: "〜Vたのは〜 (Việc mà... là vào lúc...)",
    explanation: `🎯 **Đáp án đúng: [4] 会ったのは**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** Dạng nhấn mạnh danh từ hóa mệnh đề: \`[Mệnh đề V ngắn] + のは [Thời gian/Địa điểm/Người...] です\` mang ý nghĩa "Lần mà / Việc mà... chính là vào...".
* \`私が山田さんに初めて会ったのは 3 年前です\` ➔ "Lần đầu tiên tôi gặp anh Yamada là vào 3 năm trước".
* **Phân tích các phương án khác:**
  * 1. \`会って\`: Thể Te nối câu, không thể kết nối trực tiếp với danh từ chỉ thời gian đứng trước \`です\` theo cách này.
  * 2. \`会ってから\`: Kể từ sau khi gặp, đuôi câu phải là một khoảng thời gian trôi qua đi với hành động hoặc \`3年になります / 3年が経ちました\`, không nói \`会ってから3年前です\`.
  * 3. \`会ったまま\`: Cứ giữ nguyên trạng thái sau khi làm gì, sai hoàn toàn về mặt ngữ nghĩa và ngữ pháp.

🌐 **Dịch nghĩa:** Lần đầu tiên tôi gặp anh Yamada là vào 3 năm trước.`
  },
  {
    localPdfNumber: 10,
    globalIndex: 38,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "(大学)\\nA「今日いっしょにカラオケに行かない？」\\nB「ごめん。あした中に(　　)しゅくだいがまだ終わっていないから、今日は行けないんだ。」",
    options: ["出してはいない", "出さないといけない", "出さなくてもいい", "出さないほうがいい"],
    correctOption: 2,
    snippet: "〜ないといけない (Phải làm gì...)",
    explanation: `🎯 **Đáp án đúng: [2] 出さないといけない**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`V-ない + といけない / とだめだ\` mang ý nghĩa "bắt buộc phải làm gì...".
* Bổ nghĩa cho danh từ \`しゅくだい\` (bài tập): \`あした中に出さないといけないしゅくだい\` ➔ "Bài tập mà bắt buộc phải nộp trong ngày mai". Vì bài tập phải nộp chưa làm xong nên hôm nay không thể đi karaoke cùng bạn được.
* **Phân tích các phương án khác:**
  * 1. \`出してはいない\`: Không nộp, không tạo nghĩa bổ ngữ thích hợp cho bài tập cần hoàn thành.
  * 3. \`出さなくてもいい\`: Không phải nộp cũng được (nếu không cần nộp thì đã có thể đi hát rồi).
  * 4. \`出さないほうがいい\`: Không nên nộp (lời khuyên không nên làm gì, hoàn toàn vô lý với bài tập trường học).

🌐 **Dịch nghĩa:** (Ở trường đại học) A: "Hôm nay đi hát karaoke cùng tớ không?" - B: "Xin lỗi nhé. Bài tập phải nộp trong ngày mai tớ vẫn chưa làm xong nên hôm nay tớ không đi được rồi."`
  },
  {
    localPdfNumber: 11,
    globalIndex: 39,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "田中さんは花をプレゼントして、かのじょを(　　)。",
    options: ["よろこんだ", "よろこべた", "よろこばせた", "よろこばれた"],
    correctOption: 3,
    snippet: "Thể sai khiến (使役形): V-(さ)せる (Làm cho ai đó...)",
    explanation: `🎯 **Đáp án đúng: [3] よろこばせた**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** Thể sai khiến (使役形 - Shieki): Nhóm 1 đổi đuôi cột \`u\` sang cột \`a\` + \`せる\`. Động từ \`喜ぶ (よろこぶ - vui mừng)\` chia sang thể sai khiến là **喜ばせる (よろこばせる)**.
* Mẫu câu: \`[Người A] は [Người B] を + Động từ thể sai khiến\` ➔ "Người A làm cho người B cảm thấy thế nào / làm gì".
* Trợ từ đứng sau \`かのじょ\` là **を** (\`かのじょを\`), Tanaka tặng hoa và "làm cho cô ấy vui mừng" ➔ \`よろこばせた\` (quá khứ của よろこばせる).
* **Phân tích các phương án khác:**
  * 1. \`よろこんだ\`: Thể thường, chủ ngữ phải là người cảm thấy vui mừng (không đi với trợ từ \`かのじょを\`).
  * 2. \`よろこべた\`: Thể khả năng (có thể vui mừng), sai ngữ nghĩa.
  * 4. \`よろこばれた\`: Thể bị động (được người khác vui mừng), sai cấu trúc câu.

🌐 **Dịch nghĩa:** Anh Tanaka đã tặng hoa và làm cho bạn gái của mình rất vui.`
  },
  {
    localPdfNumber: 12,
    globalIndex: 40,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "西川「林さん、遅れなってすみません。」\\n中田「いいえ、私も今(　　)。」",
    options: ["来たところです", "来るところです", "来ていました", "来ています"],
    correctOption: 1,
    snippet: "V-たところです (Vừa mới làm xong...)",
    explanation: `🎯 **Đáp án đúng: [1] 来たところです**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`Động từ thể Quá khứ ngắn (V-た) + ところです\` mang ý nghĩa "vừa mới thực hiện xong hành động tức thì". Đi cùng phó từ **今 (いま)** nhấn mạnh khoảnh khắc vừa tới.
* Trong giao tiếp tiếng Nhật, khi đối phương xin lỗi vì đến muộn (\`遅くなってすみません\`), câu đáp lịch sự kinh điển để đối phương đỡ ngại là: \`いいえ、私も今来たところです\` ("Không sao đâu, tôi cũng vừa mới tới nơi thôi mà").
* **Phân tích các phương án khác:**
  * 2. \`来るところです\`: Chuẩn bị đến nơi (đang ở chỗ khác chuẩn bị đi/đến), không dùng khi người nói đã đứng đợi ở đó rồi.
  * 3. \`来ていました\`: Đã đến từ trước (như vậy chứng tỏ đối phương đến muộn thật, làm tăng sự áy náy).
  * 4. \`来ています\`: Đang có mặt ở đây, không thể hiện ý vừa mới tới.

🌐 **Dịch nghĩa:** Nishikawa: "Anh Hayashi ơi, xin lỗi vì tôi đến trễ nhé." - Nakata: "Không sao đâu, tôi cũng vừa mới tới thôi mà."`
  },
  {
    localPdfNumber: 13,
    globalIndex: 41,
    sectionType: "GRAMMAR",
    mondai: 1,
    text: "(レストランで)\\n中山「木村さんは何を食べる？」\\n木村「私はカレーに(　　)。」",
    options: ["する", "いい", "ください", "食べよう"],
    correctOption: 1,
    snippet: "N にする (Quyết định chọn món/lựa chọn N)",
    explanation: `🎯 **Đáp án đúng: [1] する**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`[Danh từ] + にする\` là mẫu câu quen thuộc dùng khi gọi món ăn tại nhà hàng hoặc đưa ra quyết định chọn một trong nhiều phương án: "Tôi quyết định chọn... / Cho tôi món...".
* \`私はカレーにする\` nghĩa là "Tôi chọn món cơm cà ri".
* **Phân tích các phương án khác:**
  * 2. \`いい\`: \`カレーにいい\` (tốt cho cà ri - sai ngữ nghĩa gọi món).
  * 3. \`ください\`: Đi với trợ từ を: \`カレーをください\`, không nói \`カレーにください\`.
  * 4. \`食べよう\`: Đi với trợ từ を: \`カレーを食べよう\`, không nói \`カレーに食べよう\`.

🌐 **Dịch nghĩa:** (Ở nhà hàng) Nakayama: "Kimura định ăn gì thế?" - Kimura: "Tớ chọn món cà ri nhé."`
  },

  // ================= MONDAI 2: Dấu sao ★ (Câu 14..17 / Global 42..45) =================
  {
    localPdfNumber: 14,
    globalIndex: 42,
    sectionType: "GRAMMAR",
    mondai: 2,
    text: "(電話で)\\nA「はい、さくら旅館です。」\\nB「すみません、今日は 3 人でとまれる ＿＿ ＿★＿ ＿＿ ＿＿。」\\nA「はい、空いています。」\\n\\n1: を　2: が　3: へや　4: 予約したいのです",
    options: ["を", "が", "へや", "予約したいのです"],
    correctOption: 1,
    snippet: "3人でとまれる [3 へや] [1 を]★ [4 予約したいのです] [2 が]",
    explanation: `🎯 **Đáp án đúng: [1] を (Vị trí ngôi sao ★ là 1)**

💬 **Giải thích chi tiết:**
* **Sắp xếp câu:**
  1. \`3人でとまれる\` (có thể ở được 3 người) là mệnh đề định ngữ bổ nghĩa cho danh từ \`へや\` (phòng) ➔ **[3] へや**
  2. Bổ ngữ của động từ đặt phòng \`予約したい\` cần trợ từ \`を\` ➔ **[1] を**
  3. Động từ bày tỏ nguyện vọng và lý do: \`予約したいのです\` ➔ **[4] 予約したいのです**
  4. Trợ từ liên từ mở lời ngập ngừng \`が\` ở cuối câu ➔ **[2] が**
* **Thứ tự đúng:** \`3 へや\` ➔ \`1 を\` ★ ➔ \`4 予約したいのです\` ➔ \`2 が\`
* **Câu hoàn chỉnh:** \`すみません、今日は 3 人でとまれるへやを予約したいのですが。\`
* Vị trí dấu sao ★ rơi vào số **[1] を**.

🌐 **Dịch nghĩa:** (Qua điện thoại) A: "Vâng, quán trọ Sakura xin nghe ạ." - B: "Xin lỗi, hôm nay tôi muốn đặt phòng cho 3 người ở được có được không ạ?" - A: "Vâng, hiện vẫn còn phòng trống ạ."`
  },
  {
    localPdfNumber: 15,
    globalIndex: 43,
    sectionType: "GRAMMAR",
    mondai: 2,
    text: "ともだちに ＿＿ ＿★＿ ＿＿ ＿＿ のに、家に忘れてきてしまった。\\n\\n1: 借りた　2: と思っていた　3: 返そう　4: 本を",
    options: ["借りた", "と思っていた", "返そう", "本を"],
    correctOption: 4,
    snippet: "ともだちに [1 借りた] [4 本を]★ [3 返そう] [2 と思っていた] のに",
    explanation: `🎯 **Đáp án đúng: [4] 本を (Vị trí ngôi sao ★ là 4)**

💬 **Giải thích chi tiết:**
* **Sắp xếp câu:**
  1. \`ともだちに借りた\` (đã mượn của bạn bè) bổ nghĩa cho danh từ \`本\` ➔ **[1] 借りた** ➔ **[4] 本を**
  2. Cấu trúc dự định: \`V-ý chí + と思っていた\` (đã định làm gì...): \`返そうと思っていた\` ➔ **[3] 返そう** ➔ **[2] と思っていた**
  3. Đi tiếp với liên từ biểu thị sự tiếc nuối: \`〜のに、家に忘れてきてしまった\` (thế mà lại quên khuấy ở nhà mất).
* **Thứ tự đúng:** \`1 借りた\` ➔ \`4 本を\` ★ ➔ \`3 返そう\` ➔ \`2 と思っていた\`
* **Câu hoàn chỉnh:** \`ともだちに借りた本を返そうと思っていたのに、家に忘れてきてしまった。\`
* Vị trí dấu sao ★ rơi vào số **[4] 本を**.

🌐 **Dịch nghĩa:** Đã định bụng trả quyển sách mượn của bạn, thế mà tôi lại để quên ở nhà mất rồi.`
  },
  {
    localPdfNumber: 16,
    globalIndex: 44,
    sectionType: "GRAMMAR",
    mondai: 2,
    text: "電車が遅れて、コンサートが始まる ＿＿ ＿＿ ＿★＿ ＿＿ が、間に合った。\\n\\n1: までに　2: かどうか　3: 心配した　4: 会場に着く",
    options: ["までに", "かどうか", "心配した", "会場に着く"],
    correctOption: 2,
    snippet: "コンサートが始まる [1 までに] [4 会場に着く] [2 かどうか]★ [3 心配した] が",
    explanation: `🎯 **Đáp án đúng: [2] かどうか (Vị trí ngôi sao ★ là 2)**

💬 **Giải thích chi tiết:**
* **Sắp xếp câu:**
  1. \`コンサートが始まるまでに\` (trước khi buổi hòa nhạc bắt đầu) ➔ **[1] までに**
  2. Đến được hội trường: \`会場に着く\` ➔ **[4] 会場に着く**
  3. Cấu trúc phân vân/lo lắng: \`V thể từ điển + かどうか + 心配した\` (lo lắng liệu có... hay không) ➔ **[2] かどうか** ➔ **[3] 心配した**
  4. Đi với liên từ đối lập \`が、間に合った\` (nhưng may mắn là vẫn kịp).
* **Thứ tự đúng:** \`1 までに\` ➔ \`4 会場に着く\` ➔ \`2 かどうか\` ★ ➔ \`3 心配した\`
* **Câu hoàn chỉnh:** \`電車が遅れて、コンサートが始まるまでに会場に着くかどうか心配したが、間に合った。\`
* Vị trí dấu sao ★ rơi vào số **[2] かどうか**.

🌐 **Dịch nghĩa:** Tàu điện bị trễ nên tôi đã rất lo lắng liệu có đến hội trường kịp trước khi buổi hòa nhạc bắt đầu hay không, nhưng may mắn là vẫn kịp giờ.`
  },
  {
    localPdfNumber: 17,
    globalIndex: 45,
    sectionType: "GRAMMAR",
    mondai: 2,
    text: "最近、弟は、私が ＿＿ ＿＿ ＿★＿ ＿＿ なりました。\\n\\n1: ように　2: アニメに　3: きょうみをもつ　4: 見ている",
    options: ["ように", "アニメに", "きょうみをもつ", "見ている"],
    correctOption: 3,
    snippet: "私が [4 見ている] [2 アニメに] [3 きょうみをもつ]★ [1 ように] なりました",
    explanation: `🎯 **Đáp án đúng: [3] きょうみをもつ (Vị trí ngôi sao ★ là 3)**

💬 **Giải thích chi tiết:**
* **Sắp xếp câu:**
  1. \`私が見ている\` (tôi đang xem) bổ nghĩa cho danh từ bộ phim hoạt hình \`アニメ\` ➔ **[4] 見ている** ➔ **[2] アニメに**
  2. Cụm từ cố định: \`〜に興味を持つ (きょうみをもつ)\` (hứng thú / quan tâm đến cái gì) ➔ **[3] きょうみをもつ**
  3. Cấu trúc biến đổi thói quen/trạng thái: \`V thể từ điển + ようになる\` (trở nên / dần có thói quen làm gì) ➔ **[1] ように** + \`なりました\`
* **Thứ tự đúng:** \`4 見ている\` ➔ \`2 アニメに\` ➔ \`3 きょうみをもつ\` ★ ➔ \`1 ように\`
* **Câu hoàn chỉnh:** \`最近、弟は、私が見ているアニメにきょうみをもつようになりました。\`
* Vị trí dấu sao ★ rơi vào số **[3] きょうみをもつ**.

🌐 **Dịch nghĩa:** Gần đây, em trai tôi đã bắt đầu tỏ ra hứng thú với những bộ phim hoạt hình (anime) mà tôi đang xem.`
  },

  // ================= MONDAI 3: Điền vào đoạn văn (Câu 18..21 / Global 46..49) =================
  {
    localPdfNumber: 18,
    globalIndex: 46,
    sectionType: "GRAMMAR",
    mondai: 3,
    text: "さくら美術館( 18 )小さな美術館で、白くてきれいな建物でした。",
    options: ["が", "という", "より", "なら"],
    correctOption: 2,
    snippet: "〜という (Có tên gọi là...)",
    explanation: `🎯 **Đáp án đúng: [2] という**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`[Tên riêng/Danh từ 1] + という + [Danh từ 2]\` mang ý nghĩa "Danh từ 2 có tên gọi là Danh từ 1", dùng khi giới thiệu một địa danh, sự vật mới cho người nghe/đọc.
* Trong bài văn: Tác giả phát hiện ra một bảo tàng mỹ thuật và giới thiệu: \`さくら美術館という小さな美術館で\` (Đó là một bảo tàng mỹ thuật nhỏ có tên là Bảo tàng Sakura...).
* **Phân tích các phương án khác:**
  * 1. \`が\`: Chỉ chủ ngữ, không đứng giữa hai danh từ để bổ nghĩa chỉ định danh tính theo cách này.
  * 3. \`より\`: So sánh hơn.
  * 4. \`なら\`: Giả định điều kiện "nếu là".

🌐 **Dịch nghĩa:** Đó là một bảo tàng mỹ thuật nhỏ có tên là Bảo tàng mỹ thuật Sakura, tòa nhà màu trắng rất đẹp.`
  },
  {
    localPdfNumber: 19,
    globalIndex: 47,
    sectionType: "GRAMMAR",
    mondai: 3,
    text: "それで、きっさてんで少し( 19 )。大きな窓がある明るいきっさてんでした。",
    options: ["休みそうです", "休んだほうがよかったです", "休んでおきました", "休むことにしました"],
    correctOption: 4,
    snippet: "〜ことにする (Quyết định làm gì)",
    explanation: `🎯 **Đáp án đúng: [4] 休むことにしました**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`Động từ thể từ điển (V-る) + ことにする\` diễn tả một quyết định mang tính chủ quan của bản thân người nói/người viết. Ở quá khứ dùng \`〜ことにしました\`.
* Ngữ cảnh: Tác giả nhìn thấy bên trong bảo tàng có một quán cà phê giải khát, vì vậy tác giả đã quyết định vào đó nghỉ ngơi một chút (\`きっさてんで少し休むことにしました\`).
* **Phân tích các phương án khác:**
  * 1. \`休みそうです\`: Trông có vẻ sắp nghỉ ngơi (sai ngữ cảnh phán đoán ngoại cảnh).
  * 2. \`休んだほうがよかったです\`: Lẽ ra nên nghỉ ngơi thì tốt hơn (bày tỏ sự nuối tiếc vì trong quá khứ đã không làm).
  * 3. \`休んでおきました\`: Làm gì đó sẵn trước để chuẩn bị cho mục đích tương lai, không tự nhiên trong ngữ cảnh này.

🌐 **Dịch nghĩa:** Vì vậy, tôi đã quyết định ngồi nghỉ ngơi một chút ở quán cà phê.`
  },
  {
    localPdfNumber: 20,
    globalIndex: 48,
    sectionType: "GRAMMAR",
    mondai: 3,
    text: "窓から見える庭にはいろいろな花がさいていました。( 20 )喫茶店の中にも花の絵がたくさんありました。",
    options: ["たとえば", "だから", "そして", "とくに"],
    correctOption: 3,
    snippet: "そして (Và / Hơn nữa - liên từ bổ sung)",
    explanation: `🎯 **Đáp án đúng: [3] そして**

💬 **Giải thích chi tiết:**
* **Cấu trúc liên từ:** **そして** dùng để liên kết và bổ sung thêm thông tin cùng chiều tiếp theo ("Và lại / Hơn nữa / Tiếp theo đó").
* Câu trước: Trong khu vườn nhìn từ cửa sổ ra có muôn hoa đua nở.
* Câu sau: Tiếp tục bổ sung thêm cảnh đẹp bên trong quán: "Và lại, ngay bên trong quán cà phê cũng treo rất nhiều tranh hoa" (\`喫茶店の中にも花の絵がたくさんありました\`).
* **Phân tích các liên từ khác:**
  * 1. \`たとえば\`: Ví dụ như (dùng để đưa ra ví dụ minh họa).
  * 2. \`だから\`: Vì vậy (chỉ kết quả nguyên nhân - hệ quả).
  * 4. \`とくに\`: Đặc biệt là (dùng để nhấn mạnh một đối tượng nổi bật trong tập hợp).

🌐 **Dịch nghĩa:** Ở khu vườn ngắm qua cửa sổ có đủ loài hoa đang nở rực rỡ. Và lại, ngay cả bên trong quán cà phê cũng có rất nhiều bức tranh vẽ hoa.`
  },
  {
    localPdfNumber: 21,
    globalIndex: 49,
    sectionType: "GRAMMAR",
    mondai: 3,
    text: "美術館に入る料金を渡さなくても、きっさてんには( 21 )。それで、最近よく行っています。",
    options: ["入ることができます", "入ってもらいます", "入るつもりです", "入っていきます"],
    correctOption: 1,
    snippet: "V-ることができる (Có thể làm gì... - Khả năng)",
    explanation: `🎯 **Đáp án đúng: [1] 入ることができます**

💬 **Giải thích chi tiết:**
* **Cấu trúc ngữ pháp:** \`V thể từ điển + ことができる\` biểu thị năng lực hoặc điều kiện cho phép có thể thực hiện một hành động nào đó.
* Ngữ cảnh: Dù không trả tiền mua vé vào cổng bảo tàng mỹ thuật (\`料金を渡さなくても\`), khách vẫn có thể tự do vào quán cà phê được (\`きっさてんには入ることができます\`).
* **Phân tích các phương án khác:**
  * 2. \`入ってもらいます\`: Nhờ vả ai đó vào quán giúp mình, sai chủ thể và vô nghĩa.
  * 3. \`入るつもりです\`: Dự định sẽ vào (không phù hợp với cấu trúc điều kiện cho phép \`〜なくても\`).
  * 4. \`入っていきます\`: Đi vào trong đó (hướng di chuyển ra xa), không nêu bật được tính chất điều kiện khả năng.

🌐 **Dịch nghĩa:** Cho dù không cần trả tiền vé vào bảo tàng mỹ thuật thì ta vẫn có thể vào quán cà phê này được. Vì thế dạo gần đây tôi rất hay lui tới.`
  },

  // ================= MONDAI 4: Đoản văn (Câu 22..24 / Global 50..52) =================
  {
    localPdfNumber: 22,
    globalIndex: 50,
    sectionType: "GRAMMAR",
    mondai: 4,
    text: "【メールの内容】\\nヤンさん\\n大会議室の予約のことですが、来週の木曜日で 2 時間使えるのは、10 時からと 14 時からの 2 回です。どちらがいいでしょうか。会議の時間が決まったら、知らせてください。すぐに予約します。\\n中村\\n\\n質問：このメールを読んで、ヤンさんは何をしなければなりませんか。",
    options: [
      "来週の木曜日に大会議室が使える時間を調べます。",
      "来週の木曜日に会議が 2 回あることを、みんなに知らせます。",
      "会議の時間は 10 時と 14 時のどちらがいいか、中村さんに知らせます。",
      "会議の時間を決めて、自分で会議室を予約します。"
    ],
    correctOption: 3,
    snippet: "Đọc hiểu ngắn: Đọc email công việc và xác định hành động cần làm",
    explanation: `🎯 **Đáp án đúng: [3] 会議の時間は 10 時と 14 時のどちらがいいか、中村さんに知らせます。**

💬 **Giải thích chi tiết:**
* **Tìm kiếm thông tin chính:** Trong email, anh Nakamura viết:
  * \`10 時からと 14 時からの 2 回です。どちらがいいでしょうか。\` (Có 2 khung giờ trống là từ 10:00 và từ 14:00. Khung giờ nào thì tiện hơn?)
  * \`会議の時間が決まったら、知らせてください。すぐに予約します。\` (Sau khi chốt thời gian họp thì hãy báo cho tôi biết nhé. Tôi sẽ đặt phòng họp ngay lập tức.)
* Như vậy, việc Yang phải làm là chọn xem khung giờ 10:00 hay 14:00 tốt hơn và thông báo cho Nakamura.
* **Phân tích các phương án sai:**
  * 1. Nakamura đã kiểm tra sẵn thời gian dùng được rồi, Yang không cần tra cứu lại nữa.
  * 2. Không phải có 2 cuộc họp, mà là có 2 khung giờ trống để chọn 1.
  * 4. Nakamura sẽ là người đặt phòng (\`すぐに予約します\`), Yang không cần tự đặt phòng.

🌐 **Dịch nghĩa:** Sau khi đọc email này, Yang phải làm việc gì? ➔ Báo cho anh Nakamura biết thời gian họp là 10 giờ hay 14 giờ thì thích hợp hơn.`
  },
  {
    localPdfNumber: 23,
    globalIndex: 51,
    sectionType: "GRAMMAR",
    mondai: 4,
    text: "【本文】\\n「①今日は、新聞は休みだから、ないよ。」\\n昨日コンビニで、店員さんがお客さんに言った言葉を聞いて、私は②びっくりしました。\\n先週の日本語の授業で、先生が「質問がありますか。」と聞いたとき、友達が「ないよ。」と答えました。すると、先生は「『ありません』と答えましょう。先生は友達ではないので、失礼な言い方ですよ。」と注意したからです。\\nでも、店員さんは次のお客さんには「新聞は休みなのて、ありません。」と答えていました。最初のお客さんは店員の友達だったのかもしれません。\\n\\n質問：「①今日は、新聞は休みだから、ないよ。」といったのは誰ですか。",
    options: ["「私」", "店員", "先生", "友達"],
    correctOption: 2,
    snippet: "Đọc hiểu ngắn: Xác định nhân vật phát ngôn",
    explanation: `🎯 **Đáp án đúng: [2] 店員**

💬 **Giải thích chi tiết:**
* **Chi tiết trong bài:** Ngay sau câu nói ①, tác giả viết:
  * \`昨日コンビニで、店員さんがお客さんに言った言葉を聞いて、私は②びっくりしました。\`
  * (Hôm qua ở cửa hàng tiện lợi, khi nghe câu nói mà nhân viên bán hàng nói với khách, tôi đã giật mình).
* Do đó, người nói câu "Hôm nay báo nghỉ phát hành nên không có đâu nhé" chính là **nhân viên cửa hàng (店員)**.
* **Phân tích các phương án khác:**
  * 1. \`「私」\`: Tác giả là người nghe thấy câu nói đó chứ không phải người nói.
  * 3. \`先生\`: Giáo viên dạy tiếng Nhật ở đoạn sau.
  * 4. \`友達\`: Bạn học cùng lớp ở đoạn giải thích lý do giật mình.

🌐 **Dịch nghĩa:** Người đã nói "Hôm nay báo nghỉ phát hành nên không có đâu nhé" là ai? ➔ Là nhân viên cửa hàng tiện lợi.`
  },
  {
    localPdfNumber: 24,
    globalIndex: 52,
    sectionType: "GRAMMAR",
    mondai: 4,
    text: "質問：②びっくりしましたとありますが、なぜですか。",
    options: [
      "店員が失礼な言い方をしたと思ったから",
      "店員が言ったことがわからなかった",
      "店員が先生に注意されているのを見たから",
      "店員が友達と話していると思ったから。"
    ],
    correctOption: 1,
    snippet: "Đọc hiểu ngắn: Lý do tác giả ngạc nhiên",
    explanation: `🎯 **Đáp án đúng: [1] 店員が失礼な言い方をしたと思ったから**

💬 **Giải thích chi tiết:**
* **Tìm kiếm lý do trong bài:** Tác giả giải thích nguyên nhân ngạc nhiên ở đoạn giữa:
  * Tuần trước trong giờ học, khi bạn trả lời giáo viên là \`ないよ\` thì cô giáo đã nhắc nhở: \`先生は友達ではないので、失礼な言い方ですよ\` (Cô giáo không phải là bạn bè nên nói như vậy là thất lễ đấy).
  * Do đó, khi thấy nhân viên nói với khách bằng cách nói xuồng xã \`ないよ\`, tác giả nghĩ rằng nhân viên đang nói một cách thất lễ/bất lịch sự với khách hàng (\`店員が失礼な言い方をしたと思ったから\`) nên mới ngạc nhiên.
* **Phân tích các phương án sai:**
  * 2. Tác giả hiểu rất rõ nhân viên nói gì chứ không phải không hiểu.
  * 3. Người bị giáo viên nhắc nhở là bạn cùng lớp của tác giả chứ không phải nhân viên cửa hàng.
  * 4. Mãi đến cuối bài sau khi thấy nhân viên nói lịch sự với khách tiếp theo, tác giả mới suy đoán có lẽ người khách đầu tiên là bạn của nhân viên, đó không phải là lý do khiến tác giả giật mình lúc ban đầu.

🌐 **Dịch nghĩa:** Bài văn có viết "tôi đã rất ngạc nhiên", tại sao lại như vậy? ➔ Vì tác giả cho rằng nhân viên bán hàng đã dùng cách nói bất lịch sự/thất lễ với khách.`
  },

  // ================= MONDAI 5: Trung văn (Câu 25..27 / Global 53..55) =================
  {
    localPdfNumber: 25,
    globalIndex: 53,
    sectionType: "GRAMMAR",
    mondai: 5,
    text: "【本文抜粋】\\n日本の大学入学して半年が過ぎました。日本に来たら、たくさん旅行をしたかったのですが、①なかなか行けません。日本の電車や飛行機は便利ですが、りょきんが高いのです。だから、普通の旅行には行けませんが、最近いいやり方を見つけました。私だけの小さな「バス旅行」です。\\n\\n質問：どうして①なかなか行けませんか。",
    options: [
      "大学の勉強が忙しくて時間がないから。",
      "日本の電車や飛行機があまり便利ではないから。",
      "日本の電車や飛行機は乗り方が難しいから。",
      "日本の電車や飛行機は料金が高いから。"
    ],
    correctOption: 4,
    snippet: "Đọc hiểu trung văn: Tìm nguyên nhân không đi du lịch được",
    explanation: `🎯 **Đáp án đúng: [4] 日本の電車や飛行機は料金が高いから。**

💬 **Giải thích chi tiết:**
* **Chi tiết trong bài:** Ngay sau cụm từ ①, bài viết nêu rõ nguyên nhân:
  * \`日本の電車や飛行機は便利ですが、りょきんが高いのです。\` (Tàu điện và máy bay ở Nhật Bản tuy tiện lợi nhưng giá vé lại đắt đỏ).
  * Từ đó dẫn đến kết luận: \`だから、普通の旅行には行けませんが...\` (Vì thế tôi không thể đi các chuyến du lịch thông thường được).
* Do đó lý do tác giả không đi du lịch được là vì cước phí tàu xe, máy bay quá đắt đỏ.
* **Phân tích các phương án sai:**
  * 1. Bài viết không hề đề cập đến việc học ở trường đại học bận rộn không có thời gian.
  * 2. Bài viết khẳng định tàu điện và máy bay rất tiện lợi (\`便利ですが\`) chứ không phải không tiện lợi.
  * 3. Bài viết không nói cách đi lại phức tạp khó khăn.

🌐 **Dịch nghĩa:** Tại sao tác giả lại mãi mà không thể đi du lịch được? ➔ Vì tiền vé tàu điện và máy bay ở Nhật Bản đắt.`
  },
  {
    localPdfNumber: 26,
    globalIndex: 54,
    sectionType: "GRAMMAR",
    mondai: 5,
    text: "【本文抜粋】\\n私の「バス旅行」は、町を走る普通のバスに乗って、最後のバス停まで行ってみる旅行です。東京の町の中を走る普通のバスは、最後まで乗っても２１０円です、片道は長くても１時間ぐらいです。私はいつも、窓から外を見たり、乗っている人の会話を聞いたりしています。最後のバス停に着いたら、近くをゆっくり散歩します。そして、またバスに乗って戻ってきます。\\n\\n質問：「私」は、いつもどんな「バス旅行」をしていますか。",
    options: [
      "バスに乗っている人たちと会話を楽しむ旅行。",
      "バスに乗って、降りたいところで降りて、散歩を楽しむ旅行。",
      "バスに乗っている時間や、最後のバス停の近くの散歩を楽しむ旅行。",
      "行きたい場所を調べてバスで行って、バスを降りて散歩を楽しむ旅行。"
    ],
    correctOption: 3,
    snippet: "Đọc hiểu trung văn: Nội dung 'chuyến du lịch xe buýt' của tác giả",
    explanation: `🎯 **Đáp án đúng: [3] バスに乗っている時間や、最後のバス停の近くの散歩を楽しむ旅行。**

💬 **Giải thích chi tiết:**
* **Chi tiết trong bài:** Tác giả mô tả chi tiết:
  * Trên xe buýt: \`窓から外を見たり、乗っている人の会話を聞いたりしています\` (ngắm cảnh bên ngoài cửa sổ, lắng nghe cuộc trò chuyện của những người xung quanh).
  * Đến trạm cuối: \`最後のバス停に着いたら、近くをゆっくり散歩します。そして、またバスに乗って戻ってきます。\` (đến trạm xe buýt cuối cùng thì thong thả đi dạo xung quanh, rồi lại lên xe buýt quay về).
* Như vậy, chuyến du lịch bằng xe buýt của tác giả chính là tận hưởng khoảng thời gian ngồi trên xe buýt và đi dạo ở khu vực gần trạm xe buýt cuối cùng.
* **Phân tích các phương án sai:**
  * 1. Tác giả chỉ lắng nghe các hành khách khác nói chuyện (\`会話を聞いたり\`) chứ không tham gia trò chuyện với họ.
  * 2. Tác giả đi đến tận trạm cuối cùng (\`最後のバス停まで\`) chứ không phải tùy hứng thích xuống ở đâu thì xuống.
  * 4. Tác giả không hề tìm kiếm địa điểm muốn đi từ trước, chuyến đi này hoàn toàn không có kế hoạch điểm đến cố định.

🌐 **Dịch nghĩa:** Tác giả luôn thực hiện "chuyến du lịch xe buýt" như thế nào? ➔ Là chuyến du lịch tận hưởng khoảng thời gian ngồi trên xe buýt và đi dạo ở khu vực quanh trạm xe buýt cuối cùng.`
  },
  {
    localPdfNumber: 27,
    globalIndex: 55,
    sectionType: "GRAMMAR",
    mondai: 5,
    text: "【本文抜粋】\\n降りるとき、運転手が心配して「大丈夫ですか。これからどこへ行くんですか。」と聞いてくれました。特に行く場所を考えていない私は、質問にうまく答えられませんでした。②困ってしまって、自分でちょっと笑ってしまいました。\\n\\n質問：②困ってしまってとありますが、どうして「私」は困りますか。",
    options: [
      "寝てしまって、最後のバス停まで来てしまったから。",
      "行く場所を決めない旅行をしているので、質問に答えられなかったから。",
      "運転手の質問の意味が分からなくて、答えられなかったから。",
      "行きたい場所の名前が思い出せなくて、質問に答えられなかったから。"
    ],
    correctOption: 2,
    snippet: "Đọc hiểu trung văn: Lý do tác giả bối rối, khó xử",
    explanation: `🎯 **Đáp án đúng: [2] 行く場所を決めない旅行をしているので、質問に答えられなかったから。**

💬 **Giải thích chi tiết:**
* **Chi tiết trong bài:** Khi tài xế xe buýt thấy tác giả ngủ quên và hỏi lo lắng: "Bạn có sao không? Từ đây bạn định đi đâu thế?", tác giả viết:
  * \`特に行く場所を考えていない私は、質問にうまく答えられませんでした。困ってしまって、自分でちょっと笑ってしまいました。\`
  * (Vì vốn dĩ tôi chẳng hề nghĩ trước sẽ đi đâu nên tôi không biết phải trả lời câu hỏi thế nào cho ổn. Tôi cảm thấy bối rối, khó xử rồi tự bật cười).
* Do chuyến đi không hề ấn định điểm đến cụ thể, nên khi được hỏi đi đâu thì tác giả không biết trả lời thế nào, dẫn đến bối rối.
* **Phân tích các phương án sai:**
  * 1. Tác giả vốn dĩ từ đầu đã có chủ đích đi đến trạm cuối cùng, ngủ quên chỉ là sự cố nhỏ chứ việc tới trạm cuối không phải lý do bối rối.
  * 3. Tác giả hiểu rất rõ câu hỏi của bác tài xế tiếng Nhật, chỉ là không có câu trả lời.
  * 4. Tác giả không hề định đi đâu nên không có tên địa điểm nào để mà quên.

🌐 **Dịch nghĩa:** Bài văn viết "tôi đã cảm thấy bối rối", tại sao tác giả lại bối rối? ➔ Vì tác giả đang đi một chuyến du lịch không định trước điểm đến, nên không biết trả lời thế nào cho câu hỏi của tài xế.`
  },

  // ================= MONDAI 6: Tìm kiếm thông tin (Câu 28..29 / Global 56..57) =================
  {
    localPdfNumber: 28,
    globalIndex: 56,
    sectionType: "GRAMMAR",
    mondai: 6,
    text: "ジェイさんは、小学生の娘と二人でピザを作りに行きたいです。ジェイさんのエプロンは持っていきますが、娘のものは借りるつもりです。ジェイさんたちが、ピザ教室に払う料金はどうなりますか。",
    options: [
      "ジェイさん 1,000 円だけ、娘 1,000 円と 200 円",
      "ジェイさん 1,500 円だけ、娘 1,000 円だけ",
      "ジェイさん 1,500 円だけ、娘 1,000 円と 200 円",
      "ジェイさん 1,500 円と 200 円、娘 1,000 円と 200 円"
    ],
    correctOption: 3,
    snippet: "Tìm kiếm thông tin: Tính toán chi phí tham gia lớp học làm bánh pizza",
    explanation: `🎯 **Đáp án đúng: [3] ジェイさん 1,500 円だけ、娘 1,000 円と 200 円**

💬 **Giải thích chi tiết:**
* **Bảng cước phí và điều kiện trong thông báo:**
  * Người lớn (大人): \`1,500 円\`
  * Học sinh tiểu học trở xuống (小学生以下): \`1,000 円\`
  * Thuê tạp dề (エプロンを借りる): \`200 円 / người\`
* **Áp dụng vào trường hợp của Jay:**
  1. Jay là người lớn: Phí tham gia là \`1,500 円\`. Jay tự mang tạp dề của mình (\`持っていきます\`) nên không mất phí thuê ➔ **Jay trả 1,500 円**.
  2. Con gái học tiểu học (小学生の娘): Phí tham gia là \`1,000 円\`. Con gái sẽ thuê tạp dề của quán (\`借りるつもりです\`) nên mất thêm 200 円 ➔ **Con gái trả 1,000 円 và 200 円**.
* Do đó, phương án đúng tuyệt đối là **[3]**.

🌐 **Dịch nghĩa:** Anh Jay muốn cùng con gái học tiểu học đi làm bánh pizza. Jay tự mang tạp dề đi, còn con gái thì dự định thuê tạp dề của quán. Chi phí họ phải trả cho lớp học làm pizza sẽ là bao nhiêu? ➔ Anh Jay trả 1,500 yên; con gái trả 1,000 yên và 200 yên.`
  },
  {
    localPdfNumber: 29,
    globalIndex: 57,
    sectionType: "GRAMMAR",
    mondai: 6,
    text: "ナムさんは、大学の友達と 3 人で、ピザ教室の予約をしました。ナムさんたちはピザ教室のあと、作ったピザを食べて帰ろうと思っています。ピザを食べるときに、何をサービスしてもらえますか。",
    options: [
      "飲み物とサラダ",
      "飲み物とサラダとアイスクリーム",
      "アイスクリーム",
      "500 円チケット"
    ],
    correctOption: 1,
    snippet: "Tìm kiếm thông tin: Điều kiện nhận dịch vụ ưu đãi",
    explanation: `🎯 **Đáp án đúng: [1] 飲み物とサラダ**

💬 **Giải thích chi tiết:**
* **Quy định dịch vụ (サービス) trong bảng thông báo:**
  * Khách ăn tại quán (店で食べるお客様):
    * \`飲み物とサラダ\` (Đồ uống và salad) dành cho mọi khách ăn tại quán.
    * \`アイスクリーム（5人以上のお客様）\` (Kem chỉ dành cho nhóm từ 5 người trở lên).
  * Khách mang về (持って帰るお客様):
    * \`500円チケット\` (Phiếu giảm giá 500 yên cho lần sau).
* **Xét trường hợp của Nam:**
  * Nhóm Nam có **3 người** (Nam và 2 người bạn đại học).
  * Dự định ăn tại quán (\`作ったピザを食べて帰ろう\`).
  * Vì số lượng là 3 người (< 5 người) nên không đủ điều kiện nhận kem (アイスクリーム).
  * Do đó, nhóm Nam sẽ được phục vụ miễn phí: **Đồ uống và salad (飲み物とサラダ)**.
* Vậy đáp án đúng là **[1]**.

🌐 **Dịch nghĩa:** Nam cùng 2 người bạn đại học (tổng 3 người) đã đặt chỗ lớp học pizza. Sau lớp học, nhóm Nam dự định sẽ ăn bánh pizza vừa làm tại quán rồi mới về. Khi ăn pizza, họ sẽ được phục vụ miễn phí những gì? ➔ Đồ uống và salad.`
  }
];

// Hàm sinh object TS cho các câu 29..57
function generateTsBlock() {
  const lines = [];
  grammarData.forEach(item => {
    const qObj = {
      snippet: item.snippet,
      explanation: item.explanation,
      text: item.text,
      options: item.options,
      correctOption: item.correctOption
    };
    lines.push(`    "${item.globalIndex}": ${JSON.stringify(qObj, null, 6).trim()}`);
  });
  return lines.join(',\n') + ',\n';
}

function run() {
  console.log('1. Updating server_admin_exams.json...');
  const adminFilePath = path.join(__dirname, '../frontend/src/app/data/server_admin_exams.json');
  const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));
  const targetExam = adminData.exams.find(e => e.id === 'ex-1792170392122' || e.examCode === 'n4-2024-07');
  if (!targetExam) {
    throw new Error('Target exam not found in server_admin_exams.json');
  }

  const v = targetExam.versions[0];
  if (!v.questions) v.questions = {};

  grammarData.forEach(item => {
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

    // Tìm "29": { sau keyIdx
    const q29Marker = '"29": {';
    const q29Idx = tsContent.indexOf(q29Marker, keyIdx);
    if (q29Idx === -1) {
      console.warn(`"29": { not found for ${tKey}`);
      continue;
    }

    // Tìm "58": { sau q29Idx
    const q58Marker = '"58": {';
    const q58Idx = tsContent.indexOf(q58Marker, q29Idx);
    if (q58Idx === -1) {
      console.warn(`"58": { not found for ${tKey}`);
      continue;
    }

    // Thay thế đoạn từ q29Idx đến q58Idx bằng newTsBlock
    const before = tsContent.slice(0, q29Idx);
    const after = tsContent.slice(q58Idx);
    tsContent = before + newTsBlock + '  ' + after;
    console.log(`✓ Replaced questions 29..57 for key "${tKey}"!`);
  }

  fs.writeFileSync(tsFilePath, tsContent, 'utf8');
  console.log('✓ jlptDetailedExplanations.ts updated successfully!');
}

run();
