"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { UserProfile } from "@/types/learner";
import { apiClient } from "@/lib/api/client";
import { CheckCircle2, RotateCcw, Sparkles, CheckCheck, Gamepad2 } from "lucide-react";

import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import LessonProgressHeader from "@/components/learner/lesson/LessonProgressHeader";
import VocabularyLearningItem, { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
import FlashcardStudyMode from "@/components/learner/lesson/FlashcardStudyMode";
import TypingStudyMode from "@/components/learner/lesson/TypingStudyMode";
import VocabMatchGame3D from "@/components/ui/VocabMatchGame3D";
import LessonCompletedBanner from "@/components/learner/lesson/LessonCompletedBanner";
import LessonDetailSkeleton from "@/components/learner/lesson/LessonDetailSkeleton";
import HomeErrorState from "@/components/learner/HomeErrorState";

export default function LearnerLessonStudyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.lessonId as string;

  const modeParam = searchParams.get("mode");
  const initialMode =
    modeParam === "flashcard" || modeParam === "cards"
      ? "flashcard"
      : modeParam === "typing"
      ? "typing"
      : modeParam === "match" || modeParam === "game"
      ? "match"
      : "list";

  const [vocabStudyMode, setVocabStudyMode] = useState<"list" | "flashcard" | "typing" | "match">(initialMode);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [lessonTitle, setLessonTitle] = useState<string>(`Bài học #${lessonId}`);
  const [levelCode, setLevelCode] = useState<string>("N5");
  const [sortOrder, setSortOrder] = useState<number | undefined>(undefined);

  const [vocabularies, setVocabularies] = useState<VocabularyDto[]>([]);

  // Track learned vocabulary item IDs in localStorage
  const [learnedItemKeys, setLearnedItemKeys] = useState<Set<string>>(new Set());

  // Load user profile & stored learned progress
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }

      const savedProgress = localStorage.getItem(`learned_items_lesson_${lessonId}`);
      if (savedProgress) {
        try {
          setLearnedItemKeys(new Set(JSON.parse(savedProgress)));
        } catch (e) {
          console.error("Failed to parse saved progress", e);
        }
      }
    }
  }, [lessonId]);

  const fetchStudyContent = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      try {
        const res = await apiClient<any>(`/learner/lessons/${lessonId}/content`);
        if (res.data) {
          setLessonTitle(res.data.title || `Bài học #${lessonId}`);
          setLevelCode(res.data.levelCode || "N5");
          if (res.data.sortOrder) setSortOrder(res.data.sortOrder);
          setVocabularies(res.data.vocabularies || []);
        }
      } catch (e) {
        const vRes = await fetch(`http://localhost:8080/api/v1/curriculum/lessons/${lessonId}/vocabularies`);
        if (vRes.ok) setVocabularies(await vRes.json());
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) fetchStudyContent();
  }, [lessonId, fetchStudyContent]);

  // Toggle individual vocabulary item learned status
  const handleToggleLearned = async (itemKey: string) => {
    const isNew = !learnedItemKeys.has(itemKey);

    setLearnedItemKeys((prev) => {
      const updated = new Set(prev);
      if (updated.has(itemKey)) {
        updated.delete(itemKey);
      } else {
        updated.add(itemKey);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(`learned_items_lesson_${lessonId}`, JSON.stringify(Array.from(updated)));
      }
      return updated;
    });

    if (isNew) {
      const rawId = itemKey.replace("v_", "");
      const contentId = Number(rawId);
      if (contentId) {
        try {
          await apiClient("/learner/activities", {
            method: "POST",
            body: JSON.stringify({ contentType: "VOCABULARY", contentId, durationSeconds: 15 }),
          });
        } catch (err) {
          console.error("Failed to post activity", err);
        }
      }
    }
  };

  // BULK ACTION 1: Mark ALL vocabularies in this lesson as learned at once!
  const handleMarkAllLearned = () => {
    const allKeys = new Set(vocabularies.map((v) => `v_${v.vocabularyId}`));
    setLearnedItemKeys(allKeys);
    if (typeof window !== "undefined") {
      localStorage.setItem(`learned_items_lesson_${lessonId}`, JSON.stringify(Array.from(allKeys)));
    }
  };

  // BULK ACTION 2: Reset learned status for relearning
  const handleResetAll = () => {
    setLearnedItemKeys(new Set());
    if (typeof window !== "undefined") {
      localStorage.removeItem(`learned_items_lesson_${lessonId}`);
    }
  };

  // Vocabulary-only progress indicators
  const totalItemsCount = vocabularies.length;
  const totalLearnedCount = useMemo(() => {
    return vocabularies.filter((v) => learnedItemKeys.has(`v_${v.vocabularyId}`)).length;
  }, [vocabularies, learnedItemKeys]);

  const overallProgressPercentage = useMemo(() => {
    if (totalItemsCount === 0) return 0;
    return Math.round((totalLearnedCount / totalItemsCount) * 100);
  }, [totalLearnedCount, totalItemsCount]);

  const isLessonMastered = totalItemsCount > 0 && totalLearnedCount === totalItemsCount;

  // 100% Completion Sync to API and LocalStorage
  useEffect(() => {
    if (isLessonMastered && lessonId) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`completed_lesson_${lessonId}`, "100");
        if (sortOrder) {
          localStorage.setItem(`completed_lesson_${sortOrder}`, "100");
        }
      }

      apiClient("/learner/progress", {
        method: "POST",
        body: JSON.stringify({
          lessonId: Number(lessonId),
          status: "COMPLETED",
          progressPercentage: 100,
        }),
      }).catch((err) => {
        console.error("Failed to sync completed progress to backend:", err);
      });
    }
  }, [isLessonMastered, lessonId, sortOrder]);

  if (loading) return <LessonDetailSkeleton />;
  if (error) return <HomeErrorState message={error} onRetry={fetchStudyContent} />;

  if (vocabStudyMode === "flashcard") {
    return (
      <FlashcardStudyMode
        vocabularies={vocabularies}
        lessonId={lessonId}
        levelCode={levelCode}
        lessonTitle={lessonTitle}
        onBack={() => {
          setVocabStudyMode("list");
        }}
      />
    );
  }

  const nextLessonIdCalc = sortOrder ? Number(sortOrder) + 1 : Number(lessonId) + 1;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans text-[#2C2421]">
      <LearnerHeader user={user} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Lesson Progress Summary Header */}
        <LessonProgressHeader
          lessonId={lessonId}
          sortOrder={sortOrder}
          lessonTitle={lessonTitle}
          levelCode={levelCode}
          learnedCount={totalLearnedCount}
          totalCount={totalItemsCount}
          progressPercent={overallProgressPercentage}
          isCompleted={isLessonMastered}
        />

        {/* Lesson Completed Banner */}
        {isLessonMastered && (
          <LessonCompletedBanner
            levelCode={levelCode}
            nextLessonId={nextLessonIdCalc}
          />
        )}

        {/* 100% VOCABULARY STUDY SECTION */}
        <div className="space-y-6">
          {/* Study Mode Selector & Automated Bulk Progress Bar */}
          <div className="flex flex-wrap items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] p-3 rounded-2xl gap-3 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setVocabStudyMode("list")}
                className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  vocabStudyMode === "list"
                    ? "bg-[#C65D4B] text-white shadow-md"
                    : "text-[#6E5E52] hover:text-[#2C2421] bg-white border border-[#DED3C8]"
                }`}
              >
                📋 Danh sách ({vocabularies.length})
              </button>
              <button
                onClick={() => setVocabStudyMode("flashcard")}
                className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  (vocabStudyMode as string) === "flashcard"
                    ? "bg-[#C65D4B] text-white shadow-md"
                    : "text-[#6E5E52] hover:text-[#2C2421] bg-white border border-[#DED3C8]"
                }`}
              >
                🎴 Thẻ ghi nhớ 3D
              </button>
              <button
                onClick={() => setVocabStudyMode("typing")}
                className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  vocabStudyMode === "typing"
                    ? "bg-[#C65D4B] text-white shadow-md"
                    : "text-[#6E5E52] hover:text-[#2C2421] bg-white border border-[#DED3C8]"
                }`}
              >
                ⌨️ Luyện gõ Tiếng Nhật
              </button>

              {/* BRAND NEW 3D VOCAB MATCH GAME TAB */}
              <button
                onClick={() => setVocabStudyMode("match")}
                className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  vocabStudyMode === "match"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md ring-2 ring-amber-400/50"
                    : "text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300"
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>🎮 Game Ghép Thẻ 3D</span>
              </button>
            </div>

            {/* Smart Bulk Action Buttons */}
            <div className="flex items-center gap-2">
              {isLessonMastered ? (
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="px-3.5 py-2 text-xs font-black text-[#8B6F5A] bg-white hover:bg-rose-50 border border-[#DED3C8] hover:border-rose-300 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                  <span>Học lại từ đầu</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkAllLearned}
                  className="px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl transition-all flex items-center gap-1.5 shadow-md hover:scale-105 cursor-pointer"
                >
                  <CheckCheck className="w-4 h-4 text-white" />
                  <span>✓ Đánh dấu đã thuộc tất cả ({vocabularies.length} từ)</span>
                </button>
              )}
            </div>
          </div>

          {vocabularies.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1] font-bold">
              Chưa có từ vựng nào trong bài học này.
            </div>
          ) : vocabStudyMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {vocabularies.map((v) => (
                <VocabularyLearningItem
                  key={v.vocabularyId}
                  item={v}
                  isLearned={learnedItemKeys.has(`v_${v.vocabularyId}`)}
                  onToggleLearned={() => handleToggleLearned(`v_${v.vocabularyId}`)}
                />
              ))}
            </div>
          ) : vocabStudyMode === "typing" ? (
            <TypingStudyMode vocabularies={vocabularies} />
          ) : (
            /* RENDER 3D VOCAB MATCH GAME MODE */
            <VocabMatchGame3D
              vocabularies={vocabularies}
              onFinish={() => {
                handleMarkAllLearned(); // Mark 100% completed on winning game!
              }}
            />
          )}
        </div>
      </main>

      <LearnerFooter />
    </div>
  );
}
