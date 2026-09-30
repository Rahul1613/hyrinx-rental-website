'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProject } from '@/lib/projectStore';
import {
  Plane,
  Cpu,
  Layers,
  Activity,
  PlaySquare,
  Sliders,
  ShieldCheck,
  ChevronRight,
  Crosshair,
  Compass,
  Zap,
  Gauge,
  Maximize2,
  Sparkles,
} from 'lucide-react';

export default function ProjectHero() {
  const { currentProject } = useProject();
  const [hudMode, setHudMode] = useState<'blueprint' | 'airflow' | 'cg' | 'thrust'>('blueprint');
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section id="overview" className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Dynamic Background Aerospace Grids */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radar concentric rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-500/10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-cyan-500/5 border-dashed" />
        
        {/* Corner Reticles */}
        <div className="absolute top-12 left-10 text-[10px] font-mono text-cyan-500/40 hidden md:block">
          <div>LAT: 18.5204° N</div>
          <div>LON: 73.8567° E</div>
          <div>ALT: GROUND LEVEL [0m]</div>
        </div>
        <div className="absolute top-12 right-10 text-[10px] font-mono text-cyan-500/40 text-right hidden md:block">
          <div>SYS_REF: RC_F22_SCALE</div>
          <div>DEPRON_CORE: 5.0mm</div>
          <div>COMM_FREQ: 2.4GHz FHSS</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wide shadow-lg shadow-cyan-950/60">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>DISCIPLINE: {currentProject.branch.toUpperCase()}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>CORE AIRFRAME: {currentProject.material.toUpperCase()}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-slate-300 text-xs font-mono">
            <span>SCALE: 1:12 AERO EXPERIMENTAL</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans mb-4 leading-tight">
            {currentProject.title}
          </h1>
          <div className="inline-block relative">
            <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-cyan-500 tracking-wider">
              {currentProject.modelName}
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-1" />
          </div>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            {currentProject.subtitle}. Developed through precision fabrication of 5 mm Depron foam sheets, high-output brushless electric propulsion, and dual-axis elevon control linkage.
          </p>
        </div>

        {/* Cinematic Aircraft Interactive HUD Display */}
        <div className="relative max-w-5xl mx-auto bg-[#070d18]/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/80 mb-12">
          {/* Top HUD Frame Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-cyan-900/40 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-white font-bold tracking-wider">AIRCRAFT SCHEMATIC // F-22 RAPTOR</span>
              <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-[10px] border border-cyan-600/40">
                5mm DEPRON AIRFRAME
              </span>
            </div>

            {/* Visual Mode Toggles */}
            <div className="flex items-center gap-1.5 bg-[#03060b] p-1 rounded-lg border border-cyan-900/50">
              <button
                onClick={() => setHudMode('blueprint')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  hudMode === 'blueprint'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                Blueprint
              </button>
              <button
                onClick={() => setHudMode('airflow')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  hudMode === 'airflow'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                Aerodynamics
              </button>
              <button
                onClick={() => setHudMode('cg')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  hudMode === 'cg'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                CG & Balance
              </button>
              <button
                onClick={() => setHudMode('thrust')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  hudMode === 'thrust'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                Thrust Vector
              </button>
            </div>
          </div>

          {/* Central Interactive Aircraft Canvas / Vector Blueprint */}
          <div className="relative h-[340px] sm:h-[420px] w-full flex items-center justify-center bg-[#040810] rounded-xl border border-cyan-950 overflow-hidden group">
            {/* Coordinate Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* SVG Aircraft Vector: F-22 Stealth Silhouette */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full max-h-[380px] drop-shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-transform duration-500 hover:scale-[1.02]"
            >
              <defs>
                <linearGradient id="aeroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0055ff" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="thrustFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff0055" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffaa00" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Airflow streamlines (active when airflow mode) */}
              {hudMode === 'airflow' && (
                <g className="stroke-cyan-400/40 stroke-dasharray-[4,6] animate-pulse">
                  <path d="M 200,50 Q 300,180 320,300 T 310,500" fill="none" strokeWidth="1.5" />
                  <path d="M 600,50 Q 500,180 480,300 T 490,500" fill="none" strokeWidth="1.5" />
                  <path d="M 280,50 Q 340,160 360,280 T 360,520" fill="none" strokeWidth="2" stroke="#00f0ff" />
                  <path d="M 520,50 Q 460,160 440,280 T 440,520" fill="none" strokeWidth="2" stroke="#00f0ff" />
                  <path d="M 120,200 Q 220,260 260,350 T 250,550" fill="none" strokeWidth="1" />
                  <path d="M 680,200 Q 580,260 540,350 T 550,550" fill="none" strokeWidth="1" />
                </g>
              )}

              {/* Center of Gravity Lines (active when cg mode) */}
              {hudMode === 'cg' && (
                <g>
                  {/* Mean Aerodynamic Chord line */}
                  <line x1="160" y1="310" x2="640" y2="310" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,4" />
                  {/* Longitudinal axis */}
                  <line x1="400" y1="80" x2="400" y2="540" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,4" />
                  {/* CG Point marker */}
                  <circle cx="400" cy="310" r="16" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="400" cy="310" r="6" fill="#f59e0b" />
                  <text x="420" y="315" fill="#f59e0b" fontSize="13" fontFamily="monospace" fontWeight="bold">
                    CG: 32% MAC (STABLE)
                  </text>
                  <text x="420" y="335" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    Balanced via LiPo pack placement
                  </text>
                </g>
              )}

              {/* Thrust Vector Flame (active when thrust mode) */}
              {hudMode === 'thrust' && (
                <g>
                  <polygon points="370,490 430,490 415,580 385,580" fill="url(#thrustFlame)" />
                  <line x1="400" y1="480" x2="400" y2="590" stroke="#ff0055" strokeWidth="2" strokeDasharray="4,2" />
                  <text x="400" y="595" fill="#ff0055" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    THRUST VECTOR: IN-LINE AXIAL
                  </text>
                </g>
              )}

              {/* Main F-22 Airframe Silhouette (Top-down Planform) */}
              {/* Nose cone and forward chines */}
              <polygon
                points="
                  400,90
                  420,130 435,180 470,225
                  670,360 660,390 560,380
                  545,430 575,490 525,485
                  485,465 470,490 400,470
                  330,490 315,465 275,485
                  225,490 255,430 240,380
                  140,390 130,360 330,225
                  365,180 380,130
                "
                fill="#071220"
                stroke="#00f0ff"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              {/* Wing Spar structural line (Reinforced Carbon / Foam spar) */}
              <line x1="250" y1="360" x2="550" y2="360" stroke="#00f0ff" strokeWidth="2" strokeDasharray="3,3" />

              {/* Canopy / Cockpit area */}
              <polygon
                points="400,160 415,200 415,245 400,265 385,245 385,200"
                fill="#0e2a44"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />

              {/* Twin Cant-out Vertical Stabilizers */}
              <polygon
                points="465,420 500,420 520,480 475,475"
                fill="#0c1f36"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />
              <polygon
                points="335,420 300,420 280,480 325,475"
                fill="#0c1f36"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />

              {/* Twin Air Intakes */}
              <rect x="360" y="270" width="22" height="60" fill="#091829" stroke="#00f0ff" strokeWidth="1.2" rx="2" />
              <rect x="418" y="270" width="22" height="60" fill="#091829" stroke="#00f0ff" strokeWidth="1.2" rx="2" />

              {/* Propeller / Motor Mount at Trailing Edge / Mid-Fuselage Slot */}
              <ellipse cx="400" cy="460" rx="36" ry="10" fill="#00f0ff" fillOpacity="0.15" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="4,2" />
              <circle cx="400" cy="460" r="7" fill="#00f0ff" />

              {/* Component Markers on the Airframe */}
              {/* LiPo Battery (Forward for CG) */}
              <rect x="388" y="275" width="24" height="42" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" rx="3" />
              <circle cx="400" cy="296" r="3" fill="#f59e0b" />
              <text x="400" y="290" fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                LiPo 3S
              </text>

              {/* Receiver (Near Center) */}
              <rect x="388" y="335" width="24" height="24" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" rx="2" />
              <text x="400" y="350" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                RX 6CH
              </text>

              {/* ESC (Speed Controller) */}
              <rect x="388" y="380" width="24" height="34" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" rx="2" />
              <text x="400" y="400" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                ESC 30A
              </text>

              {/* Elevon Servos (Port & Starboard) */}
              <rect x="305" y="385" width="16" height="20" fill="#e879f9" fillOpacity="0.3" stroke="#e879f9" strokeWidth="1.5" rx="2" />
              <text x="313" y="398" fill="#e879f9" fontSize="7" fontFamily="monospace" textAnchor="middle">
                SERVO 1
              </text>
              <line x1="305" y1="400" x2="260" y2="445" stroke="#e879f9" strokeWidth="1.5" />

              <rect x="479" y="385" width="16" height="20" fill="#e879f9" fillOpacity="0.3" stroke="#e879f9" strokeWidth="1.5" rx="2" />
              <text x="487" y="398" fill="#e879f9" fontSize="7" fontFamily="monospace" textAnchor="middle">
                SERVO 2
              </text>
              <line x1="495" y1="400" x2="540" y2="445" stroke="#e879f9" strokeWidth="1.5" />

              {/* Depron Sheet Thickness Tag */}
              <g transform="translate(145, 230)">
                <rect x="0" y="0" width="125" height="42" fill="#040914" stroke="#00f0ff" strokeWidth="1" rx="4" />
                <text x="10" y="16" fill="#00f0ff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  SKIN: 5mm DEPRON
                </text>
                <text x="10" y="30" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                  High Rigidity / Low Mass
                </text>
              </g>

              {/* Brushless Motor Tag */}
              <g transform="translate(530, 480)">
                <rect x="0" y="0" width="135" height="42" fill="#040914" stroke="#00f0ff" strokeWidth="1" rx="4" />
                <text x="10" y="16" fill="#00f0ff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  MOTOR & PROP
                </text>
                <text x="10" y="30" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                  Brushless Outrunner
                </text>
              </g>
            </svg>

            {/* Bottom floating telemetry status bar inside viewer */}
            <div className="absolute bottom-3 inset-x-4 bg-[#03060c]/90 border border-cyan-800/30 rounded-lg py-2 px-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>INTERACTIVE HUD: <span className="text-cyan-400 font-bold">{hudMode.toUpperCase()} VIEW</span></span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-400">
                <span>TOTAL SERVOS: <strong className="text-slate-200">2 (ELEVON MIX)</strong></span>
                <span>ESC PROTOCOL: <strong className="text-slate-200">PWM 50Hz</strong></span>
                <span>DATA INTEGRITY: <strong className="text-emerald-400">VERIFIED</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Real-Time Engineering Spec Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            <div className="bg-[#040812] border border-cyan-950 p-3 rounded-xl hover:border-cyan-500/40 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Airframe Core</div>
              <div className="text-sm font-bold text-white mt-1">5 mm Depron</div>
              <div className="text-[9px] font-mono text-cyan-400">Extruded Polystyrene</div>
            </div>

            <div className="bg-[#040812] border border-cyan-950 p-3 rounded-xl hover:border-cyan-500/40 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Propulsion</div>
              <div className="text-sm font-bold text-white mt-1">Brushless Motor</div>
              <div className="text-[9px] font-mono text-cyan-400">High-KV Outrunner</div>
            </div>

            <div className="bg-[#040812] border border-cyan-950 p-3 rounded-xl hover:border-cyan-500/40 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Speed Control</div>
              <div className="text-sm font-bold text-white mt-1">ESC with BEC</div>
              <div className="text-[9px] font-mono text-cyan-400">30A 5V/2A BEC</div>
            </div>

            <div className="bg-[#040812] border border-cyan-950 p-3 rounded-xl hover:border-cyan-500/40 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Power Source</div>
              <div className="text-sm font-bold text-white mt-1">LiPo Battery</div>
              <div className="text-[9px] font-mono text-cyan-400">3-Cell 11.1V</div>
            </div>

            <div className="bg-[#040812] border border-amber-950/40 border-amber-500/30 p-3 rounded-xl">
              <div className="text-[10px] font-mono text-amber-400 uppercase">Static Thrust</div>
              <div className="text-sm font-bold text-amber-300 mt-1 font-mono">[Add Data]</div>
              <div className="text-[9px] font-mono text-amber-400/80">Pending Bench Scale</div>
            </div>

            <div className="bg-[#040812] border border-amber-950/40 border-amber-500/30 p-3 rounded-xl">
              <div className="text-[10px] font-mono text-amber-400 uppercase">Top Airspeed</div>
              <div className="text-sm font-bold text-amber-300 mt-1 font-mono">[Add Data]</div>
              <div className="text-[9px] font-mono text-amber-400/80">Pending Pitot Log</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-cyan-900/40">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#hardware"
                className="px-5 py-2.5 rounded-lg text-xs font-mono font-bold bg-cyan-400 text-black hover:bg-cyan-300 shadow-lg shadow-cyan-400/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Exploded Hardware View</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#architecture"
                className="px-5 py-2.5 rounded-lg text-xs font-mono text-cyan-300 bg-[#0d1829] border border-cyan-500/40 hover:border-cyan-400 hover:text-white transition-all flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate Signal Flow</span>
              </a>

              <a
                href="#performance"
                className="px-4 py-2.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-950/20 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-1.5"
              >
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>Performance Lab</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/presentation"
                className="px-4 py-2.5 rounded-lg text-xs font-mono text-slate-200 bg-slate-900 border border-slate-700/60 hover:border-amber-400 hover:text-amber-300 transition-all flex items-center gap-2"
              >
                <PlaySquare className="w-4 h-4 text-amber-400" />
                <span>Viva Defense Deck</span>
              </Link>

              <Link
                href="/builder"
                className="px-4 py-2.5 rounded-lg text-xs font-mono text-slate-200 bg-slate-900 border border-slate-700/60 hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Open Project Builder</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
