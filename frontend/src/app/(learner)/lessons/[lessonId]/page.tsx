"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { UserProfile } from "@/types/learner";
import { apiClient } from "@/lib/api/client";

import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import LessonProgressHeader from "@/components/learner/lesson/LessonProgressHeader";
import LessonContentTabs from "@/components/learner/lesson/LessonContentTabs";
import VocabularyLearningItem, { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
import FlashcardStudyMode from "@/components/learner/lesson/FlashcardStudyMode";
import TypingStudyMode from "@/components/learner/lesson/TypingStudyMode";
import KanjiLearningItem, { LessonKanjiDto } from "@/components/learner/lesson/KanjiLearningItem";
import GrammarLearningItem, { GrammarPointDto } from "@/components/learner/lesson/GrammarLearningItem";
import LessonCompletedBanner from "@/components/learner/lesson/LessonCompletedBanner";
import LessonDetailSkeleton from "@/components/learner/lesson/LessonDetailSkeleton";
import HomeErrorState from "@/components/learner/HomeErrorState";

export default function LearnerLessonStudyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.lessonId as string;

  const initialTab = (searchParams.get("tab") as "vocab" | "kanji" | "grammar") || "vocab";
  const [activeTab, setActiveTab] = useState<"vocab" | "kanji" | "grammar">(initialTab);
  const [vocabStudyMode, setVocabStudyMode] = useState<"list" | "flashcard" | "typing">("list");

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [lessonTitle, setLessonTitle] = useState<string>(`Bài học #${lessonId}`);
  const [levelCode, setLevelCode] = useState<string>("N5");
  const [sortOrder, setSortOrder] = useState<number | undefined>(undefined);

  const [vocabularies, setVocabularies] = useState<VocabularyDto[]>([]);
  const [kanjis, setKanjis] = useState<LessonKanjiDto[]>([]);
  const [grammars, setGrammars] = useState<GrammarPointDto[]>([]);

  // Track learned item IDs in localStorage for interactive progress
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
          setKanjis(res.data.kanjis || []);
          setGrammars(res.data.grammars || []);
        }
      } catch (e) {
        // Fallback fetch directly from curriculum endpoint
        const [vRes, kRes, gRes] = await Promise.all([
          fetch(`http://localhost:8080/api/v1/curriculum/lessons/${lessonId}/vocabularies`),
          fetch(`http://localhost:8080/api/v1/curriculum/lessons/${lessonId}/kanji`),
          fetch(`http://localhost:8080/api/v1/curriculum/lessons/${lessonId}/grammar`),
        ]);

        if (vRes.ok) setVocabularies(await vRes.json());
        if (kRes.ok) setKanjis(await kRes.json());
        if (gRes.ok) setGrammars(await gRes.json());
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

  // Toggle individual item learned status & post learning activity
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

    // Record activity on backend when newly completed
    if (isNew) {
      const [typePrefix, rawId] = itemKey.split("_");
      const contentId = Number(rawId);
      let contentType = "";
      if (typePrefix === "v") contentType = "VOCABULARY";
      else if (typePrefix === "g") contentType = "GRAMMAR";
      else if (typePrefix === "k") contentType = "KANJI";

      if (contentType && contentId) {
        try {
          await apiClient("/learner/activities", {
            method: "POST",
            body: JSON.stringify({ contentType, contentId, durationSeconds: 15 }),
          });
        } catch (err) {
          console.error("Failed to post activity", err);
        }
      }
    }
  };

  // Computations for progress indicators
  const totalItemsCount = vocabularies.length + kanjis.length + grammars.length;
  const totalLearnedCount = useMemo(() => {
    let count = 0;
    vocabularies.forEach((v) => { if (learnedItemKeys.has(`v_${v.vocabularyId}`)) count++; });
    kanjis.forEach((k) => { if (learnedItemKeys.has(`k_${k.kanjiId}`)) count++; });
    grammars.forEach((g) => { if (learnedItemKeys.has(`g_${g.grammarId}`)) count++; });
    return count;
  }, [vocabularies, kanjis, grammars, learnedItemKeys]);

  const overallProgressPercentage = useMemo(() => {
    if (totalItemsCount === 0) return 0;
    return Math.round((totalLearnedCount / totalItemsCount) * 100);
  }, [totalLearnedCount, totalItemsCount]);

  const activeTabLearnedCount = useMemo(() => {
    if (activeTab === "vocab") return vocabularies.filter((v) => learnedItemKeys.has(`v_${v.vocabularyId}`)).length;
    if (activeTab === "kanji") return kanjis.filter((k) => learnedItemKeys.has(`k_${k.kanjiId}`)).length;
    if (activeTab === "grammar") return grammars.filter((g) => learnedItemKeys.has(`g_${g.grammarId}`)).length;
    return 0;
  }, [activeTab, vocabularies, kanjis, grammars, learnedItemKeys]);

  const activeTabTotalCount = useMemo(() => {
    if (activeTab === "vocab") return vocabularies.length;
    if (activeTab === "kanji") return kanjis.length;
    if (activeTab === "grammar") return grammars.length;
    return 0;
  }, [activeTab, vocabularies, kanjis, grammars]);

  const isLessonMastered = totalItemsCount > 0 && totalLearnedCount === totalItemsCount;

  if (loading) return <LessonDetailSkeleton />;
  if (error) return <HomeErrorState message={error} onRetry={fetchStudyContent} />;

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
            lessonTitle={lessonTitle}
            totalItems={totalItemsCount}
            onRestart={() => {
              setLearnedItemKeys(new Set());
              if (typeof window !== "undefined") {
                localStorage.removeItem(`learned_items_lesson_${lessonId}`);
              }
            }}
          />
        )}

        {/* Primary Content Category Tabs */}
        <LessonContentTabs
          activeTab={activeTab}
          vocabCount={vocabularies.length}
          kanjiCount={kanjis.length}
          grammarCount={grammars.length}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setVocabStudyMode("list");
          }}
        />

        {/* Dynamic Study Content View */}
        <div className="space-y-6">
          {/* TAB 1: VOCABULARY */}
          {activeTab === "vocab" && (
            <div className="space-y-6">
              {/* Study Mode Selector Sub-bar */}
              <div className="flex items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] p-2 rounded-2xl">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setVocabStudyMode("list")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      vocabStudyMode === "list"
                        ? "bg-[#C65D4B] text-white shadow-xs"
                        : "text-[#6E5E52] hover:text-[#2C2421]"
                    }`}
                  >
                    📋 Danh sách ({vocabularies.length})
                  </button>
                  <button
                    onClick={() => setVocabStudyMode("flashcard")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      vocabStudyMode === "flashcard"
                        ? "bg-[#C65D4B] text-white shadow-xs"
                        : "text-[#6E5E52] hover:text-[#2C2421]"
                    }`}
                  >
                    🎴 Flashcard Quizlet
                  </button>
                  <button
                    onClick={() => setVocabStudyMode("typing")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      vocabStudyMode === "typing"
                        ? "bg-[#C65D4B] text-white shadow-xs"
                        : "text-[#6E5E52] hover:text-[#2C2C21]"
                    }`}
                  >
                    ⌨️ Luyện gõ Tiếng Nhật
                  </button>
                </div>

                <span className="hidden sm:inline-block text-[11px] text-[#8C7B70] font-medium pr-2">
                  Luyện tập tự do không làm ảnh hưởng tiến độ bài học
                </span>
              </div>

              {vocabularies.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
                  Chưa có bài từ vựng nào trong bài học này.
                </div>
              ) : vocabStudyMode === "list" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vocabularies.map((v) => (
                    <VocabularyLearningItem
                      key={v.vocabularyId}
                      item={v}
                      isLearned={learnedItemKeys.has(`v_${v.vocabularyId}`)}
                      onToggleLearned={() => handleToggleLearned(`v_${v.vocabularyId}`)}
                    />
                  ))}
                </div>
              ) : vocabStudyMode === "flashcard" ? (
                <FlashcardStudyMode vocabularies={vocabularies} lessonId={lessonId} />
              ) : (
                <TypingStudyMode vocabularies={vocabularies} />
              )}
            </div>
          )}

          {/* TAB 2: KANJI */}
          {activeTab === "kanji" && (
            <div className="space-y-6">
              {kanjis.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
                  Chưa có Hán tự (Kanji) nào trong bài học này.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {kanjis.map((k) => (
                    <KanjiLearningItem
                      key={k.kanjiId}
                      item={k}
                      isLearned={learnedItemKeys.has(`k_${k.kanjiId}`)}
                      onToggleLearned={() => handleToggleLearned(`k_${k.kanjiId}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GRAMMAR */}
          {activeTab === "grammar" && (
            <div className="space-y-6">
              {grammars.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
                  Chưa có mẫu ngữ pháp nào trong bài học này.
                </div>
              ) : (
                <div className="space-y-4">
                  {grammars.map((g) => (
                    <GrammarLearningItem
                      key={g.grammarId}
                      item={g}
                      isLearned={learnedItemKeys.has(`g_${g.grammarId}`)}
                      onToggleLearned={() => handleToggleLearned(`g_${g.grammarId}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <LearnerFooter />
    </div>
  );
}
