"use client";

import { useState } from "react";
import { celebrationAudio } from '@/lib/audio/celebrationAudio';

interface FloatingEmoji {
  id: number;
  emoji: string;
  leftPercent: number;
}

const EMOJI_OPTIONS = ["❤️", "🎂", "🎉", "🚀", "🥂", "✨", "🥳", "👑"];

export default function FloatingReactions() {
  const [activeEmojis, setActiveEmojis] = useState<FloatingEmoji[]>([]);

  const handleSendReaction = (emoji: string) => {
    celebrationAudio.playMagicChime();
    const newId = Date.now() + Math.random();
    const randomLeft = Math.floor(Math.random() * 80) + 10; // 10% to 90%

    setActiveEmojis((prev) => [...prev, { id: newId, emoji, leftPercent: randomLeft }]);

    // Remove emoji after animation completes (4s)
    setTimeout(() => {
      setActiveEmojis((prev) => prev.filter((item) => item.id !== newId));
    }, 4000);
  };

  return (
    <>
      {/* Floating Animated Emojis in Viewport */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {activeEmojis.map((item) => (
          <div
            key={item.id}
            style={{ left: `${item.leftPercent}%`, bottom: "70px" }}
            className="absolute text-4xl select-none animate-float-up pointer-events-none drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Floating Bottom Reaction Pill Bar */}
      <aside aria-label="Celebration reaction shortcuts" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-slate-950/85 backdrop-blur-xl border border-white/20 p-2 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-amber-300 pl-3 pr-1">
            Tap to React:
          </span>

          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleSendReaction(emoji)}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 active:scale-125 text-xl sm:text-2xl transition-all shadow-sm"
              title={`Send ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
