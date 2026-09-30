'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProject } from '@/lib/projectStore';
import CinematicFlightStage from './CinematicFlightStage';
import MinimalNav from './MinimalNav';
import MissionIntro from './MissionIntro';
import {
  Plane,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sliders,
  PlaySquare,
  Sparkles,
  Zap,
  Gauge,
  Layers,
  Radio,
  Cpu,
  Calculator,
  Compass,
  FileText,
  Activity,
  CheckCircle2,
  Wind,
} from 'lucide-react';
import DocPreviewModal from '../showcase/DocPreviewModal';

export default function CinematicExperience() {
  const { currentProject } = useProject();
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [docModalOpen, setDocModalOpen] = useState(false);

  // Performance live calculator state
  const [calcThrust, setCalcThrust] = useState(480);
  const [calcWeight, setCalcWeight] = useState(380);
  const twRatio = (calcThrust / (calcWeight || 1)).toFixed(2);

  // Component dossiers for the exploded section
  const componentDetails: Record<string, { title: string; spec: string; role: string; location: string }> = {
    motor: {
      title: '2212 2200KV Brushless Motor',
      spec: '11.1V Outrunner, 24A Peak Draw',
      role: 'Generates rotational shaft torque to drive the 6x4 propeller at high RPM for forward thrust.',
      location: 'Mid-Fuselage Motor Mount Slot',
    },
    esc: {
      title: '30A Electronic Speed Controller (ESC)',
      spec: '2-3S LiPo, 5V/2A BEC onboard',
      role: 'Commutates DC battery voltage into 3-phase AC power and provides regulated 5V power to the receiver & servos.',
      location: 'Internal Fuselage Deck',
    },
    battery: {
      title: '3-Cell 11.1V LiPo Battery Pack',
      spec: '1500mAh 30C High Discharge Rate',
      role: 'Primary electrochemical energy source, positioned forward to lock the 28% MAC Center of Gravity balance.',
      location: 'Forward Nose Ballast Bay',
    },
    'servo-1': {
      title: 'Port Elevon Servo (Left)',
      spec: '9g Micro Analog Servo (1.6 kg-cm)',
      role: 'Actuates the left trailing-edge elevon flight surface through a stiff 1.2 mm piano wire pushrod.',
      location: 'Port Wing Sub-Bay',
    },
    'servo-2': {
      title: 'Starboard Elevon Servo (Right)',
      spec: '9g Micro Analog Servo (1.6 kg-cm)',
      role: 'Actuates the right trailing-edge elevon flight surface for synchronized pitch and differential roll.',
      location: 'Starboard Wing Sub-Bay',
    },
  };

  const activeDossier = selectedHotspot ? componentDetails[selectedHotspot] || null : null;

  return (
    <div className="relative bg-[#020509] text-white selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen">
      {/* 0. Staged Mission Launch Sequence */}
      <MissionIntro />

      {/* 1. Global Cinematic Flying Aircraft Stage (Fixed across whole journey) */}
      <CinematicFlightStage
        activeHotspot={selectedHotspot}
        onSelectHotspot={setSelectedHotspot}
      />

      {/* 2. Floating Minimalist Navigation */}
      <MinimalNav />

      {/* 3. Global Atmospheric Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Deep Aerospace Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(14,40,75,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_50%_100%,rgba(2,15,30,0.4),transparent)]" />
        {/* Subtle Engineering Coordinates Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff06_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff06_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      </div>

      {/* ========================================================
          CHAPTER 00: HERO — AIRCRAFT TAKEOFF ROLL
          ======================================================== */}
      <section
        id="takeoff"
        className="relative min-h-[110vh] flex flex-col justify-between pt-16 pb-24 px-6 sm:px-12 z-10"
      >
        {/* Top Reticle Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400/80 border-b border-cyan-900/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SYS_ID: {currentProject.projectId} // AERODYNAMICS PROTOCOL</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>BRANCH: <strong className="text-white">{currentProject.branch}</strong></span>
            <span>•</span>
            <span>MATERIAL: <strong className="text-cyan-300">{currentProject.material}</strong></span>
          </div>
        </div>

        {/* Hero Dramatic Typography */}
        <div className="my-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AEROSPACE SCALE RESEARCH PROTOTYPE</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight font-sans leading-none text-white">
            BUILD. TEST. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-cyan-500">FLY.</span>
          </h1>

          <div className="mt-6 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-cyan-300 uppercase tracking-wide">
              {currentProject.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              {currentProject.modelName}. Engineered from virgin 5 mm Depron foam sheet, powered by an electric brushless powertrain, and validated through real flight envelope trials.
            </p>
          </div>

          {/* Quick Stats Minimal Strip */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block text-[10px]">AIRFRAME CORE</span>
              <span className="text-white font-bold">5 MM DEPRON FOAM</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">PROPULSION</span>
              <span className="text-white font-bold">BRUSHLESS MOTOR + PROP</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">FLIGHT CONTROL</span>
              <span className="text-white font-bold">DUAL ELEVON SERVOS</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">RIGOR CLAUSE</span>
              <span className="text-amber-400 font-bold">[Add Data] UNCALIBRATED</span>
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-6">
          <div className="flex items-center gap-2 text-cyan-400 animate-bounce">
            <ChevronDown className="w-4 h-4" />
            <span>SCROLL TO INITIATE TAKEOFF ROLL</span>
          </div>
          <span>AIRCRAFT IS SENSITIVE TO SCROLL PROGRESS</span>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 01: THE CONCEPT / THE IDEA
          ======================================================== */}
      <section
        id="idea"
        className="relative min-h-[120vh] flex items-center justify-start px-6 sm:px-16 z-20 py-24"
      >
        <div className="max-w-xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>01 // THE CONCEPT</span>
            <span className="w-8 h-px bg-cyan-500/50" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight font-sans mb-6">
            THE IDEA
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            <p>
              The Lockheed Martin F-22 Raptor represents the zenith of modern 5th-generation stealth combat aerodynamics: clipped diamond delta wings, leading-edge root extensions (LERX), and twin canted vertical fins.
            </p>
            <p>
              Our central research objective was simple yet audacious: <strong>can a student engineering team fabricate an ultra-low-cost, high-alpha agile scale flight platform using only 5 mm Depron foam sheet</strong>, matched with hobbyist electric propulsion and dual elevon control?
            </p>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-[#060c18]/80 border border-cyan-900/60 backdrop-blur-md text-xs font-mono text-cyan-200">
            <div className="text-cyan-400 font-bold mb-1">HYPOTHESIS STATEMENT:</div>
            "Low wing loading achieved through closed-cell polystyrene enables high-angle-of-attack maneuverability without complex composite autoclaves."
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 02: THE DESIGN ("DESIGNED TO FLY")
          ======================================================== */}
      <section
        id="design"
        className="relative min-h-[120vh] flex items-center justify-end px-6 sm:px-16 z-20 py-24"
      >
        <div className="max-w-xl text-right">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center justify-end gap-2">
            <span className="w-8 h-px bg-cyan-500/50" />
            <span>02 // THE DESIGN</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight font-sans mb-6">
            DESIGNED TO FLY
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            <p>
              Notice the aircraft banking as you scroll. The planform geometry was mathematically extracted from 1:12 scale orthographic projections.
            </p>
            <p>
              To maintain pitch stability without expensive fly-by-wire computers, the <strong>Center of Gravity (CG) was calculated precisely at 28% Mean Aerodynamic Chord (MAC)</strong>, balanced by forward placement of the 3S LiPo battery.
            </p>
          </div>

          {/* Technical Specs Callout */}
          <div className="mt-8 grid grid-cols-2 gap-3 text-left font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-[#060c18]/80 border border-cyan-800/40 backdrop-blur-md">
              <div className="text-[10px] text-slate-400 uppercase">Wingspan</div>
              <div className="text-base font-bold text-white mt-0.5">720 mm</div>
              <div className="text-[10px] text-cyan-400 mt-1">Clipped Delta Planform</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#060c18]/80 border border-cyan-800/40 backdrop-blur-md">
              <div className="text-[10px] text-slate-400 uppercase">Fuselage Length</div>
              <div className="text-base font-bold text-white mt-0.5">940 mm</div>
              <div className="text-[10px] text-cyan-400 mt-1">Stealth Chine Edges</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#060c18]/80 border border-cyan-800/40 backdrop-blur-md">
              <div className="text-[10px] text-slate-400 uppercase">Substrate</div>
              <div className="text-base font-bold text-white mt-0.5">5 mm Depron</div>
              <div className="text-[10px] text-cyan-400 mt-1">Extruded Polystyrene</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#060c18]/80 border border-cyan-800/40 backdrop-blur-md">
              <div className="text-[10px] text-slate-400 uppercase">CG Balance</div>
              <div className="text-base font-bold text-white mt-0.5">28% MAC</div>
              <div className="text-[10px] text-cyan-400 mt-1">Naturally Stable</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 03: THE BUILD ("BUILT FROM THE GROUND UP")
          ======================================================== */}
      <section
        id="build"
        className="relative min-h-[130vh] flex items-center justify-start px-6 sm:px-16 z-20 py-24"
      >
        <div className="max-w-xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>03 // THE BUILD</span>
            <span className="w-8 h-px bg-cyan-500/50" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight font-sans mb-6">
            BUILT FROM THE GROUND UP
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed mb-6">
            Every component is installed intentionally into the Depron airframe. As you scroll, the internal architecture becomes visible:
          </p>

          <div className="space-y-3 font-mono text-xs">
            {[
              { name: '5 mm Depron Foam', desc: 'Isotropic 33 kg/m³ density, easily scored for folded aerofoils.' },
              { name: 'Carbon Fiber Spar', desc: '3 mm hollow carbon tube epoxied transversely across wing root.' },
              { name: '2212 2200KV Brushless Motor', desc: 'Mounted to 3 mm birch plywood firewall in mid-fuselage slot.' },
              { name: '30A ESC with 5V BEC', desc: 'Regulates high-RPM commutation and steps down 11.1V to 5V.' },
              { name: '3S 11.1V LiPo Battery', desc: '1500mAh 30C high-discharge chemistry, ballast for CG.' },
              { name: 'Dual 9g Micro Servos', desc: 'Installed on port & starboard wings driving 45° beveled elevons.' },
              { name: '6-Channel 2.4GHz Receiver', desc: 'Decodes pilot stick inputs into individual PWM channel signals.' },
            ].map((item, idx) => (
              <div
                key={item.name}
                className="p-3 rounded-lg bg-[#040810]/80 border border-slate-800 flex items-center gap-3 backdrop-blur-sm"
              >
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 font-bold flex items-center justify-center text-[10px] shrink-0 border border-cyan-800">
                  0{idx + 1}
                </span>
                <div>
                  <div className="text-white font-bold">{item.name}</div>
                  <div className="text-[11px] text-slate-400 font-sans">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 04: THE SYSTEM ("EVERY COMPONENT HAS A JOB")
          ======================================================== */}
      <section
        id="system"
        className="relative min-h-[140vh] flex flex-col justify-between px-6 sm:px-16 z-20 py-24"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            04 // EXPLODED AVIONICS BAY
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight font-sans">
            EVERY COMPONENT HAS A JOB
          </h2>
          <p className="mt-3 text-slate-400 text-sm font-sans">
            The aircraft is held stationary in center stage. Click any component hotspot on the aircraft or below to inspect its flight dossier.
          </p>

          {/* Quick Hotspot Selectors */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 font-mono text-xs">
            {[
              { id: 'motor', label: 'Brushless Motor' },
              { id: 'esc', label: 'ESC 30A' },
              { id: 'battery', label: '3S LiPo Battery' },
              { id: 'servo-1', label: 'Port Servo' },
              { id: 'servo-2', label: 'Starboard Servo' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedHotspot(selectedHotspot === item.id ? null : item.id)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  selectedHotspot === item.id
                    ? 'bg-cyan-400 text-black font-bold border-cyan-300 scale-105'
                    : 'bg-[#070e1c]/80 text-slate-300 border-slate-700 hover:border-cyan-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Component Inspection Card (Floats at bottom of section) */}
        {activeDossier && (
          <div className="max-w-2xl mx-auto w-full p-6 rounded-2xl bg-[#060c18]/95 border-2 border-cyan-400 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-900/50 font-mono text-xs mb-3">
              <span className="text-cyan-400 font-bold uppercase">COMPONENT DOSSIER</span>
              <span className="text-slate-400">LOC: {activeDossier.location}</span>
            </div>
            <h3 className="text-xl font-black text-white font-sans">{activeDossier.title}</h3>
            <div className="text-xs font-mono text-cyan-300 mt-0.5">SPEC: {activeDossier.spec}</div>
            <p className="text-xs text-slate-300 font-sans mt-3 leading-relaxed">{activeDossier.role}</p>
          </div>
        )}
      </section>

      {/* ========================================================
          CHAPTER 05: CONTROL & SIGNAL PULSE
          ======================================================== */}
      <section
        id="control"
        className="relative min-h-[120vh] flex items-center justify-start px-6 sm:px-16 z-20 py-24"
      >
        <div className="max-w-xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>05 // SIGNAL PULSE</span>
            <span className="w-8 h-px bg-cyan-500/50" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight font-sans mb-6">
            CONTROL
          </h2>

          <div className="space-y-6 text-xs font-mono">
            {/* Control Path 1: Radio to Servos */}
            <div className="p-4 rounded-xl bg-[#060c18]/80 border border-purple-500/40 backdrop-blur-md">
              <div className="text-purple-400 font-bold mb-2">FLIGHT SURFACE CONTROL PATH</div>
              <div className="text-slate-300 space-y-1">
                <div>TRANSMITTER (PILOT STICKS)</div>
                <div className="text-cyan-400 font-bold">↓ 2.4 GHz RF Link</div>
                <div>RECEIVER (DEMULTIPLEXER)</div>
                <div className="text-purple-400 font-bold">↓ 50Hz PWM Signal (CH1 + CH2)</div>
                <div>2× SERVO MOTORS</div>
                <div className="text-emerald-400 font-bold">↓ Pushrod Mechanical Deflection</div>
                <div className="text-white font-bold">ELEVON SURFACES → PITCH & ROLL ATTITUDE</div>
              </div>
            </div>

            {/* Control Path 2: Radio to Motor */}
            <div className="p-4 rounded-xl bg-[#060c18]/80 border border-amber-500/40 backdrop-blur-md">
              <div className="text-amber-400 font-bold mb-2">PROPULSION THROTTLE PATH</div>
              <div className="text-slate-300 space-y-1">
                <div>RECEIVER (THROTTLE CH3)</div>
                <div className="text-amber-400 font-bold">↓ 1000µs - 2000µs PWM Pulse</div>
                <div>ELECTRONIC SPEED CONTROLLER (ESC)</div>
                <div className="text-cyan-400 font-bold">↓ 3-Phase AC High Frequency Commutation</div>
                <div>BRUSHLESS OUTRUNNER MOTOR</div>
                <div className="text-emerald-400 font-bold">↓ Propeller Aerodynamic Mass Flow</div>
                <div className="text-white font-bold">DYNAMIC FORWARD THRUST</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 06: THE FLIGHT ("THEN WE FLEW IT.")
          ======================================================== */}
      <section
        id="flight"
        className="relative min-h-[140vh] flex flex-col justify-center items-center text-center px-6 z-20 py-24"
      >
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span>06 // FLIGHT SORTIE</span>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight font-sans leading-none mb-6">
            THEN WE FLEW IT.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-sans max-w-xl mx-auto leading-relaxed">
            Full-throttle hand launch into a 5-knot headwind. The 5 mm Depron airframe lifted smoothly, showing remarkable pitch stability and instant elevon roll response.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>CRITICAL FLIGHT ENVELOPE VALIDATED</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 07: PERFORMANCE & RIGOR
          ======================================================== */}
      <section
        id="performance"
        className="relative min-h-[120vh] flex flex-col justify-center px-6 sm:px-16 z-20 py-24"
      >
        <div className="max-w-4xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>07 // PERFORMANCE & TESTING LAB</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight font-sans mb-2">
            FLIGHT PERFORMANCE
          </h2>

          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs font-mono mb-8 max-w-2xl">
            <strong>SCIENTIFIC RIGOR POLICY:</strong> No experimental values are fabricated. Flight measurements remain marked as <code className="text-amber-300 bg-amber-900/50 px-1 py-0.5 rounded">[Add Data]</code> until field radar, pitot, and bench tests are formally cataloged.
          </div>

          {/* Performance Data Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs mb-8">
            {currentProject.performance.map((metric) => (
              <div key={metric.id} className="p-4 rounded-xl bg-[#060c18]/85 border border-slate-800 backdrop-blur-md">
                <div className="text-[10px] text-slate-400 uppercase">{metric.label}</div>
                <div className="text-2xl font-black text-amber-300 my-1">{metric.value}</div>
                <div className="text-[10px] text-slate-500">{metric.unit}</div>
              </div>
            ))}
          </div>

          {/* Interactive Live Aerodynamic Calculator */}
          <div className="p-6 rounded-2xl bg-[#050914]/90 border border-cyan-500/40 backdrop-blur-xl max-w-xl font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Calculator className="w-4 h-4" /> Live Thrust-to-Weight Calculator
              </span>
              <span className="text-slate-400">TEST STAND PREDICTOR</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Static Thrust:</span>
                  <span className="text-cyan-400 font-bold">{calcThrust} g</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="900"
                  value={calcThrust}
                  onChange={(e) => setCalcThrust(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>All-Up Weight (AUW):</span>
                  <span className="text-amber-400 font-bold">{calcWeight} g</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="700"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Calculated T/W Ratio:</span>
                <span className="text-2xl font-black text-cyan-400">{twRatio} : 1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 08: SENSOR PLATFORM EVOLUTION
          ======================================================== */}
      <section
        id="sensors"
        className="relative min-h-[120vh] flex flex-col justify-center px-6 sm:px-16 z-20 py-24"
      >
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>08 // MODULAR AVIONICS EXPANSION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight font-sans mb-4">
            READY TO EVOLVE
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed mb-8">
            The 5 mm Depron airframe contains an open mid-fuselage avionics bay designed to dock modular research payloads.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
            {currentProject.modularSensors.map((sensor) => (
              <div key={sensor.id} className="p-4 rounded-xl bg-[#060c18]/85 border border-cyan-900/50 backdrop-blur-md">
                <div className="flex items-center justify-between text-[9px] mb-1">
                  <span className="text-cyan-400">{sensor.interface}</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/40">
                    OPTIONAL
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm font-sans mb-1">{sensor.name}</h4>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{sensor.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 09: THE FUTURE & CONCLUSION
          ======================================================== */}
      <section
        id="future"
        className="relative min-h-[120vh] flex flex-col justify-between px-6 sm:px-16 z-20 py-24 text-center items-center"
      >
        <div className="my-auto max-w-4xl">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
            09 // MISSION HORIZON
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight font-sans leading-tight">
            THIS IS ONLY THE BEGINNING.
          </h2>

          <div className="mt-6 text-xl sm:text-2xl font-mono text-cyan-300 font-bold">
            WHAT WILL YOU BUILD?
          </div>

          <div className="my-10 space-y-2 text-sm sm:text-base font-mono text-slate-400">
            <div>BUILT BY STUDENTS.</div>
            <div>DESIGNED TO FLY.</div>
            <div className="text-white font-bold">READY FOR WHAT'S NEXT.</div>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setDocModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold shadow-xl shadow-cyan-400/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-black" />
              <span>Read Full Technical Report</span>
            </button>

            <Link
              href="/builder"
              className="px-6 py-3 rounded-xl bg-[#081224] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold transition-all flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Configure in Project Builder</span>
            </Link>

            <Link
              href="/presentation"
              className="px-6 py-3 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold transition-all flex items-center gap-2"
            >
              <PlaySquare className="w-4 h-4 text-amber-400" />
              <span>Viva Defense Presentation Mode</span>
            </Link>
          </div>
        </div>

        {/* Academic Credits */}
        <div className="pt-12 border-t border-slate-900/80 w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            RESEARCH TEAM: <strong className="text-slate-300">{currentProject.team[0]?.name || 'Rahul Sisode'} & Team</strong>
          </div>
          <div>
            SUPERVISOR: <strong className="text-slate-300">{currentProject.guideName}</strong>
          </div>
          <div>
            DEPARTMENT: <strong className="text-cyan-400">{currentProject.branch}</strong>
          </div>
        </div>
      </section>

      {/* Technical Report Dossier Modal */}
      {docModalOpen && (
        <DocPreviewModal onClose={() => setDocModalOpen(false)} />
      )}
    </div>
  );
}
