"use client";

import React from "react";
import { ExternalLink, MessageSquare, Zap, CheckCircle2 } from "lucide-react";

interface World05IntelligenceProps {
  globalProgress: number;
  start: number;
  end: number;
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
}

export default function World05Intelligence({
  globalProgress,
  start,
  end,
  onOpenDetails,
  onDeploy
}: World05IntelligenceProps) {
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

  const tokenSeparation = Math.min(1, Math.max(0, (progress - 0.2) * 3));

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#030a08] select-none pointer-events-none transition-opacity duration-75"
      style={{
        opacity,
        filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : "none"
      }}
    >
      {/* Sci-Fi Neural Data Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(16,185,129,0.2) 0%, transparent 65%),
            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.15) 0%, transparent 60%)
          `
        }}
      />

      {/* 3D Perspective Canvas */}
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
          {/* PHASE 1: Floating WhatsApp Client Message */}
          {progress < 0.45 && (
            <div
              className="absolute top-20 sm:top-28 px-5 py-3.5 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/60 shadow-[0_0_50px_rgba(16,185,129,0.4)] backdrop-blur-xl flex items-center gap-3 pointer-events-none"
              style={{
                transform: `translateZ(${progress * 250}px)`,
                opacity: Math.max(0, 1 - progress * 2.2),
                transition: "transform 0.05s linear"
              }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black text-sm">
                <MessageSquare className="w-4 h-4 fill-current text-slate-950" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-emerald-300 font-bold uppercase">Incoming WhatsApp &bull; Lead</div>
                <div className="text-sm font-semibold text-white">
                  &ldquo;Can I book an appointment tomorrow at 4 PM?&rdquo;
                </div>
              </div>
            </div>
          )}

          {/* PHASE 2: Fracturing into 4 Semantic Tokens */}
          {progress >= 0.15 && progress < 0.8 && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transform: `translateZ(${(progress - 0.2) * 200}px)`,
                opacity: Math.min(1, (progress - 0.15) * 4) * Math.max(0, 1 - (progress - 0.7) * 5)
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-[90%] max-w-xl">
                <div
                  className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  style={{ transform: `translateX(-${tokenSeparation * 20}px)` }}
                >
                  <span className="text-[9px] font-mono text-emerald-400 uppercase font-black">TOKEN 01 // INTENT</span>
                  <p className="text-xs font-bold text-white mt-1">Book New Appointment</p>
                </div>

                <div
                  className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  style={{ transform: `translateX(${tokenSeparation * 20}px)` }}
                >
                  <span className="text-[9px] font-mono text-cyan-400 uppercase font-black">TOKEN 02 // TIME SLOT</span>
                  <p className="text-xs font-bold text-white mt-1">Tomorrow 16:00 IST [Available]</p>
                </div>

                <div
                  className="p-3 rounded-xl bg-indigo-950/70 border border-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  style={{ transform: `translateX(-${tokenSeparation * 20}px)` }}
                >
                  <span className="text-[9px] font-mono text-indigo-400 uppercase font-black">TOKEN 03 // LEAD SCORE</span>
                  <p className="text-xs font-bold text-white mt-1">High Intent Enterprise (98%)</p>
                </div>

                <div
                  className="p-3 rounded-xl bg-purple-950/70 border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  style={{ transform: `translateX(${tokenSeparation * 20}px)` }}
                >
                  <span className="text-[9px] font-mono text-purple-400 uppercase font-black">TOKEN 04 // AUTOMATION</span>
                  <p className="text-xs font-bold text-white mt-1">Calendar + CRM Synchronized</p>
                </div>
              </div>
            </div>
          )}

          {/* PHASE 3 & 4: Neural Architecture & Live AI Response */}
          <div
            className="relative z-10 w-[90%] max-w-xl sm:max-w-2xl bg-gradient-to-b from-[#04150f]/95 via-[#020c08]/95 to-black/95 border-2 border-emerald-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_100px_rgba(16,185,129,0.3)] backdrop-blur-xl pointer-events-auto"
            style={{
              transform: `scale(${progress > 0.8 ? 1 + (progress - 0.8) * 3 : 1})`,
              transition: "transform 0.05s linear"
            }}
          >
            {/* AI Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  CHAPTER 05 // NEURAL AUTOMATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
                0.4s RESPONSE TIME
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Autonomous AI Agents &amp; WhatsApp Bot Systems.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
              Never miss a customer again. Intelligent 24/7 WhatsApp auto-responders, qualification bots, calendar bookings, and CRM updates working without human intervention.
            </p>

            {/* Synthesized Response Output */}
            <div className="p-3.5 mt-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-[9px] text-emerald-400 font-bold uppercase">Synthesized AI Response Sent:</div>
                <p className="italic mt-0.5">
                  &ldquo;Your appointment is confirmed for tomorrow at 4:00 PM. Calendar invite and preparation notes have been dispatched to your email.&rdquo;
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-4">
              <button
                onClick={() => onOpenDetails("ai-automation")}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <span>Inspect AI Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeploy("AI & WhatsApp Business Automation")}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/50 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Deploy WhatsApp Bot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
