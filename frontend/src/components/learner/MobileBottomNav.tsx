"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Languages, BookOpen, PenTool, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on admin pages or login/register pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null;
  }

  const navItems = [
    {
      name: "Trang chủ",
      href: "/dashboard",
      active: pathname === "/" || pathname === "/dashboard",
      icon: Home,
    },
    {
      name: "Từ vựng",
      href: "/vocabularies",
      active: pathname.startsWith("/vocabularies"),
      icon: Languages,
    },
    {
      name: "Ngữ pháp",
      href: "/grammar",
      active: pathname.startsWith("/grammar"),
      icon: BookOpen,
    },
    {
      name: "Kanji",
      href: "/kanji",
      active: pathname.startsWith("/kanji"),
      icon: PenTool,
    },
    {
      name: "Luyện thi",
      href: "/jlpt-practice",
      active: pathname.startsWith("/jlpt-practice") || pathname.startsWith("/flashcards"),
      icon: Flame,
      badge: "HOT",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#FFFDF9]/95 backdrop-blur-xl border-t border-[#E8DCD1] shadow-[0_-8px_25px_rgba(43,33,29,0.08)] pb-safe transition-all duration-300">
      <nav className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1 text-center group touch-none select-none"
            >
              {/* Active Tab Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute inset-x-1 top-1.5 bottom-1.5 bg-[#FCECE9] rounded-2xl -z-10 border border-[#F5C4BC]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -1 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-[#C65D4B]" : "text-[#766A61] group-active:scale-95"
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </motion.div>

                {item.badge && !isActive && (
                  <span className="absolute -top-1.5 -right-3 px-1 py-0.2 text-[8px] font-black tracking-tighter text-white bg-[#C65D4B] rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-bold mt-1 transition-colors tracking-tight ${
                  isActive ? "text-[#C65D4B]" : "text-[#766A61]"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
