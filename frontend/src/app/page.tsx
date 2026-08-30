"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LearnerDashboardPage from "./(learner)/dashboard/page";
import {
  Sparkles,
  BookOpen,
  BrainCircuit,
  Bot,
  Award,
  CheckCircle2,
  ArrowRight,
  User,
  Layers,
  ChevronRight,
  Flame,
  Zap,
  ShieldCheck,
  Gamepad2,
  PenTool,
  HelpCircle,
  X,
  Volume2,
  RotateCcw,
  Sparkle,
  Grid
} from "lucide-react";
import LearnerFooter from "@/components/learner/LearnerFooter";

// Full 46 Hiragana Gojuon Dataset
const FULL_HIRAGANA = [
  { kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" },
  { kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" },
  { kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" },
  { kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" },
  { kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" },
  { kana: "は", romaji: "ha" }, { kana: "ひ", romaji: "hi" }, { kana: "ふ", romaji: "fu" }, { kana: "へ", romaji: "he" }, { kana: "ほ", romaji: "ho" },
  { kana: "ま", romaji: "ma" }, { kana: "み", romaji: "mi" }, { kana: "む", romaji: "mu" }, { kana: "め", romaji: "me" }, { kana: "も", romaji: "mo" },
  { kana: "や", romaji: "ya" }, { kana: "ゆ", romaji: "yu" }, { kana: "よ", romaji: "yo" },
  { kana: "ら", romaji: "ra" }, { kana: "り", romaji: "ri" }, { kana: "る", romaji: "ru" }, { kana: "れ", romaji: "re" }, { kana: "ろ", romaji: "ro" },
  { kana: "わ", romaji: "wa" }, { kana: "を", romaji: "wo" }, { kana: "ん", romaji: "n" },
];

// Full 46 Katakana Gojuon Dataset
const FULL_KATAKANA = [
  { kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" },
  { kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" },
  { kana: "サ", romaji: "sa" }, { kana: "シ", romaji: "shi" }, { kana: "ス", romaji: "su" }, { kana: "セ", romaji: "se" }, { kana: "ソ", romaji: "so" },
  { kana: "タ", romaji: "ta" }, { kana: "チ", romaji: "chi" }, { kana: "ツ", romaji: "tsu" }, { kana: "テ", romaji: "te" }, { kana: "ト", romaji: "to" },
  { kana: "ナ", romaji: "na" }, { kana: "ニ", romaji: "ni" }, { kana: "ヌ", romaji: "nu" }, { kana: "ネ", romaji: "ne" }, { kana: "ノ", romaji: "no" },
  { kana: "ハ", romaji: "ha" }, { kana: "ヒ", romaji: "hi" }, { kana: "フ", romaji: "fu" }, { kana: "ヘ", romaji: "he" }, { kana: "ホ", romaji: "ho" },
  { kana: "マ", romaji: "ma" }, { kana: "ミ", romaji: "mi" }, { kana: "ム", romaji: "mu" }, { kana: "メ", romaji: "me" }, { kana: "モ", romaji: "mo" },
  { kana: "ヤ", romaji: "ya" }, { kana: "ユ", romaji: "yu" }, { kana: "ヨ", romaji: "yo" },
  { kana: "ラ", romaji: "ra" }, { kana: "リ", romaji: "ri" }, { kana: "ル", romaji: "ru" }, { kana: "レ", romaji: "re" }, { kana: "ロ", romaji: "ro" },
  { kana: "ワ", romaji: "wa" }, { kana: "ヲ", romaji: "wo" }, { kana: "ン", romaji: "n" },
];

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ name?: string; fullName?: string; email?: string; role?: string } | null>(null);

  // Kana Modal State
  const [selectedKanaType, setSelectedKanaType] = useState<"HIRAGANA" | "KATAKANA" | null>(null);
  const [activeFlippedCard, setActiveFlippedCard] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
      if (storedUser && token) {
        try {
          const parsed = JSON.parse(storedUser);
          setCurrentUser(parsed);
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e);
        }
      }
    }
  }, [router]);

  if (currentUser) {
    return <LearnerDashboardPage />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] font-sans selection:bg-[#C65D4B]/20 selection:text-[#C65D4B] relative overflow-x-hidden">
      
      {/* Background Decorative Japanese Patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[#C65D4B]/5 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />
      <div className="absolute top-96 left-0 w-[600px] h-[600px] bg-radial from-[#8B6F5A]/5 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FDFBF7]/90 border-b border-[#8B6F5A]/15 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] via-[#C65D4B] to-[#D4AF37] flex items-center justify-center text-white shadow-md shadow-[#C65D4B]/20 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              <span className="font-extrabold text-xl tracking-wider z-10">学</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#8B6F5A] block leading-none">
                ANH SENSEI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C65D4B]">
                日本語学習 • JLPT N5-N3
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#6E5E52]">
            <a href="#kana-quick" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-[#8B6F5A]" /> Bảng Chữ Cái
            </a>
            <a href="#special-features" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C65D4B]" /> Tính Năng Đặc Biệt
            </a>
            <a href="#levels" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#8B6F5A]" /> Cấp độ JLPT
            </a>
            <a href="#special-features" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-[#C65D4B]" /> Đấu Trường Game 3D
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl px-5 py-2.5 font-semibold text-[#8B6F5A] hover:bg-[#8B6F5A]/10 transition text-sm"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-[#8B6F5A] via-[#C65D4B] to-[#8B6F5A] px-5 py-2.5 font-semibold text-white hover:opacity-95 transition text-sm shadow-md shadow-[#C65D4B]/20 flex items-center gap-1.5"
            >
              Đăng ký miễn phí <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#F5EFE6] border border-[#8B6F5A]/25 text-[#8B6F5A] text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#C65D4B] animate-pulse" />
              <span>Nền Tảng Tự Học Tiếng Nhật Toàn Diện (JLPT N5 – N3)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#2C221E] leading-[1.15]">
              Chinh Phục Tiếng Nhật Với <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#8B6F5A] via-[#C65D4B] to-[#8B6F5A] bg-clip-text text-transparent">
                Thuật Toán SRS &amp; Đấu Trường Game 3D
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#6E5E52] leading-relaxed max-w-2xl mx-auto">
              Ghi nhớ từ vựng &amp; Hán tự lâu gấp 3 lần bằng <strong>Spaced Repetition (SRS)</strong>, làm bài Quiz chấm điểm tự động và rèn luyện phản xạ với <strong>Game Ghép Thẻ 3D</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto rounded-2xl bg-[#C65D4B] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#C65D4B]/30 hover:bg-[#b04f3f] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" /> Bắt đầu học miễn phí
              </Link>
              <a
                href="#special-features"
                className="w-full sm:w-auto rounded-2xl bg-white border border-[#8B6F5A]/25 px-8 py-4 text-base font-bold text-[#8B6F5A] shadow-md hover:bg-[#F5EFE6]/60 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-[#C65D4B]" /> Khám phá Tính năng
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-xs text-center">
                <div className="text-2xl font-black text-[#8B6F5A]">N5 – N3</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Cấp độ giáo trình</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-xs text-center">
                <div className="text-2xl font-black text-[#C65D4B]">SRS Flashcards</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Ghi nhớ ngắt quãng</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-xs text-center">
                <div className="text-2xl font-black text-[#8B6F5A]">Quiz JLPT</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Tự động chấm điểm</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-xs text-center">
                <div className="text-2xl font-black text-[#C65D4B]">Game Ghép Thẻ 3D</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Rèn luyện phản xạ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⛩️ SECTION 1: BẢNG CHỮ CÁI HIRAGANA & KATAKANA NÚT BẤM NHANH */}
      <section id="kana-quick" className="py-16 bg-[#F5EFE6]/70 border-y border-[#8B6F5A]/15 relative">
        {/* Japanese Decorative Seals */}
        <div className="absolute top-6 left-8 w-14 h-14 border-2 border-[#C65D4B]/20 rounded-xl flex items-center justify-center text-[#C65D4B]/30 font-black text-xl select-none rotate-12 pointer-events-none">
          仮名
        </div>
        <div className="absolute bottom-6 right-8 w-16 h-16 border-2 border-[#8B6F5A]/20 rounded-full flex items-center justify-center text-[#8B6F5A]/30 font-black text-2xl select-none -rotate-12 pointer-events-none">
          あ
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C65D4B] bg-[#C65D4B]/10 px-3.5 py-1 rounded-full border border-[#C65D4B]/20">
              KANA ALPHABET QUICK ACCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2C221E] mt-3">
              Bảng Chữ Cái Tiếng Nhật Kana
            </h2>
            <p className="mt-2 text-[#6E5E52] text-sm sm:text-base">
              Nền tảng căn bản cho mọi người mới bắt đầu. Bấm chọn nhanh để tra cứu phiên âm Romaji &amp; cách đọc chuẩn xác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card Hiragana */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#8B6F5A]/20 shadow-lg hover:border-[#8B6F5A] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B6F5A]/10 to-transparent rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#8B6F5A] text-white font-black text-2xl flex items-center justify-center shadow-md shadow-[#8B6F5A]/20">
                      あ
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#2C221E]">Bảng Hiragana</h3>
                      <span className="text-xs font-semibold text-[#8B6F5A]">Chữ Mềm (平仮名) • 46 Chữ Căn Bản</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#F5EFE6] text-[#8B6F5A] rounded-xl text-xs font-extrabold border border-[#8B6F5A]/20">
                    Sơ Cấp
                  </span>
                </div>

                {/* Preview Grid 10 characters */}
                <div className="grid grid-cols-5 gap-2 my-5">
                  {FULL_HIRAGANA.slice(0, 10).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F5EFE6]/60 rounded-xl p-2 text-center border border-[#8B6F5A]/10 group-hover:border-[#8B6F5A]/30 transition-all hover:bg-white hover:scale-105"
                    >
                      <span className="font-bold text-lg text-[#2C221E] block">{item.kana}</span>
                      <span className="text-[10px] font-semibold text-[#8B6F5A] uppercase">{item.romaji}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedKanaType("HIRAGANA")}
                className="w-full mt-4 py-3.5 rounded-2xl bg-[#8B6F5A] text-white font-bold text-sm text-center shadow-md hover:bg-[#725a48] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Grid className="w-4 h-4" /> Mở Bảng Trọn Bộ Hiragana <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card Katakana */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C65D4B]/20 shadow-lg hover:border-[#C65D4B] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C65D4B]/10 to-transparent rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#C65D4B] text-white font-black text-2xl flex items-center justify-center shadow-md shadow-[#C65D4B]/20">
                      ア
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#2C221E]">Bảng Katakana</h3>
                      <span className="text-xs font-semibold text-[#C65D4B]">Chữ Cứng (片仮名) • Phiên Âm Ngoại Nhập</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#C65D4B]/10 text-[#C65D4B] rounded-xl text-xs font-extrabold border border-[#C65D4B]/20">
                    Từ Ngoại Nhập
                  </span>
                </div>

                {/* Preview Grid 10 characters */}
                <div className="grid grid-cols-5 gap-2 my-5">
                  {FULL_KATAKANA.slice(0, 10).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#C65D4B]/5 rounded-xl p-2 text-center border border-[#C65D4B]/10 group-hover:border-[#C65D4B]/30 transition-all hover:bg-white hover:scale-105"
                    >
                      <span className="font-bold text-lg text-[#2C221E] block">{item.kana}</span>
                      <span className="text-[10px] font-semibold text-[#C65D4B] uppercase">{item.romaji}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedKanaType("KATAKANA")}
                className="w-full mt-4 py-3.5 rounded-2xl bg-[#C65D4B] text-white font-bold text-sm text-center shadow-md hover:bg-[#b04f3f] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Grid className="w-4 h-4" /> Mở Bảng Trọn Bộ Katakana <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 SECTION 2: GIỚI THIỆU 4 TÍNH NĂNG ĐẶC BIỆT CỦA HỆ THỐNG */}
      <section id="special-features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-black tracking-widest text-[#C65D4B] bg-[#C65D4B]/10 px-4 py-1.5 rounded-full border border-[#C65D4B]/20">
              CORE SYSTEM HIGHLIGHTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#2C221E] mt-3 tracking-tight">
              Các Tính Năng Đặc Biệt Tại <span className="text-[#C65D4B]">ANH SENSEI</span>
            </h2>
            <p className="mt-3 text-[#6E5E52] text-base leading-relaxed">
              Thiết kế tập trung vào trải nghiệm thực học, tương tác sinh động 3D giúp bạn ghi nhớ siêu tốc và không gây nhàm chán.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* FEATURE 1: LẬT THẺ TỪ VỰNG 3D (FLASHCARD SRS) */}
            <div
              className="bg-white rounded-3xl p-8 border-2 border-[#8B6F5A]/20 shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B6F5A] to-[#6E5E52] text-white flex items-center justify-center shadow-lg shadow-[#8B6F5A]/30">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#8B6F5A]/10 text-[#8B6F5A] text-xs font-black uppercase tracking-wider">
                  Thuật toán SRS
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[#2C221E] flex items-center gap-2">
                  🎴 Lật Thẻ Từ Vựng 3D
                </h3>
                <p className="text-sm text-[#6E5E52] leading-relaxed">
                  Trải nghiệm thẻ Flashcard 3D lật xoay mượt mà, phân loại mức độ ghi nhớ (Again, Hard, Good, Easy) tự động hẹn giờ nhắc lại theo chu kỳ trí nhớ con người.
                </p>
              </div>

              {/* Live Mini Mockup Preview */}
              <div className="my-6 p-4 rounded-2xl bg-[#F5EFE6]/80 border border-[#8B6F5A]/20 relative cursor-pointer" onClick={() => setActiveFlippedCard(!activeFlippedCard)}>
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-[#8B6F5A] uppercase tracking-wider block">Bấm để lật thử mặt thẻ</span>
                  <div className="py-4 bg-white rounded-xl shadow-xs border border-[#8B6F5A]/15 transition-transform duration-500">
                    {!activeFlippedCard ? (
                      <div>
                        <span className="text-3xl font-black text-[#2C221E] block">桜</span>
                        <span className="text-xs text-[#8B6F5A] font-semibold">さくら (sakura)</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xl font-black text-[#C65D4B] block">Hoa Anh Đào</span>
                        <span className="text-xs text-[#6E5E52]">Nghĩa tiếng Việt chuẩn N5</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-2xl bg-[#8B6F5A] text-white font-bold text-sm text-center shadow-md hover:bg-[#725a48] transition flex items-center justify-center gap-2"
              >
                Trải nghiệm Flashcard 3D <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* FEATURE 2: LUYỆN VIẾT KANJI TỪNG NÉT */}
            <div
              className="bg-white rounded-3xl p-8 border-2 border-[#C65D4B]/20 shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C65D4B] to-[#b04f3f] text-white flex items-center justify-center shadow-lg shadow-[#C65D4B]/30">
                  <PenTool className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-black uppercase tracking-wider">
                  KanjiVG Simulation
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[#2C221E] flex items-center gap-2">
                  ✍️ Luyện Viết Kanji Từng Nét
                </h3>
                <p className="text-sm text-[#6E5E52] leading-relaxed">
                  Mô phỏng quy trình viết Hán tự Kanji từng nét bút chuẩn Nhật, tự động phát chuyển động vòng lặp 5 giây và cho phép bạn tự tô bút vẽ luyện tập trên màn hình.
                </p>
              </div>

              {/* Live Mini Mockup Preview */}
              <div className="my-6 p-4 rounded-2xl bg-[#F5EFE6]/80 border border-[#C65D4B]/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white border-2 border-[#C65D4B] flex items-center justify-center font-black text-4xl text-[#2C221E] shadow-sm">
                    愛
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#2C221E] block">Chữ ÁI (Nghĩa: Tình yêu)</span>
                    <span className="text-xs text-[#C65D4B] font-semibold">Tự động phát thứ tự 13 nét bút</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#C65D4B] text-white text-xs font-bold animate-pulse">
                  13 Nét
                </span>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-2xl bg-[#C65D4B] text-white font-bold text-sm text-center shadow-md hover:bg-[#b04f3f] transition flex items-center justify-center gap-2"
              >
                Học Viết Kanji Ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* FEATURE 3: LÀM BÀI QUIZ JLPT TỰ ĐỘNG CHẤM */}
            <div
              className="bg-white rounded-3xl p-8 border-2 border-[#8B6F5A]/20 shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B6F5A] to-[#D4AF37] text-white flex items-center justify-center shadow-lg shadow-[#8B6F5A]/30">
                  <Award className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#8B6F5A]/10 text-[#8B6F5A] text-xs font-black uppercase tracking-wider">
                  JLPT Engine 30 Câu
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[#2C221E] flex items-center gap-2">
                  📝 Quiz Kiểm Tra Chấm Điểm Tự Động
                </h3>
                <p className="text-sm text-[#6E5E52] leading-relaxed">
                  Bộ đề thi trắc nghiệm, luyện nghe TTS, điền trợ từ và xếp câu ngôi sao JLPT ★. Hệ thống tự động lưu lịch sử làm bài và cung cấp đáp án chi tiết.
                </p>
              </div>

              {/* Live Mini Mockup Preview */}
              <div className="my-6 p-4 rounded-2xl bg-[#F5EFE6]/80 border border-[#8B6F5A]/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#8B6F5A]">
                  <span>Đề Thi Từ Vựng Bài #1</span>
                  <span className="text-[#C65D4B]">⏱️ 09:45 / 10:00</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#8B6F5A]/15 text-xs font-bold text-[#2C221E]">
                  Q1. Từ 「私 (わたし)」 trong tiếng Việt có nghĩa là gì?
                </div>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-2xl bg-[#8B6F5A] text-white font-bold text-sm text-center shadow-md hover:bg-[#725a48] transition flex items-center justify-center gap-2"
              >
                Thử Sức Bài Quiz <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* FEATURE 4: GAME GHÉP TỪ VỰNG 3D */}
            <div
              className="bg-white rounded-3xl p-8 border-2 border-[#C65D4B]/20 shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C65D4B] to-[#D4AF37] text-white flex items-center justify-center shadow-lg shadow-[#C65D4B]/30">
                  <Gamepad2 className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-black uppercase tracking-wider">
                  3D Match Game
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[#2C221E] flex items-center gap-2">
                  🎮 Game Ghép Cặp Từ Vựng 3D
                </h3>
                <p className="text-sm text-[#6E5E52] leading-relaxed">
                  Vừa học vừa giải trí với trò chơi ghép cặp từ vựng Nhật - Việt không gian 3D, hiệu ứng chuỗi Combo rực rỡ và bảng xếp hạng thành tích cao.
                </p>
              </div>

              {/* Live Mini Mockup Preview */}
              <div className="my-6 p-4 rounded-2xl bg-[#F5EFE6]/80 border border-[#C65D4B]/20 flex items-center justify-around">
                <div className="px-3 py-2 bg-white rounded-xl border-2 border-[#C65D4B] text-xs font-bold text-[#C65D4B] shadow-xs">
                  本 (ほん)
                </div>
                <span className="text-sm font-black text-[#8B6F5A]">⚡ MATCH</span>
                <div className="px-3 py-2 bg-white rounded-xl border-2 border-emerald-500 text-xs font-bold text-emerald-600 shadow-xs">
                  Quyển Sách
                </div>
              </div>

              <Link
                href="/register"
                className="w-full py-3.5 rounded-2xl bg-[#C65D4B] text-white font-bold text-sm text-center shadow-md hover:bg-[#b04f3f] transition flex items-center justify-center gap-2"
              >
                Chơi Game Học Từ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* JLPT Levels Section */}
      <section id="levels" className="py-16 bg-[#F5EFE6]/60 border-y border-[#8B6F5A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-[#8B6F5A] sm:text-4xl">Các Cấp Độ Học Chuẩn JLPT N5 – N3</h2>
            <p className="mt-3 text-[#6E5E52] text-base">
              Nội dung giáo trình được thiết kế bài bản chia theo từng cấp độ kỹ năng: Từ vựng, Kanji, Ngữ pháp, Đọc hiểu &amp; Nghe hiểu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level N5 */}
            <div className="bg-white rounded-3xl p-7 border border-[#8B6F5A]/20 shadow-lg hover:shadow-xl transition-all relative flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#8B6F5A] text-white text-xs font-extrabold tracking-wider">
                    JLPT N5
                  </span>
                  <span className="text-xs font-bold text-[#8B6F5A] bg-[#F5EFE6] px-2.5 py-1 rounded-lg">Sơ Cấp 1</span>
                </div>
                <h3 className="text-2xl font-black text-[#2C221E] mb-2">Nhập Môn Tiếng Nhật</h3>
                <p className="text-sm text-[#6E5E52] mb-6">
                  Nắm vững Bảng chữ cái Hiragana/Katakana, ~100 Kanji căn bản và các mẫu câu giao tiếp cơ bản hàng ngày.
                </p>
                <ul className="space-y-2.5 text-sm text-[#2C221E] mb-8 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B6F5A]" /> 800+ Từ vựng thông dụng</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B6F5A]" /> 100+ Kanji cơ bản</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B6F5A]" /> 40+ Cấu trúc ngữ pháp</li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full py-3 rounded-xl border-2 border-[#8B6F5A] text-[#8B6F5A] font-bold text-center hover:bg-[#8B6F5A] hover:text-white transition flex items-center justify-center gap-1.5"
              >
                Khám phá N5 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Level N4 */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#C65D4B] shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C65D4B] text-white text-[11px] font-black uppercase tracking-widest px-4 py-0.5 rounded-full shadow-xs">
                Phổ biến nhất
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#C65D4B] text-white text-xs font-extrabold tracking-wider">
                    JLPT N4
                  </span>
                  <span className="text-xs font-bold text-[#C65D4B] bg-[#C65D4B]/10 px-2.5 py-1 rounded-lg">Sơ Cấp 2</span>
                </div>
                <h3 className="text-2xl font-black text-[#2C221E] mb-2">Giao Tiếp Tự Tin</h3>
                <p className="text-sm text-[#6E5E52] mb-6">
                  Mở rộng vốn từ vựng, làm quen với 300+ Kanji và thể kính ngữ, khiêm nhường ngữ trong văn hóa làm việc.
                </p>
                <ul className="space-y-2.5 text-sm text-[#2C221E] mb-8 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C65D4B]" /> 1,500+ Từ vựng JLPT N4</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C65D4B]" /> 300+ Kanji trung cấp</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C65D4B]" /> Nghe &amp; Đọc hiểu hội thoại</li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full py-3 rounded-xl bg-[#C65D4B] text-white font-bold text-center hover:bg-[#b04f3f] transition shadow-md flex items-center justify-center gap-1.5"
              >
                Học N4 Ngay <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Level N3 */}
            <div className="bg-white rounded-3xl p-7 border border-[#8B6F5A]/20 shadow-lg hover:shadow-xl transition-all relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#8B6F5A] text-white text-xs font-extrabold tracking-wider">
                    JLPT N3
                  </span>
                  <span className="text-xs font-bold text-[#8B6F5A] bg-[#F5EFE6] px-2.5 py-1 rounded-lg">Trung Cấp</span>
                </div>
                <h3 className="text-2xl font-black text-[#2C221E] mb-2">Đột Phá Trung Cấp</h3>
                <p className="text-sm text-[#6E5E52] mb-6">
                  Đọc hiểu báo chí, các bài văn dài và nghe hiểu tốc độ thực tế người bản xứ sử dụng.
                </p>
                <ul className="space-y-2.5 text-sm text-[#2C221E] mb-8 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B6F5A]" /> 3,000+ Từ vựng nâng cao</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B6F5A]" /> 650+ Hán tự Kanji N3</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B6F5A]" /> Luyện đề thi thực chiến</li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full py-3 rounded-xl border-2 border-[#8B6F5A] text-[#8B6F5A] font-bold text-center hover:bg-[#8B6F5A] hover:text-white transition flex items-center justify-center gap-1.5"
              >
                Khám phá N3 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Game & JLPT Practice Highlight Section */}
      <section id="special-features" className="py-16 bg-gradient-to-b from-[#F5EFE6]/70 to-[#FDFBF7] border-t border-[#8B6F5A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-extrabold mb-4">
                <Gamepad2 className="w-4 h-4" /> Đấu Trường Game &amp; Quiz 30 Câu
              </div>
              <h2 className="text-3xl font-black text-[#2C221E] sm:text-4xl mb-4">
                Vừa Học Vừa Chơi • Chấm Điểm Chuẩn Format JLPT
              </h2>
              <p className="text-[#6E5E52] text-base leading-relaxed mb-6">
                Phương pháp học tiếng Nhật sinh động kết hợp giữa Game Ghép Thẻ 3D phản xạ 60 giây và hệ thống Quiz 30 câu tự động bao gồm cả dạng bài Sắp xếp sao (★), Điền từ và Âm đọc Kanji.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B6F5A] text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                  <p className="text-sm text-[#2C221E] font-medium">Đấu trường Ghép thẻ 3D rèn luyện phản xạ liên tưởng từ vựng &amp; ý nghĩa cực nhanh</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B6F5A] text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                  <p className="text-sm text-[#2C221E] font-medium">Hệ thống câu hỏi sắp xếp sao (★) độc quyền bám sát cấu trúc đề thi JLPT thực tế</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B6F5A] text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                  <p className="text-sm text-[#2C221E] font-medium">Chấm điểm tự động, giải thích ngữ pháp chi tiết và tích lũy điểm thưởng XP</p>
                </div>
              </div>
            </div>

            {/* Game Preview Mockup UI */}
            <div className="bg-[#1A120E] rounded-3xl p-6 border-2 border-amber-500/40 shadow-2xl space-y-4 text-white">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl">
                    🎮
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Đấu Trường Ghép Thẻ 3D</h4>
                    <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> 60s Phản Xạ Nhanh
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#2A1D17] border border-amber-500/40 rounded-xl text-xs font-black text-amber-300">
                  💎 4/6 Cặp
                </span>
              </div>

              {/* Sample 3D Match Grid Cards Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-gradient-to-b from-[#2B1F19] to-[#1C1410] border border-amber-500/30 text-center">
                  <span className="font-jp font-black text-sm text-amber-200 block">わたし</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase">🇯🇵 Tiếng Nhật</span>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-b from-[#69331C] to-[#3B1C10] border border-amber-400 text-center ring-2 ring-amber-400/50 scale-102 shadow-md">
                  <span className="font-black text-xs text-white block">Tôi (bản thân)</span>
                  <span className="text-[9px] text-amber-300 font-bold uppercase">🇻🇳 Ý Nghĩa</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center opacity-30">
                  <span className="font-jp font-black text-sm text-emerald-400 block">がくせい</span>
                  <span className="text-[9px] text-emerald-300 font-bold uppercase">✓ Đã Ghép</span>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-b from-[#2B1F19] to-[#1C1410] border border-[#4A372E] text-center">
                  <span className="font-jp font-black text-sm text-amber-200 block">せんせい</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase">🇯🇵 Tiếng Nhật</span>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-b from-[#2B1F19] to-[#1C1410] border border-[#4A372E] text-center">
                  <span className="font-black text-xs text-[#F6EDE2] block">Giáo viên</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase">🇻🇳 Ý Nghĩa</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center opacity-30">
                  <span className="font-black text-xs text-emerald-400 block">Sinh viên</span>
                  <span className="text-[9px] text-emerald-300 font-bold uppercase">✓ Đã Ghép</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner */}
      <section className="py-16 bg-[#8B6F5A] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black">Sẵn Sàng Chinh Phục JLPT Ngay Hôm Nay?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Tạo tài khoản miễn phí chỉ trong 30 giây và trải nghiệm phương pháp tự học tiếng Nhật hiệu quả nhất.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/register"
              className="rounded-2xl bg-[#C65D4B] px-9 py-4 font-bold text-white shadow-2xl hover:bg-[#b04f3f] hover:scale-105 transition-all text-lg flex items-center gap-2"
            >
              Đăng ký tài khoản ngay <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LearnerFooter />

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

              {/* Grid 46 characters */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 my-4">
                {(selectedKanaType === "HIRAGANA" ? FULL_HIRAGANA : FULL_KATAKANA).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-2xl border border-[#8B6F5A]/20 text-center shadow-xs hover:scale-105 hover:border-[#C65D4B] transition-transform cursor-pointer"
                  >
                    <span className="text-2xl font-black text-[#2C221E] block">{item.kana}</span>
                    <span className="text-xs font-bold text-[#8B6F5A] uppercase">{item.romaji}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#8B6F5A]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#6E5E52] font-semibold">
                  💡 Đăng ký tài khoản để học phát âm audio và luyện gõ Romaji trực tiếp!
                </span>
                <Link
                  href="/register"
                  onClick={() => setSelectedKanaType(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C65D4B] text-white font-bold text-sm shadow-md hover:bg-[#b04f3f] transition text-center"
                >
                  Bắt đầu học ngay
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

