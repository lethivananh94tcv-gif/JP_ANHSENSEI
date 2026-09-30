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
  onNext,
  onPrev,
  hasPrev = true,
  hasNext = true,
}: FlashcardRatingBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-4 pt-2">
      {/* Central Primary Button: Flip when not flipped, Next when flipped */}
      <button
        type="button"
        onClick={isFlipped ? (onNext || onFlip) : onFlip}
        className="w-full sm:w-64 py-3.5 px-8 bg-[#785D49] hover:bg-[#634b39] text-[#FFFDF9] font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition-all cursor-pointer min-h-[48px] flex items-center justify-center gap-2 active:scale-98"
        aria-label={isFlipped ? "Thẻ tiếp theo" : "Lật thẻ ghi nhớ"}
      >
        <span>{isFlipped ? "Thẻ tiếp theo ➔" : "Lật thẻ"}</span>
      </button>

      {/* Previous / Next Arrow Navigation */}
      <div className="flex items-center gap-4 text-xs font-bold text-[#8B6F5A]">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="w-11 h-11 rounded-2xl bg-[#FFFDF9] border border-[#DED3C8] hover:bg-[#FAF3EB] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-lg transition-all shadow-2xs cursor-pointer"
            aria-label="Thẻ trước đó"
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
            aria-label="Thẻ kế tiếp"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
