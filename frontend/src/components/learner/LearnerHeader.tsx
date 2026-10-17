"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserProfile } from "@/types/learner";
import { Sparkles, BookOpen, Languages, PenTool, Flame, Bot, Home, User, LogOut, Shield, Menu, X, ChevronDown, Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import AnhSenseiLogo from "@/components/ui/AnhSenseiLogo";
import JlptNoticeModal from "@/components/shared/JlptNoticeModal";
import { apiClient, getApiBaseUrl } from "@/lib/api/client";

interface LearnerHeaderProps {
  user?: UserProfile | null;
}

export default function LearnerHeader({ user: propUser }: LearnerHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showJlptNotice, setShowJlptNotice] = useState(false);
  const [localUser, setLocalUser] = useState<UserProfile | null>(null);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [customEmoji, setCustomEmoji] = useState<string | null>(null);

  // Preload login page as soon as header mounts for instant navigation
  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  // Synchronize stored user profile & avatar from localStorage & backend
  const syncUser = useCallback(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    const savedUserRaw = localStorage.getItem("user");

    if (!token) {
      setLocalUser(null);
      return;
    }

    if (savedUserRaw) {
      try {
        const parsed = JSON.parse(savedUserRaw);
        if (parsed && (parsed.email || parsed.fullName)) {
          setLocalUser(parsed);
        }
      } catch (e) {
        console.error("Lỗi đọc user từ localStorage:", e);
      }
    }

    // Refresh profile in background if token exists
    apiClient<UserProfile>("/learner/profile")
      .then((res) => {
        if (res.data && res.data.email) {
          setLocalUser((prev) => ({ ...prev, ...res.data }));
          try {
            const currentRaw = localStorage.getItem("user");
            const merged = currentRaw ? { ...JSON.parse(currentRaw), ...res.data } : res.data;
            localStorage.setItem("user", JSON.stringify(merged));
          } catch {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        }
      })
      .catch(() => {});

    const savedAvatar = localStorage.getItem("user_avatar");
    if (savedAvatar) {
      setCustomAvatar(savedAvatar);
    }
    const savedEmoji = localStorage.getItem("user_emoji");
    if (savedEmoji) {
      setCustomEmoji(savedEmoji);
    }
  }, []);

  useEffect(() => {
    syncUser();

    const handleStorageChange = () => {
      syncUser();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-state-changed", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-state-changed", handleStorageChange);
    };
  }, [syncUser]);

  const rawUser = propUser || localUser;
  const isUserValid = Boolean(rawUser && (rawUser.email || rawUser.fullName));
  const activeUser = isUserValid ? rawUser : null;

  const handleLogout = () => {
    // 1. Immediate visual feedback
    setIsLoggingOut(true);
    setIsUserMenuOpen(false);

    // 2. Read refresh token before clearing for asynchronous revocation
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;

    // 3. Clear auth state and storage immediately
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_avatar");
      localStorage.removeItem("user_emoji");
      document.cookie = "access_token=; path=/; max-age=0";
      document.cookie = "auth_token=; path=/; max-age=0";
      sessionStorage.clear();
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: null }));
    }
    setLocalUser(null);

    // 4. Non-blocking asynchronous token revocation on backend
    if (refreshToken) {
      try {
        const apiBaseUrl = getApiBaseUrl();
        fetch(`${apiBaseUrl}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
          keepalive: true,
        }).catch(() => {});
      } catch (e) {
        // Non-blocking, ignore error
      }
    }

    // 5. Instant navigation with Next.js router
    router.replace("/login");

    // Safety fallback: if router takes longer than 100ms in dev, force instant window redirect
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }, 100);

    return () => clearTimeout(timer);
  };

  const navItems = [
    { name: "Trang chủ", href: "/", active: pathname === "/" || pathname === "/dashboard", icon: Home },
    { name: "Từ vựng", href: "/vocabularies", active: pathname.startsWith("/vocabularies"), icon: Languages },
    { name: "Chia Động Từ ⚡", href: "/verbs", active: pathname.startsWith("/verbs"), icon: Zap },
    { name: "Ngữ pháp", href: "/grammar", active: pathname.startsWith("/grammar"), icon: BookOpen },
    { name: "Kanji", href: "/kanji", active: pathname.startsWith("/kanji"), icon: PenTool },
    { name: "Luyện JLPT", href: "/jlpt-practice", active: pathname.startsWith("/jlpt-practice") || pathname.startsWith("/flashcards"), icon: Flame, badge: "JLPT" },
  ];

  // Synchronized User Full Name Display
  const userName = activeUser?.fullName || activeUser?.email?.split("@")[0] || "";
  const userEmail = activeUser?.email || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";
  const avatarImage = activeUser?.avatarUrl || customAvatar;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFDF9]/90 backdrop-blur-md border-b border-[#DED3C8] shadow-xs select-none">
      <JlptNoticeModal isOpen={showJlptNotice} onClose={() => setShowJlptNotice(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo with Dynamic Cat Mascot Icon */}
        <Link href="/dashboard" className="flex items-center gap-3 group relative cursor-pointer">
          <AnhSenseiLogo size="md" />

          <div className="flex flex-col">
            <span className="font-serif font-black text-lg sm:text-xl tracking-wider text-[#231917] group-hover:text-[#C65D4B] transition-colors">
              ANH SENSEI
            </span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#C65D4B] group-hover:text-[#8B6F5A] transition-colors">
              日本語学習 • JLPT N5-N3
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const IconComp = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition-colors relative py-2 ${
                  item.active
                    ? "text-[#C65D4B]"
                    : "text-[#56423E] hover:text-[#C65D4B]"
                }`}
              >
                <IconComp className={`w-4 h-4 ${item.active ? "text-[#C65D4B]" : "text-[#8B6F5A]"}`} />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Hot
                  </span>
                )}
                {item.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C65D4B] rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: User Avatar Menu or Guest Auth Buttons */}
        <div className="flex items-center gap-3">
          {activeUser ? (
            /* Logged in: Profile avatar & Dropdown Menu */
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                onMouseEnter={() => router.prefetch("/login")}
                className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-[#F5EFE6] border border-transparent hover:border-[#DED3C8] transition-all cursor-pointer"
              >
                {avatarImage ? (
                  <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-[#DED3C8]">
                    <img src={avatarImage} alt="User Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : customEmoji ? (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C65D4B] to-[#FF8C78] text-white flex items-center justify-center text-lg shadow-xs">
                    {customEmoji}
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B6F5A] to-[#C65D4B] text-white font-serif font-black text-sm flex items-center justify-center shadow-xs">
                    {userInitial}
                  </div>
                )}

                {/* SYNCHRONIZED DISPLAY: Always show user's actual name */}
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-extrabold text-[#231917] max-w-[130px] truncate">
                    {userName}
                  </span>
                  <span className="text-[10px] font-bold text-[#8B6F5A] max-w-[130px] truncate">
                    @{userName.toLowerCase()}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#76685F]" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-[#FFFDF9] rounded-2xl border border-[#DED3C8] shadow-xl p-2 z-50 space-y-1 animate-fade-in text-left">
                  <div className="p-3 border-b border-[#DED3C8]/60 bg-[#F5EFE6]/50 rounded-xl flex items-center gap-3">
                    {avatarImage ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#DED3C8]">
                        <img src={avatarImage} alt="User Avatar" className="w-full h-full object-cover" />
                      </div>
                    ) : customEmoji ? (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C65D4B] to-[#FF8C78] text-white flex items-center justify-center text-xl shrink-0">
                        {customEmoji}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B6F5A] to-[#C65D4B] text-white font-serif font-black text-base flex items-center justify-center shrink-0">
                        {userInitial}
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-xs font-extrabold text-[#231917] truncate">{userName}</p>
                      <p className="text-[10px] text-[#76685F] truncate">{userEmail}</p>
                    </div>
                  </div>
                  <Link
                    href="/"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-[#56423E] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                  >
                    <Home className="w-4 h-4 text-[#C65D4B]" />
                    <span>Trang chủ Học viên</span>
                  </Link>
                  <Link
                    href="/learn"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-[#56423E] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#8B6F5A]" />
                    <span>Thư viện Bài học JLPT</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-[#56423E] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-[#8B6F5A]" />
                    <span>Hồ sơ & Mục tiêu</span>
                  </Link>
                  {activeUser?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-extrabold text-[#C65D4B] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                    >
                      <Shield className="w-4 h-4 text-[#C65D4B]" />
                      <span>Portal Quản trị</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    onMouseEnter={() => router.prefetch("/login")}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-extrabold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {isLoggingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                        <span>Đang đăng xuất...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated / Guest View: Login & Register CTA Buttons */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#56423E] hover:text-[#C65D4B] hover:bg-[#F5EFE6] border border-[#DED3C8] transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#C65D4B] hover:bg-[#B24E3D] shadow-xs transition-all"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-xl bg-[#F5EFE6] text-[#231917] font-bold cursor-pointer"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#DED3C8] px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                    item.active ? "bg-[#C65D4B] text-white shadow-xs" : "text-[#56423E] hover:bg-[#F5EFE6]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full text-white font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          {!activeUser && (
            <div className="pt-3 border-t border-[#DED3C8] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-[#56423E] bg-[#F5EFE6] hover:bg-[#EADFD0] transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white bg-[#C65D4B] hover:bg-[#B24E3D] transition-colors shadow-xs"
              >
                Đăng ký tài khoản
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

