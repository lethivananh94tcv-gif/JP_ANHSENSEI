"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import LearnerHeader from "@/components/learner/LearnerHeader";
import Breadcrumb from "@/components/learner/grammar/Breadcrumb";
import LevelSidebar from "@/components/learner/grammar/LevelSidebar";
import ProgressCard from "@/components/learner/grammar/ProgressCard";
import GrammarHero from "@/components/learner/grammar/GrammarHero";
import GrammarFilter from "@/components/learner/grammar/GrammarFilter";
import LessonList from "@/components/learner/grammar/LessonList";
import { LessonData } from "@/components/learner/grammar/LessonCard";
import PopularGrammarCard from "@/components/learner/grammar/PopularGrammarCard";
import { MOCK_LEVELS, MOCK_LESSONS_DATA } from "@/components/learner/grammar/mockGrammarData";

export default function LearnerGrammarPage() {
  const router = useRouter();

  // Core Selection & Filtering States
  const [activeLevelId, setActiveLevelId] = useState<string>("N5");
  const [selectedLessonNum, setSelectedLessonNum] = useState<number | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Real-time backend API data states
  const [apiLessons, setApiLessons] = useState<LessonData[] | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);

  // Real-time fetch lessons from Backend API if connected
  useEffect(() => {
    let isMounted = true;
    async function fetchRealLessons() {
      setIsLoadingApi(true);
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        const res = await fetch(`/api/v1/learner/levels/N5/lessons`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0 && isMounted) {
            const mapped = json.data.map((l: any, idx: number) => ({
              id: l.lessonId || l.id || idx + 1,
              level: activeLevelId,
              lessonNumber: l.sortOrder || l.lessonNumber || idx + 1,
              title: l.title || l.lessonTitle || `Bài ${idx + 1}`,
              description: l.description || "Nội dung bài học ngữ pháp",
              topicCount: l.grammarCount || 6,
              exerciseCount: l.exerciseCount || 12,
              status: l.status || "NOT_STARTED",
              progressPercent: l.progressPercent || 0,
            }));
            setApiLessons(mapped);
          }
        }
      } catch (err) {
        // Fallback gracefully to seed curriculum data
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    }
    fetchRealLessons();
    return () => { isMounted = false; };
  }, [activeLevelId]);

  // Lessons list for current active level (API first, then fallback to mock data)
  const currentLevelLessons = useMemo(() => {
    if (apiLessons && apiLessons.length > 0) return apiLessons;
    return MOCK_LESSONS_DATA[activeLevelId] || MOCK_LESSONS_DATA.N5;
  }, [activeLevelId, apiLessons]);

  // Filter lessons based on dropdown selection & search query
  const filteredLessons = useMemo(() => {
    let rows = currentLevelLessons;

    if (selectedLessonNum !== "ALL") {
      rows = rows.filter((l) => l.lessonNumber === selectedLessonNum);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          `bài ${l.lessonNumber}`.includes(q)
      );
    }

    return rows;
  }, [currentLevelLessons, selectedLessonNum, searchQuery]);

  // Level Selection Handler
  const handleSelectLevel = (levelId: string) => {
    setActiveLevelId(levelId);
    setSelectedLessonNum("ALL");
    setSearchQuery("");
  };

  // Dedicated Route Navigation (No Modal / Popup Overlay!)
  const handleOpenStudyLesson = (lesson: LessonData) => {
    router.push(`/grammar/${lesson.level.toLowerCase()}/lesson-${lesson.lessonNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B211D] font-sans flex flex-col pb-12">
      {/* 1. HEADER NAVBAR (Exact original Navbar preserved 100%) */}
      <LearnerHeader />

      {/* 2. MAIN DASHBOARD CONTAINER */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* BREADCRUMB */}
        <Breadcrumb currentPage="Ngữ pháp" />

        {/* 3-COLUMN BALANCED DESKTOP LAYOUT (Left 230px, Main flex-1, Right 280px) */}
        <div className="flex flex-col xl:flex-row items-start gap-6">
          
          {/* LEFT SIDEBAR (~230px) */}
          <aside className="w-full xl:w-[230px] shrink-0 space-y-5">
            {/* Card 1: Chọn cấp độ */}
            <LevelSidebar
              levels={MOCK_LEVELS}
              activeLevelId={activeLevelId}
              onSelectLevel={handleSelectLevel}
            />

            {/* Card 2: Tiến độ của bạn */}
            <ProgressCard
              activeLevelId={activeLevelId}
              totalCount={currentLevelLessons.length || 25}
              onViewDetails={() => {
                const first = currentLevelLessons[0];
                if (first) handleOpenStudyLesson(first);
              }}
            />
          </aside>

          {/* CENTER MAIN WORKSPACE (Flex 1 - Visual Focus) */}
          <div className="flex-1 w-full space-y-5 min-w-0">
            {/* 1. HERO SECTION */}
            <GrammarHero totalTopics={50} totalExercises={1000} />

            {/* 2. FILTER BAR */}
            <GrammarFilter
              activeLevelId={activeLevelId}
              onSelectLevel={handleSelectLevel}
              selectedLessonNum={selectedLessonNum}
              onSelectLesson={(num) => setSelectedLessonNum(num)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalLessons={currentLevelLessons.length}
            />

            {/* 3. LESSON LIST */}
            <LessonList
              lessons={filteredLessons}
              onStudyLesson={handleOpenStudyLesson}
            />
          </div>

          {/* RIGHT SIDEBAR (~280px) */}
          <aside className="w-full xl:w-[280px] shrink-0 space-y-5">
            <PopularGrammarCard />
          </aside>

        </div>

      </main>
    </div>
  );
}
