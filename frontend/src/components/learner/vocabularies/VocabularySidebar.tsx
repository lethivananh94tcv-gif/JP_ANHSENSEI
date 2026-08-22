"use client";

import { StreakData } from "./types";

interface VocabularySidebarProps {
  streakData?: StreakData | null;
}

export default function VocabularySidebar({ streakData }: VocabularySidebarProps) {
  const hasStreakData = streakData && typeof streakData.streakDays === "number" && streakData.streakDays >= 0;
  const hasBadgesData = streakData?.badges && streakData.badges.length > 0;

  if (!hasStreakData && !hasBadgesData) {
    return (
      <aside className="w-full space-y-4">
        {/* Neutral Info Widget */}
        <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-5 shadow-xs space-y-2 text-center">
          <span className="text-2xl">🌱</span>
          <h4 className="text-xs font-serif font-black text-[#302A26] uppercase tracking-wider">
            Góc Học Tập
          </h4>
          <p className="text-xs text-[#756A62] italic">
            &ldquo;Keizoku wa chikara nari&rdquo;
            <br />
            <span className="not-italic text-[11px] text-[#8B6F5A]">Kiên trì chính là sức mạnh.</span>
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full space-y-6">
      {/* Widget 1: Hộ chiếu học tập (Badges Collection) */}
      {hasBadgesData && (
        <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-5 shadow-xs space-y-3">
          <h4 className="text-xs font-serif font-black text-[#302A26] uppercase tracking-wider text-center">
            Hộ Chiếu Học Tập
          </h4>

          <div className="grid grid-cols-4 gap-2 py-2">
            {streakData.badges!.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                title={badge.name}
                className={`aspect-square rounded-2xl border flex items-center justify-center text-lg ${
                  badge.earned
                    ? "bg-[#FAF3EB] border-[#C65D4B] text-[#C65D4B]"
                    : "bg-[#F5EFE6] border-[#DED3C8] text-gray-400 opacity-60"
                }`}
              >
                {badge.icon || "💮"}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-center text-[#756A62]">Con dấu đã thu thập</p>
        </div>
      )}

      {/* Widget 2: Chuỗi học tập (Streak) */}
      {hasStreakData && (
        <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <h4 className="text-xs font-serif font-black text-[#302A26] uppercase tracking-wider">
              Chuỗi Học Tập
            </h4>
            <p className="text-lg font-black text-[#C65D4B]">
              {streakData.streakDays} ngày
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl">
            🔥
          </div>
        </div>
      )}
    </aside>
  );
}
