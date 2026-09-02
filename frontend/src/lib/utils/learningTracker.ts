import { apiClient } from "@/lib/api/client";

export interface AccessedLessonInfo {
  lessonId: number;
  title: string;
  levelCode: string;
  completionPercent: number;
  status: string;
  timestamp?: number;
}

export function recordLessonAccess(lessonId: number, title?: string, levelCode?: string, percent?: number) {
  if (typeof window === "undefined") return;

  const id = Number(lessonId) || 1;
  const t = title || `Bài học #${id}: Từ vựng & Ngữ pháp tiếng Nhật`;
  const lvl = levelCode || (id > 50 ? "N3" : id > 25 ? "N4" : "N5");

  // 1. Post activity to Backend API
  try {
    apiClient("/learner/activities", {
      method: "POST",
      body: JSON.stringify({ contentType: "LESSON", contentId: id, durationSeconds: 60 }),
    }).catch(() => {});
  } catch (e) {}

  // 2. Save/Update LocalStorage for instant UI reactive sync
  try {
    const raw = localStorage.getItem("recent_accessed_lessons");
    const list: AccessedLessonInfo[] = raw ? JSON.parse(raw) : [];

    const existingCompleted = localStorage.getItem(`completed_lesson_${id}`);
    let currentPercent = percent ?? (existingCompleted ? Number(existingCompleted) : 20);
    if (isNaN(currentPercent) || currentPercent <= 0) currentPercent = 20;

    const status = currentPercent >= 100 ? "COMPLETED" : "IN_PROGRESS";

    const newItem: AccessedLessonInfo = {
      lessonId: id,
      title: t,
      levelCode: lvl,
      completionPercent: currentPercent,
      status: status,
      timestamp: Date.now(),
    };

    const filtered = [newItem, ...list.filter((item) => item.lessonId !== id)].slice(0, 10);
    localStorage.setItem("recent_accessed_lessons", JSON.stringify(filtered));
    localStorage.setItem(`completed_lesson_${id}`, String(currentPercent));
  } catch (e) {
    console.error("Failed to update recent_accessed_lessons in localStorage", e);
  }
}

export function getLocalRecentLessons(): AccessedLessonInfo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("recent_accessed_lessons");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
