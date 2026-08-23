"use client";

import { useState } from "react";
import Link from "next/link";
import { LevelSummary } from "@/types/learner";
import { Compass, ArrowRight, Lock, CheckCircle2, Flag, MapPin, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface LearningPathSectionProps {
  levels: LevelSummary[];
}

export default function LearningPathSection({ levels }: LearningPathSectionProps) {
  const [hoveredCardCode, setHoveredCardCode] = useState<string | null>(null);

  const defaultLevelsConfig = [
    { code: "N5", kanjiBig: "五", name: "JLPT N5 • Chặng Nhập Môn", desc: "100+ Hán tự & 25 bài học Minna no Nihongo nhập môn.", defaultId: 1, isLocked: false, isCurrent: true, color: "from-[#C65D4B] via-[#E56A56] to-[#B04F3F]" },
    { code: "N4", kanjiBig: "四", name: "JLPT N4 • Chặng Sơ Cấp", desc: "300+ Hán tự & 25 bài học sơ cấp nâng cao.", defaultId: 2, isLocked: false, isCurrent: false, color: "from-[#8B6F5A] via-[#A3856F] to-[#765844]" },
    { code: "N3", kanjiBig: "三", name: "JLPT N3 • Chặng Trung Cấp", desc: "600+ Hán tự, đọc hiểu báo chí & tin tức TV.", defaultId: 3, isLocked: false, isCurrent: false, color: "from-[#6E524A] via-[#8B6F5A] to-[#59423B]" },
    { code: "N2", kanjiBig: "二", name: "JLPT N2 • Chặng Nâng Cao", desc: "Thành thạo tiếng Nhật làm việc tại doanh nghiệp.", defaultId: 4, isLocked: true, isCurrent: false, color: "from-gray-500 to-gray-700" },
    { code: "N1", kanjiBig: "一", name: "JLPT N1 • Chặng Thượng Thừa", desc: "Đỉnh cao ngôn ngữ Nhật Bản chuyên môn.", defaultId: 5, isLocked: true, isCurrent: false, color: "from-gray-500 to-gray-700" },
  ];

  const displayedLevels = defaultLevelsConfig.map((cfg) => {
    const foundApiLevel = levels.find((l) => l.code === cfg.code);
    return {
      levelId: foundApiLevel ? foundApiLevel.levelId : cfg.defaultId,
      code: cfg.code,
      kanjiBig: cfg.kanjiBig,
      name: cfg.name,
      description: foundApiLevel?.description || cfg.desc,
      isLocked: cfg.isLocked,
      isCurrent: cfg.isCurrent,
      color: cfg.color,
    };
  });

  return (
    <section className="space-y-6 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border border-[#DED0C5] rounded-3xl p-6 sm:p-8 lg:p-10 text-[#2C201D] shadow-md relative overflow-hidden group">
      {/* Subtle Japanese Wood Pattern Texture Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B6F5A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 3D Glowing Ambient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D66552]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#8B6F5A]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Background Calligraphy Accent */}
      <div className="absolute right-8 top-4 text-9xl font-jp font-black text-[#8B6F5A]/[0.06] select-none pointer-events-none">
        道
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#8B6F5A] uppercase tracking-wider bg-[#F2E5D9] px-3.5 py-1 rounded-full border border-[#E3D4C7] shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#8B6F5A]" />
            <span>BẢN ĐỒ HÀNH TRÌNH JLPT N5 – N1</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C201D] tracking-tight flex items-center gap-2">
            <span>Con đường chinh phục tiếng Nhật của bạn</span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-bounce hidden sm:block" />
          </h2>
        </div>

        <Link
          href="/learn"
          className="text-xs font-bold text-[#8B6F5A] hover:text-[#2C201D] transition-colors inline-flex items-center gap-1.5 bg-[#F2E5D9] hover:bg-[#E8D5C8] px-4 py-2.5 rounded-xl border border-[#E3D4C7] shadow-2xs"
        >
          <span>Mở toàn bộ bản đồ bài học</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3D Level Step Track Header Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-3 bg-[#FAF3EB]/90 backdrop-blur-md rounded-2xl border border-[#E8DCCF] text-xs font-black relative z-10 shadow-2xs">
        {displayedLevels.map((lvl, index) => (
          <div key={lvl.code} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3.5 py-1 rounded-xl border transition-all ${
              lvl.isCurrent
                ? "bg-[#D66552] text-white border-[#E37966] shadow-sm shadow-[#D66552]/30"
                : lvl.isLocked
                ? "bg-[#EFE5DC]/60 text-[#8B6F5A]/40 border-[#E3D4C7]/50"
                : "bg-[#F2E5D9] text-[#8B6F5A] border-[#E3D4C7]"
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>Trạm {lvl.code}</span>
            </div>
            {index < displayedLevels.length - 1 && (
              <div className="w-12 h-0.5 bg-[#E3D4C7] rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* 5 3D Card Perspective Flip Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10 select-none">
        {displayedLevels.map((lvl) => {
          if (lvl.isLocked) {
            return (
              <div
                key={lvl.code}
                className="bg-[#FAF3EB]/60 border border-[#E8DCCF] rounded-2xl p-5 flex flex-col justify-between space-y-4 opacity-60 relative overflow-hidden backdrop-blur-sm min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-jp font-black text-[#8B6F5A]/60 bg-[#E8DCCF] px-3.5 py-1 rounded-xl">
                      {lvl.code}
                    </span>
                    <Lock className="w-4 h-4 text-[#8B6F5A]/50" />
                  </div>

                  <h3 className="text-xs font-bold text-[#8B6F5A]/80">{lvl.name}</h3>
                  <p className="text-[11px] text-[#8B6F5A]/60 line-clamp-2 leading-relaxed font-medium">
                    {lvl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DCCF] text-[10px] font-black text-[#8B6F5A]/60 uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>🔒 KHÓA GIAI ĐOẠN</span>
                </div>
              </div>
            );
          }

          const isHovered = hoveredCardCode === lvl.code;

          return (
            <div
              key={lvl.code}
              onMouseEnter={() => setHoveredCardCode(lvl.code)}
              onMouseLeave={() => setHoveredCardCode(null)}
              className="w-full min-h-[220px] cursor-pointer perspective-1000 group/flip"
            >
              <motion.div
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full rounded-2xl shadow-md"
              >
                {/* FRONT SIDE */}
                <div
                  style={{ backfaceVisibility: "hidden" }}
                  className={`absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between space-y-4 border-2 backdrop-blur-md ${
                    lvl.isCurrent
                      ? "bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EB] to-[#FAF0E6] border-[#D66552] shadow-md ring-2 ring-[#D66552]/20"
                      : "bg-[#FFFDF9] hover:bg-white border-[#E8DCCF] hover:border-[#D66552]/50 shadow-2xs"
                  }`}
                >
                  {/* Active Badge */}
                  {lvl.isCurrent && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D66552] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#E37966] flex items-center gap-1 z-20 whitespace-nowrap">
                      <Flag className="w-3 h-3 fill-white" />
                      <span>ĐANG HỌC</span>
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-jp font-black text-white bg-gradient-to-r ${lvl.color} px-3.5 py-1 rounded-xl shadow-xs border border-white/20`}>
                        {lvl.code}
                      </span>
                      <CheckCircle2 className={`w-4.5 h-4.5 ${lvl.isCurrent ? "text-[#D66552]" : "text-[#8B6F5A]"}`} />
                    </div>

                    <h3 className="text-xs font-extrabold text-[#2C201D] leading-tight">
                      {lvl.name}
                    </h3>
                    <p className="text-[11px] text-[#6B554E] line-clamp-2 leading-relaxed font-medium">
                      {lvl.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DCCF] flex items-center justify-between text-xs font-bold text-[#C65D4B]">
                    <span>Rê chuột để lật 3D</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  </div>
                </div>

                {/* BACK SIDE (Flipped 180deg - Holographic Kanji & Action) */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#D66552] via-[#C25644] to-[#8B6F5A] text-white rounded-2xl p-5 flex flex-col justify-between items-center text-center border-2 border-white/40 shadow-xl overflow-hidden"
                >
                  <div className="w-full flex justify-between items-center text-[10px] font-black">
                    <span className="bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/30">
                      {lvl.code} 3D REVEAL
                    </span>
                    <Trophy className="w-4 h-4 text-amber-300" />
                  </div>

                  {/* 3D Big Kanji Character */}
                  <div className="my-auto space-y-1">
                    <span className="text-5xl font-jp font-black text-amber-200 block drop-shadow-md tracking-widest animate-bounce">
                      {lvl.kanjiBig}
                    </span>
                    <span className="text-xs font-black text-white block">
                      {lvl.name}
                    </span>
                  </div>

                  <Link
                    href="/learn"
                    className="w-full py-2.5 bg-white text-[#D66552] font-black text-xs rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <span>Vào Chặng Ngay 🚀</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
