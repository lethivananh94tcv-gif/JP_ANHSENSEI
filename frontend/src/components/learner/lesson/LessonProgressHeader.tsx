"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Play, Sparkles, HelpCircle, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface LessonProgressHeaderProps {
  lessonId: string;
  sortOrder?: number;
  lessonTitle: string;
  levelCode: string;
  learnedCount: number;
  totalCount: number;
  progressPercent: number;
  isCompleted: boolean;
}

export default function LessonProgressHeader({
  lessonId,
  sortOrder,
  lessonTitle,
  levelCode,
  learnedCount,
  totalCount,
  progressPercent,
  isCompleted,
}: LessonProgressHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb & Top Right Back Button Bar */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs font-bold text-[#76685F]">
          <Link href="/dashboard" className="hover:text-[#C65D4B] transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href={`/vocabularies?level=${levelCode}`} className="hover:text-[#C65D4B] transition-colors">
            Trình độ {levelCode || "JLPT"}
          </Link>
          <span>/</span>
          <span className="text-[#C65D4B] font-black">Bài học #{sortOrder || lessonId}</span>
        </nav>

        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-white hover:bg-[#C65D4B] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-white font-extrabold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại</span>
        </button>
      </div>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group">
        <div className="space-y-2.5 z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] text-white font-black text-xs px-3 py-0.5 rounded-lg shadow-xs">
              {levelCode || "N5"}
            </span>
            {isCompleted ? (
              <span className="bg-emerald-500/20 text-emerald-700 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>HOÀN THÀNH 100%</span>
              </span>
            ) : progressPercent > 0 ? (
              <span className="bg-amber-500/20 text-amber-800 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-md">
                ĐANG HỌC ({progressPercent}%)
              </span>
            ) : (
              <span className="bg-[#F5EFE6] text-[#8B6F5A] border border-[#DED3C8] text-[10px] font-black px-2.5 py-0.5 rounded-md">
                CHƯA BẮT ĐẦU
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231917] tracking-tight leading-snug">
            {lessonTitle || `Bài học #${lessonId}`}
          </h1>
          <p className="text-xs text-[#76685F] font-semibold">
            Đã hoàn thành <strong className="text-[#C65D4B] font-black">{learnedCount}</strong> trên tổng số <strong className="text-[#231917] font-black">{totalCount}</strong> mục kiến thức.
          </p>
        </div>

        {/* Progress Bar & Quiz Button */}
        <div className="w-full md:w-64 bg-white border border-[#DED3C8] p-4 rounded-2xl space-y-3 z-10 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-[#76685F]">Tiến độ bài học</span>
            <span className={isCompleted ? "text-emerald-600 font-black" : "text-[#C65D4B] font-black"}>{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-[#F5EFE6] rounded-full overflow-hidden border border-[#DED3C8] p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? "bg-gradient-to-r from-emerald-500 to-teal-600" : "bg-gradient-to-r from-[#8B6F5A] to-[#C65D4B]"
              }`}
            />
          </div>

          <Link
            href={`/quizzes/${lessonId}`}
            className="w-full block text-center py-2.5 bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] hover:from-[#B04F3F] hover:to-[#9B4133] text-white font-black text-xs rounded-xl shadow-md transition-all hover:scale-105"
          >
            📝 Làm bài Quiz kiểm tra
          </Link>
        </div>
      </div>
    </div>
  );
}
