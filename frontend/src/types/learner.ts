export interface UserProfile {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface LevelSummary {
  levelId: number;
  code: string;
  name: string;
  description: string;
  sortOrder: number;
  status: string;
  lessonCount?: number;
  progressPercent?: number;
  isCurrent?: boolean;
}

export interface LessonSummary {
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

export interface ContinueLearningViewModel {
  lessonId: number;
  levelCode: string;
  title: string;
  description: string;
  progressPercent: number;
  completedParts: number;
  totalParts: number;
  estimatedMinutes: number;
}

export interface DailyReviewViewModel {
  dueVocabCount: number;
  dueKanjiCount: number;
  dueGrammarCount: number;
  isAvailable: boolean;
}

export interface WeeklyActivityDay {
  dayName: string; // T2, T3, T4, T5, T6, T7, CN
  minutes: number;
  isHighest?: boolean;
}

export interface RecentLessonSummary {
  lessonId: number;
  title: string;
  levelCode: string;
  completionPercent: number;
  status: string;
}

export interface LearnerProgressSummary {
  targetLevel: string;
  completionPercent: number;
  completedLessonsCount: number;
  dueFlashcardsCount: number;
  totalValidActivities: number;
  learnedVocabCount?: number;
  learnedGrammarCount?: number;
  learnedKanjiCount?: number;
  completedQuizCount?: number;
  accuracyPercent?: number;
  streakDays?: number;
  continueLesson?: {
    lessonId: number;
    title: string;
    levelCode: string;
    progressPercent?: number;
  } | null;
  weeklyActivities?: Array<{ date: string; count: number }>;
  recentLessons?: RecentLessonSummary[];
}
