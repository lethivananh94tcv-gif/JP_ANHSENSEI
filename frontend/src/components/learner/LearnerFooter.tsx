"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import AnhSenseiLogo from "@/components/ui/AnhSenseiLogo";

export default function LearnerFooter() {
  return (
    <footer className="mt-16 border-t border-[#4A3732] bg-gradient-to-br from-[#231917] via-[#2D201D] to-[#191110] py-10 text-[#E5D7CD] relative overflow-hidden shadow-2xl">
      {/* Subtle Japanese Pattern Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FAF3EB' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Glow Orbs */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#D66552]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#8B6F5A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Japanese Watermark */}
      <div className="absolute right-6 bottom-1 text-8xl font-jp font-black text-[#F3DFD3]/[0.03] select-none pointer-events-none tracking-widest hidden sm:block">
        日本語
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-[#4A3732]/60">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <AnhSenseiLogo size="md" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-jp font-black text-lg text-[#FAF3EB] tracking-wider">
                  ANH SENSEI
                </span>
                <span className="text-[10px] font-bold bg-[#3D2C29] text-[#F3DFD3] px-2 py-0.5 rounded-full border border-[#59423E]">
                  JLPT N5 - N3
                </span>
              </div>
              <p className="text-xs text-[#C7B5A8] font-medium">
                Nền tảng tự học tiếng Nhật JLPT thông minh &amp; Lặp ngắt quãng SRS
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[#E5D7CD]">
            <Link href="/levels" className="hover:text-[#F3DFD3] transition-colors">
              Lộ trình JLPT
            </Link>
            <Link href="/vocabularies" className="hover:text-[#F3DFD3] transition-colors">
              Từ vựng
            </Link>
            <Link href="/grammar" className="hover:text-[#F3DFD3] transition-colors">
              Ngữ pháp
            </Link>
            <Link href="/kanji" className="hover:text-[#F3DFD3] transition-colors">
              Hán tự
            </Link>
            <Link href="/flashcards" className="hover:text-[#F3DFD3] transition-colors">
              Flashcard SRS
            </Link>
            <Link href="/ai-tutor" className="hover:text-[#F3DFD3] transition-colors">
              Trợ giảng AI
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#A8988D] font-medium">
          <div>
            © 2026 ANH SENSEI. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#A8988D]">
            <span>Được thiết kế tinh tế theo phong cách Nhật Bản</span>
            <Heart className="w-3.5 h-3.5 fill-[#D66552] text-[#D66552]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
