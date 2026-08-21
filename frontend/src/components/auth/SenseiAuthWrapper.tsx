"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowRight, KeyRound, Mail, User, ShieldCheck, Sparkles, EyeOff, Eye, Loader2, CheckCircle2, AlertCircle, LockKeyhole, Check, CircleDot, Info, RefreshCw } from "lucide-react";

declare global {
  interface Window {
    google?: any;
  }
}

type AuthMode = "LOGIN" | "REGISTER" | "VERIFY_OTP" | "FORGOT_PASSWORD";
type MotionPhase = "IDLE" | "PUSHING_OUT" | "PULLING_IN";
type FormFocusField = "NONE" | "FULL_NAME" | "EMAIL" | "PASSWORD" | "CONFIRM_PASSWORD" | "OTP" | "TARGET_LEVEL" | "FORGOT_TOKEN";

interface SenseiAuthWrapperProps {
  initialMode?: AuthMode;
}

export default function SenseiAuthWrapper({ initialMode = "LOGIN" }: SenseiAuthWrapperProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [motionPhase, setMotionPhase] = useState<MotionPhase>("IDLE");
  const [isHovered, setIsHovered] = useState(false);
  const [focusedField, setFocusedField] = useState<FormFocusField>("NONE");
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  const mascotRef = useRef<HTMLDivElement>(null);

  // Show/Hide Password Toggle States
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Restore saved login email if rememberMe was active
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("anhsensei_remembered_email");
      if (savedEmail) {
        setLoginEmail(savedEmail);
        setRememberMe(true);
      }
    }
  }, []);

  // OTP Verification dedicated form states
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Enhanced Register form states
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regTargetLevel, setRegTargetLevel] = useState<"N5" | "N4" | "N3">("N5");
  const [regAgreeTerms, setRegAgreeTerms] = useState(true);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  // Forgot Password form states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotToken, setForgotToken] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [forgotStep, setForgotStep] = useState<"REQUEST" | "RESET">("REQUEST");

  // Shared UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "577926332144-d5sbmj1h8okflg8hb5qef2rkn4es8so6.apps.googleusercontent.com";

  // Strict Standard Email Format Validator (RFC 5322)
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  // Real-time Password Criteria Checklist helpers
  const getPassCriteria = (passStr: string) => ({
    length: passStr.length >= 8,
    hasUpper: /[A-Z]/.test(passStr),
    hasLower: /[a-z]/.test(passStr),
    hasNumberOrSpecial: /[0-9!@#$%^&*]/.test(passStr),
  });

  const regPassCriteria = getPassCriteria(regPassword);
  const isRegPassFullyValid = regPassCriteria.length && regPassCriteria.hasUpper && regPassCriteria.hasLower && regPassCriteria.hasNumberOrSpecial;

  const forgotPassCriteria = getPassCriteria(forgotNewPassword);
  const isForgotPassFullyValid = forgotPassCriteria.length && forgotPassCriteria.hasUpper && forgotPassCriteria.hasLower && forgotPassCriteria.hasNumberOrSpecial;

  // Real-time Mouse Eye Tracking System
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.4;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance === 0) return;

      const maxPupilRadius = 5;
      const angle = Math.atan2(deltaY, deltaX);

      const clampedDist = Math.min(maxPupilRadius, distance / 45);
      const offsetX = Math.cos(angle) * clampedDist;
      const offsetY = Math.sin(angle) * clampedDist;

      setPupilOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Physical Push & Pull Motion System between Modes
  const switchMode = (targetMode: AuthMode) => {
    if (targetMode === mode || motionPhase !== "IDLE") return;
    setError("");
    setMessage("");

    setMotionPhase("PUSHING_OUT");

    setTimeout(() => {
      setMode(targetMode);
      if (targetMode === "FORGOT_PASSWORD") {
        setForgotToken("");
        setForgotNewPassword("");
        setForgotConfirmPassword("");
        if (loginEmail && isValidEmail(loginEmail)) {
          setForgotEmail(loginEmail);
        } else {
          setForgotEmail("");
        }
      } else if (targetMode === "REGISTER") {
        setRegFullName("");
        setRegEmail("");
        setRegPassword("");
        setRegConfirmPassword("");
      } else if (targetMode === "VERIFY_OTP") {
        setOtpCode("");
      } else if (targetMode === "LOGIN") {
        setLoginPassword("");
      }
      setMotionPhase("PULLING_IN");
    }, 800);

    setTimeout(() => {
      setMotionPhase("IDLE");
    }, 1600);
  };

  // Sensei Click Handler - Clears error instantly on click
  const handleSenseiClick = () => {
    if (motionPhase !== "IDLE") return;
    setError("");
    setMessage("");

    if (mode === "REGISTER") {
      if (isRegisterSuccess) {
        switchMode("VERIFY_OTP");
      } else {
        switchMode("LOGIN");
      }
    } else if (mode === "LOGIN" || mode === "VERIFY_OTP" || mode === "FORGOT_PASSWORD") {
      switchMode("REGISTER");
    }
  };

  // Helper for Focus Change (clears previous errors to give way to focus guidance)
  const handleFieldFocus = (field: FormFocusField) => {
    setError("");
    setFocusedField(field);
  };

  // Google SDK Init
  useEffect(() => {
    if (mode === "VERIFY_OTP" || mode === "FORGOT_PASSWORD") return;

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
            width: 340,
            text: mode === "LOGIN" ? "continue_with" : "signup_with",
            locale: "vi",
          });
        }
      }
    };

    const timer = setTimeout(initGoogleSDK, 400);
    return () => clearTimeout(timer);
  }, [googleClientId, mode, motionPhase]);

  const handleGoogleCredentialResponse = async (response: any) => {
    if (!response?.credential) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");
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

      setMessage("Đăng nhập Google thành công! Sensei đưa bạn vào bục giảng ngay!");
      saveAuthAndRedirect(data);
    } catch (err: any) {
      setError(err.message || "Lỗi xác thực tài khoản Google.");
    } finally {
      setLoading(false);
    }
  };

  // 1. LOGIN SUBMIT
  const handleLoginPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!loginEmail.trim() || !loginPassword) {
      setError("Bạn chưa nhập đầy đủ Email hoặc Mật khẩu.");
      return;
    }

    if (!isValidEmail(loginEmail)) {
      setError("Địa chỉ Email không đúng định dạng (ví dụ đúng: user@gmail.com).");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("anhsensei_remembered_email", loginEmail.trim());
    } else {
      localStorage.removeItem("anhsensei_remembered_email");
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Email hoặc mật khẩu không chính xác.");
      }

      setMessage("Đăng nhập thành công! Sensei đưa bạn vào bục giảng ngay đây!");
      saveAuthAndRedirect(data);
    } catch (err: any) {
      setError(err.message || "Email hoặc Mật khẩu chưa chính xác.");
    } finally {
      setLoading(false);
    }
  };

  // 2. ENHANCED REGISTER SUBMIT
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!regFullName.trim() || !regEmail.trim() || !regPassword || !regConfirmPassword) {
      setError("Vui lòng điền đầy đủ tất cả các trường thông tin đăng ký.");
      return;
    }

    if (!isValidEmail(regEmail)) {
      setError("Địa chỉ Email không đúng định dạng (ví dụ đúng: user@gmail.com).");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp với mật khẩu đã tạo.");
      return;
    }

    if (!isRegPassFullyValid) {
      setError("Mật khẩu chưa đáp ứng đủ 4 tiêu chí an toàn (8+ ký tự, chữ HOA, chữ thường & chữ số).");
      return;
    }

    if (!regAgreeTerms) {
      setError("Bạn cần tích chọn đồng ý với Điều khoản sử dụng dịch vụ.");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: regFullName.trim(),
          email: regEmail.trim(),
          password: regPassword,
          targetLevel: regTargetLevel,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Đăng ký thất bại.");
      }

      const registeredEmail = regEmail.trim();
      setLoginEmail(registeredEmail);
      setOtpEmail(registeredEmail);

      // Clear Form Fields
      setRegFullName("");
      setRegEmail("");
      setRegPassword("");
      setRegConfirmPassword("");
      setIsRegisterSuccess(true);

      setMessage(`Đăng ký mục tiêu ${regTargetLevel} thành công! Bấm vào Sensei để chuyển sang bảng Kích Hoạt OTP nhé!`);
    } catch (err: any) {
      setError(err.message || "Không thể đăng ký. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // 3. REQUEST OTP (VERIFY ACCOUNT)
  const handleRequestOtp = async () => {
    setError("");
    setMessage("");

    if (!otpEmail.trim()) {
      setError("Vui lòng điền địa chỉ Email trước khi yêu cầu gửi OTP.");
      return;
    }

    if (!isValidEmail(otpEmail)) {
      setError("Địa chỉ Email nhận OTP không đúng định dạng (ví dụ đúng: user@gmail.com).");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/login-otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không thể gửi mã OTP.");
      }

      setOtpSent(true);
      setMessage(data.message || "Mã OTP 6 chữ số đã được gửi thành công về hòm thư Email của bạn!");
    } catch (err: any) {
      setError(err.message || "Không thể gửi mã OTP. Kiểm tra lại kết nối mạng nhé.");
    } finally {
      setLoading(false);
    }
  };

  // 4. VERIFY OTP SUBMIT
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otpEmail.trim() || !otpCode.trim()) {
      setError("Vui lòng nhập Email và Mã OTP 6 chữ số.");
      return;
    }

    if (!isValidEmail(otpEmail)) {
      setError("Địa chỉ Email kích hoạt không đúng định dạng.");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/login-otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail.trim(), otpCode: otpCode.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xác thực mã OTP thất bại.");
      }

      setMessage("Xác thực OTP tài khoản thành công! Sensei đưa bạn về bảng Đăng Nhập ngay đây!");
      setOtpCode("");
      setIsRegisterSuccess(false);

      setTimeout(() => {
        switchMode("LOGIN");
      }, 2200);
    } catch (err: any) {
      setError(err.message || "Mã OTP chưa chính xác hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  // 5. FORGOT PASSWORD REQUEST SUBMIT
  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!forgotEmail.trim()) {
      setError("Vui lòng nhập địa chỉ Email khôi phục mật khẩu.");
      return;
    }

    if (!isValidEmail(forgotEmail)) {
      setError("Địa chỉ Email không đúng định dạng (ví dụ đúng: user@gmail.com).");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không thể gửi yêu cầu quên mật khẩu.");
      }

      setForgotStep("RESET");
      setMessage("Mã khôi phục đã được gửi về Email của bạn! Vui lòng kiểm tra và nhập Mật khẩu mới bên dưới.");
    } catch (err: any) {
      setError(err.message || "Không thể gửi yêu cầu khôi phục. Bạn thử lại nhé.");
    } finally {
      setLoading(false);
    }
  };

  // 6. RESET PASSWORD SUBMIT
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!forgotToken.trim() || !forgotNewPassword || !forgotConfirmPassword) {
      setError("Vui lòng nhập Mã Token khôi phục và Mật khẩu mới.");
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp với mật khẩu mới.");
      return;
    }

    if (!isForgotPassFullyValid) {
      setError("Mật khẩu mới chưa đáp ứng đủ 4 tiêu chí an toàn (8+ ký tự, chữ HOA, chữ thường & chữ số).");
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

      const res = await fetch(`${apiBaseUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: forgotToken.trim(),
          newPassword: forgotNewPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đặt lại mật khẩu thất bại.");
      }

      setMessage("Đặt lại Mật khẩu mới thành công! Sensei đưa bạn về bảng Đăng Nhập để vào học ngay đây!");
      setForgotToken("");
      setForgotNewPassword("");
      setForgotConfirmPassword("");

      setTimeout(() => {
        switchMode("LOGIN");
      }, 2200);
    } catch (err: any) {
      setError(err.message || "Mã Token không hợp lệ hoặc đã hết hạn.");
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
      setTimeout(() => {
        window.location.href = data.role === "ADMIN" ? "/admin" : "/dashboard";
      }, 1200);
    }
  };

  // Optimized Master Contextual Dialogue Helper with Dynamic Priority Order
  const getDialogueText = () => {
    // Priority 1: Physical Motion Phase
    if (motionPhase === "PUSHING_OUT") {
      if (mode === "LOGIN") return "Sensei gồng sức đẩy bảng Đăng Nhập trôi ra ngoài... 🖐️💨";
      if (mode === "REGISTER") return "Sensei gồng sức đẩy bảng Đăng Ký trôi ra ngoài... 🖐️💨";
      if (mode === "VERIFY_OTP") return "Sensei gồng sức đẩy bảng Xác Thực OTP trôi ra ngoài... 🖐️💨";
      return "Sensei gồng sức đẩy bảng Quên Mật Khẩu trôi ra ngoài... 🖐️💨";
    }
    if (motionPhase === "PULLING_IN") {
      if (mode === "REGISTER") return "Tại đúng vị trí này, Sensei kéo ngay bảng Đăng Ký vào thế chỗ! 🏋️‍♂️💪🏼";
      if (mode === "VERIFY_OTP") return "Tại đúng vị trí này, Sensei kéo ngay bảng Xác Thực OTP vào thế chỗ! 🏋️‍♂️💪🏼";
      if (mode === "FORGOT_PASSWORD") return "Tại đúng vị trí này, Sensei kéo ngay bảng Quên Mật Khẩu vào thế chỗ! 🏋️‍♂️💪🏼";
      return "Tại đúng vị trí này, Sensei kéo ngay bảng Đăng Nhập vào thế chỗ! 🏋️‍♂️💪🏼";
    }

    // Priority 2: Hovering on Sensei Mascot
    if (isHovered) {
      if (mode === "REGISTER") {
        return isRegisterSuccess
          ? "👉 Bấm vào Sensei để chuyển sang bảng Xác Thực OTP Email nhé! 🔑✉️"
          : "👉 Bấm vào Sensei để chuyển sang bảng Đăng Nhập nhé! ⛩️🎉";
      }
      if (mode === "VERIFY_OTP" || mode === "FORGOT_PASSWORD") {
        return "👉 Bấm vào Sensei để quay lại bảng Đăng Nhập nhé! ⛩️🎉";
      }
      return "👉 Bấm vào Sensei để chuyển sang bảng Đăng Ký nhé! 📝✨";
    }

    // Priority 3: Loading State
    if (loading) {
      return "Sensei đang kết nối máy chủ xác thực dữ liệu cho bạn... Chờ chút nha! ⏳⚙️⚡";
    }

    // Priority 4: Active Field Focus (Guides user on the current input field they are typing into)
    if (focusedField !== "NONE") {
      if (mode === "LOGIN") {
        if (focusedField === "EMAIL") {
          if (!loginEmail.trim()) {
            return "Nhập địa chỉ Email bạn đã đăng ký với Sensei nhé! 📧✨";
          }
          if (isValidEmail(loginEmail)) {
            return "Email đúng định dạng rồi nè! Tiếp theo nhập Mật khẩu bên dưới nhé 📧✅";
          }
          return "Ooops! Email chưa đúng định dạng. Cần có dạng user@gmail.com nhé! 📧⚠️";
        }

        if (focusedField === "PASSWORD") {
          if (showLoginPassword) {
            return "Ôi! Bạn vừa mở xem mật khẩu kìa! Sensei chỉ hí 1 mắt nhìn lén 1 xíu thôi nha 😉✨";
          }
          if (loginPassword.length >= 8) {
            return "Mật khẩu 8+ ký tự rồi nè! Sensei lấy 2 tay bịt kín mắt 100% nha! 🙈🛡️✨";
          }
          if (loginPassword.length > 0) {
            return "Đang gõ mật khẩu... Sensei đã lấy 2 tay bịt kín mắt rồi nha! 🙈🔒";
          }
          return "Nhập Mật khẩu tài khoản của bạn. Sensei đã lấy 2 tay bịt kín mắt 100% 🙈🔒";
        }
      }

      if (mode === "REGISTER") {
        if (focusedField === "TARGET_LEVEL") {
          return `Chọn mục tiêu JLPT (${regTargetLevel}) để Sensei cá nhân hóa lộ trình học phù hợp nhất cho bạn nhé! 🎯⛩️`;
        }
        if (focusedField === "CONFIRM_PASSWORD") {
          if (showRegConfirmPassword) {
            return "Bạn vừa mở xem mật khẩu xác nhận kìa! Sensei chỉ hí 1 mắt nhìn lén 1 xíu 😉✨";
          }
          if (regConfirmPassword.length > 0 && regConfirmPassword === regPassword) {
            return "Mật khẩu xác nhận khớp 100% rồi! Sensei vẫn bịt mắt an toàn 🙈✅";
          }
          return "Gõ lại mật khẩu một lần nữa để đảm bảo không bị gõ nhầm nhé! Sensei bịt mắt rồi 🙈🔒";
        }
        if (focusedField === "PASSWORD") {
          if (showRegPassword) {
            return "Bạn vừa mở xem mật khẩu kìa! Sensei chỉ hí 1 mắt nhìn lén 1 xíu thôi nha 😉✨";
          }
          if (isRegPassFullyValid) {
            return "Tuyệt vời! Mật khẩu đạt đủ 4 tiêu chí an toàn 100% rồi! Sensei vẫn bịt mắt nha 🙈🛡️✨";
          }
          return "Mật khẩu cần: 8+ ký tự, 1 chữ HOA, 1 chữ thường & 1 chữ số. Sensei đang bịt mắt rồi gõ thoải mái nha! 🙈🔒";
        }
        if (focusedField === "EMAIL") {
          if (isValidEmail(regEmail)) {
            return "Định dạng Email chuẩn 100% rồi nè! Sensei sẵn sàng nhận tin 📧✅";
          }
          return "Nhập đúng định dạng Email cá nhân của bạn nhé! Ví dụ: user@gmail.com 📧✨";
        }
        if (focusedField === "FULL_NAME") {
          if (regFullName.trim().length >= 2) {
            return "Tên đẹp quá! Sensei đã ghi danh bạn vào sổ học viên JLPT N5-N3 rồi! 👤✨";
          }
          return "Cho Sensei biết tên đầy đủ của bạn để ghi vào danh sách lớp học JLPT nào! 👤📝";
        }
      }

      if (mode === "VERIFY_OTP") {
        if (focusedField === "EMAIL") {
          if (isValidEmail(otpEmail)) {
            return "Email kích hoạt đúng rồi nè! Bấm 'Lấy OTP' hoặc kiểm tra hòm thư 📧✅";
          }
          return "Nhập địa chỉ Email bạn cần kích hoạt OTP nhé! 📧✨";
        }
        if (focusedField === "OTP") {
          if (otpCode.trim().length === 6) {
            return "Mã OTP 6 chữ số đủ rồi! Bấm xác nhận kích hoạt ngay thôi nào! 🔑⚡";
          }
          return "Kiểm tra hòm thư Email lấy mã OTP 6 chữ số rồi điền vào đây nhé! ✉️🔢";
        }
      }

      if (mode === "FORGOT_PASSWORD") {
        if (focusedField === "EMAIL") {
          if (isValidEmail(forgotEmail)) {
            return "Email đúng định dạng rồi nè! Bấm 'Gửi mã khôi phục' bên dưới nhé 📧✅";
          }
          return "Nhập Email tài khoản bạn đã quên mật khẩu nhé! 📧✨";
        }
        if (focusedField === "FORGOT_TOKEN") {
          return "Nhập mã Token khôi phục đã gửi về hòm thư Email của bạn nhé! 🔑✉️";
        }
        if (focusedField === "PASSWORD") {
          if (showForgotNewPassword) {
            return "Bạn vừa mở xem mật khẩu mới kìa! Sensei chỉ hí 1 mắt nhìn lén 1 xíu thôi nha 😉✨";
          }
          if (isForgotPassFullyValid) {
            return "Mật khẩu mới đạt chuẩn an toàn 100% rồi! Sensei lấy 2 tay bịt kín mắt nha 🙈🛡️✨";
          }
          return "Tạo Mật khẩu mới 8+ ký tự. Sensei bịt kín 2 mắt an toàn nha! 🙈🔒";
        }
        if (focusedField === "CONFIRM_PASSWORD") {
          if (showForgotConfirmPassword) {
            return "Bạn vừa mở xem mật khẩu xác nhận kìa! Sensei chỉ hí 1 mắt nhìn lén 1 xíu 😉✨";
          }
          if (forgotConfirmPassword.length > 0 && forgotConfirmPassword === forgotNewPassword) {
            return "Mật khẩu mới xác nhận trùng khớp 100% rồi nè! 🙈✅";
          }
          return "Nhập lại mật khẩu mới một lần nữa để tránh gõ nhầm nhé! 🙈🔒";
        }
      }
    }

    // Priority 5: Success Message Toast
    if (message) {
      return `🎉 ${message} ✨`;
    }

    // Priority 6: Error Message Toast (Only shown when not hovering, not focusing a field, and not moving)
    if (error) {
      if (
        error.toLowerCase().includes("failed to fetch") ||
        error.toLowerCase().includes("networkerror") ||
        error.toLowerCase().includes("không thể kết nối")
      ) {
        return "Không thể kết nối đến máy chủ! Máy chủ đang nâng cấp hoặc gián đoạn mạng, vui lòng thử lại sau vài giây nhé! 🌐🔌💧";
      }
      if (error.toLowerCase().includes("khóa") || error.toLowerCase().includes("15 phút")) {
        return `Cảnh báo! ${error} 🔒⌛💧`;
      }
      if (error.toLowerCase().includes("chưa xác thực") || error.toLowerCase().includes("kích hoạt")) {
        return `Ối! ${error} Bấm 'Kích hoạt OTP tại đây' bên dưới để xác thực nhé! 🔑✉️💧`;
      }
      if (error.toLowerCase().includes("email")) {
        return `Ooops! ${error} Bạn kiểm tra lại định dạng Email nhé! 📧😅💧`;
      }
      if (error.toLowerCase().includes("mật khẩu") || error.toLowerCase().includes("password")) {
        return `Ối! ${error} Đừng lo, gõ lại từ từ nhé! 🔒😅💧`;
      }
      if (error.toLowerCase().includes("otp") || error.toLowerCase().includes("token")) {
        return `Ooops! ${error} Bạn kiểm tra lại mã khôi phục nhé! ✉️⌛💧`;
      }
      return `Trời ơi! ${error} Bạn kiểm tra lại rồi thử lại nha! ⚠️😅💧`;
    }

    // Priority 7: Default Idle Guidance
    if (mode === "LOGIN") {
      return "Chào mừng bạn trở lại! Nhập Email & Mật khẩu bên phải để Sensei đưa vào lớp học nhé! ⛩️🎉";
    }
    if (mode === "VERIFY_OTP") {
      return "Nhập mã OTP 6 chữ số từ Email của bạn để kích hoạt tài khoản nhé! 🔑✨";
    }
    if (mode === "FORGOT_PASSWORD") {
      return "Đừng lo lắng! Nhập Email của bạn vào đây, Sensei sẽ gửi ngay mã khôi phục Mật khẩu về hòm thư cho bạn nhé! 🔑✉️🌸";
    }
    return "Tạo tài khoản nhận ngay lộ trình tự học JLPT N5 - N3 miễn phí nhé! 🎁🌸";
  };

  const isCurrentPassVisible =
    (mode === "LOGIN" && focusedField === "PASSWORD" && showLoginPassword) ||
    (mode === "REGISTER" && focusedField === "PASSWORD" && showRegPassword) ||
    (mode === "REGISTER" && focusedField === "CONFIRM_PASSWORD" && showRegConfirmPassword) ||
    (mode === "FORGOT_PASSWORD" && focusedField === "PASSWORD" && showForgotNewPassword) ||
    (mode === "FORGOT_PASSWORD" && focusedField === "CONFIRM_PASSWORD" && showForgotConfirmPassword);

  const isCurrentPassCovered =
    (focusedField === "PASSWORD" || focusedField === "CONFIRM_PASSWORD") && !isCurrentPassVisible;

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => {
          if (mode !== "VERIFY_OTP" && mode !== "FORGOT_PASSWORD" && window.google?.accounts?.id) {
            window.google.accounts.id.initialize({
              client_id: googleClientId,
              callback: handleGoogleCredentialResponse,
            });
            const btnContainer = document.getElementById("google-button-container");
            if (btnContainer) {
              window.google.accounts.id.renderButton(btnContainer, {
                theme: "outline",
                size: "large",
                width: 340,
                text: mode === "LOGIN" ? "continue_with" : "signup_with",
                locale: "vi",
              });
            }
          }
        }}
      />

      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#F5EFE6] to-[#E8DFD5] p-4 sm:p-8 font-sans">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8B6F5A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Stable Outer Layout */}
        <div className="relative flex w-full max-w-5xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-center">
          
          {/* ================= MASCOT CHARACTER STAGE ================= */}
          <div className="relative flex h-80 w-full items-center justify-center lg:h-[520px] lg:w-1/2">
            
            <motion.div
              animate={
                motionPhase === "PUSHING_OUT"
                  ? {
                      x: [0, 220],
                      rotate: [0, 12],
                    }
                  : motionPhase === "PULLING_IN"
                  ? {
                      x: [220, 0],
                      rotate: [-12, 0],
                    }
                  : loading
                  ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, -3, 0],
                    }
                  : message
                  ? {
                      y: [0, -16, 0, -8, 0],
                      scale: [1, 1.08, 1],
                    }
                  : error && !isHovered && focusedField === "NONE"
                  ? {
                      rotate: [-4, 4, -4, 4, 0],
                      y: [0, -4, 0],
                    }
                  : focusedField !== "NONE" && focusedField !== "PASSWORD" && focusedField !== "CONFIRM_PASSWORD"
                  ? {
                      rotate: 4,
                      scale: 1.03,
                    }
                  : isCurrentPassVisible
                  ? {
                      rotate: 3,
                      scale: 1.02,
                    }
                  : isCurrentPassCovered
                  ? {
                      rotate: -2,
                      scale: 0.98,
                    }
                  : { y: [0, -8, 0] }
              }
              transition={{
                duration: motionPhase === "PUSHING_OUT" ? 0.8 : motionPhase === "PULLING_IN" ? 0.8 : message ? 0.6 : loading ? 0.5 : error ? 0.4 : 2.5,
                ease: [0.25, 1, 0.5, 1],
                repeat: motionPhase === "IDLE" && focusedField === "NONE" && !error && !message && !loading ? Infinity : 0,
                repeatType: "reverse",
              }}
              className="relative flex flex-col items-center justify-center mt-6 z-20"
            >
              {/* SPEECH BUBBLE */}
              <div
                className={`relative mb-3 max-w-xs sm:max-w-sm rounded-2xl px-5 py-3.5 shadow-2xl border-2 text-center transition-all duration-300 ${
                  message
                    ? "bg-emerald-50 border-emerald-500 scale-105 ring-4 ring-emerald-300/40 text-emerald-800"
                    : isHovered
                    ? "bg-amber-50 border-amber-500 scale-105 ring-4 ring-amber-300/40"
                    : focusedField !== "NONE"
                    ? isCurrentPassVisible
                      ? "bg-purple-50 border-purple-500 scale-105 ring-4 ring-purple-300/40"
                      : isCurrentPassCovered
                      ? "bg-rose-50 border-rose-500 scale-105 ring-4 ring-rose-300/40"
                      : "bg-blue-50 border-blue-500 scale-105 ring-4 ring-blue-300/40"
                    : error
                    ? "bg-red-50 border-red-500 scale-105 ring-4 ring-red-300/40 text-red-700"
                    : loading
                    ? "bg-amber-50 border-amber-500 scale-105 ring-4 ring-amber-300/40 text-amber-800"
                    : "bg-white border-[#8B6F5A]"
                }`}
              >
                <div className="text-xs sm:text-sm font-bold text-[#8B6F5A] leading-relaxed flex items-center justify-center gap-1.5">
                  {message ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 animate-bounce shrink-0" />
                  ) : isHovered ? (
                    <Sparkles className="h-4 w-4 text-amber-500 animate-spin shrink-0" />
                  ) : focusedField !== "NONE" ? (
                    isCurrentPassVisible ? (
                      <Eye className="h-4 w-4 text-purple-600 animate-bounce shrink-0" />
                    ) : isCurrentPassCovered ? (
                      <EyeOff className="h-4 w-4 text-rose-500 animate-bounce shrink-0" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-500 animate-pulse shrink-0" />
                    )
                  ) : error ? (
                    <AlertCircle className="h-4 w-4 text-red-500 animate-bounce shrink-0" />
                  ) : loading ? (
                    <Loader2 className="h-4 w-4 text-amber-600 animate-spin shrink-0" />
                  ) : null}
                  <span>{getDialogueText()}</span>
                </div>
                {/* Bubble Arrow */}
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 border-r-2 border-b-2 rotate-45 transition-colors duration-300 ${
                    message
                      ? "bg-emerald-50 border-emerald-500"
                      : isHovered
                      ? "bg-amber-50 border-amber-500"
                      : focusedField !== "NONE"
                      ? isCurrentPassVisible
                        ? "bg-purple-50 border-purple-500"
                        : isCurrentPassCovered
                        ? "bg-rose-50 border-rose-500"
                        : "bg-blue-50 border-blue-500"
                      : error
                      ? "bg-red-50 border-red-500"
                      : loading
                      ? "bg-amber-50 border-amber-500"
                      : "bg-white border-[#8B6F5A]"
                  }`}
                />
              </div>

              {/* Sensei SVG Figure */}
              <div
                ref={mascotRef}
                onClick={handleSenseiClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-52 h-60 sm:w-60 sm:h-70 flex items-center justify-center cursor-pointer group"
                title="Bấm vào ANH SENSEI để chuyển giao diện!"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-1 -right-2 z-30 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black text-amber-950 shadow-xl border-2 border-white pointer-events-none"
                >
                  <Sparkles className="h-3 w-3 text-amber-950" />
                  <span>BẤM VÀO TÔI!</span>
                </motion.div>

                <div className="absolute inset-0 rounded-full bg-amber-400/0 group-hover:bg-amber-400/25 transition-all duration-300 blur-xl pointer-events-none" />

                {motionPhase === "PUSHING_OUT" && (
                  <motion.div
                    animate={{ opacity: [0.8, 0], scale: [0.9, 1.3] }}
                    transition={{ repeat: Infinity, duration: 0.3 }}
                    className="absolute bottom-2 font-black text-2xl text-[#C65D4B] pointer-events-none"
                  >
                    💨 💨 💨
                  </motion.div>
                )}

                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl transition-transform group-hover:scale-105 duration-300">
                  <ellipse cx="100" cy="222" rx="65" ry="12" fill="#2D241E" opacity="0.2" />

                  <path
                    d="M 55 138 L 35 212 L 165 212 L 145 138 Z"
                    fill="#8B6F5A"
                    stroke="#5A4739"
                    strokeWidth="4"
                  />
                  <path d="M 78 138 L 100 176 L 122 138" fill="none" stroke="#F5EFE6" strokeWidth="6" />
                  <rect x="62" y="168" width="76" height="18" fill="#C65D4B" rx="4" />

                  <circle cx="100" cy="98" r="46" fill="#FFE5D9" stroke="#5A4739" strokeWidth="4" />

                  {error && !isHovered && focusedField === "NONE" && (
                    <motion.path
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                      d="M 132 75 C 132 75 139 84 136 89 C 133 93 126 91 126 86 C 126 82 132 75 132 75 Z"
                      fill="#64B5F6"
                      stroke="#1E88E5"
                      strokeWidth="1.5"
                    />
                  )}

                  <path
                    d="M 52 88 Q 58 42 100 42 Q 142 42 148 88 Q 122 58 100 62 Q 78 58 52 88 Z"
                    fill="#2D241E"
                  />

                  <rect x="50" y="66" width="100" height="15" fill="#C65D4B" rx="4" />
                  <text x="100" y="78" fill="#FFFFFF" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                    先 生
                  </text>

                  {/* FACIAL EXPRESSIONS */}
                  {message ? (
                    <g>
                      <circle cx="80" cy="96" r="6" fill="#2D241E" />
                      <circle cx="120" cy="96" r="6" fill="#2D241E" />
                      <path d="M 80 91 L 82 95 L 86 96 L 82 97 L 80 101 L 78 97 L 74 96 L 78 95 Z" fill="#FFD700" />
                      <path d="M 120 91 L 122 95 L 126 96 L 122 97 L 120 101 L 118 97 L 114 96 L 118 95 Z" fill="#FFD700" />
                      <path d="M 84 114 Q 100 128 116 114" fill="none" stroke="#2D241E" strokeWidth="3.5" strokeLinecap="round" />
                      <ellipse cx="68" cy="106" rx="7" ry="4" fill="#FF8A80" opacity="0.9" />
                      <ellipse cx="132" cy="106" rx="7" ry="4" fill="#FF8A80" opacity="0.9" />
                    </g>
                  ) : isHovered ? (
                    <g>
                      <circle cx="80" cy="96" r="5" fill="#2D241E" />
                      <circle cx="82" cy="94" r="2" fill="#FFFFFF" />
                      <path d="M 112 96 L 126 96" stroke="#2D241E" strokeWidth="4" strokeLinecap="round" />
                      <path d="M 86 114 Q 100 125 114 114" fill="none" stroke="#2D241E" strokeWidth="3" strokeLinecap="round" />
                      <ellipse cx="70" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.8" />
                      <ellipse cx="130" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.8" />
                    </g>
                  ) : isCurrentPassVisible ? (
                    <g>
                      {/* PEEKING WITH RIGHT EYE (Facing the form card on the right) 😉 */}
                      {/* Left eye winking arch */}
                      <path d="M 72 96 Q 80 90 88 96" fill="none" stroke="#2D241E" strokeWidth="3.5" strokeLinecap="round" />
                      
                      {/* Right eye open peeking towards form */}
                      <circle cx="120" cy="96" r="6" fill="#2D241E" />
                      <circle cx="122" cy="94" r="2.5" fill="#FFFFFF" />
                      
                      <path d="M 84 116 Q 100 126 116 116" fill="none" stroke="#2D241E" strokeWidth="3.5" strokeLinecap="round" />
                      <ellipse cx="68" cy="106" rx="7" ry="4" fill="#FF8A80" opacity="0.9" />
                      <ellipse cx="132" cy="106" rx="7" ry="4" fill="#FF8A80" opacity="0.9" />
                    </g>
                  ) : isCurrentPassCovered ? (
                    <g>
                      <ellipse cx="70" cy="106" rx="7" ry="4" fill="#FF8A80" opacity="0.9" />
                      <ellipse cx="130" cy="106" rx="7" ry="4" fill="#FF8A80" opacity="0.9" />
                      <path d="M 88 116 Q 100 124 112 116" fill="none" stroke="#2D241E" strokeWidth="3" strokeLinecap="round" />
                    </g>
                  ) : error ? (
                    <g>
                      <path d="M 72 96 Q 80 90 88 96" fill="none" stroke="#2D241E" strokeWidth="3.5" strokeLinecap="round" />
                      <path d="M 112 96 Q 120 90 128 96" fill="none" stroke="#2D241E" strokeWidth="3.5" strokeLinecap="round" />
                      <path d="M 88 122 Q 100 114 112 122" fill="none" stroke="#2D241E" strokeWidth="3" strokeLinecap="round" />
                      <ellipse cx="70" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.8" />
                      <ellipse cx="130" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.8" />
                    </g>
                  ) : focusedField !== "NONE" ? (
                    <g>
                      <circle cx="80" cy="96" r="6" fill="#2D241E" />
                      <circle cx="120" cy="96" r="6" fill="#2D241E" />
                      <circle cx="83" cy="96" r="2.5" fill="#FFFFFF" />
                      <circle cx="123" cy="96" r="2.5" fill="#FFFFFF" />
                      <path d="M 86 114 Q 100 126 114 114" fill="none" stroke="#2D241E" strokeWidth="3" strokeLinecap="round" />
                      <ellipse cx="70" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.6" />
                      <ellipse cx="130" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.6" />
                    </g>
                  ) : (
                    <g>
                      <circle cx="80" cy="96" r="6" fill="#2D241E" />
                      <circle cx={80 + pupilOffset.x} cy={96 + pupilOffset.y} r="2.4" fill="#FFFFFF" />

                      <circle cx="120" cy="96" r="6" fill="#2D241E" />
                      <circle cx={120 + pupilOffset.x} cy={96 + pupilOffset.y} r="2.4" fill="#FFFFFF" />

                      <path
                        d={motionPhase === "PUSHING_OUT" ? "M 86 118 Q 100 110 114 118" : "M 86 114 Q 100 125 114 114"}
                        fill="none"
                        stroke="#2D241E"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <ellipse cx="70" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.6" />
                      <ellipse cx="130" cy="106" rx="6" ry="3" fill="#FFB7B2" opacity="0.6" />
                    </g>
                  )}

                  {/* ARMS AND HANDS */}
                  {isCurrentPassVisible ? (
                    <g className="z-50">
                      {/* Left hand covering left eye, Right hand lowered so right eye peeks at form card on the right */}
                      <path
                        d="M 45 165 Q 35 110 76 96"
                        fill="none"
                        stroke="#8B6F5A"
                        strokeWidth="22"
                        strokeLinecap="round"
                      />
                      <path d="M 155 165 Q 160 135 135 122" fill="none" stroke="#8B6F5A" strokeWidth="20" strokeLinecap="round" />
                      
                      <ellipse cx="78" cy="96" rx="16" ry="14" fill="#FFE5D9" stroke="#5A4739" strokeWidth="3" />
                      <path d="M 66 96 Q 78 90 90 96" fill="none" stroke="#5A4739" strokeWidth="2.5" strokeLinecap="round" />

                      <ellipse cx="135" cy="122" rx="14" ry="12" fill="#FFE5D9" stroke="#5A4739" strokeWidth="2.5" />
                    </g>
                  ) : isCurrentPassCovered ? (
                    <g className="z-50">
                      <path
                        d="M 45 165 Q 35 110 76 96"
                        fill="none"
                        stroke="#8B6F5A"
                        strokeWidth="22"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 155 165 Q 165 110 124 96"
                        fill="none"
                        stroke="#8B6F5A"
                        strokeWidth="22"
                        strokeLinecap="round"
                      />
                      <ellipse cx="78" cy="96" rx="16" ry="14" fill="#FFE5D9" stroke="#5A4739" strokeWidth="3" />
                      <path d="M 66 96 Q 78 90 90 96" fill="none" stroke="#5A4739" strokeWidth="2.5" strokeLinecap="round" />
                      
                      <ellipse cx="122" cy="96" rx="16" ry="14" fill="#FFE5D9" stroke="#5A4739" strokeWidth="3" />
                      <path d="M 110 96 Q 122 90 134 96" fill="none" stroke="#5A4739" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  ) : motionPhase === "PUSHING_OUT" ? (
                    <g>
                      <path
                        d="M 55 148 L 175 142"
                        fill="none"
                        stroke="#8B6F5A"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      <circle cx="175" cy="142" r="10" fill="#FFE5D9" stroke="#5A4739" strokeWidth="2" />
                    </g>
                  ) : motionPhase === "PULLING_IN" ? (
                    <g>
                      <path
                        d="M 45 148 Q 75 138 145 142"
                        fill="none"
                        stroke="#8B6F5A"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      <circle cx="148" cy="142" r="10" fill="#FFE5D9" />
                    </g>
                  ) : (
                    <g>
                      <path d="M 52 148 Q 100 178 148 148" fill="none" stroke="#8B6F5A" strokeWidth="18" strokeLinecap="round" />
                      <circle cx="72" cy="168" r="9" fill="#FFE5D9" />
                      <circle cx="128" cy="168" r="9" fill="#FFE5D9" />
                    </g>
                  )}
                </svg>
              </div>
            </motion.div>
          </div>

          {/* ================= AUTH CARD STAGE ================= */}
          <div className="relative w-full lg:w-1/2 flex justify-center items-center">
            {/* Real Physical Form Card */}
            <motion.div
              animate={{
                x: motionPhase === "PUSHING_OUT" ? 800 : 0,
                opacity: motionPhase === "PUSHING_OUT" ? 0 : 1,
              }}
              transition={{
                duration: motionPhase === "PUSHING_OUT" ? 0.8 : 0.8,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="w-full max-w-md rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border-2 border-[#8B6F5A]/20 backdrop-blur-md relative"
            >
              {/* Decorative Header Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#8B6F5A] px-6 py-1 text-[11px] font-extrabold text-white shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
                <span>ANH SENSEI PASSPORT</span>
              </div>

              {/* Header Title */}
              <div className="mt-3 text-center">
                <h2 className="text-2xl font-black text-[#2D241E]">
                  {mode === "LOGIN"
                    ? "Chào mừng trở lại! 👋"
                    : mode === "REGISTER"
                    ? "Tạo tài khoản học tập ⛩️"
                    : mode === "VERIFY_OTP"
                    ? "Xác thực OTP Email 🔑"
                    : "Khôi phục Mật Khẩu 🔑"}
                </h2>
                <p className="mt-1 text-xs text-[#6E5E52]">
                  {mode === "LOGIN"
                    ? "Nhập Email & Mật khẩu để tiếp tục hành trình chinh phục N5 - N3"
                    : mode === "REGISTER"
                    ? "Nhập thông tin cá nhân & chọn mục tiêu trình độ JLPT của bạn"
                    : mode === "VERIFY_OTP"
                    ? "Nhập mã OTP 6 chữ số đã gửi về Email để kích hoạt tài khoản"
                    : "Nhập Email cá nhân để nhận mã khôi phục Mật khẩu mới"}
                </p>
              </div>

              {/* ================= 1. LOGIN FORM ================= */}
              {mode === "LOGIN" && (
                <form onSubmit={handleLoginPasswordSubmit} autoComplete="off" className="mt-6 space-y-4">
                  {/* Anti-autofill trap inputs for browser password managers */}
                  <input type="text" name="prevent_autofill_email" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                  <input type="password" name="prevent_autofill_pass" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]">Email</label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="login_user_email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        onFocus={(e) => {
                          e.target.removeAttribute("readOnly");
                          handleFieldFocus("EMAIL");
                        }}
                        onBlur={() => setFocusedField("NONE")}
                        autoComplete="off"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]">Mật khẩu</label>
                    <div className="relative mt-1">
                      <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        name="login_user_pass"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onFocus={(e) => {
                          e.target.removeAttribute("readOnly");
                          handleFieldFocus("PASSWORD");
                        }}
                        onBlur={() => setFocusedField("NONE")}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
                        title={showLoginPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* REMEMBER ME & FORGOT PASSWORD ROW */}
                  <div className="flex items-center justify-between text-xs pt-0.5 select-none">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#6E5E52] hover:text-[#2D241E] transition">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#8B6F5A] focus:ring-[#8B6F5A] accent-[#8B6F5A] cursor-pointer"
                      />
                      <span>Lưu thông tin đăng nhập</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => switchMode("FORGOT_PASSWORD")}
                      className="text-[11px] font-bold text-[#C65D4B] hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#8B6F5A] py-2.5 font-bold text-white transition hover:bg-[#8B6F5A]/90 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 text-xs"
                  >
                    {loading ? "Đang xử lý..." : "Vào học ngay"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* ================= 2. ENHANCED REGISTER FORM ================= */}
              {mode === "REGISTER" && (
                <form onSubmit={handleRegisterSubmit} autoComplete="off" className="mt-4 space-y-3">
                  {/* Anti-autofill trap inputs for browser password managers */}
                  <input type="text" name="prevent_autofill_reg_name" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                  <input type="password" name="prevent_autofill_reg_pass" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]">Họ và tên</label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="register_user_fullname"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        onFocus={() => handleFieldFocus("FULL_NAME")}
                        onBlur={() => setFocusedField("NONE")}
                        autoComplete="off"
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:border-[#C65D4B] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]">Email</label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="register_user_email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        onFocus={() => handleFieldFocus("EMAIL")}
                        onBlur={() => setFocusedField("NONE")}
                        autoComplete="off"
                        placeholder="user@example.com"
                        className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:border-[#C65D4B] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Target JLPT Level Options */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E] flex items-center justify-between">
                      <span>Mục tiêu trình độ JLPT</span>
                      <span className="text-[10px] text-amber-800 font-bold">Lộ trình cá nhân</span>
                    </label>
                    <div className="mt-1 flex gap-2">
                      {(["N5", "N4", "N3"] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setRegTargetLevel(lvl)}
                          onFocus={() => handleFieldFocus("TARGET_LEVEL")}
                          onBlur={() => setFocusedField("NONE")}
                          className={`flex-1 rounded-xl py-1.5 text-xs font-black transition border ${
                            regTargetLevel === lvl
                              ? "bg-[#8B6F5A] text-white border-[#8B6F5A] shadow-md scale-105"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {lvl} {lvl === "N5" ? " (Sơ cấp 1)" : lvl === "N4" ? " (Sơ cấp 2)" : " (Trung cấp)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Password Field + Toggle Icon */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]">Mật khẩu</label>
                    <div className="relative mt-1">
                      <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type={showRegPassword ? "text" : "password"}
                        name="register_user_pass"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        onFocus={() => handleFieldFocus("PASSWORD")}
                        onBlur={() => setFocusedField("NONE")}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-[#8B6F5A] transition"
                        title={showRegPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* DYNAMIC PASSWORD REQUIREMENTS CHECKLIST BOX */}
                    <div className="mt-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200 space-y-1">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Yêu cầu mật khẩu an toàn:</span>
                        <span className={isRegPassFullyValid ? "text-emerald-600 font-extrabold" : "text-gray-400"}>
                          {isRegPassFullyValid ? "ĐẠT CHUẨN 100% 🛡️" : "Chưa đủ tiêu chí"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                        <div className={`flex items-center gap-1 font-medium ${regPassCriteria.length ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                          {regPassCriteria.length ? <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                          <span>Tối thiểu 8 ký tự</span>
                        </div>
                        <div className={`flex items-center gap-1 font-medium ${regPassCriteria.hasUpper ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                          {regPassCriteria.hasUpper ? <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                          <span>Có chữ HOA (A-Z)</span>
                        </div>
                        <div className={`flex items-center gap-1 font-medium ${regPassCriteria.hasLower ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                          {regPassCriteria.hasLower ? <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                          <span>Có chữ thường (a-z)</span>
                        </div>
                        <div className={`flex items-center gap-1 font-medium ${regPassCriteria.hasNumberOrSpecial ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                          {regPassCriteria.hasNumberOrSpecial ? <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                          <span>Chữ số (0-9) / Ký tự (!@#)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password + Toggle Icon */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]">Xác nhận mật khẩu</label>
                    <div className="relative mt-1">
                      <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type={showRegConfirmPassword ? "text" : "password"}
                        name="register_user_confirm_pass"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        onFocus={() => handleFieldFocus("CONFIRM_PASSWORD")}
                        onBlur={() => setFocusedField("NONE")}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-[#8B6F5A] transition"
                        title={showRegConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showRegConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={regAgreeTerms}
                      onChange={(e) => setRegAgreeTerms(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-[#8B6F5A] focus:ring-[#8B6F5A] accent-[#8B6F5A]"
                    />
                    <label htmlFor="agreeTerms" className="text-[10px] text-gray-600 cursor-pointer select-none">
                      Tôi đồng ý với{" "}
                      <span className="font-bold text-[#8B6F5A] underline">Điều khoản dịch vụ</span> &{" "}
                      <span className="font-bold text-[#8B6F5A] underline">Chính sách bảo mật</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#8B6F5A] py-2.5 font-bold text-white transition hover:bg-[#8B6F5A]/90 shadow-md text-xs"
                  >
                    {loading ? "Đang xử lý..." : "Tạo Tài Khoản Mới"}
                  </button>
                </form>
              )}

              {/* ================= 3. COMPACT DEDICATED VERIFY OTP FORM ================= */}
              {mode === "VERIFY_OTP" && (
                <form onSubmit={handleVerifyOtp} autoComplete="off" className="mt-5 space-y-4">
                  {/* Anti-autofill trap inputs */}
                  <input type="text" name="prevent_autofill_otp_email" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                  <input type="password" name="prevent_autofill_otp_pass" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

                  <div className="rounded-2xl bg-amber-50/60 p-4 border border-amber-200/80 space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D241E]">Email kích hoạt tài khoản</label>
                      <div className="mt-1 flex gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            name="verify_user_email"
                            value={otpEmail}
                            onChange={(e) => setOtpEmail(e.target.value)}
                            onFocus={() => handleFieldFocus("EMAIL")}
                            onBlur={() => setFocusedField("NONE")}
                            autoComplete="off"
                            placeholder="nhapemail@gmail.com"
                            className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none bg-white"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleRequestOtp}
                          disabled={loading}
                          className="whitespace-nowrap rounded-xl border border-[#8B6F5A] bg-white px-3 py-2 text-[11px] font-bold text-[#8B6F5A] hover:bg-[#F5EFE6] shadow-sm"
                        >
                          {loading ? "Gửi..." : otpSent ? "Gửi lại" : "Lấy OTP"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D241E]">Mã OTP 6 chữ số</label>
                      <div className="relative mt-1">
                        <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="verify_otp_code_digits"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          onFocus={() => handleFieldFocus("OTP")}
                          onBlur={() => setFocusedField("NONE")}
                          autoComplete="one-time-code"
                          placeholder="VD: 839215"
                          className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-center text-base tracking-widest font-mono focus:border-[#8B6F5A] focus:outline-none bg-white font-bold"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-2.5 text-[11px] text-blue-700 border border-blue-200 flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Mã OTP 6 chữ số có hiệu lực trong 5 phút. Vui lòng kiểm tra cả thư mục Thư rác (Spam) nếu chưa tìm thấy.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !otpCode}
                    className="w-full rounded-xl bg-[#8B6F5A] py-2.5 font-bold text-white shadow-md text-xs flex items-center justify-center gap-2 transition hover:bg-[#8B6F5A]/90"
                  >
                    {loading ? "Đang xác thực..." : "Xác Nhận & Kích Hoạt Tài Khoản"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* ================= 4. FORGOT PASSWORD FORM (2 STEPS) ================= */}
              {mode === "FORGOT_PASSWORD" && (
                <div className="mt-5 space-y-4">
                  {forgotStep === "REQUEST" ? (
                    <form onSubmit={handleForgotPasswordRequest} autoComplete="off" className="space-y-4">
                      {/* Anti-autofill trap inputs */}
                      <input type="text" name="prevent_autofill_forgot_email" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                      <input type="password" name="prevent_autofill_forgot_pass" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

                      <div>
                        <label className="block text-xs font-semibold text-[#2D241E]">Email khôi phục tài khoản</label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            name="forgot_user_email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            onFocus={() => handleFieldFocus("EMAIL")}
                            onBlur={() => setFocusedField("NONE")}
                            autoComplete="off"
                            placeholder="user@gmail.com"
                            className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#8B6F5A] py-2.5 font-bold text-white transition hover:bg-[#8B6F5A]/90 shadow-md text-xs flex items-center justify-center gap-2"
                      >
                        {loading ? "Đang gửi..." : "Gửi Mã Khôi Phục Về Email"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleResetPasswordSubmit} autoComplete="off" className="space-y-3">
                      {/* Anti-autofill trap inputs */}
                      <input type="text" name="prevent_autofill_reset_code" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                      <input type="password" name="prevent_autofill_reset_pass" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

                      {/* Email display info badge */}
                      <div className="rounded-xl bg-amber-50/80 p-2.5 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-medium truncate">
                          <Mail className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                          <span className="truncate">{forgotEmail}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForgotStep("REQUEST")}
                          className="text-[11px] font-bold text-[#8B6F5A] hover:underline whitespace-nowrap ml-2"
                        >
                          Đổi Email
                        </button>
                      </div>

                      {/* 6-Digit OTP Input + Resend Button */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-[#2D241E]">Mã OTP khôi phục 6 chữ số</label>
                          <button
                            type="button"
                            onClick={handleForgotPasswordRequest}
                            disabled={loading}
                            className="text-[11px] font-bold text-[#8B6F5A] hover:underline flex items-center gap-1"
                          >
                            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                            <span>Gửi lại OTP</span>
                          </button>
                        </div>
                        <div className="relative mt-1">
                          <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="user_reset_otp_token_code_input"
                            readOnly
                            maxLength={6}
                            value={forgotToken}
                            onChange={(e) => setForgotToken(e.target.value)}
                            onFocus={(e) => {
                              e.target.removeAttribute("readOnly");
                              handleFieldFocus("FORGOT_TOKEN");
                            }}
                            onBlur={() => setFocusedField("NONE")}
                            autoComplete="off"
                            placeholder="VD: 839215"
                            className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-center text-base tracking-widest font-mono font-bold focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20 bg-white"
                            required
                          />
                        </div>
                      </div>

                      {/* New Password Field */}
                      <div>
                        <label className="block text-xs font-semibold text-[#2D241E]">Mật khẩu mới</label>
                        <div className="relative mt-1">
                          <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input
                            type={showForgotNewPassword ? "text" : "password"}
                            name="user_new_secret_password_input"
                            readOnly
                            value={forgotNewPassword}
                            onChange={(e) => setForgotNewPassword(e.target.value)}
                            onFocus={(e) => {
                              e.target.removeAttribute("readOnly");
                              handleFieldFocus("PASSWORD");
                            }}
                            onBlur={() => setFocusedField("NONE")}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-[#8B6F5A] transition"
                            title={showForgotNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          >
                            {showForgotNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>

                        {/* PASSWORD REQUIREMENTS CHECKLIST BOX FOR RESET */}
                        <div className="mt-2 rounded-xl bg-slate-50 p-2 border border-slate-200 space-y-1">
                          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                            <span>Tiêu chuẩn mật khẩu mới:</span>
                            <span className={isForgotPassFullyValid ? "text-emerald-600 font-extrabold" : "text-gray-400"}>
                              {isForgotPassFullyValid ? "ĐẠT CHUẨN 🛡️" : "Chưa đủ"}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[10px]">
                            <div className={`flex items-center gap-1 ${forgotPassCriteria.length ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                              {forgotPassCriteria.length ? <Check className="h-3 w-3 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                              <span>Tối thiểu 8 ký tự</span>
                            </div>
                            <div className={`flex items-center gap-1 ${forgotPassCriteria.hasUpper ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                              {forgotPassCriteria.hasUpper ? <Check className="h-3 w-3 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                              <span>Chữ HOA (A-Z)</span>
                            </div>
                            <div className={`flex items-center gap-1 ${forgotPassCriteria.hasLower ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                              {forgotPassCriteria.hasLower ? <Check className="h-3 w-3 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                              <span>Chữ thường (a-z)</span>
                            </div>
                            <div className={`flex items-center gap-1 ${forgotPassCriteria.hasNumberOrSpecial ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                              {forgotPassCriteria.hasNumberOrSpecial ? <Check className="h-3 w-3 text-emerald-600 shrink-0" /> : <CircleDot className="h-3 w-3 text-gray-300 shrink-0" />}
                              <span>Chữ số (0-9) / Ký tự</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Confirm New Password Field */}
                      <div>
                        <label className="block text-xs font-semibold text-[#2D241E]">Xác nhận mật khẩu mới</label>
                        <div className="relative mt-1">
                          <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input
                            type={showForgotConfirmPassword ? "text" : "password"}
                            name="user_confirm_secret_password_input"
                            readOnly
                            value={forgotConfirmPassword}
                            onChange={(e) => setForgotConfirmPassword(e.target.value)}
                            onFocus={(e) => {
                              e.target.removeAttribute("readOnly");
                              handleFieldFocus("CONFIRM_PASSWORD");
                            }}
                            onBlur={() => setFocusedField("NONE")}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2 text-xs focus:border-[#8B6F5A] focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/20"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-[#8B6F5A] transition"
                            title={showForgotConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          >
                            {showForgotConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#8B6F5A] py-2.5 font-bold text-white transition hover:bg-[#8B6F5A]/90 shadow-md text-xs flex items-center justify-center gap-2"
                      >
                        {loading ? "Đang xử lý..." : "Cập Nhật Mật Khẩu Mới"}
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Divider & Google SDK Button */}
              {mode !== "VERIFY_OTP" && mode !== "FORGOT_PASSWORD" && (
                <>
                  <div className="relative flex items-center justify-center py-3">
                    <div className="w-full border-t border-gray-200"></div>
                    <span className="absolute bg-white px-3 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                      HOẶC
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div id="google-button-container" className="min-h-[44px] w-full flex justify-center" />
                  </div>
                </>
              )}

              {/* Bottom Toggle Link */}
              <div className="mt-5 text-center text-xs text-[#6E5E52] space-y-1.5">
                {mode === "LOGIN" ? (
                  <>
                    <div>
                      Chưa có tài khoản?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("REGISTER")}
                        className="font-bold text-[#C65D4B] hover:underline"
                      >
                        Bấm vào Sensei để Đăng ký ngay
                      </button>
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Tài khoản chưa kích hoạt OTP?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("VERIFY_OTP")}
                        className="font-bold text-[#8B6F5A] hover:underline"
                      >
                        Kích hoạt OTP tại đây
                      </button>
                    </div>
                  </>
                ) : mode === "REGISTER" ? (
                  <span>
                    Đã có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("LOGIN")}
                      className="font-bold text-[#8B6F5A] hover:underline"
                    >
                      Bấm vào Sensei để Đăng nhập
                    </button>
                  </span>
                ) : (
                  <span>
                    Đã hoàn tất?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("LOGIN")}
                      className="font-bold text-[#8B6F5A] hover:underline"
                    >
                      Bấm vào Sensei để Quay lại Đăng nhập
                    </button>
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
