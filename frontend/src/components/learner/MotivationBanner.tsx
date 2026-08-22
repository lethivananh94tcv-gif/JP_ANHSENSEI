"use client";

import Link from "next/link";
import { Quote, Bot, ArrowRight, Sparkles, MessageSquare, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function MotivationBanner() {
  const proverb = {
    kanji: "継続は力なり",
    romaji: "Keizoku wa chikara nari",
    meaning: "Kiên trì chính là sức mạnh • Học mỗi ngày một chút sẽ đưa bạn tới thành công.",
  };

  const quickPrompts = [
    {
      label: "Phân biệt ngữ pháp",
      text: "Phân biệt giúp mình mẫu câu 〜てはいけません và 〜なくてもいいです",
      badge: "Ngữ pháp N5",
    },
    {
      label: "Ví dụ từ vựng",
      text: "Cho ví dụ từ vựng 勉強する (benkyou suru) trong giao tiếp hàng ngày",
      badge: "Từ vựng",
    },
    {
      label: "Tạo bài tập nhanh",
      text: "Tạo bài tập trắc nghiệm N5 5 câu về trợ từ は và が kèm giải thích",
      badge: "Luyện thi",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#231917] via-[#3D2622] to-[#B04F3F] border border-[#8B6F5A]/50 rounded-3xl p-6 sm:p-8 lg:p-9 text-white shadow-2xl relative overflow-hidden group">
      {/* 3D Glowing Ambient Orbs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FF8C78]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#C65D4B]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Japanese Calligraphy Watermark Accent */}
      <div className="absolute right-8 bottom-0 text-9xl font-jp font-black text-white/[0.05] select-none pointer-events-none tracking-widest hidden sm:block">
        助手
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top Header: Japanese Proverb & 3D Shimmer AI Launcher */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-white/15">
          <div className="flex items-start gap-4 max-w-2xl">
            {/* 3D Floating Quote & Bot Emblem */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] text-white font-jp font-black text-2xl flex items-center justify-center shadow-xl shadow-[#C65D4B]/40 border border-white/30 flex-shrink-0"
            >
              諺
            </motion.div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB8A9] bg-white/10 px-3.5 py-1 rounded-full border border-white/15 shadow-2xs">
                <Quote className="w-3.5 h-3.5 text-[#FFB8A9]" />
                <span>Châm Ngôn Tiếng Nhật Mỗi Ngày • おみくじ</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-jp font-black text-white tracking-wide flex flex-wrap items-center gap-3">
                  <span>{proverb.kanji}</span>
                  <span className="text-xs sm:text-sm font-sans font-bold text-[#FFB8A9]">
                    ({proverb.romaji})
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#DED3C8] font-medium leading-relaxed">
                  &ldquo;{proverb.meaning}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* 3D Shimmer White AI Button */}
          <Link
            href="/ai-tutor"
            className="relative group/btn overflow-hidden inline-flex items-center gap-3 px-6 py-4 bg-white hover:bg-[#FAF3EB] text-[#C65D4B] font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-98 flex-shrink-0"
          >
            <Bot className="w-5 h-5 text-[#C65D4B]" />
            <span>Trò chuyện với Trợ Giảng AI</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            {/* Shimmer Light Ray */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000" />
          </Link>
        </div>

        {/* Bottom Section: 3D Interactive AI Prompt Glass Cards */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#DED3C8]">
            <Sparkles className="w-4 h-4 text-[#FF8C78]" />
            <span>Gợi ý câu hỏi cho AI Tutor (Bấm để hỏi ngay):</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {quickPrompts.map((prompt) => (
              <motion.div
                key={prompt.label}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href={`/ai-tutor?prompt=${encodeURIComponent(prompt.text)}`}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg transition-all duration-300 group/prompt h-full block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#FFB8A9] bg-[#C65D4B]/40 px-2.5 py-0.5 rounded-lg border border-[#C65D4B]/50">
                      {prompt.badge}
                    </span>
                    <MessageSquare className="w-3.5 h-3.5 text-[#FFB8A9] group-hover/prompt:scale-110 transition-transform" />
                  </div>

                  <p className="text-xs text-white font-extrabold line-clamp-2 leading-snug group-hover/prompt:text-[#FFB8A9] transition-colors">
                    &ldquo;{prompt.text}&rdquo;
                  </p>

                  <div className="text-[10px] font-bold text-[#DED3C8] flex items-center justify-between pt-2 border-t border-white/15">
                    <span>Bấm để hỏi ngay</span>
                    <ArrowRight className="w-3 h-3 group-hover/prompt:translate-x-1 transition-transform text-[#FFB8A9]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
