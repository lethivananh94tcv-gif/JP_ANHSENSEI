"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ email của bạn.");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không thể gửi yêu cầu đặt lại mật khẩu.");
      }

      setMessage(
        data.message ||
          "Nếu địa chỉ email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi."
      );
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#FDFBF7]">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-[#8B6F5A]/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8B6F5A]">Quên mật khẩu</h1>
          <p className="mt-1 text-sm text-[#6E5E52]">
            Nhập email tài khoản của bạn để nhận liên kết đặt lại mật khẩu.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200" id="forgot-password-error">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-200 space-y-3" id="forgot-password-success">
            <p>{message}</p>
            <div className="pt-2 text-xs">
              <Link
                href="/reset-password"
                className="font-semibold text-[#8B6F5A] hover:underline block"
              >
                👉 Nhập Token để đặt lại mật khẩu ngay
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" id="forgot-password-form">
          <div>
            <label className="block text-sm font-medium text-[#2D241E]">Địa chỉ Email</label>
            <input
              id="forgot-password-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nhapemailcuan@gmail.com"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
              required
            />
          </div>

          <button
            id="forgot-password-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#8B6F5A] py-2.5 font-semibold text-white transition hover:bg-[#8B6F5A]/90 disabled:opacity-50 shadow-md"
          >
            {loading ? "Đang gửi..." : "Gửi yêu cầu đặt lại mật khẩu"}
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-[#6E5E52] pt-2 border-t border-gray-100">
          <Link href="/login" className="font-semibold text-[#8B6F5A] hover:underline">
            ← Quay lại Đăng nhập
          </Link>
          <Link href="/reset-password" className="text-[#C65D4B] hover:underline font-medium">
            Đã có mã token đặt lại?
          </Link>
        </div>
      </div>
    </main>
  );
}
