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
    <div className="bg-[#FAF3EB] border border-[#6F8A72]/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm relative overflow-hidden">
      {/* Red Hanko Stamp Seal */}
      <div className="absolute right-4 top-3 rotate-12 bg-white/90 border-2 border-[#C65D4B] px-3 py-1 rounded text-xs font-serif font-black text-[#C65D4B] shadow-2xs pointer-events-none select-none">
        完了
      </div>

      <div className="space-y-2 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#231917]">
            Chúc mừng bạn đã hoàn thành bài học!
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#76685F] leading-relaxed max-w-xl">
          Bạn đã ghi nhớ toàn bộ Từ vựng, Hán tự và Ngữ pháp trong bài học này. Hãy tiếp tục duy trì thói quen học hằng ngày nhé!
        </p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-3 z-10 w-full md:w-auto">
        <Link
          href="/levels"
          className="px-5 py-3 bg-[#FFFDF9] hover:bg-white text-[#8B6F5A] border border-[#DED3C8] font-bold text-xs rounded-xl shadow-2xs transition-all text-center flex-1 sm:flex-none"
        >
          Quay lại Lộ trình
        </Link>
        {nextLessonId && (
          <Link
            href={`/lessons/${nextLessonId}`}
            className="px-6 py-3 bg-[#6F8A72] hover:bg-[#5a735d] text-white font-bold text-xs rounded-xl shadow-sm transition-all text-center flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            <span>Bài tiếp theo</span>
            <span>➔</span>
          </Link>
        )}
      </div>
    </div>
  );
}
