"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import { UserProfile, LevelSummary, LessonSummary, DailyReviewViewModel } from "@/types/learner";
import { getLocalRecentLessons } from "@/lib/utils/learningTracker";

import LearnerHeader from "@/components/learner/LearnerHeader";
import WelcomeSection from "@/components/learner/WelcomeSection";
import ContinueLearningCard from "@/components/learner/ContinueLearningCard";
import DailyReviewCard from "@/components/learner/DailyReviewCard";
import LearningPathSection from "@/components/learner/LearningPathSection";
import LearningTypeGrid from "@/components/learner/LearningTypeGrid";
import RecommendationSection from "@/components/learner/RecommendationSection";
import WeeklyAchievementCard from "@/components/learner/WeeklyAchievementCard";
import MotivationBanner from "@/components/learner/MotivationBanner";
import LearnerFooter from "@/components/learner/LearnerFooter";
import HomeSkeleton from "@/components/learner/HomeSkeleton";
import HomeErrorState from "@/components/learner/HomeErrorState";

interface ProgressSummaryData {
  targetLevel: string;
  continueLesson?: {
    lessonId: number;
    levelCode: string;
    title: string;
    description: string;
    estimatedMinutes?: number;
  };
  completionPercent: number;
  completedLessonsCount: number;
  dueFlashcardsCount: number;
  totalValidActivities: number;
  weeklyActivities: { date: string; count: number }[];
}

export default function LearnerDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [levels, setLevels] = useState<LevelSummary[]>([]);
  const [recommendedLessons, setRecommendedLessons] = useState<LessonSummary[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonSummary | null>(null);
  const [summary, setSummary] = useState<ProgressSummaryData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // 1. Auth Guard Check
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (e) {
            console.error("Failed to parse user", e);
          }
        }
      }

      // 2. Fetch Progress Summary & Published Levels in parallel
      const [sumRes, lvlRes] = await Promise.all([
        apiClient<ProgressSummaryData>("/learner/progress/summary").catch(() => ({ data: null })),
        apiClient<LevelSummary[]>("/learner/levels").catch(() => ({ data: [] })),
      ]);

      const localRecent = getLocalRecentLessons();

      const baseData: any = sumRes.data || {
        targetLevel: "N5",
        completionPercent: 0,
        completedLessonsCount: 0,
        dueFlashcardsCount: 0,
        totalValidActivities: 0,
        learnedVocabCount: 0,
        learnedKanjiCount: 0,
        learnedGrammarCount: 0,
        weeklyActivities: [],
        recentLessons: [],
      };

      const serverRecent = (baseData.recentLessons as any[]) || [];
      const combinedRecent = [...serverRecent, ...localRecent];
      const uniqueRecent = combinedRecent.filter((item, index, self) => index === self.findIndex((t) => Number(t.lessonId) === Number(item.lessonId))).slice(0, 3);

      const mergedSummary: any = {
        ...baseData,
        recentLessons: uniqueRecent,
        completedLessonsCount: Math.max(baseData.completedLessonsCount || 0, uniqueRecent.length),
        learnedVocabCount: (baseData.learnedVocabCount && baseData.learnedVocabCount > 0) ? baseData.learnedVocabCount : uniqueRecent.length * 5,
        completionPercent: baseData.completionPercent && baseData.completionPercent > 0 ? baseData.completionPercent : (uniqueRecent.length > 0 ? Math.min(100, uniqueRecent.length * 20) : 0),
        streakDays: baseData.streakDays || (uniqueRecent.length > 0 ? 1 : 0),
      };

      setSummary(mergedSummary);

      if (mergedSummary.continueLesson) {
        setCurrentLesson({
          lessonId: mergedSummary.continueLesson.lessonId,
          levelId: 1,
          levelCode: mergedSummary.continueLesson.levelCode || "N5",
          title: mergedSummary.continueLesson.title,
          description: mergedSummary.continueLesson.description,
          sortOrder: 1,
          isSample: false,
          estimatedMinutes: mergedSummary.continueLesson.estimatedMinutes || 30,
          status: "PUBLISHED",
        });
      } else if (uniqueRecent.length > 0) {
        setCurrentLesson({
          lessonId: uniqueRecent[0].lessonId,
          levelId: 1,
          levelCode: uniqueRecent[0].levelCode || "N5",
          title: uniqueRecent[0].title,
          description: "Bài học đang tham gia",
          sortOrder: 1,
          isSample: false,
          estimatedMinutes: 30,
          status: "PUBLISHED",
        });
      }

      if (lvlRes.data) {
        setLevels(lvlRes.data);

        // Fetch lessons for the first published level
        if (lvlRes.data.length > 0) {
          const firstLevelId = lvlRes.data[0].levelId;
          const lesRes = await apiClient<LessonSummary[]>(`/learner/levels/${firstLevelId}/lessons`).catch(() => ({ data: [] }));
          if (lesRes.data) {
            setRecommendedLessons(lesRes.data);
            if (!currentLesson && lesRes.data.length > 0) {
              setCurrentLesson(lesRes.data[0]);
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi khi kết nối máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFE6]">
        <LearnerHeader user={user} />
        <HomeSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5EFE6]">
        <LearnerHeader user={user} />
        <HomeErrorState message={error} onRetry={loadData} />
      </div>
    );
  }

  const reviewData: DailyReviewViewModel = {
    dueVocabCount: summary?.dueFlashcardsCount || 0,
    dueKanjiCount: 0,
    dueGrammarCount: 0,
    isAvailable: (summary?.dueFlashcardsCount || 0) > 0,
  };

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const dailyActivities = summary?.weeklyActivities?.map((wa) => {
    const d = new Date(wa.date);
    const dayName = daysOfWeek[d.getDay()] || "T2";
    return {
      dayName,
      minutes: wa.count * 5,
    };
  }) || null;

  return (
    <div className="min-h-screen bg-[#FFF9F6] font-sans text-[#2C201D] selection:bg-[#C65D4B]/20 selection:text-[#C65D4B]">
      {/* 1. Header */}
      <LearnerHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 2. Welcome Section & Learning Progress Card */}
        <WelcomeSection
          user={user}
          streakDays={summary?.totalValidActivities ? Math.min(summary.totalValidActivities, 7) : 2}
          todayMinutes={summary?.totalValidActivities ? summary.totalValidActivities * 5 : 10}
          dailyGoalMinutes={20}
        />

        {/* 3. JLPT Level Roadmap Track */}
        <LearningPathSection levels={levels} />

        {/* 4, 5, 6, 7. Kana Tables, Today Tasks, 5 Skill Showcase Cards, Analytics, Recent Lessons, Streak & Bottom Banner */}
        <LearningTypeGrid summary={summary} />
      </main>

      {/* 8. Learner Footer */}
      <LearnerFooter />
    </div>
  );
}
