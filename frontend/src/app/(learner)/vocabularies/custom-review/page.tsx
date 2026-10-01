"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/api/client";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import VocabularyLearningItem, { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
import FlashcardStudyMode from "@/components/learner/lesson/FlashcardStudyMode";
import TypingStudyMode from "@/components/learner/lesson/TypingStudyMode";
import VocabMatchGame3D from "@/components/ui/VocabMatchGame3D";

import {
  ArrowLeft,
  Check,
  X,
  Search,
  RotateCcw,
  CheckCheck,
  BookOpen,
  Keyboard,
  Gamepad2,
  ChevronRight,
  Sparkles,
  Layers,
  Flame,
  Zap,
} from "lucide-react";

interface LessonOption {
  lessonId: number;
  title: string;
  kanjiTitle: string;
  sortOrder: number;
  levelCode: string;
}

// Convert numbers to Japanese Kanji numerals
const toKanjiNumber = (num: number): string => {
  const kanjiNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  if (num <= 10) return kanjiNums[num] || `${num}`;
  if (num < 20) return `十${kanjiNums[num % 10] || ""}`;
  const tens = Math.floor(num / 10);
  const units = num % 10;
  return `${kanjiNums[tens]}十${units > 0 ? kanjiNums[units] : ""}`;
};

const DEFAULT_N5_LESSONS: LessonOption[] = Array.from({ length: 25 }, (_, i) => ({
  lessonId: i + 1,
  title: `Bài ${i + 1}`,
  kanjiTitle: `第${toKanjiNumber(i + 1)}課`,
  sortOrder: i + 1,
  levelCode: "N5",
}));

const DEFAULT_N4_LESSONS: LessonOption[] = Array.from({ length: 25 }, (_, i) => ({
  lessonId: i + 26,
  title: `Bài ${i + 26}`,
  kanjiTitle: `第${toKanjiNumber(i + 26)}課`,
  sortOrder: i + 26,
  levelCode: "N4",
}));

const DEFAULT_N3_LESSONS: LessonOption[] = Array.from({ length: 15 }, (_, i) => ({
  lessonId: i + 51,
  title: `Bài ${i + 51}`,
  kanjiTitle: `第${toKanjiNumber(i + 51)}課`,
  sortOrder: i + 51,
  levelCode: "N3",
}));

export default function CustomMultiLessonReviewPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<"N5" | "N4" | "N3">("N5");
  const [selectedLessonIds, setSelectedLessonIds] = useState<number[]>([1, 2, 3]);

  // 4 Standard Study Modes: "list" | "flashcard" | "typing" | "match"
  const [vocabStudyMode, setVocabStudyMode] = useState<"list" | "flashcard" | "typing" | "match">("list");

  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [aggregatedVocabularies, setAggregatedVocabularies] = useState<VocabularyDto[]>([]);

  // Search & Filters for List View
  const [searchQuery, setSearchQuery] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [learnedItemKeys, setLearnedItemKeys] = useState<Set<string>>(new Set());

  const activeLessonOptions =
    selectedLevel === "N5"
      ? DEFAULT_N5_LESSONS
      : selectedLevel === "N4"
      ? DEFAULT_N4_LESSONS
      : DEFAULT_N3_LESSONS;

  const handleToggleLesson = (id: number) => {
    setSelectedLessonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = activeLessonOptions.map((l) => l.lessonId);
    setSelectedLessonIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedLessonIds([]);
  };

  const handleSelectRange = (count: number) => {
    const firstN = activeLessonOptions.slice(0, count).map((l) => l.lessonId);
    setSelectedLessonIds(firstN);
  };

  const handleStartReview = async () => {
    if (selectedLessonIds.length === 0) return;

    setIsLoading(true);
    try {
      const requests = selectedLessonIds.map((id) =>
        apiClient<VocabularyDto[]>(`/curriculum/lessons/${id}/vocabularies`).catch(() => null)
      );

      const results = await Promise.all(requests);
      let combined: VocabularyDto[] = [];
      results.forEach((res) => {
        if (res && res.data && Array.isArray(res.data)) {
          combined = combined.concat(res.data);
        }
      });

      if (combined.length === 0) {
        alert("Không tìm thấy từ vựng trong các bài đã chọn. Vui lòng chọn bài khác!");
        setIsLoading(false);
        return;
      }

      // Shuffle/Randomize combined vocabulary list
      const shuffled = combined.sort(() => 0.5 - Math.random());
      setAggregatedVocabularies(shuffled);
      setIsPlaying(true);
    } catch (err) {
      console.error("Lỗi khi tải từ vựng ôn tập:", err);
      alert("Đã xảy ra lỗi khi tổng hợp từ vựng. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle single vocabulary learned status
  const handleToggleLearned = (vid: number) => {
    setLearnedItemKeys((prev) => {
      const next = new Set(prev);
      const key = `v_${vid}`;
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleMarkAllLearned = () => {
    const allKeys = new Set(aggregatedVocabularies.map((v) => `v_${v.vocabularyId}`));
    setLearnedItemKeys(allKeys);
  };

  const handleResetAll = () => {
    setLearnedItemKeys(new Set());
  };

  const filteredVocabularies = useMemo(() => {
    return aggregatedVocabularies.filter((v) => {
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        v.word?.toLowerCase().includes(query) ||
        v.kana?.toLowerCase().includes(query) ||
        v.meaningVi?.toLowerCase().includes(query);

      const matchPos =
        posFilter === "ALL" ||
        (posFilter === "NOUN" && (v.partOfSpeech?.includes("Danh từ") || v.partOfSpeech?.includes("Danh"))) ||
        (posFilter === "VERB" && (v.partOfSpeech?.includes("Động từ") || v.partOfSpeech?.includes("Động"))) ||
        (posFilter === "ADJ" && (v.partOfSpeech?.includes("Tính từ") || v.partOfSpeech?.includes("Tính")));

      return matchSearch && matchPos;
    });
  }, [aggregatedVocabularies, searchQuery, posFilter]);

  const totalLearnedCount = useMemo(() => {
    return aggregatedVocabularies.filter((v) => learnedItemKeys.has(`v_${v.vocabularyId}`)).length;
  }, [aggregatedVocabularies, learnedItemKeys]);

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#231917] font-sans antialiased flex flex-col justify-between selection:bg-[#C65D4B]/15 selection:text-[#C65D4B]">
      <div>
        <LearnerHeader />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-8">
          {/* Top Breadcrumb & Calligraphy Subtitle */}
          <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4">
            <Link
              href="/vocabularies"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#8B6F5A] hover:text-[#C65D4B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Trung Tâm Từ Vựng
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif tracking-[0.25em] text-[#C65D4B] font-bold">
                一期一会
              </span>
              <span className="text-xs font-mono tracking-widest text-[#DED3C8]">|</span>
              <span className="font-jp text-xs font-bold text-[#8B6F5A] tracking-widest">
                語彙・総合復習 (Wabi-Sabi Zen)
              </span>
            </div>
          </div>

          {!isPlaying ? (
            /* STEP 1: WABI-SABI LIGHT LUXURY LESSON PICKER */
            <div className="space-y-8">
              {/* Luxury Hero Banner */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFFDF9] via-[#FAF4EB] to-[#FFF8F6] border-2 border-[#E8DCCF] p-6 sm:p-10 shadow-sm">
                {/* Subtle Background Kanji Watermark */}
                <div className="absolute right-6 bottom-[-25px] pointer-events-none select-none text-[130px] font-serif font-black text-[#C65D4B]/5 leading-none tracking-widest">
                  侘寂
                </div>

                <div className="relative z-10 space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C65D4B]/10 border border-[#C65D4B]/20 text-[#C65D4B] text-xs font-extrabold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-[#C65D4B]" />
                    <span>Luyện Tập Tối Giản • Tự Do Chọn Bài</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#231917] tracking-tight font-serif leading-tight">
                    Ôn Tập <span className="text-[#C65D4B]">Gộp Nhiều Bài</span> Từ Vựng
                  </h1>

                  <p className="text-xs sm:text-sm text-[#76685F] leading-relaxed font-medium">
                    Tích chọn các bài từ vựng bạn muốn củng cố. Hệ thống sẽ tự động tổng hợp, xáo trộn danh sách và đưa vào các chế độ ôn tập chuẩn xác!
                  </p>
                </div>
              </div>

              {/* Main Selection Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Lesson Selector Grid */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Level Tabs (Carved Hanko Stamp Style) */}
                  <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8DCCF] p-6 shadow-xs space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFD1] pb-4">
                      <div>
                        <span className="text-xs font-serif text-[#C65D4B] uppercase tracking-widest block font-extrabold">
                          1. Chọn Trình Độ JLPT
                        </span>
                        <span className="text-xs text-[#8B6F5A] font-medium">Click vào cấp độ để hiển thị danh sách bài</span>
                      </div>

                      <div className="flex gap-1.5 bg-[#F5EFE6] p-1.5 rounded-2xl border border-[#E5D7C7]">
                        {(["N5", "N4", "N3"] as const).map((lvl) => {
                          const isActive = selectedLevel === lvl;
                          return (
                            <button
                              key={lvl}
                              onClick={() => {
                                setSelectedLevel(lvl);
                                setSelectedLessonIds(
                                  lvl === "N5" ? [1, 2, 3] : lvl === "N4" ? [26, 27] : [51, 52]
                                );
                              }}
                              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                isActive
                                  ? "bg-[#C65D4B] text-white shadow-md font-serif"
                                  : "text-[#76685F] hover:text-[#231917]"
                              }`}
                            >
                              JLPT {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick Selection Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#8B6F5A] font-semibold">Đã tích chọn:</span>
                        <span className="font-extrabold text-[#C65D4B] bg-[#C65D4B]/10 border border-[#C65D4B]/20 px-3 py-0.5 rounded-full">
                          {selectedLessonIds.length} / {activeLessonOptions.length} bài
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleSelectRange(5)}
                          className="px-3 py-1 rounded-xl bg-[#F5EFE6] hover:bg-[#E8DCCF] text-[#56423E] text-[11px] font-bold transition-all border border-[#E5D7C7] cursor-pointer"
                        >
                          5 Bài đầu
                        </button>
                        <button
                          onClick={() => handleSelectRange(10)}
                          className="px-3 py-1 rounded-xl bg-[#F5EFE6] hover:bg-[#E8DCCF] text-[#56423E] text-[11px] font-bold transition-all border border-[#E5D7C7] cursor-pointer"
                        >
                          10 Bài đầu
                        </button>
                        <button
                          onClick={handleSelectAll}
                          className="px-3 py-1 rounded-xl bg-[#F5EFE6] hover:bg-[#E8DCCF] text-[#56423E] text-[11px] font-bold transition-all border border-[#E5D7C7] cursor-pointer"
                        >
                          Chọn tất cả
                        </button>
                        <button
                          onClick={handleDeselectAll}
                          className="px-3 py-1 rounded-xl bg-[#F5EFE6] hover:bg-[#FDF0EE] text-rose-600 text-[11px] font-bold transition-all border border-[#E5D7C7] cursor-pointer"
                        >
                          Bỏ chọn
                        </button>
                      </div>
                    </div>

                    {/* Lesson Grid Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
                      {activeLessonOptions.map((item) => {
                        const isChecked = selectedLessonIds.includes(item.lessonId);
                        return (
                          <motion.button
                            key={item.lessonId}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={() => handleToggleLesson(item.lessonId)}
                            className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between text-left cursor-pointer relative overflow-hidden group ${
                              isChecked
                                ? "border-[#C65D4B] bg-[#FFF5F2] text-[#C65D4B] shadow-xs font-bold"
                                : "border-[#E8DCCF] bg-white hover:border-[#C65D4B]/40 text-[#231917]"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-[10px] font-serif text-[#8B6F5A]">
                                {item.kanjiTitle}
                              </span>
                              {isChecked ? (
                                <div className="w-4 h-4 rounded-full bg-[#C65D4B] flex items-center justify-center shadow-xs">
                                  <Check className="w-3 h-3 text-white stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-md border-2 border-[#DED3C8] group-hover:border-[#C65D4B]" />
                              )}
                            </div>
                            <span className="text-xs font-extrabold pt-2 block font-sans">
                              {item.title}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Mode Selection & Action Card */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8DCCF] p-6 shadow-xs space-y-6 sticky top-20">
                    <div>
                      <span className="text-xs font-serif text-[#C65D4B] uppercase tracking-widest block font-extrabold">
                        2. Chọn Chế Độ Ôn Tập
                      </span>
                      <span className="text-xs text-[#8B6F5A] font-medium">Chọn phương pháp học bạn muốn</span>
                    </div>

                    {/* Mode Buttons List */}
                    <div className="space-y-3">
                      {[
                        {
                          id: "list",
                          label: "Danh Sách Từ Vựng",
                          sub: "Tra cứu, phát âm & ghi nhớ",
                          icon: BookOpen,
                          kanji: "一覧",
                        },
                        {
                          id: "flashcard",
                          label: "Thẻ Ghi Nhớ 3D",
                          sub: "Lật thẻ phản xạ SRS",
                          icon: RotateCcw,
                          kanji: "単語帳",
                        },
                        {
                          id: "typing",
                          label: "Luyện Gõ Từ",
                          sub: "Gõ Hiragana / Romaji",
                          icon: Keyboard,
                          kanji: "入力",
                        },
                        {
                          id: "match",
                          label: "Game 3D Match",
                          sub: "Ghép thẻ tương tác",
                          icon: Gamepad2,
                          kanji: "合体",
                        },
                      ].map((mode) => {
                        const isActive = vocabStudyMode === mode.id;
                        const IconComp = mode.icon;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setVocabStudyMode(mode.id as any)}
                            className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between cursor-pointer transition-all ${
                              isActive
                                ? "border-[#C65D4B] bg-[#FFF5F2] shadow-xs"
                                : "border-[#E8DCCF] bg-white hover:border-[#C65D4B]/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                                  isActive
                                    ? "bg-[#C65D4B] text-white shadow-xs"
                                    : "bg-[#F5EFE6] text-[#8B6F5A]"
                                }`}
                              >
                                <IconComp className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <span className="text-xs font-extrabold text-[#231917] block">
                                  {mode.label}
                                </span>
                                <span className="text-[11px] font-medium text-[#76685F] block">
                                  {mode.sub}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-serif font-bold text-[#8B6F5A]">
                              {mode.kanji}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Action Start Button */}
                    <div className="pt-2 border-t border-[#E8DFD1]">
                      <button
                        onClick={handleStartReview}
                        disabled={selectedLessonIds.length === 0 || isLoading}
                        className="w-full py-4 px-6 rounded-2xl bg-[#C65D4B] hover:bg-[#B04F3F] disabled:opacity-40 text-white font-serif font-bold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                      >
                        {isLoading ? (
                          <span>Đang Tổng Hợp Từ Vựng...</span>
                        ) : (
                          <>
                            <span>Bắt Đầu Ôn Tập ({selectedLessonIds.length} Bài)</span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: ACTIVE STUDY MODE SECTION */
            <div className="space-y-6">
              {/* Navigation & Controls Bar */}
              <div className="bg-[#FFFDF9] border-2 border-[#E8DCCF] rounded-3xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-4 py-2 rounded-xl bg-[#F5EFE6] hover:bg-[#E8DCCF] text-[#231917] transition-all font-bold text-xs flex items-center gap-2 border border-[#E5D7C7] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Chọn Lại Bài
                  </button>
                  <div className="h-4 w-px bg-[#E8DFD1]" />
                  <div>
                    <h3 className="text-xs font-bold text-[#231917] font-serif">
                      Đang Ôn Gộp {selectedLessonIds.length} Bài ({aggregatedVocabularies.length} Từ Vựng)
                    </h3>
                  </div>
                </div>

                {/* Bulk Learned Actions */}
                <div className="flex items-center gap-2">
                  {totalLearnedCount === aggregatedVocabularies.length ? (
                    <button
                      type="button"
                      onClick={handleResetAll}
                      className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                      <span>Học Lại Từ Đầu</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleMarkAllLearned}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Đánh Dấu Thuộc Tất Cả</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "list", label: "Danh Sách Từ Vựng", icon: BookOpen },
                  { id: "flashcard", label: "Thẻ Ghi Nhớ 3D", icon: RotateCcw },
                  { id: "typing", label: "Luyện Gõ Từ", icon: Keyboard },
                  { id: "match", label: "Game 3D Match", icon: Gamepad2 },
                ].map((tab) => {
                  const isActive = vocabStudyMode === tab.id;
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setVocabStudyMode(tab.id as any)}
                      className={`p-3.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer border-2 ${
                        isActive
                          ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md font-serif"
                          : "bg-[#FFFDF9] text-[#76685F] border-[#E8DCCF] hover:border-[#C65D4B]/40"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE MODE RENDER */}
              {vocabStudyMode === "list" && (
                <div className="space-y-6">
                  {/* Search & POS Filters Toolbar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFDF9] p-4 rounded-3xl border-2 border-[#E8DCCF] shadow-xs">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-3.5 h-3.5 text-[#8B6F5A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm theo từ, hiragana, nghĩa tiếng Việt..."
                        className="w-full text-xs font-medium pl-9 pr-3 py-2 rounded-xl bg-[#FAF6EE] border border-[#E5D7C7] text-[#231917] placeholder-[#8B6F5A]/60 focus:border-[#C65D4B] outline-none transition-colors"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto">
                      {(["ALL", "NOUN", "VERB", "ADJ"] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setPosFilter(filter)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            posFilter === filter
                              ? "bg-[#C65D4B] text-white shadow-xs"
                              : "bg-[#F5EFE6] text-[#76685F] hover:bg-[#E8DCCF] border border-[#E5D7C7]"
                          }`}
                        >
                          {filter === "ALL"
                            ? "Tất cả"
                            : filter === "NOUN"
                            ? "Danh từ"
                            : filter === "VERB"
                            ? "Động từ"
                            : "Tính từ"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vocabulary Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredVocabularies.map((item) => {
                      const isLearned = learnedItemKeys.has(`v_${item.vocabularyId}`);
                      return (
                        <VocabularyLearningItem
                          key={item.vocabularyId}
                          item={item}
                          isLearned={isLearned}
                          onToggleLearned={handleToggleLearned}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {vocabStudyMode === "flashcard" && (
                <FlashcardStudyMode
                  vocabularies={aggregatedVocabularies}
                  levelCode={selectedLevel}
                  lessonTitle={`Ôn gộp ${selectedLessonIds.length} bài (${aggregatedVocabularies.length} từ)`}
                  onBack={() => setVocabStudyMode("list")}
                />
              )}

              {vocabStudyMode === "typing" && (
                <TypingStudyMode vocabularies={aggregatedVocabularies} />
              )}

              {vocabStudyMode === "match" && (
                <VocabMatchGame3D
                  vocabularies={aggregatedVocabularies}
                  onExit={() => setVocabStudyMode("list")}
                />
              )}
            </div>
          )}
        </main>
      </div>

      <LearnerFooter />
    </div>
  );
}
