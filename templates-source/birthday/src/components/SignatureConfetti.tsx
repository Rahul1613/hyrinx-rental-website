"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

interface SignatureConfettiProps {
  accentColor?: string;
  triggerKey?: string | number;
}

export function fireSignatureConfetti(accent = "#F6D062") {
  const count = 180;
  const defaults = {
    origin: { y: 0.8 },
    zIndex: 9999,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Dual side cannons with metallic champagne, crisp whites, and theme accents
  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors: [accent, "#ffffff", "#E2E8F0", "#38BDF8"],
  });
  fire(0.2, {
    spread: 60,
    colors: [accent, "#FCD34D", "#F43F5E"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9,
    colors: [accent, "#ffffff", "#0284C7"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ["circle"],
    colors: [accent, "#ffffff"],
  });
  fire(0.1, {
    spread: 130,
    startVelocity: 45,
    colors: [accent, "#F59E0B"],
  });
}

export default function SignatureConfetti({
  accentColor = "#F6D062",
  triggerKey,
}: SignatureConfettiProps) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    // Fire ONCE on load with a slight delay for visual impact when hero renders
    const timer = setTimeout(() => {
      fireSignatureConfetti(accentColor);
      hasFiredRef.current = true;
    }, 450);

    return () => clearTimeout(timer);
  }, [triggerKey, accentColor]);

  return (
    <button
      onClick={() => fireSignatureConfetti(accentColor)}
      type="button"
      title="Replay Celebration Burst"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-[#0B0F19]/90 px-4 py-2.5 text-xs font-medium text-slate-300 shadow-xl backdrop-blur-md transition-all hover:border-white/30 hover:bg-[#131B2E] hover:text-white active:scale-95"
    >
      <Sparkles className="h-3.5 w-3.5 text-[#F6D062] animate-pulse" />
      <span>Replay Burst</span>
    </button>
  );
}
