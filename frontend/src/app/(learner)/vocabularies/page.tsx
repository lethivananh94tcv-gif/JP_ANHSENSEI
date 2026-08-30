"use client";

import { useEffect, useState, useCallback, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/api/client";
import LearnerHeader from "@/components/learner/LearnerHeader";
import { Sparkles } from "lucide-react";

import {
  LearnerProfile,
  LevelItem,
  LessonItem,
  LessonProgressItem,
  ContinueLearningData,
  DueFlashcardsCountData,
  StreakData,
} from "@/components/learner/vocabularies/types";

import VocabularyHero from "@/components/learner/vocabularies/VocabularyHero";
import LevelSelector from "@/components/learner/vocabularies/LevelSelector";
import SelectedLessonProgress from "@/components/learner/vocabularies/SelectedLessonProgress";
import VocabularyModeSelector from "@/components/learner/vocabularies/VocabularyModeSelector";
import RecentLessonList from "@/components/learner/vocabularies/RecentLessonList";
import VocabularySidebar from "@/components/learner/vocabularies/VocabularySidebar";
import VocabularyAllLessonsModal from "@/components/learner/vocabularies/VocabularyAllLessonsModal";
import JapaneseKanaChartModal from "@/components/learner/vocabularies/JapaneseKanaChartModal";
import VocabularyHubSkeleton from "@/components/learner/vocabularies/VocabularyHubSkeleton";
import { VocabularyHubErrorState, VocabularyHubEmptyState } from "@/components/learner/vocabularies/VocabularyHubErrorState";

const DEFAULT_LEVELS: LevelItem[] = [
  { levelId: 1, code: "N5", name: "JLPT N5", description: "Sơ cấp Minna No Nihongo", status: "PUBLISHED", sortOrder: 1 },
  { levelId: 2, code: "N4", name: "JLPT N4", description: "Trung cấp Minna No Nihongo", status: "PUBLISHED", sortOrder: 2 },
  { levelId: 3, code: "N3", name: "JLPT N3", description: "Nâng cao Minna No Nihongo", status: "PUBLISHED", sortOrder: 3 },
];

const DEFAULT_N5_LESSONS: LessonItem[] = [
  { lessonId: 1, levelId: 1, title: "Bài 1: Giới thiệu bản thân & Chào hỏi (わたしは～です)", description: "Giới thiệu tên, quốc tịch, nghề nghiệp, câu chào hỏi ban đầu.", sortOrder: 1, status: "PUBLISHED" },
  { lessonId: 2, levelId: 1, title: "Bài 2: Đồ vật & Chỉ định từ (これ・それ・あれ)", description: "Hỏi và trả lời về đồ vật xung quanh, quyền sở hữu đồ đạc.", sortOrder: 2, status: "PUBLISHED" },
  { lessonId: 3, levelId: 1, title: "Bài 3: Nơi chốn & Phương hướng (ここ・そこ・あそこ)", description: "Hỏi vị trí địa điểm, tầng lầu, xuất xứ sản phẩm và giá tiền.", sortOrder: 3, status: "PUBLISHED" },
  { lessonId: 4, levelId: 1, title: "Bài 4: Thời gian & Giờ giấc (今～時です / ～から～まで)", description: "Hỏi giờ, phút, thứ, ngày tháng và khung thời gian làm việc.", sortOrder: 4, status: "PUBLISHED" },
  { lessonId: 5, levelId: 1, title: "Bài 5: Đi lại & Phương tiện (～へ行きます / ～で)", description: "Di chuyển đi đâu, bằng phương tiện gì, đi cùng với ai.", sortOrder: 5, status: "PUBLISHED" },
  { lessonId: 6, levelId: 1, title: "Bài 6: Hành động & Ngoại động từ (～をします / ～を買います)", description: "Diễn tả hành động ăn, uống, mua sắm và rủ rê cùng làm.", sortOrder: 6, status: "PUBLISHED" },
  { lessonId: 7, levelId: 1, title: "Bài 7: Công cụ & Cho nhận quà (～で / あげます・もらいます)", description: "Sử dụng công cụ/ngôn ngữ làm gì, hành động tặng/nhận quà.", sortOrder: 7, status: "PUBLISHED" },
  { lessonId: 8, levelId: 1, title: "Bài 8: Tính từ & Miêu tả (い形容詞・な形容詞)", description: "Miêu tả đặc điểm, tính chất của sự vật, người và nơi chốn.", sortOrder: 8, status: "PUBLISHED" },
  { lessonId: 9, levelId: 1, title: "Bài 9: Sở thích & Năng lực (～が好きです / 分かります)", description: "Bày tỏ sở thích, mức độ hiểu biết và lý do (から).", sortOrder: 9, status: "PUBLISHED" },
  { lessonId: 10, levelId: 1, title: "Bài 10: Tồn tại & Vị trí (～があります / います)", description: "Sự tồn tại của người, vật, động vật và vị trí không gian.", sortOrder: 10, status: "PUBLISHED" },
  { lessonId: 11, levelId: 1, title: "Bài 11: Số lượng & Đếm (～つ / ～人 / ～回)", description: "Cách đếm đồ vật, số người, thời gian và tần suất.", sortOrder: 11, status: "PUBLISHED" },
  { lessonId: 12, levelId: 1, title: "Bài 12: Quá khứ & So sánh (～でした / ～より～)", description: "Thì quá khứ của tính từ và các cấu trúc so sánh hơn/nhất.", sortOrder: 12, status: "PUBLISHED" },
  { lessonId: 13, levelId: 1, title: "Bài 13: Mong muốn & Muốn làm (～が欲しいです / ～たいです)", description: "Bày tỏ mong muốn có đồ vật hoặc muốn làm hành động gì.", sortOrder: 13, status: "PUBLISHED" },
  { lessonId: 14, levelId: 1, title: "Bài 14: Thể Te & Nhờ vả (～てください / ～ています)", description: "Cách chia thể Te, nhờ vả lịch sự và hành động đang diễn ra.", sortOrder: 14, status: "PUBLISHED" },
  { lessonId: 15, levelId: 1, title: "Bài 15: Cho phép & Cấm đoán (～てもいいです / ～てはいけません)", description: "Xin phép làm gì và cấu trúc cấm đoán không được làm.", sortOrder: 15, status: "PUBLISHED" },
  { lessonId: 16, levelId: 1, title: "Bài 16: Trình tự hành động (～てから / ～は～が)", description: "Nối các động từ theo trình tự và miêu tả đặc điểm chi tiết.", sortOrder: 16, status: "PUBLISHED" },
  { lessonId: 17, levelId: 1, title: "Bài 17: Thể Nai & Bắt buộc (～ないでください / ～なければなりません)", description: "Cách chia thể Nai, khuyên không làm và nghĩa vụ bắt buộc.", sortOrder: 17, status: "PUBLISHED" },
  { lessonId: 18, levelId: 1, title: "Bài 18: Thể Nguyên dạng & Khả năng (～ことができます / 趣味は～です)", description: "Thể từ điển (Jishokei), nói về khả năng và sở thích.", sortOrder: 18, status: "PUBLISHED" },
  { lessonId: 19, levelId: 1, title: "Bài 19: Thể Ta & Kinh nghiệm (～たことがあります / ～たり～たり)", description: "Cách chia thể Ta, nói về kinh nghiệm đã từng làm và liệt kê.", sortOrder: 19, status: "PUBLISHED" },
  { lessonId: 20, levelId: 1, title: "Bài 20: Thể Thông thường (普通形 - Giao tiếp hàng ngày)", description: "Chuyển đổi giữa thể Lịch sự (Masu) và thể Thông thường (Futsuu).", sortOrder: 20, status: "PUBLISHED" },
  { lessonId: 21, levelId: 1, title: "Bài 21: Ý kiến & Trích dẫn (～と思います / ～と言いました)", description: "Bày tỏ suy nghĩ cá nhân và trích dẫn lời nói người khác.", sortOrder: 21, status: "PUBLISHED" },
  { lessonId: 22, levelId: 1, title: "Bài 22: Mệnh đề bổ nghĩa danh từ (名詞修飾)", description: "Dùng mệnh đề động từ để bổ nghĩa chi tiết cho danh từ.", sortOrder: 22, status: "PUBLISHED" },
  { lessonId: 23, levelId: 1, title: "Bài 23: Khi nào & Điều kiện tự nhiên (～とき / ～と)", description: "Diễn tả thời điểm xảy ra hành động và kết quả tự nhiên.", sortOrder: 23, status: "PUBLISHED" },
  { lessonId: 24, levelId: 1, title: "Bài 24: Cho nhận hành động (～てあげます / ～てもらいます)", description: "Hành động làm giúp ai việc gì hoặc được ai làm giúp.", sortOrder: 24, status: "PUBLISHED" },
  { lessonId: 25, levelId: 25, title: "Bài 25: Điều kiện Tara & Mặc dù (～たら / ～ても)", description: "Giả định điều kiện nếu... thì... và quan hệ nhượng bộ mặc dù...", sortOrder: 25, status: "PUBLISHED" },
];

const DEFAULT_N4_LESSONS: LessonItem[] = [
  { lessonId: 26, levelId: 2, title: "Bài 26: Giải thích lý do & Nhấn mạnh (～んです)", description: "Dùng Ndesu để giải thích hoàn cảnh, lý do và yêu cầu lời khuyên.", sortOrder: 26, status: "PUBLISHED" },
  { lessonId: 27, levelId: 2, title: "Bài 27: Động từ Khả năng (可能形)", description: "Cách chia động từ thể khả năng (có thể làm gì).", sortOrder: 27, status: "PUBLISHED" },
  { lessonId: 28, levelId: 2, title: "Bài 28: Vừa làm vừa & Thói quen (～ながら / ～し)", description: "Thực hiện 2 hành động song song và liệt kê lý do tương đồng.", sortOrder: 28, status: "PUBLISHED" },
  { lessonId: 29, levelId: 2, title: "Bài 29: Trạng thái kết quả & Hoàn thành (～ています / ～てしまいました)", description: "Diễn tả trạng thái tự động từ và sự nuối tiếc lỡ làm gì.", sortOrder: 29, status: "PUBLISHED" },
  { lessonId: 30, levelId: 2, title: "Bài 30: Chuẩn bị & Sắp đặt sẵn (～てあります / ～ておきます)", description: "Trạng thái tha động từ có mục đích và hành động chuẩn bị sẵn.", sortOrder: 30, status: "PUBLISHED" },
  { lessonId: 31, levelId: 2, title: "Bài 31: Ý định Volitional (意向形 / ～つもりです)", description: "Cách chia thể Ý định và diễn tả dự định trong tương lai.", sortOrder: 31, status: "PUBLISHED" },
  { lessonId: 32, levelId: 2, title: "Bài 32: Khuyên bảo & Suy đoán (～ほうがいいです / ～でしょう)", description: "Đưa ra lời khuyên nên/không nên và phỏng đoán có lẽ.", sortOrder: 32, status: "PUBLISHED" },
  { lessonId: 33, levelId: 2, title: "Bài 33: Mệnh lệnh & Cấm đoán (命令形 / 禁止形)", description: "Chia thể Mệnh lệnh và thể Cấm đoán (dùng trong khẩn cấp/biển báo).", sortOrder: 33, status: "PUBLISHED" },
  { lessonId: 34, levelId: 2, title: "Bài 34: Theo như & Sau khi (～とおりに / ～あとで)", description: "Làm theo chỉ dẫn và trình tự hành động sau khi làm việc gì.", sortOrder: 34, status: "PUBLISHED" },
  { lessonId: 35, levelId: 2, title: "Bài 35: Thể Điều kiện Ba (条件形 - ば)", description: "Cách chia thể điều kiện Ba và mẫu câu càng... càng...", sortOrder: 35, status: "PUBLISHED" },
  { lessonId: 36, levelId: 2, title: "Bài 36: Cố gắng & Để làm gì (～ように / ～ようにします)", description: "Biểu thị sự biến đổi trạng thái và cố gắng duy trì thói quen.", sortOrder: 36, status: "PUBLISHED" },
  { lessonId: 37, levelId: 2, title: "Bài 37: Bị động Passive (受身形 - られる)", description: "Cách chia thể bị động và diễn tả bị làm phiền/tổn hại.", sortOrder: 37, status: "PUBLISHED" },
  { lessonId: 38, levelId: 2, title: "Bài 38: Danh từ hóa Động từ (Vる・ないの)", description: "Biến động từ thành danh từ với trợ từ の (sở thích, quên làm gì).", sortOrder: 38, status: "PUBLISHED" },
  { lessonId: 39, levelId: 2, title: "Bài 39: Nguyên nhân kết quả (～て・～ので)", description: "Diễn tả lý do khách quan, xin lỗi và cảm xúc do nguyên nhân.", sortOrder: 39, status: "PUBLISHED" },
  { lessonId: 40, levelId: 2, title: "Bài 40: Câu hỏi lồng ghép (～か / ～かどうか)", description: "Lồng câu nghi vấn vào trong câu chính (có hay không).", sortOrder: 40, status: "PUBLISHED" },
  { lessonId: 41, levelId: 2, title: "Bài 41: Cho nhận ân huệ (～ていただきます / ～てくださいます)", description: "Cấu trúc cho nhận lịch sự và nhờ vả tôn kính.", sortOrder: 41, status: "PUBLISHED" },
  { lessonId: 42, levelId: 2, title: "Bài 42: Mục đích & Sử dụng (～ために / ～に使います)", description: "Chỉ mục đích hành động và công dụng của đồ vật.", sortOrder: 42, status: "PUBLISHED" },
  { lessonId: 43, levelId: 2, title: "Bài 43: Sắp sửa & Trông có vẻ (～そうです / ～てきます)", description: "Phán đoán qua trực giác thị giác và sự xuất hiện/biến đổi.", sortOrder: 43, status: "PUBLISHED" },
  { lessonId: 44, levelId: 2, title: "Bài 44: Quá mức & Dễ/Khó làm (～すぎます / ～やすい・にくい)", description: "Hành động vượt quá giới hạn và mức độ dễ/khó thực hiện.", sortOrder: 44, status: "PUBLISHED" },
  { lessonId: 45, levelId: 2, title: "Bài 45: Trường hợp & Mặc dù (～ばあいは / ～のに)", description: "Giả định trong tình huống khẩn cấp và sự thất vọng ngược mong đợi.", sortOrder: 45, status: "PUBLISHED" },
  { lessonId: 46, levelId: 2, title: "Bài 46: Thời điểm chính xác (～ところです / ～ばかりです)", description: "Diễn tả hành động sắp, đang hoặc vừa mới hoàn thành tức thì.", sortOrder: 46, status: "PUBLISHED" },
  { lessonId: 47, levelId: 2, title: "Bài 47: Nghe nói & Dường như (～そうです / ～渗透します)", description: "Truyền đạt thông tin nghe lại và suy đoán từ căn cứ giác quan.", sortOrder: 47, status: "PUBLISHED" },
  { lessonId: 48, levelId: 2, title: "Bài 48: Sai khiến Causative (使役形 - させる)", description: "Cách chia thể sai khiến (bắt làm/cho phép làm).", sortOrder: 48, status: "PUBLISHED" },
  { lessonId: 49, levelId: 2, title: "Bài 49: Tôn kính ngữ Sonkeigo (尊敬語)", description: "Kính ngữ trang trọng nhất hướng về hành động của cấp trên, đối tác.", sortOrder: 49, status: "PUBLISHED" },
  { lessonId: 50, levelId: 2, title: "Bài 50: Khiêm nhường ngữ Kenjougo (謙譲語)", description: "Khiêm nhường hạ mình về hành động bản thân để tôn trọng đối phương.", sortOrder: 50, status: "PUBLISHED" },
];

export default function LearnerVocabulariesHubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Core Data States
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [levels, setLevels] = useState<LevelItem[]>(DEFAULT_LEVELS);
  const [selectedLevelCode, setSelectedLevelCode] = useState<string>("N5");
  const [selectedLevelObj, setSelectedLevelObj] = useState<LevelItem | null>(null);

  const [lessons, setLessons] = useState<LessonItem[]>(DEFAULT_N5_LESSONS);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(DEFAULT_N5_LESSONS[0]);
  const [progressMap, setProgressMap] = useState<Record<number, LessonProgressItem>>({});

  const [continueData, setContinueData] = useState<ContinueLearningData | null>(null);
  const [dueData, setDueData] = useState<DueFlashcardsCountData | null>(null);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  // UI States
  const [loading, setLoading] = useState<boolean>(true);
  const [lessonsLoading, setLessonsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [correlationId, setCorrelationId] = useState<string | undefined>(undefined);
  const [isAllLessonsOpen, setIsAllLessonsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"list" | "cards" | "typing" | "match" | null>(null);
  const [isKanaModalOpen, setIsKanaModalOpen] = useState<boolean>(false);

  // Load Lessons for a Level safely without race condition
  const loadLessonsForLevel = useCallback(async (
    targetLevel: LevelItem,
    continueInfo?: ContinueLearningData | null,
    currentProgressMap?: Record<number, LessonProgressItem>
  ) => {
    try {
      setLessonsLoading(true);

      let publishedLessons: LessonItem[] = [];
      try {
        let res = await apiClient<LessonItem[]>(`/learner/levels/${targetLevel.code || targetLevel.levelId}/lessons`);
        if (!res.data || res.data.length === 0) {
          res = await apiClient<LessonItem[]>(`/curriculum/levels/${targetLevel.code || targetLevel.levelId}/lessons`);
        }
        if (!res.data || res.data.length === 0) {
          res = await apiClient<LessonItem[]>(`/learner/levels/${targetLevel.levelId}/lessons`);
        }
        publishedLessons = (res.data || []).filter((l) => l.status === "PUBLISHED");
      } catch (err) {
        // Fallback gracefully to default lessons
      }

      if (publishedLessons.length === 0) {
        const lvlCode = (targetLevel.code || "N5").toUpperCase();
        publishedLessons = lvlCode === "N4" ? DEFAULT_N4_LESSONS : DEFAULT_N5_LESSONS;
      }
      setLessons(publishedLessons);

      if (publishedLessons.length === 0) {
        setSelectedLesson(null);
        return;
      }

      const paramLessonId = searchParams.get("lessonId");
      let activeLesson: LessonItem | undefined;

      if (paramLessonId) {
        activeLesson = publishedLessons.find(
          (l) => String(l.lessonId) === paramLessonId || String(l.sortOrder) === paramLessonId
        );
      }

      if (!activeLesson && continueInfo && continueInfo.lessonId) {
        activeLesson = publishedLessons.find((l) => l.lessonId === continueInfo.lessonId || l.sortOrder === continueInfo.lessonId);
      }

      if (!activeLesson && currentProgressMap) {
        const inProgressLessons = publishedLessons.filter((l) => {
          const p = currentProgressMap[l.lessonId] || currentProgressMap[l.sortOrder];
          return p && p.status === "IN_PROGRESS";
        });

        const uncompletedLessons = publishedLessons.filter((l) => {
          const p = currentProgressMap[l.lessonId] || currentProgressMap[l.sortOrder];
          return !p || p.status !== "COMPLETED";
        });

        if (inProgressLessons.length > 0) {
          activeLesson = inProgressLessons[0];
        } else if (uncompletedLessons.length > 0) {
          activeLesson = uncompletedLessons[0];
        }
      }

      if (!activeLesson && publishedLessons.length > 0) {
        activeLesson = [...publishedLessons].sort((a, b) => a.sortOrder - b.sortOrder)[0];
      }

      if (activeLesson) {
        setSelectedLesson(activeLesson);
        const params = new URLSearchParams(searchParams.toString());
        params.set("level", targetLevel.code);
        params.set("lessonId", String(activeLesson.sortOrder || activeLesson.lessonId));
        startTransition(() => {
          router.replace(`/vocabularies?${params.toString()}`, { scroll: false });
        });
      }
    } catch (e) {
      console.error("Lỗi khi tải bài học của cấp độ:", e);
      setLessons([]);
      setSelectedLesson(null);
    } finally {
      setLessonsLoading(false);
    }
  }, [searchParams, router]);

  // 1. Initial Load: Profile, Levels, Continue Learning & Flashcard Due Count
  const initializePageData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setCorrelationId(undefined);

      const [profileRes, levelsRes, continueRes, dueRes, progressRes] = await Promise.allSettled([
        apiClient<LearnerProfile>("/learner/profile"),
        apiClient<LevelItem[]>("/learner/levels"),
        apiClient<ContinueLearningData>("/learner/continue-learning"),
        apiClient<DueFlashcardsCountData>("/learner/flashcards/due-count"),
        apiClient<LessonProgressItem[]>("/learner/progress"),
      ]);

      let userProfile: LearnerProfile | null = null;
      if (profileRes.status === "fulfilled" && profileRes.value.data) {
        userProfile = profileRes.value.data;
        setProfile(userProfile);
      }

      let publishedLevels: LevelItem[] = DEFAULT_LEVELS;
      if (levelsRes.status === "fulfilled" && levelsRes.value.data && levelsRes.value.data.length > 0) {
        const filtered = levelsRes.value.data.filter((l) => l.status === "PUBLISHED");
        if (filtered.length > 0) {
          publishedLevels = filtered;
        }
      }
      setLevels(publishedLevels);

      let continueLearning: ContinueLearningData | null = null;
      if (continueRes.status === "fulfilled" && continueRes.value.data) {
        continueLearning = continueRes.value.data;
        setContinueData(continueLearning);
      }

      if (dueRes.status === "fulfilled" && dueRes.value.data) {
        setDueData(dueRes.value.data);
      }

      const pMap: Record<number, LessonProgressItem> = {};
      if (progressRes.status === "fulfilled" && progressRes.value.data) {
        progressRes.value.data.forEach((p) => {
          pMap[p.lessonId] = p;
        });
      }

      // Sync local storage completion fallbacks so 100% completed lessons immediately reflect outside
      if (typeof window !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("completed_lesson_") || key.startsWith("learned_items_lesson_"))) {
            const lessonIdNum = Number(key.replace("completed_lesson_", "").replace("learned_items_lesson_", ""));
            if (lessonIdNum) {
              let isComp = false;
              if (key.startsWith("completed_lesson_")) {
                const val = localStorage.getItem(key);
                isComp = val === "100" || val === "true";
              } else {
                try {
                  const arr = JSON.parse(localStorage.getItem(key) || "[]");
                  if (Array.isArray(arr) && arr.length > 0) {
                    isComp = true;
                  }
                } catch {}
              }

              if (isComp && (!pMap[lessonIdNum] || pMap[lessonIdNum].completionPercent < 100)) {
                pMap[lessonIdNum] = {
                  progressId: lessonIdNum,
                  lessonId: lessonIdNum,
                  status: "COMPLETED",
                  completionPercent: 100,
                  lastAccessedAt: new Date().toISOString(),
                };
              }
            }
          }
        }
      }
      setProgressMap(pMap);

      // Determine Selected Level
      const paramLevel = searchParams.get("level");
      let activeLevel: LevelItem | undefined;

      if (paramLevel && publishedLevels.length > 0) {
        activeLevel = publishedLevels.find((l) => l.code.toUpperCase() === paramLevel.toUpperCase());
      }
      if (!activeLevel && userProfile?.targetLevel && publishedLevels.length > 0) {
        activeLevel = publishedLevels.find((l) => l.code.toUpperCase() === userProfile.targetLevel?.toUpperCase());
      }
      if (!activeLevel && publishedLevels.length > 0) {
        activeLevel = [...publishedLevels].sort((a, b) => a.sortOrder - b.sortOrder)[0];
      }

      if (activeLevel) {
        setSelectedLevelCode(activeLevel.code);
        await loadLessonsForLevel(activeLevel, continueLearning, pMap);
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
        setCorrelationId(err.correlationId);
      } else {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.");
      }
    } finally {
      setLoading(false);
    }
  }, [searchParams, loadLessonsForLevel]);

  // Event Handlers:
  // Level selection handler
  const handleSelectLevel = async (newLevelCode: string) => {
    if (newLevelCode.toUpperCase() === selectedLevelCode.toUpperCase()) return;

    const targetLvl = levels.find((l) => l.code.toUpperCase() === newLevelCode.toUpperCase());
    if (!targetLvl) return;

    setSelectedLevelCode(targetLvl.code);

    await loadLessonsForLevel(targetLvl, continueData, progressMap);
  };

  // Prevent page data re-initialization on searchParams changes
  const isInitializedRef = useRef(false);

  // Lesson selection handler (pure local state update, zero page reloads)
  const handleSelectLesson = (lesson: LessonItem) => {
    setSelectedLesson(lesson);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("level", selectedLevelCode);
      url.searchParams.set("lessonId", String(lesson.sortOrder || lesson.lessonId));
      window.history.replaceState(null, "", url.toString());
    }
  };

  // Mode Selection Navigation -> Prompt user with lesson selector modal
  const handleSelectMode = (mode: "list" | "cards" | "typing" | "match") => {
    setModalMode(mode);
    setIsAllLessonsOpen(true);
  };

  const getCanonicalLessonId = (lesson: LessonItem) => {
    const isN4 = selectedLevelCode === "N4" || (lesson.lessonId >= 100 && lesson.lessonId <= 150);
    return isN4 ? 25 + lesson.sortOrder : lesson.sortOrder;
  };

  const handleOpenLesson = (lesson: LessonItem, mode?: "list" | "cards" | "typing" | "match" | null) => {
    const targetId = getCanonicalLessonId(lesson);
    if (mode) {
      router.push(`/lessons/${targetId}?mode=${mode}`);
    } else {
      router.push(`/lessons/${targetId}`);
    }
  };

  // Primary Action Buttons Navigation
  const handleContinueLatest = () => {
    if (continueData && continueData.lessonId) {
      const mode = continueData.lastMode || "cards";
      const isN4 = selectedLevelCode === "N4" || continueData.lessonId >= 100;
      const targetId = isN4 ? (continueData.lessonId > 25 && continueData.lessonId <= 50 ? continueData.lessonId : 25 + (continueData.sortOrder || 1)) : (continueData.sortOrder || continueData.lessonId);
      router.push(`/lessons/${targetId}?mode=${mode}`);
    } else if (selectedLesson) {
      const targetId = getCanonicalLessonId(selectedLesson);
      router.push(`/lessons/${targetId}?mode=cards`);
    } else if (lessons.length > 0) {
      const targetId = getCanonicalLessonId(lessons[0]);
      router.push(`/lessons/${targetId}?mode=cards`);
    }
  };

  const handleContinueLesson = (lessonToOpen?: LessonItem) => {
    const target = lessonToOpen || selectedLesson;
    if (!target) return;
    const targetId = getCanonicalLessonId(target);
    router.push(`/lessons/${targetId}`);
  };

  const handleReviewDueFlashcards = () => {
    if (selectedLevelCode) {
      router.push(`/flashcards?level=${selectedLevelCode}`);
    } else {
      router.push("/flashcards");
    }
  };

  const nextSuggestedLesson = lessons.find((l) => {
    const p = progressMap[l.lessonId] || progressMap[l.sortOrder];
    return !p || (p.completionPercent < 100 && p.status !== "COMPLETED");
  });

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      initializePageData();
    }
  }, [initializePageData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFE6] text-[#302A26] font-sans">
        <LearnerHeader user={profile} />
        <VocabularyHubSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5EFE6] text-[#302A26] font-sans">
        <LearnerHeader user={profile} />
        <VocabularyHubErrorState message={error} correlationId={correlationId} onRetry={initializePageData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#302A26] font-sans flex flex-col">
      <LearnerHeader user={profile} />

      <main className="flex-1 w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-24 md:pb-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-[#756A62]">
          <Link href="/dashboard" className="hover:text-[#C65D4B] transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-[#C65D4B] font-extrabold">Từ vựng</span>
        </nav>

        {/* 1. Hero Section */}
        <VocabularyHero
          onContinueLatest={handleContinueLatest}
          dueData={dueData}
          disabled={!continueData && !selectedLesson && lessons.length === 0}
        />

        {/* 2. Level Selector Segmented Control */}
        <LevelSelector
          levels={levels}
          selectedLevelCode={selectedLevelCode}
          targetLevel={profile?.targetLevel}
          onSelectLevel={handleSelectLevel}
        />

        {/* 3. Main Full-Width Study Workspace */}
        <div className="w-full space-y-6 sm:space-y-8">
          {lessonsLoading ? (
            <div className="w-full bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-8 h-[160px] animate-pulse" />
          ) : selectedLesson ? (
            <SelectedLessonProgress
              lesson={selectedLesson}
              nextLesson={nextSuggestedLesson}
              progress={progressMap[selectedLesson.lessonId] || progressMap[selectedLesson.sortOrder]}
              nextLessonProgress={nextSuggestedLesson ? (progressMap[nextSuggestedLesson.lessonId] || progressMap[nextSuggestedLesson.sortOrder]) : null}
              dueData={dueData}
              onContinueLesson={handleContinueLesson}
              onReviewDueFlashcards={handleReviewDueFlashcards}
            />
          ) : (
            <VocabularyHubEmptyState
              title={`Cấp độ ${selectedLevelCode} chưa có bài học`}
              description="Hệ thống đang chuẩn bị dữ liệu bài học cho trình độ này."
            />
          )}

          {/* 4. Recent Lesson List (Kho Bài Học) */}
          {lessons.length > 0 && (
            <RecentLessonList
              levelCode={selectedLevelCode}
              lessons={lessons}
              selectedLessonId={selectedLesson?.sortOrder || selectedLesson?.lessonId}
              progressMap={progressMap}
              onSelectLesson={handleSelectLesson}
              onOpenLesson={handleContinueLesson}
              onOpenAllLessons={() => {
                setModalMode(null);
                setIsAllLessonsOpen(true);
              }}
            />
          )}

          {/* 5. Study Modes Selector (Phương pháp học) */}
          <VocabularyModeSelector
            onSelectMode={handleSelectMode}
            disabled={lessons.length === 0}
          />
        </div>
      </main>

      {/* All Lessons Modal */}
      <VocabularyAllLessonsModal
        isOpen={isAllLessonsOpen}
        levelCode={selectedLevelCode}
        targetMode={modalMode}
        lessons={lessons}
        progressMap={progressMap}
        selectedLessonId={selectedLesson?.sortOrder || selectedLesson?.lessonId}
        onClose={() => {
          setIsAllLessonsOpen(false);
          setModalMode(null);
        }}
        onSelectLesson={handleSelectLesson}
        onOpenLesson={handleOpenLesson}
      />

      {/* Japanese Kana Alphabet Chart Modal */}
      <JapaneseKanaChartModal
        isOpen={isKanaModalOpen}
        onClose={() => setIsKanaModalOpen(false)}
      />
    </div>
  );
}
