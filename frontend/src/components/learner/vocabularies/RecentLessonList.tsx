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
      {/* Sleek Minimalist Header & Segmented Filter Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DCCF]">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[#D66552]" />
          <h3 className="text-base sm:text-lg font-extrabold text-[#2C201D] tracking-tight">
            Kho Bài Học JLPT {levelCode}
          </h3>
          <span className="text-xs font-bold text-[#8B6F5A] bg-[#F2E5D9] px-2.5 py-0.5 rounded-full border border-[#E3D4C7]">
            {lessons.length} bài
          </span>
        </div>

        {/* Minimalist Segmented Tabs Filter */}
        <div className="flex items-center gap-1 bg-[#F2E5D9] p-1 rounded-2xl border border-[#E3D4C7] text-xs font-bold">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterTab === "all"
                ? "bg-[#D66552] text-white shadow-2xs"
                : "text-[#6B554E] hover:text-[#2C201D] hover:bg-white/60"
            }`}
          >
            Tất cả ({lessons.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("in_progress")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterTab === "in_progress"
                ? "bg-[#D66552] text-white shadow-2xs"
                : "text-[#6B554E] hover:text-[#2C201D] hover:bg-white/60"
            }`}
          >
            🔥 Đang học ({inProgressCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("not_started")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterTab === "not_started"
                ? "bg-[#D66552] text-white shadow-2xs"
                : "text-[#6B554E] hover:text-[#2C201D] hover:bg-white/60"
            }`}
          >
            ⏳ Chưa học ({notStartedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("completed")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterTab === "completed"
                ? "bg-[#D66552] text-white shadow-2xs"
                : "text-[#6B554E] hover:text-[#2C201D] hover:bg-white/60"
            }`}
          >
            ✅ Đã xong ({completedCount})
          </button>
        </div>
      </div>

      {/* Clean Minimalist Paper Card List */}
      {displayedLessons.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-2xl p-8 text-center text-[#8B6F5A] border border-dashed border-[#E3D4C7] font-semibold text-xs">
          Không có bài học nào khớp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="space-y-2.5">
          <AnimatePresence>
            {displayedLessons.map((lsn, idx) => {
              const isSelected = lsn.lessonId === selectedLessonId || lsn.sortOrder === selectedLessonId;
              const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
              const completionPercent = prog?.completionPercent ?? 0;
              const isCompleted = completionPercent === 100 || prog?.status === "COMPLETED";
              const isInProgress = completionPercent > 0 && !isCompleted;

              const formattedOrder = String(lsn.sortOrder || idx + 1).padStart(2, "0");
              const actionLabel = isCompleted ? "Học lại" : isInProgress ? "Học tiếp" : "Bắt đầu học";

              return (
                <motion.div
                  key={lsn.lessonId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                >
                  <div
                    onClick={() => onSelectLesson(lsn)}
                    className={`group px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? "bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-[#D66552] border-l-4 shadow-xs"
                        : "bg-[#FFFDF9] hover:bg-white border-[#E8DCCF] hover:border-[#D66552]/60 shadow-2xs"
                    }`}
                  >
                    {/* Left: Japanese Index Number & Lesson Title */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Japanese Style Index Badge */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-jp font-bold text-xs shrink-0 border ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : isInProgress
                            ? "bg-[#F2E5D9] text-[#D66552] border-[#E3D4C7]"
                            : "bg-[#F5EFE6] text-[#8B6F5A] border-[#E8DCCF]"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : formattedOrder}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#8B6F5A]">
                            Bài #{lsn.sortOrder}
                          </span>
                          {isInProgress && (
                            <span className="text-[10px] font-bold text-[#D66552] bg-[#F2E5D9] px-2 py-0.5 rounded-md border border-[#E3D4C7]">
                              Đang học dở
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              Đã hoàn thành
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#2C201D] group-hover:text-[#D66552] transition-colors leading-snug truncate sm:whitespace-normal">
                          {lsn.title}
                        </h4>
                      </div>
                    </div>

                    {/* Right: Micro Progress Bar & Clean Action Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DCCF]/60">
                      {/* Micro Progress Bar */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-20 sm:w-24 h-2 bg-[#EFE5DC] rounded-full overflow-hidden border border-[#E3D4C7] p-0.5">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? "bg-emerald-500" : "bg-[#D66552]"
                            }`}
                            style={{ width: `${completionPercent}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right ${isCompleted ? "text-emerald-600" : "text-[#D66552]"}`}>
                          {completionPercent}%
                        </span>
                      </div>

                      {/* Clean Minimalist CTA Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLesson(lsn);
                        }}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#D66552] hover:bg-[#C25644] text-white border border-[#E37966] shadow-2xs"
                            : "bg-[#F2E5D9] hover:bg-[#D66552] text-[#8B6F5A] hover:text-white border border-[#E3D4C7]"
                        }`}
                      >
                        <span>{actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Clean Unified Footer Action Bar */}
      <div className="pt-2 flex items-center justify-center gap-3">
        {filteredLessons.length > COLLAPSED_LIMIT && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F2E5D9] hover:bg-[#E8D5C8] border border-[#E3D4C7] text-[#8B6F5A] font-bold text-xs transition-all cursor-pointer shadow-2xs"
          >
            {isExpanded ? (
              <>
                <span>Thu gọn bớt bài học</span>
                <ChevronUp className="w-4 h-4 text-[#D66552]" />
              </>
            ) : (
              <>
                <span>Xem thêm (+{remainingCount} bài nữa)</span>
                <ChevronDown className="w-4 h-4 text-[#D66552]" />
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onOpenAllLessons}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#FFFDF9] hover:bg-white border border-[#E8DCCF] hover:border-[#D66552] text-[#D66552] font-bold text-xs transition-all cursor-pointer shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D66552]" />
          <span>Xem tất cả {lessons.length} bài học ➔</span>
        </button>
      </div>
    </section>
  );
}
