'use client';

import React, { useState } from 'react';
import { useProject } from '@/lib/projectStore';
import {
  Gauge,
  ShieldAlert,
  Activity,
  Zap,
  Sliders,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Calculator,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function PerformanceLab() {
  const { currentProject, updateMetric } = useProject();

  // Interactive Live Calculator state
  const [calcThrust, setCalcThrust] = useState<number>(450);
  const [calcWeight, setCalcWeight] = useState<number>(380);
  const [calcWingArea, setCalcWingArea] = useState<number>(14.5); // dm²

  const twRatio = (calcThrust / (calcWeight || 1)).toFixed(2);
  const wingLoading = ((calcWeight || 1) / (calcWingArea || 1)).toFixed(1); // g/dm²

  // Throttle curve interactive slider
  const [simThrottle, setSimThrottle] = useState<number>(65);

  return (
    <section id="performance" className="py-20 relative bg-[#040810] border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span>TESTING, TELEMETRY & FLIGHT EVALUATION LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              Performance Evaluation Metrics
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl font-sans">
              Empirical flight testing protocol. To preserve genuine scientific and academic integrity, experimental benchmarks maintain strict uncalibrated status until field sorties are logged.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold">ZERO FABRICATION POLICY</div>
              <div className="text-[10px] text-amber-200/70">Placeholders marked as [Add Data] until physical test log</div>
            </div>
          </div>
        </div>

        {/* 6 Core Performance Benchmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentProject.performance.map((metric) => (
            <div
              key={metric.id}
              className="p-6 rounded-2xl bg-[#060b16] border border-cyan-950 hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3 font-mono text-xs text-slate-400">
                <span className="uppercase text-[10px] tracking-wider">{metric.category}</span>
                <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30 text-[9px]">
                  TEST PENDING
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-sans mb-2">
                {metric.label}
              </h3>

              {/* Data Value Placeholder */}
              <div className="my-4 py-3 px-4 rounded-xl bg-[#03060c] border border-dashed border-amber-500/40 flex items-baseline justify-between">
                <span className="text-2xl font-mono font-black text-amber-300 tracking-wider">
                  {metric.value}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  {metric.unit}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
                {metric.notes}
              </p>

              <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex justify-between items-center">
                <span>VERIFICATION METHOD</span>
                <span className="text-cyan-300 font-semibold">BENCH & AIR DATA</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Flight Dynamics Calculator & Theoretical Curve Analyzer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Calculator: T/W Ratio & Wing Loading */}
          <div className="lg:col-span-6 bg-[#070d1a] border border-cyan-500/30 rounded-2xl p-6 sm:p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-900/40 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Aerodynamic Calculator // Live Estimator</span>
              </div>
              <span className="text-slate-400 text-[10px]">AERO PHYSICS ENGINE</span>
            </div>

            <p className="text-xs text-slate-300 mb-6 font-sans leading-relaxed">
              Input bench measurements when you conduct physical thrust tests to calculate the flight envelope characteristics for this 5 mm Depron F-22 model.
            </p>

            <div className="space-y-5 font-mono text-xs">
              {/* Static Thrust Input */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span>Static Motor Thrust (measured on test stand):</span>
                  <span className="text-cyan-400 font-bold">{calcThrust} grams</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="900"
                  step="10"
                  value={calcThrust}
                  onChange={(e) => setCalcThrust(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* All-Up Weight Input */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span>All-Up Aircraft Weight (AUW including LiPo):</span>
                  <span className="text-amber-400 font-bold">{calcWeight} grams</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="700"
                  step="10"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Wing Area Input */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span>Wing Planform Reference Area (S):</span>
                  <span className="text-sky-300 font-bold">{calcWingArea} dm²</span>
                </div>
                <input
                  type="range"
                  min="8.0"
                  max="25.0"
                  step="0.5"
                  value={calcWingArea}
                  onChange={(e) => setCalcWingArea(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Computed Aerodynamic Results */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#040810] border border-cyan-500/40">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Thrust-to-Weight (T/W)</div>
                <div className="text-2xl font-black font-mono text-cyan-400 mt-1">
                  {twRatio} : 1
                </div>
                <div className="text-[11px] font-mono mt-1">
                  {Number(twRatio) >= 1.0 ? (
                    <span className="text-emerald-400 font-bold">Unlimited Vertical Climb 🚀</span>
                  ) : Number(twRatio) >= 0.7 ? (
                    <span className="text-cyan-300 font-bold">Aerobatic Maneuverability</span>
                  ) : (
                    <span className="text-amber-300">Scale Cruise Profile</span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#040810] border border-cyan-500/40">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Wing Loading (W/S)</div>
                <div className="text-2xl font-black font-mono text-amber-300 mt-1">
                  {wingLoading} <span className="text-xs font-normal text-slate-400">g/dm²</span>
                </div>
                <div className="text-[11px] font-mono mt-1">
                  {Number(wingLoading) <= 30 ? (
                    <span className="text-emerald-400 font-bold">Ultra-Light Floater</span>
                  ) : Number(wingLoading) <= 45 ? (
                    <span className="text-cyan-300 font-bold">High Speed Stable</span>
                  ) : (
                    <span className="text-amber-400">High Stall Speed</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Theoretical Throttle-Thrust Profile Visualizer */}
          <div className="lg:col-span-6 bg-[#070d1a] border border-cyan-500/30 rounded-2xl p-6 sm:p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-900/40 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Thrust vs Throttle Response Curve</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30 text-[9px]">
                CALIBRATION TEMPLATE
              </span>
            </div>

            {/* Slider to interact with throttle graph */}
            <div className="mb-6 font-mono text-xs">
              <div className="flex justify-between text-slate-300 mb-2">
                <span>SIMULATE THROTTLE SETTING:</span>
                <span className="text-cyan-400 font-bold">{simThrottle}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simThrottle}
                onChange={(e) => setSimThrottle(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* SVG Graph Visualization */}
            <div className="h-[220px] w-full bg-[#03060c] rounded-xl border border-slate-800 p-4 relative flex items-center justify-center">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Axes and grid */}
                <line x1="40" y1="160" x2="480" y2="160" stroke="#334155" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="160" stroke="#334155" strokeWidth="1.5" />

                {/* Grid guidelines */}
                <line x1="40" y1="125" x2="480" y2="125" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="40" y1="90" x2="480" y2="90" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="40" y1="55" x2="480" y2="55" stroke="#1e293b" strokeDasharray="3,3" />

                {/* Exponential Thrust Curve */}
                <path
                  d="M 40,160 Q 260,150 480,30"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                />

                {/* Current Throttle Marker */}
                {(() => {
                  const t = simThrottle / 100;
                  const x = 40 + t * 440;
                  // Quadratic interpolation for Q(40,160, 260,150, 480,30)
                  const p0 = 160;
                  const p1 = 150;
                  const p2 = 30;
                  const y = (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
                  return (
                    <g>
                      <line x1={x} y1="20" x2={x} y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
                      <circle cx={x} cy={y} r="6" fill="#f59e0b" />
                      <circle cx={x} cy={y} r="12" fill="none" stroke="#f59e0b" strokeWidth="1" className="animate-ping" />
                      <text x={x + 10} y={y - 8} fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        {simThrottle}% THROTTLE
                      </text>
                    </g>
                  );
                })()}

                {/* Axis Labels */}
                <text x="480" y="180" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                  PWM Throttle (0% - 100%)
                </text>
                <text x="45" y="16" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  Static Thrust (g)
                </text>
              </svg>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-[#040810] border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed">
              <strong>Non-Linear Aerodynamic Response:</strong> Electric brushless motors produce quadratic thrust scaling at higher RPM due to blade aerodynamic lift laws (Thrust is proportional to RPM squared).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
