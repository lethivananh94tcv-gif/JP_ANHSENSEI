"use client";

import React from "react";
import { motion } from "framer-motion";

interface ManekiNeko3DProps {
  onClick?: () => void;
  className?: string;
}

export default function ManekiNeko3D({ onClick, className = "" }: ManekiNeko3DProps) {
  return (
    <div
      onClick={onClick}
      title="Bấm vào Chú Mèo Thần Tài để Rút Quẻ May Mắn Mỗi Ngày! 🐾"
      className={`relative cursor-pointer group flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Floating Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/25 to-amber-200/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />

      {/* 3D Lucky Cat Maneki-Neko Graphic */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-16 h-20 sm:w-20 sm:h-24 z-10 filter drop-shadow-xl group-hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 200 240" className="w-full h-full">
          <defs>
            {/* 3D Metallic Gold Gradient */}
            <linearGradient id="catGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A1" />
              <stop offset="50%" stopColor="#F5B800" />
              <stop offset="100%" stopColor="#C48800" />
            </linearGradient>

            {/* 3D Cat Body White/Cream Gradient */}
            <linearGradient id="catBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFFDF5" />
              <stop offset="100%" stopColor="#F5EFE0" />
            </linearGradient>

            {/* Red Collar Gradient */}
            <linearGradient id="collarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E53935" />
              <stop offset="100%" stopColor="#C62828" />
            </linearGradient>
          </defs>

          {/* Cat Ears */}
          <path d="M 50 70 L 20 20 L 80 40 Z" fill="url(#catBodyGrad)" stroke="#E0C090" strokeWidth="3" />
          <path d="M 35 55 L 25 30 L 65 42 Z" fill="#FF8A80" />
          <path d="M 150 70 L 180 20 L 120 40 Z" fill="url(#catBodyGrad)" stroke="#E0C090" strokeWidth="3" />
          <path d="M 165 55 L 175 30 L 135 42 Z" fill="#FF8A80" />

          {/* Cat Head */}
          <ellipse cx="100" cy="85" rx="75" ry="60" fill="url(#catBodyGrad)" stroke="#E0C090" strokeWidth="4" />

          {/* Eyes (Happy Closed Archs) */}
          <path d="M 55 75 Q 70 60 85 75" fill="none" stroke="#3E2723" strokeWidth="6" strokeLinecap="round" />
          <path d="M 115 75 Q 130 60 145 75" fill="none" stroke="#3E2723" strokeWidth="6" strokeLinecap="round" />

          {/* Cheeks (Pink Blush) */}
          <circle cx="50" cy="95" r="12" fill="#FFCDD2" opacity="0.8" />
          <circle cx="150" cy="95" r="12" fill="#FFCDD2" opacity="0.8" />

          {/* Cat Nose & Mouth */}
          <polygon points="95,90 105,90 100,96" fill="#FF8A80" />
          <path d="M 100 96 Q 90 110 80 102 M 100 96 Q 110 110 120 102" fill="none" stroke="#3E2723" strokeWidth="4" strokeLinecap="round" />

          {/* Whiskers */}
          <line x1="25" y1="80" x2="5" y2="75" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="92" x2="5" y2="92" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
          <line x1="175" y1="80" x2="195" y2="75" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
          <line x1="175" y1="92" x2="195" y2="92" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />

          {/* Cat Body */}
          <path d="M 40 125 C 30 210, 170 210, 160 125 Z" fill="url(#catBodyGrad)" stroke="#E0C090" strokeWidth="4" />

          {/* Red Collar & Golden Bell */}
          <path d="M 45 130 Q 100 150 155 130" fill="none" stroke="url(#collarGrad)" strokeWidth="14" strokeLinecap="round" />
          <circle cx="100" cy="145" r="14" fill="url(#catGoldGrad)" stroke="#B78100" strokeWidth="2" />
          <circle cx="100" cy="148" r="3" fill="#3E2723" />

          {/* Japanese Gold Koban Coin in Left Paw (千万両) */}
          <g transform="translate(115, 140) rotate(-10)">
            <rect x="0" y="0" width="48" height="65" rx="20" fill="url(#catGoldGrad)" stroke="#B78100" strokeWidth="3" />
            <text x="24" y="28" textAnchor="middle" fill="#5D4037" fontSize="14" fontWeight="bold" fontFamily="serif">千</text>
            <text x="24" y="48" textAnchor="middle" fill="#5D4037" fontSize="14" fontWeight="bold" fontFamily="serif">万</text>
          </g>

          {/* Waving Right Paw */}
          <g className="origin-bottom-left">
            <motion.g
              animate={{ rotate: [0, -22, 0, -22, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "45px 140px" }}
            >
              <path d="M 30 145 C 10 110, 25 60, 50 60 C 65 60, 60 100, 55 140 Z" fill="url(#catBodyGrad)" stroke="#E0C090" strokeWidth="4" />
              <circle cx="45" cy="65" r="14" fill="url(#catBodyGrad)" stroke="#E0C090" strokeWidth="3" />
              <circle cx="45" cy="65" r="6" fill="#FF8A80" />
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
