import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Layers, Wrench, ArrowRight, Gauge, Cpu, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Industrial Coating Services & Plant Capabilities | Vanguard Surface Finishing",
  description: "Explore our 5 core industrial coating lines: Qualicoat Class 2 architectural powder coating, heavy equipment dual-coat, 7-stage nano-zirconium pre-treatment, thermal arc spray, and sandblasting.",
};

export default function ServicesPage() {
  const serviceDetails = [
    {
      id: "architectural",
      title: "Architectural Powder Coating",
      standard: "Qualicoat Class 2 • AAMA 2604 & 2605 Approved",
      summary: "High-performance fluoropolymer and superdurable polyester powder coating engineered for exterior building envelopes, extruded curtain-wall mullions, and architectural louvers.",
      specifications: [
        { label: "Approved Substrates", val: "Extruded 6063-T6, Cast Aluminum, Sheet Cladding" },
        { label: "Nominal Film Thickness", val: "65 – 85 µm (Qualicoat standard)" },
        { label: "Oven Curing Cycle", val: "190°C for 12 minutes PMT (Peak Metal Temp)" },
        { label: "Accelerated Weathering", val: "Florida 5-Year & 10-Year Exposure Tested" },
        { label: "Salt Spray ASTM B117", val: "1,500 Hours Min with Zero Blistering" },
        { label: "Warranty Coverage", val: "15 to 25 Years Exterior Commercial Warranty" },
      ],
      idealFor: "Commercial towers, airport terminal curtain walls, louvers, window profiles, and facade panels.",
    },
    {
      id: "heavy-equipment",
      title: "Heavy Equipment Dual-Coat (Epoxy + Polyurethane)",
      standard: "ISO 12944-C5I (Severe Industrial Corrosive Atmosphere)",
      summary: "A dual-barrier protective system consisting of a high-zinc epoxy primer coat followed by a chemical and UV-resistant aliphatic polyurethane topcoat.",
      specifications: [
        { label: "Approved Substrates", val: "Heavy Structural Steel, Cast Iron, Forged Arms" },
        { label: "Total System DFT", val: "120 – 160 µm (60µm primer + 80µm topcoat)" },
        { label: "Direct Impact ASTM D2794", val: "50 in-lbs (Zero Flaking or Delamination)" },
        { label: "Pencil Hardness", val: "3H – 4H Surface Scuff Resistance" },
        { label: "Salt Spray ASTM B117", val: "2,000 Hours Continuous Fog Exposure" },
        { label: "Chemical Resistance", val: "Resistant to Diesel, Hydraulic Fluids, Battery Acid" },
      ],
      idealFor: "Earthmoving excavator booms, commercial tractor chassis, mining trucks, and EV bus subframes.",
    },
    {
      id: "pre-treatment",
      title: "Automated 7-Stage Pre-Treatment",
      standard: "Nano-Zirconium Passivation & Hot Zinc Phosphate",
      summary: "Conveyorized immersion and spray tunnel delivering chemical conversion coating that increases mechanical surface energy by 300% for flawless powder cross-linking.",
      specifications: [
        { label: "Stage 1 & 2", val: "High-Alkaline De-greasing & Oil Skimming (65°C)" },
        { label: "Stage 3", val: "Cascading Demineralized Water Rinse" },
        { label: "Stage 4", val: "Acid Etching & Oxide De-oxidation (Pickling)" },
        { label: "Stage 5", val: "Nano-Zirconium / Zinc Phosphate Deposition" },
        { label: "Stage 6 & 7", val: "Pure Reverse Osmosis (RO) Rinse & Moisture Evaporation" },
        { label: "Conductivity Control", val: "RO Final Bath < 15 µS/cm" },
      ],
      idealFor: "All structural mild steel and aluminum parts requiring maximum adhesion and zero corrosion creep.",
    },
    {
      id: "thermal-spray",
      title: "Thermal Zinc Arc Spray Metallizing",
      standard: "SSPC-CS 23.00 / AWS C2.23M Specification",
      summary: "Continuous twin-wire electric arc spraying of molten 85/15 Zinc-Aluminum alloy, providing galvanic sacrificial cathodics to steel structures in harsh environments.",
      specifications: [
        { label: "Wire Formulation", val: "99.9% High-Grade Zinc or 85/15 Zn-Al Alloy" },
        { label: "Applied Thickness", val: "150 – 250 µm Uniform Sacrificial Layer" },
        { label: "Adhesive Bond Strength", val: "> 7.0 MPa Tensile Pull-Off (ASTM D4541)" },
        { label: "Operating Temperature", val: "Cold process: Substrate stays < 120°C (No warping)" },
        { label: "Expected Service Life", val: "40+ Years Without Rust in Marine Climates" },
        { label: "VOC Emissions", val: "100% Solid Metal — Zero Solvents or VOCs" },
      ],
      idealFor: "Marine bridges, offshore cooling jackets, petrochemical flanges, and subsea structural frames.",
    },
    {
      id: "sandblasting",
      title: "Industrial Abrasive Blasting (SA 2.5 Profile)",
      standard: "ISO 8501-1 (Near-White Metal) • SSPC-SP 10",
      summary: "Enclosed automated and manual blast rooms using angular chilled iron grit and garnet media to profile raw fabrications, removing all mill scale, slag, and weld oxidation.",
      specifications: [
        { label: "Surface Cleanliness", val: "SA 2.5 (Near-White Blast Cleaned)" },
        { label: "Surface Anchor Profile", val: "45 – 70 µm Peak-to-Valley (Rz Profile)" },
        { label: "Media Utilized", val: "G-40 Steel Grit & 30/60 Mesh Australian Garnet" },
        { label: "Chamber Envelope", val: "10.0m x 4.0m x 3.5m Blast Enclosure" },
        { label: "Dust Extraction", val: "Pulse-Jet HEPA Filtration System (Zero Silica)" },
        { label: "Turnaround Time", val: "Immediate pre-treatment within 2 hours of blasting" },
      ],
      idealFor: "Castings, heavy structural steel girders, refurbished chassis, and laser-cut thick plate.",
    },
  ];

  const envelopeCapacities = [
    { line: "Automated Conveyor Line 1", envelope: "4.5m (L) x 1.8m (H) x 1.0m (W)", speed: "1.2 to 2.5 m/min", capacity: "12,000 sq.ft / 24h" },
    { line: "Automated Conveyor Line 2", envelope: "6.0m (L) x 2.2m (H) x 1.2m (W)", speed: "0.8 to 1.8 m/min", capacity: "18,000 sq.ft / 24h" },
    { line: "Heavy Batch Curing Oven 3", envelope: "8.5m (L) x 2.8m (H) x 2.4m (W)", speed: "Programmable soak cycle", capacity: "5 Ton Batch Weight" },
    { line: "Abrasive Grit Blast Room", envelope: "10.0m (L) x 4.0m (H) x 3.5m (W)", speed: "Dual-operator manual + auto", capacity: "Continuous" },
  ];

  return (
    <div className="space-y-20 py-12">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>TECHNICAL DIVISIONS & PRODUCTION LINES</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">
            Industrial Coating Capabilities & Dimensional Specs
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            Operating two high-throughput automated conveyor lines alongside our 8.5-meter heavy batch oven in Chakan MIDC. Every process follows ISO 9001:2015 and Qualicoat Class 2 audited standard operating procedures.
          </p>
        </div>
      </section>

      {/* Envelope Capacities Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="font-display font-bold text-2xl text-slate-900">
          Line Dimensions & Processing Envelopes
        </h2>
        <div className="pro-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="corp-table">
              <thead>
                <tr>
                  <th>Plant Line ID</th>
                  <th>Maximum Component Dimensions (L x H x W)</th>
                  <th>Conveyor Speed / Cycle</th>
                  <th>Throughput Rating</th>
                </tr>
              </thead>
              <tbody>
                {envelopeCapacities.map((c, idx) => (
                  <tr key={idx}>
                    <td className="font-bold text-slate-900">{c.line}</td>
                    <td className="font-mono-spec font-bold text-blue-700 text-xs">{c.envelope}</td>
                    <td className="text-slate-600 font-sans text-xs">{c.speed}</td>
                    <td className="text-slate-500 font-mono-spec text-xs">{c.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Services Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="font-display font-bold text-3xl text-slate-900 border-b border-slate-200 pb-4">
          Detailed Coating Line Specifications
        </h2>

        <div className="space-y-10">
          {serviceDetails.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="pro-card p-6 sm:p-10 space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-2">
                  <span className="pro-tag">{service.standard}</span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                    {service.title}
                  </h3>
                </div>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="btn-primary-blue text-xs py-2 px-5 shrink-0"
                >
                  Request Quote for this Line
                </Link>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                {service.summary}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.specifications.map((spec, sIdx) => (
                  <div key={sIdx} className="bg-slate-50 p-4 rounded-lg border border-slate-200/80 space-y-1">
                    <span className="font-mono-spec text-[10px] text-slate-500 uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <strong className="font-mono-spec text-xs text-blue-700 block">
                      {spec.val}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Application Scope */}
              <div className="pt-2 text-xs font-mono-spec text-slate-500 flex items-start gap-2">
                <span className="text-blue-700 font-bold shrink-0">TYPICAL SCOPE:</span>
                <span className="text-slate-700 font-sans">{service.idealFor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Dispatch Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              Need custom RAL formulations or gloss level verification?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Our in-house spectrophotometer lab formulates custom powder batches to delta E &lt; 0.5 within 72 hours.
            </p>
          </div>
          <Link href="/contact" className="btn-primary-blue shrink-0">
            Submit Technical Inquiry
          </Link>
        </div>
      </section>

    </div>
  );
}
