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
  // Replace Kanji(Reading) with Reading for clean pronunciation
  cleaned = cleaned.replace(/[\u4e00-\u9faf\u3400-\u4dbf]+[（\(\[\【]([ぁ-んァ-ヶ]+)[）\)\]\】]/g, "$1");
  // Remove standalone bracket notes e.g. (Hello) or (N5)
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
 * Play Japanese audio with audio URL priority and Web Speech API fallback
 */
export function playJapaneseTTS(
  textOrOptions?: string | PlayAudioOptions,
  audioUrlFallback?: string,
  customRate: number = 0.92
): void {
  if (typeof window === "undefined") return;

  let text = "";
  let audioUrl: string | undefined = undefined;
  let rate = customRate;
  let pitch = 1.0;
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
    rate = textOrOptions.rate ?? customRate;
    pitch = textOrOptions.pitch ?? 1.0;
    isKanaAlphabet = !!textOrOptions.isKanaAlphabet;
    onStart = textOrOptions.onStart;
    onEnd = textOrOptions.onEnd;
    onError = textOrOptions.onError;
  }

  // Stop previous playback
  stopJapaneseTTS();

  const cleanText = cleanJapaneseTextForSpeech(text);

  // Strategy A: Play explicit audioUrl if present
  if (audioUrl && audioUrl.trim().length > 0) {
    try {
      const audio = new Audio(audioUrl.trim());
      audio.playbackRate = rate;
      activeAudioElement = audio;

      audio.onplay = () => onStart?.();
      audio.onended = () => {
        activeAudioElement = null;
        onEnd?.();
      };
      audio.onerror = (e) => {
        activeAudioElement = null;
        console.warn("Audio URL playback failed, falling back to Web Speech API:", e);
        speakWithWebSpeech(cleanText, rate, pitch, isKanaAlphabet, onStart, onEnd, onError);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio element play error:", err);
          speakWithWebSpeech(cleanText, rate, pitch, isKanaAlphabet, onStart, onEnd, onError);
        });
      }
      return;
    } catch (e) {
      console.warn("Error creating Audio element:", e);
    }
  }

  // Strategy B: Use Web Speech API or Fallback Online TTS
  speakWithWebSpeech(cleanText, rate, pitch, isKanaAlphabet, onStart, onEnd, onError);
}

/**
 * Specialized TTS for Kana / Alphabet characters (あ, か, さ...)
 * Uses standard Tokyo female voice, slower rate (0.72x), and bright clear pitch (1.18)
 * to ensure single character pronunciation is crystal clear, natural, and never deep/rushed.
 */
export function playKanaAlphabetTTS(
  kana: string,
  options?: Partial<PlayAudioOptions>
): void {
  playJapaneseTTS({
    text: kana,
    rate: 0.72,  // Slower, clearer speed specifically for Kana alphabet
    pitch: 1.18, // Bright, pleasant Tokyo female voice pitch (prevents deep/trầm voice)
    isKanaAlphabet: true,
    ...options,
  });
}

/**
 * Internal helper for Web Speech API with Google Translate audio fallback
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
  if (!cleanText) {
    onEnd?.();
    return;
  }

  if (!("speechSynthesis" in window)) {
    fallbackToGoogleTranslateTTS(cleanText, rate, onStart, onEnd, onError);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "ja-JP";
  utterance.rate = rate;
  utterance.pitch = pitch;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = (e) => {
    fallbackToGoogleTranslateTTS(cleanText, rate, onStart, onEnd, onError);
  };

  const tryPlaySpeech = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      // Priority 1: Standard Tokyo Female Voices (Google 日本語, Kyoko, Nanami, Haruka, Ayumi, Sayaka, etc.)
      const femaleTokyoVoices = voices.filter(
        (v) =>
          v.lang.startsWith("ja") &&
          (v.name.includes("Google 日本語") ||
            v.name.includes("Kyoko") ||
            v.name.includes("Nanami") ||
            v.name.includes("Haruka") ||
            v.name.includes("Ayumi") ||
            v.name.includes("Sayaka") ||
            v.name.includes("Mayu") ||
            v.name.includes("Mizuki") ||
            v.name.includes("Online") ||
            v.name.includes("Natural")) &&
          !v.name.includes("Ichiro") &&
          !v.name.includes("Otoya") &&
          !v.name.includes("Hattori") &&
          !v.name.includes("Keita")
      );

      const preferredJaVoice =
        femaleTokyoVoices.length > 0
          ? femaleTokyoVoices[0]
          : voices.find(
              (v) =>
                v.lang.startsWith("ja") &&
                !v.name.includes("Ichiro") &&
                !v.name.includes("Otoya")
            ) || voices.find((v) => v.lang.startsWith("ja") || v.lang.includes("ja"));

      if (preferredJaVoice) {
        utterance.voice = preferredJaVoice;
      }
    }

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      fallbackToGoogleTranslateTTS(cleanText, rate, onStart, onEnd, onError);
    }
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    tryPlaySpeech();
  } else {
    let triggered = false;
    window.speechSynthesis.onvoiceschanged = () => {
      if (!triggered) {
        triggered = true;
        tryPlaySpeech();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };

    setTimeout(() => {
      if (!triggered) {
        triggered = true;
        tryPlaySpeech();
      }
    }, 300);
  }
}

/**
 * Fallback to Google Translate public TTS endpoint if browser has no Japanese voice installed
 */
function fallbackToGoogleTranslateTTS(
  text: string,
  rate: number,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): void {
  try {
    const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(
      text
    )}`;
    const audio = new Audio(fallbackUrl);
    audio.playbackRate = rate;
    activeAudioElement = audio;

    audio.onplay = () => onStart?.();
    audio.onended = () => {
      activeAudioElement = null;
      onEnd?.();
    };
    audio.onerror = (err) => {
      activeAudioElement = null;
      onError?.(err);
    };

    audio.play().catch((err) => {
      onError?.(err);
    });
  } catch (err) {
    onError?.(err);
  }
}

