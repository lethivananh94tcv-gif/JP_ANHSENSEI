"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Layers, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import KanjiRadicalsView from "@/components/learner/kanji/KanjiRadicalsView";
import KanjiLessonDetailView from "@/components/learner/kanji/KanjiLessonDetailView";
import KanjiHeaderBanner from "@/components/learner/kanji/KanjiHeaderBanner";
import KanjiLevelNavigation, { KanjiTabType } from "@/components/learner/kanji/KanjiLevelNavigation";
import KanjiSearchBar from "@/components/learner/kanji/KanjiSearchBar";
import KanjiTopicCard, { parseTopicCardInfo } from "@/components/learner/kanji/KanjiTopicCard";
import { getSinoVietnamese } from "@/lib/utils/kanjiSinoVietnamese";

interface KanjiTopicDto {
  topicId: number;
  title: string;
  jlptLevel: string;
  topicOrder: number;
  description: string;
}

export default function LearnerKanjiPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<KanjiTabType>("N5");
  const [topics, setTopics] = useState<KanjiTopicDto[]>([]);
  const [topicsCache, setTopicsCache] = useState<Record<string, KanjiTopicDto[]>>({});
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (activeTab !== "RADICALS") {
      if (topicsCache[activeTab]) {
        setTopics(topicsCache[activeTab]);
        setSelectedTopicId(null);
        return;
      }

      const fetchTopics = async () => {
        try {
          setLoadingTopics(true);
          const res = await fetch(`/api/v1/curriculum/kanji-topics?level=${activeTab}`);
          if (res.ok) {
            const data = await res.json();
            setTopics(data);
            setTopicsCache((prev) => ({ ...prev, [activeTab]: data }));
          }
        } catch (err) {
          console.error("Lỗi khi tải danh sách bài Kanji:", err);
        } finally {
          setLoadingTopics(false);
        }
      };
      fetchTopics();
      setSelectedTopicId(null);
    }
  }, [activeTab, topicsCache]);

  // Real-time search filtering across topic titles and characters
  const filteredTopics = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") return topics;
    const q = searchQuery.trim().toLowerCase();
    return topics.filter((tp) => {
      const { cleanTitle, characters } = parseTopicCardInfo(tp.title, tp.description);
      if (tp.title.toLowerCase().includes(q)) return true;
      if (cleanTitle.toLowerCase().includes(q)) return true;
      if (characters.some((ch) => ch.includes(q))) return true;
      // Check Sino-Vietnamese reading match
      if (characters.some((ch) => (getSinoVietnamese(ch) || "").toLowerCase().includes(q))) return true;
      return false;
    });
  }, [topics, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2421] p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (selectedTopicId !== null) {
                setSelectedTopicId(null);
              } else {
                router.back();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#FAF3EB] text-[#8B6F5A] hover:text-[#C65D4B] border-2 border-[#E5D7C5] hover:border-[#C65D4B] rounded-xl text-xs font-black shadow-2xs transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C65D4B]" />
            <span>Quay lại</span>
          </button>
        </div>

        {/* 1. SHARED HEADER BANNER */}
        <KanjiHeaderBanner
          totalTopicsCount={topics.length || 75}
          totalKanjiCount={topics.length * 5 || 350}
          activeLevel={activeTab === "RADICALS" ? "214 BỘ THỦ" : activeTab}
        />

        {/* 2. SHARED LEVEL NAVIGATION BAR */}
        <KanjiLevelNavigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSelectedTopicId(null);
            setSearchQuery("");
          }}
          topicCounts={{
            N5: topicsCache["N5"]?.length || 25,
            N4: topicsCache["N4"]?.length || 25,
            N3: topicsCache["N3"]?.length || 25,
          }}
        />

        {/* CONTENT 1: 214 BỘ THỦ */}
        {activeTab === "RADICALS" && <KanjiRadicalsView />}

        {/* CONTENT 2: KANJI LESSON DETAIL VIEW */}
        {activeTab !== "RADICALS" && selectedTopicId !== null && (
          <KanjiLessonDetailView
            topicId={selectedTopicId}
            onBack={() => setSelectedTopicId(null)}
          />
        )}

        {/* CONTENT 3: KANJI TOPICS LESSON GRID */}
        {activeTab !== "RADICALS" && selectedTopicId === null && (
          <div className="space-y-5 animate-fadeIn">
            {/* 3. SHARED SEARCH BAR */}
            <KanjiSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalResults={filteredTopics.length}
            />

            {/* Topics Section Header */}
            <div className="flex justify-between items-center bg-white border-2 border-[#E5D7C5] p-5 rounded-2xl shadow-2xs">
              <div>
                <h2 className="text-lg font-black text-[#231917] border-l-4 border-[#C65D4B] pl-3">
                  Danh Sách Bài Học Kanji ({activeTab})
                </h2>
                <p className="text-xs text-[#76685F] font-medium mt-0.5">
                  Chọn bài học Kanji độc lập để bắt đầu luyện tập 5 phần bài học (Thẻ 3D, Viết nét, Gõ Romaji, Đọc câu & Test)
                </p>
              </div>
            </div>

            {loadingTopics ? (
              <div className="text-center py-20 text-[#76685F] font-bold flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-[#C65D4B]" />
                <span>Đang tải các bài học Kanji {activeTab}...</span>
              </div>
            ) : filteredTopics.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center text-[#76685F] border-2 border-[#E5D7C5] font-bold">
                {searchQuery
                  ? `Không tìm thấy bài học Kanji nào phù hợp với từ khóa "${searchQuery}".`
                  : `Chưa có dữ liệu bài học Kanji cho trình độ ${activeTab}.`}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTopics.map((tp) => (
                  <KanjiTopicCard
                    key={tp.topicId}
                    topic={tp}
                    onClick={(id) => setSelectedTopicId(id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
