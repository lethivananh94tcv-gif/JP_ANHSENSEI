"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ExternalLink, LogOut, 
  LayoutDashboard, BookOpen, Layers, Users, BarChart3, FileSpreadsheet, 
  ShieldCheck, ChevronRight, PenTool, Puzzle, Target, UserCheck
} from "lucide-react";

interface UserProfile {
  fullName: string;
  email: string;
  role: string;
}

interface NavItem {
  name: string;
  icon: any;
  href: string;
  active: boolean;
  badge?: string;
}

interface NavSection {
  category: string | null;
  items: NavItem[];
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
          const role = (parsed.role || parsed.user?.role || "").toUpperCase();
          if (role !== "ADMIN" && role !== "ROLE_ADMIN") {
            console.warn("User role is not ADMIN or ROLE_ADMIN:", role);
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

  const navSections: NavSection[] = [
    {
      category: null,
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          href: "/admin",
          active: pathname === "/admin",
        }
      ]
    },
    {
      category: "QUẢN LÝ HỌC VIÊN",
      items: [
        {
          name: "Học Viên",
          icon: Users,
          href: "/admin/users",
          active: pathname.startsWith("/admin/users") || pathname.startsWith("/admin/hoc-vien"),
        },
        {
          name: "Phân Lớp Học",
          icon: Layers,
          href: "/admin/users",
          active: false,
        },
        {
          name: "Điểm Danh",
          icon: UserCheck,
          href: "/admin/users",
          active: false,
        }
      ]
    },
    {
      category: "QUẢN LÝ NỘI DUNG",
      items: [
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
          badge: "Mới",
          active: pathname.startsWith("/admin/jlpt-tests"),
        }
      ]
    },
    {
      category: "CÔNG CỤ",
      items: [
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
        }
      ]
    },
    {
      category: "HỆ THỐNG",
      items: [
        {
          name: "Nhật Ký Audit",
          icon: ShieldCheck,
          href: "/admin/audit-logs",
          active: pathname.startsWith("/admin/audit-logs"),
        }
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF6F0] font-sans antialiased text-[#231917] selection:bg-[#C65D4B] selection:text-white">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* 1. Left Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-68 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EB] to-[#F5EFE6] border-r border-[#E5D7C7] text-[#56423E] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto scrollbar-thin shadow-xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-4 pb-4">
          {/* Brand Header with Live Badge */}
          <div className="p-5 border-b border-[#E5D7C7]/80 flex items-center justify-between bg-white/60 backdrop-blur-xs">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C65D4B] via-[#B04C3B] to-[#9E3426] text-white text-xl flex items-center justify-center shadow-md shadow-[#C65D4B]/30 group-hover:scale-105 transition-transform shrink-0 border border-white/30">
                ⛩️
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-black text-base tracking-tight text-[#231917] leading-tight font-jp">
                    ANH SENSEI
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-[#C65D4B] font-black tracking-wider uppercase bg-[#C65D4B]/10 px-2 py-0.5 rounded-md border border-[#C65D4B]/20">
                    ADMIN PORTAL
                  </span>
                </div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-[#8B6F5A] hover:text-[#C65D4B] p-1.5 rounded-xl hover:bg-[#FAF3EB] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Grouped Sidebar Navigation Links */}
          <nav className="px-3.5 space-y-4">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {section.category && (
                  <div className="flex items-center justify-between px-3 mb-1.5 mt-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9E8E85]">
                      {section.category}
                    </p>
                    <span className="h-px flex-1 bg-[#E5D7C7]/60 ml-2" />
                  </div>
                )}
                {section.items.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                        item.active
                          ? "bg-gradient-to-r from-[#C65D4B] to-[#B04C3B] text-white shadow-md shadow-[#C65D4B]/25 font-black scale-[1.01]"
                          : "text-[#6E5D57] hover:bg-white hover:text-[#C65D4B] hover:shadow-2xs border border-transparent hover:border-[#E5D7C7]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            item.active ? "text-white" : "text-[#8B6F5A] group-hover:text-[#C65D4B]"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                            item.active
                              ? "bg-white/20 text-white border-white/30"
                              : "bg-[#C65D4B]/10 text-[#C65D4B] border-[#C65D4B]/30"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Mascot Card & Learner Portal Link */}
        <div className="p-3.5 border-t border-[#E5D7C7] space-y-2.5 bg-white/40">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-[#56423E] hover:bg-white hover:text-[#C65D4B] transition-all border border-transparent hover:border-[#E5D7C7] shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-[#8B6F5A]" />
              <span>Xem trang học viên</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8B6F5A]" />
          </Link>

          <div className="p-3 bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EB] border border-[#E5D7C7] rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0">
                🟢
              </div>
              <div>
                <div className="text-[11px] font-black text-[#231917]">
                  Server Live
                </div>
                <div className="text-[10px] text-[#76685F] font-semibold">
                  API Response: 12ms
                </div>
              </div>
            </div>
            <span className="text-[10px] font-black font-jp bg-[#C65D4B] text-white px-2 py-0.5 rounded-full shadow-2xs">
              正常
            </span>
          </div>

          {/* Admin User Profile & Logout */}
          <div className="p-3 bg-white/70 border border-[#E5D7C7] rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FAF3EB] to-[#F5EFE6] border border-[#E5D7C7] text-[#C65D4B] font-black text-xs flex items-center justify-center shrink-0">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black text-[#231917] truncate">
                  {user?.fullName || "Admin"}
                </div>
                <div className="text-[10px] text-[#76685F] font-semibold truncate">
                  {user?.email || "Quản trị viên"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-[#8B6F5A] hover:text-[#C65D4B] hover:bg-[#FAF3EB] rounded-xl transition-colors shrink-0 cursor-pointer"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Executive Content Container */}
      <div className="flex-1 lg:pl-68 flex flex-col min-h-screen">
        {/* Mobile Header Bar (hidden on desktop) */}
        <div className="lg:hidden bg-white/90 backdrop-blur-md border-b border-[#E5D7C7] px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-xl bg-[#FAF3EB] text-[#231917] hover:bg-[#C65D4B] hover:text-white transition-colors text-sm font-bold cursor-pointer"
          >
            ☰
          </button>
          <span className="font-black text-sm font-jp text-[#231917] tracking-wider">
            ANH SENSEI ADMIN
          </span>
          <div 
            onClick={handleLogout}
            className="w-8 h-8 rounded-xl bg-[#FAF3EB] border border-[#E5D7C7] text-[#C65D4B] font-bold text-xs flex items-center justify-center cursor-pointer"
            title="Đăng xuất"
          >
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "A"}
          </div>
        </div>

        {/* Dynamic Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
