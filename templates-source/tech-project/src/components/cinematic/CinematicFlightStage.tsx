'use client';

import React, { useState, useEffect, useRef } from 'react';
import AircraftModel from './AircraftModel';

interface CinematicFlightStageProps {
  onStageChange?: (stageIndex: number) => void;
  activeHotspot?: string | null;
  onSelectHotspot?: (componentId: string | null) => void;
}

export default function CinematicFlightStage({
  onStageChange,
  activeHotspot,
  onSelectHotspot,
}: CinematicFlightStageProps) {
  // Smooth scroll state
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  // Flight parameters
  const [flightState, setFlightState] = useState({
    x: 0, // vw %
    y: 28, // vh %
    scale: 0.55,
    rotateZ: 0, // deg
    rotateX: 18, // deg (pitch)
    rotateY: 0, // deg (yaw)
    elevonAngle: 0,
    afterburner: 0.1,
    opacity: 0.95,
    speedBlur: 0, // px
    showInternals: false,
    showWireframe: false,
    hudTag: 'RUNWAY 09 // PRE-FLIGHT',
  });

  // Hotspot interaction for exploded section
  const isExplodedSection = scrollProgress >= 0.45 && scrollProgress <= 0.62;

  // Track window scroll progress with lerp for silky 60fps physics
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      targetProgress.current = Math.min(Math.max(progress, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Lerp loop
    const animate = () => {
      // Linear interpolation factor (0.1 = smooth dampening)
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.12;
      const p = currentProgress.current;
      setScrollProgress(p);

      // Compute flight physics keyframes
      let x = 0;
      let y = 0;
      let scale = 1;
      let rotateZ = 0;
      let rotateX = 0;
      let rotateY = 0;
      let elevonAngle = 0;
      let afterburner = 0.1;
      let opacity = 1;
      let speedBlur = 0;
      let showInternals = false;
      let showWireframe = false;
      let hudTag = 'FLIGHT STATUS: NOMINAL';

      if (p < 0.10) {
        // SECTION 0: TAKEOFF ROLL & CLIMB
        const t = p / 0.10; // 0 to 1
        x = -15 * (1 - t) + 10 * t;
        y = 32 * (1 - t) - 8 * t;
        scale = 0.45 + t * 0.65;
        rotateZ = -6 * t;
        rotateX = 22 * (1 - t) + 8 * t;
        rotateY = 5 * t;
        elevonAngle = 18 * t;
        afterburner = 0.2 + t * 0.8;
        speedBlur = t > 0.6 ? (t - 0.6) * 8 : 0;
        hudTag = t < 0.5 ? 'STAGE: TAKEOFF RUNWAY ROLL' : 'STAGE: AIRBORNE CLIMB';
      } else if (p < 0.22) {
        // SECTION 1: THE IDEA / CONCEPT
        const t = (p - 0.10) / 0.12;
        x = 10 * (1 - t) - 22 * t;
        y = -8 * (1 - t) + 4 * t;
        scale = 1.1 - t * 0.1;
        rotateZ = -6 * (1 - t) + 16 * t; // banking left into turn
        rotateX = 8 * (1 - t) - 4 * t;
        rotateY = -12 * t;
        elevonAngle = -14 * (1 - t) + 12 * t;
        afterburner = 0.6 * (1 - t) + 0.3 * t;
        hudTag = 'STAGE 01: THE CONCEPT // HIGH-ALPHA STEALTH';
      } else if (p < 0.35) {
        // SECTION 2: THE DESIGN ("DESIGNED TO FLY")
        const t = (p - 0.22) / 0.13;
        x = -22 * (1 - t) + 24 * t;
        y = 4 * (1 - t) - 2 * t;
        scale = 1.0 + t * 0.25;
        rotateZ = 16 * (1 - t) - 10 * t;
        rotateX = -4 * (1 - t) + 6 * t;
        rotateY = 10 * t;
        elevonAngle = -8 * t;
        showWireframe = true;
        afterburner = 0.25;
        hudTag = 'STAGE 02: CAD VECTOR BLUEPRINT // 5mm DEPRON';
      } else if (p < 0.48) {
        // SECTION 3: THE BUILD ("BUILT FROM THE GROUND UP")
        const t = (p - 0.35) / 0.13;
        x = 24 * (1 - t) - 20 * t;
        y = -2 * (1 - t) + 6 * t;
        scale = 1.25 - t * 0.15;
        rotateZ = -10 * (1 - t) + 6 * t;
        rotateX = 4 * t;
        rotateY = -8 * t;
        showInternals = true;
        afterburner = 0.2;
        hudTag = 'STAGE 03: STRUCTURAL ASSEMBLY // CARBON SPAR';
      } else if (p < 0.60) {
        // SECTION 4: THE SYSTEM / EXPLODED INTERACTIVE
        const t = (p - 0.48) / 0.12;
        x = -20 * (1 - t);
        y = 6 * (1 - t);
        scale = 1.1 + t * 0.15;
        rotateZ = 6 * (1 - t);
        rotateX = 0;
        rotateY = 0;
        showInternals = true;
        afterburner = 0.15;
        hudTag = 'STAGE 04: AVIONICS & POWERTRAIN STACK';
      } else if (p < 0.70) {
        // SECTION 5: CONTROL & SIGNAL PULSE
        const t = (p - 0.60) / 0.10;
        x = 18 * t;
        y = -8 * t;
        scale = 1.25 - t * 0.1;
        rotateZ = -12 * t;
        rotateX = -4 * t;
        elevonAngle = Math.sin(t * Math.PI * 4) * 22; // Animated elevon flutters
        afterburner = 0.4 * t;
        hudTag = 'STAGE 05: 2.4GHz RF SIGNAL DEMULTIPLEXING';
      } else if (p < 0.82) {
        // SECTION 6: THE FLIGHT ("THEN WE FLEW IT.")
        const t = (p - 0.70) / 0.12;
        // High speed dynamic surge diagonally across viewport
        x = -36 * (1 - t) + 38 * t;
        y = 22 * (1 - t) - 26 * t;
        scale = 0.85 + Math.sin(t * Math.PI) * 0.6;
        rotateZ = -28 + t * 14;
        rotateX = 14 * (1 - t) - 10 * t;
        rotateY = -18 * (1 - t) + 12 * t;
        elevonAngle = 15;
        afterburner = 0.95;
        speedBlur = Math.sin(t * Math.PI) * 8; // High speed motion blur!
        hudTag = 'STAGE 06: FULL-THROTTLE FLIGHT SORTIE // 100% PWM';
      } else if (p < 0.92) {
        // SECTION 7 & 8: PERFORMANCE LAB & MODULAR SENSORS
        const t = (p - 0.82) / 0.10;
        x = 38 * (1 - t) + 20 * t;
        y = -26 * (1 - t) + 4 * t;
        scale = 1.1 - t * 0.1;
        rotateZ = -14 * (1 - t) + 4 * t;
        rotateX = 4 * t;
        rotateY = 0;
        afterburner = 0.2;
        hudTag = 'STAGE 07: FLIGHT ENVELOPE TELEMETRY';
      } else {
        // SECTION 9: HORIZON CLIMB & THE FUTURE
        const t = (p - 0.92) / 0.08;
        x = 20 * (1 - t) + 12 * t;
        y = 4 * (1 - t) - 48 * t;
        scale = 1.0 * (1 - t) + 0.18 * t; // Shrinks into the far distance
        rotateZ = 4 * (1 - t) + 22 * t;
        rotateX = -32 * t; // Pitch away from viewer
        rotateY = 16 * t;
        opacity = 1 - t * 0.7;
        afterburner = 0.9;
        hudTag = 'STAGE 08: HORIZON CLIMB // MISSION COMPLETE';
      }

      setFlightState({
        x,
        y,
        scale,
        rotateZ,
        rotateX,
        rotateY,
        elevonAngle,
        afterburner,
        opacity,
        speedBlur,
        showInternals,
        showWireframe,
        hudTag,
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden flex items-center justify-center">
      {/* Dynamic Flight Camera HUD Layer */}
      <div className="absolute top-14 left-6 text-[10px] font-mono text-cyan-400/80 hidden md:block">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold">{flightState.hudTag}</span>
        </div>
        <div className="text-slate-500 mt-0.5">
          POS: [X: {flightState.x.toFixed(1)}vw | Y: {flightState.y.toFixed(1)}vh] • SCALE: {flightState.scale.toFixed(2)}x
        </div>
      </div>

      <div className="absolute top-14 right-6 text-[10px] font-mono text-cyan-400/80 text-right hidden md:block">
        <div>PITCH: {flightState.rotateX.toFixed(1)}° • ROLL: {flightState.rotateZ.toFixed(1)}°</div>
        <div className="text-slate-500 mt-0.5">
          THRUST PLUME: {(flightState.afterburner * 100).toFixed(0)}% • SCROLL: {(scrollProgress * 100).toFixed(0)}%
        </div>
      </div>

      {/* The Flying Aircraft Vessel */}
      <div
        className="w-[90vw] max-w-[900px] h-[70vh] max-h-[650px] relative will-change-transform flex items-center justify-center transition-opacity duration-300"
        style={{
          transform: `
            perspective(1200px)
            translate3d(${flightState.x}vw, ${flightState.y}vh, 0px)
            scale(${flightState.scale})
            rotateZ(${flightState.rotateZ}deg)
            rotateX(${flightState.rotateX}deg)
            rotateY(${flightState.rotateY}deg)
          `,
          opacity: flightState.opacity,
          filter: flightState.speedBlur > 0.5 ? `blur(${flightState.speedBlur}px)` : 'none',
        }}
      >
        <AircraftModel
          elevonAngle={flightState.elevonAngle}
          afterburner={flightState.afterburner}
          highlightComponent={activeHotspot}
          showInternals={flightState.showInternals}
          showWireframe={flightState.showWireframe}
        />

        {/* Interactive Clickable Hotspots when frozen in Section 4 (The System) */}
        {isExplodedSection && (
          <div className="absolute inset-0 pointer-events-auto">
            {/* Motor Hotspot */}
            <button
              onClick={() => onSelectHotspot && onSelectHotspot('motor')}
              className={`absolute top-[68%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md transition-all ${
                activeHotspot === 'motor'
                  ? 'bg-cyan-400 text-black font-bold scale-110 shadow-lg shadow-cyan-400/50'
                  : 'bg-black/80 text-cyan-300 border-cyan-500/50 hover:border-cyan-300'
              }`}
            >
              ◉ Motor
            </button>

            {/* ESC Hotspot */}
            <button
              onClick={() => onSelectHotspot && onSelectHotspot('esc')}
              className={`absolute top-[59%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md transition-all ${
                activeHotspot === 'esc'
                  ? 'bg-emerald-400 text-black font-bold scale-110 shadow-lg shadow-emerald-400/50'
                  : 'bg-black/80 text-emerald-300 border-emerald-500/50 hover:border-emerald-300'
              }`}
            >
              ◉ ESC 30A
            </button>

            {/* LiPo Battery Hotspot */}
            <button
              onClick={() => onSelectHotspot && onSelectHotspot('battery')}
              className={`absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md transition-all ${
                activeHotspot === 'battery'
                  ? 'bg-amber-400 text-black font-bold scale-110 shadow-lg shadow-amber-400/50'
                  : 'bg-black/80 text-amber-300 border-amber-500/50 hover:border-amber-300'
              }`}
            >
              ◉ 3S LiPo
            </button>

            {/* Port Servo Hotspot */}
            <button
              onClick={() => onSelectHotspot && onSelectHotspot('servo-1')}
              className={`absolute top-[60%] left-[38%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md transition-all ${
                activeHotspot === 'servo-1'
                  ? 'bg-purple-400 text-black font-bold scale-110 shadow-lg shadow-purple-400/50'
                  : 'bg-black/80 text-purple-300 border-purple-500/50 hover:border-purple-300'
              }`}
            >
              ◉ Servo 1
            </button>

            {/* Starboard Servo Hotspot */}
            <button
              onClick={() => onSelectHotspot && onSelectHotspot('servo-2')}
              className={`absolute top-[60%] left-[62%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md transition-all ${
                activeHotspot === 'servo-2'
                  ? 'bg-purple-400 text-black font-bold scale-110 shadow-lg shadow-purple-400/50'
                  : 'bg-black/80 text-purple-300 border-purple-500/50 hover:border-purple-300'
              }`}
            >
              ◉ Servo 2
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
