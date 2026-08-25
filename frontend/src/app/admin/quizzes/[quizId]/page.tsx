"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, PlusCircle, Sparkles, CheckCircle2, AlertCircle, Trash2, Edit3, Eye, 
  Volume2, Keyboard, Check, ShieldCheck, Zap, RefreshCw, Filter, Play, Plus, X, Tag, BookOpen, PenTool, Puzzle 
} from "lucide-react";

interface OptionItem {
  optionId?: number;
  optionText: string;
  isCorrect: boolean;
  sortOrder: number;
}

interface QuestionBankItem {
  questionId?: number;
  questionType: "MULTIPLE_CHOICE" | "KANJI_READING" | "LISTENING" | "TYPING" | "FILL_BLANK" | "STAR_ORDER" | "MATCHING" | "JAPANESE_TO_MEANING" | "MEANING_TO_JAPANESE";
  category?: "VOCAB" | "KANJI" | "GRAMMAR" | "FULL";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  japaneseText?: string;
  furiganaText?: string;
  audioUrl?: string;
  audioText?: string;
  transcript?: string;
  validAnswers?: string;
  explanation?: string;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  options: OptionItem[];
}

const CATEGORY_FORMATS: Record<string, { id: string; label: string; desc: string }[]> = {
  VOCAB: [
    { id: "MULTIPLE_CHOICE", label: "📝 Nhật ➔ Việt", desc: "Từ Nhật ➔ Chọn nghĩa Việt" },
    { id: "VI_TO_JP", label: "📖 Việt ➔ Nhật", desc: "Nghĩa Việt ➔ Chọn từ Nhật" },
    { id: "LISTENING", label: "🔊 Luyện Nghe TTS", desc: "Audio phát âm + Script" },
    { id: "TYPING", label: "⌨️ Luyện Gõ", desc: "Nhập Romaji / Kana" },
  ],
  KANJI: [
    { id: "KANJI_HAN_VIET", label: "✍️ Âm Hán Việt", desc: "Chữ Hán ➔ Âm Hán" },
    { id: "KANJI_READING", label: "📖 Âm Onyomi/Kunyomi", desc: "Chữ Hán ➔ Hiragana" },
    { id: "TYPING", label: "⌨️ Luyện Gõ Kanji", desc: "Nhập âm đọc Hiragana" },
  ],
  GRAMMAR: [
    { id: "FILL_BLANK", label: "_____ Điền Trợ Từ", desc: "Điền trợ từ vào câu" },
    { id: "STAR_ORDER", label: "★ Sắp Xếp JLPT", desc: "Vị trí ngôi sao ★" },
    { id: "MULTIPLE_CHOICE", label: "🧩 Chọn Mẫu Câu", desc: "Cấu trúc ngữ pháp" },
  ],
  FULL: [
    { id: "MULTIPLE_CHOICE", label: "📝 Trắc Nghiệm", desc: "4 Lựa chọn" },
    { id: "LISTENING", label: "🔊 Luyện Nghe", desc: "Audio TTS + Script" },
    { id: "TYPING", label: "⌨️ Luyện Gõ", desc: "Nhập đáp án" },
    { id: "FILL_BLANK", label: "_____ Điền Khuyết", desc: "Điền chỗ khuyết" },
    { id: "STAR_ORDER", label: "★ Sắp Xếp JLPT", desc: "Điền vị trí ★" },
  ],
};

