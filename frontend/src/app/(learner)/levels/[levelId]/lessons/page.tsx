"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface LessonDto {
  lessonId: number;
  levelId: number;
  levelCode: string;
  title: string;
  description: string;
  sortOrder: number;
  isSample: boolean;
  estimatedMinutes: number;
  status: string;
}

export default function LearnerLessonsPage() {
  const params = useParams();
  const levelId = params.levelId as string;

  const [lessons, setLessons] = useState<LessonDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`http://localhost:8080/api/v1/curriculum/levels/${levelId}/lessons`, {
          headers,
        });
        if (!res.ok) throw new Error("Không thể tải danh sách bài học.");
        const data = await res.json();
        setLessons(data);
      } catch (err: any) {
        setError(err.message || "Lỗi tải bài học.");
      } finally {
        setLoading(false);
      }
    };

    if (levelId) fetchLessons();
  }, [levelId]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8 text-[#2C2421]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6E5E52]">
          <Link href="/levels" className="hover:text-[#C65D4B] transition-colors">
            ← Tất Cả Trình Độ
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#2C2421]">Danh Sách Bài Học</span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EFE9E1] flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#C65D4B]">Danh Sách Bài Học</h1>
            <p className="text-sm text-[#6E5E52] mt-1">Hoàn thành bài học để nâng cao trình độ của bạn</p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Lessons Grid */}
        {loading ? (
          <div className="text-center py-12 text-[#6E5E52]">Đang tải bài học...</div>
        ) : lessons.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
            Chưa có bài học nào được xuất bản trong trình độ này.
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lsn) => (
              <Link
                key={lsn.lessonId}
                href={`/lessons/${lsn.lessonId}`}
                className="group block bg-white rounded-2xl border border-[#EFE9E1] p-6 shadow-sm hover:shadow-md hover:border-[#C65D4B] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF3EB] border border-[#F2E3D5] text-[#C65D4B] font-extrabold text-xl flex items-center justify-center group-hover:bg-[#C65D4B] group-hover:text-white transition-colors">
                      {lsn.sortOrder}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-[#2C2421] group-hover:text-[#C65D4B] transition-colors">
                          {lsn.title}
                        </h3>
                        {lsn.isSample && (
                          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            ⭐ Học thử công khai
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6E5E52] mt-1">{lsn.description || "Bài học kiến thức cơ bản."}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-[#8C7B70] bg-[#FAF3EB] px-3 py-1.5 rounded-xl border border-[#F2E3D5]">
                      ⏱️ {lsn.estimatedMinutes || 30} phút
                    </span>
                    <span className="text-sm font-bold text-[#C65D4B] group-hover:translate-x-1 transition-transform">
                      Học Ngay ➔
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
