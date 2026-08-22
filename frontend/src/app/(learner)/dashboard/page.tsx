"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import { UserProfile, LevelSummary, LessonSummary, DailyReviewViewModel } from "@/types/learner";

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

      if (sumRes.data) {
        setSummary(sumRes.data);
        if (sumRes.data.continueLesson) {
          setCurrentLesson({
            lessonId: sumRes.data.continueLesson.lessonId,
            levelId: 1,
            levelCode: sumRes.data.continueLesson.levelCode || "N5",
            title: sumRes.data.continueLesson.title,
            description: sumRes.data.continueLesson.description,
            sortOrder: 1,
            isSample: false,
            estimatedMinutes: sumRes.data.continueLesson.estimatedMinutes || 30,
            status: "PUBLISHED",
          });
        }
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
  }, [router, currentLesson]);

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
    <div className="min-h-screen bg-[#F5EFE6] font-sans text-[#231917] selection:bg-[#C65D4B]/20 selection:text-[#C65D4B]">
      {/* 1. Header */}
      <LearnerHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* 2 & 3. Welcome Section & Quick Stats */}
        <WelcomeSection
          user={user}
          streakDays={summary?.totalValidActivities ? Math.min(summary.totalValidActivities, 7) : 1}
          todayMinutes={summary?.totalValidActivities ? summary.totalValidActivities * 5 : 15}
          dailyGoalMinutes={20}
        />

        {/* 4 & 5. Primary Actions Area (65% Continue Learning / 35% Daily Review) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <ContinueLearningCard
              currentLesson={currentLesson}
              progressPercent={summary?.completionPercent || 0}
              completedParts={summary?.completedLessonsCount || 0}
              totalParts={recommendedLessons.length || 1}
            />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <DailyReviewCard reviewData={reviewData} />
          </div>
        </section>

        {/* 6. Learning Path Section */}
        <LearningPathSection levels={levels} />

        {/* 7. Quick Learning Categories Grid */}
        <LearningTypeGrid />

        {/* 8 & 9. Recommendations & Weekly Achievement */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <RecommendationSection recommendedLessons={recommendedLessons} />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <WeeklyAchievementCard
              totalMinutes={summary?.totalValidActivities ? summary.totalValidActivities * 5 : 0}
              percentageChange={null}
              dailyActivities={dailyActivities}
            />
          </div>
        </section>

        {/* 10. Motivation Banner */}
        <MotivationBanner />
      </main>

      {/* 11. Learner Footer */}
      <LearnerFooter />
    </div>
  );
}
