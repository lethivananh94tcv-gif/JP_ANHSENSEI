"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  ShieldCheck
} from "lucide-react";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<{ name?: string; email?: string; role?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] font-sans selection:bg-[#C65D4B]/20 selection:text-[#C65D4B]">
      {/* Logged in User Notification Bar (If applicable) */}
      {currentUser && (
        <div className="bg-[#8B6F5A] text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-3">
          <span>👋 Chào mừng <strong>{currentUser.name || currentUser.email}</strong>! Bạn đang ở Trang chủ Khách.</span>
          <Link
            href={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"}
            className="inline-flex items-center gap-1 bg-[#C65D4B] hover:bg-[#b04f3f] text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors shadow-sm"
          >
            Vào Bảng điều khiển của bạn <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FDFBF7]/85 border-b border-[#8B6F5A]/15 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] to-[#C65D4B] flex items-center justify-center text-white shadow-md shadow-[#C65D4B]/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-extrabold text-xl tracking-wider">学</span>
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

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6E5E52]">
            <a href="#levels" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#8B6F5A]" /> Cấp độ JLPT
            </a>
            <a href="#features" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-[#8B6F5A]" /> Flashcard SRS
            </a>
            <a href="#ai-tutor" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#C65D4B]" /> Trợ giảng AI
            </a>
            <a href="#about" className="hover:text-[#C65D4B] transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8B6F5A]" /> Về ANH SENSEI
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <Link
                href={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="flex items-center gap-2 rounded-xl bg-[#8B6F5A] px-5 py-2.5 font-semibold text-white hover:bg-[#735a47] transition shadow-md shadow-[#8B6F5A]/20"
              >
                <User className="w-4 h-4" /> Bảng điều khiển
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-5 py-2.5 font-semibold text-[#8B6F5A] hover:bg-[#8B6F5A]/10 transition text-sm"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-[#8B6F5A] to-[#C65D4B] px-5 py-2.5 font-semibold text-white hover:opacity-95 transition text-sm shadow-md shadow-[#C65D4B]/20 flex items-center gap-1.5"
                >
                  Đăng ký miễn phí <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFE6] border border-[#8B6F5A]/20 text-[#8B6F5A] text-xs sm:text-sm font-bold shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C65D4B]" />
              <span>Nền Tảng Tự Học Tiếng Nhật Thông Minh (JLPT N5 – N3)</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight text-[#2C221E] leading-[1.15]"
            >
              Chinh Phục Tiếng Nhật Với <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#8B6F5A] via-[#C65D4B] to-[#8B6F5A] bg-clip-text text-transparent">
                Thuật Toán SRS &amp; AI Tutor 24/7
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#6E5E52] leading-relaxed max-w-2xl mx-auto"
            >
              Ghi nhớ từ vựng &amp; Hán tự lâu gấp 3 lần bằng <strong>Spaced Repetition (SRS)</strong>, làm bài Quiz chấm điểm tự động và được <strong>Trợ giảng AI RAG</strong> giải đáp tức thì.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/register"
                className="w-full sm:w-auto rounded-2xl bg-[#C65D4B] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#C65D4B]/30 hover:bg-[#b04f3f] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" /> Bắt đầu học miễn phí
              </Link>
              <a
                href="#levels"
                className="w-full sm:w-auto rounded-2xl bg-white border border-[#8B6F5A]/25 px-8 py-4 text-base font-bold text-[#8B6F5A] shadow-md hover:bg-[#F5EFE6]/60 transition flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-[#8B6F5A]" /> Khám phá các Cấp độ
              </a>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-sm text-center">
                <div className="text-2xl font-black text-[#8B6F5A]">N5 – N3</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Cấp độ giáo trình</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-sm text-center">
                <div className="text-2xl font-black text-[#C65D4B]">SRS Algorithm</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Thuật toán ôn tập</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-sm text-center">
                <div className="text-2xl font-black text-[#8B6F5A]">Quiz Auto</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Tự động chấm điểm</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#8B6F5A]/15 shadow-sm text-center">
                <div className="text-2xl font-black text-[#C65D4B]">24/7 AI Tutor</div>
                <div className="text-xs font-semibold text-[#6E5E52]">Giải đáp ngữ pháp</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* JLPT Levels Section */}
      <section id="levels" className="py-16 bg-[#F5EFE6]/60 border-y border-[#8B6F5A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-[#8B6F5A] sm:text-4xl">Lộ Trình Học Chuẩn JLPT N5 – N3</h2>
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
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C65D4B] text-white text-[11px] font-black uppercase tracking-widest px-4 py-0.5 rounded-full shadow-sm">
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

      {/* Core Features Grid */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-[#8B6F5A] sm:text-4xl">Tính Năng Đột Phá Hỗ Trợ Tự Học</h2>
            <p className="mt-3 text-[#6E5E52] text-base">
              Mọi công cụ bạn cần để học nhanh hơn, nhớ lâu hơn và không bao giờ chán nản.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#8B6F5A]/15 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] text-[#8B6F5A] flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#2C221E] mb-2">Flashcard SRS</h3>
              <p className="text-sm text-[#6E5E52] leading-relaxed">
                Hệ thống tự động tính toán khoảng thời gian nhắc nhở ôn tập (Again, Hard, Good, Easy) dựa trên thuật toán Spaced Repetition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#8B6F5A]/15 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] text-[#C65D4B] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#2C221E] mb-2">Quiz Tự Động Chấm</h3>
              <p className="text-sm text-[#6E5E52] leading-relaxed">
                Bài kiểm tra kiến thức tức thì, lưu snapshot bài làm và giải thích đáp án chi tiết giúp bạn sửa sai ngay lập tức.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#8B6F5A]/15 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] text-[#8B6F5A] flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-[#C65D4B]" />
              </div>
              <h3 className="text-lg font-bold text-[#2C221E] mb-2">Trợ Giảng AI (RAG)</h3>
              <p className="text-sm text-[#6E5E52] leading-relaxed">
                Hỏi đáp trực tiếp với AI Tutor được huấn luyện từ giáo trình chuẩn. Tra từ, phân tích ngữ pháp 24/7.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#8B6F5A]/15 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] text-[#8B6F5A] flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-[#C65D4B]" />
              </div>
              <h3 className="text-lg font-bold text-[#2C221E] mb-2">Theo Dõi Streak</h3>
              <p className="text-sm text-[#6E5E52] leading-relaxed">
                Duy trì chuỗi ngày học tập liên tục, theo dõi tiến độ từng kỹ năng và nhận báo cáo hoàn thành cá nhân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tutor Highlight Section */}
      <section id="ai-tutor" className="py-16 bg-gradient-to-b from-[#F5EFE6]/70 to-[#FDFBF7] border-t border-[#8B6F5A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-extrabold mb-4">
                <Bot className="w-4 h-4" /> AI Tutor 24/7
              </div>
              <h2 className="text-3xl font-black text-[#2C221E] sm:text-4xl mb-4">
                Không Còn Thắc Mắc Ngữ Pháp Nào Chưa Được Giải Đáp
              </h2>
              <p className="text-[#6E5E52] text-base leading-relaxed mb-6">
                Khi học tiếng Nhật, bạn thường gặp các mẫu ngữ pháp dễ nhầm lẫn. Với Trợ giảng AI tích hợp RAG (Retrieval-Augmented Generation), bạn có thể hỏi bất kỳ thắc mắc nào và nhận câu trả lời kèm ví dụ chuẩn xác trong giáo trình.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B6F5A] text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                  <p className="text-sm text-[#2C221E] font-medium">Giải thích phân biệt ngữ pháp tương tự (vd: ～てから vs ～あとで)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B6F5A] text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                  <p className="text-sm text-[#2C221E] font-medium">Cung cấp ví dụ thực tế kèm phiên âm Furigana &amp; dịch nghĩa Việt</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B6F5A] text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                  <p className="text-sm text-[#2C221E] font-medium">Phản hồi an toàn, bảo mật và bám sát nội dung JLPT</p>
                </div>
              </div>
            </div>

            {/* AI Mockup UI */}
            <div className="bg-white rounded-3xl p-6 border border-[#8B6F5A]/20 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#8B6F5A]/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B6F5A] to-[#C65D4B] text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C221E] text-sm">ANH SENSEI AI Tutor</h4>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sẵn sàng giải đáp 24/7
                  </span>
                </div>
              </div>

              {/* Chat Bubble Learner */}
              <div className="flex justify-end">
                <div className="bg-[#8B6F5A] text-white p-3.5 rounded-2xl rounded-tr-none text-sm max-w-xs shadow-sm">
                  Cho mình hỏi ngữ pháp <strong>～ために</strong> khác gì với <strong>～ように</strong> ạ?
                </div>
              </div>

              {/* Chat Bubble AI */}
              <div className="flex justify-start items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C65D4B] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="bg-[#F5EFE6] text-[#2C221E] p-4 rounded-2xl rounded-tl-none text-sm space-y-2 border border-[#8B6F5A]/15 shadow-sm max-w-md">
                  <p className="font-semibold text-[#C65D4B]">Chào bạn! Cả 2 đều chỉ mục đích, nhưng:</p>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#6E5E52]">
                    <li><strong>～ために:</strong> Dùng khi vế trước thể hiện ý chí (động từ ý chí). Ví dụ: 日本へ行くために (Để đi Nhật).</li>
                    <li><strong>～ように:</strong> Dùng khi vế trước là trạng thái hoặc khả năng. Ví dụ: 忘れないように (Để không bị quên).</li>
                  </ul>
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
      <footer className="bg-[#2C221E] text-white/70 py-12 border-t border-white/10 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#C65D4B] text-white flex items-center justify-center font-bold">学</div>
              <span className="text-xl font-black text-white">ANH SENSEI</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Nền tảng tự học tiếng Nhật thông minh từ JLPT N5 đến N3 tích hợp Flashcard Spaced Repetition, Quiz tự động và Trợ giảng AI.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Liên Kết Nhanh</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#levels" className="hover:text-white transition">Các cấp độ N5 - N3</a></li>
              <li><a href="#features" className="hover:text-white transition">Thuật toán SRS Flashcard</a></li>
              <li><a href="#ai-tutor" className="hover:text-white transition">Trợ giảng AI RAG</a></li>
              <li><Link href="/login" className="hover:text-white transition">Đăng nhập hệ thống</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Thông Tin Bản Quyền</h4>
            <p className="text-xs text-white/60 mb-2">© 2026 ANH SENSEI. All rights reserved.</p>
            <p className="text-xs text-white/50">Phát triển với Next.js, Spring Boot &amp; Supabase PostgreSQL.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
