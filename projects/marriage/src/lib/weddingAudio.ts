// Web Audio API Synthesizer for Divine Temple Chimes, Auspicious Shehnai & Vedic Harmonies

class DivineWeddingAudioService {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicInterval: NodeJS.Timeout | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Sacred Temple Bell Sound with rich reverberation
  public playTempleBell() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Temple bell frequencies (fundamental + rich bronze overtone)
      const partials = [
        { f: 587.33, g: 0.35, d: 2.8 },  // D5 fundamental
        { f: 880.00, g: 0.22, d: 2.2 },  // A5 fifth
        { f: 1174.66, g: 0.15, d: 1.8 }, // D6 octave
        { f: 1479.98, g: 0.10, d: 1.4 }, // F#6
      ];

      partials.forEach((p) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(p.f, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(p.g, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + p.d);
      });
    } catch {}
  }

  // Akshat (Holy Rice & Rose Petal) Shower Chime
  public playAkshatShower() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [659.25, 783.99, 987.77, 1174.66, 1318.51]; // E5, G5, B5, D6, E6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.7);
      });
    } catch {}
  }

  // Auspicious Flute & Sitar Arpeggio Melody
  public playDivineMelody() {
    this.stopMusic();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isMusicPlaying = true;

    // Raag Yaman / Bhupali inspired auspicious notes (C, D, E, G, A, C)
    const melodyChords = [
      [261.63, 329.63, 392.00, 523.25], // C - E - G - C
      [293.66, 369.99, 440.00, 587.33], // D - F# - A - D
      [329.63, 392.00, 493.88, 659.25], // E - G - B - E
      [349.23, 440.00, 523.25, 698.46], // F - A - C - F
      [392.00, 493.88, 587.33, 783.99], // G - B - D - G
      [261.63, 329.63, 392.00, 523.25], // C - E - G - C
    ];

    let chordIdx = 0;
    const playNext = () => {
      if (!this.isMusicPlaying) return;
      const currentCtx = this.getAudioContext();
      if (!currentCtx) return;

      const now = currentCtx.currentTime;
      const chord = melodyChords[chordIdx % melodyChords.length];

      chord.forEach((freq, noteIdx) => {
        const osc = currentCtx.createOscillator();
        const gain = currentCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.24);

        gain.gain.setValueAtTime(0, now + noteIdx * 0.24);
        gain.gain.linearRampToValueAtTime(0.12, now + noteIdx * 0.24 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.24 + 1.6);

        osc.connect(gain);
        gain.connect(currentCtx.destination);
        osc.start(now + noteIdx * 0.24);
        osc.stop(now + noteIdx * 0.24 + 1.6);
      });

      chordIdx++;
    };

    playNext();
    this.musicInterval = setInterval(playNext, 1400);
  }

  public playRingShimmer() {
    this.playTempleBell();
  }

  public playRomanticMelody() {
    this.playDivineMelody();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const divineAudio = new DivineWeddingAudioService();
export const weddingAudio = divineAudio;
