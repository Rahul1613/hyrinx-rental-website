"use client";

import React from "react";
import { ExternalLink, Zap } from "lucide-react";

interface World09ControlProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World09Control({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World09ControlProps) {
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

  const collapseScale = progress > 0.85 ? Math.max(0.01, 1 - (progress - 0.85) * 8) : 1;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#030612] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Volumetric Mission Control Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.22) 0%, transparent 65%),
            radial-gradient(circle at 50% 80%, rgba(99,102,241,0.18) 0%, transparent 60%)
          `
        }}
      />

      {/* 3D Mission Control Space */}
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
          {/* Curved Panoramic Holographic Operations Display Ribbons */}
          <div
            className="absolute inset-0 flex items-center justify-between px-4 sm:px-12 pointer-events-none"
            style={{
              opacity: Math.min(1, (1 - progress * 0.7) * 1.5)
            }}
          >
            {/* Left Ribbon */}
            <div className="w-44 sm:w-56 space-y-3">
              <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-500/40 backdrop-blur-md">
                <div className="text-[9px] font-mono text-cyan-400 font-bold uppercase">STREAM 01 // UPTIME</div>
                <div className="text-base font-black text-white">99.99% Cloud SLA</div>
                <div className="text-[10px] text-slate-300 font-mono mt-0.5">&lt; 120ms Global Latency</div>
              </div>
              <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-500/40 backdrop-blur-md">
                <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase">STREAM 02 // CUSTOMERS</div>
                <div className="text-base font-black text-white">100% Inquiries Routed</div>
                <div className="text-[10px] text-slate-300 font-mono mt-0.5">Zero Backlog 24/7</div>
              </div>
            </div>

            {/* Right Ribbon */}
            <div className="w-44 sm:w-56 space-y-3">
              <div className="p-3 rounded-xl bg-indigo-950/70 border border-indigo-500/40 backdrop-blur-md">
                <div className="text-[9px] font-mono text-indigo-400 font-bold uppercase">STREAM 03 // SOCIAL & ADS</div>
                <div className="text-base font-black text-white">Multi-Channel Active</div>
                <div className="text-[10px] text-slate-300 font-mono mt-0.5">Continuous Optimization</div>
              </div>
              <div className="p-3 rounded-xl bg-indigo-950/70 border border-indigo-500/40 backdrop-blur-md">
                <div className="text-[9px] font-mono text-purple-400 font-bold uppercase">STREAM 04 // MAINTENANCE</div>
                <div className="text-base font-black text-white">Continuous Security</div>
                <div className="text-[10px] text-slate-300 font-mono mt-0.5">Automated Backups</div>
              </div>
            </div>
          </div>

          {/* CENTER COMMAND BRIDGE DISPLAY */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#081226]/95 via-[#040916]/95 to-black/95 border-2 border-blue-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(59,130,246,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${collapseScale}) translateZ(${progress * 180}px)`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                  CHAPTER 09 // THE CONTROL ROOM
                </span>
              </div>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-950/80 border border-blue-500/40 px-2.5 py-0.5 rounded-full font-bold">
                360° TOTAL MANAGEMENT
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Complete Digital Operations Managed by One Unified Team.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Replace chaotic multi-vendor coordination with a single command bridge. We run your website updates, social media publishing, server uptime, performance marketing, and client support seamlessly.
            </p>

            {/* Capabilities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Web Ops</div>
                <div className="text-[9px] font-mono text-blue-300">Continuous SRE</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Social Mgmt</div>
                <div className="text-[9px] font-mono text-blue-300">Daily Publishing</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Ad Ops</div>
                <div className="text-[9px] font-mono text-blue-300">Bid Optimization</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-center">
                <div className="text-xs font-bold text-white">Support</div>
                <div className="text-[9px] font-mono text-blue-300">Dedicated Leads</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("management")}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <span>Inspect Management Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Complete Digital Management Retainer")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Retain Hyrinx Management</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
