"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { 
  CheckCircle2, AlertCircle, Trophy, RotateCcw, ArrowLeft, Volume2, Gamepad2, 
  Layers, Keyboard, Zap, Play, AlertTriangle, HelpCircle, Shuffle, ShieldCheck, ArrowRight,
  XCircle, Sparkles, Search, Bookmark, Flag, ChevronDown, ChevronUp
} from "lucide-react";
import Card3DTilt from "@/components/ui/Card3DTilt";
import { playCatMeowSound } from "@/lib/utils/catSound";
import OmikujiFortuneModal from "@/components/ui/OmikujiFortuneModal";

interface QuestionOption {
  optionId?: number;
  optionText: string;
}

interface QuestionItem {
  questionId: number;
  attemptAnswerId: number;
  questionType: string;
  category?: string;
  prompt: string;
  japaneseText?: string;
  furiganaText?: string;
  aiHintText?: string;
  audioText?: string;
  audioUrl?: string;
  transcript?: string;
  explanation?: string;
  correctAnswerText?: string;
  options: QuestionOption[];
}

interface StartQuizData {
  attemptId: number;
  quizId: number;
  title: string;
  description: string;
  passScore: number;
  timeLimitMinutes?: number;
  questions: QuestionItem[];
}

interface AnswerDetail {
  attemptAnswerId: number;
  prompt: string;
  userAnswer?: string;
  isCorrect: boolean;
  explanation?: string;
  transcript?: string;
}

interface QuizResultData {
  attemptId: number;
  score: number;
  passScore: number;
  passed: boolean;
  correctCount: number;
  totalCount: number;
  answers: AnswerDetail[];
}

