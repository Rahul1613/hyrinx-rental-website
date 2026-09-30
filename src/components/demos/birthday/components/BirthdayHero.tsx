"use client";

import { motion } from "framer-motion";
import { Sparkles, Cake, Gift, Film, Mail, Heart, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { celebrationAudio } from '@/lib/audio/celebrationAudio';

interface BirthdayHeroProps {
  name: string;
  age: number;
  nickname: string;
  tagline: string;
  onLaunchFireworks: () => void;
}

export default function BirthdayHero({
  name,
  age,
  nickname,
  tagline,
  onLaunchFireworks,
}: BirthdayHeroProps) {
  const triggerConfettiBurst = () => {
    celebrationAudio.playFanfare();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#F59E0B", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"],
    });
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden text-center">
      {/* Background ambient celebratory light orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-pink-600/25 via-amber-500/20 to-purple-600/25 blur-3xl pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-4xl">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-pink-500/15 px-5 py-2 text-xs sm:text-sm font-bold text-amber-300 shadow-xl backdrop-blur-md mb-6"
        >
          <Sparkles className="h-4 w-4 animate-spin text-amber-400" />
          <span>CELEBRATING {nickname.toUpperCase()} • LEVEL {age} UNLOCKED</span>
          <Sparkles className="h-4 w-4 animate-spin text-pink-400" />
        </motion.div>

        {/* Grand Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-white">
            HAPPY BIRTHDAY,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 drop-shadow-[0_10px_25px_rgba(244,114,182,0.3)]">
              {name}!
            </span>
          </h1>
        </motion.div>

        {/* Milestone Age Stamp & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 border border-white/15 px-6 py-2.5 backdrop-blur-md shadow-2xl">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-amber-300">
              {age}
            </span>
            <div className="h-6 w-px bg-white/20" />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              Glorious Years of Awesomeness, Kindness & Adventures!
            </span>
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500 animate-pulse" />
          </div>

          <p className="mt-6 text-lg sm:text-2xl text-slate-200 font-medium max-w-2xl leading-relaxed">
            {tagline}
          </p>
        </motion.div>

        {/* Celebration Navigation & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Cake Ceremony Jump */}
          <a
            href="#cake-ceremony"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-6 py-3.5 text-sm sm:text-base font-display font-bold text-slate-950 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-transform"
          >
            <Cake className="h-5 w-5" />
            <span>Blow The Candles 🎂</span>
          </a>

          {/* Birthday Video Reel Jump */}
          <a
            href="#birthday-video-section"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3.5 text-sm sm:text-base font-display font-bold text-white shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-transform"
          >
            <Film className="h-5 w-5" />
            <span>Watch Birthday Reel 🎬</span>
          </a>

          {/* Confetti Cannon Burst Button */}
          <button
            onClick={triggerConfettiBurst}
            className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-3.5 text-sm sm:text-base font-display font-semibold text-slate-100 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span>Shoot Confetti 🎉</span>
          </button>

          {/* Fireworks Show Button */}
          <button
            onClick={onLaunchFireworks}
            className="flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 px-5 py-3.5 text-sm sm:text-base font-display font-semibold text-amber-300 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <Flame className="h-5 w-5 text-amber-400" />
            <span>Fireworks Show 🎆</span>
          </button>
        </motion.div>

        {/* Live Party Status Banner */}
        <div className="mt-14 rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Party Vibe: <strong className="text-white">Maximum Joy</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎂 Cake Status: <strong className="text-amber-400">Ready To Slice</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>💌 Secret Wishes: <strong className="text-pink-400">Pouring In</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
