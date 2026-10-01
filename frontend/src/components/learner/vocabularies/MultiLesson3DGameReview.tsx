"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, ArrowLeft, RefreshCw, Sparkles, Zap, Flame, Award } from "lucide-react";
import { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";

interface MultiLesson3DGameReviewProps {
  items: VocabularyDto[];
  onFinish: (score: number) => void;
  onBackToPicker: () => void;
}

interface GameTile {
  id: string;
  vocabId: number;
  type: "JP" | "VI";
  text: string;
  subtext?: string;
  isMatched: boolean;
}

export default function MultiLesson3DGameReview({
  items,
  onFinish,
  onBackToPicker,
}: MultiLesson3DGameReviewProps) {
  const [tiles, setTiles] = useState<GameTile[]>([]);
  const [selectedJpTile, setSelectedJpTile] = useState<GameTile | null>(null);
  const [selectedViTile, setSelectedViTile] = useState<GameTile | null>(null);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize Game Tiles (Pick 10 random vocabularies per round)
  const initGame = () => {
    const subset = [...items].sort(() => 0.5 - Math.random()).slice(0, 10);
    setTotalPairs(subset.length);
    setMatchedPairsCount(0);
    setScore(0);
    setCombo(0);
    setSelectedJpTile(null);
    setSelectedViTile(null);
    setIsCompleted(false);

    const jpList: GameTile[] = subset.map((item) => ({
      id: `jp-${item.vocabularyId}`,
      vocabId: item.vocabularyId,
      type: "JP",
      text: item.word || item.kana,
      subtext: item.word !== item.kana ? item.kana : undefined,
      isMatched: false,
    }));

    const viList: GameTile[] = subset.map((item) => ({
      id: `vi-${item.vocabularyId}`,
      vocabId: item.vocabularyId,
      type: "VI",
      text: item.meaningVi,
      isMatched: false,
    }));

    const shuffledJp = jpList.sort(() => 0.5 - Math.random());
    const shuffledVi = viList.sort(() => 0.5 - Math.random());

    setTiles([...shuffledJp, ...shuffledVi]);
  };

  useEffect(() => {
    initGame();
  }, [items]);

  const handleTileClick = (tile: GameTile) => {
    if (tile.isMatched) return;

    if (tile.type === "JP") {
      playJapaneseTTS({ text: tile.text });
      setSelectedJpTile(tile);
      checkMatch(tile, selectedViTile);
    } else {
      setSelectedViTile(tile);
      checkMatch(selectedJpTile, tile);
    }
  };

  const checkMatch = (jp: GameTile | null, vi: GameTile | null) => {
    if (!jp || !vi) return;

    if (jp.vocabId === vi.vocabId) {
      // Correct Pair Match! 🎯
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((prev) => prev + 100 * newCombo);

      setTiles((prev) =>
        prev.map((t) => (t.id === jp.id || t.id === vi.id ? { ...t, isMatched: true } : t))
      );

      setSelectedJpTile(null);
      setSelectedViTile(null);

      const nextCount = matchedPairsCount + 1;
      setMatchedPairsCount(nextCount);

      if (nextCount >= totalPairs) {
        setTimeout(() => setIsCompleted(true), 600);
      }
    } else {
      // Wrong Match ❌
      setCombo(0);
      setTimeout(() => {
        setSelectedJpTile(null);
        setSelectedViTile(null);
      }, 500);
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 border border-purple-200 shadow-2xl text-center space-y-6 max-w-xl mx-auto my-8 relative overflow-hidden"
      >
        <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Chiến Thắng Game 3D Match! 🎮</h2>
          <p className="text-slate-600 font-medium">
            Bạn đã ghép đúng toàn bộ <span className="font-bold text-purple-600">{totalPairs} cặp từ vựng</span>!
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-rose-50 border border-purple-200 p-5 rounded-2xl">
          <span className="text-xs font-black text-purple-800 uppercase tracking-wider block">Tổng điểm đạt được</span>
          <span className="text-4xl font-black text-purple-600">{score} điểm</span>
        </div>

        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={initGame}
            className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Chơi lại màn này
          </button>
          <button
            onClick={() => onFinish(score)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 text-white font-bold text-sm transition-all shadow-md shadow-purple-500/30 cursor-pointer"
          >
            Xác nhận điểm 🚀
          </button>
        </div>
      </motion.div>
    );
  }

  const jpTiles = tiles.filter((t) => t.type === "JP");
  const viTiles = tiles.filter((t) => t.type === "VI");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onBackToPicker}
          className="flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Đổi bài ôn tập
        </button>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-full border border-amber-200">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-600" /> Combo x{combo}
          </span>
          <span className="text-xs font-black px-3.5 py-1.5 bg-purple-100 text-purple-900 rounded-full border border-purple-200">
            Điểm: {score}
          </span>
        </div>
      </div>

      {/* Instructions Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 p-5 rounded-3xl text-white flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-black text-xl">Mini Game 3D Match</h3>
            <p className="text-xs text-purple-100 font-medium">
              Bấm 1 ô Tiếng Nhật (trái) và 1 ô Nghĩa Tiếng Việt (phải) để ghép thành công!
            </p>
          </div>
        </div>
        <span className="text-xs font-black bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20">
          {matchedPairsCount} / {totalPairs} cặp
        </span>
      </div>

      {/* 3D Matching Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Japanese Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 text-center">
            Từ tiếng Nhật (Japanese)
          </h4>
          <div className="space-y-3">
            {jpTiles.map((tile) => {
              const isSelected = selectedJpTile?.id === tile.id;
              return (
                <motion.div
                  key={tile.id}
                  whileHover={!tile.isMatched ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!tile.isMatched ? { scale: 0.98 } : {}}
                  onClick={() => handleTileClick(tile)}
                  className={`p-4.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between shadow-xs ${
                    tile.isMatched
                      ? "opacity-25 border-slate-200 bg-slate-100 pointer-events-none"
                      : isSelected
                      ? "border-amber-500 bg-gradient-to-r from-amber-50 to-rose-50 ring-4 ring-amber-200 shadow-md"
                      : "border-slate-200 bg-white hover:border-amber-300"
                  }`}
                >
                  <div>
                    <span className="text-2xl font-black font-jp text-[#C65D4B]">{tile.text}</span>
                    {tile.subtext && (
                      <span className="block text-xs font-extrabold text-slate-400">{tile.subtext}</span>
                    )}
                  </div>
                  <Sparkles
                    className={`w-5 h-5 ${
                      isSelected ? "text-amber-500 fill-amber-500" : "text-slate-300"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Vietnamese Meaning Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 text-center">
            Nghĩa tiếng Việt (Meaning)
          </h4>
          <div className="space-y-3">
            {viTiles.map((tile) => {
              const isSelected = selectedViTile?.id === tile.id;
              return (
                <motion.div
                  key={tile.id}
                  whileHover={!tile.isMatched ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!tile.isMatched ? { scale: 0.98 } : {}}
                  onClick={() => handleTileClick(tile)}
                  className={`p-4.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between shadow-xs ${
                    tile.isMatched
                      ? "opacity-25 border-slate-200 bg-slate-100 pointer-events-none"
                      : isSelected
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-rose-50 ring-4 ring-purple-200 shadow-md"
                      : "border-slate-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <span className="text-base font-black text-slate-800">{tile.text}</span>
                  <Sparkles
                    className={`w-5 h-5 ${
                      isSelected ? "text-purple-500 fill-purple-500" : "text-slate-300"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
