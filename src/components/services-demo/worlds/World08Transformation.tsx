"use client";

import React from "react";
import { ExternalLink, QrCode, Zap, ArrowRight } from "lucide-react";

interface World08TransformationProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World08Transformation({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World08TransformationProps) {
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

  const transformationProgress = Math.min(1, Math.max(0, (progress - 0.2) * 2));

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#05060b] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Transformation Ambient Lighting */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `
            radial-gradient(circle at 40% 40%, rgba(20,184,166,${0.1 + transformationProgress * 0.2}) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(6,182,212,${0.1 + transformationProgress * 0.15}) 0%, transparent 60%)
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
          {/* Left Side: Analog Realm Morphing to Digital */}
          <div
            className="absolute left-[4%] sm:left-[10%] top-[25%] sm:top-[30%] w-48 sm:w-60 p-4 rounded-xl border border-white/10 backdrop-blur-md pointer-events-none"
            style={{
              background: transformationProgress > 0.5 ? "rgba(6,78,59,0.3)" : "rgba(30,20,10,0.4)",
              borderColor: transformationProgress > 0.5 ? "rgba(16,185,129,0.4)" : "rgba(245,158,11,0.2)",
              transform: `translateZ(${60 * transformationProgress}px)`,
              opacity: Math.min(1, (1 - progress * 0.8) * 1.5)
            }}
          >
            <div className="text-[9px] font-mono uppercase tracking-widest font-black text-slate-400 mb-1">
              {transformationProgress > 0.5 ? "TRANSFORMED // CLOUD DATA" : "ORIGIN // ANALOG SHOP"}
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className={`p-1.5 rounded flex items-center justify-between ${transformationProgress > 0.5 ? "bg-emerald-950/60 text-emerald-300" : "bg-black/50 text-amber-300"}`}>
                <span>{transformationProgress > 0.5 ? "Postgres Cloud Database" : "Paper Ledger Books"}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className={`p-1.5 rounded flex items-center justify-between ${transformationProgress > 0.5 ? "bg-emerald-950/60 text-emerald-300" : "bg-black/50 text-amber-300"}`}>
                <span>{transformationProgress > 0.5 ? "WhatsApp Business Automated" : "Manual Rotary Phone"}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className={`p-1.5 rounded flex items-center justify-between ${transformationProgress > 0.5 ? "bg-emerald-950/60 text-emerald-300" : "bg-black/50 text-amber-300"}`}>
                <span>{transformationProgress > 0.5 ? "Instant QR Tap-and-Pay" : "Cash Drawer & Receipts"}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Floating Smart QR Totem */}
          <div
            className="absolute right-[6%] sm:right-[12%] top-[30%] flex flex-col items-center pointer-events-none"
            style={{
              transform: `translateZ(${100 * transformationProgress}px) rotateY(${progress * 90}deg)`,
              opacity: Math.min(1, transformationProgress * 2)
            }}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-teal-950/80 border-2 border-teal-400/80 shadow-[0_0_40px_rgba(20,184,166,0.4)] flex items-center justify-center p-3">
              <QrCode className="w-full h-full text-teal-300 animate-pulse" />
            </div>
            <div className="mt-2 text-[9px] font-mono text-teal-400 font-bold uppercase tracking-wider">
              SMART QR SYSTEM
            </div>
          </div>

          {/* CENTER TRANSFORMATION DISPLAY */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#031514]/95 via-[#020d0c]/95 to-black/95 border-2 border-teal-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(20,184,166,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${progress > 0.8 ? 1 + (progress - 0.8) * 3 : 1})`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest">
                  CHAPTER 08 // THE TRANSFORMATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-teal-300 bg-teal-950/80 border border-teal-500/40 px-2.5 py-0.5 rounded-full font-bold">
                PAPER-TO-CLOUD MIGRATION
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Complete Digitalization of Physical Business Operations.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              We transform brick-and-mortar operations into connected digital ecosystems. Replace paper ledgers, manual order books, and cash registers with real-time cloud management, automated billing, and smart QR ordering.
            </p>

            {/* Capabilities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/20 text-center">
                <div className="text-xs font-bold text-white">Smart QR</div>
                <div className="text-[9px] font-mono text-teal-300">Menus & Portals</div>
              </div>
              <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/20 text-center">
                <div className="text-xs font-bold text-white">Cloud Billing</div>
                <div className="text-[9px] font-mono text-teal-300">Auto Invoicing</div>
              </div>
              <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/20 text-center">
                <div className="text-xs font-bold text-white">Stock Control</div>
                <div className="text-[9px] font-mono text-teal-300">Live Database</div>
              </div>
              <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/20 text-center">
                <div className="text-xs font-bold text-white">WhatsApp Ops</div>
                <div className="text-[9px] font-mono text-teal-300">Instant Customer</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("digitalization")}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-teal-600/30"
              >
                <span>Inspect Digitalization Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("Business Digitalization & Smart QR Systems")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Digitalize Your Business</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
