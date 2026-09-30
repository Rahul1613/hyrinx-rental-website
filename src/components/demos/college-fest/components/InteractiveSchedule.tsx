"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Bookmark, Check, Sparkles, Clock, Feather } from "lucide-react";
import { festAudio } from '@/lib/audio/festAudio';

interface Slot {
  time: string;
  title: string;
  department: string;
  venue: string;
  highlight?: boolean;
}

const MALHAR_SCHEDULE: Record<string, Slot[]> = {
  day1: [
    { time: "09:30 AM", title: "THE CEREMONIAL PROCESSION & LIGHTING OF THE LAMP", department: "INAUGURAL", venue: "The College Quadrangle", highlight: true },
    { time: "11:00 AM", title: "NUKKAD NATAK: PRELIMS ROUND & STREET CHANTS", department: "LAPA", venue: "The Arched Quad" },
    { time: "01:30 PM", title: "THE MALHAR PARLIAMENTARY DEBATE: ROUND 1", department: "LIT", venue: "Reference Library Hall" },
    { time: "03:30 PM", title: "WOODS UNPLUGGED: ACOUSTIC HARMONIES & STRINGS", department: "LAPA", venue: "The Xavier Woods" },
    { time: "05:30 PM", title: "THE KEYNOTE CONCLAVE: DIALOGUES ON INDIAN LETTERS", department: "CONCLAVE", venue: "Main College Auditorium", highlight: true },
    { time: "07:30 PM", title: "TWILIGHT SERENADE: SOULFUL FOLK & INDIE ACOUSTIC", department: "AMPHITHEATRE", venue: "The Historic Quadrangle", highlight: true },
  ],
  day2: [
    { time: "10:00 AM", title: "CANVAS RENAISSANCE: 6-HOUR ACRYLIC & CHARCOAL MARATHON", department: "FINE ARTS", venue: "Stone Foyer Gallery" },
    { time: "11:30 AM", title: "SUR-SANGAM: INDIAN CLASSICAL JUGALBANDI", department: "LAPA", venue: "Chapel Hall" },
    { time: "02:00 PM", title: "ILLUMINATI: THE GREAT MALHAR GENERAL QUIZ", department: "LIT", venue: "The Grand Hall", highlight: true },
    { time: "04:30 PM", title: "MONO-ACTING & HINDI DRAMATICS SHOWCASE", department: "ETC", venue: "Experimental Theatre" },
    { time: "07:15 PM", title: "FUSION ODYSSEY: PROGRESSIVE CARNATIC ROCK & DRUMS", department: "AMPHITHEATRE", venue: "Open Air Quad Amphitheatre", highlight: true },
  ],
  day3: [
    { time: "10:30 AM", title: "NATIONAL PARLIAMENTARY DEBATE: THE GRAND FINALS", department: "LIT", venue: "College Auditorium", highlight: true },
    { time: "01:00 PM", title: "POTTERY & LIVE SUSTAINABLE SCULPTURE EXHIBIT", department: "FINE ARTS", venue: "St. Xavier's Lawns" },
    { time: "03:30 PM", title: "AVANT-GARDE: THE THEATRICAL RUNWAY & VOGUE PROMENADE", department: "ETC", venue: "Quad Amphitheatre", highlight: true },
    { time: "06:30 PM", title: "MALHAR 2026 VALEDICTORY & THE ROLLING SHIELD HONOURS", department: "VALEDICTORY", venue: "Grand Stadium Stage", highlight: true },
    { time: "08:00 PM", title: "THE MAJESTIC HEADLINE CONCERT & GOLDEN CONFETTI FINALE", department: "AMPHITHEATRE", venue: "Grand Stadium Stage", highlight: true },
  ],
};

