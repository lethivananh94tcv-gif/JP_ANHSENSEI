"use client";

import { useState, useEffect } from "react";
import { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
import { Sparkles, Trophy, RotateCcw, CheckCircle2, Flame, Timer, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card3DTilt from "@/components/ui/Card3DTilt";

interface VocabMatchGame3DProps {
  vocabularies: VocabularyDto[];
  onFinish?: (score: number) => void;
}

interface MatchCard {
  id: string;
  vocabId: number;
  text: string;
  type: "JP" | "VI";
  isMatched: boolean;
  isSelected: boolean;
}

export default function VocabMatchGame3D({ vocabularies, onFinish }: VocabMatchGame3DProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [gameStatus, setGameStatus] = useState<"IDLE" | "PLAYING" | "WON" | "TIME_UP">("IDLE");
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [totalPairsCount, setTotalPairsCount] = useState<number>(6);

  // Initialize 3D Match Game with 6 random vocabulary pairs
  const initializeGame = () => {
    if (!vocabularies || vocabularies.length === 0) return;

    // Pick 6 random vocab items
    const shuffledVocab = [...vocabularies].sort(() => Math.random() - 0.5);
    const chosenVocab = shuffledVocab.slice(0, Math.min(6, vocabularies.length));
    setTotalPairsCount(chosenVocab.length);

    const gameDeck: MatchCard[] = [];
    chosenVocab.forEach((item) => {
      gameDeck.push({
        id: `jp_${item.vocabularyId}`,
        vocabId: item.vocabularyId,
        text: item.word || item.kana,
        type: "JP",
        isMatched: false,
        isSelected: false,
      });
      gameDeck.push({
        id: `vi_${item.vocabularyId}`,
        vocabId: item.vocabularyId,
        text: item.meaningVi,
        type: "VI",
        isMatched: false,
        isSelected: false,
      });
    });

    // Shuffle the combined 12 cards
    setCards(gameDeck.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMatchedPairsCount(0);
    setTimeLeft(60);
    setGameStatus("PLAYING");
  };

  // Timer countdown loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStatus === "PLAYING" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStatus("TIME_UP");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus, timeLeft]);

  // Handle Game Win state cleanly outside render loop
  useEffect(() => {
    if (gameStatus === "PLAYING" && totalPairsCount > 0 && matchedPairsCount >= totalPairsCount) {
      setGameStatus("WON");
      if (onFinish) {
        onFinish(50);
      }
    }
  }, [matchedPairsCount, totalPairsCount, gameStatus, onFinish]);

  // Check matching pair logic when 2 cards selected
  const handleCardClick = (card: MatchCard) => {
    if (gameStatus !== "PLAYING" || card.isMatched || card.isSelected || selectedCards.length >= 2) return;

    const nextSelected = [...selectedCards, card];
    setSelectedCards(nextSelected);

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isSelected: true } : c))
    );

    if (nextSelected.length === 2) {
      const [first, second] = nextSelected;
      if (first.vocabId === second.vocabId && first.type !== second.type) {
        // MATCH SUCCESS!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.vocabId === first.vocabId ? { ...c, isMatched: true, isSelected: false } : c
            )
          );
          setSelectedCards([]);
          setMatchedPairsCount((prev) => prev + 1);
        }, 300);
      } else {
        // MISMATCH -> Reset after 700ms
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, isSelected: false } : c
            )
          );
          setSelectedCards([]);
        }, 700);
      }
    }
  };

  if (gameStatus === "IDLE") {
    return (
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-8 text-center space-y-5 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#C65D4B] to-[#FF8C78] text-white mx-auto flex items-center justify-center text-3xl shadow-lg shadow-[#C65D4B]/30">
          🎮
        </div>

        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-2xl font-extrabold text-[#231917]">
            Game Ghép Thẻ Bài Từ Vựng 3D (60s)
          </h3>
          <p className="text-xs text-[#76685F] font-semibold leading-relaxed">
            Nối 6 cặp từ vựng Tiếng Nhật & Nghĩa Tiếng Việt tương ứng nhanh nhất trước khi hết giờ để nhận thưởng <strong className="text-[#C65D4B]">+50 XP</strong>!
          </p>
        </div>

        <button
          type="button"
          onClick={initializeGame}
          className="relative group overflow-hidden px-8 py-3.5 bg-gradient-to-r from-[#C65D4B] via-[#B04F3F] to-[#8B6F5A] hover:from-[#B04F3F] hover:to-[#765844] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2 mx-auto"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Bắt đầu thử thách Ghép Từ 3D</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Top Game Bar */}
      <div className="flex items-center justify-between border-b border-[#DED3C8]/80 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C65D4B]" />
          <span className="text-xs font-black text-[#231917]">
            Đã ghép: <span className="text-[#C65D4B]">{matchedPairsCount}</span> / {totalPairsCount} cặp
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#DED3C8] shadow-2xs">
          <Timer className={`w-4 h-4 ${timeLeft <= 10 ? "text-rose-600 animate-bounce" : "text-amber-500"}`} />
          <span className={`text-xs font-black ${timeLeft <= 10 ? "text-rose-600 font-mono" : "text-[#231917]"}`}>
            {timeLeft}s
          </span>
        </div>

        <button
          type="button"
          onClick={initializeGame}
          className="p-2 rounded-xl bg-white hover:bg-[#C65D4B] text-[#8B6F5A] hover:text-white border border-[#DED3C8] transition-all cursor-pointer shadow-2xs"
          title="Chơi lại"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* WIN / TIME UP OVERLAY */}
      <AnimatePresence>
        {(gameStatus === "WON" || gameStatus === "TIME_UP") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#C65D4B] text-center space-y-4 shadow-2xl"
          >
            {gameStatus === "WON" ? (
              <>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-600 border border-emerald-500/40 mx-auto flex items-center justify-center text-3xl shadow-xs">
                  🏆
                </div>
                <h4 className="text-2xl font-black text-[#231917]">
                  🎉 CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG!
                </h4>
                <p className="text-xs font-extrabold text-emerald-700">
                  Bạn đã hoàn thành ghép từ trong <strong className="text-[#C65D4B]">{60 - timeLeft} giây</strong>! Nhận ngay <strong className="text-[#C65D4B]">+50 XP</strong>!
                </p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-600 border border-rose-500/40 mx-auto flex items-center justify-center text-3xl shadow-xs">
                  ⏳
                </div>
                <h4 className="text-2xl font-black text-[#231917]">
                  Hết giờ rồi!
                </h4>
                <p className="text-xs font-bold text-[#76685F]">
                  Bạn đã ghép được {matchedPairsCount} cặp từ. Hãy thử lại để vượt mốc 60s nhé!
                </p>
              </>
            )}

            <button
              type="button"
              onClick={initializeGame}
              className="px-6 py-3 bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs rounded-2xl shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              🎮 Thử Thách Lại
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Matching Cards Grid (4 Cols x 3 Rows = 12 Cards) */}
      {gameStatus === "PLAYING" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {cards.map((card) => (
            <Card3DTilt key={card.id}>
              <div
                onClick={() => handleCardClick(card)}
                className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex items-center justify-center min-h-[90px] shadow-md select-none ${
                  card.isMatched
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 opacity-40 cursor-default"
                    : card.isSelected
                    ? "bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] border-[#FF8C78] text-white shadow-xl scale-105 ring-2 ring-[#C65D4B]/50"
                    : "bg-white border-[#DED3C8] hover:border-[#C65D4B]/60 text-[#231917]"
                }`}
              >
                <span className={`text-xs sm:text-sm font-extrabold ${card.type === "JP" ? "font-jp" : ""}`}>
                  {card.text}
                </span>
              </div>
            </Card3DTilt>
          ))}
        </div>
      )}
    </div>
  );
}
