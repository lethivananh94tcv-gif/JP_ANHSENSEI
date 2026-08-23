"use client";

import { useMemo } from "react";
import { VocabularyDto } from "./VocabularyLearningItem";
import FlashcardContainer from "@/components/learner/flashcard/FlashcardContainer";
import { FlashcardItemDto } from "@/components/learner/flashcard/types";

interface FlashcardStudyModeProps {
  vocabularies: VocabularyDto[];
  lessonId?: string | number;
  levelCode?: string;
  lessonTitle?: string;
  onBack?: () => void;
  onNextLesson?: () => void;
}

export default function FlashcardStudyMode({
  vocabularies,
  lessonId = "default",
  levelCode = "N5",
  lessonTitle = "Bài học từ vựng",
  onBack,
  onNextLesson,
}: FlashcardStudyModeProps) {
  // Map VocabularyDto items to FlashcardItemDto
  const flashcardItems: FlashcardItemDto[] = useMemo(() => {
    const isJapanese = (str?: string) => Boolean(str && /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(str));

    return (vocabularies || []).map((v, index) => {
      const item = v as any;
      const exJp = item.exampleJp || (isJapanese(v.notes) ? v.notes : "");
      return {
        id: v.vocabularyId || item.id || index + 1,
        word: v.word || "",
        kana: v.kana || "",
        romaji: item.romaji || v.kana || "",
        meaningVi: v.meaningVi || "",
        exampleJp: exJp,
        exampleVi: item.exampleVi || "",
        partOfSpeech: v.partOfSpeech || "Từ vựng",
        audioUrl: v.audioUrl || "",
        contentType: "VOCABULARY",
      };
    });
  }, [vocabularies]);

  return (
    <FlashcardContainer
      items={flashcardItems}
      levelCode={levelCode}
      lessonTitle={lessonTitle}
      storageKey={`flashcard_progress_lesson_${lessonId}`}
      onBack={onBack}
      onNextLesson={onNextLesson}
    />
  );
}
