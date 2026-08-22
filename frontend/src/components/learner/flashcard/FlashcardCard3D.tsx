"use client";

import React, { useState, useEffect } from "react";
import { FlashcardItemDto } from "./types";
import { Volume2, Bookmark, Star, RefreshCw } from "lucide-react";

interface FlashcardCard3DProps {
  card: FlashcardItemDto;
  isFlipped: boolean;
  isSwapped?: boolean;
  onFlip: () => void;
  onAudioError?: () => void;
}

export default function FlashcardCard3D({
  card,
  isFlipped,
  isSwapped = false,
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
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between items-center text-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top Hanko Red Stamp Seal */}
          <div className="w-full flex justify-between items-center">
            <span className="text-[10px] font-black text-[#C65D4B] bg-[#C65D4B]/10 px-3 py-1 rounded-full border border-[#C65D4B]/20">
              {isSwapped ? "Tiếng Việt ➔ Nhật" : "Tiếng Nhật ➔ Việt"}
            </span>
            <div className="w-9 h-9 rounded-lg border-2 border-[#C65D4B]/70 flex items-center justify-center text-[#C65D4B] font-jp font-black text-xs opacity-80 transform rotate-12 shadow-2xs">
              覚
            </div>
          </div>

          {/* Main Front Content */}
          <div className="my-auto space-y-4 w-full">
            {!isSwapped ? (
              /* Normal Mode: Japanese Front */
              <>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#231917] tracking-wide leading-tight">
                  {card.word}
                </h2>
                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(e, card.word)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isPlayingAudio
                      ? "bg-[#C65D4B] text-white shadow-2xs"
                      : "bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#C65D4B] border border-[#DED3C8]"
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-[#C65D4B]" />
                  <span>Bấm để nghe phát âm</span>
                </button>
              </>
            ) : (
              /* Swapped Mode: Vietnamese Front */
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#8B6F5A] block uppercase tracking-wider">
                  Đoán từ tiếng Nhật tương ứng
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C65D4B] leading-tight">
                  {card.meaningVi}
                </h2>
              </div>
            )}
          </div>

          {/* Bottom Flip Note */}
          <div className="w-full pt-2">
            <span className="text-[11px] font-black text-[#A39589] tracking-wider uppercase">
              Bấm Space hoặc chạm thẻ để lật 3D
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          aria-hidden={!isFlipped}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between text-center backface-hidden overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top Action Header inside Card */}
          <div className="w-full flex items-center justify-between border-b border-[#DED3C8]/40 pb-3">
            <span className="text-xs font-mono font-bold text-[#76685F]">
              {card.romaji || card.kana || ""}
            </span>
            <div className="flex items-center gap-2 text-base text-[#76685F]">
              <button
                type="button"
                onClick={(e) => handlePlayAudio(e)}
                className="p-1.5 rounded-lg hover:bg-[#FAF3EB] hover:text-[#C65D4B] transition-colors cursor-pointer"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4 text-[#C65D4B]" />
              </button>
              <button
                type="button"
                onClick={toggleBookmark}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isBookmarked ? "text-amber-500" : "hover:bg-[#FAF3EB] hover:text-[#C65D4B]"
                }`}
                title="Lưu thẻ ghi nhớ"
              >
                <Star className={`w-4 h-4 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* Main Back Content (Centered) */}
          <div className="my-auto space-y-4 w-full py-4 flex flex-col items-center justify-center text-center">
            {!isSwapped ? (
              /* Normal Mode: Vietnamese Back */
              <>
                <div className="space-y-1 text-center">
                  {card.kana && card.kana !== card.word && (
                    <p className="text-xs font-bold text-[#8B6F5A] text-center">
                      {card.kana}
                    </p>
                  )}
                  <h3 className="text-4xl sm:text-5xl font-extrabold text-[#231917] tracking-wide text-center">
                    {card.word}
                  </h3>
                </div>

                <p className="text-2xl sm:text-3xl font-extrabold text-[#C65D4B] leading-snug text-center">
                  {card.meaningVi}
                </p>
              </>
            ) : (
              /* Swapped Mode: Japanese Back */
              <>
                <div className="space-y-1.5 text-center">
                  {card.kana && card.kana !== card.word && (
                    <p className="text-sm font-bold text-[#8B6F5A] text-center">
                      {card.kana}
                    </p>
                  )}
                  <h3 className="text-4xl sm:text-5xl font-extrabold text-[#C65D4B] tracking-wide text-center">
                    {card.word}
                  </h3>
                </div>

                <p className="text-xl sm:text-2xl font-bold text-[#231917] leading-snug text-center">
                  {card.meaningVi}
                </p>
              </>
            )}

            {/* Example Sentence Section */}
            {card.exampleJp && card.exampleJp.trim().length > 0 && (
              <div className="pt-4 border-t border-[#DED3C8]/60 space-y-1.5 w-full text-center flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 text-center">
                  <p className="text-sm sm:text-base font-bold text-[#231917] leading-relaxed text-center font-jp">
                    {card.exampleJp}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => handlePlayAudio(e, card.exampleJp)}
                    className="p-1 text-[#C65D4B] transition-colors cursor-pointer shrink-0"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
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
