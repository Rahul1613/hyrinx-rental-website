"use client";

import React, { useEffect, useState } from "react";

const CSS_STYLES = `
@keyframes hyrinxFrameTrace {
  0% { stroke-dasharray: 1200; stroke-dashoffset: 1200; opacity: 0; }
  20% { opacity: 1; }
  100% { stroke-dasharray: 1200; stroke-dashoffset: 0; opacity: 1; }
}
.hx-frame-trace {
  animation: hyrinxFrameTrace 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes hyrinxDotIn {
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}
.hx-dot-in {
  animation: hyrinxDotIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes hyrinxBarDraw {
  0% { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: 1; }
}
.hx-bar-draw {
  transform-origin: left;
  animation: hyrinxBarDraw 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

@keyframes hyrinxSkelFade {
  0% { opacity: 0; transform: translateY(8px) scale(0.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.hx-skel-1 { animation: hyrinxSkelFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
.hx-skel-2 { animation: hyrinxSkelFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.48s both; }
.hx-skel-3 { animation: hyrinxSkelFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.56s both; }

@keyframes hyrinxBadgeSlide {
  0% { opacity: 0; transform: translate(24px, -12px) scale(0.7); }
  70% { transform: translate(0, 0) scale(1.08); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
}
.hx-badge-flow {
  animation: hyrinxBadgeSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both;
}

@keyframes hyrinxTagFlip {
  0%, 70% { opacity: 1; transform: rotateX(0deg); }
  100% { opacity: 0; transform: rotateX(90deg); }
}
.hx-tag-flip {
  animation: hyrinxTagFlip 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.25s forwards;
}

@keyframes hyrinxLiveMorph {
  0%, 50% { opacity: 0; transform: rotateX(-90deg) scale(0.9); }
  100% { opacity: 1; transform: rotateX(0deg) scale(1); }
}
.hx-live-morph {
  animation: hyrinxLiveMorph 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 1.25s forwards;
}

@keyframes hyrinxGlowPulse {
  0%, 50% { opacity: 0.2; transform: scale(0.95); }
  80% { opacity: 0.8; transform: scale(1.05); }
  100% { opacity: 0.5; transform: scale(1); }
}
.hx-glow-pulse {
  animation: hyrinxGlowPulse 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}

@keyframes hyrinxScaleOut {
  0%, 70% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
.hx-scale-out {
  animation: hyrinxScaleOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards;
}

@keyframes hyrinxScreenExit {
  0%, 72% { opacity: 1; pointer-events: auto; }
  100% { opacity: 0; pointer-events: none; }
}
.hx-screen-exit {
  animation: hyrinxScreenExit 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes hyrinxQuickFade {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
.hx-quick-fade {
  animation: hyrinxQuickFade 0.3s ease-out forwards;
}
`;

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem("hyrinx_visited_session")) {
        return;
      }
      sessionStorage.setItem("hyrinx_visited_session", "1");
    } catch {
      // safe fallback
    }

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, isReduced ? 350 : 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#070b14] select-none pointer-events-none ${
          reduced ? "hx-quick-fade" : "hx-screen-exit"
        }`}
      >
        <div className="relative w-full max-w-[320px] sm:max-w-[420px] px-4 hx-scale-out">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-3xl hx-glow-pulse" />

          {/* Browser Window Frame */}
          <div className="relative rounded-2xl bg-[#0d1424] border border-slate-700/60 shadow-2xl overflow-hidden p-4 sm:p-5">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 hx-dot-in" style={{ animationDelay: "0.15s" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 hx-dot-in" style={{ animationDelay: "0.25s" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 hx-dot-in" style={{ animationDelay: "0.35s" }} />
              </div>
              <div className="h-4 w-28 sm:w-36 rounded-md bg-slate-800/80 border border-slate-700/50 hx-bar-draw" />
              <div className="w-6" />
            </div>

            {/* SVG Outline Pen Tracer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-400/50">
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="16"
                fill="none"
                strokeWidth="1.5"
                className="hx-frame-trace"
              />
            </svg>

            {/* Wireframe Skeleton Content */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between hx-skel-1">
                <div className="h-4 w-24 rounded bg-indigo-400/40" />
                <div className="h-3 w-14 rounded bg-slate-700/60" />
              </div>

              <div className="h-16 sm:h-20 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-800/60 to-indigo-950/60 border border-slate-800 flex flex-col justify-center px-3 gap-2 hx-skel-2">
                <div className="h-3 w-3/4 rounded bg-slate-600/60" />
                <div className="h-2 w-1/2 rounded bg-slate-700/60" />
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1 hx-skel-3">
                <div className="h-12 rounded-lg bg-slate-800/40 border border-slate-800/60 p-2 flex flex-col justify-between">
                  <div className="h-2 w-10 rounded bg-slate-600/50" />
                  <div className="h-2 w-14 rounded bg-indigo-400/40" />
                </div>
                <div className="h-12 rounded-lg bg-slate-800/40 border border-slate-800/60 p-2 flex flex-col justify-between">
                  <div className="h-2 w-12 rounded bg-slate-600/50" />
                  <div className="h-2 w-10 rounded bg-emerald-400/40" />
                </div>
              </div>
            </div>

            {/* Morphing "FOR RENT" -> "LIVE" Badge */}
            <div className="absolute top-2.5 right-3 hx-badge-flow flex items-center">
              <div className="hx-tag-flip flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 text-[10px] font-bold tracking-wider text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/40 uppercase">
                <span>FOR RENT</span>
              </div>
              <div className="hx-live-morph absolute inset-0 flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/95 text-[10px] font-bold text-emerald-300 border border-emerald-500/50 shadow-lg shadow-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
