import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, Layers, CheckCircle2, Factory, Activity, Microscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Plant Facility, Leadership & Quality Testing Lab | Vanguard Surface Finishing",
  description: "Founded in 2004 in Chakan MIDC, Pune. Operating 65,000 sq.ft of automated conveyor powder coating, 8.5m heavy batch ovens, and an ISO 9001:2015 accredited metallurgical laboratory.",
};

export default function AboutPage() {
  const leadership = [
    {
      name: "Dilip K. Deshmukh",
      title: "Founder & Managing Director",
      creds: "M.Tech Metallurgy (IIT Kharagpur) • 34+ Years Experience",
      bio: "Founded Vanguard in 2004 after serving as Senior Metallurgical Consultant at Bharat Forge and Tata Motors. Pioneer in industrializing hex-chrome free pre-treatment for automotive chassis in the Pune industrial belt.",
    },
    {
      name: "Dr. Sunita Kulkarni",
      title: "Head of Testing Laboratory & Metallurgy",
      creds: "PhD Applied Surface Chemistry (NCL Pune) • Qualicoat Inspector",
      bio: "Oversees chemical bath titration, ASTM B117 salt spray chambers, cross-hatch shear validation, and vendor powder qualification for all architectural facade projects.",
    },
    {
      name: "Sandeep R. Sawant",
      title: "Director of Plant Operations & Logistics",
      creds: "B.E. Mechanical Engineering • 22 Years Industrial Finishing",
      bio: "Manages our two continuous overhead conveyor lines, dry-off ovens, automated powder recovery cyclones, and heavy 40-tonne trailer logistics at Chakan Gate 1.",
    },
    {
      name: "Amitav Sen",
      title: "Chief Architectural Finishing Specialist",
      creds: "AAMA 2604 Certified Lead • 18 Years Façade Engineering",
      bio: "Directly advises architects, facade consultants, and curtain-wall contractors on Florida weathering exposure, thermal expansion tolerances, and custom RAL delta E tolerances.",
    },
  ];

  const labEquipment = [
    { name: "Ascott CC1000 Salt Fog Chamber", use: "Continuous ASTM B117 & ISO 9227 cyclic corrosion exposure up to 3,000 hours" },
    { name: "Datapaq Q18 Oven Tracker", use: "6-channel thermal profiling logger measuring Peak Metal Temperature (PMT) across 8.5m oven length" },
    { name: "Elcometer 456 Digital Gauges", use: "NIST-traceable eddy current and magnetic induction dry film thickness (DFT) measurement (±1% accuracy)" },
    { name: "BYK-Gardner Micro-TRI-Gloss", use: "Triple angle (20°, 60°, 85°) gloss measurement for architectural matte, satin, and gloss consistency" },
    { name: "Taber 5135 Rotary Abraser", use: "Abrasion resistance verification using CS-10 Calibrase wheels under 1,000g load (ASTM D4060)" },
    { name: "X-Rite Ci64 Spectrophotometer", use: "Spherical spectral reflectance analysis calculating delta E color variance down to 0.15" },
  ];

  return (
    <div className="space-y-20 py-12">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>CORPORATE HERITAGE & TESTING LAB</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">
            22 Years of Industrial Finishing Discipline
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            From a single manual batch booth in 2004 to a 65,000 sq.ft continuous conveyorized facility in Chakan MIDC. Built on metallurgical rigor, calibrated test coupons, and zero compromise on dry film thickness.
          </p>
        </div>
      </section>

      {/* 2. Plant Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              The Evolution of Vanguard Surface Finishing
            </h2>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-sans">
              <p>
                In 2004, when automobile OEMs and heavy engineering fabricators in Pune were struggling with unpredictable wet-paint flaking and salt-spray failures, Vanguard was established in Chakan with a clear mandate: treat powder coating as a precision metallurgical discipline rather than a cosmetic afterthought.
              </p>
              <p>
                We invested early in an automated 7-stage chemical pre-treatment tunnel. Recognizing that 90% of coating failures happen at the microscopic interface between raw metal and polymer, we became one of Maharashtra’s first coaters to transition entirely away from toxic hexavalent chromium to environmentally benign nano-zirconium conversion chemistry.
              </p>
              <p>
                Today, our two automated conveyor lines and our 8.5-meter curing oven process over 4.2 million square feet of critical components annually—from metro station facade louvers and commercial skyscraper aerofoils to heavy mining excavator arms and electric vehicle battery enclosures.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <span className="font-mono-spec text-3xl font-bold text-blue-700">65,000</span>
                <span className="text-xs font-semibold text-slate-700 block mt-1">Sq.Ft Enclosed Facility</span>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <span className="font-mono-spec text-3xl font-bold text-blue-700">100%</span>
                <span className="text-xs font-semibold text-slate-700 block mt-1">Batch Traceability via QR</span>
              </div>
            </div>
          </div>

          {/* Plant Accreditations Box */}
          <div className="lg:col-span-5 pro-card p-6 sm:p-8 space-y-6 bg-slate-50/50">
            <h3 className="font-display font-bold text-xl text-slate-900 border-b border-slate-200 pb-3">
              Certified Plant Accreditations
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <span className="text-blue-700 font-bold block font-mono-spec">ISO 9001:2015 QUALITY MANAGEMENT</span>
                <p className="text-slate-600">Certified by TUV NORD under certificate number 44 100 200481 for industrial powder coating and metal surface protection.</p>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-200">
                <span className="text-blue-700 font-bold block font-mono-spec">QUALICOAT CLASS 2 SEASIDE ENDORSEMENT</span>
                <p className="text-slate-600">Independent bi-annual testing confirming superior weatherability and corrosion resistance on architectural aluminum profiles.</p>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-200">
                <span className="text-blue-700 font-bold block font-mono-spec">ZERO LIQUID DISCHARGE (ZLD) ETP</span>
                <p className="text-slate-600">Maharashtra Pollution Control Board (MPCB) verified effluent treatment plant recycling 94% of chemical rinse waters back into the closed loop.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Leadership & Engineering Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono-spec uppercase tracking-wider text-blue-700 font-bold block mb-1">
            Plant Leadership
          </span>
          <h2 className="font-display font-bold text-3xl text-slate-900">
            Metallurgical & Operations Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((leader, idx) => (
            <div key={idx} className="pro-card p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div>
                <strong className="font-display font-bold text-xl text-slate-900 block">
                  {leader.name}
                </strong>
                <span className="text-xs font-semibold text-blue-700 block mt-0.5">
                  {leader.title}
                </span>
                <span className="font-mono-spec text-[11px] text-slate-500 block mb-3">
                  {leader.creds}
                </span>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. QA Testing Lab Equipment */}
      <section id="qa-lab" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono-spec uppercase tracking-wider text-blue-700 font-bold block mb-1">
            In-House Metallurgy Lab
          </span>
          <h2 className="font-display font-bold text-3xl text-slate-900">
            Calibrated Laboratory Testing Apparatus
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            We don’t outsource quality control. Every parameter—from chemical bath titration to ASTM B117 salt fog acceleration—is measured in our temperature-controlled on-site laboratory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labEquipment.map((eq, idx) => (
            <div key={idx} className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-2">
              <span className="font-display font-bold text-sm text-slate-900 block">
                {eq.name}
              </span>
              <p className="text-xs text-slate-600 leading-normal font-sans">
                {eq.use}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
