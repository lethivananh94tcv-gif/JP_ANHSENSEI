"use client";

import Link from "next/link";

export default function LearnerFooter() {
  return (
    <footer className="mt-12 border-t border-[#DED3C8] bg-[#FFFDF9] py-8 text-[#76685F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif font-black text-base text-[#231917] tracking-wider">
            ANH SENSEI
          </span>
          <span className="text-[10px] font-medium text-[#76685F]">
            • Nền tảng tự học tiếng Nhật JLPT thông minh
          </span>
        </div>

        <div className="flex items-center gap-6 font-medium text-[#56423E]">
          <Link href="/levels" className="hover:text-[#C65D4B] transition-colors">
            Thư viện bài học
          </Link>
          <span className="hover:text-[#C65D4B] cursor-default transition-colors">
            Về chúng tôi
          </span>
          <span className="hover:text-[#C65D4B] cursor-default transition-colors">
            Điều khoản
          </span>
          <span className="hover:text-[#C65D4B] cursor-default transition-colors">
            Bảo mật
          </span>
          <span className="hover:text-[#C65D4B] cursor-default transition-colors">
            Liên hệ
          </span>
        </div>

        <div className="text-[11px] font-medium text-[#76685F]">
          © 2026 ANH SENSEI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
