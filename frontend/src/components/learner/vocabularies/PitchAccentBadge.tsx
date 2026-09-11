"use client";

import React from "react";

export type PitchPattern = "atamadaka" | "nakadaka" | "odaka" | "heiban" | "head_high" | "middle_high" | "tail_high" | "flat";

interface PitchAccentBadgeProps {
  pattern: PitchPattern | string;
  word?: string;
  size?: "sm" | "md" | "lg";
  showCurve?: boolean;
}

export default function PitchAccentBadge({
  pattern,
  word,
  size = "md",
  showCurve = true,
}: PitchAccentBadgeProps) {
  const normPattern = pattern.toLowerCase();

  let typeName = "平板 (Heiban)";
  let badgeBg = "bg-amber-50 text-amber-800 border-amber-200";
  let dotColor = "#d97706";
  let pitchCurve: ("H" | "L")[] = ["L", "H", "H"];

  if (normPattern.includes("atama") || normPattern.includes("head") || normPattern === "1") {
    typeName = "🔴 頭高 (Đầu cao)";
    badgeBg = "bg-rose-50 text-rose-700 border-rose-200";
    dotColor = "#e11d48";
    pitchCurve = ["H", "L", "L"];
  } else if (normPattern.includes("naka") || normPattern.includes("middle") || normPattern === "2") {
    typeName = "🟢 中高 (Giữa cao)";
    badgeBg = "bg-emerald-50 text-emerald-700 border-emerald-200";
    dotColor = "#059669";
    pitchCurve = ["L", "H", "L"];
  } else if (normPattern.includes("odaka") || normPattern.includes("tail") || normPattern === "3") {
    typeName = "🔵 尾高 (Cuối cao)";
    badgeBg = "bg-sky-50 text-sky-700 border-sky-200";
    dotColor = "#0284c7";
    pitchCurve = ["L", "H", "H"];
  } else {
    // Default Heiban
    typeName = "⚪ 平板 (Bằng phẳng)";
    badgeBg = "bg-amber-50 text-amber-800 border-amber-200";
    dotColor = "#d97706";
    pitchCurve = ["L", "H", "H"];
  }

  const isSmall = size === "sm";

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`font-black rounded-xl border px-2 py-0.5 shadow-2xs inline-flex items-center gap-1 ${badgeBg} ${
          isSmall ? "text-[10px]" : "text-xs"
        }`}
      >
        {typeName}
      </span>

      {showCurve && (
        <div className="flex items-center gap-0.5 bg-white/80 backdrop-blur-xs px-2 py-1 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-600 mr-1">Pitch:</span>
          <svg width="36" height="16" viewBox="0 0 36 16" className="overflow-visible">
            {/* High level guide line */}
            <line x1="0" y1="4" x2="36" y2="4" stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="1" />
            {/* Low level guide line */}
            <line x1="0" y1="12" x2="36" y2="12" stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="1" />

            {/* Connecting curve */}
            <polyline
              points={`6,${pitchCurve[0] === "H" ? 4 : 12} 18,${
                pitchCurve[1] === "H" ? 4 : 12
              } 30,${pitchCurve[2] === "H" ? 4 : 12}`}
              fill="none"
              stroke={dotColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pitch Dots */}
            <circle cx="6" cy={pitchCurve[0] === "H" ? 4 : 12} r="2.5" fill={dotColor} />
            <circle cx="18" cy={pitchCurve[1] === "H" ? 4 : 12} r="2.5" fill={dotColor} />
            <circle cx="30" cy={pitchCurve[2] === "H" ? 4 : 12} r="2.5" fill={dotColor} />
          </svg>
        </div>
      )}
    </div>
  );
}
