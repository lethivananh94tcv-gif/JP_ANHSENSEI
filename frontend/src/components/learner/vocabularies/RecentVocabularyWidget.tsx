"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, ArrowRight, BookOpen } from "lucide-react";
import { getLocalRecentLessons, AccessedLessonInfo } from "@/lib/utils/learningTracker";

export default function RecentVocabularyWidget() {
  const [recentRecords, setRecentRecords] = useState<AccessedLessonInfo[]>([]);

  useEffect(() => {
    const list = getLocalRecentLessons();
    setRecentRecords(list.slice(0, 4));
  }, []);

  if (recentRecords.length === 0) {
    return (
      <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#302A26]">
          <History className="w-4 h-4 text-[#C65D4B]" />
          <h3 className="font-black text-sm">Lịch Sử Học Gần Đây</h3>
        </div>
        <p className="text-xs text-[#756A62]">
          Bạn chưa truy cập bài học từ vựng nào gần đây. Hãy chọn một bài học bên dưới để bắt đầu!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#302A26]">
          <History className="w-4 h-4 text-[#C65D4B]" />
          <h3 className="font-black text-sm">Vừa Truy Cập Gần Đây</h3>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#756A62] border border-[#EBE1D7]">
          {recentRecords.length} bài
        </span>
      </div>

      <div className="space-y-2">
        {recentRecords.map((item) => (
          <Link
            key={item.lessonId}
            href={`/lessons/${item.lessonId}`}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF6F0] hover:bg-[#F5EFE6] border border-[#EBE1D7] transition-all group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-[#C65D4B]/10 text-[#C65D4B] flex items-center justify-center font-bold text-xs shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <p className="font-bold text-xs text-[#302A26] truncate group-hover:text-[#C65D4B] transition-colors">
                  {item.title}
                </p>
                <p className="text-[10px] text-[#A0958C]">Trình độ: {item.levelCode || "N5"}</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#A0958C] group-hover:text-[#C65D4B] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </Link>
        ))}
      </div>
    </div>
  );
}
