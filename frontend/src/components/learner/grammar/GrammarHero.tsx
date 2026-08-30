"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Edit3 } from "lucide-react";

interface GrammarHeroProps {
  totalTopics?: number;
  totalExercises?: number;
}

export default function GrammarHero({
  totalTopics = 50,
  totalExercises = 1000,
}: GrammarHeroProps) {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-r from-[#FFF5F2] via-[#FDF2EC] to-[#F9ECE4] bg-[radial-gradient(#E8D4CC_1.2px,transparent_1.2px)] [background-size:20px_20px] border-2 border-[#F3D7CE] rounded-[32px] p-6 sm:p-8 shadow-xs min-h-[240px] flex items-center justify-between select-none"
    >
      {/* Ambient Decorative Glows */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#FFE5E0] rounded-full blur-2xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-[#FCE8D5] rounded-full blur-2xl opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
        {/* Left Content */}
        <div className="space-y-4 max-w-xl">
          
          {/* Cute Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0ED] border border-[#F9CDC5] text-[#D04A46] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D04A46] animate-pulse" />
            <span>Giáo trình Ngữ pháp Chuẩn JLPT N5 - N1</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#2B211D]">
              Ngữ pháp <span className="text-[#D04A46] relative inline-block">
                tiếng Nhật
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#F8A7A1]/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <motion.span 
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-2xl sm:text-3xl inline-block"
            >
              🌸
            </motion.span>
          </div>

          {/* Description Text */}
          <p className="text-xs sm:text-sm text-[#56423E] leading-relaxed font-medium">
            Hệ thống ngữ pháp được phân cấp từ <strong className="font-extrabold text-[#D04A46] bg-[#FFF0ED] px-1.5 py-0.5 rounded-md border border-[#F9CDC5]">N5</strong> đến <strong className="font-extrabold text-[#D04A46] bg-[#FFF0ED] px-1.5 py-0.5 rounded-md border border-[#F9CDC5]">N1</strong>, giải thích dễ hiểu, ví dụ thực tế và bài tập luyện tập đa dạng giúp bạn nắm vững kiến thức.
          </p>

          {/* 2 White Stat Cards */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Card 1: 50+ Chủ điểm ngữ pháp */}
            <motion.div 
              whileHover={{ y: -2, scale: 1.02 }}
              className="bg-white/95 rounded-2xl border border-[#F5E2DE] px-4 py-2.5 flex items-center gap-3 shadow-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F4] border border-[#F8D4D0] flex items-center justify-center text-[#D04A46] shrink-0 shadow-2xs">
                <BookOpen className="w-5 h-5 text-[#D04A46]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-extrabold text-[#D04A46] leading-none">{totalTopics}+</span>
                <span className="text-[11px] font-bold text-[#76685F] mt-1">Chủ điểm ngữ pháp</span>
              </div>
            </motion.div>

            {/* Card 2: 1000+ Bài tập luyện tập */}
            <motion.div 
              whileHover={{ y: -2, scale: 1.02 }}
              className="bg-white/95 rounded-2xl border border-[#F5E2DE] px-4 py-2.5 flex items-center gap-3 shadow-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F4] border border-[#F8D4D0] flex items-center justify-center text-[#D04A46] shrink-0 shadow-2xs">
                <Edit3 className="w-5 h-5 text-[#D04A46]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-extrabold text-[#D04A46] leading-none">{totalExercises}+</span>
                <span className="text-[11px] font-bold text-[#76685F] mt-1">Bài tập luyện tập</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Redesigned White Japanese Mascot Card (matching screenshot 100%) */}
        <div className="flex items-center justify-center shrink-0 relative w-full lg:w-auto pt-2 lg:pt-0">
          
          {/* White Card Container */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-lg border-2 border-white flex flex-col items-center justify-center min-w-[210px] sm:min-w-[230px] cursor-pointer group"
          >
            {/* Floating Ornaments on Card Corners */}
            <div className="absolute -top-3.5 -left-3.5 z-20 pointer-events-none">
              <span className="text-2xl sm:text-3xl animate-bounce-slow drop-shadow-xs">🌸</span>
            </div>
            <div className="absolute -bottom-3.5 -right-3.5 z-20 pointer-events-none">
              <span className="text-2xl sm:text-3xl animate-pulse drop-shadow-xs">✨</span>
            </div>

            {/* Squircle Neko Avatar Container */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF4EB] border-2 border-[#E5D7C7] rounded-3xl p-2.5 shadow-2xs flex items-center justify-center mb-3.5 relative group-hover:scale-105 transition-transform">
              <svg
                className="w-full h-full filter drop-shadow-xs"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cat Ears */}
                <path d="M28 42 L16 18 L42 32 Z" fill="#8B786D" stroke="#1F1714" strokeWidth="2.5" />
                <path d="M24 36 L18 22 L34 30 Z" fill="#F5D5D0" />
                <path d="M72 42 L84 18 L58 32 Z" fill="#8B786D" stroke="#1F1714" strokeWidth="2.5" />
                <path d="M76 36 L82 22 L66 30 Z" fill="#F5D5D0" />

                {/* Cat Head */}
                <ellipse cx="50" cy="55" rx="32" ry="28" fill="#FFFDF9" stroke="#1F1714" strokeWidth="2.5" />

                {/* Eyes */}
                <path d="M34 52 Q40 45 44 52" stroke="#1F1714" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M56 52 Q60 45 66 52" stroke="#1F1714" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Blushing Cheeks */}
                <ellipse cx="28" cy="58" rx="5" ry="3" fill="#F5D5D0" />
                <ellipse cx="72" cy="58" rx="5" ry="3" fill="#F5D5D0" />

                {/* Nose & Mouth */}
                <path d="M48 57 L52 57 L50 59 Z" fill="#D04A46" />
                <path d="M44 62 Q50 66 56 62" stroke="#1F1714" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Whiskers */}
                <path d="M18 52 H26 M16 58 H24 M82 52 H74 M84 58 H76" stroke="#1F1714" strokeWidth="1.5" strokeLinecap="round" />

                {/* Red Flashcard held by Cat */}
                <rect x="58" y="58" width="22" height="18" rx="4" fill="#FFFDF9" stroke="#D04A46" strokeWidth="2" transform="rotate(-8 69 67)" />
                <text x="64" y="71" fill="#D04A46" fontSize="12" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-8 69 67)">あ</text>
              </svg>
            </div>

            {/* Red Japanese Stamp Pill Badge */}
            <div className="bg-gradient-to-r from-[#D04A46] to-[#E56B6F] text-white px-5 py-1.5 rounded-full font-jp font-bold text-xs sm:text-sm shadow-xs mb-2 border border-white/20">
              日本語・文法
            </div>

            {/* Subtitle Brand Text */}
            <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#8B786D] uppercase">
              ANH SENSEI
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

