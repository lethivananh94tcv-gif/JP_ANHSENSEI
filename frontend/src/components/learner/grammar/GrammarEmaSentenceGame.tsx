"use client";

import { useState } from "react";
import JapaneseFuriganaText from "@/components/learner/JapaneseFuriganaText";
import { Gamepad2, RefreshCw, CheckCircle2, XCircle, ArrowRight, Award, Sparkles } from "lucide-react";

export interface EmaChallenge {
  id: number;
  promptVi: string;
  targetBlocks: string[];
}

export interface GrammarPointInput {
  grammarId?: number;
  pattern: string;
  meaning: string;
  explanation: string;
  structure?: string;
  examples?: {
    japaneseText: string;
    furiganaText?: string;
    meaningVi: string;
  }[];
}

interface GrammarEmaSentenceGameProps {
  lessonNum: number;
  grammarPoints?: GrammarPointInput[];
  onComplete?: () => void;
}

export function autoGenerateEmaChallenges(
  points: GrammarPointInput[],
  lessonNum: number
): EmaChallenge[] {
  if (!points || points.length === 0) return [];

  const challenges: EmaChallenge[] = [];
  let cId = 1;

  points.forEach((point) => {
    if (point.examples && point.examples.length > 0) {
      point.examples.forEach((ex) => {
        const rawJp = ex.japaneseText || "";
        const parts = rawJp.split(/\s+/).filter(Boolean);

        let blocks: string[] = [];
        if (parts.length >= 2) {
          blocks = parts;
        } else {
          const mid = Math.floor(rawJp.length / 2);
          blocks = [rawJp.slice(0, mid), rawJp.slice(mid)];
        }

        challenges.push({
          id: cId++,
          promptVi: ex.meaningVi || point.meaning,
          targetBlocks: blocks
        });
      });
    }
  });

  return challenges;
}

