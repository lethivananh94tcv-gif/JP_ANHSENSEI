"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LearnerProgressSummary } from "@/types/learner";
import {
  BookOpen,
  Languages,
  PenTool,
  ArrowRight,
  ChevronRight,
  Flame,
  Bot,
  Layers,
  Sparkles,
  Award,
  CheckCircle2,
  X,
  FileText,
  Volume2,
  Keyboard,
  RotateCcw,
  Check,
  Zap,
  Grid,
  Shuffle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ManekiNeko3D from "@/components/ui/ManekiNeko3D";
import { playKanaAlphabetTTS } from "@/lib/utils/japaneseAudioTTS";

// Full 46 Hiragana Gojuon Dataset
const FULL_HIRAGANA = [
  { kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" },
  { kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" },
  { kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" },
  { kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" },
  { kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" },
  { kana: "は", romaji: "ha" }, { kana: "ひ", romaji: "hi" }, { kana: "ふ", romaji: "fu" }, { kana: "へ", romaji: "he" }, { kana: "ほ", romaji: "ho" },
  { kana: "ま", romaji: "ma" }, { kana: "み", romaji: "mi" }, { kana: "む", romaji: "mu" }, { kana: "め", romaji: "me" }, { kana: "も", romaji: "mo" },
  { kana: "や", romaji: "ya" }, { kana: "ゆ", romaji: "yu" }, { kana: "よ", romaji: "yo" },
  { kana: "ら", romaji: "ra" }, { kana: "り", romaji: "ri" }, { kana: "る", romaji: "ru" }, { kana: "れ", romaji: "re" }, { kana: "ろ", romaji: "ro" },
  { kana: "わ", romaji: "wa" }, { kana: "を", romaji: "wo" }, { kana: "ん", romaji: "n" },
];

// Full 46 Katakana Gojuon Dataset
const FULL_KATAKANA = [
  { kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" },
  { kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" },
  { kana: "サ", romaji: "sa" }, { kana: "シ", romaji: "shi" }, { kana: "ス", romaji: "su" }, { kana: "セ", romaji: "se" }, { kana: "ソ", romaji: "so" },
  { kana: "タ", romaji: "ta" }, { kana: "チ", romaji: "chi" }, { kana: "ツ", romaji: "tsu" }, { kana: "テ", romaji: "te" }, { kana: "ト", romaji: "to" },
  { kana: "ナ", romaji: "na" }, { kana: "ニ", romaji: "ni" }, { kana: "ヌ", romaji: "nu" }, { kana: "ネ", romaji: "ne" }, { kana: "ノ", romaji: "no" },
  { kana: "ハ", romaji: "ha" }, { kana: "ヒ", romaji: "hi" }, { kana: "フ", romaji: "fu" }, { kana: "ヘ", romaji: "he" }, { kana: "ホ", romaji: "ho" },
  { kana: "マ", romaji: "ma" }, { kana: "ミ", romaji: "mi" }, { kana: "ム", romaji: "mu" }, { kana: "メ", romaji: "me" }, { kana: "モ", romaji: "mo" },
  { kana: "ヤ", romaji: "ya" }, { kana: "ユ", romaji: "yu" }, { kana: "ヨ", romaji: "yo" },
  { kana: "ラ", romaji: "ra" }, { kana: "リ", romaji: "ri" }, { kana: "ル", romaji: "ru" }, { kana: "レ", romaji: "re" }, { kana: "ロ", romaji: "ro" },
  { kana: "ワ", romaji: "wa" }, { kana: "ヲ", romaji: "wo" }, { kana: "ン", romaji: "n" },
];

interface LearningTypeGridProps {
  summary?: LearnerProgressSummary | null;
}

export default function LearningTypeGrid({ summary }: LearningTypeGridProps) {
  const [selectedKanaType, setSelectedKanaType] = useState<"HIRAGANA" | "KATAKANA" | null>(null);
  const [modalTab, setModalTab] = useState<"TABLE" | "TYPING">("TABLE");

  // Typing Practice Game States
  const [typingDataset, setTypingDataset] = useState(FULL_HIRAGANA);
  const [typingIndex, setTypingIndex] = useState(0);
  const [userTypedRomaji, setUserTypedRomaji] = useState("");
  const [typingScore, setTypingScore] = useState(0);
  const [typingStreak, setTypingStreak] = useState(0);
  const [typingFeedback, setTypingFeedback] = useState<"CORRECT" | "WRONG" | null>(null);
  const [typingHint, setTypingHint] = useState<string | null>(null);
  const typingInputRef = useRef<HTMLInputElement>(null);

  // Helper to shuffle dataset using Fisher-Yates algorithm
  const shuffleDataset = (array: { kana: string; romaji: string }[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const reshuffleDataset = (type = selectedKanaType) => {
    const base = type === "KATAKANA" ? FULL_KATAKANA : FULL_HIRAGANA;
    setTypingDataset(shuffleDataset(base));
    setTypingIndex(0);
    setUserTypedRomaji("");
    setTypingFeedback(null);
    setTypingHint(null);
  };

  // Sync and shuffle typing dataset when selectedKanaType or modalTab changes
  useEffect(() => {
    if (selectedKanaType) {
      reshuffleDataset(selectedKanaType);
    }
  }, [selectedKanaType, modalTab]);

  // TTS Speech Synthesis helper (Slower 0.72x, bright Tokyo female voice)
  const speakKana = (kana: string) => {
    playKanaAlphabetTTS(kana);
  };

  const currentItem = typingDataset[typingIndex] || typingDataset[0];

  const goToNextKana = () => {
    setTypingFeedback(null);
    setUserTypedRomaji("");
    setTypingHint(null);
    setTypingIndex((prev) => {
      const next = prev + 1;
      if (next >= typingDataset.length) {
        // Automatically re-shuffle once complete cycle is finished
        const base = selectedKanaType === "KATAKANA" ? FULL_KATAKANA : FULL_HIRAGANA;
        setTypingDataset(shuffleDataset(base));
        return 0;
      }
      return next;
    });
  };

  // Handle typing input change
  const handleTypingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserTypedRomaji(value);
    setTypingHint(null);

    const cleanInput = value.trim().toLowerCase();
    const targetRomaji = currentItem.romaji.toLowerCase();

    if (cleanInput === targetRomaji) {
      // Correct Match!
      speakKana(currentItem.kana);
      setTypingFeedback("CORRECT");
      setTypingScore((prev) => prev + 10);
      setTypingStreak((prev) => prev + 1);

      setTimeout(() => {
        goToNextKana();
      }, 400);
    }
  };

  const handleTypingKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cleanInput = userTypedRomaji.trim().toLowerCase();
      const targetRomaji = currentItem.romaji.toLowerCase();
      if (cleanInput !== targetRomaji) {
        setTypingFeedback("WRONG");
        setTypingStreak(0);
        setTypingHint(`Đáp án đúng: "${currentItem.romaji.toUpperCase()}"`);
        setTimeout(() => setTypingFeedback(null), 800);
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* ⛩️ BLOCK 3: KANA ALPHABET (LEFT 7 COLS) & TODAY'S TASKS (RIGHT 5 COLS) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Kana Tables (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-[#F2DDD4] space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌸</span>
              <h2 className="text-xl font-black text-[#2C201D]">
                Bảng Chữ Cái Tiếng Nhật (Kana)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedKanaType("HIRAGANA");
                  setModalTab("TYPING");
                }}
                className="text-xs font-black text-[#C65D4B] bg-[#FFEFEA] hover:bg-[#C65D4B] hover:text-white transition-all px-3 py-1.5 rounded-xl border border-[#FFD8CD] inline-flex items-center gap-1 cursor-pointer"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Luyện gõ</span>
              </button>
              <button
                onClick={() => {
                  setSelectedKanaType("HIRAGANA");
                  setModalTab("TABLE");
                }}
                className="text-xs font-bold text-[#76685F] hover:text-[#C65D4B] transition-colors inline-flex items-center gap-1 bg-[#FFF8F5] px-3 py-1.5 rounded-xl border border-[#F2DDD4] cursor-pointer"
              >
                <span>Bảng trọn bộ (46)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Table Hiragana Preview */}
            <div className="bg-[#FFF8F5] rounded-2xl p-4 border border-[#F5DDD4] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#C65D4B] text-white font-black text-xs flex items-center justify-center">
                    あ
                  </span>
                  <span className="font-black text-sm text-[#2C201D]">
                    Hiragana <span className="text-xs font-normal text-[#C65D4B]">(ひらがな)</span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedKanaType("HIRAGANA");
                    setModalTab("TYPING");
                  }}
                  title="Luyện gõ Hiragana"
                  className="p-1 rounded-lg bg-[#FFEFEA] text-[#C65D4B] hover:bg-[#C65D4B] hover:text-white transition cursor-pointer"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 5x3 Grid */}
              <div className="grid grid-cols-5 gap-1.5">
                {FULL_HIRAGANA.slice(0, 15).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => speakKana(item.kana)}
                    title={`Phát âm ${item.kana}`}
                    className="bg-white rounded-xl p-1.5 text-center border border-[#F5DDD4] shadow-2xs hover:scale-105 hover:border-[#C65D4B] transition-transform cursor-pointer"
                  >
                    <span className="font-black text-base text-[#2C201D] block leading-tight">{item.kana}</span>
                    <span className="text-[10px] font-bold text-[#8B6F5A] block uppercase">{item.romaji}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedKanaType("HIRAGANA");
                  setModalTab("TABLE");
                }}
                className="w-full text-center text-xs font-black text-[#C65D4B] hover:underline pt-1 inline-flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Xem tất cả 46 chữ Hiragana ➔</span>
              </button>
            </div>

            {/* Table Katakana Preview */}
            <div className="bg-[#F4F7FF] rounded-2xl p-4 border border-[#DCE4FF] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#3B66F5] text-white font-black text-xs flex items-center justify-center">
                    ア
                  </span>
                  <span className="font-black text-sm text-[#2C201D]">
                    Katakana <span className="text-xs font-normal text-[#3B66F5]">(カタカナ)</span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedKanaType("KATAKANA");
                    setModalTab("TYPING");
                  }}
                  title="Luyện gõ Katakana"
                  className="p-1 rounded-lg bg-[#EEF2FF] text-[#3B66F5] hover:bg-[#3B66F5] hover:text-white transition cursor-pointer"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 5x3 Grid */}
              <div className="grid grid-cols-5 gap-1.5">
                {FULL_KATAKANA.slice(0, 15).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => speakKana(item.kana)}
                    title={`Phát âm ${item.kana}`}
                    className="bg-white rounded-xl p-1.5 text-center border border-[#DCE4FF] shadow-2xs hover:scale-105 hover:border-[#3B66F5] transition-transform cursor-pointer"
                  >
                    <span className="font-black text-base text-[#2C201D] block leading-tight">{item.kana}</span>
                    <span className="text-[10px] font-bold text-[#3B66F5] block uppercase">{item.romaji}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedKanaType("KATAKANA");
                  setModalTab("TABLE");
                }}
                className="w-full text-center text-xs font-black text-[#3B66F5] hover:underline pt-1 inline-flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Xem tất cả 46 chữ Katakana ➔</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Recommended Tasks (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-[#F2DDD4] space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-3">
            <h2 className="text-xl font-black text-[#2C201D] flex items-center gap-2">
              <span>Hôm nay nên làm gì?</span>
              <span>🌤️</span>
            </h2>
          </div>

          <div className="space-y-3">
            {/* Task 1 */}
            <Link
              href="/vocabularies"
              className="flex items-center justify-between p-3.5 bg-[#FFF8F5] rounded-2xl border border-[#F5DDD4] hover:border-[#C65D4B] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C65D4B] text-white flex items-center justify-center shadow-xs">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2C201D] group-hover:text-[#C65D4B] transition-colors">Học từ vựng mới</h3>
                  <p className="text-xs text-[#76685F] font-semibold">{summary?.learnedVocabCount ? `${summary.learnedVocabCount} từ vựng đã tích lũy` : '12 từ vựng đang chờ học'}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8B6F5A] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Task 2 */}
            <Link
              href="/grammar"
              className="flex items-center justify-between p-3.5 bg-[#FFFBF0] rounded-2xl border border-[#FFEAB8] hover:border-amber-500 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2C201D] group-hover:text-amber-600 transition-colors">Luyện ngữ pháp</h3>
                  <p className="text-xs text-[#76685F] font-semibold">{summary?.learnedGrammarCount ? `${summary.learnedGrammarCount} cấu trúc ngữ pháp` : '3 bài ngữ pháp chưa hoàn thành'}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8B6F5A] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Task 3 */}
            <Link
              href="/flashcards"
              className="flex items-center justify-between p-3.5 bg-[#FFF5F0] rounded-2xl border border-[#FFD8C8] hover:border-[#C65D4B] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E65840] text-white flex items-center justify-center shadow-xs">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2C221E] group-hover:text-[#C65D4B] transition-colors">Ôn tập Flashcards</h3>
                  <p className="text-xs text-[#76685F] font-semibold">{summary?.dueFlashcardsCount ? `${summary.dueFlashcardsCount} thẻ cần ôn` : 'Thẻ học ghi nhớ SRS'}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8B6F5A] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Task 4 */}
            <Link
              href="/kanji"
              className="flex items-center justify-between p-3.5 bg-[#F9F5FF] rounded-2xl border border-[#E9D8FF] hover:border-purple-500 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2C201D] group-hover:text-purple-600 transition-colors">Luyện Kanji</h3>
                  <p className="text-xs text-[#76685F] font-semibold">{summary?.learnedKanjiCount ? `${summary.learnedKanjiCount} Hán tự đã thuộc` : '5 chữ mới dễ ghi nhớ'}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8B6F5A] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 📕 BLOCK 4: 5 HORIZONTAL FEATURE SHOWCASE CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Skill 1: Từ vựng */}
        <Link
          href="/vocabularies"
          className="bg-white rounded-3xl p-5 border-2 border-[#F2DDD4] shadow-sm hover:shadow-xl hover:border-[#C65D4B] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9C3A29] via-[#C65D4B] to-[#FF8C78] text-white flex items-center justify-center shadow-lg shadow-[#C65D4B]/30 border-2 border-white/50 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-2xl pointer-events-none" />
              <span className="font-jp font-black text-2xl drop-shadow-md text-amber-100">語</span>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] border border-[#C65D4B]/20">
              {summary?.learnedVocabCount ? `${summary.learnedVocabCount} Từ đã học` : 'Học từ vựng'}
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-[#2C201D] group-hover:text-[#C65D4B] transition-colors">Từ vựng</h3>
            <p className="text-xs text-[#76685F] font-extrabold">Học từ mới mỗi ngày</p>
          </div>

          <div className="flex justify-end pt-1">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8F5] border border-[#F5DDD4] group-hover:bg-[#C65D4B] group-hover:text-white group-hover:border-[#C65D4B] flex items-center justify-center text-[#8B6F5A] transition-all duration-300">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Skill 2: Ngữ pháp */}
        <Link
          href="/grammar"
          className="bg-white rounded-3xl p-5 border-2 border-[#E3F2E6] shadow-sm hover:shadow-xl hover:border-emerald-600 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#046C4E] via-[#059669] to-[#34D399] text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 border-2 border-white/50 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-2xl pointer-events-none" />
              <span className="font-jp font-black text-2xl drop-shadow-md text-emerald-100">文</span>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-600/10 text-emerald-700 border border-emerald-600/20">
              {summary?.learnedGrammarCount ? `${summary.learnedGrammarCount} Cấu trúc` : 'Luyện ngữ pháp'}
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-[#2C201D] group-hover:text-emerald-600 transition-colors">Ngữ pháp</h3>
            <p className="text-xs text-[#76685F] font-extrabold">Nắm vững cấu trúc</p>
          </div>

          <div className="flex justify-end pt-1">
            <div className="w-8 h-8 rounded-xl bg-[#EAF8F2] border border-[#C5EED0] group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 flex items-center justify-center text-emerald-700 transition-all duration-300">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Skill 3: Kanji */}
        <Link
          href="/kanji"
          className="bg-white rounded-3xl p-5 border-2 border-[#F7EBDD] shadow-sm hover:shadow-xl hover:border-[#8B6F5A] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#78350F] via-[#B45309] to-[#FBBF24] text-white flex items-center justify-center shadow-lg shadow-amber-700/30 border-2 border-white/50 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-2xl pointer-events-none" />
              <span className="font-jp font-black text-2xl drop-shadow-md text-amber-100">漢</span>
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-700/10 text-[#8B6F5A] border border-amber-700/20">
              {summary?.learnedKanjiCount ? `${summary.learnedKanjiCount} Hán tự` : 'Luyện Kanji'}
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-[#2C201D] group-hover:text-[#8B6F5A] transition-colors">Kanji</h3>
            <p className="text-xs text-[#76685F] font-extrabold">Học chữ Hán</p>
          </div>

          <div className="flex justify-end pt-1">
            <div className="w-8 h-8 rounded-xl bg-[#FFFBF0] border border-[#FFEAB8] group-hover:bg-[#8B6F5A] group-hover:text-white group-hover:border-[#8B6F5A] flex items-center justify-center text-[#8B6F5A] transition-all duration-300">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Skill 4: Luyện tập */}
        <Link
          href="/quizzes/1"
          className="bg-white rounded-3xl p-5 border-2 border-[#E1ECFF] shadow-sm hover:shadow-xl hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1D4ED8] via-[#2563EB] to-[#60A5FA] text-white flex items-center justify-center shadow-lg shadow-blue-600/30 border-2 border-white/50 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-2xl pointer-events-none" />
              <FileText className="w-7 h-7 stroke-[2.2] drop-shadow-md text-blue-100" />
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-600/10 text-blue-700 border border-blue-600/20">
              {summary?.completedLessonsCount ? `${summary.completedLessonsCount} Bài xong` : 'JLPT Quiz'}
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-[#2C201D] group-hover:text-blue-600 transition-colors">Luyện tập</h3>
            <p className="text-xs text-[#76685F] font-extrabold">Bài tập & Đề thi JLPT</p>
          </div>

          <div className="flex justify-end pt-1">
            <div className="w-8 h-8 rounded-xl bg-[#EEF4FF] border border-[#D0E0FF] group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 flex items-center justify-center text-blue-600 transition-all duration-300">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Skill 5: Flashcards SRS */}
        <Link
          href="/flashcards"
          className="bg-white rounded-3xl p-5 border-2 border-[#F5E6FF] shadow-sm hover:shadow-xl hover:border-purple-600 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5B21B6] via-[#7C3AED] to-[#C084FC] text-white flex items-center justify-center shadow-lg shadow-purple-600/30 border-2 border-white/50 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-2xl pointer-events-none" />
              <Layers className="w-7 h-7 stroke-[2.2] drop-shadow-md text-purple-100" />
            </div>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-purple-600/10 text-purple-700 border border-purple-600/20">
              SRS 3D
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-[#2C201D] group-hover:text-purple-600 transition-colors">Flashcards</h3>
            <p className="text-xs text-[#76685F] font-extrabold">Ôn tập ngắt quãng</p>
          </div>

          <div className="flex justify-end pt-1">
            <div className="w-8 h-8 rounded-xl bg-[#F8EEFF] border border-[#ECD4FF] group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 flex items-center justify-center text-purple-600 transition-all duration-300">
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      </section>

      {/* 📊 BLOCK 5: LEARNING STATS ANALYTICS & RECENT LESSONS & STREAK ACHIEVEMENTS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Col 1: Thống kê học tập (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-[#F2DDD4] space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-3">
            <h2 className="text-lg font-black text-[#2C201D]">Thống kê học tập</h2>
            <span className="text-xs font-bold text-[#76685F] bg-[#FFF8F5] px-3 py-1 rounded-xl border border-[#F2DDD4]">
              7 ngày qua ⌄
            </span>
          </div>

          {/* 4 Metric Chips with REAL Backend DB Stats */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#FFF8F5] p-2 rounded-xl border border-[#F5DDD4]">
              <span className="text-xs text-[#C65D4B] block">📕</span>
              <span className="text-base font-black text-[#2C201D] block">{summary?.learnedVocabCount ?? 0}</span>
              <span className="text-[10px] text-[#76685F] font-bold block truncate">Từ vựng</span>
            </div>
            <div className="bg-[#FFFBF0] p-2 rounded-xl border border-[#FFEAB8]">
              <span className="text-xs text-amber-600 block">📙</span>
              <span className="text-base font-black text-[#2C201D] block">{summary?.learnedKanjiCount ?? 0}</span>
              <span className="text-[10px] text-[#76685F] font-bold block truncate">Kanji</span>
            </div>
            <div className="bg-[#FFF5F0] p-2 rounded-xl border border-[#FFD8C8]">
              <span className="text-xs text-[#E65840] block">🟧</span>
              <span className="text-base font-black text-[#2C201D] block">{summary?.completedLessonsCount ?? 0}</span>
              <span className="text-[10px] text-[#76685F] font-bold block truncate">Bài tập</span>
            </div>
            <div className="bg-[#EAF8F2] p-2 rounded-xl border border-[#C5EED0]">
              <span className="text-xs text-emerald-600 block">📈</span>
              <span className="text-base font-black text-emerald-600 block">{summary?.completedLessonsCount ? '100%' : '0%'}</span>
              <span className="text-[10px] text-[#76685F] font-bold block truncate">Tỷ lệ đúng</span>
            </div>
          </div>

          {/* SVG Line Chart Simulation */}
          <div className="space-y-2 pt-2">
            <div className="h-36 w-full relative flex items-end justify-between pt-6 pb-2 px-1">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 100" fill="none">
                <path
                  d="M 10 70 Q 50 80 90 60 T 170 30 T 250 20"
                  stroke="#C65D4B"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="250" cy="20" r="5" fill="#C65D4B" stroke="white" strokeWidth="2" />
              </svg>

              <div className="absolute top-1 right-2 bg-[#2C201D] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
                Tỷ lệ hoàn thành: {summary?.completionPercent ? `${summary.completionPercent}%` : '0%'}
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-[#76685F] font-bold px-1 border-t border-[#F5EFE6] pt-2">
              {summary?.weeklyActivities && summary.weeklyActivities.length > 0 ? (
                summary.weeklyActivities.map((act, i) => (
                  <span key={i}>{act.date.slice(5).replace('-', '/')}</span>
                ))
              ) : (
                <>
                  <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Col 2: Bài học gần đây (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-[#F2DDD4] space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-3">
            <h2 className="text-lg font-black text-[#2C201D]">Bài học gần đây</h2>
            <Link href="/learn" className="text-xs font-bold text-[#76685F] hover:text-[#C65D4B] transition-colors flex items-center gap-1">
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {summary?.recentLessons && summary.recentLessons.length > 0 ? (
              summary.recentLessons.map((item, idx) => (
                <Link
                  key={item.lessonId}
                  href={`/lessons/${item.lessonId}`}
                  className="p-3 bg-[#FFF8F5] rounded-2xl border border-[#F5DDD4] flex items-center justify-between gap-3 hover:border-[#C65D4B] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFECE7] text-[#C65D4B] flex items-center justify-center font-black text-xs shrink-0">
                      {idx === 0 ? '📙' : idx === 1 ? '📗' : '🟪'}
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-[#2C201D] line-clamp-1">{item.title}</h3>
                      <span className="text-[10px] font-bold text-[#76685F]">JLPT {item.levelCode}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#C65D4B] text-[#C65D4B] text-[10px] font-black flex items-center justify-center shrink-0">
                    {Math.round(item.completionPercent || 0)}%
                  </div>
                </Link>
              ))
            ) : summary?.continueLesson ? (
              <Link
                href={`/lessons/${summary.continueLesson.lessonId}`}
                className="p-3 bg-[#FFF8F5] rounded-2xl border border-[#F5DDD4] flex items-center justify-between gap-3 hover:border-[#C65D4B] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFECE7] text-[#C65D4B] flex items-center justify-center font-black text-xs shrink-0">
                    📙
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#2C201D] line-clamp-1">{summary.continueLesson.title}</h3>
                    <span className="text-[10px] font-bold text-[#76685F]">JLPT {summary.continueLesson.levelCode}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#C65D4B] text-[#C65D4B] text-[10px] font-black flex items-center justify-center shrink-0">
                  {Math.round(summary.continueLesson.progressPercent || 0)}%
                </div>
              </Link>
            ) : (
              <div className="p-4 text-center bg-[#FFF8F5] rounded-2xl border border-[#F5DDD4] space-y-2">
                <p className="text-xs font-bold text-[#76685F]">Bạn chưa mở bài học nào.</p>
                <Link href="/learn" className="inline-block px-3 py-1 bg-[#C65D4B] text-white text-xs font-black rounded-xl">
                  Bắt đầu học ngay ➔
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Col 3: Streak & Thành tích (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-[#F2DDD4] space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-3">
            <h2 className="text-lg font-black text-[#2C201D]">Streak & Thành tích</h2>
          </div>

          <div className="space-y-4">
            {/* Flame Streak Circle & Week Days */}
            <div className="flex items-center gap-4 bg-[#FFF8F5] p-3.5 rounded-2xl border border-[#F5DDD4]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C65D4B] to-[#FF8C78] text-white flex flex-col items-center justify-center shadow-md shrink-0">
                <Flame className="w-5 h-5 fill-white" />
                <span className="text-base font-black leading-none mt-0.5">{summary?.streakDays ?? 1}</span>
              </div>
              <div>
                <span className="text-xs font-black text-[#2C201D] block">Ngày liên tục</span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => {
                    const hasActivity = (summary?.weeklyActivities?.[i]?.count || 0) > 0;
                    return (
                      <div key={day} className="text-center">
                        <span className="text-[9px] font-bold text-[#76685F] block">{day}</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] mt-0.5 ${hasActivity ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                          {hasActivity ? "✓" : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Badges Collection */}
            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-black text-[#2C201D]">Huy hiệu của bạn</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#FFF8F5] border border-[#F5DDD4] rounded-2xl p-2.5 text-center shadow-2xs">
                  <span className="text-3xl block">🌸</span>
                  <span className="text-[10px] font-bold text-[#8B6F5A] block mt-1">Sakura</span>
                </div>
                <div className="bg-[#FFF8F5] border border-[#F5DDD4] rounded-2xl p-2.5 text-center shadow-2xs">
                  <span className="text-3xl block">🗻</span>
                  <span className="text-[10px] font-bold text-[#8B6F5A] block mt-1">Fuji</span>
                </div>
                <div className="bg-[#FFF8F5] border border-[#F5DDD4] rounded-2xl p-2.5 text-center shadow-2xs">
                  <span className="text-3xl block">🎒</span>
                  <span className="text-[10px] font-bold text-[#8B6F5A] block mt-1">Học sinh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏮 BLOCK 6: BOTTOM MOTIVATION BANNER */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#FFF3EF] border border-[#F5DDD4] p-5 sm:p-6 lg:p-7 text-[#2C201D] shadow-sm min-h-[140px] flex items-center">
        <div
          className="absolute inset-y-0 right-0 w-1/2 md:w-5/12 bg-cover bg-right bg-no-repeat pointer-events-none opacity-90 hidden sm:block"
          style={{ backgroundImage: `url('/images/japanese_sakura_house_banner.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF3EF] via-[#FFF3EF]/75 to-transparent" />
        </div>

        <div className="absolute left-1/3 bottom-0 opacity-15 pointer-events-none select-none hidden md:block">
          <svg width="240" height="80" viewBox="0 0 240 80" fill="none">
            <path d="M0 80L120 10L240 80H0Z" fill="#C65D4B" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-4 sm:gap-6 max-w-2xl">
          <ManekiNeko3D bubbleText="頑張れ!" className="flex-shrink-0 scale-90 sm:scale-100" />
          <div className="space-y-1">
            <p className="text-base sm:text-lg lg:text-xl font-black text-[#2C201D] tracking-wide font-jp leading-snug">
              一歩ずつ進めば、必ずゴールに着きます。
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#76685F]">
              Chỉ cần tiến từng bước, bạn sẽ chắc chắn đạt được mục tiêu.
            </p>
          </div>
        </div>
      </section>

      {/* KANA CHART & TYPING PRACTICE INTERACTIVE MODAL */}
      <AnimatePresence>
        {selectedKanaType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#FDFBF7] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-2 border-[#8B6F5A]/20 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedKanaType(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F5EFE6] text-[#8B6F5A] hover:bg-[#C65D4B] hover:text-white transition flex items-center justify-center cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl text-white font-black text-2xl flex items-center justify-center shadow-md ${selectedKanaType === "HIRAGANA" ? "bg-[#C65D4B]" : "bg-[#3B66F5]"}`}>
                    {selectedKanaType === "HIRAGANA" ? "あ" : "ア"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#2C201D]">
                      {selectedKanaType === "HIRAGANA" ? "Bảng Chữ Cái Hiragana (平仮名)" : "Bảng Chữ Cái Katakana (片仮名)"}
                    </h3>
                    <p className="text-xs font-bold text-[#8B6F5A]">
                      Trọn Bộ 46 Chữ Cái Căn Bản (Gojuon - 五十音) &amp; Chức Năng Luyện Gõ Siêu Tốc
                    </p>
                  </div>
                </div>

                {/* Tab Switcher: Full Table vs Speed Typing Game */}
                <div className="flex items-center bg-[#F5EFE6] p-1 rounded-2xl border border-[#E0D5C7] self-start sm:self-auto">
                  <button
                    onClick={() => setModalTab("TABLE")}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === "TABLE"
                        ? "bg-white text-[#2C201D] shadow-xs"
                        : "text-[#76685F] hover:text-[#2C201D]"
                    }`}
                  >
                    <Grid className="w-4 h-4 text-[#C65D4B]" />
                    <span>Trọn Bộ 46 Chữ</span>
                  </button>
                  <button
                    onClick={() => setModalTab("TYPING")}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === "TYPING"
                        ? "bg-[#C65D4B] text-white shadow-xs"
                        : "text-[#76685F] hover:text-[#2C201D]"
                    }`}
                  >
                    <Keyboard className="w-4 h-4" />
                    <span>Luyện Gõ Romaji</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: FULL 46 CHARACTER GRID TABLE WITH TTS AUDIO */}
              {modalTab === "TABLE" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#FFF8F5] p-3 rounded-2xl border border-[#F5DDD4] text-xs font-bold text-[#8B6F5A]">
                    <span>💡 Click vào từng chữ để nghe giọng phát âm tiếng Nhật chuẩn (TTS)</span>
                    <span className="text-[#C65D4B] font-black">46/46 Chữ cái</span>
                  </div>

                  {/* 46 Kana Grid */}
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 my-4">
                    {(selectedKanaType === "HIRAGANA" ? FULL_HIRAGANA : FULL_KATAKANA).map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => speakKana(item.kana)}
                        title={`Bấm để nghe phát âm "${item.kana}"`}
                        className="p-3 bg-white rounded-2xl border border-[#8B6F5A]/20 text-center shadow-2xs hover:scale-110 hover:border-[#C65D4B] hover:shadow-md transition-all cursor-pointer group relative"
                      >
                        <Volume2 className="w-3 h-3 text-[#C65D4B] absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-2xl font-black text-[#2C221E] block group-hover:text-[#C65D4B] transition-colors">{item.kana}</span>
                        <span className="text-[10px] font-bold text-[#8B6F5A] uppercase block mt-0.5">{item.romaji}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE KANA SPEED TYPING PRACTICE GAME */}
              {modalTab === "TYPING" && (
                <div className="space-y-6 bg-gradient-to-b from-[#FFF8F5] via-[#FFF3EF] to-[#FDFBF7] p-6 sm:p-8 rounded-3xl border-2 border-[#F5DDD4] shadow-inner text-center">
                  
                  {/* Game Stats Scoreboard */}
                  <div className="flex items-center justify-around bg-white p-3.5 rounded-2xl border border-[#F5DDD4] shadow-2xs text-xs font-black">
                    <div className="flex items-center gap-1.5 text-[#C65D4B]">
                      <Zap className="w-4 h-4 fill-[#C65D4B]" />
                      <span>Điểm: {typingScore}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <Flame className="w-4 h-4 fill-amber-500" />
                      <span>Streak: {typingStreak}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-indigo-600">
                      <Shuffle className="w-4 h-4" />
                      <span>Xáo trộn: {typingIndex + 1}/{typingDataset.length}</span>
                    </div>
                  </div>

                  {/* Big Prompt Card */}
                  <div className="relative max-w-xs mx-auto py-8 bg-white rounded-3xl border-4 border-[#C65D4B] shadow-xl flex flex-col items-center justify-center space-y-2">
                    <button
                      onClick={() => speakKana(currentItem.kana)}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-[#FFF8F5] text-[#C65D4B] hover:scale-110 transition cursor-pointer"
                      title="Nghe lại phát âm"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <motion.span
                      key={currentItem.kana}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-7xl font-jp font-black text-[#2C201D] block drop-shadow-sm"
                    >
                      {currentItem.kana}
                    </motion.span>
                    <span className="text-xs font-bold text-[#8B6F5A] uppercase tracking-wider block">
                      Gõ phiên âm Romaji tương ứng
                    </span>
                  </div>

                  {/* Interactive Typing Input */}
                  <div className="max-w-xs mx-auto space-y-3">
                    <div className="relative">
                      <input
                        ref={typingInputRef}
                        type="text"
                        value={userTypedRomaji}
                        onChange={handleTypingInputChange}
                        onKeyDown={handleTypingKeyDown}
                        placeholder="Gõ Romaji (vd: ka, shi, me)..."
                        autoFocus
                        className={`w-full py-3.5 px-4 text-center font-black text-lg rounded-2xl border-2 outline-none transition-all shadow-sm ${
                          typingFeedback === "CORRECT"
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-4 ring-emerald-500/20"
                            : typingFeedback === "WRONG"
                            ? "bg-rose-50 border-rose-500 text-rose-700 ring-4 ring-rose-500/20 animate-shake"
                            : "bg-white border-[#EAD0C7] text-[#2C201D] focus:border-[#C65D4B] focus:ring-4 focus:ring-[#C65D4B]/20"
                        }`}
                      />
                      {typingFeedback === "CORRECT" && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Hint feedback if wrong */}
                    {typingHint && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-black text-rose-600 bg-rose-50 py-1.5 px-3 rounded-xl border border-rose-200 inline-block">
                        {typingHint}
                      </motion.p>
                    )}

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={goToNextKana}
                        className="px-4 py-2 rounded-xl bg-white border border-[#EAD0C7] text-[#8B6F5A] hover:text-[#C65D4B] text-xs font-bold shadow-2xs transition cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Bỏ qua chữ này</span>
                      </button>
                      <button
                        onClick={() => reshuffleDataset()}
                        className="px-4 py-2 rounded-xl bg-[#FFEFEA] border border-[#FFD8CD] text-[#C65D4B] hover:bg-[#C65D4B] hover:text-white text-xs font-bold shadow-2xs transition cursor-pointer flex items-center gap-1"
                        title="Trộn lại thứ tự các chữ cái ngẫu nhiên"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>🎲 Trộn lại ngẫu nhiên</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-[#8B6F5A]/15 flex items-center justify-between">
                <span className="text-xs font-bold text-[#8B6F5A]">
                  {modalTab === "TABLE" ? "Trọn bộ 46 ký tự tiếng Nhật căn bản" : "Luyện phản xạ gõ Romaji tốc độ cao"}
                </span>
                <button
                  onClick={() => setSelectedKanaType(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#C65D4B] text-white font-bold text-xs shadow-md hover:bg-[#B04F3F] transition cursor-pointer"
                >
                  Đóng Bảng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
