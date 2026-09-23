"use client";

import React, { useEffect, useState } from "react";

const CSS_STYLES = `
@keyframes hyrinxFrameTrace {
  0% { stroke-dasharray: 1200; stroke-dashoffset: 1200; opacity: 0; }
  15% { opacity: 1; }
  100% { stroke-dasharray: 1200; stroke-dashoffset: 0; opacity: 1; }
}
.hx-frame-trace {
  animation: hyrinxFrameTrace 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes hyrinxDotIn {
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}
.hx-dot-in {
  animation: hyrinxDotIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes hyrinxBarDraw {
  0% { opacity: 0; transform: scaleX(0.7); }
  100% { opacity: 1; transform: scaleX(1); }
}
.hx-bar-draw {
  animation: hyrinxBarDraw 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
}

@keyframes hyrinxSkelFade {
  0% { opacity: 0; transform: translateY(10px) scale(0.96); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.hx-skel-1 { animation: hyrinxSkelFade 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }
.hx-skel-2 { animation: hyrinxSkelFade 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.75s both; }
.hx-skel-3 { animation: hyrinxSkelFade 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.95s both; }

@keyframes hyrinxRentalBadge {
  0% { opacity: 0; transform: translate(30px, -15px) scale(0.6); }
  70% { transform: translate(0, 0) scale(1.12); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
}
.hx-rental-badge {
  animation: hyrinxRentalBadge 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.25s both;
}

@keyframes hyrinxTagFlip {
  0%, 70% { opacity: 1; transform: rotateX(0deg); }
  100% { opacity: 0; transform: rotateX(90deg); }
}
.hx-tag-flip {
  animation: hyrinxTagFlip 0.4s cubic-bezier(0.16, 1, 0.3, 1) 1.85s forwards;
}

@keyframes hyrinxLiveMorph {
  0%, 50% { opacity: 0; transform: rotateX(-90deg) scale(0.88); }
  100% { opacity: 1; transform: rotateX(0deg) scale(1); }
}
.hx-live-morph {
  animation: hyrinxLiveMorph 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 1.85s forwards;
}

@keyframes hyrinxGlowPulse {
  0%, 50% { opacity: 0.2; transform: scale(0.95); }
  80% { opacity: 0.9; transform: scale(1.06); }
  100% { opacity: 0.5; transform: scale(1); }
}
.hx-glow-pulse {
  animation: hyrinxGlowPulse 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}

@keyframes hyrinxScaleOut {
  0%, 85% { transform: scale(1); }
  100% { transform: scale(1.04); }
}
.hx-scale-out {
  animation: hyrinxScaleOut 1s cubic-bezier(0.16, 1, 0.3, 1) 5s forwards;
}

@keyframes hyrinxScreenExit {
  0%, 83% { opacity: 1; pointer-events: auto; }
  100% { opacity: 0; pointer-events: none; }
}
.hx-screen-exit {
  animation: hyrinxScreenExit 6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
    }, isReduced ? 350 : 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060913] select-none pointer-events-none px-4 ${
          reduced ? "hx-quick-fade" : "hx-screen-exit"
        }`}
      >
        <div className="relative w-full max-w-[340px] sm:max-w-[430px] hx-scale-out">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-indigo-600/25 blur-3xl rounded-3xl hx-glow-pulse" />

          {/* Browser Window Frame */}
          <div className="relative rounded-2xl bg-[#0d1424] border border-slate-700/70 shadow-2xl overflow-hidden p-4 sm:p-5">
            {/* Top Bar with URL */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 hx-dot-in" style={{ animationDelay: "0.15s" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 hx-dot-in" style={{ animationDelay: "0.25s" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 hx-dot-in" style={{ animationDelay: "0.35s" }} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-700/60 text-[11px] text-slate-400 font-mono hx-bar-draw">
                <span className="text-emerald-400 text-[10px]">🔒</span>
                <span>hyrinx.com/rentals</span>
              </div>
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

            {/* Website Rental Mockup Content */}
            <div className="pt-3.5 space-y-2.5">
              {/* Category & Rental Rate */}
              <div className="flex items-center justify-between hx-skel-1">
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 px-2 py-0.5 rounded">
                  ⚡ SELECT WEBSITE TEMPLATE
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-300">
                  ₹149<span className="text-[9px] text-slate-400 font-sans">/day</span>
                </span>
              </div>

              {/* Website Preview Box */}
              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 hx-skel-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <div className="h-3 w-28 rounded bg-slate-700/70" />
                  <div className="h-2.5 w-12 rounded bg-indigo-500/40" />
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-2">
                  <div className="h-6 rounded bg-slate-800/80 border border-slate-700/40 flex items-center justify-center text-[9px] text-slate-400">
                    3 Days
                  </div>
                  <div className="h-6 rounded bg-indigo-600/30 border border-indigo-500/60 flex items-center justify-center text-[9px] font-bold text-indigo-200">
                    7 Days ✓
                  </div>
                  <div className="h-6 rounded bg-slate-800/80 border border-slate-700/40 flex items-center justify-center text-[9px] text-slate-400">
                    1 Month
                  </div>
                </div>
              </div>

              {/* Instant Deployment Status Bar */}
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400 font-mono hx-skel-3">
                <span>Domain & Hosting: <strong className="text-slate-200">Included</strong></span>
                <span className="text-indigo-400">Ready in 60s</span>
              </div>
            </div>

            {/* Morphing "RENT NOW" -> "● LIVE ACTIVE" Badge */}
            <div className="absolute top-2.5 right-3 hx-rental-badge flex items-center">
              <div className="hx-tag-flip flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600 text-[10px] font-bold tracking-wider text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/40 uppercase">
                <span>🏷️ RENT NOW</span>
              </div>
              <div className="hx-live-morph absolute inset-0 flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/95 text-[10px] font-bold text-emerald-300 border border-emerald-500/50 shadow-lg shadow-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>RENTED &bull; LIVE</span>
              </div>
            </div>
          </div>

          {/* Subtitle Branding */}
          <div className="mt-4 text-center">
            <p className="text-xs font-semibold tracking-wide text-slate-300">
              Why buy a website? <span className="text-indigo-400 font-bold">Rent one instead.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
