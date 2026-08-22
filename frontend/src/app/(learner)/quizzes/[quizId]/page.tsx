"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";

interface QuestionOption {
  optionId: number;
  optionText: string;
  isCorrect?: boolean;
}

interface QuestionItem {
  questionId: number;
  questionType: string;
  prompt: string;
  weight: number;
  audioUrl?: string;
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

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.quizId;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quizData, setQuizData] = useState<StartQuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedOptionId?: number; textAnswer?: string }>>({});
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);

  useEffect(() => {
    async function initQuiz() {
      try {
        setLoading(true);
        setError(null);

        const res = await apiClient<StartQuizData>(`/learner/quizzes/${quizId}/start`, {
          method: "POST",
        });

        const data = res.data;
        setQuizData(data);

        // Pre-fill saved answers
        const initialAnswers: Record<number, { selectedOptionId?: number; textAnswer?: string }> = {};
        data.questions.forEach((q) => {
          if (q.currentSavedOptionId || q.currentSavedTextAnswer) {
            initialAnswers[q.questionId] = {
              selectedOptionId: q.currentSavedOptionId,
              textAnswer: q.currentSavedTextAnswer,
            };
          }
        });
        setUserAnswers(initialAnswers);

        // Timer setup
        if (data.timeLimitMinutes && data.timeLimitMinutes > 0) {
          setTimeLeftSeconds(data.timeLimitMinutes * 60);
        }
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi khi tải bài thi.");
      } finally {
        setLoading(false);
      }
    }

    initQuiz();
  }, [quizId]);

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
    autosave(questionId, optionId, userAnswers[questionId]?.textAnswer);
  };

  const handleTextChange = (questionId: number, text: string) => {
    const updated = {
      ...userAnswers,
      [questionId]: { ...userAnswers[questionId], textAnswer: text },
    };
    setUserAnswers(updated);
    autosave(questionId, userAnswers[questionId]?.selectedOptionId, text);
  };

  const autosave = async (questionId: number, selectedOptionId?: number, textAnswer?: string) => {
    if (!quizData) return;
    try {
      await apiClient(`/learner/quizzes/attempts/${quizData.attemptId}/answers`, {
        method: "PUT",
        body: JSON.stringify({
          answers: [{ questionId, selectedOptionId, textAnswer }],
        }),
      });
    } catch {
      // Silent autosave failure
    }
  };

  const handleAutoSubmit = () => {
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = async () => {
    if (!quizData || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      const formattedAnswers = Object.entries(userAnswers).map(([qId, ans]) => ({
        questionId: Number(qId),
        selectedOptionId: ans.selectedOptionId,
        textAnswer: ans.textAnswer,
      }));

      const res = await apiClient<QuizResultData>(`/learner/quizzes/attempts/${quizData.attemptId}/submit`, {
        method: "POST",
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      setResult(res.data);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi nộp bài thi.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#C65D4B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-[#56423E]">Đang chuẩn bị đề thi...</p>
        </div>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="bg-white border border-[#DED3C8] rounded-3xl p-8 max-w-md text-center space-y-4 shadow-sm">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-serif font-bold text-[#231917]">Không thể mở bài thi</h2>
          <p className="text-xs text-[#76685F]">{error || "Đã xảy ra lỗi không xác định."}</p>
          <Link
            href="/levels"
            className="inline-block px-6 py-2.5 bg-[#C65D4B] text-white text-xs font-bold rounded-xl hover:bg-[#a84c3c] transition-all"
          >
            Quay lại bài học
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-[#FAF3EB] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-[#E8DDD2] text-[#8B6F5A] px-3 py-1 rounded-full">
              Lần làm bài #{quizData.attemptNumber} {quizData.isResumed && "(Tiếp tục làm bài)"}
            </span>
            <h1 className="text-2xl font-serif font-extrabold text-[#231917] mt-2">{quizData.title}</h1>
            {quizData.description && (
              <p className="text-xs text-[#76685F] mt-1">{quizData.description}</p>
            )}
          </div>

          {/* Timer & Pass Score Info */}
          <div className="flex items-center gap-4 bg-[#FFFDF9] border border-[#DED3C8] px-4 py-3 rounded-2xl">
            {timeLeftSeconds !== null && (
              <div className="text-center pr-3 border-r border-[#DED3C8]">
                <div className="text-[10px] font-bold text-[#76685F] uppercase">Thời gian</div>
                <div className={`text-lg font-mono font-bold ${timeLeftSeconds < 120 ? "text-red-600 animate-pulse" : "text-[#231917]"}`}>
                  {formatTime(timeLeftSeconds)}
                </div>
              </div>
            )}
            <div className="text-center">
              <div className="text-[10px] font-bold text-[#76685F] uppercase">Điểm đạt</div>
              <div className="text-lg font-bold text-[#C65D4B]">{quizData.passScore}%</div>
            </div>
          </div>
        </div>

        {/* RESULT VIEW */}
        {result ? (
          <div className="bg-white border border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
            {/* Score Banner */}
            <div className={`p-6 rounded-2xl border text-center space-y-2 ${result.passed ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"}`}>
              <div className="text-5xl">{result.passed ? "🎉" : "💪"}</div>
              <h2 className="text-2xl font-serif font-extrabold">
                {result.passed ? "Chúc mừng! Bạn đã hoàn thành bài Quiz!" : "Chưa đạt! Hãy thử sức lại nhé!"}
              </h2>
              <p className="text-sm font-medium">
                Kết quả: <strong className="text-lg">{result.score}%</strong> (Đúng {result.correctCount}/{result.totalCount} câu)
              </p>
            </div>

            {/* Answer Breakdown */}
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-[#231917]">Chi tiết đáp án & Lời giải</h3>

              {result.answers.map((ans, idx) => (
                <div key={ans.questionId} className="border border-[#DED3C8] rounded-2xl p-5 bg-[#FFFDF9] space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-sm text-[#231917]">
                      Câu {idx + 1}: {ans.prompt}
                    </span>
                    {ans.isCorrect !== undefined && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ans.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {ans.isCorrect ? "✓ Đúng" : "✗ Sai"}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {ans.options.map((opt) => {
                      const isSelected = ans.selectedOptionId === opt.optionId;
                      const isCorrectOpt = opt.isCorrect === true;

                      let optBg = "bg-white border-[#DED3C8]";
                      if (isSelected && isCorrectOpt) optBg = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
                      else if (isSelected && !isCorrectOpt) optBg = "bg-rose-100 border-rose-400 text-rose-900";
                      else if (isCorrectOpt) optBg = "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";

                      return (
                        <div key={opt.optionId} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optBg}`}>
                          <span>{opt.optionText}</span>
                          {isSelected && <span className="text-[10px] font-bold uppercase">(Đã chọn)</span>}
                        </div>
                      );
                    })}
                  </div>

                  {ans.explanation && (
                    <div className="bg-[#FAF3EB] border border-[#DED3C8] p-3.5 rounded-xl text-xs text-[#56423E] space-y-1">
                      <span className="font-bold text-[#C65D4B]">💡 Giải thích:</span>
                      <p>{ans.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {result.answers.some((a) => a.isCorrect === false) && (
                <button
                  type="button"
                  onClick={() => {
                    alert("Chuyển sang Chế độ Luyện tự do với các câu trả lời sai!");
                  }}
                  className="px-6 py-3 bg-[#56423E] hover:bg-[#3d2f2c] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  🔄 Ôn tập & Luyện lại các câu sai (Tự do)
                </button>
              )}
              <Link
                href="/levels"
                className="px-8 py-3 bg-[#C65D4B] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#a84c3c] transition-all flex items-center gap-2"
              >
                Trở về danh sách bài học
              </Link>
            </div>
          </div>
        ) : (
          /* QUESTION LIST TAKING VIEW */
          <div className="space-y-6">
            {quizData.questions.map((q, idx) => (
              <div key={q.questionId} className="bg-white border border-[#DED3C8] rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C65D4B] uppercase tracking-wider">
                    Câu hỏi {idx + 1} / {quizData.questions.length}
                  </span>
                  <span className="text-[11px] text-[#76685F] font-medium">Trọng số: {q.weight}đ</span>
                </div>

                <h3 className="text-base font-bold text-[#231917]">{q.prompt}</h3>

                {/* Question Options */}
                {q.options && q.options.length > 0 ? (
                  <div className="space-y-2.5 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = userAnswers[q.questionId]?.selectedOptionId === opt.optionId;

                      return (
                        <button
                          key={opt.optionId}
                          type="button"
                          onClick={() => handleSelectOption(q.questionId, opt.optionId)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center gap-3 ${
                            isSelected
                              ? "bg-[#FAF3EB] border-[#C65D4B] text-[#C65D4B] font-bold shadow-2xs"
                              : "bg-[#FFFDF9] border-[#DED3C8] text-[#56423E] hover:border-[#8B6F5A]"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                            isSelected ? "border-[#C65D4B] bg-[#C65D4B] text-white" : "border-[#DED3C8]"
                          }`}>
                            {isSelected ? "✓" : ""}
                          </span>
                          <span>{opt.optionText}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    rows={3}
                    placeholder="Nhập câu trả lời của bạn..."
                    value={userAnswers[q.questionId]?.textAnswer || ""}
                    onChange={(e) => handleTextChange(q.questionId, e.target.value)}
                    className="w-full p-3 bg-[#FFFDF9] border border-[#DED3C8] rounded-xl text-xs text-[#231917] focus:outline-none focus:border-[#C65D4B]"
                  />
                )}
              </div>
            ))}

            {/* Submit Action Bar */}
            <div className="bg-[#FAF3EB] border border-[#DED3C8] rounded-3xl p-6 flex items-center justify-between shadow-xs">
              <span className="text-xs text-[#76685F]">
                Đã trả lời {Object.keys(userAnswers).length}/{quizData.questions.length} câu hỏi
              </span>
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="px-8 py-3 bg-[#C65D4B] text-white font-bold text-xs rounded-xl hover:bg-[#a84c3c] transition-all shadow-sm disabled:opacity-50"
              >
                {submitting ? "Đang chấm điểm..." : "Nộp bài quiz ➔"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
