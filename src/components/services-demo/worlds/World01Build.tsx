"use client";

import React from "react";
import { ArrowRight, Database, ExternalLink, Zap } from "lucide-react";

interface World01BuildProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World01Build({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World01BuildProps) {
  const buffer = 0.035;
  if (globalProgress < start - buffer || globalProgress > end + buffer) return null;

  // Local progress (0 to 1)
  const progress = Math.min(1, Math.max(0, (globalProgress - start) / (end - start)));

  // Continuous Camera Fly-Through Metrics
  const enterFactor = globalProgress < start ? Math.max(0, (globalProgress - (start - buffer)) / buffer) : 1;
  const exitFactor = globalProgress > end ? Math.min(1, (globalProgress - end) / buffer) : 0;

  const cameraZ = (enterFactor - 1) * 600 + exitFactor * 1000;
  const cameraScale = 0.75 + enterFactor * 0.25 + exitFactor * 3;
  const opacity = globalProgress < start ? enterFactor : 1 - exitFactor;
  const blurAmount = (1 - enterFactor) * 6 + exitFactor * 14;

  const cameraAltitude = Math.max(0, 1 - progress);
  const cameraPitch = 35 * cameraAltitude * (1 - exitFactor);
  const buildingHeightMultiplier = Math.min(1, Math.max(0, (progress - 0.1) * 2.2));
  const screenZoom = progress > 0.75 ? 1 + (progress - 0.75) * 6 : 1;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#02040a] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Dynamic 3D Camera Rig */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Sky / Atmospheric Horizon */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% ${30 + progress * 30}%, rgba(37,99,235,0.2) 0%, rgba(2,4,10,0.95) 75%)`
          }}
        />

        {/* 3D World Container rotated by camera altitude */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateX(${cameraPitch}deg) translateY(${cameraAltitude * 100}px) translateZ(${cameraZ + progress * 300}px) scale(${cameraScale})`,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
        >
          {/* Ground Architectural Grid */}
          <div
            className="absolute -inset-[100%] pointer-events-none"
            style={{
              opacity: Math.min(0.6, progress * 2),
              backgroundImage: `
                linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59,130,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              transform: "rotateX(90deg) translateZ(-250px)",
              transformOrigin: "center center"
            }}
          />

          {/* Subterranean Illuminated Database Conduits */}
          <div
            className="absolute w-[800px] h-[300px] pointer-events-none"
            style={{
              transform: "rotateX(90deg) translateZ(-290px)",
              opacity: buildingHeightMultiplier * 0.7
            }}
          >
            <div className="w-full h-full flex items-center justify-around">
              <div className="flex flex-col items-center gap-1 text-cyan-400/80 font-mono text-[10px] tracking-widest">
                <Database className="w-6 h-6 animate-pulse" />
                <span>POSTGRES // CLUSTER</span>
              </div>
              <div className="w-1/3 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse shadow-[0_0_10px_#38bdf8]" />
              <div className="flex flex-col items-center gap-1 text-indigo-400/80 font-mono text-[10px] tracking-widest">
                <Database className="w-6 h-6 animate-pulse" />
                <span>REDIS // CACHE</span>
              </div>
            </div>
          </div>

          {/* Left Tower: Web Applications Tower */}
          <div
            className="absolute left-[6%] sm:left-[14%] bottom-[20%] w-48 sm:w-64 border border-blue-500/30 bg-gradient-to-t from-blue-950/70 via-slate-950/80 to-transparent backdrop-blur-md p-4 rounded-t-xl"
            style={{
              height: `${280 * buildingHeightMultiplier}px`,
              transform: `translateZ(${100 * buildingHeightMultiplier}px)`,
              opacity: Math.min(1, buildingHeightMultiplier * 1.5)
            }}
          >
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              TOWER 01 &bull; WEB APPS
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-300">
              <div className="p-1.5 rounded bg-blue-950/40 border border-blue-500/20">Next.js 14 SSR</div>
              <div className="p-1.5 rounded bg-blue-950/40 border border-blue-500/20">Sub-Second Latency</div>
              <div className="p-1.5 rounded bg-blue-950/40 border border-blue-500/20">Microservices Grid</div>
            </div>
          </div>

          {/* Right Tower: Custom Software & Cloud Infrastructure */}
          <div
            className="absolute right-[6%] sm:right-[14%] bottom-[20%] w-48 sm:w-64 border border-indigo-500/30 bg-gradient-to-t from-indigo-950/70 via-slate-950/80 to-transparent backdrop-blur-md p-4 rounded-t-xl"
            style={{
              height: `${320 * buildingHeightMultiplier}px`,
              transform: `translateZ(${120 * buildingHeightMultiplier}px)`,
              opacity: Math.min(1, buildingHeightMultiplier * 1.5)
            }}
          >
            <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              TOWER 02 &bull; CLOUD CORE
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-300">
              <div className="p-1.5 rounded bg-indigo-950/40 border border-indigo-500/20">Enterprise APIs</div>
              <div className="p-1.5 rounded bg-indigo-950/40 border border-indigo-500/20">Zero-Downtime CI/CD</div>
              <div className="p-1.5 rounded bg-indigo-950/40 border border-indigo-500/20">Automated Scalability</div>
            </div>
          </div>

          {/* API Suspension Bridge */}
          <div
            className="absolute top-[42%] left-[18%] right-[18%] h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 pointer-events-none shadow-[0_0_15px_#38bdf8]"
            style={{
              opacity: progress > 0.4 ? buildingHeightMultiplier : 0,
              transform: "translateZ(110px)"
            }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-300 tracking-widest uppercase bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
              API BRIDGE // REST &bull; GRAPHQL
            </div>
          </div>

          {/* CENTER MONOLITH: The Building that transforms into a living website */}
          <div
            className="relative z-20 w-[90%] max-w-xl sm:max-w-2xl bg-slate-950/90 border-2 border-blue-500/60 rounded-2xl shadow-[0_0_100px_rgba(59,130,246,0.35)] overflow-hidden pointer-events-auto"
            style={{
              transform: `scale(${screenZoom}) translateZ(${progress * 200}px)`,
              transformOrigin: "center center"
            }}
          >
            {/* Website Browser Chrome Header */}
            <div className="bg-slate-900/90 border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
                  <span className="text-emerald-400">https://</span>
                  <span className="text-white font-bold">hyrinx.com</span>
                  <span className="text-slate-400">/architecture</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/70 border border-cyan-500/40 px-2 py-0.5 rounded">
                  0.72s LOAD SPEED
                </span>
              </div>
            </div>

            {/* Living Website Glass Facade Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-black">
                  CHAPTER 01 // DIGITAL REAL ESTATE
                </div>
                <div className="text-xs font-mono text-slate-400">SEO 100 &bull; PERF 99</div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                High-Performance Digital Architecture Engineered to Convert.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                Websites, Web Apps, E-Commerce, Dashboards, and Custom APIs built with clean code, sub-second edge speeds, and conversion psychology.
              </p>

              {/* Natural In-Environment Features */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                <div className="p-2.5 rounded-lg bg-blue-950/50 border border-blue-500/20 text-left">
                  <div className="text-xs font-bold text-white">Full-Stack Web</div>
                  <div className="text-[10px] font-mono text-slate-300 mt-0.5">Next.js & React 18</div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-950/50 border border-blue-500/20 text-left">
                  <div className="text-xs font-bold text-white">Cloud Dashboards</div>
                  <div className="text-[10px] font-mono text-slate-300 mt-0.5">Real-time Telemetry</div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-950/50 border border-blue-500/20 text-left col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-white">Conversion Funnels</div>
                  <div className="text-[10px] font-mono text-slate-300 mt-0.5">Direct ROI Focus</div>
                </div>
              </div>

              {/* Interactive Inspection & WhatsApp Action Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                <button
                  onClick={() => onOpenDetails("web-dev")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <span>Inspect Blueprint Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeploy("Website & Web App Construction")}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Start Build Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Typography in 3D Space */}
        <div
          className="absolute -top-10 left-8 sm:left-16 pointer-events-none"
          style={{
            opacity: Math.min(0.8, progress * 1.5) * (1 - exitFactor),
            transform: `translateZ(${cameraZ * 0.3}px)`
          }}
        >
          <div className="text-5xl sm:text-7xl md:text-8xl font-black text-white/15 tracking-tighter uppercase font-mono">
            THE ARCHITECT
          </div>
        </div>
      </div>
    </div>
  );
}
