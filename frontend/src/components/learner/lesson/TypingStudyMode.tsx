"use client";

import { useState, useEffect, useRef } from "react";
import { VocabularyDto } from "./VocabularyLearningItem";
import { Sparkles, CheckCircle2, AlertCircle, RotateCcw, ArrowRight, Lightbulb } from "lucide-react";

interface TypingStudyModeProps {
  vocabularies: VocabularyDto[];
}

import { toRomajiVariants } from "@/lib/japanese/romajiConverter";

export default function TypingStudyMode({ vocabularies }: TypingStudyModeProps) {
  const [cards, setCards] = useState<VocabularyDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"IDLE" | "CORRECT" | "WRONG">("IDLE");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCards(vocabularies);
    setCurrentIndex(0);
    setUserInput("");
    setStatus("IDLE");
    setScore(0);
    setShowHint(false);
  }, [vocabularies]);

  const currentCard = cards[currentIndex];

  const normalize = (str: string) => {
    if (!str) return "";
    return str.trim().toLowerCase().normalize("NFC");
  };

  const stripPrefixes = (str: string) => str.replace(/^[~〜～\-‐‑‒–—―ー_\s()（）!！?？,、]+/, "");

  const handleCheck = () => {
    if (!currentCard || !userInput.trim()) return;

    const normInput = normalize(userInput);
    const validTargets = new Set<string>();

    if (currentCard.word) {
      validTargets.add(normalize(currentCard.word));
      validTargets.add(normalize(stripPrefixes(currentCard.word)));
    }
    if (currentCard.kana) {
      validTargets.add(normalize(currentCard.kana));
      validTargets.add(normalize(stripPrefixes(currentCard.kana)));
    }
    if (currentCard.kanjiForm) {
      validTargets.add(normalize(currentCard.kanjiForm));
      validTargets.add(normalize(stripPrefixes(currentCard.kanjiForm)));
    }
    if (currentCard.romaji) {
      validTargets.add(normalize(currentCard.romaji));
      validTargets.add(normalize(stripPrefixes(currentCard.romaji)));
    }

    if (currentCard.kana) {
      const romajiVariants = toRomajiVariants(currentCard.kana);
      romajiVariants.forEach((variant) => {
        validTargets.add(normalize(variant));
        validTargets.add(normalize(stripPrefixes(variant)));
      });
    }
    if (currentCard.word) {
      const romajiVariants = toRomajiVariants(currentCard.word);
      romajiVariants.forEach((variant) => {
        validTargets.add(normalize(variant));
        validTargets.add(normalize(stripPrefixes(variant)));
      });
    }

    // Smart flexible matcher for Katakana long vowels, tildes (~/〜), em-dashes (―/—/-), doubled letters & punctuation
    const isFlexibleMatch = (input: string, targets: Set<string>): boolean => {
      if (targets.has(input)) return true;

      // Clean all tildes (~/〜/～), hyphens, em-dashes (―/—/–/-), brackets, dots & spaces
      const cleanSymbol = (str: string) => str.replace(/[~〜～\-‐‑‒–—―ー_'’`….\s()（）!！?？,、]/g, "");

      const cleanInput = cleanSymbol(input);

      for (const target of Array.from(targets)) {
        const cleanTarget = cleanSymbol(target);
        if (!cleanTarget) continue;
        if (cleanInput === cleanTarget) return true;

        // Collapse repeated vowels (aa -> a, ii -> i...) and repeated consonants (tt -> t, kk -> k...)
        const collapsedInput = cleanInput
          .replace(/([aeiou])\1+/g, "$1")
          .replace(/([bcdfghjklmnpqrstvwxyz])\1+/g, "$1");

        const collapsedTarget = cleanTarget
          .replace(/([aeiou])\1+/g, "$1")
          .replace(/([bcdfghjklmnpqrstvwxyz])\1+/g, "$1");

        if (collapsedInput === collapsedTarget) return true;
      }
      return false;
    };

    const isMatched = isFlexibleMatch(normInput, validTargets);

    if (isMatched) {
      setStatus("CORRECT");
      setScore((prev) => prev + 1);
    } else {
      setStatus("WRONG");
    }
  };


  const handleNext = () => {
    if (cards.length === 0) return;
    setUserInput("");
    setStatus("IDLE");
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRetrySameWord = () => {
    setUserInput("");
    setStatus("IDLE");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (status === "IDLE") {
        handleCheck();
      } else {
        handleNext();
      }
    }
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-8 text-center text-[#76685F] font-bold">
        Không có từ vựng nào để luyện gõ.
      </div>
    );
  }

  const rawRomajiAnswer = currentCard?.kana ? toRomajiVariants(currentCard.kana)[0] : currentCard?.romaji || "";
  const romajiAnswer = rawRomajiAnswer.replace(/^[~〜～\s]+/, "");
  const firstLetterHint = romajiAnswer ? `${romajiAnswer[0]}...` : "";


  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] px-5 py-3 rounded-2xl shadow-xs">
        <span className="text-xs font-black text-[#56423E]">
          Từ thứ <span className="text-[#C65D4B] font-black">{currentIndex + 1}</span> / {cards.length}
        </span>
        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
          🎯 Điểm: {score}
        </span>
      </div>

      {/* Main Prompt Card */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="bg-white text-[#C65D4B] border border-[#C65D4B]/30 text-[10px] font-black px-3.5 py-1 rounded-full uppercase shadow-2xs">
            Gõ Romaji hoặc Kana tương ứng
          </span>

          {/* Optional Hint Button */}
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] font-black text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHint ? `Gợi ý: ${firstLetterHint}` : "Xem gợi ý"}</span>
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C65D4B] leading-tight">
            {(currentCard.meaningVi || "").normalize("NFC")}
          </h2>
          {showHint && (
            <p className="text-xs text-[#8B6F5A] font-extrabold pt-1">
              💡 Chữ cái đầu: <span className="font-mono text-[#C65D4B] font-black uppercase">{firstLetterHint}</span>
            </p>
          )}
        </div>

        {/* Input Field */}
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (status !== "IDLE") setStatus("IDLE");
            }}
            onKeyDown={handleKeyDown}
            placeholder="Gõ Romaji (ví dụ: watashi) hoặc Hiragana..."
            className={`w-full px-5 py-4 text-center text-lg font-black rounded-2xl border-2 outline-hidden transition-all shadow-inner ${
              status === "CORRECT"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                : status === "WRONG"
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-[#DED3C8] focus:border-[#C65D4B] bg-white text-[#231917]"
            }`}
            autoFocus
          />

          {/* Feedback Section */}
          {status === "CORRECT" && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-800 text-xs font-black rounded-xl animate-fade-in flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>🎉 Chính xác!</span>
              <span className="font-jp text-sm">
                ({currentCard.word} {currentCard.kana && currentCard.kana !== currentCard.word ? `/ ${currentCard.kana}` : ""})
              </span>
            </div>
          )}

          {status === "WRONG" && (
            <div className="p-3.5 bg-rose-500/15 border border-rose-500/30 text-rose-900 text-xs font-bold rounded-xl animate-fade-in space-y-1">
              <div className="flex items-center justify-center gap-1.5 font-black text-rose-700">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Chưa chính xác!</span>
              </div>
              <p className="font-jp text-xs">
                Romaji chuẩn: <span className="font-mono font-black text-[#C65D4B]">{romajiAnswer}</span> • Kanji: <span className="font-bold underline">{currentCard.word}</span> {currentCard.kana ? `(${currentCard.kana})` : ""}
              </p>
            </div>
          )}
        </div>

        {/* Action Button Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {status === "IDLE" ? (
            <button
              onClick={handleCheck}
              disabled={!userInput.trim()}
              className="px-8 py-3 bg-[#C65D4B] hover:bg-[#B04F3F] disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-md cursor-pointer hover:scale-105"
            >
              Kiểm tra (Enter)
            </button>
          ) : status === "WRONG" ? (
            <>
              <button
                onClick={handleRetrySameWord}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Gõ lại từ này</span>
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[#231917] hover:bg-[#C65D4B] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Từ tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[#231917] hover:bg-[#C65D4B] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <span>Từ tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
