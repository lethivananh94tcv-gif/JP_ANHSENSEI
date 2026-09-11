"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, LayoutList, LayoutGrid } from "lucide-react";
import LessonCard, { LessonData } from "./LessonCard";

interface LessonListProps {
  lessons: LessonData[];
  selectedLessonId?: number;
  onStudyLesson: (lesson: LessonData) => void;
  defaultLimit?: number;
}

export default function LessonList({
  lessons,
  selectedLessonId,
  onStudyLesson,
  defaultLimit = 3,
}: LessonListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterTab, setFilterTab] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");

  // Filter lessons based on status tabs
  const tabFilteredLessons = lessons.filter((l) => {
    if (filterTab === "ALL") return true;
    if (filterTab === "IN_PROGRESS") return l.status === "IN_PROGRESS";
    if (filterTab === "COMPLETED") return l.status === "COMPLETED";
    return true;
  });

  const displayedLessons = isExpanded ? tabFilteredLessons : tabFilteredLessons.slice(0, defaultLimit);
  const remainingCount = tabFilteredLessons.length - defaultLimit;

  return (
    <div className="space-y-4">
      {/* List Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3">
          <h2 className="text-base sm:text-lg font-bold font-sans text-[#2B211D] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C65D4B]" />
            <span>DANH SÁCH BÀI HỌC</span>
          </h2>
          <span className="text-xs text-[#76685F] font-bold">
            ({tabFilteredLessons.length} bài)
          </span>
        </div>

        {/* Action Controls: Filter Tabs & Grid/List Switcher */}
        <div className="flex items-center gap-3">
          {/* Status Tabs */}
          <div className="flex items-center bg-[#FAF7F2] border border-[#EFE5DA] rounded-xl p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setFilterTab("ALL")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filterTab === "ALL" ? "bg-white text-[#C65D4B] shadow-2xs" : "text-[#76685F] hover:text-[#2B211D]"
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("IN_PROGRESS")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filterTab === "IN_PROGRESS" ? "bg-white text-[#C65D4B] shadow-2xs" : "text-[#76685F] hover:text-[#2B211D]"
              }`}
            >
              Đang học
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("COMPLETED")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filterTab === "COMPLETED" ? "bg-white text-[#C65D4B] shadow-2xs" : "text-[#76685F] hover:text-[#2B211D]"
              }`}
            >
              Đã xong
            </button>
          </div>

          {/* Grid vs List View Mode Switcher */}
          <div className="flex items-center bg-[#FAF7F2] border border-[#EFE5DA] rounded-xl p-1 text-[#76685F]">
            <button
              type="button"
              title="Hiển thị dạng Danh sách"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "list" ? "bg-white text-[#C65D4B] shadow-2xs" : "hover:text-[#2B211D]"
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Hiển thị dạng Lưới"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-white text-[#C65D4B] shadow-2xs" : "hover:text-[#2B211D]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {tabFilteredLessons.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-2xl p-10 text-center text-[#76685F] border border-[#EFE5DA] space-y-2">
          <p className="text-sm font-bold font-sans text-[#2B211D]">Chưa tìm thấy bài học phù hợp.</p>
          <p className="text-xs font-sans">Thử chuyển tab bộ lọc hoặc tìm kiếm bài học khác.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                : "space-y-3"
            }
          >
            {displayedLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                viewMode={viewMode}
                isSelected={selectedLessonId === lesson.id}
                onStudy={onStudyLesson}
              />
            ))}
          </div>

          {/* Toggle Expand / Collapse Button */}
          {remainingCount > 0 && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFFDF9] hover:bg-[#FAF7F2] text-[#56423E] hover:text-[#C65D4B] font-bold font-sans text-xs rounded-xl border border-[#EFE5DA] transition-all shadow-2xs cursor-pointer"
              >
                <span>{isExpanded ? "Thu gọn bài học" : `Xem thêm ${remainingCount} bài học khác`}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
