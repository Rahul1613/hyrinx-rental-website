"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Sparkles, Ticket, Flame, Calendar, Film } from "lucide-react";
import confetti from "canvas-confetti";
import { navratriAudio } from "@/lib/navratriAudio";

interface ReactionParticle {
  id: number;
  emoji: string;
  x: number;
}

export default function FloatingGarbaBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<ReactionParticle[]>([]);

  const handleToggleMusic = () => {
    if (isPlaying) {
      navratriAudio.stopMusic();
      setIsPlaying(false);
    } else {
      navratriAudio.playGarbaRhythm();
      setIsPlaying(true);
    }
  };

  const spawnReaction = (emoji: string, e: React.MouseEvent) => {
    // Sound reaction
    if (emoji === "🪘") navratriAudio.playDholBeat();
    else if (emoji === "🪔" || emoji === "🌺") navratriAudio.playAartiChime();
    else navratriAudio.playDholBeat();

    // Visual mini particle
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newP: ReactionParticle = {
      id: Date.now() + Math.random(),
      emoji,
      x: rect.left + rect.width / 2,
    };
    setParticles((prev) => [...prev, newP]);

    // Flower / sparkle burst
    if (emoji === "🌺" || emoji === "✨") {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.9, x: (rect.left + rect.width / 2) / window.innerWidth },
        colors: ["#D97706", "#DC2626", "#EA580C", "#FBBF24"],
      });
    }

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newP.id));
    }, 1500);
  };

  return (
    <>
      {/* Floating upward emojis */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: window.innerHeight - 80, x: p.x - 15, scale: 0.8 }}
              animate={{ opacity: 0, y: window.innerHeight - 350, scale: 1.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute text-3xl select-none"
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-amber-400 shadow-[0_10px_35px_rgba(180,83,9,0.25)] flex items-center justify-between gap-2">
          
          {/* Quick Nav Anchors */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <a
              href="#nine-days"
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors border border-amber-200"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">9 Days & Colors</span>
              <span className="sm:hidden">9 Days</span>
            </a>

            <a
              href="#passes"
              className="px-2.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
            >
              <Ticket className="w-3.5 h-3.5 text-amber-200" />
              <span>Garba Pass</span>
            </a>

            <a
              href="#aarti"
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors border border-amber-200"
            >
              <Flame className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">Aarti Thali</span>
              <span className="sm:hidden">Aarti</span>
            </a>

            <a
              href="#media-gallery"
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors border border-amber-200"
            >
              <Film className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden md:inline">Videos</span>
            </a>
          </div>

          {/* Interactive Emoji Cheering Reactions */}
          <div className="hidden md:flex items-center gap-1 px-2 border-l border-r border-amber-200">
            {["🪘", "🪔", "🌺", "🚩", "💃", "✨"].map((emoji) => (
              <button
                key={emoji}
                onClick={(e) => spawnReaction(emoji, e)}
                className="w-8 h-8 rounded-lg hover:bg-amber-100 active:scale-90 flex items-center justify-center text-base transition-transform"
                title={`React with ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Background Garba Music Toggle */}
          <button
            onClick={handleToggleMusic}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all shadow-sm ${
              isPlaying
                ? "bg-gradient-to-r from-red-700 to-amber-600 text-white animate-pulse"
                : "bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200"
            }`}
          >
            {isPlaying ? (
              <>
                <Music className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Garba Live</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden sm:inline">Play Garba</span>
              </>
            )}
          </button>

        </div>
      </div>
    </>
  );
}
