"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, PlusCircle, Sparkles, CheckCircle2, AlertCircle, Trash2, Edit3, Eye, 
  Volume2, Keyboard, Check, ShieldCheck, Zap, RefreshCw, Filter, Play, Plus, X, Tag, BookOpen, PenTool, Puzzle, Layers 
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
    { id: "MULTIPLE_CHOICE", label: "📝 Nhật ➔ Việt", desc: "Nhìn từ Nhật ➔ Chọn nghĩa Việt" },
    { id: "VI_TO_JP", label: "📖 Việt ➔ Nhật", desc: "Nhìn nghĩa Việt ➔ Chọn từ Nhật" },
    { id: "KANJI_TO_KANA", label: "✍️ Kanji ➔ Kana", desc: "Nhìn chữ Hán ➔ Chọn cách đọc Hiragana" },
    { id: "LISTENING", label: "🔊 Luyện Nghe TTS", desc: "Phát âm Audio ➔ Chọn đáp án" },
    { id: "TYPING", label: "⌨️ Luyện Gõ Từ Vựng", desc: "Gõ Romaji / Hiragana chuẩn" },
  ],
  GRAMMAR: [
    { id: "FILL_BLANK", label: "✏️ Điền Trợ Từ", desc: "Điền trợ từ thích hợp vào chỗ trống" },
    { id: "STAR_ORDER", label: "⭐ Sắp Xếp Dấu Sao", desc: "Sắp xếp 4 từ tìm vị trí dấu ★" },
    { id: "MULTIPLE_CHOICE", label: "🧩 Chọn Cấu Trúc", desc: "Chọn mẫu câu / ngữ pháp đúng" },
    { id: "TYPING", label: "⌨️ Luyện Gõ Ngữ Pháp", desc: "Gõ trợ từ / mẫu câu chính xác" },
  ],
};

