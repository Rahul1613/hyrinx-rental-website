"use client";

import React from "react";
import { ExternalLink, Clapperboard, Zap } from "lucide-react";

interface World04CreateProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World04Create({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World04CreateProps) {
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

  const timelineOffset = (progress - 0.25) * 500;
  const lutVibrancy = Math.min(1, Math.max(0, (progress - 0.35) * 2));
  const frameZoom = progress > 0.75 ? 1 + (progress - 0.75) * 5 : 1;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#050408] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Studio Lighting Mood */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(234,88,12,0.2) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, rgba(147,51,234,0.18) 0%, transparent 60%)
          `
        }}
      />

      {/* 3D Perspective Stage */}
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
          {/* Overhead Lighting Grid */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none opacity-50">
            <div className="w-24 h-4 bg-slate-800 rounded border border-white/20 shadow-[0_0_20px_#f97316]" />
            <div className="w-32 h-5 bg-slate-800 rounded border border-white/20 shadow-[0_0_25px_#f97316]" />
            <div className="w-24 h-4 bg-slate-800 rounded border border-white/20 shadow-[0_0_20px_#f97316]" />
          </div>

          {/* Floating Clapperboard */}
          {progress < 0.4 && (
            <div
              className="absolute top-16 sm:top-24 flex items-center gap-3 bg-black/80 border border-amber-500/40 px-4 py-2 rounded-xl backdrop-blur-md pointer-events-none"
              style={{
                opacity: Math.max(0, 1 - progress * 2.5),
                transform: `translateZ(${progress * 200}px)`
              }}
            >
              <Clapperboard className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="font-mono text-xs text-white font-bold tracking-widest">
                SCENE 04 // CUT &bull; TAKE 02 &bull; 4K 60FPS
              </span>
            </div>
          )}

          {/* PHYSICAL EDITING TIMELINE */}
          {progress >= 0.15 && progress < 0.85 && (
            <div
              className="absolute w-[800px] sm:w-[1100px] h-20 bg-slate-950/80 border border-amber-500/30 rounded-xl p-2 flex items-center gap-2 overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)] pointer-events-none"
              style={{
                transform: `translateY(180px) translateX(-${timelineOffset}px) rotateX(30deg)`,
                opacity: Math.min(1, (progress - 0.15) * 4) * Math.max(0, 1 - (progress - 0.75) * 6)
              }}
            >
              <div className="w-32 h-full bg-amber-600/40 rounded border border-amber-400/40 p-1.5 flex flex-col justify-between text-[8px] font-mono text-amber-200">
                <span>CLIP 01 &bull; HERO A-ROLL</span>
                <span>00:00 - 00:08</span>
              </div>
              <div className="w-48 h-full bg-rose-600/40 rounded border border-rose-400/40 p-1.5 flex flex-col justify-between text-[8px] font-mono text-rose-200">
                <span>CLIP 02 &bull; PRODUCT MACRO</span>
                <span>00:08 - 00:15</span>
              </div>
              <div className="w-40 h-full bg-purple-600/40 rounded border border-purple-400/40 p-1.5 flex flex-col justify-between text-[8px] font-mono text-purple-200">
                <span>CLIP 03 &bull; MOTION GFX</span>
                <span>00:15 - 00:24</span>
              </div>
              <div className="w-52 h-full bg-cyan-600/40 rounded border border-cyan-400/40 p-1.5 flex flex-col justify-between text-[8px] font-mono text-cyan-200">
                <span>AUDIO &bull; STEREO MASTER WAVEFORM</span>
                <div className="flex items-center gap-0.5 h-3">
                  {[12, 24, 18, 30, 15, 28, 22, 14, 32, 19, 26, 16].map((h, i) => (
                    <div key={i} className="w-1 bg-cyan-300 rounded-full" style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CENTER 16:9 MASTER VIDEO FRAME */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-black/90 border-2 border-amber-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(245,158,11,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${frameZoom}) translateZ(${progress * 200}px)`,
              filter: `saturate(${1 + lutVibrancy * 0.4}) contrast(${1 + lutVibrancy * 0.15})`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Film Monitor HUD Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                  CHAPTER 04 // THE PRODUCTION STUDIO
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-300/80 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded">
                ANAMORPHIC 2.39:1 &bull; 4K DCI
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              High-Impact Video Production That Stops The Scroll.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Video shooting, directional cuts, color grading LUTs, motion graphics, viral reels, and promotional films engineered for audience retention.
            </p>

            {/* Integrated Production Capabilities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">4K Shooting</div>
                <div className="text-[9px] font-mono text-amber-300">Studio & On-Site</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">Viral Reels</div>
                <div className="text-[9px] font-mono text-amber-300">Hook Psychology</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">Motion GFX</div>
                <div className="text-[9px] font-mono text-amber-300">Kinetic Titles</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">Color Grade</div>
                <div className="text-[9px] font-mono text-amber-300">ACES Cinema LUT</div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("content-creation")}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-amber-600/30"
              >
                <span>Inspect Production Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Video Production & Content Engine")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Book Shoot &amp; Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
