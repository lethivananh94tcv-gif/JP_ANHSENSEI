"use client";

import { LevelItem } from "./types";
import { Star, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="p-4 bg-white border border-[#DED3C8] rounded-2xl text-center text-xs font-semibold text-[#756A62]">
        Cấp độ này chưa có bài học được xuất bản.
      </div>
    );
  }

  return (
    <nav aria-label="Thanh chọn trình độ JLPT" className="w-full">
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none p-2 bg-[#231917] border-2 border-[#8B6F5A]/50 rounded-3xl backdrop-blur-md shadow-2xl">
        {levels.map((lvl) => {
          const isSelected = lvl.code.toUpperCase() === selectedLevelCode.toUpperCase();
          const isTarget = targetLevel && lvl.code.toUpperCase() === targetLevel.toUpperCase();

          return (
            <motion.button
              key={lvl.levelId}
              type="button"
              onClick={() => onSelectLevel(lvl.code)}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              aria-pressed={isSelected}
              className={`px-5 sm:px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all shrink-0 flex items-center gap-2.5 border cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "bg-gradient-to-r from-[#C65D4B] via-[#B04F3F] to-[#8B6F5A] text-white border-[#FF8C78] shadow-xl shadow-[#C65D4B]/40 ring-2 ring-[#C65D4B]/50"
                  : "bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white shadow-md"
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-300" />
              <span>Trình độ {lvl.code}</span>

              {isTarget && (
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#F5EFE6] text-[#C65D4B] border border-[#C65D4B]/30"
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>Đang học</span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
