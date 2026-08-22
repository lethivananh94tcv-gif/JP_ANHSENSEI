"use client";

import { LessonItem, LessonProgressItem, DueFlashcardsCountData } from "./types";
import { CheckCircle2, Play, Flame, ArrowRight, BookOpen, Zap, Sparkles, Languages } from "lucide-react";
import { motion } from "framer-motion";

interface SelectedLessonProgressProps {
  lesson: LessonItem;
  progress?: LessonProgressItem | null;
  dueData?: DueFlashcardsCountData | null;
  onContinueLesson: () => void;
  onReviewDueFlashcards: () => void;
}

export default function SelectedLessonProgress({
  lesson,
  progress,
  dueData,
  onContinueLesson,
  onReviewDueFlashcards,
}: SelectedLessonProgressProps) {
  const completionPercent = progress?.completionPercent ?? 0;
  const status = progress?.status ?? (completionPercent === 100 ? "COMPLETED" : completionPercent > 0 ? "IN_PROGRESS" : "NOT_STARTED");

  const buttonLabel =
    status === "COMPLETED" || completionPercent === 100
      ? "Học lại bài này"
      : status === "IN_PROGRESS" || completionPercent > 0
      ? "Tiếp tục bài học"
      : "Bắt đầu học bài này";

  const dueCount = dueData?.dueCount ?? 0;

  return (
    <div className="w-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-[#C65D4B]/60 transition-colors">
      {/* Background Japanese Watermark */}
      <div className="absolute right-4 -bottom-4 text-9xl font-jp font-black text-[#8B6F5A]/5 select-none pointer-events-none">
        単語
      </div>

      <div className="space-y-3.5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] text-white font-black text-xs px-3.5 py-1 rounded-xl shadow-xs">
              {lesson.levelCode || "N5"}
            </span>
            <span className="text-xs font-black text-[#8B6F5A] uppercase tracking-wider bg-white px-3 py-1 rounded-xl border border-[#DED3C8] shadow-2xs">
              Bài #{lesson.sortOrder}
            </span>
          </div>

          {dueCount > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#C65D4B] bg-[#C65D4B]/10 px-3 py-1 rounded-xl border border-[#C65D4B]/30">
              <Flame className="w-3.5 h-3.5 text-[#C65D4B]" />
              <span>{dueCount} từ cần ôn</span>
            </span>
          )}
        </div>

        {/* 3D Floating Vocab Icon & Full Title */}
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] text-white font-jp font-black text-2xl flex items-center justify-center shadow-lg shadow-[#C65D4B]/30 border border-white/40 flex-shrink-0"
          >
            語
          </motion.div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#231917] tracking-tight group-hover:text-[#C65D4B] transition-colors leading-snug">
              {lesson.title}
            </h2>
            <p className="text-xs text-[#76685F] line-clamp-1 font-medium">
              {lesson.description || "Thực hành kho từ vựng tiếng Nhật chuẩn hóa, đọc furigana và flashcards 3D."}
            </p>
          </div>
        </div>

        {/* Vocabulary Content Breakdown Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-white border border-[#DED3C8] text-xs font-black text-[#C65D4B] shadow-2xs">
            <Languages className="w-3.5 h-3.5 text-[#C65D4B]" />
            <span>Chuyên sâu Kho Từ vựng</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#DED3C8] text-xs font-extrabold text-[#56423E] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6F5A]" />
            <span>Phát âm âm thanh bản xứ 🔊</span>
          </span>
        </div>
      </div>

      {/* Progress Bar & Primary CTA */}
      <div className="space-y-3 z-10 pt-2 border-t border-[#DED3C8]/80">
        <div className="flex items-center justify-between text-xs font-bold text-[#76685F]">
          <span className="flex items-center gap-1.5 font-black text-[#56423E]">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Tiến độ từ vựng bài học</span>
          </span>
          <span className="text-[#C65D4B] font-black">{completionPercent}%</span>
        </div>

        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#DED3C8] p-0.5 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] rounded-full shadow-xs"
          />
        </div>

        <div className="pt-2 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onContinueLesson}
            className="relative group/btn overflow-hidden inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#C65D4B] via-[#B04F3F] to-[#8B6F5A] hover:from-[#B04F3F] hover:to-[#765844] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl border border-white/20 transition-all hover:scale-105 active:scale-98 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{buttonLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000" />
          </button>

          {dueCount > 0 && (
            <button
              type="button"
              onClick={onReviewDueFlashcards}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-[#FAF3EB] text-[#C65D4B] border border-[#C65D4B]/40 font-black text-xs rounded-2xl transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <Flame className="w-4 h-4 fill-[#C65D4B]" />
              <span>Ôn tập SRS</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
