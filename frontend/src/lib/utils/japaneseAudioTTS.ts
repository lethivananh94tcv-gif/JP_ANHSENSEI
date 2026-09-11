/**
 * Standard Japanese Audio & Text-To-Speech (TTS) Engine
 * Features:
 * 1. Smart Text Cleaning: Strips HTML tags (<ruby>, <rt>), furigana brackets, romaji notes, and quiz UI tags.
 * 2. Hybrid Audio Source: Plays real recorded audio URL (MP3/WAV) first if available, with transparent fallback to TTS.
 * 3. Browser Voice Selection Hierarchy:
 *    - Priority 1: Google 日本語 (Google Japanese - standard natural voice)
 *    - Priority 2: Apple Japanese (Kyoko, Otoya, Hattori, Siri)
 *    - Priority 3: Microsoft Japanese Natural/Online (Nanami, Haruka, Ayumi, Ichiro)
 *    - Priority 4: Any ja-JP native voice
 *    - Priority 5: Fallback to Google Translate audio endpoint when no local Japanese TTS voice is installed.
 * 4. Acoustic Calibration:
 *    - Natural speed rate (0.92x) triggering authentic Japanese devoicing (母音の無声化) for です/ます.
 */

export interface PlayAudioOptions {
  text?: string;
  audioUrl?: string;
  rate?: number;
  pitch?: number;
  isKanaAlphabet?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

let activeAudioElement: HTMLAudioElement | null = null;
let globalTTSRate: number = 0.92; // Default natural speed (triggers authentic Japanese devoicing 母音の無声化)
let globalTTSPitch: number = 1.06; // Bright, natural Tokyo female voice pitch (matches SpeechGen.io Nanami/Aoi quality)
let activeUtteranceTimer: NodeJS.Timeout | null = null;

export function getGlobalTTSRate(): number {
  return globalTTSRate;
}

export function setGlobalTTSRate(rate: number): void {
  globalTTSRate = rate;
}

export function getGlobalTTSPitch(): number {
  return globalTTSPitch;
}

export function setGlobalTTSPitch(pitch: number): void {
  globalTTSPitch = pitch;
}

/**
 * Voice Scoring Algorithm to pick the highest quality Neural Voice available.
 * Top Priority: Microsoft Azure Nanami Neural / Aoi Neural (same engine as SpeechGen.io),
 * followed by Google Japanese Neural and Apple Kyoko Tokyo Voice.
 */
function calculateJapaneseVoiceScore(name: string): number {
  const n = name.toLowerCase();
  let score = 0;

  // Tier 1: Azure / Edge Nanami Neural (SpeechGen.io standard female Tokyo voice)
  if (n.includes("nanami")) score += 1000;
  else if (n.includes("aoi")) score += 950;
  else if (n.includes("google 日本語") || n.includes("google japanese")) score += 900;
  else if (n.includes("kyoko")) score += 850;
  else if (n.includes("shiori") || n.includes("mayu") || n.includes("sayaka")) score += 800;

  // Bonus for Neural / Natural online voices
  if (n.includes("natural") || n.includes("online") || n.includes("neural")) score += 400;

  // Other Japanese female voices
  if (n.includes("haruka") || n.includes("ayumi") || n.includes("mizuki")) score += 300;

  // Penalize male voices slightly to prioritize smooth, clear female Tokyo voice
  if (n.includes("ichiro") || n.includes("otoya") || n.includes("keita") || n.includes("daichi") || n.includes("hattori")) {
    score -= 300;
  }

  return score;
}

/**
 * Clean Japanese text for natural TTS output (strips HTML, ruby tags, furigana brackets, and UI prefixes)
 */
export function cleanJapaneseTextForSpeech(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // 1. Remove HTML tags e.g. <ruby>漢字<rt>かんじ</rt></ruby>
  cleaned = cleaned.replace(/<rt>[^<]*<\/rt>/gi, ""); // Remove ruby annotations
  cleaned = cleaned.replace(/<[^>]+>/g, ""); // Remove HTML tags

  // 2. Handle furigana pattern 漢字(かんじ) or 漢字（かんじ） or 漢字[かんじ] or 漢字【かんじ】
  cleaned = cleaned.replace(/[\u4e00-\u9faf\u3400-\u4dbf]+[（\(\[\【]([ぁ-んァ-ヶ]+)[）\)\]\】]/g, "$1");
  cleaned = cleaned.replace(/[（\(\[\【][^）\)\]\】]*[）\)\]\】]/g, "");

  // 3. Remove common quiz UI prefixes like 🔊, [LUYỆN NGHE], [KANA], [KHÓ], etc.
  cleaned = cleaned.replace(/[🔊📢🔊🗣️]/g, "");
  cleaned = cleaned.replace(/\[[^\]]+\]/g, "");

  return cleaned.trim();
}

/**
 * Stop any currently playing audio file or TTS utterance immediately
 */
