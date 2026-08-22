"use client";

import { WeeklyActivityDay } from "@/types/learner";
import { Award, TrendingUp } from "lucide-react";

interface WeeklyAchievementCardProps {
  totalMinutes?: number | null;
  percentageChange?: number | null;
  dailyActivities?: WeeklyActivityDay[] | null;
}

export default function WeeklyAchievementCard({
  totalMinutes = 105,
  percentageChange = 12,
  dailyActivities = null,
}: WeeklyAchievementCardProps) {
  const days: WeeklyActivityDay[] = dailyActivities || [
    { dayName: "T2", minutes: 20 },
    { dayName: "T3", minutes: 35 },
    { dayName: "T4", minutes: 45 },
    { dayName: "T5", minutes: 60, isHighest: true },
    { dayName: "T6", minutes: 15 },
    { dayName: "T7", minutes: 25 },
    { dayName: "CN", minutes: 30 },
  ];

  const maxMinutes = Math.max(...days.map((d) => d.minutes), 1);

  return (
    <div className="bg-white border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-[#231917] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C65D4B]" />
            <span>Thành Tích Tuần Này</span>
          </h3>
          <span className="text-[10px] font-extrabold bg-[#F5EFE6] text-[#8B6F5A] px-2.5 py-1 rounded-full border border-[#DED3C8]">
            7 ngày gần nhất
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#231917]">{totalMinutes}</span>
            <span className="text-xs text-[#76685F] font-bold ml-1">phút</span>
            <p className="text-[10px] text-[#76685F] font-bold uppercase tracking-wider mt-0.5">Tổng thời gian tự học</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-800 text-xs font-extrabold flex items-center gap-1 shadow-2xs">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>+{percentageChange}%</span>
          </div>
        </div>

        {/* 7-Day Bar Chart */}
        <div className="pt-4 border-t border-[#DED3C8]/60">
          <div className="flex items-end justify-between gap-2 h-32 pt-4">
            {days.map((d) => {
              const heightPercent = Math.min(Math.round((d.minutes / maxMinutes) * 100), 100);
              return (
                <div key={d.dayName} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[9px] font-bold text-[#8B6F5A] opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.minutes}p
                  </div>
                  <div className="w-full bg-[#F5EFE6] rounded-xl overflow-hidden flex items-end h-24 border border-[#DED3C8]/50 p-0.5">
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        d.isHighest
                          ? "bg-gradient-to-t from-[#C65D4B] to-[#FF8C78] shadow-xs"
                          : "bg-gradient-to-t from-[#8B6F5A]/60 to-[#8B6F5A] group-hover:from-[#C65D4B]/70 group-hover:to-[#C65D4B]"
                      }`}
                      style={{ height: `${heightPercent || 15}%` }}
                    />
                  </div>
                  <span className={`text-[11px] font-bold ${d.isHighest ? "text-[#C65D4B]" : "text-[#76685F]"}`}>
                    {d.dayName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
