"use client";

import { useMemo } from "react";
import { UserProfile } from "@/types/learner";

interface WelcomeSectionProps {
  user: UserProfile | null;
  streakDays?: number | null;
  todayMinutes?: number | null;
  dailyGoalMinutes?: number | null;
}

export default function WelcomeSection({
  user,
  streakDays = null,
  todayMinutes = null,
  dailyGoalMinutes = null,
}: WelcomeSectionProps) {
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  }, []);

  return (
    <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 py-2">
      {/* Left: Greeting & Encouraging Message */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#231917] tracking-tight flex items-center gap-2">
          <span>{timeGreeting}, {user?.fullName || "Học viên"}</span>
          <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#76685F]">
          Hôm nay mình cùng học thêm một chút tiếng Nhật nhé!
        </p>
      </div>

      {/* Right: Quick Stats Cards */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
        {/* Stat 1: Streak */}
        <div className="flex-1 sm:w-36 bg-[#FFFDF9] border border-[#DED3C8] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#C65D4B] text-xl flex items-center justify-center flex-shrink-0">
            🔥
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-[#76685F] block">Chuỗi học</span>
            <span className="text-sm sm:text-base font-extrabold text-[#231917]">
              {streakDays !== null ? `${streakDays} ngày` : "—"}
            </span>
          </div>
        </div>

        {/* Stat 2: Today Time */}
        <div className="flex-1 sm:w-36 bg-[#FFFDF9] border border-[#DED3C8] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#8B6F5A] text-xl flex items-center justify-center flex-shrink-0">
            ⏱️
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-[#76685F] block">Hôm nay</span>
            <span className="text-sm sm:text-base font-extrabold text-[#231917]">
              {todayMinutes !== null ? `${todayMinutes} phút` : "—"}
            </span>
          </div>
        </div>

        {/* Stat 3: Daily Goal */}
        <div className="flex-1 sm:w-36 bg-[#FFFDF9] border border-[#DED3C8] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#C65D4B] text-xl flex items-center justify-center flex-shrink-0">
            🎯
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-[#76685F] block">Mục tiêu</span>
            <span className="text-sm sm:text-base font-extrabold text-[#231917]">
              {dailyGoalMinutes !== null ? `${dailyGoalMinutes} phút` : "20 phút"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
