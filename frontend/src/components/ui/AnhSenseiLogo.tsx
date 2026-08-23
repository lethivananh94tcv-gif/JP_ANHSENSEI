"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnhSenseiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function AnhSenseiLogo({ className = "", size = "md" }: AnhSenseiLogoProps) {
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }[size];

  return (
    <motion.div
      whileHover={{ scale: 1.12, rotate: [0, -8, 8, 0] }}
      transition={{
        scale: { type: "spring", stiffness: 450, damping: 15 },
        rotate: { duration: 0.4, ease: "easeInOut" },
      }}
      className={`relative ${dimensions} rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED0C5] shadow-md flex items-center justify-center p-1 overflow-hidden select-none shrink-0 ${className}`}
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
  );
}
