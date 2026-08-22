"use client";

import { FlashcardRating } from "./types";

interface FlashcardRatingBarProps {
  isFlipped: boolean;
  onFlip: () => void;
  onRate: (rating: FlashcardRating) => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function FlashcardRatingBar({
  isFlipped,
  onFlip,
  onRate,
  onNext,
  onPrev,
  hasPrev = true,
  hasNext = true,
}: FlashcardRatingBarProps) {
  if (!isFlipped) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-4 pt-2">
        {/* Central Primary Flip Button */}
        <button
          type="button"
          onClick={onFlip}
          className="w-full sm:w-64 py-3.5 px-8 bg-[#785D49] hover:bg-[#634b39] text-[#FFFDF9] font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition-all cursor-pointer min-h-[48px] flex items-center justify-center gap-2 active:scale-98"
          aria-label="Lật thẻ ghi nhớ (Phím Space)"
        >
          <span>Lật thẻ</span>
        </button>

        {/* Previous / Next Arrow Navigation for Mobile & Accessibility */}
        <div className="flex items-center gap-4 text-xs font-bold text-[#8B6F5A]">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="w-11 h-11 rounded-2xl bg-[#FFFDF9] border border-[#DED3C8] hover:bg-[#FAF3EB] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-lg transition-all shadow-2xs cursor-pointer"
              aria-label="Thẻ trước đó (Mũi tên trái)"
            >
              ‹
            </button>
          )}

          {onNext && (
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="w-11 h-11 rounded-2xl bg-[#785D49] text-white hover:bg-[#634b39] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-lg transition-all shadow-2xs cursor-pointer"
              aria-label="Thẻ kế tiếp (Mũi tên phải)"
            >
              ›
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-3 gap-3 sm:gap-4 pt-2">
      {/* 1. Chưa nhớ */}
      <button
        type="button"
        onClick={() => onRate("UNMASTERED")}
        className="relative group flex items-center justify-center py-3.5 px-3 bg-[#F4E4DE] hover:bg-[#EBD6CF] border border-[#E3CBC4] text-[#7A4B40] font-extrabold text-xs sm:text-sm rounded-xl shadow-2xs transition-all cursor-pointer min-h-[48px] active:scale-98"
        aria-label="Đánh giá Chưa nhớ (Phím 1)"
      >
        <span className="absolute top-1.5 right-2 text-[10px] font-mono text-[#7A4B40]/60">
          1
        </span>
        <span>Chưa nhớ</span>
      </button>

      {/* 2. Hơi nhớ */}
      <button
        type="button"
        onClick={() => onRate("SOMEWHAT")}
        className="relative group flex items-center justify-center py-3.5 px-3 bg-[#FCEBD9] hover:bg-[#F7DDC2] border border-[#F2D4B3] text-[#8C5C2B] font-extrabold text-xs sm:text-sm rounded-xl shadow-2xs transition-all cursor-pointer min-h-[48px] active:scale-98"
        aria-label="Đánh giá Hơi nhớ (Phím 2)"
      >
        <span className="absolute top-1.5 right-2 text-[10px] font-mono text-[#8C5C2B]/60">
          2
        </span>
        <span>Hơi nhớ</span>
      </button>

      {/* 3. Đã nhớ */}
      <button
        type="button"
        onClick={() => onRate("MASTERED")}
        className="relative group flex items-center justify-center py-3.5 px-3 bg-[#FCEBD9] hover:bg-[#F7DDC2] border border-[#F2D4B3] text-[#8C5C2B] font-extrabold text-xs sm:text-sm rounded-xl shadow-2xs transition-all cursor-pointer min-h-[48px] active:scale-98"
        aria-label="Đánh giá Đã nhớ (Phím 3)"
      >
        <span className="absolute top-1.5 right-2 text-[10px] font-mono text-[#8C5C2B]/60">
          3
        </span>
        <span>Đã nhớ</span>
      </button>
    </div>
  );
}
