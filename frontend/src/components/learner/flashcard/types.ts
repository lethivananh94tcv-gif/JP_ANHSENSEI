export interface FlashcardItemDto {
  id: number;
  word: string;
  kana?: string;
  kanjiForm?: string;
  romaji?: string;
  meaningVi: string;
  exampleJp?: string;
  exampleVi?: string;
  exampleReading?: string;
  usageNote?: string;
  partOfSpeech?: string;
  audioUrl?: string;
  notes?: string;
  contentType?: "VOCABULARY" | "KANJI" | "GRAMMAR";
}

export type FlashcardRating = "UNMASTERED" | "SOMEWHAT" | "MASTERED";

export interface FlashcardSessionStats {
  totalCount: number;
  masteredCount: number;
  somewhatCount: number;
  unmasteredCount: number;
  elapsedSeconds: number;
  rewardWaterDrops: number;
}
