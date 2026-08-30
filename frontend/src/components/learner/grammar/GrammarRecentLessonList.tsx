"use client";

import { BookOpen, ChevronRight } from "lucide-react";

interface LessonItem {
  id: number;
  num: number;
  title: string;
}

interface GrammarRecentLessonListProps {
  levelCode: string;
  lessons: LessonItem[];
  selectedLessonNum: number;
  onSelectLesson: (num: number) => void;
}

export default function GrammarRecentLessonList({
  levelCode,
  lessons,
  selectedLessonNum,
  onSelectLesson,
}: GrammarRecentLessonListProps) {
  return (
    <section className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DED3C8]/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#C65D4B]/10 text-[#C65D4B] flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-serif font-black text-[#231917]">
              Kho Bài Học Ngữ Pháp ({levelCode})
            </h3>
            <p className="text-xs text-[#76685F]">Chọn bài học bên dưới để tải các cấu trúc ngữ pháp tương ứng</p>
          </div>
        </div>
      </div>

      {/* Grid of Lesson Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {lessons.map((item) => {
          const isSelected = selectedLessonNum === item.num;
          return (
            <div
              key={item.id}
              onClick={() => onSelectLesson(item.num)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between items-center text-center space-y-2 group min-h-[120px] ${
                isSelected
                  ? "bg-[#FAF6EE] border-[#C65D4B] shadow-md scale-102"
                  : "bg-[#FFFDF9] hover:bg-[#FAF6EE] border-[#DED3C8] hover:border-[#C65D4B]/50"
              }`}
            >
              <span
                className={`text-xs font-black px-3 py-1 rounded-full border ${
                  isSelected
                    ? "bg-[#C65D4B] text-white border-[#C65D4B]"
                    : "bg-[#FAF6EE] text-[#C65D4B] border-[#DED3C8]"
                }`}
              >
                Bài #{item.num}
              </span>

              <h4
                className={`text-xs font-serif font-bold transition-colors ${
                  isSelected ? "text-[#C65D4B]" : "text-[#231917] group-hover:text-[#C65D4B]"
                }`}
              >
                {item.title}
              </h4>

              <div className="pt-1 text-[10px] font-bold text-[#8B6F5A] flex items-center gap-0.5">
                <span>{isSelected ? "Đang xem" : "Chọn bài"}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
