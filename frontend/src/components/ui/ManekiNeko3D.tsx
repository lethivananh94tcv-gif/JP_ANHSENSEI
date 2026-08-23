"use client";

import React from "react";
import { motion } from "framer-motion";

interface ManekiNeko3DProps {
  onClick?: () => void;
  className?: string;
  bubbleText?: string;
}

export default function ManekiNeko3D({
  onClick,
  className = "",
  bubbleText = "Mèo có quà cho bạn 🐱",
}: ManekiNeko3DProps) {
  return (
    <div
      onClick={onClick}
      title="Bấm vào Mèo Thần Tài để Rút Quẻ May Mắn Mỗi Ngày! 🐾"
      className={`relative cursor-pointer group flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Speech Bubble Above Cat */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-2 bg-white/95 backdrop-blur-xs border border-[#E3D4C7] px-3.5 py-1.5 rounded-full shadow-2xs text-xs font-bold text-[#56423E] flex items-center gap-1.5 relative z-20 whitespace-nowrap"
      >
        <span>{bubbleText}</span>
        {/* Tail pointing down */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#E3D4C7] rotate-45" />
      </motion.div>

      {/* Cute Round Cat Card Container matching Japanese aesthetic */}
      <motion.div
        whileHover={{ scale: 1.06, rotate: 2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="w-24 h-24 sm:w-28 sm:h-28 bg-[#FFFDF9] border-2 border-[#E8DCCF] group-hover:border-[#D66552] rounded-3xl p-2.5 shadow-md flex items-center justify-center relative bg-gradient-to-b from-[#FFFDF9] to-[#FAF3EB] transition-colors"
      >
        <svg
          className="w-full h-full text-[#6E524A] relative z-10 filter drop-shadow-xs"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cat Ears */}
          <polygon points="32,42 45,18 55,40" fill="#D66552" stroke="#6E524A" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="88,42 75,18 65,40" fill="#D66552" stroke="#6E524A" strokeWidth="3" strokeLinejoin="round" />

          {/* Cat Head */}
          <circle cx="60" cy="65" r="38" fill="#FFFDF9" stroke="#6E524A" strokeWidth="3.5" />

          {/* Eyes (Black Cute Ovals) */}
          <ellipse cx="46" cy="60" rx="3.5" ry="5.5" fill="#2C201D" />
          <ellipse cx="74" cy="60" rx="3.5" ry="5.5" fill="#2C201D" />

          {/* Cheeks (Soft Pink Blush) */}
          <ellipse cx="38" cy="68" rx="6" ry="3.5" fill="#F4B4A8" opacity="0.85" />
          <ellipse cx="82" cy="68" rx="6" ry="3.5" fill="#F4B4A8" opacity="0.85" />

          {/* Nose (Small Pink Triangle) */}
          <polygon points="60,65 57,62 63,62" fill="#D66552" />

          {/* Mouth (Happy Smile) */}
          <path d="M54 70 Q60 76 66 70" stroke="#6E524A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Whiskers (3 on each side) */}
          <line x1="22" y1="60" x2="36" y2="62" stroke="#6E524A" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="67" x2="35" y2="67" stroke="#6E524A" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="74" x2="36" y2="72" stroke="#6E524A" strokeWidth="2" strokeLinecap="round" />

          <line x1="98" y1="60" x2="84" y2="62" stroke="#6E524A" strokeWidth="2" strokeLinecap="round" />
          <line x1="100" y1="67" x2="85" y2="67" stroke="#6E524A" strokeWidth="2" strokeLinecap="round" />
          <line x1="98" y1="74" x2="84" y2="72" stroke="#6E524A" strokeWidth="2" strokeLinecap="round" />

          {/* Small White Card Held at Bottom Right with Red Border & Hiragana あ */}
          <rect x="70" y="72" width="34" height="26" rx="6" fill="#FFFDF9" stroke="#D66552" strokeWidth="2.5" transform="rotate(-6 70 72)" />
          <text x="77" y="90" fill="#D66552" fontSize="15" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-6 70 72)">あ</text>
        </svg>
      </motion.div>
    </div>
  );
}
