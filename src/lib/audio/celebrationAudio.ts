// Web Audio API Synthesizer for high-quality, lag-free celebration sound effects and music

class CelebrationAudioService {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicTimeouts: NodeJS.Timeout[] = [];

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

  // Play a soft pleasant bell/marimba note
  private playNote(freq: number, startTime: number, duration: number, volume = 0.18) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Dual oscillator: fundamental + warm harmonic
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 2, startTime); // upper harmonic

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Balloon Pop Sound
  public playBalloonPop() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Punchy pop oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);

      // Noise puff
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(800, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch {
      // Audio playback fails gracefully if muted
    }
  }

  // Candle blowing whoosh sound
  public playCandleBlow() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Soft breath whoosh
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } catch {}
  }

  // Magical chime / wish coin clink
  public playMagicChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        this.playNote(freq, now + idx * 0.08, 0.6, 0.15);
      });
    } catch {}
  }

  // Celebration Fanfare / Cheer
  public playFanfare() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.15, offset: 0 },    // C5
        { f: 659.25, d: 0.15, offset: 0.12 }, // E5
        { f: 783.99, d: 0.15, offset: 0.24 }, // G5
        { f: 1046.5, d: 0.6,  offset: 0.36 }, // C6 (long)
      ];
      notes.forEach((n) => {
        this.playNote(n.f, now + n.offset, n.d, 0.25);
      });
    } catch {}
  }

  // Happy Birthday Melodic Chimes (Music Box version)
  public playHappyBirthday(onFinish?: () => void) {
    this.stopMusic();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isMusicPlaying = true;
    const now = ctx.currentTime + 0.05;

    // Standard Happy Birthday Notes in F Major / C Major (freq in Hz)
    const melody: Array<{ f: number; d: number }> = [
      // Happy Birthday to you
      { f: 261.63, d: 0.35 }, // G4 -> C4
      { f: 261.63, d: 0.25 }, // C4
      { f: 293.66, d: 0.55 }, // D4
      { f: 261.63, d: 0.55 }, // C4
      { f: 349.23, d: 0.55 }, // F4
      { f: 329.63, d: 0.9 },  // E4

      // Happy Birthday to you
      { f: 261.63, d: 0.35 }, // C4
      { f: 261.63, d: 0.25 }, // C4
      { f: 293.66, d: 0.55 }, // D4
      { f: 261.63, d: 0.55 }, // C4
      { f: 392.00, d: 0.55 }, // G4
      { f: 349.23, d: 0.9 },  // F4

      // Happy Birthday dear [Name]
      { f: 261.63, d: 0.35 }, // C4
      { f: 261.63, d: 0.25 }, // C4
      { f: 523.25, d: 0.55 }, // C5
      { f: 440.00, d: 0.55 }, // A4
      { f: 349.23, d: 0.55 }, // F4
      { f: 329.63, d: 0.55 }, // E4
      { f: 293.66, d: 0.8 },  // D4

      // Happy Birthday to you!
      { f: 466.16, d: 0.35 }, // Bb4
      { f: 466.16, d: 0.25 }, // Bb4
      { f: 440.00, d: 0.55 }, // A4
      { f: 349.23, d: 0.55 }, // F4
      { f: 392.00, d: 0.55 }, // G4
      { f: 349.23, d: 1.2 },  // F4
    ];

    let currentOffset = 0;
    melody.forEach((item) => {
      this.playNote(item.f, now + currentOffset, item.d * 0.95, 0.22);
      currentOffset += item.d;
    });

    const totalDurationMs = currentOffset * 1000;
    const timeout = setTimeout(() => {
      this.isMusicPlaying = false;
      if (onFinish) onFinish();
    }, totalDurationMs);
    this.musicTimeouts.push(timeout);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    this.musicTimeouts.forEach(clearTimeout);
    this.musicTimeouts = [];
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const celebrationAudio = new CelebrationAudioService();
