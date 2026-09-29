"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  PhoneCall,
  X,
  ChevronRight,
  Compass,
  Film
} from "lucide-react";
import { soundFX } from "./soundFx";

import World01Build from "./worlds/World01Build";
import World02Identity from "./worlds/World02Identity";
import World03Attention from "./worlds/World03Attention";
import World04Create from "./worlds/World04Create";
import World05Intelligence from "./worlds/World05Intelligence";
import World06Systems from "./worlds/World06Systems";
import World07Commerce from "./worlds/World07Commerce";
import World08Transformation from "./worlds/World08Transformation";
import World09Control from "./worlds/World09Control";
import World10Defense from "./worlds/World10Defense";
import World11Knowledge from "./worlds/World11Knowledge";
import World12Future from "./worlds/World12Future";
import World13Originals from "./worlds/World13Originals";
import WorldFinale from "./worlds/WorldFinale";

interface CinematicWorldEngineProps {
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
  onStartProject: () => void;
  onReplayIntro: () => void;
}

// 14 continuous stages across global progress [0, 1]
const STAGES = [
  { id: "web-dev", name: "01 / 13", tag: "BUILD & ARCHITECTURE", start: 0.0, end: 0.075 },
  { id: "branding", name: "02 / 13", tag: "THE IDENTITY", start: 0.075, end: 0.15 },
  { id: "marketing", name: "03 / 13", tag: "ATTENTION METROPOLIS", start: 0.15, end: 0.225 },
  { id: "content-creation", name: "04 / 13", tag: "THE PRODUCTION STUDIO", start: 0.225, end: 0.30 },
  { id: "ai-automation", name: "05 / 13", tag: "NEURAL CONVERSATION", start: 0.30, end: 0.375 },
  { id: "software-apps", name: "06 / 13", tag: "THE SOFTWARE MACHINE", start: 0.375, end: 0.45 },
  { id: "ecommerce", name: "07 / 13", tag: "THE PRODUCT JOURNEY", start: 0.45, end: 0.525 },
  { id: "digitalization", name: "08 / 13", tag: "THE TRANSFORMATION", start: 0.525, end: 0.60 },
  { id: "management", name: "09 / 13", tag: "THE CONTROL BRIDGE", start: 0.60, end: 0.675 },
  { id: "cybersecurity", name: "10 / 13", tag: "THE DIGITAL FORTRESS", start: 0.675, end: 0.75 },
  { id: "cyber-education", name: "11 / 13", tag: "THE CYBER LAB", start: 0.75, end: 0.825 },
  { id: "creative-tech", name: "12 / 13", tag: "THE FUTURE LAB", start: 0.825, end: 0.90 },
  { id: "hyrinx-originals", name: "13 / 13", tag: "THE ARTIFACTS", start: 0.90, end: 0.96 },
  { id: "finale", name: "FINALE", tag: "BUILD WHAT COMES NEXT", start: 0.96, end: 1.0 }
];

