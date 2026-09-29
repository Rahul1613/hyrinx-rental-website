// Web Audio API Synthesizer for Malhar Fest: Raag Malhar harmonics, sitar plucks & monsoon rain acoustic lore

class MalharAudioService {
  private ctx: AudioContext | null = null;
  private isAmbiencePlaying = false;
  private ambienceInterval: NodeJS.Timeout | null = null;

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

  // Resonant Sitar / Tanpura Pluck (Raag Megh / Malhar notes: Sa, Re, Ma, Pa, Ni)
  public playSitarPluck(noteFreq: number = 261.63) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Primary string oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Resonance harmonics (Jawari effect in sitar)
      const harmonicOsc = ctx.createOscillator();
      const harmonicGain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(noteFreq, now);

      harmonicOsc.type = "triangle";
      harmonicOsc.frequency.setValueAtTime(noteFreq * 2.01, now);

      // Filter to simulate wooden body resonance
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 1.2);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      harmonicGain.gain.setValueAtTime(0, now);
      harmonicGain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      harmonicOsc.connect(harmonicGain);

      gain.connect(filter);
      harmonicGain.connect(filter);
      filter.connect(ctx.destination);

      osc.start(now);
      harmonicOsc.start(now);
      osc.stop(now + 1.2);
      harmonicOsc.stop(now + 1.2);
    } catch {}
  }

  // Gilded Celestial Chime (Malhar triumph / celebration flourish)
  public playGildedChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Megh / Malhar ascending notes: Sa, Re, Ma, Pa, Ni, Sa'
      const malharNotes = [261.63, 293.66, 349.23, 392.00, 466.16, 523.25];

      malharNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq * 1.5, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    } catch {}
  }

  // Soft Monsoon Drop effect
  public playMonsoonDrop() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const startFreq = 800 + Math.random() * 600;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 1.8, now + 0.06);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  // Ambient Raag Malhar Loop (Gentle tanpura drone + acoustic sitar phrases)
  public toggleMalharAmbience(): boolean {
    if (this.isAmbiencePlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isAmbiencePlaying;
  }

  private startAmbience() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    this.isAmbiencePlaying = true;

    // Raag Malhar Swara notes: Sa (C), Re (D), Ma (F), Pa (G), Komal Ni (Bb)
    const malharRagaScale = [261.63, 293.66, 349.23, 392.00, 466.16, 523.25, 392.00, 349.23];
    let noteIndex = 0;

    // Initial flourish
    this.playGildedChime();

    this.ambienceInterval = setInterval(() => {
      if (!this.isAmbiencePlaying) return;
      const note = malharRagaScale[noteIndex % malharRagaScale.length];
      this.playSitarPluck(note);
      
      // Random gentle raindrop chime
      if (Math.random() > 0.4) {
        setTimeout(() => this.playMonsoonDrop(), 300);
      }
      noteIndex++;
    }, 900);
  }

  public stopAmbience() {
    this.isAmbiencePlaying = false;
    if (this.ambienceInterval) {
      clearInterval(this.ambienceInterval);
      this.ambienceInterval = null;
    }
  }
}

export const festAudio = new MalharAudioService();
