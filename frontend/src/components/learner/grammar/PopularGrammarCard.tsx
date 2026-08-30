"use client";

import { Compass, Target, Sliders, HelpCircle, Lightbulb } from "lucide-react";

export default function PopularGrammarCard() {
  const topics = [
    { icon: Compass, title: "Thì và cách chia động từ", count: "12 chủ điểm" },
    { icon: Target, title: "Trợ từ", count: "15 chủ điểm" },
    { icon: Sliders, title: "Tính từ và trạng từ", count: "8 chủ điểm" },
    { icon: HelpCircle, title: "Câu điều kiện", count: "6 chủ điểm" },
    { icon: Lightbulb, title: "Câu giả định", count: "5 chủ điểm" },
  ];

  return (
    <div className="bg-[#FFFDF9] border border-[#EFE5DA] rounded-2xl p-4.5 shadow-2xs space-y-3.5">
      <h3 className="text-[11px] font-extrabold font-sans text-[#76685F] uppercase tracking-wider px-1">
        Chủ đề ngữ pháp phổ biến
      </h3>

      <div className="space-y-2">
        {topics.map((topic, idx) => {
          const IconComp = topic.icon;
          return (
            <div
              key={idx}
              className="p-2.5 bg-[#FAF7F2] hover:bg-[#FFFDF9] rounded-xl border border-[#EFE5DA] hover:border-[#C65D4B]/30 transition-all duration-200 cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FFFDF9] text-[#C65D4B] border border-[#EFE5DA] group-hover:bg-[#C65D4B] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <IconComp className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold font-sans text-[#2B211D] group-hover:text-[#C65D4B] transition-colors leading-tight">
                  {topic.title}
                </p>
                <p className="text-[10px] font-sans text-[#76685F] font-medium">{topic.count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
