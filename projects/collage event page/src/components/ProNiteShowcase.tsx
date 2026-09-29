"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, MapPin, Check, Music2, Users, Feather } from "lucide-react";
import { festAudio } from "@/lib/festAudio";

interface ProNite {
  id: string;
  tag: string;
  theme: string;
  headliner: string;
  genre: string;
  date: string;
  time: string;
  venue: string;
  capacity: string;
  image: string;
  description: string;
  highlights: string[];
}

const MALHAR_EVENINGS: ProNite[] = [
  {
    id: "01",
    tag: "DUSK 01 // AUGUST 14",
    theme: "ACOUSTIC MONSOON SERENADE",
    headliner: "ANUBHAV & THE FOLK RAGA ENSEMBLE",
    genre: "INDIE ACOUSTIC • CONTEMPORARY SUFI FOLK",
    date: "FRIDAY • AUGUST 14, 2026",
    time: "GATES: 18:00 • LIVE: 19:30",
    venue: "THE HISTORIC QUADRANGLE",
    capacity: "8,000 DELEGATES",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    description: "Intimate acoustic strumming, soulful Sarangi interludes, and choral harmonies echoing under the neo-gothic stone arches as dusk settles over South Mumbai.",
    highlights: ["Sufi Kalaam & Indie Ballads", "Acoustic Fingerstyle Duets", "Fairy Lit Quadrangle Lore"],
  },
  {
    id: "02",
    tag: "DUSK 02 // AUGUST 15",
    theme: "FUSION ODYSSEY & WORLD BEATS",
    headliner: "THE MALHAR SOUND SYSTEM & GUEST MAESTROS",
    genre: "WORLD FUSION • PROGRESSIVE CARNATIC ROCK",
    date: "SATURDAY • AUGUST 15, 2026",
    time: "GATES: 18:00 • LIVE: 19:15",
    venue: "OPEN AIR QUAD AMPHITHEATRE",
    capacity: "12,000 DELEGATES",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    description: "Thunderous Mridangam meets soaring electric guitar melodies. A cross-cultural crescendo bringing collegiate delegations to their feet in unified celebration.",
    highlights: ["Carnatic Shred & Drum Duels", "Brass & Woodwind Brass Section", "Inter-Collegiate Anthem Choir"],
  },
  {
    id: "03",
    tag: "DUSK 03 // AUGUST 16",
    theme: "THE MAJESTIC FINALE & HEADLINE SYMPHONY",
    headliner: "CELEBRATED NATIONAL SINGER-SONGWRITER",
    genre: "SYMPHONIC BOLLYWOOD • TIMELESS CULTURAL ANTHEMS",
    date: "SUNDAY • AUGUST 16, 2026",
    time: "GATES: 17:30 • CEREMONY: 19:00",
    venue: "GRAND ST. XAVIER'S STADIUM",
    capacity: "15,000 DELEGATES",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    description: "The emotional zenith of Malhar 2026. Presentation of the National Rolling Trophy followed by a two-hour headline performance that has defined collegiate memories since 1979.",
    highlights: ["Rolling Shield Presentation", "Grand 24-Piece Chamber Ensemble", "Golden Confetti Monsoon Shower"],
  },
];

