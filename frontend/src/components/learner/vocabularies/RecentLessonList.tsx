"use client";

import { LessonItem, LessonProgressItem } from "./types";

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
  // Show 3-5 recent / current lessons for current level
  const displayedLessons = lessons.slice(0, 5);

  return (
    <section aria-label={`Danh sách bài học ${levelCode}`} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-black text-[#302A26]">
          Bài học {levelCode}
        </h3>
        <button
          type="button"
          onClick={onOpenAllLessons}
          className="text-xs font-extrabold text-[#C65D4B] hover:text-[#b54f3e] hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>Xem tất cả ({lessons.length})</span>
          <span>➔</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {displayedLessons.map((lsn) => {
          const isSelected = lsn.lessonId === selectedLessonId || lsn.sortOrder === selectedLessonId;
          const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
          const completionPercent = prog?.completionPercent ?? 0;
          const isCompleted = completionPercent === 100;
          const isInProgress = completionPercent > 0 && !isCompleted;

          const actionLabel = isCompleted ? "Học lại" : isInProgress ? "Học tiếp" : "Bắt đầu";

          return (
            <div
              key={lsn.lessonId}
              onClick={() => onSelectLesson(lsn)}
              aria-current={isSelected ? "true" : undefined}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                isSelected
                  ? "bg-[#FAF3EB] border-[#C65D4B] border-l-4 shadow-2xs"
                  : "bg-[#FFFCF7] border-[#DED3C8] hover:bg-[#FAF3EB]/60 hover:border-[#8B6F5A]"
              }`}
            >
              {/* Left Side: Status Icon & Lesson Info */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* Status Icon */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-[#6F8A72]/20 border border-[#6F8A72] text-[#6F8A72] flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                  ) : isInProgress ? (
                    <div className="w-8 h-8 rounded-full bg-rose-50 border border-[#C65D4B] text-[#C65D4B] flex items-center justify-center font-bold text-xs">
                      ▶
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#F5EFE6] border border-[#DED3C8] text-[#8B6F5A] flex items-center justify-center font-bold text-xs">
                      ○
                    </div>
                  )}
                </div>

                {/* Lesson Title */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#8B6F5A]">
                    <span>Bài #{lsn.sortOrder}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#302A26] truncate">
                    {lsn.title}
                  </h4>
                </div>
              </div>

              {/* Right Side: Mini Progress Bar & Action Button */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex flex-col items-end gap-1 w-24">
                  <span className="text-[11px] font-bold text-[#756A62]">
                    {completionPercent}%
                  </span>
                  <div className="w-full h-1.5 bg-[#F5EFE6] rounded-full overflow-hidden border border-[#DED3C8]">
                    <div
                      className="h-full bg-[#6F8A72] rounded-full"
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
                  className={`px-4 py-2 font-extrabold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-[#C65D4B] hover:bg-[#b54f3e] text-white shadow-2xs"
                      : "bg-[#F5EFE6] hover:bg-[#C65D4B] text-[#8B6F5A] hover:text-white border border-[#DED3C8]"
                  }`}
                >
                  {actionLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
