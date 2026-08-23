"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  const navItems: { name: string; icon: string; href: string; active: boolean; badge?: string }[] = [
    {
      name: "Dashboard Tổng Quan",
      icon: "📊",
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      name: "Quản Lý Curriculum",
      icon: "📚",
      href: "/admin/curriculum",
      active: pathname.startsWith("/admin/curriculum"),
    },
    {
      name: "Quản Lý Quiz & Đề Thi",
      icon: "🎯",
      href: "/admin/quizzes",
      active: pathname.startsWith("/admin/quizzes"),
    },
    {
      name: "Strict Excel Import",
      icon: "📥",
      href: "/admin/import",
      active: pathname.startsWith("/admin/import"),
    },
    {
      name: "Quản Lý Người Dùng",
      icon: "👥",
      href: "/admin/users",
      active: pathname.startsWith("/admin/users"),
    },
    {
      name: "Audit Logs",
      icon: "📋",
      href: "/admin/audit-logs",
      active: pathname.startsWith("/admin/audit-logs"),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Navigation Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#2C2421] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#3D332D] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#C65D4B] text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                ⛩️
              </span>
              <div>
                <h1 className="font-extrabold text-base tracking-wider text-white">ANH SENSEI</h1>
                <p className="text-[10px] text-[#C65D4B] font-bold uppercase tracking-widest">
                  Admin Portal
                </p>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-[10px] font-bold text-[#8C7B70] uppercase tracking-wider mb-2">
              Menu Quản Trị
            </p>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  item.active
                    ? "bg-[#C65D4B] text-white shadow-md"
                    : "text-[#D9CEB2] hover:bg-[#3D332D] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full font-semibold text-gray-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer: Learner View & User Profile & Logout */}
        <div className="p-4 border-t border-[#3D332D] space-y-3">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 bg-[#3D332D] hover:bg-[#4A3E38] text-[#FAF3EB] text-xs font-bold py-2.5 rounded-xl border border-[#4A3E38] transition-colors"
          >
            <span>👁️ Góc Nhìn Học Viên</span>
          </Link>

          <div className="bg-[#221B19] p-3 rounded-xl flex items-center justify-between">
            <div className="overflow-hidden pr-2">
              <p className="text-xs font-bold text-white truncate">{user?.fullName || "Admin User"}</p>
              <p className="text-[10px] text-[#8C7B70] truncate">{user?.email || "admin@anhsensei.com"}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold transition-colors"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header Bar */}
        <header className="lg:hidden bg-white border-b border-[#EFE9E1] px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg bg-[#FAF3EB] text-[#2C2421] text-lg font-bold"
          >
            ☰
          </button>
          <span className="font-extrabold text-sm text-[#C65D4B]">ANH SENSEI ADMIN</span>
          <div className="w-8" />
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
