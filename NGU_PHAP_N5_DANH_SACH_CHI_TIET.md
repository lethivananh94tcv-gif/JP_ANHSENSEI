# 📖 TỔNG HỢP CHI TIẾT 100% NGỮ PHÁP JLPT N5 (BÀI 1 - BÀI 25) - DỰ ÁN ANH SENSEI

> **Mục đích:** Tài liệu này tổng hợp đầy đủ **100% kiến thức ngữ pháp N5** đã được cài đặt và cập nhật bổ sung trong cơ sở dữ liệu (`V46` & `V47__supplement_all_missing_n5_grammar_points.sql`) của dự án **ANH SENSEI**. Mỗi mẫu ngữ pháp đều có **Cấu trúc, Ý nghĩa, Giải thích chi tiết và Ví dụ minh họa tiếng Nhật / Việt kèm Furigana** để tra cứu tiện lợi.

---

## 📌 BẢNG TỔNG QUAN CHƯƠNG TRÌNH N5 (BÀI 1 - BÀI 25)

| Bài | Chủ đề ngữ pháp cốt lõi | Mẫu ngữ pháp đầy đủ | Số lượng mẫu | Trạng thái DB |
| :-: | :--- | :--- | :-: | :-: |
| **Bài 1** | Giới thiệu bản thân & Danh từ cơ bản | `N1 は N2 です` / `ではありません` / `ですか` / `N も` / `N の N` / `〜さん` / Hỏi nghề nghiệp (`お仕事は何ですか`), Quốc tịch (`どちらから来ましたか`) | 7 mẫu | `PUBLISHED` |
| **Bài 2** | Chỉ định từ vật thể & Bổ nghĩa | `これ/それ/あれ` / `この/その/あの N` / `そう です` / `N1 か N2 か` / `どれ` / `どの N` / Phủ định trực tiếp (`いいえ、そうじゃありません / 違います`) | 6 mẫu | `PUBLISHED` |
| **Bài 3** | Chỉ định địa điểm & Xuất xứ | `ここ/そこ/あそこ` / `どこ/どちら` / `N1 の N2 (Xuất xứ)` / `こちら/そちら/あちら` / `N は Place です` / Hỏi giá (`〜は いくら ですか`) | 6 mẫu | `PUBLISHED` |
| **Bài 4** | Thời gian & Động từ cơ bản | `〜時〜分 に V` / `Vます・ません・ました` / `〜から〜まで` / `〜ごろ` / `いつ` / Cách đọc `何時・何分` / Quy tắc trợ từ `に` với thời gian | 6 mẫu | `PUBLISHED` |
| **Bài 5** | Di chuyển, Phương tiện & Động hành | `Địa điểm へ 行きます` / `Phương tiện で` / `Người と 行きます` / Phân biệt `行きます/来ます/帰ります` / `どこへも〜ません` / `N (Địa điểm) から` | 6 mẫu | `PUBLISHED` |
| **Bài 6** | Tân ngữ & Rủ rê lịch sự | `N を V` / `Địa điểm で V` / `V-ませんか` / `V-ましょう` / `いっしょに V-ませんか` / `何 を しますか` / Phân biệt `で` nơi diễn ra hành động | `PUBLISHED` |
| **Bài 7** | Công cụ & Cho nhận đồ vật | `Công cụ で V` / `N1 に N2 を あげます / もらいます` / `かします / かります` / `おしえます / ならいます` / `N を ください` / `もう〜ました / まだです` | `PUBLISHED` |
| **Bài 8** | Tính từ い & Tính từ な | `N は Adj-い / Adj-な です` / Phủ định tính từ / `とても` / `あまり〜ません` / `N は どうですか` / `どんな N` / Mô tả tính từ trước N (`Adj-い N` / `Adj-な N`) | `PUBLISHED` |
| **Bài 9** | Sở thích, Năng lực & Lý do | `N が 好きです / わかります` / `Mệnh đề 1 から Mệnh đề 2` / `嫌いです / 上手です / 下手です` / Phó từ mức độ & tần suất (`よく/だいたい/少し...`) / `どうして` / `N が あります` (Sở hữu/Sự kiện) | `PUBLISHED` |
| **Bài 10** | Tồn tại người, vật & Vị trí | `Địa điểm に N が あります / います` / Trật tự `N は Place に あります/います` / Vị trí (`上/下/前/後ろ/中/隣/近く`) / `N1 や N2 [など]` | `PUBLISHED` |
| **Bài 11** | Lượng từ, Khoảng thời gian | `Lượng từ + V` / Khoảng thời gian không dùng に / `〜ぐらい/くらい` / `どのくらい` / Số lần `〜回` / Tần suất (`Khoảng thời gian に 〜回`) / `Lượng từ + だけ` | `PUBLISHED` |
| **Bài 12** | So sánh hơn & So sánh nhất | `N1 は N2 より Adj です` / Chia quá khứ tính từ & danh từ (`おいしかったです`, `静かでした`) / `N1 の ほうが Adj` / `どちらが Adj` / Phạm vi `で N が 一番 Adj` | `PUBLISHED` |
| **Bài 13** | Mong muốn & Mục đích di chuyển | `V-たいです` / `N が ほしいです` / `Địa điểm へ Vに行きます` / Đại từ bất định (`<ctrl42>call:default_api:write_to_file`, `どこか/どこも`) / Cách hỏi (`何がほしいですか`, `<ctrl42>call:default_api:write_to_file`) | `PUBLISHED` |
| **Bài 14** | Chia thể て & Yêu cầu lịch sự | `V-てください` / Bảng quy tắc chia 3 nhóm động từ sang thể て / `V-ましょうか` (Đề nghị trợ giúp) | `PUBLISHED` |
| **Bài 15** | Cho phép, Cấm đoán & Trạng thái | `V-てもいいです` / `V-てはいけません` / Phân biệt 2 ý nghĩa `V-ています` (Hành động đang diễn ra & Trạng thái kết quả kéo dài: `結婚しています/住んでいます`) | `PUBLISHED` |
| **Bài 16** | Nối chuỗi hành động & Nối tính từ | `V1-て、V2-て、V3` / `V1-てから V2` / Nối tính từ & danh từ (`Adj-い -> 〜くて`, `Adj-な / N -> 〜で`) | `PUBLISHED` |
| **Bài 17** | Thể ない, Khuyên cấm & Bắt buộc | `V-ないでください` / `V-なければなりません` / `V-なくてもいいです` / Trợ từ thời hạn `〜までに` / Quy tắc chia thể ない | `PUBLISHED` |
| **Bài 18** | Thể từ điển (辞書形), Khả năng | `V-辞書形 ことができます` / `趣味は V-辞書形 ことです` / `Vる 前に / N の 前に` / Quy tắc chia thể từ điển (辞書形) | `PUBLISHED` |
| **Bài 19** | Thể た, Trải nghiệm & Trở nên | `V-た ことがあります` / Quy tắc chia thể た / `V1-たり V2-たり します` / Biến đổi trạng thái `〜くなります / 〜になります` | `PUBLISHED` |
| **Bài 20** | Thể thông thường (普通形) 4 dạng | Bảng chia 4 dạng thể ngắn Động từ, Tính từ, Danh từ trong văn thoại thân mật (`だ / じゃない / だった / じゃなかった`) | `PUBLISHED` |
| **Bài 21** | Ý kiến cá nhân & Trích dẫn | `〜と 思います` / `〜と 言いました` / Phó từ phỏng đoán `たぶん` / Câu hỏi xác nhận/dự đoán `〜でしょう？` | `PUBLISHED` |
| **Bài 22** | Mệnh đề bổ nghĩa danh từ | `V-普通形 + N` / Chủ ngữ trong mệnh đề phụ dùng trợ từ `が` / Các động từ trang phục (`着ています/はいています/かぶっています/かけています`) | `PUBLISHED` |
| **Bài 23** | Thời điểm (とき) & Điều kiện (と) | Cách nối chi tiết với `とき` (`Nの/Adjな/Adjい/Vる/Vた`) / `Vる と、〜` (Mỗi khi/Hễ... là kết quả tự nhiên/tất yếu) | `PUBLISHED` |
| **Bài 24** | Cho & Nhận hành động | Phân biệt rõ: `V-て くれます` (ai làm cho mình, chủ ngữ đi với `が`), `V-て あげます` (mình làm cho ai), `V-て もらいます` (nhận hành động từ ai, đối tượng đi với `に`) | `PUBLISHED` |
| **Bài 25** | Điều kiện giả định & Cho dù | Cách chia `たら` (V/Adj/N) / Phó từ `もし 〜たら` / `いくら 〜ても` / 2 ý nghĩa của `〜たら` ("Nếu..." và "Sau khi...") | `PUBLISHED` |

