"use client";

import React from "react";
import { motion } from "framer-motion";

interface PostmanNeko3DProps {
  onClick?: () => void;
  className?: string;
  bubbleText?: string;
  isJumping?: boolean;
}

export default function PostmanNeko3D({
  onClick,
  className = "",
  bubbleText = "Mèo đưa thư nè! 🐾 ✉️",
  isJumping = true,
}: PostmanNeko3DProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={
        isJumping
          ? { y: [0, -9, 0, -4, 0], rotate: [0, -4, 4, -2, 2, 0] }
          : { y: 0, rotate: 0 }
      }
      transition={
        isJumping
          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
      onClick={onClick}
      title="Mèo Đưa Thư mang Bức Thư Tâm Sự & Lộ Trình 6 Bước từ Anh Sensei 📮🐾"
      className={`relative cursor-pointer group flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Glowing Pulsing Aura Behind Cat when Jumping */}
      {isJumping && (
        <div className="absolute inset-0 top-3 bg-gradient-to-tr from-[#FF7A63]/40 via-[#FFB5A7]/50 to-[#FF6B52]/40 rounded-full blur-xl animate-pulse pointer-events-none scale-125 z-0" />
      )}

      {/* 1. Animated Speech Bubble Above Cat */}
      <motion.div
        initial={{ y: 0 }}
        animate={isJumping ? { y: [0, -3, 0] } : { y: 0 }}
        transition={
          isJumping
            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className="mb-1 bg-gradient-to-r from-[#C65D4B] via-[#E06653] to-[#B04F3F] text-white border-2 border-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 relative z-30 whitespace-nowrap group-hover:scale-105 transition-transform"
      >
        {isJumping && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
        <span>{bubbleText}</span>
        {/* Tail pointing down */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C65D4B] border-r-2 border-b-2 border-white rotate-45" />
      </motion.div>

      {/* 2. Full Body 3D Postman Cat Container */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        className="w-20 h-24 sm:w-24 sm:h-28 relative flex items-center justify-center filter drop-shadow-xl z-10"
      >
        <svg
          className="w-full h-full text-[#2C201D] relative z-10"
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft 3D Gradients for Body & Shading */}
            <linearGradient id="catBodyGrad" x1="70" y1="40" x2="70" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="70%" stopColor="#FFF5EC" />
              <stop offset="100%" stopColor="#F5E4D5" />
            </linearGradient>

            <linearGradient id="catEarPink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF9B8B" />
              <stop offset="100%" stopColor="#E65840" />
            </linearGradient>

            <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A87455" />
              <stop offset="100%" stopColor="#754E37" />
            </linearGradient>

            <linearGradient id="hatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D3748" />
              <stop offset="100%" stopColor="#1A202C" />
            </linearGradient>

            <linearGradient id="envelopeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFF5F2" />
            </linearGradient>

            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2C201D" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Tail Wagging Behind */}
          <path
            d="M 105 125 C 130 115, 135 90, 120 80 C 110 75, 105 85, 112 95 C 118 105, 105 118, 98 122"
            fill="none"
            stroke="#2C201D"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 105 125 C 130 115, 135 90, 120 80 C 110 75, 105 85, 112 95 C 118 105, 105 118, 98 122"
            fill="none"
            stroke="#FFF5EC"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Cat Ears */}
          <g filter="url(#softShadow)">
            <polygon points="32,48 46,20 58,44" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="37,44 46,25 54,42" fill="url(#catEarPink)" />

            <polygon points="108,48 94,20 82,44" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="103,44 94,25 86,42" fill="url(#catEarPink)" />
          </g>

          {/* Full Body Torso (Sitting Belly) */}
          <ellipse cx="70" cy="115" rx="36" ry="32" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="4" filter="url(#softShadow)" />
          {/* White Belly Patch */}
          <ellipse cx="70" cy="118" rx="24" ry="20" fill="#FFFFFF" opacity="0.9" />

          {/* Paws Sitting on Bottom (Feet) */}
          <ellipse cx="48" cy="142" rx="10" ry="7" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="3.5" />
          <ellipse cx="92" cy="142" rx="10" ry="7" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="3.5" />

          {/* Cat Head */}
          <circle cx="70" cy="65" r="38" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="4" filter="url(#softShadow)" />

          {/* Japanese Postman Cap / Hat */}
          <g filter="url(#softShadow)">
            {/* Hat Crown */}
            <path d="M 44 32 C 44 18, 96 18, 96 32 Z" fill="url(#hatGrad)" stroke="#2C201D" strokeWidth="3" />
            {/* Red Ribbon Band */}
            <path d="M 41 32 C 41 32, 70 34, 99 32 L 98 37 C 98 37, 70 39, 42 37 Z" fill="#C65D4B" stroke="#2C201D" strokeWidth="2" />
            {/* Hat Visor / Brim */}
            <path d="M 38 35 Q 70 44 102 35 L 98 38 Q 70 46 42 38 Z" fill="#1A202C" stroke="#2C201D" strokeWidth="2" />
            {/* Gold Post Emblem Badge */}
            <circle cx="70" cy="27" r="5" fill="#FACC15" stroke="#2C201D" strokeWidth="1.5" />
            <text x="70" y="29.5" fill="#1A202C" fontSize="6" fontWeight="bold" textAnchor="middle">〒</text>
          </g>

          {/* Cute Cat Eyes (Shiny Black with Double Sparkle) */}
          <g>
            <ellipse cx="54" cy="60" rx="4.5" ry="6.5" fill="#2C201D" />
            <circle cx="52.5" cy="58" r="2" fill="#FFFFFF" />
            <circle cx="55.5" cy="62" r="1" fill="#FFFFFF" />

            <ellipse cx="86" cy="60" rx="4.5" ry="6.5" fill="#2C201D" />
            <circle cx="84.5" cy="58" r="2" fill="#FFFFFF" />
            <circle cx="87.5" cy="62" r="1" fill="#FFFFFF" />
          </g>

          {/* Soft Pink Blush Cheeks */}
          <ellipse cx="44" cy="68" rx="6.5" ry="4" fill="#F4B4A8" opacity="0.9" />
          <ellipse cx="96" cy="68" rx="6.5" ry="4" fill="#F4B4A8" opacity="0.9" />

          {/* Nose & Mouth */}
          <polygon points="70,64 66,61 74,61" fill="#C65D4B" />
          <path d="M 62 69 Q 70 76 78 69" stroke="#2C201D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Whiskers */}
          <line x1="28" y1="58" x2="42" y2="61" stroke="#2C201D" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="66" x2="41" y2="66" stroke="#2C201D" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="74" x2="42" y2="71" stroke="#2C201D" strokeWidth="2" strokeLinecap="round" />

          <line x1="112" y1="58" x2="98" y2="61" stroke="#2C201D" strokeWidth="2" strokeLinecap="round" />
          <line x1="114" y1="66" x2="99" y2="66" stroke="#2C201D" strokeWidth="2" strokeLinecap="round" />
          <line x1="112" y1="74" x2="98" y2="71" stroke="#2C201D" strokeWidth="2" strokeLinecap="round" />

          {/* Postman Leather Mail Satchel Bag Strap */}
          <path d="M 45 78 Q 70 95 95 125" stroke="#754E37" strokeWidth="5" strokeLinecap="round" />

          {/* Mail Satchel Bag on Hip */}
          <rect x="88" y="112" width="22" height="18" rx="4" fill="url(#bagGrad)" stroke="#2C201D" strokeWidth="2.5" transform="rotate(12 88 112)" filter="url(#softShadow)" />
          <circle cx="99" cy="122" r="2.5" fill="#FACC15" stroke="#2C201D" strokeWidth="1" />

          {/* Front Paws Holding Big Letter Envelope */}
          <g filter="url(#softShadow)">
            {/* The Envelope */}
            <rect x="46" y="86" width="48" height="32" rx="5" fill="url(#envelopeGrad)" stroke="#C65D4B" strokeWidth="2.5" transform="rotate(-4 46 86)" />
            {/* Envelope Fold Lines */}
            <path d="M 46 86 L 70 104 L 94 86" stroke="#C65D4B" strokeWidth="2" fill="none" transform="rotate(-4 46 86)" />
            {/* Red Heart Wax Seal */}
            <circle cx="70" cy="100" r="4.5" fill="#C65D4B" />
            <path d="M 70 98 C 68 96, 66 98, 70 102 C 74 98, 72 96, 70 98 Z" fill="#FFFFFF" />

            {/* Left Paw holding letter */}
            <ellipse cx="46" cy="102" rx="7" ry="6" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="2.5" />
            {/* Right Paw holding letter */}
            <ellipse cx="94" cy="100" rx="7" ry="6" fill="url(#catBodyGrad)" stroke="#2C201D" strokeWidth="2.5" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
