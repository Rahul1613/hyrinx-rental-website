'use client';

import React from 'react';
import { useTrip } from '@/lib/tripStore';
import { Wallet, PieChart, Info, ShieldCheck, Sparkles } from 'lucide-react';

export default function BudgetVisualization() {
  const { currentTrip, calculateBudgetBreakdown } = useTrip();
  const breakdown = calculateBudgetBreakdown();

  const total = breakdown.total || 1;
  const stayPct = Math.round((breakdown.staysTotal / total) * 100);
  const expPct = Math.round((breakdown.experiencesTotal / total) * 100);
  const foodPct = Math.round((breakdown.foodTotal / total) * 100);
  const transPct = Math.round((breakdown.transportTotal / total) * 100);

  return (
    <section id="budget-section" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
              <Wallet className="w-3.5 h-3.5" />
              <span>Investment Breakdown</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
              Trip Budget Architecture
            </h2>
            <p className="mt-3 text-white/65 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Real-time estimated cost architecture based on your selected stays, signature experiences, and local transit. Recalculates dynamically as you customize your journey.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-white/50 block font-light">ESTIMATED TRIP TOTAL</span>
            <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-300">
              ${breakdown.total.toLocaleString()}
            </span>
            <span className="text-xs text-white/40 block mt-1">
              For {currentTrip.travelers.adults} Adults ({currentTrip.totalDays} Days)
            </span>
          </div>
        </div>

        {/* Dynamic Multi-Category Progress Bar */}
        <div className="mb-12">
          <div className="h-4 w-full bg-[#111726] rounded-full overflow-hidden flex border border-white/10 p-0.5">
            <div
              style={{ width: `${stayPct}%` }}
              className="h-full bg-amber-400 rounded-l-full transition-all duration-500"
              title={`Stays: ${stayPct}%`}
            />
            <div
              style={{ width: `${expPct}%` }}
              className="h-full bg-sky-400 transition-all duration-500"
              title={`Experiences: ${expPct}%`}
            />
            <div
              style={{ width: `${foodPct}%` }}
              className="h-full bg-emerald-400 transition-all duration-500"
              title={`Gastronomy: ${foodPct}%`}
            />
            <div
              style={{ width: `${transPct}%` }}
              className="h-full bg-purple-400 rounded-r-full transition-all duration-500"
              title={`Transport: ${transPct}%`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-white/70 mt-3 gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Stays & Ryokans ({stayPct}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              Experiences ({expPct}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Gastronomy ({foodPct}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              Transit & Rail ({transPct}%)
            </span>
          </div>
        </div>

        {/* 4 Detail Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#0d121c] border border-white/10 space-y-2">
            <span className="text-xs text-amber-400 font-medium uppercase tracking-wider">Accommodation</span>
            <div className="font-serif text-3xl font-bold text-white">${breakdown.staysTotal.toLocaleString()}</div>
            <p className="text-xs text-white/55 leading-relaxed font-light">
              Includes {currentTrip.stays.filter((s) => s.selected).length} curated boutique hotels and traditional ryokans.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d121c] border border-white/10 space-y-2">
            <span className="text-xs text-sky-400 font-medium uppercase tracking-wider">Experiences</span>
            <div className="font-serif text-3xl font-bold text-white">${breakdown.experiencesTotal.toLocaleString()}</div>
            <p className="text-xs text-white/55 leading-relaxed font-light">
              Includes {currentTrip.experiences.filter((e) => e.selected).length} private tea ceremonies, helicopter flights, and guided walks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d121c] border border-white/10 space-y-2">
            <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Gastronomy</span>
            <div className="font-serif text-3xl font-bold text-white">${breakdown.foodTotal.toLocaleString()}</div>
            <p className="text-xs text-white/55 leading-relaxed font-light">
              Estimated budget for omakase counters, seasonal tasting menus, and regional delicacies.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d121c] border border-white/10 space-y-2">
            <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">Transit & Rail</span>
            <div className="font-serif text-3xl font-bold text-white">${breakdown.transportTotal.toLocaleString()}</div>
            <p className="text-xs text-white/55 leading-relaxed font-light">
              Includes high-speed Shinkansen bullet trains, regional express rail, and local transfers.
            </p>
          </div>
        </div>

        {/* Informative Note */}
        <div className="mt-8 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3 text-xs text-white/60">
          <Info className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            <strong>Interactive Estimation:</strong> All figures update in real-time as you toggle stays, culinary stops, and activities. ROAM operates as a pure frontend planning prototype.
          </span>
        </div>
      </div>
    </section>
  );
}
