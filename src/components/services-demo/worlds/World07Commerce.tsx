"use client";

import React from "react";
import { ExternalLink, Zap } from "lucide-react";

interface World07CommerceProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World07Commerce({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World07CommerceProps) {
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

  const productScale = progress < 0.8 ? 1 : 1 + (progress - 0.8) * 4;
  const productRotation = progress * 160;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#070502] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Luxury Warm Amber Ambient Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(245,158,11,0.2) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(217,119,6,0.15) 0%, transparent 60%)
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
          {/* THE PROTAGONIST PRODUCT */}
          <div
            className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
            style={{
              transform: `scale(${productScale}) translateZ(${progress * 250}px) translateY(${progress < 0.3 ? 0 : -50}px)`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* 3D Protagonist Artifact (Obsidian Luxury Vessel) */}
            <div
              className="w-24 sm:w-32 h-36 sm:h-44 rounded-2xl bg-gradient-to-tr from-black via-slate-900 to-amber-950 border-2 border-amber-400/80 shadow-[0_0_60px_rgba(245,158,11,0.5)] flex items-center justify-center relative"
              style={{
                transform: `rotateY(${productRotation}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
                <span className="font-mono text-xs font-black text-amber-300">HY-07</span>
              </div>
              <div className="absolute -bottom-8 w-28 h-6 bg-amber-400/30 rounded-full blur-md" />
            </div>

            <div className="mt-6 text-center font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
              THE PROTAGONIST &bull; OBSIDIAN EDITION
            </div>
          </div>

          {/* 7 STAGES OF THE JOURNEY */}
          <div
            className="absolute top-10 sm:top-14 flex items-center gap-2 sm:gap-4 px-4 py-2 rounded-full bg-black/80 border border-amber-500/30 backdrop-blur-md pointer-events-none"
            style={{
              opacity: Math.min(1, progress * 4) * Math.max(0, 1 - (progress - 0.8) * 5)
            }}
          >
            {[
              { label: "01 SHELF", active: progress < 0.2 },
              { label: "02 STORE", active: progress >= 0.2 && progress < 0.35 },
              { label: "03 CHECKOUT", active: progress >= 0.35 && progress < 0.5 },
              { label: "04 ROBOTICS", active: progress >= 0.5 && progress < 0.65 },
              { label: "05 PACKING", active: progress >= 0.65 && progress < 0.8 },
              { label: "06 TRANSIT", active: progress >= 0.8 && progress < 0.9 },
              { label: "07 DOORSTEP", active: progress >= 0.9 }
            ].map((st, i) => (
              <div
                key={i}
                className={`font-mono text-[9px] px-2 py-0.5 rounded transition-colors ${
                  st.active ? "bg-amber-500 text-black font-black" : "text-slate-400"
                }`}
              >
                {st.label}
              </div>
            ))}
          </div>

          {/* E-COMMERCE ECOSYSTEM DISPLAY */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#140f06]/95 via-[#0c0903]/95 to-black/95 border-2 border-amber-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(245,158,11,0.3)] backdrop-blur-xl mt-36 sm:mt-44 pointer-events-auto"
            style={{
              opacity: progress > 0.15 ? Math.min(1, (progress - 0.15) * 3) : 0,
              transform: `translateZ(${progress * 120}px)`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                  CHAPTER 07 // THE PRODUCT JOURNEY
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                ONE-CLICK GLOBAL CHECKOUT
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              High-Conversion E-Commerce from Discovery to Doorstep.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Custom Shopify &amp; headless storefronts, ultra-fast checkout flows, automated warehouse sync, live tracking, and friction-free payment gateways.
            </p>

            {/* Capabilities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">Custom Stores</div>
                <div className="text-[9px] font-mono text-amber-300">Shopify & Headless</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">Instant Checkout</div>
                <div className="text-[9px] font-mono text-amber-300">UPI & Global Cards</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">Stock Sync</div>
                <div className="text-[9px] font-mono text-amber-300">Real-Time ERP</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-center">
                <div className="text-xs font-bold text-white">Auto Shipping</div>
                <div className="text-[9px] font-mono text-amber-300">Live GPS Webhooks</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("ecommerce")}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-amber-600/30"
              >
                <span>Inspect Commerce Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("E-Commerce Storefront & Checkout Architecture")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Online Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
