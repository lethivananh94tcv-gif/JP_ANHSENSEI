"use client";

import Link from "next/link";
import { BookMarked, Sparkles, Languages, Flame, PenTool, ArrowRight, Star } from "lucide-react";
import Card3DTilt from "@/components/ui/Card3DTilt";
import { motion } from "framer-motion";

export default function LearningTypeGrid() {
  const cards = [
    {
      title: "Từ Vựng (Vocabulary)",
      subtitle: "Học từ mới N5 – N3",
      desc: "Phát âm chuẩn Kana, Furigana, Hán tự gốc và ví dụ ngữ cảnh sinh động.",
      kanjiWatermark: "語",
      icon: Languages,
      medallionGrad: "from-[#C65D4B] via-[#E56A56] to-[#B04F3F]",
      badge: "1,200+ Từ vựng",
      badgeBg: "bg-[#C65D4B]/10 text-[#C65D4B] border-[#C65D4B]/30",
      href: "/vocabularies",
    },
    {
      title: "Ngữ Pháp (Grammar)",
      subtitle: "Cấu trúc mẫu câu",
      desc: "Phân loại mẫu câu theo từng bài học kèm sơ đồ liên kết mẫu câu.",
      kanjiWatermark: "文",
      icon: BookMarked,
      medallionGrad: "from-[#8B6F5A] via-[#A3856F] to-[#765844]",
      badge: "150+ Mẫu câu",
      badgeBg: "bg-[#8B6F5A]/10 text-[#8B6F5A] border-[#8B6F5A]/30",
      href: "/grammar",
    },
    {
      title: "Hán Tự (Kanji)",
      subtitle: "Bộ chữ Hán",
      desc: "Tra cứu Âm Ôn, Âm Kôn, bộ thủ và hình ảnh hướng dẫn nét vẽ chuẩn.",
      kanjiWatermark: "漢",
      icon: PenTool,
      medallionGrad: "from-[#231917] via-[#3D2C26] to-[#16100F]",
      badge: "300+ Chữ Hán",
      badgeBg: "bg-[#231917]/10 text-[#231917] border-[#231917]/30",
      href: "/kanji",
    },
    {
      title: "Flashcard SRS",
      subtitle: "Lặp ngắt quãng thông minh",
      desc: "Tự động gợi ý những từ bạn sắp quên để ôn lại đúng thời điểm vàng.",
      kanjiWatermark: "憶",
      icon: Flame,
      medallionGrad: "from-[#C65D4B] via-[#FF8C78] to-[#B04F3F]",
      badge: "Ôn tập SRS",
      badgeBg: "bg-[#C65D4B]/10 text-[#C65D4B] border-[#C65D4B]/30",
      href: "/flashcards",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#C65D4B] uppercase tracking-wider bg-[#F5EFE6] px-3.5 py-1.5 rounded-full border border-[#DED3C8]">
            <Sparkles className="w-4 h-4 text-[#C65D4B]" />
            <span>Kho Kỹ Năng Học Tập Chuyên Sâu 3D</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#231917] tracking-tight">
            Bạn muốn rèn luyện kỹ năng nào hôm nay?
          </h2>
        </div>
      </div>

      {/* 4 3D Gem Medallion Skill Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const IconComp = card.icon;
          return (
            <Card3DTilt key={card.title} className="h-full">
              <Link
                href={card.href}
                className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] hover:border-[#C65D4B]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full block"
              >
                {/* 3D Japanese Calligraphy Watermark */}
                <div className="absolute -right-3 -bottom-3 text-8xl font-jp font-black text-[#8B6F5A]/5 select-none pointer-events-none group-hover:scale-125 group-hover:text-[#C65D4B]/15 transition-transform duration-500">
                  {card.kanjiWatermark}
                </div>

                <div className="space-y-4 z-10 relative">
                  <div className="flex justify-between items-center">
                    {/* 3D Floating Gem Medallion Emblem */}
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${card.medallionGrad} text-white shadow-xl shadow-[#C65D4B]/30 flex items-center justify-center border-2 border-white/40 group-hover:-translate-y-1 transition-transform duration-300`}
                    >
                      <IconComp className="w-7 h-7 stroke-[2.2]" />
                    </motion.div>

                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border shadow-2xs ${card.badgeBg}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold text-[#231917] group-hover:text-[#C65D4B] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#76685F] leading-relaxed line-clamp-3 font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Elevated 3D Action Footer Button */}
                <div className="pt-4 border-t border-[#DED3C8]/80 flex justify-between items-center text-xs font-black text-[#8B6F5A] group-hover:text-[#C65D4B] transition-colors z-10">
                  <span>{card.subtitle}</span>
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#DED3C8] shadow-sm flex items-center justify-center group-hover:bg-[#C65D4B] group-hover:text-white group-hover:border-[#C65D4B] transition-all duration-300 group-hover:scale-105">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </Card3DTilt>
          );
        })}
      </div>
    </section>
  );
}
