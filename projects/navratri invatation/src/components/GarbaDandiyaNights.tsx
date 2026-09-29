"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Ticket, Sparkles, MapPin, Clock, Users, QrCode, ShieldCheck, Download, Share2, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { navratriAudio } from "@/lib/navratriAudio";

interface PassDetails {
  name: string;
  category: "Couple" | "VIP" | "General";
  nights: "All 9 Nights" | "Weekend Special" | "Single Night";
  passId: string;
}

export default function GarbaDandiyaNights() {
  const [devoteeName, setDevoteeName] = useState("");
  const [category, setCategory] = useState<"Couple" | "VIP" | "General">("Couple");
  const [nights, setNights] = useState<"All 9 Nights" | "Weekend Special" | "Single Night">("All 9 Nights");
  const [generatedPass, setGeneratedPass] = useState<PassDetails | null>({
    name: "Devotee Family",
    category: "Couple",
    nights: "All 9 Nights",
    passId: "GARBA-2026-784219",
  });
  const [passCreated, setPassCreated] = useState(false);

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim()) return;

    const newPass: PassDetails = {
      name: devoteeName.trim(),
      category,
      nights,
      passId: `GARBA-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setGeneratedPass(newPass);
    setPassCreated(true);
    navratriAudio.playDholBeat();

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#D97706", "#DC2626", "#EA580C", "#FBBF24"],
    });

    setTimeout(() => setPassCreated(false), 3000);
  };

  return (
    <section id="garba-pass" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2E1508] border-b border-amber-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-900 text-xs font-bold uppercase tracking-wider">
            <Ticket className="w-3.5 h-3.5 text-red-700" />
            Grand Raas Invitation & Digital Pass
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rozha_One'] text-[#7F1D1D] tracking-tight">
            रास डांडिया एवं गरबा महोत्सव आमंत्रण
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Join thousands of dancers twirling to live Vadodara Dhol rhythms and authentic Sanedo under illuminated festive shamianas. Generate your personalized entry pass below.
          </p>
        </div>

        {/* Event Schedule & Venue Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-start gap-3">
            <span className="text-2xl">🪘</span>
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Live Music</span>
              <h4 className="font-bold text-stone-900 text-sm">Vadodara Dhol Beats</h4>
              <p className="text-xs text-stone-500 mt-0.5">Authentic 3-tali Garba orchestra</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Sacred Venue</span>
              <h4 className="font-bold text-stone-900 text-sm">Jagadamba Grand Lawn</h4>
              <p className="text-xs text-stone-500 mt-0.5">Festive open-air celebration</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-start gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Daily Timings</span>
              <h4 className="font-bold text-stone-900 text-sm">7:30 PM to Midnight</h4>
              <p className="text-xs text-stone-500 mt-0.5">Maha Aarti starts at 7:30 PM</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-start gap-3">
            <span className="text-2xl">👗</span>
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Traditional Attire</span>
              <h4 className="font-bold text-stone-900 text-sm">Chaniya Choli & Kediyu</h4>
              <p className="text-xs text-stone-500 mt-0.5">Wear the 9 daily sacred colors</p>
            </div>
          </div>
        </div>

        {/* Pass Generator Form + Live Pass Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Left */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-amber-300 shadow-md space-y-5">
            <div className="border-b border-amber-200 pb-3">
              <h3 className="text-lg font-bold font-serif text-[#7F1D1D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Create Your Digital Garba Pass</span>
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Instant free pass with verified QR code admission
              </p>
            </div>

            <form onSubmit={handleGeneratePass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Guest / Family Name *
                </label>
                <input
                  type="text"
                  required
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="e.g. Priya & Rahul Patel"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7F1D1D] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Pass Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Couple", "VIP", "General"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setCategory(tier)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        category === tier
                          ? "bg-[#7F1D1D] text-white border-[#7F1D1D] shadow-xs"
                          : "bg-[#FAF7F2] text-stone-700 border-amber-200 hover:bg-amber-100/60"
                      }`}
                    >
                      {tier} {tier === "Couple" ? "👫" : tier === "VIP" ? "👑" : "🎟️"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Duration Access
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["All 9 Nights", "Weekend Special", "Single Night"] as const).map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setNights(dur)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        nights === dur
                          ? "bg-[#B45309] text-white border-[#B45309] shadow-xs"
                          : "bg-[#FAF7F2] text-stone-700 border-amber-200 hover:bg-amber-100/60"
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#991B1B] to-[#B45309] hover:from-[#7F1D1D] hover:to-[#92400E] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98"
              >
                <Ticket className="w-4 h-4 text-amber-200" />
                <span>Generate Pass Badge</span>
              </button>

              {passCreated && (
                <div className="p-2.5 rounded-xl bg-green-50 border border-green-300 text-green-800 text-xs flex items-center justify-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Pass generated successfully! Check the preview on the right.</span>
                </div>
              )}
            </form>
          </div>

          {/* Pass Preview Right */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {generatedPass && (
              <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-amber-300 bg-white shadow-xl relative">
                
                {/* Red Gold Top Header */}
                <div className="p-5 bg-gradient-to-r from-[#7F1D1D] to-[#991B1B] text-white text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200 block">
                    🌼 Official Entry Pass • नवरात्रि २०२६ 🌼
                  </span>
                  <h4 className="text-xl font-bold font-['Rozha_One'] mt-0.5">
                    श्री डांडिया रास महोत्सव
                  </h4>
                  <p className="text-[11px] text-amber-100 mt-0.5">
                    Shree Jagadamba Grand Arena
                  </p>
                </div>

                {/* Pass Content */}
                <div className="p-5 space-y-4 bg-gradient-to-b from-white to-amber-50/30">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                        Pass Holder
                      </span>
                      <h5 className="text-base font-extrabold text-stone-900">
                        {generatedPass.name}
                      </h5>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-red-50 text-[#7F1D1D] text-xs font-bold border border-red-200">
                      {generatedPass.category} Tier
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 font-medium uppercase">Duration</span>
                      <p className="font-bold text-stone-800">{generatedPass.nights}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 font-medium uppercase">Pass Code</span>
                      <p className="font-mono font-bold text-[#7F1D1D]">{generatedPass.passId}</p>
                    </div>
                  </div>

                  {/* QR code and validation badge */}
                  <div className="pt-2 flex items-center justify-between border-t border-amber-200">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-center text-[#7F1D1D]">
                        <QrCode className="w-8 h-8" />
                      </div>
                      <div className="text-[10px] text-stone-600">
                        <span className="font-bold text-stone-900 block">Fast-Track Entry</span>
                        Scan QR at Gate
                      </div>
                    </div>
                    <span className="text-[10px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-2.5 bg-amber-100/70 border-t border-amber-200 text-center text-[10px] text-amber-950 font-bold">
                  Show this pass on your mobile phone at entry • Jay Mataji
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
