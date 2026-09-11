"use client";

import React from "react";
import { LessonItem, LessonProgressItem, DueFlashcardsCountData } from "./types";
import { ArrowLeft, ArrowRight, BookOpen, Target, Play, Star, Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SelectedLessonProgressProps {
  lesson: LessonItem;
  nextLesson?: LessonItem | null;
  progress?: LessonProgressItem | null;
  nextLessonProgress?: LessonProgressItem | null;
  dueData?: DueFlashcardsCountData | null;
  selectedLevelCode?: string;
  onContinueLesson: (lessonToOpen?: LessonItem) => void;
  onReviewDueFlashcards: () => void;
  onBack?: () => void;
}

export default function SelectedLessonProgress({
  lesson,
  nextLesson,
  progress,
  nextLessonProgress,
  dueData,
  selectedLevelCode,
  onContinueLesson,
  onReviewDueFlashcards,
  onBack,
}: SelectedLessonProgressProps) {
  const currentPercent = progress?.completionPercent ?? 0;
  const isCurrentCompleted = currentPercent === 100 || progress?.status === "COMPLETED";

  // Recommend next lesson if current lesson is completed
  const isRecommendingNext = isCurrentCompleted && !!nextLesson && nextLesson.lessonId !== lesson.lessonId;
  const displayLesson = isRecommendingNext ? nextLesson! : lesson;
  const displayProgress = isRecommendingNext ? nextLessonProgress : progress;

  const completionPercent = displayProgress?.completionPercent ?? (isRecommendingNext ? 0 : currentPercent);
  const status = displayProgress?.status ?? (completionPercent === 100 ? "COMPLETED" : completionPercent > 0 ? "IN_PROGRESS" : "NOT_STARTED");

  // DYNAMICALLY RESOLVE LEVEL CODE & LESSON NUMBER ACCURATELY
  const displayLevelCode = (displayLesson.levelCode || selectedLevelCode || "N5").toUpperCase();
  
  let displayLessonNum = displayLesson.lessonId || displayLesson.sortOrder || 1;
  if (displayLevelCode === "N4" && displayLesson.sortOrder <= 25) {
    displayLessonNum = displayLesson.sortOrder + 25;
  } else if (displayLevelCode === "N3" && displayLesson.sortOrder <= 15) {
    displayLessonNum = displayLesson.sortOrder + 50;
  } else if (displayLesson.lessonId && displayLesson.lessonId > 0) {
    displayLessonNum = displayLesson.lessonId;
  }

  let currentLessonNum = lesson.lessonId || lesson.sortOrder || 1;
  const currentLvlCode = (lesson.levelCode || selectedLevelCode || "N5").toUpperCase();
  if (currentLvlCode === "N4" && lesson.sortOrder <= 25) {
    currentLessonNum = lesson.sortOrder + 25;
  } else if (currentLvlCode === "N3" && lesson.sortOrder <= 15) {
    currentLessonNum = lesson.sortOrder + 50;
  } else if (lesson.lessonId && lesson.lessonId > 0) {
    currentLessonNum = lesson.lessonId;
  }

  const buttonLabel = isRecommendingNext
    ? `Bắt đầu Bài #${displayLessonNum} ngay`
    : status === "COMPLETED" || completionPercent === 100
    ? "Học lại bài này"
    : status === "IN_PROGRESS" || completionPercent > 0
    ? "Tiếp tục bài học"
    : "Bắt đầu học bài này";

  const dueCount = dueData?.dueCount ?? 0;

  return (
    <div className="w-full space-y-3 font-sans">
      {/* 1. ANIMATED SHIMMER / RUNNING BORDER WRAPPER (HIỆU ỨNG VIỀN CHẠY & NHẤP NHÁY NỔI BẬT) */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-full p-[2.5px] rounded-2xl bg-[length:200%_200%] bg-gradient-to-r from-[#D66552] via-[#F4A261] via-amber-300 to-[#D66552] shadow-xl shadow-[#D66552]/15"
      >
        {/* INNER LESSON HEADER CARD (RICHER WARM JAPANESE BEIGE BACKGROUND FOR HIGHER CONTRAST) */}
        <div className="w-full bg-[#F5E8DB] border-2 border-[#E5D7C7] rounded-[14px] p-4 sm:p-5.5 space-y-3.5 relative overflow-hidden shadow-inner">
          
          {/* TOP BAR: Back Button + Level/Lesson Badges + Animated Pulse Highlight Tag + Optional Due Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5D7C7] pb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={onBack || (() => window.history.back())}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-[#FAF6F0] border border-[#E5D7C7] text-[#56423E] text-xs font-bold transition-all shadow-2xs cursor-pointer hover:scale-102"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#76685F]" />
                <span>Quay lại</span>
              </button>

              <div className="h-4 w-px bg-[#E5D7C7] mx-0.5 hidden sm:block" />

              {/* DYNAMIC ACCURATE LEVEL BADGE */}
              <span className="bg-[#D66552] text-white font-black text-xs px-3 py-0.5 rounded-full shadow-2xs">
                {displayLevelCode}
              </span>

              {/* DYNAMIC ACCURATE LESSON NUMBER BADGE */}
              <span className="bg-white text-[#D66552] border border-[#E5D7C7] font-black text-xs px-3 py-0.5 rounded-full uppercase shadow-2xs">
                BÀI {displayLessonNum}
              </span>

              {/* Animated Highlight Tag (Nhấp nháy nổi bật) */}
              <span className="bg-amber-100/90 text-[#D66552] border border-amber-300/80 font-extrabold text-[11px] px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D66552] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D66552]"></span>
                </span>
                <span>💡 BÀI HỌC ĐỀ XUẤT</span>
              </span>
            </div>

            {dueCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D66552] bg-white px-3 py-0.5 rounded-full border border-[#D66552]/30 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-[#D66552]" />
                <span>{dueCount} từ cần ôn</span>
              </span>
            )}
          </div>

          {/* MAIN 2-COLUMN SECTION: Left Title/Description & Right Compact Capybara Mascot */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* LEFT: Title & Short Description (Primary Visual Priority) */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white border border-[#E5D7C7] flex items-center justify-center shrink-0 text-[#D66552] shadow-2xs">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>

                <h2 className="text-lg sm:text-xl font-black text-[#231917] tracking-tight leading-snug truncate">
                  {displayLesson.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#56423E] font-medium leading-relaxed sm:pl-11 line-clamp-2">
                {isRecommendingNext
                  ? `Chúc mừng bạn đã hoàn thành Bài #${currentLessonNum}! Tiếp tục chinh phục bài học tiếp theo.`
                  : displayLesson.description || "Phỏng đoán chắc chắn và diễn tả khuynh hướng dễ xảy ra"}
              </p>
            </div>

            {/* RIGHT: Proportionate Kawaii Capybara Mascot Accent & Speech Bubble */}
            <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
              {/* Speech Bubble */}
              <div className="relative bg-white border border-[#D66552] rounded-xl px-2.5 py-1.5 shadow-2xs max-w-[150px] text-left">
                <div className="text-[11px] font-bold text-[#D66552] flex items-center gap-1">
                  <span>Cố lên nha! 💪</span>
                </div>
                <p className="text-[10px] text-[#76685F] font-medium leading-tight mt-0.5">
                  Học một chút mỗi ngày! ❤️
                </p>
                {/* Arrow pointing to mascot */}
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-white border-t border-r border-[#D66552] rotate-45" />
              </div>

              {/* Compact Mascot SVG */}
              <div className="w-24 h-22 sm:w-28 sm:h-24 shrink-0">
                <svg className="w-full h-full" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Desk Base */}
                  <rect x="15" y="112" width="130" height="10" rx="3" fill="#C49A6C" stroke="#8C653C" strokeWidth="1.5" />
                  
                  {/* Small Mug on Desk */}
                  <rect x="125" y="100" width="12" height="12" rx="3" fill="#FFFDF9" stroke="#8C653C" strokeWidth="1.2" />
                  <circle cx="131" cy="106" r="1.5" fill="#D66552" />

                  {/* Capybara Body */}
                  <ellipse cx="80" cy="85" rx="32" ry="28" fill="#D4A06B" stroke="#7A4B27" strokeWidth="2" />

                  {/* Capybara Head */}
                  <ellipse cx="80" cy="55" rx="26" ry="22" fill="#D4A06B" stroke="#7A4B27" strokeWidth="2" />
                  
                  {/* Capybara Snout */}
                  <ellipse cx="80" cy="61" rx="13" ry="10" fill="#C48E59" stroke="#7A4B27" strokeWidth="1.2" />
                  <ellipse cx="80" cy="58" rx="3.5" ry="2.2" fill="#422510" />

                  {/* Eyes */}
                  <circle cx="68" cy="53" r="2.5" fill="#381D0A" />
                  <circle cx="92" cy="53" r="2.5" fill="#381D0A" />

                  {/* Cheeks */}
                  <ellipse cx="64" cy="59" rx="2.8" ry="1.5" fill="#D66552" opacity="0.4" />
                  <ellipse cx="96" cy="59" rx="2.8" ry="1.5" fill="#D66552" opacity="0.4" />

                  {/* Ears */}
                  <ellipse cx="55" cy="46" rx="4.5" ry="5.5" fill="#B57F4D" stroke="#7A4B27" strokeWidth="1.5" />
                  <ellipse cx="105" cy="46" rx="4.5" ry="5.5" fill="#B57F4D" stroke="#7A4B27" strokeWidth="1.5" />

                  {/* Leaf on Head */}
                  <path d="M80 34 C72 27 75 20 80 17 C85 20 88 27 80 34 Z" fill="#5B9A4C" stroke="#3D6832" strokeWidth="1.2" />

                  {/* Open Book */}
                  <path d="M55 110 L78 108 L78 96 L55 98 Z" fill="#FFFDF9" stroke="#5B9A4C" strokeWidth="1.2" />
                  <path d="M82 108 L105 110 L105 98 L82 96 Z" fill="#FFFDF9" stroke="#5B9A4C" strokeWidth="1.2" />

                  {/* Paw & Pencil */}
                  <ellipse cx="65" cy="100" rx="4" ry="3" fill="#C48E59" stroke="#7A4B27" strokeWidth="1" />
                  <ellipse cx="95" cy="100" rx="4" ry="3" fill="#C48E59" stroke="#7A4B27" strokeWidth="1" />
                  <path d="M67 103 L92 94" stroke="#5B9A4C" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

          {/* INLINE SLIM PROGRESS BAR (RICHER BACKGROUND) */}
          <div className="bg-[#EEDDCD] border border-[#DFCBB9] rounded-xl px-3.5 py-2.5 flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#231917] shrink-0">
              <Target className="w-3.5 h-3.5 text-[#D66552]" />
              <span>Tiến độ bài học</span>
            </span>

            <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden border border-[#DFCBB9] p-0.5 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-[#D66552] rounded-full"
              />
            </div>

            <span className="text-xs font-black text-[#D66552] shrink-0">{completionPercent}%</span>
          </div>

          {/* CTA BUTTON - PROPORTIONAL & RIGHT-ALIGNED WITH PULSING GLOW */}
          <div className="flex items-center justify-end pt-0.5">
            <button
              type="button"
              onClick={() => onContinueLesson(displayLesson)}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#D66552] hover:bg-[#C55441] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#D66552]/30 border border-white/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-white text-[#D66552] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-[#D66552] translate-x-0.5" />
              </span>

              <span>{buttonLabel}</span>

              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </motion.div>

      {/* 2. COMPACT BOTTOM REVIEW CALLOUT CARD ("ÔN BÀI CŨ") - MATCHES RICH WARM BEIGE */}
      <div className="w-full bg-[#F5E8DB] border border-[#E5D7C7] rounded-xl px-4 py-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white border border-[#E5D7C7] flex items-center justify-center shrink-0 text-sm shadow-2xs">
            🦫
          </div>
          <span className="text-xs font-bold text-[#56423E]">
            Nhớ ôn lại bài cũ trước khi học bài mới nhé!
          </span>
        </div>

        <button
          type="button"
          onClick={onReviewDueFlashcards}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF6F0] text-[#D66552] border border-[#E5D7C7] font-bold text-xs shadow-2xs transition-all hover:scale-102 cursor-pointer ml-auto sm:ml-0"
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>Ôn bài cũ</span>
        </button>
      </div>
    </div>
  );
}
