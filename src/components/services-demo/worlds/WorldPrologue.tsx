"use client";

import React from "react";
import { motion } from "framer-motion";

interface WorldPrologueProps {
  progress: number; // 0 to 1
  isActive: boolean;
}

export default function WorldPrologue({ progress, isActive }: WorldPrologueProps) {
  if (!isActive) return null;

  // Camera stages across progress [0, 1]:
  // 0.0 - 0.25: Tiny point of light in total darkness
  // 0.25 - 0.50: Point expands into glowing 'H' monolith
  // 0.50 - 0.75: 'H' expands into massive metallic 'HYRINX' title with rim lighting
  // 0.75 - 1.00: Letters separate, camera travels BETWEEN letters (huge scale, blur, passing through)

  // Camera Z travel: from -800px to +1200px (passing through)
  const cameraZ = (progress - 0.2) * 2000;
  const letterSeparation = Math.max(0, (progress - 0.65) * 450); // px outward
  const letterScale = 1 + Math.max(0, progress - 0.4) * 8; // zoom up to massive size
  const letterOpacity = progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) * 7) : 1;
  const pointLightScale = Math.min(1, progress * 4);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black select-none pointer-events-none">
      {/* Deep Space Background / Distant Stars */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 60% 70%, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 80% 20%, #38bdf8, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40% 80%, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90% 90%, #818cf8, rgba(0,0,0,0))
          `,
          backgroundSize: "600px 600px",
          transform: `scale(${1 + progress * 0.5})`,
          transition: "transform 0.1s linear"
        }}
      />

      {/* Atmospheric Volumetric Core Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(220,38,38,0.3) 0%, rgba(6,182,212,0.18) 50%, transparent 80%)",
          opacity: Math.min(1, progress * 1.5),
          transform: `scale(${1 + progress * 2})`
        }}
      />

      {/* 3D Perspective Viewport */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* PHASE 1: Tiny point of light approaching */}
        {progress < 0.4 && (
          <div
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
              transform: `translateZ(${cameraZ * 0.5}px)`,
              opacity: Math.max(0, 1 - progress * 2.5)
            }}
          >
            <div
              className="w-3 h-3 rounded-full bg-white shadow-[0_0_40px_15px_rgba(255,255,255,0.9),0_0_100px_40px_rgba(6,182,212,0.7)] animate-pulse"
              style={{ transform: `scale(${pointLightScale * 2})` }}
            />
          </div>
        )}

        {/* PHASE 2 & 3: 'H' into 'HYRINX' Monolith */}
        <div
          className="relative flex items-center justify-center font-black tracking-widest text-center"
          style={{
            transform: `translateZ(${cameraZ}px) scale(${letterScale})`,
            opacity: letterOpacity,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity"
          }}
        >
          {/* Individual letters for physical separation as camera flies through */}
          <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10 text-6xl sm:text-8xl md:text-9xl lg:text-[14rem] font-sans font-black tracking-widest">
            {/* H */}
            <span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              style={{
                transform: `translateX(-${letterSeparation * 1.8}px) translateZ(${letterSeparation * 0.4}px)`,
                transition: "transform 0.05s linear"
              }}
            >
              H
            </span>

            {/* Y */}
            <span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              style={{
                transform: `translateX(-${letterSeparation * 1.1}px)`,
                opacity: progress < 0.25 ? 0 : Math.min(1, (progress - 0.25) * 4),
                transition: "transform 0.05s linear"
              }}
            >
              Y
            </span>

            {/* R */}
            <span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              style={{
                transform: `translateX(-${letterSeparation * 0.4}px)`,
                opacity: progress < 0.25 ? 0 : Math.min(1, (progress - 0.25) * 4),
                transition: "transform 0.05s linear"
              }}
            >
              R
            </span>

            {/* CAMERA FLIES RIGHT THROUGH THE CHASM BETWEEN R AND I */}

            {/* I */}
            <span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              style={{
                transform: `translateX(${letterSeparation * 0.4}px)`,
                opacity: progress < 0.25 ? 0 : Math.min(1, (progress - 0.25) * 4),
                transition: "transform 0.05s linear"
              }}
            >
              I
            </span>

            {/* N */}
            <span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              style={{
                transform: `translateX(${letterSeparation * 1.1}px)`,
                opacity: progress < 0.25 ? 0 : Math.min(1, (progress - 0.25) * 4),
                transition: "transform 0.05s linear"
              }}
            >
              N
            </span>

            {/* X */}
            <span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              style={{
                transform: `translateX(${letterSeparation * 1.8}px) translateZ(${letterSeparation * 0.4}px)`,
                opacity: progress < 0.25 ? 0 : Math.min(1, (progress - 0.25) * 4),
                transition: "transform 0.05s linear"
              }}
            >
              X
            </span>
          </div>

          {/* Subtitle emerging with dramatic rim light */}
          {progress > 0.4 && progress < 0.85 && (
            <div
              className="absolute -bottom-16 sm:-bottom-24 left-0 right-0 flex flex-col items-center justify-center space-y-2 pointer-events-none"
              style={{
                opacity: Math.min(1, (progress - 0.4) * 4) * Math.max(0, 1 - (progress - 0.75) * 5)
              }}
            >
              <div className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-cyan-400 font-bold drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                Creative Technology &bull; Systems &bull; Defense
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400 tracking-widest uppercase">
                Scroll or watch to travel through the 13 worlds
              </div>
            </div>
          )}
        </div>

        {/* PHASE 4: Letters part, revealing the gateway into BUILD */}
        {progress > 0.75 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{
              opacity: Math.min(1, (progress - 0.75) * 4),
              transform: `scale(${0.8 + (progress - 0.75) * 0.8})`
            }}
          >
            <div className="text-[11px] font-mono tracking-[0.5em] text-cyan-400 uppercase font-black mb-3">
              ENTERING UNIVERSE &bull; CHAPTER 01
            </div>
            <div className="text-7xl sm:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_80px_rgba(59,130,246,0.8)]">
              BUILD
            </div>
            <div className="text-sm font-mono text-slate-300 tracking-widest mt-2 uppercase">
              The Digital City
            </div>
          </div>
        )}
      </div>

      {/* Cinematic Horizontal Anamorphic Lens Flare */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none opacity-40 blur-[1px]"
        style={{
          transform: `scaleY(${1 + progress * 4})`,
          opacity: progress > 0.3 && progress < 0.8 ? 0.6 : 0
        }}
      />
    </div>
  );
}
