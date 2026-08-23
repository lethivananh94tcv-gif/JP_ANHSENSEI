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
      whileHover={{ scale: 1.002 }}
      transition={{ duration: 0.2 }}
      className="relative w-full bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] text-[#2C201D] border border-[#DED0C5] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-md overflow-hidden group select-none"
    >
      {/* Subtle Japanese Wood Pattern Texture Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B6F5A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Soft Background Accent */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#D66552]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#8B6F5A]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Japanese Watermark */}
      <div className="absolute right-16 bottom-1 text-7xl font-jp font-black text-[#8B6F5A]/[0.06] pointer-events-none hidden lg:block tracking-widest">
        語
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Side: Zen Title & Compact Content (8 cols) */}
        <div className="lg:col-span-8 space-y-3.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E5D9] border border-[#E3D4C7] text-[#8B6F5A] text-[11px] font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>TRUNG TÂM HỌC TỪ VỰNG ANH SENSEI</span>
            </span>

            {dueCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E5D9] border border-[#E3D4C7] text-[#C65D4B] text-[11px] font-bold shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-[#C65D4B]" />
                <span>Hôm nay cần ôn: {dueCount} từ</span>
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C201D] tracking-tight leading-tight flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span>Học từ vựng tiếng Nhật mỗi ngày</span>
              <span className="inline-block animate-bounce text-xl">🪴</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B554E] font-medium leading-relaxed max-w-lg">
              Hệ thống thẻ ghi nhớ Spaced Repetition (SRS) giúp bạn ghi nhớ sâu từ vựng N5 – N1 và tự tin chinh phục kỳ thi JLPT.
            </p>
          </div>

          {/* Interactive Daily Quiz Accordion Button */}
          <div>
            {!showQuiz ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>🎯 Thử sức Quiz từ vựng may mắn hôm nay (+30 XP)</span>
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#FFFDF9] border border-[#E8DCCF] rounded-2xl p-3.5 space-y-2.5 max-w-md shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>{dailyQuiz.question}</span>
                    <button onClick={() => setShowQuiz(false)} className="text-[#8B6F5A] hover:text-[#2C201D] font-bold cursor-pointer text-xs">✕</button>
                  </div>

                  {!quizAnswered ? (
                    <div className="grid grid-cols-3 gap-2">
                      {dailyQuiz.options.map((opt) => (
                        <button
                          key={opt.text}
                          onClick={() => setQuizAnswered(true)}
                          className="py-1.5 px-2.5 bg-[#F2E5D9] hover:bg-[#D66552] text-[#2C201D] hover:text-white text-[11px] font-bold rounded-xl transition-colors border border-[#E3D4C7] cursor-pointer"
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-500/15 p-2 rounded-xl border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chính xác! Bạn nhận +30 XP thưởng bài học hôm nay! 🚀</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              type="button"
              onClick={onContinueLatest}
              disabled={disabled}
              className={`px-6 py-3 font-bold text-xs sm:text-sm rounded-2xl border transition-colors flex items-center justify-center gap-2 ${disabled
                ? "bg-[#EFE5DC] text-[#8B6F5A]/40 cursor-not-allowed border-transparent"
                : "bg-[#D66552] hover:bg-[#C25644] text-white border-[#E37966] shadow-xs cursor-pointer"
                }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Tiếp tục bài học dở dang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Mascot Frame (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative shrink-0 z-10">
          {/* Dynamic Interactive Floating Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={catQuoteIndex}
              initial={{ scale: 0.8, opacity: 0, y: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={handleCatClick}
              className="absolute -top-6 bg-white border border-[#DED0C5] text-[#2C201D] px-3.5 py-1.5 rounded-xl shadow-2xs text-[11px] font-bold whitespace-nowrap z-30 flex items-center gap-1 cursor-pointer hover:scale-105"
              title="Nhấp vào chú Mèo để xuất hiện ngẫu nhiên lời nhắn & biểu cảm mới!"
            >
              <span className="text-[#C65D4B]">
                {dueCount > 0 && catQuoteIndex === 0
                  ? `Hôm nay cần ôn ${dueCount} từ nhé! ⚡`
                  : currentQuote.text}
              </span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-[#DED0C5] rotate-45" />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Clickable Mascot Frame */}
          <motion.div
            onClick={handleCatClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-32 h-32 sm:w-36 sm:h-36 bg-[#FFFDF9] border border-[#DED0C5] hover:border-[#D66552] rounded-2xl p-3 shadow-2xs flex items-center justify-center relative mt-3 cursor-pointer group/mascot"
            title="Nhấp vào chú Mèo để xem biểu cảm & lời nhắn ngẫu nhiên!"
          >
            {/* DYNAMIC SVG CAT MASCOT WITH 8 FACIAL EXPRESSIONS MATCHING QUOTES */}
            <svg
              className="w-full h-full text-[#8B6F5A] relative z-10 filter drop-shadow-xs"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Mascot mèo giáo viên ANH SENSEI"
            >
              {/* Cat Head */}
              <circle cx="60" cy="65" r="38" fill="#F5EFE6" stroke="#8B6F5A" strokeWidth="3" />
              {/* Cat Ears */}
              <polygon points="30,40 42,20 52,38" fill="#D66552" stroke="#8B6F5A" strokeWidth="2" />
              <polygon points="90,40 78,20 68,38" fill="#D66552" stroke="#8B6F5A" strokeWidth="2" />

              {/* DYNAMIC EYES MATCHING RANDOM EXPRESSIONS */}
              {expression === "EXCITED" ? (
                <>
                  <path d="M42 60 Q48 52 54 60" stroke="#302A26" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M66 60 Q72 52 78 60" stroke="#302A26" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </>
              ) : expression === "FIGHTING" ? (
                <>
                  <path d="M42 54 L54 62 M42 62 L54 54" stroke="#D66552" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M66 54 L78 62 M66 62 L78 54" stroke="#D66552" strokeWidth="3.5" strokeLinecap="round" />
                </>
              ) : expression === "LOVE" ? (
                <>
                  <text x="40" y="64" fill="#D66552" fontSize="14" fontWeight="bold">♥</text>
                  <text x="64" y="64" fill="#D66552" fontSize="14" fontWeight="bold">♥</text>
                </>
              ) : expression === "WINK" ? (
                <>
                  <ellipse cx="48" cy="60" rx="4" ry="6" fill="#302A26" />
                  <path d="M66 60 Q72 52 78 60" stroke="#302A26" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </>
              ) : expression === "COOL" ? (
                <>
                  <rect x="40" y="54" width="16" height="12" rx="3" fill="#302A26" />
                  <rect x="64" y="54" width="16" height="12" rx="3" fill="#302A26" />
                  <line x1="56" y1="58" x2="64" y2="58" stroke="#302A26" strokeWidth="2" />
                </>
              ) : expression === "SURPRISED" ? (
                <>
                  <circle cx="48" cy="58" r="6" stroke="#302A26" strokeWidth="2.5" fill="#FFF" />
                  <circle cx="48" cy="58" r="2.5" fill="#302A26" />
                  <circle cx="72" cy="58" r="6" stroke="#302A26" strokeWidth="2.5" fill="#FFF" />
                  <circle cx="72" cy="58" r="2.5" fill="#302A26" />
                </>
              ) : expression === "SLEEPY" ? (
                <>
                  <path d="M42 58 Q48 64 54 58" stroke="#302A26" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M66 58 Q72 64 78 58" stroke="#302A26" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <text x="86" y="48" fill="#D66552" fontSize="10" fontWeight="bold">zZ</text>
                </>
              ) : (
                <>
                  <ellipse cx="48" cy="60" rx="4" ry="6" fill="#302A26" />
                  <ellipse cx="72" cy="60" rx="4" ry="6" fill="#302A26" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="40" cy="68" rx="5" ry="3" fill="#E8A598" opacity={expression === "LOVE" || expression === "EXCITED" || expression === "COOL" ? "1" : "0.7"} />
              <ellipse cx="80" cy="68" rx="5" ry="3" fill="#E8A598" opacity={expression === "LOVE" || expression === "EXCITED" || expression === "COOL" ? "1" : "0.7"} />

              {/* Nose & Mouth */}
              <polygon points="60,66 57,63 63,63" fill="#D66552" />

              {/* DYNAMIC MOUTH DEPENDING ON EXPR */}
              {expression === "EXCITED" || expression === "FIGHTING" ? (
                <path d="M52 70 Q60 82 68 70 Z" fill="#D66552" stroke="#8B6F5A" strokeWidth="1.5" />
              ) : expression === "SURPRISED" ? (
                <circle cx="60" cy="74" r="4" fill="#D66552" />
              ) : expression === "SLEEPY" ? (
                <path d="M56 73 Q60 76 64 73" stroke="#8B6F5A" strokeWidth="2" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M54 72 Q60 77 66 72" stroke="#8B6F5A" strokeWidth="2" strokeLinecap="round" fill="none" />
              )}

              {/* Whiskers */}
              <line x1="25" y1="62" x2="38" y2="64" stroke="#8B6F5A" strokeWidth="1.5" />
              <line x1="23" y1="68" x2="37" y2="68" stroke="#8B6F5A" strokeWidth="1.5" />
              <line x1="95" y1="62" x2="82" y2="64" stroke="#8B6F5A" strokeWidth="1.5" />
              <line x1="97" y1="68" x2="83" y2="68" stroke="#8B6F5A" strokeWidth="1.5" />

              {/* Flashcard held by Cat */}
              <rect x="70" y="75" width="32" height="24" rx="4" fill="#FFFCF7" stroke="#D66552" strokeWidth="2" transform="rotate(-10 70 75)" />
              <text x="76" y="91" fill="#D66552" fontSize="12" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-10 70 75)">あ</text>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
