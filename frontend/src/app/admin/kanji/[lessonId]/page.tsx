"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, PenTool, Plus, Trash2, Edit3, CheckCircle2, Zap, RefreshCw, 
  Keyboard, Gamepad2, Sparkles, Layers, Check, X, BookOpen
} from "lucide-react";

interface KanjiItem {
  kanjiId: number;
  character: string;
  hanViet: string;
  onyomi: string;
  kunyomi: string;
  strokeCount: number;
  meaningVi: string;
}

interface ReadingSentenceItem {
  sentenceId: number;
  japaneseText: string;
  readingKana: string;
  meaningVi: string;
}

interface QuestionItem {
  questionId?: number;
  prompt: string;
  questionType: string;
  category: string;
  validAnswers?: string;
  explanation?: string;
  options?: { optionText: string; isCorrect: boolean }[];
}

export default function AdminKanjiLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.lessonId;

  const [kanjis, setKanjis] = useState<KanjiItem[]>([]);
  const [readingSentences, setReadingSentences] = useState<ReadingSentenceItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Kanji Modal State
  const [showKanjiModal, setShowKanjiModal] = useState(false);
  const [kChar, setKChar] = useState("");
  const [kHanViet, setKHanViet] = useState("");
  const [kOnyomi, setKOnyomi] = useState("");
  const [kKunyomi, setKKunyomi] = useState("");
  const [kStrokes, setKStrokes] = useState(4);
  const [kMeaning, setKMeaning] = useState("");

  // Reading Sentence Modal State
  const [showSentenceModal, setShowSentenceModal] = useState(false);
  const [sJp, setSJp] = useState("");
  const [sKana, setSKana] = useState("");
  const [sVi, setSVi] = useState("");

  // Question Modal State
  const [showQModal, setShowQModal] = useState(false);
  const [qPrompt, setQPrompt] = useState("");
  const [qType, setQType] = useState("MULTIPLE_CHOICE");
  const [qOptA, setQOptA] = useState("");
  const [qOptB, setQOptB] = useState("");
  const [qOptC, setQOptC] = useState("");
  const [qOptD, setQOptD] = useState("");
  const [qCorrect, setQCorrect] = useState(0);
  const [qValidAns, setQValidAns] = useState("");
  const [qExpl, setQExpl] = useState("");

  const getLessonKanjiFallback = (lId: number): KanjiItem[] => {
    if (lId === 29) {
      return [
        { kanjiId: 2901, character: "開", hanViet: "KHẢI", onyomi: "カイ", kunyomi: "あ.ける, あ.く", strokeCount: 12, meaningVi: "Mở / Khai mở" },
        { kanjiId: 2902, character: "閉", hanViet: "BẾ", onyomi: "ヘイ", kunyomi: "し.める, し.まる", strokeCount: 11, meaningVi: "Đóng / Bế mạc" },
        { kanjiId: 2903, character: "消", hanViet: "TIÊU", onyomi: "ショウ", kunyomi: "き.える, け.す", strokeCount: 10, meaningVi: "Tắt / Tiêu diệt" },
        { kanjiId: 2904, character: "落", hanViet: "LẠC", onyomi: "ラク", kunyomi: "お.ちる, お.とす", strokeCount: 12, meaningVi: "Rơi / Lỡ rơi" },
      ];
    }

    const isN4 = lId > 25;
    const levelText = isN4 ? "N4" : "N5";
    return [
      { kanjiId: lId * 100 + 1, character: "日", hanViet: "NHẬT", onyomi: "ニチ, ジツ", kunyomi: "ひ, -び", strokeCount: 4, meaningVi: `Hán tự #1 Bài #${lId} (${levelText})` },
      { kanjiId: lId * 100 + 2, character: "本", hanViet: "BẢN", onyomi: "ホン", kunyomi: "moto", strokeCount: 5, meaningVi: `Hán tự #2 Bài #${lId} (${levelText})` },
      { kanjiId: lId * 100 + 3, character: "学", hanViet: "HỌC", onyomi: "ガク", kunyomi: "まな.ぶ", strokeCount: 8, meaningVi: `Hán tự #3 Bài #${lId} (${levelText})` },
    ];
  };

  const saveKanjisState = (updatedList: KanjiItem[]) => {
    setKanjis(updatedList);
    if (typeof window !== "undefined") {
      localStorage.setItem(`ADMIN_KANJI_STORE_${lessonId}`, JSON.stringify(updatedList));
      window.dispatchEvent(new CustomEvent("adminDataUpdated", { detail: { lessonId: Number(lessonId) } }));
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const lNum = Number(lessonId) || 1;

      // 0. Check local storage first
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(`ADMIN_KANJI_STORE_${lessonId}`);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setKanjis(parsed);
              setLoading(false);
              return;
            }
          } catch (e) {}
        }
      }

      // Fallback per specific lessonId
      const initialKanjis = getLessonKanjiFallback(lNum);
      const initialSentences: ReadingSentenceItem[] = [
        { sentenceId: 1, japaneseText: `Bài #${lNum}: 窓（まど）が 開（あ）いています。`, readingKana: "まど が あいています。", meaningVi: `Cửa sổ đang mở (Bài #${lNum}).` },
      ];

      const initialQuestions: QuestionItem[] = [
        {
          questionId: 301,
          prompt: `Âm Hán Việt của Hán tự Bài #${lNum} 「 ${initialKanjis[0]?.character || "開"} 」 là gì?`,
          questionType: "MULTIPLE_CHOICE",
          category: "KANJI",
          options: [
            { optionText: initialKanjis[0]?.hanViet || "KHẢI", isCorrect: true },
            { optionText: "BẢN", isCorrect: false },
            { optionText: "NHÂN", isCorrect: false },
            { optionText: "NGUYỆT", isCorrect: false },
          ],
          explanation: `Chữ ${initialKanjis[0]?.character} có âm Hán Việt là ${initialKanjis[0]?.hanViet}.`,
        },
      ];

      setKanjis(initialKanjis);
      setReadingSentences(initialSentences);
      setQuestions(initialQuestions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lessonId]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Add Kanji
  const handleAddKanji = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kChar.trim() || !kHanViet.trim()) {
      alert("Vui lòng nhập Chữ Kanji và Âm Hán Việt!");
      return;
    }

    const newItem: KanjiItem = {
      kanjiId: Date.now(),
      character: kChar,
      hanViet: kHanViet.toUpperCase(),
      onyomi: kOnyomi,
      kunyomi: kKunyomi,
      strokeCount: Number(kStrokes) || 4,
      meaningVi: kMeaning || kHanViet,
    };

    setKanjis((prev) => [...prev, newItem]);
    setShowKanjiModal(false);
    setKChar("");
    setKHanViet("");
    setKOnyomi("");
    setKKunyomi("");
    setKMeaning("");
    showToast("Đã thêm chữ Kanji mới thành công!");
  };

  const handleDeleteKanji = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa chữ Kanji này?")) {
      setKanjis((prev) => prev.filter((k) => k.kanjiId !== id));
      showToast("Đã xóa chữ Kanji thành công!");
    }
  };

  // Add Reading Sentence
  const handleAddSentence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sJp.trim() || !sVi.trim()) {
      alert("Vui lòng nhập Câu tiếng Nhật và Nghĩa tiếng Việt!");
      return;
    }

    const newS: ReadingSentenceItem = {
      sentenceId: Date.now(),
      japaneseText: sJp,
      readingKana: sKana || sJp,
      meaningVi: sVi,
    };

    setReadingSentences((prev) => [...prev, newS]);
    setShowSentenceModal(false);
    setSJp("");
    setSKana("");
    setSVi("");
    showToast("Đã thêm bài tập Đọc câu Hán tự mới!");
  };

  const handleDeleteSentence = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa câu đọc Hán tự này?")) {
      setReadingSentences((prev) => prev.filter((s) => s.sentenceId !== id));
      showToast("Đã xóa câu đọc Hán tự!");
    }
  };

  // Add Kanji Question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qPrompt.trim()) {
      alert("Vui lòng nhập đề bài câu hỏi!");
      return;
    }

    const newQ: QuestionItem = {
      questionId: Date.now(),
      prompt: qPrompt,
      questionType: qType,
      category: "KANJI",
      explanation: qExpl,
      validAnswers: qType === "TYPING" ? qValidAns : undefined,
      options: qType !== "TYPING" ? [
        { optionText: qOptA || "Phương án A", isCorrect: qCorrect === 0 },
        { optionText: qOptB || "Phương án B", isCorrect: qCorrect === 1 },
        { optionText: qOptC || "Phương án C", isCorrect: qCorrect === 2 },
        { optionText: qOptD || "Phương án D", isCorrect: qCorrect === 3 },
      ] : undefined,
    };

    setQuestions((prev) => [...prev, newQ]);
    setShowQModal(false);
    setQPrompt("");
    setQValidAns("");
    setQExpl("");
    showToast("Đã thêm câu hỏi Kanji mới thành công!");
  };

  const handleDeleteQuestion = (id?: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa câu hỏi Kanji này?")) {
      setQuestions((prev) => prev.filter((q) => q.questionId !== id));
      showToast("Đã xóa câu hỏi Kanji!");
    }
  };

  // Auto Generate Kanji & 30 UNIQUE Exercises
  const handleAutoGenerate = () => {
    const autoKanjis: KanjiItem[] = [
      { kanjiId: Date.now() + Math.floor(Math.random() * 10000), character: "水", hanViet: "THỦY", onyomi: "スイ", kunyomi: "みず", strokeCount: 4, meaningVi: "Nước" },
      { kanjiId: Date.now() + Math.floor(Math.random() * 10000) + 1, character: "木", hanViet: "MỘC", onyomi: "ボク, モク", kunyomi: "き", strokeCount: 4, meaningVi: "Cây / Gỗ" },
      { kanjiId: Date.now() + Math.floor(Math.random() * 10000) + 2, character: "金", hanViet: "KIM", onyomi: "キン", kunyomi: "かね", strokeCount: 8, meaningVi: "Vàng / Tiền" },
    ];

    const kanjiQuestionTemplates = [
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「日」 là gì?", correct: "NHẬT", wrong: ["BẢN", "NHÂN", "NGUYỆT"], expl: "Chữ 日 có âm Hán Việt là NHẬT." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「本」 là gì?", correct: "BẢN", wrong: ["NHẬT", "HỎA", "THỦY"], expl: "Chữ 本 có âm Hán Việt là BẢN." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「人」 là gì?", correct: "NHÂN", wrong: ["NHẬT", "NGUYỆT", "MỘC"], expl: "Chữ 人 có âm Hán Việt là NHÂN." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「月」 là gì?", correct: "NGUYỆT", wrong: ["HỎA", "KIM", "THỦY"], expl: "Chữ 月 có âm Hán Việt là NGUYỆT." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「火」 là gì?", correct: "HỎA", wrong: ["THỦY", "MỘC", "THỔ"], expl: "Chữ 火 có âm Hán Việt là HỎA." },
      { prompt: "Luyện gõ Hán tự: Nhập âm Hiragana của chữ 「日本」", type: "TYPING", validAns: "nihon, にほん", expl: "Phiên âm Hiragana là にほん (nihon)." },
      { prompt: "Luyện gõ Hán tự: Nhập âm Hiragana của chữ 「日本人」", type: "TYPING", validAns: "nihonjin, にほんじん", expl: "Phiên âm Hiragana là にほんじん (nihonjin)." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「水」 là gì?", correct: "THỦY", wrong: ["HỎA", "KIM", "THỔ"], expl: "Chữ 水 có âm Hán Việt là THỦY." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「木」 là gì?", correct: "MỘC", wrong: ["KIM", "THỦY", "HỎA"], expl: "Chữ 木 có âm Hán Việt là MỘC." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「金」 là gì?", correct: "KIM", wrong: ["MỘC", "THỦY", "NHẬT"], expl: "Chữ 金 có âm Hán Việt là KIM." },
      { prompt: "Luyện gõ Hán tự: Nhập âm Hiragana của từ 「日曜日」", type: "TYPING", validAns: "nichiyoubi, にちようび", expl: "Phiên âm Hiragana là にちようび (nichiyoubi)." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「土」 là gì?", correct: "THỔ", wrong: ["THỦY", "MỘC", "KIM"], expl: "Chữ 土 có âm Hán Việt là THỔ." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「山」 là gì?", correct: "SƠN", wrong: ["XUYÊN", "ĐIỀN", "THỦY"], expl: "Chữ 山 có âm Hán Việt là SƠN." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「川」 là gì?", correct: "XUYÊN", wrong: ["SƠN", "THỔ", "MỘC"], expl: "Chữ 川 có âm Hán Việt là XUYÊN." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「田」 là gì?", correct: "ĐIỀN", wrong: ["SƠN", "MỤC", "KHẨU"], expl: "Chữ 田 có âm Hán Việt là ĐIỀN." },
      { prompt: "Luyện gõ Hán tự: Nhập âm Hiragana của từ 「富士山」", type: "TYPING", validAns: "fujisan, ふじさん", expl: "Phiên âm Hiragana là ふじさん (fujisan)." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「一」 là gì?", correct: "NHẤT", wrong: ["NHỊ", "TAM", "TỨ"], expl: "Chữ 一 có âm Hán Việt là NHẤT." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「二」 là gì?", correct: "NHỊ", wrong: ["NHẤT", "TAM", "NGŨ"], expl: "Chữ 二 có âm Hán Việt là NHỊ." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「三」 là gì?", correct: "TAM", wrong: ["NHẤT", "NHỊ", "TỨ"], expl: "Chữ 三 có âm Hán Việt là TAM." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「四」 là gì?", correct: "TỨ", wrong: ["TAM", "NGŨ", "LỤC"], expl: "Chữ 四 có âm Hán Việt là TỨ." },
      { prompt: "Luyện gõ Hán tự: Nhập âm Hiragana của chữ 「一人」", type: "TYPING", validAns: "hitori, ひとり", expl: "Phiên âm Hiragana đặc biệt là ひとり (hitori)." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「五」 là gì?", correct: "NGŨ", wrong: ["TỨ", "LỤC", "THẤT"], expl: "Chữ 五 có âm Hán Việt là NGŨ." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「六」 là gì?", correct: "LỤC", wrong: ["NGŨ", "THẤT", "BÁT"], expl: "Chữ 六 có âm Hán Việt là LỤC." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「七」 là gì?", correct: "THẤT", wrong: ["LỤC", "BÁT", "CỬU"], expl: "Chữ 七 có âm Hán Việt là THẤT." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「八」 là gì?", correct: "BÁT", wrong: ["THẤT", "CỬU", "THẬP"], expl: "Chữ 八 có âm Hán Việt là BÁT." },
      { prompt: "Luyện gõ Hán tự: Nhập âm Hiragana của chữ 「二人」", type: "TYPING", validAns: "futari, ふたり", expl: "Phiên âm Hiragana đặc biệt là ふたり (futari)." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「九」 là gì?", correct: "CỬU", wrong: ["BÁT", "THẬP", "NHẤT"], expl: "Chữ 九 có âm Hán Việt là CỬU." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「十」 là gì?", correct: "THẬP", wrong: ["CỬU", "BÁCH", "THIÊN"], expl: "Chữ 十 có âm Hán Việt là THẬP." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「百」 là gì?", correct: "BÁCH", wrong: ["THẬP", "THIÊN", "VẠN"], expl: "Chữ 百 có âm Hán Việt là BÁCH (trăm)." },
      { prompt: "Âm Hán Việt chuẩn xác của chữ Kanji 「千」 là gì?", correct: "THIÊN", wrong: ["BÁCH", "VẠN", "NHẤT"], expl: "Chữ 千 có âm Hán Việt là THIÊN (nghìn)." },
    ];

    const generatedQuestions: QuestionItem[] = kanjiQuestionTemplates.map((tpl, idx) => {
      const isTyping = tpl.type === "TYPING";

      return {
        questionId: Date.now() + idx + 100,
        prompt: tpl.prompt,
        questionType: isTyping ? "TYPING" : "MULTIPLE_CHOICE",
        category: "KANJI",
        validAnswers: isTyping ? tpl.validAns : undefined,
        explanation: tpl.expl,
        options: isTyping ? undefined : [
          { optionText: tpl.correct || "Đúng", isCorrect: true },
          { optionText: tpl.wrong ? tpl.wrong[0] : "Sai 1", isCorrect: false },
          { optionText: tpl.wrong ? tpl.wrong[1] : "Sai 2", isCorrect: false },
          { optionText: tpl.wrong ? tpl.wrong[2] : "Sai 3", isCorrect: false },
        ].sort(() => Math.random() - 0.5),
      };
    });

    setKanjis((prev) => [...prev, ...autoKanjis]);
    setQuestions((prev) => [...generatedQuestions, ...prev]);
    showToast("⚡ Đã tự động sinh 3 Hán tự & 30 ĐỀ THI QUIZ HÁN TỰ KHÁC NHAU 100% bên dưới!");
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/kanji"
            className="p-2.5 bg-white border border-[#EADECF] rounded-2xl hover:bg-[#FAF5F0] text-[#76685F] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#8C7B70]">
              <span>Quản Lý Hán Tự</span>
              <span>/</span>
              <span className="text-amber-700">Chuyên đề #{lessonId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-sans font-black text-[#231917]">
              Biên Tập Hán Tự & Bài Tập Chuyên Đề #{lessonId}
            </h1>
          </div>
        </div>

        <Link
          href="/admin/kanji"
          className="px-4 py-2.5 bg-[#FAF5F0] hover:bg-[#F5EFEA] text-[#56423E] border border-[#EADECF] font-extrabold text-xs rounded-xl cursor-pointer"
        >
          Quay lại Danh Sách Chuyên Đề Kanji
        </Link>
      </div>

      {/* Hero Banner - STRICTLY KANJI ONLY */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-xl">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase">
            ✍️ CHUYÊN MỤC QUẢN LÝ HÁN TỰ KANJI ĐỘC LẬP
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">Hán Tự & Các Dạng Luyện Tập Chuyên Đề #{lessonId}</h2>
          <p className="text-white/90 text-xs sm:text-sm font-medium">
            Quản lý độc lập chữ Kanji, Canvas luyện vẽ nét 3D, gõ âm Hiragana, luyện đọc câu Hán tự, Arcade Game 3D Kanji & Quiz trắc nghiệm.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoGenerate}
          className="px-5 py-3 bg-white text-amber-800 hover:bg-amber-50 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 z-10 cursor-pointer hover:scale-105"
        >
          <Zap className="w-4 h-4 fill-amber-700 text-amber-700" />
          <span>⚡ Sinh Tự Động Kanji</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs font-black flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-emerald-700 font-black cursor-pointer">✕</button>
        </div>
      )}

      {/* ✍️ HDSD GUIDE BANNER FOR KANJI */}
      <div className="bg-gradient-to-r from-amber-50 via-[#FFFDF9] to-amber-50/50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5 border-b border-amber-200/80 pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            ✍️
          </div>
          <h4 className="text-sm font-black text-[#231917]">HƯỚNG DẪN QUẢN LÝ DỮ LIỆU & BÀI TẬP HÁN TỰ KANJI</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <PenTool className="w-3.5 h-3.5" /> 1. Canvas Vẽ Nét 3D
            </span>
            <p className="text-[11px] text-[#76685F]">Luyện vẽ Canvas interactive theo đúng số nét (`strokeCount`).</p>
          </div>
          <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5" /> 2. Gõ Hiragana Kanji
            </span>
            <p className="text-[11px] text-[#76685F]">Tạo bài tập `TYPING` nhập âm Hiragana phản xạ.</p>
          </div>
          <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> 3. Luyện Đọc Câu
            </span>
            <p className="text-[11px] text-[#76685F]">Biên tập các câu ví dụ thực tế chứa Kanji cho học viên luyện đọc.</p>
          </div>
          <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5" /> 4. Arcade Game 3D
            </span>
            <p className="text-[11px] text-[#76685F]">Game ghép thẻ Kanji với âm Hán Việt tương ứng ở Chế Độ Đêm.</p>
          </div>
          <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 5. Quiz Hán Tự
            </span>
            <p className="text-[11px] text-[#76685F]">Trắc nghiệm Âm Hán Việt, Onyomi, Kunyomi chuẩn thi JLPT.</p>
          </div>
        </div>
      </div>

      {/* SECTION 1: KANJI CHARACTERS MANAGEMENT */}
      <div className="bg-white border-2 border-[#EADECF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#EADECF] pb-4">
          <div>
            <h3 className="text-lg font-sans font-black text-[#231917] flex items-center gap-2">
              <PenTool className="w-5 h-5 text-amber-600" />
              <span>1. Danh Sách Chữ Hán Kanji ({kanjis.length} chữ)</span>
            </h3>
            <p className="text-xs text-[#76685F] font-medium">Danh sách Chữ Hán phục vụ Canvas luyện vẽ 3D & Arcade Game 3D Kanji.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowKanjiModal(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> + Thêm Kanji Mới
          </button>
        </div>

        {/* Kanji Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kanjis.map((k, idx) => (
            <div key={k.kanjiId} className="p-4 bg-[#FAF7F2] border border-[#EADECF] hover:border-amber-600 rounded-2xl space-y-2 transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
                  #{idx + 1} • {k.strokeCount} Nét
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteKanji(k.kanjiId)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                  title="Xóa Kanji"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white font-black text-2xl flex items-center justify-center shadow-xs">
                  {k.character}
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-900">Hán Việt: {k.hanViet}</h4>
                  <p className="text-xs font-bold text-[#231917]">{k.meaningVi}</p>
                  <p className="text-[11px] text-[#76685F]">On: {k.onyomi || "-"} | Kun: {k.kunyomi || "-"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: KANJI READING SENTENCES */}
      <div className="bg-white border-2 border-[#EADECF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#EADECF] pb-4">
          <div>
            <h3 className="text-lg font-sans font-black text-[#231917] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>2. Bài Tập Luyện Đọc Câu Hán Tự ({readingSentences.length} câu)</span>
            </h3>
            <p className="text-xs text-[#76685F] font-medium">Các câu đọc thực tế luyện phản xạ nhận diện chữ Hán ghép trong ngữ cảnh.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowSentenceModal(true)}
            className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> + Thêm Câu Đọc Hán Tự
          </button>
        </div>

        {/* Sentences List */}
        <div className="space-y-3">
          {readingSentences.map((s, idx) => (
            <div key={s.sentenceId} className="p-4 bg-[#FAF7F2] border border-[#EADECF] rounded-2xl flex justify-between items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                  CÂU ĐỌC #{idx + 1}
                </span>
                <h4 className="text-base font-black text-[#231917]">{s.japaneseText}</h4>
                <p className="text-xs font-bold text-amber-800">Cách đọc: {s.readingKana}</p>
                <p className="text-xs text-[#76685F]">💡 Nghĩa: {s.meaningVi}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteSentence(s.sentenceId)}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: KANJI EXERCISES & QUIZ MANAGEMENT */}
      <div className="bg-white border-2 border-[#EADECF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#EADECF] pb-4">
          <div>
            <h3 className="text-lg font-sans font-black text-[#231917] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>3. Bài Tập & Quiz Hán Tự ({questions.length} câu)</span>
            </h3>
            <p className="text-xs text-[#76685F] font-medium">Kho câu hỏi trắc nghiệm âm Hán Việt, Onyomi, Kunyomi dành riêng cho Kanji.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowQModal(true)}
            className="px-4 py-2.5 bg-[#8B6F5A] hover:bg-[#775E4B] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> + Thêm Quiz Kanji
          </button>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.questionId || idx} className="p-5 bg-[#FAF7F2] border border-[#EADECF] rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black bg-amber-600 text-white px-2.5 py-0.5 rounded-md">
                  CÂU HỎI KANJI #{idx + 1} • {q.questionType}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.questionId)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-sm font-black text-[#231917]">{q.prompt}</h4>

              {q.questionType === "TYPING" ? (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs">
                  <strong className="text-purple-900">Đáp án gõ hợp lệ:</strong>{" "}
                  <span className="font-mono text-purple-700 font-bold">{q.validAnswers}</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options?.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl border font-bold ${
                        opt.isCorrect
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : "bg-white border-[#EADECF] text-[#76685F]"
                      }`}
                    >
                      {opt.optionText} {opt.isCorrect && "✓ (Đáp án đúng)"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD KANJI */}
      {showKanjiModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border-2 border-[#EADECF] rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#EADECF] pb-3">
              <h3 className="text-base font-black text-[#231917]">Thêm Chữ Hán Kanji Mới</h3>
              <button onClick={() => setShowKanjiModal(false)} className="p-1.5 text-[#76685F] hover:text-[#C65D4B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddKanji} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Chữ Kanji *</label>
                  <input
                    type="text"
                    value={kChar}
                    onChange={(e) => setKChar(e.target.value)}
                    required
                    placeholder="VD: 日"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold text-center text-lg text-amber-900"
                  />
                </div>
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Âm Hán Việt *</label>
                  <input
                    type="text"
                    value={kHanViet}
                    onChange={(e) => setKHanViet(e.target.value)}
                    required
                    placeholder="VD: NHẬT"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Âm Onyomi (Âm On)</label>
                  <input
                    type="text"
                    value={kOnyomi}
                    onChange={(e) => setKOnyomi(e.target.value)}
                    placeholder="VD: ニチ"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Âm Kunyomi (Âm Kun)</label>
                  <input
                    type="text"
                    value={kKunyomi}
                    onChange={(e) => setKKunyomi(e.target.value)}
                    placeholder="VD: ひ"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Số nét vẽ (Strokes)</label>
                  <input
                    type="number"
                    value={kStrokes}
                    onChange={(e) => setKStrokes(Number(e.target.value))}
                    min={1}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Dịch nghĩa tiếng Việt</label>
                  <input
                    type="text"
                    value={kMeaning}
                    onChange={(e) => setKMeaning(e.target.value)}
                    placeholder="VD: Mặt trời / Ngày"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EADECF]">
                <button
                  type="button"
                  onClick={() => setShowKanjiModal(false)}
                  className="px-4 py-2 bg-[#FAF5F0] text-[#76685F] font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 text-white font-black rounded-xl shadow-xs hover:bg-amber-700"
                >
                  Lưu Chữ Kanji 🛡️
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD READING SENTENCE */}
      {showSentenceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border-2 border-[#EADECF] rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#EADECF] pb-3">
              <h3 className="text-base font-black text-[#231917]">Thêm Câu Luyện Đọc Hán Tự</h3>
              <button onClick={() => setShowSentenceModal(false)} className="p-1.5 text-[#76685F] hover:text-[#C65D4B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSentence} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Câu tiếng Nhật (chứa Kanji) *</label>
                <input
                  type="text"
                  value={sJp}
                  onChange={(e) => setSJp(e.target.value)}
                  required
                  placeholder="VD: 日曜日に行きます。"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Phiên âm Hiragana (Furigana)</label>
                <input
                  type="text"
                  value={sKana}
                  onChange={(e) => setSKana(e.target.value)}
                  placeholder="VD: にちようび に いき ます。"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Nghĩa Tiếng Việt *</label>
                <input
                  type="text"
                  value={sVi}
                  onChange={(e) => setSVi(e.target.value)}
                  required
                  placeholder="VD: Tôi sẽ đi vào Chủ nhật."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EADECF]">
                <button
                  type="button"
                  onClick={() => setShowSentenceModal(false)}
                  className="px-4 py-2 bg-[#FAF5F0] text-[#76685F] font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-700 text-white font-black rounded-xl shadow-xs hover:bg-amber-800"
                >
                  Lưu Câu Đọc 🛡️
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD KANJI EXERCISE */}
      {showQModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border-2 border-[#EADECF] rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#EADECF] pb-3">
              <h3 className="text-base font-black text-[#231917]">Thêm Bài Tập Quiz Hán Tự</h3>
              <button onClick={() => setShowQModal(false)} className="p-1.5 text-[#76685F] hover:text-[#C65D4B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Dạng bài tập *</label>
                <select
                  value={qType}
                  onChange={(e) => setQType(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold cursor-pointer"
                >
                  <option value="MULTIPLE_CHOICE">Trắc nghiệm Hán tự (Âm Hán Việt / Onyomi / Kunyomi)</option>
                  <option value="TYPING">Luyện gõ Hiragana Hán tự (Typing)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Nội dung đề bài (Prompt) *</label>
                <input
                  type="text"
                  value={qPrompt}
                  onChange={(e) => setQPrompt(e.target.value)}
                  required
                  placeholder="VD: Âm Hán Việt của chữ 「日」 là gì?"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                />
              </div>

              {qType === "TYPING" ? (
                <div>
                  <label className="block text-purple-900 font-bold mb-1">Đáp án gõ Hiragana hợp lệ (phân cách bởi dấu phẩy)</label>
                  <input
                    type="text"
                    value={qValidAns}
                    onChange={(e) => setQValidAns(e.target.value)}
                    placeholder="VD: nihon, にほん"
                    className="w-full p-2.5 bg-purple-50 border border-purple-300 rounded-xl font-mono font-bold"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px]">4 Phương án & Chọn 1 đáp án đúng</label>
                  {[
                    { val: qOptA, set: setQOptA, label: "A" },
                    { val: qOptB, set: setQOptB, label: "B" },
                    { val: qOptC, set: setQOptC, label: "C" },
                    { val: qOptD, set: setQOptD, label: "D" },
                  ].map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={qCorrect === idx}
                        onChange={() => setQCorrect(idx)}
                        className="w-4 h-4 accent-emerald-600 cursor-pointer"
                      />
                      <span className="w-5 font-black text-[#8C7B70]">{opt.label}.</span>
                      <input
                        type="text"
                        value={opt.val}
                        onChange={(e) => opt.set(e.target.value)}
                        placeholder={`Phương án ${opt.label}...`}
                        className="flex-1 p-2 bg-[#FAF7F2] border border-[#EADECF] rounded-xl text-xs font-bold"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-[#8C7B70] font-black uppercase text-[10px] mb-1">Lời giải thích</label>
                <input
                  type="text"
                  value={qExpl}
                  onChange={(e) => setQExpl(e.target.value)}
                  placeholder="Giải thích âm Hán Việt / Onyomi / Kunyomi..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#EADECF] rounded-xl font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EADECF]">
                <button
                  type="button"
                  onClick={() => setShowQModal(false)}
                  className="px-4 py-2 bg-[#FAF5F0] text-[#76685F] font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8B6F5A] text-white font-black rounded-xl shadow-xs hover:bg-[#775E4B]"
                >
                  Lưu Bài Tập Kanji 🛡️
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