---

## 📑 NỘI DUNG CHI TIẾT CÁC MẪU NGỮ PHÁP KÈM VÍ DỤ & GIẢI THÍCH (BÀI 1 - BÀI 25)

---

### 🟢 BÀI 1: GIỚI THIỆU BẢN THÂN & CÂU KHẲNG ĐỊNH / PHỦ ĐỊNH

#### 1. `N1 は N2 です` (Khẳng định danh từ)
- **Cấu trúc:** `N1 + は + N2 + です`
- **Ý nghĩa:** N1 là N2
- **Giải thích:** Trợ từ `は` (wa) chỉ chủ đề câu. `です` đứng cuối thể hiện sự lịch sự.
- **Ví dụ:** 私 は 学生 です。（わたし は がくせい です。）$\rightarrow$ *Tôi là sinh viên.*

#### 2. `N1 は N2 ではありません / じゃありません` (Phủ định danh từ)
- **Cấu trúc:** `N1 + は + N2 + ではありません / じゃありません`
- **Ý nghĩa:** N1 không phải là N2
- **Giải thích:** `じゃありません` dùng trong hội thoại thân mật. `ではありません` dùng trong văn viết/trang trọng.
- **Ví dụ:** 先生 は ベトナム人 ではありません。（せんせい は ベトナムじん ではありません。）$\rightarrow$ *Giáo viên không phải là người Việt Nam.*

#### 3. `Xưng hô 〜さん & Hỏi nghề nghiệp, quốc tịch` (Bổ sung V47)
- **Cấu trúc:** `Tên + さん` | `お仕事 は 何ですか` | `どちら から 来ましたか`
- **Ý nghĩa:** Anh/Chị/Ông/Bà 〜 & Hỏi nghề nghiệp, xuất xứ quốc tịch
- **Giải thích:** Thêm `〜さん` sau tên người khác để thể hiện lịch sự (không tự xưng mình là さん). Hỏi nghề nghiệp dùng `お仕事は何ですか`. Hỏi quốc tịch/quê hương dùng `どちらから来ましたか / 〜人ですか`.
- **Ví dụ:** 
  - 田中さん は 会社員 です。（たなかさん は かいしゃいん です。）$\rightarrow$ *Anh Tanaka là nhân viên công ty.*
  - どちら から 来ましたか。... ベトナム から 来ました。 $\rightarrow$ *Bạn đến từ đâu? ... Tôi đến từ Việt Nam.*

---

### 🟢 BÀI 2: CHỈ ĐỊNH TỪ VẬT THỂ & CÂU HỎI LỰA CHỌN

#### 1. `どれ / どの N & Phủ định trực tiếp 違います` (Bổ sung V47)
- **Cấu trúc:** `どれ が N ですか` | `どの + N + は ...` | `いいえ、違います`
- **Ý nghĩa:** Cái nào trong 3+ vật / N nào / Không phải, sai rồi
- **Giải thích:** `どれ` dùng để hỏi chọn 1 trong 3 đối tượng trở lên. `どの + N` đứng trực tiếp trước danh từ để hỏi danh từ nào. Phủ định thông tin sai có thể trả lời trực tiếp là `いいえ、違います` (Không, sai rồi) hoặc `いいえ、そうじゃありません`.
- **Ví dụ:** 
  - あなた の 傘 は どれ ですか。（あなた の かさ は どれ ですか。）$\rightarrow$ *Cây dù của bạn là cái nào?*
  - それ は 辞書 ですか。... いいえ、違います。 $\rightarrow$ *Đó là từ điển à? ... Không, không phải / sai rồi.*

---

### 🟢 BÀI 3: CHỈ ĐỊNH ĐỊA ĐIỂM & XUẤT XỨ

#### 1. `こちら / そちら / あちら & N は Địa điểm です & いくらですか` (Bổ sung V47)
- **Cấu trúc:** `こちら / そちら / あちら` | `N + は + Địa điểm + です` | `N + は + いくらですか`
- **Ý nghĩa:** Hướng này/đó/kia lịch sự & N ở địa điểm & Giá bao nhiêu
- **Giải thích:** `こちら/そちら/あちら` chỉ phương hướng hoặc địa điểm mang sắc thái lịch sự hơn `ここ/そこ/あそこ`. Mẫu `N は Địa điểm です` dùng trả lời vị trí người/vật. Hỏi giá tiền dùng `〜は いくら ですか`.
- **Ví dụ:** 
  - 受付 は こちら です。（うけつけ は こちら です。）$\rightarrow$ *Quầy lễ tân ở hướng này ạ.*
  - この シャツ は いくら ですか。... 3,000円 です。 $\rightarrow$ *Cái áo sơ mi này giá bao nhiêu? ... Giá 3.000 Yên.*

