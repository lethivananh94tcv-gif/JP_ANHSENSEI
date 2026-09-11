"use client";

import { Sparkles, BookOpen, Edit3 } from "lucide-react";

interface GrammarHeroBannerProps {
  selectedLevelCode?: string;
  totalTopics?: number;
  totalExercises?: number;
}

export default function GrammarHeroBanner({
  selectedLevelCode = "N5",
  totalTopics = 50,
  totalExercises = 1000,
}: GrammarHeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FAF3EB] via-[#F6ECE2] to-[#F1E4D7] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Background Japanese Line Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#C65D4B_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Text & Badges */}
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#231917]">
              Ngữ pháp <span className="text-[#C65D4B]">tiếng Nhật</span>
            </h1>
            <span className="text-2xl">🌸</span>
          </div>

          <p className="text-xs sm:text-sm text-[#76685F] leading-relaxed font-medium">
            Hệ thống ngữ pháp được phân cấp từ <strong className="text-[#231917]">N5</strong> đến <strong className="text-[#231917]">N1</strong>, giải thích dễ hiểu, ví dụ thực tế và bài tập luyện tập đa dạng giúp bạn nắm vững kiến thức.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-2 bg-[#FFFDF9] px-4 py-2 rounded-2xl border border-[#DED3C8] shadow-2xs text-xs font-bold text-[#8B6F5A]">
              <BookOpen className="w-4 h-4 text-[#C65D4B]" />
              <span><strong className="text-[#C65D4B]">{totalTopics}+</strong> Chủ điểm ngữ pháp</span>
            </div>

            <div className="flex items-center gap-2 bg-[#FFFDF9] px-4 py-2 rounded-2xl border border-[#DED3C8] shadow-2xs text-xs font-bold text-[#8B6F5A]">
              <Edit3 className="w-4 h-4 text-[#C65D4B]" />
              <span><strong className="text-[#C65D4B]">{totalExercises}+</strong> Bài tập luyện tập</span>
            </div>
          </div>
        </div>

        {/* Right Maneki Neko Cat Illustration */}
        <div className="shrink-0 flex items-center justify-center relative">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-[#FFFDF9] border-4 border-[#C65D4B] rounded-full flex flex-col items-center justify-center shadow-lg p-2 text-center group hover:scale-105 transition-all duration-300">
            {/* Maneki Neko Face */}
            <div className="text-4xl sm:text-5xl select-none animate-bounce">🐱</div>
            <div className="mt-1 bg-[#C65D4B] text-white px-3 py-1 rounded-xl text-[10px] sm:text-xs font-serif font-black shadow-xs tracking-wider">
              日本語 文法
            </div>
            <div className="absolute -bottom-2 -right-2 text-xl">🌸</div>
          </div>
        </div>
      </div>
    </section>
  );
}
