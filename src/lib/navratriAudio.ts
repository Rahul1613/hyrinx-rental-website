// Web Audio API Synthesizer for Navratri Dhol Beats, Sacred Shankh, and Garba Harmonies

class NavratriAudioService {
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

  // Sacred Conch Shell (Shankh Naad) Drone
  public playShankh() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sawtooth";
      osc2.type = "sine";

      // Authentic Shankh rising swell
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(330, now + 0.6);
      osc1.frequency.exponentialRampToValueAtTime(220, now + 2.2);

      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.exponentialRampToValueAtTime(330, now + 0.6);
      osc2.frequency.exponentialRampToValueAtTime(220, now + 2.2);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.4);
      osc2.stop(now + 2.4);
    } catch {}
  }

  // Punchy Dhol Beat (Low Dhama + Crisp Taak)
  public playDholBeat() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Deep bass drum
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "triangle";
      bassOsc.frequency.setValueAtTime(110, now);
      bassOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

      bassGain.gain.setValueAtTime(0.4, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.18);

      // High wooden dandiya clack (Taak!)
      setTimeout(() => {
        if (!this.ctx) return;
        const clackNow = this.ctx.currentTime;
        const clackOsc = this.ctx.createOscillator();
        const clackGain = this.ctx.createGain();
        clackOsc.type = "square";
        clackOsc.frequency.setValueAtTime(750, clackNow);
        clackOsc.frequency.exponentialRampToValueAtTime(200, clackNow + 0.05);

        clackGain.gain.setValueAtTime(0.25, clackNow);
        clackGain.gain.exponentialRampToValueAtTime(0.001, clackNow + 0.05);

        clackOsc.connect(clackGain);
        clackGain.connect(this.ctx.destination);
        clackOsc.start(clackNow);
        clackOsc.stop(clackNow + 0.05);
      }, 90);
    } catch {}
  }

  // Temple Manjira Bell & Flower Shower Chime
  public playAartiChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [880, 1174.66, 1318.51, 1760]; // A5, D6, E6, A6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.8);
      });
    } catch {}
  }

  // Energetic Garba Raas Rhythm Loop
  public playGarbaRhythm() {
    this.stopMusic();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isMusicPlaying = true;

    // Fast spirited Garba arpeggios (Raag Desh / Khamaj inspired)
    const garbaChords = [
      [293.66, 369.99, 440.00, 587.33], // D Major
      [261.63, 329.63, 392.00, 523.25], // C Major
      [293.66, 349.23, 440.00, 587.33], // D Minor
      [220.00, 277.18, 329.63, 440.00], // A Major
    ];

    let step = 0;
    const playStep = () => {
      if (!this.isMusicPlaying) return;
      const currentCtx = this.getAudioContext();
      if (!currentCtx) return;

      const now = currentCtx.currentTime;
      const chord = garbaChords[step % garbaChords.length];

      // Play drum beat
      this.playDholBeat();

      // Play flute notes in sync
      chord.forEach((freq, noteIdx) => {
        const osc = currentCtx.createOscillator();
        const gain = currentCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.12);

        gain.gain.setValueAtTime(0, now + noteIdx * 0.12);
        gain.gain.linearRampToValueAtTime(0.08, now + noteIdx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + noteIdx * 0.12 + 0.4);

        const filter = currentCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(currentCtx.destination);

        osc.start(now + noteIdx * 0.12);
        osc.stop(now + noteIdx * 0.12 + 0.4);
      });

      step++;
    };

    playStep();
    this.musicInterval = setInterval(playStep, 600); // 100 BPM brisk Garba tempo
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

export const navratriAudio = new NavratriAudioService();
