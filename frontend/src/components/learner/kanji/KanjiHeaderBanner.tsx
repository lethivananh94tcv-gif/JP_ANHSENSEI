"use client";

import { Sparkles, BookOpen, Layers, Keyboard, PenTool, Flame } from "lucide-react";

interface KanjiHeaderBannerProps {
  totalTopicsCount?: number;
  totalKanjiCount?: number;
  activeLevel?: string;
  onSearchClick?: () => void;
}

export default function KanjiHeaderBanner({
  totalTopicsCount = 75,
  totalKanjiCount = 350,
  activeLevel = "N5",
}: KanjiHeaderBannerProps) {
  return (
    <div className="relative bg-gradient-to-r from-[#FAF4ED] via-[#FAF3EB] to-[#F5EBE1] border-2 border-[#E5D7C5] rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fadeIn">
      {/* Decorative Kanji Watermark */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-9xl font-serif font-black text-[#8B6F5A]/10 select-none pointer-events-none tracking-widest leading-none">
        漢字
      </div>

      <div className="space-y-3.5 z-10 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#8B261D]/10 border border-[#8B261D]/25 text-[#8B261D] px-3.5 py-1 rounded-full text-xs font-black tracking-wide shadow-2xs">
            <span>⛩️</span> KHO HỌC LIỆU HÁN TỰ KANJI
          </span>
          <span className="bg-white/90 border border-[#DED3C8] text-[#8B6F5A] px-3 py-1 rounded-full text-[11px] font-bold shadow-2xs">
            Trình độ: <strong className="text-[#C65D4B]">{activeLevel}</strong>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-sans font-black text-[#3D261D] tracking-tight flex items-center gap-2 leading-tight">
          Hán Tự &amp; Quy Tắc Nét Vẽ
        </h1>

        <p className="text-[#6E594F] text-xs sm:text-sm leading-relaxed">
          Học Kanji bài bản theo <strong className="text-[#8B261D]">214 Bộ thủ gốc</strong>, Thẻ 3D Flashcard, Luyện gõ Romaji tốc độ và Vẽ nét bút chuẩn giáo trình JLPT N5 ➔ N1.
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="bg-white/90 border border-[#E5D7C5] text-[#6E594F] px-3 py-1 rounded-xl text-[11px] font-black shadow-2xs flex items-center gap-1.5">
            <span>⛩️</span> 214 Bộ Thủ Trọng Tâm
          </span>
          <span className="bg-white/90 border border-[#E5D7C5] text-[#6E594F] px-3 py-1 rounded-xl text-[11px] font-black shadow-2xs flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#C65D4B]" /> {totalTopicsCount} Bài Học Hán Tự
          </span>
          <span className="bg-white/90 border border-[#E5D7C5] text-[#6E594F] px-3 py-1 rounded-xl text-[11px] font-black shadow-2xs flex items-center gap-1.5">
            <Keyboard className="w-3.5 h-3.5 text-[#C65D4B]" /> Luyện Gõ Romaji
          </span>
          <span className="bg-white/90 border border-[#E5D7C5] text-[#6E594F] px-3 py-1 rounded-xl text-[11px] font-black shadow-2xs flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5 text-[#C65D4B]" /> Mô Phỏng Nét Vẽ
          </span>
        </div>
      </div>

      {/* Right Calligraphy Seal Badge */}
      <div className="hidden md:flex flex-col items-center justify-center bg-white/90 border border-[#E5D7C5] p-5 rounded-2xl shadow-sm z-10 space-y-1.5 min-w-[150px] text-center shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B261D] to-[#6E1C14] text-white flex items-center justify-center font-serif text-3xl font-black shadow-inner">
          書
        </div>
        <span className="text-xs font-black text-[#3D261D] pt-1">KANJI SHODO</span>
        <span className="text-[10px] font-bold text-[#8B6F5A] uppercase tracking-wider">漢字の道 • 2026</span>
      </div>
    </div>
  );
}
