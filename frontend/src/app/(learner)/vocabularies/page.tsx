"use client";

import { useEffect, useState, useCallback, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import LearnerHeader from "@/components/learner/LearnerHeader";
import { Sparkles } from "lucide-react";

import {
  LearnerProfile,
  LevelItem,
  LessonItem,
  LessonProgressItem,
  ContinueLearningData,
  DueFlashcardsCountData,
  StreakData,
} from "@/components/learner/vocabularies/types";

import VocabularyHero from "@/components/learner/vocabularies/VocabularyHero";
import LevelSelector from "@/components/learner/vocabularies/LevelSelector";
import SelectedLessonProgress from "@/components/learner/vocabularies/SelectedLessonProgress";
import VocabularyModeSelector from "@/components/learner/vocabularies/VocabularyModeSelector";
import RecentLessonList from "@/components/learner/vocabularies/RecentLessonList";
import VocabularySidebar from "@/components/learner/vocabularies/VocabularySidebar";
import VocabularyAllLessonsModal from "@/components/learner/vocabularies/VocabularyAllLessonsModal";
import JapaneseKanaChartModal from "@/components/learner/vocabularies/JapaneseKanaChartModal";
import VocabularyHubSkeleton from "@/components/learner/vocabularies/VocabularyHubSkeleton";
import { VocabularyHubErrorState, VocabularyHubEmptyState } from "@/components/learner/vocabularies/VocabularyHubErrorState";

export default function LearnerVocabulariesHubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Core Data States
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [levels, setLevels] = useState<LevelItem[]>([]);
  const [selectedLevelCode, setSelectedLevelCode] = useState<string>("");
  const [selectedLevelObj, setSelectedLevelObj] = useState<LevelItem | null>(null);

  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [progressMap, setProgressMap] = useState<Record<number, LessonProgressItem>>({});

  const [continueData, setContinueData] = useState<ContinueLearningData | null>(null);
  const [dueData, setDueData] = useState<DueFlashcardsCountData | null>(null);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  // UI States
  const [loading, setLoading] = useState<boolean>(true);
  const [lessonsLoading, setLessonsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [correlationId, setCorrelationId] = useState<string | undefined>(undefined);
  const [isAllLessonsOpen, setIsAllLessonsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"list" | "cards" | "typing" | "match" | null>(null);
  const [isKanaModalOpen, setIsKanaModalOpen] = useState<boolean>(false);

  // Load Lessons for a Level safely without race condition
  const loadLessonsForLevel = useCallback(async (
    targetLevel: LevelItem,
    continueInfo?: ContinueLearningData | null,
    currentProgressMap?: Record<number, LessonProgressItem>
  ) => {
    try {
      setLessonsLoading(true);

      const res = await apiClient<LessonItem[]>(`/learner/levels/${targetLevel.levelId}/lessons`);
      const publishedLessons = (res.data || []).filter((l) => l.status === "PUBLISHED");
      setLessons(publishedLessons);

      if (publishedLessons.length === 0) {
        setSelectedLesson(null);
        return;
      }

      const paramLessonId = searchParams.get("lessonId");
      let activeLesson: LessonItem | undefined;

      if (paramLessonId) {
        activeLesson = publishedLessons.find(
          (l) => String(l.lessonId) === paramLessonId || String(l.sortOrder) === paramLessonId
        );
      }

      if (!activeLesson && continueInfo && continueInfo.lessonId) {
        activeLesson = publishedLessons.find((l) => l.lessonId === continueInfo.lessonId || l.sortOrder === continueInfo.lessonId);
      }

      if (!activeLesson && currentProgressMap) {
        const inProgressLessons = publishedLessons.filter((l) => {
          const p = currentProgressMap[l.lessonId] || currentProgressMap[l.sortOrder];
          return p && p.status === "IN_PROGRESS";
        });

        const uncompletedLessons = publishedLessons.filter((l) => {
          const p = currentProgressMap[l.lessonId] || currentProgressMap[l.sortOrder];
          return !p || p.status !== "COMPLETED";
        });

        if (inProgressLessons.length > 0) {
          activeLesson = inProgressLessons[0];
        } else if (uncompletedLessons.length > 0) {
          activeLesson = uncompletedLessons[0];
        }
      }

      if (!activeLesson && publishedLessons.length > 0) {
        activeLesson = [...publishedLessons].sort((a, b) => a.sortOrder - b.sortOrder)[0];
      }

      if (activeLesson) {
        setSelectedLesson(activeLesson);
        const params = new URLSearchParams(searchParams.toString());
        params.set("level", targetLevel.code);
        params.set("lessonId", String(activeLesson.sortOrder || activeLesson.lessonId));
        startTransition(() => {
          router.replace(`/vocabularies?${params.toString()}`, { scroll: false });
        });
      }
    } catch (e) {
      console.error("Lỗi khi tải bài học của cấp độ:", e);
      setLessons([]);
      setSelectedLesson(null);
    } finally {
      setLessonsLoading(false);
    }
  }, [searchParams, router]);

  // 1. Initial Load: Profile, Levels, Continue Learning & Flashcard Due Count
  const initializePageData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setCorrelationId(undefined);

      const [profileRes, levelsRes, continueRes, dueRes, progressRes] = await Promise.allSettled([
        apiClient<LearnerProfile>("/learner/profile"),
        apiClient<LevelItem[]>("/learner/levels"),
        apiClient<ContinueLearningData>("/learner/continue-learning"),
        apiClient<DueFlashcardsCountData>("/learner/flashcards/due-count"),
        apiClient<LessonProgressItem[]>("/learner/progress"),
      ]);

      let userProfile: LearnerProfile | null = null;
      if (profileRes.status === "fulfilled" && profileRes.value.data) {
        userProfile = profileRes.value.data;
        setProfile(userProfile);
      }

      let publishedLevels: LevelItem[] = [];
      if (levelsRes.status === "fulfilled" && levelsRes.value.data) {
        publishedLevels = levelsRes.value.data.filter((l) => l.status === "PUBLISHED");
        setLevels(publishedLevels);
      }

      let continueLearning: ContinueLearningData | null = null;
      if (continueRes.status === "fulfilled" && continueRes.value.data) {
        continueLearning = continueRes.value.data;
        setContinueData(continueLearning);
      }

      if (dueRes.status === "fulfilled" && dueRes.value.data) {
        setDueData(dueRes.value.data);
      }

      const pMap: Record<number, LessonProgressItem> = {};
      if (progressRes.status === "fulfilled" && progressRes.value.data) {
        progressRes.value.data.forEach((p) => {
          pMap[p.lessonId] = p;
        });
      }

      // Sync local storage completion fallbacks so 100% completed lessons immediately reflect outside
      if (typeof window !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("completed_lesson_") || key.startsWith("learned_items_lesson_"))) {
            const lessonIdNum = Number(key.replace("completed_lesson_", "").replace("learned_items_lesson_", ""));
            if (lessonIdNum) {
              let isComp = false;
              if (key.startsWith("completed_lesson_")) {
                const val = localStorage.getItem(key);
                isComp = val === "100" || val === "true";
              } else {
                try {
                  const arr = JSON.parse(localStorage.getItem(key) || "[]");
                  if (Array.isArray(arr) && arr.length > 0) {
                    isComp = true;
                  }
                } catch {}
              }

              if (isComp && (!pMap[lessonIdNum] || pMap[lessonIdNum].completionPercent < 100)) {
                pMap[lessonIdNum] = {
                  progressId: lessonIdNum,
                  lessonId: lessonIdNum,
                  status: "COMPLETED",
                  completionPercent: 100,
                  lastAccessedAt: new Date().toISOString(),
                };
              }
            }
          }
        }
      }
      setProgressMap(pMap);

      // Determine Selected Level
      const paramLevel = searchParams.get("level");
      let activeLevel: LevelItem | undefined;

      if (paramLevel && publishedLevels.length > 0) {
        activeLevel = publishedLevels.find((l) => l.code.toUpperCase() === paramLevel.toUpperCase());
      }
      if (!activeLevel && userProfile?.targetLevel && publishedLevels.length > 0) {
        activeLevel = publishedLevels.find((l) => l.code.toUpperCase() === userProfile.targetLevel?.toUpperCase());
      }
      if (!activeLevel && publishedLevels.length > 0) {
        activeLevel = [...publishedLevels].sort((a, b) => a.sortOrder - b.sortOrder)[0];
      }

      if (activeLevel) {
        setSelectedLevelCode(activeLevel.code);
        await loadLessonsForLevel(activeLevel, continueLearning, pMap);
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
        setCorrelationId(err.correlationId);
      } else {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.");
      }
    } finally {
      setLoading(false);
    }
  }, [searchParams, loadLessonsForLevel]);

  // Event Handlers:
  // Level selection handler
  const handleSelectLevel = async (newLevelCode: string) => {
    if (newLevelCode.toUpperCase() === selectedLevelCode.toUpperCase()) return;

    const targetLvl = levels.find((l) => l.code.toUpperCase() === newLevelCode.toUpperCase());
    if (!targetLvl) return;

    setSelectedLevelCode(targetLvl.code);

    await loadLessonsForLevel(targetLvl, continueData, progressMap);
  };

  // Prevent page data re-initialization on searchParams changes
  const isInitializedRef = useRef(false);

  // Lesson selection handler (pure local state update, zero page reloads)
  const handleSelectLesson = (lesson: LessonItem) => {
    setSelectedLesson(lesson);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("level", selectedLevelCode);
      url.searchParams.set("lessonId", String(lesson.sortOrder || lesson.lessonId));
      window.history.replaceState(null, "", url.toString());
    }
  };

  // Mode Selection Navigation -> Prompt user with lesson selector modal
  const handleSelectMode = (mode: "list" | "cards" | "typing" | "match") => {
    setModalMode(mode);
    setIsAllLessonsOpen(true);
  };

  const getCanonicalLessonId = (lesson: LessonItem) => {
    const isN4 = selectedLevelCode === "N4" || (lesson.lessonId >= 100 && lesson.lessonId <= 150);
    return isN4 ? 25 + lesson.sortOrder : lesson.sortOrder;
  };

  const handleOpenLesson = (lesson: LessonItem, mode?: "list" | "cards" | "typing" | "match" | null) => {
    const targetId = getCanonicalLessonId(lesson);
    if (mode) {
      router.push(`/lessons/${targetId}?mode=${mode}`);
    } else {
      router.push(`/lessons/${targetId}`);
    }
  };

  // Primary Action Buttons Navigation
  const handleContinueLatest = () => {
    if (continueData && continueData.lessonId) {
      const mode = continueData.lastMode || "cards";
      const isN4 = selectedLevelCode === "N4" || continueData.lessonId >= 100;
      const targetId = isN4 ? (continueData.lessonId > 25 && continueData.lessonId <= 50 ? continueData.lessonId : 25 + (continueData.sortOrder || 1)) : (continueData.sortOrder || continueData.lessonId);
      router.push(`/lessons/${targetId}?mode=${mode}`);
    } else if (selectedLesson) {
      const targetId = getCanonicalLessonId(selectedLesson);
      router.push(`/lessons/${targetId}?mode=cards`);
    } else if (lessons.length > 0) {
      const targetId = getCanonicalLessonId(lessons[0]);
      router.push(`/lessons/${targetId}?mode=cards`);
    }
  };

  const handleContinueLesson = (lessonToOpen?: LessonItem) => {
    const target = lessonToOpen || selectedLesson;
    if (!target) return;
    const targetId = getCanonicalLessonId(target);
    router.push(`/lessons/${targetId}`);
  };

  const handleReviewDueFlashcards = () => {
    if (selectedLevelCode) {
      router.push(`/flashcards?level=${selectedLevelCode}`);
    } else {
      router.push("/flashcards");
    }
  };

  const nextSuggestedLesson = lessons.find((l) => {
    const p = progressMap[l.lessonId] || progressMap[l.sortOrder];
    return !p || (p.completionPercent < 100 && p.status !== "COMPLETED");
  });

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      initializePageData();
    }
  }, [initializePageData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFE6] text-[#302A26] font-sans">
        <LearnerHeader user={profile} />
        <VocabularyHubSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5EFE6] text-[#302A26] font-sans">
        <LearnerHeader user={profile} />
        <VocabularyHubErrorState message={error} correlationId={correlationId} onRetry={initializePageData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#302A26] font-sans flex flex-col">
      <LearnerHeader user={profile} />

      <main className="flex-1 w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-[#756A62]">
          <Link href="/dashboard" className="hover:text-[#C65D4B] transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-[#C65D4B] font-extrabold">Từ vựng</span>
        </nav>

        {/* 1. Hero Section */}
        <VocabularyHero
          onContinueLatest={handleContinueLatest}
          dueData={dueData}
          disabled={!continueData && !selectedLesson && lessons.length === 0}
        />

        {/* 2. Level Selector Segmented Control */}
        <LevelSelector
          levels={levels}
          selectedLevelCode={selectedLevelCode}
          targetLevel={profile?.targetLevel}
          onSelectLevel={handleSelectLevel}
        />

        {/* Kana Alphabet Quick Access Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-5 sm:p-6 shadow-md hover:border-[#C65D4B]/50 transition-colors">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] text-white font-jp font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              あ
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-extrabold text-[#231917] flex items-center gap-2">
                <span>Bảng Chữ Cái Tiếng Nhật Kana (Hiragana & Katakana)</span>
                <Sparkles className="w-4 h-4 text-[#C65D4B]" />
              </h4>
              <p className="text-xs text-[#76685F] font-medium">
                Tra cứu phát âm giọng bản xứ 🔊, tập đọc 46 ký tự Hiragana & Katakana chuẩn JLPT N5
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsKanaModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs rounded-2xl shadow-lg border border-white/20 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Mở Bảng Chữ Cái Kana ➔</span>
          </button>
        </div>

        {/* 3. Main Full-Width Study Workspace */}
        <div className="w-full space-y-6 sm:space-y-8">
          {lessonsLoading ? (
            <div className="w-full bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-8 h-[160px] animate-pulse" />
          ) : selectedLesson ? (
            <SelectedLessonProgress
              lesson={selectedLesson}
              nextLesson={nextSuggestedLesson}
              progress={progressMap[selectedLesson.lessonId] || progressMap[selectedLesson.sortOrder]}
              nextLessonProgress={nextSuggestedLesson ? (progressMap[nextSuggestedLesson.lessonId] || progressMap[nextSuggestedLesson.sortOrder]) : null}
              dueData={dueData}
              onContinueLesson={handleContinueLesson}
              onReviewDueFlashcards={handleReviewDueFlashcards}
            />
          ) : (
            <VocabularyHubEmptyState
              title={`Cấp độ ${selectedLevelCode} chưa có bài học`}
              description="Hệ thống đang chuẩn bị dữ liệu bài học cho trình độ này."
            />
          )}

          {/* 4. Recent Lesson List (Kho Bài Học) */}
          {lessons.length > 0 && (
            <RecentLessonList
              levelCode={selectedLevelCode}
              lessons={lessons}
              selectedLessonId={selectedLesson?.sortOrder || selectedLesson?.lessonId}
              progressMap={progressMap}
              onSelectLesson={handleSelectLesson}
              onOpenLesson={handleContinueLesson}
              onOpenAllLessons={() => {
                setModalMode(null);
                setIsAllLessonsOpen(true);
              }}
            />
          )}

          {/* 5. Study Modes Selector (Phương pháp học) */}
          <VocabularyModeSelector
            onSelectMode={handleSelectMode}
            disabled={lessons.length === 0}
          />
        </div>
      </main>

      {/* All Lessons Modal */}
      <VocabularyAllLessonsModal
        isOpen={isAllLessonsOpen}
        levelCode={selectedLevelCode}
        targetMode={modalMode}
        lessons={lessons}
        progressMap={progressMap}
        selectedLessonId={selectedLesson?.sortOrder || selectedLesson?.lessonId}
        onClose={() => {
          setIsAllLessonsOpen(false);
          setModalMode(null);
        }}
        onSelectLesson={handleSelectLesson}
        onOpenLesson={handleOpenLesson}
      />

      {/* Japanese Kana Alphabet Chart Modal */}
      <JapaneseKanaChartModal
        isOpen={isKanaModalOpen}
        onClose={() => setIsKanaModalOpen(false)}
      />
    </div>
  );
}
