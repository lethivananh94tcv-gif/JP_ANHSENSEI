"use client";

import { Search, ChevronDown } from "lucide-react";

interface GrammarFilterBarProps {
  selectedLevelCode: string;
  onSelectLevel: (levelCode: string) => void;
  selectedLessonNum: number | "ALL";
  onSelectLesson: (num: number | "ALL") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalLessons?: number;
}

export default function GrammarFilterBar({
  selectedLevelCode,
  onSelectLevel,
  selectedLessonNum,
  onSelectLesson,
  searchQuery,
  onSearchChange,
  totalLessons = 25,
}: GrammarFilterBarProps) {
  return (
    <section className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Dropdown 1: Chọn cấp độ */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-[#76685F] uppercase tracking-wider block px-1">
              Chọn cấp độ
            </label>
            <div className="relative">
              <select
                value={selectedLevelCode}
                onChange={(e) => onSelectLevel(e.target.value)}
                className="appearance-none bg-[#FAF6EE] border border-[#DED3C8] focus:border-[#C65D4B] rounded-2xl px-4 py-2.5 pr-9 text-xs font-serif font-black text-[#231917] outline-none transition-all cursor-pointer min-w-[120px]"
              >
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
                <option value="N1">N1</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8B6F5A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Dropdown 2: Chọn bài học */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-[#76685F] uppercase tracking-wider block px-1">
              Chọn bài học
            </label>
            <div className="relative">
              <select
                value={selectedLessonNum}
                onChange={(e) => {
                  const val = e.target.value;
                  onSelectLesson(val === "ALL" ? "ALL" : Number(val));
                }}
                className="appearance-none bg-[#FAF6EE] border border-[#DED3C8] focus:border-[#C65D4B] rounded-2xl px-4 py-2.5 pr-9 text-xs font-bold text-[#231917] outline-none transition-all cursor-pointer min-w-[160px]"
              >
                <option value="ALL">Tất cả bài học</option>
                {Array.from({ length: totalLessons }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    Bài {n}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#8B6F5A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Input 3: Tìm ngữ pháp, ví dụ... */}
        <div className="space-y-1 flex-1 max-w-md">
          <label className="text-[10px] font-extrabold text-[#76685F] uppercase tracking-wider block px-1 opacity-0 hidden md:block">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm ngữ pháp, ví dụ..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#FAF6EE] border border-[#DED3C8] focus:border-[#C65D4B] rounded-2xl pl-4 pr-10 py-2.5 text-xs font-medium text-[#231917] outline-none transition-all placeholder:text-[#8B6F5A]"
            />
            <Search className="w-4 h-4 text-[#8B6F5A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
