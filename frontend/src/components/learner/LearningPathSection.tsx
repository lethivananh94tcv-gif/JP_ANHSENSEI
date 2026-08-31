"use client";

import { LevelSummary } from "@/types/learner";
import { ArrowRight, Lock, Check } from "lucide-react";

interface LearningPathSectionProps {
  levels: LevelSummary[];
}

export default function LearningPathSection({ levels }: LearningPathSectionProps) {
  const defaultLevelsConfig = [
    { code: "N5", name: "JLPT N5", desc: "Chứng Nhập Môn", defaultId: 1, isLocked: false, isCurrent: true, color: "bg-[#C65D4B] text-white" },
    { code: "N4", name: "JLPT N4", desc: "Chứng Sơ Cấp", defaultId: 2, isLocked: false, isCurrent: false, color: "bg-[#3D2C26] text-white" },
    { code: "N3", name: "JLPT N3", desc: "Chứng Trung Cấp", defaultId: 3, isLocked: false, isCurrent: false, color: "bg-[#231917] text-white" },
    { code: "N2", name: "JLPT N2", desc: "Chứng Nâng Cao", defaultId: 4, isLocked: true, isCurrent: false, color: "bg-gray-200 text-gray-400" },
    { code: "N1", name: "JLPT N1", desc: "Chứng Thượng Cấp", defaultId: 5, isLocked: true, isCurrent: false, color: "bg-gray-200 text-gray-400" },
  ];

  return (
    <section className="space-y-4 bg-white border-2 border-[#F2DDD4] rounded-3xl p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">⛩️</span>
          <h2 className="text-xl sm:text-2xl font-black text-[#2C201D]">
            Con đường chinh phục JLPT
          </h2>
        </div>

        <div className="text-xs font-bold text-[#76685F] bg-[#FFF8F5] px-4 py-2 rounded-xl border border-[#F2DDD4] inline-flex items-center gap-1.5 select-none cursor-default">
          <span>Xem lộ trình chi tiết</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-60" />
        </div>
      </div>

      {/* Level Cards Track (Decorative static cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
        {defaultLevelsConfig.map((lvl) => {
          if (lvl.isLocked) {
            return (
              <div
                key={lvl.code}
                className="bg-[#FAF3EB]/50 border-2 border-[#EAD0C7]/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 relative opacity-60 select-none cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-gray-200 text-gray-500 font-black text-sm flex items-center justify-center">
                    {lvl.code}
                  </span>
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-500">{lvl.name}</h3>
                  <p className="text-xs text-gray-400 font-semibold">{lvl.desc}</p>
                </div>
              </div>
            );
          }

          return (
            <div
              key={lvl.code}
              className={`rounded-2xl p-4 flex flex-col justify-between space-y-3 relative border-2 shadow-sm select-none cursor-default ${
                lvl.isCurrent
                  ? "bg-[#FFF5F2] border-[#C65D4B] ring-2 ring-[#C65D4B]/20"
                  : "bg-white border-[#EAD0C7]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center ${lvl.color}`}>
                  {lvl.code}
                </span>

                {lvl.isCurrent && (
                  <div className="w-6 h-6 rounded-full bg-[#C65D4B] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-black text-[#2C201D]">{lvl.name}</h3>
                <p className="text-xs text-[#76685F] font-semibold">{lvl.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
