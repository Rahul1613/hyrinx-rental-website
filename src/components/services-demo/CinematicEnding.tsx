"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles, CheckCircle2 } from "lucide-react";
import { soundFX } from "./soundFx";

interface CinematicEndingProps {
  onStartProject: () => void;
}

const CHAPTER_TITLES = [
  "BUILD",
  "IDENTITY",
  "ATTENTION",
  "CREATE",
  "INTELLIGENCE",
  "SYSTEMS",
  "COMMERCE",
  "TRANSFORMATION",
  "CONTROL",
  "DEFENSE",
  "KNOWLEDGE",
  "FUTURE",
  "ORIGINALS"
];

export default function CinematicEnding({ onStartProject }: CinematicEndingProps) {
  return (
    <section className="relative py-32 overflow-hidden bg-black text-center select-none border-t border-white/10">
      {/* Background Volumetric Convergence Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-red-600/10 via-cyan-500/10 to-indigo-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* The 13 Chapters Converging */}
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase block font-semibold">
            THE 13 CHAPTERS CONVERGE
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {CHAPTER_TITLES.map((title, i) => (
              <span
                key={title}
                className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono font-bold text-slate-300 tracking-wider uppercase"
              >
                {title}
              </span>
            ))}
          </div>
        </div>

        {/* Monolithic Logo Slam */}
        <div className="space-y-4 pt-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-[0_4px_25px_rgba(255,255,255,0.2)]"
          >
            HYRINX
          </motion.h2>

          <p className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-400 tracking-tight">
            BUILD WHAT COMES NEXT.
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed pt-2">
            No fragmented agencies. No disjointed vendors. One unified creative technology powerhouse engineered to take your business forward.
          </p>
        </div>

        {/* Primary Action */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            data-cursor="LAUNCH"
            onClick={() => {
              soundFX.playUiSelect();
              onStartProject();
            }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-center gap-2 active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20have%20completed%20the%20Services%20Cinematic%20Tour%20and%20want%20to%20start%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide transition flex items-center gap-2 shadow-lg shadow-emerald-700/30"
          >
            <PhoneCall className="w-4 h-4" />
            <span>WhatsApp Founder: +91-9730213645</span>
          </a>
        </div>

        {/* Bottom Film Credits Stamp */}
        <div className="pt-12 border-t border-white/10 text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-4">
          <div>HYRINX STUDIOS &bull; COMPLETE CINEMATIC UNIVERSE</div>
          <div>FULL INTELLECTUAL PROPERTY &amp; CODE OWNERSHIP</div>
        </div>
      </div>
    </section>
  );
}
