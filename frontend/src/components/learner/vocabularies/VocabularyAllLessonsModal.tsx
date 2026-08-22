"use client";

import { useState, useMemo } from "react";
import { LessonItem, LessonProgressItem } from "./types";

interface VocabularyAllLessonsModalProps {
  isOpen: boolean;
  levelCode: string;
  lessons: LessonItem[];
  progressMap: Record<number, LessonProgressItem>;
  selectedLessonId?: number;
  onClose: () => void;
  onSelectLesson: (lesson: LessonItem) => void;
  onOpenLesson: (lesson: LessonItem) => void;
}

export default function VocabularyAllLessonsModal({
  isOpen,
  levelCode,
  lessons,
  progressMap,
  selectedLessonId,
  onClose,
  onSelectLesson,
  onOpenLesson,
}: VocabularyAllLessonsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED">("all");

  const filteredLessons = useMemo(() => {
    return lessons
      .filter((lsn) => lsn.status === "PUBLISHED")
      .filter((lsn) => {
        const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
        const percent = prog?.completionPercent ?? 0;
        const status = prog?.status ?? (percent === 100 ? "COMPLETED" : percent > 0 ? "IN_PROGRESS" : "NOT_STARTED");

        if (statusFilter === "NOT_STARTED" && status !== "NOT_STARTED") return false;
        if (statusFilter === "IN_PROGRESS" && status !== "IN_PROGRESS") return false;
        if (statusFilter === "COMPLETED" && status !== "COMPLETED") return false;

        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return lsn.title.toLowerCase().includes(q) || String(lsn.sortOrder).includes(q);
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [lessons, progressMap, statusFilter, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-[#302A26]/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
    >
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl w-full max-w-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#DED3C8]/60 pb-4">
          <div>
            <h3 id="modal-title" className="text-xl font-serif font-black text-[#302A26]">
              Tất Cả Bài Học {levelCode}
            </h3>
            <p className="text-xs text-[#756A62]">
              Tổng cộng {filteredLessons.length} bài học phù hợp
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng bài học"
            className="w-9 h-9 rounded-2xl bg-[#F5EFE6] hover:bg-[#C65D4B] text-[#8B6F5A] hover:text-white font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bài hoặc số bài..."
              className="w-full bg-[#F5EFE6] border border-[#DED3C8] focus:border-[#C65D4B] text-xs font-bold px-4 py-2.5 rounded-2xl outline-none text-[#302A26] placeholder-[#8B6F5A]/60"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8B6F5A]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0">
            {[
              { key: "all" as const, label: "Tất cả" },
              { key: "NOT_STARTED" as const, label: "Chưa học" },
              { key: "IN_PROGRESS" as const, label: "Đang học" },
              { key: "COMPLETED" as const, label: "Hoàn thành" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatusFilter(f.key)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === f.key
                    ? "bg-[#8B6F5A] text-white"
                    : "bg-[#F5EFE6] text-[#8B6F5A] hover:bg-[#FAF3EB]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons List Scroll Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-[200px]">
          {filteredLessons.length === 0 ? (
            <div className="py-12 text-center text-xs font-semibold text-[#756A62]">
              Không tìm thấy bài học nào phù hợp với bộ lọc.
            </div>
          ) : (
            filteredLessons.map((lsn) => {
              const isSelected = lsn.lessonId === selectedLessonId || lsn.sortOrder === selectedLessonId;
              const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
              const completionPercent = prog?.completionPercent ?? 0;
              const isCompleted = completionPercent === 100;
              const isInProgress = completionPercent > 0 && !isCompleted;

              const actionLabel = isCompleted ? "Học lại" : isInProgress ? "Học tiếp" : "Bắt đầu";

              return (
                <div
                  key={lsn.lessonId}
                  onClick={() => {
                    onSelectLesson(lsn);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-[#FAF3EB] border-[#C65D4B] border-l-4"
                      : "bg-[#FFFCF7] border-[#DED3C8] hover:bg-[#FAF3EB]/60"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="shrink-0 font-extrabold text-xs text-[#8B6F5A] bg-[#FAF3EB] px-2.5 py-1 rounded-xl border border-[#DED3C8]">
                      #{lsn.sortOrder}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#302A26] truncate">
                        {lsn.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-[#756A62]">
                      {completionPercent}%
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLesson(lsn);
                        onClose();
                      }}
                      className="px-4 py-2 bg-[#C65D4B] hover:bg-[#b54f3e] text-white font-extrabold text-xs rounded-xl shadow-2xs cursor-pointer"
                    >
                      {actionLabel}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