export default function InteractiveSchedule() {
  const [activeDay, setActiveDay] = useState<"day1" | "day2" | "day3">("day1");
  const [savedSlots, setSavedSlots] = useState<string[]>([]);

  const daysMeta = [
    { key: "day1", label: "DAY 01", date: "FRIDAY, AUG 14", sub: "The Awakening" },
    { key: "day2", label: "DAY 02", date: "SATURDAY, AUG 15", sub: "The Creative Tempest" },
    { key: "day3", label: "DAY 03", date: "SUNDAY, AUG 16", sub: "The Grand Crescendo" },
  ];

  const toggleSaveSlot = (title: string) => {
    festAudio.playMonsoonDrop();
    setSavedSlots((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#d9a94e]">
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
            <span>The Festival Itinerary</span>
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-white">
            CHRONICLES OF <span className="gold-shimmer">MALHAR</span>
          </h2>

          <p className="text-sm sm:text-base text-[#f4ead8]/70 font-montserrat font-light leading-relaxed">
            Three days etched into collegiate folklore. Navigate the itinerary across St. Xavier's historic stone quadrangles and bookmark your personal schedule.
          </p>
        </div>

        {/* Day Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {daysMeta.map((d) => {
            const isActive = activeDay === d.key;
            return (
              <button
                key={d.key}
                onClick={() => {
                  festAudio.playSitarPluck(349.23);
                  setActiveDay(d.key as "day1" | "day2" | "day3");
                }}
                className={`p-5 rounded-xl border text-left transition-all duration-300 relative ${
                  isActive
                    ? "bg-gradient-to-b from-[#21142e] to-[#120a1a] border-[#d9a94e] shadow-xl shadow-[#d9a94e]/15"
                    : "bg-[#0f0916]/70 border-[#d9a94e]/20 hover:border-[#d9a94e]/50"
                }`}
              >
                <div className="font-cinzel text-xs font-bold text-[#d9a94e] tracking-widest mb-1">
                  {d.label} • {d.date}
                </div>
                <div className="font-cinzel text-lg font-bold text-white">
                  {d.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Schedule Timeline List */}
        <div className="space-y-3">
          {MALHAR_SCHEDULE[activeDay].map((slot, idx) => {
            const isSaved = savedSlots.includes(slot.title);

            return (
              <div
                key={idx}
                className={`malhar-card p-5 sm:p-6 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  slot.highlight
                    ? "border-[#d9a94e]/60 bg-gradient-to-r from-[#1e1329] to-[#0f0917]"
                    : "border-[#d9a94e]/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {/* Time Badge */}
                  <div className="min-w-[95px] flex items-center gap-1.5 text-xs font-cinzel font-bold text-[#d9a94e] bg-[#160c20] px-3 py-1.5 rounded-lg border border-[#d9a94e]/30 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#d9a94e]" />
                    <span>{slot.time}</span>
                  </div>

                  {/* Title and Category */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-montserrat uppercase font-bold tracking-widest text-[#f405f9] bg-[#f405f9]/10 px-2 py-0.5 rounded-full border border-[#f405f9]/25">
                        {slot.department}
                      </span>
                      {slot.highlight && (
                        <span className="text-[10px] font-cinzel font-bold tracking-wider text-[#d9a94e] bg-[#d9a94e]/10 px-2 py-0.5 rounded-full border border-[#d9a94e]/30">
                          ✦ MARQUEE
                        </span>
                      )}
                    </div>
                    <h4 className="font-cinzel text-base sm:text-lg font-bold text-white hover:text-[#f7e3ab] transition-colors">
                      {slot.title}
                    </h4>
                  </div>
                </div>

                {/* Right Venue & Bookmark */}
                <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-[#d9a94e]/15">
                  <div className="flex items-center gap-1.5 text-xs text-[#f4ead8]/70 font-montserrat">
                    <MapPin className="w-3.5 h-3.5 text-[#d9a94e]" />
                    <span>{slot.venue}</span>
                  </div>

                  <button
                    onClick={() => toggleSaveSlot(slot.title)}
                    className={`p-2 rounded-lg border text-xs font-cinzel transition-all flex items-center gap-1.5 ${
                      isSaved
                        ? "bg-[#d9a94e] text-[#060407] border-[#d9a94e] font-bold"
                        : "bg-[#180f24] text-[#d9a94e] border-[#d9a94e]/30 hover:border-[#d9a94e]"
                    }`}
                    title={isSaved ? "Saved to your itinerary" : "Bookmark this event"}
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{isSaved ? "SAVED" : "BOOKMARK"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
