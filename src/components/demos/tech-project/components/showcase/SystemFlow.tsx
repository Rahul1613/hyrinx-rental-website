'use client';

import React, { useState } from 'react';
import {
  Zap,
  Radio,
  Cpu,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Play,
  CheckCircle,
  Activity,
  Flame,
} from 'lucide-react';

export default function SystemFlow() {
  const [activeSignal, setActiveSignal] = useState<'idle' | 'throttle' | 'elevon' | 'power'>('idle');
  const [pulseStep, setPulseStep] = useState<number>(0);

  const triggerThrottlePulse = () => {
    setActiveSignal('throttle');
    setPulseStep(1);
    const timers = [
      setTimeout(() => setPulseStep(2), 500),
      setTimeout(() => setPulseStep(3), 1100),
      setTimeout(() => setPulseStep(4), 1700),
      setTimeout(() => {
        setPulseStep(5);
        setTimeout(() => {
          setActiveSignal('idle');
          setPulseStep(0);
        }, 1500);
      }, 2300),
    ];
  };

  const triggerElevonPulse = () => {
    setActiveSignal('elevon');
    setPulseStep(1);
    const timers = [
      setTimeout(() => setPulseStep(2), 500),
      setTimeout(() => setPulseStep(3), 1100),
      setTimeout(() => {
        setPulseStep(4);
        setTimeout(() => {
          setActiveSignal('idle');
          setPulseStep(0);
        }, 1500);
      }, 1800),
    ];
  };

  return (
    <section id="architecture" className="py-20 relative bg-[#03060c] border-t border-cyan-900/30 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_40%,rgba(0,240,255,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>AVIONICS INTERFACE // SIGNAL & POWER BUS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            System Control & Signal Flow Architecture
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed font-sans">
            How control inputs travel from pilot transmitter sticks through 2.4 GHz RF link, PWM signal demultiplexing, ESC 3-phase motor commutation, and dual elevon servo actuation.
          </p>
        </div>

        {/* Interactive Pulse Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 font-mono text-xs">
          <span className="text-slate-400 mr-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" />
            SIMULATE REAL-TIME COMMAND:
          </span>

          <button
            onClick={triggerThrottlePulse}
            disabled={activeSignal !== 'idle'}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
              activeSignal === 'throttle'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30 scale-105'
                : 'bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:bg-amber-900/40'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Transmit 100% Throttle Pulse</span>
          </button>

          <button
            onClick={triggerElevonPulse}
            disabled={activeSignal !== 'idle'}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
              activeSignal === 'elevon'
                ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30 scale-105'
                : 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Transmit Elevon Deflection (+15°)</span>
          </button>

          {activeSignal !== 'idle' && (
            <span className="text-xs text-emerald-400 font-mono animate-pulse flex items-center gap-1 ml-2">
              <CheckCircle className="w-3.5 h-3.5" /> SIGNAL BUS ACTIVE
            </span>
          )}
        </div>

        {/* Visual Architecture Diagram */}
        <div className="bg-[#060a14] border border-cyan-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative items-center">
            
            {/* Stage 1: Pilot Ground Station / Transmitter */}
            <div className={`p-5 rounded-xl border transition-all ${
              pulseStep >= 1 && (activeSignal === 'throttle' || activeSignal === 'elevon')
                ? 'bg-cyan-950/80 border-cyan-400 shadow-xl shadow-cyan-500/20'
                : 'bg-[#091020] border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-cyan-400">
                <span>STAGE 01</span>
                <span>TX COMMAND</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-900/40 flex items-center justify-center text-cyan-400 mb-3 border border-cyan-700/50">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-sans">Transmitter (TX)</h4>
              <p className="text-xs text-slate-400 font-sans mt-1">
                2.4 GHz 6-Channel digital FHSS unit capturing stick position (Throttle, Elevator, Aileron).
              </p>
              <div className="mt-3 text-[10px] font-mono text-cyan-300 bg-black/40 px-2 py-1 rounded">
                Protocol: 2.4GHz FHSS
              </div>
            </div>

            {/* Stage 2: RF Air Gap & Onboard Receiver */}
            <div className={`p-5 rounded-xl border transition-all ${
              pulseStep >= 2 && (activeSignal === 'throttle' || activeSignal === 'elevon')
                ? 'bg-cyan-950/80 border-cyan-400 shadow-xl shadow-cyan-500/20'
                : 'bg-[#091020] border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-cyan-400">
                <span>STAGE 02</span>
                <span>RX DEMUX</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-sky-900/40 flex items-center justify-center text-sky-400 mb-3 border border-sky-700/50">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-sans">Receiver (RX)</h4>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Decodes radio packet into individual 50Hz PWM pulse-width channels (1000µs - 2000µs).
              </p>
              <div className="mt-3 text-[10px] font-mono text-sky-300 bg-black/40 px-2 py-1 rounded">
                CH1-CH6 PWM Bus
              </div>
            </div>

            {/* Stage 3: Signal Demux & Power Splitter */}
            <div className="space-y-4">
              {/* Top Branch: Propulsion (ESC + Motor) */}
              <div className={`p-4 rounded-xl border transition-all ${
                pulseStep >= 3 && activeSignal === 'throttle'
                  ? 'bg-amber-950/80 border-amber-400 shadow-xl shadow-amber-500/20'
                  : 'bg-[#091020] border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-2">
                  <span>THROTTLE CHANNEL</span>
                  <span>ESC 30A</span>
                </div>
                <h5 className="text-sm font-bold text-white font-sans">Speed Controller (ESC)</h5>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  Switches DC battery voltage into 3-phase alternating current at high frequency.
                </p>
              </div>

              {/* Bottom Branch: Elevon Control (2 Servos) */}
              <div className={`p-4 rounded-xl border transition-all ${
                pulseStep >= 3 && activeSignal === 'elevon'
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-xl shadow-cyan-500/20'
                  : 'bg-[#091020] border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-2">
                  <span>CH1 + CH2 MIX</span>
                  <span>2x SERVOS</span>
                </div>
                <h5 className="text-sm font-bold text-white font-sans">Dual Servo Motors</h5>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  Translates elevon mixer pulse widths into micro-servo arm rotational angles.
                </p>
              </div>
            </div>

            {/* Stage 4: Actuator Execution (Motor vs Pushrods) */}
            <div className="space-y-4">
              {/* Propulsion Actuator: Brushless Motor */}
              <div className={`p-4 rounded-xl border transition-all ${
                pulseStep >= 4 && activeSignal === 'throttle'
                  ? 'bg-amber-950/80 border-amber-400 shadow-xl shadow-amber-500/20'
                  : 'bg-[#091020] border-slate-800'
              }`}>
                <div className="text-[10px] font-mono text-amber-400 mb-1">PROPULSION</div>
                <h5 className="text-sm font-bold text-white font-sans">Brushless Motor & Prop</h5>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  Outrunner spins propeller to generate mass-flow acceleration.
                </p>
              </div>

              {/* Surface Actuator: Elevons */}
              <div className={`p-4 rounded-xl border transition-all ${
                pulseStep >= 4 && activeSignal === 'elevon'
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-xl shadow-cyan-500/20'
                  : 'bg-[#091020] border-slate-800'
              }`}>
                <div className="text-[10px] font-mono text-cyan-400 mb-1">AERODYNAMICS</div>
                <h5 className="text-sm font-bold text-white font-sans">Elevon Control Surfaces</h5>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  Deflection changes wing camber to generate pitch/roll moments.
                </p>
              </div>
            </div>

            {/* Stage 5: Aerodynamic Effect */}
            <div className={`p-5 rounded-xl border transition-all ${
              pulseStep >= 4
                ? 'bg-emerald-950/70 border-emerald-400 shadow-xl shadow-emerald-500/20'
                : 'bg-[#091020] border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-emerald-400">
                <span>STAGE 05</span>
                <span>RESULT</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-900/40 flex items-center justify-center text-emerald-400 mb-3 border border-emerald-700/50">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-sans">Flight Dynamics</h4>
              <p className="text-xs text-slate-400 font-sans mt-1">
                {activeSignal === 'throttle'
                  ? 'Continuous forward thrust accelerates the 5mm Depron airframe to generate lift.'
                  : activeSignal === 'elevon'
                  ? 'Aerodynamic torque reorients the aircraft pitch angle or roll attitude in 3D airspace.'
                  : 'Awaiting pilot input stream to actuate control surfaces.'}
              </p>
              <div className="mt-3 text-[10px] font-mono text-emerald-300 bg-black/40 px-2 py-1 rounded">
                Status: Flight Ready
              </div>
            </div>

          </div>

          {/* Bottom Telemetry Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold">POWER HARNESS:</span>
              <span>11.1V 3S LiPo → ESC Main Rail → 5V BEC → RX / Servos</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>FAILSAFE PROTOCOL: <strong className="text-slate-200">Throttle Cut on RF Loss</strong></span>
              <span>REFRESH RATE: <strong className="text-cyan-400">20ms (50Hz)</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