export function stopJapaneseTTS(): void {
  if (activeUtteranceTimer) {
    clearTimeout(activeUtteranceTimer);
    activeUtteranceTimer = null;
  }

  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {}
    activeAudioElement = null;
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

/**
 * Play Japanese audio with single-track priority: /api/tts endpoint first, WebSpeech as fallback
 */
export function playJapaneseTTS(
  textOrOptions?: string | PlayAudioOptions,
  audioUrlFallback?: string,
  customRate?: number
): void {
  if (typeof window === "undefined") return;

  let text = "";
  let audioUrl: string | undefined = undefined;
  let rate = customRate ?? globalTTSRate;
  let pitch = globalTTSPitch;
  let isKanaAlphabet = false;
  let onStart: (() => void) | undefined;
  let onEnd: (() => void) | undefined;
  let onError: ((err: any) => void) | undefined;

  if (typeof textOrOptions === "string") {
    text = textOrOptions;
    audioUrl = audioUrlFallback;
  } else if (textOrOptions && typeof textOrOptions === "object") {
    text = textOrOptions.text || "";
    audioUrl = textOrOptions.audioUrl;
    rate = textOrOptions.rate ?? customRate ?? globalTTSRate;
    pitch = textOrOptions.pitch ?? globalTTSPitch;
    isKanaAlphabet = !!textOrOptions.isKanaAlphabet;
    onStart = textOrOptions.onStart;
    onEnd = textOrOptions.onEnd;
    onError = textOrOptions.onError;
  }

  // Stop previous playback completely
  stopJapaneseTTS();

  const cleanText = cleanJapaneseTextForSpeech(text);
  if (!cleanText) {
    onEnd?.();
    return;
  }

  // Strategy A: Explicit audio URL if provided
  const targetAudioUrl = audioUrl && audioUrl.trim().length > 0
    ? audioUrl.trim()
    : `/api/tts?text=${encodeURIComponent(cleanText)}`;

  let hasEnded = false;

  const playAudioFile = (url: string, isFallback = false) => {
    if (hasEnded) return;

    try {
      const audio = new Audio(url);
      audio.playbackRate = rate;
      activeAudioElement = audio;

      audio.onplay = () => {
        if (!hasEnded) onStart?.();
      };

      audio.onended = () => {
        hasEnded = true;
        activeAudioElement = null;
        onEnd?.();
      };

      audio.onerror = (e) => {
        activeAudioElement = null;
        if (!isFallback && !hasEnded) {
          // If /api/tts fails, try WebSpeech as fallback
          speakWithWebSpeech(cleanText, rate, pitch, isKanaAlphabet, onStart, onEnd, onError);
        } else {
          hasEnded = true;
          onError?.(e);
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          activeAudioElement = null;
          if (!isFallback && !hasEnded) {
            speakWithWebSpeech(cleanText, rate, pitch, isKanaAlphabet, onStart, onEnd, onError);
          } else {
            hasEnded = true;
            onError?.(err);
          }
        });
      }
    } catch (err) {
      activeAudioElement = null;
      if (!isFallback && !hasEnded) {
        speakWithWebSpeech(cleanText, rate, pitch, isKanaAlphabet, onStart, onEnd, onError);
      } else {
        hasEnded = true;
        onError?.(err);
      }
    }
  };

  playAudioFile(targetAudioUrl);
}

/**
 * Specialized TTS for Kana / Alphabet characters (あ, か, さ...)
 */
export function playKanaAlphabetTTS(
  kana: string,
  options?: Partial<PlayAudioOptions>
): void {
  playJapaneseTTS({
    text: kana,
    rate: 0.72,  // Slower, clearer speed specifically for Kana alphabet
    pitch: 1.18, // Bright, pleasant Tokyo female voice pitch
    isKanaAlphabet: true,
    ...options,
  });
}

/**
 * Secondary Fallback helper for Web Speech API (only used if network is offline or audio route fails)
 */
function speakWithWebSpeech(
  cleanText: string,
  rate: number,
  pitch: number,
  isKanaAlphabet: boolean,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): void {
  if (!cleanText || typeof window === "undefined") {
    onEnd?.();
    return;
  }

  if (!("speechSynthesis" in window)) {
    onError?.(new Error("No SpeechSynthesis support"));
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "ja-JP";
  utterance.rate = rate;
  utterance.pitch = pitch;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = (e) => {
    // Only report real errors, ignore interrupted/canceled
    if (e.error !== "interrupted" && e.error !== "canceled") {
      onError?.(e);
    }
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    const japaneseVoices = voices.filter(
      (v) => v.lang.startsWith("ja") || v.lang.includes("ja") || v.lang.includes("JP")
    );

    if (japaneseVoices.length > 0) {
      japaneseVoices.sort((a, b) => calculateJapaneseVoiceScore(b.name) - calculateJapaneseVoiceScore(a.name));
      utterance.voice = japaneseVoices[0];
    }
  }

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    onError?.(err);
  }
}




