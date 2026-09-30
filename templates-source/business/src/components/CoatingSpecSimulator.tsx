"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sliders, ShieldCheck, Check, Gauge, ArrowRight, Layers, FileCheck } from "lucide-react";

interface Substrate {
  id: string;
  name: string;
  recommendedPrep: string;
}

interface Chemistry {
  id: string;
  name: string;
  standard: string;
  dft: string;
  curing: string;
  saltSpray: string;
  bestFor: string;
}

interface FinishTexture {
  id: string;
  name: string;
  sheen: string;
  scratchResistance: string;
}

interface ColorSwatch {
  ral: string;
  name: string;
  hex: string;
  isMetallic?: boolean;
}

const SUBSTRATES: Substrate[] = [
  { id: "al", name: "Extruded Aluminum (6063-T6)", recommendedPrep: "7-Stage Acid Etch + Nano-Zirconium Passivation" },
  { id: "ms", name: "Cold Rolled Mild Steel (CRCA)", recommendedPrep: "Grit Blast (SA 2.5) + Hot Zinc Phosphate" },
  { id: "gi", name: "Hot-Dip Galvanized Iron (GI)", recommendedPrep: "Sweep Blast + Degreasing + Nano-Silane Primer" },
  { id: "ss", name: "Stainless Steel (304 / 316)", recommendedPrep: "Garnet Media Blast + Acid De-oxidation" },
];

const CHEMISTRIES: Chemistry[] = [
  {
    id: "poly-super",
    name: "Qualicoat Class 2 Superdurable Polyester",
    standard: "AAMA 2604 / ISO 2810 (10-Yr Florida Exposure)",
    dft: "65 – 85 µm",
    curing: "190°C • 12 mins PMT",
    saltSpray: "1,500 Hours (ASTM B117)",
    bestFor: "Architectural curtain walls, exterior louvers & coastal infrastructure",
  },
  {
    id: "epoxy-hybrid",
    name: "Epoxy-Polyester Engineering Hybrid",
    standard: "DIN 55633 / ISO 12944-C3",
    dft: "60 – 75 µm",
    curing: "180°C • 10 mins PMT",
    saltSpray: "1,000 Hours (ASTM B117)",
    bestFor: "Electrical switchgear enclosures, server racks & indoor automotive subframes",
  },
  {
    id: "pure-epoxy",
    name: "High-Build Anti-Corrosion Pure Epoxy",
    standard: "ASTM G8 / ISO 12944-C5I (Severe Industrial)",
    dft: "90 – 120 µm",
    curing: "200°C • 15 mins PMT",
    saltSpray: "2,000 Hours (ASTM B117)",
    bestFor: "Heavy agricultural equipment, EV battery enclosures & chemical pumps",
  },
  {
    id: "pu-anti-graffiti",
    name: "Polyurethane TGIC-Free High-Crosslink",
    standard: "Qualicoat Class 1 / ASTM D6578 (Anti-Graffiti)",
    dft: "70 – 90 µm",
    curing: "195°C • 14 mins PMT",
    saltSpray: "1,200 Hours (ASTM B117)",
    bestFor: "Transit coach panels, urban street furniture & public infrastructure",
  },
];

const FINISHES: FinishTexture[] = [
  { id: "satin", name: "Smooth Satin", sheen: "60% ± 5 GU", scratchResistance: "Standard 2H" },
  { id: "matte", name: "Architectural Dead Matte", sheen: "25% ± 5 GU", scratchResistance: "Refined 2H" },
  { id: "fine-tex", name: "Fine Sand Micro-Texture", sheen: "15% ± 3 GU", scratchResistance: "Superior 3H (Anti-Mar)" },
  { id: "coarse-tex", name: "Heavy Stucco Ripple", sheen: "30% ± 5 GU", scratchResistance: "Heavy Duty 4H (Hides Welds)" },
];

const SWATCHES: ColorSwatch[] = [
  { ral: "RAL 7016", name: "Anthracite Grey", hex: "#383E42" },
  { ral: "RAL 9005", name: "Jet Black Deep Matte", hex: "#181818" },
  { ral: "RAL 9016", name: "Traffic White Pure", hex: "#F3F3ED" },
  { ral: "RAL 7035", name: "Light Electrical Grey", hex: "#D7D7D7" },
  { ral: "DB 703", name: "Metallic Iron Glimmer", hex: "#4B4D4F", isMetallic: true },
  { ral: "RAL 5010", name: "Gentian Industrial Blue", hex: "#0E477D" },
];