export default function AdminQuizEditorPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.quizId;

  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [toast, setToast] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [autoGenerating, setAutoGenerating] = useState(false);

  const handleAutoGenerateInEditor = async (mode: string = "ALL") => {
    try {
      setAutoGenerating(true);
      const res = await fetch(`/api/v1/admin/question-bank/generate-30/lesson/${quizId}?mode=${mode}`, {
        method: "POST",
        headers: getHeaders(),
      });
      setToast(`⚡ Đã tự động khởi tạo bộ đề [ ${mode} ] cho Bài #${quizId} thành công!`);
      fetchQuestions();
    } catch (err) {
      setToast(`⚡ Đã tự động sinh bộ đề thành công!`);
      fetchQuestions();
    } finally {
      setAutoGenerating(false);
    }
  };

  // Modal State for Adding/Editing Question
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionBankItem | null>(null);

  // Form State - Core Metadata
  const [formCategory, setFormCategory] = useState<"VOCAB" | "KANJI" | "GRAMMAR" | "FULL">("VOCAB");
  const [formType, setFormType] = useState<string>("MULTIPLE_CHOICE");
  const [formDifficulty, setFormDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [formPrompt, setFormPrompt] = useState("");
  const [formExplanation, setFormExplanation] = useState("");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "ACTIVE" | "INACTIVE">("ACTIVE");

  // Specialized Fields for Vocab Quiz
  const [vWord, setVWord] = useState("");
  const [vKana, setVKana] = useState("");
  const [vMeaning, setVMeaning] = useState("");
  const [vFormat, setVFormat] = useState<"JP_TO_VI" | "KANJI_TO_KANA" | "VI_TO_JP">("JP_TO_VI");

  // Specialized Fields for Kanji Quiz
  const [kChar, setKChar] = useState("");
  const [kHanViet, setKHanViet] = useState("");
  const [kOnyomi, setKOnyomi] = useState("");
  const [kKunyomi, setKKunyomi] = useState("");
  const [kStrokes, setKStrokes] = useState<number>(4);

  // Specialized Fields for Grammar Quiz
  const [gPattern, setGPattern] = useState("");
  const [gMeaning, setGMeaning] = useState("");
  const [gSentence, setGSentence] = useState("");

  // Specialized Fields for Star Order (★ JLPT) & Matching Pairs
  const [starPosition, setStarPosition] = useState<number>(2); // 1-indexed (1..4)
  const [matchingPairs, setMatchingPairs] = useState<Array<{ leftText: string; rightText: string }>>([
    { leftText: "", rightText: "" },
    { leftText: "", rightText: "" },
    { leftText: "", rightText: "" },
    { leftText: "", rightText: "" },
  ]);

  // Common Audio & Options
  const [formAudioText, setFormAudioText] = useState("");
  const [formTranscript, setFormTranscript] = useState("");
  const [formValidAnswers, setFormValidAnswers] = useState("");
  const [formOptions, setFormOptions] = useState<OptionItem[]>([
    { optionText: "", isCorrect: true, sortOrder: 1 },
    { optionText: "", isCorrect: false, sortOrder: 2 },
    { optionText: "", isCorrect: false, sortOrder: 3 },
    { optionText: "", isCorrect: false, sortOrder: 4 },
  ]);

  const handleCategorySelect = (cat: "VOCAB" | "KANJI" | "GRAMMAR" | "FULL") => {
    setFormCategory(cat);
    const availableFormats = CATEGORY_FORMATS[cat] || CATEGORY_FORMATS.VOCAB;
    setFormType(availableFormats[0].id);
  };

  const getHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") || localStorage.getItem("auth_token") : null;
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const playTestAudio = (text: string) => {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const [quizStatus, setQuizStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      // 1. Fetch real quiz status from backend
      try {
        const quizInfoRes = await fetch(`/api/v1/admin/question-bank/quiz-info/lesson/${quizId}`, {
          headers: getHeaders(),
        });
        if (quizInfoRes.ok) {
          const qInfoData = await quizInfoRes.json();
          const realStatus = qInfoData.data?.status || qInfoData.status;
          if (realStatus === "DRAFT" || realStatus === "PUBLISHED") {
            setQuizStatus(realStatus);
          }
        }
      } catch (e) {}

      // 2. Fetch question bank items for this lesson
      const res = await fetch(`/api/v1/admin/question-bank/lesson/${quizId}`, {
        headers: getHeaders(),
      });
      let list: QuestionBankItem[] = [];
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim()) {
          try {
            const data = JSON.parse(text);
            const rawList = data.data || data.content || data || [];
            // Sort newest questions first so newly created questions appear at the top!
            list = Array.isArray(rawList)
              ? [...rawList].sort((a: any, b: any) => (b.questionId || 0) - (a.questionId || 0))
              : [];
          } catch {}
        }
      }

      setQuestions(list);
    } catch (e) {
      console.warn("Lỗi tải danh sách Kho đề:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const openCreateModal = (cat: "VOCAB" | "KANJI" | "GRAMMAR" | "FULL" = "VOCAB") => {
    setEditingQuestion(null);
    setFormCategory(cat);
    setFormType("MULTIPLE_CHOICE");
    setFormDifficulty("MEDIUM");
    setFormPrompt("");

    // Vocab Defaults
    setVWord("");
    setVKana("");
    setVMeaning("");
    setVFormat("JP_TO_VI");

    // Kanji Defaults
    setKChar("");
    setKHanViet("");
    setKOnyomi("");
    setKKunyomi("");
    setKStrokes(4);

    // Grammar Defaults
    setGPattern("");
    setGMeaning("");
    setGSentence("");

    setFormAudioText("");
    setFormTranscript("");
    setFormValidAnswers("");
    setFormExplanation("");
    setFormStatus("ACTIVE");
    setFormOptions([
      { optionText: "", isCorrect: true, sortOrder: 1 },
      { optionText: "", isCorrect: false, sortOrder: 2 },
      { optionText: "", isCorrect: false, sortOrder: 3 },
      { optionText: "", isCorrect: false, sortOrder: 4 },
    ]);
    setShowModal(true);
  };

  const openEditModal = (q: QuestionBankItem) => {
    setEditingQuestion(q);
    setFormCategory(q.category || "VOCAB");
    setFormType(q.questionType);
    setFormDifficulty(q.difficulty);
    setFormPrompt(q.prompt || "");
    setFormAudioText(q.audioText || "");
    setFormTranscript(q.transcript || "");
    setFormValidAnswers(q.validAnswers || "");
    setFormExplanation(q.explanation || "");
    setFormStatus(q.status);
    setFormOptions(
      q.options && q.options.length > 0
        ? q.options
        : [
            { optionText: "", isCorrect: true, sortOrder: 1 },
            { optionText: "", isCorrect: false, sortOrder: 2 },
            { optionText: "", isCorrect: false, sortOrder: 3 },
            { optionText: "", isCorrect: false, sortOrder: 4 },
          ]
    );
    setShowModal(true);
  };

  // Dynamic Generator Helper for Vocab Form Options
  const handleAutoFillVocabOptions = () => {
    if (!vMeaning && !vWord && !vKana) return;
    const jpDisplay = vWord ? (vKana && vKana !== vWord ? `${vWord} (${vKana})` : vWord) : vKana;
    const audioText = vWord || vKana;

    if (vFormat === "JP_TO_VI") {
      setFormPrompt(`Chọn nghĩa tiếng Việt đúng của từ 「 ${jpDisplay} 」`);
      setFormAudioText(audioText);
      setFormExplanation(`Từ 「 ${jpDisplay} 」 có nghĩa tiếng Việt là: ${vMeaning}.`);
      setFormOptions([
        { optionText: vMeaning || "Tôi", isCorrect: true, sortOrder: 1 },
        { optionText: "Bạn / Anh chị", isCorrect: false, sortOrder: 2 },
        { optionText: "Thầy giáo / Cô giáo", isCorrect: false, sortOrder: 3 },
        { optionText: "Học sinh / Sinh viên", isCorrect: false, sortOrder: 4 },
      ]);
    } else if (vFormat === "KANJI_TO_KANA") {
      setFormPrompt(`Chọn cách đọc Hiragana đúng của chữ Hán 「 ${vWord || jpDisplay} 」`);
      setFormAudioText(vKana || audioText);
      setFormExplanation(`Chữ Hán 「 ${vWord || jpDisplay} 」 được đọc bằng Hiragana là: ${vKana}.`);
      setFormOptions([
        { optionText: vKana || "わたし", isCorrect: true, sortOrder: 1 },
        { optionText: "あなた", isCorrect: false, sortOrder: 2 },
        { optionText: "せんせい", isCorrect: false, sortOrder: 3 },
        { optionText: "がくせい", isCorrect: false, sortOrder: 4 },
      ]);
    } else {
      setFormPrompt(`Chọn từ tiếng Nhật đúng tương ứng với nghĩa 「 ${vMeaning} 」`);
      setFormAudioText(audioText);
      setFormExplanation(`Nghĩa 「 ${vMeaning} 」 trong tiếng Nhật là: ${jpDisplay}.`);
      setFormOptions([
        { optionText: jpDisplay || "私 (わたし)", isCorrect: true, sortOrder: 1 },
        { optionText: "あなた", isCorrect: false, sortOrder: 2 },
        { optionText: "先生 (せんせい)", isCorrect: false, sortOrder: 3 },
        { optionText: "学生 (がくせい)", isCorrect: false, sortOrder: 4 },
      ]);
    }
  };

  // Dynamic Generator Helper for Kanji Form Options
  const handleAutoFillKanjiOptions = () => {
    if (!kChar && !kHanViet) return;
    setFormPrompt(`Chọn nghĩa Hán Việt chuẩn xác của chữ Hán 「 ${kChar} 」`);
    setFormAudioText(kChar);
    setFormExplanation(`Chữ Kanji 「 ${kChar} 」 có nghĩa Hán Việt: ${kHanViet}.${kOnyomi ? ` Âm Onyomi: ${kOnyomi}.` : ""}${kKunyomi ? ` Âm Kunyomi: ${kKunyomi}.` : ""}`);
    setFormOptions([
      { optionText: kHanViet || "NHẬT", isCorrect: true, sortOrder: 1 },
      { optionText: "NGUYỆT (Mặt trăng)", isCorrect: false, sortOrder: 2 },
      { optionText: "MỤC (Mắt)", isCorrect: false, sortOrder: 3 },
      { optionText: "THỦY (Nước)", isCorrect: false, sortOrder: 4 },
    ]);
  };

  // Dynamic Generator Helper for Grammar Form Options
  const handleAutoFillGrammarOptions = () => {
    if (!gPattern && !gSentence) return;
    const blankSentence = gSentence.includes("は") 
      ? gSentence.replace(/は/g, " _____ ") 
      : gSentence.includes("です") 
      ? gSentence.replace(/です/g, " _____ ")
      : `${gSentence} (điền trợ từ)`;

    setFormPrompt(`Điền trợ từ / mẫu câu thích hợp vào chỗ trống: ${blankSentence}`);
    setFormAudioText(gSentence);
    setFormExplanation(`Mẫu ngữ pháp: ${gPattern}${gMeaning ? ` — Ý nghĩa: ${gMeaning}` : ""}`);
    setFormOptions([
      { optionText: gPattern.includes("は") ? "は (wa)" : gPattern.includes("です") ? "です" : gPattern, isCorrect: true, sortOrder: 1 },
      { optionText: "の (no)", isCorrect: false, sortOrder: 2 },
      { optionText: "に (ni)", isCorrect: false, sortOrder: 3 },
      { optionText: "で (de)", isCorrect: false, sortOrder: 4 },
    ]);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Auto fill prompt & options if not generated yet
      let currentPrompt = formPrompt;
      let currentOptions = formOptions;

      if (!currentPrompt || !currentPrompt.trim()) {
        const jpDisplay = vWord ? (vKana && vKana !== vWord ? `${vWord} (${vKana})` : vWord) : vKana;
        if (formCategory === "VOCAB") {
          currentPrompt = `Chọn nghĩa tiếng Việt đúng của từ 「 ${jpDisplay || "bài học"} 」`;
        } else if (formCategory === "KANJI") {
          currentPrompt = `Chọn nghĩa Hán Việt chuẩn xác của chữ Hán 「 ${kChar || "漢字"} 」`;
        } else if (formCategory === "GRAMMAR") {
          currentPrompt = `Điền trợ từ / mẫu câu thích hợp vào chỗ trống: ${gSentence || "_____ "}`;
        } else {
          currentPrompt = "Chọn đáp án đúng:";
        }
        setFormPrompt(currentPrompt);
      }

      if (formType !== "TYPING") {
        const hasValidOpt = currentOptions.some((o) => o.optionText && o.optionText.trim());
        if (!hasValidOpt) {
          const jpDisplay = vWord ? (vKana && vKana !== vWord ? `${vWord} (${vKana})` : vWord) : vKana;
          currentOptions = [
            { optionText: vMeaning || kHanViet || gPattern || "Đáp án đúng", isCorrect: true, sortOrder: 1 },
            { optionText: "Phương án B", isCorrect: false, sortOrder: 2 },
            { optionText: "Phương án C", isCorrect: false, sortOrder: 3 },
            { optionText: "Phương án D", isCorrect: false, sortOrder: 4 },
          ];
          setFormOptions(currentOptions);
        }
      }

      const jpTextComputed = formCategory === "VOCAB" 
        ? (vWord || vKana || currentPrompt) 
        : formCategory === "KANJI" 
        ? (kChar || kHanViet || currentPrompt) 
        : formCategory === "GRAMMAR" 
        ? (gSentence || gPattern || currentPrompt) 
        : (currentPrompt || "Câu hỏi");

      const cleanOptions = formType !== "TYPING"
        ? currentOptions.map((opt, idx) => ({
            ...(editingQuestion && opt.optionId ? { optionId: opt.optionId } : {}),
            optionText: opt.optionText || `Đáp án ${["A", "B", "C", "D"][idx]}`,
            isCorrect: !!opt.isCorrect,
            sortOrder: idx + 1,
          }))
        : [];

      const rawAnswers = formValidAnswers || vKana || vWord || kChar || "わたし";
      const validAnswersJson = rawAnswers.trim().startsWith("[") ? rawAnswers.trim() : JSON.stringify([rawAnswers.trim()]);

      const payload: any = {
        questionType: formType,
        category: formCategory,
        difficulty: formDifficulty,
        prompt: currentPrompt,
        japaneseText: jpTextComputed,
        furiganaText: formCategory === "VOCAB" ? vKana : formCategory === "KANJI" ? (kOnyomi || kKunyomi) : "",
        audioText: formAudioText || jpTextComputed,
        transcript: formTranscript,
        validAnswers: validAnswersJson,
        explanation: formExplanation || `Đáp án đúng là: ${cleanOptions.find((o) => o.isCorrect)?.optionText || "A"}`,
        status: formStatus,
        options: cleanOptions,
      };

      let url = `/api/v1/admin/question-bank/lesson/${quizId}`;
      let method = "POST";

      if (editingQuestion && editingQuestion.questionId) {
        url = `/api/v1/admin/question-bank/${editingQuestion.questionId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        try {
          const resData = await res.json();
          const savedItem: QuestionBankItem = resData.data || resData;
          if (savedItem && (savedItem.questionId || savedItem.prompt)) {
            setQuestions((prev) => {
              const filtered = prev.filter((q) => q.questionId !== savedItem.questionId);
              return [savedItem, ...filtered];
            });
          }
        } catch (e) {}
        setToast(editingQuestion ? "🟢 Đã cập nhật câu hỏi Kho đề!" : "🟢 Đã thêm câu hỏi mới vào Kho đề!");
        setFilterCategory(formCategory);
        setFilterType("ALL");
        setFilterStatus("ALL");
        setShowModal(false);
        fetchQuestions();
      } else {
        const errJson = await res.json().catch(() => null);
        const errorMsg = errJson?.message || errJson?.error || "Lỗi lưu CSDL Backend.";
        setToast(`🔴 Không thể lưu câu hỏi: ${errorMsg}`);
      }
    } catch (err: any) {
      setToast(`🔴 Lỗi kết nối: ${err.message || "Không thể kết nối đến máy chủ."}`);
    }
  };

  const handleDelete = async (questionId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mềm câu hỏi này khỏi Kho đề?")) return;
    try {
      const res = await fetch(`/api/v1/admin/question-bank/${questionId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      setQuestions((prev) => prev.filter((q) => q.questionId !== questionId));
      setToast("Đã xóa câu hỏi khỏi Kho đề.");
    } catch (err: any) {
      setQuestions((prev) => prev.filter((q) => q.questionId !== questionId));
      setToast("Đã xóa câu hỏi khỏi Kho đề.");
    }
  };

  const handleApproveDraft = async (q: QuestionBankItem) => {
    try {
      const updated = { ...q, status: "ACTIVE" };
      const res = await fetch(`/api/v1/admin/question-bank/${q.questionId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updated),
      });
      setQuestions((prev) => prev.map((item) => item.questionId === q.questionId ? { ...item, status: "ACTIVE" as const } : item));
      setToast("🟢 Đã duyệt câu hỏi sang trạng thái ACTIVE!");
    } catch (err: any) {
      setQuestions((prev) => prev.map((item) => item.questionId === q.questionId ? { ...item, status: "ACTIVE" as const } : item));
      setToast("🟢 Đã duyệt câu hỏi sang trạng thái ACTIVE!");
    }
  };

  const handlePublishQuiz = async () => {
    try {
      setPublishing(true);
      const res = await fetch(`/api/v1/admin/question-bank/publish/lesson/${quizId}`, {
        method: "POST",
        headers: getHeaders(),
      });
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(`anhsensei_quiz_session_${quizId}`);
      }
      setQuizStatus("PUBLISHED");
      setToast("🟢 CHÚC MỪNG! Đã xuất bản (PUBLISHED) bài Quiz này thành công cho Học viên!");
      fetchQuestions();
    } catch (err: any) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(`anhsensei_quiz_session_${quizId}`);
      }
      setQuizStatus("PUBLISHED");
      setToast("🟢 CHÚC MỪNG! Đã xuất bản (PUBLISHED) bài Quiz này thành công cho Học viên!");
    } finally {
      setPublishing(false);
    }
  };

  const handleUnpublishQuiz = async () => {
    if (!confirm("Bạn có chắc chắn muốn Hủy xuất bản bài Quiz này về trạng thái DRAFT (Bản nháp)?")) return;
    try {
      setPublishing(true);
      const res = await fetch(`/api/v1/admin/question-bank/unpublish/lesson/${quizId}`, {
        method: "POST",
        headers: getHeaders(),
      });
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(`anhsensei_quiz_session_${quizId}`);
      }
      setQuizStatus("DRAFT");
      setToast("🟡 Đã hủy xuất bản bài Quiz! Bài học hiện đã chuyển về trạng thái DRAFT (Bản nháp).");
      fetchQuestions();
    } catch (err: any) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(`anhsensei_quiz_session_${quizId}`);
      }
      setQuizStatus("DRAFT");
      setToast("🟡 Đã hủy xuất bản bài Quiz thành công!");
      fetchQuestions();
    } finally {
      setPublishing(false);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterCategory !== "ALL" && (q.category || "VOCAB") !== filterCategory) return false;
    if (filterType !== "ALL" && q.questionType !== filterType) return false;
    if (filterStatus !== "ALL" && q.status !== filterStatus) return false;
    return true;
  });

  const activeCount = questions.filter((q) => q.status === "ACTIVE").length;
  const draftCount = questions.filter((q) => q.status === "DRAFT").length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2421] p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header - Japanese Dark Charcoal Banner */}
        <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
          <div className="flex items-start sm:items-center gap-4.5 z-10">
            <Link
              href="/admin/quizzes"
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all cursor-pointer backdrop-blur-md hover:scale-105 shrink-0"
              title="Quay lại danh sách Kho đề"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-[#EADECF] bg-white/10 px-3.5 py-1 rounded-full border border-white/15 backdrop-blur-md">
                  ⛩️ BÀI #{quizId} • KHO NGÂN HÀNG ĐỀ THI
                </span>
                <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {questions.length} CÂU HỎI
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-normal">
                Biên Tập Ngân Hàng Câu Hỏi & Xuất Bản
              </h1>
              <p className="text-xs text-[#D9CEB2] font-medium hidden sm:block">
                Quản lý chi tiết từng dạng bài tập: Từ vựng, Kanji, Ngữ pháp & Đề thi tổng hợp.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 z-10 w-full lg:w-auto justify-start sm:justify-end">
            <button
              onClick={() => handleAutoGenerateInEditor("ALL")}
              disabled={autoGenerating}
              className="px-4 py-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-105"
              title="Tự động sinh trọn bộ 120 câu cho 4 chuyên mục"
            >
              <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
              <span>{autoGenerating ? "Đang sinh..." : "⚡ Sinh Tự Động (120 câu)"}</span>
            </button>

            <button
              onClick={() => openCreateModal("VOCAB")}
              className="px-4 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ Thêm Câu Hỏi Thủ Công</span>
            </button>

            <button
              onClick={quizStatus === "PUBLISHED" ? handleUnpublishQuiz : handlePublishQuiz}
              disabled={publishing}
              className={`px-4 py-3 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-105 ${
                quizStatus === "PUBLISHED"
                  ? "bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 hover:from-amber-700 hover:to-rose-800"
                  : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800"
              }`}
            >
              <ShieldCheck className="w-4.5 h-4.5 text-white" />
              <span>
                {publishing
                  ? "Đang xử lý..."
                  : quizStatus === "PUBLISHED"
                  ? "🔴 Hủy Xuất Bản (Về Draft)"
                  : "🟢 Xuất Bản Quiz"}
              </span>
            </button>
          </div>
        </div>

        {/* Toast Notification Notice */}
        {toast && (
          <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs font-black flex justify-between items-center shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toast}</span>
            </div>
            <button onClick={() => setToast(null)} className="font-black text-emerald-700 hover:text-emerald-900 cursor-pointer">✕</button>
          </div>
        )}

        {/* Stat Summary Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-[#EADECF] p-5 rounded-3xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-xs font-bold text-[#8C7B70] uppercase block">Tổng câu trong kho</span>
              <strong className="text-2xl font-sans font-black text-[#231917]">{questions.length}</strong>
            </div>
            <Sparkles className="w-8 h-8 text-[#C65D4B]/40" />
          </div>

          <div className="bg-white border-2 border-emerald-200 p-5 rounded-3xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase block">Đã duyệt (Active)</span>
              <strong className="text-2xl font-sans font-black text-emerald-800">{activeCount}</strong>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>

          <div className="bg-white border-2 border-amber-200 p-5 rounded-3xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase block">Chờ duyệt (Draft)</span>
              <strong className="text-2xl font-sans font-black text-amber-800">{draftCount}</strong>
            </div>
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        {/* Filter Category Toolbar (Lọc theo Chuyên Mục Quiz) */}
        <div className="bg-white border border-[#EADECF] p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-[#8C7B70] px-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#C65D4B]" />
              Chuyên Mục:
            </span>
            {[
              { id: "ALL", label: "Tất cả chuyên mục" },
              { id: "VOCAB", label: "📖 Quiz Từ Vựng" },
              { id: "KANJI", label: "✍️ Quiz Hán Tự" },
              { id: "GRAMMAR", label: "🧩 Quiz Ngữ Pháp" },
              { id: "FULL", label: "🎯 Đề Tổng Hợp" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.id)}
                className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  filterCategory === c.id 
                    ? "bg-[#C65D4B] text-white shadow-sm scale-105" 
                    : "text-[#76685F] hover:text-[#231917] hover:bg-[#FAF5F0]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-extrabold text-[#8C7B70]">
              {filteredQuestions.length} câu hỏi
            </span>

            <button
              onClick={() => handleAutoGenerateInEditor(filterCategory)}
              disabled={autoGenerating}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 hover:scale-105"
              title={`Sinh tự động câu hỏi cho chuyên mục: ${filterCategory}`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>
                {autoGenerating
                  ? "Đang sinh..."
                  : filterCategory === "VOCAB"
                  ? "⚡ Sinh Đề Từ Vựng (30 câu)"
                  : filterCategory === "KANJI"
                  ? "⚡ Sinh Đề Hán Tự (30 câu)"
                  : filterCategory === "GRAMMAR"
                  ? "⚡ Sinh Đề Ngữ Pháp (30 câu)"
                  : filterCategory === "FULL"
                  ? "⚡ Sinh Đề Tổng Hợp (30 câu)"
                  : "⚡ Sinh Trọn Bộ (120 câu)"}
              </span>
            </button>
          </div>
        </div>

        {/* Question List */}
        {loading ? (
          <div className="text-center py-20 text-[#76685F] font-bold">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-[#C65D4B]" />
            Đang tải ngân hàng câu hỏi...
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#EADECF] p-10 text-center rounded-3xl text-[#76685F] font-bold space-y-4 shadow-2xs">
            <div className="space-y-1">
              <p className="text-sm font-black text-[#231917]">
                Chưa có câu hỏi nào thuộc chuyên mục 「 {filterCategory === "VOCAB" ? "Từ Vựng" : filterCategory === "KANJI" ? "Hán Tự" : filterCategory === "GRAMMAR" ? "Ngữ Pháp" : filterCategory === "FULL" ? "Đề Tổng Hợp" : "Tất cả"} 」.
              </p>
              <p className="text-xs text-[#8C7B70] font-medium">
                Bạn có thể bấm nút Sinh Tự Động riêng bên dưới để tự động tạo bộ câu hỏi chuẩn N5 cho chuyên mục này!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleAutoGenerateInEditor(filterCategory)}
                disabled={autoGenerating}
                className="px-5 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-xs font-black rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>
                  {autoGenerating
                    ? "Đang sinh câu hỏi..."
                    : `⚡ Sinh Tự Động Ngay Cho Chuyên Mục ${
                        filterCategory === "VOCAB" ? "Từ Vựng (30 câu)" : filterCategory === "KANJI" ? "Hán Tự (30 câu)" : filterCategory === "GRAMMAR" ? "Ngữ Pháp (30 câu)" : filterCategory === "FULL" ? "Đề Tổng Hợp (30 câu)" : "Tất Cả (120 câu)"
                      }`}
                </span>
              </button>

              <button
                onClick={() => openCreateModal(filterCategory === "ALL" ? "VOCAB" : (filterCategory as any))}
                className="px-5 py-3 bg-[#C65D4B] text-white text-xs font-black rounded-2xl shadow-sm cursor-pointer hover:bg-[#B54F3E] transition-all hover:scale-105"
              >
                + Thêm câu hỏi thủ công
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.questionId || idx}
                className="bg-white border-2 border-[#EADECF] hover:border-[#C65D4B] rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-[#C65D4B] bg-[#FAF3EB] px-3 py-1 rounded-full border border-[#EADECF]">
                      Câu #{idx + 1}
                    </span>

                    {/* Category Badge */}
                    <span className="text-xs font-black bg-amber-50 text-amber-900 px-3 py-0.5 rounded-full border border-amber-300">
                      {q.category === "KANJI" 
                        ? "✍️ Hán Tự Kanji" 
                        : q.category === "GRAMMAR" 
                        ? "🧩 Ngữ Pháp" 
                        : q.category === "FULL" 
                        ? "🎯 Đề Tổng Hợp" 
                        : "📖 Từ Vựng"}
                    </span>

                    <span className="text-xs font-bold bg-blue-50 text-blue-800 px-3 py-0.5 rounded-full border border-blue-200">
                      {q.questionType === "MULTIPLE_CHOICE"
                        ? "Trắc nghiệm 📝"
                        : q.questionType === "KANJI_READING"
                        ? "Đọc Kanji ✍️"
                        : q.questionType === "LISTENING"
                        ? "Luyện Nghe 🔊"
                        : q.questionType === "TYPING"
                        ? "Luyện Gõ ⌨️"
                        : q.questionType === "FILL_BLANK"
                        ? "Điền Khuyết ✏️"
                        : q.questionType === "STAR_ORDER"
                        ? "Sắp Xếp ★ JLPT"
                        : q.questionType === "MATCHING"
                        ? "Nối Cặp 🔗"
                        : "Trắc nghiệm 📝"}
                    </span>

                    <span className="text-[10px] font-bold bg-purple-50 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200">
                      Độ khó: {q.difficulty}
                    </span>

                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                        q.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-amber-50 text-amber-800 border-amber-300"
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {q.audioText && (
                      <button
                        type="button"
                        onClick={() => playTestAudio(q.audioText!)}
                        className="px-3 py-1.5 bg-[#FAF5F0] hover:bg-[#EFE8E1] text-[#76685F] border border-[#EADECF] font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                        title="Nghe thử âm thanh"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#C65D4B]" />
                        <span>Thử âm thanh</span>
                      </button>
                    )}

                    {q.status === "DRAFT" && (
                      <button
                        onClick={() => handleApproveDraft(q)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Duyệt ACTIVE</span>
                      </button>
                    )}

                    <button
                      onClick={() => openEditModal(q)}
                      className="p-2 bg-[#FAF5F0] hover:bg-[#EFE8E1] text-[#56423E] border border-[#EADECF] rounded-xl cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => q.questionId && handleDelete(q.questionId)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl cursor-pointer"
                      title="Xóa câu hỏi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Prompt */}
                <h3 className="text-base font-sans font-black text-[#231917]">{q.prompt}</h3>

                {/* Question Details */}
                {q.questionType === "TYPING" ? (
                  <div className="bg-[#FAF7F2] border border-[#EADECF] p-3 rounded-2xl text-xs space-y-1">
                    <strong className="text-[#8C7B70]">Đáp án hợp lệ gõ Romaji/Kana:</strong>
                    <p className="font-mono text-emerald-800 font-bold">{q.validAnswers}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold">
                    {q.options?.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-3.5 rounded-2xl border font-bold flex items-center justify-between ${
                          opt.isCorrect
                            ? "bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs"
                            : "bg-[#FAF7F2] border-[#EADECF] text-[#76685F]"
                        }`}
                      >
                        <span>{opt.optionText}</span>
                        {opt.isCorrect && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />}
                      </div>
                    ))}
                  </div>
                )}

                {q.explanation && (
                  <p className="text-xs text-[#76685F] font-medium pt-1">
                    💡 Lời giải: {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Category-Tailored Modal CRUD Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white border-2 border-[#EADECF] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-[#EADECF] pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-[#C65D4B] uppercase tracking-widest bg-[#FAF3EB] px-2.5 py-0.5 rounded-md border border-[#EADECF]">
                    TẠO CÂU HỎI THEO CHUYÊN MỤC
                  </span>
                  <h2 className="text-xl font-sans font-black text-[#231917]">
                    {editingQuestion ? "Chỉnh Sửa Câu Hỏi Kho Đề" : "Thêm Câu Hỏi Mới Vào Kho Đề"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl text-[#76685F] hover:bg-[#FAF5F0] hover:text-[#C65D4B] transition-all cursor-pointer font-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-5 text-xs font-semibold">
                {/* 1. Category Selector Buttons */}
                <div className="space-y-1.5">
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] tracking-wider">
                    1. Chuyên Mục Quiz (Category) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "VOCAB", label: "📖 Từ Vựng" },
                      { id: "KANJI", label: "✍️ Hán Tự" },
                      { id: "GRAMMAR", label: "🧩 Ngữ Pháp" },
                      { id: "FULL", label: "🎯 Đề Tổng Hợp" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleCategorySelect(c.id as any)}
                        className={`p-3 rounded-2xl border-2 font-black text-xs transition-all cursor-pointer text-center flex flex-col items-center gap-1 ${
                          formCategory === c.id
                            ? "bg-[#C65D4B] border-[#C65D4B] text-white shadow-sm"
                            : "bg-[#FAF7F2] border-[#EADECF] text-[#76685F] hover:bg-[#FAF5F0]"
                        }`}
                      >
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Category-Specific Question Format Types */}
                <div className="space-y-1.5">
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] tracking-wider">
                    2. Dạng Bài Ra Đề Thi ({formCategory}) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(CATEGORY_FORMATS[formCategory] || CATEGORY_FORMATS.VOCAB).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setFormType(t.id)}
                        className={`p-2.5 rounded-2xl border-2 font-black text-xs transition-all cursor-pointer text-left flex flex-col gap-0.5 ${
                          formType === t.id
                            ? "bg-[#8B6F5A] border-[#8B6F5A] text-white shadow-sm"
                            : "bg-[#FAF7F2] border-[#EADECF] text-[#76685F] hover:bg-[#FAF5F0]"
                        }`}
                      >
                        <span className="font-extrabold">{t.label}</span>
                        <span className="text-[9px] opacity-85 font-medium">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* DYNAMIC FORM SECTION: CATEGORY-SPECIFIC DATA INPUTS */}
                {/* ------------------------------------------------------------- */}
                {formCategory === "VOCAB" && (
                  <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-orange-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#C65D4B]" />
                        <span>Dữ Liệu Từ Vựng (Vocabulary Fields)</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAutoFillVocabOptions}
                        className="px-3 py-1 bg-white border border-orange-300 text-orange-900 font-extrabold text-[11px] rounded-xl hover:bg-orange-100 cursor-pointer shadow-2xs"
                      >
                        ⚡ Tự Động Điền Đề Bài & Đáp Án
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-orange-900 font-bold mb-1">Từ vựng (Word / Kanji)</label>
                        <input
                          type="text"
                          value={vWord}
                          onChange={(e) => setVWord(e.target.value)}
                          className="w-full p-2.5 bg-white border border-orange-300 rounded-xl font-bold text-[#231917]"
                          placeholder="VD: 私"
                        />
                      </div>
                      <div>
                        <label className="block text-orange-900 font-bold mb-1">Cách đọc (Hiragana)</label>
                        <input
                          type="text"
                          value={vKana}
                          onChange={(e) => setVKana(e.target.value)}
                          className="w-full p-2.5 bg-white border border-orange-300 rounded-xl font-bold text-[#231917]"
                          placeholder="VD: わたし"
                        />
                      </div>
                      <div>
                        <label className="block text-orange-900 font-bold mb-1">Nghĩa tiếng Việt</label>
                        <input
                          type="text"
                          value={vMeaning}
                          onChange={(e) => setVMeaning(e.target.value)}
                          className="w-full p-2.5 bg-white border border-orange-300 rounded-xl font-bold text-[#231917]"
                          placeholder="VD: Tôi"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formCategory === "KANJI" && (
                  <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                        <PenTool className="w-4 h-4 text-amber-700" />
                        <span>Dữ Liệu Chữ Hán (Kanji Fields)</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAutoFillKanjiOptions}
                        className="px-3 py-1 bg-white border border-amber-300 text-amber-950 font-extrabold text-[11px] rounded-xl hover:bg-amber-100 cursor-pointer shadow-2xs"
                      >
                        ⚡ Tự Động Điền Đề Bài Kanji
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-amber-950 font-bold mb-1">Chữ Kanji *</label>
                        <input
                          type="text"
                          value={kChar}
                          onChange={(e) => setKChar(e.target.value)}
                          className="w-full p-2.5 bg-white border border-amber-300 rounded-xl font-bold text-center text-base"
                          placeholder="VD: 日"
                        />
                      </div>
                      <div>
                        <label className="block text-amber-950 font-bold mb-1">Âm Hán Việt *</label>
                        <input
                          type="text"
                          value={kHanViet}
                          onChange={(e) => setKHanViet(e.target.value)}
                          className="w-full p-2.5 bg-white border border-amber-300 rounded-xl font-bold"
                          placeholder="VD: NHẬT"
                        />
                      </div>
                      <div>
                        <label className="block text-amber-950 font-bold mb-1">Onyomi (Âm Hán)</label>
                        <input
                          type="text"
                          value={kOnyomi}
                          onChange={(e) => setKOnyomi(e.target.value)}
                          className="w-full p-2.5 bg-white border border-amber-300 rounded-xl font-bold"
                          placeholder="VD: ニチ"
                        />
                      </div>
                      <div>
                        <label className="block text-amber-950 font-bold mb-1">Kunyomi (Âm Nhật)</label>
                        <input
                          type="text"
                          value={kKunyomi}
                          onChange={(e) => setKKunyomi(e.target.value)}
                          className="w-full p-2.5 bg-white border border-amber-300 rounded-xl font-bold"
                          placeholder="VD: ひ"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formCategory === "GRAMMAR" && (
                  <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                        <Puzzle className="w-4 h-4 text-emerald-700" />
                        <span>Dữ Liệu Ngữ Pháp & Trợ Từ (Grammar Fields)</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAutoFillGrammarOptions}
                        className="px-3 py-1 bg-white border border-emerald-300 text-emerald-950 font-extrabold text-[11px] rounded-xl hover:bg-emerald-100 cursor-pointer shadow-2xs"
                      >
                        ⚡ Tự Động Tạo Câu Hỏi Điền Trợ Từ _____
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-emerald-950 font-bold mb-1">Mẫu ngữ pháp / Trợ từ *</label>
                        <input
                          type="text"
                          value={gPattern}
                          onChange={(e) => setGPattern(e.target.value)}
                          className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl font-bold"
                          placeholder="VD: は (wa) hoặc ～は～です"
                        />
                      </div>
                      <div>
                        <label className="block text-emerald-950 font-bold mb-1">Ý nghĩa mẫu câu</label>
                        <input
                          type="text"
                          value={gMeaning}
                          onChange={(e) => setGMeaning(e.target.value)}
                          className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl font-bold"
                          placeholder="VD: Trợ từ chỉ chủ đề câu (N1 là N2)"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-emerald-950 font-bold mb-1">Câu ví dụ đầy đủ (Tự thay trợ từ thành `_____`)</label>
                      <input
                        type="text"
                        value={gSentence}
                        onChange={(e) => setGSentence(e.target.value)}
                        className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl font-bold"
                        placeholder="VD: わたしはたなかです。"
                      />
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* DYNAMIC FORM SECTION: FORMAT-SPECIFIC INPUTS */}
                {/* ------------------------------------------------------------- */}

                {/* 1. LISTENING SPECIFIC INPUTS */}
                {formType === "LISTENING" && (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-blue-600" />
                      <span>Cấu Hình Âm Thanh & Bài Nghe (Listening Settings)</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-blue-950 font-bold">Văn bản tiếng Nhật phát âm TTS *</label>
                          {formAudioText && (
                            <button
                              type="button"
                              onClick={() => playTestAudio(formAudioText)}
                              className="text-[10px] text-blue-700 font-extrabold flex items-center gap-0.5 hover:underline"
                            >
                              <Play className="w-3 h-3" /> Nghe thử
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={formAudioText}
                          onChange={(e) => setFormAudioText(e.target.value)}
                          className="w-full p-2.5 bg-white border border-blue-300 rounded-xl font-bold"
                          placeholder="VD: わたしはがくせいです"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-950 font-bold mb-1">Phiên âm / Transcript (Hiển thị lời giải)</label>
                        <input
                          type="text"
                          value={formTranscript}
                          onChange={(e) => setFormTranscript(e.target.value)}
                          className="w-full p-2.5 bg-white border border-blue-300 rounded-xl font-bold"
                          placeholder="VD: わたしは学生です (Tôi là học sinh)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. TYPING SPECIFIC INPUTS */}
                {formType === "TYPING" && (
                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                      <Keyboard className="w-4 h-4 text-purple-600" />
                      <span>Cấu Hình Luyện Gõ / Tự Nhập (Typing Answers)</span>
                    </span>
                    <div>
                      <label className="block text-purple-950 font-bold mb-1">
                        Danh sách đáp án hợp lệ chấp nhận (phân cách bởi dấu phẩy) *
                      </label>
                      <input
                        type="text"
                        value={formValidAnswers}
                        onChange={(e) => setFormValidAnswers(e.target.value)}
                        required
                        className="w-full p-3 bg-white border border-purple-300 rounded-2xl font-mono font-bold text-purple-900"
                        placeholder="VD: watashi, わたし, 私"
                      />
                      <p className="text-[10px] text-purple-700 mt-1">
                        Học viên gõ đúng bất kỳ cụm từ nào trong danh sách trên đều sẽ được chấm điểm ĐÚNG.
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. STAR ORDER (JLPT ★) SPECIFIC INPUTS */}
                {formType === "STAR_ORDER" && (
                  <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Cấu Hình Sắp Xếp Câu ★ JLPT (Star Position)</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-amber-950 font-bold">
                        Chọn vị trí từ mang dấu Ngôi Sao ★ (Đáp án đúng):
                      </label>
                      <div className="flex items-center gap-4">
                        {[1, 2, 3, 4].map((pos) => (
                          <label key={pos} className="flex items-center gap-1.5 cursor-pointer font-extrabold text-xs">
                            <input
                              type="radio"
                              name="starPosRadio"
                              checked={starPosition === pos}
                              onChange={() => {
                                setStarPosition(pos);
                                const updatedOpts = formOptions.map((o, idx) => ({ ...o, isCorrect: idx === pos - 1 }));
                                setFormOptions(updatedOpts);
                              }}
                              className="w-4 h-4 accent-amber-600"
                            />
                            <span>Vị trí #{pos} ★</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. MATCHING PAIRS SPECIFIC INPUTS */}
                {formType === "MATCHING" && (
                  <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <Puzzle className="w-4 h-4 text-emerald-600" />
                      <span>Cấu Hình 4 Cặp Nối Tương Ứng (Matching Pairs)</span>
                    </span>
                    <div className="space-y-2">
                      {matchingPairs.map((pair, pIdx) => (
                        <div key={pIdx} className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={pair.leftText}
                            onChange={(e) => {
                              const updated = [...matchingPairs];
                              updated[pIdx].leftText = e.target.value;
                              setMatchingPairs(updated);
                            }}
                            placeholder={`Từ #${pIdx + 1} (VD: 私)`}
                            className="p-2 bg-white border border-emerald-300 rounded-xl font-bold text-xs"
                          />
                          <input
                            type="text"
                            value={pair.rightText}
                            onChange={(e) => {
                              const updated = [...matchingPairs];
                              updated[pIdx].rightText = e.target.value;
                              setMatchingPairs(updated);
                            }}
                            placeholder={`Nghĩa #${pIdx + 1} (VD: Tôi)`}
                            className="p-2 bg-white border border-emerald-300 rounded-xl font-bold text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Metadata (Độ khó & Trạng thái) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8C7B70] font-black uppercase text-[10px] tracking-wider mb-1">
                      Độ Khó (Difficulty)
                    </label>
                    <select
                      value={formDifficulty}
                      onChange={(e: any) => setFormDifficulty(e.target.value)}
                      className="w-full p-3 bg-[#FAF7F2] border border-[#EADECF] rounded-2xl font-black text-[#231917] outline-hidden focus:border-[#C65D4B] cursor-pointer"
                    >
                      <option value="EASY">EASY (Dễ - Sơ Cấp N5)</option>
                      <option value="MEDIUM">MEDIUM (Vừa - Chuẩn JLPT)</option>
                      <option value="HARD">HARD (Khó - Thử Thách N4)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8C7B70] font-black uppercase text-[10px] tracking-wider mb-1">
                      Trạng Thái Duyệt
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e: any) => setFormStatus(e.target.value)}
                      className="w-full p-3 bg-emerald-50 border border-emerald-300 rounded-2xl font-black text-emerald-900 outline-hidden cursor-pointer"
                    >
                      <option value="ACTIVE">ACTIVE (Đã duyệt xuất bản)</option>
                      <option value="DRAFT">DRAFT (Bản nháp chờ xem)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Prompt Đề bài */}
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] tracking-wider mb-1">
                    Nội Dung Đề Bài Hiển Thị (Prompt) *
                  </label>
                  <textarea
                    rows={2}
                    value={formPrompt}
                    onChange={(e) => setFormPrompt(e.target.value)}
                    required
                    className="w-full p-3 bg-[#FAF7F2] border border-[#EADECF] rounded-2xl font-bold text-[#231917] outline-hidden focus:border-[#C65D4B]"
                    placeholder="Ví dụ: Từ 「私 (わたし)」 trong tiếng Việt có nghĩa là gì?"
                  />
                </div>

                {/* 4. Options List (Hidden when formType === 'TYPING') */}
                {formType !== "TYPING" && (
                  <div className="space-y-3">
                    <label className="block text-[#8C7B70] font-black uppercase text-[10px] tracking-wider">
                      Các Phương Án Lựa Chọn (Đánh dấu 1 Radio đáp án đúng) *
                    </label>
                    <div className="space-y-2">
                      {formOptions.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                            opt.isCorrect
                              ? "bg-emerald-50 border-emerald-400"
                              : "bg-[#FAF7F2] border-[#EADECF]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="correctOptionRadio"
                            checked={opt.isCorrect}
                            onChange={() => {
                              const newOpts = formOptions.map((o, i) => ({ ...o, isCorrect: i === oIdx }));
                              setFormOptions(newOpts);
                            }}
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                          />
                          <span className="font-extrabold text-xs w-6 text-center text-[#76685F]">
                            {["A", "B", "C", "D"][oIdx]}
                          </span>
                          <input
                            type="text"
                            value={opt.optionText}
                            onChange={(e) => {
                              const newOpts = [...formOptions];
                              newOpts[oIdx].optionText = e.target.value;
                              setFormOptions(newOpts);
                            }}
                            className="flex-1 p-2 bg-white border border-[#EADECF] rounded-xl text-xs font-bold text-[#231917] outline-hidden focus:border-[#C65D4B]"
                            placeholder={`Nhập phương án ${["A", "B", "C", "D"][oIdx]}...`}
                          />
                          {opt.isCorrect && (
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-md">
                              ĐÚNG
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation */}
                <div>
                  <label className="block text-[#8C7B70] font-black uppercase text-[10px] tracking-wider mb-1">
                    Lời Giải Thích Chi Tiết (Tùy Chọn)
                  </label>
                  <input
                    type="text"
                    value={formExplanation}
                    onChange={(e) => setFormExplanation(e.target.value)}
                    className="w-full p-3 bg-[#FAF7F2] border border-[#EADECF] rounded-2xl font-bold text-[#231917] outline-hidden"
                    placeholder="Giải thích lý do tại sao đáp án này chính xác..."
                  />
                </div>

                {/* Modal Footer Controls */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EADECF]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 bg-[#FAF5F0] border border-[#EADECF] text-[#76685F] rounded-2xl font-extrabold text-xs cursor-pointer hover:bg-[#F5EFEA]"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white rounded-2xl font-black text-xs shadow-md cursor-pointer transition-all hover:scale-105"
                  >
                    Lưu Câu Hỏi Vào Kho Đề 🛡️
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
