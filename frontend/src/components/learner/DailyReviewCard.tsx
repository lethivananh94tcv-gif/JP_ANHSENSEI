"use client";

import Link from "next/link";
import { DailyReviewViewModel } from "@/types/learner";
import { BrainCircuit, Flame, ArrowRight, Layers, Sparkles } from "lucide-react";
import Interactive3DFlashcard from "@/components/ui/Interactive3DFlashcard";
import { motion } from "framer-motion";

interface DailyReviewCardProps {
  reviewData?: DailyReviewViewModel;
}

export default function DailyReviewCard({ reviewData }: DailyReviewCardProps) {
  const isDataAvailable = reviewData && reviewData.isAvailable;

  return (
    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border border-[#DED3C8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden h-full group">
      {/* Decorative Paw / Kanji Watermark */}
      <div className="absolute right-2 top-2 text-7xl font-jp text-[#C65D4B]/10 select-none pointer-events-none group-hover:rotate-12 transition-transform duration-500">
        記憶
      </div>

      <div className="space-y-4 z-10">
        <div className="flex items-center justify-between border-b border-[#DED3C8]/70 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C65D4B]/10 border border-[#C65D4B]/30 flex items-center justify-center text-[#C65D4B]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#231917]">
              Ôn Tập Flashcards SRS 3D
            </h3>
          </div>
          <span className="text-[10px] font-black bg-[#C65D4B]/10 text-[#C65D4B] border border-[#C65D4B]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Spaced Repetition
          </span>
        </div>

        {/* 3D Stacked Deck Visual Effect Wrapper */}
        <div className="relative">
          {/* Layered Cards Stack Background Effect */}
          <div className="absolute -top-1.5 left-4 right-4 h-full bg-[#EFE6DB] rounded-3xl border border-[#DED3C8] opacity-60 shadow-xs" />
          <div className="absolute -top-3 left-8 right-8 h-full bg-[#E4D9CD] rounded-3xl border border-[#DED3C8] opacity-40 shadow-xs" />

          {/* Main Interactive 3D Card Sitting on Top of Stack */}
          <div className="relative z-10">
            <Interactive3DFlashcard />
          </div>
        </div>

        {isDataAvailable && (
          <div className="flex items-center justify-between text-xs text-[#56423E] font-semibold bg-white p-3 rounded-2xl border border-[#DED3C8]/80 shadow-xs">
            <span className="flex items-center gap-2 font-extrabold">
              <Flame className="w-4 h-4 text-[#C65D4B]" />
              <span>Thẻ bài cần ôn hôm nay:</span>
            </span>
            <span className="font-black text-sm text-[#C65D4B]">
              {reviewData.dueVocabCount} thẻ
            </span>
          </div>
        )}
      </div>

      <div className="z-10 pt-2 border-t border-[#DED3C8]/70">
        <Link
          href="/flashcards"
          className="relative group overflow-hidden w-full inline-flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-[#C65D4B] via-[#B04F3F] to-[#8B6F5A] hover:from-[#B04F3F] hover:to-[#765844] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg border border-white/20 transition-all hover:scale-105"
        >
          <Flame className="w-4 h-4 fill-white" />
          <span>Mở Hộp Thẻ SRS & Ôn Tập Full 3D</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
        </Link>
      </div>
    </div>
  );
}
