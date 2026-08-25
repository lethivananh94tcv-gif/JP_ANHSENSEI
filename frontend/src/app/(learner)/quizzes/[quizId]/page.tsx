"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { 
  CheckCircle2, AlertCircle, Trophy, RotateCcw, ArrowLeft, Volume2, Gamepad2, 
  Layers, Keyboard, Zap, Play, AlertTriangle, HelpCircle, Shuffle, ShieldCheck, ArrowRight,
  XCircle, Sparkles, Search, Bookmark, Flag, ChevronDown, ChevronUp, BookOpen, FileText, Frown, Smile
} from "lucide-react";
import Card3DTilt from "@/components/ui/Card3DTilt";
import { playCatMeowSound } from "@/lib/utils/catSound";
import OmikujiFortuneModal from "@/components/ui/OmikujiFortuneModal";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";

interface QuestionOption {
  optionId?: number;
  optionText: string;
}

interface QuestionItem {
  questionId: number;
  attemptAnswerId: number;
  questionType: string;
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

function formatOptionTextDisplay(
  optionText: string,
  questionType?: string,
  prompt?: string
): string {
  if (!optionText) return "";

  const trimmed = optionText.trim();
  const match = trimmed.match(/^(.+?)\s*\(([^)]+)\)$/);

  if (!match) return trimmed;

  const jpPart = match[1].trim();
  const viPart = match[2].trim();

  // If viPart is short romaji like "wa", "ga", "ni", "de"
  const isRomajiOnly = /^[a-z]+$/i.test(viPart) && viPart.length <= 4;
  if (isRomajiOnly) {
    return trimmed;
  }

  // Meaning questions or when prompt is Japanese (spoil prevention)
  const isMeaningQuestion =
    questionType === "JAPANESE_TO_MEANING" ||
    questionType === "LISTENING_TO_WORD" ||
    questionType === "LISTENING" ||
    (prompt && (
      prompt.toUpperCase().includes("NGHĨA") ||
      prompt.toLowerCase().includes("tiếng việt") ||
      prompt.toLowerCase().includes("nghĩa là gì")
    ));

  if (isMeaningQuestion) {
    return viPart;
  }

  if (prompt && prompt.includes(jpPart)) {
    return viPart;
  }

  const isJapaneseTargetQuestion =
    questionType === "MEANING_TO_JAPANESE" ||
    questionType === "HIRAGANA_TO_KANJI" ||
    questionType === "KANJI_TO_READING";

  if (isJapaneseTargetQuestion) {
    return jpPart;
  }

