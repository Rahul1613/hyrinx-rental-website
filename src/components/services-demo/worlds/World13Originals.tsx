"use client";

import React from "react";
import { ExternalLink, Box, Zap } from "lucide-react";

interface World13OriginalsProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

const ORIGINALS_ARTIFACTS = [
  { id: "box", name: "Digital Business-in-a-Box" },
  { id: "twin", name: "Business Digital Twin" },
  { id: "recovery", name: "Missed Customer Recovery" },
  { id: "qr", name: "QR Smart Systems" },
  { id: "vault", name: "Digital Warranty Vault" },
  { id: "queue", name: "Digital Queue & Pacing" },
  { id: "audit", name: "AI Business Audit" },
  { id: "waas", name: "Website-as-a-Service (WaaS)" },
  { id: "continuity", name: "Digital Continuity System" }
];

export default function World13Originals({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World13OriginalsProps) {
  const buffer = 0.035;
  if (globalProgress < start - buffer || globalProgress > end + buffer) return null;

  const progress = Math.min(1, Math.max(0, (globalProgress - start) / (end - start)));

  // Continuous Camera Fly-Through
  const enterFactor = globalProgress < start ? Math.max(0, (globalProgress - (start - buffer)) / buffer) : 1;
  const exitFactor = globalProgress > end ? Math.min(1, (globalProgress - end) / buffer) : 0;

  const cameraZ = (enterFactor - 1) * 600 + exitFactor * 1000;
  const cameraScale = 0.75 + enterFactor * 0.25 + exitFactor * 3;
  const opacity = globalProgress < start ? enterFactor : 1 - exitFactor;
  const blurAmount = (1 - enterFactor) * 6 + exitFactor * 14;

  const convergence = progress > 0.8 ? (progress - 0.8) * 5 : 0;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#020205] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Deep Obsidian Cosmic Haze */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(220,38,38,0.18) 0%, transparent 65%),
            radial-gradient(circle at 20% 20%, rgba(59,130,246,0.12) 0%, transparent 50%)
          `
        }}
      />

      {/* 3D Cosmic Space */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: "1100px",
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
          {/* 9 FLOATING PHYSICAL ARTIFACTS IN 3D ORBIT */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: Math.min(1, (1 - progress * 0.7) * 1.5)
            }}
          >
            {ORIGINALS_ARTIFACTS.map((art, idx) => {
              const angle = (idx / ORIGINALS_ARTIFACTS.length) * Math.PI * 2 + progress * 0.6;
              const radius = 280 + (idx % 2) * 50;
              const x = Math.cos(angle) * radius * (1 - convergence);
              const y = Math.sin(angle) * (radius * 0.6) * (1 - convergence);
              const z = Math.sin(angle * 2) * 100 * (1 - convergence);

              return (
                <div
                  key={art.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails("hyrinx-originals");
                  }}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                    transition: "transform 0.05s linear"
                  }}
                >
                  <div className="px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-red-500/40 hover:border-red-400 group-hover:scale-110 group-hover:bg-red-950/60 shadow-[0_0_30px_rgba(220,38,38,0.25)] transition-all flex items-center gap-2 backdrop-blur-md">
                    <Box className="w-3.5 h-3.5 text-red-400 group-hover:rotate-12 transition-transform" />
                    <span className="font-mono text-[10px] text-white font-bold whitespace-nowrap">
                      {art.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER MONUMENTAL DISPLAY */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#1a0505]/95 via-[#0f0303]/95 to-black/95 border-2 border-red-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(220,38,38,0.35)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `translateZ(${progress * 150}px) scale(${progress > 0.85 ? Math.max(0.01, 1 - (progress - 0.85) * 8) : 1})`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-widest">
                  CHAPTER 13 // HYRINX ORIGINALS
                </span>
              </div>
              <span className="text-[10px] font-mono text-red-300 bg-red-950/80 border border-red-500/40 px-2.5 py-0.5 rounded-full font-bold">
                9 PROPRIETARY BLUEPRINTS
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Original Digital Inventions Built Exclusively by Hyrinx.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Nine proprietary concepts engineered to solve complex operational challenges. From full business-in-a-box solutions to sub-90-second missed lead recovery engines.
            </p>

            {/* Monumental Tagline */}
            <div className="p-3 mt-4 rounded-xl bg-red-950/40 border border-red-500/30 text-center font-mono text-xs text-red-300 font-bold tracking-widest uppercase">
              THERE IS MORE. WE BUILD WHAT OTHERS CALL IMPOSSIBLE.
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("hyrinx-originals")}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <span>Inspect All 9 Originals</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Hyrinx Proprietary Originals")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-300 border border-red-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Deploy An Original</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
