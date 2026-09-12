"use client";

import { useEffect, useState, useCallback, useMemo, useTransition, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import LearnerHeader from "@/components/learner/LearnerHeader";
import {
  Zap,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Filter,
  Layers,
  HelpCircle,
  Volume2,
  ChevronRight,
  Trophy,
  Award,
  Flame,
  RefreshCw,
} from "lucide-react";
import {
  detectGroup,
  conjugate,
  conjugateAll,
  getFormDisplayName,
  getGroupDisplayName,
  VerbGroup,
  ConjugationForm,
  sanitizePureVerb,
} from "@/lib/japanese/verbConjugator";

import { UserProfile } from "@/types/learner";
import DynamicConjugationRuleCard from "@/components/learner/verbs/DynamicConjugationRuleCard";
import { toRomajiVariants } from "@/lib/japanese/romajiConverter";

interface VerbQuestion {
  id: number;
  word: string;
  kana: string;
  baseWord: string;
  baseKana: string;
  kanjiForm?: string;
  meaning: string;
  group: VerbGroup;
  level: string;
  targetForm: ConjugationForm;
}

import { MASTER_VERB_DATASET } from "@/lib/japanese/verbDataset";


const PHASE1_FORMS: ConjugationForm[] = ["TE", "NAI", "TA", "DICT", "MASU"];
const ALL_FORMS: ConjugationForm[] = [
  "MASU",
  "DICT",
  "TE",
  "NAI",
  "TA",
  "POTENTIAL",
  "VOLITIONAL",
  "IMPERATIVE",
  "CONDITIONAL_BA",
  "PASSIVE",
  "CAUSATIVE",
];

export default function JapaneseVerbPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "flashcard" ? "flashcard" : "practice";

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<"practice" | "flashcard">(initialTab);

  // Filter States
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [selectedForm, setSelectedForm] = useState<string>("ALL");

  // Practice Mode States
  const [questions, setQuestions] = useState<VerbQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<{ correct: number; total: number; streak: number }>({
    correct: 0,
    total: 0,
    streak: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Flashcard Mode States
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Fetch profile & Build Question Pool
  useEffect(() => {
    apiClient<UserProfile>("/learner/profile")
      .then((res) => {
        if (res.data) setProfile(res.data);
      })
      .catch(() => {});
  }, []);

  const generateQuestions = useCallback(() => {
    let filteredList = MASTER_VERB_DATASET;
    if (selectedLevel !== "ALL") {
      filteredList = filteredList.filter((v) => v.level === selectedLevel);
    }

    const questionList: VerbQuestion[] = [];
    let idCounter = 1;

    filteredList.forEach((v) => {
      const cleanWord = sanitizePureVerb(v.word);
      const cleanKana = sanitizePureVerb(v.kana);
      const group = detectGroup(cleanWord);
      if (selectedGroup !== "ALL" && group !== selectedGroup) return;

      const masuWord = conjugate(cleanWord, group, "MASU");
      const masuKana = conjugate(cleanKana, group, "MASU");
      const dictWord = conjugate(cleanWord, group, "DICT");
      const dictKana = conjugate(cleanKana, group, "DICT");

      const targetFormsToUse =
        selectedForm !== "ALL"
          ? [selectedForm as ConjugationForm]
          : ALL_FORMS;

      targetFormsToUse.forEach((form) => {
        // Ensure prompt form is never identical to target form
        let promptWord = masuWord;
        let promptKana = masuKana;

        if (form === "DICT") {
          // If asking for Dictionary form, prompt must be in MASU form
          promptWord = masuWord;
          promptKana = masuKana;
        } else if (form === "MASU") {
          // If asking for MASU form, prompt must be in DICT form
          promptWord = dictWord;
          promptKana = dictKana;
        }

        questionList.push({
          id: idCounter++,
          word: promptWord,
          kana: promptKana,
          baseWord: cleanWord,
          baseKana: cleanKana,
          meaning: v.meaning,
          group: group,
          level: v.level,
          targetForm: form,
        });
      });
    });

    // Shuffle array
    for (let i = questionList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionList[i], questionList[j]] = [questionList[j], questionList[i]];
    }

    setQuestions(questionList);
    setCurrentIndex(0);
    setUserAnswer("");
    setIsAnswered(false);
    setIsCorrect(null);
    setScore({ correct: 0, total: 0, streak: 0 });
  }, [selectedLevel, selectedGroup, selectedForm]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const currentQ = questions[currentIndex];

  // Expected answer calculation supporting both plain and polite variants
  const answerInfo = useMemo(() => {
    if (!currentQ) return null;

    const plainKanji = conjugate(currentQ.baseWord || currentQ.word, currentQ.group, currentQ.targetForm);
    const plainKana = conjugate(currentQ.baseKana || currentQ.kana, currentQ.group, currentQ.targetForm);

    const kanjiVariants = [plainKanji];
    const kanaVariants = [plainKana];

    const form = currentQ.targetForm;
    const baseW = currentQ.baseWord || currentQ.word;
    const baseK = currentQ.baseKana || currentQ.kana;

    if (form === "POTENTIAL" || form === "PASSIVE" || form === "CAUSATIVE") {
      const politeKanji = plainKanji.endsWith("できる")
        ? plainKanji.replace(/できる$/, "できます")
        : plainKanji.replace(/る$/, "ます");
      const politeKana = plainKana.endsWith("できる")
        ? plainKana.replace(/できる$/, "できます")
        : plainKana.replace(/る$/, "ます");

      if (!kanjiVariants.includes(politeKanji)) kanjiVariants.push(politeKanji);
      if (!kanaVariants.includes(politeKana)) kanaVariants.push(politeKana);
    } else if (form === "NAI") {
      const masuKanji = conjugate(baseW, currentQ.group, "MASU").replace(/ます$/, "ません");
      const masuKana = conjugate(baseK, currentQ.group, "MASU").replace(/ます$/, "ません");
      if (!kanjiVariants.includes(masuKanji)) kanjiVariants.push(masuKanji);
      if (!kanaVariants.includes(masuKana)) kanaVariants.push(masuKana);
    } else if (form === "VOLITIONAL") {
      const masuKanji = conjugate(baseW, currentQ.group, "MASU").replace(/ます$/, "ましょう");
      const masuKana = conjugate(baseK, currentQ.group, "MASU").replace(/ます$/, "ましょう");
      if (!kanjiVariants.includes(masuKanji)) kanjiVariants.push(masuKanji);
      if (!kanaVariants.includes(masuKana)) kanaVariants.push(masuKana);
    } else if (form === "TA") {
      const masuKanji = conjugate(baseW, currentQ.group, "MASU").replace(/ます$/, "ました");
      const masuKana = conjugate(baseK, currentQ.group, "MASU").replace(/ます$/, "ました");
      if (!kanjiVariants.includes(masuKanji)) kanjiVariants.push(masuKanji);
      if (!kanaVariants.includes(masuKana)) kanaVariants.push(masuKana);
    }

    const allRomaji: string[] = [];
    kanaVariants.forEach((k) => {
      toRomajiVariants(k).forEach((r) => {
        if (!allRomaji.includes(r.toLowerCase())) {
          allRomaji.push(r.toLowerCase());
        }
      });
    });

    const mainRomaji = toRomajiVariants(plainKana)[0] || "";
    const displayAnswer = `${plainKanji} (${plainKana} / ${mainRomaji})`;

    return {
      kanjiVariants,
      kanaVariants,
      romajiVariants: allRomaji,
      displayAnswer,
      explanationKana: kanaVariants.join(" / "),
      explanationRomaji: allRomaji.join(" / "),
    };
  }, [currentQ]);

  // Answer Check Handler
  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQ || isAnswered || !userAnswer.trim() || !answerInfo) return;

    const inputClean = userAnswer.trim().toLowerCase();

    const isKanaMatch = answerInfo.kanaVariants.some((k) => k.toLowerCase() === inputClean);
    const isKanjiMatch = answerInfo.kanjiVariants.some((k) => k.toLowerCase() === inputClean);
    const isRomajiMatch = answerInfo.romajiVariants.some((r) => r === inputClean);

    const correct = isKanaMatch || isKanjiMatch || isRomajiMatch;

    setIsCorrect(correct);
    setIsAnswered(true);

    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      streak: correct ? prev.streak + 1 : 0,
    }));
  };

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Re-shuffle when finished
      generateQuestions();
    }
    setUserAnswer("");
    setIsAnswered(false);
    setIsCorrect(null);
  }, [currentIndex, questions.length, generateQuestions]);

  const handleRetry = () => {
    if (isAnswered) {
      setScore((prev) => ({
        correct: Math.max(0, prev.correct - (isCorrect ? 1 : 0)),
        total: Math.max(0, prev.total - 1),
        streak: isCorrect ? Math.max(0, prev.streak - 1) : prev.streak,
      }));
    }
    setUserAnswer("");
    setIsAnswered(false);
    setIsCorrect(null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Keyboard shortcut: Pressing Enter after answering automatically goes to Next Question
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "practice") return;
      if (e.key === "Enter" && isAnswered) {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, isAnswered, handleNextQuestion]);

  // Auto-focus input on question load or retry
  useEffect(() => {
    if (!isAnswered && activeTab === "practice") {
      inputRef.current?.focus();
    }
  }, [currentIndex, isAnswered, activeTab]);

  const handleRestart = () => {
    setScore({ correct: 0, total: 0, streak: 0 });
    generateQuestions();
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#302A26] font-sans flex flex-col">
      <LearnerHeader user={profile} />

      <main className="flex-1 w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24 md:pb-12">
        {/* Compact Header & Sticky Control Toolbar */}
        <div className="space-y-3">
          {/* Compact Top Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-black text-[#302A26] flex items-center gap-2 tracking-tight">
                <Zap className="w-5 h-5 text-[#C65D4B] fill-[#C65D4B]" />
                <span>Luyện Tập Chia Động Từ</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] text-[11px] font-black border border-[#C65D4B]/20">
                N5 - N3 · 11 Thể Chia
              </span>
            </div>

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-[#756A62]">
              <Link href="/dashboard" className="hover:text-[#C65D4B] transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link href="/vocabularies" className="hover:text-[#C65D4B] transition-colors">
                Từ vựng
              </Link>
              <span>/</span>
              <span className="text-[#C65D4B] font-extrabold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-[#C65D4B]" />
                Luyện Chia Động Từ
              </span>
            </nav>
          </div>

          {/* Sticky Controls & Mode Switcher Panel */}
          <div className="sticky top-16 sm:top-20 z-30 bg-[#FFFCF7]/95 backdrop-blur-md border border-[#DED3C8] rounded-2xl p-2.5 sm:p-3 shadow-md flex flex-wrap items-center justify-between gap-3">
            
            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#FAF6F0] p-1 rounded-xl border border-[#DED3C8] shrink-0">
              <button
                onClick={() => setActiveTab("practice")}
                className={`px-4 py-2 rounded-lg font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "practice"
                    ? "bg-[#C65D4B] text-white shadow-xs"
                    : "text-[#756A62] hover:text-[#302A26]"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Gõ Phản Xạ ⌨️</span>
              </button>
              <button
                onClick={() => setActiveTab("flashcard")}
                className={`px-4 py-2 rounded-lg font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "flashcard"
                    ? "bg-[#C65D4B] text-white shadow-xs"
                    : "text-[#756A62] hover:text-[#302A26]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ Flashcards 🎴</span>
              </button>
            </div>

            {/* Filter Dropdowns & Restart Button */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-[#FAF6F0] border border-[#DED3C8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#302A26] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/30 cursor-pointer"
              >
                <option value="ALL">Cấp độ: Tất cả (N5-N3)</option>
                <option value="N5">Cấp độ N5</option>
                <option value="N4">Cấp độ N4</option>
                <option value="N3">Cấp độ N3</option>
              </select>

              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="bg-[#FAF6F0] border border-[#DED3C8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#302A26] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/30 cursor-pointer"
              >
                <option value="ALL">Nhóm Động Từ: Tất cả</option>
                <option value="GROUP_1">Nhóm I (Godan)</option>
                <option value="GROUP_2">Nhóm II (Ichidan)</option>
                <option value="GROUP_3">Nhóm III (Bất quy tắc)</option>
              </select>

              <select
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="bg-[#FAF6F0] border border-[#DED3C8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#302A26] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/30 cursor-pointer"
              >
                <option value="ALL">Thể Chia: Tất cả 11 thể</option>
                <option value="TE">Thể Te (て形)</option>
                <option value="NAI">Thể Phủ định (ない形)</option>
                <option value="TA">Thể Quá khứ (た形)</option>
                <option value="DICT">Thể Từ điển (辞書形)</option>
                <option value="MASU">Thể Masu (ます形)</option>
                <option value="POTENTIAL">Thể Khả năng (可能形)</option>
                <option value="VOLITIONAL">Thể Ý định (意向形)</option>
                <option value="IMPERATIVE">Thể Mệnh lệnh (命令形)</option>
                <option value="CONDITIONAL_BA">Thể Điều kiện (ば形)</option>
                <option value="PASSIVE">Thể Bị động (受身形)</option>
                <option value="CAUSATIVE">Thể Sai khiến (使役形)</option>
              </select>

              <button
                onClick={handleRestart}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#DED3C8] text-xs font-bold text-[#C65D4B] hover:bg-[#C65D4B] hover:text-white transition-all cursor-pointer shadow-2xs"
                title="Làm lại từ đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Làm lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: TYPING PRACTICE */}
        {activeTab === "practice" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Question Card (8 cols) */}
            <div className="lg:col-span-8 bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              {currentQ ? (
                <>
                  {/* Progress Counter & Badges */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#EBE1D7]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#756A62]">
                        Câu {currentIndex + 1} / {questions.length}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6F0] border border-[#EBE1D7] text-[11px] font-bold text-[#302A26]">
                        {currentQ.level}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F0705A]/10 text-[#C65D4B] text-[11px] font-bold">
                        {getGroupDisplayName(currentQ.group)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs font-black text-amber-600">
                        <Trophy className="w-4 h-4 fill-amber-500 text-amber-500" />
                        Streak: {score.streak}
                      </div>
                    </div>
                  </div>

                  {/* Main Question Prompt */}
                  <div className="text-center py-6 space-y-3 bg-[#FAF6F0] rounded-3xl border border-[#EBE1D7] p-6">
                    <span className="text-xs font-bold text-[#756A62] uppercase tracking-wider">
                      Yêu cầu chia động từ
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-black text-[#C65D4B]">
                      {currentQ.word}
                    </h2>
                    <p className="text-sm font-bold text-[#554B43]">
                      ({currentQ.kana}) — <span className="italic">{currentQ.meaning}</span>
                    </p>

                    <div className="inline-block mt-3 px-4 py-1.5 rounded-2xl bg-[#C65D4B] text-white font-black text-sm shadow-sm">
                      Sang {getFormDisplayName(currentQ.targetForm)}
                    </div>
                  </div>

                  {/* Input Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isAnswered) {
                        handleNextQuestion();
                      } else {
                        handleCheckAnswer(e);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        readOnly={isAnswered}
                        placeholder="Nhập dạng Hiragana, Kanji hoặc Romaji (VD: かいて / 書い / kaite...)"
                        className={`w-full bg-white border-2 rounded-2xl px-5 py-4 text-base sm:text-lg font-bold text-[#302A26] placeholder-[#A0958C] focus:outline-none transition-all ${
                          isAnswered
                            ? isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                              : "border-rose-500 bg-rose-50 text-rose-900"
                            : "border-[#DED3C8] focus:border-[#C65D4B] focus:ring-4 focus:ring-[#C65D4B]/15"
                        }`}
                        autoFocus
                      />

                      {isAnswered && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-7 h-7 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <XCircle className="w-7 h-7 text-rose-600 fill-rose-100" />
                          )}
                        </div>
                      )}
                    </div>

                    {!isAnswered ? (
                      <button
                        type="submit"
                        disabled={!userAnswer.trim()}
                        className="w-full py-3.5 rounded-2xl bg-[#C65D4B] hover:bg-[#B04C3B] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Kiểm tra đáp án (Enter)
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="flex-1 py-3.5 rounded-2xl bg-[#FAF6F0] border-2 border-[#DED3C8] hover:border-[#C65D4B] hover:bg-[#FFFCF7] text-[#302A26] font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4 text-[#C65D4B]" />
                          Nhập lại 🔄
                        </button>

                        <button
                          type="submit"
                          className="flex-1 py-3.5 rounded-2xl bg-[#302A26] hover:bg-[#1E1917] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Câu tiếp theo (Enter ↵)
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </form>

                  {/* Feedback Explanation Card */}
                  {isAnswered && answerInfo && (
                    <div
                      className={`p-5 rounded-2xl border space-y-2 animate-in fade-in duration-200 ${
                        isCorrect
                          ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                          : "bg-rose-50/80 border-rose-200 text-rose-900"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-black text-sm">
                        {isCorrect ? "🎉 Chính xác tuyệt vời!" : "❌ Chưa chính xác rồi!"}
                      </div>

                      <p className="text-sm">
                        Đáp án đúng là:{" "}
                        <span className="font-extrabold underline underline-offset-4">
                          {answerInfo.displayAnswer}
                        </span>
                      </p>

                      <div className="pt-2 border-t border-black/10 text-xs leading-relaxed opacity-90">
                        <strong>Quy tắc chia:</strong> Động từ 「 {currentQ.word} 」 thuộc{" "}
                        {getGroupDisplayName(currentQ.group)}. Chia sang{" "}
                        {getFormDisplayName(currentQ.targetForm)} biến đổi thành 「 {answerInfo.explanationKana} 」 (<span className="italic font-bold">{answerInfo.explanationRomaji}</span>).
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <BookOpen className="w-12 h-12 text-[#A0958C] mx-auto" />
                  <p className="font-bold text-[#554B43]">Không tìm thấy câu hỏi phù hợp với bộ lọc.</p>
                  <button
                    onClick={handleRestart}
                    className="px-4 py-2 bg-[#C65D4B] text-white font-bold text-xs rounded-xl"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              )}
            </div>

            {/* Score & Rule Reference Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Super Compact Vibrant Statistics Widget */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#2B1E1A] via-[#3D2B27] to-[#C65D4B] border border-[#E5D7C7]/30 rounded-2xl px-4 py-3 shadow-md text-white flex items-center justify-between gap-3">
                <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-[#FF8C78]/20 blur-xl pointer-events-none" />

                {/* Title & Streak */}
                <div className="flex items-center gap-2.5 relative z-10">
                  <div className="p-1.5 rounded-lg bg-white/10 text-amber-300 border border-white/15">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-white">Thống Kê</span>
                      <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500/25 border border-amber-400/40 text-amber-300 font-black text-[10px]">
                        <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {score.streak} Streak
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-2.5 text-xs font-black relative z-10">
                  <div className="bg-white/10 px-2.5 py-1 rounded-xl border border-white/15 text-center">
                    <span className="text-[9px] text-amber-100/70 font-bold block leading-none">Đúng/Đã làm</span>
                    <span className="text-white text-xs">{score.correct} / {score.total}</span>
                  </div>

                  <div className="bg-white/10 px-2.5 py-1 rounded-xl border border-white/15 text-center">
                    <span className="text-[9px] text-amber-100/70 font-bold block leading-none">Chính xác</span>
                    <span className="text-amber-300 text-xs">{score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Conjugation Rule Reference */}
              <DynamicConjugationRuleCard
                activeForm={currentQ ? currentQ.targetForm : (selectedForm !== 'ALL' ? (selectedForm as ConjugationForm) : 'TE')}
              />
            </div>
          </div>
        )}

        {/* MODE 2: 3D FLASHCARD MODE */}
        {activeTab === "flashcard" && (
          <div className="max-w-2xl mx-auto space-y-6">
            {MASTER_VERB_DATASET.length > 0 ? (
              (() => {
                const verbObj = MASTER_VERB_DATASET[flashcardIndex];
                const group = detectGroup(verbObj.word);
                const allForms = conjugateAll(verbObj.word);

                return (
                  <div className="space-y-6">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between text-xs font-bold text-[#756A62]">
                      <span>
                        Thẻ {flashcardIndex + 1} / {MASTER_VERB_DATASET.length}
                      </span>
                      <span>Nhấn vào thẻ để lật xem 10 thể chia 🔄</span>
                    </div>

                    {/* 3D Interactive Card */}
                    <div
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="cursor-pointer perspective-1000 min-h-[320px] bg-[#FFFCF7] border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-3xl p-8 shadow-md transition-all flex flex-col justify-between"
                    >
                      {!isFlipped ? (
                        /* Front Side */
                        <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto py-8">
                          <span className="px-3 py-1 rounded-full bg-[#F0705A]/10 text-[#C65D4B] font-extrabold text-xs">
                            {getGroupDisplayName(group)}
                          </span>
                          <h2 className="text-4xl sm:text-5xl font-black text-[#302A26]">
                            {verbObj.word}
                          </h2>
                          <p className="text-lg font-bold text-[#756A62]">({verbObj.kana})</p>
                          <p className="text-base font-extrabold text-[#C65D4B]">{verbObj.meaning}</p>
                          <p className="text-xs text-[#A0958C] pt-4">Lật thẻ để xem thể chia ⚡</p>
                        </div>
                      ) : (
                        /* Back Side (All Conjugations) */
                        <div className="space-y-4 my-auto">
                          <div className="flex items-center justify-between pb-2 border-b border-[#EBE1D7]">
                            <h3 className="font-extrabold text-sm text-[#C65D4B]">
                              10 Thể Chia Động Từ: 「 {verbObj.word} 」
                            </h3>
                            <span className="text-[11px] font-bold text-[#756A62]">
                              {getGroupDisplayName(group)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {ALL_FORMS.map((form) => (
                              <div
                                key={form}
                                className="p-2 rounded-xl bg-[#FAF6F0] border border-[#EBE1D7] flex justify-between"
                              >
                                <span className="text-[#756A62] font-medium">
                                  {getFormDisplayName(form).split(" ")[0]}
                                </span>
                                <span className="font-bold text-[#302A26]">
                                  {conjugate(verbObj.word, group, form)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Navigation Controls */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setIsFlipped(false);
                          setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : MASTER_VERB_DATASET.length - 1));
                        }}
                        className="px-6 py-3 rounded-2xl bg-[#FFFCF7] border border-[#DED3C8] hover:border-[#C65D4B] font-bold text-xs text-[#302A26] transition-all"
                      >
                        ← Thẻ trước
                      </button>

                      <button
                        onClick={() => {
                          setIsFlipped(false);
                          setFlashcardIndex((prev) => (prev < MASTER_VERB_DATASET.length - 1 ? prev + 1 : 0));
                        }}
                        className="px-6 py-3 rounded-2xl bg-[#C65D4B] hover:bg-[#B04C3B] text-white font-bold text-xs shadow-md transition-all"
                      >
                        Thẻ tiếp theo →
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
