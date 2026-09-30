"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, MapPin, Users, Award, X, Check, BookOpen, Feather } from "lucide-react";
import confetti from "canvas-confetti";
import { festAudio } from '@/lib/audio/festAudio';

interface EventItem {
  id: string;
  code: string;
  name: string;
  tagline: string;
  department: "LAPA" | "LIT" | "FA" | "ETC" | "CONCLAVE";
  deptFullName: string;
  trophy: string;
  delegation: string;
  day: string;
  venue: string;
  overview: string;
}

const CULTURAL_EVENTS: EventItem[] = [
  {
    id: "nukkad-natak",
    code: "LAPA // 01",
    name: "NUKKAD NATAK (STREET PLAY)",
    tagline: "High-octane, socially stirring street theatricals echoing across the college arches",
    department: "LAPA",
    deptFullName: "Literary and Performing Arts",
    trophy: "Rolling Shield + ₹65,000",
    delegation: "10–20 Performers",
    day: "DAY 1 • AUG 14",
    venue: "The Central Quadrangle",
    overview: "Acoustic percussion, vocal choruses, and hard-hitting social commentary. Zero artificial amplification. True street theater tradition.",
  },
  {
    id: "classical-jugalbandi",
    code: "LAPA // 02",
    name: "SUR-SANGAM (CLASSICAL JUGALBANDI)",
    tagline: "Vocal, sitar, flute, and tabla classical improvisations exploring monsoon ragas",
    department: "LAPA",
    deptFullName: "Literary and Performing Arts",
    trophy: "Gold Crest + ₹45,000",
    delegation: "2–4 Musicians",
    day: "DAY 2 • AUG 15",
    venue: "The College Chapel Hall",
    overview: "12 minutes of pure raga exploration. Judged on alaap, taan clarity, rhythmic laykari, and swara precision by classical maestros.",
  },
  {
    id: "parliamentary-debate",
    code: "LIT // 01",
    name: "THE MALHAR PARLIAMENTARY DEBATE",
    tagline: "Turncoat & British Parliamentary clash on modern ethics, literature, and society",
    department: "LIT",
    deptFullName: "Literary Arts",
    trophy: "The Xavier Orator Gavel + ₹40,000",
    delegation: "3 Debaters",
    day: "DAY 1 • AUG 14",
    venue: "St. Xavier's Reference Library",
    overview: "Strict 7-minute speaker turns with points of information (POIs). Topics span civil liberties, post-modern art, and geopolitical history.",
  },
  {
    id: "canvas-renaissance",
    code: "FA // 01",
    name: "CANVAS RENAISSANCE (LIVE OIL & ACRYLIC)",
    tagline: "6-hour continuous easel painting capturing the monsoon heritage of Mumbai",
    department: "FA",
    deptFullName: "Fine Arts",
    trophy: "The Palette Laureate + ₹35,000",
    delegation: "Solo Artist",
    day: "DAY 2 • AUG 15",
    venue: "The Stone Foyer Galleries",
    overview: "Canvases (36x24 in) provided. Artists express this year's festival theme using mixed mediums, charcoal, oil, or acrylic layers.",
  },
  {
    id: "great-quiz",
    code: "LIT // 02",
    name: "ILLUMINATI: THE GREAT MALHAR QUIZ",
    tagline: "India's premier college general quiz across history, pop lore, music, and art",
    department: "LIT",
    deptFullName: "Literary Arts",
    trophy: "Golden Quill + ₹30,000",
    delegation: "2 Quizzers",
    day: "DAY 3 • AUG 16",
    venue: "The Main Hall",
    overview: "Written prelims followed by a 6-team high-stakes bounce & pounce on-stage final hosted by eminent national quizmasters.",
  },
  {
    id: "runway-vogue",
    code: "ETC // 01",
    name: "AVANT-GARDE: THE THEATRICAL RUNWAY",
    tagline: "Conceptual couture celebrating sustainable textiles, Indian craft, and dramatic walk",
    department: "ETC",
    deptFullName: "Entertainment & Theatricals",
    trophy: "Haute Grand Prize + ₹75,000",
    delegation: "12–16 Ensemble",
    day: "DAY 3 • AUG 16",
    venue: "The Grand Quad Amphitheatre",
    overview: "15 minutes thematic ramp showcase blending lighting choreography, original soundtrack, and hand-crafted garment storytelling.",
  },
  {
    id: "conclave-roundtable",
    code: "CONCLAVE // 01",
    name: "THE MALHAR KEYNOTE CONCLAVE",
    tagline: "Unscripted dialogues with veteran journalists, writers, activists & cinematic pioneers",
    department: "CONCLAVE",
    deptFullName: "The Malhar Conclave",
    trophy: "Honorary Fellow Medal",
    delegation: "Open to All Delegates",
    day: "DAY 2 • AUG 15",
    venue: "The St. Xavier's Auditorium",
    overview: "Interactive discourse exploring 'The Voice of Contemporary Youth'. Direct Q&A opportunity with distinguished national thought leaders.",
  },
  {
    id: "acoustic-unplugged",
    code: "LAPA // 03",
    name: "WOODS UNPLUGGED (ACOUSTIC ENSEMBLE)",
    tagline: "Raw fingerstyle guitars, violins, cajons, and harmonic vocal polyphonies",
    department: "LAPA",
    deptFullName: "Literary and Performing Arts",
    trophy: "Silver Strings + ₹40,000",
    delegation: "2–6 Musicians",
    day: "DAY 1 • AUG 14",
    venue: "The Xavier Woods Courtyard",
    overview: "Zero synthetic tracks or pre-recorded loops. Clean acoustic arrangements showcasing vocal dynamics and organic instrumentation.",
  },
];

