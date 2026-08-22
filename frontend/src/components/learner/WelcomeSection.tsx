"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UserProfile } from "@/types/learner";
import { Flame, Clock, Target, Sparkles, Bot, ArrowRight, Play, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import OmikujiFortuneModal from "@/components/ui/OmikujiFortuneModal";
import ManekiNeko3D from "@/components/ui/ManekiNeko3D";

interface WelcomeSectionProps {
  user: UserProfile | null;
  streakDays?: number | null;
  todayMinutes?: number | null;
  dailyGoalMinutes?: number | null;
}

export default function WelcomeSection({
  user,
  streakDays = 1,
  todayMinutes = 15,
  dailyGoalMinutes = 20,
}: WelcomeSectionProps) {
  const [isOmikujiOpen, setIsOmikujiOpen] = useState(false);

  const timeInfo = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Chào buổi sáng", icon: "🌅" };
    if (hour < 18) return { text: "Chào buổi chiều", icon: "☀️" };
    return { text: "Chào buổi tối", icon: "🌙" };
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round(((todayMinutes || 0) / (dailyGoalMinutes || 20)) * 100)
  );

  const displayName = user?.fullName || user?.email || "Học viên";

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1F1715] via-[#2E201C] to-[#16100F] text-white shadow-2xl border border-[#8B6F5A]/50 p-6 sm:p-7 lg:p-8 transition-all">
        {/* 3D Ambient Glowing Light Orbs */}
        <div className="absolute -top-28 -right-28 w-[420px] h-[420px] bg-gradient-to-br from-[#C65D4B]/35 via-[#8B6F5A]/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C65D4B]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Japanese Watermark Accent */}
        <div className="absolute right-8 bottom-0 text-9xl font-jp font-black text-white/[0.04] select-none pointer-events-none tracking-widest hidden sm:block">
          日本語
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Side: Personalized Greeting & 3D Lucky Cat Mascot (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB8A9] text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB8A9]" />
                <span>Góc Học Tập ANH SENSEI</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>JLPT N5 – N3 Active</span>
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-5">
              {/* Interactive 3D Maneki-Neko Lucky Cat Mascot */}
              <ManekiNeko3D onClick={() => setIsOmikujiOpen(true)} className="flex-shrink-0" />

              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-2">
                  <span>{timeInfo.text}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB8A9] via-[#F5EFE6] to-[#FF8C78]">{displayName}</span></span>
                  <span>{timeInfo.icon}</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#DED3C8] leading-relaxed max-w-xl font-medium">
                  Bấm vào <strong className="text-amber-300 font-extrabold underline cursor-pointer" onClick={() => setIsOmikujiOpen(true)}>Chú Mèo Thần Tài 🐾</strong> để rút quẻ may mắn và nhận thưởng XP mỗi ngày nhé! 🎌✨
                </p>
              </div>
            </div>

            {/* Clean CTAs (Only 2 Main Buttons) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/learn"
                className="relative group overflow-hidden inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C65D4B] via-[#B04F3F] to-[#8B6F5A] hover:from-[#B04F3F] hover:to-[#765844] text-white text-xs sm:text-sm font-black shadow-xl shadow-[#C65D4B]/40 border border-white/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tiếp tục bài học dở dang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                {/* Shimmer Light Ray */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
              </Link>

              <Link
                href="/ai-tutor"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold transition-all hover:scale-[1.03] shadow-md"
              >
                <Bot className="w-4 h-4 text-[#FFB8A9]" />
                <span>Hỏi Trợ giảng AI</span>
              </Link>
            </div>
          </div>

          {/* Right Side: 3D Glass Stat Blocks & Pulsing Energy Ring (5 cols) */}
          <div className="lg:col-span-5 bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-5 space-y-4 shadow-2xl relative">
            <div className="grid grid-cols-3 gap-2.5">
              {/* Stat 1: Streak */}
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center space-y-1.5 shadow-lg backdrop-blur-md cursor-pointer"
              >
                <div className="w-8 h-8 mx-auto rounded-xl bg-[#C65D4B]/30 border border-[#C65D4B]/50 flex items-center justify-center text-[#FF8C78] shadow-inner">
                  <Flame className="w-4 h-4 fill-[#FF8C78] animate-pulse" />
                </div>
                <span className="text-[9px] font-bold text-[#DED3C8] uppercase block leading-none">Streak</span>
                <span className="text-xs sm:text-sm font-black text-white">{streakDays || 1} ngày</span>
              </motion.div>

              {/* Stat 2: Today Time */}
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center space-y-1.5 shadow-lg backdrop-blur-md cursor-pointer"
              >
                <div className="w-8 h-8 mx-auto rounded-xl bg-amber-500/30 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-inner">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-[#DED3C8] uppercase block leading-none">Hôm nay</span>
                <span className="text-xs sm:text-sm font-black text-white">{todayMinutes || 15} phút</span>
              </motion.div>

              {/* Stat 3: Target Goal */}
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center space-y-1.5 shadow-lg backdrop-blur-md cursor-pointer"
              >
                <div className="w-8 h-8 mx-auto rounded-xl bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shadow-inner">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-[#DED3C8] uppercase block leading-none">Mục tiêu</span>
                <span className="text-xs sm:text-sm font-black text-white">{dailyGoalMinutes || 20}p/ngày</span>
              </motion.div>
            </div>

            {/* Goal Progress Bar */}
            <div className="space-y-1.5 pt-1 border-t border-white/15">
              <div className="flex items-center justify-between text-xs font-bold text-[#DED3C8]">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tiến độ mục tiêu ngày:</span>
                </span>
                <span className="text-[#FFB8A9] font-black">{progressPercent}%</span>
              </div>
              <div className="relative w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/20 p-0.5 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] rounded-full shadow-md shadow-[#C65D4B]/50 relative"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Omikuji Fortune Draw Modal */}
      <OmikujiFortuneModal
        isOpen={isOmikujiOpen}
        onClose={() => setIsOmikujiOpen(false)}
      />
    </>
  );
}
