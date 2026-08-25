"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookMarked,
  Sparkles,
  Languages,
  Flame,
  PenTool,
  ArrowRight,
  Grid,
  ChevronRight,
  BrainCircuit,
  Award,
  Gamepad2,
  X
} from "lucide-react";
import Card3DTilt from "@/components/ui/Card3DTilt";
import { motion, AnimatePresence } from "framer-motion";

// Hiragana Data Preview
const HIRAGANA_PREVIEW = [
  { kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" },
  { kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" },
  { kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" },
  { kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" },
  { kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" }
];

// Katakana Data Preview
const KATAKANA_PREVIEW = [
  { kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" },
  { kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" },
  { kana: "サ", romaji: "sa" }, { kana: "シ", romaji: "shi" }, { kana: "ス", romaji: "su" }, { kana: "セ", romaji: "se" }, { kana: "ソ", romaji: "so" },
  { kana: "タ", romaji: "ta" }, { kana: "チ", romaji: "chi" }, { kana: "ツ", romaji: "tsu" }, { kana: "テ", romaji: "te" }, { kana: "ト", romaji: "to" },
  { kana: "ナ", romaji: "na" }, { kana: "ニ", romaji: "ni" }, { kana: "ヌ", romaji: "nu" }, { kana: "ネ", romaji: "ne" }, { kana: "ノ", romaji: "no" }
];

export default function LearningTypeGrid() {
  const [selectedKanaType, setSelectedKanaType] = useState<"HIRAGANA" | "KATAKANA" | null>(null);
  const [activeFlippedCard, setActiveFlippedCard] = useState<boolean>(false);

  const mainSkills = [
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
      desc: "Tra cứu Âm Ôn, Âm Kôn, bộ thủ và hướng dẫn thứ tự nét vẽ KanjiVG chuẩn.",
      kanjiWatermark: "漢",
      icon: PenTool,
      medallionGrad: "from-[#231917] via-[#3D2C26] to-[#16100F]",
      badge: "300+ Chữ Hán",
      badgeBg: "bg-[#231917]/10 text-[#231917] border-[#231917]/30",
      href: "/kanji",
    },
    {
      title: "Flashcard SRS 3D",
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
    <section className="space-y-12 py-4">
      
      {/* ⛩️ SECTION 1: BẢNG CHỮ CÁI HIRAGANA & KATAKANA NÚT BẤM NHANH */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#C65D4B] uppercase tracking-wider bg-[#F5EFE6] px-3.5 py-1.5 rounded-full border border-[#DED3C8]">
              <Grid className="w-4 h-4 text-[#C65D4B]" />
              <span>KANA ALPHABET QUICK ACCESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#231917] tracking-tight">
              Bảng Chữ Cái Tiếng Nhật Kana
            </h2>
            <p className="text-xs sm:text-sm text-[#76685F]">
              Nền tảng căn bản cho người mới học. Bấm xem nhanh trọn bộ bảng Hiragana &amp; Katakana kèm phiên âm Romaji.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Hiragana Quick Access */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#8B6F5A]/20 shadow-lg hover:border-[#8B6F5A] transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#8B6F5A] text-white font-black text-xl flex items-center justify-center shadow-md shadow-[#8B6F5A]/20">
                  あ
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2C221E]">Bảng Hiragana</h3>
                  <span className="text-xs font-semibold text-[#8B6F5A]">Chữ Mềm (平仮名) • 46 Chữ Căn Bản</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#F5EFE6] text-[#8B6F5A] rounded-xl text-xs font-extrabold border border-[#8B6F5A]/20">
                Sơ Cấp
              </span>
            </div>

            {/* Preview Grid 10 chars */}
            <div className="grid grid-cols-5 gap-2 my-3">
              {HIRAGANA_PREVIEW.slice(0, 10).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F5EFE6]/60 rounded-xl p-1.5 text-center border border-[#8B6F5A]/10 hover:bg-white hover:scale-105 transition-all"
                >
                  <span className="font-bold text-base text-[#2C221E] block leading-none">{item.kana}</span>
                  <span className="text-[10px] font-semibold text-[#8B6F5A] uppercase">{item.romaji}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedKanaType("HIRAGANA")}
              className="w-full mt-2 py-3 rounded-2xl bg-[#8B6F5A] text-white font-bold text-xs shadow-md hover:bg-[#725a48] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Grid className="w-4 h-4" /> Mở Bảng Trọn Bộ Hiragana <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card Katakana Quick Access */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#C65D4B]/20 shadow-lg hover:border-[#C65D4B] transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C65D4B] text-white font-black text-xl flex items-center justify-center shadow-md shadow-[#C65D4B]/20">
                  ア
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#2C221E]">Bảng Katakana</h3>
                  <span className="text-xs font-semibold text-[#C65D4B]">Chữ Cứng (片仮名) • Từ Ngoại Nhập</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#C65D4B]/10 text-[#C65D4B] rounded-xl text-xs font-extrabold border border-[#C65D4B]/20">
                Ngoại Nhập
              </span>
            </div>

            {/* Preview Grid 10 chars */}
            <div className="grid grid-cols-5 gap-2 my-3">
              {KATAKANA_PREVIEW.slice(0, 10).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#C65D4B]/5 rounded-xl p-1.5 text-center border border-[#C65D4B]/10 hover:bg-white hover:scale-105 transition-all"
                >
                  <span className="font-bold text-base text-[#2C221E] block leading-none">{item.kana}</span>
                  <span className="text-[10px] font-semibold text-[#C65D4B] uppercase">{item.romaji}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedKanaType("KATAKANA")}
              className="w-full mt-2 py-3 rounded-2xl bg-[#C65D4B] text-white font-bold text-xs shadow-md hover:bg-[#b04f3f] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Grid className="w-4 h-4" /> Mở Bảng Trọn Bộ Katakana <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 SECTION 2: GIỚI THIỆU 4 TÍNH NĂNG ĐẶC BIỆT CỦA HỆ THỐNG */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#C65D4B] uppercase tracking-wider bg-[#F5EFE6] px-3.5 py-1.5 rounded-full border border-[#DED3C8]">
              <Sparkles className="w-4 h-4 text-[#C65D4B]" />
              <span>CORE SYSTEM INTERACTIVE HIGHLIGHTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#231917] tracking-tight">
              Các Tính Năng Học Tập Tương Tác Đặc Biệt
            </h2>
            <p className="text-xs sm:text-sm text-[#76685F]">
              Trải nghiệm các chế độ học tập sinh động tích hợp thuật toán ghi nhớ SRS &amp; mô phỏng 3D.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FEATURE 1: LẬT THẺ TỪ VỰNG 3D */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#8B6F5A]/20 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B6F5A] to-[#6E5E52] text-white flex items-center justify-center shadow-md shadow-[#8B6F5A]/30">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#8B6F5A]/10 text-[#8B6F5A] text-xs font-black uppercase tracking-wider">
                Flashcard SRS
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#2C221E] flex items-center gap-2">
                🎴 Lật Thẻ Từ Vựng 3D
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Thẻ Flashcard 3D lật xoay mượt mà, phân loại mức độ ghi nhớ (Again, Hard, Good, Easy) hẹn giờ nhắc lại thông minh.
              </p>
            </div>

            {/* Interactive Card Mockup */}
            <div
              className="my-4 p-3 rounded-2xl bg-[#F5EFE6]/80 border border-[#8B6F5A]/20 text-center cursor-pointer"
              onClick={() => setActiveFlippedCard(!activeFlippedCard)}
            >
              <span className="text-[10px] font-bold text-[#8B6F5A] uppercase block mb-1">Bấm lật xem đáp án</span>
              <div className="py-3 bg-white rounded-xl shadow-2xs border border-[#8B6F5A]/15">
                {!activeFlippedCard ? (
                  <div>
                    <span className="text-2xl font-black text-[#2C221E] block">桜</span>
                    <span className="text-xs text-[#8B6F5A] font-semibold">さくら (sakura)</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-lg font-black text-[#C65D4B] block">Hoa Anh Đào</span>
                    <span className="text-[10px] text-[#76685F]">Nghĩa tiếng Việt chuẩn</span>
                  </div>
                )}
              </div>
            </div>

            <Link
              href="/flashcards"
              className="w-full py-3 rounded-2xl bg-[#8B6F5A] text-white font-bold text-xs text-center shadow-md hover:bg-[#725a48] transition flex items-center justify-center gap-2"
            >
              Vào Học Flashcard 3D <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FEATURE 2: LUYỆN VIẾT KANJI TỪNG NÉT */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#C65D4B]/20 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C65D4B] to-[#b04f3f] text-white flex items-center justify-center shadow-md shadow-[#C65D4B]/30">
                <PenTool className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-black uppercase tracking-wider">
                KanjiVG Strokes
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#2C221E] flex items-center gap-2">
                ✍️ Luyện Viết Kanji Từng Nét
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Mô phỏng viết Kanji từng nét chuẩn Nhật, phát chuyển động vòng lặp 5 giây và cho phép tự vẽ tô nét trực tiếp.
              </p>
            </div>

            {/* Interactive Strokes Preview */}
            <div className="my-4 p-3 rounded-2xl bg-[#F5EFE6]/80 border border-[#C65D4B]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#C65D4B] flex items-center justify-center font-black text-3xl text-[#2C221E]">
                  愛
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2C221E] block">Chữ ÁI (Tình yêu)</span>
                  <span className="text-[10px] text-[#C65D4B] font-semibold">Tự phát thứ tự 13 nét</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#C65D4B] text-white text-[11px] font-bold">
                13 Nét
              </span>
            </div>

            <Link
              href="/kanji"
              className="w-full py-3 rounded-2xl bg-[#C65D4B] text-white font-bold text-xs text-center shadow-md hover:bg-[#b04f3f] transition flex items-center justify-center gap-2"
            >
              Vào Luyện Viết Kanji <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FEATURE 3: QUIZ JLPT TỰ ĐỘNG CHẤM */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#8B6F5A]/20 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B6F5A] to-[#D4AF37] text-white flex items-center justify-center shadow-md shadow-[#8B6F5A]/30">
                <Award className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#8B6F5A]/10 text-[#8B6F5A] text-xs font-black uppercase tracking-wider">
                JLPT Engine 30 Câu
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#2C221E] flex items-center gap-2">
                📝 Quiz Kiểm Tra Chấm Điểm Tự Động
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Bộ đề thi trắc nghiệm, luyện nghe TTS, điền trợ từ và xếp câu ngôi sao JLPT ★ với đáp án giải thích chi tiết.
              </p>
            </div>

            {/* Quiz Preview */}
            <div className="my-4 p-3 rounded-2xl bg-[#F5EFE6]/80 border border-[#8B6F5A]/20 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#8B6F5A]">
                <span>Bài Quiz Kiểm Tra Bài #1</span>
                <span className="text-[#C65D4B]">⏱️ 09:45 / 10:00</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#8B6F5A]/15 text-xs font-bold text-[#2C221E]">
                Q1. Từ 「私 (わたし)」 trong tiếng Việt có nghĩa là gì?
              </div>
            </div>

            <Link
              href="/quizzes/1"
              className="w-full py-3 rounded-2xl bg-[#8B6F5A] text-white font-bold text-xs text-center shadow-md hover:bg-[#725a48] transition flex items-center justify-center gap-2"
            >
              Làm Bài Quiz Ngay <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FEATURE 4: GAME GHÉP TỪ VỰNG 3D */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#C65D4B]/20 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C65D4B] to-[#D4AF37] text-white flex items-center justify-center shadow-md shadow-[#C65D4B]/30">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-black uppercase tracking-wider">
                3D Match Game
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#2C221E] flex items-center gap-2">
                🎮 Game Ghép Cặp Từ Vựng 3D
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Trò chơi ghép cặp từ vựng Nhật - Việt không gian 3D, hiệu ứng chuỗi Combo rực rỡ và tính điểm thưởng.
              </p>
            </div>

            {/* Game Match Preview */}
            <div className="my-4 p-3 rounded-2xl bg-[#F5EFE6]/80 border border-[#C65D4B]/20 flex items-center justify-around">
              <div className="px-2.5 py-1.5 bg-white rounded-xl border-2 border-[#C65D4B] text-xs font-bold text-[#C65D4B]">
                本 (ほん)
              </div>
              <span className="text-xs font-black text-[#8B6F5A]">⚡ MATCH</span>
              <div className="px-2.5 py-1.5 bg-white rounded-xl border-2 border-emerald-500 text-xs font-bold text-emerald-600">
                Quyển Sách
              </div>
            </div>

            <Link
              href="/vocabularies"
              className="w-full py-3 rounded-2xl bg-[#C65D4B] text-white font-bold text-xs text-center shadow-md hover:bg-[#b04f3f] transition flex items-center justify-center gap-2"
            >
              Chơi Game Ôn Từ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* 📚 SECTION 3: 4 KHO KỸ NĂNG CHÍNH */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#231917] tracking-tight">
              Khám Phá Giáo Trình Theo Kỹ Năng
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainSkills.map((card) => {
            const IconComp = card.icon;
            return (
              <Card3DTilt key={card.title} className="h-full">
                <Link
                  href={card.href}
                  className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] hover:border-[#C65D4B]/60 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full block"
                >
                  <div className="absolute -right-3 -bottom-3 text-8xl font-jp font-black text-[#8B6F5A]/5 select-none pointer-events-none group-hover:scale-125 group-hover:text-[#C65D4B]/15 transition-transform duration-500">
                    {card.kanjiWatermark}
                  </div>

                  <div className="space-y-4 z-10 relative">
                    <div className="flex justify-between items-center">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.medallionGrad} text-white shadow-lg flex items-center justify-center border-2 border-white/40 group-hover:-translate-y-1 transition-transform duration-300`}>
                        <IconComp className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      <span className={`text-[10px] font-black px-3 py-1 rounded-full border shadow-2xs ${card.badgeBg}`}>
                        {card.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-[#231917] group-hover:text-[#C65D4B] transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#76685F] leading-relaxed line-clamp-3 font-medium">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DED3C8]/80 flex justify-between items-center text-xs font-black text-[#8B6F5A] group-hover:text-[#C65D4B] transition-colors z-10">
                    <span>{card.subtitle}</span>
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#DED3C8] shadow-2xs flex items-center justify-center group-hover:bg-[#C65D4B] group-hover:text-white group-hover:border-[#C65D4B] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Card3DTilt>
            );
          })}
        </div>
      </div>

      {/* 🏮 KANA CHART INTERACTIVE MODAL */}
      <AnimatePresence>
        {selectedKanaType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#FDFBF7] rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border-2 border-[#8B6F5A]/20 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedKanaType(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F5EFE6] text-[#8B6F5A] hover:bg-[#C65D4B] hover:text-white transition flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-2xl text-white font-black text-2xl flex items-center justify-center ${selectedKanaType === "HIRAGANA" ? "bg-[#8B6F5A]" : "bg-[#C65D4B]"}`}>
                  {selectedKanaType === "HIRAGANA" ? "あ" : "ア"}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#2C221E]">
                    {selectedKanaType === "HIRAGANA" ? "Bảng Chữ Cái Hiragana (平仮名)" : "Bảng Chữ Cái Katakana (片仮名)"}
                  </h3>
                  <p className="text-xs font-bold text-[#8B6F5A]">25 Chữ Cái Căn Bản Hàng Đầu (5 Hàng: A, Ka, Sa, Ta, Na)</p>
                </div>
              </div>

              {/* Grid 25 characters */}
              <div className="grid grid-cols-5 gap-3 my-4">
                {(selectedKanaType === "HIRAGANA" ? HIRAGANA_PREVIEW : KATAKANA_PREVIEW).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-2xl border border-[#8B6F5A]/20 text-center shadow-2xs hover:scale-105 hover:border-[#C65D4B] transition-transform cursor-pointer"
                  >
                    <span className="text-2xl font-black text-[#2C221E] block">{item.kana}</span>
                    <span className="text-xs font-bold text-[#8B6F5A] uppercase">{item.romaji}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#8B6F5A]/15 flex justify-end">
                <button
                  onClick={() => setSelectedKanaType(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#8B6F5A] text-white font-bold text-xs shadow-md hover:bg-[#725a48] transition cursor-pointer"
                >
                  Đóng Bảng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

