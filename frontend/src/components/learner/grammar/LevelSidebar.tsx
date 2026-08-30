"use client";

import { BookOpen } from "lucide-react";

export interface LevelItem {
  id: string;
  name: string;
}

interface LevelSidebarProps {
  levels: LevelItem[];
  activeLevelId: string;
  onSelectLevel: (levelId: string) => void;
}

export default function LevelSidebar({
  levels,
  activeLevelId,
  onSelectLevel,
}: LevelSidebarProps) {
  return (
    <div className="bg-[#FFFDF9] border border-[#EFE5DA] rounded-2xl p-4.5 shadow-2xs space-y-3.5">
      <h3 className="text-[11px] font-extrabold font-sans text-[#76685F] uppercase tracking-wider px-1">
        Chọn cấp độ
      </h3>

      <div className="space-y-2">
        {levels.map((lvl) => {
          const isActive = activeLevelId.toUpperCase() === lvl.id.toUpperCase();
          return (
            <button
              key={lvl.id}
              type="button"
              onClick={() => onSelectLevel(lvl.id)}
              className={`w-full p-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-3 text-left border ${
                isActive
                  ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-xs font-bold"
                  : "bg-[#FFFDF9] hover:bg-[#FAF7F2] text-[#2B211D] border-[#EFE5DA] hover:border-[#C65D4B]/30"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isActive
                    ? "bg-white/20 text-white border-white/20"
                    : "bg-[#FAF7F2] text-[#8B6F5A] border-[#EFE5DA]"
                }`}
              >
                <BookOpen className="w-4 h-4" />
              </div>

              <div>
                <p className="text-xs font-bold font-sans leading-tight">{lvl.id}</p>
                <p className={`text-[11px] font-medium font-sans mt-0.5 ${isActive ? "text-white/90" : "text-[#76685F]"}`}>
                  {lvl.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
