"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  Flame,
  Timer,
  Play,
  Zap,
  Volume2,
  VolumeX,
  Star,
  Award,
  AlertCircle,
  HelpCircle,
  Gamepad2,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card3DTilt from "@/components/ui/Card3DTilt";
import { KanjiTopicItemDto } from "./KanjiLessonDetailView";

interface KanjiMatchGame3DProps {
  items: KanjiTopicItemDto[];
  onFinish?: (score: number) => void;
}

interface MatchCard {
  id: string;
  kanjiId: number;
  text: string;
  subtext?: string;
  type: "KANJI" | "MEANING";
  isMatched: boolean;
  isSelected: boolean;
}

// 🔊 Web Audio API Arcade Sound Synthesizer
const playSoundEffect = (type: "flip" | "match" | "wrong" | "win") => {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "flip") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "match") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.22);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "win") {
      [440, 554.37, 659.25, 880, 1108.73].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.35);
      });
    }
  } catch (e) {
    // Audio fallback
  }
};

export default function KanjiMatchGame3D({ items, onFinish }: KanjiMatchGame3DProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [mismatchedIds, setMismatchedIds] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [gameStatus, setGameStatus] = useState<"IDLE" | "PLAYING" | "WON" | "TIME_UP">("IDLE");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [totalPairsCount, setTotalPairsCount] = useState<number>(6);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [maxCombo, setMaxCombo] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [floatingScore, setFloatingScore] = useState<{ amount: number; comboText?: string } | null>(null);

  // Keyboard shortcut listener (ESC to exit fullscreen theater mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
        setGameStatus("IDLE");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  // Initialize Arcade 3D Deck & Enter Dark Theater Mode
  const initializeGame = () => {
    if (!items || items.length === 0) return;

    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    const chosenItems = shuffledItems.slice(0, Math.min(6, items.length));
    setTotalPairsCount(chosenItems.length);

    const gameDeck: MatchCard[] = [];
    chosenItems.forEach((item) => {
      gameDeck.push({
        id: `kanji_${item.kanjiId}`,
        kanjiId: item.kanjiId,
        text: item.character,
        subtext: item.kunyomi || item.onyomi || "",
        type: "KANJI",
        isMatched: false,
        isSelected: false,
      });
      gameDeck.push({
        id: `meaning_${item.kanjiId}`,
        kanjiId: item.kanjiId,
        text: item.meaningVi,
        subtext: "Âm Hán Việt",
        type: "MEANING",
        isMatched: false,
        isSelected: false,
      });
    });

    setCards(gameDeck.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMismatchedIds([]);
    setMatchedPairsCount(0);
    setTimeLeft(60);
    setScore(0);
    setCombo(1);
    setMaxCombo(1);
    setGameStatus("PLAYING");
    setIsFullScreen(true); // 🌟 Trigger Dark Theater Overlay
    if (soundEnabled) playSoundEffect("flip");
  };

  // Timer countdown loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStatus === "PLAYING" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStatus("TIME_UP");
            if (soundEnabled) playSoundEffect("wrong");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus, timeLeft, soundEnabled]);

  // Check Game Victory
  useEffect(() => {
    if (gameStatus === "PLAYING" && totalPairsCount > 0 && matchedPairsCount >= totalPairsCount) {
      setGameStatus("WON");
      if (soundEnabled) playSoundEffect("win");
      if (onFinish) {
        onFinish(50);
      }
    }
  }, [matchedPairsCount, totalPairsCount, gameStatus, onFinish, soundEnabled]);

  // Card click interaction
  const handleCardClick = (card: MatchCard) => {
    if (
      gameStatus !== "PLAYING" ||
      card.isMatched ||
      card.isSelected ||
      selectedCards.length >= 2 ||
      mismatchedIds.includes(card.id)
    )
      return;

    if (soundEnabled) playSoundEffect("flip");

    const nextSelected = [...selectedCards, card];
    setSelectedCards(nextSelected);

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isSelected: true } : c))
    );

    if (nextSelected.length === 2) {
      const [first, second] = nextSelected;
      if (first.kanjiId === second.kanjiId && first.type !== second.type) {
        // MATCH SUCCESS!
        if (soundEnabled) playSoundEffect("match");
        const pointsEarned = 100 * combo;
        setScore((s) => s + pointsEarned);

        const currentCombo = combo;
        setCombo((c) => {
          const nextC = c + 1;
          setMaxCombo((m) => Math.max(m, nextC));
          return nextC;
        });

        setFloatingScore({
          amount: pointsEarned,
          comboText: currentCombo > 1 ? `COMBO x${currentCombo}! 🔥` : "CHÍNH XÁC! ✨",
        });
        setTimeout(() => setFloatingScore(null), 1200);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.kanjiId === first.kanjiId
                ? { ...c, isMatched: true, isSelected: false }
                : c
            )
          );
          setSelectedCards([]);
          setMatchedPairsCount((prev) => prev + 1);
        }, 320);
      } else {
        // MATCH MISMATCH
        if (soundEnabled) playSoundEffect("wrong");
        setCombo(1); // Reset Combo
        setMismatchedIds([first.id, second.id]);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isSelected: false }
                : c
            )
          );
          setSelectedCards([]);
          setMismatchedIds([]);
        }, 650);
      }
    }
  };

  const starsEarned = timeLeft >= 35 ? 3 : timeLeft >= 15 ? 2 : 1;

  // Render Inner Game Arena Components
  const renderGameContent = () => (
    <div className="space-y-6">
      {/* 🕹️ ARCADE STAGE HUD HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1E1715] via-[#2D1F1A] to-[#1E1715] border-2 border-[#C65D4B]/50 rounded-3xl p-5 sm:p-6 shadow-[0_10px_35px_rgba(35,25,23,0.4)] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#C65D4B] to-[#E0523C] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                <Gamepad2 className="w-3.5 h-3.5" /> ARCADE 3D MODE
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <Sparkles className="w-3 h-3" /> +50 XP REWARD
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Luyện Ghép Thẻ Hán Tự 3D</span>
            </h3>
            <p className="text-xs text-[#C5B7B1]">
              Lật ghép nhanh thẻ Chữ Hán & Âm Hán Việt tương ứng để nhận điểm Combo!
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
              <span className="hidden sm:inline">{soundEnabled ? "Âm thanh" : "Mắt âm"}</span>
            </button>
          </div>
        </div>

        {/* Live HUD Counters during Gameplay */}
        {gameStatus === "PLAYING" && (
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
                <Timer className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#C5B7B1] block">Thời gian</span>
                <span className={`text-lg font-black font-mono ${timeLeft <= 10 ? "text-rose-400 animate-bounce" : "text-white"}`}>
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}s
                </span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#C5B7B1] block">Đã ghép</span>
                <span className="text-lg font-black font-mono text-amber-300">
                  {matchedPairsCount} / {totalPairsCount} Cặp
                </span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#C5B7B1] block">Chuỗi Combo</span>
                <span className="text-lg font-black font-mono text-orange-400">
                  x{combo} {combo > 1 ? "🔥" : ""}
                </span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#C5B7B1] block">Điểm số</span>
                <span className="text-lg font-black font-mono text-emerald-300">
                  {score} PTS
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Time Progress Bar */}
        {gameStatus === "PLAYING" && (
          <div className="mt-3 w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                timeLeft <= 10
                  ? "bg-gradient-to-r from-rose-500 to-red-600 animate-pulse"
                  : "bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400"
              }`}
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* 🎮 PLAYING GAME GRID */}
      {gameStatus === "PLAYING" && (
        <div className="relative">
          <AnimatePresence>
            {floatingScore && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -20, scale: 1.1 }}
                exit={{ opacity: 0, y: -40, scale: 0.8 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-white/40"
              >
                <span>+{floatingScore.amount} PTS</span>
                {floatingScore.comboText && <span className="text-amber-200">{floatingScore.comboText}</span>}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <AnimatePresence>
              {cards.map((card) => {
                const isMismatched = mismatchedIds.includes(card.id);

                if (card.isMatched) {
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 0.96, opacity: 0.35 }}
                      className="h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-emerald-900/20 via-emerald-800/10 to-emerald-950/20 border-2 border-emerald-500/50 flex flex-col items-center justify-center p-3 text-center pointer-events-none shadow-xs"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-1" />
                      <span className="text-[10px] font-black uppercase text-emerald-500 tracking-wider">Đã ghép đôi</span>
                      <span className="text-xs font-bold text-emerald-400 mt-0.5 truncate max-w-full">{card.text}</span>
                    </motion.div>
                  );
                }

                const isKanji = card.type === "KANJI";

                let cardStyle = isKanji
                  ? "bg-gradient-to-br from-[#2D1F1C] via-[#3D2924] to-[#251815] border-[#C65D4B]/60 text-white shadow-md hover:shadow-xl hover:border-[#C65D4B]"
                  : "bg-gradient-to-br from-[#1E2734] via-[#2A374A] to-[#17202B] border-[#4A678C]/60 text-white shadow-md hover:shadow-xl hover:border-[#6B8BB5]";

                if (card.isSelected) {
                  cardStyle =
                    "bg-gradient-to-br from-[#C65D4B] to-[#9E3E2E] border-amber-300 text-white shadow-[0_0_25px_rgba(251,191,36,0.6)] ring-4 ring-amber-400 scale-[1.04]";
                }

                if (isMismatched) {
                  cardStyle =
                    "bg-gradient-to-br from-rose-950 to-red-900 border-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.7)] ring-4 ring-red-500/60 animate-shake";
                }

                return (
                  <Card3DTilt key={card.id} maxTilt={12}>
                    <button
                      type="button"
                      onClick={() => handleCardClick(card)}
                      className={`w-full h-32 sm:h-36 rounded-2xl border-2 p-3.5 flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer select-none relative overflow-hidden group ${cardStyle}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            card.isSelected
                              ? "bg-white/20 text-white border-white/40"
                              : isKanji
                              ? "bg-[#C65D4B]/20 text-[#FF8A75] border-[#C65D4B]/40"
                              : "bg-blue-500/20 text-blue-300 border-blue-400/40"
                          }`}
                        >
                          {isKanji ? "🎴 Chữ Hán" : "💡 Âm Hán Việt"}
                        </span>
                        <span className="text-[10px] opacity-40 font-mono">3D</span>
                      </div>

                      <div className="my-auto py-1">
                        <span
                          className={`font-black block leading-tight ${
                            isKanji
                              ? "text-3xl sm:text-4xl text-[#FF6B57] drop-shadow-[0_2px_8px_rgba(255,107,87,0.4)]"
                              : "text-base sm:text-lg text-amber-200"
                          } ${card.isSelected ? "text-white" : ""}`}
                        >
                          {card.text}
                        </span>
                      </div>

                      {card.subtext ? (
                        <span
                          className={`text-[10px] font-bold truncate max-w-full block ${
                            card.isSelected ? "text-white/90" : "text-[#C5B7B1]"
                          }`}
                        >
                          {card.subtext}
                        </span>
                      ) : (
                        <div className="h-3" />
                      )}
                    </button>
                  </Card3DTilt>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 🏆 VICTORY STAGE (WON) */}
      {gameStatus === "WON" && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#1A2E26] via-[#244337] to-[#13231D] border-2 border-emerald-400 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl text-white"
        >
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-[radial-gradient(#34D399_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-20 pointer-events-none" />

          <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 border-4 border-white/20 animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-300 bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-500/30">
              VICTORY! CHIẾN THẮNG
            </span>
            <h4 className="text-3xl font-black text-white">Xuất Sắc! Bạn Đã Hoàn Thành!</h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md mx-auto">
              Bạn đã ghép chính xác toàn bộ <strong className="text-amber-300">{totalPairsCount} cặp Hán tự</strong> với thời gian dư <strong className="text-amber-300">{timeLeft}s</strong>.
            </p>
          </div>

          <div className="flex justify-center gap-2 py-1">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 ${
                  star <= starsEarned
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    : "text-white/20 fill-white/10"
                }`}
              />
            ))}
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-4 max-w-md mx-auto grid grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-200 block">Tổng Điểm</span>
              <span className="text-lg font-black text-amber-300">{score + timeLeft * 10} PTS</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-200 block">Max Combo</span>
              <span className="text-lg font-black text-orange-400">x{maxCombo}</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-200 block">Thưởng XP</span>
              <span className="text-lg font-black text-emerald-300">+50 XP</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" /> CHƠI LƯỢT MỚI ➔
            </button>
          </div>
        </motion.div>
      )}

      {/* ⏰ TIME UP STAGE */}
      {gameStatus === "TIME_UP" && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#2D1B18] via-[#38231F] to-[#231210] border-2 border-rose-500 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl text-white"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-rose-600 to-red-500 text-white rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl shadow-rose-500/30 border-4 border-white/20 animate-pulse">
            ⏰
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-rose-300 bg-rose-500/20 px-3.5 py-1 rounded-full border border-rose-500/30">
              TIME OVER! HẾT GIỜ
            </span>
            <h4 className="text-3xl font-black text-white">Đã Hết Thời Gian!</h4>
            <p className="text-xs sm:text-sm text-[#C5B7B1] max-w-md mx-auto">
              Bạn đã ghép thành công <strong className="text-amber-300">{matchedPairsCount}/{totalPairsCount} cặp Hán tự</strong>. Hãy thử lại để rèn phản xạ ghi nhớ tốt hơn!
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="px-8 py-3.5 bg-gradient-to-r from-[#C65D4B] to-[#D85C4C] hover:from-[#B04C3B] hover:to-[#C65D4B] text-white font-black text-sm rounded-2xl shadow-xl shadow-[#C65D4B]/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" /> THỬ LẠI LẦN NỮA ➔
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* 🌟 INLINE PREVIEW / IDLE CARD */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#E5D7C7] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md">
        <div className="w-20 h-20 bg-gradient-to-tr from-[#C65D4B] to-[#E06A57] text-white rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-xl shadow-[#C65D4B]/30 ring-4 ring-white border-2 border-white/50">
          🎴
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h4 className="text-2xl sm:text-3xl font-black text-[#231917]">Sẵn sàng thử thách Hán tự 3D?</h4>
          <p className="text-xs sm:text-sm text-[#76685F] leading-relaxed">
            Hệ thống sẽ đảo ngẫu nhiên <strong className="text-[#C65D4B]">6 cặp thẻ Hán tự & Âm Hán Việt</strong>. Khi bắt đầu, ứng dụng sẽ chuyển sang <strong className="text-[#C65D4B]">Chế độ Đêm Toàn Màn Hình</strong> để bạn tập trung 100% phản xạ!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6F5A] bg-[#FFFDF9] border border-[#E5D7C7] px-3.5 py-2 rounded-2xl">
            ⚡ Phản xạ tức thì
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6F5A] bg-[#FFFDF9] border border-[#E5D7C7] px-3.5 py-2 rounded-2xl">
            🔥 Combo nhân đôi điểm số
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6F5A] bg-[#FFFDF9] border border-[#E5D7C7] px-3.5 py-2 rounded-2xl">
            🔊 Âm thanh Arcade sinh động
          </span>
        </div>

        <div className="pt-4">
          <button
            onClick={initializeGame}
            className="px-10 py-4 bg-gradient-to-r from-[#C65D4B] to-[#D85C4C] hover:from-[#B04C3B] hover:to-[#C65D4B] text-white font-black text-base rounded-2xl shadow-xl shadow-[#C65D4B]/30 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" /> BẮT ĐẦU CHƠI NGAY (TOÀN MÀN HÌNH 🎴)
          </button>
        </div>
      </div>

      {/* 🌙 🌟 FULL-SCREEN DARK THEATER OVERLAY MODE */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#0F0A08] via-[#170E0B] to-[#0A0605] p-4 sm:p-8"
          >
            {/* Ambient Background Glow Spotlights */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,93,75,0.22),transparent_65%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Top Stage Control Bar */}
            <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-20 pb-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-[#E0D3CC] uppercase tracking-widest flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#C65D4B]" /> CHẾ ĐỘ GAME 3D TOÀN MÀN HÌNH
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFullScreen(false);
                    setGameStatus("IDLE");
                  }}
                  className="px-4 py-2 rounded-2xl bg-rose-600/80 hover:bg-rose-600 text-white border border-rose-500/50 transition-all text-xs font-black flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105"
                >
                  <X className="w-4 h-4" /> Thoát Game (ESC)
                </button>
              </div>
            </div>

            {/* Center Game Arena */}
            <div className="w-full max-w-4xl mx-auto my-auto py-6 relative z-10">
              {renderGameContent()}
            </div>

            {/* Bottom Footer Tip */}
            <div className="w-full text-center text-[11px] font-bold text-white/40 z-20 pt-2">
              Bấm phím Esc hoặc nút "Thoát Game" để quay lại giao diện bài học
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
