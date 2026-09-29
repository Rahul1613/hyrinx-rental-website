"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Sparkles, Feather, Music2 } from "lucide-react";
import confetti from "canvas-confetti";
import { festAudio } from "@/lib/festAudio";

export default function CampusDJBar() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    const nextState = festAudio.toggleMalharAmbience();
    setIsPlaying(nextState);
  };

  const handleSitarFlourish = () => {
    festAudio.playGildedChime();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.9 },
      colors: ["#D9A94E", "#F7E3AB", "#F405F9"],
    });
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl font-cinzel text-xs">
      <div className="px-4 py-2.5 rounded-full bg-[#0d0714]/95 backdrop-blur-xl border border-[#d9a94e]/40 shadow-2xl shadow-black/80 flex items-center justify-between gap-3">
        
        {/* Navigation Anchors */}
        <div className="flex items-center gap-3 px-1 text-[#f4ead8]/70 text-[11px] font-medium tracking-wider">
          <a href="#realm" className="hover:text-[#f7e3ab] transition-colors">REALM</a>
          <span className="text-[#d9a94e]/30">•</span>
          <a href="#tracks" className="hover:text-[#f7e3ab] transition-colors">DEPTS</a>
          <span className="text-[#d9a94e]/30">•</span>
          <a href="#pronites" className="hover:text-[#f7e3ab] transition-colors">DUSK</a>
          <span className="text-[#d9a94e]/30">•</span>
          <a href="#passport" className="hover:text-[#f7e3ab] transition-colors text-[#f7e3ab]">PASS</a>
        </div>

        {/* Ambient Raga & Sitar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSitarFlourish}
            className="px-3 py-1 rounded-full bg-[#1b1026] hover:bg-[#28163a] border border-[#d9a94e]/40 text-[#f7e3ab] text-[10px] tracking-wider font-bold transition-all flex items-center gap-1.5"
            title="Play Sitar & Chime Flourish"
          >
            <Sparkles className="w-3 h-3 text-[#d9a94e]" />
            <span className="hidden sm:inline">SWARA</span>
          </button>

          <button
            onClick={toggleSound}
            className={`px-3.5 py-1 rounded-full text-[10px] tracking-widest font-bold border transition-all flex items-center gap-1.5 ${
              isPlaying
                ? "bg-[#d9a94e] text-[#060407] border-[#d9a94e] shadow-md shadow-[#d9a94e]/20"
                : "bg-transparent text-[#f4ead8]/80 border-[#d9a94e]/30 hover:border-[#d9a94e] hover:text-white"
            }`}
          >
            {isPlaying ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span>{isPlaying ? "RAAG: ON" : "RAAG: OFF"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
