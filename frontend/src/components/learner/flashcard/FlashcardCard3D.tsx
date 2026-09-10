"use client";

import React, { useState, useEffect } from "react";
import { FlashcardItemDto } from "./types";
import { Volume2, Star, Sparkles } from "lucide-react";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";
import { getVocabularyKanjiAnalysis } from "@/lib/utils/kanjiSinoVietnamese";

interface FlashcardCard3DProps {
  card: FlashcardItemDto;
  isFlipped: boolean;
  isSwapped?: boolean;
  showFurigana?: boolean;
  isContextMode?: boolean;
  isFavorite?: boolean;
  onFlip: () => void;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  onAudioError?: () => void;
}

export default function FlashcardCard3D({
  card,
  isFlipped,
  isSwapped = false,
  showFurigana = true,
  isContextMode = false,
  isFavorite = false,
  onFlip,
  onToggleFavorite,
  onAudioError,
}: FlashcardCard3DProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingExampleAudio, setIsPlayingExampleAudio] = useState(false);
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

  const handlePlayWordAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToSpeak = card.kana || card.word;
    if (!textToSpeak && !card.audioUrl) return;

    setIsPlayingAudio(true);
    playJapaneseTTS({
      text: textToSpeak,
      audioUrl: card.audioUrl,
      rate: 0.92,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => {
        setIsPlayingAudio(false);
        if (onAudioError) onAudioError();
      },
    });
  };

  const handlePlayExampleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const exampleText = card.exampleJp;
    if (!exampleText) return;

    setIsPlayingExampleAudio(true);
    playJapaneseTTS({
      text: exampleText,
      rate: 0.88,
      onStart: () => setIsPlayingExampleAudio(true),
      onEnd: () => setIsPlayingExampleAudio(false),
      onError: () => {
        setIsPlayingExampleAudio(false);
        if (onAudioError) onAudioError();
      },
    });
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(e);
  };

  return (
    <div
      className="w-full max-w-xl mx-auto my-2 cursor-pointer select-none focus:outline-none"
      onClick={onFlip}
      tabIndex={0}
      role="button"
      aria-label={
        isFlipped
          ? "Mặt sau thẻ. Bấm để lật sang mặt trước"
          : "Mặt trước thẻ. Bấm để lật sang mặt sau"
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      style={{ perspective: "1200px" }}
    >
      <div
        className={`relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl transition-transform ${
          reducedMotion ? "duration-0" : "duration-500 ease-out"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ================= FRONT SIDE ================= */}
        <div
          aria-hidden={isFlipped}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between items-center text-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top Header Badge & Audio / Favorite Star buttons */}
          <div className="w-full flex justify-between items-center">
            <span className="text-[11px] font-black text-[#C65D4B] bg-[#C65D4B]/10 px-3.5 py-1 rounded-full border border-[#C65D4B]/20">
              {isSwapped ? "Tiếng Việt ➔ Nhật" : "Tiếng Nhật ➔ Việt"}
            </span>

            <div className="flex items-center gap-2">
              {/* Speaker button top right corner */}
              <button
                type="button"
                onClick={handlePlayWordAudio}
                className={`p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  isPlayingAudio
                    ? "bg-[#C65D4B] text-white border-[#C65D4B] scale-105"
                    : "bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#C65D4B] border-[#DED3C8]"
                }`}
                title="Nghe phát âm từ vựng"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce" : "text-[#C65D4B]"}`} />
              </button>

              {/* Favorite Star button top right corner */}
              <button
                type="button"
                onClick={toggleBookmark}
                className={`p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  isFavorite
                    ? "bg-amber-100 text-amber-500 border-amber-300"
                    : "bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#8B6F5A] border-[#DED3C8]"
                }`}
                title={isFavorite ? "Bỏ yêu thích" : "Yêu thích từ vựng này"}
              >
                <Star
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-amber-500 text-amber-500" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Main Front Content */}
          <div className="my-auto space-y-3 w-full flex flex-col items-center justify-center">
            {!isSwapped ? (
              /* Normal Mode: Japanese Front */
              <div className="space-y-3 text-center flex flex-col items-center w-full">
                {/* Primary Reading / Word (Hiragana) */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#231917] tracking-wider leading-tight">
                  {card.kana || card.word}
                </h2>

                {/* Kanji Below (if exists and different from Kana) */}
                {card.word && card.word !== card.kana && (
                  <p className="text-2xl sm:text-3xl font-bold text-[#8B6F5A] tracking-widest font-jp">
                    {card.word}
                  </p>
                )}

                {/* Japanese Example Sentence on Front */}
                {card.exampleJp && (
                  <div className="mt-2 px-4 py-3 bg-[#FAF0E6]/90 rounded-2xl border border-[#DED3C8] text-center space-y-1 max-w-md w-full shadow-2xs">
                    <span className="text-[10px] font-extrabold text-[#C65D4B] uppercase tracking-wider block">
                      💬 Ví dụ thực tế
                    </span>
                    {showFurigana && card.exampleReading && (
                      <p className="text-xs font-bold text-[#8B6F5A] tracking-wide font-jp opacity-90">
                        {card.exampleReading}
                      </p>
                    )}
                    <p className="text-base sm:text-lg font-jp font-bold text-[#231917] leading-relaxed">
                      {card.exampleJp}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Swapped Mode: Vietnamese Front */
              <div className="space-y-3 text-center">
                <span className="text-xs font-bold text-[#8B6F5A] block uppercase tracking-wider">
                  Đoán từ tiếng Nhật tương ứng
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C65D4B] leading-tight">
                  {card.meaningVi}
                </h2>
              </div>
            )}
          </div>

          {/* Bottom Flip Hint */}
          <div className="w-full pt-2 border-t border-[#DED3C8]/40">
            <span className="text-[11px] font-black text-[#A39589] tracking-wider uppercase">
              Bấm Space hoặc chạm thẻ để lật
            </span>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div
          aria-hidden={!isFlipped}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between text-center backface-hidden overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top Bar inside Card */}
          <div className="w-full flex items-center justify-between border-b border-[#DED3C8]/50 pb-2.5">
            <span className="text-[11px] font-mono font-bold text-[#8B6F5A] uppercase tracking-wider">
              [ TỪ VỰNG ]
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayWordAudio}
                className="p-1.5 rounded-lg bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#C65D4B] border border-[#DED3C8] transition-colors cursor-pointer"
                title="Nghe phát âm từ vựng"
              >
                <Volume2 className="w-4 h-4 text-[#C65D4B]" />
              </button>
              <button
                type="button"
                onClick={toggleBookmark}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isFavorite
                    ? "bg-amber-50 text-amber-500 border-amber-300"
                    : "bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#8B6F5A] border-[#DED3C8]"
                }`}
                title={isFavorite ? "Bỏ yêu thích" : "Yêu thích từ vựng này"}
              >
                <Star
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-amber-500 text-amber-500" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Main Back Content Container */}
          <div className="my-auto py-2 space-y-4 w-full flex flex-col items-center">
            {/* VOCABULARY INFO */}
            <div className="space-y-1.5 text-center flex flex-col items-center w-full">
              {/* Kana */}
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#231917] tracking-wide">
                {card.kana || card.word}
              </h3>

              {/* Kanji & Romaji */}
              <div className="flex items-center justify-center gap-3 text-sm font-semibold text-[#8B6F5A]">
                {card.word && card.word !== card.kana && (
                  <span className="font-jp text-lg font-bold text-[#C65D4B]">
                    {card.word}
                  </span>
                )}
                {card.romaji && (
                  <span className="font-mono text-xs text-[#76685F]">
                    {card.romaji}
                  </span>
                )}
              </div>

              {/* Sino-Vietnamese (Hán Việt) Kanji Analysis */}
              {(() => {
                const kanjiAnalysis = getVocabularyKanjiAnalysis(card.word || card.kanjiForm);
                if (!kanjiAnalysis) return null;

                return (
                  <div className="pt-1.5 flex flex-col items-center gap-1">
                    <span className="inline-flex items-center gap-1 text-xs font-black text-[#C65D4B] bg-[#C65D4B]/10 px-3 py-0.5 rounded-full border border-[#C65D4B]/20">
                      <Sparkles className="w-3 h-3 text-[#C65D4B]" />
                      <span>Hán Việt: {kanjiAnalysis.fullHanViet}</span>
                    </span>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                      {kanjiAnalysis.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] bg-white border border-[#DED3C8] px-2.5 py-0.5 rounded-lg shadow-2xs"
                        >
                          <span className="font-extrabold text-[#C65D4B]">{detail.char}</span>
                          <span className="font-black text-[#302A26] uppercase">{detail.hanViet}</span>
                          {detail.meaningVi && (
                            <span className="text-[#76685F] text-[10px] italic border-l border-[#DED3C8] pl-1 ml-0.5">
                              {detail.meaningVi.split(",")[0]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Meaning */}
              <div className="pt-2">
                <span className="text-xs font-bold text-[#8B6F5A] uppercase tracking-wider block">
                  Nghĩa:
                </span>
                <p className="text-2xl sm:text-3xl font-black text-[#C65D4B] leading-snug">
                  {card.meaningVi}
                </p>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full border-t border-[#DED3C8]/70 my-1" />

            {/* REAL EXAMPLE SENTENCE SECTION */}
            {(card.exampleJp || card.exampleVi) && (
              <div
                className={`w-full rounded-2xl p-4 text-left transition-all ${
                  isContextMode
                    ? "bg-[#FAF0E6] border-2 border-[#C65D4B] shadow-md ring-2 ring-[#C65D4B]/20"
                    : "bg-[#FFFDF9]/80 border border-[#DED3C8]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#C65D4B] flex items-center gap-1.5">
                    <span>💬</span>
                    <span>
                      {isContextMode ? "Trong thực tế (Nổi bật)" : "Ví dụ thực tế"}
                    </span>
                  </span>

                  {card.exampleJp && (
                    <button
                      type="button"
                      onClick={handlePlayExampleAudio}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                        isPlayingExampleAudio
                          ? "bg-[#C65D4B] text-white shadow-2xs"
                          : "bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#C65D4B] border border-[#DED3C8]"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#C65D4B]" />
                      <span>▶ Nghe câu ví dụ</span>
                    </button>
                  )}
                </div>

                {/* Japanese Example Sentence */}
                {card.exampleJp && (
                  <div className="space-y-1">
                    {/* Optional Furigana Subtext */}
                    {showFurigana && card.exampleReading && (
                      <p className="text-xs font-bold text-[#8B6F5A] tracking-wide font-jp opacity-90">
                        {card.exampleReading}
                      </p>
                    )}
                    <p
                      className={`font-jp font-bold text-[#231917] leading-relaxed ${
                        isContextMode ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                      }`}
                    >
                      {card.exampleJp}
                    </p>
                  </div>
                )}

                {/* Vietnamese Translation */}
                {card.exampleVi && (
                  <p className="text-xs sm:text-sm font-semibold text-[#6E5E52] mt-1.5">
                    ➔ {card.exampleVi}
                  </p>
                )}
              </div>
            )}

            {/* USAGE NOTE SECTION */}
            {(card.usageNote || card.notes) && (
              <div className="w-full bg-[#FAF3EB]/90 border border-[#DED3C8] rounded-xl p-3 text-left space-y-1">
                <span className="text-[11px] font-black text-[#8B6F5A] flex items-center gap-1">
                  <span>📌</span>
                  <span>Cách dùng</span>
                </span>
                <p className="text-xs font-medium text-[#6E5E52] italic leading-relaxed">
                  {card.usageNote || card.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

