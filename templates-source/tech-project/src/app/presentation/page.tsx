'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProject } from '@/lib/projectStore';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Clock,
  Crosshair,
  ShieldAlert,
  Cpu,
  Layers,
  Zap,
  Gauge,
  Sparkles,
  Plane,
  CheckCircle2,
} from 'lucide-react';

export default function PresentationPage() {
  const { currentProject } = useProject();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [laserPointer, setLaserPointer] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Slide definitions
  const slides = [
    {
      id: 'intro',
      tag: 'SLIDE 01 // MISSION OVERVIEW',
      title: currentProject.title,
      subtitle: `${currentProject.modelName} — ${currentProject.branch}`,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#070e1c] border border-cyan-500/30">
              <div className="text-[11px] font-mono text-cyan-400 uppercase">Airframe Core</div>
              <div className="text-xl font-bold text-white mt-1">{currentProject.material}</div>
              <div className="text-xs text-slate-400 mt-2 font-sans">
                Closed-cell extruded polystyrene chosen for high strength-to-weight ratio and crash resilience.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#070e1c] border border-cyan-500/30">
              <div className="text-[11px] font-mono text-cyan-400 uppercase">Propulsion Unit</div>
              <div className="text-xl font-bold text-white mt-1">Brushless Motor + Prop</div>
              <div className="text-xs text-slate-400 mt-2 font-sans">
                High-KV outrunner brushless motor driven by 30A ESC with 5V/2A onboard BEC.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#070e1c] border border-cyan-500/30">
              <div className="text-[11px] font-mono text-cyan-400 uppercase">Flight Authority</div>
              <div className="text-xl font-bold text-white mt-1">2 Servo Elevons</div>
              <div className="text-xs text-slate-400 mt-2 font-sans">
                Electronic mixing of aileron and elevator channels for responsive pitch and roll authority.
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#050912] border border-slate-800 text-slate-300 text-sm font-sans leading-relaxed">
            <strong>Technical Hypothesis:</strong> Utilizing 5 mm Depron foam sheets with a 1:12 scale F-22 Raptor stealth planform enables rapid fabrication of an agile, lightweight research airframe capable of stable high-angle-of-attack (high-alpha) flight without expensive composite tooling.
          </div>
        </div>
      ),
    },
    {
      id: 'material',
      tag: 'SLIDE 02 // MATERIAL SELECTION',
      title: 'Structural Mechanics: 5 mm Depron Foam',
      subtitle: 'Extruded Polystyrene vs Traditional Balsa & Composites',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#070e1c] border border-cyan-400">
              <div className="text-cyan-400 font-bold">5 mm Depron Foam</div>
              <div className="text-2xl font-black text-white mt-1">33 kg/m³</div>
              <div className="text-[11px] text-slate-400 mt-1 font-sans">High isotropic rigidity, instant glue repair</div>
            </div>
            <div className="p-4 rounded-xl bg-[#040710] border border-slate-800">
              <div className="text-slate-400">Balsa Wood</div>
              <div className="text-2xl font-black text-slate-300 mt-1">140 kg/m³</div>
              <div className="text-[11px] text-slate-500 mt-1 font-sans">4.2x heavier, natural grain splitting</div>
            </div>
            <div className="p-4 rounded-xl bg-[#040710] border border-slate-800">
              <div className="text-slate-400">EPP Foam</div>
              <div className="text-2xl font-black text-slate-300 mt-1">35 kg/m³</div>
              <div className="text-[11px] text-slate-500 mt-1 font-sans">High bounce but excessive aero flutter</div>
            </div>
            <div className="p-4 rounded-xl bg-[#040710] border border-slate-800">
              <div className="text-slate-400">Carbon Fiber / Epoxy</div>
              <div className="text-2xl font-black text-slate-300 mt-1">1500 kg/m³</div>
              <div className="text-[11px] text-slate-500 mt-1 font-sans">Ultra-stiff but requires complex molds</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#070e1c] border border-cyan-900/50 space-y-2 text-xs font-mono">
            <div className="text-cyan-400 font-bold uppercase">Fabrication Highlights:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
              <div>• Carbon fiber spar inserted across 720 mm wingspan</div>
              <div>• 45° bevel knife hinge sliced for elevon articulation</div>
              <div>• Low-curing temperature adhesive preserves polystyrene cell walls</div>
              <div>• Acrylic stealth camouflage livery applied without solvent etching</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hardware',
      tag: 'SLIDE 03 // HARDWARE & AVIONICS',
      title: 'Installed Flight Hardware Stack',
      subtitle: 'Complete Component Inventory for the F-22 Airframe',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentProject.hardware.map((hw) => (
              <div key={hw.id} className="p-4 rounded-xl bg-[#070e1c] border border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                  <span>{(hw.category || 'propulsion').toUpperCase()}</span>
                  <span className="text-slate-500">{hw.location}</span>
                </div>
                <div className="font-bold text-white text-sm font-sans">{hw.name}</div>
                <div className="text-cyan-300 text-xs font-mono mt-0.5">{hw.specs}</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2 line-clamp-2">{hw.role}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'flow',
      tag: 'SLIDE 04 // CONTROL ARCHITECTURE',
      title: 'Signal Pulse & RF Demultiplexing',
      subtitle: '2.4 GHz Link to 3-Phase Motor Commutation & Elevons',
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#050a14] border border-cyan-500/30 text-xs font-mono">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="p-3 rounded-lg bg-cyan-950 border border-cyan-700/60 w-full md:w-auto">
                <div className="text-cyan-300 font-bold">1. Pilot Command</div>
                <div className="text-slate-400 text-[11px]">Transmitter 2.4GHz FHSS</div>
              </div>
              <span className="text-cyan-400 font-bold">→ 20ms RF →</span>
              <div className="p-3 rounded-lg bg-sky-950 border border-sky-700/60 w-full md:w-auto">
                <div className="text-sky-300 font-bold">2. Onboard RX</div>
                <div className="text-slate-400 text-[11px]">6-CH PWM Demux</div>
              </div>
              <span className="text-cyan-400 font-bold">→ PWM Bus →</span>
              <div className="space-y-2 w-full md:w-auto">
                <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-600/50">
                  <div className="text-amber-300 font-bold">ESC → Motor → Propeller</div>
                  <div className="text-slate-400 text-[10px]">3-Phase AC Thrust</div>
                </div>
                <div className="p-2.5 rounded-lg bg-purple-950/80 border border-purple-600/50">
                  <div className="text-purple-300 font-bold">CH1/CH2 → 2x Servos</div>
                  <div className="text-slate-400 text-[10px]">Dual Elevon Deflection</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-slate-300 font-sans">
            <strong>Elevon Mixer Logic:</strong> The transmitter or onboard receiver combines pitch (elevator) and roll (aileron) inputs. When pulling up on the stick, both elevons deflect upward simultaneously. When banking right, the starboard elevon deflects upward while the port elevon deflects downward.
          </div>
        </div>
      ),
    },
    {
      id: 'performance',
      tag: 'SLIDE 05 // TESTING & EVALUATION',
      title: 'Performance Evaluation & Scientific Rigor',
      subtitle: 'Zero Data Fabrication Protocol ([Add Data] Placeholders)',
      content: (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong>Academic Integrity Clause:</strong> Bench measurements and flight test values are strictly withheld as <code className="bg-amber-900/40 text-amber-300 px-1 py-0.5 rounded">[Add Data]</code> until empirical calibration in wind tunnel or GPS field log.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
            {currentProject.performance.map((metric) => (
              <div key={metric.id} className="p-4 rounded-xl bg-[#060b16] border border-slate-800">
                <div className="text-slate-400 uppercase text-[10px]">{metric.label}</div>
                <div className="text-xl font-bold text-amber-300 my-1">{metric.value}</div>
                <div className="text-[10px] text-slate-500">{metric.unit}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'sensors',
      tag: 'SLIDE 06 // FUTURE EXPANSION',
      title: 'Modular Sensor Payloads (Future Scope)',
      subtitle: 'The Platform Can Evolve for Autonomous Telemetry',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentProject.modularSensors.map((sensor) => (
              <div key={sensor.id} className="p-4 rounded-xl bg-[#060c18] border border-cyan-950">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                  <span>{sensor.interface}</span>
                  <span className="text-amber-400 font-bold">{sensor.status}</span>
                </div>
                <div className="font-bold text-white text-sm font-sans">{sensor.name}</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">{sensor.purpose}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-[#040810] border border-slate-800 text-xs font-mono text-slate-400">
            Internal mid-fuselage bay accommodates 15g - 35g modular electronics without upsetting the 32% MAC Center of Gravity balance point.
          </div>
        </div>
      ),
    },
    {
      id: 'team',
      tag: 'SLIDE 07 // CONCLUSION & DEFENSE',
      title: 'Research Team & Academic Affiliation',
      subtitle: `${currentProject.college} — Department of ${currentProject.branch}`,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#070e1c] border border-cyan-500/40">
              <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-2">Faculty Project Guide</div>
              <div className="text-xl font-black text-white font-sans">{currentProject.guideName}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Associate Professor // Department of {currentProject.branch}</div>
            </div>

            <div className="p-5 rounded-xl bg-[#070e1c] border border-cyan-500/40">
              <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-2">Student Investigators</div>
              <div className="space-y-1.5 font-mono text-xs">
                {currentProject.team.map((m) => (
                  <div key={m.name} className="flex justify-between text-slate-200">
                    <span className="font-bold">{m.name}</span>
                    <span className="text-cyan-300">{m.rollNo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center font-mono text-xs text-emerald-300">
            <div className="text-base font-bold text-white mb-1">Ready for Questions from the External Jury</div>
            <div>All CAD blueprints, flight bench test stands, and wiring harnesses open for live inspection.</div>
          </div>
        </div>
      ),
    },
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  // Timer
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (laserPointer) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const activeSlideData = slides[currentSlide];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#03060c] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none"
    >
      {/* Laser Pointer Spot */}
      {laserPointer && (
        <div
          className="fixed pointer-events-none z-50 w-5 h-5 rounded-full bg-red-500 shadow-[0_0_15px_#ff0000] -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ left: mousePos.x, top: mousePos.y }}
        />
      )}

      {/* Presentation Top HUD Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-cyan-900/40 font-mono text-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <X className="w-4 h-4 text-cyan-400" />
            <span>Exit Defense Mode</span>
          </Link>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-cyan-300 font-bold">{currentProject.modelName}</span>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLaserPointer(!laserPointer)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
              laserPointer ? 'bg-red-950 text-red-300 border border-red-500/50' : 'bg-slate-900 text-slate-400'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Laser Pointer: {laserPointer ? 'ON' : 'OFF'}</span>
          </button>

          <div className="flex items-center gap-2 bg-[#060b16] px-3 py-1.5 rounded-lg border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-cyan-300">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-[10px] text-slate-500 hover:text-slate-300 ml-1"
            >
              {isTimerRunning ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="my-auto max-w-5xl mx-auto w-full py-8">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs mb-3">
          {activeSlideData.tag}
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight mb-2">
          {activeSlideData.title}
        </h2>
        <div className="text-base sm:text-lg font-mono text-cyan-400 mb-8">
          {activeSlideData.subtitle}
        </div>

        {/* Slide Body */}
        <div className="mt-4">
          {activeSlideData.content}
        </div>
      </div>

      {/* Bottom Navigation & Slide Indicator Bar */}
      <div className="pt-4 border-t border-cyan-900/40 flex items-center justify-between font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>SLIDE {currentSlide + 1} OF {slides.length}</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Use [Left] and [Right] Arrow Keys or Spacebar</span>
        </div>

        {/* Slide Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === i ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-cyan-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:pointer-events-none text-black transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
