"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Layers, Sparkles, Map, ArrowRight } from "lucide-react";
import KanjiRadicalsView from "@/components/learner/kanji/KanjiRadicalsView";
import KanjiLessonDetailView from "@/components/learner/kanji/KanjiLessonDetailView";
import KanjiHeaderBanner from "@/components/learner/kanji/KanjiHeaderBanner";
import KanjiLevelNavigation, { KanjiTabType } from "@/components/learner/kanji/KanjiLevelNavigation";
import KanjiSearchBar from "@/components/learner/kanji/KanjiSearchBar";
import KanjiTopicCard, { parseTopicCardInfo } from "@/components/learner/kanji/KanjiTopicCard";
import { getSinoVietnamese } from "@/lib/utils/kanjiSinoVietnamese";

import LearnerFooter from "@/components/learner/LearnerFooter";

interface KanjiTopicDto {
  topicId: number;
  title: string;
  jlptLevel: string;
  topicOrder: number;
  description: string;
}

const KANJI_FURIGANA_MAP: Record<string, string> = {
  一: "いち", 二: "に", 三: "さん", 四: "よん", 五: "ご", 六: "ろく", 七: "しち",
  八: "はち", 九: "きゅう", 十: "じゅう", 百: "ひゃく", 千: "せん", 万: "まん", 円: "えん",
  日: "にち", 月: "つき", 火: "ひ", 水: "みず", 木: "き", 金: "かね", 土: "つち",
  人: "ひと", 子: "こ", 女: "おんな", 男: "おとこ", 目: "め", 口: "くち", 耳: "みみ",
  手: "て", 足: "あし", 上: "うえ", 下: "した", 中: "なか", 大: "おお", 小: "ちい",
  山: "やま", 川: "かわ", 田: "た", 天: "てん", 生: "せい", 花: "はな", 雨: "あめ",
  国: "くに", 会: "かい", 社: "しゃ", 校: "こう", 店: "みせ", 駅: "えき", 車: "くるま",
  買: "か", 売: "う", 行: "い", 来: "き", 食: "た", 飲: "の", 見: "み", 聞: "き",
  書: "か", 読: "よ", 話: "はな", 学: "まな", 休: "やす", 言: "い", 語: "ご",
  東: "ひがし", 西: "にし", 南: "みなみ", 北: "きた", 午: "ご", 前: "まえ", 後: "あと",
  時: "じ", 分: "ふん", 半: "はん", 毎: "まい", 今: "いま", 年: "とし", 週: "しゅう",
  赤: "あか", 青: "あお", 白: "しろ", 黒: "くろ", 高: "たか", 安: "やす", 新: "あたら",
  父: "ちち", 母: "はは", 兄: "あに", 弟: "おとうと", 姉: "あね", 妹: "いもうと", 友: "とも",
  出: "で", 入: "はい", 立: "た", 座: "すわ", 走: "はし", 歩: "ある", 止: "と",
  家: "いえ", 屋: "や", 室: "しつ", 門: "もん", 道: "みち", 場: "ば", 町: "まち",
  好: "す", 愛: "あい", 心: "こころ", 思: "おも", 知: "し", 明: "あか", 暗: "くら",
  工: "こう", 作: "つく", 使: "つか", 用: "よう", 事: "こと", 業: "ぎょう", 員: "いん",
  春: "はる", 夏: "なつ", 秋: "あき", 冬: "ふゆ", 風: "かぜ", 空: "そら", 海: "うみ",
  森: "もり", 林: "はやし", 石: "いし", 竹: "たけ", 草: "くさ", 原: "はら", 野: "の",
};

