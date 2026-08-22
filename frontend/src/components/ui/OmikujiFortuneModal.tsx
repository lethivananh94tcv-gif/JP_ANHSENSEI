"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Trophy, CheckCircle2, Clock } from "lucide-react";

interface OmikujiFortuneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FortuneResult {
  luckTitle: string;
  kanji: string;
  reading: string;
  meaning: string;
  quote: string;
  xpReward: number;
}

const fortunesList: FortuneResult[] = [
  {
    luckTitle: "大吉 (Đại Cát - Rất May Mắn)",
    kanji: "夢",
    reading: "ゆめ (Yume)",
    meaning: "Giấc Mơ / Hoài Bão",
    quote: "Hãy kiên trì từng bước nhỏ, ước mơ JLPT của bạn chắc chắn sẽ thành hiện thực!",
    xpReward: 50,
  },
  {
    luckTitle: "中吉 (Trung Cát - May Mắn)",
    kanji: "光",
    reading: "ひかり (Hikari)",
    meaning: "Ánh Sáng / Hy Vọng",
    quote: "Ánh sáng tri thức đang mở ra. Mỗi từ vựng bạn học hôm nay là một bước tiến vượt bậc!",
    xpReward: 40,
  },
  {
    luckTitle: "吉 (Cát - Thuận Lợi)",
    kanji: "勝",
    reading: "かつ (Katsu)",
    meaning: "Chiến Thắng / Chinh Phục",
    quote: "Hôm nay là ngày tuyệt vời để bạn vượt qua mọi thử thách ngữ pháp khó khăn nhất!",
    xpReward: 35,
  },
  {
    luckTitle: "大吉 (Đại Cát - Rất May Mắn)",
    kanji: "絆",
    reading: "きずな (Kizuna)",
    meaning: "Gắn Kết / Duyên Phận",
    quote: "Mối duyên với ngôn ngữ Nhật Bản sẽ mang lại cho bạn những cơ hội bất ngờ!",
    xpReward: 50,
  },
];

export default function OmikujiFortuneModal({ isOpen, onClose }: OmikujiFortuneModalProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [alreadyDrawnToday, setAlreadyDrawnToday] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const todayStr = new Date().toISOString().split("T")[0];
      const savedDataStr = localStorage.getItem("anhsensei_omikuji_daily_lock");

      if (savedDataStr) {
        try {
          const parsed = JSON.parse(savedDataStr);
          if (parsed.date === todayStr && parsed.fortune) {
            // User ALREADY drawn today!
            setAlreadyDrawnToday(true);
            setIsShaking(false);
            setFortune(parsed.fortune);
            return;
          }
        } catch (e) {
          console.error("Failed to parse saved omikuji lock", e);
        }
      }

      // FIRST DRAW OF THE DAY!
      setAlreadyDrawnToday(false);
      setIsShaking(true);
      setFortune(null);

      const timer = setTimeout(() => {
        setIsShaking(false);
        const randomFortune = fortunesList[Math.floor(Math.random() * fortunesList.length)];
        setFortune(randomFortune);

        // Lock in localStorage for today
        localStorage.setItem(
          "anhsensei_omikuji_daily_lock",
          JSON.stringify({ date: todayStr, fortune: randomFortune })
        );
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="relative w-full max-w-md bg-gradient-to-br from-[#231917] via-[#3A2A26] to-[#1E1715] text-white rounded-3xl p-6 sm:p-8 border border-[#8B6F5A]/50 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ambient Glow background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C65D4B]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="text-center space-y-1 z-10 relative">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C65D4B]/30 text-[#FFB8A9] text-xs font-bold border border-[#C65D4B]/50">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quẻ Bói Tiếng Nhật Hôm Nay • おみくじ</span>
            </span>
            <h3 className="text-xl font-jp font-black text-white pt-1">
              Rút Quẻ Từ Vựng May Mắn
            </h3>
          </div>

          {/* Shaking Tube Animation Phase */}
          {isShaking ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 select-none">
              <motion.div
                animate={{ rotate: [-10, 10, -12, 12, -8, 8, 0], y: [-4, 4, -4, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-32 bg-gradient-to-tr from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] rounded-2xl flex flex-col items-center justify-center border-2 border-white/30 shadow-2xl shadow-[#C65D4B]/50 relative"
              >
                <span className="font-jp font-black text-3xl text-white">御籤</span>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mt-1">Omikuji</span>
              </motion.div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFB8A9] animate-pulse">
                <span>🐾 Đang lắc hủ quẻ may mắn Mèo Thần Tài...</span>
              </div>
            </div>
          ) : fortune ? (
            /* Result Phase */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 space-y-5 text-center select-none z-10 relative"
            >
              {/* Daily Lock Status Banner */}
              {alreadyDrawnToday ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-extrabold">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Quẻ hôm nay của bạn • Quay lại vào ngày mai!</span>
                </div>
              ) : (
                <div className="inline-block bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] text-white px-4 py-1.5 rounded-xl font-jp font-black text-sm shadow-md">
                  {fortune.luckTitle}
                </div>
              )}

              {/* 3D Japanese Kanji Card Reveal */}
              <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-5 space-y-3 shadow-xl">
                <span className="text-5xl sm:text-6xl font-jp font-black text-[#FFB8A9] block tracking-widest">
                  {fortune.kanji}
                </span>
                <span className="text-sm font-bold text-white block">
                  {fortune.reading}
                </span>
                <span className="inline-block bg-white/15 px-3 py-1 rounded-lg text-xs font-black text-white">
                  Nghĩa: {fortune.meaning}
                </span>
                <p className="text-xs text-[#DED3C8] italic leading-relaxed pt-2 font-medium">
                  &ldquo;{fortune.quote}&rdquo;
                </p>
              </div>

              {/* XP Reward Badge */}
              <div className="flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl text-emerald-300 text-xs font-extrabold shadow-sm">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>
                  {alreadyDrawnToday
                    ? `Đã nhận +${fortune.xpReward} XP hôm nay!`
                    : `Chúc mừng! Bạn nhận +${fortune.xpReward} XP hôm nay!`}
                </span>
              </div>

              {/* Close Action Button */}
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] hover:from-[#B04F3F] hover:to-[#9B4133] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                {alreadyDrawnToday ? "Đóng & Tiếp Tục Học 🚀" : "Nhận Quẻ & Bắt Đầu Học Ngay 🚀"}
              </button>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
