'use client';

import React from 'react';
import { Layers, ShieldCheck, Feather, Scissors, Hammer, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function MaterialSpec() {
  const comparisonData = [
    {
      material: '5 mm Depron Foam',
      density: '33 kg/m³',
      rigidity: 'High (Isotropic)',
      workability: 'Exceptional (Knife / Hot wire)',
      repairability: 'Instant (Foam-tac / Hot glue)',
      selected: true,
    },
    {
      material: 'Balsa Wood',
      density: '120 - 160 kg/m³',
      rigidity: 'High (Grain directional)',
      workability: 'Moderate (Sanding / Slicing)',
      repairability: 'Moderate (Splinter fragile)',
      selected: false,
    },
    {
      material: 'EPP Foam',
      density: '30 - 45 kg/m³',
      rigidity: 'Low (Rubber-like flex)',
      workability: 'Difficult to cut cleanly',
      repairability: 'High',
      selected: false,
    },
    {
      material: 'Carbon Fiber / Epoxy',
      density: '1500 kg/m³',
      rigidity: 'Extreme',
      workability: 'Complex (Molds & Autoclave)',
      repairability: 'Difficult (Structural patch)',
      selected: false,
    },
  ];

  const fabricationSteps = [
    {
      title: '1. Precision CAD Planform Transfer',
      desc: '1:1 scale F-22 Raptor stealth planform CAD vectors printed and transferred onto virgin 5 mm Depron sheets.',
      icon: Scissors,
    },
    {
      title: '2. Carbon Spar Channel Inset',
      desc: '3 mm x 1 mm high-modulus carbon fiber strip inset horizontally across the wing chord to eliminate high-G aero flutter.',
      icon: Hammer,
    },
    {
      title: '3. 45° Beveled Elevon Hinges',
      desc: 'Control surface hinge lines sliced at a 45-degree bevel, bound with reinforced fiber-tape for 40° bi-directional travel.',
      icon: Feather,
    },
    {
      title: '4. Structural Monocoque Assembly',
      desc: 'Fuselage upper and lower decks bonded with low-temperature EVA adhesive, creating a rigid torsion-box fuselage.',
      icon: Layers,
    },
  ];

  return (
    <section id="material" className="py-20 relative bg-[#03060c] border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>MATERIAL SCIENCE // STRUCTURAL INTEGRITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              Airframe Material: 5 mm Depron Foam Sheet
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl font-sans">
              Engineering rationale behind utilizing closed-cell extruded polystyrene (Depron) as the primary aerostructure for the F-22 Raptor scale flight evaluation platform.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-cyan-300 bg-[#07101e] px-4 py-2 rounded-xl border border-cyan-800/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>OPTIMAL STRENGTH-TO-WEIGHT RATIO</span>
          </div>
        </div>

        {/* Deep Feature Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#060a14] border border-cyan-900/40">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-600/40 flex items-center justify-center text-cyan-400 mb-4">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans mb-2">Ultra-Low Aerodynamic Mass</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              At only ~33 kg/m³, 5 mm Depron allows the aircraft to maintain an exceptionally light wing loading, permitting slow, controllable high-alpha flight regimes characteristic of the F-22.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#060a14] border border-cyan-900/40">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-600/40 flex items-center justify-center text-cyan-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans mb-2">Isotropic Flexural Stiffness</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Unlike balsa wood which splits along natural grain boundaries, extruded Depron foam exhibits uniform tensile and compressive strength across both longitudinal and lateral axes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#060a14] border border-cyan-900/40">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-600/40 flex items-center justify-center text-cyan-400 mb-4">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans mb-2">Rapid Prototyping & Field Repair</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Damaged sections during initial taxi or landing test sorties can be excised and cold-welded with zero curing lag, enabling agile iterative test flight cycles without airframe retirement.
            </p>
          </div>
        </div>

        {/* Material Benchmark Comparison Matrix */}
        <div className="bg-[#050810] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800 font-mono text-xs">
            <span className="text-cyan-400 font-bold uppercase tracking-wider">
              MATERIAL TRADE STUDY // QUANTITATIVE BENCHMARK
            </span>
            <span className="text-slate-500">AERODYNAMIC AIRFRAME SELECTION</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4">Material Candidate</th>
                  <th className="py-3 px-4">Density</th>
                  <th className="py-3 px-4">Flexural Rigidity</th>
                  <th className="py-3 px-4">Machinability</th>
                  <th className="py-3 px-4">Field Repairability</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {comparisonData.map((row) => (
                  <tr
                    key={row.material}
                    className={`transition-colors ${
                      row.selected
                        ? 'bg-cyan-950/40 text-cyan-200 font-semibold'
                        : 'text-slate-300 hover:bg-slate-900/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      {row.selected && <Check className="w-4 h-4 text-cyan-400" />}
                      <span>{row.material}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{row.density}</td>
                    <td className="py-3.5 px-4 text-slate-300">{row.rigidity}</td>
                    <td className="py-3.5 px-4 text-slate-300">{row.workability}</td>
                    <td className="py-3.5 px-4 text-slate-300">{row.repairability}</td>
                    <td className="py-3.5 px-4 text-right">
                      {row.selected ? (
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px]">
                          SELECTED AIRFRAME
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Alternate</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fabrication Methodology Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fabricationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="p-5 rounded-xl bg-[#060b14] border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-sans mb-1.5">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
