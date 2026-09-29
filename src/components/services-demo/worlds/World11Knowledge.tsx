"use client";

import React from "react";
import { ExternalLink, Terminal, Zap, Server } from "lucide-react";

interface World11KnowledgeProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World11Knowledge({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World11KnowledgeProps) {
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

  const terminalDissolve = progress > 0.8 ? 1 + (progress - 0.8) * 3 : 1;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#03070d] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Clean High-Tech Research Lab Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(6,182,212,0.18) 0%, transparent 65%),
            radial-gradient(circle at 80% 80%, rgba(59,130,246,0.15) 0%, transparent 60%)
          `
        }}
      />

      {/* 3D Lab Perspective */}
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
          {/* Left Server Rack */}
          <div
            className="absolute left-[3%] sm:left-[8%] top-[25%] w-44 sm:w-56 p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md pointer-events-none"
            style={{
              transform: `translateZ(${100 - progress * 150}px)`,
              opacity: Math.min(1, (1 - progress * 0.8) * 1.5)
            }}
          >
            <div className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Server className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>LAB RACK 01 &bull; AIR-GAPPED</span>
            </div>
            <div className="space-y-1 font-mono text-[10px] text-slate-300">
              <div className="p-1 rounded bg-cyan-950/50 border border-cyan-500/20">Linux Debian VM Array</div>
              <div className="p-1 rounded bg-cyan-950/50 border border-cyan-500/20">CTF Target Range: Active</div>
              <div className="p-1 rounded bg-cyan-950/50 border border-cyan-500/20 text-emerald-400">Isolated Virtual LAN</div>
            </div>
          </div>

          {/* Right Station */}
          <div
            className="absolute right-[3%] sm:right-[8%] top-[25%] w-44 sm:w-56 p-3.5 rounded-xl bg-slate-950/80 border border-blue-500/30 backdrop-blur-md pointer-events-none"
            style={{
              transform: `translateZ(${100 - progress * 150}px)`,
              opacity: Math.min(1, (1 - progress * 0.8) * 1.5)
            }}
          >
            <div className="text-[9px] font-mono text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>AUDIT CONSOLE 02</span>
            </div>
            <div className="space-y-1 font-mono text-[10px] text-slate-300">
              <div className="p-1 rounded bg-blue-950/50 border border-blue-500/20">OWASP Top 10 Scans</div>
              <div className="p-1 rounded bg-blue-950/50 border border-blue-500/20">Static Code Analysis</div>
              <div className="p-1 rounded bg-blue-950/50 border border-blue-500/20 text-cyan-300">Defensive Patching</div>
            </div>
          </div>

          {/* CENTER CYBER RESEARCH LAB DISPLAY */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#04121a]/95 via-[#020b10]/95 to-black/95 border-2 border-cyan-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(6,182,212,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${terminalDissolve}) translateZ(${progress * 180}px)`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  CHAPTER 11 // THE CYBER LAB
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full font-bold">
                AUTHORIZED SECURITY RESEARCH
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ethical Cybersecurity Training, Education, &amp; Defensive Labs.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Practical defensive security knowledge. Hands-on virtual laboratory networks, CTF defensive simulations, corporate threat awareness, and secure software development practices.
            </p>

            {/* Explicit Authorized Educational Mandate Preserved */}
            <div className="p-3 mt-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-[11px] font-mono text-cyan-300/90 leading-relaxed flex items-start gap-2">
              <span className="text-cyan-400 font-bold">&#9432;</span>
              <span>
                100% Authorized &amp; Defensive: All training and exercises occur in strictly controlled, isolated simulation environments designed for corporate defense and education.
              </span>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("cyber-education")}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-600/30"
              >
                <span>Inspect Lab Curriculum</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Cybersecurity Training & Corporate Education")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Enroll In Security Lab</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
