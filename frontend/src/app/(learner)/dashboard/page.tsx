"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface UserProfile {
  userId: number;
  fullName: string;
  email: string;
  role: string;
}

export default function LearnerDashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F5EFE6]/30 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-md border border-[#8B6F5A]/20">
          <div>
            <h1 className="text-3xl font-bold text-[#8B6F5A]">
              Dashboard Học Viên
            </h1>
            <p className="mt-1 text-sm text-[#6E5E52]">
              Chào mừng trở lại, <strong className="text-[#2D241E]">{user ? user.fullName : "Học viên"}</strong>!
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg bg-[#8B6F5A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8B6F5A]/90"
          >
            ← Về Trang Chủ
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow border border-gray-100 text-center">
            <span className="text-3xl">🔥</span>
            <h3 className="mt-2 font-bold text-[#8B6F5A]">Chuỗi Học (Streak)</h3>
            <p className="text-2xl font-extrabold text-[#C65D4B] mt-1">1 ngày</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow border border-gray-100 text-center">
            <span className="text-3xl">📚</span>
            <h3 className="mt-2 font-bold text-[#8B6F5A]">Mục Tiêu</h3>
            <p className="text-2xl font-extrabold text-[#8B6F5A] mt-1">JLPT N5</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow border border-gray-100 text-center">
            <span className="text-3xl">🎴</span>
            <h3 className="mt-2 font-bold text-[#8B6F5A]">Flashcards</h3>
            <p className="text-2xl font-extrabold text-[#8B6F5A] mt-1">20 thẻ/ngày</p>
          </div>
        </div>
      </div>
    </main>
  );
}
