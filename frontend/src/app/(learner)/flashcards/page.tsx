"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import { UserProfile } from "@/types/learner";
import FlashcardContainer from "@/components/learner/flashcard/FlashcardContainer";
import { FlashcardItemDto, FlashcardRating } from "@/components/learner/flashcard/types";

interface RawFlashcardItem {
  progressId?: number;
  contentType: "VOCABULARY" | "KANJI" | "GRAMMAR";
  contentId: number;
  front: string;
  reading?: string;
  meaning: string;
  example?: string;
  audioUrl?: string;
  state?: string;
  easeFactor?: number;
  intervalDays?: number;
  nextReviewAt?: string;
  reviewCount?: number;
}

export default function FlashcardsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFavoritesMode = searchParams.get("favorites") === "true";

  const [user, setUser] = useState<UserProfile | null>(null);
  const [rawCards, setRawCards] = useState<RawFlashcardItem[]>([]);
  const [favoriteCards, setFavoriteCards] = useState<RawFlashcardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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

      // Fetch due flashcards
      const res = await apiClient<RawFlashcardItem[]>("/learner/flashcards/due");
      if (res.data) {
        setRawCards(res.data);
      }

      // Fetch favorite vocabularies from backend API
      try {
        const favRes = await apiClient<any[]>("/learner/favorites/vocabularies");
        if (favRes.data && Array.isArray(favRes.data)) {
          const mappedFavs: RawFlashcardItem[] = favRes.data.map((v) => ({
            contentId: v.vocabularyId,
            contentType: "VOCABULARY",
            front: v.word,
            reading: v.furigana || v.romaji,
            meaning: v.meaningVi,
            example: v.exampleJp,
            audioUrl: v.audioUrl,
            state: "NEW",
          }));
          setFavoriteCards(mappedFavs);
        }
      } catch {
        // Fallback gracefully
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Không thể tải danh sách thẻ flashcard cần ôn.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDueFlashcards();
  }, [fetchDueFlashcards]);

  const flashcardItems: FlashcardItemDto[] = useMemo(() => {
    const cardList = (isFavoritesMode && favoriteCards.length > 0) ? favoriteCards : rawCards;
    return (cardList || []).map((c) => ({
      id: c.contentId,
      word: c.front || "",
      kana: c.reading || "",
      meaningVi: c.meaning || "",
      exampleJp: c.example || "",
      audioUrl: c.audioUrl || "",
      contentType: c.contentType || "VOCABULARY",
    }));
  }, [rawCards, favoriteCards, isFavoritesMode]);

  const handleReviewApiSync = async (item: FlashcardItemDto, rating: FlashcardRating) => {
    const ratingMap: Record<FlashcardRating, "AGAIN" | "GOOD" | "EASY"> = {
      UNMASTERED: "AGAIN",
      SOMEWHAT: "GOOD",
      MASTERED: "EASY",
    };

    try {
      await apiClient("/learner/flashcards/review", {
        method: "POST",
        body: JSON.stringify({
          contentType: item.contentType || "VOCABULARY",
          contentId: item.id,
          rating: ratingMap[rating],
          durationSeconds: 8,
        }),
      });
    } catch (err) {
      console.error("Failed to sync flashcard review with backend", err);
    }
  };

  return (
    <FlashcardContainer
      items={flashcardItems}
      levelCode="JLPT"
      lessonTitle={isFavoritesMode ? "❤️ Ôn tập từ vựng yêu thích & chưa nhớ" : "Ôn tập thẻ ghi nhớ đến hạn"}
      user={user}
      storageKey="due_flashcards_session"
      loading={loading}
      error={error}
      onRetry={fetchDueFlashcards}
      onBack={() => router.push("/vocabularies")}
      onReviewApiSync={handleReviewApiSync}
    />
  );
}
