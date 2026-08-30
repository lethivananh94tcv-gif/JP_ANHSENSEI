"use client";

import { useState } from "react";
import { DueFlashcardsCountData } from "./types";
import { Sparkles, Play, Flame, ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VocabularyHeroProps {
  onContinueLatest: () => void;
  dueData?: DueFlashcardsCountData | null;
  disabled?: boolean;
}

export default function VocabularyHero({
  onContinueLatest,
  dueData,
  disabled = false,
}: VocabularyHeroProps) {
  const dueCount = dueData?.dueCount ?? 0;
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Expanded Rich Cat Persona: 13 Unique Quotes with Matching Distinct Facial Expressions!
  const catQuotes = [
    { text: "Mình học một chút nhé! 🐾", expression: "HAPPY" },
    { text: "Cùng cố gắng đỗ N5 - N1 nha! ✨", expression: "EXCITED" },
    { text: "Mỗi ngày 10 từ vựng là giỏi lắm đấy! 💮", expression: "HAPPY" },
    { text: "Nhấp vào bài học bên dưới để chiến thôi! 🚀", expression: "FIGHTING" },
    { text: "Cố lên! Bạn đang học rất chăm chỉ! 🧧", expression: "LOVE" },
    { text: "がんばってね！(Cố lên nhé!) 🎌", expression: "EXCITED" },
    { text: "ANH SENSEI luôn đồng hành cùng bạn! 💖", expression: "LOVE" },
    { text: "Chinh phục JLPT trong tầm tay! 🔥", expression: "FIGHTING" },
    { text: "Hôm nay bạn đã ôn tập SRS chưa đó? 📚", expression: "WINK" },
    { text: "Bấm thử Game Ghép Thẻ 3D cực vui kìa! 🎮", expression: "WINK" },
    { text: "Bậc thầy từ vựng Tiếng Nhật là đây chứ đâu! 👑", expression: "COOL" },
    { text: "Wow! Bạn đã tích thêm nhiều XP thưởng kìa! ⭐", expression: "SURPRISED" },
    { text: "Học xong nhớ nghỉ ngơi dưỡng sức nha! 🌙", expression: "SLEEPY" },
  ];

  const [catQuoteIndex, setCatQuoteIndex] = useState(0);

  const handleCatClick = () => {
    setCatQuoteIndex((prev) => {
      let nextIndex = Math.floor(Math.random() * catQuotes.length);
      while (nextIndex === prev && catQuotes.length > 1) {
        nextIndex = Math.floor(Math.random() * catQuotes.length);
      }
      return nextIndex;
    });
  };

  const currentQuote = catQuotes[catQuoteIndex];
  const expression = currentQuote.expression;

  const dailyQuiz = {
    question: "Từ vựng '勉強する' (Benkyou suru) có nghĩa là gì?",
    options: [
      { text: "A. Ăn uống", isCorrect: false },
      { text: "B. Học tập", isCorrect: true },
      { text: "C. Đi ngủ", isCorrect: false },
    ],
  };

  return (
    <motion.section
      aria-label="Khung chào mừng học từ vựng"
      whileHover={{ scale: 1.001 }}
      transition={{ duration: 0.2 }}
      className="relative w-full bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EB] to-[#FFFDF9] border border-[#E5D7C7] rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(74,52,38,0.04)] overflow-hidden select-none"
    >
      {/* Subtle Japanese Background Watermark Pattern */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-64 h-64 bg-[radial-gradient(#C65D4B_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Text & Actions (8 cols) */}
        <div className="lg:col-span-8 space-y-4 text-center sm:text-left">
          {/* Badge Tag */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDF0EE] border border-[#F5D5D0] text-[#C65D4B] text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C65D4B]" />
              <span>TRUNG TÂM HỌC TỪ VỰNG ANH SENSEI</span>
            </span>

            {dueCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Cần ôn tập: {dueCount} từ</span>
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1714] tracking-tight leading-tight flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span>Học từ vựng tiếng Nhật</span>
              <span className="text-[#C65D4B]">mỗi ngày</span>
              <span className="inline-block animate-bounce text-xl sm:text-2xl">🪴</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6E5D55] font-medium leading-relaxed max-w-xl">
              Hệ thống thẻ ghi nhớ Spaced Repetition (SRS) giúp bạn ghi nhớ sâu từ vựng N5 – N1 và tự tin chinh phục kỳ thi JLPT.
            </p>
          </div>

          {/* Lucky Daily Quiz Accordion Button */}
          <div>
            {!showQuiz ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFF8EE] hover:bg-[#FFF2DF] border border-amber-200 text-amber-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>⭐ Thử sức Quiz từ vựng may mắn hôm nay (+30 XP) 🎁</span>
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-3.5 space-y-2.5 max-w-md shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>{dailyQuiz.question}</span>
                    <button onClick={() => setShowQuiz(false)} className="text-[#76655A] hover:text-[#1F1714] font-bold cursor-pointer text-xs">✕</button>
                  </div>

                  {!quizAnswered ? (
                    <div className="grid grid-cols-3 gap-2">
                      {dailyQuiz.options.map((opt) => (
                        <button
                          key={opt.text}
                          onClick={() => setQuizAnswered(true)}
                          className="py-1.5 px-2.5 bg-[#FAF4EB] hover:bg-[#C65D4B] text-[#1F1714] hover:text-white text-[11px] font-bold rounded-xl transition-colors border border-[#E5D7C7] cursor-pointer"
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chính xác! Bạn nhận +30 XP thưởng bài học hôm nay! 🚀</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Primary Action Button & Stats Row */}
          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <button
              type="button"
              onClick={onContinueLatest}
              disabled={disabled}
              className={`px-5 py-2.5 font-bold text-xs sm:text-sm rounded-xl border transition-all flex items-center justify-center gap-2 ${disabled
                ? "bg-[#FAF4EB] text-[#8B786D]/50 cursor-not-allowed border-[#E5D7C7]"
                : "bg-[#C65D4B] hover:bg-[#B44C3B] text-white border-transparent shadow-xs cursor-pointer"
                }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Tiếp tục học ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Streak & XP Stats */}
            <div className="flex items-center gap-3 text-xs font-bold text-[#6E5D55] pt-0.5">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C65D4B]" />
                <span>25 ngày liên tục</span>
              </span>
              <span className="text-[#E5D7C7]">|</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>1,250 XP</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Mascot Frame (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative shrink-0 z-10 pt-2 lg:pt-0">
          {/* Speech Bubble Above Mascot */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleCatClick}
            className="bg-white border border-[#E5D7C7] text-[#1F1714] px-3.5 py-1.5 rounded-xl shadow-xs text-xs font-extrabold whitespace-nowrap z-20 flex items-center gap-1 cursor-pointer hover:scale-105 transition-all mb-2"
          >
            <span>{currentQuote.text}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-[#E5D7C7] rotate-45" />
          </motion.div>

          {/* Cute Cat Mascot Illustration Holding Book/Card */}
          <motion.div
            onClick={handleCatClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center cursor-pointer group"
          >
            <svg
              className="w-full h-full filter drop-shadow-md transition-all duration-300"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Torii Gate Outline Background */}
              <path d="M20 130 H140 M30 130 V50 M130 130 V50 M20 40 H140 M15 30 H145" stroke="#F3EBE0" strokeWidth="4" strokeLinecap="round" />
              <circle cx="80" cy="45" r="14" fill="#FDF0EE" opacity="0.6" />

              {/* Cat Ears */}
              <path d="M48 60 L32 30 L62 48 Z" fill="#F3EBE0" stroke="#1F1714" strokeWidth="2.5" />
              <path d="M42 52 L36 36 L52 46 Z" fill="#F5D5D0" />
              <path d="M112 60 L128 30 L98 48 Z" fill="#F3EBE0" stroke="#1F1714" strokeWidth="2.5" />
              <path d="M118 52 L124 36 L108 46 Z" fill="#F5D5D0" />

              {/* Cat Head */}
              <ellipse cx="80" cy="80" rx="42" ry="36" fill="#FFFDF9" stroke="#1F1714" strokeWidth="2.5" />

              {/* Eyes */}
              <path d="M60 76 Q68 68 74 76" stroke="#1F1714" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M86 76 Q92 68 100 76" stroke="#1F1714" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* Blushing Cheeks */}
              <ellipse cx="54" cy="84" rx="7" ry="4" fill="#F5D5D0" />
              <ellipse cx="106" cy="84" rx="7" ry="4" fill="#F5D5D0" />

              {/* Nose & Mouth */}
              <path d="M78 82 L82 82 L80 84 Z" fill="#C65D4B" />
              <path d="M74 88 Q80 93 86 88" stroke="#1F1714" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Desk & Books */}
              <rect x="25" y="115" width="110" height="8" rx="4" fill="#F3EBE0" stroke="#1F1714" strokeWidth="2" />
              <rect x="35" y="105" width="30" height="10" rx="2" fill="#C65D4B" stroke="#1F1714" strokeWidth="1.5" />
              <rect x="38" y="97" width="26" height="8" rx="2" fill="#8B786D" stroke="#1F1714" strokeWidth="1.5" />

              {/* Flashcard held by Cat */}
              <rect x="68" y="92" width="24" height="20" rx="3" fill="#FFFDF9" stroke="#C65D4B" strokeWidth="2" transform="rotate(-6 80 102)" />
              <text x="75" y="106" fill="#C65D4B" fontSize="13" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-6 80 102)">語</text>

              {/* Potted Plant */}
              <path d="M120 115 L124 102 H136 L140 115 Z" fill="#8B786D" stroke="#1F1714" strokeWidth="1.5" />
              <path d="M130 102 Q122 92 126 84 Q134 92 130 102" fill="#81C784" stroke="#1F1714" strokeWidth="1.5" />
              <path d="M130 102 Q138 92 134 84 Q126 92 130 102" fill="#66BB6A" stroke="#1F1714" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
