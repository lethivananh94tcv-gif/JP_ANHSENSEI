"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LevelDto {
  levelId: number;
  code: string;
  name: string;
  description: string;
  sortOrder: number;
  status: string;
}

export default function LearnerLevelsPage() {
  const [levels, setLevels] = useState<LevelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch("/api/v1/curriculum/levels", {
          headers,
        });
        if (!res.ok) throw new Error("Không thể tải danh sách Trình độ học.");
        const data = await res.json();
        setLevels(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              🇯🇵 CHƯƠNG TRÌNH HỌC TIẾNG NHẬT TỪ N5 - N1
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight">Chọn Trình Độ Của Bạn</h1>
            <p className="text-white/90 text-sm max-w-xl">
              Hệ thống bài học chuẩn hóa thiết kế khoa học với Từ vựng, Hán tự và Ngữ pháp sinh động.
            </p>
          </div>
          <div className="hidden md:block text-8xl font-black opacity-20 select-none">
            日本語
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-6 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 text-sm font-medium flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <span>⚠️ {error}</span>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#C65D4B] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#a84c3c] transition-all shrink-0"
            >
              🔄 Tải lại trang
            </button>
          </div>
        )}

        {/* Levels Grid */}
        {loading ? (
          <div className="text-center py-16 text-[#6E5E52]">Đang tải danh sách trình độ...</div>
        ) : !error && levels.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
            Chưa có trình độ nào được xuất bản (PUBLISHED). Vui lòng quay lại sau!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((lvl) => (
              <Link
                key={lvl.levelId}
                href={`/levels/${lvl.levelId}/lessons`}
                className="group bg-white rounded-2xl border border-[#EFE9E1] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-[#C65D4B] bg-[#FAF3EB] px-4 py-1.5 rounded-xl border border-[#F2E3D5] group-hover:scale-105 transition-transform">
                      {lvl.code}
                    </span>
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                      ✓ Đã Xuất Bản
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2421] mb-2 group-hover:text-[#C65D4B] transition-colors">
                    {lvl.name}
                  </h3>
                  <p className="text-xs text-[#6E5E52] line-clamp-3 leading-relaxed">
                    {lvl.description || "Chương trình học bài bản giúp làm chủ từ vựng và ngữ pháp trình độ " + lvl.code}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F5EFE9] flex justify-between items-center text-xs font-bold text-[#C65D4B]">
                  <span>Vào Bắt Đầu Học ➔</span>
                  <span className="w-8 h-8 rounded-full bg-[#FAF3EB] flex items-center justify-center group-hover:bg-[#C65D4B] group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
