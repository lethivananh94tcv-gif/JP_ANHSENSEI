"use client";

import { LevelItem } from "./types";

interface LevelSelectorProps {
  levels: LevelItem[];
  selectedLevelCode: string;
  targetLevel?: string;
  onSelectLevel: (levelCode: string) => void;
}

export default function LevelSelector({
  levels,
  selectedLevelCode,
  targetLevel,
  onSelectLevel,
}: LevelSelectorProps) {
  if (levels.length === 0) {
    return (
      <div className="p-4 bg-[#FFFCF7] border border-[#DED3C8] rounded-2xl text-center text-xs font-semibold text-[#756A62]">
        Cấp độ này chưa có bài học được xuất bản.
      </div>
    );
  }

  return (
    <nav aria-label="Thanh chọn trình độ JLPT" className="w-full">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
        {levels.map((lvl) => {
          const isSelected = lvl.code.toUpperCase() === selectedLevelCode.toUpperCase();
          const isTarget = targetLevel && lvl.code.toUpperCase() === targetLevel.toUpperCase();

          return (
            <button
              key={lvl.levelId}
              type="button"
              onClick={() => onSelectLevel(lvl.code)}
              aria-pressed={isSelected}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shrink-0 flex items-center gap-2 border cursor-pointer ${
                isSelected
                  ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-sm scale-102"
                  : "bg-[#FFFCF7] text-[#8B6F5A] border-[#DED3C8] hover:bg-[#FAF3EB] hover:border-[#8B6F5A]"
              }`}
            >
              <span>{lvl.code}</span>

              {isTarget && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#FAF3EB] text-[#C65D4B] border border-[#C65D4B]/30"
                  }`}
                >
                  Đang học
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
