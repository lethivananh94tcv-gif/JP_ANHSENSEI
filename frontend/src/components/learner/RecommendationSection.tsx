"use client";

import Link from "next/link";
import { LessonSummary } from "@/types/learner";

interface RecommendationSectionProps {
  recommendedLessons: LessonSummary[];
}

export default function RecommendationSection({ recommendedLessons }: RecommendationSectionProps) {
  const topLessons = recommendedLessons.slice(0, 3);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#231917] tracking-tight">
          Đề xuất cho bạn
        </h2>
        <p className="text-xs text-[#76685F]">Các bài học mới nhất được ban biên tập xuất bản</p>
      </div>

      {topLessons.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#DED3C8] text-center text-xs text-[#76685F]">
          Chưa có bài học đề xuất nào. Vui lòng khám phá thư viện bài học!
        </div>
      ) : (
        <div className="space-y-3">
          {topLessons.map((les) => (
            <div
              key={les.lessonId}
              className="bg-[#FFFDF9] border border-[#DED3C8] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs hover:shadow-sm hover:border-[#8B6F5A]/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] border border-[#DED3C8]/60 text-[#C65D4B] font-serif font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                  {les.levelCode || "N5"}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                    {les.title}
                  </h3>
                  <p className="text-xs text-[#76685F] line-clamp-1">
                    {les.description || "Nội dung bài học chuẩn hóa thiết kế khoa học."}
                  </p>
                </div>
              </div>

              <Link
                href={`/lessons/${les.lessonId}`}
                className="px-4 py-2 bg-[#F5EFE6] hover:bg-[#8B6F5A] text-[#8B6F5A] hover:text-white border border-[#DED3C8] font-bold text-xs rounded-xl transition-all shadow-2xs flex-shrink-0"
              >
                Bắt đầu ➔
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
