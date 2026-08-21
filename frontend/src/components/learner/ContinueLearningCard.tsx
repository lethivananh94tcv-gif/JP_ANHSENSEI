"use client";

import Link from "next/link";
import { LessonSummary } from "@/types/learner";

interface ContinueLearningCardProps {
  currentLesson: LessonSummary | null;
  progressPercent?: number;
  completedParts?: number;
  totalParts?: number;
}

export default function ContinueLearningCard({
  currentLesson,
  progressPercent = 0,
  completedParts = 0,
  totalParts = 4,
}: ContinueLearningCardProps) {
  if (!currentLesson) {
    return (
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm min-h-[220px]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#F5EFE6] px-3 py-1 rounded-full text-[10px] font-bold text-[#8B6F5A]">
            <span>🎯 CHƯƠNG TRÌNH HỌC CHÍNH THỨC</span>
          </div>
          <h2 className="text-xl font-serif font-extrabold text-[#231917]">
            Bạn chưa bắt đầu bài học nào
          </h2>
          <p className="text-xs text-[#76685F] leading-relaxed max-w-lg">
            Khám phá danh sách bài học JLPT chuẩn hóa được xuất bản để bắt đầu hành trình chinh phục tiếng Nhật của bạn.
          </p>
        </div>

        <div>
          <Link
            href="/levels"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6F5A] hover:bg-[#765844] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <span>Khám phá lộ trình JLPT</span>
            <span>➔</span>
          </Link>
        </div>
      </div>
    );
  }

  const isStarted = progressPercent > 0;

  return (
    <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden group">
      {/* Background Watermark Book Decor */}
      <div className="absolute right-4 bottom-2 text-8xl font-serif text-[#DED3C8]/20 select-none pointer-events-none group-hover:scale-105 transition-transform">
        📖
      </div>

      <div className="space-y-3 z-10">
        <div className="flex items-center gap-2">
          <span className="bg-[#C65D4B]/10 text-[#C65D4B] border border-[#C65D4B]/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
            {currentLesson.levelCode || "N5"}
          </span>
          <span className="text-[10px] font-bold text-[#76685F] uppercase tracking-wider">
            • {isStarted ? "BÀI ĐANG HỌC" : "BÀI HỌC BẮT ĐẦU"}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#231917] tracking-tight group-hover:text-[#C65D4B] transition-colors">
          {currentLesson.title}
        </h2>
        <p className="text-xs text-[#76685F] line-clamp-2 leading-relaxed max-w-xl">
          {currentLesson.description || "Học và thực hành từ vựng, hán tự và mẫu ngữ pháp ứng dụng thực tế."}
        </p>
      </div>

      <div className="space-y-4 z-10 pt-2 border-t border-[#DED3C8]/50">
        {/* Progress bar section if progress is tracked */}
        {isStarted && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-semibold text-[#76685F]">
              <span>Tiến độ ({completedParts}/{totalParts} phần)</span>
              <span className="font-bold text-[#231917]">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-[#F5EFE6] rounded-full overflow-hidden border border-[#DED3C8]/60">
              <div
                className="h-full bg-[#6F8A72] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link
            href={`/lessons/${currentLesson.lessonId}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#765844] hover:bg-[#231917] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <span>{isStarted ? "Tiếp tục học" : "Bắt đầu học"}</span>
            <span>➔</span>
          </Link>

          {currentLesson.estimatedMinutes > 0 && (
            <span className="text-[11px] font-medium text-[#76685F]">
              ~{currentLesson.estimatedMinutes} phút học
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
