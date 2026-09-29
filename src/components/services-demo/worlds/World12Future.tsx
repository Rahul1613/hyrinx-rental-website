"use client";

import React from "react";
import { ExternalLink, Sparkles, Orbit, Zap } from "lucide-react";

interface World12FutureProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World12Future({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World12FutureProps) {
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

  const floatY = Math.sin(progress * Math.PI * 4) * 16;
  const morphRotation = progress * 200;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#06030c] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Iridescent Quantum Future Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 20%, rgba(168,85,247,0.25) 0%, transparent 65%),
            radial-gradient(circle at 80% 70%, rgba(236,72,153,0.2) 0%, transparent 60%)
          `
        }}
      />

      {/* 3D Zero-Gravity Rig */}
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
          {/* Floating Liquid-Metal Geometry Left */}
          <div
            className="absolute left-[5%] sm:left-[12%] top-[20%] w-32 sm:w-44 h-32 sm:h-44 rounded-3xl border-2 border-purple-500/50 bg-gradient-to-tr from-purple-950/60 via-pink-950/40 to-transparent shadow-[0_0_60px_rgba(168,85,247,0.3)] backdrop-blur-md pointer-events-none flex items-center justify-center"
            style={{
              transform: `translateY(${floatY}px) rotateY(${morphRotation}deg) rotateX(${morphRotation * 0.5}deg) translateZ(100px)`,
              opacity: Math.min(1, (1 - progress * 0.7) * 1.5)
            }}
          >
            <Sparkles className="w-10 h-10 text-purple-300 animate-pulse" />
          </div>

          {/* Floating Spatial Orb Right */}
          <div
            className="absolute right-[5%] sm:right-[12%] bottom-[20%] w-32 sm:w-44 h-32 sm:h-44 rounded-full border-2 border-pink-500/50 bg-gradient-to-tr from-pink-950/60 via-purple-950/40 to-transparent shadow-[0_0_60px_rgba(236,72,153,0.3)] backdrop-blur-md pointer-events-none flex items-center justify-center"
            style={{
              transform: `translateY(${-floatY}px) rotateY(-${morphRotation}deg) translateZ(80px)`,
              opacity: Math.min(1, (1 - progress * 0.7) * 1.5)
            }}
          >
            <Orbit className="w-10 h-10 text-pink-300 animate-spin" />
          </div>

          {/* CENTER FUTURE LAB DISPLAY */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#140620]/95 via-[#0b0312]/95 to-black/95 border-2 border-purple-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(168,85,247,0.35)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${progress > 0.8 ? 1 + (progress - 0.8) * 3 : 1}) translateZ(${progress * 180}px)`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">
                  CHAPTER 12 // CREATIVE TECHNOLOGY &amp; FUTURE
                </span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 border border-purple-500/40 px-2.5 py-0.5 rounded-full font-bold">
                FRONTIER R&amp;D LAB
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Next-Gen Generative AI, 3D WebGL, &amp; Spatial Interfaces.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Where emerging creative technology becomes competitive advantage. Interactive 3D spatial experiences, generative artificial intelligence pipelines, custom WebGL simulations, and experimental hardware installations.
            </p>

            {/* Capabilities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-center">
                <div className="text-xs font-bold text-white">3D WebGL</div>
                <div className="text-[9px] font-mono text-purple-300">Spatial Depth</div>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-center">
                <div className="text-xs font-bold text-white">Generative AI</div>
                <div className="text-[9px] font-mono text-purple-300">Custom Models</div>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-center">
                <div className="text-xs font-bold text-white">Spatial UI</div>
                <div className="text-[9px] font-mono text-purple-300">Next-Gen Web</div>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-center">
                <div className="text-xs font-bold text-white">Hardware R&D</div>
                <div className="text-[9px] font-mono text-purple-300">Physical Tech</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("creative-tech")}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-purple-600/30"
              >
                <span>Inspect Future Lab Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Creative Technology & Spatial R&D")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Commission Future R&amp;D</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
