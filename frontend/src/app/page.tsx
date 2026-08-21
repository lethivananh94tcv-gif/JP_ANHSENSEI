"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.role === "ADMIN") {
            router.replace("/admin");
            return;
          } else {
            router.replace("/dashboard");
            return;
          }
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e);
        }
      }
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-[#FDFBF7]">
      <div className="w-full max-w-3xl space-y-6 rounded-3xl bg-white p-8 shadow-xl border border-[#8B6F5A]/20">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#8B6F5A] sm:text-5xl">
          ANH SENSEI
        </h1>
        <p className="text-lg text-[#6E5E52]">
          Nền tảng tự học tiếng Nhật thông minh từ <strong className="text-[#8B6F5A]">JLPT N5 đến N3</strong>.
        </p>

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

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="rounded-xl bg-[#8B6F5A] px-6 py-3 font-semibold text-white transition hover:bg-[#8B6F5A]/90 shadow-md"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-[#C65D4B] bg-transparent px-6 py-3 font-semibold text-[#C65D4B] transition hover:bg-[#C65D4B]/10"
          >
            Đăng ký tài khoản
          </Link>
        </div>
      </div>
    </main>
  );
}
