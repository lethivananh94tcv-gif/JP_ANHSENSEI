"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface UserProfile {
  userId: number;
  fullName: string;
  email: string;
  role: string;
}

export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e);
        }
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-[#8B6F5A]/20">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#8B6F5A] sm:text-5xl">
          ANH SENSEI
        </h1>
        <p className="text-lg text-[#6E5E52]">
          Nền tảng tự học tiếng Nhật thông minh từ <strong className="text-[#8B6F5A]">JLPT N5 đến N3</strong>.
        </p>

        {/* Dynamic Logged-in Banner */}
        {!loading && user && (
          <div className="rounded-xl bg-[#8B6F5A]/10 p-5 border border-[#8B6F5A]/30 text-center space-y-2">
            <div className="inline-block rounded-full bg-[#8B6F5A] px-3 py-1 text-xs font-semibold text-white">
              Đã đăng nhập
            </div>
            <h2 className="text-2xl font-bold text-[#8B6F5A]">
              Xin chào, {user.fullName}! 👋
            </h2>
            <p className="text-sm text-[#6E5E52]">
              {user.email} • Vài trò: <span className="font-semibold text-[#C65D4B]">{user.role}</span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
          <div className="rounded-xl bg-[#F5EFE6] p-4 text-center">
            <h3 className="font-bold text-[#8B6F5A]">Flashcard SRS</h3>
            <p className="text-sm text-[#6E5E52]">Thuật toán Spaced Repetition tối ưu trí nhớ.</p>
          </div>
          <div className="rounded-xl bg-[#F5EFE6] p-4 text-center">
            <h3 className="font-bold text-[#8B6F5A]">Quiz Tự Động</h3>
            <p className="text-sm text-[#6E5E52]">Chấm điểm tức thì &amp; xem lại chi tiết bài làm.</p>
          </div>
          <div className="rounded-xl bg-[#F5EFE6] p-4 text-center">
            <h3 className="font-bold text-[#C65D4B]">Trợ Giảng AI (RAG)</h3>
            <p className="text-sm text-[#6E5E52]">Giải đáp ngữ pháp &amp; từ vựng chuẩn xác 24/7.</p>
          </div>
        </div>

        {/* Action buttons based on auth state */}
        <div className="flex justify-center gap-4 pt-4">
          {!loading && user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg bg-[#8B6F5A] px-6 py-3 font-semibold text-white transition hover:bg-[#8B6F5A]/90 shadow-md"
              >
                Vào Dashboard Học Viên 🚀
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500 bg-transparent px-6 py-3 font-semibold text-red-500 transition hover:bg-red-50"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg bg-[#8B6F5A] px-6 py-3 font-semibold text-white transition hover:bg-[#8B6F5A]/90"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="rounded-lg border border-[#C65D4B] bg-transparent px-6 py-3 font-semibold text-[#C65D4B] transition hover:bg-[#C65D4B]/10"
              >
                Đăng ký tài khoản
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
