/**
 * Plays an authentic cute Japanese Cat Meow Sound ("Nyaa~!", "Nyaan~!")
 * using Web Audio API synthesis + SpeechSynthesis voice effect.
 */
export const playCatMeowSound = () => {
  try {
    if (typeof window === "undefined") return;

    // 1. Web Audio API Oscillator Cat Meow Pitch Sweep
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const now = ctx.currentTime;

      // Realistic cute cat meow pitch sweep ("Nyaa-oow~")
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(1050, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.4);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    }

    // 2. Japanese Voice Synthesizer "Nyaa~!" Effect
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const meowPhrases = ["ニャー！", "ニャン！", "にゃーお！", "ニャー〜！"];
      const randomMeow = meowPhrases[Math.floor(Math.random() * meowPhrases.length)];
      const utt = new SpeechSynthesisUtterance(randomMeow);
      utt.lang = "ja-JP";
      utt.pitch = 1.7;
      utt.rate = 1.5;
      window.speechSynthesis.speak(utt);
    }
  } catch (e) {
    console.error("Cat meow sound playback error:", e);
  }
};
