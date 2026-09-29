// Velvet Cinema Audio Engine for Hyrinx Experience
// Default is muted. Zero harsh ticks or clicks. Pure optional ambient velvet tone if toggled on.

class VelvetSoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = true; // Default MUTED per specification
  private activeNodes: { stop: () => void }[] = [];

  public getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public ensureAudioReady(): boolean {
    if (this.isMuted) return false;
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
      return true;
    }
    return !!ctx;
  }

  // Smooth, warm, velvety movie ambient swell (Only if unmuted)
  playSmoothOpening() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.stopAll();
    const now = ctx.currentTime;

    try {
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.12, now + 1.8);
      masterGain.gain.setValueAtTime(0.12, now + 3.0);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);
      masterGain.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(65.41, now); // C2 warm fundamental

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, now);
      filter.frequency.linearRampToValueAtTime(260, now + 2.5);
      filter.frequency.exponentialRampToValueAtTime(100, now + 5.5);

      osc1.connect(filter);
      filter.connect(masterGain);

      osc1.start(now);
      osc1.stop(now + 5.8);

      this.activeNodes.push({
        stop: () => {
          try {
            osc1.stop();
          } catch {}
        }
      });
    } catch {}
  }

  // Soft organic sub-bass pulse (only if unmuted)
  playDirectImpact() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(65, now);
      subOsc.frequency.exponentialRampToValueAtTime(26, now + 1.4);

      subGain.gain.setValueAtTime(0.2, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.6);
    } catch {}
  }

  // Zero tick-tick sounds! Completely silent glide
  playSoftGlide() {
    // No-op to eliminate any tick-tick sounds completely
  }

  playFlipTick() {
    // No-op to eliminate any tick-tick sounds completely
  }

  // Soft velvet UI interaction (only if unmuted)
  playUiHover() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.02);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {}
  }

  playUiSelect() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.05);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  playBookOpen() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.35);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  playPageFlip() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.15);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  playBookClose() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.28);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {}
  }

  stopAll() {
    this.activeNodes.forEach((node) => node.stop());
    this.activeNodes = [];
  }
}

export const soundFX = new VelvetSoundController();
