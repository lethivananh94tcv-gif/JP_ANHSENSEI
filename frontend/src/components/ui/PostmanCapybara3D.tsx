"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PostmanCapybara3DProps {
  onClick?: () => void;
  className?: string;
  bubbleText?: string;
  isJumping?: boolean;
}

export default function PostmanCapybara3D({
  onClick,
  className = "",
  bubbleText = "Capybara có thư nè! 🍊✉️",
  isJumping = true,
}: PostmanCapybara3DProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={
        isJumping
          ? { y: [0, -8, 0, -4, 0], rotate: [0, -3, 3, -1, 1, 0] }
          : { y: 0, rotate: 0 }
      }
      transition={
        isJumping
          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
      onClick={onClick}
      title="Capybara Bưu Tá mang Bức Thư Tâm Sự & Lộ Trình 6 Bước từ Anh Sensei 🍊🦫"
      className={`relative cursor-pointer group flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* 1. Glowing Pulsing Warm Aura Behind Capybara when Jumping */}
      {isJumping && (
        <div className="absolute inset-0 top-3 bg-gradient-to-tr from-[#FF7A63]/50 via-[#FFC0B5]/60 to-[#F59E0B]/50 rounded-full blur-xl animate-pulse pointer-events-none scale-125 z-0" />
      )}

      {/* 2. Animated Speech Bubble Above Capybara */}
      <motion.div
        initial={{ y: 0 }}
        animate={isJumping ? { y: [0, -3, 0] } : { y: 0 }}
        transition={
          isJumping
            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className="mb-1 bg-gradient-to-r from-[#EA580C] via-[#DC2626] to-[#C65D4B] text-white border-2 border-white px-3 py-1 rounded-full shadow-xl text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 relative z-30 whitespace-nowrap group-hover:scale-105 transition-transform"
      >
        {isJumping && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
        <span>{bubbleText}</span>
        {/* Tail pointing down */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#EA580C] border-r-2 border-b-2 border-white rotate-45" />
      </motion.div>

      {/* 3. Ultra-Cute 3D Rendered Capybara Mascot Image */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        className="w-22 h-22 sm:w-26 sm:h-26 relative flex items-center justify-center filter drop-shadow-2xl z-10"
      >
        <Image
          src="/images/capybara_postman_3d.png"
          alt="Capybara Bưu Tá 3D"
          width={120}
          height={120}
          className="w-full h-full object-contain filter drop-shadow-lg"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
