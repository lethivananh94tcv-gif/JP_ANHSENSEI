"use client";

interface FlashcardProgressBarProps {
  currentIndex: number;
  totalCount: number;
  unmasteredCount: number;
  masteredCount: number;
  isShuffle?: boolean;
  isAutoplay?: boolean;
  onToggleShuffle?: () => void;
  onToggleAutoplay?: () => void;
  onOpenSettings?: () => void;
}

export default function FlashcardProgressBar({
  currentIndex,
  totalCount,
  unmasteredCount,
  masteredCount,
  isShuffle = false,
  isAutoplay = false,
  onToggleShuffle,
  onToggleAutoplay,
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
        <span className="text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
          ✕ {unmasteredCount} Chưa nhớ
        </span>
        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          ✓ {masteredCount} Đã nhớ
        </span>
      </div>

      {/* Center: Visual Progress Bar */}
      <div className="w-full md:flex-1 max-w-xs h-2.5 bg-[#EFE8DE] rounded-full overflow-hidden border border-[#DED3C8]/70 mx-2">
        <div
          className="h-full bg-[#6F8A72] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        {onToggleShuffle && (
          <button
            type="button"
            onClick={onToggleShuffle}
            title={isShuffle ? "Tắt xáo trộn" : "Xáo trộn thẻ"}
            className={`p-2 rounded-xl border transition-all cursor-pointer text-sm ${
              isShuffle
                ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-2xs"
                : "bg-[#FFFDF9] text-[#6E5E52] border-[#DED3C8] hover:bg-[#F5EFE6]"
            }`}
          >
            🔀
          </button>
        )}

        {onToggleAutoplay && (
          <button
            type="button"
            onClick={onToggleAutoplay}
            title={isAutoplay ? "Dừng tự động lật" : "Tự động lật thẻ"}
            className={`p-2 rounded-xl border transition-all cursor-pointer text-sm ${
              isAutoplay
                ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-2xs animate-pulse"
                : "bg-[#FFFDF9] text-[#6E5E52] border-[#DED3C8] hover:bg-[#F5EFE6]"
            }`}
          >
            🔄
          </button>
        )}

        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            title="Cài đặt thẻ"
            className="p-2 rounded-xl bg-[#FFFDF9] text-[#6E5E52] border border-[#DED3C8] hover:bg-[#F5EFE6] transition-all cursor-pointer text-sm"
          >
            ⚙️
          </button>
        )}
      </div>
    </div>
  );
}
