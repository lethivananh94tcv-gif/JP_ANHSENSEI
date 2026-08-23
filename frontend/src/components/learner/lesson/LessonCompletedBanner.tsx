"use client";

import Link from "next/link";

interface LessonCompletedBannerProps {
  levelCode?: string;
  nextLessonId?: number | null;
}

export default function LessonCompletedBanner({
  levelCode,
  nextLessonId = null,
}: LessonCompletedBannerProps) {
  return (
    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border border-[#DED0C5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs relative overflow-hidden">
      {/* Subtle Japanese Wood Pattern Texture Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B6F5A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Red Hanko Stamp Seal */}
      <div className="absolute right-4 top-3 rotate-12 bg-white border-2 border-[#D66552] px-3 py-1 rounded text-xs font-serif font-black text-[#D66552] shadow-2xs pointer-events-none select-none">
        完了
      </div>

      <div className="space-y-2 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#2C201D]">
            Chúc mừng bạn đã hoàn thành bài học!
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#6B554E] leading-relaxed max-w-xl">
          Bạn đã ghi nhớ toàn bộ Từ vựng, Hán tự và Ngữ pháp trong bài học này. Hãy tiếp tục duy trì thói quen học hằng ngày nhé!
        </p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-3 z-10 w-full md:w-auto">
        <Link
          href="/levels"
          className="px-5 py-3 bg-white hover:bg-[#FAF3EB] text-[#8B6F5A] border border-[#DED0C5] font-bold text-xs rounded-xl shadow-2xs transition-colors text-center flex-1 sm:flex-none"
        >
          Quay lại Lộ trình
        </Link>
        {nextLessonId && (
          <Link
            href={`/lessons/${nextLessonId}`}
            className="px-6 py-3 bg-[#D66552] hover:bg-[#C25644] text-white font-bold text-xs rounded-xl border border-[#E37966] shadow-2xs transition-colors text-center flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            <span>Bài tiếp theo</span>
            <span>➔</span>
          </Link>
        )}
      </div>
    </div>
  );
}
