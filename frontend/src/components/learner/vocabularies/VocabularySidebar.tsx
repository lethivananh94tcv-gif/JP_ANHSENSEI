"use client";

import { StreakData } from "./types";
import { Flame, Trophy, Sparkles, Award, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface VocabularySidebarProps {
  streakData?: StreakData | null;
}

export default function VocabularySidebar({ streakData }: VocabularySidebarProps) {
  const streakDays = streakData?.streakDays || 1;

  const trophyBadges = [
    { id: 1, name: "Sát Thủ Từ Vựng", icon: "💮", earned: true, desc: "Thuộc 100+ Từ vựng" },
    { id: 2, name: "Ngọn Lửa Kiên Trì", icon: "🔥", earned: true, desc: "Duy trì Streak 7 ngày" },
    { id: 3, name: "Bậc Thầy JLPT N5", icon: "⭐", earned: true, desc: "Hoàn thành Lộ trình N5" },
    { id: 4, name: "Thần Tài Omikuji", icon: "🧧", earned: true, desc: "Rút quẻ may mắn 5 ngày" },
  ];

  return (
    <section aria-label="Bảng thành tích và hộ chiếu học tập" className="w-full space-y-6">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-black text-[#231917]">
          Hộ Chiếu Thành Tích & Góc Nhắc Nhở Học Tập 3D
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: 3D Streak Flame Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] hover:border-[#C65D4B]/60 rounded-3xl p-6 shadow-xl flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#8B6F5A] uppercase tracking-wider">
              <Flame className="w-4 h-4 text-[#C65D4B] animate-pulse" />
              <span>Chuỗi Học Tập</span>
            </div>
            <p className="text-2xl font-black text-[#231917]">
              {streakDays} <span className="text-xs font-bold text-[#8B6F5A]">ngày liên tiếp</span>
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C65D4B] to-[#FF8C78] text-white flex items-center justify-center text-3xl shadow-lg shadow-[#C65D4B]/30 border border-white/40 group-hover:scale-110 transition-transform">
            🔥
          </div>
        </motion.div>

        {/* Card 2: 4 Gold Trophy Badges Grid */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] hover:border-[#C65D4B]/60 rounded-3xl p-6 shadow-xl space-y-3 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-[#231917] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Con Dấu Huy Hiệu</span>
            </h4>
            <span className="text-[10px] font-black text-[#C65D4B] bg-[#C65D4B]/10 px-2.5 py-0.5 rounded-full border border-[#C65D4B]/30">
              4 Huy hiệu
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 py-1">
            {trophyBadges.map((badge) => (
              <div
                key={badge.id}
                title={`${badge.name}: ${badge.desc}`}
                className="aspect-square rounded-2xl bg-[#C65D4B]/10 border border-[#C65D4B] text-[#C65D4B] flex items-center justify-center text-xl shadow-xs transition-transform hover:scale-110 cursor-pointer"
              >
                {badge.icon}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 3: Proverb Inspiration Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] hover:border-[#C65D4B]/60 rounded-3xl p-6 shadow-xl space-y-2 text-center flex flex-col justify-center cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#C65D4B] mx-auto" />
          <h4 className="text-xs font-black text-[#231917] uppercase tracking-wider">
            Góc Nhắc Nhở Học Tập
          </h4>
          <p className="text-xs text-[#76685F] italic font-medium leading-relaxed">
            &ldquo;Keizoku wa chikara nari&rdquo;
            <br />
            <span className="not-italic text-[11px] font-black text-[#C65D4B]">Kiên trì chính là sức mạnh.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
