"use client";

import { useState } from "react";
import { LessonItem, LessonProgressItem } from "./types";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
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

  const lvlUpper = (levelCode || "N5").toUpperCase();

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
    <section aria-label={`Kho bài học ${lvlUpper}`} className="w-full space-y-4 font-sans select-none">
      {/* Sleek Header & Underline Tabs Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2.5 border-b border-[#EFE5DA]">
        {/* Title & Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FDF0EC] border border-[#F9DCD5] flex items-center justify-center text-[#D66552] shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#231917] tracking-tight">
            Kho bài học JLPT {lvlUpper}
          </h3>
          <span className="text-xs font-black text-[#76685F] bg-[#FAF2EA] px-3 py-0.5 rounded-full border border-[#EFE5DA]">
            {lessons.length} bài
          </span>
        </div>

        {/* Filter Underline Tabs */}
        <div className="flex items-center gap-4 text-xs font-bold text-[#76685F]">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "all"
                ? "text-[#D66552] font-extrabold border-b-2 border-[#D66552]"
                : "hover:text-[#231917]"
            }`}
          >
            Tất cả ({lessons.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("in_progress")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "in_progress"
                ? "text-[#D66552] font-extrabold border-b-2 border-[#D66552]"
                : "hover:text-[#231917]"
            }`}
          >
            🔥 Đang học ({inProgressCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("not_started")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "not_started"
                ? "text-[#D66552] font-extrabold border-b-2 border-[#D66552]"
                : "hover:text-[#231917]"
            }`}
          >
            ⌛ Chưa học ({notStartedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("completed")}
            className={`pb-1 transition-all cursor-pointer ${
              filterTab === "completed"
                ? "text-[#D66552] font-extrabold border-b-2 border-[#D66552]"
                : "hover:text-[#231917]"
            }`}
          >
            ☑️ Đã xong ({completedCount})
          </button>
        </div>
      </div>

      {/* Lesson Cards List */}
      {displayedLessons.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-2xl p-8 text-center text-[#76685F] border border-dashed border-[#EFE5DA] font-semibold text-xs">
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

              // Calculate accurate lesson number to display above title (e.g. Bài 51, Bài 52...)
              let displayNum = lsn.lessonId || lsn.sortOrder;
              if (lvlUpper === "N4" && lsn.sortOrder <= 25) {
                displayNum = lsn.sortOrder + 25;
              } else if (lvlUpper === "N3" && lsn.sortOrder <= 15) {
                displayNum = lsn.sortOrder + 50;
              }

              // Calculate Card index number (01, 02, 03...)
              const cardNumStr = String(idx + 1).padStart(2, "0");

              const actionLabel = isSelected || isInProgress
                ? "Tiếp tục →"
                : isCompleted
                ? "Học lại →"
                : "Học bài →";

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
                    className={`relative overflow-hidden p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer shadow-2xs ${
                      isSelected
                        ? "bg-[#FFF5F2] border-2 border-[#F9DCD5] shadow-sm"
                        : "bg-[#FFFDF9] hover:bg-[#FAF6F0] border-[#EFE5DA] hover:border-[#D66552]/40"
                    }`}
                  >
                    {/* Left Accent Bar on Selected State */}
                    {isSelected && (
                      <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-[#D66552] rounded-l-2xl" />
                    )}

                    {/* Left: Number Box (01, 02...) & Lesson Details */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1 pl-1">
                      {/* Number Badge Box (01, 02, 03...) */}
                      <div
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 border transition-colors ${
                          isSelected
                            ? "bg-[#FFFDF9] text-[#D66552] border-[#F9DCD5] shadow-2xs"
                            : "bg-[#FAF6F0] text-[#8C653C] border-[#EFE5DA]"
                        }`}
                      >
                        {cardNumStr}
                      </div>

                      {/* Lesson Info */}
                      <div className="min-w-0 flex-1 space-y-0.5">
                        {(isSelected || (!isSelected && isCompleted)) && (
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <span className="text-[10px] font-black text-[#D66552] bg-[#D66552]/15 px-2 py-0.5 rounded-full uppercase">
                                ĐANG HỌC
                              </span>
                            )}
                            {!isSelected && isCompleted && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                ✓ Đã xong
                              </span>
                            )}
                          </div>
                        )}
                        <h4 className="text-sm sm:text-base font-black text-[#231917] group-hover:text-[#D66552] transition-colors leading-snug truncate">
                          {lsn.title}
                        </h4>

                        <p className="text-xs font-medium text-[#76685F] truncate">
                          {lsn.description || "Nội dung bài học từ vựng"}
                        </p>
                      </div>
                    </div>

                    {/* Right: Progress Bar & CTA Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFE5DA]/60">
                      {/* Progress Bar */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-[#D66552] w-8 text-right shrink-0">
                          {completionPercent}%
                        </span>

                        <div className="w-24 sm:w-32 h-2 bg-[#FAF2EA] rounded-full overflow-hidden border border-[#EFE5DA] shrink-0">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? "bg-emerald-500" : "bg-[#D66552]"
                            }`}
                            style={{ width: `${completionPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLesson(lsn);
                        }}
                        className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-2xs hover:scale-102 active:scale-98 ${
                          isSelected
                            ? "bg-[#D66552] hover:bg-[#C55441] text-white border border-transparent"
                            : "bg-[#FAF4EC] hover:bg-[#FAF0E4] border border-[#EFE5DA] text-[#56423E] hover:text-[#D66552]"
                        }`}
                      >
                        {actionLabel}
                      </button>
                    </div>

                    {/* Sakura Accent on Selected Card */}
                    {isSelected && (
                      <span className="absolute top-2 right-3 text-pink-300 text-xs pointer-events-none select-none opacity-80">
                        🌸
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Footer Action Buttons */}
      <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
        {filteredLessons.length > COLLAPSED_LIMIT && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-[#FAF4EC] hover:bg-[#FAF0E4] border border-[#EFE5DA] text-[#56423E] font-bold text-xs transition-all cursor-pointer shadow-2xs hover:scale-102"
          >
            {isExpanded ? (
              <>
                <span>Thu gọn bớt bài học</span>
                <ChevronUp className="w-4 h-4 text-[#D66552]" />
              </>
            ) : (
              <>
                <span>📖 Xem thêm (+{remainingCount} bài nữa)</span>
                <ChevronDown className="w-4 h-4 text-[#D66552]" />
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onOpenAllLessons}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white hover:bg-[#FDF0EC] text-[#D66552] border border-[#F9DCD5] font-extrabold text-xs transition-all cursor-pointer shadow-2xs hover:scale-102"
        >
          <span>Xem tất cả {lessons.length} bài học</span>
          <span className="text-xs">→</span>
        </button>
      </div>
    </section>
  );
}
