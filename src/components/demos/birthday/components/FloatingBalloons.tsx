"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { celebrationAudio } from '@/lib/audio/celebrationAudio';

interface Balloon {
  id: number;
  color: string;
  leftPercent: number;
  delaySec: number;
  durationSec: number;
  label: string;
}

const BALLOON_DATA: Balloon[] = [
  { id: 1, color: "from-pink-500 to-rose-600", leftPercent: 5, delaySec: 0, durationSec: 16, label: "Stay Awesome! 💖" },
  { id: 2, color: "from-amber-400 to-yellow-500", leftPercent: 18, delaySec: 2, durationSec: 18, label: "Pure Gold! ✨" },
  { id: 3, color: "from-cyan-400 to-blue-500", leftPercent: 32, delaySec: 4, durationSec: 20, label: "Legend! 🚀" },
  { id: 4, color: "from-purple-500 to-indigo-600", leftPercent: 68, delaySec: 1, durationSec: 17, label: "Best Vibes! 🥂" },
  { id: 5, color: "from-emerald-400 to-teal-500", leftPercent: 82, delaySec: 3, durationSec: 19, label: "Health & Joy! 🍀" },
  { id: 6, color: "from-orange-400 to-red-500", leftPercent: 93, delaySec: 5, durationSec: 15, label: "Party Mode! 🎉" },
];

export default function FloatingBalloons() {
  const [poppedIds, setPoppedIds] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePop = (e: React.MouseEvent, balloon: Balloon) => {
    e.stopPropagation();
    celebrationAudio.playBalloonPop();

    // Trigger confetti at click coordinates
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ["#ec4899", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"],
    });

    setPoppedIds((prev) => [...prev, balloon.id]);
    setToastMessage(`🎈 Pop! "${balloon.label}"`);

    // Clear toast and respawn balloon
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);

    setTimeout(() => {
      setPoppedIds((prev) => prev.filter((id) => id !== balloon.id));
    }, 6000);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Toast message upon popping */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto bg-slate-900/90 border border-amber-400/40 text-amber-300 px-5 py-2.5 rounded-full font-medium shadow-2xl backdrop-blur-md animate-bounce text-sm">
          {toastMessage}
        </div>
      )}

      {BALLOON_DATA.map((b) => {
        if (poppedIds.includes(b.id)) return null;

        return (
          <div
            key={b.id}
            onClick={(e) => handlePop(e, b)}
            style={{
              left: `${b.leftPercent}%`,
              animationDelay: `${b.delaySec}s`,
              animationDuration: `${b.durationSec}s`,
            }}
            className="pointer-events-auto absolute bottom-[-140px] cursor-pointer animate-balloon group transition-transform hover:scale-110 select-none"
            title="Click to pop!"
          >
            {/* Balloon Body */}
            <div
              className={`relative h-20 w-16 sm:h-24 sm:w-20 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-t ${b.color} shadow-lg shadow-black/40 border border-white/20`}
            >
              {/* Highlight Glint */}
              <div className="absolute top-3 left-3 h-5 w-3 rounded-full bg-white/40 rotate-[-25deg] blur-[0.5px]" />

              {/* Little knot */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-2 w-2 rounded-sm bg-inherit opacity-90" />
            </div>

            {/* String */}
            <svg
              className="mx-auto -mt-0.5 h-16 w-3 overflow-visible stroke-white/40 group-hover:stroke-white/80 transition-colors"
              viewBox="0 0 10 60"
            >
              <path
                d="M 5 0 Q 8 15 2 30 T 7 60"
                fill="none"
                strokeWidth="1.2"
              />
            </svg>

            {/* Pop me tooltip on hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold bg-black/80 text-white px-2 py-0.5 rounded shadow">
              Pop me! 💥
            </span>
          </div>
        );
      })}
    </div>
  );
}
