"use client";

import React from "react";
import { ArrowRight, PhoneCall, RotateCcw } from "lucide-react";

interface WorldFinaleProps {
  globalProgress: number;
  start: number;
  end: number;
  onStartProject: () => void;
  onReplay: () => void;
}

const PREVIOUS_WORLDS = [
  "DIGITAL CITY",
  "BRAND STUDIO",
  "MARKETING METROPOLIS",
  "FILM SOUNDSTAGE",
  "AI NEURAL MATRIX",
  "SOFTWARE MACHINE",
  "COMMERCE JOURNEY",
  "DIGITAL ENTERPRISE",
  "CONTROL BRIDGE",
  "DIGITAL FORTRESS",
  "CYBER LAB",
  "FUTURE LAB",
  "ORIGINALS"
];

export default function WorldFinale({
  globalProgress,
  start,
  end,
  onStartProject,
  onReplay
}: WorldFinaleProps) {
  const buffer = 0.035;
  if (globalProgress < start - buffer) return null;

  const progress = Math.min(1, Math.max(0, (globalProgress - start) / (end - start)));

  // Continuous Camera Fly-Through
  const enterFactor = globalProgress < start ? Math.max(0, (globalProgress - (start - buffer)) / buffer) : 1;
  const cameraZ = (enterFactor - 1) * 600;
  const cameraScale = 0.75 + enterFactor * 0.25;
  const opacity = enterFactor;

  const collapseProgress = Math.min(1, Math.max(0, (progress - 0.2) * 2.5));
  const ctaOpacity = Math.min(1, Math.max(0, (progress - 0.6) * 3));

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black select-none pointer-events-none transition-opacity duration-75"
      style={{ opacity }}
    >
      {/* Deep Celestial Nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(220,38,38,0.2) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 80%)
          `
        }}
      />

      {/* 3D Cosmic Arena */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d"
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `translateZ(${cameraZ}px) scale(${cameraScale})`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* DISTANT CONSTELLATION NODES */}
          {collapseProgress < 0.95 && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity: Math.max(0, 1 - collapseProgress)
              }}
            >
              {PREVIOUS_WORLDS.map((world, i) => {
                const angle = (i / PREVIOUS_WORLDS.length) * Math.PI * 2;
                const dist = 320 * (1 - collapseProgress);
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist * 0.7;

                return (
                  <div
                    key={i}
                    className="absolute flex items-center gap-1.5"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0)`
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] animate-pulse" />
                    <span className="text-[8px] font-mono text-slate-400 font-bold whitespace-nowrap hidden sm:inline">
                      {world}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* REVEAL: H -> HYRINX MONOLITH */}
          <div
            className="relative z-10 flex flex-col items-center justify-center text-center px-4"
            style={{
              transform: `translateZ(${collapseProgress * 150}px)`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Radiant Monogram */}
            <div className="mb-4">
              <span className="text-7xl sm:text-9xl md:text-[11rem] font-sans font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500 drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                HYRINX
              </span>
            </div>

            {/* Subtitle */}
            <div className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-cyan-400 font-bold mb-6">
              Creative Technology &bull; Systems &bull; Defense
            </div>

            {/* MONUMENTAL FINAL MOTTO */}
            {progress > 0.5 && (
              <div
                className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase font-sans mb-8"
                style={{
                  opacity: Math.min(1, (progress - 0.5) * 3)
                }}
              >
                Build What Comes Next.
              </div>
            )}

            {/* FINAL CTA SUITE */}
            <div
              className="flex flex-wrap items-center justify-center gap-4 pt-4 pointer-events-auto"
              style={{
                opacity: ctaOpacity,
                pointerEvents: ctaOpacity > 0.4 ? "auto" : "none"
              }}
            >
              {/* Primary Start Project */}
              <button
                onClick={onStartProject}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_50px_rgba(220,38,38,0.5)] hover:brightness-110 active:scale-95 transition flex items-center gap-2.5 cursor-pointer"
              >
                <span>Start A Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Direct WhatsApp Consultation */}
              <a
                href="https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20have%20completed%20the%20Services%20Cinematic%20Universe%20film%20and%20want%20to%20consult%20on%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border-2 border-emerald-500/60 text-emerald-300 font-bold text-sm transition flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +91-9730213645</span>
              </a>

              {/* Replay The Film */}
              <button
                onClick={onReplay}
                className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/20 font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Film</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
