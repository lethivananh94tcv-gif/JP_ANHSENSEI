"use client";

import Link from "next/link";
import { LessonSummary } from "@/types/learner";
import { Sparkles, Play, ArrowRight } from "lucide-react";
import Card3DTilt from "@/components/ui/Card3DTilt";
import { motion } from "framer-motion";

interface RecommendationSectionProps {
  recommendedLessons: LessonSummary[];
}

export default function RecommendationSection({ recommendedLessons }: RecommendationSectionProps) {
  const topLessons = recommendedLessons.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#C65D4B] uppercase tracking-wider bg-[#F5EFE6] px-3.5 py-1 rounded-full border border-[#DED3C8]">
            <Sparkles className="w-4 h-4 text-[#C65D4B]" />
            <span>Bài Học Nổi Bật N5 – N3</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#231917] tracking-tight pt-1">
            Đề xuất dành riêng cho bạn
          </h2>
        </div>
        <Link
          href="/learn"
          className="text-xs font-extrabold text-[#C65D4B] hover:text-[#B04F3F] transition-colors inline-flex items-center gap-1"
        >
          <span>Tất cả bài học</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {topLessons.length === 0 ? (
        <div className="bg-white rounded-3xl p-6 border border-[#DED3C8] text-center text-xs text-[#76685F] shadow-xs">
          Chưa có bài học đề xuất nào. Vui lòng khám phá thư viện bài học!
        </div>
      ) : (
        <div className="space-y-3">
          {topLessons.map((les) => (
            <Card3DTilt key={les.lessonId}>
              <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border border-[#DED3C8] hover:border-[#C65D4B]/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  {/* 3D Level Emblem */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 4 }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C65D4B] to-[#FF8C78] text-white font-jp font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-[#C65D4B]/30 border border-white/40"
                  >
                    {les.levelCode || "N5"}
                  </motion.div>

                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                      {les.title}
                    </h3>
                    <p className="text-xs text-[#76685F] line-clamp-1 mt-0.5 font-medium">
                      {les.description || "Nội dung bài học chuẩn hóa Minna no Nihongo thiết kế khoa học."}
                    </p>
                  </div>
                </div>

                {(() => {
                  const isN4 = les.levelCode === "N4" || les.lessonId >= 100;
                  const targetId = isN4 ? (les.lessonId > 25 && les.lessonId <= 50 ? les.lessonId : 25 + (les.sortOrder || 1)) : (les.sortOrder || les.lessonId);
                  return (
                    <Link
                      href={`/lessons/${targetId}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs rounded-xl transition-all shadow-md flex-shrink-0 hover:scale-105"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Bắt đầu bài học</span>
                    </Link>
                  );
                })()}
              </div>
            </Card3DTilt>
          ))}
        </div>
      )}
    </div>
  );
}