---

### 🟢 BÀI 4: THỜI GIAN, CHIA THÌ ĐỘNG TỪ & TRỢ TỪ

#### 1. `今（いま） 〜時（じ） 〜分（ふん）です` (Nói giờ và phút)
- **Cấu trúc:** `Con số + 時（じ） + Con số + 分（ふん/ぷん） です` | `今 何時（なんじ）ですか` | `何分（なんぷん）`
- **Ý nghĩa:** Bây giờ là 〜 giờ 〜 phút | Bây giờ là mấy giờ?
- **Giải thích:** 
  - Đơn vị đếm giờ là `時（じ）` và đếm phút là `分（ふん/ぷん）` đặt sau số đếm.
  - **Phút (分):** Đọc là `ふん` sau số 2, 5, 7, 9. Đọc là `ぷん` sau số 1, 3, 4, 6, 8, 10 (biến âm: 1分 いっぷん, 6分 ろっぷん, 8分 はっぷん, 10分 じゅっぷん/じっぷん).
  - **Giờ đặc biệt (時):** 4時 đọc là `よじ` (không đọc よんじ), 7時 đọc là `しちじ` (không đọc ななじ), 9時 đọc là `くじ` (không đọc きゅうじ).
  - **Chủ đề địa danh:** Dùng trợ từ `は` chỉ chủ đề địa danh khi hỏi giờ nơi khác (Vd: `ニューヨークは いま なんじですか`).
- **Ví dụ:** 
  - 今 8時 15分 です。（いま はちじ じゅうごふん です。）$\rightarrow$ *Bây giờ là 8 giờ 15 phút.*
  - A: ニューヨークは いま 何時ですか。... B: ごぜん 4時です。 $\rightarrow$ *New York bây giờ là mấy giờ? ... 4 giờ sáng.*

#### 2. `Động từ thể ます (Vます)` (Vị ngữ lịch sự)
- **Cấu trúc:** `V-ます`
- **Ý nghĩa:** Làm V / Sẽ làm V
- **Giải thích:** Thể `ます` là một thể của động từ làm vị ngữ lịch sự của câu, diễn tả hành động ở hiện tại hoặc tương lai.
- **Ví dụ:** わたしは まいにち べんきょうします。 $\rightarrow$ *Tôi học bài mỗi ngày.*

#### 3. `Biến đổi chia 4 thì của động từ (Vます / Vません / Vました / Vませんでした)`
- **Cấu trúc:**
  - Hiện tại/Tương lai khẳng định: `V-ます` | Phủ định: `V-ません`
  - Quá khứ khẳng định: `V-ました` | Phủ định: `V-ませんでした`
  - Câu hỏi: `V-ますか` / `V-ましたか`
- **Ý nghĩa:** Diễn tả sự thật khách quan, thói quen hoặc hành động xảy ra trong quá khứ/tương lai.
- **Giải thích:** Khi trả lời câu hỏi động từ, bắt buộc nhắc lại động từ chia đúng thì (B1: `はい、V-ました`, B2: `いいえ、V-ませんでした`), **KHÔNG được dùng trả lời ngắn そうです / そうじゃありません**.
- **Ví dụ:** 
  - まいあさ 6時に おきます。 $\rightarrow$ *Hàng ngày tôi thức dậy lúc 6 giờ.*
  - きのう べんきょうしましたか。... いいえ、べんきょうしませんでした。 $\rightarrow$ *Hôm qua bạn có học không? ... Không, tôi không học.*

#### 4. `N (thời gian) に V` (Trợ từ mốc thời gian cụ thể)
- **Cấu trúc:** `N (thời gian có số đếm) + に + V`
- **Ý nghĩa:** Làm V vào lúc N (mốc thời gian)
- **Giải thích:** Bắt buộc dùng trợ từ `に` sau danh từ thời gian đi kèm con số cụ thể (7時, 7月2日). Có thể tùy chọn thêm `に` sau các ngày trong tuần (にちようび[に]). **KHÔNG dùng に** với danh từ thời gian tương đối không có con số (sáng nay けさ, hôm qua きのう, mùa hè...).
- **Ví dụ:** 
  - 6時半に おきます。（ろくじはんに おきます。）$\rightarrow$ *Tôi thức dậy lúc 6 rưỡi.*
  - きのう べんきょうしました。 $\rightarrow$ *Hôm qua tôi học.*

#### 5. `N1 から N2 まで` (Từ N1 đến N2)
- **Cấu trúc:** `N1 (thời gian/địa điểm) + から + N2 + まで` | `N1 から N2 まで です`
- **Ý nghĩa:** Từ N1 đến N2 (thời gian / khoảng cách)
- **Giải thích:** `から` chỉ điểm bắt đầu, `まで` chỉ điểm kết thúc. Hai trợ từ có thể đi cùng nhau hoặc tách riêng rẽ (`9時から 働きます`). Đôi khi kết hợp trực tiếp với `です` ở cuối câu (`ぎんこうは 9時から 3時までです`).
- **Ví dụ:** 
  - ごぜん9時から ごご5時まで はたらきます。 $\rightarrow$ *Tôi làm việc từ 9 giờ sáng đến 5 giờ chiều.*
  - ひるやすみは 12時から です。 $\rightarrow$ *Giờ nghỉ trưa bắt đầu từ 12 giờ.*

#### 6. `N1 と N2` (Trợ từ と nối danh từ)
- **Cấu trúc:** `N1 + と + N2`
- **Ý nghĩa:** N1 và N2
- **Giải thích:** Trợ từ `と` đặt giữa hai danh từ để nối 2 danh từ với nhau.
- **Ví dụ:** ぎんこうの やすみは どようびと にちようびです。 $\rightarrow$ *Ngân hàng nghỉ ngày thứ bảy và chủ nhật.*

#### 7. `Từ cuối câu ね` (Truyền đạt cảm xúc & Xác nhận)
- **Cấu trúc:** `Mệnh đề + ね`
- **Ý nghĩa:** ... nhỉ / ... đấy / ... phải không?
- **Giải thích:** `ね` đặt ở cuối câu để truyền đạt cảm xúc, tìm kiếm sự đồng tán từ người nghe hoặc xác nhận lại thông tin. Đọc xuống giọng khi thể hiện đồng cảm (`たいへんですね`), đọc cao giọng khi xác nhận lại thông tin (`871-6813ですね`).
- **Ví dụ:** 
  - A: まいあさ 9時から 5時まで べんきょうします。... B: たいへんですね。 $\rightarrow$ *Hàng sáng tôi học từ 9h đến 5h. ... Thế thì vất vả nhỉ.*
  - A: でんわばんごうは 871-6813です。... B: 871-6813ですね。 $\rightarrow$ *Số điện thoại là 871-6813. ... 871-6813 phải không ạ.*

