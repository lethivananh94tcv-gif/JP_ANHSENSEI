"use client";

import { ArrowRight } from "lucide-react";

interface DailyPracticeCardProps {
  onStartPractice: () => void;
  remainingExercises?: number;
}

export default function DailyPracticeCard({
  onStartPractice,
  remainingExercises = 15,
}: DailyPracticeCardProps) {
  return (
    <div className="bg-[#FFFDF9] border border-[#EFE5DA] rounded-2xl p-4.5 shadow-2xs space-y-3">
      <h3 className="text-[11px] font-extrabold font-sans text-[#76685F] uppercase tracking-wider px-1">
        Luyện tập hôm nay
      </h3>

      <p className="text-xs font-sans text-[#76685F] leading-relaxed font-normal">
        Hãy luyện tập mỗi ngày để cải thiện kỹ năng nhé!
      </p>

      <div className="flex items-baseline gap-2 py-0.5">
        <span className="text-3xl font-black font-sans text-[#C65D4B] leading-none">
          {remainingExercises}
        </span>
        <span className="text-xs font-bold font-sans text-[#76685F]">bài tập còn lại</span>
      </div>

      <button
        type="button"
        onClick={onStartPractice}
        className="w-full py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-bold font-sans text-xs rounded-xl shadow-xs transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>Bắt đầu luyện tập</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
