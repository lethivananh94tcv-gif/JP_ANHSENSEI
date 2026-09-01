"use client";

import { useState } from "react";
import { LevelItem } from "./types";
import { Bookmark, BookOpen, Star, Headphones, ArrowRight, Flower2, Leaf, Mountain } from "lucide-react";
import { motion } from "framer-motion";
import N3NoticeModal from "@/components/shared/N3NoticeModal";

interface LevelSelectorProps {
  levels: LevelItem[];
  selectedLevelCode: string;
  targetLevel?: string;
  onSelectLevel: (levelCode: string) => void;
}

export default function LevelSelector({
  levels,
  selectedLevelCode,
  targetLevel,
  onSelectLevel,
}: LevelSelectorProps) {
  const [showN3Notice, setShowN3Notice] = useState(false);

  if (levels.length === 0) {
    return (
      <div className="p-4 bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl text-center text-xs font-semibold text-[#76655A]">
        Cấp độ này chưa có bài học được xuất bản.
      </div>
    );
  }

  const levelConfigs: Record<string, {
    code: string;
    subTitle: string;
    ribbonBg: string;
    themeColor: string;
    accentColor: string;
    activeBorder: string;
    btnBg: string;
    targetAudience: string;
    bullets: { icon: "book" | "star" | "headphones"; text: string }[];
  }> = {
    N5: {
      code: "N5",
      subTitle: "Cơ bản",
      ribbonBg: "bg-[#D66552]",
      themeColor: "text-[#D66552]",
      accentColor: "#D66552",
      activeBorder: "border-2 border-[#D66552] ring-2 ring-[#D66552]/15 shadow-md",
      btnBg: "bg-[#D66552]",
      targetAudience: "Dành cho người mới bắt đầu",
      bullets: [
        { icon: "book", text: "Học 800+ từ vựng cơ bản" },
        { icon: "star", text: "Chủ đề gần gũi, dễ hiểu" },
        { icon: "headphones", text: "Có phát âm & ví dụ minh họa" },
      ],
    },
    N4: {
      code: "N4",
      subTitle: "Sơ cấp",
      ribbonBg: "bg-[#C59B6C]",
      themeColor: "text-[#C59B6C]",
      accentColor: "#C59B6C",
      activeBorder: "border-2 border-[#C59B6C] ring-2 ring-[#C59B6C]/15 shadow-md",
      btnBg: "bg-[#C59B6C]",
      targetAudience: "Dành cho người đã có nền tảng",
      bullets: [
        { icon: "book", text: "Học 1,500+ từ vựng nâng cao" },
        { icon: "star", text: "Chủ đề đa dạng, thực tế" },
        { icon: "headphones", text: "Có phát âm & ví dụ minh họa" },
      ],
    },
    N3: {
      code: "N3",
      subTitle: "Nâng cao",
      ribbonBg: "bg-[#698B6E]",
      themeColor: "text-[#698B6E]",
      accentColor: "#698B6E",
      activeBorder: "border-2 border-[#698B6E] ring-2 ring-[#698B6E]/15 shadow-md",
      btnBg: "bg-[#698B6E]",
      targetAudience: "Dành cho người muốn nâng cao",
      bullets: [
        { icon: "book", text: "Học 2,000+ từ vựng học thuật" },
        { icon: "star", text: "Chủ đề học thuật, chuyên sâu" },
        { icon: "headphones", text: "Có phát âm & ví dụ minh họa" },
      ],
    },
  };

  return (
    <section aria-label="Khung chọn trình độ học" className="w-full select-none relative">
      <N3NoticeModal
        isOpen={showN3Notice}
        onClose={() => setShowN3Notice(false)}
        contentType="từ vựng"
      />

      {/* Floating Corner Ornaments matching screenshot sample */}
      <div className="absolute -top-3 -left-2 z-20 pointer-events-none">
        <span className="text-xl sm:text-2xl animate-bounce-slow drop-shadow-xs">🌸</span>
      </div>
      <div className="absolute -bottom-3 -right-2 z-20 pointer-events-none">
        <span className="text-xl sm:text-2xl animate-pulse drop-shadow-xs">✨</span>
      </div>

      {/* Outer Card Container with Dotted Grid Pattern & Warm Cream Tint */}
      <div className="bg-[#FFFDF9] bg-[radial-gradient(#E5D7C7_1.2px,transparent_1.2px)] [background-size:18px_18px] border-2 border-[#E5D7C7] rounded-3xl p-5 sm:p-7 shadow-md space-y-6 relative overflow-hidden">
        
        {/* Rich Japanese Landscape Scenic Watermark SVG (Mount Fuji + Red Sun + Torii Gate + Sakura Branch) */}
        <div className="absolute right-0 top-0 bottom-0 w-96 pointer-events-none opacity-30 hidden md:block z-0">
          <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
            {/* Red Sun */}
            <circle cx="180" cy="40" r="28" fill="#FAD4CE" opacity="0.6" />
            {/* Mount Fuji */}
            <path d="M130 110 L180 50 L230 110 Z" fill="#E5D7C7" opacity="0.5" />
            <path d="M165 68 L180 50 L195 68 Q180 64 165 68 Z" fill="#FFFDF9" opacity="0.8" />
            {/* Torii Gate */}
            <path d="M70 110 H120 M78 110 V70 M112 110 V70 M72 65 H118 M68 58 H122 L120 62 H70 Z" fill="#C65D4B" opacity="0.35" />
          </svg>
        </div>

        {/* Section Header Strip with Japanese Stamp Pill Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10 border-b border-[#E5D7C7]/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C65D4B] text-white flex items-center justify-center shrink-0 shadow-sm border border-white/20">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#1F1714]">
                Chọn trình độ học
              </h3>
              <p className="text-xs text-[#76655A] font-medium">
                Bắt đầu hành trình học từ vựng phù hợp với trình độ của bạn
              </p>
            </div>
          </div>

          {/* Japanese Stamp Badge Pill */}
          <div className="flex items-center gap-2 bg-[#FAF4EB] border border-[#E5D7C7] px-3.5 py-1.5 rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C65D4B] animate-ping" />
            <span className="text-xs font-jp font-extrabold text-[#C65D4B]">日本語・語彙</span>
            <span className="text-[10px] font-extrabold tracking-wider text-[#8B786D] border-l border-[#E5D7C7] pl-2 uppercase">ANH SENSEI</span>
          </div>
        </div>

        {/* 3 Level Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 relative z-10">
          {levels.map((lvl) => {
            const code = lvl.code.toUpperCase();
            const isSelected = code === selectedLevelCode.toUpperCase();
            const cfg = levelConfigs[code] || levelConfigs.N5;

            return (
              <motion.div
                key={lvl.levelId}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (code === "N3") {
                    setShowN3Notice(true);
                    return;
                  }
                  onSelectLevel(lvl.code);
                }}
                className={`relative bg-[#FFFDF9] bg-[radial-gradient(#E5D7C7_1px,transparent_1px)] [background-size:14px_14px] rounded-3xl p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between overflow-hidden border shadow-sm ${
                  isSelected
                    ? cfg.activeBorder
                    : "border-[#E5D7C7] hover:border-[#C65D4B]/50 hover:bg-[#FAF4EB]/60"
                }`}
              >

                {/* Corner Sakura / Leaf / Fuji Floating Watermark */}
                <div className="absolute top-2 right-2 text-xs opacity-40 pointer-events-none">
                  {code === "N5" && "🌸"}
                  {code === "N4" && "🍃"}
                  {code === "N3" && "🗻"}
                </div>

                {/* Ribbon Tag Top Left - Larger Ribbon & Icon */}
                <div
                  className={`absolute top-0 left-5 ${cfg.ribbonBg} text-white w-9 h-11 rounded-b-lg shadow-sm flex items-center justify-center z-20`}
                >
                  {code === "N5" && <Flower2 className="w-5 h-5 fill-white/30" />}
                  {code === "N4" && <Leaf className="w-5 h-5 fill-white/30" />}
                  {code === "N3" && <Mountain className="w-5 h-5 fill-white/30" />}
                </div>

                {/* Main Content Area */}
                <div className="space-y-4 pt-4">
                  {/* Title & Mascot Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 pt-1">
                      <span className="text-xs font-bold text-[#8B786D] block">
                        Trình độ
                      </span>
                      <h4 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${cfg.themeColor}`}>
                        {cfg.code}
                      </h4>
                      <span className={`text-xs sm:text-sm font-extrabold block ${cfg.themeColor}`}>
                        {cfg.subTitle}
                      </span>
                    </div>

                    {/* Prominent Cute Mascot Graphic with Glow Backdrop */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                      {/* Glow Backdrop */}
                      <div
                        className={`absolute inset-0 rounded-full blur-xs opacity-60 ${
                          code === "N5" ? "bg-[#FDF0EE]" : code === "N4" ? "bg-[#FAF0D9]" : "bg-[#EAF3EC]"
                        }`}
                      />
                      {code === "N5" && (
                        /* Maneki Neko Cat Mascot */
                        <svg className="w-full h-full filter drop-shadow-sm" viewBox="0 0 80 80" fill="none">
                          <ellipse cx="40" cy="46" rx="22" ry="20" fill="#FFFDF9" stroke="#1F1714" strokeWidth="2" />
                          <path d="M22 30 L30 12 L38 28 Z" fill="#D66552" stroke="#1F1714" strokeWidth="1.5" />
                          <path d="M58 30 L50 12 L42 28 Z" fill="#D66552" stroke="#1F1714" strokeWidth="1.5" />
                          <ellipse cx="28" cy="40" rx="3.5" ry="2.5" fill="#F5D5D0" />
                          <ellipse cx="52" cy="40" rx="3.5" ry="2.5" fill="#F5D5D0" />
                          <path d="M30 38 Q36 32 38 38" stroke="#1F1714" strokeWidth="2" strokeLinecap="round" fill="none" />
                          <path d="M50 38 Q44 32 42 38" stroke="#1F1714" strokeWidth="2" strokeLinecap="round" fill="none" />
                          <polygon points="40,41 37,39 43,39" fill="#D66552" />
                          <path d="M36 44 Q40 48 44 44" stroke="#1F1714" strokeWidth="2" fill="none" />
                          {/* Coin & Paw */}
                          <rect x="44" y="42" width="16" height="22" rx="3" fill="#E8B036" stroke="#1F1714" strokeWidth="1.5" transform="rotate(-15 44 42)" />
                          <text x="48" y="56" fill="#1F1714" fontSize="8" fontWeight="bold" transform="rotate(-10 48 56)">千万両</text>
                          {/* Raised Paw */}
                          <ellipse cx="28" cy="48" rx="5" ry="7" fill="#FFFDF9" stroke="#1F1714" strokeWidth="1.5" />
                        </svg>
                      )}

                      {code === "N4" && (
                        /* Daruma Doll Mascot */
                        <svg className="w-full h-full filter drop-shadow-sm" viewBox="0 0 80 80" fill="none">
                          <ellipse cx="40" cy="44" rx="24" ry="26" fill="#C59B6C" stroke="#1F1714" strokeWidth="2" />
                          <ellipse cx="40" cy="40" rx="16" ry="16" fill="#FFFDF9" stroke="#1F1714" strokeWidth="1.5" />
                          <circle cx="33" cy="38" r="4" fill="#1F1714" />
                          <circle cx="47" cy="38" r="4" fill="#1F1714" />
                          <path d="M30 30 L36 33 M50 30 L44 33" stroke="#1F1714" strokeWidth="2" />
                          <path d="M34 46 Q40 50 46 46" stroke="#1F1714" strokeWidth="2" fill="none" />
                          <text x="34" y="60" fill="#FFFDF9" fontSize="12" fontWeight="bold">福</text>
                        </svg>
                      )}

                      {code === "N3" && (
                        /* Japanese Pagoda Temple Mascot */
                        <svg className="w-full h-full filter drop-shadow-sm" viewBox="0 0 80 80" fill="none">
                          <path d="M25 65 H55 V25 H25 Z" fill="#698B6E" />
                          <path d="M18 55 Q40 48 62 55 L58 60 H22 Z" fill="#3D5A42" stroke="#1F1714" strokeWidth="1.5" />
                          <path d="M22 42 Q40 35 58 42 L54 46 H26 Z" fill="#3D5A42" stroke="#1F1714" strokeWidth="1.5" />
                          <path d="M26 30 Q40 23 54 30 L50 34 H30 Z" fill="#3D5A42" stroke="#1F1714" strokeWidth="1.5" />
                          <path d="M30 18 Q40 12 50 18 L46 22 H34 Z" fill="#3D5A42" stroke="#1F1714" strokeWidth="1.5" />
                          <line x1="40" y1="6" x2="40" y2="15" stroke="#1F1714" strokeWidth="2.5" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Target Audience Text */}
                  <p className="text-xs sm:text-sm font-semibold text-[#76655A] border-b border-[#E5D7C7]/60 pb-2.5">
                    {cfg.targetAudience}
                  </p>

                  {/* Feature Rows with Larger Prominent Icons (w-5 h-5) */}
                  <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#52443C]">
                    {cfg.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        {b.icon === "book" && <BookOpen className={`w-5 h-5 shrink-0 ${cfg.themeColor}`} />}
                        {b.icon === "star" && <Star className={`w-5 h-5 shrink-0 ${cfg.themeColor}`} />}
                        {b.icon === "headphones" && <Headphones className={`w-5 h-5 shrink-0 ${cfg.themeColor}`} />}
                        <span className="truncate">{b.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Circle Arrow Button - Larger (w-10 h-10 sm:w-11 sm:h-11) */}
                <div className="pt-5 flex items-center justify-end">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${cfg.btnBg} text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110`}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
