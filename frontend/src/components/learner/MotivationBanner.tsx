"use client";

import Link from "next/link";

export default function MotivationBanner() {
  return (
    <section className="bg-[#FAF3EB] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm relative overflow-hidden">
      <div className="space-y-2 z-10">
        <div className="flex items-center gap-3">
          <span className="font-serif font-black text-2xl sm:text-3xl text-[#231917] tracking-tight">
            少しずつ、毎日。
          </span>
          <span className="rotate-6 bg-white/90 border-2 border-[#C65D4B] px-2 py-0.5 rounded text-[10px] font-serif font-black text-[#C65D4B] shadow-2xs select-none">
            努力
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-[#76685F]">
          Mỗi ngày một chút, bạn sẽ tiến xa hơn.
        </p>
      </div>

      <div className="z-10 w-full md:w-auto">
        <Link
          href="/levels"
          className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-[#FFFDF9] hover:bg-white text-[#C65D4B] border border-[#C65D4B]/50 font-extrabold text-xs rounded-xl shadow-2xs transition-all"
        >
          <span>Tiếp tục hành trình</span>
          <span>➔</span>
        </Link>
      </div>
    </section>
  );
}
