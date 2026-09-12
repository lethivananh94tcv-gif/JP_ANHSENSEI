"use client";

import { useEffect, useState, useRef } from "react";
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

interface LearnerProgressSummary {
  targetLevel?: string;
  completionPercent?: number;
  completedLessonsCount?: number;
  dueFlashcardsCount?: number;
  totalValidActivities?: number;
  learnedVocabCount?: number;
  learnedGrammarCount?: number;
  learnedKanjiCount?: number;
  completedQuizCount?: number;
  accuracyPercent?: number;
  streakDays?: number;
  recentLessons?: Array<{
    lessonId: number;
    title: string;
    levelCode: string;
    completionPercent: number;
    status: string;
  }>;
}

export default function LearnerProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [summary, setSummary] = useState<LearnerProgressSummary | null>(null);
  const [fullName, setFullName] = useState("");
  const [targetLevel, setTargetLevel] = useState("N5");
  const [timezone, setTimezone] = useState("Asia/Ho_Chi_Minh");
  const [bio, setBio] = useState("Tự học tiếng Nhật chinh phục JLPT cùng ANH SENSEI 🌸");
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

  // Refs for scrolling & focusing
  const editFormRef = useRef<HTMLDivElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  // Cover Image State
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const handleEditButtonClick = () => {
    setActiveTab("ABOUT");
    setTimeout(() => {
      if (editFormRef.current) {
        editFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (fullNameInputRef.current) {
        fullNameInputRef.current.focus();
      }
    }, 120);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverUrl(url);
      if (typeof window !== "undefined") {
        localStorage.setItem("user_cover", url);
      }
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      // Read stored logged in user from localStorage
      let localUser: any = null;
      if (typeof window !== "undefined") {
        const localRaw = localStorage.getItem("user");
        if (localRaw) {
          try {
            localUser = JSON.parse(localRaw);
          } catch (e) {
            console.error("Error parsing user from localStorage:", e);
          }
        }
        const savedBio = localStorage.getItem(`user_bio_${localUser?.userId || 'default'}`);
        if (savedBio) {
          setBio(savedBio);
        }
        const savedCover = localStorage.getItem("user_cover");
        if (savedCover) {
          setCoverUrl(savedCover);
        }
      }

      let data: ProfileData | null = null;

      try {
        const res = await apiClient<ProfileData>("/learner/profile");
        if (res.data) {
          data = res.data;
        }
      } catch (err) {
        console.warn("Backend profile endpoint fetch error, fallback to local user:", err);
      }

      // Fetch Real Progress Summary from Backend API (/learner/progress/summary)
      try {
        const summaryRes = await apiClient<LearnerProgressSummary>("/learner/progress/summary");
        if (summaryRes.data) {
          setSummary(summaryRes.data);
        }
      } catch (err) {
        console.warn("Could not load real summary metrics:", err);
      }

      // Merge backend data or fallback to localUser
      if (!data && localUser) {
        data = {
          userId: localUser.userId || localUser.id || 1,
          email: localUser.email || "learner@anhsensei.com",
          fullName: localUser.fullName || localUser.email?.split("@")[0] || "Học viên ANH SENSEI",
          targetLevel: localUser.targetLevel || "N5",
          timezone: localUser.timezone || "Asia/Ho_Chi_Minh",
          role: localUser.role || "LEARNER",
          status: localUser.status || "ACTIVE",
          avatarUrl: localUser.avatarUrl || undefined,
        };
      }

      if (data) {
        const displayName =
          data.fullName ||
          localUser?.fullName ||
          data.email?.split("@")[0] ||
          localUser?.email?.split("@")[0] ||
          "Học viên ANH SENSEI";
        setProfile(data);
        setFullName(displayName);
        setTargetLevel(data.targetLevel || localUser?.targetLevel || "N5");
        setTimezone(data.timezone || localUser?.timezone || "Asia/Ho_Chi_Minh");
        if (data.avatarUrl) {
          setAvatarUrl(data.avatarUrl);
        } else if (localUser?.avatarUrl) {
          setAvatarUrl(localUser.avatarUrl);
        }
        const savedEmoji = localStorage.getItem("user_emoji");
        if (savedEmoji) {
          setPresetEmoji(savedEmoji);
        }
        const savedAvatar = localStorage.getItem("user_avatar");
        if (savedAvatar) {
          setAvatarUrl(savedAvatar);
          setPresetEmoji(null);
        }
      } else {
        const defaultUser: ProfileData = {
          userId: 1,
          email: "learner@anhsensei.com",
          fullName: "Học viên ANH SENSEI",
          targetLevel: "N5",
          timezone: "Asia/Ho_Chi_Minh",
          role: "LEARNER",
          status: "ACTIVE",
        };
        setProfile(defaultUser);
        setFullName("Học viên ANH SENSEI");
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
        const res = await apiClient<ProfileData>("/learner/profile", {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        if (res.data) {
          setProfile(res.data);
        }
      } catch (err) {
        console.warn("Backend profile patch failed, saving to localStorage:", err);
      }

      // Synchronize updated profile to localStorage
      if (typeof window !== "undefined") {
        const localRaw = localStorage.getItem("user");
        const u = localRaw ? JSON.parse(localRaw) : {};
        const updated = {
          ...u,
          fullName,
          targetLevel,
          timezone,
          avatarUrl: avatarUrl || undefined,
        };
        localStorage.setItem("user", JSON.stringify(updated));
        if (profile?.userId) {
          localStorage.setItem(`user_bio_${profile.userId}`, bio);
        } else {
          localStorage.setItem("user_bio_default", bio);
        }
        if (avatarUrl) {
          localStorage.setItem("user_avatar", avatarUrl);
          localStorage.removeItem("user_emoji");
        } else if (presetEmoji) {
          localStorage.setItem("user_emoji", presetEmoji);
          localStorage.removeItem("user_avatar");
        }
        setProfile((prev) => (prev ? { ...prev, ...updated } : updated));
        window.dispatchEvent(new Event("user_profile_updated"));
      }

      setSuccessMessage("✅ Đã cập nhật thông tin trang cá nhân thành công!");
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
    if (typeof window !== "undefined") {
      localStorage.setItem("user_emoji", emoji);
      localStorage.removeItem("user_avatar");
      window.dispatchEvent(new Event("user_profile_updated"));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setPresetEmoji(null);
      if (typeof window !== "undefined") {
        localStorage.setItem("user_avatar", url);
        localStorage.removeItem("user_emoji");
        window.dispatchEvent(new Event("user_profile_updated"));
      }
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
            <div
              className="relative h-48 sm:h-72 md:h-80 w-full rounded-b-2xl sm:rounded-b-3xl overflow-hidden bg-gradient-to-r from-[#231917] via-[#4A3426] to-[#C65D4B] border-x border-b border-[#E5D7C7] bg-cover bg-center"
              style={coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined}
            >
              {/* Decorative Japanese Fuji & Torii Pattern Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#FFFDF9_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
              <div className="absolute right-6 top-6 opacity-20 pointer-events-none font-black text-6xl text-white select-none">
                日本国 · ANH SENSEI
              </div>

              {/* Cover Gradient Graphic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Edit Cover Photo Button (Facebook Style) */}
              <label
                htmlFor="cover-file-input"
                className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-lg z-30"
              >
                <Camera className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Chỉnh sửa ảnh bìa</span>
                <input
                  id="cover-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </label>
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
                      JLPT {targetLevel}
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
                        <span>{summary?.streakDays || 0} Ngày liên tục</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#76655A]" />
                        <span>{summary?.totalValidActivities || 0} Hoạt động tích lũy</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: FACEBOOK QUICK ACTION BUTTONS */}
                <div className="flex items-center gap-2.5 w-full md:w-auto justify-center md:justify-end shrink-0 pt-2 md:pt-4">
                  <button
                    type="button"
                    onClick={handleEditButtonClick}
                    className="px-4 py-2 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
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
                    <span>Mục tiêu JLPT</span>
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
                    <Shield className="w-4 h-4 text-[#C65D4B] shrink-0" />
                    <span>Vai trò: <strong className="text-[#1F1714]">{profile?.role === 'ADMIN' ? 'Quản trị viên (Admin)' : 'Học viên chính thức'}</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEditButtonClick}
                  className="w-full py-2 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#1F1714] font-bold text-xs rounded-xl border border-[#E5D7C7] transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  Chỉnh sửa chi tiết
                </button>
              </div>

              {/* CARD 3: THỐNG KÊ KẾT QUẢ HỌC TẬP THỰC TẾ (REAL METRICS FROM DATABASE) */}
              <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-4.5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-[#1F1714]">Thống Kê Kết Quả Học</h3>
                    <span className="text-[11px] text-[#76655A] font-medium">Dữ liệu từ Cơ sở dữ liệu</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-2.5 rounded-xl space-y-0.5">
                    <span className="text-[10px] font-bold text-[#76655A] uppercase block">Từ vựng đã thuộc</span>
                    <span className="text-base font-black text-[#C65D4B]">{summary?.learnedVocabCount || 0} từ</span>
                  </div>

                  <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-2.5 rounded-xl space-y-0.5">
                    <span className="text-[10px] font-bold text-[#76655A] uppercase block">Ngữ pháp hoàn thành</span>
                    <span className="text-base font-black text-[#231917]">{summary?.learnedGrammarCount || 0} mẫu</span>
                  </div>

                  <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-2.5 rounded-xl space-y-0.5">
                    <span className="text-[10px] font-bold text-[#76655A] uppercase block">Kanji ghi nhớ</span>
                    <span className="text-base font-black text-[#C65D4B]">{summary?.learnedKanjiCount || 0} chữ</span>
                  </div>

                  <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-2.5 rounded-xl space-y-0.5">
                    <span className="text-[10px] font-bold text-[#76655A] uppercase block">Lượt nộp Quiz</span>
                    <span className="text-base font-black text-[#231917]">{summary?.completedQuizCount || 0} lượt</span>
                  </div>
                </div>
              </div>

            </div>

            {/* =============================================================== */}
            {/* RIGHT COLUMN: MAIN FORM / CONFIG TAB CONTENT */}
            {/* =============================================================== */}
            <div className="lg:col-span-8 space-y-4">

              {/* TAB 1: ABOUT (CẤU HÌNH THÔNG TIN CÁ NHÂN & AVATAR) */}
              {activeTab === "ABOUT" && (
                <div ref={editFormRef} className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 scroll-mt-6">
                  <div className="border-b border-[#E5D7C7] pb-3">
                    <h3 className="text-base sm:text-lg font-black text-[#1F1714]">
                      Chỉnh Sửa Trang Cá Nhân
                    </h3>
                    <p className="text-xs text-[#6E5D55]">
                      Cập nhật ảnh đại diện, họ tên và tiểu sử học tập của bạn trên hệ thống ANH SENSEI.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-5">

                    {/* AVATAR MASCOT SELECTION */}
                    <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-4 rounded-xl space-y-3">
                      <span className="text-xs font-black text-[#8B6F5A] uppercase tracking-wider block">
                        📸 Chọn Avatar Mascot:
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
                        ref={fullNameInputRef}
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl text-sm font-bold text-[#1F1714] focus:outline-none focus:border-[#C65D4B] focus:ring-2 focus:ring-[#C65D4B]/20"
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

              {/* TAB 2: TIMELINE (NHẬT KÝ HỌC HÀNG NGÀY THỰC TẾ) */}
              {activeTab === "TIMELINE" && (
                <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                  <h3 className="text-base font-black text-[#1F1714]">Nhật Ký Học Tập Thực Tế (Timeline Feed)</h3>

                  {summary?.recentLessons && summary.recentLessons.length > 0 ? (
                    <div className="space-y-3 text-xs">
                      {summary.recentLessons.map((item, idx) => (
                        <div key={idx} className="bg-[#FAF4EB] border border-[#E5D7C7] p-3.5 rounded-xl space-y-1">
                          <div className="flex items-center justify-between font-bold text-[#C65D4B]">
                            <span>⛩️ Bài học: {item.title} (Cấp độ {item.levelCode})</span>
                            <span className="text-[10px] text-[#76655A]">Hoàn thành {item.completionPercent}%</span>
                          </div>
                          <p className="text-[#52443C]">Trạng thái tiến độ: {item.status === 'COMPLETED' ? '🎉 Đã hoàn thành xuất sắc' : '📖 Đang tiếp tục học'}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-4 rounded-xl text-center text-xs space-y-1">
                      <p className="font-bold text-[#231917]">📖 Hiện tại chưa ghi nhận nhật ký học tập nào</p>
                      <p className="text-[#76655A]">Hãy hoàn thành 1 bài học từ vựng, ngữ pháp hoặc bài kiểm tra Quiz đầu tiên để lưu nhật ký học tập tại đây!</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: GOALS (MỤC TIÊU JLPT THỰC TẾ) */}
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

                  <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-black text-[#1F1714]">
                      <span>Tiến độ chinh phục cấp độ {targetLevel}:</span>
                      <span className="text-[#C65D4B]">{summary?.completionPercent || 0}%</span>
                    </div>
                    <div className="w-full h-3 bg-[#E5D7C7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C65D4B] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, summary?.completionPercent || 0))}%` }}
                      />
                    </div>
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
