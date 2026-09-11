"use client";

import { Search, ChevronDown } from "lucide-react";

interface GrammarFilterProps {
  activeLevelId: string;
  onSelectLevel: (levelId: string) => void;
  selectedLessonNum: number | "ALL";
  onSelectLesson: (num: number | "ALL") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalLessons?: number;
}

export default function GrammarFilter({
  activeLevelId,
  onSelectLevel,
  selectedLessonNum,
  onSelectLesson,
  searchQuery,
  onSearchChange,
  totalLessons = 25,
}: GrammarFilterProps) {
  return (
    <div className="bg-[#FFFDF9] border border-[#EFE5DA] rounded-2xl p-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Dropdown 1: CHỌN CẤP ĐỘ */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-[#76685F] uppercase tracking-wider block px-1">
              CHỌN CẤP ĐỘ
            </label>
            <div className="relative">
              <select
                value={activeLevelId}
                onChange={(e) => onSelectLevel(e.target.value)}
                className="appearance-none bg-[#FAF7F2] border border-[#EFE5DA] focus:border-[#C65D4B] rounded-xl px-3.5 py-2 pr-9 text-xs font-bold text-[#2B211D] outline-none transition-all cursor-pointer min-w-[130px]"
              >
                <option value="N5">N5 - Sơ cấp</option>
                <option value="N4">N4 - Sơ trung cấp</option>
                <option value="N3">N3 - Trung cấp</option>
                <option value="N2">N2 - Trung cao cấp</option>
                <option value="N1">N1 - Cao cấp</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#76685F] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Dropdown 2: CHỌN BÀI HỌC */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-[#76685F] uppercase tracking-wider block px-1">
              CHỌN BÀI HỌC
            </label>
            <div className="relative">
              <select
                value={selectedLessonNum}
                onChange={(e) => {
                  const val = e.target.value;
                  onSelectLesson(val === "ALL" ? "ALL" : Number(val));
                }}
                className="appearance-none bg-[#FAF7F2] border border-[#EFE5DA] focus:border-[#C65D4B] rounded-xl px-3.5 py-2 pr-9 text-xs font-bold text-[#2B211D] outline-none transition-all cursor-pointer min-w-[150px]"
              >
                <option value="ALL">Tất cả bài học</option>
                {Array.from({ length: totalLessons }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    Bài {n}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#76685F] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="space-y-1 flex-1 max-w-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm ngữ pháp, ví dụ..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFE5DA] focus:border-[#C65D4B] rounded-xl pl-4 pr-10 py-2 text-xs font-medium text-[#2B211D] outline-none transition-all placeholder:text-[#76685F]"
            />
            <Search className="w-3.5 h-3.5 text-[#76685F] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
