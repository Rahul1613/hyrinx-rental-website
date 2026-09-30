"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, Award, Compass, Layers, Filter } from "lucide-react";

interface CaseStudy {
  id: string;
  category: "all" | "architectural" | "automotive" | "heavy" | "marine";
  title: string;
  clientType: string;
  location: string;
  substrate: string;
  coatingSystem: string;
  volume: string;
  keySpecs: string[];
  challenge: string;
  solution: string;
  result: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "pune-metro",
    category: "architectural",
    title: "Pune Metro Line 3 Station Facade Louvers & Canopies",
    clientType: "EPC Façade Infrastructure Contractor",
    location: "Hinjawadi to Shivajinagar Corridor, Pune",
    substrate: "Extruded Aluminum Alloy 6063-T6",
    coatingSystem: "Qualicoat Class 2 Superdurable Polyester (RAL 7016 Anthracite Grey)",
    volume: "18,500 m² (4,200 unique profiles)",
    keySpecs: [
      "DFT: 65 – 80 µm certified",
      "Dead Matte: 20% ± 3 GU",
      "Salt Fog: 1,500h ASTM B117",
      "Cross-Hatch: Class 5B (ASTM D3359)",
    ],
    challenge: "Extreme outdoor monsoon exposure, high urban sulfur dioxide levels, and stringent color consistency across profiles extruded by three different rolling mills.",
    solution: "Conveyorized automated spray using Nordson ColorMax booth with 7-stage acid etch and nano-zirconium pre-treatment. Automated powder flow control kept film thickness within ±6µm.",
    result: "100% first-time acceptance across 14 station packages with zero field rejections over 6 months of continuous site deliveries.",
  },
  {
    id: "ev-chassis",
    category: "automotive",
    title: "Electric Bus High-Voltage Battery Trays & Chassis Subframes",
    clientType: "Commercial EV Bus OEM",
    location: "Chakan Industrial Zone, Pune",
    substrate: "High-Strength Low-Alloy Structural Steel (Domex 500)",
    coatingSystem: "Dual-Coat System: Zinc-Rich Epoxy Primer (60µm) + Aliphatic Polyurethane (80µm)",
    volume: "1,200 Heavy Vehicle Subframe Sets",
    keySpecs: [
      "Total DFT: 140 µm ± 10 µm",
      "Spark Testing: 10kV Dielectric Pass",
      "Salt Spray: 2,000 Hours",
      "Direct Impact: 50 in-lbs Pass",
    ],
    challenge: "Underbody gravel road impact combined with chemical splash resistance against lithium battery coolants and road salts. Complete edge coverage along laser-cut slots.",
    solution: "Automatic grit blasting to SA 2.5 surface profile followed by hot zinc phosphate immersion and high-transfer electro-static powder wrap.",
    result: "Passed 2,000 hours of continuous ASTM B117 salt spray testing with zero blister creep from scribe marks. Approved for production across all electric bus models.",
  },
  {
    id: "heavy-excavator",
    category: "heavy",
    title: "Heavy Excavator Booms & Hydraulic Articulated Arms",
    clientType: "Global Earthmoving Equipment Manufacturer",
    location: "Talegaon MIDC Industrial Hub",
    substrate: "Welded Structural Steel Plate (S355J2, up to 40mm thick)",
    coatingSystem: "High-Solid Polyurethane Topcoat in Safety Orange (RAL 2004) over Pre-treated Primer",
    volume: "350 Boom Assemblies (Batch Oven Line 3)",
    keySpecs: [
      "Thermal Soak: 200°C for 25 mins",
      "DFT: 120 µm Nominal",
      "Hardness: 4H Pencil Resistance",
      "Component Weight: 3.2 Tonnes Each",
    ],
    challenge: "Massive thermal mass of 40mm thick structural steel caused uneven curing on standard batch ovens, leading to paint peeling on previous vendor jobs.",
    solution: "Datapaq 6-channel thermal telemetry logger deployed inside our 8.5m x 2.8m curing oven, calibrating a precise two-stage temperature ramp that ensured true Peak Metal Temperature (PMT).",
    result: "Zero paint delamination under severe job-site quarry stress. Client consolidated their entire Maharashtra boom coating contracts with Vanguard.",
  },
  {
    id: "bkc-aerofoil",
    category: "architectural",
    title: "Commercial Headquarters Aerofoil Sunshades & Mullion Caps",
    clientType: "Commercial Real Estate Developer & Façade Consultant",
    location: "Bandra Kurla Complex (BKC), Mumbai",
    substrate: "Curved Aluminum Sheets & Solid Aerofoil Fins",
    coatingSystem: "Metallic DB 703 Sparkling Iron Mica (AAMA 2605 Specification)",
    volume: "9,400 m² of Exterior Architectural Shading",
    keySpecs: [
      "Color Variance: Delta E < 0.35",
      "Weathering: Florida 10-Year Exposure Spec",
      "Specular Gloss: 35% ± 4 GU",
      "Adhesion: 100% Tape Retention",
    ],
    challenge: "Metallic mica flakes tend to orient unpredictably in manual spray booths, creating visible 'tiger-striping' and color mismatch on curved exterior aerofoils.",
    solution: "Nordson automated reciprocator guns with synchronized corona current and fluidised powder recovery hopper, maintaining uniform electrostatic mica orientation.",
    result: "Spectrophotometer readings showed delta E under 0.35 across all batches. Completed project won the 2025 Architectural Façade Excellence Award.",
  },
  {
    id: "subsea-marine",
    category: "marine",
    title: "Subsea Pipeline Valves & Offshore Splash-Zone Flanges",
    clientType: "Offshore Oil & Gas Service Provider",
    location: "Mumbai Offshore Basin & Coastal Marine Terminal",
    substrate: "Forged Carbon Steel ASTM A105",
    coatingSystem: "Thermal Arc Spray Metallizing (85/15 Zinc-Aluminum 200µm) + High-Build Seal Coat",
    volume: "620 High-Pressure Valve Bodies",
    keySpecs: [
      "Tensile Bond: > 8.2 MPa (ASTM D4541)",
      "Total Thickness: 220 µm Sacrificial Barrier",
      "Cathodic Disbondment: ASTM G8 Pass",
      "Service Life: 35+ Years Marine Rating",
    ],
    challenge: "Aggressive marine splash-zone environment with alternating salt spray, high humidity, and tidal abrasion requiring galvanic cathodic protection without heat distortion.",
    solution: "Twin-wire electric arc spraying keeping substrate core temperature under 110°C, followed by immediate low-viscosity vinyl ester penetration sealer.",
    result: "Approved for deployment on deepwater offshore manifolds with zero galvanic corrosion after 18 months of in-situ subsea inspection.",
  },
];

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState<CaseStudy["category"]>("all");

  const categories = [
    { id: "all", label: "All Engineering Projects" },
    { id: "architectural", label: "Architectural & Façade" },
    { id: "automotive", label: "Automotive & EV Mobility" },
    { id: "heavy", label: "Heavy Earthmoving & Mining" },
    { id: "marine", label: "Marine & Energy" },
  ];

  const filteredStudies =
    selectedFilter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === selectedFilter);

  return (
    <div className="space-y-16 py-12">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>VERIFIED PROJECT PERFORMANCE</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">
            Industrial Case Studies & ASTM Performance Records
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            From metro station louvers and Mumbai commercial skyscrapers to heavy mining excavator booms and EV chassis. Real engineering problems solved with metallurgical precision.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id as CaseStudy["category"])}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-all border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Case Studies Detailed List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className="pro-card p-6 sm:p-10 space-y-8"
          >
            {/* Top Title & Client Metadata */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-2">
                <span className="pro-tag">{study.clientType} • {study.location}</span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                  {study.title}
                </h3>
              </div>

              <div className="shrink-0 text-right font-sans text-xs">
                <span className="text-slate-500 block text-[11px] uppercase font-mono-spec">TOTAL RUN VOLUME</span>
                <strong className="text-blue-700 text-base font-bold">{study.volume}</strong>
              </div>
            </div>

            {/* Substrate & Coating Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono-spec">Base Substrate:</span>
                <strong className="text-slate-900 font-medium">{study.substrate}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono-spec">Applied Coating System:</span>
                <strong className="text-blue-700 font-semibold">{study.coatingSystem}</strong>
              </div>
            </div>

            {/* Challenge & Solution Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <strong className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 block">
                  The Engineering Challenge
                </strong>
                <p className="text-slate-600 leading-relaxed font-sans">
                  {study.challenge}
                </p>
              </div>

              <div className="space-y-1.5">
                <strong className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 block">
                  Vanguard Plant Process
                </strong>
                <p className="text-slate-600 leading-relaxed font-sans">
                  {study.solution}
                </p>
              </div>

              <div className="space-y-1.5">
                <strong className="font-display font-bold text-xs uppercase tracking-wider text-emerald-700 block">
                  ASTM Verified Result
                </strong>
                <p className="text-slate-800 leading-relaxed font-sans font-medium">
                  {study.result}
                </p>
              </div>
            </div>

            {/* Key Lab Specs Chips */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {study.keySpecs.map((spec, sIdx) => (
                  <span key={sIdx} className="pro-tag">
                    {spec}
                  </span>
                ))}
              </div>

              <Link
                href={`/contact?project=${encodeURIComponent(study.title)}`}
                className="btn-secondary-white text-xs py-2 px-4 shrink-0"
              >
                Inquire on similar component specs
              </Link>
            </div>

          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              Have components with strict salt-spray or thickness tolerances?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Send our metallurgists your drawing and tender specification for an immediate technical review.
            </p>
          </div>
          <Link href="/contact" className="btn-primary-blue shrink-0">
            Submit RFQ Drawing
          </Link>
        </div>
      </section>

    </div>
  );
}
