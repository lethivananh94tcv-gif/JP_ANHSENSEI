"use client";

export default function FlashcardShortcutLegend() {
  return (
    <div
      aria-label="Phím tắt điều khiển"
      className="hidden sm:flex items-center justify-center gap-6 text-[11px] font-semibold text-[#8B6F5A]/80 pt-3"
    >
      <div className="flex items-center gap-1.5">
        <kbd className="px-2 py-0.5 bg-[#FFFDF9] border border-[#DED3C8] rounded text-[10px] font-mono shadow-2xs">
          Space
        </kbd>
        <span>Lật thẻ</span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          <kbd className="px-1.5 py-0.5 bg-[#FFFDF9] border border-[#DED3C8] rounded text-[10px] font-mono shadow-2xs">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-[#FFFDF9] border border-[#DED3C8] rounded text-[10px] font-mono shadow-2xs">
            →
          </kbd>
        </div>
        <span>Chuyển thẻ</span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-[#FFFDF9] border border-[#DED3C8] rounded text-[10px] font-mono shadow-2xs">
            1
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-[#FFFDF9] border border-[#DED3C8] rounded text-[10px] font-mono shadow-2xs">
            2
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-[#FFFDF9] border border-[#DED3C8] rounded text-[10px] font-mono shadow-2xs">
            3
          </kbd>
        </div>
        <span>Đánh giá</span>
      </div>
    </div>
  );
}
