"use client";

import { BookOpen, Sparkles, Gamepad2, ArrowRight } from "lucide-react";

interface GrammarSelectedLessonProgressProps {
  lessonNum: number;
  levelCode: string;
  totalGrammarPoints: number;
  onScrollToGrammar: () => void;
  onScrollToGame: () => void;
}

export default function GrammarSelectedLessonProgress({
  lessonNum,
  levelCode,
  totalGrammarPoints,
  onScrollToGrammar,
  onScrollToGame,
}: GrammarSelectedLessonProgressProps) {
  return (
    <section className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
      {/* Lesson Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DED3C8]/60 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-black px-3 py-1 rounded-full uppercase border border-[#C65D4B]/20">
              Đang chọn: Bài #{lessonNum} ({levelCode})
            </span>
            <span className="text-xs text-[#76685F] font-bold">Minna no Nihongo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-[#231917]">
            Chuyên Đề Ngữ Pháp Bài #{lessonNum} ({levelCode})
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onScrollToGame}
            className="px-4 py-2.5 bg-[#FAF6EE] hover:bg-[#C65D4B] text-[#8B6F5A] hover:text-white border border-[#DED3C8] hover:border-[#C65D4B] font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Chơi Game Ema 🎮</span>
          </button>
          <button
            type="button"
            onClick={onScrollToGrammar}
            className="px-5 py-2.5 bg-[#C65D4B] hover:bg-[#A84A3B] text-white font-black text-xs rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Học Ngữ Pháp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="bg-[#FAF6EE] p-3.5 rounded-2xl border border-[#DED3C8]/70 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C65D4B]/10 text-[#C65D4B] flex items-center justify-center font-bold">
            <BookOpen className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-[#76685F] uppercase">Số Mẫu Ngữ Pháp</p>
            <p className="text-sm font-black text-[#231917]">{totalGrammarPoints} Cấu Trúc</p>
          </div>
        </div>

        <div className="bg-[#FAF6EE] p-3.5 rounded-2xl border border-[#DED3C8]/70 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6F8A72]/10 text-[#6F8A72] flex items-center justify-center font-bold">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-[#76685F] uppercase">Ví Dụ Thực Tế</p>
            <p className="text-sm font-black text-[#231917]">Có Furigana &amp; Audio</p>
          </div>
        </div>

        <div className="bg-[#FAF6EE] p-3.5 rounded-2xl border border-[#DED3C8]/70 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Gamepad2 className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-[#76685F] uppercase">Luyện Tương Tác</p>
            <p className="text-sm font-black text-[#231917]">Game Ghép Câu Ema</p>
          </div>
        </div>
      </div>
    </section>
  );
}
