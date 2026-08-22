"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient, ApiError } from "@/lib/api/client";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import { BookOpen, Layers, PlayCircle, Clock, ChevronRight, Loader2, AlertCircle } from "lucide-react";

interface LevelItem {
  levelId: number;
  code: string;
  name: string;
  description: string;
  sortOrder: number;
  status: string;
}

interface LessonItem {
  lessonId: number;
  levelId: number;
  levelCode: string;
  title: string;
  description: string;
  sortOrder: number;
  isSample: boolean;
  estimatedMinutes?: number;
  status: string;
}

export default function LearnerLearnPage() {
  const [levels, setLevels] = useState<LevelItem[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [continueLesson, setContinueLesson] = useState<LessonItem | null>(null);

  const [loadingLevels, setLoadingLevels] = useState(true);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [error, setError] = useState("");

  // Load published levels & continue learning lesson
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoadingLevels(true);
        setError("");
        const [lvlRes, contRes] = await Promise.all([
          apiClient<LevelItem[]>("/learner/levels"),
          apiClient<LessonItem | null>("/learner/continue-learning").catch(() => ({ data: null })),
        ]);

        if (lvlRes.data && lvlRes.data.length > 0) {
          setLevels(lvlRes.data);
          setSelectedLevelId(lvlRes.data[0].levelId);
        }

        if (contRes.data) {
          setContinueLesson(contRes.data);
        }
      } catch (err: any) {
        setError(err instanceof ApiError ? err.message : "Không thể tải danh sách cấp độ.");
      } finally {
        setLoadingLevels(false);
      }
    }

    loadInitialData();
  }, []);

  // Fetch lessons whenever selected level changes
  useEffect(() => {
    if (!selectedLevelId) return;

    async function loadLessons() {
      try {
        setLoadingLessons(true);
        const res = await apiClient<LessonItem[]>(`/learner/levels/${selectedLevelId}/lessons`);
        setLessons(res.data || []);
      } catch (err: any) {
        console.error("Error loading lessons:", err);
      } finally {
        setLoadingLessons(false);
      }
    }

    loadLessons();
  }, [selectedLevelId]);

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-sans text-[#231917] flex flex-col justify-between">
      <div>
        <LearnerHeader />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header Banner */}
          <div className="bg-[#FFFCF7] rounded-3xl p-8 border border-[#8B6F5A]/20 shadow-md space-y-3">
            <div className="flex items-center gap-3 text-[#8B6F5A] font-bold text-sm">
              <Layers className="w-5 h-5 text-[#C65D4B]" />
              <span>Chương Trình Học Tiếng Nhật</span>
            </div>
            <h1 className="text-3xl font-black text-[#231917]">Lộ Trình Học Tập Chuẩn JLPT</h1>
            <p className="text-sm text-[#6E5E52] max-w-2xl">
              Chọn cấp độ và danh sách các bài học chính thức đã được phát hành để bắt đầu rèn luyện Từ vựng, Kanji &amp; Ngữ pháp.
            </p>
          </div>

          {/* Continue Learning Card */}
          {continueLesson && (
            <div className="bg-gradient-to-r from-[#8B6F5A] to-[#6E5E52] text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="bg-[#C65D4B] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Tiếp tục bài đang học
                </span>
                <h3 className="text-xl font-black">{continueLesson.title}</h3>
                <p className="text-xs text-white/80">Cấp độ {continueLesson.levelCode} • {continueLesson.estimatedMinutes || 30} phút</p>
              </div>
              <Link
                href={`/lessons/${continueLesson.sortOrder}`}
                className="px-6 py-3 rounded-2xl bg-white text-[#8B6F5A] font-bold text-sm shadow-md hover:bg-[#F5EFE6] transition flex items-center gap-2 shrink-0"
              >
                <PlayCircle className="w-5 h-5 text-[#C65D4B]" /> Vào học ngay
              </Link>
            </div>
          )}

          {/* Level Tabs & Lesson Grid */}
          {loadingLevels ? (
            <div className="py-16 text-center text-[#8B6F5A] font-medium flex justify-center items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#C65D4B]" /> Đang tải danh sách cấp độ...
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" /> {error}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Level Selector Buttons */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {levels.map((lvl) => {
                  const isSelected = lvl.levelId === selectedLevelId;
                  return (
                    <button
                      key={lvl.levelId}
                      onClick={() => setSelectedLevelId(lvl.levelId)}
                      className={`px-6 py-3 rounded-2xl font-black text-sm transition shadow-sm border ${
                        isSelected
                          ? "bg-[#8B6F5A] text-white border-[#8B6F5A] shadow-md"
                          : "bg-white text-[#8B6F5A] border-[#8B6F5A]/20 hover:bg-[#F5EFE6]"
                      }`}
                    >
                      JLPT {lvl.code} — {lvl.name}
                    </button>
                  );
                })}
              </div>

              {/* Lessons Grid */}
              {loadingLessons ? (
                <div className="py-12 text-center text-[#8B6F5A] font-medium flex justify-center items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-[#C65D4B]" /> Đang lấy danh sách bài học...
                </div>
              ) : lessons.length === 0 ? (
                <div className="bg-[#FFFCF7] rounded-3xl p-12 text-center text-[#6E5E52] border border-[#8B6F5A]/20">
                  Chưa có bài học nào được phát hành trong cấp độ này.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.lessonId}
                      href={`/lessons/${lesson.sortOrder}`}
                      className="bg-[#FFFCF7] rounded-3xl p-6 border border-[#8B6F5A]/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-[#8B6F5A] text-xs font-bold">
                            Bài #{lesson.sortOrder}
                          </span>
                          {lesson.estimatedMinutes && (
                            <span className="text-xs text-[#6E5E52] flex items-center gap-1 font-medium">
                              <Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} phút
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-black text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-[#6E5E52] line-clamp-2">{lesson.description || "Nội dung bài học chuẩn JLPT."}</p>
                      </div>
                      <div className="pt-6 flex items-center justify-between text-xs font-bold text-[#8B6F5A]">
                        <span>Học ngay</span>
                        <ChevronRight className="w-4 h-4 text-[#C65D4B] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <LearnerFooter />
    </div>
  );
}