---

### 🟢 BÀI 5: DI CHUYỂN, PHƯƠNG TIỆN & ĐỘNG HÀNH

#### 1. `Phân biệt 行きます/来ます/帰ります & どこへも〜ません & Nから` (Bổ sung V47)
- **Cấu trúc:** `Địa điểm + へ + 来ます / 帰ります` | `どこ [へ] も + V-ません` | `N (Địa điểm) + から`
- **Ý nghĩa:** Đi / Đến / Về & Không đi đâu cả & Điểm xuất phát từ N
- **Giải thích:** Phân biệt 3 động từ di chuyển: `行きます` (đi xa người nói), `来ます` (đến hướng người nói), `帰ります` (về nhà/quốc gia). Mẫu `どこへも + Phủ định` thể hiện phủ định tuyệt đối. `N から` chỉ điểm xuất phát ban đầu.
- **Ví dụ:** 
  - 日曜日 どこ へ も 行きませんでした。 $\rightarrow$ *Chủ nhật tôi đã không đi đâu cả.*
  - ベトナム から 来ました。 $\rightarrow$ *Tôi đến từ Việt Nam.*

---

### 🟢 BÀI 6: TÂN NGỮ & RỦ RÊ LỊCH SỰ

#### 1. `いっしょに V-ませんか & 何をしますか & Trợ từ で nơi hành động` (Bổ sung V47)
- **Cấu trúc:** `いっしょに + V-ませんか` | `何 を しますか` | `N (Nơi chốn) + で + V`
- **Ý nghĩa:** Cùng làm V với tôi nhé? & Làm cái gì? & Làm V tại địa điểm N
- **Giải thích:** `いっしょに` đi cùng `V-ませんか` để mời rủ người khác cùng thực hiện hành động. `何 を しますか` dùng hỏi hành động. Trợ từ `で` đặt sau địa điểm diễn ra hành động thực tế (khác với `に` trong câu tồn tại).
- **Ví dụ:** 
  - いっしょに 昼ごはん を 食べませんか。 $\rightarrow$ *Cùng ăn cơm trưa với tôi nhé?*
  - 図書館 で 勉強します。 $\rightarrow$ *Tôi học ở thư viện.*

---

### 🟢 BÀI 7: CÔNG CỤ & CHO NHẬN ĐỒ VẬT

#### 1. `かします/かりました & おしえます/ならいます & Nをください & もう〜ました/まだです` (Bổ sung V47)
- **Cấu trúc:** `N1 に N2 を かします / かります` | `N を ください` | `もう + V-ました` | `いいえ、まだです`
- **Ý nghĩa:** Cho mượn / Mượn & Cho tôi N & Đã làm V rồi / Chưa làm
- **Giải thích:** `かします` (cho ai mượn), `かります` (mượn từ ai N に/から). `おしえます` (dạy cho ai), `ならいます` (học từ ai). `N を ください` dùng khi xin đồ hoặc gọi món. `もう V-ました` hỏi đã xong chưa, nếu chưa xong trả lời `いいえ、まだです`.
- **Ví dụ:** 
  - 山田さん に 本 を 貸しました。 $\rightarrow$ *Tôi đã cho anh Yamada mượn sách.*
  - もう 昼ごはん を 食べましたか。... いいえ、まだです。 $\rightarrow$ *Bạn đã ăn cơm trưa chưa? ... Chưa, tôi chưa ăn.*

---

### 🟢 BÀI 8: TÍNH TỪ い & TÍNH TỪ な

#### 1. `とても / あまり〜ません & Nはどうですか & どんな N & Adj+N` (Bổ sung V47)
- **Cấu trúc:** `とても + Adj-Khẳng định` | `あまり + Adj-Phủ định` | `N は どうですか` | `どんな + N` | `Adj-い N` / `Adj-な N`
- **Ý nghĩa:** Rất / Không... lắm & N thì thế nào? & N như thế nào? & Mô tả tính từ trước danh từ
- **Giải thích:** `とても` (rất) đi với thể khẳng định. `あまり` (không... lắm) đi với thể phủ định. `N は どうですか` hỏi cảm tưởng trải nghiệm. `どんな N` hỏi tính chất đặc trưng của danh từ. Bổ nghĩa: `Adj-い + N` (giữ nguyên い), `Adj-な + N` (thêm な).
- **Ví dụ:** 
  - 日本 の 料理 は とても おいしいです が、高いです。 $\rightarrow$ *Món ăn Nhật Bản rất ngon nhưng đắt.*
  - この 部屋 は あまり 広くないです。 $\rightarrow$ *Căn phòng này không rộng lắm.*
  - 日本 は どんな 国 ですか。... 賑やかな 国 です。 $\rightarrow$ *Nhật Bản là một đất nước như thế nào? ... Là đất nước nhộn nhịp.*

---

### 🟢 BÀI 9: SỞ THÍCH, NĂNG LỰC & LÝ DO

#### 1. `嫌いです/上手です/下手です & Phó từ mức độ & どうして & Nがあります (Sở hữu/Sự kiện)` (Bổ sung V47)
- **Cấu trúc:** `N が 嫌いです / 上手です / 下手です` | `どうして ... か。〜から` | `N が あります`
- **Ý nghĩa:** Ghét / Giỏi / Dở N & Tại sao / Vì... & Có N (sở hữu / thời gian / sự kiện)
- **Giải thích:** Trợ từ `が` đi với `嫌いです` (ghét), `上手です` (giỏi), `下手です` (dở). Các phó từ mức độ: `よく` (rất rõ), `だいたい` (đại khái), `たくさん` (nhiều), `少し` (một chút), `全然〜ない` (hoàn toàn không). `どうして` hỏi lý do, trả lời kết thúc bằng `〜から`. `N が あります` biểu thị sở hữu, có thời gian hoặc có cuộc hẹn/sự kiện bận.
- **Ví dụ:** 
  - ミラーさん は 料理 が 上手です。 $\rightarrow$ *Anh Miller nấu ăn giỏi.*
  - どうして 勉強しませんでしたか。... 約束 が ありました から。 $\rightarrow$ *Tại sao bạn không học? ... Vì tôi có cuộc hẹn.*

---

### 🟢 BÀI 10: TỒN TẠI NGƯỜI, VẬT & VỊ TRÍ

