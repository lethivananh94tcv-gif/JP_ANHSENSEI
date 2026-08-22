"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Volume2, RotateCcw, Sparkles } from "lucide-react";

interface FlashcardItem {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  vietnamese: string;
  level: string;
  type: string;
}

const sampleCards: FlashcardItem[] = [
  {
    id: 1,
    kanji: "日本語",
    kana: "にほんご",
    romaji: "nihongo",
    vietnamese: "Tiếng Nhật",
    level: "N5",
    type: "Từ Vựng",
  },
  {
    id: 2,
    kanji: "勉強する",
    kana: "べんきょうする",
    romaji: "benkyou suru",
    vietnamese: "Học tập / Nghiên cứu",
    level: "N5",
    type: "Từ Vựng",
  },
  {
    id: 3,
    kanji: "先生",
    kana: "せんせい",
    romaji: "sensei",
    vietnamese: "Giáo viên / Thầy cô",
    level: "N5",
    type: "Từ Vựng",
  },
  {
    id: 4,
    kanji: "友達",
    kana: "ともだち",
    romaji: "tomodachi",
    vietnamese: "Bạn bè",
    level: "N5",
    type: "Từ Vựng",
  },
];

export default function Interactive3DFlashcard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = sampleCards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % sampleCards.length);
  };

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-[#8B6F5A] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C65D4B]" />
          <span>Thẻ Ôn Tập 3D Tương Tác</span>
        </span>
        <button
          onClick={handleNextCard}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-[#DED3C8] hover:bg-[#F5EFE6] text-[#231917] text-[11px] font-extrabold transition-all hover:scale-105 shadow-2xs cursor-pointer"
        >
          <span>Đổi thẻ khác</span>
          <RefreshCw className="w-3 h-3 text-[#C65D4B]" />
        </button>
      </div>

      {/* 3D Perspective Card Flip Container */}
      <div
        onClick={handleFlip}
        className="w-full h-44 sm:h-48 cursor-pointer perspective-1000 group"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full rounded-2xl shadow-xl border-2 border-[#DED3C8] group-hover:border-[#C65D4B]/60 transition-colors"
        >
          {/* FRONT SIDE */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] rounded-2xl p-5 flex flex-col justify-between items-center text-center overflow-hidden"
          >
            {/* Top Badges */}
            <div className="w-full flex justify-between items-center text-[10px] font-black">
              <span className="bg-[#C65D4B] text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                {currentCard.level}
              </span>
              <span className="bg-[#F5EFE6] text-[#8B6F5A] border border-[#DED3C8] px-2 py-0.5 rounded-lg">
                {currentCard.type}
              </span>
            </div>

            {/* Kanji & Kana */}
            <div className="space-y-1 my-auto">
              <h3 className="text-3xl sm:text-4xl font-jp font-black text-[#231917] tracking-widest">
                {currentCard.kanji}
              </h3>
              <p className="text-xs font-bold text-[#8B6F5A]">
                {currentCard.kana} ({currentCard.romaji})
              </p>
            </div>

            {/* Flip Hint */}
            <div className="text-[10px] font-bold text-[#76685F] flex items-center gap-1 animate-pulse">
              <RotateCcw className="w-3 h-3 text-[#C65D4B]" />
              <span>Chạm hoặc di chuột để lật mặt sau</span>
            </div>
          </div>

          {/* BACK SIDE (180deg flipped) */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#231917] via-[#332420] to-[#1E1715] text-white rounded-2xl p-5 flex flex-col justify-between items-center text-center overflow-hidden"
          >
            {/* Top Badge */}
            <div className="w-full flex justify-between items-center text-[10px] font-black">
              <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                Nghĩa Tiếng Việt
              </span>
              <span className="text-[#FFB8A9] font-bold">Mặt Sau 🔄</span>
            </div>

            {/* Vietnamese Meaning */}
            <div className="space-y-2 my-auto">
              <span className="text-xs font-bold text-[#FFB8A9] uppercase tracking-wider block">
                Ý Nghĩa
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {currentCard.vietnamese}
              </h4>
            </div>

            {/* Audio sample hint */}
            <div className="text-[10px] font-bold text-[#DED3C8] flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-[#FFB8A9]" />
              <span>Phát âm chuẩn Kana</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
