"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BeginnerLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BeginnerLetterModal({ isOpen, onClose }: BeginnerLetterModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#2A1B17]/75 backdrop-blur-xs overflow-y-auto">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Container: Hand-crafted 100% Crisp Native Washi Poster matching Image 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-4xl bg-[#FFF8F0] border-4 border-[#F7DFD3] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[94vh]"
        >
          {/* Top Decorative Pink Washi Tape (Exact match to Image 2) */}
          <div className="absolute top-0 left-8 z-30 pointer-events-none select-none">
            <div className="w-36 h-8 bg-[#F8BDC6]/90 border-x border-dashed border-[#DE8693] transform -rotate-3 shadow-xs flex items-center justify-center text-[12px] font-black text-[#8C3440] tracking-wider">
              🌸 JP_ANHSENSEI
            </div>
          </div>

          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-[#FFF3E8] border-b border-[#F2E0CF] relative z-20">
            <div className="flex items-center gap-2 pl-36">
              <span className="text-xs sm:text-sm font-black text-[#C65D4B] flex items-center gap-1.5">
                <span>🌸 Bức Thư Hướng Dẫn Học Tiếng Nhật (Anh Sensei)</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F3E5D8] hover:bg-[#C65D4B] text-[#55413C] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs focus:outline-none shrink-0"
              title="Đóng bức thư"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Hand-Crafted Washi Poster Content Area */}
          <div className="p-4 sm:p-7 overflow-y-auto flex-1 bg-[#FFF8F0] space-y-6 custom-scrollbar text-[#3E2C26] leading-relaxed select-text">
            
            {/* HEADER POSTER CARD: Title + Capybara Mascot + Letter & Note */}
            <div className="relative bg-[#FFF5EB] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
              
              {/* Sakura Postmark Stamp Accent Top Left */}
              <div className="absolute top-4 left-4 w-14 h-14 border-2 border-dashed border-[#F4A8B3] rounded-full flex flex-col items-center justify-center opacity-40 pointer-events-none select-none rotate-12 text-[#C65D4B]">
                <span className="text-lg">🌸</span>
                <span className="text-[8px] font-black uppercase tracking-widest">POST</span>
              </div>

              {/* Title & Mascot Row */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pt-4 sm:pt-0">
                <div className="space-y-1.5 max-w-lg pl-12 sm:pl-10">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#2C1E1A] tracking-tight leading-tight">
                    Gửi bạn,<br />
                    <span className="text-[#C65D4B]">người đang bắt đầu học tiếng Nhật</span>
                  </h1>
                  <p className="text-xs text-[#8A6A5E] font-bold">
                    Bởi <strong>Anh Sensei</strong> — Dành riêng cho người vừa nhập môn
                  </p>
                </div>

                {/* Right Top Capybara + Tilted Paper Note Card */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {/* Capybara holding pink letter */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                    <Image
                      src="/images/capy_illustrations/top_right_postman.png"
                      alt="Capybara postman with envelope"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Note Card */}
                  <div className="bg-[#FFFDF9] border border-[#EBE0D2] p-3 rounded-xl shadow-xs transform sm:rotate-2 max-w-[190px] text-center space-y-0.5">
                    <p className="text-xs font-black text-[#6B4E44]">
                      Học một chút<br />
                      mỗi ngày,<br />
                      <span className="text-[#C65D4B]">tiến bộ mỗi ngày! 🌿</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Letter Content Paragraphs */}
              <div className="space-y-3 text-xs sm:text-sm text-[#4E3B35] pt-1">
                <p className="font-bold text-[#C65D4B] text-sm">Chào bạn,</p>
                <p>
                  Nếu bạn đang đọc những dòng này, có lẽ bạn vừa bắt đầu hành trình học tiếng Nhật.
                </p>
                <p>
                  Có thể lúc này bạn đang nhìn vào những chữ như{" "}
                  <span className="font-bold text-[#C65D4B] bg-[#FFEAE5] px-1.5 py-0.5 rounded border border-[#FFD0C5]">
                    あ、か、さ、た…
                  </span>{" "}
                  và cảm thấy chúng thật xa lạ.
                </p>
                <p>
                  Có thể bạn cũng đang tự hỏi: <em>“Mình nên học từ đâu? Học bảng chữ cái trước hay từ vựng? Bao lâu thì mới đọc được tiếng Nhật?”</em>
                </p>

                <div className="bg-[#FFEFEA] border-l-4 border-[#C65D4B] p-3 rounded-r-xl font-black text-[#C65D4B] text-xs sm:text-sm">
                  Đừng lo. Ai bắt đầu cũng từng như vậy.
                </div>

                <p className="text-xs sm:text-sm text-[#5E4841]">
                  Tiếng Nhật ban đầu có thể trông khá khó vì có <strong>Hiragana</strong>, <strong>Katakana</strong>, <strong>Kanji</strong>, <strong>Romaji</strong>, từ vựng và ngữ pháp. Nhưng bạn không cần học tất cả cùng một lúc. Chỉ cần đi từng bước, đúng thứ tự.
                </p>
              </div>
            </div>

            {/* SECTION 1 & 2: Grid 2 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* SECTION 1: Làm quen với bảng chữ cái */}
              <div className="bg-[#FFFDF9] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 space-y-3 shadow-2xs relative flex flex-col justify-between">
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center gap-2 border-b border-[#F7EFE6] pb-2">
                    <span className="w-7 h-7 rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">1</span>
                    <h3 className="font-black text-[#2C1E1A] text-sm sm:text-base flex items-center gap-1">
                      Làm quen với bảng chữ cái <span className="text-xs">🌸</span>
                    </h3>
                  </div>

                  {/* Content Row: Capybara on left, text on right */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                    {/* Capybara holding あ a */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                      <Image
                        src="/images/capy_illustrations/sec1_holding_a.png"
                        alt="Capybara holding alphabet card"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <ul className="text-xs text-[#5C4841] space-y-2 flex-1">
                      <li>
                        <strong className="text-[#C65D4B]">• Hiragana (ひらがな):</strong> Chữ mềm, dùng để viết từ tiếng Nhật, trợ từ, đuôi động từ, tính từ...
                      </li>
                      <li>
                        <strong className="text-[#C65D4B]">• Katakana (カタカナ):</strong> Chữ cứng, dùng cho từ mượn, tên nước ngoài, thương hiệu...
                      </li>
                      <li>
                        <strong className="text-[#C65D4B]">• Romaji (ローマ字):</strong> Chữ Latin, giúp người mới dễ làm quen với cách đọc.
                      </li>
                    </ul>
                  </div>

                  {/* Example Box */}
                  <div className="mt-3 bg-[#FFF2EE] border border-[#FFD0C5] p-2.5 rounded-xl text-center font-bold text-xs text-[#C65D4B]">
                    Ví dụ: &nbsp; あ ➔ a &nbsp;|&nbsp; か ➔ ka &nbsp;|&nbsp; さ ➔ sa
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F7EFE6] flex items-center justify-between">
                  <Link
                    href="/learn"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#C65D4B] hover:text-[#A03827]"
                  >
                    <span>Vào học Bảng Chữ Cái</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* SECTION 2: Luyện gõ bảng chữ cái */}
              <div className="bg-[#FFFDF9] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 space-y-3 shadow-2xs relative flex flex-col justify-between">
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center gap-2 border-b border-[#F7EFE6] pb-2">
                    <span className="w-7 h-7 rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">2</span>
                    <h3 className="font-black text-[#2C1E1A] text-sm sm:text-base">Luyện gõ bảng chữ cái</h3>
                  </div>

                  <p className="text-xs text-[#5C4841] pt-2">
                    Website sẽ đưa chữ Nhật và bạn nhập cách đọc bằng Romaji.
                  </p>

                  {/* Laptop Capybara + Input Visual */}
                  <div className="flex items-center justify-between gap-2 py-1">
                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src="/images/capy_illustrations/sec2_laptop.png"
                        alt="Capybara typing on laptop"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="bg-[#FFF4F0] border border-[#FFD0C5] p-3 rounded-xl text-center space-y-1 flex-1">
                      <div className="text-xs font-bold text-[#6D534B]">Ví dụ:</div>
                      <div className="flex items-center justify-center gap-2 text-base font-black text-[#2C1E1A]">
                        <span>あ</span>
                        <span className="text-[#C65D4B]">➔</span>
                        <span className="bg-white border border-[#F4A8B3] px-3 py-0.5 rounded-lg text-[#C65D4B] shadow-2xs">a</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-[#6B544B] text-center">
                    Cách này giúp bạn: <span className="text-[#C65D4B]">Nhìn chữ ➔ nhớ mặt chữ ➔ nhớ cách đọc ➔ tự gõ lại.</span>
                  </p>

                  {/* Target Pill */}
                  <div className="mt-2 bg-[#FFF0EC] border border-[#FFC7BB] p-2.5 rounded-xl text-[11px] font-bold text-[#7A574C] flex items-start gap-1.5">
                    <span className="text-sm">🎯</span>
                    <span>
                      <strong className="text-[#C65D4B]">Mục tiêu:</strong> Nhận diện, đọc và gõ được Hiragana, Katakana một cách tự tin mà không cần tra cứu.
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F7EFE6] flex items-center justify-between">
                  <Link
                    href="/flashcards"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#C65D4B] hover:text-[#A03827]"
                  >
                    <span>Luyện Gõ Romaji Ngay</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

            {/* SECTION 3: Bắt đầu bài học đầu tiên - Từ vựng */}
            <div className="bg-[#FFFDF9] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-[#F7EFE6] pb-2">
                <span className="w-7 h-7 rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">3</span>
                <h3 className="font-black text-[#2C1E1A] text-sm sm:text-base">
                  Bắt đầu bài học đầu tiên — Từ vựng
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#6B544B]">
                Từ vựng là nền tảng rất quan trọng. Bạn có thể học theo 3 cách:
              </p>

              {/* 3 Study Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                
                {/* Method 1 */}
                <div className="bg-[#FFF8F2] border border-[#F5DFD3] p-4 rounded-xl space-y-2.5 text-center flex flex-col items-center justify-between shadow-2xs">
                  <span className="px-3 py-0.5 rounded-full bg-[#E55B49] text-white font-black text-[11px] shadow-2xs">
                    1. Luyện gõ
                  </span>
                  
                  <div className="relative w-16 h-16 shrink-0 my-1">
                    <Image
                      src="/images/capy_illustrations/sec3_1_laptop.png"
                      alt="Capybara typing hello"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="bg-white border border-[#FFD0C5] px-3 py-1 rounded-lg text-xs font-extrabold text-[#C65D4B]">
                    こんにちは<br />
                    <span className="text-[10px] text-[#7A6A60] font-bold">konnichiwa</span>
                  </div>

                  <p className="text-[11px] text-[#6E554C] leading-snug">
                    Website đưa từ tiếng Nhật, bạn nhập cách đọc. Giúp bạn nhớ mặt chữ + cách đọc.
                  </p>
                </div>

                {/* Method 2 */}
                <div className="bg-[#FFF8F2] border border-[#F5DFD3] p-4 rounded-xl space-y-2.5 text-center flex flex-col items-center justify-between shadow-2xs">
                  <span className="px-3 py-0.5 rounded-full bg-[#E55B49] text-white font-black text-[11px] shadow-2xs">
                    2. Game ghép từ
                  </span>

                  <div className="relative w-16 h-16 shrink-0 my-1">
                    <Image
                      src="/images/capy_illustrations/sec3_2_puzzle.png"
                      alt="Capybara with puzzle"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="bg-white border border-[#FFD0C5] px-3 py-1 rounded-lg text-xs font-extrabold text-[#C65D4B]">
                    学生 &nbsp;+&nbsp; い
                  </div>

                  <p className="text-[11px] text-[#6E554C] leading-snug">
                    Ghép các từ hoặc thành phần phù hợp để tạo thành đáp án đúng. Học mà chơi, nhớ lâu hơn!
                  </p>
                </div>

                {/* Method 3 */}
                <div className="bg-[#FFF8F2] border border-[#F5DFD3] p-4 rounded-xl space-y-2.5 text-center flex flex-col items-center justify-between shadow-2xs">
                  <span className="px-3 py-0.5 rounded-full bg-[#E55B49] text-white font-black text-[11px] shadow-2xs">
                    3. Học kiểu Flashcard
                  </span>

                  <div className="relative w-16 h-16 shrink-0 my-1">
                    <Image
                      src="/images/capy_illustrations/sec3_3_flashcard.png"
                      alt="Capybara holding flashcard"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="bg-white border border-[#FFD0C5] px-2 py-1 rounded-lg text-[11px] font-extrabold text-[#2C1E1A]">
                    学生<br />
                    <span className="text-[10px] text-[#C65D4B]">（がくせい）</span><br />
                    <span className="text-[10px] text-[#6E554C]">Học sinh</span>
                  </div>

                  <p className="text-[11px] text-[#6E554C] leading-snug">
                    Học theo thẻ nhớ (giống Quizlet). Nhìn từ ➔ nghĩ nghĩa ➔ kiểm tra đáp án. Ôn lại cho đến khi thuộc!
                  </p>
                </div>

              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/vocabularies"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-black text-[#C65D4B] hover:text-[#A03827]"
                >
                  <span>Kho Từ Vựng N5</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* SECTION 4 & 5: Grid 2 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* SECTION 4: Học ngữ pháp */}
              <div className="bg-[#FFFDF9] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 space-y-3 shadow-2xs relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 border-b border-[#F7EFE6] pb-2">
                    <span className="w-7 h-7 rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">4</span>
                    <h3 className="font-black text-[#2C1E1A] text-sm sm:text-base">Học ngữ pháp</h3>
                  </div>

                  {/* Content: Text left, Capybara with book & speech bubble right */}
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <div className="space-y-2 flex-1">
                      <div className="bg-[#FAF0E6] p-2.5 rounded-xl text-xs font-extrabold text-[#5C463E] leading-snug">
                        Hiểu cấu trúc ➔ Ý nghĩa ➔ Cách dùng ➔ Ví dụ. Sau đó tự đặt câu của riêng mình.
                      </div>

                      <div className="bg-[#FFF2EE] border border-[#FFD0C5] p-2.5 rounded-xl space-y-1 text-xs text-[#6D534B]">
                        <span className="font-black text-[#C65D4B] flex items-center gap-1">
                          🎯 Mục tiêu:
                        </span>
                        <p className="text-[11px] font-bold">Sau mỗi bài, bạn trả lời được:</p>
                        <ul className="list-disc list-inside text-[11px] font-semibold text-[#6A524A] space-y-0.5 pl-1">
                          <li>Mẫu ngữ pháp này dùng khi nào?</li>
                          <li>Tôi có thể tự đặt một câu với nó không?</li>
                        </ul>
                      </div>
                    </div>

                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src="/images/capy_illustrations/sec4_grammar.png"
                        alt="Capybara reading book with speech bubble"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F7EFE6] flex items-center justify-between">
                  <Link
                    href="/grammar"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#C65D4B] hover:text-[#A03827]"
                  >
                    <span>Học Ngữ Pháp N5</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* SECTION 5: Bắt đầu học Kanji */}
              <div className="bg-[#FFFDF9] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 space-y-3 shadow-2xs relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 border-b border-[#F7EFE6] pb-2">
                    <span className="w-7 h-7 rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">5</span>
                    <h3 className="font-black text-[#2C1E1A] text-sm sm:text-base">Bắt đầu học Kanji</h3>
                  </div>

                  <p className="text-xs text-[#5C4841] pt-1">
                    Người Nhật dùng Kanji rất nhiều khi viết. Hãy học Kanji thông qua từ vựng thực tế.
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    {/* Capybara writing 学 */}
                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src="/images/capy_illustrations/sec5_kanji.png"
                        alt="Capybara writing Kanji学"
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Kanji Example List */}
                    <div className="bg-[#FFF4F0] border border-[#FFD0C5] p-2.5 rounded-xl space-y-1 text-xs flex-1">
                      <div className="font-bold text-[#C65D4B]">
                        • <strong>学生</strong>（がくせい） ➔ học sinh, sinh viên
                      </div>
                      <div className="font-bold text-[#C65D4B]">
                        • <strong>学校</strong>（がっこう） ➔ trường học
                      </div>
                      <div className="font-bold text-[#C65D4B]">
                        • <strong>大学</strong>（だいがく） ➔ đại học
                      </div>
                      <p className="text-[10px] text-[#7A645D] italic font-semibold text-right pt-0.5">
                        Học như vậy sẽ nhớ lâu hơn!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F7EFE6] flex items-center justify-between">
                  <Link
                    href="/kanji"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#C65D4B] hover:text-[#A03827]"
                  >
                    <span>Vào học Kanji N5</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

            {/* SECTION 6: Lộ trình tổng thể */}
            <div className="bg-[#FFFDF9] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-[#F7EFE6] pb-2">
                <span className="w-7 h-7 rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">6</span>
                <h3 className="font-black text-[#2C1E1A] text-sm sm:text-base">Lộ trình tổng thể</h3>
              </div>

              {/* Step Flow Nodes matching image 2 */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 text-center">
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EE] border-2 border-[#F4A8B3] flex items-center justify-center text-sm font-black text-[#C65D4B] shadow-2xs">あ</div>
                  <span className="text-xs font-bold text-[#6D534B]">Bảng chữ cái</span>
                </div>

                <span className="text-[#C65D4B] font-black">➔</span>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EE] border-2 border-[#F4A8B3] flex items-center justify-center text-sm font-black text-[#C65D4B] shadow-2xs">⌨️</div>
                  <span className="text-xs font-bold text-[#6D534B]">Luyện gõ</span>
                </div>

                <span className="text-[#C65D4B] font-black">➔</span>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EE] border-2 border-[#F4A8B3] flex items-center justify-center text-sm font-black text-[#C65D4B] shadow-2xs">📖</div>
                  <span className="text-xs font-bold text-[#6D534B]">Từ vựng</span>
                </div>

                <span className="text-[#C65D4B] font-black">➔</span>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EE] border-2 border-[#F4A8B3] flex items-center justify-center text-sm font-black text-[#C65D4B] shadow-2xs">✍️</div>
                  <span className="text-xs font-bold text-[#6D534B]">Ngữ pháp</span>
                </div>

                <span className="text-[#C65D4B] font-black">➔</span>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EE] border-2 border-[#F4A8B3] flex items-center justify-center text-sm font-black text-[#C65D4B] shadow-2xs">漢</div>
                  <span className="text-xs font-bold text-[#6D534B]">Kanji</span>
                </div>

                <span className="text-[#C65D4B] font-black">➔</span>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EE] border-2 border-[#F4A8B3] flex items-center justify-center text-sm font-black text-[#C65D4B] shadow-2xs">🎯</div>
                  <span className="text-xs font-bold text-[#6D534B]">Ôn tập</span>
                </div>
              </div>

              {/* Bottom Quote Banner with Small Capybara */}
              <div className="bg-[#FFEFEA] border border-[#FFD0C5] p-3 rounded-xl flex items-center justify-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src="/images/capy_illustrations/sec6_small.png"
                    alt="Capybara"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs font-black text-[#C65D4B]">
                  Mỗi ngày một chút, học đều đặn, bạn sẽ tiến bộ nhanh hơn bạn nghĩ! 🌿
                </p>
              </div>
            </div>

            {/* SECTION 7: Có nhất thiết phải đi học trung tâm? */}
            <div className="bg-[#FFFDF9] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-[#F7EFE6] pb-2">
                <span className="w-7 h-7 rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">7</span>
                <h3 className="font-black text-[#2C1E1A] text-sm sm:text-base">
                  Có nhất thiết phải đi học trung tâm?
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-2 text-xs text-[#5C4841] flex-1">
                  <p>
                    Ở trình độ <strong>N5, N4</strong>, bạn hoàn toàn có thể tự học nếu có:
                  </p>
                  <ul className="list-disc list-inside text-[#6E554C] space-y-1 font-semibold pl-2">
                    <li>Lộ trình rõ ràng</li>
                    <li>Thời gian học đều đặn</li>
                    <li>Khả năng ôn từ vựng & Kanji thường xuyên</li>
                  </ul>
                  <p className="pt-1 text-[#654C43] leading-relaxed">
                    Tự học giúp bạn học theo tốc độ của chính mình. Nhưng nếu lên N3 và cảm thấy khó, bạn có thể học thêm giáo viên hoặc trung tâm!
                  </p>
                </div>

                {/* Capybara drinking boba tea */}
                <div className="relative w-24 h-28 shrink-0">
                  <Image
                    src="/images/capy_illustrations/sec7_boba.png"
                    alt="Capybara drinking boba tea"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 8 & FINAL QUOTE SIGNATURE */}
            <div className="bg-[#FFF5EB] border-2 border-dashed border-[#F4A8B3] rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs relative overflow-hidden">
              
              <div className="space-y-1 text-center">
                <span className="w-8 h-8 mx-auto rounded-full bg-[#E55B49] text-white flex items-center justify-center font-black text-sm shadow-xs">8</span>
                <h3 className="font-black text-[#2C1E1A] text-base sm:text-lg">
                  Và bây giờ, hãy bắt đầu nhé!
                </h3>
                <p className="text-xs text-[#7A645D] font-bold">
                  Đừng chờ đến khi "sẵn sàng". Hãy bắt đầu từ bước nhỏ nhất ngay bây giờ!
                </p>
              </div>

              {/* 1..7 Flow Steps */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-extrabold text-[#6D534B] border-y border-[#F7EFE6] py-3">
                <span className="w-5 h-5 rounded-full bg-[#E55B49] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Hiragana</span>
                <span className="text-[#C65D4B]">➔</span>

                <span className="w-5 h-5 rounded-full bg-[#E55B49] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Katakana</span>
                <span className="text-[#C65D4B]">➔</span>

                <span className="w-5 h-5 rounded-full bg-[#E55B49] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Luyện gõ</span>
                <span className="text-[#C65D4B]">➔</span>

                <span className="w-5 h-5 rounded-full bg-[#E55B49] text-white flex items-center justify-center text-[10px]">4</span>
                <span>Bài học 1 (Từ vựng)</span>
                <span className="text-[#C65D4B]">➔</span>

                <span className="w-5 h-5 rounded-full bg-[#E55B49] text-white flex items-center justify-center text-[10px]">5</span>
                <span>Ngữ pháp</span>
                <span className="text-[#C65D4B]">➔</span>

                <span className="w-5 h-5 rounded-full bg-[#E55B49] text-white flex items-center justify-center text-[10px]">6</span>
                <span>Kanji</span>
                <span className="text-[#C65D4B]">➔</span>

                <span className="w-5 h-5 rounded-full bg-[#E55B49] text-white flex items-center justify-center text-[10px]">7</span>
                <span>Ôn tập</span>
              </div>

              {/* Final Quote + Capybara Envelope Signature Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                
                {/* Capybara hugging envelope */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                  <Image
                    src="/images/capy_illustrations/sec8_hug_letter.png"
                    alt="Capybara hugging letter"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-3 flex-1 text-xs sm:text-sm text-[#4E3B35]">
                  <p className="italic leading-relaxed">
                    “Học một chữ. Nhớ một từ. Hiểu một mẫu câu.<br />
                    Viết được một Kanji.<br />
                    Cứ như vậy, từng chút một.<br />
                    Rồi sẽ có một ngày bạn nhìn lại những chữ <strong>あ、か、さ</strong> mà ngày đầu tiên từng khiến bạn bối rối, và nhận ra:<br />
                    <span className="font-bold text-[#C65D4B]">“À, hóa ra mình đã đi được xa đến vậy.”</span>
                  </p>
                  <p className="font-extrabold text-[#C65D4B]">
                    Chúc bạn học thật vui, và đừng bỏ cuộc nhé! 🌸
                  </p>
                </div>
              </div>

              {/* Bottom Envelope Signature Badge */}
              <div className="flex justify-end pt-2">
                <div className="bg-[#FFEAE5] border border-[#FFC7BB] px-5 py-2 rounded-xl text-xs font-black text-[#C65D4B] shadow-2xs flex items-center gap-2">
                  <span>✉️</span>
                  <span>— ANH SENSEI —</span>
                </div>
              </div>

            </div>

          </div>

          {/* Action Footer Bar */}
          <div className="bg-[#FAF2E8] border-t border-[#EAD4C0] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-20">
            <div className="flex items-center gap-2 text-xs text-[#76685F] font-bold">
              <Sparkles className="w-4 h-4 text-[#C65D4B]" />
              <span>Cùng tiến bộ mỗi ngày với <strong>JP_ANHSENSEI</strong> 🌸</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end">
              <Link
                href="/flashcards"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFF5F2] border border-[#FFC4B7] text-[#C65D4B] font-extrabold text-xs transition-all shadow-2xs"
              >
                ⌨️ Luyện Gõ Kana
              </Link>
              <Link
                href="/vocabularies"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFF5F2] border border-[#FFC4B7] text-[#C65D4B] font-extrabold text-xs transition-all shadow-2xs"
              >
                📖 Từ Vựng N5
              </Link>
              <Link
                href="/learn"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs shadow-md shadow-[#C65D4B]/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>🚀 Bắt Đầu Học Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
