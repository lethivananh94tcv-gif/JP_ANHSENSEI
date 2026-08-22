"use client";

import { FlashcardSessionStats } from "./types";

interface FlashcardCompletionScreenProps {
  stats: FlashcardSessionStats;
  onRetryUnmastered: () => void;
  onRestartAll: () => void;
  onFinish: () => void;
}

export default function FlashcardCompletionScreen({
  stats,
  onRetryUnmastered,
  onRestartAll,
  onFinish,
}: FlashcardCompletionScreenProps) {
  const retryCount = stats.unmasteredCount + stats.somewhatCount;

  // Format elapsed time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 animate-fade-in">
      {/* 1. Cat Sensei Mascot Illustration */}
      <div className="flex justify-center pt-2">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#FAF3EB] border border-[#DED3C8] p-3 flex items-center justify-center shadow-inner">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full text-[#C65D4B]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cute Cat Sensei SVG Graphic */}
            <circle cx="60" cy="65" r="40" fill="#F5EFE6" stroke="#8B6F5A" strokeWidth="4" />
            {/* Cat Ears */}
            <path d="M 30 35 L 20 10 L 45 25 Z" fill="#8B6F5A" />
            <path d="M 90 35 L 100 10 L 75 25 Z" fill="#8B6F5A" />
            <path d="M 33 32 L 26 15 L 42 25 Z" fill="#C65D4B" />
            <path d="M 87 32 L 94 15 L 78 25 Z" fill="#C65D4B" />
            {/* Glasses */}
            <circle cx="45" cy="60" r="12" stroke="#302A26" strokeWidth="4" fill="none" />
            <circle cx="75" cy="60" r="12" stroke="#302A26" strokeWidth="4" fill="none" />
            <line x1="57" y1="60" x2="63" y2="60" stroke="#302A26" strokeWidth="4" />
            {/* Eyes */}
            <circle cx="45" cy="60" r="4" fill="#302A26" />
            <circle cx="75" cy="60" r="4" fill="#302A26" />
            {/* Nose & Smile */}
            <polygon points="60,67 56,71 64,71" fill="#C65D4B" />
            <path d="M 52 75 Q 60 82 68 75" stroke="#302A26" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Sensei Ribbon / Stole */}
            <path d="M 40 95 Q 60 105 80 95 L 75 115 L 60 108 L 45 115 Z" fill="#C65D4B" stroke="#8B6F5A" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 2. Header Text */}
      <div className="space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#231917]">
          Hoàn thành phiên học!
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#76685F]">
          Bạn đã làm rất tốt. Dưới đây là kết quả của bạn.
        </p>
      </div>

      {/* 3. Three Stat Boxes */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2">
        {/* Mastered */}
        <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
            ✓
          </div>
          <span className="text-xl sm:text-2xl font-serif font-black text-emerald-800">
            {stats.masteredCount}
          </span>
          <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
            Đã nhớ
          </span>
        </div>

        {/* Somewhat */}
        <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">
            ?
          </div>
          <span className="text-xl sm:text-2xl font-serif font-black text-amber-800">
            {stats.somewhatCount}
          </span>
          <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider">
            Hơi nhớ
          </span>
        </div>

        {/* Unmastered */}
        <div className="bg-rose-50/70 border border-rose-200 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1">
          <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">
            ✕
          </div>
          <span className="text-xl sm:text-2xl font-serif font-black text-rose-800">
            {stats.unmasteredCount}
          </span>
          <span className="text-[10px] font-extrabold text-rose-700 uppercase tracking-wider">
            Chưa nhớ
          </span>
        </div>
      </div>

      {/* 4. Session Info Metrics */}
      <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#DED3C8]/60 text-left">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">⏱️</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#8C7B70] uppercase">Thời gian học</span>
            <span className="text-sm font-extrabold text-[#302A26] font-mono">
              {formatTime(stats.elapsedSeconds)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-lg">💧</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#8C7B70] uppercase">Điểm chuyên cần</span>
            <span className="text-sm font-extrabold text-[#C65D4B]">
              +{stats.rewardWaterDrops > 0 ? stats.rewardWaterDrops : 1} Giọt
            </span>
          </div>
        </div>
      </div>

      {/* 5. Action Buttons */}
      <div className="space-y-2.5 pt-2">
        {retryCount > 0 && (
          <button
            type="button"
            onClick={onRetryUnmastered}
            className="w-full py-3.5 px-6 bg-[#785D49] hover:bg-[#634b39] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <span>↻</span>
            <span>Học lại {retryCount} thẻ cần nhớ</span>
          </button>
        )}

        <button
          type="button"
          onClick={onFinish}
          className="w-full py-3 px-6 bg-[#FFFDF9] hover:bg-[#FAF3EB] text-[#302A26] font-bold text-xs sm:text-sm rounded-2xl border-2 border-[#DED3C8] transition-all cursor-pointer"
        >
          Kết thúc
        </button>

        <button
          type="button"
          onClick={onRestartAll}
          className="text-xs font-extrabold text-[#8B6F5A] hover:text-[#C65D4B] underline transition-colors cursor-pointer pt-1"
        >
          Học lại toàn bộ {stats.totalCount} thẻ
        </button>
      </div>
    </div>
  );
}
