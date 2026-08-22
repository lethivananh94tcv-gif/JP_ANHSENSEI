"use client";

import Link from "next/link";
import { LessonSummary } from "@/types/learner";
import { BookOpen, ArrowRight, Play, CheckCircle2, Clock, Sparkles, Languages, PenTool, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ContinueLearningCardProps {
  currentLesson: LessonSummary | null;
  progressPercent?: number;
  completedParts?: number;
  totalParts?: number;
}

export default function ContinueLearningCard({
  currentLesson,
  progressPercent = 0,
  completedParts = 0,
  totalParts = 4,
}: ContinueLearningCardProps) {
  if (!currentLesson) {
    return (
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden min-h-[280px]">
        <div className="space-y-3 z-10">
          <div className="inline-flex items-center gap-2 bg-[#F5EFE6] px-3.5 py-1 rounded-full text-xs font-extrabold text-[#8B6F5A] border border-[#DED3C8]">
            <Sparkles className="w-4 h-4 text-[#C65D4B]" />
            <span>NHIỆM VỤ BÀI HỌC CHÍNH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#231917]">
            Khám phá lộ trình bài học JLPT
          </h2>
          <p className="text-xs sm:text-sm text-[#76685F] leading-relaxed max-w-lg font-medium">
            Bắt đầu bài học đầu tiên trong chương trình giáo trình Minna no Nihongo N5 – N3 với đầy đủ Từ vựng, Hán tự và Ngữ pháp.
          </p>
        </div>

        <div className="z-10">
          <Link
            href="/learn"
            className="inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-[#8B6F5A] to-[#C65D4B] hover:from-[#765844] hover:to-[#B04F3F] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            <span>Khám phá bài học ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isStarted = progressPercent > 0;

  return (
    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FDFBF7] to-[#F5EFE6] border border-[#DED3C8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-[#C65D4B]/50 transition-all duration-300 h-full">
      {/* Background Decor Calligraphy Accent */}
      <div className="absolute -right-6 -bottom-6 text-9xl font-jp font-black text-[#8B6F5A]/5 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
        学
      </div>

      <div className="space-y-4 z-10">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] text-white font-black text-xs px-3.5 py-1 rounded-xl shadow-xs">
              {currentLesson.levelCode || "N5"}
            </span>
            <span className="text-xs font-black text-[#8B6F5A] uppercase tracking-wider flex items-center gap-1.5 bg-[#F5EFE6] px-3 py-1 rounded-xl border border-[#DED3C8]">
              <span className="w-2 h-2 rounded-full bg-[#C65D4B] animate-pulse" />
              {isStarted ? "NHIỆM VỤ ĐANG HỌC DỞ" : "NHIỆM VỤ ĐƯỢC ĐỀ XUẤT"}
            </span>
          </div>

          {currentLesson.estimatedMinutes > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76685F] bg-white px-3 py-1 rounded-xl border border-[#DED3C8] shadow-2xs">
              <Clock className="w-4 h-4 text-[#8B6F5A]" />
              <span>~{currentLesson.estimatedMinutes} phút</span>
            </span>
          )}
        </div>

        {/* Lesson Title & 3D Emblem Showcase */}
        <div className="flex items-start gap-4">
          {/* 3D Floating Book Emblem */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] text-white font-jp font-black text-2xl flex items-center justify-center shadow-lg shadow-[#C65D4B]/30 border border-white/40 flex-shrink-0"
          >
            本
          </motion.div>

          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#231917] tracking-tight group-hover:text-[#C65D4B] transition-colors leading-snug">
              {currentLesson.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#76685F] line-clamp-2 leading-relaxed font-medium">
              {currentLesson.description || "Thực hành từ vựng, đọc furigana, cấu trúc mẫu câu ngữ pháp và flashcards ôn tập."}
            </p>
          </div>
        </div>

        {/* Content Breakdown Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#DED3C8] text-xs font-extrabold text-[#56423E] shadow-2xs">
            <Languages className="w-3.5 h-3.5 text-[#C65D4B]" />
            <span>20+ Từ vựng</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#DED3C8] text-xs font-extrabold text-[#56423E] shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#8B6F5A]" />
            <span>3 Ngữ pháp</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#DED3C8] text-xs font-extrabold text-[#56423E] shadow-2xs">
            <PenTool className="w-3.5 h-3.5 text-[#231917]" />
            <span>Kanji cơ bản</span>
          </span>
        </div>
      </div>

      {/* Progress Bar & Primary CTA */}
      <div className="space-y-4 z-10 pt-3 border-t border-[#DED3C8]/70">
        {isStarted && (
          <div className="space-y-2 bg-white/90 p-3.5 rounded-2xl border border-[#DED3C8]/80 shadow-2xs">
            <div className="flex justify-between items-center text-xs font-black text-[#56423E]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6F8A72]" />
                <span>Tiến độ hoàn thành bài học ({completedParts}/{totalParts} phần)</span>
              </span>
              <span className="text-[#C65D4B] font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-[#F5EFE6] rounded-full overflow-hidden border border-[#DED3C8]/80 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] rounded-full shadow-xs"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/lessons/${currentLesson.lessonId}`}
            className="relative group overflow-hidden inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-[#C65D4B] via-[#B04F3F] to-[#8B6F5A] hover:from-[#B04F3F] hover:to-[#765844] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isStarted ? "Tiếp tục bài học" : "Chinh phục bài học ngay"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#8B6F5A]">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Giáo trình Minna no Nihongo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
