"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { FlashcardItemDto, FlashcardRating, FlashcardSessionStats } from "./types";
import FlashcardHeader from "./FlashcardHeader";
import FlashcardProgressBar from "./FlashcardProgressBar";
import FlashcardCard3D from "./FlashcardCard3D";
import FlashcardRatingBar from "./FlashcardRatingBar";
import FlashcardShortcutLegend from "./FlashcardShortcutLegend";
import FlashcardCompletionScreen from "./FlashcardCompletionScreen";
import FlashcardSkeleton from "./FlashcardSkeleton";
import FlashcardErrorState from "./FlashcardErrorState";
import { UserProfile } from "@/types/learner";

interface FlashcardContainerProps {
  items: FlashcardItemDto[];
  levelCode?: string;
  lessonTitle?: string;
  user?: UserProfile | null;
  storageKey?: string;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onBack?: () => void;
  onNextLesson?: () => void;
  onReviewApiSync?: (item: FlashcardItemDto, rating: FlashcardRating) => void;
}

export default function FlashcardContainer({
  items,
  levelCode = "N5",
  lessonTitle = "Bài học từ vựng",
  user,
  storageKey = "flashcard_deck_session",
  loading = false,
  error = "",
  onRetry,
  onBack,
  onNextLesson,
  onReviewApiSync,
}: FlashcardContainerProps) {
  const [deck, setDeck] = useState<FlashcardItemDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isSwapped, setIsSwapped] = useState<boolean>(false); // Front <-> Back Swap State
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [showFurigana, setShowFurigana] = useState<boolean>(true); // Default ON for N5/N4
  const [isContextMode, setIsContextMode] = useState<boolean>(false); // Context mode toggle

  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  const [somewhatIds, setSomewhatIds] = useState<Set<number>>(new Set());
  const [unmasteredIds, setUnmasteredIds] = useState<Set<number>>(new Set());

  // Favorites tracking & filter state ⭐
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [isFavoritesOnly, setIsFavoritesOnly] = useState<boolean>(false);

  // Load Favorites from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavs = localStorage.getItem("flashcard_favorite_vocab_ids");
      if (savedFavs) {
        try {
          const parsed = JSON.parse(savedFavs);
          if (Array.isArray(parsed)) {
            setFavoriteIds(new Set(parsed));
          }
        } catch {}
      }
    }
  }, []);

  const handleToggleFavorite = useCallback((cardId: number) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
        showToast("Đã bỏ từ khỏi danh sách yêu thích");
      } else {
        next.add(cardId);
        showToast("⭐ Đã thêm từ vào danh sách yêu thích!");
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("flashcard_favorite_vocab_ids", JSON.stringify(Array.from(next)));
      }
      return next;
    });
  }, []);

  const handleToggleFavoritesOnly = useCallback(() => {
    if (!isFavoritesOnly) {
      const favItems = items.filter((item) => favoriteIds.has(item.id));
      if (favItems.length === 0) {
        showToast("💡 Bạn chưa lưu từ nào! Hãy bấm biểu tượng ⭐ góc trên bên phải mỗi thẻ để đánh dấu từ cần học nhé.");
        return;
      }
      setDeck(favItems);
      setIsFavoritesOnly(true);
      setCurrentIndex(0);
      setIsFlipped(false);
      showToast(`⭐ Đang tập trung ôn lại ${favItems.length} từ vựng bạn đã đánh dấu!`);
    } else {
      setDeck(items);
      setIsFavoritesOnly(false);
      setCurrentIndex(0);
      setIsFlipped(false);
      showToast("Đã quay lại học tất cả từ vựng trong bài");
    }
  }, [isFavoritesOnly, items, favoriteIds]);

  // Session state
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize deck and auto-resume progress from localStorage
  useEffect(() => {
    if (items.length > 0) {
      setDeck(items);
      setStartTime(Date.now());
      setIsFinished(false);

      if (typeof window !== "undefined" && storageKey) {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (typeof parsed.currentIndex === "number" && parsed.currentIndex < items.length) {
              setCurrentIndex(parsed.currentIndex);
            }
            if (Array.isArray(parsed.masteredIds)) {
              setMasteredIds(new Set(parsed.masteredIds));
            }
            if (Array.isArray(parsed.somewhatIds)) {
              setSomewhatIds(new Set(parsed.somewhatIds));
            }
            if (Array.isArray(parsed.unmasteredIds)) {
              setUnmasteredIds(new Set(parsed.unmasteredIds));
            }
          } catch (e) {
            console.error("Lỗi đọc tiến trình thẻ:", e);
          }
        }
      }
    }
  }, [items, storageKey]);

  // Auto-save session progress
  useEffect(() => {
    if (typeof window !== "undefined" && deck.length > 0 && storageKey) {
      const stateToSave = {
        currentIndex,
        masteredIds: Array.from(masteredIds),
        somewhatIds: Array.from(somewhatIds),
        unmasteredIds: Array.from(unmasteredIds),
      };
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    }
  }, [currentIndex, masteredIds, somewhatIds, unmasteredIds, deck.length, storageKey]);

  // Handle Toast Notifications
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const currentCard = deck[currentIndex];

  const handleNext = useCallback(() => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    if (currentIndex + 1 >= deck.length) {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [deck.length, currentIndex, startTime]);

  const handlePrev = useCallback(() => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setIsFinished(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, [deck.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleToggleSwap = useCallback(() => {
    setIsSwapped((prev) => !prev);
    setIsFlipped(false);
  }, []);

  const handleRate = useCallback(
    (rating: FlashcardRating) => {
      if (!currentCard) return;

      const cardId = currentCard.id;

      // Update Rating Sets
      setMasteredIds((prev) => {
        const next = new Set(prev);
        if (rating === "MASTERED") next.add(cardId);
        else next.delete(cardId);
        return next;
      });

      setSomewhatIds((prev) => {
        const next = new Set(prev);
        if (rating === "SOMEWHAT") next.add(cardId);
        else next.delete(cardId);
        return next;
      });

      setUnmasteredIds((prev) => {
        const next = new Set(prev);
        if (rating === "UNMASTERED") next.add(cardId);
        else next.delete(cardId);
        return next;
      });

      if (onReviewApiSync) {
        onReviewApiSync(currentCard, rating);
      }

      handleNext();
    },
    [currentCard, onReviewApiSync, handleNext]
  );

  const handleToggleShuffle = () => {
    if (deck.length === 0) return;
    const nextState = !isShuffle;
    setIsShuffle(nextState);

    if (nextState) {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
    } else {
      setDeck(items);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleToggleAutoplay = () => {
    setIsAutoplay((prev) => !prev);
  };

  useEffect(() => {
    if (isAutoplay && !isFinished && deck.length > 0) {
      autoplayTimerRef.current = setTimeout(() => {
        if (!isFlipped) {
          setIsFlipped(true);
        } else {
          handleNext();
        }
      }, 3000);
    }
    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [isAutoplay, isFlipped, isFinished, deck.length, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        showExitModal ||
        ["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName) ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (isFinished) return;

      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "1") {
        e.preventDefault();
        handleRate("UNMASTERED");
      } else if (e.key === "2") {
        e.preventDefault();
        handleRate("SOMEWHAT");
      } else if (e.key === "3") {
        e.preventDefault();
        handleRate("MASTERED");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleRate, showExitModal, isFinished]);

  const handleRequestBack = () => {
    if (!isFinished && (masteredIds.size > 0 || unmasteredIds.size > 0 || currentIndex > 0)) {
      setShowExitModal(true);
    } else {
      if (onBack) onBack();
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    if (onBack) onBack();
  };

  const handleRetryUnmastered = () => {
    const retryItems = items.filter(
      (item) => unmasteredIds.has(item.id) || somewhatIds.has(item.id)
    );

    if (retryItems.length > 0) {
      setDeck(retryItems);
    } else {
      setDeck(items);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setStartTime(Date.now());
    setMasteredIds(new Set());
    setSomewhatIds(new Set());
    setUnmasteredIds(new Set());
  };

  const handleRestartAll = () => {
    setDeck(items);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setStartTime(Date.now());
    setMasteredIds(new Set());
    setSomewhatIds(new Set());
    setUnmasteredIds(new Set());

    if (typeof window !== "undefined" && storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#302A26]">
        <FlashcardHeader levelCode={levelCode} lessonTitle={lessonTitle} user={user} onBack={handleRequestBack} />
        <FlashcardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#302A26]">
        <FlashcardHeader levelCode={levelCode} lessonTitle={lessonTitle} user={user} onBack={handleRequestBack} />
        <FlashcardErrorState message={error} onRetry={onRetry || (() => {})} />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#302A26]">
        <FlashcardHeader levelCode={levelCode} lessonTitle={lessonTitle} user={user} onBack={handleRequestBack} />
        <div className="w-full max-w-md mx-auto my-12 bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-8 shadow-md text-center space-y-4">
          <div className="text-4xl">🎴</div>
          <h3 className="text-xl font-serif font-black text-[#231917]">Bài học chưa có từ vựng</h3>
          <p className="text-xs sm:text-sm font-semibold text-[#76685F]">
            Bài học này hiện chưa được khởi tạo học liệu thẻ ghi nhớ.
          </p>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 bg-[#8B6F5A] hover:bg-[#785d49] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xs transition-all cursor-pointer"
            >
              Quay lại bài học
            </button>
          )}
        </div>
      </div>
    );
  }

  const sessionStats: FlashcardSessionStats = {
    totalCount: deck.length,
    masteredCount: masteredIds.size,
    somewhatCount: somewhatIds.size,
    unmasteredCount: unmasteredIds.size,
    elapsedSeconds,
    rewardWaterDrops: 1,
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#302A26] flex flex-col justify-between select-none">
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#302A26] text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl animate-fade-in">
          {toastMessage}
        </div>
      )}

      <FlashcardHeader
        levelCode={levelCode}
        lessonTitle={lessonTitle}
        user={user}
        onBack={handleRequestBack}
      />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 flex flex-col justify-between items-center">
        {isFinished ? (
          <FlashcardCompletionScreen
            stats={sessionStats}
            onRetryUnmastered={handleRetryUnmastered}
            onRestartAll={handleRestartAll}
            onFinish={() => {
              if (onBack) onBack();
            }}
            onNextLesson={onNextLesson}
          />
        ) : (
          <div className="w-full flex flex-col justify-between items-center flex-1 space-y-4 my-auto">
            <FlashcardProgressBar
              currentIndex={currentIndex}
              totalCount={deck.length}
              showFurigana={showFurigana}
              isContextMode={isContextMode}
              favoriteCount={favoriteIds.size}
              isFavoritesOnly={isFavoritesOnly}
              onToggleFurigana={() => setShowFurigana((prev) => !prev)}
              onToggleContextMode={() => setIsContextMode((prev) => !prev)}
              onToggleFavoritesOnly={handleToggleFavoritesOnly}
            />

            {isFavoritesOnly && (
              <div className="w-full max-w-xl mx-auto bg-[#FFFDF9] border-2 border-amber-300 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xs text-xs font-bold text-amber-900 animate-fade-in">
                <div className="flex items-center gap-2 min-w-0">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="truncate">
                    Chế độ: <strong>Ôn từ bạn đã đánh dấu ⭐ ({deck.length} từ)</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleFavoritesOnly}
                  className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-[11px] font-black transition-colors cursor-pointer shrink-0"
                >
                  Xem tất cả từ ➔
                </button>
              </div>
            )}

            {currentCard && (
              <FlashcardCard3D
                card={currentCard}
                isFlipped={isFlipped}
                isSwapped={isSwapped}
                showFurigana={showFurigana}
                isContextMode={isContextMode}
                isFavorite={favoriteIds.has(currentCard.id)}
                onFlip={handleFlip}
                onToggleFavorite={() => handleToggleFavorite(currentCard.id)}
                onAudioError={() => showToast("Phát âm tự động không khả dụng trên trình duyệt của bạn.")}
              />
            )}

            <FlashcardRatingBar
              isFlipped={isFlipped}
              onFlip={handleFlip}
              onRate={handleRate}
              onNext={handleNext}
              onPrev={handlePrev}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < deck.length - 1}
            />

            <FlashcardShortcutLegend />

            {onNextLesson && (
              <div className="pt-2 flex justify-center w-full">
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-gradient-to-r from-[#C65D4B] to-[#b54f3e] hover:from-[#b54f3e] hover:to-[#a34434] text-white font-extrabold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-98 cursor-pointer"
                >
                  <span>Bài tiếp theo</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 border border-amber-200 mx-auto flex items-center justify-center text-xl font-bold">
              ❓
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-black text-[#231917]">Thoát phiên học thẻ?</h3>
              <p className="text-xs font-semibold text-[#76685F]">
                Tiến trình thẻ đã học của bạn sẽ được lưu tự động để tiếp tục lần sau.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="py-2.5 px-4 bg-[#FAF3EB] hover:bg-[#F5EFE6] text-[#6E5E52] font-bold text-xs rounded-2xl border border-[#DED3C8] transition-colors cursor-pointer"
              >
                Tiếp tục học
              </button>
              <button
                type="button"
                onClick={handleConfirmExit}
                className="py-2.5 px-4 bg-[#C65D4B] hover:bg-[#b54f3e] text-white font-extrabold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                Thoát phiên
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
