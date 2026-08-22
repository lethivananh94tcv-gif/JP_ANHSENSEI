"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserProfile } from "@/types/learner";

interface LearnerHeaderProps {
  user?: UserProfile | null;
}

export default function LearnerHeader({ user }: LearnerHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  const navItems = [
    { name: "Trang chủ", href: "/dashboard", active: pathname === "/dashboard" },
    { name: "Từ vựng", href: "/vocabularies", active: pathname.startsWith("/vocabularies"), badge: "N5-N1" },
    { name: "Ngữ pháp", href: "/grammar", active: pathname.startsWith("/grammar"), badge: "N5-N1" },
    { name: "Kanji", href: "/kanji", active: pathname.startsWith("/kanji"), badge: "N5-N1" },
    { name: "Luyện tập", href: "/vocabularies", active: false, badge: "Luyện đề" },
    { name: "Giao tiếp", href: "/communication", active: pathname.startsWith("/communication"), badge: "Mới" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#DED3C8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <span className="w-10 h-10 rounded-2xl bg-[#C65D4B] text-white font-serif font-black text-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            ⛩️
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-black text-lg sm:text-xl tracking-wider text-[#231917]">
              ANH SENSEI
            </span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#8B6F5A]">
              Japanese Desk
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative py-2 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                item.active ? "text-[#C65D4B]" : "text-[#56423E] hover:text-[#231917]"
              }`}
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F5EFE6] text-[#8B6F5A] border border-[#DED3C8]">
                  {item.badge}
                </span>
              )}
              {item.active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C65D4B] rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions & User Avatar Menu */}
        <div className="flex items-center gap-4">
          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-[#F5EFE6] border border-transparent hover:border-[#DED3C8] transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8B6F5A] text-white font-serif font-bold text-sm flex items-center justify-center shadow-sm">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "H"}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#231917] max-w-[120px] truncate">
                  {user?.fullName || "Học viên"}
                </span>
                <span className="text-[10px] text-[#76685F] capitalize">
                  {user?.role === "ADMIN" ? "Quản trị viên" : "Người học"}
                </span>
              </div>
              <span className="text-xs text-[#76685F]">▾</span>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#FFFDF9] rounded-2xl border border-[#DED3C8] shadow-xl p-2 z-50 space-y-1 animate-fade-in">
                <div className="p-3 border-b border-[#DED3C8]/60 bg-[#F5EFE6]/50 rounded-xl">
                  <p className="text-xs font-bold text-[#231917] truncate">{user?.fullName}</p>
                  <p className="text-[10px] text-[#76685F] truncate">{user?.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-[#56423E] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                >
                  🏠 Trang chủ Học viên
                </Link>
                <Link
                  href="/learn"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-[#56423E] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                >
                  📚 Thư viện Bài học JLPT
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-[#56423E] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                >
                  ⚙️ Hồ sơ &amp; Mục tiêu
                </Link>
                {user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-[#C65D4B] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                  >
                    🛡️ Chuyển Sang Admin Portal
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  🚪 Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-xl bg-[#F5EFE6] text-[#231917] font-bold text-lg"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#DED3C8] px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                  item.active ? "bg-[#C65D4B] text-white" : "text-[#56423E] hover:bg-[#F5EFE6]"
                }`}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
