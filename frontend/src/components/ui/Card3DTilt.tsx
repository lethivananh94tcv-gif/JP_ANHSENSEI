"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
}

export default function Card3DTilt({
  children,
  className = "",
  maxTilt = 12,
  scaleOnHover = 1.02,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glossX: 50, glossY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position from -1 to 1
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    // Calculate tilt angles (inverse relationship for natural 3D feel)
    const rotateX = -yPct * maxTilt;
    const rotateY = xPct * maxTilt;

    // Gloss position percentages
    const glossX = (mouseX / width) * 100;
    const glossY = (mouseY / height) * 100;

    setTilt({ x: rotateX, y: rotateY, glossX, glossY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glossX: 50, glossY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* 3D Specular Light Sheen Overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glossX}% ${tilt.glossY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
