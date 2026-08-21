"use client";

import Link from "next/link";
import { LevelSummary } from "@/types/learner";

interface LearningPathSectionProps {
  levels: LevelSummary[];
}

export default function LearningPathSection({ levels }: LearningPathSectionProps) {
  // Define standard JLPT levels order (N5 -> N1)
  const defaultLevelsConfig = [
    { code: "N5", name: "JLPT N5", desc: "Nhập môn tiếng Nhật, bảng chữ cái và các mẫu câu giao tiếp cơ bản.", defaultId: 1, isLocked: false },
    { code: "N4", name: "JLPT N4", desc: "Ngữ pháp sơ cấp và mở rộng vốn từ vựng sinh hoạt hằng ngày.", defaultId: 2, isLocked: false },
    { code: "N3", name: "JLPT N3", desc: "Giao tiếp tương đối lưu khoát, đọc hiểu văn bản thông thường.", defaultId: 3, isLocked: false },
    { code: "N2", name: "JLPT N2", desc: "Hiểu tiếng Nhật trong các tình huống thực tế và môi trường làm việc.", defaultId: 4, isLocked: true },
    { code: "N1", name: "JLPT N1", desc: "Sử dụng tiếng Nhật thành thạo trong hầu hết mọi hoàn cảnh.", defaultId: 5, isLocked: true },
  ];

  // Map API levels with default config
  const displayedLevels = defaultLevelsConfig.map((cfg) => {
    const foundApiLevel = levels.find((l) => l.code === cfg.code);
    return {
      levelId: foundApiLevel ? foundApiLevel.levelId : cfg.defaultId,
      code: cfg.code,
      name: foundApiLevel ? foundApiLevel.name : cfg.name,
      description: foundApiLevel?.description || cfg.desc,
      isLocked: cfg.isLocked,
    };
  });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#231917] tracking-tight">
            Lộ trình của bạn
          </h2>
          <p className="text-xs text-[#76685F]">Chương trình học JLPT thiết kế chuẩn hóa từ N5 đến N1</p>
        </div>
        <Link
          href="/levels"
          className="text-xs font-bold text-[#C65D4B] hover:underline flex items-center gap-1"
        >
          <span>Xem toàn bộ lộ trình</span>
          <span>➔</span>
        </Link>
      </div>

      {/* Levels Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedLevels.map((lvl, index) => {
          const isFirst = index === 0;
          const isLocked = lvl.isLocked;

          if (isLocked) {
            return (
              <div
                key={lvl.code}
                className="bg-[#F5EFE6]/60 border border-[#DED3C8] rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-2xs relative overflow-hidden opacity-75"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-black text-[#76685F] bg-[#E4D9CD]/50 px-3.5 py-1 rounded-xl border border-[#DED3C8]">
                      {lvl.code}
                    </span>
                    <span className="text-[10px] font-bold text-[#76685F] bg-[#E4D9CD]/60 px-2.5 py-0.5 rounded-full border border-[#DED3C8] flex items-center gap-1">
                      <span>🔒</span> SẮP MỞ RỘNG
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#76685F]">
                    {lvl.name}
                  </h3>
                  <p className="text-xs text-[#76685F]/80 leading-relaxed line-clamp-2">
                    {lvl.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DED3C8]/60 flex justify-between items-center text-xs font-bold text-[#76685F]/60">
                  <span className="flex items-center gap-1">
                    <span>🔒</span> Chưa mở khóa
                  </span>
                  <span className="text-[10px]">Giai đoạn tiếp theo</span>
                </div>
              </div>
            );
          }

          const targetHref = `/levels/${lvl.levelId}/lessons`;

          return (
            <div
              key={lvl.code}
              className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden group"
            >
              {/* Red Hanko Stamp Seal for N5 active level */}
              {isFirst && (
                <div className="absolute top-3 right-4 rotate-12 bg-white/80 border-2 border-[#C65D4B] px-2 py-0.5 rounded text-[10px] font-serif font-black text-[#C65D4B] shadow-2xs pointer-events-none select-none">
                  学習中
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-serif font-black text-[#C65D4B] bg-[#F5EFE6] px-3.5 py-1 rounded-xl border border-[#DED3C8]/60">
                    {lvl.code}
                  </span>
                  <span className="text-[10px] font-bold text-[#8B6F5A] bg-[#F5EFE6] px-2 py-0.5 rounded border border-[#DED3C8]/40">
                    SẴN SÀNG HỌC
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                  {lvl.name}
                </h3>
                <p className="text-xs text-[#76685F] leading-relaxed line-clamp-2">
                  {lvl.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DED3C8]/50 flex justify-between items-center">
                <Link
                  href={targetHref}
                  className="text-xs font-bold text-[#8B6F5A] hover:text-[#C65D4B] transition-colors flex items-center gap-1"
                >
                  <span>Vào bài học</span>
                  <span>➔</span>
                </Link>
                <span className="text-[10px] font-semibold text-[#76685F]">Nội dung chuẩn</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
