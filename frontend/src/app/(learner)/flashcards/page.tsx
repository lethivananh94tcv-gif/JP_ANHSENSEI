"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import { UserProfile } from "@/types/learner";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";

interface FlashcardItem {
  progressId?: number;
  contentType: "VOCABULARY" | "KANJI" | "GRAMMAR";
  contentId: number;
  front: string;
  reading?: string;
  meaning: string;
  example?: string;
  audioUrl?: string;
  state: string;
  easeFactor: number;
  intervalDays: number;
  nextReviewAt: string;
  reviewCount: number;
}

export default function FlashcardsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [dueCards, setDueCards] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [completedCount, setCompletedCount] = useState<number>(0);

  const fetchDueFlashcards = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Failed to parse user", e);
          }
        }
      }

      const res = await apiClient<FlashcardItem[]>("/learner/flashcards/due");
      if (res.data) {
        setDueCards(res.data);
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Không thể tải danh sách thẻ flashcard.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDueFlashcards();
  }, [fetchDueFlashcards]);

  const currentCard = dueCards[currentIndex];

  const handleReview = async (rating: "AGAIN" | "HARD" | "GOOD" | "EASY") => {
    if (!currentCard || submitting) return;

    try {
      setSubmitting(true);
      await apiClient("/learner/flashcards/review", {
        method: "POST",
        body: JSON.stringify({
          contentType: currentCard.contentType,
          contentId: currentCard.contentId,
          rating,
          durationSeconds: 10,
        }),
      });

      setIsFlipped(false);
      setCompletedCount((prev) => prev + 1);

      if (currentIndex + 1 < dueCards.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(dueCards.length);
      }
    } catch (err: unknown) {
      console.error("Failed to review flashcard", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      await apiClient("/learner/flashcards/reset", { method: "POST" });
      await fetchDueFlashcards();
      setCurrentIndex(0);
      setCompletedCount(0);
    } catch (err) {
      console.error("Failed to reset flashcards", err);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard Shortcuts (Space: Flip, 1: AGAIN, 2: HARD, 3: GOOD, 4: EASY)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || submitting || !currentCard) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (isFlipped) {
        if (e.key === "1") handleReview("AGAIN");
        else if (e.key === "2") handleReview("HARD");
        else if (e.key === "3") handleReview("GOOD");
        else if (e.key === "4") handleReview("EASY");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, loading, submitting, currentCard]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFE6]">
        <LearnerHeader user={user} />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C65D4B] mx-auto"></div>
          <p className="mt-4 text-[#7A6B63] font-medium">Đang tải thẻ Flashcards ôn tập...</p>
        </main>
      </div>
    );
  }

  const isSessionFinished = dueCards.length === 0 || currentIndex >= dueCards.length;

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-sans text-[#231917] flex flex-col justify-between selection:bg-[#C65D4B]/20 selection:text-[#C65D4B]">
      <div>
        <LearnerHeader user={user} />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Banner */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#231917] tracking-tight">
                Luyện Tập Flashcards (SM-2)
              </h1>
              <p className="text-sm text-[#7A6B63]">
                Thuật toán lặp lại ngắt quãng tối ưu ghi nhớ dài hạn
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#D9CFC4] text-[#7A6B63] hover:bg-[#EFE8DC] transition-colors"
            >
              Đặt lại tiến độ
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {isSessionFinished ? (
            <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-10 text-center shadow-sm space-y-6">
              <div className="w-16 h-16 bg-[#2D5A27]/10 text-[#2D5A27] rounded-full flex items-center justify-center mx-auto text-3xl">
                🎉
              </div>
              <h2 className="text-xl font-bold text-[#231917]">
                Xuất sắc! Bạn đã hoàn thành tất cả thẻ cần ôn tập!
              </h2>
              <p className="text-sm text-[#7A6B63] max-w-md mx-auto">
                Bạn đã ôn tập {completedCount} thẻ hôm nay. Hãy quay lại vào ngày mai để tiếp tục lộ trình ghi nhớ tốt nhất!
              </p>
              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-2.5 bg-[#C65D4B] hover:bg-[#B04C3B] text-white font-semibold rounded-xl shadow-md transition-colors text-sm"
                >
                  Quay về Dashboard
                </button>
                <button
                  onClick={fetchDueFlashcards}
                  className="px-6 py-2.5 border border-[#D9CFC4] text-[#231917] hover:bg-[#EFE8DC] font-semibold rounded-xl transition-colors text-sm"
                >
                  Kiểm tra thẻ mới
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Indicator Bar */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#7A6B63] px-1">
                <span>
                  Thẻ {currentIndex + 1} / {dueCards.length}
                </span>
                <span>Đã ôn: {completedCount}</span>
              </div>
              <div className="w-full bg-[#EBE3D5] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#C65D4B] h-full transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / dueCards.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* 3D Flashcard Container */}
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className="w-full h-80 cursor-pointer perspective-1000"
              >
                <div
                  className={`w-full h-full relative transition-transform duration-500 transform-style-3d shadow-xl rounded-3xl border border-[#EBE3D5] ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 bg-[#FAF7F2] rounded-3xl p-8 flex flex-col justify-between backface-hidden">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-bold rounded-full uppercase tracking-wider">
                        {currentCard.contentType}
                      </span>
                      <span className="text-xs text-[#7A6B63]">Bấm lật mặt sau (Space)</span>
                    </div>

                    <div className="text-center my-auto">
                      <h2 className="text-4xl font-extrabold text-[#231917] tracking-tight">
                        {currentCard.front}
                      </h2>
                      {currentCard.reading && (
                        <p className="mt-3 text-lg font-medium text-[#7A6B63]">
                          {currentCard.reading}
                        </p>
                      )}
                    </div>

                    <p className="text-center text-xs text-[#A0938A] font-medium">
                      👆 Click vào card hoặc nhấn Phím Trắng để xem đáp án
                    </p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 bg-[#FFFDF9] rounded-3xl p-8 flex flex-col justify-between backface-hidden rotate-y-180 border-2 border-[#C65D4B]">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold rounded-full uppercase tracking-wider">
                        Ý nghĩa
                      </span>
                      {currentCard.audioUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const audio = new Audio(currentCard.audioUrl);
                            audio.play();
                          }}
                          className="w-8 h-8 rounded-full bg-[#EFE8DC] hover:bg-[#E2D8C7] flex items-center justify-center text-xs text-[#231917]"
                          title="Phát âm"
                        >
                          🔊
                        </button>
                      )}
                    </div>

                    <div className="text-center my-auto space-y-3">
                      <h3 className="text-2xl font-bold text-[#C65D4B]">
                        {currentCard.meaning}
                      </h3>
                      {currentCard.example && (
                        <div className="p-3 bg-[#F5EFE6] rounded-xl text-xs text-[#554740] italic max-w-md mx-auto">
                          "{currentCard.example}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#A0938A]">
                      <span>Khoảng cách: {currentCard.intervalDays} ngày</span>
                      <span>Hệ số EF: {currentCard.easeFactor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Buttons Bar */}
              {isFlipped ? (
                <div className="grid grid-cols-4 gap-3 pt-2">
                  <button
                    disabled={submitting}
                    onClick={() => handleReview("AGAIN")}
                    className="py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95 text-xs sm:text-sm flex flex-col items-center justify-center gap-1"
                  >
                    <span>AGAIN</span>
                    <span className="text-[10px] opacity-80">(Phím 1)</span>
                  </button>

                  <button
                    disabled={submitting}
                    onClick={() => handleReview("HARD")}
                    className="py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95 text-xs sm:text-sm flex flex-col items-center justify-center gap-1"
                  >
                    <span>HARD</span>
                    <span className="text-[10px] opacity-80">(Phím 2)</span>
                  </button>

                  <button
                    disabled={submitting}
                    onClick={() => handleReview("GOOD")}
                    className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95 text-xs sm:text-sm flex flex-col items-center justify-center gap-1"
                  >
                    <span>GOOD</span>
                    <span className="text-[10px] opacity-80">(Phím 3)</span>
                  </button>

                  <button
                    disabled={submitting}
                    onClick={() => handleReview("EASY")}
                    className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-md transition-transform active:scale-95 text-xs sm:text-sm flex flex-col items-center justify-center gap-1"
                  >
                    <span>EASY</span>
                    <span className="text-[10px] opacity-80">(Phím 4)</span>
                  </button>
                </div>
              ) : (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="w-full py-3.5 bg-[#C65D4B] hover:bg-[#B04C3B] text-white font-semibold rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
                  >
                    Lật thẻ xem đáp án (Space)
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <LearnerFooter />
    </div>
  );
}
