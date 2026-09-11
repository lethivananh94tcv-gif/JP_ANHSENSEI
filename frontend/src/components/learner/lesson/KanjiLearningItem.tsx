"use client";

import { Bookmark, CheckCircle2 } from "lucide-react";

export interface LessonKanjiDto {
  kanjiId: number;
  character: string;
  onyomi?: string;
  kunyomi?: string;
  meaningVi: string;
  strokeCount?: number;
  radical?: string;
}

interface KanjiLearningItemProps {
  item: LessonKanjiDto;
  isLearned: boolean;
  onToggleLearned: (id: number) => void;
}

export default function KanjiLearningItem({
  item,
  isLearned,
  onToggleLearned,
}: KanjiLearningItemProps) {
  return (
    <div
      className={`bg-[#FFFDF9] border rounded-2xl p-5 shadow-2xs transition-all flex flex-col justify-between space-y-4 relative ${
        isLearned ? "border-[#6F8A72]/50 bg-[#6F8A72]/5" : "border-[#DED3C8] hover:border-[#8B6F5A]/50"
      }`}
    >
      <div className="flex gap-4 items-start justify-between">
        <div className="flex gap-4 items-start">
          {/* Large Kanji Character Box */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5EFE6] border border-[#DED3C8] rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-serif font-black text-[#C65D4B] shadow-inner flex-shrink-0">
            {item.character}
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-serif font-extrabold text-base sm:text-lg text-[#231917]">
              {item.meaningVi}
            </h4>
            <p className="text-[#76685F]">
              Âm On: <strong className="text-[#231917]">{item.onyomi || "—"}</strong>
            </p>
            <p className="text-[#76685F]">
              Âm Kun: <strong className="text-[#231917]">{item.kunyomi || "—"}</strong>
            </p>
            {item.strokeCount && (
              <p className="text-[#76685F]">
                Số nét: <strong className="text-[#8B6F5A]">{item.strokeCount} nét</strong>
              </p>
            )}
          </div>
        </div>

        {/* Compact Top-Right Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLearned(item.kanjiId);
          }}
          title={isLearned ? "Đã thuộc Hán tự này (Nhấp để bỏ đánh dấu)" : "Đánh dấu đã học"}
          className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all duration-200 cursor-pointer border shadow-2xs hover:scale-105 active:scale-95 shrink-0 ${
            isLearned
              ? "bg-emerald-600 text-white border-emerald-700 shadow-emerald-500/20"
              : "bg-white hover:bg-[#C65D4B] text-[#76685F] hover:text-white border-[#DED3C8] hover:border-[#C65D4B]"
          }`}
        >
          {isLearned ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Đã thuộc</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>Đã học</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
