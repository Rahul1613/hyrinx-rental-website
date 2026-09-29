"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Palette,
  Megaphone,
  Clapperboard,
  Bot,
  Cpu,
  ShoppingBag,
  QrCode,
  ShieldCheck,
  ShieldAlert,
  Terminal,
  Sparkles,
  Box,
  ArrowRight,
  Zap,
  Activity,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Shield,
  Layers,
  Radio
} from "lucide-react";
import { HYRINX_SERVICE_CATEGORIES, ServiceCategory } from "./servicesData";
import { soundFX } from "./soundFx";
import CategoryVisualRouter from "./CategoryVisuals";

interface CinematicHoloDeckProps {
  onOpenDetails: (category: ServiceCategory) => void;
  onDeploy: (serviceTitle: string) => void;
}

export default function CinematicHoloDeck({
  onOpenDetails,
  onDeploy
}: CinematicHoloDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const tourIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = HYRINX_SERVICE_CATEGORIES[activeIndex];

  // Auto-play movie tour through all 13 divisions
  useEffect(() => {
    if (isPlayingTour) {
      tourIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % HYRINX_SERVICE_CATEGORIES.length;
          soundFX.playSoftGlide();
          return next;
        });
      }, 4500);
    } else if (tourIntervalRef.current) {
      clearInterval(tourIntervalRef.current);
    }
    return () => {
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    };
  }, [isPlayingTour]);

  const selectDivision = (index: number) => {
    soundFX.playUiSelect();
    setActiveIndex(index);
    if (isPlayingTour) setIsPlayingTour(false);
  };

  const handlePrev = () => {
    soundFX.playSoftGlide();
    setActiveIndex((prev) => (prev === 0 ? HYRINX_SERVICE_CATEGORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundFX.playSoftGlide();
    setActiveIndex((prev) => (prev + 1) % HYRINX_SERVICE_CATEGORIES.length);
  };

  const toggleTour = () => {
    soundFX.playUiSelect();
    setIsPlayingTour((prev) => !prev);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 select-none">
      {/* 1. CINEMA CONSOLE CONTROL BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/80 border-2 border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
        {/* HUD Corner Accents */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shadow-inner">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>HOLO-DECK // DIVISION {activeCategory.number} OF 13</span>
          </div>

          <span className="hidden md:inline text-xs font-mono text-slate-400">
            SEC.CLEARANCE: LEVEL 5 &bull; LIVE BRIDGE SIMULATION
          </span>
        </div>

        {/* Cinematic Tour Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTour}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md ${
              isPlayingTour
                ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 animate-pulse"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-black font-bold shadow-cyan-500/30"
            }`}
          >
            {isPlayingTour ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Movie Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Cinema Tour</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Previous Division"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-cyan-400 font-bold px-2">
              {activeCategory.number} / 13
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Next Division"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. ROTATING FILMSTRIP / ORBIT SELECTOR OF ALL 13 DIVISIONS */}
      <div className="relative overflow-x-auto no-scrollbar py-2 px-1">
        <div className="flex items-center gap-2.5 min-w-max">
          {HYRINX_SERVICE_CATEGORIES.map((cat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => soundFX.playUiHover()}
                onClick={() => selectDivision(idx)}
                className={`relative px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 via-blue-600/30 to-indigo-600/20 border-cyan-400 text-white font-black shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105"
                    : "bg-slate-950/80 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? "bg-cyan-400 animate-ping" : "bg-slate-700"}`} />
                <span className="font-bold">{cat.number}</span>
                <span className="truncate max-w-[120px]">{cat.tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. THE MAIN CINEMATIC BRIDGE ENVIRONMENT (STAGE DISPLAY) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-b from-[#030612] via-[#020409] to-black border-2 border-cyan-500/40 p-6 sm:p-10 shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden"
        >
          {/* Ambient Lighting Cones */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

          {/* Division Header Dossier */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-cyan-500/20">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-cyan-500 text-black font-mono text-xs font-black uppercase tracking-wider shadow-md shadow-cyan-500/30">
                  DIVISION // #{activeCategory.number}
                </span>
                <span className="px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold uppercase">
                  {activeCategory.tag}
                </span>
                {activeCategory.badge && (
                  <span className="px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeCategory.badge}</span>
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {activeCategory.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed font-normal">
                {activeCategory.shortDesc}
              </p>
            </div>

            {/* Quick Tactical Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <button
                onClick={() => {
                  soundFX.playUiSelect();
                  onOpenDetails(activeCategory);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border-2 border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Full Blueprint Dossier</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => {
                  soundFX.playUiSelect();
                  onDeploy(activeCategory.title);
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Deploy Division</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Interactive Systems Simulator */}
          <div className="relative z-10 pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Live Interactive Simulation &bull; {activeCategory.subtitle}</span>
              </span>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl">
              <CategoryVisualRouter category={activeCategory} />
            </div>
          </div>

          {/* Division Highlights Metrics Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-900 mt-8">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase block">Core Mandate</span>
              <strong className="text-white text-xs font-bold block">{activeCategory.subtitle}</strong>
              <p className="text-xs text-slate-300 leading-snug">{activeCategory.heroHeadline}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block">Strategic Advantage</span>
              <strong className="text-white text-xs font-bold block">{activeCategory.solution.title}</strong>
              <p className="text-xs text-slate-300 leading-snug">{activeCategory.solution.points[0]}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase block">Execution Pace</span>
              <strong className="text-white text-xs font-bold block">{activeCategory.workflowTitle}</strong>
              <p className="text-xs text-slate-300 leading-snug">{activeCategory.workflowSteps[0]?.label} &rarr; {activeCategory.workflowSteps[1]?.label}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