export type QuizModeType = "MULTIPLE_CHOICE" | "LISTENING" | "TYPING" | "SPEED_BLITZ";

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizIdStr = resolvedParams.quizId;
  const router = useRouter();
  const searchParams = useSearchParams();
  const reqCategory = (searchParams.get("category") || searchParams.get("type") || "ALL").toUpperCase();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quiz Mode Selection
  const [selectedMode, setSelectedMode] = useState<QuizModeType | null>(null);

  const [quizData, setQuizData] = useState<StartQuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Step-by-Step Single Question Flow & Timer
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // Default 10 minutes (600s)
  const [isQuizPublished, setIsQuizPublished] = useState<boolean>(false);

  // Track instant check status per question
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [checkWarning, setCheckWarning] = useState<string>("");

  // Track flagged/bookmarked questions ("chưa chắc")
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isPaletteExpanded, setIsPaletteExpanded] = useState<boolean>(false);

  // Interactive Furigana, AI Hint, Omikuji Fortune & Virtual Kana Keyboard states
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [showAiHint, setShowAiHint] = useState<boolean>(false);
  const [isOmikujiOpen, setIsOmikujiOpen] = useState<boolean>(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState<boolean>(true);
  const [kanaTab, setKanaTab] = useState<"HIRAGANA" | "KATAKANA" | "DAKUON" | "ROMAJI">("HIRAGANA");

  const toggleFlagQuestion = (qId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Auto start combined quiz immediately upon page load
  useEffect(() => {
    startQuizForMode("MULTIPLE_CHOICE");
  }, []);

  // Restore saved quiz session from sessionStorage on load
  useEffect(() => {
    if (!quizData || typeof window === "undefined") return;
    const sessionKey = `anhsensei_quiz_session_${quizIdStr}`;
    const savedSession = sessionStorage.getItem(sessionKey);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
        if (typeof parsed.currentIndex === "number") setCurrentIndex(parsed.currentIndex);
        if (typeof parsed.timeLeft === "number" && parsed.timeLeft > 0) setTimeLeft(parsed.timeLeft);
        if (parsed.checkedQuestions) setCheckedQuestions(parsed.checkedQuestions);
        if (parsed.flaggedQuestions) setFlaggedQuestions(parsed.flaggedQuestions);
      } catch (e) {
        console.error("Failed to parse quiz session", e);
      }
    }
  }, [quizData, quizIdStr]);

  // Auto-save ongoing quiz session to sessionStorage on every change
  useEffect(() => {
    if (!quizData || typeof window === "undefined") return;
    const sessionKey = `anhsensei_quiz_session_${quizIdStr}`;
    const sessionPayload = {
      quizData,
      isQuizPublished,
      userAnswers,
      currentIndex,
      timeLeft,
      checkedQuestions,
      flaggedQuestions,
      result,
    };
    sessionStorage.setItem(sessionKey, JSON.stringify(sessionPayload));
  }, [userAnswers, currentIndex, timeLeft, checkedQuestions, flaggedQuestions, quizData, isQuizPublished, result, quizIdStr]);

  // Countdown Timer
  useEffect(() => {
    if (!quizData || result) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizData, result]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Web Audio API Sound Synthesizers for Correct & Wrong answer feedback (Louder Volume)
  const playSuccessSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Tone 1 (Joyful high note)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain1.gain.setValueAtTime(0.45, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.25);

      // Tone 2 (Upper chord burst)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.1); // G5
      gain2.gain.setValueAtTime(0.55, ctx.currentTime + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.1);
      osc2.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  };

  const playErrorSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Tone 1 (Gentle low warning buzz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3
      gain1.gain.setValueAtTime(0.35, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);

      // Tone 2 (Lower pitch tone)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime + 0.12); // E3
      gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.12);
      osc2.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  // Audio Play helper
  const playAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start Quiz Attempt (Hybrid Strategy: Admin Question Bank Priority -> Smart Vocabulary Generator Fallback)
  const startQuizForMode = async (mode: QuizModeType, isForceReset = false) => {
    try {
      const sessionKey = `anhsensei_quiz_session_${quizIdStr}`;

      // 1. Always fetch live publication status from backend first
      let isPublished = false;
      try {
        const infoRes = await fetch(`/api/v1/admin/question-bank/quiz-info/lesson/${quizIdStr}`).catch(() => null);
        isPublished = infoRes && infoRes.ok ? (await infoRes.json())?.data?.status === "PUBLISHED" : false;
        setIsQuizPublished(isPublished);
      } catch (e) {}

      // 2. Check if a valid session exists in sessionStorage matching current publication status
      if (typeof window !== "undefined" && !isForceReset) {
        const savedSession = sessionStorage.getItem(sessionKey);
        if (savedSession) {
          try {
            const parsed = JSON.parse(savedSession);
            const sessionIsPublished = typeof parsed.isQuizPublished === "boolean" ? parsed.isQuizPublished : isPublished;

            // ONLY restore session if publication status in session matches current backend status!
            if (sessionIsPublished === isPublished && parsed.quizData && parsed.quizData.questions && parsed.quizData.questions.length > 0) {
              setQuizData(parsed.quizData);
              if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
              if (typeof parsed.currentIndex === "number") setCurrentIndex(parsed.currentIndex);
              if (typeof parsed.timeLeft === "number" && parsed.timeLeft > 0) setTimeLeft(parsed.timeLeft);
              if (parsed.checkedQuestions) setCheckedQuestions(parsed.checkedQuestions);
              if (parsed.flaggedQuestions) setFlaggedQuestions(parsed.flaggedQuestions);
              if (parsed.result) setResult(parsed.result);
              setSelectedMode(mode);
              setLoading(false);
              return;
            }
          } catch (e) {}
        }
      }

      if (typeof window !== "undefined") {
        sessionStorage.removeItem(sessionKey);
      }
      setSelectedMode(mode);
      setLoading(true);
      setError(null);
      setCurrentIndex(0);

      let adminQuestions: QuestionItem[] = [];
      // ONLY load Admin Question Bank if Admin explicitly clicked "PUBLISHED"!
      if (isPublished) {
          const adminRes = await fetch(`/api/v1/admin/question-bank/lesson/${quizIdStr}`);
          if (adminRes.ok) {
            const listData = await adminRes.json();
            const rawList = Array.isArray(listData) ? listData : listData.data || listData.content || [];
            
            // Filter out broken / empty questions that don't have real Japanese text or options
            const validRawList = rawList.filter((q: any) => {
              const hasRealJp = q.japaneseText && q.japaneseText.trim().length > 0 && !q.japaneseText.includes("Câu hỏi #");
              const hasOptions = q.options && Array.isArray(q.options) && q.options.length > 0;
              return hasRealJp && hasOptions;
            });

            if (validRawList.length > 0) {
              let filteredList = validRawList;
              if (reqCategory !== "ALL" && reqCategory !== "FULL") {
                const matches = validRawList.filter((q: any) => (q.category || "VOCAB").toUpperCase() === reqCategory);
                if (matches.length > 0) filteredList = matches;
              }

              // If Admin created > 30 questions, randomly sample 30 questions from Admin bank
              let targetList = filteredList;
              if (filteredList.length > 30) {
                targetList = [...filteredList].sort(() => Math.random() - 0.5).slice(0, 30);
              }

              adminQuestions = targetList.map((q: any, idx: number) => {
                let mainJpText = q.japaneseText;
                if (!mainJpText || !mainJpText.trim()) {
                  mainJpText = q.prompt || `Câu hỏi #${idx + 1}`;
                }

                let opts: QuestionOption[] = [];
                if (q.options && Array.isArray(q.options) && q.options.length > 0) {
                  opts = q.options.map((opt: any, oIdx: number) => ({
                    optionId: opt.optionId || (idx * 10 + oIdx + 1),
                    optionText: opt.optionText || "Đáp án",
                    isCorrect: opt.isCorrect !== undefined ? !!opt.isCorrect : !!opt.correct,
                  }));
                }

                if (opts.length === 0) {
                  opts = [
                    { optionId: 1, optionText: q.explanation || "Đáp án đúng A", isCorrect: true },
                    { optionId: 2, optionText: "Phương án B", isCorrect: false },
                    { optionId: 3, optionText: "Phương án C", isCorrect: false },
                    { optionId: 4, optionText: "Phương án D", isCorrect: false },
                  ];
                }

                let correctStr = q.correctAnswerText || "";
                if (!correctStr && q.options && Array.isArray(q.options)) {
                  const found = q.options.find((o: any) => o.isCorrect || o.correct);
                  if (found) correctStr = found.optionText;
                }
                if (!correctStr) correctStr = opts.find((o) => o.isCorrect)?.optionText || opts[0]?.optionText || "";

                return {
                  questionId: q.questionId || (idx + 1),
                  attemptAnswerId: idx + 1,
                  questionType: q.questionType || "MULTIPLE_CHOICE",
                  category: q.category || "VOCAB",
                  prompt: q.prompt || "CHỌN NGHĨA ĐÚNG CỦA CÂU TRÊN",
                  japaneseText: mainJpText,
                  furiganaText: q.furiganaText || "",
                  aiHintText: q.explanation ? `💡 ${q.explanation}` : "💡 Đọc kỹ đề bài trước khi chọn.",
                  audioText: q.audioText || mainJpText,
                  audioUrl: q.audioUrl || "",
                  transcript: q.transcript || "",
                  validAnswers: q.validAnswers || "",
                  explanation: q.explanation || `Đáp án đúng là: ${correctStr}`,
                  correctAnswerText: correctStr,
                  options: opts,
                };
              });
            }
          }
        }

      // 2. Fallback Generator (Auto-pad extra random questions up to 30 if Admin Bank has less than 30)
      let extraQuestionsNeeded = 30 - adminQuestions.length;
      const combinedQuestions: QuestionItem[] = [...adminQuestions];

      if (extraQuestionsNeeded > 0) {
        const [vocabRes, kanjiRes, grammarRes] = await Promise.all([
          fetch(`/api/v1/curriculum/lessons/${quizIdStr}/vocabularies`).catch(() => null),
          fetch(`/api/v1/curriculum/lessons/${quizIdStr}/kanji`).catch(() => null),
          fetch(`/api/v1/curriculum/lessons/${quizIdStr}/grammar`).catch(() => null),
        ]);

        const vocabs = vocabRes && vocabRes.ok ? await vocabRes.json() : [];
        const kanjis = kanjiRes && kanjiRes.ok ? await kanjiRes.json() : [];
        const grammars = grammarRes && grammarRes.ok ? await grammarRes.json() : [];

        const includeVocab = reqCategory === "ALL" || reqCategory === "FULL" || reqCategory === "VOCAB";
        const includeKanji = reqCategory === "ALL" || reqCategory === "FULL" || reqCategory === "KANJI";
        const includeGrammar = reqCategory === "ALL" || reqCategory === "FULL" || reqCategory === "GRAMMAR";

        // Shuffle vocabs randomly so every generated test has completely different vocabulary items
        const shuffledVocabs = vocabs && vocabs.length > 0 ? [...vocabs].sort(() => Math.random() - 0.5) : [];

        // Ensure combinedQuestions reaches EXACTLY 30 questions with 4 randomized question formats
        let loopCount = 0;
        const isDemo = (item: any) => {
          const m = (item.meaningVi || "").toLowerCase();
          const w = (item.word || item.kana || "").toLowerCase();
          return m.includes("cái này") || m.includes("cái đó") || m.includes("cái kia") || m.includes("cái nào") || m.includes("cái") || w.includes("これ") || w.includes("それ") || w.includes("あれ") || w.includes("どれ");
        };

        while (combinedQuestions.length < 30 && loopCount < 100) {
          loopCount++;
          const targetIdx = combinedQuestions.length;

          if (shuffledVocabs.length > 0) {
            const v = shuffledVocabs[targetIdx % shuffledVocabs.length];
            const vIsDemo = isDemo(v);
            const validCandidates = shuffledVocabs.filter((other: any) => {
              if (other.vocabularyId === v.vocabularyId) return false;
              return isDemo(other) === vIsDemo;
            });

            const shuffled = [...validCandidates].sort(() => Math.random() - 0.5);
            const wrongDistractors = shuffled.slice(0, 3);
            const mainWord = v.word || v.kana;
            const kanaWord = v.kana || v.word;

            // Randomize question format choice for maximum variety
            const formatChoice = (targetIdx + Math.floor(Math.random() * 4)) % 4; // 0: MULTIPLE_CHOICE, 1: VI_TO_JP, 2: LISTENING, 3: TYPING

            if (formatChoice === 0) {
              // 1. MULTIPLE_CHOICE: Japanese word -> Select Vietnamese meaning
              combinedQuestions.push({
                questionId: 10000 + targetIdx,
                attemptAnswerId: targetIdx + 1,
                questionType: "MULTIPLE_CHOICE",
                category: "VOCAB",
                prompt: "📖 [TỪ VỰNG] CHỌN NGHĨA TIẾNG VIỆT ĐÚNG CỦA TỪ TRÊN",
                japaneseText: mainWord,
                furiganaText: kanaWord !== mainWord ? kanaWord : "",
                aiHintText: `💡 Từ vựng Bài #${quizIdStr}: ${mainWord}`,
                audioText: mainWord,
                transcript: `${mainWord} (${kanaWord}) : ${v.meaningVi}`,
                explanation: `Nghĩa tiếng Việt của ${mainWord} là: ${v.meaningVi}`,
                correctAnswerText: v.meaningVi,
                options: [
                  { optionId: 1, optionText: v.meaningVi, isCorrect: true },
                  ...wrongDistractors.map((d: any, dIdx: number) => ({ optionId: dIdx + 2, optionText: d.meaningVi || "Nghĩa khác", isCorrect: false })),
                ].sort(() => Math.random() - 0.5),
              });
            } else if (formatChoice === 1) {
              // 2. VI_TO_JP: Vietnamese meaning -> Select Japanese word
              combinedQuestions.push({
                questionId: 10000 + targetIdx,
                attemptAnswerId: targetIdx + 1,
                questionType: "VI_TO_JP",
                category: "VOCAB",
                prompt: "📖 [TỪ VỰNG] CHỌN TỪ TIẾNG NHẬT ĐÚNG CHO NGHĨA NÀY",
                japaneseText: `「 ${v.meaningVi} 」`,
                furiganaText: "",
                aiHintText: `💡 Hãy tìm từ tiếng Nhật mang nghĩa: ${v.meaningVi}`,
                audioText: mainWord,
                transcript: `${v.meaningVi} ➔ ${mainWord} (${kanaWord})`,
                explanation: `Từ tiếng Nhật cho nghĩa 「 ${v.meaningVi} 」 là: ${mainWord} (${kanaWord})`,
                correctAnswerText: mainWord,
                options: [
                  { optionId: 1, optionText: mainWord, isCorrect: true },
                  ...wrongDistractors.map((d: any, dIdx: number) => ({ optionId: dIdx + 2, optionText: d.word || d.kana || "Từ khác", isCorrect: false })),
                ].sort(() => Math.random() - 0.5),
              });
            } else if (formatChoice === 2) {
              // 3. LISTENING: Audio player only -> Select Japanese & Vietnamese meaning
              combinedQuestions.push({
                questionId: 10000 + targetIdx,
                attemptAnswerId: targetIdx + 1,
                questionType: "LISTENING",
                category: "VOCAB",
                prompt: "🎧 [NGHE TIẾNG NHẬT] NGHE ÂM THANH VÀ CHỌN ĐÁP ÁN ĐÚNG",
                japaneseText: mainWord,
                furiganaText: kanaWord,
                aiHintText: "💡 Bấm nút nghe phát âm và chọn đáp án chính xác.",
                audioText: mainWord,
                transcript: `Nghe: ${mainWord} (${kanaWord}) - Nghĩa: ${v.meaningVi}`,
                explanation: `Từ vừa phát âm là: ${mainWord} (${v.meaningVi})`,
                correctAnswerText: `${mainWord} (${v.meaningVi})`,
                options: [
                  { optionId: 1, optionText: `${mainWord} (${v.meaningVi})`, isCorrect: true },
                  ...wrongDistractors.map((d: any, dIdx: number) => ({ optionId: dIdx + 2, optionText: `${d.word || d.kana} (${d.meaningVi || "Nghĩa khác"})`, isCorrect: false })),
                ].sort(() => Math.random() - 0.5),
              });
            } else {
              // 4. TYPING: Vietnamese meaning -> Type Japanese word
              combinedQuestions.push({
                questionId: 10000 + targetIdx,
                attemptAnswerId: targetIdx + 1,
                questionType: "TYPING",
                category: "VOCAB",
                prompt: "⌨️ [LUYỆN GÕ] Gõ từ tiếng Nhật tương ứng với nghĩa dưới đây",
                japaneseText: `「 ${v.meaningVi} 」`,
                furiganaText: "",
                aiHintText: `💡 Gõ chữ Hiragana hoặc phiên âm Romaji (Ví dụ: ${kanaWord})`,
                audioText: kanaWord,
                transcript: `${v.meaningVi} ➔ ${kanaWord} / ${mainWord}`,
                explanation: `Đáp án đúng là: ${kanaWord} / ${mainWord}`,
                correctAnswerText: kanaWord,
                validAnswers: JSON.stringify([kanaWord, mainWord]),
                options: [
                  { optionId: 1, optionText: kanaWord, isCorrect: true },
                  ...wrongDistractors.map((d: any, dIdx: number) => ({ optionId: dIdx + 2, optionText: d.kana || d.word || "Từ khác", isCorrect: false })),
                ],
              });
            }
          } else {
            combinedQuestions.push({
              questionId: 10000 + targetIdx,
              attemptAnswerId: targetIdx + 1,
              questionType: "MULTIPLE_CHOICE",
              category: "VOCAB",
              prompt: `📖 [TỪ VỰNG] CHỌN NGHĨA ĐÚNG CỦA CÂU #${targetIdx + 1}`,
              japaneseText: "私 (わたし)",
              furiganaText: "わたし",
              aiHintText: "💡 Từ vựng xưng hô cơ bản.",
              audioText: "わたし",
              transcript: "私 (わたし) : Tôi",
              explanation: "Nghĩa đúng của 私 là Tôi.",
              correctAnswerText: "Tôi",
              options: [
                { optionId: 1, optionText: "Tôi", isCorrect: true },
                { optionId: 2, optionText: "Bạn", isCorrect: false },
                { optionId: 3, optionText: "Thầy giáo", isCorrect: false },
                { optionId: 4, optionText: "Học sinh", isCorrect: false },
              ].sort(() => Math.random() - 0.5),
            });
          }
        }
      }

      let realAttemptId = Date.now();
      try {
        const startRes = await apiClient<any>(`/learning/quizzes/${quizIdStr}/start`, { method: "POST" });
        if (startRes && startRes.data && startRes.data.attemptId) {
          realAttemptId = startRes.data.attemptId;
        }
      } catch (e) {
        console.warn("Backend quiz start call fallback:", e);
      }

      const quizPayload: StartQuizData = {
        attemptId: realAttemptId,
        quizId: Number(quizIdStr),
        title: `Quiz Kiểm Tra Bài #${quizIdStr}`,
        description: "Bài kiểm tra đánh giá kiến thức bài học",
        passScore: 70,
        timeLimitMinutes: 10,
        questions: combinedQuestions.slice(0, 30),
      };

      setQuizData(quizPayload);
      setTimeLeft((quizPayload.timeLimitMinutes || 10) * 60);
    } catch (err: any) {
      setError(err.message || "Không thể bắt đầu bài Quiz này.");
    } finally {
      setLoading(false);
    }
  };

  // Kana to Romaji Mapping for flexible Romaji input evaluation
  const KANA_TO_ROMAJI: Record<string, string> = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n",
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo",
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po",
    "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo",
    "しゃ": "sha", "しゅ": "shu", "しょ": "sho",
    "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho",
    "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo",
    "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo",
    "みゃ": "mya", "みゅ": "myu", "みょ": "myo",
    "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo",
    "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo",
    "じゃ": "ja", "じゅ": "ju", "じょ": "jo",
    "びゃ": "bya", "びゅ": "byu", "びょ": "byo",
    "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo"
  };

  const katakanaToHiragana = (str: string): string => {
    if (!str) return "";
    return str.replace(/[\u30a1-\u30f6]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );
  };

  const convertKanaToRomaji = (kanaStr: string): string => {
    if (!kanaStr) return "";
    const hiraStr = katakanaToHiragana(kanaStr);
    let res = "";
    let i = 0;
    while (i < hiraStr.length) {
      if (i + 1 < hiraStr.length) {
        const pair = hiraStr.slice(i, i + 2);
        if (KANA_TO_ROMAJI[pair]) {
          res += KANA_TO_ROMAJI[pair];
          i += 2;
          continue;
        }
      }
      const single = hiraStr[i];
      if (single === "っ" && i + 1 < hiraStr.length) {
        const nextPair = i + 2 < hiraStr.length ? KANA_TO_ROMAJI[hiraStr.slice(i + 1, i + 3)] : null;
        const nextSingle = KANA_TO_ROMAJI[hiraStr[i + 1]];
        const nextRom = nextPair || nextSingle || "";
        if (nextRom) {
          res += nextRom[0];
        }
        i++;
        continue;
      }
      res += KANA_TO_ROMAJI[single] || single;
      i++;
    }
    return res.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  const extractKanaAndConvertToRomaji = (text: string): string[] => {
    if (!text) return [];
    const results: string[] = [];
    const kanaMatches = text.match(/[\u3040-\u30ff]+/g);
    if (kanaMatches) {
      for (const k of kanaMatches) {
        const rom = convertKanaToRomaji(k);
        if (rom) results.push(rom);
      }
    }
    const rawRom = convertKanaToRomaji(text);
    if (rawRom) results.push(rawRom);
    return results;
  };

  const checkIsAnswerCorrect = (q: QuestionItem, rawUserAns?: string): boolean => {
    if (!rawUserAns || !rawUserAns.trim()) return false;
    const typed = rawUserAns.trim().toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, "");
    const typedHira = katakanaToHiragana(typed);

    const correctOptionTexts = q.options
      ? q.options.filter((o) => o.isCorrect || (o as any).correct).map((o) => o.optionText)
      : [];

    const candidateTargets: string[] = [
      q.correctAnswerText || "",
      q.audioText || "",
      q.transcript || "",
      q.explanation || "",
      ...correctOptionTexts,
    ];

    if (q.validAnswers) {
      try {
        const parsed = JSON.parse(q.validAnswers);
        if (Array.isArray(parsed)) candidateTargets.push(...parsed.map(String));
        else if (typeof parsed === "string") candidateTargets.push(parsed);
      } catch {
        candidateTargets.push(q.validAnswers);
      }
    }

    for (const target of candidateTargets) {
      if (!target) continue;
      const cleanTarget = target.trim().toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, "");
      const cleanTargetHira = katakanaToHiragana(cleanTarget);
      
      if (typed === cleanTarget || typed === target.trim().toLowerCase() || typedHira === cleanTargetHira) return true;

      const romajiList = extractKanaAndConvertToRomaji(target);
      if (romajiList.some((r) => r && (typed === r || typed.replace(/[^a-z0-9]/g, "") === r))) {
        return true;
      }
    }

    return false;
  };

  // Check answer instantly for current question
  const handleCheckCurrentQuestion = (currentQ?: QuestionItem) => {
    if (!currentQ) return;
    const qId = currentQ.attemptAnswerId;
    const selectedAns = userAnswers[qId];

    if (!selectedAns) {
      setCheckWarning("⚠️ Vui lòng chọn hoặc gõ đáp án trước khi bấm Kiểm tra!");
      setTimeout(() => setCheckWarning(""), 3000);
      return;
    }

    setCheckWarning("");
    setCheckedQuestions((prev) => ({ ...prev, [qId]: true }));

    const isCorrect = checkIsAnswerCorrect(currentQ, selectedAns);

    if (isCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }

    if (currentQ.audioText && isCorrect) {
      playAudio(currentQ.audioText);
    }
  };

  // Submit Attempt for Server-side Evaluation
  const handleSubmitQuiz = async () => {
    if (!quizData) return;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`anhsensei_quiz_session_${quizIdStr}`);
    }
    try {
      setSubmitting(true);
      setShowSubmitModal(false);

      let res: any;
      try {
        res = await apiClient<any>(`/learning/quizzes/attempts/${quizData.attemptId}/submit`, {
          method: "POST",
          body: JSON.stringify(userAnswers),
        });
        if (!res || !res.success || !res.data) {
          throw new Error("Submit API returned unsuccessful response");
        }
      } catch {
        // Local scoring evaluation
        let correctCount = 0;
        const answerDetails: AnswerDetail[] = quizData.questions.map((q) => {
          const uAns = (userAnswers[q.attemptAnswerId] || "").trim();
          const isCorrect = checkIsAnswerCorrect(q, uAns);
          if (isCorrect) correctCount++;

          return {
            attemptAnswerId: q.attemptAnswerId,
            prompt: q.prompt,
            userAnswer: uAns,
            isCorrect,
            explanation: q.explanation,
            transcript: q.transcript,
          };
        });

        const total = quizData.questions.length;
        const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

        res = {
          data: {
            attemptId: quizData.attemptId,
            score,
            passScore: quizData.passScore || 70,
            passed: score >= (quizData.passScore || 70),
            correctCount,
            totalCount: total,
            answers: answerDetails,
          }
        };
      }

      setResult(res.data);

      // Post-submission processing: Sync progress & activity on Pass
      if (res.data && res.data.passed) {
        if (typeof window !== "undefined") {
          localStorage.setItem(`completed_lesson_${quizIdStr}`, "100");
        }

        apiClient("/learner/progress", {
          method: "POST",
          body: JSON.stringify({
            lessonId: Number(quizIdStr),
            status: "COMPLETED",
            progressPercentage: 100,
          }),
        }).catch(() => {});

        apiClient("/learner/activities", {
          method: "POST",
          body: JSON.stringify({
            contentType: "QUIZ",
            contentId: Number(quizIdStr),
            durationSeconds: Math.max(10, 600 - timeLeft),
          }),
        }).catch(() => {});

        playCatMeowSound();
      }
    } catch (err: any) {
      alert("Lỗi khi nộp bài Quiz: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Next Lesson Navigation Resolution
  const handleGoToNextLesson = async () => {
    const currentNum = Number(quizIdStr);
    const nextNum = currentNum + 1;
    if (nextNum > 50) {
      router.push("/levels");
      return;
    }

    try {
      // Check if next lesson has published quiz
      const qRes = await fetch(`http://localhost:8080/api/v1/admin/question-bank/lesson/${nextNum}`);
      if (qRes.ok) {
        router.push(`/quizzes/${nextNum}`);
      } else {
        router.push(`/lessons/${nextNum}`);
      }
    } catch {
      router.push(`/lessons/${nextNum}`);
    }
  };



  // 2. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 text-[#76685F] font-bold">
        Đang khởi tạo phiên làm bài Quiz...
      </div>
    );
  }

  const handleGenerateNewRandomQuiz = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`anhsensei_quiz_session_${quizIdStr}`);
    }
    setUserAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setResult(null);
    startQuizForMode(selectedMode || "MULTIPLE_CHOICE", true);
  };

  const handleRetakeSameQuiz = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`anhsensei_quiz_session_${quizIdStr}`);
    }
    setUserAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setResult(null);
    setTimeLeft((quizData?.timeLimitMinutes || 10) * 60);

    if (quizData && quizData.questions && quizData.questions.length > 0) {
      // 1. Shuffle the 30 questions order
      const shuffledQuestions = [...quizData.questions].sort(() => Math.random() - 0.5);

      // 2. Shuffle option positions (A, B, C, D) inside each question & re-assign attemptAnswerId
      const updatedQuestions = shuffledQuestions.map((q, idx) => ({
        ...q,
        attemptAnswerId: idx + 1,
        options: q.options ? [...q.options].sort(() => Math.random() - 0.5) : [],
      }));

      setQuizData({
        ...quizData,
        questions: updatedQuestions,
      });
    }
  };

  // 4. Taking Quiz Exam (Step-by-Step Single Question View)
  const currentQuestion = quizData?.questions[currentIndex];
  const totalQuestions = quizData?.questions.length || 30;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const answeredCount = quizData ? Object.values(userAnswers).filter((v) => !!v && v.trim().length > 0).length : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2421] p-4 sm:p-8 font-sans flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-6 sm:space-y-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/lessons/${quizIdStr}`}
            className="px-3.5 py-1.5 bg-white border border-[#DED3C8] text-[#76685F] hover:text-[#C65D4B] rounded-2xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer hover:border-[#C65D4B]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold">Về bài học</span>
          </Link>

          <div className="text-xs font-black text-[#C65D4B] bg-[#FAF3EB] px-4 py-1.5 rounded-full border border-[#DED3C8] shadow-2xs">
            N5 • Bài #{quizIdStr}
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#76685F] bg-white px-3.5 py-1.5 rounded-full border border-[#DED3C8] shadow-2xs">
            <span>⏱️</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* SLEEK & COMPACT QUESTION PALETTE STRIP */}
        {quizData && quizData.questions.length > 0 && (
          <div className="bg-white/90 backdrop-blur-md border border-[#DED3C8] rounded-3xl p-3.5 sm:p-4 shadow-sm max-w-xl mx-auto space-y-2.5 transition-all">
            {/* Palette Header Summary */}
            <div className="flex items-center justify-between text-xs font-bold text-[#76685F] px-1">
              <div className="flex items-center gap-2">
                <span className="text-[#231917] font-black">Danh sách câu hỏi</span>
                <span className="text-[10px] bg-[#FAF3EB] px-2.5 py-0.5 rounded-full border border-[#DED3C8] text-[#C65D4B] font-extrabold">
                  {result
                    ? `Kết quả: ${result.correctCount}/${quizData.questions.length} đúng (${result.score}%)`
                    : `${answeredCount}/${quizData.questions.length} đã trả lời`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaletteExpanded((prev) => !prev)}
                  className="text-[11px] text-[#C65D4B] hover:text-[#B54F3E] font-extrabold flex items-center gap-1 cursor-pointer transition-colors bg-[#F5EFEA] hover:bg-[#EFE8E1] px-2.5 py-1 rounded-xl"
                >
                  <span>{isPaletteExpanded ? "Thu gọn ▲" : "Xem tất cả ▼"}</span>
                </button>

                {result ? (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {!isQuizPublished && (
                      <button
                        type="button"
                        onClick={handleGenerateNewRandomQuiz}
                        className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-[11px] rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer hover:scale-105"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Đề 30 câu mới</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleRetakeSameQuiz}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-[11px] rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer hover:scale-105"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isQuizPublished ? "Làm lại bài thi chính thức" : "Ôn lại đề cũ"}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-[11px] rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer hover:scale-105"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Nộp bài ngay</span>
                  </button>
                )}
              </div>
            </div>

            {/* Legend Indicators */}
            <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-[#76685F] pt-0.5 pb-1.5 border-b border-[#F5EFEA]">
              {result ? (
                <>
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs"/> Trả lời đúng
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-2xs"/> Trả lời sai / Bỏ trống
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs"/> Đã làm
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-2xs"/> Chưa chắc
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EFE8E1] border border-[#DED3C8] inline-block"/> Chưa làm
                  </span>
                </>
              )}
            </div>

            {/* Pill Container (Compact scrollable strip OR expanded grid) */}
            <div
              className={`flex flex-wrap items-center justify-center gap-1.5 pt-1 transition-all ${
                !isPaletteExpanded ? "max-h-[76px] overflow-y-auto" : "max-h-[300px] overflow-y-auto"
              }`}
            >
              {quizData.questions.map((q, qIdx) => {
                const qId = q.attemptAnswerId;
                const isAnswered = !!userAnswers[qId] && userAnswers[qId].trim().length > 0;
                const isFlagged = !!flaggedQuestions[qId];
                const isCurrent = currentIndex === qIdx;

                let badgeStyles = "bg-[#FAF5F0] border-[#EFE8E1] text-[#76685F] hover:bg-[#F5EFEA]"; // Default (Chưa làm - Muted Neutral)

                if (result) {
                  const ansDetail = result.answers.find((a) => a.attemptAnswerId === qId);
                  const isCorrect = ansDetail ? ansDetail.isCorrect : false;
                  if (isCurrent) {
                    badgeStyles = isCorrect
                      ? "bg-emerald-600 border-emerald-600 text-white font-black shadow-md ring-2 ring-emerald-400/60 scale-105"
                      : "bg-rose-600 border-rose-600 text-white font-black shadow-md ring-2 ring-rose-400/60 scale-105";
                  } else {
                    badgeStyles = isCorrect
                      ? "bg-emerald-500 border-emerald-600 text-white font-extrabold shadow-2xs"
                      : "bg-rose-500 border-rose-600 text-white font-extrabold shadow-2xs";
                  }
                } else if (isCurrent) {
                  badgeStyles = "bg-[#C65D4B] border-[#C65D4B] text-white font-black shadow-md scale-105 ring-2 ring-[#C65D4B]/40"; // Active
                } else if (isFlagged) {
                  badgeStyles = "bg-amber-400 border-amber-500 text-amber-950 font-black shadow-2xs"; // Chưa chắc (Amber)
                } else if (isAnswered) {
                  badgeStyles = "bg-emerald-500 border-emerald-600 text-white font-bold shadow-2xs"; // Đã làm (Emerald)
                }

                return (
                  <button
                    key={qId}
                    type="button"
                    onClick={() => setCurrentIndex(qIdx)}
                    title={`Câu ${qIdx + 1}: ${
                      result
                        ? result.answers.find((a) => a.attemptAnswerId === qId)?.isCorrect
                          ? "Đúng"
                          : "Sai"
                        : isFlagged
                        ? "Chưa chắc"
                        : isAnswered
                        ? "Đã làm"
                        : "Chưa làm"
                    }`}
                    className={`w-7.5 h-7.5 rounded-xl text-xs border font-bold transition-all flex items-center justify-center relative cursor-pointer ${badgeStyles}`}
                  >
                    <span>{qIdx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* IN-PLACE RESULT SUMMARY BANNER CARD */}
        {result && (
          <div
            className={`border-2 p-5 sm:p-6 rounded-3xl space-y-4 shadow-xl max-w-xl mx-auto transition-all animate-fadeIn ${
              result.passed
                ? "bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-300 text-emerald-950"
                : "bg-gradient-to-r from-rose-50 via-white to-rose-50 border-rose-300 text-rose-950"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-white shrink-0">
                  {result.passed ? <Trophy className="w-6 h-6 text-amber-500" /> : <AlertCircle className="w-6 h-6 text-rose-500" />}
                </div>
                <div>
                  <h3 className="text-base font-black font-sans tracking-tight">
                    {result.passed ? "CHÚC MỪNG! BẠN ĐÃ ĐẠT KẾT QUẢ!" : "CHƯA ĐẠT! HÃY CỐ GẮNG THỬ LẠI!"}
                  </h3>
                  <p className="text-xs font-black opacity-85">
                    Đúng: <span className="underline decoration-rose-400 font-extrabold">{result.correctCount} / {result.totalCount}</span> câu ({result.score}%)
                  </p>
                </div>
              </div>

              {result.passed && (
                <button
                  type="button"
                  onClick={() => setIsOmikujiOpen(true)}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Rút Quẻ</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-black/5">
              <Link
                href={`/lessons/${quizIdStr}`}
                className="px-4 py-2.5 bg-white border border-[#DED3C8] text-[#56423E] hover:text-[#C65D4B] font-extrabold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer hover:border-[#C65D4B]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Về bài học</span>
              </Link>

              {!isQuizPublished && (
                <button
                  type="button"
                  onClick={handleGenerateNewRandomQuiz}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sinh đề 30 câu mới</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleRetakeSameQuiz}
                className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isQuizPublished ? "Làm lại bài thi chính thức" : "Ôn lại đề cũ"}</span>
              </button>

              <button
                type="button"
                onClick={handleGoToNextLesson}
                className="px-5 py-2 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Bài tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Question Instruction Header & Interactive Controls */}
        <div className="flex flex-wrap items-center justify-between max-w-xl mx-auto px-1 gap-2">
          <h2 className="text-xs font-black text-[#8C7B70] tracking-widest uppercase">
            {currentQuestion?.prompt || "CHỌN NGHĨA ĐÚNG CỦA CÂU TRÊN"}
          </h2>

          {/* Bookmark Button */}
          {currentQuestion && (
            <button
              type="button"
              onClick={() => toggleFlagQuestion(currentQuestion.attemptAnswerId)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                flaggedQuestions[currentQuestion.attemptAnswerId]
                  ? "bg-amber-100 border border-amber-400 text-amber-900 shadow-2xs"
                  : "bg-white border-[#EFE8E1] text-[#76685F] hover:text-amber-700"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${flaggedQuestions[currentQuestion.attemptAnswerId] ? "fill-amber-500 text-amber-500" : ""}`} />
              <span>{flaggedQuestions[currentQuestion.attemptAnswerId] ? "Đã lưu (Chưa chắc)" : "Đánh dấu chưa chắc"}</span>
            </button>
          )}
        </div>

        {/* Central Prominent Card: Listening (Audio Only) vs Normal (Text Only) */}
        <div className="bg-white border-2 border-[#EADECF] p-8 sm:p-12 text-center rounded-3xl shadow-xs max-w-xl mx-auto space-y-4">
          {currentQuestion?.questionType === "LISTENING" ? (
            <div className="space-y-4 py-2">
              <div className="w-20 h-20 bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl mx-auto flex items-center justify-center animate-pulse">
                <Volume2 className="w-10 h-10 text-amber-600" />
              </div>
              <p className="text-sm font-black text-[#56423E]">
                🔊 Nút nghe âm thanh bài thi đang phát
              </p>
              <button
                type="button"
                onClick={() => playAudio(currentQuestion.audioText || currentQuestion.japaneseText || "")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-sm rounded-2xl shadow-md cursor-pointer transition-all hover:scale-105"
              >
                <Volume2 className="w-5 h-5 text-white" />
                <span>🔊 Bấm để nghe âm thanh câu hỏi</span>
              </button>
            </div>
          ) : (
            <div className="text-3xl sm:text-4xl font-extrabold text-[#231917] tracking-normal leading-relaxed font-sans">
              {showFurigana && currentQuestion?.furiganaText && currentQuestion.furiganaText !== currentQuestion.japaneseText ? (
                <ruby className="ruby-position-above">
                  {currentQuestion.japaneseText || currentQuestion.prompt}
                  <rt className="text-sm font-sans font-bold text-[#C65D4B] block tracking-normal mb-1">
                    {currentQuestion.furiganaText}
                  </rt>
                </ruby>
              ) : (
                <span className="tracking-normal">
                  {currentQuestion?.japaneseText || currentQuestion?.prompt || `Câu hỏi #${currentIndex + 1}`}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 2x2 Option Grid with A/B/C/D Badges */}
        {currentQuestion && (
          <div className="space-y-4 max-w-xl mx-auto">
            {/* Warning Message Toast */}
            {checkWarning && (
              <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-2xl text-xs font-bold text-center animate-bounce">
                {checkWarning}
              </div>
            )}

            {currentQuestion.questionType === "TYPING" ? (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    disabled={!!result || !!(currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId])}
                    value={userAnswers[currentQuestion.attemptAnswerId] || ""}
                    onChange={(e) =>
                      !result &&
                      !checkedQuestions[currentQuestion.attemptAnswerId] &&
                      setUserAnswers({
                        ...userAnswers,
                        [currentQuestion.attemptAnswerId]: e.target.value,
                      })
                    }
                    placeholder="⌨️ Nhập chữ Hiragana / Romaji hoặc bấm bàn phím ảo bên dưới..."
                    className="w-full p-4 sm:p-5 bg-white border-2 border-[#C65D4B]/40 focus:border-[#C65D4B] text-[#231917] font-black text-lg rounded-2xl shadow-sm outline-none transition-all placeholder:text-[#8C7B70]/60 placeholder:font-normal placeholder:text-xs sm:placeholder:text-sm pr-28 disabled:bg-slate-50 disabled:text-slate-700 disabled:cursor-not-allowed"
                  />
                  {!checkedQuestions[currentQuestion.attemptAnswerId] && !result && (
                    <button
                      type="button"
                      onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-[#C65D4B] bg-[#FAF3EB] hover:bg-[#F5E6D8] px-3 py-1.5 rounded-xl border border-[#C65D4B]/30 transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                    >
                      <span>⌨️ {showVirtualKeyboard ? "Đóng Bàn Phím" : "Mở Bàn Phím Ảo"}</span>
                    </button>
                  )}
                </div>

                {/* Interactive On-Screen Japanese Virtual Kana Keyboard */}
                {showVirtualKeyboard && !result && !(currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId]) && (
                  <div className="bg-[#FAF5F0] border-2 border-[#EADECF] p-4 rounded-3xl space-y-3 animate-fadeIn shadow-xs">
                    {/* Header Controls & Kana Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EADECF] pb-2.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block sm:inline">
                          🌸 BÀN PHÍM:
                        </span>
                        {[
                          { id: "HIRAGANA", label: "🌸 Hiragana" },
                          { id: "KATAKANA", label: "💮 Katakana" },
                          { id: "DAKUON", label: "☀️ Âm Đục / Ghép" },
                          { id: "ROMAJI", label: "⌨️ Romaji QWERTY" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setKanaTab(t.id as any)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              kanaTab === t.id
                                ? "bg-[#C65D4B] text-white shadow-xs"
                                : "bg-white border border-[#EADECF] text-[#76685F] hover:bg-white"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* Action Keys (Backspace & Clear & Space) */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const cur = userAnswers[currentQuestion.attemptAnswerId] || "";
                            setUserAnswers({
                              ...userAnswers,
                              [currentQuestion.attemptAnswerId]: cur + " ",
                            });
                          }}
                          className="px-2.5 py-1.5 bg-slate-100 border border-slate-300 text-slate-900 hover:bg-slate-200 font-extrabold text-xs rounded-xl cursor-pointer transition-all shadow-2xs"
                        >
                          ␣ Cách
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const cur = userAnswers[currentQuestion.attemptAnswerId] || "";
                            if (cur) {
                              setUserAnswers({
                                ...userAnswers,
                                [currentQuestion.attemptAnswerId]: Array.from(cur).slice(0, -1).join(""),
                              });
                            }
                          }}
                          className="px-2.5 py-1.5 bg-rose-100 border border-rose-300 text-rose-900 hover:bg-rose-200 font-extrabold text-xs rounded-xl cursor-pointer transition-all shadow-2xs"
                        >
                          ⌫ Xóa
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUserAnswers({
                              ...userAnswers,
                              [currentQuestion.attemptAnswerId]: "",
                            });
                          }}
                          className="px-2.5 py-1.5 bg-amber-100 border border-amber-300 text-amber-950 hover:bg-amber-200 font-extrabold text-xs rounded-xl cursor-pointer transition-all shadow-2xs"
                        >
                          🧹 Xóa hết
                        </button>
                      </div>
                    </div>

                    {/* Kana & Romaji Keypad Grid */}
                    <div className={`grid gap-1.5 pt-1 ${kanaTab === "ROMAJI" ? "grid-cols-10" : "grid-cols-5 sm:grid-cols-10"}`}>
                      {(kanaTab === "HIRAGANA"
                        ? [
                            "あ", "い", "う", "え", "お",
                            "か", "き", "く", "け", "こ",
                            "さ", "し", "す", "せ", "そ",
                            "た", "ち", "つ", "て", "と",
                            "な", "に", "ぬ", "ね", "の",
                            "は", "ひ", "ふ", "へ", "ほ",
                            "ま", "み", "む", "め", "も",
                            "や", "ゆ", "よ", "ら", "り",
                            "る", "れ", "ろ", "わ", "を",
                            "ん", "っ", "ぁ", "ぃ", "ぅ",
                            "ぇ", "ぉ", "ゃ", "ゅ", "ょ",
                            "ー", "〜", "゛", "゜", "？"
                          ]
                        : kanaTab === "KATAKANA"
                        ? [
                            "ア", "イ", "ウ", "エ", "オ",
                            "カ", "キ", "ク", "ケ", "コ",
                            "サ", "シ", "ス", "セ", "ソ",
                            "タ", "チ", "ツ", "テ", "ト",
                            "ナ", "ニ", "ヌ", "ネ", "ノ",
                            "ハ", "ヒ", "フ", "ヘ", "ホ",
                            "マ", "ミ", "ム", "メ", "モ",
                            "ヤ", "ユ", "ヨ", "ラ", "リ",
                            "ル", "レ", "ロ", "ワ", "ヲ",
                            "ン", "ッ", "ァ", "ィ", "ゥ",
                            "ェ", "ォ", "ャ", "ュ", "ョ",
                            "ー", "〜", "゛", "゜", "？"
                          ]
                        : kanaTab === "DAKUON"
                        ? [
                            "が", "ぎ", "ぐ", "げ", "ご",
                            "ざ", "じ", "ず", "ぜ", "ぞ",
                            "だ", "ぢ", "づ", "で", "ど",
                            "ば", "び", "ぶ", "べ", "ぼ",
                            "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
                            "きゃ", "きゅ", "きょ", "しゃ", "しゅ",
                            "しょ", "ちゃ", "ちゅ", "ちょ", "にゃ",
                            "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ",
                            "みゃ", "みゅ", "みょ", "りゃ", "りゅ",
                            "りょ", "ぎゃ", "ぎゅ", "ぎょ", "じゃ",
                            "じゅ", "じょ", "びゃ", "びゅ", "びょ",
                            "ぴゃ", "ぴゅ", "ぴょ", "ガ", "ギ",
                            "グ", "ゲ", "ゴ", "ザ", "ジ",
                            "ズ", "ゼ", "ゾ", "ダ", "ヂ",
                            "ヅ", "デ", "ド", "バ", "ビ",
                            "ブ", "ベ", "ボ", "パ", "ピ",
                            "プ", "ペ", "ポ", "キャ", "キュ",
                            "キョ", "シャ", "シュ", "ショ", "チャ"
                          ]
                        : [
                            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                            "a", "s", "d", "f", "g", "h", "j", "k", "l", "-",
                            "z", "x", "c", "v", "b", "n", "m", ",", ".", "?"
                          ]
                      ).map((char) => (
                        <button
                          key={char}
                          type="button"
                          onClick={() => {
                            const cur = userAnswers[currentQuestion.attemptAnswerId] || "";
                            setUserAnswers({
                              ...userAnswers,
                              [currentQuestion.attemptAnswerId]: cur + char,
                            });
                          }}
                          className="h-10 sm:h-11 bg-white hover:bg-[#F9ECE9] border-2 border-[#EADECF] hover:border-[#C65D4B] text-[#231917] hover:text-[#C65D4B] font-black text-sm sm:text-base rounded-xl transition-all shadow-2xs active:scale-95 flex items-center justify-center cursor-pointer"
                        >
                          {char}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options?.map((opt, oIdx) => {
                  const badge = ["A", "B", "C", "D"][oIdx] || `${oIdx + 1}`;
                  const isSelected = userAnswers[currentQuestion.attemptAnswerId] === opt.optionText;
                  const isChecked = !!result || checkedQuestions[currentQuestion.attemptAnswerId];
                  const isCorrectOpt = currentQuestion.correctAnswerText
                    ? opt.optionText.trim().toLowerCase() === currentQuestion.correctAnswerText.trim().toLowerCase()
                    : false;

                  let optionStyles = "bg-white hover:bg-[#FAF5F0] border-[#EFE8E1] text-[#231917]";
                  if (isChecked) {
                    if (isCorrectOpt) {
                      optionStyles = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs cursor-not-allowed";
                    } else if (isSelected && !isCorrectOpt) {
                      optionStyles = "bg-rose-50 border-rose-500 text-rose-900 shadow-xs cursor-not-allowed";
                    } else {
                      optionStyles = "bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed";
                    }
                  } else if (isSelected) {
                    optionStyles = "bg-[#F9ECE9] border-[#C65D4B] text-[#8C2D1D] shadow-sm";
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={isChecked}
                      onClick={() =>
                        !isChecked &&
                        setUserAnswers({
                          ...userAnswers,
                          [currentQuestion.attemptAnswerId]: opt.optionText,
                        })
                      }
                      className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between ${
                        isChecked ? "cursor-not-allowed" : "cursor-pointer"
                      } ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isChecked && isCorrectOpt
                              ? "bg-emerald-600 text-white"
                              : isChecked && isSelected && !isCorrectOpt
                              ? "bg-rose-600 text-white"
                              : isSelected
                              ? "bg-[#C65D4B] text-white"
                              : "bg-[#F5EFEA] text-[#76685F]"
                          }`}
                        >
                          {badge}
                        </span>
                        <span>{opt.optionText}</span>
                      </div>

                      {isChecked && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isChecked && isSelected && !isCorrectOpt && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                      {!isChecked && isSelected && <CheckCircle2 className="w-5 h-5 text-[#C65D4B] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Instant Feedback Card when Checked or Post-Submit */}
            {currentQuestion && (checkedQuestions[currentQuestion.attemptAnswerId] || result) && (() => {
              const isUserCorrect = checkIsAnswerCorrect(currentQuestion, userAnswers[currentQuestion.attemptAnswerId]);
              return (
                <div
                  className={`p-4 rounded-2xl border-2 space-y-1.5 animate-fadeIn ${
                    isUserCorrect
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-rose-50 border-rose-300 text-rose-900"
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-xs">
                    {isUserCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>CHÍNH XÁC! (+10 XP) 🎉 🐾</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>CHƯA CHÍNH XÁC!</span>
                      </>
                    )}
                  </div>

                  {currentQuestion.correctAnswerText && !isUserCorrect && (
                    <p className="text-xs font-bold text-rose-900">
                      Đáp án đúng là: <span className="underline">{currentQuestion.correctAnswerText}</span>
                    </p>
                  )}

                  {currentQuestion.explanation && (
                    <p className="text-xs font-medium opacity-90">
                      💡 {currentQuestion.explanation}
                    </p>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Bottom Action Navigation Buttons (Câu trước, Kiểm tra, Câu tiếp theo / Nộp bài) */}
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3 pt-4 pb-8 w-full">
          {/* 1. Nút "Câu trước" */}
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-white border border-[#EFE8E1] text-[#76685F] hover:text-[#C65D4B] shadow-xs cursor-pointer hover:border-[#C65D4B]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          {/* 2. Nút "Kiểm tra" (khi làm bài) HOẶC Status Badge (khi đã nộp bài) */}
          {result ? (
            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Đã xem kết quả câu #{currentIndex + 1}</span>
            </div>
          ) : (
            <button
              type="button"
              disabled={!!(currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId])}
              onClick={() => handleCheckCurrentQuestion(currentQuestion)}
              className={`px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-md transition-all ${
                currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId]
                  ? "bg-slate-400 text-white cursor-not-allowed opacity-80"
                  : "bg-[#8B6F5A] hover:bg-[#755C48] text-white cursor-pointer"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>
                {currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId]
                  ? "🔒 Đã kiểm tra (Đã khóa)"
                  : "Kiểm tra"}
              </span>
            </button>
          )}

          {/* 3. Nút "Câu tiếp theo" HOẶC "Về bài học" (khi đã nộp bài) HOẶC "Nộp bài ngay" */}
          {result ? (
            currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-5 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 hover:scale-105"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {!isQuizPublished && (
                  <button
                    type="button"
                    onClick={handleGenerateNewRandomQuiz}
                    className="px-4 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Sinh Đề Mới (30 Câu Mới)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleRetakeSameQuiz}
                  className="px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isQuizPublished ? "Làm lại bài thi chính thức" : "Ôn Lại Đề Cũ (Vừa Làm)"}</span>
                </button>
                <Link
                  href={`/lessons/${quizIdStr}`}
                  className="px-4 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 hover:scale-105"
                >
                  <span>Về bài học</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          ) : currentIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-5 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 hover:scale-105"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              disabled={submitting}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs rounded-2xl shadow-lg shadow-emerald-600/30 cursor-pointer transition-all flex items-center gap-2 hover:scale-105 ring-2 ring-emerald-400/40"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-200" />
              <span>{submitting ? "Đang nộp..." : "Nộp bài ngay 🛡️"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Submit Confirmation Backdrop Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 mx-auto bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black font-serif text-[#231917]">
                Xác Nhận Nộp Bài Quiz
              </h3>
              <p className="text-xs font-semibold text-[#76685F]">
                Bạn đã hoàn thành <strong className="text-[#231917] font-black">{answeredCount} / {totalQuestions}</strong> câu hỏi.
              </p>
            </div>

            {totalQuestions - answeredCount > 0 && (
              <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl text-xs text-amber-900 font-bold">
                ⚠️ Bạn vẫn còn {totalQuestions - answeredCount} câu chưa trả lời. Bạn có muốn nộp bài ngay bây giờ không?
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 bg-[#FAF5F0] hover:bg-[#F5EFEA] border border-[#DED3C8] text-[#76685F] font-extrabold text-xs rounded-2xl transition-all cursor-pointer"
              >
                ↩️ Tiếp tục làm
              </button>

              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
              >
                {submitting ? "Đang nộp..." : "✓ Xác Nhận Nộp"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Omikuji Fortune Modal */}
      <OmikujiFortuneModal
        isOpen={isOmikujiOpen}
        onClose={() => setIsOmikujiOpen(false)}
      />
    </div>
  );
}
