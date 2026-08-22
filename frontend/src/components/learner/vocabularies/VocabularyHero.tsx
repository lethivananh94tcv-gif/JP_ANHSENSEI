"use client";

import { DueFlashcardsCountData } from "./types";

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
  const bubbleText = dueCount > 0 ? `Hôm nay cần ôn ${dueCount} từ nhé!` : "Mình học một chút nhé!";

  return (
    <section
      aria-label="Khung chào mừng học từ vựng"
      className="relative w-full bg-[#FAF3EB] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 min-h-[180px] sm:min-h-[200px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs overflow-hidden"
    >
      {/* Left Content */}
      <div className="space-y-3 z-10 text-center sm:text-left max-w-lg">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#231917] tracking-tight">
            Học từ vựng thôi! <span className="inline-block animate-bounce">🪴</span>
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#756A62] font-medium leading-relaxed">
          Mỗi ngày một chút, nhớ lâu hơn.
        </p>

        <div className="pt-1">
          <button
            type="button"
            onClick={onContinueLatest}
            disabled={disabled}
            className={`px-6 py-3 font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 ${
              disabled
                ? "bg-[#DED3C8] text-[#8B6F5A] cursor-not-allowed"
                : "bg-[#C65D4B] hover:bg-[#b54f3e] active:scale-95 text-white cursor-pointer"
            }`}
          >
            <span>▶ Tiếp tục gần nhất</span>
          </button>
        </div>
      </div>

      {/* Right Side: Cute Cat Teacher Mascot & Speech Bubble */}
      <div className="relative flex items-center justify-center shrink-0 z-10">
        {/* Speech Bubble */}
        <div className="absolute -top-3 sm:-top-4 -left-6 sm:-left-12 bg-[#FFFCF7] border border-[#DED3C8] text-[#302A26] px-3.5 py-1.5 rounded-2xl shadow-sm text-[11px] sm:text-xs font-bold whitespace-nowrap z-20 animate-pulse">
          <span>{bubbleText}</span>
          {/* Bubble Arrow */}
          <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-[#FFFCF7] border-r border-b border-[#DED3C8] rotate-45" />
        </div>

        {/* Mascot Frame */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-2 shadow-sm flex items-center justify-center">
          <svg
            className="w-full h-full text-[#8B6F5A]"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Mascot mèo giáo viên ANH SENSEI"
          >
            {/* Cute Cat Teacher Illustration */}
            <circle cx="60" cy="65" r="38" fill="#F5EFE6" stroke="#8B6F5A" strokeWidth="3" />
            {/* Cat Ears */}
            <polygon points="30,40 42,20 52,38" fill="#C65D4B" stroke="#8B6F5A" strokeWidth="2" />
            <polygon points="90,40 78,20 68,38" fill="#C65D4B" stroke="#8B6F5A" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="48" cy="60" rx="4" ry="6" fill="#302A26" />
            <ellipse cx="72" cy="60" rx="4" ry="6" fill="#302A26" />
            {/* Cheeks */}
            <ellipse cx="40" cy="68" rx="5" ry="3" fill="#E8A598" opacity="0.8" />
            <ellipse cx="80" cy="68" rx="5" ry="3" fill="#E8A598" opacity="0.8" />
            {/* Nose & Mouth */}
            <polygon points="60,66 57,63 63,63" fill="#C65D4B" />
            <path d="M54 72 Q60 77 66 72" stroke="#8B6F5A" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Whiskers */}
            <line x1="25" y1="62" x2="38" y2="64" stroke="#8B6F5A" strokeWidth="1.5" />
            <line x1="23" y1="68" x2="37" y2="68" stroke="#8B6F5A" strokeWidth="1.5" />
            <line x1="95" y1="62" x2="82" y2="64" stroke="#8B6F5A" strokeWidth="1.5" />
            <line x1="97" y1="68" x2="83" y2="68" stroke="#8B6F5A" strokeWidth="1.5" />
            {/* Flashcard held by Cat */}
            <rect x="70" y="75" width="32" height="24" rx="4" fill="#FFFCF7" stroke="#C65D4B" strokeWidth="2" transform="rotate(-10 70 75)" />
            <text x="76" y="91" fill="#C65D4B" fontSize="12" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-10 70 75)">あ</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
