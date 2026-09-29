"use client";

import React from "react";
import { ExternalLink, Radio, Zap } from "lucide-react";

interface World03AttentionProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World03Attention({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World03AttentionProps) {
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

  const signalPropagation = Math.min(1, progress * 1.8);
  const apertureRadius = progress > 0.75 ? Math.max(10, (1 - (progress - 0.75) * 4) * 250) : 320;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#030611] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Night Sky with Cyberpunk Volumetric Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.25) 0%, transparent 60%),
            radial-gradient(circle at 20% 30%, rgba(99,102,241,0.2) 0%, transparent 50%)
          `
        }}
      />

      {/* 3D Perspective City Space */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: "1000px",
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
          {/* Left City Skyscrapers with Vertical Social Feeds */}
          <div
            className="absolute left-[3%] sm:left-[8%] bottom-0 w-44 sm:w-56 h-[460px] bg-gradient-to-t from-slate-950 via-slate-900/90 to-cyan-950/40 border-r border-t border-cyan-500/30 p-3 flex flex-col justify-end gap-2"
            style={{
              transform: `translateZ(${100 - progress * 200}px)`,
              opacity: Math.min(1, (1 - progress * 0.8) * 1.5)
            }}
          >
            <div className="text-[9px] font-mono text-cyan-400 font-bold tracking-widest flex items-center gap-1">
              <Radio className="w-3 h-3 animate-ping" />
              LIVE FEED TOWER A
            </div>
            <div className="space-y-1.5 font-mono text-[10px] text-slate-300">
              <div className="p-1 rounded bg-cyan-950/60 border border-cyan-500/20 text-cyan-200">
                #HyrinxGrowth: +412%
              </div>
              <div className="p-1 rounded bg-cyan-950/60 border border-cyan-500/20 text-slate-300">
                Target: 20K+ Impressions
              </div>
              <div className="p-1 rounded bg-cyan-950/60 border border-cyan-500/20 text-emerald-400">
                Meta Ads Active &bull; ROI 4.2x
              </div>
            </div>
          </div>

          {/* Right City Skyscrapers with Search & Ads Stream */}
          <div
            className="absolute right-[3%] sm:right-[8%] bottom-0 w-44 sm:w-56 h-[500px] bg-gradient-to-t from-slate-950 via-slate-900/90 to-indigo-950/40 border-l border-t border-indigo-500/30 p-3 flex flex-col justify-end gap-2"
            style={{
              transform: `translateZ(${120 - progress * 200}px)`,
              opacity: Math.min(1, (1 - progress * 0.8) * 1.5)
            }}
          >
            <div className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest flex items-center gap-1">
              <Radio className="w-3 h-3 animate-ping" />
              AUDIENCE GRID B
            </div>
            <div className="space-y-1.5 font-mono text-[10px] text-slate-300">
              <div className="p-1 rounded bg-indigo-950/60 border border-indigo-500/20 text-indigo-200">
                Google Search Intent: High
              </div>
              <div className="p-1 rounded bg-indigo-950/60 border border-indigo-500/20 text-emerald-300">
                WhatsApp Conversion Triggered
              </div>
              <div className="p-1 rounded bg-indigo-950/60 border border-indigo-500/20 text-slate-300">
                Audience Nodes: 18,400+
              </div>
            </div>
          </div>

          {/* Glowing Network Beams */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <line
                x1="15%"
                y1="45%"
                x2="50%"
                y2="50%"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity={signalPropagation}
                className="animate-pulse"
              />
              <line
                x1="85%"
                y1="40%"
                x2="50%"
                y2="50%"
                stroke="#818cf8"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity={signalPropagation}
                className="animate-pulse"
              />
              <line
                x1="30%"
                y1="80%"
                x2="50%"
                y2="50%"
                stroke="#34d399"
                strokeWidth="2"
                opacity={progress > 0.4 ? 0.8 : 0}
              />
            </svg>
          </div>

          {/* Central Attention Nexus */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#061024]/95 via-[#030914]/95 to-black/95 border-2 border-cyan-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(6,182,212,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${progress > 0.8 ? 1 + (progress - 0.8) * 3 : 1})`,
              transition: "transform 0.05s linear"
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  CHAPTER 03 // THE ATTENTION CITY
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
                CONVERSION ENGINE
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Attention Engineered into Real Customer Revenue.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Targeted Meta ads, Google high-intent search capture, viral short-form distribution, and direct WhatsApp lead funnels operating synchronously.
            </p>

            {/* Target Disclaimer Preserved */}
            <div className="p-3 mt-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-[11px] font-mono text-cyan-300/90 leading-relaxed flex items-start gap-2">
              <span className="text-cyan-400 font-bold">&#9432;</span>
              <span>
                Target benchmark: 20K+ reach &amp; engagement used as an objective campaign metric tailored per client market, not a generic guaranteed outcome.
              </span>
            </div>

            {/* Action Row */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("marketing")}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-600/30"
              >
                <span>Inspect Marketing Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Social Media & Performance Marketing")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Growth Campaign</span>
              </button>
            </div>
          </div>

          {/* Circular Aperture Portal converging as camera exits */}
          {progress > 0.7 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div
                className="rounded-full border-4 border-cyan-400 shadow-[0_0_80px_#06b6d4,inset_0_0_80px_#06b6d4] transition-all"
                style={{
                  width: `${apertureRadius * 2}px`,
                  height: `${apertureRadius * 2}px`,
                  transform: `rotate(${progress * 360}deg)`
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
