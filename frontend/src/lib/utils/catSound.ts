/**
 * Plays a 100% REAL recorded cat meow MP3 audio sample ("Meo meo~")
 * using official high-quality real cat sound samples from Mixkit audio catalog.
 */
const REAL_CAT_MEOW_SAMPLES = [
  "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3", // Real adult cat meow
  "https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3", // Real kitten meow
];

export const playCatMeowSound = () => {
  try {
    if (typeof window === "undefined") return;

    // Pick a random real cat meow MP3 audio recording
    const sampleUrl = REAL_CAT_MEOW_SAMPLES[Math.floor(Math.random() * REAL_CAT_MEOW_SAMPLES.length)];
    const audio = new Audio(sampleUrl);
    audio.volume = 0.9;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Primary real cat meow MP3 audio error, attempting fallback sample:", err);
        const fallbackAudio = new Audio(REAL_CAT_MEOW_SAMPLES[0]);
        fallbackAudio.volume = 0.9;
        fallbackAudio.play().catch(() => {});
      });
    }
  } catch (e) {
    console.error("Real cat meow sound playback error:", e);
  }
};
