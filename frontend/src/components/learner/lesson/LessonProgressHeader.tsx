"use client";

import Link from "next/link";

interface LessonProgressHeaderProps {
  lessonId: string;
  lessonTitle: string;
  levelCode: string;
  learnedCount: number;
  totalCount: number;
  progressPercent: number;
  isCompleted: boolean;
}

export default function LessonProgressHeader({
  lessonId,
  lessonTitle,
  levelCode,
  learnedCount,
  totalCount,
  progressPercent,
  isCompleted,
}: LessonProgressHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#76685F]">
        <Link href="/dashboard" className="hover:text-[#C65D4B] transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/levels" className="hover:text-[#C65D4B] transition-colors">
          Trình độ {levelCode || "JLPT"}
        </Link>
        <span>/</span>
        <span className="text-[#231917] font-bold">Bài học #{lessonId}</span>
      </nav>

      {/* Main Header Banner */}
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-3">
            <span className="bg-[#C65D4B]/10 text-[#C65D4B] border border-[#C65D4B]/20 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase">
              {levelCode || "JLPT N5"}
            </span>
            {isCompleted ? (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                ✓ HOÀN THÀNH
              </span>
            ) : progressPercent > 0 ? (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                ĐANG HỌC ({progressPercent}%)
              </span>
            ) : (
              <span className="bg-[#F5EFE6] text-[#8B6F5A] border border-[#DED3C8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                CHƯA BẮT ĐẦU
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#231917]">
            {lessonTitle || `Bài học #${lessonId}`}
          </h1>
          <p className="text-xs text-[#76685F]">
            Đã hoàn thành <strong className="text-[#231917]">{learnedCount}</strong> trên tổng số <strong className="text-[#231917]">{totalCount}</strong> mục kiến thức.
          </p>
        </div>

        {/* Progress Bar & Stat Indicator */}
        <div className="w-full md:w-64 bg-[#F5EFE6] border border-[#DED3C8] p-4 rounded-2xl space-y-2 z-10">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-[#76685F]">Tiến độ bài học</span>
            <span className={isCompleted ? "text-[#6F8A72]" : "text-[#C65D4B]"}>{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#DED3C8]/60">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? "bg-[#6F8A72]" : "bg-[#C65D4B]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
