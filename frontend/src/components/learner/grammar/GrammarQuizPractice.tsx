"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Sparkles, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, 
  HelpCircle, Volume2, ArrowUpRight, Zap, Check, Star, RefreshCw
} from "lucide-react";

import { apiClient } from "@/lib/api/client";

interface QuestionOption {
  optionId?: number;
  optionText: string;
  isCorrect?: boolean;
}

interface QuestionItem {
  questionId: number;
  prompt: string;
  questionType: string;
  category?: string;
  japaneseText?: string;
  explanation?: string;
  options: QuestionOption[];
}

interface GrammarQuizPracticeProps {
  lessonNum: number;
  grammarPoints?: any[];
}

export default function GrammarQuizPractice({ lessonNum, grammarPoints }: GrammarQuizPracticeProps) {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function loadQuestions() {
      setLoading(true);
      try {
        // 1. Try loading from real backend Question Bank
        const json = await apiClient<any>(`/admin/question-bank/lesson/${lessonNum}`).catch(() => null);
        if (json && json.data) {
          const list = json.data.content || (Array.isArray(json.data) ? json.data : []);
          if (list.length > 0 && isMounted) {
            const formatted = list.map((q: any, idx: number) => ({
              questionId: q.questionId || idx + 1,
              prompt: q.prompt,
              questionType: q.questionType || "MULTIPLE_CHOICE",
              category: q.category || "GRAMMAR",
              japaneseText: q.japaneseText || "",
              explanation: q.explanation || "",
              options: (q.options || []).map((o: any) => ({
                optionId: o.optionId,
                optionText: o.optionText,
                isCorrect: o.isCorrect === true || o.correct === true,
              })),
            }));
            setQuestions(formatted);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not load backend questions, using lesson grammar points:", err);
      }

      // 2. Client-side fallback derived directly from lesson grammar points
      if (grammarPoints && grammarPoints.length > 0) {
        const generated: QuestionItem[] = grammarPoints.flatMap((gp: any, gIdx: number) => {
          const ex = gp.examples && gp.examples.length > 0 ? gp.examples[0] : { japaneseText: `${gp.pattern} です。`, meaningVi: gp.meaning };
          const cleanPattern = gp.pattern.replace(/[〜~]/g, "").trim();
          const blankSentence = ex.japaneseText.includes(cleanPattern) 
            ? ex.japaneseText.replace(cleanPattern, " _____ ") 
            : `${ex.japaneseText.slice(0, 3)} _____ ${ex.japaneseText.slice(3)}`;

          return [
            {
              questionId: gIdx * 3 + 1,
              prompt: `[Điền vào chỗ trống] 「 ${blankSentence} 」 (${ex.meaningVi})`,
              questionType: "FILL_BLANK",
              category: "GRAMMAR",
              explanation: `Mẫu ngữ pháp bài ${lessonNum}: 「 ${gp.pattern} 」 - ${gp.meaning}. ${gp.explanation || ""}`,
              options: [
                { optionText: cleanPattern || "は", isCorrect: true },
                { optionText: "が", isCorrect: false },
                { optionText: "に", isCorrect: false },
                { optionText: "で", isCorrect: false },
              ].sort(() => Math.random() - 0.5),
            },
            {
              questionId: gIdx * 3 + 2,
              prompt: `[Ý nghĩa ngữ pháp] Mẫu câu 「 ${gp.pattern} 」 có ý nghĩa và cách dùng gì?`,
              questionType: "MULTIPLE_CHOICE",
              category: "GRAMMAR",
              explanation: `Ý nghĩa: ${gp.meaning}. Cấu trúc: ${gp.structure || gp.pattern}`,
              options: [
                { optionText: gp.meaning, isCorrect: true },
                { optionText: "Diễn tả hành động đang tiếp diễn", isCorrect: false },
                { optionText: "Chỉ thời gian và địa điểm bắt đầu", isCorrect: false },
                { optionText: "Biểu thị nguyện vọng mong muốn", isCorrect: false },
              ].sort(() => Math.random() - 0.5),
            },
            {
              questionId: gIdx * 3 + 3,
              prompt: `[★ SẮP XẾP JLPT] Sắp xếp các từ để tạo thành câu đúng và chọn từ tại vị trí ngôi sao (★):\n「 ＿＿＿  ＿＿＿  ★  ＿＿＿ 。 」\n(Ý nghĩa: ${ex.meaningVi})`,
              questionType: "STAR_ORDER",
              category: "GRAMMAR",
              explanation: `Câu hoàn chỉnh: 「 ${ex.japaneseText} 」 (${ex.meaningVi}).\nThứ tự đúng: 1. わたし ➔ 2. は ➔ 3. がくせい (★) ➔ 4. です。\nMẫu ngữ pháp: ${gp.pattern}`,
              options: [
                { optionText: cleanPattern || "は", isCorrect: true },
                { optionText: "わたし", isCorrect: false },
                { optionText: "がくせい", isCorrect: false },
                { optionText: "です", isCorrect: false },
              ].sort(() => Math.random() - 0.5),
            },
          ];
        });

        if (isMounted) {
          setQuestions(generated);
          setLoading(false);
        }
      } else {
        if (isMounted) setLoading(false);
      }
    }

    loadQuestions();
    return () => { isMounted = false; };
  }, [lessonNum, grammarPoints]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIdx(index);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = currentQ.options[index]?.isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (loading) {
    return (
      <div className="p-10 text-center bg-[#FAF4EB] border border-[#E5D7C7] rounded-3xl space-y-3">
        <RefreshCw className="w-6 h-6 animate-spin text-[#C65D4B] mx-auto" />
        <p className="text-xs sm:text-sm font-bold text-[#6E5D55]">Đang tải bộ câu hỏi Quiz Bài #{lessonNum}...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center bg-[#FAF4EB] border border-[#E5D7C7] rounded-3xl space-y-4">
        <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
        <h4 className="text-base font-extrabold text-[#1F1714]">Bộ câu hỏi Quiz Bài #{lessonNum} đang được chuẩn bị</h4>
        <p className="text-xs text-[#6E5D55]">
          Bạn có thể mở toàn bộ đề thi 30 câu trong giao diện thi trắc nghiệm chuyên sâu.
        </p>
        <Link
          href={`/quizzes/${lessonNum}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white text-xs font-black rounded-xl shadow-xs transition-all"
        >
          <span>Vào Phòng Thi Trắc Nghiệm (30 câu)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
      {/* Header Info & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5D7C7] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#C65D4B]/10 text-[#C65D4B] flex items-center justify-center font-black text-xs">
            <Zap className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-sm font-black text-[#1F1714]">
              Bài Tập Trắc Nghiệm Chuẩn JLPT (Bài #{lessonNum})
            </h4>
            <span className="text-[11px] font-bold text-[#8B6F5A]">
              Câu {currentIndex + 1} / {questions.length} • {currentQ?.questionType || "MULTIPLE_CHOICE"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Điểm: {score}/{questions.length}
          </span>
          <Link
            href={`/quizzes/${lessonNum}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#C65D4B] hover:underline"
            title="Mở toàn màn hình phòng thi"
          >
            <span>Phòng thi lớn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#FAF4EB] h-2 rounded-full overflow-hidden border border-[#E5D7C7]">
        <div 
          className="bg-[#C65D4B] h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {!isCompleted ? (
        <div className="space-y-5">
          {/* Prompt Box */}
          <div className="p-4 sm:p-5 bg-[#FAF4EB] border-l-4 border-[#C65D4B] rounded-r-2xl space-y-3">
            <span className="px-2.5 py-0.5 bg-[#C65D4B]/10 text-[#C65D4B] font-black text-[10px] rounded-md uppercase">
              {currentQ.questionType === "STAR_ORDER" ? "★ DẠNG SẮP XẾP CÂU JLPT" : (currentQ.category || "NGỮ PHÁP")}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#1F1714] leading-relaxed whitespace-pre-line">
              {currentQ.prompt}
            </h3>

            {/* If japaneseText contains the target sentence and prompt didn't include it */}
            {currentQ.japaneseText && !currentQ.prompt.includes("「") && (
              <div className="p-3 bg-white border border-[#E5D7C7] rounded-xl font-black text-base text-[#1F1714]">
                {currentQ.japaneseText}
              </div>
            )}

            {/* Visual Slots for STAR_ORDER */}
            {currentQ.questionType === "STAR_ORDER" && (
              <div className="bg-white border-2 border-dashed border-[#C65D4B]/40 rounded-xl p-3 flex items-center justify-center gap-2 sm:gap-3 text-sm font-black text-[#1F1714] select-none shadow-2xs">
                <span className="px-3 py-1.5 bg-[#FAF4EB] border border-[#E5D7C7] rounded-lg text-xs text-[#8C7B70]">① ＿＿＿</span>
                <span className="px-3 py-1.5 bg-[#FAF4EB] border border-[#E5D7C7] rounded-lg text-xs text-[#8C7B70]">② ＿＿＿</span>
                <span className="px-3.5 py-1.5 bg-amber-100 border-2 border-amber-400 text-amber-900 rounded-lg shadow-xs flex items-center gap-1 text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                  <span>③ ★</span>
                </span>
                <span className="px-3 py-1.5 bg-[#FAF4EB] border border-[#E5D7C7] rounded-lg text-xs text-[#8C7B70]">④ ＿＿＿</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "bg-[#FFFDF9] border-[#E5D7C7] text-[#1F1714] hover:border-[#C65D4B]";
              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400";
                } else if (selectedOptionIdx === idx) {
                  btnStyle = "bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-300";
                } else {
                  btnStyle = "bg-[#FAF4EB]/60 border-[#E5D7C7] text-[#8C7B70] opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-2 cursor-pointer shadow-2xs ${btnStyle}`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#FAF4EB] text-[#8B6F5A] font-mono font-black text-xs flex items-center justify-center border border-[#E5D7C7] shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.optionText}</span>
                  </span>
                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && selectedOptionIdx === idx && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Button */}
          {isAnswered && (
            <div className="space-y-4 pt-2 animate-fadeIn">
              {currentQ.explanation && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-[#52443C] space-y-1">
                  <span className="font-bold text-amber-900 uppercase text-[10px] block">
                    💡 Lời giải thích & Mẹo ngữ pháp:
                  </span>
                  <p className="leading-relaxed font-medium">{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <span>{currentIndex < questions.length - 1 ? "Câu Tiếp Theo" : "Xem Kết Quả"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="py-8 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 bg-amber-100 border-2 border-amber-300 text-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#1F1714]">Hoàn Thành Bài Luyện Tập Quiz!</h3>
            <p className="text-xs sm:text-sm text-[#6E5D55]">
              Bạn đã hoàn thành toàn bộ {questions.length} câu hỏi của Bài #{lessonNum}.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-[#FAF4EB] border border-[#E5D7C7] px-6 py-3 rounded-2xl">
            <div>
              <span className="text-[10px] font-bold text-[#8B6F5A] block uppercase">Kết Quả</span>
              <span className="text-lg font-black text-[#C65D4B]">{score} / {questions.length} Đúng</span>
            </div>
            <div className="h-8 w-px bg-[#E5D7C7]" />
            <div>
              <span className="text-[10px] font-bold text-[#8B6F5A] block uppercase">Tỉ Lệ Đạt</span>
              <span className="text-lg font-black text-emerald-700">
                {Math.round((score / questions.length) * 100)}%
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#1F1714] font-bold text-xs rounded-xl border border-[#E5D7C7] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C65D4B]" />
              <span>Luyện Tập Lại</span>
            </button>
            <Link
              href={`/quizzes/${lessonNum}`}
              className="px-5 py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Làm Bài Thi Đầy Đủ 30 Câu (Bấm Giờ)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
