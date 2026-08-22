"use client";

import { useEffect, useState } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import { User, Target, Globe, Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await apiClient<ProfileData>("/learner/profile");
      if (res.data) {
        setProfile(res.data);
        setFullName(res.data.fullName || "");
        setTargetLevel(res.data.targetLevel || "N5");
        setTimezone(res.data.timezone || "Asia/Ho_Chi_Minh");
      }
    } catch (err: any) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể tải thông tin hồ sơ.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await apiClient<ProfileData>("/learner/profile", {
        method: "PATCH",
        body: JSON.stringify({
          fullName: fullName.trim(),
          targetLevel,
          timezone: timezone.trim(),
        }),
      });

      if (res.data) {
        setProfile(res.data);
        setSuccessMessage("Cập nhật hồ sơ cá nhân thành công!");
        // Update user in localStorage if exists
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            parsed.fullName = res.data.fullName;
            parsed.targetLevel = res.data.targetLevel;
            parsed.timezone = res.data.timezone;
            localStorage.setItem("user", JSON.stringify(parsed));
          } catch (e) {
            console.error("Failed to update stored user", e);
          }
        }
      }
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.fieldErrors && err.fieldErrors.length > 0) {
          setErrorMessage(err.fieldErrors.map((f) => f.message).join(", "));
        } else {
          setErrorMessage(err.message);
        }
      } else {
        setErrorMessage("Cập nhật thất bại. Vui lòng kiểm tra lại kết nối.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-sans text-[#231917] flex flex-col justify-between">
      <div>
        <LearnerHeader user={profile ? { email: profile.email, name: profile.fullName } as any : null} />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="bg-[#FFFCF7] rounded-3xl p-8 border border-[#8B6F5A]/20 shadow-lg space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-[#8B6F5A]/15">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] to-[#C65D4B] flex items-center justify-center text-white text-2xl font-black shadow-md">
                {fullName ? fullName.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#8B6F5A]">Hồ Sơ Cá Nhân</h1>
                <p className="text-sm text-[#6E5E52]">Quản lý thông tin mục tiêu học tập &amp; múi giờ tài khoản</p>
              </div>
            </div>

            {loading ? (
              <div className="py-12 flex justify-center items-center gap-3 text-[#8B6F5A]">
                <Loader2 className="w-6 h-6 animate-spin" /> Đang tải thông tin hồ sơ...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {successMessage && (
                  <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    {errorMessage}
                  </div>
                )}

                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#8B6F5A] uppercase tracking-wider">
                    Địa chỉ Email (Không thể thay đổi)
                  </label>
                  <input
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-[#F5EFE6]/60 border border-[#8B6F5A]/20 text-[#6E5E52] cursor-not-allowed text-sm font-medium"
                  />
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#8B6F5A] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#8B6F5A]" /> Họ và Tên
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={150}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#8B6F5A]/30 text-[#231917] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/40 transition"
                  />
                </div>

                {/* Target Level */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#8B6F5A] uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#C65D4B]" /> Mục Tiêu Học Tập (Target Level)
                  </label>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#8B6F5A]/30 text-[#231917] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/40 transition"
                  >
                    <option value="N5">JLPT N5 — Sơ Cấp 1</option>
                    <option value="N4">JLPT N4 — Sơ Cấp 2</option>
                    <option value="N3">JLPT N3 — Trung Cấp</option>
                  </select>
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#8B6F5A] uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#8B6F5A]" /> Múi Giờ (Timezone)
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#8B6F5A]/30 text-[#231917] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8B6F5A]/40 transition"
                  >
                    <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-[#C65D4B] text-white font-bold text-sm shadow-md hover:bg-[#b04f3f] transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Lưu Thay Đổi
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
