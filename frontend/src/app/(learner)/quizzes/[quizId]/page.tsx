"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { CheckCircle2, AlertCircle, Trophy, RotateCcw, ArrowLeft, Volume2, Gamepad2, Layers, Keyboard, Zap, Play, AlertTriangle, HelpCircle, Shuffle } from "lucide-react";
import Card3DTilt from "@/components/ui/Card3DTilt";

interface QuestionOption {
  optionId: number;
  optionText: string;
  isCorrect?: boolean;
}

interface QuestionItem {
  questionId: number;
  questionType: "MULTIPLE_CHOICE" | "LISTENING" | "TYPING";
  prompt: string;
  weight: number;
  audioText?: string;
  sortOrder: number;
  options: QuestionOption[];
  currentSavedOptionId?: number;
  currentSavedTextAnswer?: string;
}

interface StartQuizData {
  attemptId: number;
  quizId: number;
  title: string;
  description: string;
  timeLimitMinutes?: number;
  passScore: number;
  attemptNumber: number;
  isResumed: boolean;
  questions: QuestionItem[];
}

interface AnswerDetail {
  questionId: number;
  prompt: string;
  selectedOptionId?: number;
  textAnswer?: string;
  isCorrect?: boolean;
  earnedScore: number;
  explanation?: string;
  correctAnswer?: string;
  options: QuestionOption[];
}

interface QuizResultData {
  attemptId: number;
  quizId: number;
  quizTitle: string;
  attemptNumber: number;
  score: number;
  passScore: number;
  passed: boolean;
  status: string;
  correctCount: number;
  totalCount: number;
  startedAt: string;
  submittedAt: string;
  answers: AnswerDetail[];
}