export default function CinematicWorldEngine({
  onOpenDetails,
  onDeploy,
  onStartProject,
  onReplayIntro
}: CinematicWorldEngineProps) {
  // Smooth Camera Physics State
  const [renderProgress, setRenderProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const rafPhysicsRef = useRef<number | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingFilm, setIsPlayingFilm] = useState(false);
  const [isHudVisible, setIsHudVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hudTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayRafRef = useRef<number | null>(null);

  // Helper to show HUD temporarily and auto-fade during motion
  const triggerMotionHudFade = useCallback(() => {
    setIsHudVisible(false);
    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    hudTimeoutRef.current = setTimeout(() => {
      setIsHudVisible(true);
    }, 700);
  }, []);

  // Update target progress from native window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
      targetProgressRef.current = progress;
      triggerMotionHudFade();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerMotionHudFade]);

  // CONTINUOUS 60FPS CAMERA PHYSICS INTERPOLATION (LERP / Damping)
  useEffect(() => {
    const updatePhysics = () => {
      const diff = targetProgressRef.current - smoothProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        // Buttery cinematic damping (0.075 factor provides weighted Hollywood crane feel)
        smoothProgressRef.current += diff * 0.075;
        setRenderProgress(smoothProgressRef.current);
      }
      rafPhysicsRef.current = requestAnimationFrame(updatePhysics);
    };

    rafPhysicsRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (rafPhysicsRef.current) cancelAnimationFrame(rafPhysicsRef.current);
    };
  }, []);

  // Jump to specific stage
  const jumpToStage = (startProgress: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: startProgress * scrollHeight,
      behavior: "smooth"
    });
    setIsMenuOpen(false);
    soundFX.playUiSelect();
  };

  // Auto-Flight / Play Film mode
  useEffect(() => {
    if (!isPlayingFilm) {
      if (autoPlayRafRef.current) cancelAnimationFrame(autoPlayRafRef.current);
      return;
    }

    const step = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= scrollHeight - 10) {
        setIsPlayingFilm(false);
        return;
      }
      window.scrollBy({ top: 3.5, behavior: "auto" });
      autoPlayRafRef.current = requestAnimationFrame(step);
    };

    autoPlayRafRef.current = requestAnimationFrame(step);

    return () => {
      if (autoPlayRafRef.current) cancelAnimationFrame(autoPlayRafRef.current);
    };
  }, [isPlayingFilm]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlayingFilm((prev) => !prev);
      } else if (e.code === "ArrowDown") {
        window.scrollBy({ top: 120, behavior: "smooth" });
      } else if (e.code === "ArrowUp") {
        window.scrollBy({ top: -120, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Audio Toggle
  const toggleSound = () => {
    soundFX.isMuted = !soundFX.isMuted;
    setIsMuted(soundFX.isMuted);
    if (!soundFX.isMuted) {
      soundFX.ensureAudioReady();
      soundFX.playUiSelect();
    } else {
      soundFX.stopAll();
    }
  };

  // Replay
  const handleReplay = () => {
    jumpToStage(0);
  };

  // Current stage info for HUD
  const currentStage = STAGES.find(
    (s) => renderProgress >= s.start && renderProgress <= s.end
  ) || STAGES[0];

  return (
    <div className="relative w-full bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* 1. SCROLL TRACK (Virtual camera travel distance across document) */}
      <div style={{ height: "1400vh" }} className="w-full pointer-events-none" />

      {/* 2. PINNED CAMERA VIEWPORT CANVAS (100vw / 100vh with Continuous Depth Blending) */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-10 bg-black">
        {/* Stage 1: Build */}
        <World01Build
          globalProgress={renderProgress}
          start={STAGES[0].start}
          end={STAGES[0].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 2: Identity */}
        <World02Identity
          globalProgress={renderProgress}
          start={STAGES[1].start}
          end={STAGES[1].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 3: Attention */}
        <World03Attention
          globalProgress={renderProgress}
          start={STAGES[2].start}
          end={STAGES[2].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 4: Create */}
        <World04Create
          globalProgress={renderProgress}
          start={STAGES[3].start}
          end={STAGES[3].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 5: Intelligence */}
        <World05Intelligence
          globalProgress={renderProgress}
          start={STAGES[4].start}
          end={STAGES[4].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 6: Systems */}
        <World06Systems
          globalProgress={renderProgress}
          start={STAGES[5].start}
          end={STAGES[5].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 7: Commerce */}
        <World07Commerce
          globalProgress={renderProgress}
          start={STAGES[6].start}
          end={STAGES[6].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 8: Transformation */}
        <World08Transformation
          globalProgress={renderProgress}
          start={STAGES[7].start}
          end={STAGES[7].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 9: Control */}
        <World09Control
          globalProgress={renderProgress}
          start={STAGES[8].start}
          end={STAGES[8].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 10: Defense */}
        <World10Defense
          globalProgress={renderProgress}
          start={STAGES[9].start}
          end={STAGES[9].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 11: Knowledge */}
        <World11Knowledge
          globalProgress={renderProgress}
          start={STAGES[10].start}
          end={STAGES[10].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 12: Future */}
        <World12Future
          globalProgress={renderProgress}
          start={STAGES[11].start}
          end={STAGES[11].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 13: Originals */}
        <World13Originals
          globalProgress={renderProgress}
          start={STAGES[12].start}
          end={STAGES[12].end}
          onOpenDetails={onOpenDetails}
          onDeploy={onDeploy}
        />

        {/* Stage 14: Finale */}
        <WorldFinale
          globalProgress={renderProgress}
          start={STAGES[13].start}
          end={STAGES[13].end}
          onStartProject={onStartProject}
          onReplay={handleReplay}
        />
      </div>

      {/* 3. MINIMAL CINEMATIC TOP HUD */}
      <div
        className={`fixed inset-x-0 top-0 z-30 p-4 sm:p-6 flex items-center justify-between pointer-events-auto transition-opacity duration-700 ${
          isHudVisible ? "opacity-100" : "opacity-0 hover:opacity-100"
        }`}
      >
        {/* Brand Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 via-rose-600 to-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-md">
            H
          </div>
          <div>
            <span className="font-black tracking-widest text-xs sm:text-sm text-white">HYRINX</span>
            <span className="hidden sm:inline text-[9px] font-mono text-cyan-400 ml-2 uppercase font-bold tracking-widest">
              THE DIGITAL WORLDS
            </span>
          </div>
        </div>

        {/* Minimal Control Suite */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay Opening Intro Button */}
          <button
            onClick={onReplayIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-slate-300 hover:text-white transition text-[11px] font-mono backdrop-blur-md"
            title="Replay Opening Movie Intro"
          >
            <Film className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline font-bold">REPLAY OPENING</span>
          </button>

          {/* Sound Toggle (Default Muted) */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-slate-300 hover:text-white transition text-[11px] font-mono backdrop-blur-md"
            title="Toggle Ambient Audio"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            )}
            <span className="font-bold">{isMuted ? "SOUND: OFF" : "SOUND: ON"}</span>
          </button>

          {/* Auto-Flight Play/Pause */}
          <button
            onClick={() => setIsPlayingFilm((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition text-[11px] font-mono backdrop-blur-md ${
              isPlayingFilm
                ? "bg-cyan-950/80 border-cyan-400 text-cyan-300"
                : "bg-slate-900/80 hover:bg-slate-800 border-white/20 text-slate-300"
            }`}
            title="Auto Flight Through Universe"
          >
            {isPlayingFilm ? (
              <>
                <Pause className="w-3 h-3 text-cyan-400" />
                <span className="font-bold">PAUSE FILM</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-cyan-400 fill-current" />
                <span className="font-bold">PLAY FILM</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20am%20reviewing%20the%20Services%20Digital%20Worlds"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-[11px] font-bold shadow-sm"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>+91-9730213645</span>
          </a>

          {/* Chapter Quick-Jump Trigger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-slate-300 hover:text-white transition backdrop-blur-md"
            title="World Jump Menu"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* 4. MINIMAL CINEMATIC BOTTOM HUD */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 p-4 sm:p-6 flex items-center justify-between pointer-events-auto transition-opacity duration-700 ${
          isHudVisible ? "opacity-100" : "opacity-0 hover:opacity-100"
        }`}
      >
        {/* Clickable Chapter Indicator */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-cyan-500/40 backdrop-blur-md text-left group"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-black text-white group-hover:text-cyan-400 transition-colors">
            {currentStage.name}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
            // {currentStage.tag}
          </span>
        </button>

        {/* Global Travel Scrubber Bar */}
        <div className="flex items-center gap-3">
          <div className="w-24 sm:w-48 h-1.5 rounded-full bg-slate-800 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-75"
              style={{ width: `${renderProgress * 100}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            {Math.round(renderProgress * 100)}%
          </span>
        </div>
      </div>

      {/* 5. QUICK-JUMP UNIVERSE DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-end p-4 sm:p-8 pointer-events-auto"
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-slate-950 border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                    CINEMATIC UNIVERSE
                  </div>
                  <h3 className="text-lg font-black text-white mt-0.5">Jump to World</h3>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-1.5 py-4 pr-1">
                {STAGES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => jumpToStage(st.start)}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-white/10 transition flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                        {st.name}
                      </span>
                      <div className="text-[11px] font-semibold text-slate-200 mt-0.5">
                        {st.tag}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