#### 1. `N は Địa điểm に あります/います & Vị trí không gian & N1 や N2 [など]` (Bổ sung V47)
- **Cấu trúc:** `N は 地点 に あります / います` | `N1 の Vị trí` | `N1 や N2 [など]`
- **Ý nghĩa:** N thì ở tại địa điểm & Vị trí (trên/dưới/trước/sau...) & N1 và N2 (vân vân)
- **Giải thích:** Trật tự `N は 地点 に あります/います` dùng khi đối tượng N đã được nhắc tới trước đó. Các vị trí không gian: `上` (trên), `下` (dưới), `前` (trước), `後ろ` (sau), `中` (trong), `隣` (bên cạnh), `近く` (gần). Trợ từ `や` dùng liệt kê không hoàn toàn các đại diện, cuối cùng có thể thêm `など`.
- **Ví dụ:** 
  - 本 は 机 の 上 に あります。 $\rightarrow$ *Quyển sách ở trên cái bàn.*
  - 箱 の 中 に 手紙 や 写真 など が あります。 $\rightarrow$ *Trong hộp có thư, ảnh (vân vân).*

---

### 🟢 BÀI 11: LƯỢNG TỪ & KHOẢNG THỜI GIAN

#### 1. `〜ぐらい/くらい & どのくらい & Số lần 〜回 & Tần suất & Lượng từ だけ` (Bổ sung V47)
- **Cấu trúc:** `Lượng từ + ぐらい` | `どのくらい` | `Khoảng thời gian + に + Số lần + 回` | `Lượng từ + だけ`
- **Ý nghĩa:** Khoảng chừng & Bao lâu / Bao nhiêu & Số lần & Tần suất & Chỉ duy nhất
- **Giải thích:** `〜ぐらい` đặt sau lượng từ chỉ khoảng chừng. `どのくらい` hỏi khoảng bao lâu/bao nhiêu. `〜回` đếm số lần. Tần suất: `Khoảng thời gian + に + 〜回` (vd: `1週間に2回` = 1 tuần 2 lần). `だけ` đặt sau lượng từ biểu thị chỉ duy nhất lượng đó.
- **Ví dụ:** 
  - 日本 に 2年 ぐらい います。 $\rightarrow$ *Tôi ở Nhật khoảng 2 năm.*
  - 1か月 に 2回 映画 を 見ます。 $\rightarrow$ *Một tháng tôi xem phim 2 lần.*
  - 休み は 日曜日 だけ です。 $\rightarrow$ *Ngày nghỉ chỉ có duy nhất chủ nhật.*

---

### 🟢 BÀI 12: SO SÁNH HƠN & SO SÁNH NHẤT

#### 1. `Chia quá khứ Tính từ/Danh từ & N1 の ほうが Adj & どちらが Adj & Phạm vi で N が 一番 Adj` (Bổ sung V47)
- **Cấu trúc:** `Adj-い Quá khứ` | `Adj-な/N Quá khứ` | `N1 の ほうが Adj` | `N1 と N2 と どちらが Adj ですか` | `Phạm vi で N が 一番 Adj`
- **Ý nghĩa:** Chia quá khứ & N1 thì hơn & Giữa N1 và N2 cái nào hơn & Nhất trong phạm vi
- **Giải thích:** Chia quá khứ: `Adj-い` -> `〜かったです` / `〜くなかったです`. `Adj-な & N` -> `〜でした` / `〜じゃありませんでした`. `N1 の ほうが Adj` (N1 thì Adj hơn). `N1 と N2 と どちらが Adj ですか` (cái nào hơn?). Phạm vi + `で` + N + `が` + `一番` + Adj + `です` (nhất trong phạm vi).
- **Ví dụ:** 
  - 昨日 は 雨 でした。旅行 は たのしかった です。 $\rightarrow$ *Hôm qua trời mưa. Chuyến du lịch đã rất vui.*
  - サッカー と 野球 と どちら が おもしろい ですか。... サッカー の ほう が おもしろい です。 $\rightarrow$ *Bóng đá và bóng chày cái nào thú vị hơn? ... Bóng đá thú vị hơn.*
  - 1年 で 12月 が 一番 寒い です。 $\rightarrow$ *Trong một năm tháng 12 là lạnh nhất.*

---

### 🟢 BÀI 13: MONG WEÂN & MỤC ĐÍCH DI CHUYỂN

#### 1. `Đại từ bất định (何か/何も, どこか/どこも) & Cách hỏi 何がほしいですか / 何をしたいですか` (Bổ sung V47)
- **Cấu trúc:** `何か / 何も + Phủ định` | `どこか / どこも + Phủ định` | `何が ほしいですか` | `何 を したいですか`
- **Ý nghĩa:** Cái gì đó / Không cái gì cả & Đâu đó / Không đâu cả & Hỏi nhu cầu mong muốn
- **Giải thích:** `何か` (cái gì đó), `何も + Phủ định` (không cái gì cả). `どこか` (nơi nào đó), `どこも + Phủ định` (không nơi nào cả). Trợ từ `を/が` có thể được giản lược sau `何か/どこか`. Hỏi nhu cầu dùng `何が ほしいですか` hoặc `何 を したいですか`.
- **Ví dụ:** 
  - 喉 が 渇きました から、何か 飲みたい です。 $\rightarrow$ *Vì khát nước nên tôi muốn uống cái gì đó.*
  - 今 何 が 一番 ほしい ですか。... 広い 家 が ほしい です。 $\rightarrow$ *Bây giờ bạn muốn cái gì nhất? ... Tôi muốn có nhà rộng.*

---

### 🟢 BÀI 14: CHIA THỂ て & YÊU CẦU LỊCH SỰ

#### 1. `Quy tắc chia 3 Nhóm động từ sang Thể て & V-ましょうか` (Bổ sung V47)
- **Cấu trúc:** `Nhóm 1, 2, 3 -> Thể て` | `V-ます + ましょうか`
- **Ý nghĩa:** Quy tắc chia thể て & Để tôi làm V giúp bạn nhé?
- **Giải thích:** Chia thể て: Nhóm 1 (`い/ち/り -> った`, `き -> いて`, `ぎ -> いで`, `み/び/に -> んだ`, `し -> して`; `行きます -> いって`). Nhóm 2 (`ます -> て`). Nhóm 3 (`します -> して`, `来ます -> きた/きて`). Mẫu `V-ましょうか` dùng khi đề nghị trực tiếp làm giúp người khác việc gì.
- **Ví dụ:** 
  - 傘 を 貸しましょうか。... ええ、すみません。おねがいします。 $\rightarrow$ *Tôi cho bạn mượn dù nhé? ... Vâng, cảm ơn bạn nhiều.*
  - 荷物 を 持ちましょうか。 $\rightarrow$ *Để tôi xách hành lý giúp bạn nhé?*

