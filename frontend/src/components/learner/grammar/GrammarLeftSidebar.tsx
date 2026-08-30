"use client";

import { Book, Award, ChevronRight } from "lucide-react";

interface GrammarLeftSidebarProps {
  selectedLevelCode: string;
  onSelectLevel: (levelCode: string) => void;
  learnedCount?: number;
  totalCount?: number;
  practiceCount?: number;
  totalPractice?: number;
}

const LEVELS = [
  { code: "N5", label: "Sơ cấp" },
  { code: "N4", label: "Sơ trung cấp" },
  { code: "N3", label: "Trung cấp" },
  { code: "N2", label: "Trung cao cấp" },
  { code: "N1", label: "Cao cấp" },
];

export default function GrammarLeftSidebar({
  selectedLevelCode,
  onSelectLevel,
  learnedCount = 21,
  totalCount = 50,
  practiceCount = 63,
  totalPractice = 150,
}: GrammarLeftSidebarProps) {
  const percent = Math.round((learnedCount / (totalCount || 1)) * 100);

  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-5">
      {/* Widget 1: Chọn cấp độ */}
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-black text-[#231917] uppercase tracking-wider px-1">
          Chọn cấp độ
        </h3>

        <div className="space-y-2">
          {LEVELS.map((lvl) => {
            const isSelected = selectedLevelCode.toUpperCase() === lvl.code.toUpperCase();
            return (
              <button
                key={lvl.code}
                type="button"
                onClick={() => onSelectLevel(lvl.code)}
                className={`w-full p-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-3 text-left border ${
                  isSelected
                    ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md scale-102 font-bold"
                    : "bg-[#FAF6EE] hover:bg-white text-[#231917] border-[#DED3C8] hover:border-[#C65D4B]/50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-[#FFFDF9] text-[#C65D4B] border-[#DED3C8]"
                  }`}
                >
                  <Book className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-serif font-black">{lvl.code}</p>
                  <p className={`text-[11px] ${isSelected ? "text-white/90" : "text-[#76685F]"}`}>
                    {lvl.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Widget 2: Tiến độ của bạn */}
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-black text-[#231917] uppercase tracking-wider px-1">
          Tiến độ của bạn
        </h3>

        {/* Circular Progress Indicator */}
        <div className="flex flex-col items-center justify-center py-2 space-y-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#FAF6EE]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#C65D4B]"
                strokeDasharray={`${percent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-serif font-black text-[#8B6F5A]">{selectedLevelCode}</span>
              <span className="text-xl font-serif font-black text-[#231917]">{percent}%</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 text-center pt-2 border-t border-[#DED3C8]/60">
            <div>
              <p className="text-[10px] font-bold text-[#76685F] uppercase">Đã học</p>
              <p className="text-sm font-black text-[#231917]">
                <span className="text-[#C65D4B]">{learnedCount}</span>/{totalCount}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#76685F] uppercase">Đã luyện tập</p>
              <p className="text-sm font-black text-[#231917]">
                <span className="text-[#C65D4B]">{practiceCount}</span>/{totalPractice}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="w-full py-2.5 bg-[#FAF6EE] hover:bg-[#F5EFE6] text-[#8B6F5A] hover:text-[#C65D4B] font-bold text-xs rounded-2xl border border-[#DED3C8] transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Xem chi tiết tiến độ</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
