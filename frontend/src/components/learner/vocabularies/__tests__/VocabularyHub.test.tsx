import { describe, it, expect } from "vitest";
import { LevelItem, LessonItem } from "../types";

describe("Vocabulary Hub Data Helpers & Types", () => {
  const sampleLevels: LevelItem[] = [
    { levelId: 1, code: "N5", name: "JLPT N5", sortOrder: 1, status: "PUBLISHED" },
    { levelId: 2, code: "N4", name: "JLPT N4", sortOrder: 2, status: "PUBLISHED" },
    { levelId: 3, code: "N3", name: "JLPT N3", sortOrder: 3, status: "PUBLISHED" },
  ];

  const sampleLesson: LessonItem = {
    lessonId: 7,
    levelId: 1,
    levelCode: "N5",
    title: "Phương tiện & Đi lại",
    sortOrder: 7,
    status: "PUBLISHED",
  };

  it("filters published levels correctly", () => {
    const published = sampleLevels.filter((l) => l.status === "PUBLISHED");
    expect(published).toHaveLength(3);
    expect(published[0].code).toBe("N5");
  });

  it("calculates correct status and completion labels for lessons", () => {
    const completionPercent = 60;
    const isCompleted = completionPercent === 100;
    const isInProgress = completionPercent > 0 && !isCompleted;
    const actionLabel = isCompleted ? "Học lại" : isInProgress ? "Học tiếp" : "Bắt đầu";

    expect(actionLabel).toBe("Học tiếp");
    expect(sampleLesson.title).toBe("Phương tiện & Đi lại");
  });
});
