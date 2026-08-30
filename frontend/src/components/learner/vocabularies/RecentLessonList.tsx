"use client";

import { useState } from "react";
import { LessonItem, LessonProgressItem } from "./types";
import { CheckCircle2, ArrowRight, BookOpen, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RecentLessonListProps {
  levelCode: string;
  lessons: LessonItem[];
  selectedLessonId?: number;
  progressMap: Record<number, LessonProgressItem>;
  onSelectLesson: (lesson: LessonItem) => void;
  onOpenLesson: (lesson: LessonItem) => void;
  onOpenAllLessons: () => void;
}

export default function RecentLessonList({
  levelCode,
  lessons,
  selectedLessonId,
  progressMap,
  onSelectLesson,
  onOpenLesson,
  onOpenAllLessons,
}: RecentLessonListProps) {
  const [filterTab, setFilterTab] = useState<"all" | "in_progress" | "not_started" | "completed">("all");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const completedCount = lessons.filter((l) => {
    const p = progressMap[l.lessonId] || progressMap[l.sortOrder];
    return p && (p.completionPercent === 100 || p.status === "COMPLETED");
  }).length;

  const inProgressCount = lessons.filter((l) => {
    const p = progressMap[l.lessonId] || progressMap[l.sortOrder];
    return p && p.completionPercent > 0 && p.completionPercent < 100;
  }).length;

  const notStartedCount = lessons.filter((l) => {
    const p = progressMap[l.lessonId] || progressMap[l.sortOrder];
    return !p || (p.completionPercent === 0 && p.status !== "COMPLETED");
  }).length;

  const filteredLessons = lessons.filter((l) => {
    const p = progressMap[l.lessonId] || progressMap[l.sortOrder];
    const comp = p?.completionPercent ?? 0;
    const isDone = comp === 100 || p?.status === "COMPLETED";
    const isDoing = comp > 0 && !isDone;
    const isNotStart = !p || (comp === 0 && !isDone);

    if (filterTab === "completed") return isDone;
    if (filterTab === "in_progress") return isDoing;
    if (filterTab === "not_started") return isNotStart;
    return true;
  });

  const COLLAPSED_LIMIT = 5;
  const displayedLessons = isExpanded ? filteredLessons : filteredLessons.slice(0, COLLAPSED_LIMIT);
  const remainingCount = filteredLessons.length - COLLAPSED_LIMIT;

  return (
    <section aria-label={`Kho bài học ${levelCode}`} className="space-y-4 font-sans select-none">
      {/* Sleek Header & Underline Tabs Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E5D7C7]">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[#C65D4B]" />
          <h3 className="text-base sm:text-lg font-extrabold text-[#1F1714] tracking-tight">
            Kho Bài Học JLPT {levelCode}
          </h3>
          <span className="text-xs font-bold text-[#8B786D] bg-[#FAF4EB] px-2.5 py-0.5 rounded-full border border-[#E5D7C7]">
            {lessons.length} bài
          </span>
        </div>

        {/* Filter Underline Tabs */}
        <div className="flex items-center gap-4 text-xs font-bold text-[#6E5D55]">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "all"
                ? "text-[#C65D4B] font-extrabold border-b-2 border-[#C65D4B]"
                : "hover:text-[#1F1714]"
            }`}
          >
            Tất cả ({lessons.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("in_progress")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "in_progress"
                ? "text-[#C65D4B] font-extrabold border-b-2 border-[#C65D4B]"
                : "hover:text-[#1F1714]"
            }`}
          >
            🔥 Đang học ({inProgressCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("not_started")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "not_started"
                ? "text-[#C65D4B] font-extrabold border-b-2 border-[#C65D4B]"
                : "hover:text-[#1F1714]"
            }`}
          >
            ⌛ Chưa học ({notStartedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("completed")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "completed"
                ? "text-[#C65D4B] font-extrabold border-b-2 border-[#C65D4B]"
                : "hover:text-[#1F1714]"
            }`}
          >
            ☑️ Đã xong ({completedCount})
          </button>
        </div>
      </div>

      {/* Lesson List Cards */}
      {displayedLessons.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-2xl p-8 text-center text-[#8B786D] border border-dashed border-[#E5D7C7] font-semibold text-xs">
          Không có bài học nào khớp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {displayedLessons.map((lsn, idx) => {
              const isSelected = lsn.lessonId === selectedLessonId || lsn.sortOrder === selectedLessonId;
              const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
              const completionPercent = prog?.completionPercent ?? 0;
              const isCompleted = completionPercent === 100 || prog?.status === "COMPLETED";
              const isInProgress = completionPercent > 0 && !isCompleted;

              const actionLabel = isCompleted ? "Học lại" : isInProgress ? "Học tiếp" : "Bắt đầu học";

              return (
                <motion.div
                  key={lsn.lessonId}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, delay: idx * 0.02 }}
                >
                  <div
                    onClick={() => onSelectLesson(lsn)}
                    className={`group p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer shadow-2xs ${
                      isSelected
                        ? "bg-[#FFFDF9] border-2 border-[#C65D4B] ring-2 ring-[#C65D4B]/10"
                        : "bg-[#FFFDF9] hover:bg-[#FAF4EB] border-[#E5D7C7] hover:border-[#C65D4B]/40"
                    }`}
                  >
                    {/* Left: Target Icon & Lesson Info */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : isInProgress
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : "bg-[#FAF4EB] text-[#8B786D] border-[#E5D7C7]"
                        }`}
                      >
                        {isCompleted ? "🎯" : isInProgress ? "🔥" : "⚪"}
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#8B786D]">
                            Bài #{lsn.sortOrder}
                          </span>
                          {isCompleted && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              Đã hoàn thành
                            </span>
                          )}
                          {isInProgress && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              Đang học
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1F1714] group-hover:text-[#C65D4B] transition-colors leading-snug truncate sm:whitespace-normal">
                          {lsn.title}
                        </h4>
                      </div>
                    </div>

                    {/* Right: Progress Bar & CTA Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5D7C7]/60">
                      {/* Progress Bar */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-20 sm:w-28 h-2 bg-[#F3EBE0] rounded-full overflow-hidden border border-[#E5D7C7]">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? "bg-emerald-500" : "bg-[#C65D4B]"
                            }`}
                            style={{ width: `${completionPercent}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold w-9 text-right ${isCompleted ? "text-emerald-600" : "text-[#C65D4B]"}`}>
                          {completionPercent}%
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLesson(lsn);
                        }}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                          isCompleted || isSelected
                            ? "bg-[#C65D4B] hover:bg-[#B44C3B] text-white border border-transparent shadow-2xs"
                            : "bg-[#FAF4EB] hover:bg-[#F3EBE0] text-[#1F1714] border border-[#E5D7C7]"
                        }`}
                      >
                        <span>{actionLabel}</span>
                        <span className="text-xs">→</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Footer Actions */}
      <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
        {filteredLessons.length > COLLAPSED_LIMIT && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF4EB] hover:bg-[#F3EBE0] border border-[#E5D7C7] text-[#6E5D55] font-bold text-xs transition-all cursor-pointer shadow-2xs"
          >
            {isExpanded ? (
              <>
                <span>Thu gọn bớt bài học</span>
                <ChevronUp className="w-4 h-4 text-[#C65D4B]" />
              </>
            ) : (
              <>
                <span>Xem thêm (+{remainingCount} bài nữa)</span>
                <ChevronDown className="w-4 h-4 text-[#C65D4B]" />
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onOpenAllLessons}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white border border-[#C65D4B] font-bold text-xs transition-all cursor-pointer shadow-2xs"
        >
          <span>Xem tất cả {lessons.length} bài học</span>
          <span className="text-xs">→</span>
        </button>
      </div>
    </section>
  );
}
