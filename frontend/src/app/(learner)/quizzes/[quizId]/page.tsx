"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const playAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start Quiz Attempt (Hybrid Strategy: Admin Question Bank Priority -> Smart Vocabulary Generator Fallback)
  const startQuizForMode = async (mode: QuizModeType) => {
    try {
      setSelectedMode(mode);
      setLoading(true);
      setError(null);
      setCurrentIndex(0);

      let res: any;
      // 1. Priority #1: Attempt to load custom Admin Question Bank from Backend API
      try {
        res = await apiClient<any>(`/learning/quizzes/${quizIdStr}/start`, { method: "POST" });
        if (!res || !res.data || !res.data.questions || res.data.questions.length === 0) {
          throw new Error("Admin questions empty for this lesson");
        }
      } catch {
        // 2. Priority #2: Comprehensive Real-Time Generator (Vocab + Kanji + Grammar Combined)
        const [vocabRes, kanjiRes, grammarRes] = await Promise.all([
          fetch(`http://localhost:8080/api/v1/curriculum/lessons/${quizIdStr}/vocabularies`).catch(() => null),
          fetch(`http://localhost:8080/api/v1/curriculum/lessons/${quizIdStr}/kanji`).catch(() => null),
          fetch(`http://localhost:8080/api/v1/curriculum/lessons/${quizIdStr}/grammar`).catch(() => null),
        ]);

        const vocabs = vocabRes && vocabRes.ok ? await vocabRes.json() : [];
        const kanjis = kanjiRes && kanjiRes.ok ? await kanjiRes.json() : [];
        const grammars = grammarRes && grammarRes.ok ? await grammarRes.json() : [];

        const combinedQuestions: QuestionItem[] = [];

        // A. Section 1: Vocabulary Questions (Từ vựng)
        if (vocabs.length > 0) {
          const isDemo = (v: any) => {
            const m = (v.meaningVi || "").toLowerCase();
            const w = (v.word || v.kana || "").toLowerCase();
            return m.includes("cái này") || m.includes("cái đó") || m.includes("cái kia") || m.includes("cái nào") || m.includes("cái") || w.includes("これ") || w.includes("それ") || w.includes("あれ") || w.includes("どれ");
          };

          vocabs.slice(0, 15).forEach((v: any, idx: number) => {
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
          kanjis.slice(0, 5).forEach((k: any, idx: number) => {
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
              explanation: `Chữ Kanji 「 ${k.character} 」 có nghĩa Hán Việt là: ${k.meaningVi} (Âm đọc: ${k.onyomi || k.kunyomi || "nhật"}).`,
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
          grammars.slice(0, 5).forEach((g: any, idx: number) => {
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

            if (g.pattern.includes("は")) {
              jpText = jpText.replace(/は/g, " _____ ");
              correctOpt = "は (wa)";
              optionsArr = [
                { optionText: "は (wa)" },
                { optionText: "の (no)" },
                { optionText: "に (ni)" },
                { optionText: "で (de)" },
              ];
            } else if (g.pattern.includes("です")) {
              jpText = jpText.replace(/です/g, " _____ ");
              correctOpt = "です";
              optionsArr = [
                { optionText: "です" },
                { optionText: "ではありません" },
                { optionText: "でした" },
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

        // Fallback default questions if no DB records found
        if (combinedQuestions.length === 0) {
          combinedQuestions.push(
            {
              questionId: 1,
              attemptAnswerId: 1,
              questionType: "JAPANESE_TO_MEANING",
              prompt: "📖 [TỪ VỰNG] CHỌN NGHĨA ĐÚNG CỦA TỪ 「 私 (わたし) 」",
              japaneseText: "私 (わたし)",
              furiganaText: "わたし",
              aiHintText: "💡 Từ vựng bài #1.",
              audioText: "わたし",
              transcript: "私 (わたし) : Tôi",
              explanation: "私 (わたし) có nghĩa là Tôi.",
              correctAnswerText: "Tôi",
              options: [
                { optionText: "Tôi" },
                { optionText: "Bạn" },
                { optionText: "Chúng tôi" },
                { optionText: "Thầy giáo" },
              ].sort(() => Math.random() - 0.5),
            },
            {
              questionId: 2,
              attemptAnswerId: 2,
              questionType: "MULTIPLE_CHOICE",
              prompt: "🧩 [NGỮ PHÁP] ĐIỀN TRỢ TỪ THÍCH HỢP: わたし _____ たなかです。",
              japaneseText: "わたし _____ たなかです。",
              furiganaText: "",
              aiHintText: "💡 Trợ từ chỉ chủ đề câu.",
              audioText: "わたしはたなかです",
              transcript: "わたしはたなかです",
              explanation: "Trợ từ は (wa) dùng để đánh dấu chủ đề câu.",
              correctAnswerText: "は (wa)",
              options: [
                { optionText: "は (wa)" },
                { optionText: "の (no)" },
                { optionText: "に (ni)" },
                { optionText: "で (de)" },
              ].sort(() => Math.random() - 0.5),
            }
          );
        }

        res = {
          data: {
            attemptId: Date.now(),
            quizId: Number(quizIdStr),
            title: `Quiz Kiểm Tra Bài #${quizIdStr}`,
            description: "Bài kiểm tra đánh giá kiến thức bài học",
            passScore: 70,
            timeLimitMinutes: 10,
            questions: generatedQuestions,
          }
        };
      }

      setQuizData(res.data);
      if (res.data.timeLimitMinutes) {
        setTimeLeft(res.data.timeLimitMinutes * 60);
      }
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
    if (currentQ.audioText) {
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

                {!result && (
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
            className={`border-2 p-5 rounded-3xl space-y-3 shadow-lg max-w-xl mx-auto transition-all animate-fadeIn ${
              result.passed
                ? "bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-gradient-to-r from-rose-50 via-white to-rose-50 border-rose-300 text-rose-900"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm bg-white shrink-0">
                  {result.passed ? <Trophy className="w-6 h-6 text-amber-500" /> : <AlertCircle className="w-6 h-6 text-rose-500" />}
                </div>
                <div>
                  <h3 className="text-base font-black font-serif">
                    {result.passed ? "CHÚC MỪNG! BẠN ĐÃ ĐẠT KẾT QUẢ!" : "CHƯA ĐẠT! HÃY CỐ GẮNG THỬ LẠI!"}
                  </h3>
                  <p className="text-xs font-extrabold opacity-80">
                    Đúng: {result.correctCount} / {result.totalCount} câu ({result.score}%)
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
                  <span>🥠 Rút Quẻ</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 border-t border-black/5">
              <Link
                href={`/lessons/${quizIdStr}`}
                className="px-4 py-2 bg-white border border-[#DED3C8] text-[#56423E] hover:text-[#C65D4B] font-extrabold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer hover:border-[#C65D4B]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Về bài học</span>
              </Link>

              <button
                type="button"
                onClick={handleRestartQuiz}
                className="px-4 py-2 bg-white border border-[#DED3C8] text-[#56423E] hover:text-[#C65D4B] font-extrabold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại bài Quiz</span>
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

        {/* Central Prominent Japanese Card with Ruby Furigana Support */}
        <div className="bg-white border-2 border-[#EADECF] p-8 sm:p-12 text-center rounded-3xl shadow-xs max-w-xl mx-auto space-y-4">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#231917] tracking-normal leading-relaxed font-sans">
            {showFurigana && currentQuestion?.furiganaText && currentQuestion.furiganaText !== currentQuestion.japaneseText ? (
              <ruby className="ruby-position-above">
                {(currentQuestion.japaneseText || "").replace(/\s*\([^)]*\)/g, "")}
                <rt className="text-sm font-sans font-bold text-[#C65D4B] block tracking-normal mb-1">
                  {currentQuestion.furiganaText}
                </rt>
              </ruby>
            ) : (
              <span className="tracking-normal">{(currentQuestion?.japaneseText || currentQuestion?.prompt || "").replace(/\s*\([^)]*\)/g, "")}</span>
            )}
          </div>

          {currentQuestion?.audioText && (
            <button
              type="button"
              onClick={() => playAudio(currentQuestion.audioText!)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5EFEA] hover:bg-[#EFE8E1] text-[#76685F] font-bold text-xs rounded-xl cursor-pointer transition-all"
            >
              <Volume2 className="w-4 h-4 text-[#C65D4B]" />
              <span>Nghe phát âm (🔊)</span>
            </button>
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
                    optionStyles = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs";
                  } else if (isSelected && !isCorrectOpt) {
                    optionStyles = "bg-rose-50 border-rose-500 text-rose-900 shadow-xs";
                  }
                } else if (isSelected) {
                  optionStyles = "bg-[#F9ECE9] border-[#C65D4B] text-[#8C2D1D] shadow-sm";
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
                    className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between ${
                      result ? "cursor-default" : "cursor-pointer"
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
              onClick={() => handleCheckCurrentQuestion(currentQuestion)}
              className={`px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId]
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-[#8B6F5A] hover:bg-[#755C48] text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>
                {currentQuestion && checkedQuestions[currentQuestion.attemptAnswerId]
                  ? "✓ Đã kiểm tra"
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
              <Link
                href={`/lessons/${quizIdStr}`}
                className="px-5 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 hover:scale-105"
              >
                <span>Hoàn tất & Về bài học</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
