"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCw, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Sparkles, Trophy, Flame, Award } from "lucide-react";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";
import { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";

interface MultiLessonFlashcardReviewProps {
  items: VocabularyDto[];
  onFinish: (stats: { total: number; easyCount: number; hardCount: number }) => void;
  onBackToPicker: () => void;
}

export default function MultiLessonFlashcardReview({
  items,
  onFinish,
  onBackToPicker,
}: MultiLessonFlashcardReviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [easyCount, setEasyCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentItem = items[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / items.length) * 100);

  const playAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentItem) {
      playJapaneseTTS({
        text: currentItem.word || currentItem.kana,
        audioUrl: currentItem.audioUrl,
      });
    }
  };

  const handleRating = (rating: "AGAIN" | "HARD" | "GOOD" | "EASY") => {
    if (rating === "EASY" || rating === "GOOD") {
      setEasyCount((prev) => prev + 1);
    } else {
      setHardCount((prev) => prev + 1);
    }

    setIsFlipped(false);
    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-2xl text-center space-y-6 max-w-xl mx-auto my-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full filter blur-2xl pointer-events-none" />
        
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-800">Hoàn Thành Đợt Ôn Thẻ Ghi Nhớ! 🎉</h2>
          <p className="text-slate-600 font-medium">
            Bạn đã xuất sắc ôn xong <span className="font-bold text-[#C65D4B]">{items.length} từ vựng</span> chọn lọc!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="bg-emerald-50/90 border border-emerald-200 p-4 rounded-xl space-y-1">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block">Ghi nhớ tốt</span>
            <span className="text-3xl font-black text-emerald-600">{easyCount} từ</span>
          </div>
          <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-xl space-y-1">
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">Cần ôn lại</span>
            <span className="text-3xl font-black text-amber-600">{hardCount} từ</span>
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
            onClick={() => onFinish({ total: items.length, easyCount, hardCount })}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C65D4B] to-rose-600 hover:from-[#B04F3F] hover:to-rose-700 text-white font-bold text-sm transition-all shadow-md shadow-[#C65D4B]/30 cursor-pointer"
          >
            Xác nhận hoàn thành 🚀
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onBackToPicker}
          className="flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Đổi bài ôn tập
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black px-3.5 py-1.5 bg-rose-50 text-[#C65D4B] rounded-full border border-rose-100">
            Từ {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Modern Gradient Progress Bar */}
      <div className="w-full bg-slate-200/80 h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
        <div
          className="bg-gradient-to-r from-amber-500 via-[#C65D4B] to-rose-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 3D PERSPECTIVE FLASHCARD */}
      <div className="perspective-1000 min-h-[380px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full min-h-[380px] relative rounded-3xl bg-gradient-to-b from-white via-amber-50/20 to-white border-2 border-amber-200/90 shadow-xl p-8 flex flex-col justify-between items-center text-center transition-all group hover:border-amber-400 hover:shadow-2xl"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT SIDE */}
          <div
            className={`w-full h-full flex flex-col justify-between items-center ${
              isFlipped ? "hidden" : "block"
            }`}
          >
            <div className="w-full flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="bg-amber-100/80 text-amber-900 px-3 py-1 rounded-xl border border-amber-200">
                {currentItem.partOfSpeech || "Từ vựng"}
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 font-extrabold bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" /> Nhấp để xem đáp án ↵
              </span>
            </div>

            <div className="my-auto space-y-3 py-6">
              <h2 className="text-4xl sm:text-6xl font-black font-jp text-[#C65D4B] tracking-tight drop-shadow-xs">
                {currentItem.word}
              </h2>
              {currentItem.word !== currentItem.kana && (
                <p className="text-2xl font-bold font-jp text-slate-500 bg-slate-100 px-4 py-1 rounded-full inline-block">
                  {currentItem.kana}
                </p>
              )}
            </div>

            <div className="w-full flex justify-center pt-2">
              <button
                type="button"
                onClick={playAudio}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm transition-all shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-5 h-5" /> Nghe phát âm 🔊
              </button>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className={`w-full h-full flex flex-col justify-between items-center ${
              isFlipped ? "block" : "hidden"
            }`}
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="w-full flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-xl border border-emerald-200 font-extrabold">
                Ý Nghĩa & Ví Dụ
              </span>
              <span className="text-slate-400 font-medium">Mặt sau đáp án</span>
            </div>

            <div className="my-auto space-y-4 py-4 max-w-md">
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{currentItem.meaningVi}</h3>
                {currentItem.romaji && (
                  <p className="text-sm font-semibold text-slate-400 italic">[{currentItem.romaji}]</p>
                )}
              </div>

              {currentItem.exampleJp && (
                <div className="bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/90 rounded-2xl p-4 text-left space-y-1.5 shadow-xs">
                  <p className="font-jp font-bold text-amber-950 text-base">{currentItem.exampleJp}</p>
                  {currentItem.exampleReading && (
                    <p className="font-jp text-xs font-medium text-amber-800">{currentItem.exampleReading}</p>
                  )}
                  <p className="text-xs text-slate-700 font-semibold pt-1.5 border-t border-amber-200/60">
                    {currentItem.exampleVi}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={playAudio}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#C65D4B]" /> Nghe lại âm thanh
            </button>
          </div>
        </motion.div>
      </div>

      {/* SRS Self-Rating Control Buttons */}
      <div className="grid grid-cols-4 gap-2.5 pt-2">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => handleRating("AGAIN")}
          className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <XCircle className="w-5 h-5 text-rose-600" />
          <span>Chưa nhớ</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => handleRating("HARD")}
          className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <RotateCw className="w-5 h-5 text-amber-600" />
          <span>Hơi khó</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => handleRating("GOOD")}
          className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <span>Đã nhớ</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => handleRating("EASY")}
          className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>Rất dễ</span>
        </motion.button>
      </div>
    </div>
  );
}