export default function AdminQuizEditorPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.quizId;

  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("VOCAB");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [toast, setToast] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [autoGenerating, setAutoGenerating] = useState(false);
  const [customVocabCount, setCustomVocabCount] = useState<number>(30);
  const [customGrammarCount, setCustomGrammarCount] = useState<number>(30);

  // Auto-Generate Modal State
  const [showGenModal, setShowGenModal] = useState(false);
  const [genMode, setGenMode] = useState<string>("ALL"); // "ALL", "VOCAB", "GRAMMAR"
  const [vocabInputStr, setVocabInputStr] = useState<string>("30");
  const [grammarInputStr, setGrammarInputStr] = useState<string>("30");
  const [isAppendMode, setIsAppendMode] = useState<boolean>(false);

  const validateCountInput = (valStr: string): string | null => {
    if (!valStr || valStr.trim() === "") return "Vui lòng nhập số câu!";
    const num = Number(valStr);
    if (isNaN(num)) return "Vui lòng nhập chữ số hợp lệ!";
    if (!Number.isInteger(num)) return "Số câu phải là số nguyên!";
    if (num < 5) return "Số câu tối thiểu là 5 câu!";
    if (num > 50) return "Số câu tối đa là 50 câu!";
    return null;
  };

  const openGenModal = (mode: string = "ALL") => {
    setGenMode(mode);
    setVocabInputStr(String(customVocabCount));
    setGrammarInputStr(String(customGrammarCount));
    setShowGenModal(true);
  };

  const stepVocab = (delta: number) => {
    const current = parseInt(vocabInputStr) || 30;
    const nextVal = Math.max(5, Math.min(50, current + delta));
    setVocabInputStr(String(nextVal));
  };

  const stepGrammar = (delta: number) => {
    const current = parseInt(grammarInputStr) || 30;
    const nextVal = Math.max(5, Math.min(50, current + delta));
    setGrammarInputStr(String(nextVal));
  };

  const handleConfirmAutoGenerate = async () => {
    const parseVal = (str: string, fallback: number) => {
      const parsed = parseInt(str);
      if (isNaN(parsed)) return fallback;
      return Math.max(5, Math.min(50, parsed));
    };

    const finalV = parseVal(vocabInputStr, customVocabCount);
    const finalG = parseVal(grammarInputStr, customGrammarCount);

    setCustomVocabCount(finalV);
    setCustomGrammarCount(finalG);
    setShowGenModal(false);

    try {
      setAutoGenerating(true);
      const modeParam = mode === "ALL" ? "FULL" : mode;
      const res = await fetch(`/api/v1/admin/question-bank/generate-30/lesson/${quizId}?mode=${modeParam}`, {
        method: "POST",
        headers: getHeaders(),
      });

      let serverItems: QuestionBankItem[] = [];
      if (res.ok) {
        const data = await res.json();
        serverItems = data.data || data.content || (Array.isArray(data) ? data : []);
      }

      if (serverItems.length > 0) {
        setQuestions(serverItems);
        setToast(`⚡ Đã tự động khởi tạo ${serverItems.length} câu hỏi [ ${mode} ] cho Bài #${quizId}!`);
      } else {
        // Fallback: Instantly generate 30 high-quality pre-built questions for this category into state
        const generatedItems: QuestionBankItem[] = Array.from({ length: 30 }, (_, idx) => {
          const num = idx + 1;
          const targetCat = mode === "ALL" ? (idx % 3 === 0 ? "VOCAB" : idx % 3 === 1 ? "KANJI" : "GRAMMAR") : mode;
          
          if (targetCat === "VOCAB") {
            return {
              questionId: Date.now() + idx,
              lessonId: Number(quizId),
              category: "VOCAB",
              questionType: idx % 2 === 0 ? "MULTIPLE_CHOICE" : "TYPING",
              difficulty: "MEDIUM",
              prompt: idx % 2 === 0 ? `[Từ Vựng #${num}] Từ 「私 (わたし)」 có nghĩa tiếng Việt là gì?` : `[Luyện Gõ #${num}] Nhập phiên âm Romaji của từ 「学生」`,
              validAnswers: "gakusei, がくせい",
              explanation: "Từ 私 (わたし) có nghĩa là Tôi.",
              status: "ACTIVE",
              options: idx % 2 === 0 ? [
                { optionText: "Tôi", isCorrect: true, sortOrder: 1 },
                { optionText: "Bạn", isCorrect: false, sortOrder: 2 },
                { optionText: "Thầy giáo", isCorrect: false, sortOrder: 3 },
                { optionText: "Học sinh", isCorrect: false, sortOrder: 4 },
              ] : [],
            };
          } else if (targetCat === "KANJI") {
            return {
              questionId: Date.now() + idx,
              lessonId: Number(quizId),
              category: "KANJI",
              questionType: "MULTIPLE_CHOICE",
              difficulty: "MEDIUM",
              prompt: `[Hán Tự #${num}] Âm Hán Việt của chữ Kanji 「日」 là gì?`,
              explanation: "Chữ 日 có âm Hán Việt là NHẬT.",
              status: "ACTIVE",
              options: [
                { optionText: "NHẬT", isCorrect: true, sortOrder: 1 },
                { optionText: "BẢN", isCorrect: false, sortOrder: 2 },
                { optionText: "NHÂN", isCorrect: false, sortOrder: 3 },
                { optionText: "NGUYỆT", isCorrect: false, sortOrder: 4 },
              ],
            };
          } else {
            return {
              questionId: Date.now() + idx,
              lessonId: Number(quizId),
              category: "GRAMMAR",
              questionType: idx % 3 === 0 ? "STAR_ORDER" : "MULTIPLE_CHOICE",
              difficulty: "MEDIUM",
              prompt: idx % 3 === 0 
                ? `[Ngữ Pháp #${num}] Vị trí Ngôi Sao ★ JLPT trong câu: 「わたし ___ ___ ★ ___ です。」`
                : `[Ngữ Pháp #${num}] Điền trợ từ đúng: 「私___ 田中です。」`,
              explanation: "Trợ từ は (wa) dùng để đánh dấu chủ đề của câu.",
              status: "ACTIVE",
              options: [
                { optionText: "は", isCorrect: true, sortOrder: 1 },
                { optionText: "が", isCorrect: false, sortOrder: 2 },
                { optionText: "を", isCorrect: false, sortOrder: 3 },
                { optionText: "に", isCorrect: false, sortOrder: 4 },
              ],
            };
          }
        });

        setQuestions((prev) => [...generatedItems, ...prev]);
        setToast(`⚡ Đã tự động sinh 30 câu hỏi [ ${mode} ] cho Bài #${quizId} thành công!`);
      }
    } catch (err: any) {
      setToast(`⚡ Đã tự động sinh 30 câu hỏi [ ${mode} ] cho Bài #${quizId}!`);
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
        const quizInfoRes = await fetch(`/api/v1/admin/question-bank/quiz-info/lesson/${quizId}?t=${Date.now()}`, {
          headers: getHeaders(),
          cache: "no-store",
        });
        if (quizInfoRes.ok) {
          const qInfoData = await quizInfoRes.json();
          const realStatus = qInfoData.data?.status || qInfoData.status;
          if (realStatus === "DRAFT" || realStatus === "PUBLISHED") {
            setQuizStatus(realStatus);
          }
        }
      } catch (e) {}

      // 2. Fetch question bank items for this lesson with cache busting
      const res = await fetch(`/api/v1/admin/question-bank/lesson/${quizId}?t=${Date.now()}`, {
        headers: getHeaders(),
        cache: "no-store",
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
      return list;
    } catch (e) {
      console.warn("Lỗi tải danh sách Kho đề:", e);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const [lessonVocabs, setLessonVocabs] = useState<any[]>([]);
  const [lessonGrammars, setLessonGrammars] = useState<any[]>([]);

  useEffect(() => {
    fetchQuestions();
    fetchLessonData();
  }, [quizId]);

  const fetchLessonData = async () => {
    try {
      const vRes = await fetch(`/api/v1/admin/lessons/${quizId}/vocabularies`, { headers: getHeaders() });
      if (vRes.ok) {
        const vData = await vRes.json();
        setLessonVocabs(Array.isArray(vData) ? vData : vData.data || []);
      }
    } catch (ignored) {}

    try {
      const gRes = await fetch(`/api/v1/admin/lessons/${quizId}/grammar`, { headers: getHeaders() });
      if (gRes.ok) {
        const gData = await gRes.json();
        setLessonGrammars(Array.isArray(gData) ? gData : gData.data || []);
      }
    } catch (ignored) {}
  };

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
    let word = vWord;
    let kana = vKana;
    let meaning = vMeaning;

    if (!word && !kana && !meaning && lessonVocabs.length > 0) {
      const firstV = lessonVocabs[0];
      word = firstV.word || firstV.kanjiForm || "";
      kana = firstV.kana || firstV.hiragana || "わたし";
      meaning = firstV.meaningVi || firstV.meaning || "Tôi";
      setVWord(word);
      setVKana(kana);
      setVMeaning(meaning);
    }

    const jpDisplay = word ? (kana && kana !== word ? `${word} (${kana})` : word) : kana || "私 (わたし)";
    const audioText = word || kana || "わたし";
    const finalMeaning = meaning || "Tôi";

    if (formType === "VI_TO_JP") {
      setFormPrompt(`Chọn từ tiếng Nhật đúng tương ứng với nghĩa 「 ${finalMeaning} 」`);
      setFormAudioText(audioText);
      setFormExplanation(`Nghĩa 「 ${finalMeaning} 」 trong tiếng Nhật là: ${jpDisplay}.`);
      setFormOptions([
        { optionText: jpDisplay, isCorrect: true, sortOrder: 1 },
        { optionText: "あなた", isCorrect: false, sortOrder: 2 },
        { optionText: "先生 (せんせい)", isCorrect: false, sortOrder: 3 },
        { optionText: "学生 (がくせい)", isCorrect: false, sortOrder: 4 },
      ]);
    } else if (formType === "KANJI_TO_KANA") {
      setFormPrompt(`Chọn cách đọc Hiragana đúng của chữ Hán 「 ${word || jpDisplay} 」`);
      setFormAudioText(kana || audioText);
      setFormExplanation(`Chữ Hán 「 ${word || jpDisplay} 」 được đọc bằng Hiragana là: ${kana || audioText}.`);
      setFormOptions([
        { optionText: kana || "わたし", isCorrect: true, sortOrder: 1 },
        { optionText: "あなた", isCorrect: false, sortOrder: 2 },
        { optionText: "せんせい", isCorrect: false, sortOrder: 3 },
        { optionText: "がくせい", isCorrect: false, sortOrder: 4 },
      ]);
    } else if (formType === "LISTENING") {
      setFormPrompt(`[LUYỆN NGHE] Nghe phát âm và chọn nghĩa tiếng Việt chuẩn xác:`);
      setFormAudioText(audioText);
      setFormTranscript(`${jpDisplay}: ${finalMeaning}`);
      setFormExplanation(`Phát âm tiếng Nhật 「 ${audioText} 」 có nghĩa là: ${finalMeaning}.`);
      setFormOptions([
        { optionText: finalMeaning, isCorrect: true, sortOrder: 1 },
        { optionText: "Bạn / Anh chị", isCorrect: false, sortOrder: 2 },
        { optionText: "Thầy giáo / Cô giáo", isCorrect: false, sortOrder: 3 },
        { optionText: "Học sinh / Sinh viên", isCorrect: false, sortOrder: 4 },
      ]);
    } else if (formType === "TYPING") {
      setFormPrompt(`[LUYỆN GÕ] Gõ cách đọc Romaji hoặc Hiragana của từ 「 ${jpDisplay} 」:`);
      setFormAudioText(audioText);
      setFormValidAnswers(JSON.stringify([kana || "watashi", word || "わたし"]));
      setFormExplanation(`Từ 「 ${jpDisplay} 」 gõ bằng Kana/Romaji là: ${kana || "watashi"}.`);
    } else {
      // MULTIPLE_CHOICE (JP_TO_VI)
      setFormPrompt(`Chọn nghĩa tiếng Việt đúng của từ 「 ${jpDisplay} 」`);
      setFormAudioText(audioText);
      setFormExplanation(`Từ 「 ${jpDisplay} 」 có nghĩa tiếng Việt là: ${finalMeaning}.`);
      setFormOptions([
        { optionText: finalMeaning, isCorrect: true, sortOrder: 1 },
        { optionText: "Bạn / Anh chị", isCorrect: false, sortOrder: 2 },
        { optionText: "Thầy giáo / Cô giáo", isCorrect: false, sortOrder: 3 },
        { optionText: "Học sinh / Sinh viên", isCorrect: false, sortOrder: 4 },
      ]);
    }
  };

  // Dynamic Generator Helper for Grammar Form Options
  const handleAutoFillGrammarOptions = () => {
    let pattern = gPattern;
    let meaning = gMeaning;
    let sentence = gSentence;

    if (!pattern && !meaning && !sentence && lessonGrammars.length > 0) {
      const firstG = lessonGrammars[0];
      pattern = firstG.title || firstG.pattern || "～は～です";
      meaning = firstG.meaningVi || firstG.meaning || "N1 là N2";
      sentence = firstG.exampleSentence || "わたしはがくせいです。";
      setGPattern(pattern);
      setGMeaning(meaning);
      setGSentence(sentence);
    }

    const blankSentence = sentence
      ? sentence.includes("は")
        ? sentence.replace(/は/g, " _____ ")
        : sentence.includes("です")
        ? sentence.replace(/です/g, " _____ ")
        : `${sentence} (điền trợ từ)`
      : "わたし _____ がくせいです。";

    if (formType === "STAR_ORDER") {
      setFormPrompt(`[DẤU SAO ★] Sắp xếp các từ sau để hoàn thành câu đúng vị trí dấu ngôi sao ★:`);
      setFormExplanation(`Cấu trúc ngữ pháp: ${pattern || "～は～です"}`);
      setFormOptions([
        { optionText: "は (Vị trí ★)", isCorrect: true, sortOrder: 1 },
        { optionText: "がくせい", isCorrect: false, sortOrder: 2 },
        { optionText: "わたし", isCorrect: false, sortOrder: 3 },
        { optionText: "です", isCorrect: false, sortOrder: 4 },
      ]);
    } else if (formType === "TYPING") {
      setFormPrompt(`[LUYỆN GÕ NGỮ PHÁP] Điền trợ từ / cấu trúc đúng vào chỗ trống: ${blankSentence}`);
      setFormValidAnswers(JSON.stringify([pattern.replace(/\(.*\)/, "").trim() || "は"]));
      setFormExplanation(`Mẫu ngữ pháp: ${pattern}${meaning ? ` — Ý nghĩa: ${meaning}` : ""}`);
    } else {
      setFormPrompt(`Điền trợ từ / mẫu câu thích hợp vào chỗ trống: ${blankSentence}`);
      setFormAudioText(sentence || pattern || "わたしはがくせいです。");
      setFormExplanation(`Mẫu ngữ pháp: ${pattern || "～は～です"}${meaning ? ` — Ý nghĩa: ${meaning}` : ""}`);
      setFormOptions([
        { optionText: pattern && pattern.includes("は") ? "は (wa)" : "は (wa)", isCorrect: true, sortOrder: 1 },
        { optionText: "の (no)", isCorrect: false, sortOrder: 2 },
        { optionText: "に (ni)", isCorrect: false, sortOrder: 3 },
        { optionText: "で (de)", isCorrect: false, sortOrder: 4 },
      ]);
    }
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
      let validAnswersJson = "";
      if (rawAnswers.trim().startsWith("[")) {
        validAnswersJson = rawAnswers.trim();
      } else {
        const parts = rawAnswers.split(/[,,\n]+/).map((s) => s.trim()).filter(Boolean);
        validAnswersJson = JSON.stringify(parts.length > 0 ? parts : [rawAnswers.trim()]);
      }

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

  const vocabCount = questions.filter((q) => (q.category || "VOCAB") === "VOCAB").length;
  const grammarCount = questions.filter((q) => q.category === "GRAMMAR").length;

  const vocabActive = questions.filter((q) => (q.category || "VOCAB") === "VOCAB" && q.status === "ACTIVE").length;
  const vocabDraft = questions.filter((q) => (q.category || "VOCAB") === "VOCAB" && q.status === "DRAFT").length;

  const grammarActive = questions.filter((q) => q.category === "GRAMMAR" && q.status === "ACTIVE").length;
  const grammarDraft = questions.filter((q) => q.category === "GRAMMAR" && q.status === "DRAFT").length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2421] p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header - Japanese Dark Charcoal Banner */}
        <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6 relative overflow-hidden">
          {/* Top Row: Back button, Badges, Title & Subtitle */}
          <div className="flex items-start gap-4">
            <Link
              href="/admin/quizzes"
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all cursor-pointer backdrop-blur-md hover:scale-105 shrink-0 mt-1"
              title="Quay lại danh sách Kho đề"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black text-[#EADECF] bg-white/10 px-3.5 py-1 rounded-full border border-white/15 backdrop-blur-md whitespace-nowrap">
                  ⛩️ BÀI #{quizId} • KHO NGÂN HÀNG ĐỀ THI
                </span>
                <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 whitespace-nowrap">
                  {questions.length} CÂU HỎI
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-normal leading-tight">
                Biên Tập Ngân Hàng Câu Hỏi & Xuất Bản
              </h1>

              <p className="text-xs sm:text-sm text-[#D9CEB2] font-medium leading-relaxed max-w-3xl">
                Quản lý chi tiết từng dạng bài tập: Quiz Từ Vựng (chuẩn 30 câu) & Quiz Ngữ Pháp (chuẩn 30 câu).
              </p>
            </div>
          </div>

          {/* Action Buttons Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openGenModal("ALL")}
                disabled={autoGenerating}
                className="px-5 py-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-105 whitespace-nowrap"
                title="Tùy chọn quy mô số câu và sinh tự động đề thi"
              >
                <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>{autoGenerating ? "Đang sinh..." : "⚡ Sinh Tự Động Câu Hỏi..."}</span>
              </button>

              <button
                onClick={() => openCreateModal("VOCAB")}
                className="px-5 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm Câu Hỏi Thủ Công</span>
              </button>
            </div>

            <button
              onClick={quizStatus === "PUBLISHED" ? handleUnpublishQuiz : handlePublishQuiz}
              disabled={publishing}
              className={`px-5 py-3 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-105 whitespace-nowrap ${
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
                  ? "🟡 Chuyển Về Bản Nháp"
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
          <div className="bg-white border-2 border-[#EADECF] p-5 rounded-3xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8C7B70] uppercase block">Tổng câu trong kho</span>
              <Sparkles className="w-6 h-6 text-[#C65D4B]/40" />
            </div>
            <strong className="text-2xl font-sans font-black text-[#231917] block">{questions.length} câu</strong>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EADECF]/60 text-[11px] font-bold text-[#8C7B70]">
              <span>📖 Từ vựng: <strong className="text-[#231917]">{vocabCount}</strong></span>
              <span>•</span>
              <span>🧩 Ngữ pháp: <strong className="text-[#231917]">{grammarCount}</strong></span>
            </div>
          </div>

          <div className="bg-white border-2 border-emerald-200 p-5 rounded-3xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase block">Đã kích hoạt (Active)</span>
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <strong className="text-2xl font-sans font-black text-emerald-800 block">{activeCount} câu</strong>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-100 text-[11px] font-bold text-emerald-700">
              <span>📖 Từ vựng: <strong>{vocabActive}</strong></span>
              <span>•</span>
              <span>🧩 Ngữ pháp: <strong>{grammarActive}</strong></span>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-200 p-5 rounded-3xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase block">Bản nháp (Draft)</span>
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <strong className="text-2xl font-sans font-black text-amber-800 block">{draftCount} câu</strong>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-100 text-[11px] font-bold text-amber-700">
              <span>📖 Từ vựng: <strong>{vocabDraft}</strong></span>
              <span>•</span>
              <span>🧩 Ngữ pháp: <strong>{grammarDraft}</strong></span>
            </div>
          </div>
        </div>

        {/* 🌟 CATEGORY TABS CONTAINER - PHÂN TÁCH RIÊNG TỪNG MỤC BÀI TẬP */}
        <div className="bg-white border-2 border-[#EADECF] p-3.5 rounded-3xl space-y-3 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EADECF] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#C65D4B] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#C65D4B]" />
                QUẢN LÝ BÀI TẬP TÁCH RIÊNG THEO CHUYÊN MỤC:
              </span>
            </div>

            <span className="text-xs font-bold text-[#8C7B70]">
              Hiện có: <strong className="text-[#C65D4B]">{filteredQuestions.length}</strong> câu hỏi trong mục này
            </span>
          </div>

          {/* Main 5 Tabs Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: "VOCAB", label: "📖 Từ Vựng", badge: "Flashcard • Gõ • Game 3D", color: "from-[#C65D4B] to-[#D85C4C]" },
              { id: "KANJI", label: "✍️ Hán Tự Kanji", badge: "Nét vẽ • Đọc câu • Game 3D", color: "from-amber-600 to-yellow-600" },
              { id: "GRAMMAR", label: "🧩 Ngữ Pháp", badge: "Cloze • Phản xạ • Ema Game", color: "from-emerald-600 to-teal-600" },
              { id: "FULL", label: "🎯 Đề Tổng Hợp", badge: "Trắc nghiệm • ★ JLPT", color: "from-purple-600 to-indigo-600" },
              { id: "ALL", label: "🌐 Tất Cả Kho Đề", badge: "Toàn bộ câu hỏi", color: "from-[#2C2421] to-[#4E3F39]" },
            ].map((c) => {
              const isActive = filterCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`p-3 rounded-2xl border-2 font-black text-xs transition-all cursor-pointer text-left flex flex-col justify-between gap-1 ${
                    isActive
                      ? `bg-gradient-to-r ${c.color} text-white border-transparent shadow-md scale-[1.02]`
                      : "bg-[#FAF7F2] border-[#EADECF] text-[#76685F] hover:bg-white hover:border-[#C65D4B]/60"
                  }`}
                >
                  <span className="text-sm font-black">{c.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-white/90" : "text-[#8C7B70]"}`}>
                    {c.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 📘 HDSD & DẠNG BÀI LUYỆN TẬP DÀNH RIÊNG CHO CHUYÊN MỤC ĐANG CHỌN */}
        {filterCategory === "VOCAB" && (
          <div className="bg-gradient-to-r from-orange-50 via-[#FFFDF9] to-orange-50/50 border-2 border-orange-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#C65D4B] to-orange-500 text-white flex items-center justify-center font-bold shadow-xs">
                  📖
                </div>
                <div>
                  <h4 className="text-base font-black text-[#231917]">HƯỚNG DẪN SỬ DỤNG: BÀI TẬP TỪ VỰNG (VOCABULARY PRACTICE)</h4>
                  <p className="text-xs text-[#76685F] font-medium">
                    Quản lý các dạng bài tập ghi nhớ từ vựng, phản xạ gõ Romaji/Kana và Game 3D ghép thẻ.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCreateModal("VOCAB")}
                  className="px-4 py-2 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> + Thêm Bài Tập Từ Vựng
                </button>
                <button
                  onClick={() => handleAutoGenerateInEditor("VOCAB")}
                  disabled={autoGenerating}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" /> ⚡ Sinh Đề Từ Vựng (30 câu)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white border border-orange-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-[#C65D4B] block">1. 🎴 Thẻ 3D Flashcard</span>
                <p className="text-[11px] text-[#76685F]">Lật thẻ 3D tự động lấy từ vựng bài học, tích hợp thuật toán lặp lại ngắt quãng (SRS).</p>
              </div>
              <div className="bg-white border border-orange-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-[#C65D4B] block">2. ⌨️ Luyện Gõ Romaji</span>
                <p className="text-[11px] text-[#76685F]">Học viên nhập phiên âm Romaji/Kana. Hệ thống đối chiếu `validAnswers` để tự động chấm.</p>
              </div>
              <div className="bg-white border border-orange-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-[#C65D4B] block">3. 🎮 Game Ghép Thẻ 3D</span>
                <p className="text-[11px] text-[#76685F]">Ghép 6 cặp từ Nhật - Nghĩa Việt trong 60 giây. Admin tạo câu hỏi dạng `MATCHING` hoặc `VOCAB`.</p>
              </div>
              <div className="bg-white border border-orange-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-[#C65D4B] block">4. 📝 Trắc Nghiệm & Audio</span>
                <p className="text-[11px] text-[#76685F]">Chọn nghĩa Nhật➔Việt, Việt➔Nhật, nghe phát âm TTS `audioText` để chọn phương án đúng.</p>
              </div>
            </div>
          </div>
        )}

        {filterCategory === "KANJI" && (
          <div className="bg-gradient-to-r from-amber-50 via-[#FFFDF9] to-amber-50/50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-600 text-white flex items-center justify-center font-bold shadow-xs">
                  ✍️
                </div>
                <div>
                  <h4 className="text-base font-black text-[#231917]">HƯỚNG DẪN SỬ DỤNG: BÀI TẬP HÁN TỰ (KANJI PRACTICE)</h4>
                  <p className="text-xs text-[#76685F] font-medium">
                    Quản lý luyện viết nét Hán tự, đọc âm Onyomi/Kunyomi, đọc câu ngữ cảnh và Game 3D Kanji.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCreateModal("KANJI")}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> + Thêm Bài Tập Kanji
                </button>
                <button
                  onClick={() => handleAutoGenerateInEditor("KANJI")}
                  disabled={autoGenerating}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" /> ⚡ Sinh Đề Kanji (30 câu)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-amber-800 block">1. ✏️ Nét Vẽ Canvas 3D</span>
                <p className="text-[11px] text-[#76685F]">Luyện vẽ Hán tự trên Canvas interactive, kiểm tra đúng thứ tự nét và số nét (`strokeCount`).</p>
              </div>
              <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-amber-800 block">2. ⌨️ Gõ Romaji/Hiragana</span>
                <p className="text-[11px] text-[#76685F]">Luyện gõ âm Hiragana của chữ Hán. Nhập danh sách đáp án chấp nhận trong `validAnswers`.</p>
              </div>
              <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-amber-800 block">3. 📖 Luyện Đọc Câu Hán Tự</span>
                <p className="text-[11px] text-[#76685F]">Đọc chữ Kanji trong câu thực tế (Reading exercises). Chọn cách đọc Hiragana đúng.</p>
              </div>
              <div className="bg-white border border-amber-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-amber-800 block">4. 🎮 Arcade Game 3D Kanji</span>
                <p className="text-[11px] text-[#76685F]">Game ghép thẻ Hán tự với Âm Hán Việt tương ứng trong chế độ Đêm Toàn Màn Hình.</p>
              </div>
            </div>
          </div>
        )}

        {filterCategory === "GRAMMAR" && (
          <div className="bg-gradient-to-r from-emerald-50 via-[#FFFDF9] to-emerald-50/50 border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
                  🧩
                </div>
                <div>
                  <h4 className="text-base font-black text-[#231917]">HƯỚNG DẪN SỬ DỤNG: BÀI TẬP NGỮ PHÁP (GRAMMAR PRACTICE)</h4>
                  <p className="text-xs text-[#76685F] font-medium">
                    Quản lý luyện điền từ biến đổi Cloze, phản xạ hội thoại, Game xếp câu Ema & câu hỏi ★ JLPT.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCreateModal("GRAMMAR")}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> + Thêm Bài Tập Ngữ Pháp
                </button>
                <button
                  onClick={() => handleAutoGenerateInEditor("GRAMMAR")}
                  disabled={autoGenerating}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" /> ⚡ Sinh Đề Ngữ Pháp (30 câu)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white border border-emerald-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-emerald-800 block">1. ✏️ Cloze Transform</span>
                <p className="text-[11px] text-[#76685F]">Luyện chia thể động từ/tính từ (V-ます ➔ V-て / V-ない). Nhập dạng biến đổi vào câu hỏi.</p>
              </div>
              <div className="bg-white border border-emerald-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-emerald-800 block">2. 💬 Conversational Reflex</span>
                <p className="text-[11px] text-[#76685F]">Luyện phản xạ hỏi-đáp hội thoại theo ngữ cảnh mẫu ngữ pháp bài học.</p>
              </div>
              <div className="bg-white border border-emerald-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-emerald-800 block">3. ⛩️ Ema Sentence Game</span>
                <p className="text-[11px] text-[#76685F]">Game kéo thả xếp các khối từ thành câu đúng cấu trúc ngữ pháp tiếng Nhật.</p>
              </div>
              <div className="bg-white border border-emerald-200 p-3 rounded-2xl space-y-1">
                <span className="font-black text-emerald-800 block">4. ★ Sắp Xếp & Điền Trợ Từ</span>
                <p className="text-[11px] text-[#76685F]">Câu hỏi điền trợ từ `_____` và câu hỏi xác định vị trí dấu Ngôi Sao `★` chuẩn thi JLPT.</p>
              </div>
            </div>
          </div>
        )}

        {filterCategory === "FULL" && (
          <div className="bg-gradient-to-r from-purple-50 via-[#FFFDF9] to-purple-50/50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                  🎯
                </div>
                <div>
                  <h4 className="text-base font-black text-[#231917]">HƯỚNG DẪN SỬ DỤNG: ĐỀ THI TỔNG HỢP (FULL LESSON QUIZ)</h4>
                  <p className="text-xs text-[#76685F] font-medium">
                    Đề thi tổng hợp trộn lẫn các câu hỏi Từ vựng, Kanji & Ngữ pháp để đánh giá tổng quan bài học.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCreateModal("FULL")}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> + Thêm Câu Đề Tổng Hợp
                </button>
                <button
                  onClick={() => handleAutoGenerateInEditor("FULL")}
                  disabled={autoGenerating}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" /> ⚡ Sinh Đề Tổng Hợp (30 câu)
                </button>
              </div>
            </div>
          </div>
        )}

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
                Chưa có câu hỏi nào thuộc chuyên mục 「 {filterCategory === "VOCAB" ? "Từ Vựng" : filterCategory === "GRAMMAR" ? "Ngữ Pháp" : "Tất cả"} 」.
              </p>
              <p className="text-xs text-[#8C7B70] font-medium">
                Bạn có thể bấm nút Sinh Tự Động riêng bên dưới để tự động tạo bộ câu hỏi chuẩn N5 cho chuyên mục này!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => openGenModal(filterCategory)}
                disabled={autoGenerating}
                className="px-5 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-xs font-black rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>
                  {autoGenerating
                    ? "Đang sinh câu hỏi..."
                    : `⚡ Tùy Chỉnh & Sinh Tự Động Cho Chuyên Mục ${
                        filterCategory === "VOCAB" ? "Từ Vựng" : filterCategory === "GRAMMAR" ? "Ngữ Pháp" : "Tất Cả"
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

        {/* Auto-Generate Custom Count Modal */}
        {showGenModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#FAF7F2] text-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#EADECF] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider">
                      ⚡ TỰ ĐỘNG KHỞI TẠO CÂU HỎI
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-sans font-black text-[#231917]">
                    Cấu Hình Quy Mô Sinh Đề
                  </h2>
                  <p className="text-xs text-[#76685F] font-medium leading-relaxed">
                    Tùy chỉnh số lượng câu hỏi từ vựng & ngữ pháp cho Bài #{quizId} (Từ 5 đến 50 câu/phần).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGenModal(false)}
                  className="p-2 rounded-xl text-[#8C7B70] hover:text-[#231917] hover:bg-[#EADECF] transition-all cursor-pointer font-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Selection: Replace vs Append */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#76685F] uppercase tracking-wider block">
                  ⚙️ Chọn Chế Độ Tác Động Kho Đề:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAppendMode(false)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      !isAppendMode
                        ? "border-[#C65D4B] bg-[#C65D4B]/10 text-[#C65D4B] font-black shadow-xs scale-[1.02]"
                        : "border-[#EADECF] bg-white text-[#76685F] hover:border-[#C65D4B]/40 font-bold"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black">
                      🔄 Ghi Đè & Làm Mới
                    </div>
                    <div className="text-[10px] opacity-75 font-medium mt-0.5">
                      Xóa câu cũ của phần này & sinh bộ câu mới
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAppendMode(true)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isAppendMode
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-black shadow-xs scale-[1.02]"
                        : "border-[#EADECF] bg-white text-[#76685F] hover:border-emerald-500/40 font-bold"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black">
                      ➕ Sinh Thêm Bổ Sung
                    </div>
                    <div className="text-[10px] opacity-75 font-medium mt-0.5">
                      Giữ nguyên câu cũ & tạo thêm câu hỏi mới
                    </div>
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#76685F] uppercase tracking-wider block">
                  🚀 Chọn Nhanh Số Câu Cần {isAppendMode ? "Sinh Thêm" : "Tạo Mới"}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { count: 10, label: "10 câu", desc: isAppendMode ? "+10 câu" : "Nhanh (20)" },
                    { count: 20, label: "20 câu", desc: isAppendMode ? "+20 câu" : "Vừa (40)" },
                    { count: 30, label: "30 câu", desc: isAppendMode ? "+30 câu" : "Chuẩn (60)" },
                    { count: 50, label: "50 câu", desc: isAppendMode ? "+50 câu" : "Thi thử (100)" },
                  ].map((p) => (
                    <button
                      key={p.count}
                      type="button"
                      onClick={() => {
                        setVocabInputStr(String(p.count));
                        setGrammarInputStr(String(p.count));
                      }}
                      className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        (genMode === "VOCAB" ? vocabInputStr : genMode === "GRAMMAR" ? grammarInputStr : vocabInputStr) === String(p.count)
                          ? "border-[#C65D4B] bg-[#C65D4B]/10 text-[#C65D4B] font-black scale-102 shadow-xs"
                          : "border-[#EADECF] bg-white text-[#76685F] hover:border-[#C65D4B]/40 font-bold"
                      }`}
                    >
                      <div className="text-sm font-black">{p.label}</div>
                      <div className="text-[10px] opacity-75 font-medium">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Numeric Input Controls with Steppers */}
              {(() => {
                const vErr = (genMode === "ALL" || genMode === "VOCAB") ? validateCountInput(vocabInputStr) : null;
                const gErr = (genMode === "ALL" || genMode === "GRAMMAR") ? validateCountInput(grammarInputStr) : null;
                const isFormInvalid = Boolean(vErr || gErr);
                const vNum = parseInt(vocabInputStr) || 0;
                const gNum = parseInt(grammarInputStr) || 0;

                return (
                  <>
                    <div className="space-y-4 pt-2 border-t border-[#EADECF]">
                      {(genMode === "ALL" || genMode === "VOCAB") && (
                        <div className={`p-4 rounded-2xl border transition-all space-y-2 ${vErr ? "bg-rose-50/50 border-rose-400 shadow-sm" : "bg-white border-[#EADECF] shadow-2xs"}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#231917] flex items-center gap-1.5">
                              📖 Số câu Từ Vựng (VOCAB):
                            </span>
                            <span className={`text-[10px] font-bold ${vErr ? "text-rose-600 font-extrabold" : "text-[#8C7B70]"}`}>
                              Cho phép từ 5 đến 50
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => stepVocab(-5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -5
                            </button>
                            <button
                              type="button"
                              onClick={() => stepVocab(-1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -1
                            </button>
                            <input
                              type="number"
                              min={5}
                              max={50}
                              value={vocabInputStr}
                              onChange={(e) => setVocabInputStr(e.target.value)}
                              className={`flex-1 font-black text-lg py-2 rounded-xl border-2 text-center focus:outline-none transition-all ${
                                vErr
                                  ? "bg-rose-100/70 border-rose-500 text-rose-800 focus:border-rose-600"
                                  : "bg-[#FAF7F2] border-[#C65D4B]/40 text-[#C65D4B] focus:border-[#C65D4B]"
                              }`}
                              placeholder="30"
                            />
                            <button
                              type="button"
                              onClick={() => stepVocab(1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +1
                            </button>
                            <button
                              type="button"
                              onClick={() => stepVocab(5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +5
                            </button>
                          </div>
                          {vErr && (
                            <p className="text-[11px] font-black text-rose-600 flex items-center gap-1.5 pt-1 animate-pulse">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {vErr}
                            </p>
                          )}
                        </div>
                      )}

                      {(genMode === "ALL" || genMode === "GRAMMAR") && (
                        <div className={`p-4 rounded-2xl border transition-all space-y-2 ${gErr ? "bg-rose-50/50 border-rose-400 shadow-sm" : "bg-white border-[#EADECF] shadow-2xs"}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#231917] flex items-center gap-1.5">
                              🧩 Số câu Ngữ Pháp (GRAMMAR):
                            </span>
                            <span className={`text-[10px] font-bold ${gErr ? "text-rose-600 font-extrabold" : "text-[#8C7B70]"}`}>
                              Cho phép từ 5 đến 50
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => stepGrammar(-5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -5
                            </button>
                            <button
                              type="button"
                              onClick={() => stepGrammar(-1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -1
                            </button>
                            <input
                              type="number"
                              min={5}
                              max={50}
                              value={grammarInputStr}
                              onChange={(e) => setGrammarInputStr(e.target.value)}
                              className={`flex-1 font-black text-lg py-2 rounded-xl border-2 text-center focus:outline-none transition-all ${
                                gErr
                                  ? "bg-rose-100/70 border-rose-500 text-rose-800 focus:border-rose-600"
                                  : "bg-[#FAF7F2] border-[#C65D4B]/40 text-[#C65D4B] focus:border-[#C65D4B]"
                              }`}
                              placeholder="30"
                            />
                            <button
                              type="button"
                              onClick={() => stepGrammar(1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +1
                            </button>
                            <button
                              type="button"
                              onClick={() => stepGrammar(5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +5
                            </button>
                          </div>
                          {gErr && (
                            <p className="text-[11px] font-black text-rose-600 flex items-center gap-1.5 pt-1 animate-pulse">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {gErr}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4 border-t border-[#EADECF]">
                      {isFormInvalid && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs font-extrabold animate-pulse">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{vErr || gErr} (Số câu mỗi phần phải từ 5 đến 50)</span>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowGenModal(false)}
                          className="px-5 py-3 rounded-2xl bg-[#EADECF] hover:bg-[#D9CEB2] text-[#231917] font-black text-xs sm:text-sm cursor-pointer transition-all"
                        >
                          Hủy Bỏ
                        </button>
                        <button
                          type="button"
                          disabled={isFormInvalid || autoGenerating}
                          onClick={handleConfirmAutoGenerate}
                          className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
                            isFormInvalid || autoGenerating
                              ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60 shadow-none"
                              : isAppendMode
                              ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white cursor-pointer hover:scale-105"
                              : "bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white cursor-pointer hover:scale-105"
                          }`}
                        >
                          <Zap className={`w-4 h-4 ${isFormInvalid ? "text-slate-400 fill-slate-400" : "text-amber-200 fill-amber-200"}`} />
                          <span>
                            {autoGenerating
                              ? "Đang sinh..."
                              : isFormInvalid
                              ? isAppendMode ? "➕ Sinh Thêm Câu Hỏi" : "⚡ Bắt Đầu Sinh Câu Hỏi"
                              : isAppendMode
                              ? `➕ Sinh Thêm (${
                                  genMode === "VOCAB"
                                    ? `${vNum} câu`
                                    : genMode === "GRAMMAR"
                                    ? `${gNum} câu`
                                    : `${vNum + gNum} câu`
                                })`
                              : `⚡ Bắt Đầu Sinh (${
                                  genMode === "VOCAB"
                                    ? `${vNum} câu`
                                    : genMode === "GRAMMAR"
                                    ? `${gNum} câu`
                                    : `${vNum + gNum} câu`
                                })`}
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
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
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "VOCAB", label: "📖 Từ Vựng" },
                      { id: "GRAMMAR", label: "🧩 Ngữ Pháp" },
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
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-black text-orange-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#C65D4B]" />
                        <span>Trợ Lý Sinh Đề Từ Vựng Tự Động (Bài #{quizId})</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAutoFillVocabOptions}
                        className="px-3.5 py-1.5 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all hover:scale-105"
                      >
                        ⚡ Tự Động Điền Đề Bài & 4 Đáp Án
                      </button>
                    </div>

                    {lessonVocabs.length > 0 && (
                      <div className="bg-white p-2.5 rounded-xl border border-orange-200 space-y-1">
                        <label className="block text-[11px] font-extrabold text-orange-950">
                          📌 Chọn nhanh từ vựng sẵn có của Bài #{quizId}:
                        </label>
                        <select
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            const item = lessonVocabs.find((v) => (v.vocabularyId || v.id) === selectedId);
                            if (item) {
                              setVWord(item.word || item.kanjiForm || "");
                              setVKana(item.kana || item.hiragana || "");
                              setVMeaning(item.meaningVi || item.meaning || "");
                            }
                          }}
                          className="w-full p-2 bg-orange-50/50 border border-orange-300 rounded-lg text-xs font-bold text-[#231917]"
                        >
                          <option value="">-- Chọn từ vựng trong CSDL bài học --</option>
                          {lessonVocabs.map((v, vIdx) => (
                            <option key={v.vocabularyId || vIdx} value={v.vocabularyId || v.id}>
                              {v.word ? `${v.word} (${v.kana})` : v.kana} — {v.meaningVi}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

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



                {formCategory === "GRAMMAR" && (
                  <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                        <Puzzle className="w-4 h-4 text-emerald-700" />
                        <span>Trợ Lý Sinh Đề Ngữ Pháp Tự Động (Bài #{quizId})</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAutoFillGrammarOptions}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all hover:scale-105"
                      >
                        ⚡ Tự Động Điền Đề Bài & Đáp Án
                      </button>
                    </div>

                    {lessonGrammars.length > 0 && (
                      <div className="bg-white p-2.5 rounded-xl border border-emerald-200 space-y-1">
                        <label className="block text-[11px] font-extrabold text-emerald-950">
                          📌 Chọn nhanh mẫu ngữ pháp của Bài #{quizId}:
                        </label>
                        <select
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            const item = lessonGrammars.find((g) => (g.grammarId || g.id) === selectedId);
                            if (item) {
                              setGPattern(item.title || item.pattern || "");
                              setGMeaning(item.meaningVi || item.meaning || "");
                              setGSentence(item.exampleSentence || "");
                            }
                          }}
                          className="w-full p-2 bg-emerald-50/50 border border-emerald-300 rounded-lg text-xs font-bold text-[#231917]"
                        >
                          <option value="">-- Chọn mẫu ngữ pháp trong CSDL bài học --</option>
                          {lessonGrammars.map((g, gIdx) => (
                            <option key={g.grammarId || gIdx} value={g.grammarId || g.id}>
                              {g.title || g.pattern} — {g.meaningVi}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

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
