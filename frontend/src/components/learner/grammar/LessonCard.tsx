"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, BookOpen, Edit3, Zap } from "lucide-react";
import JapaneseFuriganaText from "@/components/learner/JapaneseFuriganaText";

export interface LessonData {
  id: number;
  level: string;
  lessonNumber: number;
  title: string;
  description: string;
  topicCount: number;
  exerciseCount: number;
  grammarChips?: string[];
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  progressPercent?: number;
}

interface LessonCardProps {
  lesson: LessonData;
  isSelected?: boolean;
  viewMode?: "list" | "grid";
  onStudy?: (lesson: LessonData) => void;
}

export default function LessonCard({
  lesson,
  isSelected = false,
  viewMode = "list",
  onStudy,
}: LessonCardProps) {
  const router = useRouter();
  const status = lesson.status || (lesson.progressPercent === 100 ? "COMPLETED" : lesson.progressPercent ? "IN_PROGRESS" : "NOT_STARTED");
  const progressPercent = lesson.progressPercent || (status === "COMPLETED" ? 100 : status === "IN_PROGRESS" ? 65 : 0);
  const formattedNum = String(lesson.lessonNumber).padStart(2, "0");

  const targetUrl = `/grammar/${lesson.level.toLowerCase()}/lesson-${lesson.lessonNumber}`;

  const handleNavigate = (e: React.MouseEvent) => {
    if (onStudy) {
      onStudy(lesson);
    } else {
      router.push(targetUrl);
    }
  };

  // Border & Accent Indicator Color
  const accentColor = status === "COMPLETED" ? "bg-emerald-500" : status === "IN_PROGRESS" ? "bg-[#C65D4B]" : "bg-[#EFE5DA]";

  if (viewMode === "grid") {
    return (
      <Link
        href={targetUrl}
        className={`relative overflow-hidden bg-[#FFFDF9] border border-[#EFE5DA] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 hover:-translate-y-1 group ${
          isSelected ? "border-[#C65D4B] bg-[#C65D4B]/5" : "hover:border-[#C65D4B]/40"
        }`}
      >
        {/* Left Status Bar Indicator */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`} />

        <div className="space-y-3 pl-1">
          {/* Header Tag & Badge */}
          <div className="flex items-center justify-between">
            <div className="px-3 py-1 rounded-xl bg-[#FAF2EA] text-[#C65D4B] border border-[#EFE5DA] text-xs font-black">
              BÀI {formattedNum}
            </div>
            {status === "COMPLETED" && (
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Hoàn thành</span>
              </span>
            )}
            {status === "IN_PROGRESS" && (
              <span className="text-[10px] font-extrabold text-[#C65D4B] bg-[#C65D4B]/10 border border-[#C65D4B]/20 px-2 py-0.5 rounded-full">
                {progressPercent}% Đang học
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="text-base font-black font-sans text-[#2B211D] group-hover:text-[#C65D4B] transition-colors leading-snug line-clamp-2">
              {lesson.title}
            </h3>
            <p className="text-xs font-sans text-[#76685F] line-clamp-2">
              {lesson.description}
            </p>
          </div>

          {/* Japanese Grammar Preview Chips */}
          {lesson.grammarChips && lesson.grammarChips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {lesson.grammarChips.slice(0, 3).map((chip, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#56423E] border border-[#EFE5DA] text-[10px] font-serif font-bold"
                >
                  <JapaneseFuriganaText text={chip} />
                </span>
              ))}
              {lesson.grammarChips.length > 3 && (
                <span className="text-[10px] font-bold text-[#8B6F5A] self-center">
                  +{lesson.grammarChips.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Meta & Button */}
        <div className="pt-3 border-t border-[#EFE5DA] flex items-center justify-between gap-2 pl-1">
          <div className="flex items-center gap-2 text-[11px] text-[#76685F]">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#C65D4B]" />
              <strong>{lesson.topicCount}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-[#C65D4B]" />
              <strong>{lesson.exerciseCount}</strong>
            </span>
          </div>

          <span
            className="px-3.5 py-1.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1 shrink-0"
          >
            <span>Học</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    );
  }

  // Default List View (Compact Horizontal Card)
  return (
    <Link
      href={targetUrl}
      className={`relative overflow-hidden bg-[#FFFDF9] border border-[#EFE5DA] rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-0.5 group ${
        isSelected ? "border-[#C65D4B] bg-[#C65D4B]/5" : "hover:border-[#C65D4B]/40"
      }`}
    >
      {/* Status Accent Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`} />

      {/* Left Lesson Tag & Title/Description/Chips */}
      <div className="flex items-center gap-4 flex-1 min-w-0 pl-1.5">
        {/* Lesson Number Badge */}
        <div className="w-13 h-13 rounded-xl bg-[#FAF2EA] group-hover:bg-[#C65D4B] text-[#C65D4B] group-hover:text-white border border-[#EFE5DA] group-hover:border-[#C65D4B] flex flex-col items-center justify-center shrink-0 transition-all duration-200">
          <span className="text-[9px] font-extrabold uppercase tracking-wider opacity-80 leading-none">BÀI</span>
          <span className="text-base font-black font-sans mt-0.5">{formattedNum}</span>
        </div>

        {/* Info */}
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold font-sans text-[#2B211D] group-hover:text-[#C65D4B] transition-colors leading-snug truncate">
              {lesson.title}
            </h3>
            {status === "COMPLETED" && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                ✓ Xong
              </span>
            )}
          </div>

          <p className="text-xs font-sans text-[#76685F] font-normal leading-normal truncate">
            {lesson.description}
          </p>

          {/* Grammar Preview Chips */}
          {lesson.grammarChips && lesson.grammarChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {lesson.grammarChips.slice(0, 4).map((chip, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#56423E] border border-[#EFE5DA] text-[10px] font-serif font-bold"
                >
                  <JapaneseFuriganaText text={chip} />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meta Indicators & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFE5DA]">
        <div className="flex items-center gap-3 text-xs font-sans text-[#76685F]">
          <span className="inline-flex items-center gap-1.5 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EFE5DA] text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-[#C65D4B]" />
            <span><strong className="text-[#2B211D] font-bold">{lesson.topicCount}</strong> chủ điểm</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EFE5DA] text-[11px]">
            <Edit3 className="w-3.5 h-3.5 text-[#C65D4B]" />
            <span><strong className="text-[#2B211D] font-bold">{lesson.exerciseCount}</strong> bài tập</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick practice icon button */}
          <span
            title="Luyện tập nhanh"
            className="w-8 h-8 rounded-xl bg-[#FAF7F2] hover:bg-[#C65D4B]/10 text-[#C65D4B] border border-[#EFE5DA] flex items-center justify-center transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#C65D4B]" />
          </span>

          {/* Primary Action Button */}
          {status === "COMPLETED" ? (
            <span
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold font-sans text-xs rounded-xl border border-emerald-200 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đã hoàn thành</span>
            </span>
          ) : (
            <span
              className="px-4.5 py-2 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-bold font-sans text-xs rounded-xl shadow-xs transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>Học ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
