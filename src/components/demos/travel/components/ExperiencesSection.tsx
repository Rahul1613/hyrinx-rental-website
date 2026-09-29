'use client';

import React from 'react';
import { useTrip } from '../lib/tripStore';
import { Compass, Check, Plus, Clock, MapPin, Sparkles } from 'lucide-react';

export default function ExperiencesSection() {
  const { currentTrip, toggleExperience } = useTrip();

  return (
    <section id="experiences-section" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Encounters</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
              Unforgettable Experiences
            </h2>
            <p className="mt-3 text-white/65 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Rare access, sensory immersion, and privately led journeys that go far beyond standard sightseeing.
            </p>
          </div>

          <div className="text-right text-xs text-white/60">
            <span>Saved Experiences: </span>
            <strong className="text-amber-300 font-semibold">
              {currentTrip.experiences.filter((e) => e.selected).length} of {currentTrip.experiences.length}
            </strong>
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentTrip.experiences.map((exp) => (
            <div
              key={exp.id}
              className={`rounded-3xl border overflow-hidden transition-all duration-300 group flex flex-col sm:flex-row ${
                exp.selected
                  ? 'bg-[#0e1422] border-amber-400/40 shadow-2xl'
                  : 'bg-[#090c14] border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Image */}
              <div className="relative sm:w-1/2 h-64 sm:h-auto overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />
              </div>

              {/* Details */}
              <div className="p-6 sm:p-7 sm:w-1/2 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-white/65 mt-2 leading-relaxed font-light">
                    {exp.highlight}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/40 block font-light">EXPERIENCE RATE</span>
                    <span className="font-serif text-xl font-bold text-white">${exp.price}</span>
                    <span className="text-[11px] text-white/50 block font-light">/ person • {exp.duration}</span>
                  </div>

                  <button
                    onClick={() => toggleExperience(exp.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      exp.selected
                        ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-md shadow-amber-400/20'
                        : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
                    }`}
                  >
                    {exp.selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{exp.selected ? 'In Itinerary' : 'Add to Trip'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
