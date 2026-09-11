"use client";

import { Compass, Target, Sliders, HelpCircle, Lightbulb, ArrowRight } from "lucide-react";

interface GrammarRightSidebarProps {
  onStartPractice: () => void;
  remainingExercises?: number;
}

const POPULAR_TOPICS = [
  { icon: Compass, title: "Thì và cách chia động từ", count: "12 chủ điểm" },
  { icon: Target, title: "Trợ từ", count: "15 chủ điểm" },
  { icon: Sliders, title: "Tính từ và trạng từ", count: "8 chủ điểm" },
  { icon: HelpCircle, title: "Câu điều kiện", count: "6 chủ điểm" },
  { icon: Lightbulb, title: "Câu giả định", count: "5 chủ điểm" },
];

export default function GrammarRightSidebar() {
  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-5">
      {/* Widget 1: Chủ đề ngữ pháp phổ biến */}
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-black text-[#231917] uppercase tracking-wider px-1">
          Chủ đề ngữ pháp phổ biến
        </h3>

        <div className="space-y-2.5">
          {POPULAR_TOPICS.map((topic, idx) => {
            const IconComponent = topic.icon;
            return (
              <div
                key={idx}
                className="p-3 bg-[#FAF6EE] hover:bg-white rounded-2xl border border-[#DED3C8] hover:border-[#C65D4B]/40 transition-all cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFFDF9] text-[#C65D4B] border border-[#DED3C8] group-hover:bg-[#C65D4B] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#231917] group-hover:text-[#C65D4B] transition-colors leading-tight">
                    {topic.title}
                  </p>
                  <p className="text-[10px] text-[#76685F] font-medium">{topic.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
