"use client";

import { LessonItem, LessonProgressItem } from "./types";
import { CheckCircle2, Play, Circle, ArrowRight, BookOpen } from "lucide-react";
import Card3DTilt from "@/components/ui/Card3DTilt";
import { motion } from "framer-motion";

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
  const displayedLessons = lessons.slice(0, 5);

  return (
    <section aria-label={`Danh sách bài học ${levelCode}`} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-[#231917] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#C65D4B]" />
          <span>Danh Sách Bài Học Trình Độ {levelCode}</span>
        </h3>
        <button
          type="button"
          onClick={onOpenAllLessons}
          className="text-xs font-black text-[#C65D4B] hover:text-[#B04F3F] transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>Xem tất cả ({lessons.length} bài)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3.5">
        {displayedLessons.map((lsn) => {
          const isSelected = lsn.lessonId === selectedLessonId || lsn.sortOrder === selectedLessonId;
          const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
          const completionPercent = prog?.completionPercent ?? 0;
          const isCompleted = completionPercent === 100;
          const isInProgress = completionPercent > 0 && !isCompleted;

          const actionLabel = isCompleted ? "Học lại" : isInProgress ? "Học tiếp" : "Bắt đầu học";

          return (
            <Card3DTilt key={lsn.lessonId}>
              <div
                onClick={() => onSelectLesson(lsn)}
                aria-current={isSelected ? "true" : undefined}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer shadow-lg relative overflow-hidden group ${isSelected
                    ? "bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-[#C65D4B] border-l-8 shadow-2xl ring-2 ring-[#C65D4B]/30"
                    : "bg-white border-[#DED3C8] hover:border-[#8B6F5A]"
                  }`}
              >
                {/* Left Side: Status Icon & Full Non-Truncated Lesson Title */}
                <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                  {/* Status Icon */}
                  <div className="shrink-0 pt-0.5 sm:pt-0">
                    {isCompleted ? (
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 flex items-center justify-center font-extrabold shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                    ) : isInProgress ? (
                      <div className="w-10 h-10 rounded-2xl bg-[#C65D4B]/20 border border-[#C65D4B]/40 text-[#C65D4B] flex items-center justify-center font-extrabold shadow-xs">
                        <Play className="w-4 h-4 fill-current text-[#C65D4B]" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-2xl bg-[#F5EFE6] border border-[#DED3C8] text-[#8B6F5A] flex items-center justify-center font-extrabold shadow-xs">
                        <Circle className="w-4 h-4 text-[#8B6F5A]" />
                      </div>
                    )}
                  </div>

                  {/* Full Non-Truncated Lesson Title */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-black text-[#8B6F5A]">
                      <span className="bg-[#C65D4B]/10 text-[#C65D4B] px-2.5 py-0.5 rounded-lg border border-[#C65D4B]/20">
                        Bài #{lsn.sortOrder}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-[#231917] leading-snug group-hover:text-[#C65D4B] transition-colors">
                      {lsn.title}
                    </h4>
                  </div>
                </div>

                {/* Right Side: Progress Bar & Action Button */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DED3C8]/60">
                  <div className="flex flex-col items-end gap-1 w-24">
                    <span className="text-[11px] font-black text-[#C65D4B]">
                      {completionPercent}%
                    </span>
                    <div className="w-full h-2 bg-[#F5EFE6] rounded-full overflow-hidden border border-[#DED3C8]">
                      <div
                        className="h-full bg-gradient-to-r from-[#8B6F5A] to-[#C65D4B] rounded-full transition-all duration-500"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLesson(lsn);
                    }}
                    className={`px-5 py-2.5 font-black text-xs rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-md flex items-center gap-1.5 ${isSelected
                        ? "bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] hover:from-[#B04F3F] hover:to-[#9B4133] text-white hover:scale-105"
                        : "bg-[#F5EFE6] hover:bg-[#C65D4B] text-[#8B6F5A] hover:text-white border border-[#DED3C8]"
                      }`}
                  >
                    <span>{actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card3DTilt>
          );
        })}
      </div>
    </section>
  );
}