  return viPart;
}

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizIdStr = resolvedParams.quizId;
  const router = useRouter();

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

  // Track instant check status per question
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [checkWarning, setCheckWarning] = useState<string>("");

  // Track flagged/bookmarked questions ("chưa chắc")
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isPaletteExpanded, setIsPaletteExpanded] = useState<boolean>(false);

  // View mode for post-submit review: SINGLE vs FULL_LIST
  const [viewMode, setViewMode] = useState<"SINGLE" | "FULL_LIST">("SINGLE");

  // Interactive Furigana, AI Hint & Omikuji Fortune states
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [showAiHint, setShowAiHint] = useState<boolean>(false);
  const [isOmikujiOpen, setIsOmikujiOpen] = useState<boolean>(false);

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
    if (!quizData || result || typeof window === "undefined") return;
    const sessionKey = `anhsensei_quiz_session_${quizIdStr}`;
    const sessionPayload = {
      userAnswers,
      currentIndex,
      timeLeft,
      checkedQuestions,
      flaggedQuestions,
    };
    sessionStorage.setItem(sessionKey, JSON.stringify(sessionPayload));
  }, [userAnswers, currentIndex, timeLeft, checkedQuestions, flaggedQuestions, quizData, result, quizIdStr]);

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

  // Audio Play helper
  const playAudio = (text?: string, audioUrl?: string) => {
    if (!text && !audioUrl) return;
    playJapaneseTTS(text || "", audioUrl);
  };

  // Start Quiz Attempt (Hybrid Strategy: Admin Question Bank Priority -> Smart Vocabulary Generator Fallback)
  const startQuizForMode = async (mode: QuizModeType) => {
    try {
      setSelectedMode(mode);
      setLoading(true);
      setError(null);
      setCurrentIndex(0);

      // 1. Priority #1: Fetch 30 questions directly from Admin Question Bank for this lesson
      try {
        const qBankRes = await fetch(`http://localhost:8080/api/v1/admin/question-bank/lesson/${quizIdStr}`);
        if (qBankRes.ok) {
          const json = await qBankRes.json();
          const items = json.data || json;
          if (Array.isArray(items) && items.length > 0) {
            const formatted: QuestionItem[] = items.map((q: any, idx: number) => {
              const correctOpt = q.options?.find((o: any) => o.isCorrect)?.optionText || "";
              return {
                questionId: q.questionId || idx + 1,
                attemptAnswerId: idx + 1,
                questionType: q.questionType || "MULTIPLE_CHOICE",
                prompt: q.prompt || "CHỌN ĐÁP ÁN ĐÚNG",
                japaneseText: q.japaneseText || "",
                furiganaText: (q.questionType === "LISTENING_TO_WORD" || q.questionType === "MEANING_TO_JAPANESE") ? "" : (q.audioText || ""),
                aiHintText: `💡 Gợi ý câu hỏi Bài #${quizIdStr}`,
                audioText: q.audioText || q.japaneseText || "",
                transcript: q.transcript || "",
                explanation: q.explanation || `Đáp án đúng là: ${correctOpt}`,
                correctAnswerText: correctOpt,
                options: (q.options || []).map((o: any) => ({
                  optionId: o.optionId,
                  optionText: o.optionText,
                })),
              };
            });

            setQuizData({
              attemptId: Date.now(),
              quizId: Number(quizIdStr),
              title: `Quiz Kiểm Tra Bài #${quizIdStr}`,
              description: "Bài kiểm tra tổng hợp 30 câu hỏi trắc nghiệm JLPT",
              passScore: 70,
              timeLimitMinutes: 10,
              questions: formatted,
            });
            setTimeLeft(600);
            return;
          }
        }
      } catch (err) {
        console.warn("Lỗi tải Question Bank:", err);
      }

      // 2. Priority #2: Attempt Backend Quiz Attempt Start Endpoint
      let res: any;
      try {
        res = await apiClient<any>(`/learning/quizzes/${quizIdStr}/start`, { method: "POST" });
        if (res && res.data && res.data.questions && res.data.questions.length > 0) {
          setQuizData(res.data);
          if (res.data.timeLimitMinutes) {
            setTimeLeft(res.data.timeLimitMinutes * 60);
          }
          return;
        }
      } catch (err) {
        console.warn("Lỗi bắt đầu Quiz Attempt:", err);
      }

      // 3. Priority #3: Dynamic Generator from Lesson Curriculum (Vocab + Kanji + Grammar)
      const [vocabRes, kanjiRes, grammarRes] = await Promise.all([
        fetch(`http://localhost:8080/api/v1/curriculum/lessons/${quizIdStr}/vocabularies`).catch(() => null),
        fetch(`http://localhost:8080/api/v1/curriculum/lessons/${quizIdStr}/kanji`).catch(() => null),
        fetch(`http://localhost:8080/api/v1/curriculum/lessons/${quizIdStr}/grammar`).catch(() => null),
      ]);

      const parseJsonList = async (r: Response | null) => {
        if (!r || !r.ok) return [];
        const j = await r.json();
        if (Array.isArray(j)) return j;
        if (j && Array.isArray(j.data)) return j.data;
        return [];
      };

      const vocabs = await parseJsonList(vocabRes);
      const kanjis = await parseJsonList(kanjiRes);
      const grammars = await parseJsonList(grammarRes);

      const combinedQuestions: QuestionItem[] = [];

      // A. Section 1: Vocabulary Questions (Từ vựng)
      if (vocabs.length > 0) {
        const isDemo = (v: any) => {
          const m = (v.meaningVi || "").toLowerCase();
          const w = (v.word || v.kana || "").toLowerCase();
          return m.includes("cái này") || m.includes("cái đó") || m.includes("cái kia") || m.includes("cái nào") || m.includes("cái") || w.includes("これ") || w.includes("それ") || w.includes("あれ") || w.includes("どれ");
        };

        vocabs.forEach((v: any, idx: number) => {
          const vIsDemo = isDemo(v);
          const validCandidates = vocabs.filter((other: any) => {
            if (other.vocabularyId === v.vocabularyId) return false;
            return isDemo(other) === vIsDemo;
          });

          const shuffled = [...validCandidates].sort(() => Math.random() - 0.5);
          const wrongDistractors = shuffled.slice(0, 3);

          const typeMod = idx % 3;
          let promptText = "📖 [TỪ VỰNG] CHỌN NGHĨA TIẾNG VIỆT ĐÚNG CỦA TỪ TRÊN";
          let displayWord = v.word || v.kana;
          let furiganaVal = v.kana || v.word;
          let correctAnsStr = v.meaningVi;
          let optionList = [
            { optionText: v.meaningVi },
            ...wrongDistractors.map((d: any) => ({ optionText: d.meaningVi }))
          ];

          if (typeMod === 1 && v.word && v.kana && v.word !== v.kana) {
            promptText = "📖 [TỪ VỰNG] CHỌN CÁCH ĐỌC HIRAGANA ĐÚNG CỦA TỪ HÁN";
            displayWord = v.word;
            furiganaVal = "";
            correctAnsStr = v.kana;
            optionList = [
              { optionText: v.kana },
              ...wrongDistractors.map((d: any) => ({ optionText: d.kana || d.word }))
            ];
          } else if (typeMod === 2) {
            promptText = "📖 [TỪ VỰNG] CHỌN TỪ TIẾNG NHẬT ĐÚNG CHO NGHĨA NÀY";
            displayWord = `「 ${v.meaningVi} 」`;
            furiganaVal = "";
            correctAnsStr = v.word || v.kana;
            optionList = [
              { optionText: v.word || v.kana },
              ...wrongDistractors.map((d: any) => ({ optionText: d.word || d.kana }))
            ];
          }

          combinedQuestions.push({
            questionId: v.vocabularyId || idx + 1,
            attemptAnswerId: combinedQuestions.length + 1,
            questionType: typeMod === 1 ? "KANJI_READING" : typeMod === 2 ? "MEANING_TO_JAPANESE" : "JAPANESE_TO_MEANING",
            prompt: promptText,
            japaneseText: displayWord,
            furiganaText: furiganaVal,
            aiHintText: `💡 Gợi ý AI Sensei: Từ vựng này nằm trong chủ đề Bài #${quizIdStr}.`,
            audioText: v.word || v.kana,
            transcript: `${v.word} (${v.kana}) : ${v.meaningVi}`,
            explanation: `Nghĩa tiếng Việt chuẩn xác của ${v.word || v.kana} là: ${v.meaningVi}`,
            correctAnswerText: correctAnsStr,
            options: optionList.sort(() => Math.random() - 0.5),
          });
        });
      }

      // B. Section 2: Kanji Questions (Hán tự)
      if (kanjis.length > 0) {
        kanjis.forEach((k: any, idx: number) => {
          const wrongCandidates = kanjis.filter((other: any) => other.character !== k.character);
          const wrongDistractors = [...wrongCandidates].sort(() => Math.random() - 0.5).slice(0, 3);

          combinedQuestions.push({
            questionId: 2000 + idx,
            attemptAnswerId: combinedQuestions.length + 1,
            questionType: "KANJI_READING",
            prompt: `✍️ [HÁN TỰ KANJI] CHỌN NGHĨA HÁN VIỆT CỦA CHỮ 「 ${k.character} 」`,
            japaneseText: k.character,
            furiganaText: k.onyomi || k.kunyomi || "",
            aiHintText: `💡 Kanji 「 ${k.character} 」 có ${k.strokeCount || 4} nét vẽ.`,
            audioText: k.character,
            transcript: `Kanji ${k.character} : ${k.meaningVi}`,
            explanation: `Chữ Kanji 「 ${k.character} 」 có nghĩa Hán Việt là: ${k.meaningVi}.`,
            correctAnswerText: k.meaningVi,
            options: [
              { optionText: k.meaningVi },
              ...wrongDistractors.map((d: any) => ({ optionText: d.meaningVi }))
            ].sort(() => Math.random() - 0.5),
          });
        });
      }

      // C. Section 3: Grammar Questions (Ngữ Pháp & Trợ Từ)
      if (grammars.length > 0) {
        grammars.forEach((g: any, idx: number) => {
          const ex = g.examples && g.examples.length > 0 ? g.examples[0] : null;
          const promptStr = `🧩 [NGỮ PHÁP] CHỌN MẪU CÂU / TRỢ TỪ THÍCH HỢP: ${g.meaning || g.pattern}`;
          
          let jpText = ex ? ex.japaneseText : `Mẫu câu: ${g.pattern}`;
          let correctOpt = g.pattern;
          let optionsArr = [
            { optionText: g.pattern },
            { optionText: "～ではありません" },
            { optionText: "～ですか" },
            { optionText: "～の" },
          ];

          if (g.pattern && g.pattern.includes("は")) {
            jpText = jpText.replace(/は/g, " _____ ");
            correctOpt = "は (wa)";
            optionsArr = [
              { optionText: "は (wa)" },
              { optionText: "の (no)" },
              { optionText: "に (ni)" },
              { optionText: "で (de)" },
            ];
          } else if (g.pattern && g.pattern.includes("です")) {
            jpText = jpText.replace(/です/g, " _____ ");
            correctOpt = "です";
            optionsArr = [
              { optionText: "です" },
              { optionText: "ではありません" },
              { optionText: "<ctrl42>でした" },
              { optionText: "ます" },
            ];
          }

          combinedQuestions.push({
            questionId: 3000 + idx,
            attemptAnswerId: combinedQuestions.length + 1,
            questionType: "MULTIPLE_CHOICE",
            prompt: promptStr,
            japaneseText: jpText,
            furiganaText: ex ? ex.reading : "",
            aiHintText: `💡 Cấu trúc: ${g.pattern} — ${g.meaning}`,
            audioText: ex ? ex.japaneseText : g.pattern,
            transcript: `${g.pattern} : ${g.meaning}`,
            explanation: `Giải thích ngữ pháp: ${g.explanation || g.meaning}`,
            correctAnswerText: correctOpt,
            options: optionsArr.sort(() => Math.random() - 0.5),
          });
        });
      }

      if (combinedQuestions.length > 0) {
        setQuizData({
          attemptId: Date.now(),
          quizId: Number(quizIdStr),
          title: `Quiz Kiểm Tra Bài #${quizIdStr}`,
          description: "Bài kiểm tra tổng hợp kiến thức bài học",
          passScore: 70,
          timeLimitMinutes: 10,
          questions: combinedQuestions,
        });
        setTimeLeft(600);
        return;
      }

      throw new Error("Không thể tải danh sách câu hỏi cho Bài #" + quizIdStr);
    } catch (err: any) {
      setError(err.message || "Không thể bắt đầu bài Quiz này.");
    } finally {
      setLoading(false);
    }
  };

  // Check answer instantly for current question
  const handleCheckCurrentQuestion = (currentQ?: QuestionItem) => {
    if (!currentQ) return;
    const qId = currentQ.attemptAnswerId;
    const selectedAns = userAnswers[qId];

    if (!selectedAns) {
      setCheckWarning("⚠️ Vui lòng chọn 1 đáp án trước khi bấm Kiểm tra!");
      setTimeout(() => setCheckWarning(""), 3000);
      return;
    }

    setCheckWarning("");
    setCheckedQuestions((prev) => ({ ...prev, [qId]: true }));

    const isCorrect = currentQ.correctAnswerText
      ? selectedAns.trim().toLowerCase() === currentQ.correctAnswerText.trim().toLowerCase()
      : true;

    if (isCorrect) {
      playCatMeowSound();
    }
    if (currentQ.audioText || currentQ.audioUrl) {
      playAudio(currentQ.audioText, currentQ.audioUrl);
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
          const targetCorrect = (q.correctAnswerText || "").trim();
          const isCorrect = uAns.length > 0 && (targetCorrect ? uAns.toLowerCase() === targetCorrect.toLowerCase() : true);
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

  const handleRestartQuiz = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`anhsensei_quiz_session_${quizIdStr}`);
    }
    setUserAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setResult(null);
    startQuizForMode("MULTIPLE_CHOICE");
  };

  // 4. Taking Quiz Exam (Step-by-Step Single Question View)
  const currentQuestion = quizData?.questions[currentIndex];
  const totalQuestions = quizData?.questions.length || 30;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const answeredCount = quizData ? Object.values(userAnswers).filter((v) => !!v && v.trim().length > 0).length : 0;

  return (
    <div className="min-h-screen bg-[#FAF6F2] bg-[radial-gradient(#E2D9D0_1.5px,transparent_1.5px)] [background-size:24px_24px] text-[#2C2421] p-4 sm:p-8 font-sans flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-6 sm:space-y-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pt-2 max-w-4xl mx-auto w-full">
          <Link
            href={`/lessons/${quizIdStr}`}
            className="px-4 py-2 bg-white border border-[#E5D7CD] text-[#7A6A60] hover:text-[#C45A46] rounded-2xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer hover:border-[#C45A46] hover:scale-105 font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về bài học</span>
          </Link>

          <div className="text-xs font-black text-[#C45A46] bg-[#FFF8F4] px-5 py-2 rounded-full border border-[#E5D7CD] shadow-2xs tracking-wide">
            N5 • Bài #{quizIdStr}
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 text-xs font-mono font-black text-[#7A6A60] bg-white px-4 py-2 rounded-full border border-[#E5D7CD] shadow-2xs">
            <span className="text-[#C45A46]">⏱️</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* 🗺️ BẢN ĐỒ THỬ THÁCH (BALANCED & SPACIOUS GAMIFIED ROADMAP) */}
        {quizData && quizData.questions.length > 0 && (
          <div className="bg-white border-2 border-[#E5D7CD] rounded-[32px] p-6 sm:p-8 shadow-sm max-w-4xl mx-auto w-full space-y-5 transition-all relative overflow-hidden">
            {/* Background Soft Glow Accent */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

            {/* Header row: Title, Stats & Nộp bài ngay button */}
            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-[#C45A46]">🗺️</span>
                  <h2 className="text-2xl font-black text-[#2C2421] font-serif tracking-tight">
                    Bản Đồ Thử Thách
                  </h2>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold pt-0.5">
                  <span className="bg-[#FFF4EE] text-[#C45A46] px-4 py-1.5 rounded-full border border-[#F3E2D7] shadow-2xs font-black text-xs">
                    Tiến độ: {answeredCount}/{totalQuestions}
                  </span>
                  <span className="bg-[#FFFBEB] text-amber-900 px-4 py-1.5 rounded-full border border-amber-200/80 shadow-2xs font-black flex items-center gap-1 text-xs">
                    <span className="text-amber-500">⭐</span>
                    <span>{Object.keys(checkedQuestions).length} Sao</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {!result && (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-3 bg-gradient-to-r from-[#C45A46] to-[#B24B38] hover:from-[#B24B38] hover:to-[#9E3D2C] text-white font-black text-xs rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <Trophy className="w-4 h-4 text-amber-200" />
                    <span>Nộp Bài Ngay</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsPaletteExpanded((prev) => !prev)}
                  className="text-xs font-bold text-[#7A6A60] hover:text-[#C45A46] flex items-center gap-1 cursor-pointer transition-colors bg-[#FAF6F2] hover:bg-[#F5ECE5] px-4 py-3 rounded-2xl border border-[#E5D7CD]"
                >
                  <span>{isPaletteExpanded ? "Thu gọn ▲" : "Xem tất cả ▾"}</span>
                </button>
              </div>
            </div>

            {/* Stage Progress Header Bar: Level 1: Tập Sự -> Boss Cuối */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#948378]">
                <span>Level 1: Tập Sự</span>
                <span className="text-[#7A6A60] font-black flex items-center gap-1">
                  <span>Boss Cuối</span>
                </span>
              </div>
              <div className="w-full bg-[#FAF4EF] h-3 rounded-full overflow-hidden border border-[#E5D7CD] p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#D97762] via-[#C45A46] to-[#A33D29] rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* GAMIFIED WAVEY ROADMAP NODE PATH MATCHING MOCKUP IMAGE */}
            <div className="relative py-8 px-4 my-2">
              {/* Dual SVG Curve Paths: Solid Red Track (Node 1 -> Node 3) & Dashed Beige Track (Node 3 -> BOSS) */}
              <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 500 100" preserveAspectRatio="none" fill="none">
                {/* 1. Solid Terracotta Red Active Track (Left side starting exactly at Node 1) */}
                <path 
                  d="M 42 70 Q 115 25, 185 30 T 260 30" 
                  stroke="#C45A46" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                />
                {/* 2. Dashed Warm Beige Track (Right side to BOSS) */}
                <path 
                  d="M 260 30 Q 340 85, 415 65 T 475 35" 
                  stroke="#D9C4B7" 
                  strokeWidth="4" 
                  strokeDasharray="6 6" 
                  strokeLinecap="round" 
                />
                {/* Decorative Sparkles near Node 4/5 */}
                <text x="330" y="30" fill="#D9C4B7" fontSize="16">✨</text>
              </svg>

              {/* Interactive Checkpoint Stage Nodes Grid */}
              <div className="relative z-10 flex items-center justify-between h-20 px-2 sm:px-4">
                {[
                  { label: "1", targetIdx: 0, status: "passed", yOffset: "translate-y-4" },
                  { label: "2", targetIdx: 5, status: "passed", yOffset: "-translate-y-3" },
                  { label: "3", targetIdx: 11, status: "current", yOffset: "-translate-y-3" },
                  { label: "4", targetIdx: 17, status: "locked", yOffset: "translate-y-4" },
                  { label: "5", targetIdx: 23, status: "locked", yOffset: "translate-y-3" },
                  { label: "BOSS", targetIdx: 29, isBoss: true, status: "boss", yOffset: "-translate-y-1" },
                ].map((node, nIdx) => {
                  const isCurrentStage = currentIndex >= node.targetIdx && (nIdx === 5 || currentIndex < [5, 11, 17, 23, 29, 30][nIdx]);
                  const isPassedStage = currentIndex > node.targetIdx || (node.isBoss && result && result.passed);

                  return (
                    <div 
                      key={nIdx} 
                      className={`flex flex-col items-center group relative cursor-pointer transition-transform ${node.yOffset}`}
                      onClick={() => setCurrentIndex(node.targetIdx)}
                    >
                      {/* Floating Pointer Speech Bubble above Current Node 3 */}
                      {isCurrentStage && (
                        <div className="absolute -top-8 text-[11px] font-black bg-white text-[#C45A46] px-3 py-0.5 rounded-md shadow-xs border border-[#E5D7CD] whitespace-nowrap animate-bounce flex flex-col items-center z-20">
                          <span>Bạn đang ở đây</span>
                          <div className="w-1.5 h-1.5 bg-white border-b border-r border-[#E5D7CD] rotate-45 -mt-0.5" />
                        </div>
                      )}

                      {/* Node Badge Element */}
                      <div 
                        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-black text-sm transition-all duration-300 shadow-sm ${
                          node.isBoss
                            ? "w-14 h-14 sm:w-16 sm:h-16 bg-[#F7ECE5] border-2 border-[#C45A46] text-[#C45A46] rotate-45 rounded-2xl shadow-md hover:scale-105"
                            : isCurrentStage 
                            ? "bg-[#C45A46] text-white border-2 border-white rounded-2xl shadow-lg ring-4 ring-[#C45A46]/25 scale-110" 
                            : isPassedStage 
                            ? "bg-[#5B7B64] text-white border-2 border-white rounded-2xl hover:scale-105" 
                            : "bg-[#F7ECE5] border-2 border-[#E5D5C9] text-[#A29488] rounded-2xl"
                        }`}
                      >
                        <div className={node.isBoss ? "-rotate-45 flex flex-col items-center" : ""}>
                          {node.isBoss ? (
                            <span className="text-2xl text-[#C45A46]">🏰</span>
                          ) : isPassedStage ? (
                            <span className="text-base">⭐</span>
                          ) : isCurrentStage ? (
                            <span className="text-lg">📍</span>
                          ) : (
                            <span className="text-sm text-[#8C7B70]">🔒</span>
                          )}
                        </div>
                      </div>

                      {/* Node Number Underneath */}
                      <span className={`text-xs font-black mt-1.5 transition-colors ${
                        isCurrentStage ? "text-[#C45A46]" : isPassedStage ? "text-[#5B7B64]" : "text-[#948378]"
                      }`}>
                        {node.isBoss ? "BOSS" : node.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend Status Row at Bottom of Card (Matching Mockup Pill Container) */}
            <div className="bg-[#FFF8F4] border border-[#F3E7DF] rounded-2xl px-5 py-3 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-[#7A6A60]">
              <span className="flex items-center gap-2 text-[#5B7B64]">
                <span className="w-3.5 h-3.5 rounded-full bg-[#5B7B64] inline-flex items-center justify-center text-[10px] text-white font-black">★</span>
                <span>Đã vượt qua</span>
              </span>
              <span className="flex items-center gap-2 text-[#C45A46]">
                <span className="w-3.5 h-3.5 rounded-full bg-[#C45A46] inline-flex items-center justify-center text-[10px] text-white font-black">📍</span>
                <span>Mục tiêu hiện tại</span>
              </span>
              <span className="flex items-center gap-2 text-[#948378]">
                <span className="w-3.5 h-3.5 rounded-full bg-[#F7ECE5] border border-[#E5D5C9] inline-flex items-center justify-center text-[10px] text-[#8C7B70]">🔒</span>
                <span>Chưa mở khóa</span>
              </span>
            </div>

            {/* Expanded Drawer Grid Palette (Toggleable with "Xem tất cả") */}
            {isPaletteExpanded && (
              <div className="pt-4 border-t border-[#F5EFEA] animate-fadeIn space-y-2.5">
                <div className="text-xs font-black text-[#8C7B70] uppercase tracking-wider text-center">
                  Bảng 30 câu hỏi chi tiết
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 max-h-[240px] overflow-y-auto p-1">
                  {quizData.questions.map((q, qIdx) => {
                    const qId = q.attemptAnswerId;
                    const isAnswered = !!userAnswers[qId] && userAnswers[qId].trim().length > 0;
                    const isFlagged = !!flaggedQuestions[qId];
                    const isCurrent = currentIndex === qIdx;

                    let badgeStyles = "bg-[#FAF5F0] border-[#EFE8E1] text-[#76685F] hover:bg-[#F5EFEA]";
                    if (result) {
                      const ansDetail = result.answers.find((a) => a.attemptAnswerId === qId);
                      const isCorrect = ansDetail ? ansDetail.isCorrect : false;
                      badgeStyles = isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white";
                    } else if (isCurrent) {
                      badgeStyles = "bg-[#C45A46] text-white font-black scale-105 ring-2 ring-[#C45A46]/40";
                    } else if (isFlagged) {
                      badgeStyles = "bg-amber-400 text-amber-950 font-black";
                    } else if (isAnswered) {
                      badgeStyles = "bg-emerald-500 text-white font-bold";
                    }

                    return (
                      <button
                        key={`q-${qIdx}-${qId}`}
                        type="button"
                        onClick={() => setCurrentIndex(qIdx)}
                        className={`w-8.5 h-8.5 rounded-xl text-xs border font-bold transition-all flex items-center justify-center cursor-pointer ${badgeStyles}`}
                      >
                        <span>{qIdx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* IN-PLACE RESULT SUMMARY BANNER CARD (MATCHING USER SPECIFIED DESIGN) */}
        {result && (
          <div className="bg-white border border-[#E5E7EB] rounded-[32px] p-6 sm:p-8 shadow-sm max-w-4xl mx-auto w-full relative overflow-hidden transition-all animate-fadeIn">
            {/* Top Right Soft Warm Background Accent & Dots Pattern */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-4 right-6 text-amber-200/80 pointer-events-none select-none text-xs font-mono tracking-widest grid grid-cols-4 gap-1 opacity-70">
              <span>•</span><span>•</span><span>•</span><span>•</span>
              <span>•</span><span>•</span><span>•</span><span>•</span>
              <span>•</span><span>•</span><span>•</span><span>•</span>
            </div>

            {/* Top Layout: Avatar + Vertical Divider + Header/Score Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10">
              {/* Left Avatar Icon Badge */}
              <div className="relative shrink-0">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center relative transition-transform hover:scale-105 ${
                  result.passed ? "bg-[#E6F4EA]" : "bg-[#FFEAE8]"
                }`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-sm text-white ${
                    result.passed ? "bg-[#10B981]" : "bg-[#FF5B55]"
                  }`}>
                    {result.passed ? (
                      <Smile className="w-8 h-8 text-white" />
                    ) : (
                      <Frown className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>

                {/* Floating Decorative Sparkles & Dots matching mockup */}
                <span className="absolute -top-1 -left-1 text-xs select-none animate-pulse">✨</span>
                <span className="absolute top-3 -right-2 text-xs text-[#FF7A50] select-none">✦</span>
                <span className="absolute -bottom-1 left-3 w-2.5 h-2.5 rounded-full bg-[#6366F1] inline-block" />
              </div>

              {/* Vertical Separator Line (Hidden on Mobile) */}
              <div className="hidden sm:block w-[1px] h-20 bg-[#E2E8F0] shrink-0" />

              {/* Center Content: Title, Score & Tooltip Progress Bar */}
              <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                {/* Title Line */}
                <div className="text-xl sm:text-2xl font-black tracking-tight font-sans">
                  {result.passed ? (
                    <>
                      <span className="text-[#10B981]">Xuất sắc!</span>
                      <span className="text-[#1E293B]"> Bạn đã vượt qua bài test! 🎉</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#FF5B55]">Chưa đạt!</span>
                      <span className="text-[#1E293B]"> Đừng nản, hãy thử lại nhé! 💪</span>
                    </>
                  )}
                </div>

                {/* Score Summary Subtitle */}
                <div className="text-sm sm:text-base font-semibold text-[#64748B]">
                  <span>Kết quả: </span>
                  <span className="text-[#FF5B55] font-black">{result.correctCount} / {result.totalCount}</span>
                  <span> câu đúng (</span>
                  <span className="text-[#FF5B55] font-black">{result.score}%</span>
                  <span>)</span>
                </div>

                {/* Progress Bar Container with Floating Tooltip Badge */}
                <div className="pt-5 pb-1 max-w-lg">
                  <div className="w-full bg-[#EEF2F6] h-3.5 rounded-full relative overflow-visible">
                    {/* Filled Progress Bar Track */}
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.passed
                          ? "bg-gradient-to-r from-[#34D399] to-[#10B981]"
                          : "bg-gradient-to-r from-[#FF7A50] to-[#FF5B55]"
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, result.score))}%` }}
                    />

                    {/* Floating Tooltip Percentage Badge */}
                    <div 
                      className="absolute -top-7 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 transition-all duration-700"
                      style={{ left: `${Math.max(6, Math.min(94, result.score))}%` }}
                    >
                      <div className={`text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs whitespace-nowrap ${
                        result.passed ? "bg-[#10B981]" : "bg-[#FF5B55]"
                      }`}>
                        {result.score}%
                      </div>
                      <div className={`w-1.5 h-1.5 rotate-45 -mt-1 ${
                        result.passed ? "bg-[#10B981]" : "bg-[#FF5B55]"
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row Action Buttons Matching Mockup Exactly */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-6 mt-6 border-t border-[#F1F5F9] relative z-10">
              {/* Button 1: Về bài học */}
              <Link
                href={`/lessons/${quizIdStr}`}
                className="flex-1 min-w-[160px] sm:flex-initial px-6 py-3.5 bg-white border-2 border-[#F1F5F9] hover:border-[#E2E8F0] text-[#334155] hover:text-[#FF5B55] font-extrabold text-xs sm:text-sm rounded-2xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4 text-[#6366F1]" />
                <span>Về bài học</span>
                <ArrowLeft className="w-4 h-4 text-[#94A3B8]" />
              </Link>

              {/* Button 2: Làm lại đề này */}
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="flex-1 min-w-[160px] sm:flex-initial px-6 py-3.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#334155] font-extrabold text-xs sm:text-sm rounded-2xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <RotateCcw className="w-4 h-4 text-[#6366F1]" />
                <span>Làm lại đề này</span>
              </button>

              {/* Button 3: Xem toàn bộ đáp án */}
              <button
                type="button"
                onClick={() => setViewMode((prev) => (prev === "SINGLE" ? "FULL_LIST" : "SINGLE"))}
                className="flex-1 min-w-[200px] sm:flex-initial px-7 py-3.5 bg-gradient-to-r from-[#FFA238] via-[#FF7A50] to-[#FF5B55] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <FileText className="w-4.5 h-4.5 text-amber-100" />
                <span>{viewMode === "SINGLE" ? "Xem toàn bộ đáp án" : "Xem từng câu"}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* Bonus Fortunes button when passed */}
              {result.passed && (
                <button
                  type="button"
                  onClick={() => setIsOmikujiOpen(true)}
                  className="px-4 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>🥠 Rút Quẻ</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* FULL LIST REVIEW MODE VS SINGLE QUESTION MODE */}
        {result && viewMode === "FULL_LIST" && quizData ? (
          <div className="space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-black text-[#231917] font-serif uppercase tracking-wider">
                📋 Danh sách chi tiết {quizData.questions.length} câu hỏi
              </h3>
              <button
                type="button"
                onClick={() => setViewMode("SINGLE")}
                className="text-xs font-bold text-[#C65D4B] hover:underline cursor-pointer"
              >
                Quay lại dạng thẻ
              </button>
            </div>

            <div className="space-y-4">
              {quizData.questions.map((qItem, qIdx) => {
                const qId = qItem.attemptAnswerId;
                const userAns = userAnswers[qId] || "";
                const ansDetail = result.answers.find((a) => a.attemptAnswerId === qId);
                const isCorrect = ansDetail ? ansDetail.isCorrect : (
                  qItem.correctAnswerText ? userAns.trim().toLowerCase() === qItem.correctAnswerText.trim().toLowerCase() : false
                );

                return (
                  <div
                    key={`review-${qIdx}-${qId}`}
                    className={`bg-white border-2 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 transition-all ${
                      isCorrect ? "border-emerald-300" : "border-rose-300"
                    }`}
                  >
                    {/* Header line for each question */}
                    <div className="flex items-center justify-between border-b border-[#F5EFEA] pb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-[#231917] text-white font-black text-xs flex items-center justify-center">
                          #{qIdx + 1}
                        </span>
                        <span className="text-xs font-black text-[#8C7B70] tracking-wide uppercase">
                          {qItem.prompt}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 ${
                          isCorrect
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-rose-100 text-rose-900 border border-rose-300"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>ĐÚNG (+10 XP)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>SAI</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Question Central Display */}
                    <div className="bg-[#FAF7F2] border border-[#EADECF] p-4 rounded-2xl text-center space-y-1">
                      <div className="text-xl font-black text-[#231917]">
                        {qItem.japaneseText || qItem.prompt}
                      </div>
                      {qItem.furiganaText && qItem.furiganaText !== qItem.japaneseText && qItem.questionType !== "LISTENING_TO_WORD" && qItem.questionType !== "MEANING_TO_JAPANESE" && (
                        <div className="text-xs font-bold text-[#C65D4B]">
                          Cách đọc: {qItem.furiganaText}
                        </div>
                      )}
                    </div>

                    {/* Options list for review */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {qItem.options?.map((opt, oIdx) => {
                        const badge = ["A", "B", "C", "D"][oIdx] || `${oIdx + 1}`;
                        const isUserChoice = userAns === opt.optionText;
                        const isRightOpt = qItem.correctAnswerText
                          ? opt.optionText.trim().toLowerCase() === qItem.correctAnswerText.trim().toLowerCase()
                          : false;

                        let optReviewStyle = "bg-white border-[#EFE8E1] text-[#76685F]";
                        if (isRightOpt) {
                          optReviewStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs";
                        } else if (isUserChoice && !isRightOpt) {
                          optReviewStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold shadow-xs";
                        }

                        return (
                          <div
                            key={oIdx}
                            className={`p-3.5 rounded-2xl border-2 text-xs font-bold flex items-center justify-between ${optReviewStyle}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[11px] ${
                                isRightOpt ? "bg-emerald-600 text-white" : isUserChoice ? "bg-rose-600 text-white" : "bg-[#F5EFEA] text-[#76685F]"
                              }`}>
                                {badge}
                              </span>
                              <span>{formatOptionTextDisplay(opt.optionText, qItem.questionType, qItem.prompt)}</span>
                            </div>

                            {isRightOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {isUserChoice && !isRightOpt && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation box */}
                    {(qItem.explanation || qItem.transcript) && (
                      <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-2xl text-xs space-y-1 text-amber-950">
                        {qItem.explanation && <p className="font-semibold">💡 <strong>Giải thích:</strong> {qItem.explanation}</p>}
                        {qItem.transcript && <p className="font-mono text-[11px] opacity-80">🔊 Transcript: {qItem.transcript}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {/* Question Instruction Header & Interactive Controls */}
            <div className="flex flex-wrap items-center justify-between max-w-4xl mx-auto w-full px-1 gap-2">
              <h2 className="text-xs font-black text-[#C45A46] tracking-wider uppercase flex items-center gap-1.5">
                <span>🔥</span>
                <span>{currentQuestion?.prompt || "CHỌN NGHĨA ĐÚNG CỦA CÂU TRÊN"}</span>
              </h2>

              {/* Bookmark Button */}
              {currentQuestion && (
                <button
                  type="button"
                  onClick={() => toggleFlagQuestion(currentQuestion.attemptAnswerId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                    flaggedQuestions[currentQuestion.attemptAnswerId]
                      ? "bg-amber-100 border-amber-400 text-amber-950 shadow-2xs font-black"
                      : "bg-white border-[#E5D7CD] text-[#7A6A60] hover:text-[#C45A46]"
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${flaggedQuestions[currentQuestion.attemptAnswerId] ? "fill-amber-500 text-amber-600" : ""}`} />
                  <span>{flaggedQuestions[currentQuestion.attemptAnswerId] ? "Đã lưu (Chưa chắc)" : "Đánh dấu chưa chắc"}</span>
                </button>
              )}
            </div>

            {/* Central Prominent Japanese Card with Sensei Mascot Badge */}
            <div className="bg-white border-2 border-[#E5D7CD] p-10 sm:p-14 text-center rounded-[32px] shadow-xs max-w-4xl mx-auto w-full space-y-6 relative overflow-hidden">
              <div className="text-4xl sm:text-6xl font-extrabold text-[#231917] tracking-normal leading-relaxed font-sans min-h-[80px] flex items-center justify-center">
                {showFurigana && currentQuestion?.furiganaText && currentQuestion.questionType !== "LISTENING_TO_WORD" && currentQuestion.questionType !== "MEANING_TO_JAPANESE" && currentQuestion.furiganaText !== currentQuestion.japaneseText ? (
                  <ruby className="ruby-position-above">
                    {(currentQuestion.japaneseText || "").replace(/\s*\([^)]*\)/g, "")}
                    <rt className="text-base font-sans font-bold text-[#C45A46] block tracking-normal mb-1">
                      {currentQuestion.furiganaText}
                    </rt>
                  </ruby>
                ) : (
                  <span className="tracking-normal">{(currentQuestion?.japaneseText || "").replace(/\s*\([^)]*\)/g, "")}</span>
                )}
              </div>

              {(currentQuestion?.audioText || currentQuestion?.audioUrl) && (
                <button
                  type="button"
                  onClick={() => playAudio(currentQuestion.audioText, currentQuestion.audioUrl)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFF4EE] border border-[#F3E2D7] hover:bg-[#FCEAE0] text-[#C45A46] font-bold text-xs sm:text-sm rounded-xl cursor-pointer transition-all hover:scale-105 shadow-2xs"
                >
                  <span>📢</span>
                  <span>Nghe phát âm</span>
                  <span>🔊</span>
                </button>
              )}

              {/* 🐱 ANHSENSEI CAT MASCOT STICKER IN BOTTOM RIGHT CORNER (MATCHES USER MOCKUP IMAGE) */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none transition-all">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F8ECE6] border border-[#E5D7CD] shadow-2xs flex items-center justify-center text-2xl shrink-0 p-0.5">
                  🐱
                </div>
              </div>
            </div>

            {/* 2x2 Option Grid with A/B/C/D Badges */}
            {currentQuestion && (
              <div className="space-y-4 max-w-4xl mx-auto w-full">
                {/* Warning Message Toast */}
                {checkWarning && (
                  <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-2xl text-xs font-bold text-center animate-bounce">
                    {checkWarning}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {currentQuestion.options?.map((opt, oIdx) => {
                    const badge = ["A", "B", "C", "D"][oIdx] || `${oIdx + 1}`;
                    const isSelected = userAnswers[currentQuestion.attemptAnswerId] === opt.optionText;
                    const isChecked = !!result || checkedQuestions[currentQuestion.attemptAnswerId];
                    const isCorrectOpt = currentQuestion.correctAnswerText
                      ? opt.optionText.trim().toLowerCase() === currentQuestion.correctAnswerText.trim().toLowerCase()
                      : false;

                    let optionStyles = "bg-white hover:bg-[#FAF5F0] border-[#E5D7CD] text-[#231917]";
                    if (isChecked) {
                      if (isCorrectOpt) {
                        optionStyles = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs";
                      } else if (isSelected && !isCorrectOpt) {
                        optionStyles = "bg-rose-50 border-rose-500 text-rose-900 shadow-xs";
                      }
                    } else if (isSelected) {
                      optionStyles = "bg-[#FFF4EE] border-[#C45A46] text-[#A33D29] shadow-sm ring-2 ring-[#C45A46]/30";
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={!!result}
                        onClick={() =>
                          !result &&
                          setUserAnswers({
                            ...userAnswers,
                            [currentQuestion.attemptAnswerId]: opt.optionText,
                          })
                        }
                        className={`p-5 sm:p-6 rounded-2xl border-2 text-left font-bold text-base transition-all flex items-center justify-between ${
                          result ? "cursor-default" : "cursor-pointer hover:scale-[1.01]"
                        } ${optionStyles}`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              isChecked && isCorrectOpt
                                ? "bg-emerald-600 text-white"
                                : isChecked && isSelected && !isCorrectOpt
                                ? "bg-rose-600 text-white"
                                : isSelected
                                ? "bg-[#C45A46] text-white"
                                : "bg-[#F5EFEA] text-[#76685F]"
                            }`}
                          >
                            {badge}
                          </span>
                          <span>{formatOptionTextDisplay(opt.optionText, currentQuestion.questionType, currentQuestion.prompt)}</span>
                        </div>

                        {isChecked && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                        {isChecked && isSelected && !isCorrectOpt && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                        {!isChecked && isSelected && <CheckCircle2 className="w-5 h-5 text-[#C45A46] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Card when Checked or Post-Submit */}
                {currentQuestion && (checkedQuestions[currentQuestion.attemptAnswerId] || result) && (
                  <div
                    className={`p-4 rounded-2xl border-2 space-y-1.5 animate-fadeIn ${
                      userAnswers[currentQuestion.attemptAnswerId]?.trim().toLowerCase() ===
                      (currentQuestion.correctAnswerText || "").trim().toLowerCase()
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                        : "bg-rose-50 border-rose-300 text-rose-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black text-xs">
                      {userAnswers[currentQuestion.attemptAnswerId]?.trim().toLowerCase() ===
                      (currentQuestion.correctAnswerText || "").trim().toLowerCase() ? (
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

                    {currentQuestion.correctAnswerText &&
                      userAnswers[currentQuestion.attemptAnswerId]?.trim().toLowerCase() !==
                        currentQuestion.correctAnswerText.trim().toLowerCase() && (
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
                )}
              </div>
            )}

            {/* Bottom Action Navigation Buttons (Câu trước, Kiểm tra, Câu tiếp theo / Nộp bài) MATCHING USER MOCKUP IMAGE */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-4 pt-4 pb-8">
              {/* 1. Nút "Câu trước" */}
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  currentIndex === 0
                    ? "opacity-30 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-white border-2 border-[#E5D7CD] text-[#7A6A60] hover:text-[#2C2421] hover:border-[#C45A46] shadow-2xs cursor-pointer hover:scale-105"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              {/* 2. Nút "Kiểm tra" (Dark charcoal button matching mockup image) */}
              {result ? (
                <div className="px-5 py-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                  <span>Đã xem kết quả</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCheckCurrentQuestion(currentQuestion)}
                  className={`px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105 ${
                    currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId]
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-[#54504D] hover:bg-[#433F3D] text-white"
                  }`}
                >
                  <Search className="w-4.5 h-4.5 text-amber-300" />
                  <span>
                    {currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId]
                      ? "✓ Đã kiểm tra"
                      : "Kiểm tra"}
                  </span>
                </button>
              )}

              {/* 3. Nút "Câu tiếp theo" (Red gradient button matching mockup image) */}
              {result ? (
                currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-6 py-3.5 bg-[#C45A46] hover:bg-[#B24B38] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-2 hover:scale-105"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={`/lessons/${quizIdStr}`}
                    className="px-6 py-3.5 bg-[#C45A46] hover:bg-[#B24B38] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-2 hover:scale-105"
                  >
                    <span>Về bài học</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (currentIndex < totalQuestions - 1) {
                      setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
                    } else {
                      setShowSubmitModal(true);
                    }
                  }}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#C45A46] to-[#B24B38] hover:from-[#B24B38] hover:to-[#9E3D2C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-2 hover:scale-105"
                >
                  <span>{currentIndex < totalQuestions - 1 ? "Câu tiếp theo" : "Nộp bài ngay"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        )}
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