const TOPIC_KANJI_ORDER_MAP: Record<number, string[]> = {
  1: ["一", "二", "三", "四", "五", "六", "七"],
  2: ["八", "九", "十", "百", "千", "万", "円"],
  3: ["日", "月", "火", "水", "木", "金", "土"],
  4: ["人", "子", "女", "男", "目", "口", "耳"],
  5: ["手", "足", "上", "下", "中", "大", "小"],
  6: ["山", "川", "田", "天", "生", "花", "雨"],
  7: ["国", "会", "社", "校", "店", "駅", "車"],
  8: ["買", "売", "行", "来", "食", "飲", "見"],
  9: ["聞", "書", "読", "話", "学", "休", "言"],
  10: ["東", "西", "南", "北", "午", "前", "後"],
  11: ["一", "日", "人", "山", "国", "行", "書"],
  12: ["時", "分", "半", "毎", "今", "年", "週"],
  13: ["赤", "青", "白", "黒", "高", "安", "新"],
  14: ["父", "母", "兄", "弟", "姉", "妹", "友"],
  15: ["出", "入", "立", "座", "走", "歩", "止"],
  16: ["家", "屋", "室", "門", "道", "場", "町"],
  17: ["好", "愛", "心", "思", "知", "明", "暗"],
  18: ["工", "作", "使", "用", "事", "業", "員"],
  19: ["春", "夏", "秋", "冬", "風", "空", "海"],
  20: ["森", "林", "石", "竹", "草", "原", "野"],
};

