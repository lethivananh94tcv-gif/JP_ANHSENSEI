"use client";

import Link from "next/link";
import { Zap, Sparkles, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export default function VerbConjugationFeaturedBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#2D2623] via-[#3D332F] to-[#1E1917] text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#4A3F3A]">
      {/* Background Subtle Shapes */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#F0705A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-20 top-0 w-32 h-32 bg-[#FFC567]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0705A]/20 border border-[#F0705A]/40 text-[#FF9E8D] text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-[#FF9E8D]" />
            Tính năng mới hot 🔥
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Luyện Chia Động Từ Tiếng Nhật
          </h2>

          <p className="text-xs sm:text-sm text-[#D3C7BC] leading-relaxed">
            Thành thạo ngay 10 thể chia động từ (Nhóm 1, 2, 3) với hệ thống phản hồi tức thì, giải thích quy tắc chia & chế độ gõ gõ phản xạ đỉnh cao!
          </p>

          {/* Phase 1 Form Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["ます形", "辞書形 (Dict)", "て形 (Te)", "ない形 (Nai)", "た形 (Ta)"].map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-0.5 rounded-lg bg-white/10 border border-white/15 text-[11px] text-[#F3ECE6] font-medium"
              >
                {badge}
              </span>
            ))}
            <span className="px-2.5 py-0.5 rounded-lg bg-[#FFC567]/20 border border-[#FFC567]/30 text-[11px] text-[#FFD899] font-bold">
              +5 thể Phase 2 🚀
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
          <Link
            href="/verbs"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F0705A] to-[#C65D4B] hover:from-[#E0604A] hover:to-[#B04C3B] text-white font-black text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="w-4 h-4" />
            Luyện Tập Ngay
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/verbs?tab=flashcard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Xem Thẻ Flashcards 3D
          </Link>
        </div>
      </div>
    </div>
  );
}
