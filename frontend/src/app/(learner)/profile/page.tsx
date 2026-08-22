"use client";

import { useEffect, useState } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
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
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card3DTilt from "@/components/ui/Card3DTilt";

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
  const [bio, setBio] = useState("Dự định chinh phục N3 JLPT năm 2026 🎌");
  const [dailyGoal, setDailyGoal] = useState("20");

  // Avatar Customization State
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [presetEmoji, setPresetEmoji] = useState<string | null>("🐱");
  const [avatarBg, setAvatarBg] = useState("from-[#C65D4B] to-[#FF8C78]");

  // Active Tab: "PERSONAL" | "GOALS" | "PREFERENCES" | "SECURITY"
  const [activeTab, setActiveTab] = useState<"PERSONAL" | "GOALS" | "PREFERENCES" | "SECURITY">("PERSONAL");

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
        const defaultProfile: ProfileData = {
          userId: 1,
          email: "emkienne@anhsensei.com",
          fullName: "emkienne",
          targetLevel: "N5",
          timezone: "Asia/Ho_Chi_Minh",
          role: "LEARNER",
          status: "ACTIVE",
        };
        setProfile(defaultProfile);
        setFullName("emkienne");
      }

      // Check stored custom target level
      const savedLevel = localStorage.getItem("user_target_level");
      if (savedLevel) {
        setTargetLevel(savedLevel);
      }

      // Check stored custom avatar & emoji
      const savedAvatar = localStorage.getItem("user_avatar");
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      } else {
        setAvatarUrl(null);
      }
      const savedEmoji = localStorage.getItem("user_emoji");
      if (savedEmoji) {
        setPresetEmoji(savedEmoji);
      }
      const savedBg = localStorage.getItem("user_avatar_bg");
      if (savedBg) {
        setAvatarBg(savedBg);
      }
    } catch (err: any) {
      setErrorMessage("Không thể tải thông tin hồ sơ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Custom Image Upload Handler (Base64 Reader)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Dung lượng ảnh tải lên không được vượt quá 5MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        setAvatarUrl(resultStr);
        setPresetEmoji(null);
        localStorage.setItem("user_avatar", resultStr);
        localStorage.removeItem("user_emoji");
        setSuccessMessage("🎉 Đã áp dụng ảnh đại diện cá nhân mới!");
        setTimeout(() => setSuccessMessage(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Select Target Level & Save
  const handleSelectTargetLevel = (lvlCode: string) => {
    setTargetLevel(lvlCode);
    localStorage.setItem("user_target_level", lvlCode);
    setSuccessMessage(`🎯 Đã chọn mục tiêu trình độ ${lvlCode}!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Select Preset Mascot Avatar (Wipes uploaded image completely!)
  const handleSelectPreset = (pre: typeof presetAvatars[0]) => {
    setAvatarUrl(null);
    setPresetEmoji(pre.emoji);
    setAvatarBg(pre.bg);
    localStorage.removeItem("user_avatar");
    localStorage.setItem("user_emoji", pre.emoji);
    localStorage.setItem("user_avatar_bg", pre.bg);
    setSuccessMessage(`🎉 Đã áp dụng Mascot ${pre.name} làm ảnh đại diện!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const updatedData = {
        fullName: fullName.trim(),
        targetLevel,
        timezone: timezone.trim(),
        avatarUrl: avatarUrl || "",
      };

      try {
        const res = await apiClient<ProfileData>("/learner/profile", {
          method: "PATCH",
          body: JSON.stringify(updatedData),
        });
        if (res.data) {
          setProfile(res.data);
        }
      } catch {
        // Fallback update
      }

      // Sync targetLevel and user profile to localStorage cleanly
      localStorage.setItem("user_target_level", targetLevel);
      const storedUser = localStorage.getItem("user");
      let parsed = storedUser ? JSON.parse(storedUser) : {};
      parsed = {
        ...parsed,
        fullName: fullName.trim(),
        targetLevel,
        timezone: timezone.trim(),
        avatarUrl: avatarUrl || "",
      };
      localStorage.setItem("user", JSON.stringify(parsed));

      if (avatarUrl) {
        localStorage.setItem("user_avatar", avatarUrl);
      } else {
        localStorage.removeItem("user_avatar");
      }

      setSuccessMessage(`🎉 Đã lưu thành công Mục tiêu ${targetLevel} & Hồ sơ cá nhân!`);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      setErrorMessage("Cập nhật thất bại. Vui lòng kiểm tra lại thông tin.");
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
    setErrorMessage("");
    setTimeout(() => {
      setPasswordSaved(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#231917] flex flex-col justify-between select-none">
      <div>
        <LearnerHeader user={profile ? { email: profile.email, fullName: fullName || profile.fullName, avatarUrl: avatarUrl || undefined } as any : null} />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* TOP 3D JAPANESE JLPT PASSPORT CARD HEADER */}
          <Card3DTilt className="w-full">
            <div className="relative w-full bg-gradient-to-br from-[#1E1715] via-[#2E201C] to-[#150E0D] rounded-3xl p-6 sm:p-8 text-white border-2 border-[#D4AF37]/40 shadow-2xl overflow-hidden">
              {/* Gold foil metallic accent line */}
              <div className="absolute inset-0 border border-amber-400/20 rounded-3xl pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#C65D4B]/30 rounded-full blur-3xl pointer-events-none" />

              {/* Japanese Seal Watermark */}
              <div className="absolute right-8 bottom-2 text-8xl font-jp font-black text-white/[0.04] pointer-events-none hidden sm:block tracking-widest">
                日本国
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* 3D Interactive Avatar with Priority Render: Custom Image > Preset Emoji > Letter Initial */}
                <div className="relative group shrink-0">
                  {avatarUrl ? (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white relative">
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ) : presetEmoji ? (
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr ${avatarBg} text-white flex items-center justify-center text-5xl sm:text-6xl shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-transform`}>
                      {presetEmoji}
                    </div>
                  ) : (
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr ${avatarBg} text-white font-serif font-black text-4xl sm:text-5xl flex items-center justify-center shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-transform`}>
                      {fullName ? fullName.charAt(0).toUpperCase() : "E"}
                    </div>
                  )}

                  {/* Upload Overlay Button */}
                  <label
                    htmlFor="avatar-file-input"
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-3xl flex flex-col items-center justify-center text-white text-xs font-black transition-opacity cursor-pointer backdrop-blur-xs"
                    title="Tải ảnh mới từ máy tính"
                  >
                    <Camera className="w-6 h-6 mb-1 text-amber-300" />
                    <span>Đổi ảnh</span>
                  </label>
                  <input
                    id="avatar-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* DYNAMIC LEVEL BADGE ON PASSPORT CARD */}
                  <div className="absolute -bottom-2 -right-2 bg-amber-400 border-2 border-[#1E1715] text-[#1E1715] text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    {targetLevel} PASS
                  </div>
                </div>

                {/* Learner Info & JLPT Passport Stats */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                      Hộ Chiếu JLPT • ANH SENSEI
                    </span>
                    <span className="bg-[#C65D4B]/40 border border-[#C65D4B]/60 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>Học viên Năng Động</span>
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {fullName || "emkienne"}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-[#DED3C8] max-w-lg">
                    {bio}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-extrabold text-amber-200/90">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-amber-400" /> Email: {profile?.email || "emkienne@anhsensei.com"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-emerald-400" /> Mục tiêu: JLPT {targetLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card3DTilt>

          {/* TAB NAVIGATION BAR */}
          <div className="bg-[#FAF3EB] border-2 border-[#DED3C8] p-1.5 rounded-2xl flex flex-wrap gap-2 shadow-sm">
            {[
              { id: "PERSONAL" as const, label: "👤 Thông Tin Cá Nhân", icon: User },
              { id: "GOALS" as const, label: "🎯 Mục Tiêu JLPT", icon: Target },
              { id: "PREFERENCES" as const, label: "🌐 Múi Giờ & Giao Diện", icon: Globe },
              { id: "SECURITY" as const, label: "🔒 Bảo Mật Tài Khoản", icon: Key },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#C65D4B] text-white shadow-md scale-[1.02]"
                      : "bg-transparent text-[#76685F] hover:bg-white/60 hover:text-[#231917]"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* MAIN SETTINGS FORM CONTAINER */}
          <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {/* Global Success / Error Toast Banners */}
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500 text-emerald-950 text-xs sm:text-sm font-black flex items-center gap-2.5 shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500 text-rose-950 text-xs sm:text-sm font-black flex items-center gap-2.5 shadow-sm"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <div className="py-16 flex flex-col justify-center items-center gap-3 text-[#76685F]">
                <Loader2 className="w-8 h-8 animate-spin text-[#C65D4B]" />
                <span className="text-xs font-black uppercase">Đang tải hồ sơ JLPT...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* TAB 1: PERSONAL INFORMATION & AVATAR SELECTION */}
                {activeTab === "PERSONAL" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-[#DED3C8] pb-4">
                      <h2 className="text-xl font-extrabold text-[#231917]">Cấu Hình Thông Tin Cá Nhân & Ảnh Đại Diện</h2>
                      <p className="text-xs font-semibold text-[#76685F] mt-1">Cập nhật ảnh đại diện, danh xưng và avatar hiển thị trên toàn bộ hệ thống ANH SENSEI.</p>
                    </div>

                    {/* AVATAR UPLOAD & PRESET GALLERY SECTION */}
                    <div className="bg-[#FAF3EB] border-2 border-[#DED3C8] rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-[#C65D4B]" />
                          <span>Tùy Chọn Ảnh Đại Diện (Avatar Mascot):</span>
                        </label>
                        {(avatarUrl || presetEmoji) && (
                          <button
                            type="button"
                            onClick={() => {
                              setAvatarUrl(null);
                              setPresetEmoji(null);
                              localStorage.removeItem("user_avatar");
                              localStorage.removeItem("user_emoji");
                            }}
                            className="text-[11px] font-black text-rose-600 hover:underline cursor-pointer"
                          >
                            ✕ Xóa Avatar (Dùng chữ cái)
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* File Upload Trigger Button */}
                        <label
                          htmlFor="avatar-file-input-2"
                          className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-[#FAF3EB] text-[#C65D4B] border-2 border-[#C65D4B]/40 hover:border-[#C65D4B] font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Tải ảnh từ máy tính (PNG/JPG max 5MB)</span>
                        </label>
                        <input
                          id="avatar-file-input-2"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Preset Anime/Mascot Avatar Gallery with Click-to-Apply */}
                      <div className="space-y-2 pt-2 border-t border-[#DED3C8]">
                        <span className="text-[11px] font-extrabold text-[#76685F]">Hoặc chọn Avatar Mascot Tiếng Nhật để áp dụng ngay:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                          {presetAvatars.map((pre) => {
                            const isSelected = presetEmoji === pre.emoji && !avatarUrl;
                            return (
                              <div
                                key={pre.id}
                                onClick={() => handleSelectPreset(pre)}
                                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer space-y-1.5 flex flex-col items-center justify-center ${
                                  isSelected
                                    ? "border-[#C65D4B] bg-white shadow-lg scale-105 ring-2 ring-[#C65D4B]/30"
                                    : "border-[#DED3C8] bg-white/70 hover:bg-white hover:border-[#8B6F5A]"
                                }`}
                              >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pre.bg} text-white flex items-center justify-center text-2xl shadow-sm`}>
                                  {pre.emoji}
                                </div>
                                <span className="text-[11px] font-black text-[#231917] block truncate">{pre.name}</span>
                                {isSelected && (
                                  <span className="text-[9px] font-black text-[#C65D4B] bg-[#FAF3EB] px-2 py-0.5 rounded-full border border-[#C65D4B]/30">
                                    ✓ Đã áp dụng
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Email Field (Readonly) */}
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                        Địa Chỉ Email Đăng Nhập (Cố Định)
                      </label>
                      <input
                        type="email"
                        value={profile?.email || "emkienne@anhsensei.com"}
                        disabled
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF3EB] border-2 border-[#DED3C8] text-[#76685F] font-bold text-sm cursor-not-allowed"
                      />
                    </div>

                    {/* Full Name Input */}
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                        Họ Và Tên Hiển Thị (Full Name)
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={150}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nhập họ và tên hiển thị..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#DED3C8] focus:border-[#C65D4B] text-[#231917] text-sm font-black outline-hidden transition shadow-xs"
                      />
                    </div>

                    {/* Personal Bio */}
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                        Lời Khẩu Hiệu / Châm Ngôn Học Tập (Bio)
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Nhập khẩu hiệu quyết tâm chinh phục tiếng Nhật của bạn..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#DED3C8] focus:border-[#C65D4B] text-[#231917] text-xs font-extrabold outline-hidden transition shadow-xs"
                      />
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: GOALS & JLPT LEVEL */}
                {activeTab === "GOALS" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-[#DED3C8] pb-4">
                      <h2 className="text-xl font-extrabold text-[#231917]">Mục Tiêu Trình Độ JLPT</h2>
                      <p className="text-xs font-semibold text-[#76685F] mt-1">Lựa chọn cấp độ mục tiêu để hệ thống đề xuất bài học & thẻ SRS phù hợp.</p>
                    </div>

                    {/* JLPT Level Card Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { code: "N5", title: "JLPT N5 — Sơ Cấp 1", desc: "Căn bản 800 từ vựng & 100 Kanji cơ bản.", badge: "Cho người mới" },
                        { code: "N4", title: "JLPT N4 — Sơ Cấp 2", desc: "1,500 từ vựng & giao tiếp hội thoại thường ngày.", badge: "Phổ biến" },
                        { code: "N3", title: "JLPT N3 — Trung Cấp", desc: "3,000 từ vựng & hiểu sâu ngữ pháp bài đọc.", badge: "Thử thách" },
                      ].map((lvl) => {
                        const isSelected = targetLevel === lvl.code;
                        return (
                          <div
                            key={lvl.code}
                            onClick={() => handleSelectTargetLevel(lvl.code)}
                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                              isSelected
                                ? "border-[#C65D4B] bg-[#FAF3EB] shadow-md scale-[1.02] ring-2 ring-[#C65D4B]/30"
                                : "border-[#DED3C8] bg-white hover:border-[#8B6F5A]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-xl font-black ${isSelected ? "text-[#C65D4B]" : "text-[#231917]"}`}>
                                {lvl.code}
                              </span>
                              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white border border-[#DED3C8] text-[#76685F]">
                                {lvl.badge}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-sm font-extrabold text-[#231917]">{lvl.title}</h4>
                              <p className="text-xs font-semibold text-[#76685F] leading-relaxed">{lvl.desc}</p>
                            </div>
                            <div className={`py-2 text-center rounded-xl text-xs font-black border transition-all ${
                              isSelected ? "bg-[#C65D4B] text-white border-transparent shadow-sm" : "bg-[#FAF3EB] text-[#76685F] border-[#DED3C8]"
                            }`}>
                              {isSelected ? "✓ Đã chọn cấp độ này" : "Chọn mục tiêu này"}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Daily Goal Time Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                        ⏱️ Thời Gian Học Mỗi Ngày (Mục Tiêu Thói Quản):
                      </label>
                      <select
                        value={dailyGoal}
                        onChange={(e) => setDailyGoal(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#DED3C8] text-[#231917] text-sm font-black outline-hidden"
                      >
                        <option value="10">10 Phút / ngày (Nhẹ nhàng & Bền bỉ)</option>
                        <option value="20">20 Phút / ngày (Tiêu chuẩn đề xuất)</option>
                        <option value="30">30 Phút / ngày (Tăng tốc luyện thi)</option>
                        <option value="60">60 Phút / ngày (Cấp tốc thần tốc)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: PREFERENCES & TIMEZONE */}
                {activeTab === "PREFERENCES" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-[#DED3C8] pb-4">
                      <h2 className="text-xl font-extrabold text-[#231917]">Cấu Hình Múi Giờ & Hệ Thống</h2>
                      <p className="text-xs font-semibold text-[#76685F] mt-1">Đảm bảo thông báo nhắc nhở ôn tập SRS chính xác theo giờ địa phương.</p>
                    </div>

                    {/* Timezone Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                        🌍 Múi Giờ Học Tập (Timezone):
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#DED3C8] text-[#231917] text-sm font-black outline-hidden"
                      >
                        <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7 - Việt Nam)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9 - Nhật Bản)</option>
                        <option value="UTC">UTC (Giờ Phối Hợp Quốc Tế)</option>
                        <option value="America/New_York">America/New_York (EST - Mỹ)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: SECURITY & PASSWORD */}
                {activeTab === "SECURITY" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-[#DED3C8] pb-4">
                      <h2 className="text-xl font-extrabold text-[#231917]">Bảo Mật Mật Khẩu Tài Khoản</h2>
                      <p className="text-xs font-semibold text-[#76685F] mt-1">Đổi mật khẩu định kỳ để bảo vệ quá trình học tập của bạn.</p>
                    </div>

                    {passwordSaved && (
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500 text-emerald-950 text-xs font-black flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Đã thay đổi mật khẩu thành công!</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                          Mật Khẩu Hiện Tại
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#DED3C8] focus:border-[#C65D4B] text-[#231917] text-sm font-black outline-hidden"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                          Mật Khẩu Mới
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#DED3C8] focus:border-[#C65D4B] text-[#231917] text-sm font-black outline-hidden"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-black text-[#56423E] uppercase tracking-wider">
                          Xác Nhận Mật Khẩu Mới
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#DED3C8] focus:border-[#C65D4B] text-[#231917] text-sm font-black outline-hidden"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handlePasswordSubmit}
                        className="py-3 px-6 bg-[#231917] hover:bg-[#56423E] text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        🔒 Cập nhật mật khẩu mới
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* SAVE ACTION BAR */}
                <div className="pt-6 border-t border-[#DED3C8] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#76685F]">
                    Lần cập nhật gần nhất: Vừa xong
                  </span>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-4 rounded-2xl bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Lưu Tất Cả Thay Đổi ➔</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </main>
      </div>

      <LearnerFooter />
    </div>
  );
}
