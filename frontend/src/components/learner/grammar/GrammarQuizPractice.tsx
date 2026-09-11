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
        // 1. Try loading from dedicated learner practice-session endpoint
        const res = await apiClient<any>(`/learner/grammar/lessons/${lessonNum}/practice-session?limit=10`).catch(() => null);
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const formatted = res.data.map((q: any, idx: number) => {
            const rawOpts = Array.isArray(q.options) ? q.options : [];
            const correctStr = String(q.correctAnswer || "").trim();
            const optionObjs = rawOpts.map((o: any, oIdx: number) => {
              const optText = typeof o === "object" ? (o.optionText || o.text || "") : String(o);
              const isCorr = typeof o === "object" && o.isCorrect !== undefined
                ? Boolean(o.isCorrect)
                : optText.trim() === correctStr;
              return {
                optionId: oIdx + 1,
                optionText: optText,
                isCorrect: isCorr,
              };
            });

            return {
              questionId: q.questionId || idx + 1,
              prompt: q.title || q.promptVi || `Chọn đáp án ngữ pháp đúng cho Bài ${lessonNum}`,
              questionType: q.type || "MULTIPLE_CHOICE",
              category: "GRAMMAR",
              japaneseText: q.promptJp || q.japaneseText || "",
              explanation: q.explanation || "Đáp án chuẩn ngữ pháp tiếng Nhật.",
              options: optionObjs,
            };
          });

          if (formatted.length > 0 && isMounted) {
            setQuestions(formatted);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not load backend learner practice session, using lesson grammar points:", err);
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
    <div className="p-8 text-center bg-[#FFFDF9] border-2 border-[#E5D7C7] rounded-3xl space-y-5 shadow-lg">
      <div className="w-14 h-14 bg-gradient-to-r from-[#D94129] to-[#FF5733] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
        <Zap className="w-7 h-7 fill-amber-300 text-amber-300" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-[#1F1714]">Bài Tập Quiz Ngữ Pháp 30 Câu (Bài #{lessonNum})</h3>
        <p className="text-xs sm:text-sm text-[#6E5D55] max-w-md mx-auto leading-relaxed">
          Bài thi trắc nghiệm chuẩn JLPT gồm 30 câu hỏi chuyên sâu Ngữ Pháp (sắp xếp câu Star Order, chia thể động từ, điền trợ từ và mẫu câu).
        </p>
      </div>
      <Link
        href={`/quizzes/${lessonNum}?category=GRAMMAR`}
        className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] hover:brightness-110 text-white text-sm font-black rounded-2xl shadow-xl shadow-[#D94129]/30 transition-all hover:scale-105"
      >
        <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
        <span>Vào Làm Bài Quiz Ngữ Pháp 30 Câu</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
