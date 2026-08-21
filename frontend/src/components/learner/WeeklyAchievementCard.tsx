"use client";

import { WeeklyActivityDay } from "@/types/learner";

interface WeeklyAchievementCardProps {
  totalMinutes?: number | null;
  percentageChange?: number | null;
  dailyActivities?: WeeklyActivityDay[] | null;
}

export default function WeeklyAchievementCard({
  totalMinutes = null,
  percentageChange = null,
  dailyActivities = null,
}: WeeklyAchievementCardProps) {
  const hasData = totalMinutes !== null && dailyActivities && dailyActivities.length > 0;

  // Fallback 7-day template structure for clean CSS rendering
  const days: WeeklyActivityDay[] = dailyActivities || [
    { dayName: "T2", minutes: 20 },
    { dayName: "T3", minutes: 35 },
    { dayName: "T4", minutes: 45 },
    { dayName: "T5", minutes: 60, isHighest: true },
    { dayName: "T6", minutes: 10 },
    { dayName: "T7", minutes: 25 },
    { dayName: "CN", minutes: 30 },
  ];

  const maxMinutes = Math.max(...days.map((d) => d.minutes), 1);

  return (
    <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-extrabold text-[#231917]">
          Thành tích tuần này
        </h3>

        {hasData ? (
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black text-[#231917]">{totalMinutes}</span>
              <span className="text-xs text-[#76685F] font-medium ml-1">phút</span>
              <p className="text-[10px] text-[#76685F] font-semibold uppercase tracking-wider">Tổng thời gian học</p>
            </div>

            {percentageChange !== null && (
              <div className="bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-1">
                <span>↑ {percentageChange}%</span>
                <span className="text-[9px] font-normal text-emerald-700">so tuần trước</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#F5EFE6]/60 p-4 rounded-2xl border border-[#DED3C8]/60 text-xs text-[#76685F] space-y-1">
            <p className="font-bold text-[#231917]">Hoạt động học tuần này</p>
            <p className="leading-relaxed">
              Dữ liệu theo dõi thời gian học tập hằng ngày sẽ tự động cập nhật khi bạn hoàn thành các bài học.
            </p>
          </div>
        )}

        {/* 7-Day CSS Bar Chart */}
        <div className="pt-4 border-t border-[#DED3C8]/50">
          <div className="flex items-end justify-between gap-2 h-28 pt-2">
            {days.map((d) => {
              const heightPercent = Math.min(Math.round((d.minutes / maxMinutes) * 100), 100);
              return (
                <div key={d.dayName} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full bg-[#F5EFE6] rounded-lg overflow-hidden flex items-end h-20 border border-[#DED3C8]/40">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        d.isHighest ? "bg-[#C65D4B]" : "bg-[#8B6F5A]/40 group-hover:bg-[#8B6F5A]"
                      }`}
                      style={{ height: `${heightPercent || 10}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${d.isHighest ? "text-[#C65D4B]" : "text-[#76685F]"}`}>
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
