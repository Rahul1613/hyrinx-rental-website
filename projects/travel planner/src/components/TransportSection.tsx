'use client';

import React from 'react';
import { useTrip } from '@/lib/tripStore';
import { Train, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export default function TransportSection() {
  const { currentTrip } = useTrip();

  return (
    <section id="transport-section" className="relative py-24 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
              <Train className="w-3.5 h-3.5" />
              <span>Seamless Movement</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
              How You Move
            </h2>
            <p className="mt-3 text-white/65 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Effortless transit across regions via high-speed Shinkansen bullet trains, panoramic mountain rail, and scenic express corridors.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/30 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>High-Speed Rail Prioritized</span>
          </div>
        </div>

        {/* Transport Corridors List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTrip.transports.map((trans, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0d121c] border border-white/10 hover:border-amber-400/40 transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-4">
                <span>Leg 0{idx + 1}</span>
                <span className="text-white/40">{trans.mode}</span>
              </div>

              {/* From -> To */}
              <div className="flex items-center justify-between gap-3 my-4">
                <span className="font-serif text-xl font-semibold text-white">{trans.from}</span>
                <ArrowRight className="w-4 h-4 text-amber-300 shrink-0 group-hover:translate-x-1 transition-transform" />
                <span className="font-serif text-xl font-semibold text-white">{trans.to}</span>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{trans.duration}</span>
                </span>
                <span className="text-white font-medium">~${trans.cost} / person</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
