"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Card3DTilt({
  children,
  className = "",
  maxTilt = 8,
  scaleOnHover = 1.03,
  onClick,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // High-performance Framer Motion values (no React state re-renders on mousemove!)
  const xNorm = useMotionValue(0);
  const yNorm = useMotionValue(0);
  const scaleTarget = useMotionValue(1);
  const glossOpacityTarget = useMotionValue(0);

  const rotateX = useSpring(useTransform(yNorm, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 500,
    damping: 35,
    mass: 0.2,
  });
  const rotateY = useSpring(useTransform(xNorm, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 500,
    damping: 35,
    mass: 0.2,
  });
  const springScale = useSpring(scaleTarget, {
    stiffness: 500,
    damping: 30,
    mass: 0.2,
  });
  const springGlossOpacity = useSpring(glossOpacityTarget, {
    stiffness: 400,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    xNorm.set(mouseX / rect.width - 0.5);
    yNorm.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    scaleTarget.set(scaleOnHover);
    glossOpacityTarget.set(0.12);
  };

  const handleMouseLeave = () => {
    xNorm.set(0);
    yNorm.set(0);
    scaleTarget.set(1);
    glossOpacityTarget.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`perspective-1000 cursor-pointer select-none touch-manipulation active:scale-[0.98] transition-transform ${className}`}
      style={{ perspective: "1000px", WebkitTapHighlightColor: "transparent" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* 3D Specular Light Sheen Overlay */}
        <motion.div
          style={{ opacity: springGlossOpacity }}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 bg-gradient-to-tr from-white/0 via-white/20 to-white/0"
        />
      </motion.div>
    </div>
  );
}
