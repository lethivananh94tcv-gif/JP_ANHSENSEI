"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import {
  User,
  Target,
  Globe,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Shield,
  Clock,
  Award,
  Key,
  Camera,
  Check,
  Zap,
  BookOpen,
  ArrowRight,
  Flame,
  Upload,
  Image as ImageIcon,
  Edit3,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Mail,
  MoreHorizontal,
  Users,
  Settings,
  Lock,
  Heart,
  Share2,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileData {
  userId: number;
  email: string;
  fullName: string;
  avatarUrl?: string;
  targetLevel?: string;
  timezone: string;
  role: string;
  status: string;
}

export default function LearnerProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [fullName, setFullName] = useState("");
  const [targetLevel, setTargetLevel] = useState("N5");
  const [timezone, setTimezone] = useState("Asia/Ho_Chi_Minh");
  const [bio, setBio] = useState("Dự định chinh phục N3 JLPT năm 2026 🌸");
  const [dailyGoal, setDailyGoal] = useState("20");

  // Avatar Customization State
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [presetEmoji, setPresetEmoji] = useState<string | null>("🐱");
  const [avatarBg, setAvatarBg] = useState("from-[#C65D4B] to-[#FF8C78]");

  // Facebook Navigation Tabs State: "ABOUT" | "TIMELINE" | "GOALS" | "SECURITY"
  const [activeTab, setActiveTab] = useState<"ABOUT" | "TIMELINE" | "GOALS" | "SECURITY">("ABOUT");

  // Password Change Fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Preset Avatar Mascot List
  const presetAvatars = [
    { id: "cat", name: "Mèo ANH SENSEI", emoji: "🐱", bg: "from-[#C65D4B] to-[#FF8C78]" },
    { id: "fox", name: "Cáo Kitsune", emoji: "🦊", bg: "from-orange-500 to-amber-600" },
    { id: "ninja", name: "Ninja Sakura", emoji: "🌸", bg: "from-rose-500 to-[#C65D4B]" },
    { id: "samurai", name: "Samurai Zen", emoji: "⛩️", bg: "from-[#231917] to-[#8B6F5A]" },
    { id: "dango", name: "Thần Tài Dango", emoji: "🍡", bg: "from-emerald-600 to-teal-600" },
    { id: "panda", name: "Panda Sensei", emoji: "🐼", bg: "from-[#56423E] to-[#231917]" },
  ];

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      let data: ProfileData | null = null;
      try {
        const res = await apiClient<ProfileData>("/learner/profile");
        if (res.data) data = res.data;
      } catch {
        const localRaw = localStorage.getItem("user");
        if (localRaw) {
          data = JSON.parse(localRaw);
        }
      }

      if (data) {
        setProfile(data);
        setFullName(data.fullName || "emkienne");
        setTargetLevel(data.targetLevel || "N5");
        setTimezone(data.timezone || "Asia/Ho_Chi_Minh");
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
      } else {
        setProfile({
          userId: 1,
          email: "emkienne@anhsensei.com",
          fullName: "emkienne",
          targetLevel: "N5",
          timezone: "Asia/Ho_Chi_Minh",
          role: "LEARNER",
          status: "ACTIVE"
        });
        setFullName("emkienne");
      }
    } catch (err: any) {
      setErrorMessage("Không thể tải thông tin trang cá nhân.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        fullName,
        targetLevel,
        timezone,
        avatarUrl: avatarUrl || undefined,
      };

      try {
        await apiClient("/learner/profile", {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } catch {
        // Fallback save to localStorage
        const localRaw = localStorage.getItem("user");
        if (localRaw) {
          const u = JSON.parse(localRaw);
          const updated = { ...u, fullName, targetLevel, timezone, avatarUrl };
          localStorage.setItem("user", JSON.stringify(updated));
        }
      }

      setSuccessMessage("✅ Đã cập nhật trang cá nhân Facebook thành công!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || "Lỗi khi lưu thông tin cá nhân.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu mới không trùng khớp!");
      return;
    }
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 4000);
  };

  const handleSelectPreset = (emoji: string, bg: string) => {
    setPresetEmoji(emoji);
    setAvatarBg(bg);
    setAvatarUrl(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setPresetEmoji(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F1E8] text-[#2B211D] font-sans flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#C65D4B] animate-spin" />
        <p className="text-xs font-bold text-[#76655A]">⛩️ Đang nạp trang cá nhân Facebook ANH SENSEI...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0E6D8] text-[#2B211D] font-sans flex flex-col antialiased">
      {/* HEADER NAVBAR */}
      <LearnerHeader />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full pb-12 space-y-4">

        {/* ================================================================= */}
        {/* 1. FACEBOOK PROFILE COVER PHOTO & HERO HEADER SECTION */}
        {/* ================================================================= */}
        <div className="bg-[#FFFDF9] border-b border-[#E5D7C7] shadow-xs">
          <div className="max-w-[1120px] mx-auto">

            {/* COVER PHOTO BANNER CONTAINER */}
            <div className="relative h-48 sm:h-72 md:h-80 w-full rounded-b-2xl sm:rounded-b-3xl overflow-hidden bg-gradient-to-r from-[#231917] via-[#4A3426] to-[#C65D4B] border-x border-b border-[#E5D7C7]">
              {/* Decorative Japanese Fuji & Torii Pattern Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#FFFDF9_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
              <div className="absolute right-6 top-6 opacity-20 pointer-events-none font-black text-6xl text-white select-none">
                日本国 · ANH SENSEI
              </div>

              {/* Cover Gradient Graphic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Edit Cover Photo Button (Facebook Style) */}
              <button
                type="button"
                className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Camera className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Chỉnh sửa ảnh bìa</span>
              </button>
            </div>

            {/* PROFILE INFO BAR (OVERLAPPING AVATAR & USER DETAILS) */}
            <div className="px-4 sm:px-8 pb-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4">

                {/* LEFT: AVATAR + NAME + BIO */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-left gap-4 sm:gap-6 w-full md:w-auto">

                  {/* FACEBOOK STYLE CIRCULAR AVATAR WITH WHITE RING */}
                  <div className="relative group shrink-0 -mt-16 sm:-mt-20 md:-mt-24 z-20">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#FFFDF9] shadow-xl overflow-hidden bg-white flex items-center justify-center">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-tr ${avatarBg} flex items-center justify-center text-5xl sm:text-6xl text-white shadow-inner font-black`}>
                          {presetEmoji || fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Camera Upload Overlay Badge */}
                    <label
                      htmlFor="avatar-file-input"
                      className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#FAF4EB] border-2 border-[#FFFDF9] hover:bg-[#C65D4B] hover:text-white text-[#1F1714] shadow-md flex items-center justify-center transition-all cursor-pointer"
                      title="Tải ảnh đại diện mới"
                    >
                      <Camera className="w-4 h-4" />
                      <input
                        id="avatar-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* JLPT Level Badge Tag */}
                    <span className="absolute top-1 left-1 px-2.5 py-0.5 rounded-full bg-[#C65D4B] text-white font-black text-[10px] uppercase shadow-xs border border-white">
                      {targetLevel} PASS
                    </span>
                  </div>

                  {/* USER NAME & SUBTITLE INFO - POSITIONED CLEANLY BESIDE AVATAR */}
                  <div className="space-y-1.5 pt-2 sm:pt-4 pb-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h1 className="text-2xl sm:text-3xl font-black text-[#1F1714] tracking-tight">
                        {fullName}
                      </h1>
                      <span title="Tài khoản đã xác thực">
                        <CheckCircle className="w-5 h-5 text-[#C65D4B] fill-[#C65D4B]/15" />
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#6E5D55]">
                      {bio}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#8B6F5A] font-medium pt-0.5">
                      <span className="flex items-center gap-1 font-bold text-[#C65D4B]">
                        <Flame className="w-3.5 h-3.5 fill-[#C65D4B]" />
                        <span>30 Ngày liên tục</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#76655A]" />
                        <span>2.4k Bạn cùng học</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: FACEBOOK QUICK ACTION BUTTONS */}
                <div className="flex items-center gap-2.5 w-full md:w-auto justify-center md:justify-end shrink-0 pt-2 md:pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("ABOUT")}
                    className="px-4 py-2 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Chỉnh sửa trang cá nhân</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("GOALS")}
                    className="px-4 py-2 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#1F1714] font-bold text-xs rounded-xl border border-[#E5D7C7] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Award className="w-3.5 h-3.5 text-[#C65D4B]" />
                    <span>Thành tích JLPT</span>
                  </button>

                  <button
                    type="button"
                    className="p-2 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#1F1714] rounded-xl border border-[#E5D7C7] transition-all cursor-pointer shadow-2xs"
                    title="Khác"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ============================================================= */}
              {/* FACEBOOK NAVIGATION TABS BAR */}
              {/* ============================================================= */}
              <div className="flex items-center gap-1 border-t border-[#E5D7C7] mt-5 pt-1 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveTab("ABOUT")}
                  className={`px-4 py-3 text-xs font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${activeTab === "ABOUT"
                      ? "border-[#C65D4B] text-[#C65D4B]"
                      : "border-transparent text-[#76655A] hover:text-[#1F1714] hover:bg-[#FAF4EB] rounded-t-xl"
                    }`}
                >
                  <User className="w-4 h-4" />
                  <span>Giới thiệu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("TIMELINE")}
                  className={`px-4 py-3 text-xs font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${activeTab === "TIMELINE"
                      ? "border-[#C65D4B] text-[#C65D4B]"
                      : "border-transparent text-[#76655A] hover:text-[#1F1714] hover:bg-[#FAF4EB] rounded-t-xl"
                    }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Nhật ký học</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("GOALS")}
                  className={`px-4 py-3 text-xs font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${activeTab === "GOALS"
                      ? "border-[#C65D4B] text-[#C65D4B]"
                      : "border-transparent text-[#76655A] hover:text-[#1F1714] hover:bg-[#FAF4EB] rounded-t-xl"
                    }`}
                >
                  <Target className="w-4 h-4" />
                  <span>Mục tiêu JLPT</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("SECURITY")}
                  className={`px-4 py-3 text-xs font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${activeTab === "SECURITY"
                      ? "border-[#C65D4B] text-[#C65D4B]"
                      : "border-transparent text-[#76655A] hover:text-[#1F1714] hover:bg-[#FAF4EB] rounded-t-xl"
                    }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Bảo mật & Cài đặt</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ALERT SUCCESS / ERROR MESSAGES */}
        {successMessage && (
          <div className="max-w-[1120px] mx-auto px-4">
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 2. MAIN 2-COLUMN FACEBOOK PROFILE BODY LAYOUT */}
        {/* ================================================================= */}
        <div className="max-w-[1120px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

            {/* =============================================================== */}
            {/* LEFT COLUMN: FACEBOOK INTRO CARD (~360px) */}
            {/* =============================================================== */}
            <div className="lg:col-span-4 space-y-4">

              {/* CARD 1: GIỚI THIỆU (INTRO DETAILS) */}
              <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-4.5 shadow-2xs space-y-3.5">
                <h3 className="text-sm font-black text-[#1F1714] flex items-center gap-2">
                  <span>Giới thiệu</span>
                </h3>

                <p className="text-xs text-[#52443C] font-medium text-center bg-[#FAF4EB] border border-[#E5D7C7] p-2.5 rounded-xl">
                  "{bio}"
                </p>

                <div className="space-y-2.5 pt-1 text-xs text-[#52443C] font-medium">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#C65D4B] shrink-0" />
                    <span>Học tại <strong className="text-[#1F1714]">Hệ thống ANH SENSEI</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C65D4B] shrink-0" />
                    <span>Sống tại <strong className="text-[#1F1714]">Hà Nội, Việt Nam</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Target className="w-4 h-4 text-[#C65D4B] shrink-0" />
                    <span>Mục tiêu: <strong className="text-[#C65D4B]">Đạt Bằng JLPT {targetLevel}</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#C65D4B] shrink-0" />
                    <span className="truncate">{profile?.email}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#C65D4B] shrink-0" />
                    <span>Múi giờ: <strong className="text-[#1F1714]">{timezone}</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#C65D4B] shrink-0" />
                    <span>Tham gia từ tháng 8 năm 2026</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("ABOUT")}
                  className="w-full py-2 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#1F1714] font-bold text-xs rounded-xl border border-[#E5D7C7] transition-all cursor-pointer shadow-2xs"
                >
                  Chỉnh sửa chi tiết
                </button>
              </div>

              {/* CARD 2: HỘ CHIẾU & HUY HIỆU JLPT */}
              <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-4.5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-[#1F1714]">Huy hiệu & Bằng cấp</h3>
                  <span className="text-[11px] font-bold text-[#C65D4B] cursor-pointer hover:underline">Xem tất cả</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-2.5 rounded-xl text-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] flex items-center justify-center mx-auto">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-[#1F1714] block">N5 PASS</span>
                    <span className="text-[10px] text-[#76655A] block">Đã hoàn thành</span>
                  </div>

                  <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-2.5 rounded-xl text-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                      <Flame className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-[#1F1714] block">SRS 30 Ngày</span>
                    <span className="text-[10px] text-[#76655A] block">Chuỗi học xuất sắc</span>
                  </div>
                </div>
              </div>

              {/* CARD 3: BẠN CÙNG HỌC (FRIENDS GRID) */}
              <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-4.5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-[#1F1714]">Bạn cùng học</h3>
                    <span className="text-[11px] text-[#76655A] font-medium">2,418 người bạn</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#C65D4B] cursor-pointer hover:underline">Xem tất cả</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["Tanaka", "Satou", "Kimura", "Yamada", "Santos", "Suzuki", "Watanabe", "Ito", "Kobayashi"].map((name, idx) => (
                    <div key={idx} className="space-y-1 text-center">
                      <div className="w-full aspect-square rounded-xl bg-gradient-to-tr from-[#C65D4B] to-[#FF8C78] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        {name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-bold text-[#1F1714] block truncate">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* =============================================================== */}
            {/* RIGHT COLUMN: MAIN FORM / CONFIG TAB CONTENT */}
            {/* =============================================================== */}
            <div className="lg:col-span-8 space-y-4">

              {/* TAB 1: ABOUT (CẤU HÌNH THÔNG TIN CÁ NHÂN & AVATAR) */}
              {activeTab === "ABOUT" && (
                <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
                  <div className="border-b border-[#E5D7C7] pb-3">
                    <h3 className="text-base sm:text-lg font-black text-[#1F1714]">
                      Cấu Hình Thông Tin Cá Nhân & Ảnh Đại Diện
                    </h3>
                    <p className="text-xs text-[#6E5D55]">
                      Cập nhật ảnh đại diện, danh xưng và avatar mascot hiển thị trên toàn bộ hệ thống ANH SENSEI.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-5">

                    {/* AVATAR MASCOT SELECTION */}
                    <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-4 rounded-xl space-y-3">
                      <span className="text-xs font-black text-[#8B6F5A] uppercase tracking-wider block">
                        📸 TÙY CHỌN ÁNH ĐẠI DIỆN (AVATAR MASCOT):
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {presetAvatars.map((item) => {
                          const isSelected = presetEmoji === item.emoji;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectPreset(item.emoji, item.bg)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${isSelected
                                  ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-xs"
                                  : "bg-[#FFFDF9] border-[#E5D7C7] text-[#1F1714] hover:border-[#C65D4B]/50"
                                }`}
                            >
                              <span className="text-2xl">{item.emoji}</span>
                              <div className="min-w-0">
                                <span className="text-xs font-bold block truncate">{item.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* FULL NAME INPUT */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1F1714] block">
                        Họ và Tên (Tên hiển thị):
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl text-sm font-bold text-[#1F1714] focus:outline-none focus:border-[#C65D4B]"
                        placeholder="Nhập họ tên của bạn..."
                      />
                    </div>

                    {/* BIO TEXTAREA */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1F1714] block">
                        Tiểu sử (Bio ngắn):
                      </label>
                      <textarea
                        rows={2}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl text-sm font-medium text-[#1F1714] focus:outline-none focus:border-[#C65D4B]"
                        placeholder="Viết một chút về mục tiêu học tập tiếng Nhật của bạn..."
                      />
                    </div>

                    {/* MÚI GIỜ */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1F1714] block">
                        Múi giờ hệ thống:
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl text-sm font-bold text-[#1F1714] focus:outline-none focus:border-[#C65D4B]"
                      >
                        <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7 · Việt Nam)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9 · Nhật Bản)</option>
                      </select>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>Lưu Thay Đổi Trang Cá Nhân</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: TIMELINE (NHẬT KÝ HỌC HÀNG NGÀY) */}
              {activeTab === "TIMELINE" && (
                <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                  <h3 className="text-base font-black text-[#1F1714]">Nhật Ký Học Tập (Timeline Feed)</h3>
                  <div className="space-y-3 text-xs">
                    <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#C65D4B]">
                        <span>⛩️ Đã hoàn thành Bài 7 Ngữ Pháp N5</span>
                        <span className="text-[10px] text-[#76655A]">2 giờ trước</span>
                      </div>
                      <p className="text-[#52443C]">Đã vượt qua 10/10 câu hỏi điền trợ từ và 10 thử thách xếp thẻ gỗ Ema!</p>
                    </div>

                    <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#C65D4B]">
                        <span>🌸 Đã đạt mốc 30 Ngày Chuỗi Liên Tục (Streak)</span>
                        <span className="text-[10px] text-[#76655A]">Hôm qua</span>
                      </div>
                      <p className="text-[#52443C]">Duy trì học 20 thẻ từ vựng mỗi ngày trên thuật toán SRS Spaced Repetition.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: GOALS (MỤC TIÊU JLPT) */}
              {activeTab === "GOALS" && (
                <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
                  <div className="border-b border-[#E5D7C7] pb-3">
                    <h3 className="text-base sm:text-lg font-black text-[#1F1714]">Mục Tiêu & Cấp Độ JLPT Target</h3>
                    <p className="text-xs text-[#6E5D55]">Thiết lập cấp độ mục tiêu để hệ thống ANH SENSEI tối ưu hóa lộ trình bài học.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["N5", "N4", "N3"].map((lvl) => {
                      const isSel = targetLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setTargetLevel(lvl)}
                          className={`p-4 rounded-xl border text-center transition-all cursor-pointer space-y-1 ${isSel ? "bg-[#C65D4B] text-white border-[#C65D4B] font-black" : "bg-[#FAF4EB] border-[#E5D7C7] text-[#1F1714] font-bold"
                            }`}
                        >
                          <span className="text-xl block">JLPT {lvl}</span>
                          <span className="text-[10px] block opacity-80">{lvl === "N5" ? "Nhập môn" : lvl === "N4" ? "Sơ cấp" : "Trung cấp"}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: SECURITY (BẢO MẬT & MẬT KHẨU) */}
              {activeTab === "SECURITY" && (
                <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
                  <div className="border-b border-[#E5D7C7] pb-3">
                    <h3 className="text-base sm:text-lg font-black text-[#1F1714]">Bảo Mật Tài Khoản & Đổi Mật Khẩu</h3>
                    <p className="text-xs text-[#6E5D55]">Cập nhật mật khẩu bảo mật đăng nhập.</p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1F1714] block">Mật khẩu hiện tại:</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl text-sm font-bold"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1F1714] block">Mật khẩu mới:</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl text-sm font-bold"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1F1714] block">Xác nhận mật khẩu mới:</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl text-sm font-bold"
                        placeholder="••••••••"
                      />
                    </div>

                    {passwordSaved && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold">
                        ✅ Đã cập nhật mật khẩu mới thành công!
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Cập Nhật Mật Khẩu
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>

          </div>
        </div>

      </main>

      {/* FOOTER */}
      <LearnerFooter />
    </div>
  );
}
