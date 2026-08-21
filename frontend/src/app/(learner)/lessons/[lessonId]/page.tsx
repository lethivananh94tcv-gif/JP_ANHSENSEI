"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { UserProfile } from "@/types/learner";

import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import LessonProgressHeader from "@/components/learner/lesson/LessonProgressHeader";
import LessonContentTabs from "@/components/learner/lesson/LessonContentTabs";
import VocabularyLearningItem, { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
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

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [lessonTitle, setLessonTitle] = useState<string>(`Bài học #${lessonId}`);
  const [levelCode, setLevelCode] = useState<string>("N5");

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

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token") || localStorage.getItem("auth_token")
          : "";
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      const [vRes, kRes, gRes] = await Promise.all([
        fetch(`/api/v1/curriculum/lessons/${lessonId}/vocabularies`, { headers }),
        fetch(`/api/v1/curriculum/lessons/${lessonId}/kanji`, { headers }),
        fetch(`/api/v1/curriculum/lessons/${lessonId}/grammar`, { headers }),
      ]);

      let vData: VocabularyDto[] = [];
      let kData: LessonKanjiDto[] = [];
      let gData: GrammarPointDto[] = [];

      if (vRes.ok) vData = await vRes.json();
      if (kRes.ok) kData = await kRes.json();
      if (gRes.ok) gData = await gRes.json();

      setVocabularies(Array.isArray(vData) ? vData : []);
      setKanjis(Array.isArray(kData) ? kData : []);
      setGrammars(Array.isArray(gData) ? gData : []);

      // If lesson metadata fetch exists
      if (gData.length > 0 && gData[0].jlptLevel) {
        setLevelCode(gData[0].jlptLevel);
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

  // Toggle individual item learned status
  const handleToggleLearned = (itemKey: string) => {
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
  };

  // Calculate totals & progress percent
  const totalItemsCount = useMemo(() => {
    return vocabularies.length + kanjis.length + grammars.length;
  }, [vocabularies.length, kanjis.length, grammars.length]);

  const learnedCount = useMemo(() => {
    let count = 0;
    vocabularies.forEach((v) => {
      if (learnedItemKeys.has(`v_${v.vocabularyId}`)) count++;
    });
    kanjis.forEach((k) => {
      if (learnedItemKeys.has(`k_${k.kanjiId}`)) count++;
    });
    grammars.forEach((g) => {
      if (learnedItemKeys.has(`g_${g.grammarId}`)) count++;
    });
    return count;
  }, [vocabularies, kanjis, grammars, learnedItemKeys]);

  const progressPercent = useMemo(() => {
    if (totalItemsCount === 0) return 0;
    return Math.min(Math.round((learnedCount / totalItemsCount) * 100), 100);
  }, [learnedCount, totalItemsCount]);

  const isCompleted = totalItemsCount > 0 && learnedCount === totalItemsCount;

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-sans text-[#231917] flex flex-col justify-between">
      <div>
        <LearnerHeader user={user} />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {loading ? (
            <LessonDetailSkeleton />
          ) : error ? (
            <HomeErrorState message={error} onRetry={fetchStudyContent} />
          ) : (
            <>
              {/* Header Progress & Banner */}
              <LessonProgressHeader
                lessonId={lessonId}
                lessonTitle={lessonTitle}
                levelCode={levelCode}
                learnedCount={learnedCount}
                totalCount={totalItemsCount}
                progressPercent={progressPercent}
                isCompleted={isCompleted}
              />

              {/* Completion Banner */}
              {isCompleted && (
                <LessonCompletedBanner
                  levelCode={levelCode}
                  nextLessonId={Number(lessonId) + 1}
                />
              )}

              {/* Content Tabs Navigation */}
              <LessonContentTabs
                activeTab={activeTab}
                vocabCount={vocabularies.length}
                kanjiCount={kanjis.length}
                grammarCount={grammars.length}
                onTabChange={setActiveTab}
              />

              {/* Content Items Area */}
              {activeTab === "vocab" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {vocabularies.length === 0 ? (
                    <div className="col-span-full bg-[#FFFDF9] rounded-3xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
                      Chưa có bài từ vựng nào trong bài học này.
                    </div>
                  ) : (
                    vocabularies.map((v) => (
                      <VocabularyLearningItem
                        key={v.vocabularyId}
                        item={v}
                        isLearned={learnedItemKeys.has(`v_${v.vocabularyId}`)}
                        onToggleLearned={() => handleToggleLearned(`v_${v.vocabularyId}`)}
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === "kanji" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {kanjis.length === 0 ? (
                    <div className="col-span-full bg-[#FFFDF9] rounded-3xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
                      Chưa có Hán tự nào trong bài học này.
                    </div>
                  ) : (
                    kanjis.map((k) => (
                      <KanjiLearningItem
                        key={k.kanjiId}
                        item={k}
                        isLearned={learnedItemKeys.has(`k_${k.kanjiId}`)}
                        onToggleLearned={() => handleToggleLearned(`k_${k.kanjiId}`)}
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === "grammar" && (
                <div className="space-y-6">
                  {grammars.length === 0 ? (
                    <div className="bg-[#FFFDF9] rounded-3xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
                      Chưa có cấu trúc ngữ pháp nào trong bài học này.
                    </div>
                  ) : (
                    grammars.map((g) => (
                      <GrammarLearningItem
                        key={g.grammarId}
                        item={g}
                        isLearned={learnedItemKeys.has(`g_${g.grammarId}`)}
                        onToggleLearned={() => handleToggleLearned(`g_${g.grammarId}`)}
                      />
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <LearnerFooter />
    </div>
  );
}
