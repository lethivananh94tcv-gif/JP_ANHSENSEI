"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ArrowLeft, CheckCircle2, XCircle, Zap, Trophy, Flame, Sparkles } from "lucide-react";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";
import { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";

interface MultiLessonTypingReviewProps {
  items: VocabularyDto[];
  onFinish: (score: number) => void;
  onBackToPicker: () => void;
}

export default function MultiLessonTypingReview({
  items,
  onFinish,
  onBackToPicker,
}: MultiLessonTypingReviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"IDLE" | "CORRECT" | "INCORRECT">("IDLE");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentItem = items[currentIndex];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  const playAudio = () => {
    if (currentItem) {
      playJapaneseTTS({
        text: currentItem.word || currentItem.kana,
        audioUrl: currentItem.audioUrl,
      });
    }
  };

  const normalizeText = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[\.\,\!\?]/g, "");
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "IDLE" || !inputValue.trim()) return;

    const userInput = normalizeText(inputValue);
    const targetWord = normalizeText(currentItem.word || "");
    const targetKana = normalizeText(currentItem.kana || "");
    const targetRomaji = currentItem.romaji ? normalizeText(currentItem.romaji) : "";

    const isMatch =
      userInput === targetWord ||
      userInput === targetKana ||
      (targetRomaji && userInput === targetRomaji);

    if (isMatch) {
      setStatus("CORRECT");
      setScore((prev) => prev + 10 + streak * 2);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      playAudio();
    } else {
      setStatus("INCORRECT");
      setStreak(0);
    }

    setTimeout(() => {
      setInputValue("");
      setStatus("IDLE");
      if (currentIndex + 1 < items.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }, 1200);
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-2xl text-center space-y-6 max-w-xl mx-auto my-8 relative overflow-hidden"
      >
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-800">Hoàn Thành Màn Luyện Gõ! ⌨️</h2>
          <p className="text-slate-600 font-medium">
            Bạn đã gõ chính xác toàn bộ <span className="font-bold text-emerald-600">{items.length} từ vựng</span>!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="bg-emerald-50/90 border border-emerald-200 p-4 rounded-xl space-y-1">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block">Điểm số</span>
            <span className="text-3xl font-black text-emerald-600">{score} pt</span>
          </div>
          <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-xl space-y-1">
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">Chuỗi Streak đúng</span>
            <span className="text-3xl font-black text-amber-600">{maxStreak} 🔥</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={onBackToPicker}
            className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer"
          >
            ← Chọn bài học khác
          </button>
          <button
            onClick={() => onFinish(score)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C65D4B] to-rose-600 hover:from-[#B04F3F] text-white font-bold text-sm transition-all shadow-md shadow-[#C65D4B]/30 cursor-pointer"
          >
            Xác nhận kết quả 🚀
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onBackToPicker}
          className="flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Đổi bài ôn tập
        </button>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-full border border-amber-200">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-600" /> Combo Streak: {streak} 🔥
          </span>
          <span className="text-xs font-black px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-full">
            Từ {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Main Typing Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-8 shadow-xl text-center space-y-7 relative overflow-hidden">
        {/* Progress Bar Header */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden absolute top-0 left-0 right-0">
          <div
            className="bg-gradient-to-r from-emerald-500 via-amber-500 to-[#C65D4B] h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>

        {/* Prompt Section */}
        <div className="space-y-3 pt-4">
          <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider px-3.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Nghĩa Tiếng Việt
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{currentItem.meaningVi}</h2>

          {currentItem.word !== currentItem.kana && (
            <p className="text-base font-jp font-extrabold text-[#C65D4B] bg-rose-50 inline-block px-4 py-1.5 rounded-xl border border-rose-100">
              Gợi ý Kanji: {currentItem.word}
            </p>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmitAnswer} className="space-y-5 max-w-md mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={status !== "IDLE"}
              placeholder="Gõ Kana, Kanji hoặc Romaji vào đây..."
              className={`w-full text-center text-xl font-black font-jp py-4 px-6 rounded-2xl border-2 transition-all outline-none shadow-xs ${
                status === "CORRECT"
                  ? "border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-4 ring-emerald-200"
                  : status === "INCORRECT"
                  ? "border-rose-500 bg-rose-50/90 text-rose-950 ring-4 ring-rose-200"
                  : "border-slate-300 focus:border-[#C65D4B] focus:ring-4 focus:ring-[#C65D4B]/15 bg-slate-50/70"
              }`}
            />

            {status === "CORRECT" && (
              <CheckCircle2 className="w-7 h-7 text-emerald-600 absolute right-4 top-1/2 -translate-y-1/2" />
            )}
            {status === "INCORRECT" && (
              <XCircle className="w-7 h-7 text-rose-600 absolute right-4 top-1/2 -translate-y-1/2" />
            )}
          </div>

          <button
            type="submit"
            disabled={status !== "IDLE" || !inputValue.trim()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C65D4B] to-rose-600 hover:from-[#B04F3F] disabled:opacity-50 text-white font-black text-base transition-all shadow-md shadow-[#C65D4B]/30 cursor-pointer"
          >
            {status === "IDLE" ? "Kiểm Tra Đáp Án ↵" : "Đang kiểm tra..."}
          </button>
        </form>

        {/* Feedback Reveal on Incorrect */}
        <AnimatePresence>
          {status === "INCORRECT" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-sm font-medium space-y-1 shadow-2xs"
            >
              <p className="font-bold text-xs uppercase tracking-wider text-rose-600">Đáp án chính xác là:</p>
              <p className="text-2xl font-black font-jp text-rose-700">
                {currentItem.word} ({currentItem.kana})
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
