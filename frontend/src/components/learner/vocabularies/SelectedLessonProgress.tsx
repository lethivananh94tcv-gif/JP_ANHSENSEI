"use client";

import { LessonItem, LessonProgressItem, DueFlashcardsCountData } from "./types";

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
      ? "Học lại"
      : status === "IN_PROGRESS" || completionPercent > 0
      ? "Học tiếp"
      : "Bắt đầu";

  const dueCount = dueData?.dueCount ?? 0;

  return (
    <div className="w-full bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
      {/* Left Column: Lesson Title & Progress Bar */}
      <div className="space-y-3 flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#8B6F5A] uppercase tracking-wider">
          <span>{lesson.levelCode || "JLPT"}</span>
          <span>•</span>
          <span>Bài #{lesson.sortOrder}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-black text-[#302A26] truncate">
          {lesson.title}
        </h2>

        {/* Progress Bar & Percentage */}
        <div className="space-y-1.5 max-w-md pt-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#756A62]">Tiến độ bài học</span>
            <span className="text-[#C65D4B] font-extrabold">{completionPercent}%</span>
          </div>
          <div className="w-full h-3 bg-[#F5EFE6] rounded-full overflow-hidden border border-[#DED3C8]/80">
            <div
              className="h-full bg-[#6F8A72] rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onContinueLesson}
            className="px-6 py-2.5 bg-[#8B6F5A] hover:bg-[#785d49] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{buttonLabel}</span>
            <span>➔</span>
          </button>
        </div>
      </div>

      {/* Right Column: Due Flashcards Widget */}
      <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#DED3C8]/60 flex flex-col items-start md:items-end justify-center space-y-2">
        {dueCount > 0 ? (
          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2 w-full">
            <span className="text-xs font-extrabold text-[#C65D4B] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 whitespace-nowrap">
              {dueCount} từ cần ôn
            </span>
            <button
              type="button"
              onClick={onReviewDueFlashcards}
              className="w-full md:w-auto px-6 py-2.5 bg-[#C65D4B] hover:bg-[#b54f3e] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              Ôn ngay ➔
            </button>
          </div>
        ) : completionPercent > 0 || status === "IN_PROGRESS" || status === "COMPLETED" ? (
          <div className="bg-[#FAF3EB] border border-[#DED3C8] px-4 py-2.5 rounded-2xl text-xs font-bold text-[#8B6F5A] flex items-center gap-2">
            <span>✓</span>
            <span>Hôm nay đã ôn xong</span>
          </div>
        ) : (
          <div className="bg-[#FAF3EB] border border-[#DED3C8] px-4 py-2.5 rounded-2xl text-xs font-bold text-[#8B6F5A] flex items-center gap-2">
            <span>🌱</span>
            <span>Chưa có thẻ đến hạn</span>
          </div>
        )}
      </div>
    </div>
  );
}
