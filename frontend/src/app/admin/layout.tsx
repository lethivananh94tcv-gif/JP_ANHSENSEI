"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Bell, Settings, Plus, ExternalLink, User as UserIcon, LogOut, 
  LayoutDashboard, BookOpen, Layers, Users, BarChart3, FileSpreadsheet, ShieldCheck, ChevronRight, PenTool, Puzzle, Target
} from "lucide-react";

interface UserProfile {
  fullName: string;
  email: string;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.role !== "ADMIN") {
            router.replace("/dashboard");
            return;
          }
          setUser(parsed);
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      } else {
        router.replace("/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  // Main Navigation Items - Separated Management Modules
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      name: "Quản Lý Từ Vựng",
      icon: BookOpen,
      href: "/admin/vocabularies",
      active: pathname.startsWith("/admin/vocabularies"),
    },
    {
      name: "Quản Lý Hán Tự",
      icon: PenTool,
      href: "/admin/kanji",
      active: pathname.startsWith("/admin/kanji"),
    },
    {
      name: "Quản Lý Ngữ Pháp",
      icon: Puzzle,
      href: "/admin/grammar",
      active: pathname.startsWith("/admin/grammar"),
    },
    {
      name: "Đề Thi JLPT",
      icon: Target,
      href: "/admin/jlpt-tests",
      badge: "Sắp có",
      active: pathname.startsWith("/admin/jlpt-tests"),
    },
    {
      name: "Học Viên",
      icon: Users,
      href: "/admin/users",
      active: pathname.startsWith("/admin/users"),
    },
    {
      name: "Báo Cáo & Kết Quả",
      icon: BarChart3,
      href: "/admin/quiz-attempts",
      active: pathname.startsWith("/admin/quiz-attempts"),
    },
    {
      name: "Import Excel",
      icon: FileSpreadsheet,
      href: "/admin/import",
      active: pathname.startsWith("/admin/import"),
    },
    {
      name: "Nhật Ký Audit",
      icon: ShieldCheck,
      href: "/admin/audit-logs",
      active: pathname.startsWith("/admin/audit-logs"),
    },
  ];

  // Top Horizontal Sub-Navigation Tabs
  const topTabs = [
    { name: "TỔNG QUAN", href: "/admin", active: pathname === "/admin" },
    { name: "TỪ VỰNG", href: "/admin/vocabularies", active: pathname.startsWith("/admin/vocabularies") },
    { name: "HÁN TỰ", href: "/admin/kanji", active: pathname.startsWith("/admin/kanji") },
    { name: "NGỮ PHÁP", href: "/admin/grammar", active: pathname.startsWith("/admin/grammar") },
    { name: "HỌC VIÊN", href: "/admin/users", active: pathname.startsWith("/admin/users") },
    { name: "HỆ THỐNG", href: "/admin/audit-logs", active: pathname.startsWith("/admin/audit-logs") },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF6F0] bg-[radial-gradient(#EADECF_1.2px,transparent_1.2px)] [background-size:20px_20px] font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* 1. Left Dark Charcoal Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#29221F] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-[#3A312D] ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="p-6 border-b border-[#3A312D] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-2xl bg-[#C65D4B] text-white font-black text-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                📖
              </div>
              <div className="space-y-0.5">
                <h1 className="font-extrabold text-base tracking-wide text-white leading-tight font-sans">
                  ANH SENSEI
                </h1>
                <p className="text-[10px] text-[#A69990] font-black uppercase tracking-widest">
                  ADMIN PORTAL
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-[#A69990] hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    item.active
                      ? "bg-[#3A302C] text-white font-bold border-l-4 border-[#C4624D] pl-3"
                      : "text-[#D0C5BD] hover:bg-[#382E2A] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${item.active ? "text-white" : "text-[#A69990]"}`} />
                    <span className="text-xs font-bold">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-black bg-[#C65D4B]/20 text-[#FF8A75] border border-[#C65D4B]/40 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Profile & Go to Learner Dashboard */}
        <div className="p-4 border-t border-[#3A312D] space-y-2">
          <Link
            href="/admin/users"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-[#D0C5BD] hover:bg-[#382E2A] hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 text-[#A69990]" />
            <span className="text-xs font-semibold">Hồ sơ</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-[#D0C5BD] hover:bg-[#382E2A] hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-[#A69990]" />
              <span className="text-xs font-semibold">Xem trang học viên</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C7B70]" />
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar (Matching Mockup Header) */}
        <header className="bg-white border-b border-[#EFE9E1] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          {/* Left Sub-nav Horizontal Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#FAF3EB] text-[#2C2421] text-sm font-bold"
            >
              ☰
            </button>

            <div className="flex items-center gap-6 sm:gap-8">
              {topTabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`text-xs font-black tracking-wider transition-all relative py-1 whitespace-nowrap ${
                    tab.active
                      ? "text-[#C65D4B]"
                      : "text-[#8C7B70] hover:text-[#2C2421]"
                  }`}
                >
                  <span>{tab.name}</span>
                  {tab.active && (
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#C65D4B] rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Action Bar (Quick Create, Bell, Gear, User Avatar) */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Terracotta Red + Quick Create Button */}
            <Link
              href="/admin/curriculum"
              className="px-4 py-2 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Create</span>
            </Link>

            {/* Notification Bell */}
            <button
              type="button"
              className="p-2 text-[#8C7B70] hover:text-[#2C2421] hover:bg-[#FAF5F0] rounded-xl transition-colors cursor-pointer relative"
              title="Thông báo"
            >
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65D4B] absolute top-2 right-2" />
            </button>

            {/* Settings Gear */}
            <Link
              href="/admin/audit-logs"
              className="p-2 text-[#8C7B70] hover:text-[#2C2421] hover:bg-[#FAF5F0] rounded-xl transition-colors cursor-pointer"
              title="Cài đặt hệ thống"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* User Avatar Circle */}
            <div className="relative pl-1">
              <div className="w-8 h-8 rounded-full bg-[#FFEAE8] border border-[#F3E2D7] text-[#C65D4B] font-black text-xs flex items-center justify-center cursor-pointer shadow-2xs">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0 inline-block" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
