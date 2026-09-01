"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import N3NoticeModal from "@/components/shared/N3NoticeModal";

interface GrammarLevelSelectorProps {
  selectedLevelCode: string;
  onSelectLevel: (levelCode: string) => void;
}

const LEVEL_CONFIGS = [
  { code: "N5", name: "Sơ Cấp N5", count: "25 Bài" },
  { code: "N4", name: "Sơ Cấp N4", count: "25 Bài" },
  { code: "N3", name: "Trung Cấp N3", count: "Chờ nâng cấp" },
  { code: "N2", name: "Cao Cấp N2", count: "Chờ cập nhật" },
  { code: "N1", name: "Thượng Cấp N1", count: "Chờ cập nhật" },
];

export default function GrammarLevelSelector({
  selectedLevelCode,
  onSelectLevel,
}: GrammarLevelSelectorProps) {
  const [showN3Notice, setShowN3Notice] = useState(false);

  return (
    <section className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-4 sm:p-5 shadow-2xs space-y-3">
      <N3NoticeModal
        isOpen={showN3Notice}
        onClose={() => setShowN3Notice(false)}
        contentType="ngữ pháp"
      />

      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-extrabold text-[#76685F] uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-[#C65D4B]" />
          <span>Chọn Trình Độ Ngữ Pháp (JLPT Level)</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {LEVEL_CONFIGS.map((lvl) => {
          const isSelected = selectedLevelCode.toUpperCase() === lvl.code.toUpperCase();
          return (
            <button
              key={lvl.code}
              type="button"
              onClick={() => {
                if (["N3", "N2", "N1"].includes(lvl.code.toUpperCase())) {
                  setShowN3Notice(true);
                  return;
                }
                onSelectLevel(lvl.code);
              }}
              className={`p-3 rounded-2xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center space-y-1 ${
                isSelected
                  ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md scale-102 font-bold"
                  : "bg-[#FAF6EE] hover:bg-white text-[#231917] border-[#DED3C8] hover:border-[#C65D4B]/60"
              }`}
            >
              <span className="text-sm font-serif font-black">{lvl.code}</span>
              <span className="text-[11px] opacity-90">{lvl.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-white/20 text-white font-bold" : "bg-[#FFFDF9] text-[#76685F] border border-[#DED3C8]"
                }`}
              >
                {lvl.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