export type QuizModeType = "MULTIPLE_CHOICE" | "LISTENING" | "TYPING" | "SPEED_BLITZ";

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.quizId;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quiz Mode Selector State
  const [selectedQuizMode, setSelectedQuizMode] = useState<QuizModeType | null>(null);
  const [vocabList, setVocabList] = useState<any[]>([]);

  const [quizData, setQuizData] = useState<StartQuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedOptionId?: number; textAnswer?: string }>>({});
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);

  // Submit Confirmation Modal State
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Play audio for listening questions
  const playAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Fetch lesson vocabularies on initial load
  useEffect(() => {
    async function loadVocab() {
      try {
        setLoading(true);
        setError(null);
        let list: any[] = [];
        try {
          const res = await apiClient<any>(`/learner/lessons/${quizId}/content`);
          if (res.data && res.data.vocabularies) {
            list = res.data.vocabularies;
          }
        } catch {
          const fallbackRes = await fetch(`http://localhost:8080/api/v1/curriculum/lessons/${quizId}/vocabularies`);
          if (fallbackRes.ok) {
            list = await fallbackRes.json();
          }
        }
        setVocabList(list);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu bài học.");
      } finally {
        setLoading(false);
      }
    }
    loadVocab();
  }, [quizId]);

  // Build Quiz Data capped at 20 QUESTIONS MAX!
  const buildQuizForMode = (mode: QuizModeType, items: any[]) => {
    if (!items || items.length === 0) return null;

    const rawQuestions: QuestionItem[] = [];

    if (mode === "SPEED_BLITZ") {
      // ULTIMATE MIXED MODE: Combine Trắc nghiệm, Nghe & Gõ into a 20-Question Challenge!
      const shuffledItems = [...items].sort(() => Math.random() - 0.5);

      shuffledItems.forEach((item, idx) => {
        const wrongDistractors = items
          .filter((v) => v.vocabularyId !== item.vocabularyId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const formatType = idx % 4; // 0: Multiple Choice JP->VI, 1: Multiple Choice VI->JP, 2: Listening, 3: Typing

        if (formatType === 0) {
          const options: QuestionOption[] = [
            { optionId: item.vocabularyId * 100 + 1, optionText: item.meaningVi, isCorrect: true },
            ...wrongDistractors.map((d, dIdx) => ({
              optionId: item.vocabularyId * 100 + 2 + dIdx,
              optionText: d.meaningVi,
              isCorrect: false,
            })),
          ].sort(() => Math.random() - 0.5);

          rawQuestions.push({
            questionId: 0,
            questionType: "MULTIPLE_CHOICE",
            prompt: `[Trắc nghiệm] Nghĩa của từ vựng tiếng Nhật "${item.word || item.kana}" là gì?`,
            weight: 1,
            sortOrder: 0,
            options,
          });
        } else if (formatType === 1) {
          const options: QuestionOption[] = [
            { optionId: item.vocabularyId * 100 + 10, optionText: `${item.word} (${item.kana})`, isCorrect: true },
            ...wrongDistractors.map((d, dIdx) => ({
              optionId: item.vocabularyId * 100 + 11 + dIdx,
              optionText: `${d.word} (${d.kana})`,
              isCorrect: false,
            })),
          ].sort(() => Math.random() - 0.5);

          rawQuestions.push({
            questionId: 0,
            questionType: "MULTIPLE_CHOICE",
            prompt: `[Trắc nghiệm] Từ vựng tiếng Nhật nào tương ứng với nghĩa "${item.meaningVi}"?`,
            weight: 1,
            sortOrder: 0,
            options,
          });
        } else if (formatType === 2) {
          const options: QuestionOption[] = [
            { optionId: item.vocabularyId * 100 + 20, optionText: `${item.word} - ${item.meaningVi}`, isCorrect: true },
            ...wrongDistractors.map((d, dIdx) => ({
              optionId: item.vocabularyId * 100 + 21 + dIdx,
              optionText: `${d.word} - ${d.meaningVi}`,
              isCorrect: false,
            })),
          ].sort(() => Math.random() - 0.5);

          rawQuestions.push({
            questionId: 0,
            questionType: "LISTENING",
            prompt: `[Phát âm 🔊] Nghe âm thanh chuẩn và chọn đáp án chính xác:`,
            weight: 1,
            audioText: item.word || item.kana,
            sortOrder: 0,
            options,
          });
        } else {
          rawQuestions.push({
            questionId: 0,
            questionType: "TYPING",
            prompt: `[Luyện gõ] Gõ Romaji tương ứng cho nghĩa "${item.meaningVi}":`,
            weight: 1,
            audioText: item.word,
            sortOrder: 0,
            options: [],
          });
        }
      });
    } else {
      // Standard Single-Mode Question Generator
      items.forEach((item) => {
        const wrongDistractors = items
          .filter((v) => v.vocabularyId !== item.vocabularyId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        if (mode === "LISTENING") {
          const options: QuestionOption[] = [
            { optionId: item.vocabularyId * 100 + 1, optionText: `${item.word} - ${item.meaningVi}`, isCorrect: true },
            ...wrongDistractors.map((d, dIdx) => ({
              optionId: item.vocabularyId * 100 + 2 + dIdx,
              optionText: `${d.word} - ${d.meaningVi}`,
              isCorrect: false,
            })),
          ].sort(() => Math.random() - 0.5);

          rawQuestions.push({
            questionId: 0,
            questionType: "LISTENING",
            prompt: `Nghe phát âm chuẩn (🔊) và chọn từ vựng đúng:`,
            weight: 1,
            audioText: item.word || item.kana,
            sortOrder: 0,
            options,
          });
        } else if (mode === "TYPING") {
          rawQuestions.push({
            questionId: 0,
            questionType: "TYPING",
            prompt: `Gõ Romaji tương ứng cho nghĩa "${item.meaningVi}":`,
            weight: 1,
            audioText: item.word,
            sortOrder: 0,
            options: [],
          });
        } else {
          const options1: QuestionOption[] = [
            { optionId: item.vocabularyId * 100 + 1, optionText: item.meaningVi, isCorrect: true },
            ...wrongDistractors.map((d, dIdx) => ({
              optionId: item.vocabularyId * 100 + 2 + dIdx,
              optionText: d.meaningVi,
              isCorrect: false,
            })),
          ].sort(() => Math.random() - 0.5);

          rawQuestions.push({
            questionId: 0,
            questionType: "MULTIPLE_CHOICE",
            prompt: `Nghĩa của từ vựng tiếng Nhật "${item.word || item.kana}" là gì?`,
            weight: 1,
            sortOrder: 0,
            options: options1,
          });
        }
      });
    }

    // Shuffle and cap at EXACTLY 20 QUESTIONS MAX!
    const shuffledQuestions = rawQuestions.sort(() => Math.random() - 0.5);
    const cappedQuestions = shuffledQuestions.slice(0, Math.min(20, shuffledQuestions.length));

    // Re-index questionId from 1 to N
    const finalQuestions: QuestionItem[] = cappedQuestions.map((q, idx) => ({
      ...q,
      questionId: idx + 1,
      sortOrder: idx + 1,
    }));

    let title = "Bài Quiz Kiểm Tra (20 Câu)";
    let desc = `Bộ đề kiểm tra chuẩn 20 câu hỏi lựa chọn ngẫu nhiên.`;
    let timeMinutes = mode === "SPEED_BLITZ" ? 2 : 10;

    if (mode === "MULTIPLE_CHOICE") {
      title = "🎯 Quiz Trắc Nghiệm Chuẩn (20 Câu)";
    } else if (mode === "LISTENING") {
      title = "🎧 Quiz Nghe Phát Âm (20 Câu)";
    } else if (mode === "TYPING") {
      title = "⌨️ Quiz Gõ Romaji & Kana (20 Câu)";
    } else if (mode === "SPEED_BLITZ") {
      title = "⚡ Quiz Tổng Hợp Thử Thách (20 Câu - 120s)";
      desc = "Thử thách tổng hợp Trắc nghiệm, Nghe phát âm 🔊 & Gõ phím Romaji trong 120s!";
    }

    return {
      attemptId: Date.now(),
      quizId: Number(quizId) || 1,
      title,
      description: desc,
      timeLimitMinutes: timeMinutes,
      passScore: 75,
      attemptNumber: 1,
      isResumed: false,
      questions: finalQuestions,
    };
  };

  const handleStartMode = (mode: QuizModeType) => {
    setSelectedQuizMode(mode);
    const generatedQuiz = buildQuizForMode(mode, vocabList);
    setQuizData(generatedQuiz);
    if (generatedQuiz?.timeLimitMinutes) {
      setTimeLeftSeconds(generatedQuiz.timeLimitMinutes * 60);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeftSeconds === null || timeLeftSeconds <= 0 || result) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, result]);

  const handleSelectOption = (questionId: number, optionId: number) => {
    const updated = {
      ...userAnswers,
      [questionId]: { ...userAnswers[questionId], selectedOptionId: optionId },
    };
    setUserAnswers(updated);
  };

  const handleTextChange = (questionId: number, text: string) => {
    const updated = {
      ...userAnswers,
      [questionId]: { ...userAnswers[questionId], textAnswer: text },
    };
    setUserAnswers(updated);
  };

  const handleAutoSubmit = () => {
    handleSubmitQuiz();
  };

  // Final submission execution
  const handleSubmitQuiz = async () => {
    if (!quizData || submitting) return;

    try {
      setSubmitting(true);
      setError(null);
      setShowSubmitModal(false);

      let correctCount = 0;
      const answerDetails: AnswerDetail[] = quizData.questions.map((q) => {
        const userChoice = userAnswers[q.questionId]?.selectedOptionId;
        const textAns = userAnswers[q.questionId]?.textAnswer?.trim().toLowerCase();

        let isCorrect = false;

        if (q.questionType === "TYPING") {
          const targetVocab = vocabList.find((v) => q.prompt.includes(v.meaningVi));
          if (targetVocab) {
            const valid = [targetVocab.word, targetVocab.kana, targetVocab.romaji].map((s) => (s || "").toLowerCase());
            isCorrect = textAns ? valid.includes(textAns) : false;
          }
        } else {
          const correctOpt = q.options.find((o) => o.isCorrect);
          isCorrect = userChoice !== undefined && userChoice === correctOpt?.optionId;
        }

        if (isCorrect) correctCount++;

        return {
          questionId: q.questionId,
          prompt: q.prompt,
          selectedOptionId: userChoice,
          textAnswer: userAnswers[q.questionId]?.textAnswer,
          isCorrect,
          earnedScore: isCorrect ? 1 : 0,
          explanation: q.questionType === "TYPING" ? "Gõ đúng từ vựng tương ứng" : `Đáp án đúng: ${q.options.find((o) => o.isCorrect)?.optionText || ""}`,
          options: q.options,
        };
      });

      const totalCount = quizData.questions.length;
      const scorePercent = Math.round((correctCount / totalCount) * 100);

      const localResult: QuizResultData = {
        attemptId: quizData.attemptId,
        quizId: quizData.quizId,
        quizTitle: quizData.title,
        attemptNumber: 1,
        score: scorePercent,
        passScore: quizData.passScore,
        passed: scorePercent >= quizData.passScore,
        status: "COMPLETED",
        correctCount,
        totalCount,
        startedAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        answers: answerDetails,
      };

      setResult(localResult);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi nộp bài thi.");
    } finally {
      setSubmitting(false);
    }
  };

  // Answered vs Unanswered Counters
  const totalQuestions = quizData?.questions.length || 0;
  const answeredCount = Object.values(userAnswers).filter(
    (ans) => ans.selectedOptionId !== undefined || (ans.textAnswer && ans.textAnswer.trim().length > 0)
  ).length;
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#C65D4B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-extrabold text-[#56423E]">Đang khởi tạo bài Quiz 20 câu...</p>
        </div>
      </div>
    );
  }

  // STEP 1: QUIZ MODE SELECTOR SCREEN (Choose from 4 Quiz Types!)
  if (!selectedQuizMode || !quizData) {
    const modes = [
      {
        key: "MULTIPLE_CHOICE" as const,
        title: "🎯 Trắc Nghiệm Từ Vựng Chuẩn",
        desc: "Bộ đề 20 câu trắc nghiệm phản xạ 2 chiều.",
        badge: "Chuẩn 20 câu",
        color: "from-[#C65D4B] to-[#FF8C78]",
        icon: Layers,
      },
      {
        key: "LISTENING" as const,
        title: "🎧 Quiz Nghe Phát Âm Chuẩn",
        desc: "Nghe phát âm 🔊 của 20 từ vựng ngẫu nhiên.",
        badge: "Phát âm Tokyo",
        color: "from-teal-600 to-emerald-600",
        icon: Volume2,
      },
      {
        key: "TYPING" as const,
        title: "⌨️ Quiz Gõ Phản Xạ Romaji",
        desc: "Thử thách gõ Romaji chính xác cho 20 câu.",
        badge: "Trí nhớ sâu",
        color: "from-[#231917] to-[#56423E]",
        icon: Keyboard,
      },
      {
        key: "SPEED_BLITZ" as const,
        title: "⚡ Quiz Tổng Hợp Thử Thách",
        desc: "Trắc nghiệm + Nghe phát âm 🔊 + Gõ phím Romaji tổng hợp trong 120s!",
        badge: "Tổng hợp (120s)",
        color: "from-amber-500 to-amber-600",
        icon: Shuffle,
      },
    ];

    return (
      <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#231917]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-8 text-center space-y-4 shadow-xl">
            <span className="bg-white text-[#C65D4B] border border-[#C65D4B]/30 text-[10px] font-black px-3.5 py-1 rounded-full uppercase shadow-2xs">
              Bộ Đề Quiz Chuẩn 20 Câu Hỏi
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#231917]">
              Chọn Loại Bài Quiz Bạn Muốn Thử Sức
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#76685F] max-w-lg mx-auto">
              Hệ thống cung cấp 3 chế độ Quiz chuyên biệt & 1 chế độ Quiz Tổng Hợp 120s toàn diện giúp bạn rèn luyện trí nhớ đỉnh cao.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {modes.map((m) => {
              const IconComp = m.icon;
              return (
                <Card3DTilt key={m.key}>
                  <div
                    onClick={() => handleStartMode(m.key)}
                    className="group bg-white border-2 border-[#DED3C8] hover:border-[#C65D4B]/70 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer space-y-4 flex flex-col justify-between h-full"
                  >
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-[#8B6F5A] bg-[#FAF3EB] px-3 py-1 rounded-full border border-[#DED3C8]">
                        {m.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#76685F] leading-relaxed">
                        {m.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2.5 bg-[#FAF3EB] group-hover:bg-[#C65D4B] text-[#C65D4B] group-hover:text-white font-black text-xs rounded-xl border border-[#DED3C8] group-hover:border-transparent transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Bắt đầu Quiz ngay ➔</span>
                    </button>
                  </div>
                </Card3DTilt>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: ACTIVE QUIZ TAKING VIEW
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 sm:px-6 lg:px-8 font-sans text-[#231917]">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-[#FAF3EB] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <button
              onClick={() => setSelectedQuizMode(null)}
              className="text-xs font-black text-[#C65D4B] hover:underline flex items-center gap-1 mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Đổi loại Quiz khác</span>
            </button>
            <h1 className="text-2xl font-extrabold text-[#231917] leading-tight">{quizData.title}</h1>
            <p className="text-xs font-semibold text-[#76685F] mt-1">{quizData.description} (Tổng số: {totalQuestions} câu hỏi)</p>
          </div>

          {/* Timer Info */}
          <div className="flex items-center gap-4 bg-white border border-[#DED3C8] px-4 py-3 rounded-2xl shadow-2xs">
            {timeLeftSeconds !== null && (
              <div className="text-center pr-3 border-r border-[#DED3C8]">
                <div className="text-[10px] font-black text-[#76685F] uppercase">Thời gian còn lại</div>
                <div className={`text-lg font-mono font-black ${timeLeftSeconds < 60 ? "text-rose-600 animate-pulse" : "text-[#231917]"}`}>
                  {formatTime(timeLeftSeconds)}
                </div>
              </div>
            )}
            <div className="text-center">
              <div className="text-[10px] font-black text-[#76685F] uppercase">Mốc đạt</div>
              <div className="text-lg font-black text-[#C65D4B]">{quizData.passScore}%</div>
            </div>
          </div>
        </div>

        {/* RESULT VIEW */}
        {result ? (
          <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-8 animate-fade-in">
            {/* Score Banner */}
            <div className={`p-6 rounded-3xl border-2 text-center space-y-2 ${result.passed ? "bg-emerald-500/10 border-emerald-500 text-emerald-950" : "bg-rose-500/10 border-rose-500 text-rose-950"}`}>
              <div className="text-5xl">{result.passed ? "🏆" : "💪"}</div>
              <h2 className="text-2xl font-extrabold">
                {result.passed ? "🎉 CHÚC MỪNG! BẠN ĐÃ ĐẠT BÀI QUIZ!" : "Chưa đạt! Hãy thử sức lại nhé!"}
              </h2>
              <p className="text-sm font-black">
                Kết quả: <strong className="text-xl text-[#C65D4B]">{result.score}%</strong> (Đúng {result.correctCount}/{result.totalCount} câu)
              </p>
            </div>

            {/* Answer Breakdown */}
            <div className="space-y-6">
              <h3 className="text-lg font-extrabold text-[#231917]">Chi tiết đáp án & Lời giải ({result.totalCount} câu)</h3>

              {result.answers.map((ans, idx) => (
                <div key={ans.questionId} className="border-2 border-[#DED3C8] rounded-2xl p-5 bg-[#FFFDF9] space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-extrabold text-sm text-[#231917]">
                      Câu {idx + 1}: {ans.prompt}
                    </span>
                    {ans.isCorrect !== undefined && (
                      <span className={`text-xs font-black px-3 py-1 rounded-full border ${ans.isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300"}`}>
                        {ans.isCorrect ? "✓ Đúng" : "✗ Sai"}
                      </span>
                    )}
                  </div>

                  {ans.options && ans.options.length > 0 ? (
                    <div className="space-y-2">
                      {ans.options.map((opt) => {
                        const isSelected = ans.selectedOptionId === opt.optionId;
                        const isCorrectOpt = opt.isCorrect === true;

                        let optBg = "bg-white border-[#DED3C8]";
                        if (isSelected && isCorrectOpt) optBg = "bg-emerald-100 border-emerald-400 text-emerald-950 font-black";
                        else if (isSelected && !isCorrectOpt) optBg = "bg-rose-100 border-rose-400 text-rose-950";
                        else if (isCorrectOpt) optBg = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";

                        return (
                          <div key={opt.optionId} className={`p-3.5 rounded-xl border text-xs font-extrabold flex items-center justify-between ${optBg}`}>
                            <span>{opt.optionText}</span>
                            {isSelected && <span className="text-[10px] font-black uppercase">(Đã chọn)</span>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs font-extrabold text-[#76685F]">
                      Bạn đã gõ: <span className="font-mono text-[#C65D4B] underline">{ans.textAnswer || "(Bỏ trống)"}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setSelectedQuizMode(null);
                }}
                className="px-6 py-3 bg-white border-2 border-[#DED3C8] hover:bg-[#FAF3EB] text-[#231917] font-black text-xs sm:text-sm rounded-2xl transition-all cursor-pointer"
              >
                🔄 Thử loại Quiz khác
              </button>
              <Link
                href={`/lessons/${quizId}`}
                className="px-8 py-3 bg-[#C65D4B] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md hover:bg-[#B04F3F] transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Trở về bài học</span>
              </Link>
            </div>
          </div>
        ) : (
          /* QUESTION LIST TAKING VIEW */
          <div className="space-y-6">
            {quizData.questions.map((q, idx) => (
              <div key={q.questionId} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#C65D4B] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#C65D4B]/30">
                    Câu hỏi {idx + 1} / {quizData.questions.length}
                  </span>
                  <span className="text-xs text-[#76685F] font-bold">Trọng số: {q.weight}đ</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-extrabold text-[#231917] leading-relaxed">{q.prompt}</h3>

                  {/* Audio Play Button for Listening Mode */}
                  {q.questionType === "LISTENING" && q.audioText && (
                    <button
                      type="button"
                      onClick={() => playAudio(q.audioText!)}
                      className="px-4 py-2 bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe phát âm chuẩn (🔊)</span>
                    </button>
                  )}
                </div>

                {/* Question Options or Typing Input */}
                {q.questionType === "TYPING" ? (
                  <input
                    type="text"
                    placeholder="Gõ Romaji tương ứng..."
                    value={userAnswers[q.questionId]?.textAnswer || ""}
                    onChange={(e) => handleTextChange(q.questionId, e.target.value)}
                    className="w-full p-4 bg-white border-2 border-[#DED3C8] focus:border-[#C65D4B] rounded-2xl text-base font-black text-[#231917] outline-hidden shadow-inner"
                  />
                ) : (
                  <div className="space-y-2.5 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = userAnswers[q.questionId]?.selectedOptionId === opt.optionId;

                      return (
                        <button
                          key={opt.optionId}
                          type="button"
                          onClick={() => handleSelectOption(q.questionId, opt.optionId)}
                          className={`w-full text-left p-4 rounded-2xl border-2 text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? "bg-[#C65D4B] border-[#B04F3F] text-white font-black shadow-md scale-[1.01]"
                              : "bg-white border-[#DED3C8] text-[#231917] font-extrabold hover:border-[#C65D4B]/60"
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs shrink-0 ${
                            isSelected ? "border-white bg-white text-[#C65D4B] font-black" : "border-[#DED3C8]"
                          }`}>
                            {isSelected ? "✓" : ""}
                          </span>
                          <span>{opt.optionText}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Submit Action Bar */}
            <div className="bg-[#FAF3EB] border-2 border-[#DED3C8] rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div className="space-y-0.5">
                <span className="text-xs font-black text-[#231917]">
                  Đã trả lời: <strong className="text-emerald-700">{answeredCount}</strong> / {totalQuestions} câu
                </span>
                {unansweredCount > 0 && (
                  <p className="text-[11px] font-bold text-amber-700">
                    ⚠️ Còn {unansweredCount} câu chưa làm (bỏ trống).
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                disabled={submitting}
                className="px-8 py-3.5 bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-lg hover:scale-105 cursor-pointer disabled:opacity-50"
              >
                Nộp bài quiz ➔
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-600 mx-auto flex items-center justify-center text-2xl shadow-xs">
              ❓
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#231917]">
                Xác Nhận Nộp Bài Quiz?
              </h3>
              <p className="text-xs font-semibold text-[#76685F]">
                Vui lòng kiểm tra lại số lượng câu đã hoàn thành trước khi nộp bài:
              </p>
            </div>

            {/* Answer Progress Stats Breakdown */}
            <div className="bg-[#FAF3EB] border border-[#DED3C8] rounded-2xl p-4 space-y-2.5 text-xs text-left">
              <div className="flex justify-between items-center font-extrabold text-[#231917]">
                <span>📊 Tổng số câu hỏi:</span>
                <span className="font-mono text-sm">{totalQuestions} câu</span>
              </div>
              <div className="flex justify-between items-center font-extrabold text-emerald-700">
                <span>✅ Số câu đã làm:</span>
                <span className="font-mono text-sm">{answeredCount} câu</span>
              </div>
              <div className="flex justify-between items-center font-extrabold text-rose-600">
                <span>⚠️ Số câu chưa làm (bỏ trống):</span>
                <span className="font-mono text-sm">{unansweredCount} câu</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-extrabold rounded-xl text-left flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Bạn vẫn còn <strong className="text-rose-600">{unansweredCount} câu</strong> chưa trả lời. Các câu bỏ trống sẽ bị tính 0 điểm!
                </span>
              </div>
            )}

            {/* Modal Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="py-3 px-4 bg-white hover:bg-[#FAF3EB] text-[#6E5E52] font-black text-xs rounded-2xl border-2 border-[#DED3C8] transition-all cursor-pointer"
              >
                Quay lại làm tiếp
              </button>
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="py-3 px-4 bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
              >
                {submitting ? "Đang nộp..." : "Xác nhận nộp bài ➔"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
