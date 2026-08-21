"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    google?: any;
  }
}

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<"PASSWORD" | "OTP">("PASSWORD");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "577926332144-d5sbmj1h8okflg8hb5qef2rkn4es8so6.apps.googleusercontent.com";

  // Initialize official Google Identity Services SDK
  useEffect(() => {
    const initGoogleSDK = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
        });

        const btnContainer = document.getElementById("google-button-container");
        if (btnContainer) {
          btnContainer.innerHTML = "";
          window.google.accounts.id.renderButton(btnContainer, {
            theme: "outline",
            size: "large",
            width: 380,
            text: "continue_with",
            locale: "vi",
          });
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogleSDK();
    } else {
      const timer = setTimeout(initGoogleSDK, 1000);
      return () => clearTimeout(timer);
    }
  }, [googleClientId]);

  const handleGoogleCredentialResponse = async (response: any) => {
    if (!response?.credential) return;

    try {
      setLoading(true);
      setError("");
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng nhập Google thất bại.");
      }

      saveAuthAndRedirect(data);
    } catch (err: any) {
      setError(err.message || "Lỗi xác thực ID Token với Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomGoogleClick = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      let userEmail = prompt("Nhập địa chỉ Email Google của bạn để xác thực:");
      if (!userEmail || !userEmail.trim()) return;
      handleGoogleCredentialResponse({ credential: userEmail.trim() });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Email hoặc mật khẩu không chính xác.");
      }

      saveAuthAndRedirect(data);
    } catch (err: any) {
      setError(err.message || "Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ Email trước khi yêu cầu mã OTP.");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/login-otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không thể gửi mã OTP.");
      }

      setOtpSent(true);
      setMessage(data.message || "Mã OTP 6 chữ số đã được gửi về email của bạn.");
    } catch (err: any) {
      setError(err.message || "Lỗi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !otpCode.trim()) {
      setError("Vui lòng nhập đầy đủ Email và mã OTP 6 chữ số.");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/login-otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otpCode: otpCode.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xác thực mã OTP thất bại.");
      }

      saveAuthAndRedirect(data);
    } catch (err: any) {
      setError(err.message || "Lỗi xác thực.");
    } finally {
      setLoading(false);
    }
  };

  const saveAuthAndRedirect = (data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("auth_token", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refresh_token", data.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.google?.accounts?.id) {
            window.google.accounts.id.initialize({
              client_id: googleClientId,
              callback: handleGoogleCredentialResponse,
            });
            const btnContainer = document.getElementById("google-button-container");
            if (btnContainer) {
              window.google.accounts.id.renderButton(btnContainer, {
                theme: "outline",
                size: "large",
                width: 380,
                text: "continue_with",
                locale: "vi",
              });
            }
          }
        }}
      />
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#FDFBF7]">
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-[#8B6F5A]/20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#8B6F5A]">Đăng nhập</h1>
            <p className="mt-1 text-sm text-[#6E5E52]">Chào mừng bạn trở lại với ANH SENSEI</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-[#F5EFE6] p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setLoginMode("PASSWORD"); setError(""); setMessage(""); }}
              className={`flex-1 rounded-lg py-2 transition ${
                loginMode === "PASSWORD"
                  ? "bg-[#8B6F5A] text-white shadow"
                  : "text-[#6E5E52] hover:text-[#2D241E]"
              }`}
            >
              Mật khẩu
            </button>
            <button
              type="button"
              onClick={() => { setLoginMode("OTP"); setError(""); setMessage(""); }}
              className={`flex-1 rounded-lg py-2 transition ${
                loginMode === "OTP"
                  ? "bg-[#8B6F5A] text-white shadow"
                  : "text-[#6E5E52] hover:text-[#2D241E]"
              }`}
            >
              Mã OTP Email
            </button>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200" id="login-error-alert">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 border border-green-200" id="login-success-alert">
              {message}
            </div>
          )}

          {loginMode === "PASSWORD" ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4" id="login-password-form">
              <div>
                <label className="block text-sm font-medium text-[#2D241E]">Email</label>
                <input
                  id="login-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lethivananh.94tcv@gmail.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#2D241E]">Mật khẩu</label>
                  <Link
                    href="/forgot-password"
                    id="forgot-password-link"
                    className="text-xs font-semibold text-[#C65D4B] hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <input
                  id="login-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
                  required
                />
              </div>

              <button
                id="login-submit-button"
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#8B6F5A] py-2.5 font-semibold text-white transition hover:bg-[#8B6F5A]/90 disabled:opacity-50 shadow-md"
              >
                {loading ? "Đang xử lý..." : "Đăng nhập với Mật khẩu"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4" id="login-otp-form">
              <div>
                <label className="block text-sm font-medium text-[#2D241E]">Email của bạn</label>
                <div className="mt-1 flex gap-2">
                  <input
                    id="otp-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nhapemailcuan@gmail.com"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={loading}
                    className="whitespace-nowrap rounded-lg border border-[#8B6F5A] bg-white px-3 py-2 text-xs font-semibold text-[#8B6F5A] transition hover:bg-[#F5EFE6] disabled:opacity-50"
                  >
                    {loading ? "Gửi..." : otpSent ? "Gửi lại" : "Lấy mã OTP"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D241E]">Mã OTP 6 chữ số</label>
                <input
                  id="otp-code-input"
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="VD: 839215"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-center text-lg tracking-widest font-mono focus:border-[#8B6F5A] focus:outline-none focus:ring-1 focus:ring-[#8B6F5A]"
                  required
                />
              </div>

              <button
                id="otp-submit-button"
                type="submit"
                disabled={loading || !otpCode}
                className="w-full rounded-lg bg-[#8B6F5A] py-2.5 font-semibold text-white transition hover:bg-[#8B6F5A]/90 disabled:opacity-50 shadow-md"
              >
                {loading ? "Đang xác thực..." : "Đăng nhập với Mã OTP"}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="w-full border-t border-gray-200"></div>
            <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">HOẶC</span>
          </div>

          {/* Official Google Identity Button Container */}
          <div className="flex flex-col items-center justify-center">
            <div id="google-button-container" className="min-h-[44px] w-full flex justify-center"></div>
          </div>

          <p className="text-center text-xs text-[#6E5E52]">
            Chưa có tài khoản?{" "}
            <Link href="/register" id="register-redirect-link" className="font-semibold text-[#C65D4B] hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
