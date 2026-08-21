"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePasswordComplexity = (pwd: string) => {
    if (pwd.length < 8) return false;
    let count = 0;
    if (/[A-Z]/.test(pwd)) count++;
    if (/[a-z]/.test(pwd)) count++;
    if (/[0-9]/.test(pwd)) count++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) count++;
    return count >= 3;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token.trim()) {
      setError("Vui lòng nhập Token đặt lại mật khẩu.");
      return;
    }

    if (!validatePasswordComplexity(newPassword)) {
      setError(
        "Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất 3 trong 4 nhóm: chữ hoa, chữ thường, chữ số, ký tự đặc biệt."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.trim(),
          newPassword: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đặt lại mật khẩu thất bại. Token có thể đã hết hạn hoặc không hợp lệ.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#FDFBF7]">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-[#8B6F5A]/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8B6F5A]">Đặt lại mật khẩu</h1>
          <p className="mt-1 text-sm text-[#6E5E52]">
            Nhập mã Token và mật khẩu mới của bạn.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200" id="reset-password-error">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-200 text-center" id="reset-password-success">
            <p className="font-semibold">Đặt lại mật khẩu thành công! 🎉</p>
            <p className="text-xs mt-1">Đang tự động chuyển hướng đến trang đăng nhập...</p>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4" id="reset-password-form">
            <div>
              <label className="block text-sm font-medium text-[#2D241E]">Token Đặt lại Mật khẩu</label>
              <input
                id="reset-token-input"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Nhập mã token từ email hoặc quản trị viên"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D241E]">Mật khẩu mới</label>
              <input
                id="new-password-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ít nhất 8 ký tự, 3/4 nhóm ký tự"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
                required
              />
              <p className="mt-1 text-[11px] text-gray-500">
                Tối thiểu 8 ký tự, bao gồm ít nhất 3 trong 4 nhóm: chữ hoa, chữ thường, chữ số, ký tự đặc biệt.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D241E]">Xác nhận Mật khẩu mới</label>
              <input
                id="confirm-password-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
                required
              />
            </div>

            <button
              id="reset-password-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#8B6F5A] py-2.5 font-semibold text-white transition hover:bg-[#8B6F5A]/90 disabled:opacity-50 shadow-md"
            >
              {loading ? "Đang xử lý..." : "Cập nhật Mật khẩu mới"}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-[#6E5E52] pt-2 border-t border-gray-100">
          <Link href="/login" className="font-semibold text-[#8B6F5A] hover:underline">
            ← Quay lại trang Đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}
