"use client";

import Card3DTilt from "@/components/ui/Card3DTilt";
import { BookOpen, Layers, Keyboard, Sparkles, ArrowRight, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

interface VocabularyModeSelectorProps {
  onSelectMode: (mode: "list" | "cards" | "typing" | "match") => void;
  disabled?: boolean;
}

export default function VocabularyModeSelector({
  onSelectMode,
  disabled = false,
}: VocabularyModeSelectorProps) {
  const modes = [
    {
      key: "list" as const,
      title: "Xem Từ Vựng",
      subtext: "Tra cứu & đọc furigana",
      badge: "Tra cứu nhanh",
      orbGrad: "from-[#C65D4B] to-[#FF8C78]",
      icon: BookOpen,
    },
    {
      key: "cards" as const,
      title: "Lật Thẻ 3D Flashcards",
      subtext: "Nhớ từ bằng thuật toán SRS",
      badge: "Ghi nhớ 3D",
      orbGrad: "from-[#8B6F5A] to-[#A3856F]",
      icon: Layers,
    },
    {
      key: "typing" as const,
      title: "Luyện Gõ Từ Vựng",
      subtext: "Romaji / Kana phản xạ",
      badge: "Phản xạ nhanh",
      orbGrad: "from-[#231917] to-[#45332F]",
      icon: Keyboard,
    },
    {
      key: "match" as const,
      title: "Game Ghép Thẻ 3D",
      subtext: "Ghép 6 cặp từ trong 60s",
      badge: "Thử thách +50 XP",
      orbGrad: "from-amber-500 to-amber-600",
      icon: Gamepad2,
    },
  ];

  return (
    <section aria-label="Lựa chọn chế độ học" className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#C65D4B]" />
        <h3 className="text-lg font-extrabold text-[#231917]">
          Bạn muốn học từ vựng theo phương pháp nào?
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modes.map((m) => {
          const IconComp = m.icon;
          return (
            <Card3DTilt key={m.key} className="h-full">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelectMode(m.key)}
                className={`group relative w-full h-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF2E8] to-[#F5ECE0] border-2 border-[#DCD0C4] hover:border-[#C65D4B] p-5 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-[#C65D4B]/10 hover:-translate-y-1 transition-all text-left flex flex-col justify-between min-h-[135px] overflow-hidden ${
                  disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="flex justify-between items-start z-10">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${m.orbGrad} text-white shadow-lg shadow-[#2C2421]/15 flex items-center justify-center border-2 border-white/40`}
                  >
                    <IconComp className="w-6 h-6" />
                  </motion.div>

                  <span className="text-[10px] font-black text-[#5C4D43] bg-white/90 px-3.5 py-1 rounded-full border border-[#DCD0C4] shadow-2xs group-hover:border-[#C65D4B]/40 group-hover:text-[#C65D4B] transition-colors">
                    {m.badge}
                  </span>
                </div>

                <div className="pt-3 z-10 space-y-1">
                  <h4 className="text-base font-black text-[#231917] group-hover:text-[#C65D4B] transition-colors leading-tight">
                    {m.title}
                  </h4>
                  <p className="text-xs font-bold text-[#6E5D55] flex items-center justify-between">
                    <span>{m.subtext}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#C65D4B]" />
                  </p>
                </div>
              </button>
            </Card3DTilt>
          );
        })}
      </div>
    </section>
  );
}
