"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  FastForward,
  Sparkles,
  Zap,
  Activity,
  Film
} from "lucide-react";
import { soundFX } from "./soundFx";

interface CinematicEntranceProps {
  onComplete: () => void;
}

export default function CinematicEntrance({ onComplete }: CinematicEntranceProps) {
  // Timing Breakdown: Total ~6.6 seconds
  // 0.0s - 2.2s: "silhouette" -> Titanium metallic letters emerge from deep dark cinema void with specular light sweep
  // 2.2s - 2.8s: "slam" -> The Crimson Platinum Studio Box locks in with deep velvet sub-bass & anamorphic flare
  // 2.8s - 6.0s: "subtitle" -> Crystal clear 'SERVICES' & radiant 'CREATIVE TECHNOLOGY • SYSTEMS • DEFENSE' badge visible for 3.2+ seconds
  // 6.0s - 6.6s: "warp" -> Volumetric camera push-through into Command Center
  const [phase, setPhase] = useState<"silhouette" | "slam" | "subtitle" | "warp">("silhouette");
  const [isMuted, setIsMuted] = useState(false);
  const [cameraShake, setCameraShake] = useState(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const startSequenceAudio = () => {
    soundFX.ensureAudioReady();
    soundFX.playSmoothOpening();
  };

  useEffect(() => {
    soundFX.ensureAudioReady();
    soundFX.playSmoothOpening();

    // Sequence Timeline:
    // At 2.2s: The Signature Box Lock & Velvet Sub-Bass Drop
    const t1 = setTimeout(() => {
      setPhase("slam");
      setCameraShake(true);
      soundFX.playDirectImpact();

      setTimeout(() => setCameraShake(false), 450);
    }, 2200);

    // At 2.8s: Chrome Subtitle & Text Under Services fully expand
    const t2 = setTimeout(() => {
      setPhase("subtitle");
    }, 2800);

    // At 6.0s: Cinema Light Warp
    const t3 = setTimeout(() => {
      setPhase("warp");
    }, 6000);

    // At 6.6s: Complete Handover
    const t4 = setTimeout(() => {
      onComplete();
    }, 6600);

    timerRef.current = [t1, t2, t3, t4];

    return () => {
      timerRef.current.forEach(clearTimeout);
      soundFX.stopAll();
    };
  }, [onComplete]);

  const handleInstantEnter = () => {
    soundFX.stopAll();
    soundFX.playDirectImpact();
    timerRef.current.forEach(clearTimeout);
    setPhase("warp");
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.isMuted = !soundFX.isMuted;
    setIsMuted(soundFX.isMuted);
    if (!soundFX.isMuted) {
      soundFX.ensureAudioReady();
      soundFX.playSmoothOpening();
    } else {
      soundFX.stopAll();
    }
  };

  return (
    <div
      onClick={startSequenceAudio}
      className={`fixed inset-0 z-[99999] bg-[#020306] text-white flex flex-col items-center justify-center overflow-hidden select-none transition-transform duration-100 ${
        cameraShake ? "translate-x-1 -translate-y-1 scale-[1.012]" : ""
      }`}
    >
      {/* 1. CINEMATIC 2.39:1 LETTERBOX BARS (Top & Bottom) */}
      <div className="absolute top-0 inset-x-0 h-12 sm:h-16 bg-black border-b border-white/10 z-50 flex items-center justify-between px-4 sm:px-8 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-red-500 font-bold tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            HYRINX STUDIOS &bull; DIGITAL PREMIERE
          </span>
          <span className="hidden md:inline text-slate-600">| 4K ANAMORPHIC &bull; 60 FPS</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Smooth Sound Control */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-white hover:border-red-500 transition shadow-md"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            )}
            <span className="text-[11px] font-bold">{isMuted ? "SOUND MUTED" : "SOUND: VELVET"}</span>
          </button>

          {/* Instant Access */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInstantEnter();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(220,38,38,0.5)] transition active:scale-95"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-12 sm:h-16 bg-black border-t border-white/10 z-50 flex items-center justify-between px-4 sm:px-8 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-red-500" />
          <span className="text-slate-300 font-bold">13 INTEGRATED TECHNOLOGY DIVISIONS</span>
        </div>
        <div className="text-slate-500 hidden sm:block">
          HYRINX CREATIVE TECHNOLOGY UNIVERSE
        </div>
      </div>

      {/* 2. ATMOSPHERIC CINEMATIC BACKGROUND: VOLUMETRIC SPOTLIGHTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-red-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[
          { top: "20%", left: "15%", delay: "0s", duration: "8s" },
          { top: "65%", left: "22%", delay: "1.2s", duration: "10s" },
          { top: "30%", left: "75%", delay: "2.4s", duration: "7s" },
          { top: "80%", left: "80%", delay: "0.5s", duration: "9s" },
          { top: "45%", left: "50%", delay: "1.8s", duration: "11s" },
          { top: "15%", left: "60%", delay: "3.1s", duration: "8.5s" }
        ].map((particle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: [0, 0.8, 0], y: -40 }}
            transition={{
              duration: parseFloat(particle.duration),
              repeat: Infinity,
              delay: parseFloat(particle.delay),
              ease: "easeInOut"
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px]"
            style={{ top: particle.top, left: particle.left }}
          />
        ))}
      </div>

      {/* 3. THE SIGNATURE HYRINX LOGO SEQUENCE */}
      <motion.div
        animate={
          phase === "warp"
            ? {
                scale: 22,
                opacity: 0,
                filter: "blur(30px)"
              }
            : phase === "slam" || phase === "subtitle"
            ? {
                scale: 1,
                opacity: 1
              }
            : {
                scale: 0.95,
                opacity: 1
              }
        }
        transition={
          phase === "warp"
            ? { duration: 0.6, ease: [0.7, 0, 0.84, 0] }
            : { duration: 0.35, ease: "easeOut" }
        }
        className="relative z-30 flex flex-col items-center justify-center px-4 w-full max-w-4xl"
      >
        {/* THE CRIMSON PLATINUM BEVELED RECTANGULAR BOX */}
        <div
          className={`relative px-8 sm:px-16 py-3 sm:py-6 rounded-md transition-all duration-500 flex items-center justify-center ${
            phase === "silhouette"
              ? "bg-transparent border border-white/10"
              : "bg-gradient-to-b from-red-600 via-red-600 to-red-700 border-4 border-red-500 shadow-[0_0_100px_rgba(220,38,38,0.7),inset_0_2px_4px_rgba(255,255,255,0.7)]"
          }`}
        >
          {/* Specular Light Sweep across the logo contours */}
          {phase === "silhouette" && (
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "150%" }}
              transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-cyan-300/40 via-white/50 to-transparent skew-x-[-25deg] pointer-events-none z-30"
            />
          )}

          {/* Anamorphic Lens Flare Sweep on Slam */}
          {(phase === "slam" || phase === "subtitle") && (
            <motion.div
              initial={{ x: "-180%", opacity: 0 }}
              animate={{ x: "180%", opacity: [0, 1, 0] }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-y-0 w-44 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-25deg] pointer-events-none z-30"
            />
          )}

          {/* Beveled Edge Highlight */}
          {phase !== "silhouette" && (
            <div className="absolute inset-0 rounded-[2px] border border-white/40 pointer-events-none" />
          )}

          {/* THE HYRINX TYPOGRAPHY */}
          <div className="relative overflow-hidden">
            {phase === "silhouette" ? (
              // Phase 1: Glowing Titanium Metallic Outline Emergence
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-600 drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] select-none">
                HYRINX
              </h1>
            ) : (
              // Phase 2 & 3: Razor-Sharp Brilliant Solid White
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] select-none">
                HYRINX
              </h1>
            )}
          </div>
        </div>

        {/* 4. CHROME SUBTITLE: "SERVICES" & HIGH-VISIBILITY TEXT UNDERNEATH */}
        <div className="mt-6 sm:mt-8 w-full flex flex-col items-center justify-center min-h-[90px]">
          <AnimatePresence>
            {(phase === "subtitle" || phase === "warp") && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center space-y-3 w-full"
              >
                {/* Wordmark: SERVICES */}
                <div className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-[0.45em] sm:tracking-[0.6em] drop-shadow-[0_2px_15px_rgba(255,255,255,0.6)] whitespace-nowrap pl-[0.45em] sm:pl-[0.6em]">
                  SERVICES
                </div>

                {/* Glowing Laser Conduit Beam */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="h-0.5 w-64 sm:w-[440px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.9)]"
                />

                {/* HIGH-CONTRAST, PROMINENT BADGE UNDER SERVICES */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/90 border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.35)] backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.3em] text-cyan-200 font-black uppercase drop-shadow">
                    CREATIVE TECHNOLOGY &bull; SYSTEMS &bull; DEFENSE
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 5. ANAMORPHIC HORIZONTAL LIGHT STREAK */}
      {(phase === "slam" || phase === "subtitle") && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.9, 0.4] }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none blur-[1px] z-20"
        />
      )}

      {/* 6. CINEMATIC BOTTOM CAPTION */}
      <div className="absolute bottom-10 sm:bottom-12 inset-x-6 sm:inset-x-12 flex items-center justify-center text-center pointer-events-none z-40">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "slam" || phase === "subtitle" ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm font-semibold text-white max-w-xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/70 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md"
        >
          We don’t just build websites. We build, manage, market, automate and protect businesses.
        </motion.p>
      </div>
    </div>
  );
}