---

### 🟢 BÀI 15: CHO PHÉP, CẤM ĐOÁN & TRẠNG THÁI

#### 1. `V-ています (2 Ý nghĩa) & V-てもいいです & V-てはいけません` (Bổ sung V47)
- **Cấu trúc:** `V-て + います` | `V-て + もいいです` | `V-て + はいけません`
- **Ý nghĩa:** Đang làm V / Trạng thái kết quả & Được phép làm V & Không được làm V (Cấm)
- **Giải thích:** `V-ています` có 2 ý nghĩa cốt lõi: (1) Hành động đang diễn ra tại thời điểm nói (`今 食べています`), (2) Trạng thái kết quả kéo dài từ quá khứ (`結婚しています`, `知っています`, `住んでいます`). Mẫu `V-てもいいです` (được phép làm V). Mẫu `V-てはいけません` (cấm đoán không được làm V).
- **Ví dụ:** 
  - 今 雨 が 降っています。私 は ハノイ に 住んでいます。 $\rightarrow$ *Bây giờ trời đang mưa. Tôi đang sống ở Hà Nội.*
  - 写真 を 撮っても いいですか。... いいえ、撮って は いけません。 $\rightarrow$ *Tôi chụp ảnh có được không? ... Không, không được chụp ảnh.*

---

### 🟢 BÀI 16: NỐI CHUỖI HÀNH ĐỘNG & NỐI TÍNH TỪ

#### 1. `Nối Tính từ / Danh từ (〜くて / 〜で) & V1-てから、V2` (Bổ sung V47)
- **Cấu trúc:** `Adj-い -> 〜くて` | `Adj-な/N -> 〜で` | `V1-て + から、V2`
- **Ý nghĩa:** Vừa... vừa... (Nối tính từ) & Sau khi làm V1 thì làm V2
- **Giải thích:** Nối tính từ/danh từ: `Adj-い` bỏ い -> `〜くて` (`安くて おいしい`). `Adj-な & Danh từ` -> `〜で` (`親切で きれい`). `V1-てから V2` biểu thị hành động V2 xảy ra ngay sau khi hành động V1 hoàn thành.
- **Ví dụ:** 
  - 東京 は 賑やかで、おもしろい 街 です。 $\rightarrow$ *Tokyo là một thành phố nhộn nhịp và thú vị.*
  - 仕事 が 終わってから、泳ぎ に 行きます。 $\rightarrow$ *Sau khi xong việc tôi sẽ đi bơi.*

---

### 🟢 BÀI 17: THỂ ない, KHUYÊN CẤM & BẮT BUỘC

#### 1. `V-なくてもいいです & Trợ từ Thời hạn + までに & Quy tắc chia Thể ない` (Bổ sung V47)
- **Cấu trúc:** `V-ない -> 〜なくてもいいです` | `Mốc thời gian + までに + V` | `Thể ない`
- **Ý nghĩa:** Không cần làm V cũng được & Trước thời hạn N & Quy tắc chia thể ない
- **Giải thích:** `V-なくてもいいです` biểu thị không cần thiết phải làm hành động. Trợ từ `までに` chỉ mốc thời hạn cuối cùng mà hành động phải hoàn tất (khác với `まで` là liên tục). Quy tắc thể ない: Nhóm 1 (hàng い -> hàng あ + ない, い -> わない). Nhóm 2 (ます -> ない). Nhóm 3 (します -> しない, 来ます -> こない).
- **Ví dụ:** 
  - 明日 来なくても いいです。 $\rightarrow$ *Ngày mai bạn không cần đến cũng được.*
  - 土曜日 までに 本 を 返さなければなりません。 $\rightarrow$ *Tôi phải trả sách trước thứ bảy.*

---

### 🟢 BÀI 18: THỂ TỪ ĐIỂN (辞書形) & KHẢ NĂNG

#### 1. `Vる 前に / N の 前に & Quy tắc chia Thể từ điển (辞書形)` (Bổ sung V47)
- **Cấu trúc:** `V-辞書形 + 前に` | `N + の + 前に` | `Quy tắc 辞書形`
- **Ý nghĩa:** Trước khi làm V / Trước N & Quy tắc chia thể từ điển
- **Giải thích:** `V-辞書形 + 前に` hoặc `N + の + 前に` biểu thị hành động xảy ra trước một mốc hành động hay thời gian khác. Quy tắc thể 辞書形: Nhóm 1 (hàng い -> hàng う). Nhóm 2 (ます -> る). Nhóm 3 (します -> する, 来ます -> くる).
- **Ví dụ:** 
  - 寝る 前に、日記 を 書きます。 $\rightarrow$ *Trước khi đi ngủ tôi viết nhật ký.*
  - 食事 の 前に、手 を 洗います。 $\rightarrow$ *Trước bữa ăn tôi rửa tay.*

---

### 🟢 BÀI 19: THỂ た & TRẢI NGHIỆM KINH NGHIỆM

#### 1. `Quy tắc chia Thể た & V1-たり、V2-たり します & Biến đổi 〜になります` (Bổ sung V47)
- **Cấu trúc:** `Quy tắc Thể た` | `V1-た り、V2-た り します` | `Adj-い -> 〜くなります` | `Adj-な/N -> 〜になります`
- **Ý nghĩa:** Chia thể た & Khi thì làm V1, khi thì V2 & Trở nên / Trở thành
- **Giải thích:** Chia thể た tương tự thể て (thay て/で bằng た/だ). `V1-たり V2-たり します` dùng liệt kê một vài hành động đại diện. Biến đổi trạng thái: `Adj-い` bỏ い -> `〜くなります`. `Adj-な & N` -> `〜になります`.
- **Ví dụ:** 
  - 日曜日 は 買い物したり、映画 を 見たり します。 $\rightarrow$ *Chủ nhật tôi khi thì đi shopping, khi thì xem phim.*
  - 寒く なりました。 16歳 に なります。 $\rightarrow$ *Trời đã trở nên lạnh. Tôi sắp sửa bước sang tuổi 16.*

---

### 🟢 BÀI 20: BỘ TỔNG HỢP THỂ THÔNG THƯỜNG (普通形) & QUY TẮC GIAO TIẾP THÂN MẬT

#### 1. `普通形 [動詞] - Thể thông thường của ĐỘNG TỪ`
- **Cấu trúc:** 
  - Khẳng định hiện tại: `V-ます` $\rightarrow$ `V-る (V-辞書形)`
  - Phủ định hiện tại: `V-ません` $\rightarrow$ `V-ない`
  - Khẳng định quá khứ: `V-ました` $\rightarrow$ `V-た`
  - Phủ định quá khứ: `V-ませんでした` $\rightarrow$ `V-なかった`
