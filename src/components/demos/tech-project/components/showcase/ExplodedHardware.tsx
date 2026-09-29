'use client';

import React, { useState } from 'react';
import { useProject } from '../../lib/projectStore';
import { HardwareNode } from '../../lib/types';
import {
  Cpu,
  Zap,
  Radio,
  Sliders,
  Layers,
  Info,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Maximize2,
  Crosshair,
  Wind,
} from 'lucide-react';

export default function ExplodedHardware() {
  const { currentProject } = useProject();
  const [selectedNode, setSelectedNode] = useState<HardwareNode>(
    currentProject.hardware[0] || null
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [diagnosticsRunning, setDiagnosticsRunning] = useState<boolean>(false);
  const [diagnosticsResult, setDiagnosticsResult] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Components' },
    { id: 'propulsion', label: 'Propulsion' },
    { id: 'power', label: 'Power Train' },
    { id: 'control', label: 'Control & Avionics' },
  ];

  const filteredHardware =
    activeCategory === 'all'
      ? currentProject.hardware
      : currentProject.hardware.filter((h) => h.category === activeCategory);

  const runDiagnostics = (nodeName: string) => {
    setDiagnosticsRunning(true);
    setDiagnosticsResult(null);
    setTimeout(() => {
      setDiagnosticsRunning(false);
      setDiagnosticsResult(`PASS: Continuity, impedance, and PWM signal response within operational nominals for ${nodeName}.`);
    }, 900);
  };

  return (
    <section id="hardware" className="py-20 relative bg-[#04070d] border-t border-cyan-900/30">
      {/* Background Reticle */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/20 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPLODED ARCHITECTURE // HARDWARE DOSSIER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              Critical Avionics & Propulsion Stack
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl font-sans">
              Complete hardware breakdown of the Remote Control F-22 Raptor scale aircraft. Every component selected for optimal power-to-weight ratio and precise control authority on 5 mm Depron foam.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-[#08101e] p-1.5 rounded-xl border border-cyan-900/50 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Hardware Grid & Inspection Bay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Middle Column: Interactive Component Selection Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredHardware.map((item, index) => {
              const isSelected = selectedNode?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedNode(item);
                    setDiagnosticsResult(null);
                  }}
                  className={`relative p-5 rounded-xl border cursor-pointer transition-all duration-300 group overflow-hidden ${
                    isSelected
                      ? 'bg-[#081528] border-cyan-400 shadow-xl shadow-cyan-950/80 scale-[1.01]'
                      : 'bg-[#060b14] border-slate-800/80 hover:border-cyan-800/60 hover:bg-[#070e1b]'
                  }`}
                >
                  {/* Corner Tick */}
                  <div className={`absolute top-0 right-0 w-8 h-8 pointer-events-none transition-opacity ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                  }`}>
                    <div className="absolute top-0 right-0 border-t-2 border-r-2 border-cyan-400 w-4 h-4" />
                  </div>

                  {/* Component Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected
                          ? 'bg-cyan-400 text-black'
                          : 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-950'
                      }`}>
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-[10px] font-mono text-cyan-400/80 uppercase">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {item.specs.split(',')[0]}
                    </span>
                  </div>

                  {/* Component Role Snippet */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans">
                    {item.role}
                  </p>

                  {/* Location & Selection indicator */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                    <span className="text-slate-400 truncate max-w-[180px]">
                      📍 {item.location}
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      isSelected ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-400'
                    }`}>
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Technical Dossier for Selected Hardware Node */}
          {selectedNode && (
            <div className="lg:col-span-5 bg-[#070e1c] border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 sticky top-24">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-cyan-900/40 font-mono text-xs mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 font-bold uppercase tracking-wider">
                    SPEC_SHEET // {selectedNode.id.toUpperCase()}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-700/50">
                  CATEGORY: {(selectedNode.category || 'propulsion').toUpperCase()}
                </span>
              </div>

              {/* Component Title & Model */}
              <div className="mb-5">
                <h3 className="text-2xl font-black text-white tracking-tight font-sans">
                  {selectedNode.name}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mt-1">
                  SPECIFICATION: {selectedNode.specs}
                </div>
              </div>

              {/* Engineering Role Description */}
              <div className="bg-[#040812] border border-cyan-950 rounded-xl p-4 mb-5">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  Engineering Function & Purpose
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedNode.role}
                </p>
              </div>

              {/* Technical Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#040810] border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Mounting Location</div>
                  <div className="text-slate-200 font-semibold mt-1 text-[11px]">
                    {selectedNode.location}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#040810] border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Electrical Interface</div>
                  <div className="text-cyan-300 font-semibold mt-1 text-[11px]">
                    {selectedNode.specs.includes('ESC')
                      ? 'PWM Signal + 5V BEC'
                      : selectedNode.specs.includes('Motor')
                      ? '3-Phase AC Commutation'
                      : selectedNode.specs.includes('LiPo')
                      ? 'XT60 / JST High Current'
                      : selectedNode.specs.includes('Servo')
                      ? '3-Pin JR / PWM 50Hz'
                      : '2.4 GHz RF / PWM Bus'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#040810] border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Material Housing</div>
                  <div className="text-slate-200 font-semibold mt-1 text-[11px]">
                    {selectedNode.name.includes('Propeller')
                      ? 'Glass-Filled Nylon / Polycarbonate'
                      : selectedNode.name.includes('Motor')
                      ? 'CNC Aluminum + Neodymium'
                      : 'Reinforced Composite / Plastic'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#040810] border border-amber-950/40 border-amber-500/20">
                  <div className="text-[10px] text-amber-400 uppercase">Measured Weight</div>
                  <div className="text-amber-300 font-bold mt-1 text-[11px]">
                    [Add Data] g
                  </div>
                </div>
              </div>

              {/* Depron Mounting Note */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-cyan-200/90 leading-relaxed font-sans mb-6">
                <strong>Airframe Integration:</strong> Mounted securely onto the 5 mm Depron fuselage using hot-glue / epoxy reinforced plywood firewall and carbon spar load distribution to prevent structural vibration.
              </div>

              {/* Interactive Diagnostics Trigger */}
              <div className="space-y-3">
                <button
                  onClick={() => runDiagnostics(selectedNode.name)}
                  disabled={diagnosticsRunning}
                  className="w-full py-2.5 px-4 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Activity className={`w-4 h-4 ${diagnosticsRunning ? 'animate-spin text-cyan-400' : 'text-cyan-400'}`} />
                  <span>{diagnosticsRunning ? 'Running Bench Diagnostics...' : `Test ${selectedNode.name} Interface`}</span>
                </button>

                {diagnosticsResult && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-start gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{diagnosticsResult}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
