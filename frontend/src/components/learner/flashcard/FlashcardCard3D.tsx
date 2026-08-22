"use client";

import React, { useState, useEffect } from "react";
import { FlashcardItemDto } from "./types";

interface FlashcardCard3DProps {
  card: FlashcardItemDto;
  isFlipped: boolean;
  onFlip: () => void;
  onAudioError?: () => void;
}

export default function FlashcardCard3D({
  card,
  isFlipped,
  onFlip,
  onAudioError,
}: FlashcardCard3DProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const handlePlayAudio = (e?: React.MouseEvent, textOverride?: string) => {
    if (e) e.stopPropagation();
    const textToSpeak = textOverride || card.kana || card.word;
    if (!textToSpeak) return;

    try {
      setIsPlayingAudio(true);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "ja-JP";
        utterance.rate = 0.85;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => {
          setIsPlayingAudio(false);
          if (onAudioError) onAudioError();
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlayingAudio(false);
        if (onAudioError) onAudioError();
      }
    } catch (err) {
      setIsPlayingAudio(false);
      if (onAudioError) onAudioError();
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div
      className="w-full max-w-xl mx-auto my-2 cursor-pointer select-none focus:outline-none"
      onClick={onFlip}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? "Mặt sau thẻ. Bấm để lật sang mặt trước" : "Mặt trước thẻ. Bấm để lật sang mặt sau"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      style={{ perspective: "1200px" }}
    >
      <div
        className={`relative w-full min-h-[340px] sm:min-h-[380px] rounded-3xl transition-transform ${
          reducedMotion ? "duration-0" : "duration-500 ease-out"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT SIDE */}
        <div
          aria-hidden={isFlipped}
          className="absolute inset-0 w-full h-full bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between items-center text-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top Hanko Red Stamp Seal */}
          <div className="w-full flex justify-end">
            <div className="w-9 h-9 rounded-lg border-2 border-[#C65D4B]/70 flex items-center justify-center text-[#C65D4B] font-serif font-black text-xs opacity-80 transform rotate-12 shadow-2xs">
              覚
            </div>
          </div>

          {/* Main Front Content: Japanese Word */}
          <div className="my-auto space-y-4 w-full">
            <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#231917] tracking-wide leading-tight">
              {card.word}
            </h2>

            {/* Audio Button */}
            <button
              type="button"
              onClick={(e) => handlePlayAudio(e, card.word)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isPlayingAudio
                  ? "bg-[#C65D4B] text-white shadow-2xs"
                  : "bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#C65D4B] border border-[#DED3C8]"
              }`}
              aria-label="Nghe phát âm từ vựng"
            >
              <span className="text-sm">🔊</span>
              <span>Bấm để nghe</span>
            </button>
          </div>

          {/* Bottom Flip Note */}
          <div className="w-full pt-2">
            <span className="text-[11px] font-bold text-[#A39589] tracking-wider uppercase">
              Space to flip
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          aria-hidden={!isFlipped}
          className="absolute inset-0 w-full h-full bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between text-center backface-hidden overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top Action Header inside Card */}
          <div className="w-full flex items-center justify-between border-b border-[#DED3C8]/40 pb-3">
            <span className="text-sm font-mono font-medium text-[#76685F] lowercase">
              {card.romaji || card.kana || ""}
            </span>
            <div className="flex items-center gap-3 text-base text-[#76685F]">
              <button
                type="button"
                onClick={(e) => handlePlayAudio(e)}
                className="p-1 rounded-lg hover:bg-[#FAF3EB] hover:text-[#C65D4B] transition-colors cursor-pointer"
                title="Nghe phát âm"
                aria-label="Nghe phát âm"
              >
                🔊
              </button>
              <button
                type="button"
                onClick={toggleBookmark}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isBookmarked ? "text-amber-500" : "hover:bg-[#FAF3EB] hover:text-[#C65D4B]"
                }`}
                title="Lưu thẻ ghi nhớ"
                aria-label="Lưu thẻ"
              >
                {isBookmarked ? "⭐" : "📄"}
              </button>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded-lg hover:bg-[#FAF3EB] hover:text-[#C65D4B] transition-colors cursor-pointer"
                title="Thông tin chi tiết"
                aria-label="Báo cáo"
              >
                🏴
              </button>
            </div>
          </div>

          {/* Main Back Content (Centered) */}
          <div className="my-auto space-y-4 w-full py-4 flex flex-col items-center justify-center text-center">
            {/* Japanese Word & Furigana */}
            <div className="space-y-1 text-center">
              {card.kana && card.kana !== card.word && (
                <p className="text-xs font-bold text-[#8B6F5A] text-center">
                  {card.kana}
                </p>
              )}
              <h3 className="text-4xl sm:text-5xl font-serif font-black text-[#231917] tracking-wide text-center">
                {card.word}
              </h3>
            </div>

            {/* Vietnamese Meaning in Terracotta Red */}
            <p className="text-2xl sm:text-3xl font-serif font-extrabold text-[#C65D4B] leading-snug text-center">
              {card.meaningVi}
            </p>

            {/* Example Sentence Section (Only if valid Japanese exampleJp exists) */}
            {card.exampleJp && card.exampleJp.trim().length > 0 && (
              <div className="pt-4 border-t border-[#DED3C8]/60 space-y-1.5 w-full text-center flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 text-center">
                  <p className="text-sm sm:text-base font-serif font-bold text-[#231917] leading-relaxed text-center">
                    {card.exampleJp}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio(e, card.exampleJp)}
                    className="text-sm p-1 hover:text-[#C65D4B] transition-colors cursor-pointer shrink-0"
                    title="Nghe câu ví dụ"
                    aria-label="Nghe câu ví dụ tiếng Nhật"
                  >
                    🔊
                  </button>
                </div>
                {card.exampleVi && (
                  <p className="text-xs sm:text-sm font-medium text-[#6E5E52] text-center">
                    {card.exampleVi}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
