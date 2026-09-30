"use client";

import React, { useState } from "react";
import { Award, Feather, Heart, Sparkles, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { festAudio } from "@/lib/festAudio";

interface ContingentStanding {
  rank: string;
  college: string;
  points: number;
  laurels: string;
  cheers: number;
}

const MALHAR_STANDINGS: ContingentStanding[] = [
  { rank: "01", college: "HR COLLEGE OF COMMERCE & ECONOMICS", points: 480, laurels: "6 Golds • LAPA & LIT Champions", cheers: 540 },
  { rank: "02", college: "MITHIBAI COLLEGE", points: 435, laurels: "5 Golds • Drama & Vogue Winners", cheers: 490 },
  { rank: "03", college: "SOPHIA COLLEGE FOR WOMEN", points: 390, laurels: "4 Golds • Fine Arts & Oratory", cheers: 420 },
  { rank: "04", college: "JAI HIND COLLEGE", points: 350, laurels: "3 Golds • Band & Street Play", cheers: 380 },
  { rank: "05", college: "NM COLLEGE OF COMMERCE", points: 310, laurels: "3 Golds • Literary Debates", cheers: 310 },
  { rank: "06", college: "ST. STEPHEN'S COLLEGE, DELHI", points: 280, laurels: "2 Golds • National Conclave", cheers: 260 },
];

export default function CampusLeaderboard() {
  const [data, setData] = useState<ContingentStanding[]>(MALHAR_STANDINGS);

  const handleCheer = (collegeName: string) => {
    festAudio.playSitarPluck(466.16);
    setData((prev) =>
      prev.map((c) => (c.college === collegeName ? { ...c, cheers: c.cheers + 1 } : c))
    );

    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.8 },
      colors: ["#D9A94E", "#F7E3AB", "#F405F9"],
    });
  };

  return (
    <section id="conclave" className="py-24 relative overflow-hidden bg-[#060407]/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#d9a94e]">
            <Trophy className="w-3.5 h-3.5 text-[#d9a94e]" />
            <span>The Coveted Laurel</span>
            <Trophy className="w-3.5 h-3.5 text-[#d9a94e]" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-white">
            THE ROLLING <span className="gold-shimmer">SHIELD</span>
          </h2>

          <p className="text-sm sm:text-base text-[#f4ead8]/70 font-montserrat font-light leading-relaxed">
            Live contingent aggregate tally updated as official verdicts are declared by national jury panels in the Quadrangle.
          </p>
        </div>

        {/* Standings Table Card */}
        <div className="malhar-card border border-[#d9a94e]/30 p-2 sm:p-4">
          <div className="divide-y divide-[#d9a94e]/15">
            {data.map((c, idx) => {
              const isTop = idx === 0;

              return (
                <div
                  key={c.college}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isTop ? "bg-[#1f1329]/60 rounded-xl" : "hover:bg-[#130b1c]/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-bold text-sm shrink-0 border ${
                        isTop
                          ? "bg-[#d9a94e] text-[#060407] border-[#f7e3ab] shadow-lg shadow-[#d9a94e]/30"
                          : "bg-[#160c20] text-[#f7e3ab] border-[#d9a94e]/30"
                      }`}
                    >
                      {c.rank}
                    </div>

                    {/* College & Laurels */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
                          {c.college}
                        </h4>
                        {isTop && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-cinzel font-bold tracking-wider bg-[#d9a94e]/20 text-[#f7e3ab] border border-[#d9a94e]/40 hidden sm:inline-block">
                            LEADING CONTINGENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#d9a94e] font-montserrat mt-0.5">
                        {c.laurels}
                      </p>
                    </div>
                  </div>

                  {/* Points & Cheer Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#d9a94e]/10">
                    <div className="text-left sm:text-right">
                      <span className="font-cinzel text-2xl font-bold text-white block">
                        {c.points}
                      </span>
                      <span className="text-[10px] font-montserrat tracking-widest text-[#d9a94e] uppercase block">
                        Aggregate Swara
                      </span>
                    </div>

                    <button
                      onClick={() => handleCheer(c.college)}
                      className="px-4 py-2 rounded-full border border-[#d9a94e]/30 bg-[#160c20] hover:bg-[#d9a94e] hover:text-[#060407] text-[#f7e3ab] text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 shrink-0"
                    >
                      <Heart className="w-3.5 h-3.5 text-[#f405f9]" />
                      <span>{c.cheers} CHEERS</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
