"use client";

import React from "react";
import { ExternalLink, Lock, Zap } from "lucide-react";

interface World10DefenseProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World10Defense({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World10DefenseProps) {
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

  const gateCloseFactor = Math.min(1, Math.max(0, (progress - 0.25) * 2));
  const hiddenDoorOpen = progress > 0.8;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#040409] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Fortress Defensive Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(99,102,241,0.2) 0%, transparent 65%),
            radial-gradient(circle at 20% 80%, rgba(147,51,234,0.15) 0%, transparent 60%)
          `
        }}
      />

      {/* 3D Fortress Rig */}
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
          {/* Concentric Blast Gates Closing Behind the Camera */}
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-between px-6 sm:px-16"
            style={{
              opacity: Math.min(1, (1 - progress * 0.7) * 1.5)
            }}
          >
            {/* Left Blast Gate */}
            <div
              className="w-24 sm:w-40 h-[480px] bg-slate-950 border-r-2 border-indigo-500/40 flex flex-col justify-center p-3 shadow-[0_0_50px_rgba(99,102,241,0.25)]"
              style={{
                transform: `translateX(-${(1 - gateCloseFactor) * 100}px)`,
                transition: "transform 0.05s linear"
              }}
            >
              <div className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest -rotate-90">
                BLAST GATE 01 &bull; EDGE PERIMETER
              </div>
            </div>

            {/* Right Blast Gate */}
            <div
              className="w-24 sm:w-40 h-[480px] bg-slate-950 border-l-2 border-indigo-500/40 flex flex-col justify-center items-end p-3 shadow-[0_0_50px_rgba(99,102,241,0.25)]"
              style={{
                transform: `translateX(${(1 - gateCloseFactor) * 100}px)`,
                transition: "transform 0.05s linear"
              }}
            >
              <div className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest rotate-90">
                BLAST GATE 02 &bull; ZERO TRUST AUTH
              </div>
            </div>
          </div>

          {/* CENTER FORTRESS CORE DISPLAY */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#0b0c20]/95 via-[#060714]/95 to-black/95 border-2 border-indigo-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(99,102,241,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `translateZ(${progress * 180}px) scale(${progress > 0.85 ? 1 + (progress - 0.85) * 3 : 1})`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  CHAPTER 10 // THE DIGITAL FORTRESS
                </span>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-bold">
                ZERO-TRUST ARCHITECTURE
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Enterprise Cybersecurity, Threat Defense, &amp; Cloud Hardening.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Layered defense engineered against modern exploits. Edge WAF, DDoS mitigation, end-to-end cryptographic encryption, and 24/7 security monitoring protecting client business assets.
            </p>

            {/* Fortress Defense Layers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-center">
                <div className="text-xs font-bold text-white">Edge WAF</div>
                <div className="text-[9px] font-mono text-indigo-300">DDoS Shield</div>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-center">
                <div className="text-xs font-bold text-white">Zero Trust</div>
                <div className="text-[9px] font-mono text-indigo-300">MFA & Tokens</div>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-center">
                <div className="text-xs font-bold text-white">Pen-Testing</div>
                <div className="text-[9px] font-mono text-indigo-300">Audited Defense</div>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-center">
                <div className="text-xs font-bold text-white">AES-256 Vault</div>
                <div className="text-[9px] font-mono text-indigo-300">Encrypted DB</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("cybersecurity")}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <span>Inspect Defense Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Cybersecurity & Infrastructure Hardening")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Request Security Audit</span>
              </button>
            </div>
          </div>

          {/* Hidden Door Reveal */}
          {hiddenDoorOpen && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="w-48 h-80 border-2 border-dashed border-cyan-400/80 bg-black/80 rounded-xl shadow-[0_0_60px_#06b6d4] flex flex-col items-center justify-center p-4">
                <Lock className="w-6 h-6 text-cyan-400 animate-pulse mb-2" />
                <div className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest text-center font-bold">
                  REINFORCED HIDDEN DOOR UNLOCKED &bull; ENTERING CYBER LAB
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
