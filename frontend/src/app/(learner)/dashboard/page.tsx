"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  UserProfile,
  LevelSummary,
  LessonSummary,
  DailyReviewViewModel,
  WeeklyActivityDay,
} from "@/types/learner";

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

export default function LearnerDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [levels, setLevels] = useState<LevelSummary[]>([]);
  const [recommendedLessons, setRecommendedLessons] = useState<LessonSummary[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonSummary | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Stat placeholders
  const [streakDays] = useState<number | null>(null);
  const [todayMinutes] = useState<number | null>(null);
  const [dailyGoalMinutes] = useState<number | null>(20);

  // Review & activity placeholders
  const [reviewData] = useState<DailyReviewViewModel>({
    dueVocabCount: 0,
    dueKanjiCount: 0,
    dueGrammarCount: 0,
    isAvailable: false,
  });

  const [dailyActivities] = useState<WeeklyActivityDay[] | null>(null);

  const getAuthHeaders = (): HeadersInit => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token") || localStorage.getItem("auth_token")
        : "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // 1. Auth Guard Check
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          router.replace("/login");
          return;
        }

        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.role === "ADMIN") {
            router.replace("/admin");
            return;
          }
          setUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse user data", e);
          router.replace("/login");
          return;
        }
      }

      // 2. Fetch Published Levels from real API
      const levelsRes = await fetch("/api/v1/curriculum/levels", {
        headers: getAuthHeaders(),
      });

      if (levelsRes.status === 401 || levelsRes.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        router.replace("/login");
        return;
      }

      if (!levelsRes.ok) {
        throw new Error("Không thể tải danh sách trình độ từ hệ thống.");
      }

      const levelsData: LevelSummary[] = await levelsRes.json();
      setLevels(Array.isArray(levelsData) ? levelsData : []);

      // 3. Fetch Published Lessons for the first published level
      const publishedLevels = (Array.isArray(levelsData) ? levelsData : []).filter(
        (l) => l.status === "PUBLISHED"
      );

      if (publishedLevels.length > 0) {
        const targetLevel = publishedLevels[0];
        const lessonsRes = await fetch(`/api/v1/curriculum/levels/${targetLevel.levelId}/lessons`, {
          headers: getAuthHeaders(),
        });

        if (lessonsRes.ok) {
          const lessonsData: LessonSummary[] = await lessonsRes.json();
          const pubLessons = (Array.isArray(lessonsData) ? lessonsData : []).filter(
            (les) => les.status === "PUBLISHED"
          );

          setRecommendedLessons(pubLessons);
          if (pubLessons.length > 0) {
            setCurrentLesson(pubLessons[0]);
          }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-sans text-[#231917] selection:bg-[#C65D4B]/20 selection:text-[#C65D4B]">
      {/* 1. Header */}
      <LearnerHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* 2 & 3. Welcome Section & Quick Stats */}
        <WelcomeSection
          user={user}
          streakDays={streakDays}
          todayMinutes={todayMinutes}
          dailyGoalMinutes={dailyGoalMinutes}
        />

        {/* 4 & 5. Primary Actions Area (65% Continue Learning / 35% Daily Review) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <ContinueLearningCard
              currentLesson={currentLesson}
              progressPercent={0}
              completedParts={0}
              totalParts={4}
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

        {/* 8 & 9. Recommendations & Weekly Achievement (65% Recommendations / 35% Achievement) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <RecommendationSection recommendedLessons={recommendedLessons} />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <WeeklyAchievementCard
              totalMinutes={null}
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
