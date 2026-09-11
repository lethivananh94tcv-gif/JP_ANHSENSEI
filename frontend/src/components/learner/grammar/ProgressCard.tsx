"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Flame } from "lucide-react";

interface ProgressCardProps {
  activeLevelId: string;
  learnedCount?: number;
  totalCount?: number;
  practiceCount?: number;
  totalPractice?: number;
  streakDays?: number;
  onViewDetails?: () => void;
}

export default function ProgressCard({
  activeLevelId = "N5",
  learnedCount: propLearnedCount,
  totalCount: propTotalCount = 25,
  practiceCount: propPracticeCount,
  totalPractice: propTotalPractice = 100,
  streakDays: propStreakDays,
  onViewDetails,
}: ProgressCardProps) {
  const [realSummary, setRealSummary] = useState<{
    completionPercent: number;
    completedLessonsCount: number;
    streakDays: number;
    totalValidActivities: number;
    learnedGrammarCount: number;
  } | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (!token) return;

        const res = await fetch("/api/v1/learner/progress/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setRealSummary({
              completionPercent: Number(json.data.completionPercent || 0),
              completedLessonsCount: Number(json.data.completedLessonsCount || 0),
              streakDays: Number(json.data.streakDays || 0),
              totalValidActivities: Number(json.data.totalValidActivities || 0),
              learnedGrammarCount: Number(json.data.learnedGrammarCount || 0),
            });
          }
        }
      } catch (err) {
        // Silently keep default fallback
      }
    }
    fetchProgress();
  }, []);

  const learnedCount = realSummary ? realSummary.completedLessonsCount : (propLearnedCount ?? 0);
  const totalCount = propTotalCount || 25;
  const practiceCount = realSummary ? realSummary.totalValidActivities : (propPracticeCount ?? 0);
  const totalPractice = propTotalPractice || 100;
  const streakDays = realSummary ? realSummary.streakDays : (propStreakDays ?? 0);
  const percent = realSummary
    ? Math.round(realSummary.completionPercent)
    : Math.round((learnedCount / (totalCount || 1)) * 100);

  return (
    <div className="bg-[#FFFDF9] border border-[#EFE5DA] rounded-2xl p-4.5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[11px] font-extrabold font-sans text-[#76685F] uppercase tracking-wider">
          Tiến độ của bạn
        </h3>
        {streakDays > 0 && (
          <span className="inline-flex items-center gap-1 bg-[#C65D4B]/10 text-[#C65D4B] px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#C65D4B]/20">
            <Flame className="w-3 h-3 text-[#C65D4B]" />
            <span>{streakDays} ngày</span>
          </span>
        )}
      </div>

      {/* Circular Progress Ring */}
      <div className="flex flex-col items-center justify-center py-1 space-y-3">
        <div className="relative w-26 h-26 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#FAF2EA]"
              strokeWidth="3.2"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#C65D4B]"
              strokeDasharray={`${percent}, 100`}
              strokeWidth="3.2"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-bold text-[#76685F]">{activeLevelId}</span>
            <span className="text-xl font-black text-[#2B211D] leading-none mt-0.5">{percent}%</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full grid grid-cols-2 gap-2 text-center pt-3 border-t border-[#EFE5DA]">
          <div>
            <p className="text-[10px] font-bold text-[#76685F] uppercase tracking-wider">ĐÃ HỌC</p>
            <p className="text-xs font-bold text-[#2B211D] mt-0.5">
              <span className="text-[#C65D4B]">{learnedCount}</span>/{totalCount}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#76685F] uppercase tracking-wider">ĐÃ LUYỆN TẬP</p>
            <p className="text-xs font-bold text-[#2B211D] mt-0.5">
              <span className="text-[#C65D4B]">{practiceCount}</span>/{totalPractice}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewDetails}
        className="w-full py-2 bg-[#FAF7F2] hover:bg-[#F5EEE7] text-[#76685F] hover:text-[#C65D4B] font-bold text-xs rounded-xl border border-[#EFE5DA] transition-all cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>Xem chi tiết tiến độ</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
