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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] text-[#2C201D] shadow-md border border-[#DED0C5] p-6 sm:p-7 lg:p-8 transition-all">
        {/* Subtle Japanese Wood Pattern Texture Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] select-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B6F5A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle Soft Ambient Background Accent */}
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#D66552]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#8B6F5A]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Japanese Watermark Accent */}
        <div className="absolute right-8 bottom-0 text-9xl font-jp font-black text-[#8B6F5A]/[0.06] select-none pointer-events-none tracking-widest hidden sm:block">
          日本語
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Side: Personalized Greeting & Lucky Cat Mascot (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E5D9] border border-[#E3D4C7] text-[#8B6F5A] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#8B6F5A]" />
                <span>Góc Học Tập ANH SENSEI</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E5D9] border border-[#E3D4C7] text-[#6B554E] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>JLPT N5 – N3 Active</span>
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              {/* Interactive Lucky Cat Mascot matching user image */}
              <ManekiNeko3D
                onClick={() => setIsOmikujiOpen(true)}
                bubbleText="Mèo có quà cho bạn 🐱"
                className="flex-shrink-0"
              />

              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-[#2C201D] leading-tight">
                  <span>{timeInfo.text}, <span className="text-[#C65D4B]">{displayName}</span></span>
                </h1>
                <p className="text-sm sm:text-base text-[#6B554E] font-semibold tracking-wide">
                  Hôm nay học gì nhỉ? 🌱
                </p>
              </div>
            </div>

            {/* Clean CTAs (Only 2 Main Buttons) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#D66552] hover:bg-[#C25644] text-white text-xs sm:text-sm font-bold border border-[#E37966] shadow-xs transition-colors duration-200"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tiếp tục bài học dở dang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/ai-tutor"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#F2E5D9] hover:bg-[#E8D5C8] border border-[#E3D4C7] text-[#8B6F5A] text-xs sm:text-sm font-bold transition-colors duration-200 shadow-2xs"
              >
                <Bot className="w-4 h-4 text-[#8B6F5A]" />
                <span>Hỏi Trợ giảng AI</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Matte Stat Cards & Energy Bar (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF3EB] border border-[#E8DCCF] rounded-3xl p-5 space-y-4 shadow-sm relative">
            <div className="grid grid-cols-3 gap-2.5">
              {/* Stat 1: Streak */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FFFDF9] border border-[#E8DCCF] rounded-2xl p-3 text-center space-y-1.5 shadow-2xs cursor-pointer"
              >
                <div className="w-8 h-8 mx-auto rounded-xl bg-[#F2E5D9] border border-[#E3D4C7] flex items-center justify-center text-[#C65D4B]">
                  <Flame className="w-4 h-4 fill-[#C65D4B]" />
                </div>
                <span className="text-[9px] font-bold text-[#8B6F5A] uppercase block leading-none">Streak</span>
                <span className="text-xs sm:text-sm font-black text-[#2C201D]">{streakDays || 1} ngày</span>
              </motion.div>

              {/* Stat 2: Today Time */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FFFDF9] border border-[#E8DCCF] rounded-2xl p-3 text-center space-y-1.5 shadow-2xs cursor-pointer"
              >
                <div className="w-8 h-8 mx-auto rounded-xl bg-[#FEF3D6] border border-[#FCDA9C] flex items-center justify-center text-amber-600">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-[#8B6F5A] uppercase block leading-none">Hôm nay</span>
                <span className="text-xs sm:text-sm font-black text-[#2C201D]">{todayMinutes || 15} phút</span>
              </motion.div>

              {/* Stat 3: Target Goal */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FFFDF9] border border-[#E8DCCF] rounded-2xl p-3 text-center space-y-1.5 shadow-2xs cursor-pointer"
              >
                <div className="w-8 h-8 mx-auto rounded-xl bg-[#DFF5EA] border border-[#BDEADA] flex items-center justify-center text-emerald-600">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-[#8B6F5A] uppercase block leading-none">Mục tiêu</span>
                <span className="text-xs sm:text-sm font-black text-[#2C201D]">{dailyGoalMinutes || 20}p/ngày</span>
              </motion.div>
            </div>

            {/* Goal Progress Bar */}
            <div className="space-y-1.5 pt-1 border-t border-[#E8DCCF]">
              <div className="flex items-center justify-between text-xs font-bold text-[#6B554E]">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tiến độ mục tiêu ngày:</span>
                </span>
                <span className="text-[#C65D4B] font-bold">{progressPercent}%</span>
              </div>
              <div className="relative w-full h-2.5 bg-[#EFE5DC] rounded-full overflow-hidden border border-[#DED0C5] p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-[#D66552] rounded-full relative"
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
