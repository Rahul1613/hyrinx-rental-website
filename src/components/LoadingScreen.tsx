"use client";

import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("hyrinx_visited_session")) return;
      sessionStorage.setItem("hyrinx_visited_session", "1");
    } catch {}

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    setShow(true);

    const timer = setTimeout(() => setShow(false), isReduced ? 350 : 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#070b14] select-none pointer-events-none ${
        reduced ? "animate-quick-fade" : "animate-screen-exit"
      }`}
    >
      <div className="relative w-full max-w-[320px] sm:max-w-[420px] px-4 animate-scale-out">
        {/* Glow halo */}
        <div className="absolute inset-0 bg-indigo-500/15 blur-2xl rounded-3xl animate-glow-pulse" />

        {/* Browser Frame */}
        <div className="relative rounded-2xl bg-[#0d1424]/90 border border-slate-700/60 shadow-2xl backdrop-blur-xl overflow-hidden p-4 sm:p-5">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 animate-dot-in" style={{ animationDelay: "0.15s" }} />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 animate-dot-in" style={{ animationDelay: "0.25s" }} />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-dot-in" style={{ animationDelay: "0.35s" }} />
            </div>
            <div className="h-4 w-28 sm:w-36 rounded-md bg-slate-800/60 border border-slate-700/40 animate-bar-draw" />
            <div className="w-6" />
          </div>

          {/* SVG Outline Pen Tracer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-400/40">
            <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" fill="none" strokeWidth="1.5" className="animate-frame-trace" />
          </svg>

          {/* Staggered Wireframe Content */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between animate-skel-1">
              <div className="h-4 w-24 rounded bg-indigo-400/30" />
              <div className="h-3 w-14 rounded bg-slate-700/60" />
            </div>

            <div className="h-16 sm:h-20 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-800/50 to-indigo-950/60 border border-slate-800/60 flex flex-col justify-center px-3 gap-2 animate-skel-2">
              <div className="h-3 w-3/4 rounded bg-slate-600/50" />
              <div className="h-2 w-1/2 rounded bg-slate-700/50" />
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1 animate-skel-3">
              <div className="h-12 rounded-lg bg-slate-800/40 border border-slate-800/50 p-2 flex flex-col justify-between">
                <div className="h-2 w-10 rounded bg-slate-600/40" />
                <div className="h-2 w-14 rounded bg-indigo-400/30" />
              </div>
              <div className="h-12 rounded-lg bg-slate-800/40 border border-slate-800/50 p-2 flex flex-col justify-between">
                <div className="h-2 w-12 rounded bg-slate-600/40" />
                <div className="h-2 w-10 rounded bg-emerald-400/30" />
              </div>
            </div>
          </div>

          {/* Morphing "FOR RENT" -> "LIVE" Badge */}
          <div className="absolute top-2.5 right-3 animate-badge-flow flex items-center">
            <div className="animate-tag-flip flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 text-[10px] font-bold tracking-wider text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 uppercase">
              <span>FOR RENT</span>
            </div>
            <div className="animate-live-morph absolute inset-0 flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 text-[10px] font-bold text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes frameTrace {
          0% { stroke-dasharray: 1200; stroke-dashoffset: 1200; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dasharray: 1200; stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-frame-trace { animation: frameTrace 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes dotIn {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-dot-in { animation: dotIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        @keyframes barDraw {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        .animate-bar-draw { animation: barDraw 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }

        @keyframes skelFade {
          0% { opacity: 0; transform: translateY(8px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-skel-1 { animation: skelFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
        .animate-skel-2 { animation: skelFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.48s both; }
        .animate-skel-3 { animation: skelFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.56s both; }

        @keyframes badgeSlide {
          0% { opacity: 0; transform: translate(24px, -12px) scale(0.7); }
          70% { transform: translate(0, 0) scale(1.08); }
          100% { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        .animate-badge-flow { animation: badgeSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both; }

        @keyframes tagFlip {
          0%, 70% { opacity: 1; transform: rotateX(0deg); }
          100% { opacity: 0; transform: rotateX(90deg); }
        }
        .animate-tag-flip { animation: tagFlip 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.25s forwards; }

        @keyframes liveMorph {
          0%, 50% { opacity: 0; transform: rotateX(-90deg) scale(0.9); }
          100% { opacity: 1; transform: rotateX(0deg) scale(1); }
        }
        .animate-live-morph { animation: liveMorph 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 1.25s forwards; }

        @keyframes glowPulse {
          0%, 50% { opacity: 0.2; transform: scale(0.95); }
          80% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 0.5; transform: scale(1); }
        }
        .animate-glow-pulse { animation: glowPulse 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }

        @keyframes scaleOut {
          0%, 70% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-scale-out { animation: scaleOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards; }

        @keyframes screenExit {
          0%, 72% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-screen-exit { animation: screenExit 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes quickFade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-quick-fade { animation: quickFade 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
