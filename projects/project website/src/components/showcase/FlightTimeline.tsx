'use client';

import React from 'react';
import { useProject } from '@/lib/projectStore';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Flag,
  ArrowRight,
  Compass,
  Cpu,
  Layers,
  Plane,
} from 'lucide-react';

export default function FlightTimeline() {
  const { currentProject } = useProject();

  return (
    <section id="timeline" className="py-20 relative bg-[#03060c] border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEVELOPMENT LIFECYCLE // PROJECT STAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            Engineering Milestones & Flight Pipeline
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed font-sans">
            Methodical step-by-step progress from mathematical CAD aerodynamic design to 5 mm Depron airframe cutting, electrical integration, and post-flight performance evaluation.
          </p>
        </div>

        {/* Vertical/Horizontal Timeline */}
        <div className="relative">
          {/* Central connecting track */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/10 via-cyan-500/50 to-amber-500/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {currentProject.timeline.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isInProgress = stage.status === 'in-progress';

              return (
                <div
                  key={stage.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 relative group ${
                    isCompleted
                      ? 'bg-[#060d1a] border-cyan-500/40 hover:border-cyan-400 shadow-lg shadow-cyan-950/40'
                      : isInProgress
                      ? 'bg-[#0a1220] border-amber-500/60 shadow-xl shadow-amber-950/30'
                      : 'bg-[#050810] border-slate-800'
                  }`}
                >
                  {/* Status Indicator Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      PHASE 0{idx + 1}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                          : isInProgress
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/40 animate-pulse'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className="text-base font-bold text-white font-sans mb-2 group-hover:text-cyan-300 transition-colors">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  {/* Date & Completion Icon */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-500">{stage.date}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isInProgress ? (
                      <Clock className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Flag className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Presentation Notice */}
        <div className="mt-14 p-6 rounded-2xl bg-[#060b16] border border-cyan-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">
                Ready for Review & External Examiner Inspection
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Every fabrication milestone is accompanied by photo documentation, bench log files, and CAD vector source files.
              </p>
            </div>
          </div>

          <a
            href="#team"
            className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Meet the Research Team →
          </a>
        </div>
      </div>
    </section>
  );
}
