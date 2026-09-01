"use client";

import { useState, useEffect, useRef } from "react";
import { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
import { Sparkles, Trophy, RotateCcw, Flame, Timer, Play, Zap, ArrowRight, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card3DTilt from "@/components/ui/Card3DTilt";

interface VocabMatchGame3DProps {
  vocabularies: VocabularyDto[];
  onFinish?: (score: number) => void;
  onExit?: () => void;
}

interface MatchCard {
  id: string;
  vocabId: number;
  text: string;
  type: "JP" | "VI";
  isMatched: boolean;
  isSelected: boolean;
}

// Ultra-fast Web Audio API Sound Synthesizer (0ms latency, no external mp3 loads)
const playArcadeSound = (type: "flip" | "match" | "wrong" | "win") => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "flip") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === "match") {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.04 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.04);
        osc.stop(ctx.currentTime + idx * 0.04 + 0.12);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === "win") {
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      arpeggio.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.2);
      });
    }
  } catch {
    // Ignore audio context autoplay restrictions gracefully
  }
};

export default function VocabMatchGame3D({ vocabularies, onFinish, onExit }: VocabMatchGame3DProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [mismatchedIds, setMismatchedIds] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [gameStatus, setGameStatus] = useState<"IDLE" | "PLAYING" | "WON" | "TIME_UP">("PLAYING");
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [totalPairsCount, setTotalPairsCount] = useState<number>(6);
  const [combo, setCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [floatingScore, setFloatingScore] = useState<{ amount: number; comboText?: string } | null>(null);

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
    setMismatchedIds([]);
    setMatchedPairsCount(0);
    setTimeLeft(60);
    setCombo(0);
    setScore(0);
    setGameStatus("PLAYING");
    playArcadeSound("flip");
  };

  // Auto initialize on mount
  useEffect(() => {
    initializeGame();
  }, [vocabularies]);

  // Timer countdown loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStatus === "PLAYING" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStatus("TIME_UP");
            playArcadeSound("wrong");
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
      playArcadeSound("win");
      if (onFinish) {
        onFinish(score + 100);
      }
    }
  }, [matchedPairsCount, totalPairsCount, gameStatus, onFinish, score]);

  // Instant card click interaction handler
  const handleCardClick = (card: MatchCard) => {
    if (
      gameStatus !== "PLAYING" ||
      card.isMatched ||
      mismatchedIds.includes(card.id)
    ) return;

    // Allow user to deselect a single card if clicked again
    if (card.isSelected && selectedCards.length === 1) {
      setSelectedCards([]);
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, isSelected: false } : c))
      );
      playArcadeSound("flip");
      return;
    }

    if (card.isSelected || selectedCards.length >= 2) return;

    playArcadeSound("flip");

    const nextSelected = [...selectedCards, card];
    setSelectedCards(nextSelected);

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isSelected: true } : c))
    );

    if (nextSelected.length === 2) {
      const [first, second] = nextSelected;
      if (first.vocabId === second.vocabId && first.type !== second.type) {
        // MATCH SUCCESS!
        playArcadeSound("match");
        const newCombo = combo + 1;
        const pointsEarned = 50 * newCombo;
        setCombo(newCombo);
        setScore((prev) => prev + pointsEarned);

        setFloatingScore({
          amount: pointsEarned,
          comboText: newCombo > 1 ? `COMBO x${newCombo}! 🔥` : "CHÍNH XÁC! ✨",
        });
        setTimeout(() => setFloatingScore(null), 1000);

        // Fast 150ms match resolution
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.vocabId === first.vocabId ? { ...c, isMatched: true, isSelected: false } : c
            )
          );
          setSelectedCards([]);
          setMatchedPairsCount((prev) => prev + 1);
        }, 150);
      } else {
        // MISMATCH
        playArcadeSound("wrong");
        setCombo(0);
        setMismatchedIds([first.id, second.id]);

        // Fast 280ms mismatch reset (snappy response!)
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, isSelected: false } : c
            )
          );
          setSelectedCards([]);
          setMismatchedIds([]);
        }, 280);
      }
    }
  };

  return (
    <div className="relative bg-[#1A120E] border-2 border-amber-500/40 rounded-3xl p-4 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden font-sans select-none">
      
      {/* Background Japanese Game Atmosphere (Hexagon grid & glow) */}
      <div className="absolute inset-0 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Combo/Score Chime */}
      <AnimatePresence>
        {floatingScore && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: -25, scale: 1.15 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-6 py-2.5 rounded-full shadow-2xl border-2 border-white text-base sm:text-lg flex items-center gap-2"
          >
            <span>{floatingScore.comboText}</span>
            <span className="text-amber-200">+{floatingScore.amount} PTS</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ARCADE HUD BAR */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        
        {/* Left: Pairs Progress + Combo Counter */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-[#2A1D17] border border-amber-500/30 rounded-2xl flex items-center gap-2 shadow-inner">
            <span className="text-amber-400 font-black text-xs">💎 ĐÃ GHÉP:</span>
            <span className="text-white font-black text-sm">
              <span className="text-amber-400">{matchedPairsCount}</span> / {totalPairsCount} Cặp
            </span>
          </div>

          {combo > 1 && (
            <div className="px-3 py-1 bg-gradient-to-r from-orange-600 to-rose-600 rounded-xl text-white text-xs font-black flex items-center gap-1 shadow-lg shadow-rose-600/30 animate-bounce">
              <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>COMBO x{combo}!</span>
            </div>
          )}
        </div>

        {/* Center: Glowing Arcade Countdown Timer */}
        <div className={`px-5 py-2 rounded-2xl border-2 flex items-center gap-2 shadow-lg transition-all ${
          timeLeft <= 15
            ? "bg-rose-950/80 border-rose-500 text-rose-400 animate-pulse shadow-rose-500/40"
            : "bg-[#2A1D17] border-amber-500/50 text-amber-400 shadow-amber-500/20"
        }`}>
          <Timer className="w-4 h-4" />
          <span className="font-mono text-base sm:text-lg font-black tracking-wider">
            00:{String(timeLeft).padStart(2, "0")}s
          </span>
        </div>

        {/* Right: Score + Restart Action */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex px-3.5 py-1.5 bg-[#2A1D17] border border-white/10 rounded-2xl items-center gap-1.5 text-xs font-black text-[#D4C3B7]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{score} PTS</span>
          </div>

          <button
            type="button"
            onClick={initializeGame}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-amber-500 text-amber-300 hover:text-white border border-white/15 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Làm mới ải đấu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WIN / TIME UP OVERLAY */}
      <AnimatePresence>
        {(gameStatus === "WON" || gameStatus === "TIME_UP") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="relative z-20 my-4 p-8 rounded-3xl bg-gradient-to-b from-[#2A1D17] to-[#1A120E] border-2 border-amber-400 text-center space-y-5 shadow-[0_0_50px_rgba(245,158,11,0.4)]"
          >
            {gameStatus === "WON" ? (
              <>
                <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center text-4xl shadow-lg shadow-amber-500/30 animate-bounce">
                  🏆
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    🎉 VICTORY! PHÁ ĐẢO THÀNH CÔNG!
                  </h4>
                  <p className="text-sm font-extrabold text-amber-300">
                    Bạn đã giải mã toàn bộ 6 cặp từ vựng chỉ trong <strong className="text-white underline">{60 - timeLeft} giây</strong>!
                  </p>
                  <p className="text-xs text-emerald-400 font-bold">
                    ⭐ Đã mở khóa hoàn thành 100% tiến độ bài học & nhận +100 XP!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-3xl bg-rose-500/20 border-2 border-rose-500 text-rose-400 mx-auto flex items-center justify-center text-4xl shadow-lg shadow-rose-500/30">
                  ⏳
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-black text-white">
                    HẾT THỜI GIAN (TIME'S UP)!
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-[#D4C3B7]">
                    Bạn đã ghép được {matchedPairsCount}/{totalPairsCount} cặp từ. Hãy thử lại để vượt mốc 60 giây nhé!
                  </p>
                </div>
              </>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={initializeGame}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/20 flex items-center gap-2 whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại</span>
              </button>

              {onExit && (
                <button
                  type="button"
                  onClick={onExit}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Quay lại</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D MATCHING CARDS GRID (4 Cols x 3 Rows = 12 Game Cards) */}
      {gameStatus === "PLAYING" && (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card) => {
            const isMismatched = mismatchedIds.includes(card.id);
            return (
              <Card3DTilt key={card.id} onClick={() => handleCardClick(card)}>
                <div
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-center transition-all duration-150 flex flex-col items-center justify-center min-h-[105px] sm:min-h-[115px] relative overflow-hidden ${
                    card.isMatched
                      ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400/40 opacity-20 pointer-events-none scale-95"
                      : isMismatched
                      ? "bg-rose-950/80 border-rose-500 text-rose-300 animate-shake scale-100 shadow-[0_0_20px_rgba(244,63,94,0.6)]"
                      : card.isSelected
                      ? "bg-gradient-to-b from-[#69331C] to-[#3B1C10] border-amber-300 text-white shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-105 ring-4 ring-amber-400/80"
                      : "bg-gradient-to-b from-[#2B1F19] to-[#1C1410] border-[#4A372E] hover:border-amber-400 hover:shadow-[0_0_16px_rgba(245,158,11,0.35)] text-white hover:scale-102 active:scale-95"
                  }`}
                >
                  {/* Subtle Japanese Card Back / Accent Dot */}
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                    card.type === "JP" ? "bg-amber-400/50" : "bg-teal-400/50"
                  }`} />

                  {/* Card Content */}
                  <span className={`leading-snug transition-transform ${
                    card.type === "JP"
                      ? "font-jp font-black text-base sm:text-lg text-amber-200 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
                      : "font-black text-xs sm:text-sm text-[#F6EDE2]"
                  }`}>
                    {card.text}
                  </span>

                  {/* Card Type Tag */}
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mt-1.5">
                    {card.type === "JP" ? "🇯🇵 TIẾNG NHẬT" : "🇻🇳 Ý NGHĨA"}
                  </span>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      )}
    </div>
  );
}
