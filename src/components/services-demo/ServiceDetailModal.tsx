"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Clock,
  Terminal,
  FileText,
  Activity,
  Target,
  CheckSquare
} from "lucide-react";
import { ServiceCategory } from "./servicesData";
import CategoryVisualRouter from "./CategoryVisuals";
import { soundFX } from "./soundFx";

interface ServiceDetailModalProps {
  category: ServiceCategory | null;
  onClose: () => void;
  onStartProject: (serviceTitle: string) => void;
}

export default function ServiceDetailModal({
  category,
  onClose,
  onStartProject
}: ServiceDetailModalProps) {
  useEffect(() => {
    if (category) {
      soundFX.playUiSelect();
    }
  }, [category]);

  if (!category) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/95 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#030611] border-2 border-cyan-500/40 text-slate-100 shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Sci-Fi HUD Corner Brackets */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-50" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-50" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-50" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-50" />

          {/* Top Dossier Classification Header */}
          <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono text-xs font-black tracking-wider uppercase shadow-md shadow-cyan-500/20">
                DIVISION {category.number} // {category.tag}
              </span>
              <div className="hidden sm:block">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block">
                  TACTICAL MISSION DOSSIER
                </span>
                <h2 className="text-base font-bold text-white tracking-wide">
                  {category.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFX.playUiSelect();
                  onStartProject(category.title);
                }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
              >
                <span>{category.primaryCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  soundFX.playUiHover();
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/80 text-slate-300 hover:text-red-400 transition-colors border border-slate-700 hover:border-red-500/50"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-12 text-slate-200">
            {/* 1. CINEMATIC HERO SECTION */}
            <div className="space-y-4 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{category.subtitle}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {category.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed font-normal">
                {category.heroDescription}
              </p>
            </div>

            {/* 2. INTERACTIVE CONCEPT VISUALIZER */}
            <div className="pt-2">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Systems Simulation</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  REAL-TIME SIMULATION
                </span>
              </div>
              <CategoryVisualRouter category={category} />
            </div>

            {/* 3. TACTICAL PROBLEM VS STRATEGIC SOLUTION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-red-950/30 to-slate-950 border-2 border-red-500/30 space-y-4 shadow-xl">
                <div className="flex items-center gap-2.5 text-red-400 pb-2 border-b border-red-950">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h3 className="font-black text-sm uppercase tracking-wider text-red-300">
                    {category.problem.title}
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                  {category.problem.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-400 font-black mt-0.5 text-sm">&times;</span>
                      <span className="leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-slate-950 border-2 border-emerald-500/30 space-y-4 shadow-xl">
                <div className="flex items-center gap-2.5 text-emerald-400 pb-2 border-b border-emerald-950">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-black text-sm uppercase tracking-wider text-emerald-300">
                    {category.solution.title}
                  </h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-100">
                  {category.solution.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-400 font-black mt-0.5 text-sm">&bull;</span>
                      <span className="leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. EXECUTION PIPELINE / WORKFLOW */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>{category.workflowTitle}</span>
                </h3>
                <span className="text-xs font-mono text-cyan-400 font-bold">5-STAGE PROTOCOL</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {category.workflowSteps.map((ws, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 relative shadow-lg"
                  >
                    <span className="text-[11px] font-mono text-cyan-400 font-black">
                      PHASE {ws.step}
                    </span>
                    <strong className="block text-white text-xs font-bold">{ws.label}</strong>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{ws.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. CORE CAPABILITIES */}
            <div className="space-y-5">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Specialized Capabilities & Technical Features</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {category.features.map((feat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 shadow-md">
                    <strong className="text-cyan-300 text-xs font-bold block">{feat.title}</strong>
                    <p className="text-xs text-slate-200 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. REAL COMMERCIAL OUTCOMES */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Verified Commercial Impact & Client Case Studies</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.useCases.map((uc, i) => (
                  <div key={i} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      CLIENT SECTOR: {uc.client}
                    </span>
                    <strong className="text-white text-sm font-bold block">{uc.title}</strong>
                    <p className="text-xs text-emerald-300 font-semibold leading-relaxed">{uc.outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. 6-STEP PROCESS & TANGIBLE DELIVERABLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>The Hyrinx 6-Step Implementation Cycle</span>
                </span>
                <div className="space-y-2 text-xs">
                  {category.process.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">
                      <span className="w-5 h-5 rounded-full bg-cyan-600/30 text-cyan-300 font-mono text-[11px] font-black flex items-center justify-center border border-cyan-500/40">
                        {idx + 1}
                      </span>
                      <span className="text-slate-100 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Guaranteed Tangible Deliverables</span>
                </span>
                <div className="space-y-2 text-xs">
                  {category.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-100 font-medium">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compliance Disclaimer Notice if present */}
            {category.disclaimer && (
              <div className="p-4 rounded-xl bg-amber-950/30 border-2 border-amber-500/40 text-xs text-amber-200 leading-relaxed flex items-start gap-3 shadow-lg">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-1 text-amber-300 uppercase tracking-wider text-[11px]">
                    Compliance &amp; Policy Disclosure:
                  </strong>
                  <span>{category.disclaimer}</span>
                </div>
              </div>
            )}

            {/* Bottom Sticky Action Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-blue-950/60 to-indigo-950/60 border-2 border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div>
                <h4 className="text-lg font-black text-white">Deploy {category.title}</h4>
                <p className="text-xs text-slate-200 mt-0.5">
                  Direct technical architecture session with Hyrinx founders. Code, infrastructure, and continuous support.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    soundFX.playUiSelect();
                    onStartProject(category.title);
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>{category.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
