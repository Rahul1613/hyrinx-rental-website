"use client";

import { useState, useEffect } from "react";
import { celebrationAudio } from "@/lib/celebrationAudio";
import { Volume2, VolumeX, Sparkles, Sliders } from "lucide-react";

interface BirthdayMusicBarProps {
  onToggleFireworks: () => void;
  onOpenPersonalize: () => void;
}

export default function BirthdayMusicBar({
  onToggleFireworks,
  onOpenPersonalize,
}: BirthdayMusicBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      celebrationAudio.stopMusic();
      setIsPlaying(false);
    } else {
      celebrationAudio.playHappyBirthday(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      celebrationAudio.stopMusic();
    };
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-40 px-4 sm:px-8 pointer-events-none">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        {/* Left Brand Badge */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 px-4 py-2 shadow-xl">
          <span className="text-xl">🎂</span>
          <span className="font-display font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400">
            BIRTHDAY CELEBRATION HUB
          </span>
        </div>

        {/* Right Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Music Play Button */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold shadow-xl transition-all active:scale-95 border ${
              isPlaying
                ? "bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 border-amber-300 shadow-amber-500/30 animate-pulse"
                : "bg-slate-950/80 backdrop-blur-md text-white border-white/20 hover:bg-white/10"
            }`}
            title={isPlaying ? "Pause Birthday Song" : "Play Happy Birthday Song"}
          >
            {isPlaying ? (
              <>
                <Volume2 className="h-4 w-4 text-slate-950" />
                <span className="flex items-center gap-0.5">
                  <span className="inline-block w-1 h-3 bg-slate-950 rounded-full animate-bounce" />
                  <span className="inline-block w-1 h-4 bg-slate-950 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="inline-block w-1 h-2.5 bg-slate-950 rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
                <span className="hidden sm:inline">Playing Birthday Song</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Play Birthday Song 🎵</span>
              </>
            )}
          </button>

          {/* Fireworks Toggle */}
          <button
            onClick={onToggleFireworks}
            className="flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 hover:border-amber-400/50 hover:bg-amber-400/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-amber-300 shadow-xl transition-all"
            title="Launch Grand Fireworks Show"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="hidden sm:inline">Fireworks 🎆</span>
          </button>

          {/* Personalize Button */}
          <button
            onClick={onOpenPersonalize}
            className="flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 hover:bg-white/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-200 shadow-xl transition-all"
            title="Personalize Name & Age for Anyone"
          >
            <Sliders className="h-4 w-4" />
            <span className="hidden sm:inline">Customize</span>
          </button>
        </div>
      </div>
    </header>
  );
}
