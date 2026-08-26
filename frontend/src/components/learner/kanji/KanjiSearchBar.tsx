"use client";

import { Search, X, Sparkles } from "lucide-react";

interface KanjiSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export default function KanjiSearchBar({
  searchQuery,
  onSearchChange,
  placeholder = "Tìm theo Hán tự (食, 学), Âm Hán Việt (THỰC, HỌC), Romaji hoặc tiêu đề...",
  totalResults,
}: KanjiSearchBarProps) {
  return (
    <div className="bg-white border-2 border-[#E5D7C5] p-4 rounded-2xl shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B6F5A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F2] border border-[#DED3C8] focus:border-[#C65D4B] focus:bg-white rounded-xl text-xs font-bold text-[#231917] outline-none transition-all placeholder:text-[#8B6F5A]/70"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8B6F5A] hover:text-[#C65D4B] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {totalResults !== undefined && (
          <div className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF3EB] border border-[#DED3C8] rounded-xl text-xs font-black text-[#8B6F5A] shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#C65D4B]" />
            <span>Tìm thấy <strong>{totalResults}</strong> kết quả</span>
          </div>
        )}
      </div>
    </div>
  );
}
