export interface LearnerProfile {
  userId: number;
  email: string;
  fullName: string;
  role: string;
  targetLevel?: string;
  avatarUrl?: string;
}

export interface LevelItem {
  levelId: number;
  code: string;
  name: string;
  description?: string;
  sortOrder: number;
  status: string;
}

export interface LessonItem {
  lessonId: number;
  levelId: number;
  levelCode: string;
  title: string;
  description?: string;
  sortOrder: number;
  isSample?: boolean;
  estimatedMinutes?: number;
  status: string;
}

export interface LessonProgressItem {
  progressId?: number;
  lessonId: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completionPercent: number;
  lastAccessedAt?: string;
}

export interface ContinueLearningData {
  lessonId: number;
  levelId?: number;
  levelCode?: string;
  title: string;
  description?: string;
  sortOrder: number;
  estimatedMinutes?: number;
  lastMode?: "list" | "cards" | "typing";
}

export interface DueFlashcardsCountData {
  dueCount: number;
}

export interface StreakData {
  streakDays?: number;
  totalPoints?: number;
  badges?: Array<{ id: string; name: string; icon: string; earned: boolean }>;
}
