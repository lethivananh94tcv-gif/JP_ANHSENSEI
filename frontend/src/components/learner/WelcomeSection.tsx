"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { UserProfile } from "@/types/learner";
import { Clock, Flame, Target, Sparkles, ArrowRight, Play, TrendingUp, Mail } from "lucide-react";
import { motion } from "framer-motion";
import OmikujiFortuneModal from "@/components/ui/OmikujiFortuneModal";
import ManekiNeko3D from "@/components/ui/ManekiNeko3D";
import PostmanCapybara3D from "@/components/ui/PostmanCapybara3D";
import BeginnerLetterModal from "@/components/learner/BeginnerLetterModal";

interface WelcomeSectionProps {
  user: UserProfile | null;
  streakDays?: number | null;
  todayMinutes?: number | null;
  dailyGoalMinutes?: number | null;
}

export default function WelcomeSection({
  user,
  streakDays = 2,
  todayMinutes = 10,
  dailyGoalMinutes = 20,
}: WelcomeSectionProps) {
  const [isOmikujiOpen, setIsOmikujiOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [hasOpenedLetter, setHasOpenedLetter] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const readStatus = localStorage.getItem("has_opened_beginner_letter");
      if (readStatus === "true") {
        setHasOpenedLetter(true);
      }
    }
  }, []);

  const handleCloseLetter = () => {
    setIsLetterOpen(false);
    setHasOpenedLetter(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("has_opened_beginner_letter", "true");
    }
  };

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

  const displayName = user?.fullName || user?.email?.split("@")[0] || "Quản Trị Viên ANH SENSEI";

  return (
    <>
      <section className="relative overflow-visible rounded-3xl bg-gradient-to-r from-[#FFF5F2] via-[#FDF3EE] to-[#FFF8F5] text-[#2C201D] border border-[#F5DDD4] p-5 sm:p-6 shadow-sm transition-all pt-7 sm:pt-8">
        {/* Background Decorative Sakura & Mount Fuji Graphic */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-gradient-to-br from-[#FFD8D0]/25 to-transparent rounded-full blur-2xl pointer-events-none overflow-hidden" />
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none hidden lg:block overflow-hidden">
          <svg width="340" height="180" viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="210" cy="120" r="100" fill="#E65840" fillOpacity="0.25" />
            <path d="M120 240L210 60L300 240H120Z" fill="#8B6F5A" fillOpacity="0.15" />
            <path d="M180 120L210 60L240 120H180Z" fill="white" fillOpacity="0.6" />
          </svg>
        </div>

        {/* Japanese Sakura Blossom Petals Graphic Accent */}
        <div className="absolute top-2 left-6 text-base text-[#E65840]/40 animate-pulse pointer-events-none select-none">
          🌸
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Side: Greeting & Buttons & Lucky Cat & Mailman Cat (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFEAE5] border border-[#FFD0C5] text-[#C65D4B] text-[11px] font-black shadow-2xs">
              <span>🌸 おはようございます！ 🌸</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#2C201D] leading-tight">
                {timeInfo.text}, <span className="text-[#C65D4B]">{displayName}</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#76685F] font-extrabold flex items-center gap-1.5 flex-wrap">
                <span>Hôm nay học gì nhỉ? 今日も一緒に頑張りましょう！ 🌱</span>
              </p>
            </div>

            {/* Clean, Modern Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65D4B] hover:bg-[#B04F3F] text-white text-xs font-black shadow-md shadow-[#C65D4B]/20 transition-all hover:scale-105"
              >
                <span>➔ Tiếp tục học ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Dedicated Beginner Mail Button */}
              <button
                onClick={() => setIsLetterOpen(true)}
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#FFF0ED] hover:bg-[#FFE5DE] border border-[#FFC4B7] text-[#C65D4B] text-xs font-black shadow-xs transition-all hover:scale-105 cursor-pointer relative group"
              >
                {!hasOpenedLetter && <div className="w-2 h-2 rounded-full bg-[#C65D4B] animate-ping" />}
                <Mail className="w-4 h-4 text-[#C65D4B]" />
                <span>{hasOpenedLetter ? "Xem Lộ Trình Học 🌸" : "Thư Gửi Bạn Mới (Lộ Trình)"}</span>
              </button>

              <Link
                href="/flashcards"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFF8F5] border border-[#EAD0C7] text-[#2C201D] text-xs font-extrabold shadow-2xs transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C65D4B]" />
                <span>Flashcards</span>
              </Link>

              {/* Lucky Cat Avatar (Rút Quẻ) */}
              <ManekiNeko3D
                onClick={() => setIsOmikujiOpen(true)}
                bubbleText="Rút quẻ 🐱"
                className="flex-shrink-0 ml-1 cursor-pointer scale-90"
              />
            </div>
          </div>

          {/* Right Side: Learning Progress Card with 3D Full-Body Postman Capybara Perched on Top (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-[#F2DDD4] space-y-3.5 shadow-sm relative overflow-visible mt-8 lg:mt-0">
            {/* 🍊 FULL-BODY 3D POSTMAN CAPYBARA MASCOT BOUNCING ON TOP RIGHT CORNER OF PROGRESS CARD 📮 */}
            <div className="absolute -top-12 sm:-top-14 right-2 sm:right-6 z-40 pointer-events-auto">
              <PostmanCapybara3D
                onClick={() => setIsLetterOpen(true)}
                isJumping={!hasOpenedLetter}
                bubbleText={hasOpenedLetter ? "Xem lại thư ✉️" : "Capybara có thư nè! 🍊✉️"}
              />
            </div>

            <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#C65D4B]" />
                <h3 className="text-xs sm:text-sm font-black text-[#2C201D]">Tiến độ học tập</h3>
              </div>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2">
              {/* Stat 1: Streak */}
              <div className="bg-[#FFFDF9] border border-[#F2DDD4] rounded-xl p-2 text-center space-y-0.5 shadow-2xs">
                <div className="w-7 h-7 mx-auto rounded-lg bg-[#FFEFEA] flex items-center justify-center text-[#C65D4B]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#2C201D] block mt-0.5">{streakDays || 2} ngày</span>
                <span className="text-[9px] font-bold text-[#8B6F5A] block">Học liên tục</span>
              </div>

              {/* Stat 2: Today Time */}
              <div className="bg-[#FFFDF9] border border-[#F2DDD4] rounded-xl p-2 text-center space-y-0.5 shadow-2xs">
                <div className="w-7 h-7 mx-auto rounded-lg bg-[#FFF5E6] flex items-center justify-center text-amber-600">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#2C201D] block mt-0.5">{todayMinutes || 10} phút</span>
                <span className="text-[9px] font-bold text-[#8B6F5A] block">Hôm nay</span>
              </div>

              {/* Stat 3: Target Goal */}
              <div className="bg-[#FFFDF9] border border-[#F2DDD4] rounded-xl p-2 text-center space-y-0.5 shadow-2xs">
                <div className="w-7 h-7 mx-auto rounded-lg bg-[#EAF8F2] flex items-center justify-center text-emerald-600">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#2C201D] block mt-0.5">{dailyGoalMinutes || 20}p/ngày</span>
                <span className="text-[9px] font-bold text-[#8B6F5A] block">Mục tiêu</span>
              </div>
            </div>

            {/* Goal Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#6B554E]">
                <span>Tiến độ mục tiêu ngày</span>
                <span className="text-[#C65D4B] font-black">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-[#F5EFE6] rounded-full overflow-hidden border border-[#EAD0C7] p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#C65D4B] rounded-full shadow-xs"
                />
              </div>
            </div>

            {/* Torii Gate Quote Footer */}
            <div className="pt-2 border-t border-[#F5EFE6] flex items-center justify-between text-[11px] text-[#76685F]">
              <div className="space-y-0.5">
                <p className="font-extrabold text-[#2C201D]">✨ 継続は力なり (Kiên trì là sức mạnh)</p>
              </div>
              <div className="text-lg text-[#C65D4B]/40 select-none">⛩️</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Omikuji Fortune Draw Modal */}
      <OmikujiFortuneModal
        isOpen={isOmikujiOpen}
        onClose={() => setIsOmikujiOpen(false)}
      />

      {/* Beginner Letter & 6-step Roadmap Modal delivered by Postman Cat */}
      <BeginnerLetterModal
        isOpen={isLetterOpen}
        onClose={handleCloseLetter}
      />
    </>
  );
}

