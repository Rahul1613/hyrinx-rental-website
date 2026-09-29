"use client";

import React, { useState } from "react";
import { ChevronDown, MapPin, Feather, Sparkles, Compass } from "lucide-react";
import { festAudio } from "@/lib/festAudio";

interface FAQ {
  q: string;
  a: string;
}

const MALHAR_FAQS: FAQ[] = [
  {
    q: "WHAT IS THE HERITAGE & ORIGIN OF MALHAR?",
    a: "Founded in 1979 by the students of St. Xavier's College (Autonomous), Mumbai, Malhar takes its name from Raag Megh Malhar—the Indian classical raga associated with torrential monsoon rains. Over 47 editions, it has grown into Asia's foremost inter-collegiate cultural festival, pioneering youth expression across literature, performing arts, fine arts, and social conclaves.",
  },
  {
    q: "HOW IS THE COVETED MALHAR ROLLING TROPHY CALCULATED?",
    a: "The prestigious Rolling Trophy is awarded to the college contingent that garners the highest cumulative aggregate points across all competitive tracks (LAPA, LIT, FA, and ETC). First place secures 10 points, second secures 7 points, and third secures 5 points. Extra bonus points are credited for fair play and full-department contingent representation.",
  },
  {
    q: "WHAT ARE THE ENTRY REQUIREMENTS AT THE ST. XAVIER'S GATES?",
    a: "Entry is granted to bonafide college delegates possessing a verified Malhar Delegate Passport alongside their official Physical College Student ID card. Gates open at 08:30 AM daily on Mahapalika Marg and 1st Marine Street.",
  },
  {
    q: "ARE GENERAL STUDENTS ALLOWED TO ATTEND THE MALHAR CONCLAVE?",
    a: "Yes. The Malhar Conclave sessions in the College Auditorium are open to all accredited students and faculty on a first-come, first-seated basis. Keynotes feature celebrated journalists, public intellectuals, directors, and cultural icons with live Q&A opportunities.",
  },
  {
    q: "WHAT CULTURAL SANCTUARIES & FOOD BAZAARS OPERATE ON CAMPUS?",
    a: "The iconic Xavier's Canteen, Foyer Chai Corners, and the Student Artisan Flea Market operate throughout the festival from 09:00 AM to 09:00 PM, serving legendary Mumbai monsoon snacks, artisanal keepsakes, festival merchandise, and hand-crafted cultural zines.",
  },
];

export default function CampusFaqMap() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    festAudio.playMonsoonDrop();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#d9a94e]">
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
            <span>Campus Lore & Protocols</span>
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-white">
            THE XAVIER'S <span className="gold-shimmer">SANCTUARY</span>
          </h2>

          <p className="text-sm sm:text-base text-[#f4ead8]/70 font-montserrat font-light leading-relaxed">
            Essential directives on contingent accreditations, historical campus landmarks, and guidelines under the gothic arches.
          </p>
        </div>

        {/* Campus Quadrants Directory */}
        <div className="malhar-card p-6 sm:p-8 border border-[#d9a94e]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d9a94e]/20 pb-4">
            <div>
              <span className="text-[10px] font-cinzel tracking-widest text-[#d9a94e] uppercase block">
                CAMPUS DIRECTORY
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-0.5">
                HISTORIC CAMPUS SANCTUARIES
              </h3>
            </div>
            <span className="text-xs font-montserrat text-[#f4ead8]/60 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d9a94e]" />
              St. Xavier's College, 5 Mahapalika Marg, Mumbai
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#140c1e] border border-[#d9a94e]/20 space-y-1.5">
              <span className="text-[10px] font-cinzel text-[#d9a94e] font-bold block">QUADRANT 01</span>
              <strong className="font-cinzel text-white block text-sm">THE CENTRAL QUADRANGLE</strong>
              <p className="text-xs text-[#f4ead8]/60 font-montserrat">Nukkad Natak, flag hoisting, and collegiate gathering under stone arches</p>
            </div>

            <div className="p-4 rounded-xl bg-[#140c1e] border border-[#d9a94e]/20 space-y-1.5">
              <span className="text-[10px] font-cinzel text-[#d9a94e] font-bold block">QUADRANT 02</span>
              <strong className="font-cinzel text-white block text-sm">THE FOYER GALLERIES</strong>
              <p className="text-xs text-[#f4ead8]/60 font-montserrat">Live Fine Arts easel painting, installations & student craft bazaar</p>
            </div>

            <div className="p-4 rounded-xl bg-[#140c1e] border border-[#d9a94e]/20 space-y-1.5">
              <span className="text-[10px] font-cinzel text-[#d9a94e] font-bold block">QUADRANT 03</span>
              <strong className="font-cinzel text-white block text-sm">CHAPEL HALL & LIBRARY</strong>
              <p className="text-xs text-[#f4ead8]/60 font-montserrat">Sur-Sangam classical vocals, Parliamentary debates and elocution</p>
            </div>

            <div className="p-4 rounded-xl bg-[#140c1e] border border-[#d9a94e]/20 space-y-1.5">
              <span className="text-[10px] font-cinzel text-[#d9a94e] font-bold block">QUADRANT 04</span>
              <strong className="font-cinzel text-white block text-sm">THE XAVIER WOODS</strong>
              <p className="text-xs text-[#f4ead8]/60 font-montserrat">Acoustic unplugged sets, chai circles and literary slam poetry</p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {MALHAR_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="malhar-card overflow-hidden border border-[#d9a94e]/25 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-cinzel text-xs sm:text-sm font-bold text-white hover:text-[#f7e3ab] transition-colors"
                >
                  <span className="tracking-wide">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#d9a94e] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#f7e3ab]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#f4ead8]/75 leading-relaxed font-montserrat border-t border-[#d9a94e]/15 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
