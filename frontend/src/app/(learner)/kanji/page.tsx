"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import KanjiRadicalsView from "@/components/learner/kanji/KanjiRadicalsView";
import KanjiLessonDetailView from "@/components/learner/kanji/KanjiLessonDetailView";

interface KanjiTopicDto {
  topicId: number;
  title: string;
  jlptLevel: string;
  topicOrder: number;
  description: string;
}

function parseTopicCardInfo(title: string, description: string) {
  let cleanTitle = description || title;
  let characters: string[] = [];

  // Match Kanji inside parentheses e.g. (会, 動, 歩, 急...)
  const match = cleanTitle.match(/\(([^)]+)\)/);
  if (match) {
    const rawChars = match[1];
    characters = rawChars.split(/[,、\s]+/).filter(Boolean);
    cleanTitle = cleanTitle.replace(/\([^)]+\)/, "").trim();
  }

  // Strip prefixes like "Chữ Hán N4 #1: " or "Chữ Hán N3 #5: "
  cleanTitle = cleanTitle.replace(/^Chữ Hán N\d\s*#\d+:\s*/i, "").trim();

  if (!cleanTitle || cleanTitle === "") {
    cleanTitle = title;
  }

  return { cleanTitle, characters };
}

export default function LearnerKanjiPage() {
  const [activeTab, setActiveTab] = useState<"RADICALS" | "N5" | "N4" | "N3" | "N2" | "N1">("N5");
  const [topics, setTopics] = useState<KanjiTopicDto[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  useEffect(() => {
    if (activeTab !== "RADICALS") {
      const fetchTopics = async () => {
        try {
          setLoadingTopics(true);
          const res = await fetch(`/api/v1/curriculum/kanji-topics?level=${activeTab}`);
          if (res.ok) {
            const data = await res.json();
            setTopics(data);
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
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 sm:p-8 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              ✍️ KHO HỌC LIỆU HÁN TỰ KANJI
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Hán Tự &amp; Quy Tắc Nét Vẽ</h1>
            <p className="text-white/90 text-xs sm:text-sm max-w-xl">
              Học Kanji bài bản theo 214 Bộ thủ, Thẻ 3D Flashcard, Luyện gõ Romaji và bài tập đọc/viết theo chuẩn giáo trình.
            </p>
          </div>
          <div className="hidden md:block text-8xl font-black opacity-20 select-none">
            漢字
          </div>
        </div>

        {/* Top Sub-navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-[#FAF3EB] border border-[#DED3C8] p-2 rounded-2xl">
          {[
            { id: "RADICALS", label: "⛩️ 214 Bộ Thủ" },
            { id: "N5", label: "🔴 Kanji N5" },
            { id: "N4", label: "🟠 Kanji N4" },
            { id: "N3", label: "🟡 Kanji N3" },
            { id: "N2", label: "🟢 Kanji N2" },
            { id: "N1", label: "🔵 Kanji N1" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSelectedTopicId(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${
                activeTab === tab.id
                  ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md"
                  : "bg-white text-[#8B6F5A] border-[#DED3C8] hover:border-[#C65D4B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white border border-[#DED3C8] p-5 rounded-2xl shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-[#231917] border-l-4 border-[#C65D4B] pl-3">
                  Danh Sách Bài Học Kanji ({activeTab})
                </h2>
                <p className="text-xs text-[#76685F]">
                  Chọn bài học Kanji độc lập để bắt đầu luyện tập 5 phần bài học
                </p>
              </div>
            </div>

            {loadingTopics ? (
              <div className="text-center py-16 text-[#76685F] font-bold">Đang tải các bài học Kanji {activeTab}...</div>
            ) : topics.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
                Chưa có dữ liệu bài học Kanji cho trình độ {activeTab}.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {topics.map((tp) => {
                  const { cleanTitle, characters } = parseTopicCardInfo(tp.title, tp.description);
                  const displayChars = characters.slice(0, 8);
                  const remainingCount = characters.length > 8 ? characters.length - 8 : 0;

                  return (
                    <div
                      key={tp.topicId}
                      onClick={() => setSelectedTopicId(tp.topicId)}
                      className="bg-white border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Header Badges */}
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-[#C65D4B] bg-[#FAF3EB] px-3 py-1 rounded-full border border-[#DED3C8]">
                            {tp.title}
                          </span>
                          <span className="text-[10px] font-extrabold bg-[#FAF3EB] text-[#8B6F5A] px-2.5 py-1 rounded-full border border-[#DED3C8]">
                            {characters.length > 0 ? `${characters.length} Chữ Hán` : `Nhiệm vụ ${tp.jlptLevel}`}
                          </span>
                        </div>

                        {/* Clean Title */}
                        <div>
                          <h3 className="text-base font-black text-[#231917] group-hover:text-[#C65D4B] transition-colors leading-snug">
                            {cleanTitle}
                          </h3>
                        </div>

                        {/* Kanji Pills Preview Grid */}
                        {characters.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {displayChars.map((ch, idx) => (
                              <span
                                key={idx}
                                className="w-7 h-7 flex items-center justify-center bg-[#FAF3EB] group-hover:bg-[#C65D4B]/10 text-[#C65D4B] border border-[#DED3C8] rounded-lg text-xs font-black transition-all"
                              >
                                {ch}
                              </span>
                            ))}
                            {remainingCount > 0 && (
                              <span className="px-2 h-7 flex items-center justify-center bg-[#FAF3EB] text-[#8B6F5A] border border-[#DED3C8] rounded-lg text-[10px] font-extrabold">
                                +{remainingCount} nữa
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer Link */}
                      <div className="pt-3 border-t border-[#DED3C8]/60 flex justify-between items-center text-xs font-black text-[#C65D4B]">
                        <span>Bắt đầu bài học ➔</span>
                        <span className="w-7 h-7 rounded-full bg-[#FAF3EB] group-hover:bg-[#C65D4B] group-hover:text-white flex items-center justify-center transition-all">
                          →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
