"use client";

import { useState, useEffect, useCallback } from "react";
import { VocabularyDto } from "./VocabularyLearningItem";

interface FlashcardStudyModeProps {
  vocabularies: VocabularyDto[];
  lessonId?: string | number;
}

export default function FlashcardStudyMode({ vocabularies, lessonId = "default" }: FlashcardStudyModeProps) {
  const [cards, setCards] = useState<VocabularyDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [cardOrientation, setCardOrientation] = useState<"JP_TO_VI" | "VI_TO_JP">("JP_TO_VI");

  // Deck split tracking
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  const [unmasteredIds, setUnmasteredIds] = useState<Set<number>>(new Set());
  const [hasResumedProgress, setHasResumedProgress] = useState(false);
  const [isFinishedRound, setIsFinishedRound] = useState(false);

  const storageKey = `flashcard_progress_${lessonId}`;

  // Initialize card deck & auto-resume progress from localStorage
  useEffect(() => {
    setCards(vocabularies);
    setIsFlipped(false);
    setIsFinishedRound(false);

    if (typeof window !== "undefined" && vocabularies.length > 0) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.currentIndex !== undefined && parsed.currentIndex < vocabularies.length) {
            setCurrentIndex(parsed.currentIndex);
          }
          if (Array.isArray(parsed.masteredIds)) {
            setMasteredIds(new Set(parsed.masteredIds));
          }
          if (Array.isArray(parsed.unmasteredIds)) {
            setUnmasteredIds(new Set(parsed.unmasteredIds));
          }
          setHasResumedProgress(true);
          setTimeout(() => setHasResumedProgress(false), 4000);
        } catch (e) {
          console.error("Lỗi đọc tiến trình lật thẻ:", e);
        }
      }
    }
  }, [vocabularies, storageKey]);

  // Auto-save progress to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined" && cards.length > 0) {
      const stateToSave = {
        currentIndex,
        masteredIds: Array.from(masteredIds),
        unmasteredIds: Array.from(unmasteredIds),
      };
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    }
  }, [currentIndex, masteredIds, unmasteredIds, cards.length, storageKey]);

  const currentCard = cards[currentIndex];

  const handleNext = useCallback(() => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    if (currentIndex >= cards.length - 1) {
      setIsFinishedRound(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [cards.length, currentIndex]);

  const handlePrev = useCallback(() => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    setIsFinishedRound(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinishedRound(false);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleAudio = (e?: React.MouseEvent, text?: string) => {
    if (e) e.stopPropagation();
    const targetText = text || (currentCard ? (currentCard.kana || currentCard.word) : "");
    if (!targetText) return;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(targetText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const markMastered = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;
    const id = currentCard.vocabularyId;
    setMasteredIds((prev) => new Set(prev).add(id));
    setUnmasteredIds((prev) => {
      const u = new Set(prev);
      u.delete(id);
      return u;
    });
    handleNext();
  };

  const markUnmastered = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;
    const id = currentCard.vocabularyId;
    setUnmasteredIds((prev) => new Set(prev).add(id));
    setMasteredIds((prev) => {
      const u = new Set(prev);
      u.delete(id);
      return u;
    });
    handleNext();
  };

  const handleRetryUnmastered = () => {
    const unmasteredCards = vocabularies.filter((v) => unmasteredIds.has(v.vocabularyId));
    if (unmasteredCards.length > 0) {
      setCards(unmasteredCards);
    } else {
      setCards(vocabularies);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinishedRound(false);
  };

  const handleResetDeck = () => {
    setMasteredIds(new Set());
    setUnmasteredIds(new Set());
    setCards(vocabularies);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinishedRound(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        markMastered();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        markUnmastered();
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        handleAudio();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [markMastered, markUnmastered, handleFlip]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay || cards.length === 0 || isFinishedRound) return;
    const timer = setInterval(() => {
      setIsFlipped((prev) => {
        if (!prev) return true;
        handleNext();
        return false;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoplay, cards.length, isFinishedRound, handleNext]);

  if (!cards || cards.length === 0) {
    return (
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-8 text-center text-[#76685F]">
        Không có từ vựng nào để hiển thị thẻ ghi nhớ.
      </div>
    );
  }

  const isMastered = currentCard ? masteredIds.has(currentCard.vocabularyId) : false;

  const hiraganaText = currentCard ? (currentCard.kana || currentCard.word) : "";
  const kanjiText = currentCard && (currentCard.word && currentCard.word !== currentCard.kana)
    ? currentCard.word
    : (currentCard?.kanjiForm || "");

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Toast Notification on Auto-Resume */}
      {hasResumedProgress && (
        <div className="p-3 bg-[#FAF3EB] border-2 border-[#C65D4B] text-[#C65D4B] text-xs font-bold rounded-2xl animate-fade-in flex items-center justify-between shadow-sm">
          <span>📌 Đã tự động khôi phục tiến trình lật thẻ gần nhất (Thẻ {currentIndex + 1}/{cards.length})</span>
          <button onClick={handleResetDeck} className="text-[11px] underline hover:text-black">
            Học lại từ đầu
          </button>
        </div>
      )}

      {/* Controls Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF3EB] border border-[#DED3C8] px-5 py-3 rounded-2xl">
        <div className="text-xs font-extrabold text-[#56423E] flex items-center gap-3">
          <span>Thẻ <strong className="text-[#C65D4B]">{currentIndex + 1}</strong> / {cards.length}</span>
          <span className="text-xs text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold">
            ⏳ Chưa thuộc: {unmasteredIds.size}
          </span>
          <span className="text-xs text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
            ✓ Đã thuộc: {masteredIds.size}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Reverse Card Orientation Toggle */}
          <button
            onClick={() => setCardOrientation(cardOrientation === "JP_TO_VI" ? "VI_TO_JP" : "JP_TO_VI")}
            className="px-3 py-1.5 bg-[#FFFDF9] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-[#C65D4B] text-xs font-bold rounded-xl transition-all shadow-2xs"
            title="Đổi mặt thẻ Nhật ➔ Việt hoặc Việt ➔ Nhật"
          >
            🔄 {cardOrientation === "JP_TO_VI" ? "Mặt trước: Tiếng Nhật" : "Mặt trước: Tiếng Việt"}
          </button>

          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 bg-[#FFFDF9] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-[#C65D4B] text-xs font-bold rounded-xl transition-all shadow-2xs"
          >
            🔀 Xáo trộn
          </button>
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-2xs border ${
              isAutoplay
                ? "bg-[#C65D4B] text-white border-[#C65D4B]"
                : "bg-[#FFFDF9] border-[#DED3C8] text-[#56423E] hover:text-[#C65D4B]"
            }`}
          >
            {isAutoplay ? "⏸ Tự động" : "▶ Autoplay"}
          </button>
        </div>
      </div>

      {/* FINISHED ROUND SUMMARY SCREEN */}
      {isFinishedRound ? (
        <div className="bg-[#FFFDF9] border-2 border-[#C65D4B] rounded-3xl p-8 text-center space-y-6 shadow-md animate-fade-in">
          <div className="space-y-2">
            <span className="text-4xl">🎉</span>
            <h2 className="text-2xl font-extrabold text-[#C65D4B]">Đã Hoàn Thành Lượt Lật Thẻ!</h2>
            <p className="text-xs text-[#76685F]">
              Bạn đã học thuộc <strong className="text-emerald-700">{masteredIds.size}</strong> từ vựng và còn <strong className="text-amber-700">{unmasteredIds.size}</strong> từ chưa thuộc.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {unmasteredIds.size > 0 && (
              <button
                onClick={handleRetryUnmastered}
                className="px-6 py-3 bg-[#C65D4B] hover:bg-[#a84c3c] text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all"
              >
                🔁 Ôn lại {unmasteredIds.size} thẻ chưa thuộc
              </button>
            )}

            <button
              onClick={handleResetDeck}
              className="px-6 py-3 bg-[#56423E] hover:bg-[#3d2f2c] text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all"
            >
              🔄 Học lại từ đầu toàn bộ thẻ
            </button>
          </div>
        </div>
      ) : (
        /* 3D FLIP CARD CONTAINER */
        <div
          onClick={handleFlip}
          className="w-full h-80 sm:h-96 cursor-pointer select-none [perspective:1000px]"
        >
          <div
            className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT SIDE */}
            <div className="absolute inset-0 w-full h-full bg-[#FFFDF9] border-2 border-[#DED3C8] hover:border-[#C65D4B]/60 rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-md [backface-visibility:hidden]">
              <div className="w-full flex justify-between items-center">
                <span className="bg-[#FAF3EB] text-[#8B6F5A] border border-[#DED3C8] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {currentCard.partOfSpeech || "Từ vựng N5"}
                </span>
                <span className="text-[10px] text-[#8B6F5A] font-semibold">
                  {cardOrientation === "JP_TO_VI" ? "Mặt trước: Nhật" : "Mặt trước: Việt"}
                </span>
              </div>

              {/* Front Content Conditioned by Orientation */}
              {cardOrientation === "JP_TO_VI" ? (
                <div className="space-y-2">
                  <h2 className="text-4xl sm:text-5xl font-sans font-bold text-[#231917] tracking-wider">
                    {hiraganaText}
                  </h2>
                  {kanjiText && kanjiText !== hiraganaText && (
                    <p className="text-xl font-sans font-semibold text-[#76685F] pt-1">
                      {kanjiText}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#C65D4B] leading-snug">
                    {(currentCard.meaningVi || "").normalize("NFC")}
                  </h2>
                </div>
              )}

              <div className="w-full flex justify-between items-center text-xs text-[#8C7B70]">
                <button
                  onClick={(e) => handleAudio(e, hiraganaText)}
                  className="w-10 h-10 bg-[#FAF3EB] hover:bg-[#C65D4B] text-[#56423E] hover:text-white rounded-full flex items-center justify-center transition-all shadow-2xs text-base"
                  title="Nghe phát âm (Phím ▲)"
                >
                  🔊
                </button>
                <span className="text-[11px] font-semibold text-[#B3A398]">
                  💡 Space: Lật thẻ • ◄ Chưa thuộc • ► Đã thuộc
                </span>
              </div>
            </div>

            {/* BACK SIDE (Rotated 180deg) */}
            <div
              className="absolute inset-0 w-full h-full bg-[#FAF3EB] border-2 border-[#C65D4B] rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-lg [backface-visibility:hidden]"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="w-full flex justify-between items-center">
                <span className="bg-[#C65D4B]/10 text-[#C65D4B] border border-[#C65D4B]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {cardOrientation === "JP_TO_VI" ? "Ý Nghĩa Tiếng Việt" : "Tiếng Nhật Tương Ứng"}
                </span>
                <button
                  onClick={(e) => handleAudio(e, hiraganaText)}
                  className="w-9 h-9 bg-white text-[#C65D4B] rounded-full flex items-center justify-center shadow-2xs hover:bg-[#C65D4B] hover:text-white transition-all text-sm"
                >
                  🔊
                </button>
              </div>

              {/* Back Content Conditioned by Orientation */}
              {cardOrientation === "JP_TO_VI" ? (
                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-sans font-bold text-[#C65D4B] leading-snug">
                    {(currentCard.meaningVi || "").normalize("NFC")}
                  </h3>
                  {currentCard.notes && (
                    <p className="text-xs font-sans text-[#76685F] italic bg-white/80 px-4 py-2 rounded-xl border border-[#DED3C8]/60 inline-block">
                      {(currentCard.notes || "").normalize("NFC")}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-4xl sm:text-5xl font-sans font-bold text-[#231917] tracking-wider">
                    {hiraganaText}
                  </h3>
                  {kanjiText && kanjiText !== hiraganaText && (
                    <p className="text-xl font-sans font-semibold text-[#76685F] pt-1">
                      {kanjiText}
                    </p>
                  )}
                </div>
              )}

              <div className="text-[11px] font-semibold text-[#8B6F5A]">
                Dùng phím ◄ (Chưa thuộc) và ► (Đã thuộc)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER NAVIGATION & DECK SPLIT BUTTONS */}
      {!isFinishedRound && (
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={(e) => markUnmastered(e)}
            className="flex-1 py-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-extrabold text-xs rounded-2xl transition-all shadow-2xs flex items-center justify-center gap-1.5"
          >
            ❌ Chưa thuộc (◄)
          </button>

          <button
            onClick={handleFlip}
            className="px-6 py-3 bg-[#C65D4B] hover:bg-[#a84c3c] text-white font-extrabold text-xs rounded-2xl transition-all shadow-sm flex items-center gap-2"
          >
            🔄 {isFlipped ? "Xem mặt trước" : "Lật thẻ (Space)"}
          </button>

          <button
            onClick={(e) => markMastered(e)}
            className="flex-1 py-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-extrabold text-xs rounded-2xl transition-all shadow-2xs flex items-center justify-center gap-1.5"
          >
            ✅ Đã thuộc (►)
          </button>
        </div>
      )}
    </div>
  );
}
