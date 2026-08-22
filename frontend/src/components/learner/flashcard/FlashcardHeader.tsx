"use client";

import Link from "next/link";
import { UserProfile } from "@/types/learner";

interface FlashcardHeaderProps {
  levelCode?: string;
  lessonTitle?: string;
  user?: UserProfile | null;
  onBack: () => void;
  onOpenSettings?: () => void;
}

export default function FlashcardHeader({
  levelCode = "N5",
  lessonTitle = "Bài 1: Giới thiệu bản thân & Chào hỏi",
  user,
  onBack,
  onOpenSettings,
}: FlashcardHeaderProps) {
  return (
    <header className="w-full bg-[#FFFDF9] border-b border-[#DED3C8] px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xs z-30">
      {/* Left: Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#6E5E52] hover:text-[#C65D4B] transition-colors cursor-pointer"
        aria-label="Quay lại bài học"
      >
        <span className="text-base sm:text-lg">←</span>
        <span className="hidden sm:inline">Back to Lesson</span>
        <span className="sm:hidden">Quay lại</span>
      </button>

      {/* Center: Title & Lesson Name */}
      <div className="flex flex-col items-center text-center">
        <h1 className="font-serif font-black text-sm sm:text-base tracking-widest text-[#C65D4B] uppercase">
          ANH SENSEI
        </h1>
        <p className="text-[11px] sm:text-xs font-semibold text-[#8B6F5A] truncate max-w-[200px] sm:max-w-[360px]">
          {levelCode ? `${levelCode} · ` : ""}{lessonTitle}
        </p>
      </div>

      {/* Right: User Avatar / Settings */}
      <div className="flex items-center gap-3">
        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full bg-[#FAF3EB] hover:bg-[#F5EFE6] border border-[#DED3C8] text-[#8B6F5A] flex items-center justify-center text-sm transition-all cursor-pointer"
            aria-label="Cài đặt thẻ"
          >
            ⚙️
          </button>
        )}

        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8B6F5A] text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs">
          {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "A"}
        </div>
      </div>
    </header>
  );
}
