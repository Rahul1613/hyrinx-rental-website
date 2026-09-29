"use client";

import React from "react";
import { ExternalLink, Zap } from "lucide-react";

interface World02IdentityProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World02Identity({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World02IdentityProps) {
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

  const cardScale = progress < 0.45 ? 1 + progress * 0.8 : 1 + (progress - 0.45) * 5;
  const billboardScale = progress > 0.6 ? Math.min(3.5, 1 + (progress - 0.6) * 5) : 0.85;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#050508] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* 3D Infinity Studio Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 20%, rgba(244,63,94,0.18) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(168,85,247,0.15) 0%, transparent 60%)
          `
        }}
      />

      {/* Dramatic Studio Overhead Rim Softbox */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-white/10 rounded-full blur-[90px] pointer-events-none" />

      {/* 3D Perspective Rig */}
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
          {/* PHASE 1: Floating Geometric Shape -> Symbol -> Hyrinx Monogram */}
          {progress < 0.45 && (
            <div
              className="absolute flex flex-col items-center justify-center pointer-events-none"
              style={{
                transform: `translateZ(${progress * 400}px) rotateY(${progress * 180}deg)`,
                opacity: Math.max(0, 1 - progress * 2.2),
                transition: "transform 0.05s linear"
              }}
            >
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 border-2 border-rose-500/60 rounded-3xl flex items-center justify-center bg-gradient-to-tr from-rose-950/40 via-purple-950/30 to-transparent shadow-[0_0_80px_rgba(244,63,94,0.4)] backdrop-blur-md">
                <span className="text-6xl sm:text-8xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-200 to-rose-600">
                  H
                </span>
              </div>
              <div className="mt-6 text-center">
                <div className="text-[10px] font-mono tracking-[0.4em] text-rose-400 uppercase font-black">
                  POLYGON &rarr; SYMBOL &rarr; IDENTITY
                </div>
              </div>
            </div>
          )}

          {/* PHASE 2: Luxury Foil Matte Business Card */}
          {progress >= 0.25 && progress < 0.65 && (
            <div
              className="absolute w-[320px] sm:w-[420px] h-[200px] sm:h-[260px] bg-[#0c0d14] border border-white/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(244,63,94,0.3)] p-6 flex flex-col justify-between pointer-events-none"
              style={{
                transform: `scale(${cardScale}) rotateY(${(progress - 0.35) * 35}deg) rotateX(${(progress - 0.35) * 15}deg) translateZ(${(progress - 0.35) * 400}px)`,
                opacity: progress < 0.5 ? Math.min(1, (progress - 0.25) * 7) : Math.max(0, 1 - (progress - 0.5) * 6),
                transition: "transform 0.05s linear"
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center font-black text-white text-xs shadow-md">
                    H
                  </div>
                  <span className="font-black text-white tracking-widest text-sm">HYRINX</span>
                </div>
                <span className="text-[9px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                  METALLIC FOIL EMBOSS
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Bespoke Visual Identity Systems
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Premium Brand Guides &bull; Luxury Packaging &bull; Print & Digital
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-slate-400">
                <span>COLOR MATRIX: CMYK + PANTONE</span>
                <span className="text-white font-bold">PARIS &bull; TOKYO &bull; MUMBAI</span>
              </div>
            </div>
          )}

          {/* PHASE 3 & 4: 3D Luxury Packaging Box & Towering Architectural Billboard */}
          {progress >= 0.5 && (
            <div
              className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#101018] to-[#08080f] border-2 border-rose-500/50 rounded-2xl shadow-[0_0_100px_rgba(244,63,94,0.3)] p-6 sm:p-8 overflow-hidden pointer-events-auto"
              style={{
                transform: `scale(${billboardScale}) translateZ(${(progress - 0.65) * 250}px)`,
                opacity: Math.min(1, (progress - 0.5) * 4),
                transition: "transform 0.05s linear"
              }}
            >
              {/* Top Billboard Lighting Rail */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-widest">
                    CHAPTER 02 // CREATIVE IDENTITY
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  ARCHITECTURAL SCALE BRANDING
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Brands Engineered to Dominate Attention and Command Respect.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mt-3">
                We design identities that live seamlessly across business cards, luxury unboxing packaging, towering urban billboards, and digital touchpoints.
              </p>

              {/* Discovered Environmental Artifacts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-center">
                  <div className="text-xs font-bold text-white">Logo Systems</div>
                  <div className="text-[9px] font-mono text-rose-300">Golden Ratio</div>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-center">
                  <div className="text-xs font-bold text-white">Packaging</div>
                  <div className="text-[9px] font-mono text-rose-300">3D Die-Lines</div>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-center">
                  <div className="text-xs font-bold text-white">OOH Billboards</div>
                  <div className="text-[9px] font-mono text-rose-300">High-Impact</div>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-center">
                  <div className="text-xs font-bold text-white">Social Visuals</div>
                  <div className="text-[9px] font-mono text-rose-300">Motion Ready</div>
                </div>
              </div>

              {/* In-World Actions */}
              <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
                <button
                  onClick={() => onOpenDetails("branding")}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-600/30"
                >
                  <span>Inspect Identity Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeploy("Brand Identity & Design")}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Consult on Brand Design</span>
                </button>
              </div>
            </div>
          )}

          {/* Spatial Typography */}
          <div
            className="absolute -top-8 right-8 sm:right-16 pointer-events-none"
            style={{
              opacity: Math.min(0.6, progress * 1.5) * (1 - exitFactor),
              transform: `translateZ(${cameraZ * 0.3}px)`
            }}
          >
            <div className="text-5xl sm:text-7xl md:text-8xl font-black text-rose-500/10 tracking-tighter uppercase font-mono">
              THE IDENTITY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