- **Ý nghĩa:** Bảng chia 4 thì thể ngắn của Động từ trong văn thoại thân mật.
- **Giải thích:** Trong hội thoại hàng ngày với bạn bè, người thân, đồng nghiệp bằng hữu, động từ được chia ở thể ngắn (普通形) thay vì thể lịch sự (丁寧形: です/ます).
- **Ví dụ:** 
  - 明日 東京へ 行く。（あした とうきょうへ いく。）$\rightarrow$ *Ngày mai tớ sẽ đi Tokyo.*
  - 昨日 どこも 行かなかった。 $\rightarrow$ *Hôm qua tớ đã không đi đâu cả.*

#### 2. `普通形 [い形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI い`
- **Cấu trúc:** 
  - Khẳng định hiện tại: `〜いです` $\rightarrow$ `〜い`
  - Phủ định hiện tại: `〜くないです` $\rightarrow$ `〜くない`
  - Khẳng định quá khứ: `〜かったです` $\rightarrow$ `〜かった`
  - Phủ định quá khứ: `〜くなかったです` $\rightarrow$ `〜くなかった`
- **Ý nghĩa:** Thể ngắn của Tính từ đuôi い (Lược bỏ です ở cuối câu).
- **Giải thích:** Tính từ đuôi い ở thể thông thường chỉ cần lược bỏ `です` ở cuối câu.
- **Ví dụ:** 
  - この ラーメン、すごく おいしいよ。 $\rightarrow$ *Món mì ramen này ngon lắm đấy.*
  - 昨日の テスト、難しかった。 $\rightarrow$ *Bài kiểm tra hôm qua đã rất khó.*

#### 3. `普通形 [な形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI な`
- **Cấu trúc:** 
  - Khẳng định hiện tại: `〜です` $\rightarrow$ `〜だ`
  - Phủ định hiện tại: `〜じゃありません` $\rightarrow$ `〜じゃない`
  - Khẳng định quá khứ: `〜でした` $\rightarrow$ `〜だった`
  - Phủ định quá khứ: `〜じゃありませんでした` $\rightarrow$ `〜じゃなかった`
- **Ý nghĩa:** Thể ngắn của Tính từ đuôi な (だ / じゃない / だった / じゃなかった).
- **Giải thích:** Tính từ đuôi な biến đổi です thành `だ` / `じゃない` / `だった` / `じゃなかった`. Lưu ý đặc biệt: Khi đặt câu hỏi nghi vấn trong thể thông thường, bắt buộc **LƯỢC BỎ だ** ở cuối câu và lên giọng (`今日 暇？` - không dùng `暇だ？`).
- **Ví dụ:** 
  - 今日 暇？ ... うん、暇だよ。 $\rightarrow$ *Hôm nay rảnh không? ... Ừ, rảnh chứ.*
  - あの 町は 静かじゃなかった。 $\rightarrow$ *Thành phố đó đã không yên tĩnh chút nào.*

#### 4. `普通形 [名詞] - Thể thông thường của DANH TỪ`
- **Cấu trúc:** 
  - Khẳng định hiện tại: `N + です` $\rightarrow$ `〜だ`
  - Phủ định hiện tại: `N + じゃありません` $\rightarrow$ `〜じゃない`
  - Khẳng định quá khứ: `N + でした` $\rightarrow$ `〜だった`
  - Phủ định quá khứ: `N + じゃありませんでした` $\rightarrow$ `〜じゃなかった`
- **Ý nghĩa:** Thể ngắn của Danh từ (だ / じゃない / だった / じゃなかった).
- **Giải thích:** Danh từ biến đổi 4 thì thể thông thường tương tự tính từ đuôi な. Lược bỏ `だ` khi hỏi nghi vấn.
- **Ví dụ:** 
  - 昨日 雨だった？ ... ううん、雨じゃなかった。 $\rightarrow$ *Hôm qua trời mưa à? ... Không, đã không mưa.*
  - あしたは 休みだ。 $\rightarrow$ *Ngày mai là ngày nghỉ.*

#### 5. `会話のルール - Quy tắc văn thoại thân mật (Giản lược & Nuốt âm)`
- **Cấu trúc:** `Lược bỏ Trợ từ は/を/へ` | `Vています -> Vてる` | `うん / ううん` | `Từ cuối câu 〜よ / 〜ね / 〜の`
- **Ý nghĩa:** Bảng tổng hợp các quy tắc rút gọn, nuốt âm và giản lược trợ từ trong hội thoại hàng ngày.
- **Giải thích:** 
  1. Thường lược bỏ các trợ từ `は`, `を`, `へ` (`これ[を] 食べる？`, `どこ[へ] 行くの？`).
  2. Rút gọn `Vています` thành `Vてる` (`何してるの？`, `知ってる`).
  3. Dùng `うん` (đồng ý) và `ううん` (phủ định).
  4. Đuôi câu cảm xúc: `〜よ` (mách nhỏ/nhấn mạnh), `〜ね` (xác nhận/đồng cảm), `〜の` (hỏi nhẹ nhàng).
- **Ví dụ:** 
  - 今 何 してるの？ ... テレビ 見てる。 $\rightarrow$ *Bây giờ đang làm gì đấy? ... Tớ đang xem tivi.*
  - これ 食べる？ ... うん、食べる！ $\rightarrow$ *Ăn cái này không? ... Ừ, ăn chứ!*

---

### 🟢 BÀI 21: Ý KIẾN CÁ NHÂN & TRÍCH DẪN

#### 1. `〜と 言いました & Phó từ たぶん & Câu hỏi dự đoán 〜でしょう？` (Bổ sung V47)
- **Cấu trúc:** `Thể thông thường + と 言いました` | `たぶん + Thể thông thường + と思います` | `Thể thông thường + でしょう？`
- **Ý nghĩa:** (Ai đó) đã nói rằng... & Có lẽ & Phải không / Đúng không?
- **Giải thích:** Mẫu `〜と 言いました` dùng trích dẫn câu nói của ai đó (trước と là thể thông thường hoặc nguyên văn câu nói). Phó từ `たぶん` (có lẽ) thường đi cùng với `〜と 思います / 〜でしょう`. Mẫu `〜でしょう？` (lên giọng ở cuối) dùng xác nhận sự đồng cảm hoặc phỏng đoán.
- **Ví dụ:** 
  - 寝る 前に「おやすみなさい」と 言います。 $\rightarrow$ *Trước khi đi ngủ ta nói "Chúc ngủ ngon".*
  - ミラーさん は たぶん 来る と 思います。 $\rightarrow$ *Tôi nghĩ anh Miller có lẽ sẽ đến.*
  - 明日 は 北海道 は 寒い でしょう？ $\rightarrow$ *Ngày mai ở Hokkaido chắc là lạnh lắm đúng không?*

