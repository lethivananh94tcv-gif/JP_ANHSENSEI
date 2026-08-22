export interface FlashcardItemDto {
  id: number;
  word: string;
  kana?: string;
  romaji?: string;
  meaningVi: string;
  exampleJp?: string;
  exampleVi?: string;
  partOfSpeech?: string;
  audioUrl?: string;
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
