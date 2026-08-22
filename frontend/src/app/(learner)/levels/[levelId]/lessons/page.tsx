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
    <div className="min-h-screen bg-[#FDFBF7] p-6 sm:p-10 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb & Top Right Back Button */}
        <div className="flex items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] px-5 py-3 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B6F5A]">
            <Link href="/levels" className="hover:text-[#C65D4B] transition-colors">
              Trình Độ
            </Link>
            <span>/</span>
            <span className="text-[#C65D4B] font-extrabold">Danh Sách Bài Học</span>
          </div>

          <Link
            href="/levels"
            className="px-4 py-2 bg-[#FFFDF9] hover:bg-[#C65D4B] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-white font-extrabold text-xs rounded-xl transition-all shadow-2xs"
          >
            Quay lại
          </Link>
        </div>

        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              📚 LỘ TRÌNH HỌC TẬP CHUẨN JLPT
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Danh Sách Bài Học</h1>
            <p className="text-white/90 text-sm max-w-xl">
              Hoàn thành các bài học Minna no Nihongo để nâng cao trình độ và chinh phục chứng chỉ JLPT.
            </p>
          </div>
          <div className="hidden md:block text-8xl font-black opacity-20 select-none">
            授業
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-2xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* 5-Column Centered Cards Lessons Grid */}
        {loading ? (
          <div className="text-center py-16 text-[#76685F]">Đang tải danh sách bài học...</div>
        ) : lessons.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
            Chưa có bài học nào được xuất bản trong trình độ này.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {lessons.map((lsn) => (
              <Link
                key={lsn.lessonId}
                href={`/lessons/${lsn.sortOrder}`}
                className="bg-white hover:bg-[#FAF3EB] border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-2xl p-5 text-center cursor-pointer shadow-2xs hover:shadow-md transition-all flex flex-col justify-between items-center space-y-3 group min-h-[160px]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="inline-block text-xs font-black text-[#C65D4B] bg-[#FAF3EB] group-hover:bg-white px-3 py-1 rounded-full border border-[#DED3C8]">
                    Bài #{lsn.sortOrder}
                  </span>
                  {lsn.isSample && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                      ⭐ Học thử
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-extrabold text-[#231917] group-hover:text-[#C65D4B] leading-snug line-clamp-3 px-1">
                  {lsn.title}
                </h3>

                <div className="pt-2 border-t border-[#DED3C8]/40 w-full text-[11px] font-bold text-[#8B6F5A] group-hover:text-[#C65D4B] flex items-center justify-center gap-1">
                  <span>Học Ngay</span>
                  <span>➔</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
