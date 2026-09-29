'use client';

import React, { useState } from 'react';
import { useProject } from '../../lib/projectStore';
import { ModularSensor } from '../../lib/types';
import {
  Layers,
  Sparkles,
  Compass,
  Video,
  Gauge,
  Navigation,
  Activity,
  PlusCircle,
  CheckCircle,
  ShieldAlert,
  ArrowUpRight,
  Info,
} from 'lucide-react';

export default function SensorModules() {
  const { currentProject } = useProject();
  const [selectedSensor, setSelectedSensor] = useState<ModularSensor>(
    currentProject.modularSensors[0] || null
  );

  return (
    <section id="sensors" className="py-20 relative bg-[#040812] border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>MODULAR PAYLOAD ARCHITECTURE // EXPANSION BUS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              The Platform Can Evolve
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl font-sans">
              Engineered with an open avionics payload bay. While the base prototype operates on direct RC flight control, the airframe and power rail are architected to accommodate high-level autonomous sensors.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 font-mono text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>CLASSIFICATION: OPTIONAL / FUTURE INTEGRATION</span>
          </div>
        </div>

        {/* Modular Sensor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentProject.modularSensors.map((sensor, index) => {
            const isSelected = selectedSensor?.id === sensor.id;
            return (
              <div
                key={sensor.id}
                onClick={() => setSelectedSensor(sensor)}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden ${
                  isSelected
                    ? 'bg-[#08162c] border-cyan-400 shadow-2xl shadow-cyan-950/80 scale-[1.02]'
                    : 'bg-[#060b16] border-slate-800/80 hover:border-cyan-800/60 hover:bg-[#07101e]'
                }`}
              >
                {/* Top Badge & Index */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#0b1626] border border-cyan-800/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
                    {sensor.name.includes('Speed') ? (
                      <Gauge className="w-5 h-5" />
                    ) : sensor.name.includes('Camera') ? (
                      <Video className="w-5 h-5" />
                    ) : sensor.name.includes('GPS') ? (
                      <Navigation className="w-5 h-5" />
                    ) : sensor.name.includes('Gyro') ? (
                      <Compass className="w-5 h-5" />
                    ) : sensor.name.includes('Altitude') ? (
                      <Activity className="w-5 h-5" />
                    ) : (
                      <Layers className="w-5 h-5" />
                    )}
                  </div>

                  <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-amber-950/40 text-amber-300 border border-amber-500/30">
                    OPTIONAL MODULE
                  </span>
                </div>

                {/* Sensor Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-sans mb-1">
                  {sensor.name}
                </h3>
                <div className="text-[11px] font-mono text-cyan-400/80 mb-3">
                  BUS: {sensor.interface}
                </div>

                {/* Sensor Purpose */}
                <p className="text-xs text-slate-400 leading-relaxed font-sans mb-5">
                  {sensor.purpose}
                </p>

                {/* Payload Impact & Integration Detail */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">
                    STATUS: <span className="text-cyan-300 font-semibold">{sensor.status}</span>
                  </span>
                  <span className="text-slate-400 group-hover:text-cyan-400 flex items-center gap-1">
                    <span>Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Sensor Deep Integration Inspection Banner */}
        {selectedSensor && (
          <div className="bg-[#070e1c] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-cyan-900/40 mb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white font-sans">
                    Modular Integration Specification: {selectedSensor.name}
                  </h4>
                  <div className="text-xs font-mono text-cyan-400">
                    EXPANSION PROTOCOL // BUS: {selectedSensor.interface}
                  </div>
                </div>
              </div>

              <div className="px-3 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-mono">
                FLAG: OPTIONAL / FUTURE RESEARCH SCOPE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#040810] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase mb-1">Payload Impact on AUW</div>
                <div className="text-white text-sm font-bold">~15g - 35g Payload</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">
                  Within the lift reserve calculated for the 5 mm Depron wing area at nominal cruise thrust.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040810] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase mb-1">Airframe Mounting Point</div>
                <div className="text-white text-sm font-bold">Mid-Fuselage Internal Bay</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">
                  Located near the Center of Gravity (CG) to prevent longitudinal trim deviation during flight.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040810] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase mb-1">Future Research Objective</div>
                <div className="text-cyan-300 text-sm font-bold">Autonomous Flight Logging</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">
                  Enables onboard black-box data collection for post-flight aerodynamic performance curve plotting.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
