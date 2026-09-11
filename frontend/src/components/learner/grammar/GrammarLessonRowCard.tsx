"use client";

import { BookOpen, Edit3, ArrowRight } from "lucide-react";

export interface GrammarLessonRowData {
  lessonNum: number;
  title: string;
  description: string;
  topicCount: number;
  exerciseCount: number;
}

interface GrammarLessonRowCardProps {
  data: GrammarLessonRowData;
  isSelected?: boolean;
  onStudy: () => void;
}

export default function GrammarLessonRowCard({
  data,
  isSelected = false,
  onStudy,
}: GrammarLessonRowCardProps) {
  return (
    <div
      onClick={onStudy}
      className={`bg-[#FFFDF9] border-2 rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
        isSelected
          ? "border-[#C65D4B] bg-[#FAF6EE]"
          : "border-[#DED3C8] hover:border-[#C65D4B]/60"
      }`}
    >
      {/* Left Lesson Tag & Info */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <div className="w-14 h-14 rounded-2xl bg-[#FAF6EE] group-hover:bg-[#C65D4B] text-[#C65D4B] group-hover:text-white border border-[#DED3C8] group-hover:border-[#C65D4B] flex flex-col items-center justify-center shrink-0 transition-colors">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Bài</span>
          <span className="text-xl font-serif font-black">{data.lessonNum}</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-serif font-black text-[#231917] group-hover:text-[#C65D4B] transition-colors">
            {data.title}
          </h3>
          <p className="text-xs text-[#76685F] font-medium leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Badges & Action Button */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DED3C8]/60">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B6F5A]">
          <span className="inline-flex items-center gap-1.5 bg-[#FAF6EE] px-3 py-1.5 rounded-xl border border-[#DED3C8]">
            <BookOpen className="w-3.5 h-3.5 text-[#C65D4B]" />
            <span><strong className="text-[#231917]">{data.topicCount}</strong> chủ điểm</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#FAF6EE] px-3 py-1.5 rounded-xl border border-[#DED3C8]">
            <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
            <span><strong className="text-[#231917]">{data.exerciseCount}</strong> bài tập</span>
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStudy();
          }}
          className="px-5 py-2.5 bg-[#C65D4B] hover:bg-[#A84A3B] text-white font-bold text-xs rounded-2xl shadow-xs transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <span>Học ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