export default function CoatingSpecSimulator() {
  const [substrate, setSubstrate] = useState<string>("al");
  const [chemistry, setChemistry] = useState<string>("poly-super");
  const [finish, setFinish] = useState<string>("satin");
  const [color, setColor] = useState<string>("RAL 7016");

  const selectedSub = SUBSTRATES.find((s) => s.id === substrate) || SUBSTRATES[0];
  const selectedChem = CHEMISTRIES.find((c) => c.id === chemistry) || CHEMISTRIES[0];
  const selectedFin = FINISHES.find((f) => f.id === finish) || FINISHES[0];
  const selectedClr = SWATCHES.find((s) => s.ral === color) || SWATCHES[0];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-xs font-mono-spec font-bold text-blue-700 uppercase tracking-wider">
              Engineering Specification Calculator
            </span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Coating Specification & Finish Simulator
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-sans max-w-sm">
          Select substrate, powder chemistry, and sheen level to generate certified ASTM film thickness and curing parameters.
        </p>
      </div>

      {/* Simulator Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Substrate Selection */}
          <div>
            <label className="block text-xs font-mono-spec font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Base Substrate Alloy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SUBSTRATES.map((sub) => {
                const isSelected = substrate === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSubstrate(sub.id)}
                    className={`p-3 text-left border rounded-lg text-xs transition-all ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-600"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-display font-bold block text-sm">{sub.name}</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {sub.recommendedPrep.split("+")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Powder Chemistry Grade */}
          <div>
            <label className="block text-xs font-mono-spec font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Powder Chemistry & Standard
            </label>
            <div className="space-y-2">
              {CHEMISTRIES.map((chem) => {
                const isSelected = chemistry === chem.id;
                return (
                  <button
                    key={chem.id}
                    type="button"
                    onClick={() => setChemistry(chem.id)}
                    className={`w-full p-3 text-left border rounded-lg text-xs transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-600"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <span className="font-display font-bold block text-sm">{chem.name}</span>
                      <span className="font-mono-spec text-[11px] text-blue-700 font-semibold block mt-0.5">
                        {chem.standard}
                      </span>
                    </div>
                    <span className="font-mono-spec text-xs font-semibold text-slate-600 shrink-0">
                      {chem.dft}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Surface Sheen & Texture */}
          <div>
            <label className="block text-xs font-mono-spec font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Sheen Level & Texture Profile
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FINISHES.map((fin) => {
                const isSelected = finish === fin.id;
                return (
                  <button
                    key={fin.id}
                    type="button"
                    onClick={() => setFinish(fin.id)}
                    className={`p-2.5 text-center border rounded-lg text-xs transition-all ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-600"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-display font-bold block text-xs">{fin.name}</span>
                    <span className="font-mono-spec text-[10px] text-slate-500 block mt-1">
                      {fin.sheen}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. RAL Color Selection */}
          <div>
            <label className="block text-xs font-mono-spec font-bold text-slate-700 uppercase tracking-wider mb-2">
              4. Standard Industrial RAL Swatch
            </label>
            <div className="flex flex-wrap gap-2">
              {SWATCHES.map((swatch) => {
                const isSelected = color === swatch.ral;
                return (
                  <button
                    key={swatch.ral}
                    type="button"
                    onClick={() => setColor(swatch.ral)}
                    className={`px-3 py-2 border rounded-md text-xs font-mono-spec flex items-center gap-2 transition-all ${
                      isSelected
                        ? "bg-white border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-600 font-bold"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-sm border border-slate-300 shrink-0 shadow-inner"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span>{swatch.ral}</span>
                    {swatch.isMetallic && (
                      <span className="text-[10px] text-blue-600 font-bold">MICA</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Live Spec Sheet Output (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
            
            {/* Header of Spec Sheet */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <span className="font-display font-bold text-sm text-slate-900 uppercase tracking-wider">
                  Technical Spec Sheet
                </span>
              </div>
              <span className="pro-tag">
                VG-{(color.replace(/\s+/g, '') + substrate).toUpperCase()}
              </span>
            </div>

            {/* Visual Sample Plate */}
            <div
              className="relative rounded-lg p-5 overflow-hidden shadow-inner border border-slate-300"
              style={{ backgroundColor: selectedClr.hex }}
            >
              <div className="relative z-10 flex flex-col justify-between h-24">
                <div className="flex items-center justify-between">
                  <span className="font-mono-spec text-xs font-bold px-2 py-0.5 rounded bg-black/75 text-white backdrop-blur-sm">
                    {selectedClr.ral} • {selectedClr.name}
                  </span>
                  <span className="font-mono-spec text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                    {selectedFin.name.toUpperCase()}
                  </span>
                </div>

                <div className="font-mono-spec text-xs text-white/95 bg-black/75 p-2 rounded backdrop-blur-sm">
                  <span>Target DFT: <strong>{selectedChem.dft}</strong></span> • <span>Curing: <strong>{selectedChem.curing.split("•")[0]}</strong></span>
                </div>
              </div>
            </div>

            {/* Spec Parameters Table */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Pre-treatment Chemical:</span>
                <span className="text-slate-900 font-semibold text-right max-w-[210px] line-clamp-1 font-mono-spec">
                  {selectedSub.recommendedPrep}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Nominal Thickness:</span>
                <span className="text-blue-700 font-bold font-mono-spec">{selectedChem.dft}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Curing Schedule:</span>
                <span className="text-slate-900 font-semibold font-mono-spec">{selectedChem.curing}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Salt Spray Rating:</span>
                <span className="text-emerald-700 font-bold font-mono-spec">{selectedChem.saltSpray}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Hardness Rating:</span>
                <span className="text-slate-900 font-semibold font-mono-spec">{selectedFin.scratchResistance}</span>
              </div>

              <div className="pt-2">
                <span className="text-slate-500 block text-[11px] mb-1 font-medium">Application Scope:</span>
                <p className="text-slate-700 text-xs leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                  {selectedChem.bestFor}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <Link
                href={`/contact?spec=${encodeURIComponent(
                  `${selectedSub.name} | ${selectedChem.name} | ${selectedClr.ral} | ${selectedFin.name}`
                )}`}
                className="btn-primary-blue w-full text-center text-xs py-3"
              >
                Apply Spec To RFQ Estimate
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
