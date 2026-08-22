"use client";

import { useState } from "react";
import Link from "next/link";
import { LevelSummary } from "@/types/learner";
import { Compass, ArrowRight, Lock, CheckCircle2, Flag, MapPin, Sparkles, Zap, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface LearningPathSectionProps {
  levels: LevelSummary[];
}

export default function LearningPathSection({ levels }: LearningPathSectionProps) {
  const [hoveredCardCode, setHoveredCardCode] = useState<string | null>(null);

  const defaultLevelsConfig = [
    { code: "N5", kanjiBig: "五", name: "JLPT N5 • Chặng Nhập Môn", desc: "100+ Hán tự & 25 bài học Minna no Nihongo nhập môn.", defaultId: 1, isLocked: false, isCurrent: true, color: "from-[#C65D4B] via-[#E56A56] to-[#B04F3F]" },
    { code: "N4", kanjiBig: "四", name: "JLPT N4 • Chặng Sơ Cấp", desc: "300+ Hán tự & 25 bài học sơ cấp nâng cao.", defaultId: 2, isLocked: false, isCurrent: false, color: "from-[#8B6F5A] via-[#A3856F] to-[#765844]" },
    { code: "N3", kanjiBig: "三", name: "JLPT N3 • Chặng Trung Cấp", desc: "600+ Hán tự, đọc hiểu báo chí & tin tức TV.", defaultId: 3, isLocked: false, isCurrent: false, color: "from-[#231917] via-[#3D2C26] to-[#1E1715]" },
    { code: "N2", kanjiBig: "二", name: "JLPT N2 • Chặng Nâng Cao", desc: "Thành thạo tiếng Nhật làm việc tại doanh nghiệp.", defaultId: 4, isLocked: true, isCurrent: false, color: "from-gray-700 to-gray-900" },
    { code: "N1", kanjiBig: "一", name: "JLPT N1 • Chặng Thượng Thừa", desc: "Đỉnh cao ngôn ngữ Nhật Bản chuyên môn.", defaultId: 5, isLocked: true, isCurrent: false, color: "from-gray-700 to-gray-900" },
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
    <section className="space-y-6 bg-gradient-to-br from-[#231917] via-[#382622] to-[#181110] border-2 border-[#8B6F5A]/50 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden group">
      {/* 3D Glowing Ambient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C65D4B]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Background Calligraphy Accent */}
      <div className="absolute right-8 top-4 text-9xl font-jp font-black text-white/[0.04] select-none pointer-events-none">
        道
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#FFB8A9] uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/15 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#FFB8A9]" />
            <span>BẢN ĐỒ HÀNH TRÌNH JLPT N5 – N1</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Con đường chinh phục tiếng Nhật của bạn</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-bounce hidden sm:block" />
          </h2>
        </div>

        <Link
          href="/learn"
          className="text-xs font-bold text-white/90 hover:text-white transition-colors inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl border border-white/15 shadow-xs"
        >
          <span>Mở toàn bộ bản đồ bài học</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3D Level Step Track Header Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15 text-xs font-black relative z-10">
        {displayedLevels.map((lvl, index) => (
          <div key={lvl.code} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3.5 py-1 rounded-xl border transition-all ${
              lvl.isCurrent
                ? "bg-[#C65D4B] text-white border-[#FF8C78] shadow-md shadow-[#C65D4B]/50"
                : lvl.isLocked
                ? "bg-white/5 text-white/40 border-white/10"
                : "bg-white/10 text-emerald-400 border-emerald-500/30"
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>Trạm {lvl.code}</span>
            </div>
            {index < displayedLevels.length - 1 && (
              <div className="w-12 h-0.5 bg-gradient-to-r from-white/30 to-white/10 rounded-full" />
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
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 opacity-50 relative overflow-hidden backdrop-blur-sm min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-jp font-black text-white/40 bg-white/10 px-3.5 py-1 rounded-xl">
                      {lvl.code}
                    </span>
                    <Lock className="w-4 h-4 text-white/40" />
                  </div>

                  <h3 className="text-xs font-bold text-white/60">{lvl.name}</h3>
                  <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed font-medium">
                    {lvl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[10px] font-black text-white/40 uppercase tracking-wider flex items-center gap-1">
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
                className="relative w-full h-full rounded-2xl shadow-2xl"
              >
                {/* FRONT SIDE */}
                <div
                  style={{ backfaceVisibility: "hidden" }}
                  className={`absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between space-y-4 border-2 backdrop-blur-md ${
                    lvl.isCurrent
                      ? "bg-gradient-to-b from-[#C65D4B]/40 via-white/15 to-white/10 border-[#FF8C78] shadow-2xl shadow-[#C65D4B]/50 ring-2 ring-[#C65D4B]/50"
                      : "bg-white/10 border-white/15 hover:bg-white/20 shadow-lg"
                  }`}
                >
                  {/* Active Badge */}
                  {lvl.isCurrent && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C65D4B] to-[#FF8C78] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xl border border-white/40 flex items-center gap-1 z-20 whitespace-nowrap">
                      <Flag className="w-3 h-3 fill-white" />
                      <span>ĐANG HỌC</span>
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-jp font-black text-white bg-gradient-to-r ${lvl.color} px-3.5 py-1 rounded-xl shadow-md border border-white/20`}>
                        {lvl.code}
                      </span>
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                    </div>

                    <h3 className="text-xs font-extrabold text-white leading-tight">
                      {lvl.name}
                    </h3>
                    <p className="text-[11px] text-[#DED3C8] line-clamp-2 leading-relaxed font-medium">
                      {lvl.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-[#FFB8A9]">
                    <span>Rê chuột để lật 3D</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  </div>
                </div>

                {/* BACK SIDE (Flipped 180deg - Holographic Kanji & Action) */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#C65D4B] via-[#B04F3F] to-[#231917] text-white rounded-2xl p-5 flex flex-col justify-between items-center text-center border-2 border-white/40 shadow-2xl overflow-hidden"
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
                    className="w-full py-2.5 bg-white text-[#C65D4B] font-black text-xs rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-1.5"
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
