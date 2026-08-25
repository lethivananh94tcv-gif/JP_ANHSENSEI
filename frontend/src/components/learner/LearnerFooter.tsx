"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import AnhSenseiLogo from "@/components/ui/AnhSenseiLogo";

const EXPLORE_LINKS = [
  { name: "Bảng chữ cái Kana", href: "/learn" },
  { name: "Từ vựng", href: "/vocabularies" },
  { name: "Ngữ pháp", href: "/grammar" },
  { name: "Kanji", href: "/kanji" },
  { name: "Cấp độ JLPT", href: "/levels" },
];

const PRACTICE_LINKS = [
  { name: "Flashcards SRS", href: "/flashcards" },
  { name: "Quiz JLPT", href: "/quizzes/1" },
  { name: "Game học tập", href: "/learn" },
  { name: "Luyện viết Kanji", href: "/kanji" },
  { name: "AI Tutor", href: "/ai-tutor" },
];

export default function LearnerFooter() {
  return (
    <footer className="mt-10 border-t border-[#E8DED4] bg-[#F8F5F0] text-[#2F2926] relative overflow-hidden font-sans selection:bg-[#C95845]/20 selection:text-[#C95845]">
      
      {/* ==================================================
          JAPANESE VISUAL DECORATION (Watermark ~5-10% opacity)
          ================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Faint Mount Fuji Silhouette */}
        <svg
          className="absolute bottom-0 right-1/4 w-[360px] h-[120px] opacity-[0.06] text-[#8B735F]"
          viewBox="0 0 420 140"
          fill="currentColor"
        >
          <path d="M0 140L210 20L420 140H0Z" />
          <path d="M160 52L210 20L260 52H160Z" fill="white" fillOpacity="0.4" />
        </svg>

        {/* Torii Gate Silhouette near bottom right */}
        <svg
          className="absolute bottom-2 right-8 w-16 h-16 opacity-[0.08] text-[#C95845]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <rect x="5" y="15" width="90" height="7" rx="2" />
          <rect x="12" y="27" width="76" height="5" rx="1" />
          <rect x="25" y="32" width="9" height="63" />
          <rect x="66" y="32" width="9" height="63" />
          <rect x="25" y="48" width="50" height="5" />
          <rect x="47" y="27" width="6" height="21" />
        </svg>

        {/* Sakura Branch entering from top left */}
        <svg
          className="absolute -top-4 -left-4 w-36 h-36 opacity-[0.08] text-[#C95845]"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M0 30 Q 70 60 130 30 T 190 90" stroke="currentColor" strokeWidth="4" fill="none" />
          <circle cx="70" cy="60" r="9" fill="#E9A5A0" />
          <circle cx="130" cy="30" r="11" fill="#E9A5A0" />
          <circle cx="160" cy="60" r="8" fill="#E9A5A0" />
          <circle cx="190" cy="90" r="10" fill="#E9A5A0" />
        </svg>

        {/* Subtle Japanese Watermark Character */}
        <div className="absolute right-4 top-2 text-7xl font-jp font-black text-[#8B735F]/[0.04] pointer-events-none">
          和
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-5 relative z-10 space-y-6">
        
        {/* ==================================================
            TOP FOOTER CONTENT (3-Column Compact Layout)
            ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* COLUMN 1 — BRAND / IDENTITY (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <AnhSenseiLogo size="sm" />
              <div>
                <span className="font-jp font-black text-lg text-[#2F2926] tracking-wide block leading-tight">
                  ANH SENSEI
                </span>
                <span className="text-[10px] font-bold text-[#7B716A] tracking-wider uppercase block">
                  Japanese Learning Platform
                </span>
              </div>
            </div>

            <p className="text-xs text-[#7B716A] leading-relaxed font-medium max-w-md">
              Nền tảng tự học tiếng Nhật giúp bạn học tập từng bước, xây dựng thói quen và tiến gần hơn đến mục tiêu JLPT.
            </p>

            {/* Japanese Motivational Quote */}
            <div className="pt-1 border-l-2 border-[#C95845]/40 pl-3 space-y-0.5">
              <p className="text-xs font-jp font-black text-[#C95845] tracking-wide">
                「一歩ずつ、前へ。」
              </p>
              <p className="text-[11px] font-semibold text-[#7B716A]">
                Từng bước một, tiến về phía trước.
              </p>
            </div>
          </div>

          {/* COLUMN 2 — KHÁM PHÁ (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-xs font-black text-[#2F2926] uppercase tracking-wider border-b border-[#E8DED4] pb-1.5">
              Khám phá
            </h3>
            <ul className="space-y-1.5 text-xs font-bold text-[#7B716A]">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 hover:text-[#C95845] transition-all duration-300 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 text-[#C95845] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — LUYỆN TẬP (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="text-xs font-black text-[#2F2926] uppercase tracking-wider border-b border-[#E8DED4] pb-1.5">
              Luyện tập
            </h3>
            <ul className="space-y-1.5 text-xs font-bold text-[#7B716A]">
              {PRACTICE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 hover:text-[#C95845] transition-all duration-300 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 text-[#C95845] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* DAILY JAPANESE QUOTE AREA (今日の言葉) */}
            <div className="pt-2 space-y-0.5">
              <span className="text-[9px] font-black text-[#8B735F] uppercase tracking-wider flex items-center gap-1">
                <span>🌸 今日の言葉</span>
              </span>
              <p className="text-xs font-jp font-black text-[#2F2926]">
                「継続は力なり。」 <span className="text-[11px] font-semibold text-[#7B716A] font-sans ml-1">Kiên trì là sức mạnh.</span>
              </p>
            </div>
          </div>

        </div>

        {/* ==================================================
            BOTTOM BAR
            ================================================== */}
        <div className="pt-4 border-t border-[#E8DED4] flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-medium text-[#7B716A]">
          <div>
            © 2026 ANH SENSEI. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#7B716A]">
            <span>Được thiết kế dành cho hành trình chinh phục tiếng Nhật</span>
            <Heart className="w-3 h-3 fill-[#C95845] text-[#C95845]" />
          </div>
        </div>

      </div>
    </footer>
  );
}
