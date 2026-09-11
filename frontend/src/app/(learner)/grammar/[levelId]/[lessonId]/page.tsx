"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import JapaneseFuriganaText from "@/components/learner/JapaneseFuriganaText";
import GrammarClozeTransformPractice from "@/components/learner/grammar/GrammarClozeTransformPractice";
import GrammarConversationalReflexPractice from "@/components/learner/grammar/GrammarConversationalReflexPractice";
import GrammarEmaSentenceGame from "@/components/learner/grammar/GrammarEmaSentenceGame";
import GrammarQuizPractice from "@/components/learner/grammar/GrammarQuizPractice";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Sparkles,
  RefreshCw,
  List,
  ChevronDown,
  CheckCircle2,
  Volume2,
  Lightbulb,
  Edit3,
  MessageSquare,
  Gamepad2,
  Zap,
} from "lucide-react";
import { MOCK_LESSONS_DATA } from "@/components/learner/grammar/mockGrammarData";
import { apiClient } from "@/lib/api/client";
import { recordLessonAccess } from "@/lib/utils/learningTracker";

interface GrammarExample {
  japaneseText: string;
  furiganaText?: string;
  meaningVi: string;
}

interface ConjugationRow {
  group: string;
  masuForm: string;
  targetForm: string;
}

interface GrammarPoint {
  grammarId: number;
  pattern: string;
  meaning: string;
  explanation: string;
  structure: string;
  usageNotes?: string;
  correctExample?: string;
  wrongExample?: string;
  examples: GrammarExample[];
  tableHeader?: { col1: string; col2: string; col3: string };
  conjugationTable?: ConjugationRow[];
}