export default function ProNiteShowcase() {
  const [selectedNight, setSelectedNight] = useState<string>("01");
  const [reservedNights, setReservedNights] = useState<string[]>([]);

  const activeNight = MALHAR_EVENINGS.find((n) => n.id === selectedNight) || MALHAR_EVENINGS[0];

  const handleSelectNight = (id: string) => {
    festAudio.playSitarPluck(392.00);
    setSelectedNight(id);
  };

  const handleReserve = (id: string) => {
    festAudio.playGildedChime();
    setReservedNights((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <section id="pronites" className="py-24 relative overflow-hidden bg-[#060407]/60">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#d9a94e]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#d9a94e]">
            <Music2 className="w-3.5 h-3.5 text-[#d9a94e]" />
            <span>The Twilight Amphitheatre</span>
            <Music2 className="w-3.5 h-3.5 text-[#d9a94e]" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-white">
            MALHAR <span className="gold-shimmer">EVENINGS</span>
          </h2>

          <p className="text-sm sm:text-base text-[#f4ead8]/70 font-montserrat font-light leading-relaxed">
            When dusk falls over St. Xavier's, the Quadrangle transforms into a sanctuary of acoustic serenades, world folk fusion, and headline musical euphoria.
          </p>
        </div>

        {/* Night Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {MALHAR_EVENINGS.map((nite) => {
            const isSelected = nite.id === selectedNight;
            const isReserved = reservedNights.includes(nite.id);

            return (
              <button
                key={nite.id}
                onClick={() => handleSelectNight(nite.id)}
                className={`p-5 rounded-xl border text-left transition-all duration-300 relative ${
                  isSelected
                    ? "bg-gradient-to-b from-[#1f132a] to-[#120a1a] border-[#d9a94e] shadow-xl shadow-[#d9a94e]/15 -translate-y-1"
                    : "bg-[#0f0916]/70 border-[#d9a94e]/20 hover:border-[#d9a94e]/50"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-cinzel text-[#d9a94e] mb-1">
                  <span className="font-bold tracking-widest">{nite.tag}</span>
                  {isReserved && (
                    <span className="text-[10px] text-[#4ade80] flex items-center gap-1 font-montserrat font-semibold">
                      <Check className="w-3 h-3" /> PASS SECURED
                    </span>
                  )}
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white mb-1">
                  {nite.theme}
                </h3>

                <p className="text-xs text-[#f4ead8]/60 font-montserrat line-clamp-1">
                  {nite.headliner}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Night Showcase Card */}
        <div className="malhar-card p-6 sm:p-10 border border-[#d9a94e]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#d9a94e]/30 aspect-4/3 sm:aspect-16/10 lg:aspect-square">
              <Image
                src={activeNight.image}
                alt={activeNight.theme}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060407] via-[#060407]/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold tracking-widest bg-[#d9a94e] text-[#060407] inline-block mb-2">
                  OFFICIAL EVENING SHOWCASE
                </span>
                <p className="text-xs font-montserrat text-[#f7e3ab]">
                  {activeNight.capacity}
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-cinzel tracking-[0.2em] text-[#d9a94e] uppercase">
                  {activeNight.genre}
                </div>
                <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
                  {activeNight.headliner}
                </h3>
                <p className="text-sm sm:text-base text-[#f4ead8]/80 font-montserrat leading-relaxed pt-1">
                  {activeNight.description}
                </p>
              </div>

              {/* Event Time & Venue Meta */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#d9a94e]/20 text-xs font-montserrat">
                <div className="flex items-center gap-2.5 text-[#f4ead8]">
                  <Calendar className="w-4 h-4 text-[#d9a94e] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#d9a94e] block font-cinzel uppercase">Date & Hours</span>
                    <span>{activeNight.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-[#f4ead8]">
                  <MapPin className="w-4 h-4 text-[#d9a94e] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#d9a94e] block font-cinzel uppercase">Collegiate Venue</span>
                    <span>{activeNight.venue}</span>
                  </div>
                </div>
              </div>

              {/* Atmospheric Highlights */}
              <div className="space-y-2">
                <span className="text-[11px] font-cinzel uppercase tracking-widest text-[#d9a94e]">
                  Showcase Elements
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeNight.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-montserrat bg-[#1d1226] text-[#f7e3ab] border border-[#d9a94e]/30"
                    >
                      ✦ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleReserve(activeNight.id)}
                  className={`px-8 py-3.5 rounded-full font-cinzel text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 border flex items-center gap-2 shadow-lg ${
                    reservedNights.includes(activeNight.id)
                      ? "bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]"
                      : "bg-gradient-to-r from-[#d9a94e] via-[#f7e3ab] to-[#d9a94e] text-[#060407] border-[#d9a94e] hover:brightness-110 shadow-[#d9a94e]/20"
                  }`}
                >
                  {reservedNights.includes(activeNight.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>DELEGATE SEAT SECURED FOR {activeNight.tag.split("//")[0]}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>SECURE EVENING WRISTBAND</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
