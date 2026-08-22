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
      whileHover={{ scale: 1.006 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative w-full bg-gradient-to-r from-[#1D1614] via-[#2A1D1A] to-[#1E1513] text-white border border-[#8B6F5A]/50 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xl overflow-hidden group select-none"
    >
      {/* Specular Ambient Glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#C65D4B]/30 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#FF8C78]/20 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Japanese Watermark */}
      <div className="absolute right-16 bottom-1 text-7xl font-jp font-black text-white/[0.04] pointer-events-none hidden lg:block tracking-widest">
        語
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Side: Zen Title & Compact Content (8 cols) */}
        <div className="lg:col-span-8 space-y-3.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-200 text-[11px] font-black shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>TRUNG TÂM HỌC TỪ VỰNG ANH SENSEI</span>
            </span>

            {dueCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C65D4B]/40 border border-[#C65D4B]/60 text-amber-200 text-[11px] font-black shadow-xs">
                <Flame className="w-3.5 h-3.5 text-[#FF8C78]" />
                <span>Hôm nay cần ôn: {dueCount} từ</span>
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-gradient-to-r from-white via-[#FAF3EB] to-amber-100 bg-clip-text text-transparent">
                Học từ vựng tiếng Nhật mỗi ngày
              </span>
              <span className="inline-block animate-bounce text-xl">🪴</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#DED3C8] font-medium leading-relaxed max-w-lg">
              Hệ thống thẻ ghi nhớ Spaced Repetition (SRS) giúp bạn ghi nhớ sâu từ vựng N5 – N1 và tự tin chinh phục kỳ thi JLPT.
            </p>
          </div>

          {/* Interactive Daily Quiz Accordion Button */}
          <div>
            {!showQuiz ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>🎯 Thử sức Quiz từ vựng may mắn hôm nay (+30 XP)</span>
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-3.5 space-y-2.5 max-w-md shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs font-black text-amber-300">
                    <span>{dailyQuiz.question}</span>
                    <button onClick={() => setShowQuiz(false)} className="text-white/60 hover:text-white font-black cursor-pointer text-xs">✕</button>
                  </div>

                  {!quizAnswered ? (
                    <div className="grid grid-cols-3 gap-2">
                      {dailyQuiz.options.map((opt) => (
                        <button
                          key={opt.text}
                          onClick={() => setQuizAnswered(true)}
                          className="py-1.5 px-2.5 bg-white/15 hover:bg-[#C65D4B] text-white text-[11px] font-bold rounded-xl transition-all border border-white/20 cursor-pointer"
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-300 bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
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
              className={`relative group/btn overflow-hidden px-6 py-3 font-black text-xs sm:text-sm rounded-2xl shadow-lg border border-white/20 transition-all flex items-center justify-center gap-2 ${
                disabled
                  ? "bg-white/10 text-white/40 cursor-not-allowed border-transparent"
                  : "bg-gradient-to-r from-[#C65D4B] via-[#B04F3F] to-[#8B6F5A] hover:from-[#B04F3F] hover:to-[#765844] text-white hover:scale-105 active:scale-98 cursor-pointer"
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Tiếp tục bài học dở dang</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Side: Cute Cat Mascot with RANDOM EQUIPPED FACIAL EXPRESSIONS! (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative shrink-0 z-10">
          {/* Dynamic Interactive Floating Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={catQuoteIndex}
              initial={{ scale: 0.7, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 450, damping: 22 }}
              onClick={handleCatClick}
              className="absolute -top-6 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#C65D4B]/40 text-[#231917] px-3.5 py-1.5 rounded-xl shadow-xl text-[11px] font-black whitespace-nowrap z-30 flex items-center gap-1 cursor-pointer hover:scale-105"
              title="Nhấp vào chú Mèo để xuất hiện ngẫu nhiên lời nhắn & biểu cảm mới!"
            >
              <span className="text-[#C65D4B]">
                {dueCount > 0 && catQuoteIndex === 0
                  ? `Hôm nay cần ôn ${dueCount} từ nhé! ⚡`
                  : currentQuote.text}
              </span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FAF3EB] border-r-2 border-b-2 border-[#C65D4B]/40 rotate-45" />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Clickable Mascot Frame */}
          <motion.div
            onClick={handleCatClick}
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.90, rotate: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EB] border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-2xl p-3 shadow-xl flex items-center justify-center relative mt-3 cursor-pointer group/mascot"
            title="Nhấp vào chú Mèo để xem biểu cảm & lời nhắn ngẫu nhiên!"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C65D4B]/20 via-amber-400/20 to-transparent rounded-2xl blur-md group-hover/mascot:scale-110 transition-transform" />

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
              <polygon points="30,40 42,20 52,38" fill="#C65D4B" stroke="#8B6F5A" strokeWidth="2" />
              <polygon points="90,40 78,20 68,38" fill="#C65D4B" stroke="#8B6F5A" strokeWidth="2" />

              {/* DYNAMIC EYES MATCHING RANDOM EXPRESSIONS */}
              {expression === "EXCITED" ? (
                <>
                  <path d="M42 60 Q48 52 54 60" stroke="#302A26" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M66 60 Q72 52 78 60" stroke="#302A26" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </>
              ) : expression === "FIGHTING" ? (
                <>
                  <path d="M42 54 L54 62 M42 62 L54 54" stroke="#C65D4B" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M66 54 L78 62 M66 62 L78 54" stroke="#C65D4B" strokeWidth="3.5" strokeLinecap="round" />
                </>
              ) : expression === "LOVE" ? (
                <>
                  <text x="40" y="64" fill="#C65D4B" fontSize="14" fontWeight="bold">♥</text>
                  <text x="64" y="64" fill="#C65D4B" fontSize="14" fontWeight="bold">♥</text>
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
                  <text x="86" y="48" fill="#C65D4B" fontSize="10" fontWeight="bold">zZ</text>
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
              <polygon points="60,66 57,63 63,63" fill="#C65D4B" />

              {/* DYNAMIC MOUTH DEPENDING ON EXPR */}
              {expression === "EXCITED" || expression === "FIGHTING" ? (
                <path d="M52 70 Q60 82 68 70 Z" fill="#C65D4B" stroke="#8B6F5A" strokeWidth="1.5" />
              ) : expression === "SURPRISED" ? (
                <circle cx="60" cy="74" r="4" fill="#C65D4B" />
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
              <rect x="70" y="75" width="32" height="24" rx="4" fill="#FFFCF7" stroke="#C65D4B" strokeWidth="2" transform="rotate(-10 70 75)" />
              <text x="76" y="91" fill="#C65D4B" fontSize="12" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-10 70 75)">あ</text>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