export default function LearnerGrammarDetailPage() {
  const params = useParams();
  const router = useRouter();

  const levelId = (params.levelId as string)?.toLowerCase() || "n5";
  const rawLessonId = (params.lessonId as string) || "1";
  const lessonNum = Number(rawLessonId.replace(/[^0-9]/g, "")) || 1;

  const levelCode = levelId.toUpperCase();
  const formattedNum = String(lessonNum).padStart(2, "0");

  const [grammars, setGrammars] = useState<GrammarPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePointId, setActivePointId] = useState<number | string>(0);
  const [learnedKeys, setLearnedKeys] = useState<Set<number>>(new Set());
  const [isMobileTocOpen, setIsMobileTocOpen] = useState<boolean>(false);
  const [playingAudioIdx, setPlayingAudioIdx] = useState<string | null>(null);

  // Practice Modes Tab State: "EMA" | "CLOZE" | "REFLEX" | "QUIZ"
  const [practiceTab, setPracticeTab] = useState<"EMA" | "CLOZE" | "REFLEX" | "QUIZ">("CLOZE");
  const [isPracticeOpen, setIsPracticeOpen] = useState<boolean>(false);

  // EMA Game State
  const defaultBlocks = ["私（わたし）は", "学生（がくせい）", "です。"];
  const defaultMeaning = "Tôi là sinh viên.";
  const [targetBlocks, setTargetBlocks] = useState<string[]>(defaultBlocks);
  const [targetMeaning, setTargetMeaning] = useState<string>(defaultMeaning);
  const [builderWordBlocks, setBuilderWordBlocks] = useState<string[]>([]);
  const [userOrderedBlocks, setUserOrderedBlocks] = useState<string[]>([]);
  const [builderStatus, setBuilderStatus] = useState<"IDLE" | "CORRECT" | "WRONG">("IDLE");

  // Lesson metadata
  const lessonMeta = useMemo(() => {
    const list = MOCK_LESSONS_DATA[levelCode] || MOCK_LESSONS_DATA.N5;
    return (
      list.find((l) => l.lessonNumber === lessonNum) || {
        id: lessonNum,
        level: levelCode,
        lessonNumber: lessonNum,
        title: `Bài ${lessonNum}`,
        description: "Chuyên đề ngữ pháp tiếng Nhật",
        topicCount: 6,
        exerciseCount: 12,
      }
    );
  }, [levelCode, lessonNum]);

  // Load lesson grammar points
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      recordLessonAccess(lessonNum, lessonMeta.title, levelCode);

      const lessonDataMap: Record<number, GrammarPoint[]> = {
        1: [
          {
            grammarId: 101,
            pattern: "N1 は N2 です",
            meaning: "N1 là N2",
            explanation: "Dùng để giới thiệu bản thân, danh tính, quốc tịch hoặc nghề nghiệp của N1. Trợ từ は (đọc là WA) đánh dấu chủ đề câu. Từ です đứng ở cuối câu thể hiện thái độ lịch sự.",
            structure: "N1 + は + N2 + です",
            usageNotes: "Trợ từ は được viết bằng chữ Hiragana は (ha) nhưng phát âm bắt buộc là WA khi làm trợ từ.",
            examples: [
              { japaneseText: "私（わたし）は 学生（がくせい）です。", furiganaText: "私（わたし）は 学生（がくせい）です。", meaningVi: "Tôi là sinh viên." },
              { japaneseText: "田中（たなか）さんは 先生（せんせい）です。", furiganaText: "田中（たなか）さんは 先生（せんせい）です。", meaningVi: "Anh Tanaka là giáo viên." },
              { japaneseText: "マイクさんは アメリカ人（じん）です。", furiganaText: "マイクさんは アメリカ人（じん）です。", meaningVi: "Mike là người Mỹ." }
            ]
          },
          {
            grammarId: 102,
            pattern: "N1 は N2 ではありません / じゃありません",
            meaning: "N1 không phải là N2",
            explanation: "Dùng để phủ định câu danh từ. Trong văn nói thân mật dùng じゃありません, trong văn viết hoặc trang trọng dùng ではありません.",
            structure: "N1 + は + N2 + ではありません / じゃありません",
            usageNotes: "Không kết hợp cả じゃ và では cùng lúc (Tránh dùng じゃではありません).",
            examples: [
              { japaneseText: "山田（やまだ）さんは 医者（いしゃ）ではありません。", furiganaText: "山田（やまだ）さんは 医者（いしゃ）ではありません。", meaningVi: "Anh Yamada không phải là bác sĩ." },
              { japaneseText: "サントスさんは 学生（がくせい）じゃありません。", furiganaText: "サントスさんは 学生（がくせい）じゃありません。", meaningVi: "Anh Santos không phải là sinh viên." }
            ]
          },
          {
            grammarId: 103,
            pattern: "N1 は N2 ですか",
            meaning: "N1 có phải là N2 không?",
            explanation: "Thêm trợ từ nghi vấn か vào cuối câu để đặt câu hỏi. Khi trả lời khẳng định dùng はい, N2 です. Trả lời phủ định dùng いいえ, N2 ではありません.",
            structure: "N1 + は + N2 + ですか？",
            examples: [
              { japaneseText: "ミラーさんは 会社員（かいしゃいん）ですか。... はい、会社員（かいしゃいん）です。", furiganaText: "ミラーさんは 会社員（かいしゃいん）ですか。... はい、会社員（かいしゃいん）です。", meaningVi: "Anh Miller có phải nhân viên công ty không? ... Vâng, là nhân viên công ty." },
              { japaneseText: "あの 人（ひと）は 誰（だれ）ですか。... 木村（きむら）さんです。", furiganaText: "あの 人（ひと）は 誰（だれ）ですか。... 木村（きむら）さんです。", meaningVi: "Người kia là ai? ... Là cô Kimura." }
            ]
          },
          {
            grammarId: 104,
            pattern: "N も",
            meaning: "N cũng...",
            explanation: "Trợ từ も (cũng) được dùng thay thế cho は khi đối tượng N có cùng thuộc tính hoặc tính chất với đối tượng đã đề cập trước đó.",
            structure: "N + も + です / ではありません",
            examples: [
              { japaneseText: "私（わたし）は ベトナム人（じん）です。ナムさん も ベトナム人（じん）です。", furiganaText: "私（わたし）は ベトナム人（じん）です。ナムさん も ベトナム人（じん）です。", meaningVi: "Tôi là người Việt Nam. Nam cũng là người Việt Nam." }
            ]
          },
          {
            grammarId: 105,
            pattern: "N1 の N2",
            meaning: "N2 của N1 / N2 thuộc N1",
            explanation: "Trợ từ の nối 2 danh từ biểu thị quyền sở hữu hoặc mối quan hệ tổ chức trực thuộc (ví dụ: nhân viên của công ty nào).",
            structure: "N1 + の + N2",
            examples: [
              { japaneseText: "私（わたし）の 傘（かさ）です。", furiganaText: "私（わたし）の 傘（かさ）です。", meaningVi: "Là cái dù của tôi." },
              { japaneseText: "IMC の 社員（しゃいん）です。", furiganaText: "IMC の 社員（しゃいん）です。", meaningVi: "Là nhân viên của công ty IMC." }
            ]
          }
        ],
        20: [
          {
            grammarId: 2001,
            pattern: "普通形 [動詞] - Thể thông thường của ĐỘNG TỪ",
            meaning: "Bảng chia 4 thì thể ngắn của Động từ trong văn thoại thân mật",
            explanation: "Trong hội thoại thân mật với bạn bè, gia đình, động từ được chia ở thể ngắn (普通形) thay vì thể lịch sự (丁寧形: です/ます). Bảng 4 thì: Khẳng định hiện tại (V-る/辞書形), Phủ định hiện tại (V-ない), Khẳng định quá khứ (V-た), Phủ định quá khứ (V-なかった).",
            structure: "V-ます -> V-る | V-ません -> V-ない | V-ました -> V-た | V-ませんでした -> V-なかった",
            usageNotes: "Thể thông thường bắt buộc phải nắm vững trước khi học các cấu trúc tổng hợp ở bài 21, 22, 23...",
            examples: [
              { japaneseText: "明日（あした） 東京（とうきょう）へ 行（い）く。", furiganaText: "明日（あした） 東京（とうきょう）へ 行（い）く。", meaningVi: "Ngày mai tớ sẽ đi Tokyo." },
              { japaneseText: "昨日（きのう） どこも 行（い）かなかった。", furiganaText: "昨日（きのう） どこも 行（い）かなかった。", meaningVi: "Hôm qua tớ đã không đi đâu cả." }
            ]
          },
          {
            grammarId: 2002,
            pattern: "普通形 [い形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI い",
            meaning: "Thể ngắn của Tính từ đuôi い (Lược bỏ です ở cuối câu)",
            explanation: "Tính từ đuôi い ở thể thông thường chỉ cần lược bỏ です ở cuối câu. Bảng 4 thì: Khẳng định hiện tại (〜い), Phủ định hiện tại (〜くない), Khẳng định quá khứ (〜かった), Phủ định quá khứ (〜くなかった).",
            structure: "〜いです -> 〜い | 〜くないです -> 〜くない | 〜かったです -> 〜かった | 〜くなかったです -> 〜くなかった",
            examples: [
              { japaneseText: "この ラーメン、すごく おいしいよ。", furiganaText: "この ラーメン、すごく おいしいよ。", meaningVi: "Món mì ramen này ngon lắm đấy." },
              { japaneseText: "昨日（きのう）の テスト、難（むずか）しかった。", furiganaText: "昨日（きのう）の テスト、難（むずか）しかった。", meaningVi: "Bài kiểm tra hôm qua đã rất khó." }
            ]
          },
          {
            grammarId: 2003,
            pattern: "普通形 [な形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI な",
            meaning: "Thể ngắn của Tính từ đuôi な (だ / じゃない / だった / じゃなかった)",
            explanation: "Tính từ đuôi な biến đổi です thành だ / じゃない / だった / じゃなかった. Lưu ý đặc biệt: Khi đặt câu hỏi nghi vấn trong thể thông thường, bắt buộc LƯỢC BỎ だ ở cuối câu và lên giọng ở cuối câu (Vd: 今日 暇？ - không nói 暇だ？).",
            structure: "〜です -> 〜だ | 〜じゃありません -> 〜じゃない | 〜でした -> 〜だった | 〜じゃありませんでした -> 〜じゃなかった",
            usageNotes: "Cực kỳ lưu ý: KHÔNG dùng だ ở cuối câu hỏi nghi vấn.",
            examples: [
              { japaneseText: "今日（きょう） 暇（ひま）？ ... うん、暇（ひま）だよ。", furiganaText: "今日（きょう） 暇（ひま）？ ... うん、暇（ひま）だよ。", meaningVi: "Hôm nay rảnh không? ... Ừ, rảnh chứ." },
              { japaneseText: "あの 町（まち）は 静（しず）かじゃなかった。", furiganaText: "あの 町（まち）は 静（しず）かじゃなかった。", meaningVi: "Thành phố đó đã không yên tĩnh chút nào." }
            ]
          },
          {
            grammarId: 2004,
            pattern: "普通形 [名詞] - Thể thông thường của DANH TỪ",
            meaning: "Thể ngắn của Danh từ (だ / じゃない / だった / じゃなかった)",
            explanation: "Danh từ biến đổi 4 thì thể thông thường tương tự tính từ đuôi な. Lược bỏ だ khi hỏi nghi vấn.",
            structure: "N + です -> だ | N + じゃありません -> じゃない | N + でした -> だった | N + じゃありませんでした -> じゃなかった",
            examples: [
              { japaneseText: "昨日（きのう） 雨（あめ）だった？ ... ううん、雨（あめ）じゃなかった。", furiganaText: "昨日（きのう） 雨（あめ）だった？ ... ううん、雨（あめ）じゃなかった。", meaningVi: "Hôm qua trời mưa à? ... Không, đã không mưa." },
              { japaneseText: "あしたは 休み（やすみ）だ。", furiganaText: "あしたは 休み（やすみ）だ。", meaningVi: "Ngày mai là ngày nghỉ." }
            ]
          },
          {
            grammarId: 2005,
            pattern: "会話のルール - Quy tắc văn thoại thân mật (Giản lược & Nuốt âm)",
            meaning: "Tổng hợp các quy tắc rút gọn, nuốt âm và trợ từ trong hội thoại hàng ngày",
            explanation: "Trong văn thoại thực tế: (1) Lược bỏ các trợ từ は, を, へ. (2) Rút gọn Vています thành Vてる (Vd: 何してるの？, 知ってる). (3) Dùng うん (đồng ý) và ううん (phủ định). (4) Đuôi câu cảm xúc: 〜よ (mách nhỏ/nhấn mạnh), 〜ね (xác nhận/đồng cảm), 〜の (hỏi nhẹ nhàng).",
            structure: "Lược bỏ Trợ từ は/を/へ | Vています -> Vてる | うん/ううん | Từ cuối câu 〜よ/〜ね/〜の",
            examples: [
              { japaneseText: "今（いま） 何（なに） してるの？ ... テレビ 見（み）てる。", furiganaText: "今（いま） 何（なに） してるの？ ... テレビ 見（み）てる。", meaningVi: "Bây giờ đang làm gì đấy? ... Tớ đang xem tivi." },
              { japaneseText: "これ 食（た）べる？ ... うん、食（た）べる！", furiganaText: "これ 食（た）べる？ ... うん、食（た）べる！", meaningVi: "Ăn cái này không? ... Ừ, ăn chứ!" }
            ]
          },
        ],
        27: [
          {
            grammarId: 2701,
            pattern: "動詞（どうし）の可能形（かのうけい） (V-可能形)",
            meaning: "Động từ khả năng (Có thể làm gì)",
            explanation: "Diễn tả khả năng có thể thực hiện một hành động nào đó.",
            structure: "N + が + V-可能形",
            usageNotes: "Trong thể khả năng, đối tượng thường dùng が thay cho を.",
            conjugationTable: [
              { group: "Nhóm 1", masuForm: "書きます / 読みます", targetForm: "書けます / 読めます" },
              { group: "Nhóm 2", masuForm: "食べます / 見ます", targetForm: "食べられます / 見られます" },
              { group: "Nhóm 3", masuForm: "します / 来ます", targetForm: "できます / 来られます" },
            ],
            examples: [
              { japaneseText: "私（わたし）は 漢字（かんじ）が 読（よ）めます。", furiganaText: "私（わたし）は 漢字（かんじ）が 読（よ）めます。", meaningVi: "Tôi có thể đọc được chữ Hán." },
              { japaneseText: "一人（ひとり）で 病院（びょういん）へ 行（い）けますか。", furiganaText: "一人（ひとり）で 病院（びょういん）へ 行（い）けますか。", meaningVi: "Bạn có thể tự mình đi đến bệnh viện một mình được không?" }
            ]
          },
          {
            grammarId: 2702,
            pattern: "〜しか〜ない",
            meaning: "Chỉ... (Đi với vế phủ định)",
            explanation: "Nhấn mạnh sự giới hạn, chỉ có bấy nhiêu và ngoài ra không còn gì khác. Bắt buộc đi với động từ thể phủ định ở cuối câu.",
            structure: "N + しか + V-ない",
            usageNotes: "Khác với だけ (đi với thể khẳng định), しか luôn đi với thể phủ định ở cuối câu.",
            examples: [
              { japaneseText: "千円（せんえん）しか ありません。", furiganaText: "千円（せんえん）しか ありません。", meaningVi: "Tôi chỉ có vỏn vẹn 1000 yên." }
            ]
          },
          {
            grammarId: 2703,
            pattern: "〜が見（み）えます / 〜が聞（き）こえます",
            meaning: "Nhìn thấy / Nghe thấy (Khả năng tự nhiên của giác quan)",
            explanation: "Diễn tả hình ảnh hoặc âm thanh đập vào mắt/tai một cách tự nhiên mà không cần nỗ lực chú ý.",
            structure: "N + が + 見えます / 聞こえます",
            usageNotes: "Phân biệt với 見られます (có thể xem khi có cơ hội) và 聞けます (có thể nghe khi mở thiết bị).",
            examples: [
              { japaneseText: "窓（まど）から 富士山（ふじさん）が 見（み）えます。", furiganaText: "窓（まど）から 富士山（ふじさん）が 見（み）えます。", meaningVi: "Từ cửa sổ có thể nhìn thấy núi Phú Sĩ." },
              { japaneseText: "波（なみ）の 音（おと）が 聞（き）こえます。", furiganaText: "波（なみ）の 音（おと）が 聞（き）こえます。", meaningVi: "Có thể nghe thấy tiếng sóng biển." }
            ]
          }
        ],
        29: [
          {
            grammarId: 2901,
            pattern: "自動詞（じどうし） ↔ 他動詞（たどうし） (Tự động từ ↔ Tha động từ)",
            meaning: "Phân biệt Tự động từ (が) và Tha động từ (を)",
            explanation: "Tự động từ (自動詞) diễn tả hành động/trạng thái tự phát sinh hoặc tự thay đổi của sự vật, đi với trợ từ が (Cửa tự mở, đèn tự sáng). Tha động từ (他動詞) diễn tả con người chủ động tác động làm biến đổi đối tượng, đi với trợ từ を (Bật đèn, mở cửa).",
            structure: "Tự động từ: N + が + 自動詞 ↔ Tha động từ: N + を + 他動詞",
            usageNotes: "🧠 CHỐT ĐỂ NHỚ THẦN TỐC:\n• が → Sự vật tự thay đổi / Trạng thái tự diễn ra (ドアが開きます / 電気がつきます).\n• を → Con người chủ động tác động vào sự vật (ドアを開けます / 電気をつけます).\n👉 Cứ nhớ 「が = Tự xảy ra」, 「を = Mình làm tác động」 trước là bạn sẽ phân biệt được 4 cặp này rất nhanh!",
            tableHeader: {
              col1: "Cặp động từ",
              col2: "Tự động từ (が - Tự xảy ra)",
              col3: "Tha động từ (を - Mình làm tác động)"
            },
            conjugationTable: [
              { group: "① 開く ↔ 開ける", masuForm: "開（あ）きます (mở ra)", targetForm: "開（あ）けます (mở cái gì)" },
              { group: "② 閉まる ↔ 閉める", masuForm: "閉（しま）ります (đóng lại)", targetForm: "閉（し）めます (đóng cái gì)" },
              { group: "③ つく ↔ つける", masuForm: "つきます (sáng / được bật)", targetForm: "つけます (bật cái gì)" },
              { group: "④ 消える ↔ 消す", masuForm: "消（き）えます (tắt / biến mất)", targetForm: "消（け）します (tắt / xóa cái gì)" }
            ],
            examples: [
              { japaneseText: "ドアが 開（あ）きます。", furiganaText: "ドアが 開（あ）きます。", meaningVi: "Cửa mở. (👉 Cửa tự mở → あきます)" },
              { japaneseText: "ドアを 開（あ）けます。", furiganaText: "ドアを 開（あ）けます。", meaningVi: "Mở cửa. (👉 Ai đó mở cửa → あけます)" },
              { japaneseText: "ドアが 閉（しま）ります。", furiganaText: "ドアが 閉（しま）ります。", meaningVi: "Cửa đóng lại. (👉 Cửa tự đóng → しまります)" },
              { japaneseText: "ドアを 閉（し）めます。", furiganaText: "ドアを 閉（し）めます。", meaningVi: "Đóng cửa. (👉 Ai đó đóng cửa → しめます)" },
              { japaneseText: "電気（でんき）が つきます。", furiganaText: "電気（でんき）が つきます。", meaningVi: "Đèn sáng. (👉 Đèn tự sáng → つきます)" },
              { japaneseText: "電気（でんき）を つけます。", furiganaText: "電気（でんき）を つけます。", meaningVi: "Bật đèn. (👉 Bật đèn → つけます)" },
              { japaneseText: "電気（でんき）が 消（き）えます。", furiganaText: "電気（でんき）が 消（き）えます。", meaningVi: "Đèn tắt. (👉 Đèn tự tắt → きえます)" },
              { japaneseText: "電気（でんき）を 消（け）します。", furiganaText: "電気（でんき）を 消（け）します。", meaningVi: "Tắt đèn. (👉 Tắt đèn → けします)" }
            ]
          },
          {
            grammarId: 2902,
            pattern: "N が 自動詞-ています",
            meaning: "Trạng thái đang diễn ra của tự động từ",
            explanation: "Diễn tả trạng thái hiện tại của sự vật là kết quả của một hành động đã xảy ra trước đó và vẫn còn lưu lại kết quả (Khác với V-ています ở Bài 14 là đang thực hiện hành động).",
            structure: "N + が + V(tự động từ)-ています",
            examples: [
              { japaneseText: "窓（まど）が 開（あ）いています。", furiganaText: "窓（まど）が 開（あ）いています。", meaningVi: "Cửa sổ đang mở (trạng thái mở đang duy trì)." },
              { japaneseText: "電気（でんき）が ついています。", furiganaText: "電気（でんき）が ついています。", meaningVi: "Đèn đang bật." }
            ]
          },
          {
            grammarId: 2903,
            pattern: "V-てしまいました / V-てしまいます",
            meaning: "Trót lỡ làm gì (Nuối tiếc) / Đã hoàn thành xong hoàn toàn",
            explanation: "Diễn tả 2 sắc thái cảm xúc: (1) Đã làm xong toàn bộ hành động một cách triệt để. (2) Thể hiện sự tiếc nuối, sơ suất trót lỡ làm điều không mong muốn.",
            structure: "V-て + しまいました / しまいます",
            examples: [
              { japaneseText: "宿題（しゅくだい）を 全部（ぜんぶ） やってしまいました。", furiganaText: "宿題（しゅくだい）を 全部（ぜんぶ） やってしまいました。", meaningVi: "Tôi đã làm xong hết sạch bài tập rồi." },
              { japaneseText: "パスポートを 落（お）としてしまいました。", furiganaText: "パスポートを 落（お）としてしまいました。", meaningVi: "Tôi trót lỡ làm rơi mất hộ chiếu rồi." }
            ]
          }
        ]
      };

      // 0. Check Admin local storage first for real-time edits
      let adminSaved: GrammarPoint[] | null = null;
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(`ADMIN_GRAMMAR_STORE_${lessonNum}`);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              adminSaved = parsed;
            }
          } catch (e) {}
        }
      }

      if (adminSaved && adminSaved.length > 0 && isMounted) {
        setGrammars(adminSaved);
        setupEmaGame(adminSaved);
        setActivePointId(adminSaved[0].grammarId);
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient<any[]>(`/curriculum/lessons/${lessonNum}/grammar`);
        const rawList = res && res.success && Array.isArray(res.data) ? res.data : [];

        if (rawList.length > 0 && isMounted) {
          const mappedList: GrammarPoint[] = rawList.map((g: any) => ({
            grammarId: Number(g.grammarId || g.id),
            pattern: g.pattern || "Cấu trúc ngữ pháp",
            meaning: g.meaning || "Ý nghĩa ngữ pháp",
            explanation: g.explanation || "Giải thích chi tiết",
            structure: g.structure || "",
            usageNotes: g.usageNotes || g.notes || "",
            examples: Array.isArray(g.examples)
              ? g.examples.map((ex: any) => ({
                  japaneseText: ex.japaneseText || ex.japanese || "",
                  furiganaText: ex.reading || ex.furigana || ex.furiganaText || ex.japaneseText || "",
                  meaningVi: ex.meaningVi || ex.translationVi || ex.meaning || "",
                }))
              : [],
          }));

          const localList = lessonDataMap[lessonNum];
          const finalList = localList && localList.length > 0 ? localList : mappedList;

          setGrammars(finalList);
          setupEmaGame(finalList);
          setActivePointId(finalList[0].grammarId);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("[GrammarDetailPage] Backend API fetch failed, falling back to local dataset:", err);
      }

      if (isMounted) {
        const currentList = lessonDataMap[lessonNum] || [
          {
            grammarId: lessonNum * 100 + 1,
            pattern: `Mẫu ngữ pháp Bài #${lessonNum}`,
            meaning: `Ý nghĩa cú pháp bài ${lessonNum}`,
            explanation: `Giải thích chi tiết kiến thức bài ${lessonNum} trong Minna no Nihongo.`,
            structure: `Cấu trúc bài ${lessonNum}`,
            examples: [
              { japaneseText: "日本語（にほんご）を 勉強（べんきょう）します。", furiganaText: "日本語（にほんご）を 勉強（べんきょう）します。", meaningVi: "Tôi học tiếng Nhật." }
            ]
          }
        ];

        setGrammars(currentList);
        setupEmaGame(currentList);
        setActivePointId(currentList[0].grammarId);
        setLoading(false);
      }
    }

    loadData();

    const handleAdminSync = (e: Event) => {
      const customEv = e as CustomEvent;
      if (!customEv.detail || customEv.detail.lessonId === lessonNum) {
        loadData();
      }
    };

    window.addEventListener("adminDataUpdated", handleAdminSync);
    return () => {
      isMounted = false;
      window.removeEventListener("adminDataUpdated", handleAdminSync);
    };
  }, [lessonNum]);

  // Setup EMA Game
  const setupEmaGame = (list: GrammarPoint[]) => {
    let blocks = defaultBlocks;
    let meaning = defaultMeaning;
    if (list.length > 0 && list[0].examples && list[0].examples.length > 0) {
      const ex = list[0].examples[0];
      const tokens = ex.japaneseText.split(/\s+/).filter(Boolean);
      if (tokens.length >= 2) {
        blocks = tokens;
        meaning = ex.meaningVi;
      }
    }
    setTargetBlocks(blocks);
    setBuilderWordBlocks([...blocks].sort(() => Math.random() - 0.5));
    setTargetMeaning(meaning);
    setUserOrderedBlocks([]);
    setBuilderStatus("IDLE");
  };

  // Web Speech Audio Playback for Japanese Text
  const handlePlayAudio = (text: string, idKey: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/（[^）]*）/g, "").replace(/\s+/g, "");
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = "ja-JP";
    u.rate = 0.85;
    setPlayingAudioIdx(idKey);
    u.onend = () => setPlayingAudioIdx(null);
    u.onerror = () => setPlayingAudioIdx(null);
    window.speechSynthesis.speak(u);
  };

  // ScrollSpy Listener for Active Grammar Point Card
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = grammars.length - 1; i >= 0; i--) {
        const el = document.getElementById(`grammar-point-${grammars[i].grammarId}`);
        if (el && el.offsetTop <= scrollPos) {
          setActivePointId(grammars[i].grammarId);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [grammars]);

  const scrollToPoint = (id: number) => {
    const el = document.getElementById(`grammar-point-${id}`);
    if (el) {
      const offset = el.offsetTop - 90;
      window.scrollTo({ top: offset, behavior: "smooth" });
      setActivePointId(id);
      setIsMobileTocOpen(false);
    }
  };

  // EMA Game handlers
  const handleSelectBlock = (block: string, idx: number) => {
    setUserOrderedBlocks((prev) => [...prev, block]);
    setBuilderWordBlocks((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus("IDLE");
  };

  const handleRemoveBlock = (block: string, idx: number) => {
    setBuilderWordBlocks((prev) => [...prev, block]);
    setUserOrderedBlocks((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus("IDLE");
  };

  const handleCheckBuilder = () => {
    const isCorrect = userOrderedBlocks.join("") === targetBlocks.join("");
    setBuilderStatus(isCorrect ? "CORRECT" : "WRONG");
  };

  const resetGame = () => {
    setBuilderWordBlocks([...targetBlocks].sort(() => Math.random() - 0.5));
    setUserOrderedBlocks([]);
    setBuilderStatus("IDLE");
  };

  const toggleLearned = (id: number) => {
    setLearnedKeys((prev) => {
      const u = new Set(prev);
      if (u.has(id)) u.delete(id);
      else u.add(id);
      return u;
    });
  };

  const learnedCount = learnedKeys.size;
  const totalCount = grammars.length || 1;
  const progressPercent = Math.round((learnedCount / totalCount) * 100);

  const prevLessonNum = lessonNum > 1 ? lessonNum - 1 : null;
  const nextLessonNum = lessonNum < 25 ? lessonNum + 1 : null;

  return (
    <div className="min-h-screen bg-[#F6F1E8] text-[#2B211D] font-sans flex flex-col antialiased">
      {/* 1. NAVBAR */}
      <LearnerHeader />

      {/* 2. MAIN LESSON CONTAINER */}
      <main className="flex-1 w-full max-w-[1320px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* BREADCRUMB & BACK LINK */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5D7C7] pb-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#76655A]">
            <Link href="/dashboard" className="hover:text-[#C65D4B] transition-colors">Trang chủ</Link>
            <span>›</span>
            <Link href="/grammar" className="hover:text-[#C65D4B] transition-colors">Ngữ pháp</Link>
            <span>›</span>
            <span className="text-[#C65D4B]">{levelCode}</span>
            <span>›</span>
            <span className="text-[#2B211D]">Bài {lessonNum}</span>
          </div>

          <Link
            href="/grammar"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76655A] hover:text-[#C65D4B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại danh sách bài học</span>
          </Link>
        </div>

        {/* ULTRA-CUTE JAPANESE STUDY HERO BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFF7F4] to-[#FAF1E8] border-2 border-[#EBDCD0] rounded-3xl p-5 sm:p-7 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Subtle Decorative Sakura & Japanese Grid Accents */}
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-[radial-gradient(#C65D4B_1.2px,transparent_1.2px)] [background-size:14px_14px] opacity-15 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[#C65D4B]/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute top-2 right-12 text-lg opacity-40 select-none animate-pulse">🌸</div>
          <div className="absolute bottom-3 right-48 text-sm opacity-30 select-none">✨</div>

          {/* Left Column: Mascot Cat + Title & Lesson Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 relative z-10 text-center sm:text-left">
            {/* Adorable Chibi Cat Study Mascot */}
            <div className="relative shrink-0 select-none">
              <div className="w-20 h-20 sm:w-22 sm:h-22 bg-white/90 border-2 border-[#E8DCCF] rounded-3xl p-1.5 shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
                <svg className="w-full h-full filter drop-shadow-xs" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Ears with Pink Inner */}
                  <polygon points="28,40 42,12 54,36" fill="#D66552" stroke="#4A3426" strokeWidth="3" strokeLinejoin="round" />
                  <polygon points="34,34 42,18 50,34" fill="#FAD4CD" />
                  <polygon points="92,40 78,12 66,36" fill="#D66552" stroke="#4A3426" strokeWidth="3" strokeLinejoin="round" />
                  <polygon points="86,34 78,18 70,34" fill="#FAD4CD" />

                  {/* Cat Head */}
                  <circle cx="60" cy="62" r="38" fill="#FFFDF9" stroke="#4A3426" strokeWidth="3.5" />

                  {/* Red Collar & Golden Bell */}
                  <path d="M38 90 Q60 100 82 90" stroke="#D66552" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="60" cy="95" r="7" fill="#F59E0B" stroke="#4A3426" strokeWidth="2" />
                  <circle cx="60" cy="94" r="2" fill="#78350F" />

                  {/* Happy Cute Eyes */}
                  <path d="M42 58 Q48 50 54 58" stroke="#4A3426" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M66 58 Q72 50 78 58" stroke="#4A3426" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                  {/* Rosy Blush Cheeks */}
                  <ellipse cx="38" cy="66" rx="6" ry="4" fill="#F4B4A8" opacity="0.9" />
                  <ellipse cx="82" cy="66" rx="6" ry="4" fill="#F4B4A8" opacity="0.9" />

                  {/* Nose & Smile */}
                  <polygon points="60,63 56,60 64,60" fill="#D66552" />
                  <path d="M54 67 Q60 73 66 67" stroke="#4A3426" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                  {/* Whiskers */}
                  <line x1="20" y1="58" x2="34" y2="60" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="65" x2="33" y2="65" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />
                  <line x1="86" y1="60" x2="100" y2="58" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />
                  <line x1="87" y1="65" x2="102" y2="65" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />

                  {/* Sakura on Ear */}
                  <circle cx="34" cy="28" r="4" fill="#F472B6" />
                  <circle cx="34" cy="28" r="1.5" fill="#FEF08A" />

                  {/* Right Paw holding cute pencil */}
                  <g>
                    <rect x="74" y="68" width="28" height="12" rx="4" fill="#F59E0B" stroke="#4A3426" strokeWidth="2" transform="rotate(-30 74 68)" />
                    <polygon points="98,52 105,48 100,56" fill="#4A3426" />
                    <circle cx="72" cy="80" r="7" fill="#FFFDF9" stroke="#4A3426" strokeWidth="2.5" />
                  </g>
                </svg>
              </div>

              {/* Cheerful Speech Bubble */}
              <div className="hidden sm:block absolute -top-3 -right-20 bg-white border border-[#C65D4B]/30 px-2.5 py-0.5 rounded-full shadow-2xs text-[10px] font-black text-[#C65D4B] whitespace-nowrap animate-bounce">
                がんばって! 🐾
              </div>
            </div>

            {/* Title & Info */}
            <div className="space-y-1.5 max-w-xl">
              {/* Cute Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <span className="px-3 py-0.5 rounded-full bg-[#C65D4B] text-white text-[11px] font-black shadow-2xs flex items-center gap-1">
                  <span>🌸</span>
                  <span>BÀI {formattedNum}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-black">
                  JLPT {levelCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 border border-[#E5D7C7] text-[#76655A] text-[10px] font-bold">
                  ⛩️ {grammars.length} Mẫu Ngữ Pháp
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-[#1F1714] tracking-tight leading-snug">
                {lessonMeta.title}
              </h1>
            </div>
          </div>

          {/* Right Column: Cute Gamified Progress HUD Box */}
          <div className="bg-white/95 border-2 border-[#EADCCE] hover:border-[#C65D4B]/40 rounded-2xl p-4 w-full md:w-64 shrink-0 space-y-2.5 shadow-sm relative z-10 transition-colors">
            <div className="flex items-center justify-between text-xs font-black text-[#1F1714]">
              <span className="flex items-center gap-1.5 text-[#8B6F5A]">
                <span>🐾</span>
                <span>Tiến độ bài học</span>
              </span>
              <span className="px-2 py-0.5 bg-[#FFF2F0] text-[#C65D4B] rounded-lg text-[11px] font-black border border-[#C65D4B]/20">
                {learnedCount}/{totalCount} đã thuộc
              </span>
            </div>

            {/* Cute Gradient Progress Bar */}
            <div className="h-2.5 bg-[#FAF3EB] rounded-full overflow-hidden border border-[#E5D7C7] p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#F59E0B] via-[#E0533C] to-[#C65D4B] rounded-full transition-all duration-500 shadow-2xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5">
              <span className="text-[#8C7B70] font-bold">
                {progressPercent === 100 ? "🎉 Đã hoàn thành" : progressPercent > 0 ? "⚡ Đang học" : "🌱 Mới bắt đầu"}
              </span>
              <span className="font-black text-[#C65D4B] bg-[#FAF4EB] px-2 py-0.5 rounded-md">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE TABLE OF CONTENTS DROPDOWN */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            className="w-full bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-3.5 flex items-center justify-between text-xs font-bold text-[#1F1714] shadow-2xs cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-[#C65D4B]" />
              <span>Mục lục bài học ({grammars.length} mẫu câu)</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#76655A] transition-transform ${isMobileTocOpen ? "rotate-180" : ""}`} />
          </button>

          {isMobileTocOpen && (
            <div className="mt-1.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-2 shadow-lg space-y-1 text-left">
              {grammars.map((g, idx) => (
                <button
                  key={g.grammarId}
                  onClick={() => scrollToPoint(g.grammarId)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activePointId === g.grammarId ? "bg-[#C65D4B] text-white" : "text-[#76655A] hover:bg-[#FAF4EB]"
                  }`}
                >
                  <span className="mr-2 font-mono">{String(idx + 1).padStart(2, "0")}</span>
                  <span>{g.pattern}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP 2-COLUMN TEXTBOOK LAYOUT (Sticky Sidebar ~220px & Main Cards Area) */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          
          {/* LEFT SIDEBAR: INDIVIDUAL GRAMMAR POINTS MỤC LỤC (~220px Sticky) */}
          <aside className="hidden lg:block w-[220px] shrink-0 sticky top-20 space-y-3">
            <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-4 shadow-[0_4px_16px_rgba(74,52,38,0.03)] space-y-3">
              <div className="px-1 border-b border-[#E5D7C7] pb-2.5">
                <span className="text-[10px] font-black text-[#C65D4B] uppercase tracking-wider block">
                  MỤC LỤC BÀI {formattedNum}
                </span>
                <p className="text-xs font-black text-[#1F1714] truncate mt-0.5">
                  {grammars.length} mẫu ngữ pháp
                </p>
              </div>

              <nav className="space-y-1">
                {grammars.map((g, idx) => {
                  const isActive = activePointId === g.grammarId;
                  const itemNum = String(idx + 1).padStart(2, "0");
                  const isLearned = learnedKeys.has(g.grammarId);

                  return (
                    <button
                      key={g.grammarId}
                      type="button"
                      onClick={() => scrollToPoint(g.grammarId)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isActive
                          ? "bg-[#C65D4B] text-white font-black shadow-xs"
                          : "text-[#6E5D55] hover:text-[#1F1714] hover:bg-[#FAF4EB] font-bold"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`font-mono text-[11px] shrink-0 ${isActive ? "text-white" : "text-[#C65D4B]"}`}>
                          {itemNum}
                        </span>
                        <span className="truncate"><JapaneseFuriganaText text={g.pattern} /></span>
                      </div>

                      {isLearned && (
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-emerald-600"}`} />
                      )}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setIsPracticeOpen(true)}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs text-[#C65D4B] bg-[#FFF4F2] hover:bg-[#FFE8E4] font-black transition-all cursor-pointer flex items-center gap-2 pt-2.5 border-t border-[#E5D7C7]"
                >
                  <span className="text-xs">🎮</span>
                  <span>Luyện tập bài học (4 Chế độ)</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* MAIN WORKSPACE: HIGH-CONTRAST JAPANESE TEXTBOOK GRAMMAR CARDS */}
          <div className="flex-1 w-full space-y-6 min-w-0">
            
            {loading ? (
              <div className="bg-[#FFFDF9] rounded-2xl p-12 text-center text-[#76655A] border border-[#E5D7C7] font-bold animate-pulse">
                ⛩️ Đang nạp giáo trình bài học...
              </div>
            ) : (
              grammars.map((g, idx) => {
                const pointNum = String(idx + 1).padStart(2, "0");
                const isLearned = learnedKeys.has(g.grammarId);
                const isActive = activePointId === g.grammarId;

                return (
                  <section
                    key={g.grammarId}
                    id={`grammar-point-${g.grammarId}`}
                    className={`bg-[#FFFDF9] border rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(74,52,38,0.04)] space-y-4.5 transition-all duration-200 scroll-mt-24 ${
                      isActive ? "border-[#C65D4B] ring-2 ring-[#C65D4B]/15" : "border-[#E5D7C7]"
                    }`}
                  >
                    {/* Header Strip: Number Badge + Formula Title + Meaning Tag + Action Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5D7C7] pb-3.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-mono font-black text-white bg-[#C65D4B] px-2.5 py-1 rounded-lg shadow-2xs">
                          {pointNum}
                        </span>

                        {/* Title Formula */}
                        <h2 className="text-xl sm:text-2xl font-black text-[#1F1714] tracking-tight">
                          <JapaneseFuriganaText text={g.pattern} />
                        </h2>

                        {/* Meaning Tag (Sakura Rose Box) */}
                        <span className="text-xs font-extrabold text-[#C65D4B] bg-[#FDF0EE] border border-[#F5D5D0] px-3 py-1 rounded-xl shadow-2xs">
                          → {g.meaning}
                        </span>
                      </div>

                      {/* Action Button: Mark Learned */}
                      <button
                        type="button"
                        onClick={() => toggleLearned(g.grammarId)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                          isLearned
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs"
                            : "bg-[#FAF4EB] text-[#76655A] border-[#E5D7C7] hover:text-[#C65D4B] hover:border-[#C65D4B]/40"
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${isLearned ? "text-emerald-600" : "text-[#76655A]"}`} />
                        <span>{isLearned ? "Đã thuộc" : "Đánh dấu đã thuộc"}</span>
                      </button>
                    </div>

                    {/* 2-Column Grid: Cấu Trúc (Bamboo Beige) & Cách Dùng (Warm Ivory) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                      {/* Cấu trúc Box (Bamboo Beige Contrast) */}
                      <div className="md:col-span-5 bg-[#F3EBE0] border border-[#E3D4C4] p-3.5 rounded-xl space-y-1 shadow-2xs">
                        <span className="text-[10px] font-black text-[#8B6F5A] uppercase tracking-wider block">
                          CẤU TRÚC
                        </span>
                        <div className="text-xs sm:text-sm font-extrabold text-[#1F1714] font-mono leading-snug">
                          <JapaneseFuriganaText text={g.structure || g.pattern} />
                        </div>
                      </div>

                      {/* Cách dùng Box (Warm Ivory) */}
                      <div className="md:col-span-7 bg-[#FFFDF9] border border-[#E5D7C7] p-3.5 rounded-xl space-y-1 shadow-2xs">
                        <span className="text-[10px] font-black text-[#8B6F5A] uppercase tracking-wider block">
                          CÁCH DÙNG
                        </span>
                        <p className="text-xs sm:text-sm text-[#52443C] leading-relaxed font-medium">
                          {g.explanation}
                        </p>
                      </div>
                    </div>

                    {/* Conjugation Table (CÁCH CHIA ĐỘNG TỪ) */}
                    {g.conjugationTable && g.conjugationTable.length > 0 && (
                      <div className="bg-[#FFFDF9] border border-[#E5D7C7] p-3.5 rounded-xl space-y-2 shadow-2xs">
                        <span className="text-[10px] font-black text-[#8B6F5A] uppercase tracking-wider block">
                          CÁCH CHIA ĐỘNG TỪ
                        </span>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left border-collapse">
                            <thead>
                              <tr className="bg-[#F8EFE4] text-[#76655A] font-extrabold border-b border-[#E5D7C7]">
                                <th className="py-2 px-3">{g.tableHeader?.col1 || "Nhóm"}</th>
                                <th className="py-2 px-3">{g.tableHeader?.col2 || "Thể ます"}</th>
                                <th className="py-2 px-3 text-[#C65D4B]">{g.tableHeader?.col3 || "Thể biến đổi"}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5D7C7]/60 font-semibold text-[#1F1714]">
                              {g.conjugationTable.map((row, idx) => (
                                <tr key={idx} className="hover:bg-[#FAF4EB]/60">
                                  <td className="py-2 px-3 font-bold text-[#8B6F5A]">{row.group}</td>
                                  <td className="py-2 px-3">{row.masuForm}</td>
                                  <td className="py-2 px-3 font-bold text-[#C65D4B]">→ {row.targetForm}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Ví dụ Minh Họa (Washi Border Accents with Speaker Audio & Brick-Red Furigana Above Kanji) */}
                    {g.examples && g.examples.length > 0 && (
                      <div className="space-y-2.5 pt-1">
                        <span className="text-[10px] font-black text-[#8B6F5A] uppercase tracking-wider block">
                          VÍ DỤ MINH HỌA
                        </span>

                        <div className="space-y-2.5">
                          {g.examples.map((ex, i) => {
                            const jpDisplay = ex.furiganaText || ex.japaneseText;
                            const audioKey = `${g.grammarId}_${i}`;
                            const isPlaying = playingAudioIdx === audioKey;

                            return (
                              <div
                                key={i}
                                className="bg-[#FAF4EB] border-l-4 border-[#C65D4B] pl-4 pr-3.5 py-3.5 rounded-r-2xl space-y-1.5 shadow-2xs hover:bg-[#F6EFE5] transition-all flex items-center justify-between gap-3"
                              >
                                <div className="space-y-1 flex-1 min-w-0">
                                  {/* Japanese Text with Brick Red Furigana (#B94A3E) Above Kanji */}
                                  <div className="text-lg sm:text-2xl font-bold text-[#1F1714] leading-loose">
                                    <JapaneseFuriganaText text={jpDisplay} />
                                  </div>
                                  {/* Vietnamese Translation (13px - 14px) */}
                                  <p className="text-xs sm:text-sm font-semibold text-[#6E5D55] pt-0.5">
                                    → {ex.meaningVi}
                                  </p>
                                </div>

                                {/* Audio Pronunciation Button */}
                                <button
                                  type="button"
                                  title="Nghe phát âm chuẩn tiếng Nhật"
                                  onClick={() => handlePlayAudio(ex.japaneseText, audioKey)}
                                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                                    isPlaying
                                      ? "bg-[#C65D4B] text-white border-[#C65D4B] animate-pulse"
                                      : "bg-[#FFFDF9] hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white border-[#E5D7C7] hover:border-[#C65D4B]"
                                  }`}
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Lưu ý / Lỗi thường gặp (Compact Callout Pill) */}
                    {(g.usageNotes || g.wrongExample) && (
                      <div className="bg-[#FFF6F4] border border-[#F6D5D0] rounded-xl p-3 text-xs flex flex-wrap items-center gap-2 text-[#C65D4B]">
                        <Lightbulb className="w-4 h-4 shrink-0 text-[#C65D4B]" />
                        <span className="font-extrabold">Lưu ý:</span>
                        <span className="text-[#52443C] font-medium">{g.usageNotes}</span>
                        {g.wrongExample && (
                          <span className="text-rose-700 font-extrabold ml-auto bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200 text-[11px]">
                            ❌ {g.wrongExample}
                          </span>
                        )}
                      </div>
                    )}
                  </section>
                );
              })
            )}

            {/* END OF LESSON: COMPACT GAME QUEST PRACTICE PORTAL WITH WAVING CAT MASCOT */}
            <section id="practice-section" className="relative bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EB] to-[#F5ECE0] border-2 border-[#C65D4B]/40 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C65D4B]/10 rounded-full blur-xl pointer-events-none" />

              {/* Left Column: Compact Welcoming Cat Mascot */}
              <div className="flex items-center gap-3 shrink-0 select-none">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 filter drop-shadow-sm shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ears */}
                    <polygon points="30,42 44,14 56,38" fill="#D66552" stroke="#4A3426" strokeWidth="3" strokeLinejoin="round" />
                    <polygon points="36,36 44,20 52,36" fill="#FAD4CD" />
                    <polygon points="90,42 76,14 64,38" fill="#D66552" stroke="#4A3426" strokeWidth="3" strokeLinejoin="round" />
                    <polygon points="84,36 76,20 68,36" fill="#FAD4CD" />

                    {/* Head */}
                    <circle cx="60" cy="62" r="38" fill="#FFFDF9" stroke="#4A3426" strokeWidth="3.5" />

                    {/* Collar & Bell */}
                    <path d="M38 90 Q60 100 82 90" stroke="#D66552" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="60" cy="95" r="7" fill="#F59E0B" stroke="#4A3426" strokeWidth="2" />
                    <circle cx="60" cy="94" r="2" fill="#78350F" />

                    {/* Happy Eyes */}
                    <path d="M42 58 Q48 50 54 58" stroke="#4A3426" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M66 58 Q72 50 78 58" stroke="#4A3426" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                    {/* Cheeks */}
                    <ellipse cx="38" cy="66" rx="6" ry="4" fill="#F4B4A8" opacity="0.9" />
                    <ellipse cx="82" cy="66" rx="6" ry="4" fill="#F4B4A8" opacity="0.9" />

                    {/* Nose & Smile */}
                    <polygon points="60,63 56,60 64,60" fill="#D66552" />
                    <path d="M54 67 Q60 73 66 67" stroke="#4A3426" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    {/* Whiskers */}
                    <line x1="20" y1="58" x2="34" y2="60" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />
                    <line x1="18" y1="65" x2="33" y2="65" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />
                    <line x1="86" y1="60" x2="100" y2="58" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />
                    <line x1="87" y1="65" x2="102" y2="65" stroke="#4A3426" strokeWidth="2" strokeLinecap="round" />

                    {/* Waving Paw */}
                    <g className="animate-pulse origin-bottom-left">
                      <circle cx="28" cy="78" r="9" fill="#FFFDF9" stroke="#4A3426" strokeWidth="2.5" />
                      <ellipse cx="28" cy="78" rx="4" ry="4" fill="#FAD4CD" />
                    </g>

                    {/* Right Paw holding Pass tag */}
                    <g>
                      <rect x="74" y="68" width="30" height="22" rx="5" fill="#FFFDF9" stroke="#D66552" strokeWidth="2.5" transform="rotate(-8 74 68)" />
                      <text x="80" y="83" fill="#D66552" fontSize="12" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-8 74 68)">必勝</text>
                      <circle cx="76" cy="84" r="8" fill="#FFFDF9" stroke="#4A3426" strokeWidth="2.5" />
                    </g>
                  </svg>
                </div>

                <div className="space-y-1">
                  <div className="bg-white border border-[#C65D4B]/30 px-3 py-1 rounded-full shadow-2xs text-[11px] font-black text-[#8B6F5A] inline-flex items-center gap-1.5 animate-bounce">
                    <span>Sensei ơi! Vào phá đảo 4 ải nhé 🐾</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#C65D4B] text-white font-black text-[10px] rounded-full uppercase">
                      BÀI #{formattedNum}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] rounded-full">
                      ⭐ +150 XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Column: 4 Mini Stage Badges */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-md">
                <span className="px-2.5 py-1 bg-white/90 border border-[#E5D7C7] rounded-lg text-[11px] font-bold text-[#1F1714] shadow-2xs">
                  ✏️ 1. Biến Đổi Thể
                </span>
                <span className="px-2.5 py-1 bg-white/90 border border-[#E5D7C7] rounded-lg text-[11px] font-bold text-[#1F1714] shadow-2xs">
                  💬 2. Phản Xạ Thoại
                </span>
                <span className="px-2.5 py-1 bg-white/90 border border-[#E5D7C7] rounded-lg text-[11px] font-bold text-[#1F1714] shadow-2xs">
                  🎮 3. Xếp Câu Ema
                </span>
                <span className="px-2.5 py-1 bg-amber-50 border border-amber-300 rounded-lg text-[11px] font-black text-amber-900 shadow-2xs">
                  ⚡ 4. Quiz 30 Câu
                </span>
              </div>

              {/* Right Column: Sleek Game Action Button */}
              <div className="shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsPracticeOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#C65D4B] via-[#E0533C] to-[#C65D4B] hover:from-[#B44C3B] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#C65D4B]/30 hover:scale-103 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  <Gamepad2 className="w-4 h-4 animate-pulse" />
                  <span>VÀO ĐẤU TRƯỜNG LUYỆN TẬP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* NEXT / PREV LESSON NAVIGATION */}
            <div className="pt-4 border-t border-[#E5D7C7] flex items-center justify-between gap-3">
              {prevLessonNum ? (
                <Link
                  href={`/grammar/${levelId}/lesson-${prevLessonNum}`}
                  className="px-4 py-2.5 bg-[#FFFDF9] hover:bg-[#FAF4EB] text-[#1F1714] font-bold text-xs rounded-xl border border-[#E5D7C7] transition-all flex items-center gap-2 shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#C65D4B]" />
                  <span>← Bài {prevLessonNum}</span>
                </Link>
              ) : (
                <div />
              )}

              {nextLessonNum && (
                <Link
                  href={`/grammar/${levelId}/lesson-${nextLessonNum}`}
                  className="px-5 py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Bài tiếp theo (Bài {nextLessonNum})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* DEDICATED FULL-SCREEN IMMERSIVE PRACTICE ARENA (MYSTICAL JAPANESE DOJO THEME) */}
      {isPracticeOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F0B0A]/95 backdrop-blur-2xl flex flex-col animate-fadeIn overflow-hidden">
          {/* Practice Arena Top Navigation */}
          <div className="border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#1E1513] via-[#2A1D1A] to-[#1E1513] px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-lg">
            <button
              type="button"
              onClick={() => setIsPracticeOpen(false)}
              className="px-3 sm:px-4 py-2 bg-[#2E201B] hover:bg-[#3E2B24] text-[#E5D7C5] font-bold text-xs sm:text-sm rounded-xl border border-[#D4AF37]/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:border-[#FF5733] whitespace-nowrap shrink-0 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#FFB020]" />
              <span>Quay lại</span>
            </button>


            <div className="text-center">
              <span className="text-[10px] font-black text-[#FFB020] uppercase tracking-widest block drop-shadow-sm flex items-center justify-center gap-1">
                ⛩️ PHÒNG THỬ THÁCH NGỮ PHÁP HYỀN BÍ ⛩️
              </span>
              <h2 className="text-sm sm:text-base font-black text-[#FFF5E6] truncate drop-shadow-md">
                Bài #{lessonNum}: Ngữ Pháp Tiếng Nhật {levelCode}
              </h2>
            </div>
          </div>

          {/* Mode Tabs Bar */}
          <div className="bg-[#18110F] border-b border-[#D4AF37]/20 px-4 py-2.5 flex items-center justify-center gap-2.5 overflow-x-auto shrink-0 scrollbar-none shadow-inner">
            <button
              type="button"
              onClick={() => setPracticeTab("CLOZE")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                practiceTab === "CLOZE"
                  ? "bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] text-white shadow-[0_0_20px_rgba(217,65,41,0.6)] scale-105 border border-[#FF9E85]/40"
                  : "text-[#D4C5B3] hover:text-white bg-[#221816] hover:bg-[#2F211D] border border-[#D4AF37]/20"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>1. Biến Đổi Thể & Điền Trợ Từ</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeTab("REFLEX")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                practiceTab === "REFLEX"
                  ? "bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] text-white shadow-[0_0_20px_rgba(217,65,41,0.6)] scale-105 border border-[#FF9E85]/40"
                  : "text-[#D4C5B3] hover:text-white bg-[#221816] hover:bg-[#2F211D] border border-[#D4AF37]/20"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>2. Phản Xạ Hội Thoại</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeTab("EMA")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                practiceTab === "EMA"
                  ? "bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] text-white shadow-[0_0_20px_rgba(217,65,41,0.6)] scale-105 border border-[#FF9E85]/40"
                  : "text-[#D4C5B3] hover:text-white bg-[#221816] hover:bg-[#2F211D] border border-[#D4AF37]/20"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>3. Game Xếp Câu Ema</span>
            </button>

            <Link
              href={`/quizzes/${lessonNum}?category=GRAMMAR`}
              className="px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 bg-[#221816] hover:bg-[#D94129] text-[#D4C5B3] hover:text-white border border-[#D4AF37]/20 hover:border-[#FF9E85]/40 hover:scale-105 hover:shadow-[0_0_15px_rgba(217,65,41,0.5)]"
            >
              <Zap className="w-3.5 h-3.5 text-[#FFB020] fill-[#FFB020]" />
              <span>4. Bài Tập Quiz (30 Câu)</span>
            </Link>
          </div>

          {/* Active Mode Workspace Container */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 flex justify-center items-center">
            <div className="w-full max-w-3xl animate-slideIn">
              {practiceTab === "CLOZE" && (
                <GrammarClozeTransformPractice lessonNum={lessonNum} grammarPoints={grammars} />
              )}

              {practiceTab === "REFLEX" && (
                <GrammarConversationalReflexPractice lessonNum={lessonNum} grammarPoints={grammars} />
              )}

              {practiceTab === "EMA" && (
                <GrammarEmaSentenceGame lessonNum={lessonNum} grammarPoints={grammars} />
              )}

              {practiceTab === "QUIZ" && (
                <GrammarQuizPractice lessonNum={lessonNum} grammarPoints={grammars} />
              )}
            </div>
          </div>
        </div>
      )}

      <LearnerFooter />
    </div>
  );
}