function parseTopicCardInfo(title: string, description: string, topicOrder: number = 1) {
  let cleanTitle = description || title;
  let characters: string[] = [];

  const match = cleanTitle.match(/\(([^)]+)\)/);
  if (match) {
    const rawChars = match[1];
    const parsed = rawChars.split(/[,、\s]+/).filter((c) => /[\u4e00-\u9faf]/.test(c));
    if (parsed.length > 0) {
      characters = parsed;
    }
    cleanTitle = cleanTitle.replace(/\([^)]+\)/, "").trim();
  }

  // If no Kanji inside parentheses, use exact 20-lesson map
  if (characters.length === 0) {
    characters = TOPIC_KANJI_ORDER_MAP[topicOrder] || TOPIC_KANJI_ORDER_MAP[((topicOrder - 1) % 20) + 1] || TOPIC_KANJI_ORDER_MAP[1];
  }

  cleanTitle = cleanTitle.replace(/^Chữ Hán N\d\s*#\d+:\s*/i, "").trim();

  if (!cleanTitle || cleanTitle === "") {
    cleanTitle = title;
  }

  return { cleanTitle, characters };
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
      if (characters.some((ch) => (getSinoVietnamese(ch) || "").toLowerCase().includes(q))) return true;
      return false;
    });
  }, [topics, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-4 sm:p-8 text-[#1F1714] select-none">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-7">
        {/* Top Left Navigation Back Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (selectedTopicId !== null) {
                setSelectedTopicId(null);
              } else {
                router.back();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFFDF9] hover:bg-[#FAF4EB] text-[#8B786D] hover:text-[#C65D4B] border border-[#E5D7C7] hover:border-[#C65D4B] rounded-2xl text-xs font-extrabold shadow-2xs transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C65D4B]" />
            <span>Quay lại</span>
          </button>
        </div>

        {/* 1. Header Hero Banner matching exact mockup in screenshot */}
        <div className="relative bg-[#FAF4ED] bg-[radial-gradient(#E8D4CC_1px,transparent_1px)] [background-size:20px_20px] border-2 border-[#E5D7C5] rounded-[32px] p-6 sm:p-8 shadow-xs overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Right Background Japanese Landscape Artwork (Vibrant Rich Artwork with Deep Contrast) */}
          <div className="absolute right-0 top-0 bottom-0 w-[580px] pointer-events-none hidden md:block z-0 overflow-hidden">
            <img
              src="/images/kanji_hero_vibrant_artwork.jpg"
              alt="Japanese Vibrant Landscape Artwork"
              className="w-full h-full object-cover opacity-95 filter contrast-110 saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF4ED] via-[#FAF4ED]/50 to-transparent" />
          </div>

          {/* Left Content */}
          <div className="space-y-4 z-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/95 border border-[#C65D4B]/30 text-[#C65D4B] px-3.5 py-1 rounded-full text-xs font-extrabold shadow-2xs">
                <span>⛩️</span> KHO HỌC LIỆU HÁN TỰ (KANJI)
              </span>
              <span className="bg-[#FAF4EB] border border-[#E5D7C7] text-[#8B786D] px-3 py-1 rounded-full text-[11px] font-bold">
                Anh Sensei
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1F1714] tracking-tight flex items-center gap-2">
              Hán Tự &amp; Quy Tắc <span className="text-[#C65D4B]">Nét Vẽ</span>
            </h1>

            <p className="text-[#52443C] text-xs sm:text-sm leading-relaxed font-bold">
              Học Kanji bài bản theo <strong className="text-[#C65D4B] font-black">214 Bộ thủ</strong>, Thẻ 3D Flashcard, Luyện gõ Romaji và bài tập đọc/viết chuẩn giáo trình.
            </p>

            {/* Traditional Feature Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="bg-white/95 border border-[#E5D7C5] text-[#1F1714] px-3.5 py-1.5 rounded-2xl text-xs font-extrabold shadow-2xs flex items-center gap-1.5">
                <span>⛩️</span> 214 Bộ Thủ Trọng Tâm
              </span>
              <span className="bg-white/95 border border-[#E5D7C5] text-[#1F1714] px-3.5 py-1.5 rounded-2xl text-xs font-extrabold shadow-2xs flex items-center gap-1.5">
                <span>📖</span> Chuẩn N5 – N3 Minna
              </span>
              <span className="bg-white/95 border border-[#E5D7C5] text-[#1F1714] px-3.5 py-1.5 rounded-2xl text-xs font-extrabold shadow-2xs flex items-center gap-1.5">
                <span>✏️</span> Luyện Gõ Romaji Tự Động
              </span>
            </div>
          </div>

          {/* Right Calligraphy Parchment Card matching screenshot 100% */}
          <div className="hidden md:flex flex-row items-center justify-center bg-white/95 border-2 border-[#E5D7C5] p-5 rounded-3xl shadow-md z-10 space-x-4 min-w-[170px] text-center relative">
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-[#8B786D] tracking-widest writing-mode-vertical">かんじ</span>
              <span className="bg-[#C65D4B] text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold mt-2">学ぶ</span>
            </div>
            <div className="text-4xl font-jp font-black text-[#1F1714] tracking-widest leading-none border-l-2 border-[#E5D7C5] pl-4 py-1">
              漢字
            </div>
          </div>
        </div>

        {/* 2. Top Sub-navigation Level Bar matching screenshot */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none bg-[#FAF4EB] border border-[#E5D7C7] p-2 rounded-2xl">
          {[
            { id: "RADICALS", label: "214 Bộ Thủ", icon: "📦" },
            { id: "N5", label: "Kanji N5", icon: "あ" },
            { id: "N4", label: "Kanji N4", icon: "あ" },
            { id: "N3", label: "Kanji N3", icon: "秀" },
            { id: "N2", label: "Kanji N2", icon: "千" },
            { id: "N1", label: "Kanji N1", icon: "万" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedTopicId(null);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md ring-2 ring-[#C65D4B]/20"
                    : "bg-white text-[#6E5D55] border-[#E5D7C7] hover:border-[#C65D4B]/40 hover:bg-[#FAF4EB]"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSelected ? "bg-white/20 text-white" : "bg-[#FAF4EB] text-[#C65D4B] border border-[#E5D7C7]"
                }`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
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

        {/* CONTENT 3: KANJI TOPICS LESSON GRID matching exact mockup */}
        {activeTab !== "RADICALS" && selectedTopicId === null && (
          <div className="space-y-5 animate-fade-in">
            {/* Lesson List Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#FFFDF9] border border-[#E5D7C7] p-4 sm:p-5 rounded-3xl shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌸</span>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-[#1F1714]">
                    Danh Sách Bài Học Kanji ({activeTab})
                  </h2>
                  <p className="text-xs text-[#6E5D55] font-medium">
                    Chọn bài học Kanji độc lập để bắt đầu luyện tập 5 phần bài học
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push("/learning-path")}
                className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-[#FAF4EB] text-[#52443C] border border-[#E5D7C7] hover:border-[#C65D4B] rounded-2xl text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>🗺️</span>
                <span>Lộ trình học</span>
              </button>
            </div>

            {loadingTopics ? (
              <div className="text-center py-16 text-[#6E5D55] font-bold">
                Đang tải danh sách bài học Kanji {activeTab}...
              </div>
            ) : topics.length === 0 ? (
              <div className="bg-[#FFFDF9] rounded-3xl p-12 text-center text-[#8B786D] border border-dashed border-[#E5D7C7] font-semibold text-xs">
                Chưa có dữ liệu bài học Kanji cho trình độ {activeTab}.
              </div>
            ) : (
              /* 3 Columns Kanji Lesson Cards Grid with 5 Famous Japanese Landmarks Backgrounds */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {topics.map((tp, idx) => {
                  const { cleanTitle, characters } = parseTopicCardInfo(tp.title, tp.description, tp.topicOrder || idx + 1);
                  const displayChars = characters.slice(0, 7);
                  const lessonOrderText = `第 ${tp.topicOrder || idx + 1} 課`;

                  // Famous Japanese Landmarks Artwork Array
                  const landmarkImages = [
                    "/images/landmark_fushimi_inari.jpg",
                    "/images/landmark_kinkakuji.jpg",
                    "/images/landmark_osaka_castle.jpg",
                    "/images/landmark_itsukushima.jpg",
                    "/images/kanji_card_temple_bg.jpg",
                  ];
                  const currentLandmark = landmarkImages[idx % landmarkImages.length];

                  return (
                    <div
                      key={tp.topicId}
                      onClick={() => setSelectedTopicId(tp.topicId)}
                      className="bg-[#FFFDF9] border-2 border-[#E5D7C7] hover:border-[#C65D4B] rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
                    >
                      <div className="space-y-3.5">
                        {/* Header Row: Lesson Pill Badge & Character Count Badge */}
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-extrabold text-white bg-[#C65D4B] px-3.5 py-1 rounded-full shadow-2xs">
                            {lessonOrderText}
                          </span>
                          <span className="text-[11px] font-bold bg-[#FAF4EB] border border-[#E5D7C7] text-[#8B786D] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <span>🎒</span>
                            <span>{characters.length > 0 ? `${characters.length} Chữ Hán` : `Nhiệm vụ ${tp.jlptLevel}`}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#1F1714] group-hover:text-[#C65D4B] transition-colors leading-snug line-clamp-2">
                            {cleanTitle}
                          </h3>
                        </div>

                        {/* Kanji Preview Box with Furigana & Famous Japanese Landmark Background Illustration */}
                        {characters.length > 0 && (
                          <div className="relative bg-[#FAF4EB] border border-[#E5D7C7] rounded-2xl p-3 flex items-center justify-around gap-1 overflow-hidden min-h-[80px] group-hover:border-[#C65D4B]/40 transition-colors">
                            {/* Famous Landmark Background Image */}
                            <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
                              <img
                                src={currentLandmark}
                                alt="Famous Japanese Landmark"
                                className="w-full h-full object-cover mix-blend-multiply filter contrast-125 saturate-125"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4EB] via-[#FAF4EB]/40 to-transparent" />
                            </div>

                            {displayChars.map((ch, chIdx) => {
                              const furigana = KANJI_FURIGANA_MAP[ch] || "•";

                              return (
                                <div key={chIdx} className="flex flex-col items-center justify-center z-10">
                                  <span className="text-lg sm:text-xl font-jp font-extrabold text-[#1F1714] leading-none group-hover:text-[#C65D4B] transition-colors drop-shadow-2xs">
                                    {ch}
                                  </span>
                                  <span className="text-[10px] font-jp font-black text-[#6E5D55] mt-1 bg-white/80 px-1 rounded-md border border-[#E5D7C7]/60">
                                    {furigana}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Action Button & Progress */}
                      <div className="pt-3 border-t border-[#E5D7C7]/60 flex items-center justify-between">
                        <button
                          type="button"
                          className="bg-[#C65D4B] group-hover:bg-[#B44C3B] text-white px-4 py-2 rounded-2xl text-xs font-extrabold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Bắt đầu học</span>
                          <span className="text-xs">→</span>
                        </button>

                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-bold text-[#8B786D]">
                            0/7 bài
                          </span>
                          <div className="w-14 h-1.5 bg-[#E5D7C7]/50 rounded-full overflow-hidden">
                            <div className="h-full bg-[#C65D4B] w-0 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        </div>
      </main>

      {/* 🌟 2. LEARNER FOOTER */}
      <LearnerFooter />
    </div>
  );
}