function getLessonEmaFallback(num: number): EmaChallenge[] {
  if (num === 1) {
    return [
      {
        id: 1,
        promptVi: "Tôi là sinh viên.",
        targetBlocks: ["私（わたし）は", "学生（がくせい）", "です。"]
      },
      {
        id: 2,
        promptVi: "Anh Tanaka là giáo viên.",
        targetBlocks: ["田中（たなか）さんは", "先生（せんせい）", "です。"]
      },
      {
        id: 3,
        promptVi: "Anh Yamada không phải là bác sĩ.",
        targetBlocks: ["山田（やまだ）さんは", "医者（いしゃ）", "ではありません。"]
      }
    ];
  }

  return [
    {
      id: 1,
      promptVi: "Tôi học tiếng Nhật.",
      targetBlocks: ["私（わたし）は", "日本語（にほんご）を", "勉強（べんきょう）します。"]
    }
  ];
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function GrammarEmaSentenceGame({
  lessonNum,
  grammarPoints,
  onComplete,
}: GrammarEmaSentenceGameProps) {
  const challenges = (grammarPoints && grammarPoints.length > 0)
    ? autoGenerateEmaChallenges(grammarPoints, lessonNum)
    : getLessonEmaFallback(lessonNum);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const currentChallenge = challenges[currentIdx] || getLessonEmaFallback(lessonNum)[0];

  const targetBlocks = currentChallenge.targetBlocks;
  const [availableBlocks, setAvailableBlocks] = useState<string[]>(() =>
    shuffleArray(targetBlocks)
  );
  const [userOrderedBlocks, setUserOrderedBlocks] = useState<string[]>([]);
  const [status, setStatus] = useState<"IDLE" | "CORRECT" | "WRONG">("IDLE");
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleSelectWord = (word: string, index: number) => {
    if (status !== "IDLE") return;
    setUserOrderedBlocks((prev) => [...prev, word]);
    setAvailableBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (status !== "IDLE") return;
    setUserOrderedBlocks((prev) => prev.filter((_, i) => i !== index));
    setAvailableBlocks((prev) => [...prev, word]);
  };

  const handleCheckAnswer = () => {
    const userSentence = userOrderedBlocks.join(" ");
    const targetSentence = targetBlocks.join(" ");

    if (userSentence === targetSentence) {
      setStatus("CORRECT");
      setScore((prev) => prev + 1);
    } else {
      setStatus("WRONG");
    }
  };

  const handleNextChallenge = () => {
    if (currentIdx + 1 < challenges.length) {
      const nextIdx = currentIdx + 1;
      const nextChallenge = challenges[nextIdx];
      setCurrentIdx(nextIdx);
      setAvailableBlocks(shuffleArray(nextChallenge.targetBlocks));
      setUserOrderedBlocks([]);
      setStatus("IDLE");
    } else {
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAvailableBlocks(shuffleArray(challenges[0].targetBlocks));
    setUserOrderedBlocks([]);
    setStatus("IDLE");
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
          <Award className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-stone-800 mb-2">Hoàn Thành Game Xếp Câu Ema!</h3>
        <p className="text-stone-600 mb-6">
          Bạn đã ghép đúng <span className="text-purple-600 font-bold">{score}/{challenges.length}</span> câu chuẩn ngữ pháp.
        </p>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-purple-200 transition-all hover:scale-105"
        >
          <RefreshCw className="w-5 h-5" />
          Chơi Lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5" />
            GAME XẾP CÂU EMA - BÀI {lessonNum}
          </span>
          <span className="text-sm text-stone-500 font-medium">
            Thử thách {currentIdx + 1} / {challenges.length}
          </span>
        </div>
      </div>

      {/* Target Vietnamese Meaning */}
      <div className="bg-purple-50/50 rounded-2xl p-6 mb-8 border border-purple-100 text-center">
        <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
          Ghép các thẻ từ dưới đây thành câu có nghĩa:
        </div>
        <p className="text-xl sm:text-2xl font-bold text-stone-800">
          &ldquo;{currentChallenge.promptVi}&rdquo;
        </p>
      </div>

      {/* Answer Drop Area */}
      <div className="mb-6">
        <div className="text-xs font-bold text-stone-400 uppercase mb-2">
          Câu bạn đã ghép:
        </div>
        <div className="min-h-[72px] p-4 bg-stone-50 rounded-2xl border-2 border-dashed border-purple-200 flex flex-wrap gap-2 items-center">
          {userOrderedBlocks.length === 0 ? (
            <span className="text-stone-400 text-sm italic">
              Nhấn vào các từ bên dưới để ghép vào đây...
            </span>
          ) : (
            userOrderedBlocks.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleRemoveWord(word, idx)}
                disabled={status !== "IDLE"}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 transition-all flex items-center gap-1.5"
              >
                <JapaneseFuriganaText text={word} />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Word Pool */}
      <div className="mb-8">
        <div className="text-xs font-bold text-stone-400 uppercase mb-2">
          Các từ xáo trộn:
        </div>
        <div className="flex flex-wrap gap-2">
          {availableBlocks.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectWord(word, idx)}
              disabled={status !== "IDLE"}
              className="px-4 py-2.5 bg-white border-2 border-purple-200 hover:border-purple-400 text-stone-800 font-bold rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <JapaneseFuriganaText text={word} />
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {status === "CORRECT" && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Ghép đúng rồi! Rất xuất sắc. (+1 điểm)</span>
        </div>
      )}

      {status === "WRONG" && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 mb-6">
          <div className="flex items-center gap-2 font-bold mb-1">
            <XCircle className="w-5 h-5 text-rose-600" />
            <span>Chưa đúng thứ tự!</span>
          </div>
          <p className="text-sm text-stone-700">
            Đáp án chuẩn: <span className="font-bold">{targetBlocks.join(" ")}</span>
          </p>
        </div>
      )}

      {/* Game Actions */}
      <div className="flex justify-end gap-3">
        {status === "IDLE" ? (
          <button
            onClick={handleCheckAnswer}
            disabled={userOrderedBlocks.length === 0}
            className={`px-8 py-3.5 rounded-2xl font-bold transition-all shadow-md ${
              userOrderedBlocks.length > 0
                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 hover:scale-105"
                : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
            }`}
          >
            Kiểm Tra Câu
          </button>
        ) : (
          <button
            onClick={handleNextChallenge}
            className="flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-200 transition-all hover:scale-105"
          >
            <span>{currentIdx + 1 < challenges.length ? "Thử Thách Tiếp" : "Xem Kết Quả"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
