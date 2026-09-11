"use client";

import { Star } from "lucide-react";

interface FlashcardProgressBarProps {
  currentIndex: number;
  totalCount: number;
  showFurigana?: boolean;
  isContextMode?: boolean;
  favoriteCount?: number;
  isFavoritesOnly?: boolean;
  onToggleFurigana?: () => void;
  onToggleContextMode?: () => void;
  onToggleFavoritesOnly?: () => void;
  onOpenSettings?: () => void;
}

export default function FlashcardProgressBar({
  currentIndex,
  totalCount,
  showFurigana = true,
  isContextMode = false,
  favoriteCount = 0,
  isFavoritesOnly = false,
  onToggleFurigana,
  onToggleContextMode,
  onToggleFavoritesOnly,
  onOpenSettings,
}: FlashcardProgressBarProps) {
  const currentDisplay = totalCount > 0 ? Math.min(currentIndex + 1, totalCount) : 0;
  const progressPercent = totalCount > 0 ? (currentDisplay / totalCount) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-bold text-[#6E5E52]">
      {/* Left: Progress Counters */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <span className="text-[#302A26] font-extrabold text-sm sm:text-base">
          Tiến độ: {currentDisplay}/{totalCount}
        </span>
      </div>

      {/* Center: Visual Progress Bar */}
      <div className="w-full md:flex-1 max-w-xs h-2.5 bg-[#EFE8DE] rounded-full overflow-hidden border border-[#DED3C8]/70 mx-2">
        <div
          className="h-full bg-gradient-to-r from-[#8B6F5A] to-[#C65D4B] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">

        {onToggleFurigana && (
          <button
            type="button"
            onClick={onToggleFurigana}
            title={showFurigana ? "Tắt Furigana" : "Bật Furigana"}
            className={`px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-black flex items-center gap-1 ${
              showFurigana
                ? "bg-[#8B6F5A] text-white border-[#8B6F5A] shadow-2xs"
                : "bg-[#FFFDF9] text-[#6E5E52] border-[#DED3C8] hover:bg-[#F5EFE6]"
            }`}
          >
            <span className="font-jp text-[11px]">あ</span>
            <span>{showFurigana ? "Furigana" : "Hiện cách đọc"}</span>
          </button>
        )}

        {onToggleFavoritesOnly && (
          <div className="relative group/fav">
            <button
              type="button"
              onClick={onToggleFavoritesOnly}
              title={
                isFavoritesOnly
                  ? "Bấm để quay lại danh sách tất cả từ vựng bài học"
                  : "Ôn tập danh sách các từ vựng bạn đã đánh dấu ⭐"
              }
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-black flex items-center gap-1.5 ${
                isFavoritesOnly
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md animate-pulse"
                  : "bg-white hover:bg-amber-50 text-amber-700 border-amber-300 shadow-2xs"
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isFavoritesOnly ? "fill-white text-white" : "fill-amber-500 text-amber-500"
                }`}
              />
              <span>
                {isFavoritesOnly
                  ? `Đang ôn từ đã lưu (${favoriteCount})`
                  : `⭐ Từ đã đánh dấu (${favoriteCount})`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
