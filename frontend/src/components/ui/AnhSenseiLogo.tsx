"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AnhSenseiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function AnhSenseiLogo({ className = "", size = "md" }: AnhSenseiLogoProps) {
  const dimensions = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  }[size];

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
      whileTap={{ scale: 0.94 }}
      transition={{
        scale: { type: "spring", stiffness: 450, damping: 15 },
        rotate: { duration: 0.3, ease: "easeInOut" },
      }}
      className={`relative ${dimensions} rounded-2xl bg-[#FFFDF9] border-2 border-[#E5D7C7] shadow-sm flex items-center justify-center overflow-hidden select-none shrink-0 group ${className}`}
    >
      <Image
        src="/images/capybara_logo.png"
        alt="Capybara Nihongo Logo"
        width={140}
        height={140}
        className="w-full h-full object-cover scale-[1.38] translate-y-[2%] transition-transform group-hover:scale-[1.48]"
        priority
      />
    </motion.div>
  );
}
