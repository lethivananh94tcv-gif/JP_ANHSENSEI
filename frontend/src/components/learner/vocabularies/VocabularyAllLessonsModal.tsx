"use client";

import { useState, useMemo } from "react";
import { LessonItem, LessonProgressItem } from "./types";
import { CheckCircle2, Play, Circle, ArrowRight } from "lucide-react";

interface VocabularyAllLessonsModalProps {
  isOpen: boolean;
  levelCode: string;
  targetMode?: "list" | "cards" | "typing" | "match" | null;
  lessons: LessonItem[];
  progressMap: Record<number, LessonProgressItem>;
  selectedLessonId?: number;
  onClose: () => void;
  onSelectLesson: (lesson: LessonItem) => void;
  onOpenLesson: (lesson: LessonItem, mode?: "list" | "cards" | "typing" | "match" | null) => void;
}

export default function VocabularyAllLessonsModal({
  isOpen,
  levelCode,
  targetMode = null,
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
    return lessons.filter((lsn) => {
      const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
      const completionPercent = prog?.completionPercent ?? 0;
      const status =
        prog?.status ??
        (completionPercent >= 95
          ? "COMPLETED"
          : completionPercent > 0
          ? "IN_PROGRESS"
          : "NOT_STARTED");

      if (statusFilter !== "all" && status !== statusFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = lsn.title?.toLowerCase().includes(query);
        const orderMatch = String(lsn.sortOrder).includes(query);
        return titleMatch || orderMatch;
      }

      return true;
    });
  }, [lessons, progressMap, statusFilter, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 max-h-[88vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#DED3C8]/60 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#231917]">
              Tất cả bài học trình độ {levelCode}
            </h3>
            {targetMode ? (
              <p className="text-xs font-semibold text-[#C65D4B] mt-0.5">
                Chế độ đã chọn:{" "}
                <strong>
                  {targetMode === "cards"
                    ? "🎴 Lật Thẻ 3D Flashcards"
                    : targetMode === "typing"
                    ? "⌨️ Luyện Gõ Tiếng Nhật"
                    : targetMode === "match"
                    ? "🎮 Game Ghép Thẻ 3D"
                    : "📋 Tra Cứu Từ Vựng"}
                </strong>
              </p>
            ) : (
              <p className="text-xs font-semibold text-[#76685F] mt-0.5">
                Chọn bài học để bắt đầu luyện tập
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5EFE6] hover:bg-[#C65D4B] text-[#56423E] hover:text-white font-black text-sm flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          >
            ✕
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên bài học hoặc số bài..."
            className="flex-1 px-4 py-2.5 bg-white border border-[#DED3C8] focus:border-[#C65D4B] rounded-2xl text-xs font-bold text-[#231917] outline-hidden shadow-2xs"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-white border border-[#DED3C8] focus:border-[#C65D4B] rounded-2xl text-xs font-bold text-[#56423E] outline-hidden shadow-2xs cursor-pointer"
          >
            <option value="all">Tất cả trạng thái ({lessons.length} bài)</option>
            <option value="COMPLETED">✅ Đã hoàn thành (100%)</option>
            <option value="IN_PROGRESS">🔥 Đang học dở dang</option>
            <option value="NOT_STARTED">⚪ Chưa bắt đầu học</option>
          </select>
        </div>

        {/* Lesson Cards List with Green Completion Badges & Styling */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {filteredLessons.length === 0 ? (
            <div className="p-10 text-center text-xs font-bold text-[#76685F] bg-[#FAF3EB] rounded-2xl border border-dashed border-[#DED3C8]">
              Không tìm thấy bài học nào phù hợp với bộ lọc tìm kiếm.
            </div>
          ) : (
            filteredLessons.map((lsn) => {
              const isSelected = lsn.lessonId === selectedLessonId || lsn.sortOrder === selectedLessonId;
              const prog = progressMap[lsn.lessonId] || progressMap[lsn.sortOrder];
              const completionPercent = prog?.completionPercent ?? 0;
              const isCompleted = completionPercent >= 95;
              const isInProgress = completionPercent > 0 && !isCompleted;

              return (
                <div
                  key={lsn.lessonId}
                  onClick={() => onSelectLesson(lsn)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer ${
                    isCompleted
                      ? "bg-emerald-50/50 border-emerald-500/50 hover:border-emerald-600 shadow-xs"
                      : isInProgress
                      ? "bg-amber-50/50 border-amber-400/60 hover:border-amber-500 shadow-xs"
                      : isSelected
                      ? "bg-[#FAF3EB] border-[#C65D4B] border-l-8 shadow-xs"
                      : "bg-white border-[#DED3C8] hover:bg-[#FAF3EB]/60 hover:border-[#8B6F5A]"
                  }`}
                >
                  {/* Left Side: Status Badge & Title */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {isCompleted ? (
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                    ) : isInProgress ? (
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-600 flex items-center justify-center shrink-0">
                        <Play className="w-4 h-4 text-amber-600 fill-amber-600" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-[#F5EFE6] border border-[#DED3C8] text-[#8B6F5A] flex items-center justify-center shrink-0">
                        <Circle className="w-4 h-4 text-[#8B6F5A]" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#C65D4B] bg-[#C65D4B]/10 px-2 py-0.5 rounded-md">
                          Bài #{lsn.sortOrder}
                        </span>

                        {isCompleted && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                            ✅ Đã xong 100%
                          </span>
                        )}

                        {isInProgress && (
                          <span className="text-[10px] font-black text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                            🔥 Đã học {completionPercent}%
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-extrabold text-[#231917] truncate">
                        {lsn.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right Side: Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLesson(lsn, targetMode);
                    }}
                    className={`px-5 py-2.5 font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isCompleted
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:scale-105"
                        : isInProgress
                        ? "bg-[#C65D4B] hover:bg-[#B04F3F] text-white shadow-md hover:scale-105"
                        : "bg-[#F5EFE6] hover:bg-[#C65D4B] text-[#56423E] hover:text-white border border-[#DED3C8]"
                    }`}
                  >
                    <span>{isCompleted ? "✅ Học lại" : isInProgress ? "▶ Học tiếp" : "Vào học ngay"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