---

### 🟢 BÀI 22: MỆNH ĐỀ BỔ NGHĨA DANH TỪ (名詞修飾)

#### 1. `Mệnh đề bổ nghĩa danh từ (V-普通形 + N) & Trợ từ が trong mệnh đề & Động từ trang phục` (Bổ sung V47)
- **Cấu trúc:** `Mệnh đề (S が V-普通形) + N` | `着ています / はいています / かぶっています / かけています`
- **Ý nghĩa:** Bổ nghĩa cho danh từ & Trợ từ が làm chủ ngữ mệnh đề phụ & Động từ mặc/đội/đeo
- **Giải thích:** Mệnh đề động từ thể thông thường đứng trước N để bổ nghĩa cho N. Cực kỳ quan trọng: Chủ ngữ trong mệnh đề bổ nghĩa bắt buộc dùng trợ từ `が` (không dùng `は`). Động từ trang phục: `着ています` (mặc áo từ eo trở lên), `はいています` (mặc quần/giày từ eo trở xuống), `かぶっています` (đội mũ), `かけています` (đeo kính).
- **Ví dụ:** 
  - 私 が 昨日 買った 本 は これ です。 $\rightarrow$ *Quyển sách tôi đã mua hôm qua là quyển này.*
  - 眼鏡 を かけている 人 は 田中さん です。 $\rightarrow$ *Người đang đeo kính là anh Tanaka.*

---

### 🟢 BÀI 23: THỜI ĐIỂM (とき) & ĐIỀU KIỆN (と)

#### 1. `Cách nối chi tiết với とき (Nの/Adjな/Adjい/Vる/Vた) & Vる と、〜 (Kết quả tự nhiên)` (Bổ sung V47)
- **Cấu trúc:** `N の / Adj-な な / Adj-い / Vる / Vた + とき` | `V-辞書形 + と、〜`
- **Ý nghĩa:** Khi ... (thời điểm) & Hễ / Mỗi khi ... thì (kết quả tất yếu)
- **Giải thích:** Nối với とき: `N の とき`, `Adj-な な とき`, `Adj-い とき`, `Vる とき` (chưa làm xong) vs `Vた とき` (đã làm xong). Mẫu `Vる と、〜` biểu thị hễ làm V thì kết quả tất yếu tự nhiên sẽ xảy ra (dùng chỉ đường, vận hành máy móc). Không dùng với ý chí, rủ rê hay mệnh lệnh.
- **Ví dụ:** 
  - 暇な とき、テレビ を 見ます。 国 へ 帰った とき、鞄 を 買いました。 $\rightarrow$ *Khi rảnh tôi xem tivi. Khi đã về nước tôi đã mua một cái cặp.*
  - この ボタン を 押す と、お釣り が 出ます。 $\rightarrow$ *Hễ nhấn nút này thì tiền thừa sẽ ra.*

---

### 🟢 BÀI 24: CHO & NHẬN HÀNH ĐỘNG

#### 1. `Phân biệt V-て あげます / もらいます / くれます` (Bổ sung V47)
- **Cấu trúc:** `N1 (Người khác) が 私 に V-て くれます` | `私 は N1 に V-て あげます` | `私 は N1 に V-て もらいます`
- **Ý nghĩa:** Làm cho ai / Được làm cho / Ai đó làm giúp cho mình
- **Giải thích:** Phân biệt rõ: (1) `V-て くれます`: Ai đó làm việc gì giúp cho mình/người thân mình (Chủ ngữ đi với `发`). (2) `V-て あげます`: Mình làm giúp cho người khác. (3) `V-て もらいます`: Mình nhận được hành động giúp đỡ từ ai (Đối tượng thực hiện đi với `に`).
- **Ví dụ:** 
  - 母 が 私 に 部屋 を 掃除して くれました。 $\rightarrow$ *Mẹ đã dọn phòng giúp cho tôi.*
  - 私 は 鈴木さん に 日本語 を 教えて もらいました。 $\rightarrow$ *Tôi đã được cô Suzuki dạy tiếng Nhật cho.*

---

### 🟢 BÀI 25: ĐIỀU KIỆN GIẢ ĐỊNH & CHO DÙ

#### 1. `Cách chia たら (V/Adj/N) & Phó từ もし / いくら & 2 Ý nghĩa của 〜たら` (Bổ sung V47)
- **Cấu trúc:** `V-たら / Adj-かったら / Adj-な・N だったら` | `もし 〜たら` | `いくら 〜ても`
- **Ý nghĩa:** Cách chia たら & Nếu / Cho dù & 2 nghĩa: Giả định "Nếu..." / Trình tự "Sau khi..."
- **Giải thích:** Cách chia たら: Động từ (`V-た + ら`), Adj-い (`bỏ い + かったら`), Adj-な & N (`+ だったら`). Phó từ: `もし` đi cùng với `〜たら` (Giả sử nếu...), `いくら` đi cùng với `〜ても` (Dù có... thế nào đi nữa). 2 ý nghĩa của `〜たら`: (1) Giả định điều kiện "Nếu...", (2) Trình tự thời gian "Sau khi.../ Khi..." (hành động V2 thực hiện sau khi V1 hoàn tất).
- **Ví dụ:** 
  - もし 1億円 あったら、いろいろな 国 を 旅行したい です。 $\rightarrow$ *Giả sử nếu có 100 triệu Yên tôi muốn đi du lịch nhiều nước.*
  - いくら 考えても、わかりません。 駅 に 着いたら、電話してください。 $\rightarrow$ *Dù có suy nghĩ thế nào cũng không hiểu. Khi đến ga xin hãy gọi điện cho tôi.*

---

## 🔍 NGUỒN FILE TRONG CODEBASE

1. **File Migration SQL Mới:** [`backend/src/main/resources/db/migration/V47__supplement_all_missing_n5_grammar_points.sql`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/resources/db/migration/V47__supplement_all_missing_n5_grammar_points.sql)
2. **File Migration SQL Gốc:** [`backend/src/main/resources/db/migration/V46__seed_authentic_pdf_n5_grammar.sql`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/resources/db/migration/V46__seed_authentic_pdf_n5_grammar.sql)
3. **File Đặc Tả Giáo Trình:** [`docs/N5_GRAMMAR_CURRICULUM_SPEC.md`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/docs/N5_GRAMMAR_CURRICULUM_SPEC.md)
