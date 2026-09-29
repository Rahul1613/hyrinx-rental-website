"use client";

import React, { useState } from "react";
import { Sparkles, Award, Check, Printer, QrCode, Shield, Feather } from "lucide-react";
import confetti from "canvas-confetti";
import { festAudio } from "@/lib/festAudio";

interface PassportRecord {
  name: string;
  college: string;
  role: "CONTINGENT LEADER" | "PERFORMING ARTIST" | "CULTURAL DELEGATE" | "CONCLAVE FELLOW";
  passportNo: string;
  issuedDate: string;
}

export default function DelegatePassGenerator() {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [role, setRole] = useState<PassportRecord["role"]>("CULTURAL DELEGATE");

  const [passport, setPassport] = useState<PassportRecord>({
    name: "Arya Sen",
    college: "St. Xavier's College, Mumbai",
    role: "CONTINGENT LEADER",
    passportNo: "MLH-XXVI-XVR-8041",
    issuedDate: "AUG 14–16, 2026",
  });
  const [issuedNotification, setIssuedNotification] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !college.trim()) return;

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const newRecord: PassportRecord = {
      name: name.trim(),
      college: college.trim(),
      role,
      passportNo: `MLH-XXVI-${college.slice(0, 3).toUpperCase() || "DEL"}-${randomSerial}`,
      issuedDate: "AUG 14–16, 2026",
    };

    setPassport(newRecord);
    setIssuedNotification(true);
    festAudio.playGildedChime();

    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#D9A94E", "#F7E3AB", "#F405F9", "#FFFFFF"],
    });

    setTimeout(() => setIssuedNotification(false), 4000);
  };

  const handlePrint = () => {
    festAudio.playMonsoonDrop();
    window.print();
  };

  return (
    <section id="passport" className="py-24 relative overflow-hidden bg-[#060407]/80">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#f405f9]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#d9a94e]">
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
            <span>Official Accreditation</span>
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-white">
            THE MALHAR <span className="gold-shimmer">PASSPORT</span>
          </h2>

          <p className="text-sm sm:text-base text-[#f4ead8]/70 font-montserrat font-light leading-relaxed">
            Mint your personalized St. Xavier's Collegiate Passport for entry into the Quadrangle, Amphitheatre, and all departmental arenas.
          </p>
        </div>

        {/* Generator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Form Column */}
          <div className="lg:col-span-6 malhar-card p-6 sm:p-8 border border-[#d9a94e]/30">
            <h3 className="font-cinzel text-xl font-bold text-white mb-2">
              Delegate Accreditation Desk
            </h3>
            <p className="text-xs text-[#f4ead8]/70 font-montserrat mb-6">
              Enter your details to generate your verified festival credential.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4 font-montserrat">
              <div>
                <label className="block text-xs font-cinzel text-[#d9a94e] uppercase tracking-wider mb-1.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvi Kulkarni"
                  className="w-full px-4 py-3 rounded-xl border border-[#d9a94e]/30 bg-[#0c0712] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d9a94e]"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#d9a94e] uppercase tracking-wider mb-1.5">
                  College / Institution Name *
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Miranda House, Delhi / IIT Bombay"
                  className="w-full px-4 py-3 rounded-xl border border-[#d9a94e]/30 bg-[#0c0712] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d9a94e]"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#d9a94e] uppercase tracking-wider mb-1.5">
                  Delegation Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as PassportRecord["role"])}
                  className="w-full px-4 py-3 rounded-xl border border-[#d9a94e]/30 bg-[#0c0712] text-sm text-white focus:outline-none focus:border-[#d9a94e]"
                >
                  <option value="CULTURAL DELEGATE">Cultural Delegate</option>
                  <option value="CONTINGENT LEADER">Contingent Leader (CL)</option>
                  <option value="PERFORMING ARTIST">Performing Artist (LAPA)</option>
                  <option value="CONCLAVE FELLOW">Conclave Fellow</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full border border-[#d9a94e] bg-gradient-to-r from-[#d9a94e] via-[#f7e3ab] to-[#d9a94e] text-[#060407] font-cinzel font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#d9a94e]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>SEAL & ISSUE PASSPORT</span>
                </button>
              </div>

              {issuedNotification && (
                <div className="p-3 rounded-xl border border-[#22c55e]/40 bg-[#22c55e]/10 text-center flex items-center justify-center gap-2 text-xs text-[#4ade80] font-cinzel">
                  <Check className="w-4 h-4" />
                  <span>PASSPORT SEALED & AFFIXED TO ARCHIVE</span>
                </div>
              )}
            </form>
          </div>

          {/* Gilded Passport Preview Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* The Vintage Gilded Passport Ticket */}
            <div className="w-full max-w-md rounded-2xl border-2 border-[#d9a94e] bg-gradient-to-br from-[#1b1224] via-[#100918] to-[#07040a] p-7 shadow-2xl relative overflow-hidden text-[#f4ead8]">
              
              {/* Corner Ornaments */}
              <div className="ornament-corner ornament-tl" />
              <div className="ornament-corner ornament-tr" />
              <div className="ornament-corner ornament-bl" />
              <div className="ornament-corner ornament-br" />

              {/* Watermark Crest */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#d9a94e]/10 rounded-full flex items-center justify-center pointer-events-none">
                <span className="font-cinzel-dec text-7xl font-bold text-[#d9a94e]/5">M</span>
              </div>

              {/* Passport Header */}
              <div className="flex items-center justify-between border-b border-[#d9a94e]/30 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#d9a94e] bg-[#2a1b38] flex items-center justify-center">
                    <span className="font-cinzel text-xs font-bold text-[#f7e3ab]">X</span>
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-sm tracking-widest text-[#f7e3ab]">
                      ST. XAVIER'S COLLEGE
                    </h4>
                    <span className="text-[9px] font-montserrat tracking-[0.2em] text-[#d9a94e] uppercase block">
                      Autonomous • Mumbai
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-cinzel tracking-widest text-[#d9a94e] border border-[#d9a94e]/40 px-2 py-0.5 rounded-full">
                  MALHAR '26
                </span>
              </div>

              {/* Passport Body */}
              <div className="space-y-4 relative z-10">
                <div>
                  <span className="text-[10px] font-cinzel text-[#d9a94e] uppercase tracking-wider block">
                    Accredited Holder
                  </span>
                  <div className="font-cinzel text-2xl font-bold text-white tracking-wide">
                    {passport.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-montserrat">
                  <div>
                    <span className="text-[10px] font-cinzel text-[#d9a94e] uppercase tracking-wider block">
                      Institution
                    </span>
                    <span className="font-semibold text-[#f4ead8] line-clamp-1">
                      {passport.college}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-cinzel text-[#d9a94e] uppercase tracking-wider block">
                      Classification
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d9a94e]/20 text-[#f7e3ab] border border-[#d9a94e]/40 inline-block">
                      {passport.role}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-montserrat pt-1">
                  <div>
                    <span className="text-[10px] font-cinzel text-[#d9a94e] uppercase tracking-wider block">
                      Passport Serial
                    </span>
                    <span className="font-mono text-xs text-[#f7e3ab] tracking-wider">
                      {passport.passportNo}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-cinzel text-[#d9a94e] uppercase tracking-wider block">
                      Validity Period
                    </span>
                    <span className="text-white text-xs font-semibold">
                      {passport.issuedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wax Seal & Barcode Footer */}
              <div className="mt-6 pt-4 border-t border-dashed border-[#d9a94e]/30 flex items-center justify-between">
                
                {/* Simulated Crimson Wax Seal */}
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#991b1b] to-[#450a0a] border-2 border-[#f87171]/50 shadow-md shadow-[#991b1b]/40 flex flex-col items-center justify-center text-center rotate-[-6deg]">
                    <span className="text-[8px] font-cinzel font-bold text-[#fecaca] leading-tight tracking-tighter">
                      SEALED
                    </span>
                    <span className="text-[7px] text-[#fca5a5] font-montserrat">
                      1979
                    </span>
                  </div>
                  <span className="text-[10px] font-cinzel text-[#d9a94e]/80 max-w-[90px] leading-tight">
                    Quadrangle Gate Pass
                  </span>
                </div>

                {/* QR Code / Scanner */}
                <div className="p-1.5 rounded-lg bg-white/95 text-black">
                  <QrCode className="w-9 h-9" />
                </div>
              </div>

            </div>

            {/* Print / Save Action */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-5 py-2 rounded-full border border-[#d9a94e]/40 bg-[#160c20] text-[#f7e3ab] text-xs font-cinzel font-bold tracking-wider hover:border-[#d9a94e] hover:bg-[#d9a94e]/10 transition-colors flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5 text-[#d9a94e]" />
                <span>PRINT PASSPORT PASS</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
