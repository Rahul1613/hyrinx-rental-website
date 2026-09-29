"use client";

import React from "react";
import { ExternalLink, Zap } from "lucide-react";

interface World06SystemsProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World06Systems({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World06SystemsProps) {
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

  const gearRotation = progress * 300;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#040810] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Industrial Machine Volumetric Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(99,102,241,0.15) 0%, transparent 50%)
          `
        }}
      />

      {/* 3D Mechanical Space */}
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
          {/* Left Side: Interlocking Mechanical Database Core */}
          <div
            className="absolute left-[4%] sm:left-[10%] w-48 sm:w-56 h-48 sm:h-56 rounded-full border-4 border-dashed border-blue-500/40 flex items-center justify-center pointer-events-none shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            style={{
              transform: `rotate(${gearRotation}deg) translateZ(80px)`,
              opacity: Math.min(1, (1 - progress * 0.8) * 1.5)
            }}
          >
            <div className="text-center font-mono text-[9px] text-blue-400 font-bold uppercase tracking-widest">
              DATABASE CORE<br />POSTGRES // REDIS
            </div>
          </div>

          {/* Right Side: Interlocking API & Auth Valves */}
          <div
            className="absolute right-[4%] sm:right-[10%] w-48 sm:w-56 h-48 sm:h-56 rounded-full border-4 border-dashed border-indigo-500/40 flex items-center justify-center pointer-events-none shadow-[0_0_50px_rgba(99,102,241,0.2)]"
            style={{
              transform: `rotate(-${gearRotation}deg) translateZ(80px)`,
              opacity: Math.min(1, (1 - progress * 0.8) * 1.5)
            }}
          >
            <div className="text-center font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-widest">
              API VALVES<br />GRAPHQL // AUTH SHIELD
            </div>
          </div>

          {/* Dynamic Pneumatic Data Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <line
                x1="20%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="12 6"
                className="animate-pulse"
                opacity={0.6}
              />
              <line
                x1="80%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="#818cf8"
                strokeWidth="3"
                strokeDasharray="12 6"
                className="animate-pulse"
                opacity={0.6}
              />
            </svg>
          </div>

          {/* CENTER APPLICATION: Rises from the software machine */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#0a1224]/95 via-[#060c18]/95 to-black/95 border-2 border-blue-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(59,130,246,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${progress > 0.8 ? 1 + (progress - 0.8) * 3 : 1})`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                  CHAPTER 06 // THE SOFTWARE MACHINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-950/80 border border-blue-500/40 px-2.5 py-0.5 rounded-full font-bold">
                CROSS-PLATFORM ARCHITECTURE
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Custom Software &amp; Mobile Applications Built For Scale.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Interlocking backend microservices, real-time databases, secure APIs, and responsive iOS &amp; Android native applications engineered as one unified machine.
            </p>

            {/* Machine Modules */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Full-Stack SaaS</div>
                <div className="text-[9px] font-mono text-blue-300">Cloud Scalable</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Mobile Apps</div>
                <div className="text-[9px] font-mono text-blue-300">iOS & Android</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Custom APIs</div>
                <div className="text-[9px] font-mono text-blue-300">Low-Latency</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Auth Vaults</div>
                <div className="text-[9px] font-mono text-blue-300">Zero-Trust</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("software-apps")}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <span>Inspect Systems Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Custom Software & Mobile App Engineering")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Architect App System</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
