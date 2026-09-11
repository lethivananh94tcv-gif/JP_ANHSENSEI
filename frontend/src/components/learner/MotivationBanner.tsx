"use client";

import Link from "next/link";
import { Quote, ArrowRight, Sparkles, BookOpen, Layers, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MotivationBanner() {
  const proverb = {
    kanji: "継続は力なり",
    romaji: "Keizoku wa chikara nari",
    meaning: "Kiên trì chính là sức mạnh • Học mỗi ngày một chút sẽ đưa bạn tới thành công.",
  };

  const studyHighlights = [
    {
      label: "Ghi nhớ ngắt quãng (SRS)",
      title: "Ôn tập Flashcards 3D",
      desc: "Lặp lại thông minh theo chu kỳ để nhớ từ vựng và Kanji lâu hơn gấp 3 lần.",
      href: "/flashcards",
      icon: Layers,
      badge: "Khoa học ghi nhớ",
    },
    {
      label: "Hệ thống bài học",
      title: "Ngữ Pháp Chuẩn JLPT",
      desc: "Cấu trúc rõ ràng kèm giải thích chi tiết, ví dụ thực tế và bài tập tương tác.",
      href: "/grammar",
      icon: BookOpen,
      badge: "Lộ trình N5-N3",
    },
    {
      label: "Đấu trường phản xạ",
      title: "Game Ghép Thẻ 3D",
      desc: "Rèn luyện tốc độ nhận diện từ vựng và hán tự qua các màn đấu 60s kịch tính.",
      href: "/vocabularies",
      icon: Gamepad2,
      badge: "Vừa học vừa chơi",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border border-[#DED0C5] rounded-3xl p-6 sm:p-8 lg:p-9 text-[#2C201D] shadow-md relative overflow-hidden group">
      {/* Subtle Japanese Wood Pattern Texture Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B6F5A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Soft Ambient Background Accent */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D66552]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#8B6F5A]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Japanese Calligraphy Watermark Accent */}
      <div className="absolute right-8 bottom-0 text-9xl font-jp font-black text-[#8B6F5A]/[0.06] select-none pointer-events-none tracking-widest hidden sm:block">
        継続
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top Header: Japanese Proverb */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-[#E8DCCF]">
          <div className="flex items-start gap-4 max-w-2xl">
            {/* Minimalist Matte Proverb Emblem */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#D66552] text-white font-jp font-black text-2xl flex items-center justify-center shadow-sm border border-[#E37966] flex-shrink-0"
            >
              諺
            </motion.div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6F5A] bg-[#F2E5D9] px-3.5 py-1 rounded-full border border-[#E3D4C7] shadow-2xs">
                <Quote className="w-3.5 h-3.5 text-[#8B6F5A]" />
                <span>Châm Ngôn Tiếng Nhật Mỗi Ngày • おみくじ</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-jp font-black text-[#2C201D] tracking-wide flex flex-wrap items-center gap-3">
                  <span>{proverb.kanji}</span>
                  <span className="text-xs sm:text-sm font-sans font-bold text-[#C65D4B]">
                    ({proverb.romaji})
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#6B554E] font-medium leading-relaxed">
                  &ldquo;{proverb.meaning}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D66552] hover:bg-[#C25644] text-white font-bold text-xs sm:text-sm rounded-2xl border border-[#E37966] shadow-xs transition-colors duration-200 flex-shrink-0"
          >
            <span>Khám phá bài học mới</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom Section: 3 High-Impact Study Methods */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B554E]">
            <Sparkles className="w-4 h-4 text-[#C65D4B]" />
            <span>Phương pháp học tập trọng tâm trên hệ thống:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {studyHighlights.map((item) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="bg-[#FFFDF9] hover:bg-white border border-[#E8DCCF] rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs transition-all duration-200 group/prompt h-full block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#C65D4B] bg-[#F2E5D9] px-2.5 py-0.5 rounded-lg border border-[#E3D4C7]">
                        {item.badge}
                      </span>
                      <IconComp className="w-4 h-4 text-[#C65D4B]" />
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-[#2C201D] group-hover/prompt:text-[#C65D4B] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#76685F] font-medium leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="text-[10px] font-semibold text-[#8B6F5A] flex items-center justify-between pt-2 border-t border-[#F0E4D7]">
                      <span>Vào luyện tập ngay</span>
                      <ArrowRight className="w-3 h-3 text-[#C65D4B] group-hover/prompt:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