export default function EventsTracksArena() {
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [collegeName, setCollegeName] = useState("");
  const [leadName, setLeadName] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const departments = [
    { id: "ALL", label: "ALL DEPARTMENTS" },
    { id: "LAPA", label: "LAPA (PERFORMING ARTS)" },
    { id: "LIT", label: "LIT (LITERARY ARTS)" },
    { id: "FA", label: "FA (FINE ARTS)" },
    { id: "ETC", label: "ETC (THEATRICALS)" },
    { id: "CONCLAVE", label: "THE CONCLAVE" },
  ];

  const filteredEvents =
    selectedDept === "ALL"
      ? CULTURAL_EVENTS
      : CULTURAL_EVENTS.filter((e) => e.department === selectedDept);

  const handleOpenModal = (event: EventItem) => {
    festAudio.playSitarPluck(293.66);
    setActiveModalEvent(event);
    setRegSuccess(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalEvent || !collegeName || !leadName) return;

    festAudio.playGildedChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D9A94E", "#F405F9", "#F7E3AB"],
    });

    setRegisteredEvents((prev) => [...prev, activeModalEvent.id]);
    setRegSuccess(true);
  };

  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      
      {/* Decorative Gold Filigree Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#d9a94e]">
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
            <span>The Cultural Departments</span>
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-white">
            KINGDOMS OF <span className="gold-shimmer">EXPRESSION</span>
          </h2>

          <p className="text-sm sm:text-base text-[#f4ead8]/70 font-montserrat font-light leading-relaxed">
            From the fiery rhetoric of Literary Arts to the soaring melodies of LAPA, explore the competitive arenas that define Malhar's coveted Rolling Trophy.
          </p>
        </div>

        {/* Filter Department Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {departments.map((dept) => {
            const isActive = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => {
                  festAudio.playMonsoonDrop();
                  setSelectedDept(dept.id);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full font-cinzel text-xs tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-[#d9a94e] text-[#060407] border-[#d9a94e] font-bold shadow-lg shadow-[#d9a94e]/20"
                    : "bg-[#120a1a]/60 text-[#f4ead8]/75 border-[#d9a94e]/25 hover:border-[#d9a94e]/60 hover:text-white"
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((item) => {
            const isRegistered = registeredEvents.includes(item.id);

            return (
              <div
                key={item.id}
                className="malhar-card p-6 flex flex-col justify-between group hover:border-[#d9a94e]/70"
              >
                {/* Corner ornaments */}
                <div className="ornament-corner ornament-tl" />
                <div className="ornament-corner ornament-tr" />
                <div className="ornament-corner ornament-bl" />
                <div className="ornament-corner ornament-br" />

                <div className="space-y-4">
                  {/* Top Dept Label */}
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs font-bold text-[#d9a94e] tracking-widest">
                      {item.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-montserrat font-semibold tracking-wider bg-[#f405f9]/10 text-[#f405f9] border border-[#f405f9]/30">
                      {item.department}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#f7e3ab] transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#f4ead8]/70 font-montserrat leading-relaxed">
                    {item.tagline}
                  </p>

                  {/* Meta Chips */}
                  <div className="pt-2 space-y-2 text-xs font-montserrat text-[#f4ead8]/80 border-t border-[#d9a94e]/15">
                    <div className="flex items-center gap-2 text-[#d9a94e]">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold">{item.trophy}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#f4ead8]/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#d9a94e]/70" />
                        {item.day}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#d9a94e]/70" />
                        {item.venue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 mt-4 border-t border-[#d9a94e]/15 flex items-center justify-between">
                  <span className="text-[11px] font-cinzel text-[#d9a94e]/80">
                    {item.delegation}
                  </span>

                  <button
                    onClick={() => handleOpenModal(item)}
                    className={`px-4 py-1.5 rounded-full font-cinzel text-xs font-bold tracking-wider transition-all duration-300 border flex items-center gap-1.5 ${
                      isRegistered
                        ? "bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]"
                        : "bg-[#1d1226] text-[#f7e3ab] border-[#d9a94e]/40 hover:bg-[#d9a94e] hover:text-[#060407] hover:border-[#d9a94e]"
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>REGISTERED</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>DELEGATE ENTRY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registration & Event Dossier Modal */}
      <AnimatePresence>
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl rounded-2xl border border-[#d9a94e]/60 bg-gradient-to-b from-[#191024] to-[#0a0510] p-6 sm:p-8 shadow-2xl text-[#f4ead8]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#d9a94e] hover:text-white hover:bg-[#d9a94e]/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-cinzel text-[#d9a94e] tracking-widest uppercase">
                  <span>{activeModalEvent.deptFullName}</span>
                  <span>•</span>
                  <span>{activeModalEvent.code}</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {activeModalEvent.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#f4ead8]/80 font-montserrat leading-relaxed">
                  {activeModalEvent.overview}
                </p>

                {/* Event Dossier Grid */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#d9a94e]/20 text-xs font-montserrat">
                  <div>
                    <span className="text-[#d9a94e] font-cinzel block text-[11px] uppercase tracking-wider">
                      Prize & Accolade
                    </span>
                    <span className="font-semibold text-white">{activeModalEvent.trophy}</span>
                  </div>
                  <div>
                    <span className="text-[#d9a94e] font-cinzel block text-[11px] uppercase tracking-wider">
                      Team Capacity
                    </span>
                    <span className="text-white">{activeModalEvent.delegation}</span>
                  </div>
                  <div>
                    <span className="text-[#d9a94e] font-cinzel block text-[11px] uppercase tracking-wider">
                      Scheduled Day
                    </span>
                    <span className="text-white">{activeModalEvent.day}</span>
                  </div>
                  <div>
                    <span className="text-[#d9a94e] font-cinzel block text-[11px] uppercase tracking-wider">
                      Campus Sanctuary
                    </span>
                    <span className="text-white">{activeModalEvent.venue}</span>
                  </div>
                </div>

                {/* Form or Confirmation */}
                {regSuccess ? (
                  <div className="p-4 rounded-xl border border-[#22c55e]/40 bg-[#22c55e]/10 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 text-[#4ade80] flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" />
                    </div>
                    <h4 className="font-cinzel font-bold text-white text-base">
                      DELEGATION REGISTERED
                    </h4>
                    <p className="text-xs text-[#f4ead8]/80 font-montserrat">
                      Official rulebook & reporting token dispatched for{" "}
                      <strong className="text-[#f7e3ab]">{collegeName}</strong>. Present your Malhar Passport at the Quad Desk.
                    </p>
                    <button
                      onClick={() => setActiveModalEvent(null)}
                      className="mt-3 px-5 py-2 rounded-full border border-[#d9a94e] bg-[#d9a94e] text-[#060407] font-cinzel text-xs font-bold tracking-wider"
                    >
                      RETURN TO REALM
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3.5 pt-2">
                    <div>
                      <label className="block text-xs font-cinzel text-[#d9a94e] uppercase tracking-wider mb-1">
                        College / University Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. St. Stephen's College / Loyola / Xavier's"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#d9a94e]/30 bg-[#0c0712] text-sm text-white focus:outline-none focus:border-[#d9a94e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel text-[#d9a94e] uppercase tracking-wider mb-1">
                        Contingent Leader / Soloist Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Full Legal / Student Name"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#d9a94e]/30 bg-[#0c0712] text-sm text-white focus:outline-none focus:border-[#d9a94e]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-full border border-[#d9a94e] bg-gradient-to-r from-[#d9a94e] via-[#f7e3ab] to-[#d9a94e] text-[#060407] font-cinzel font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#d9a94e]/20 transition-all"
                      >
                        CONFIRM DELEGATION ENTRY
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
