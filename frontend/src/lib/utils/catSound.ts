/**
 * Plays a realistic acoustic Cat Meow sound effect ("Meo meo~")
 * using Web Audio API multi-oscillator formant synthesis.
 */
export const playCatMeowSound = () => {
  try {
    if (typeof window === "undefined") return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Master Volume Envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.45, now + 0.06);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    // Formant Filter to simulate physical Cat Vocal Tract ("M-e-o-w")
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(3.2, now);
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.linearRampToValueAtTime(1450, now + 0.16);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.55);

    // Fundamental Voice Pitch Sweep
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(400, now);
    osc1.frequency.linearRampToValueAtTime(760, now + 0.18);
    osc1.frequency.exponentialRampToValueAtTime(340, now + 0.55);

    // Harmonic Overtone for realistic feline timbre
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(800, now);
    osc2.frequency.linearRampToValueAtTime(1520, now + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(680, now + 0.55);

    // Connect Audio Nodes
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Play Meow Sound
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.55);
    osc2.stop(now + 0.55);
  } catch (e) {
    console.error("Cat meow sound error:", e);
  }
};
