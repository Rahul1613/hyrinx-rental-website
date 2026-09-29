'use client';

import React from 'react';
import { useTrip } from '../lib/tripStore';
import { Star, MapPin, Check, Plus, BedDouble } from 'lucide-react';

export default function StaysSection() {
  const { currentTrip, toggleStay } = useTrip();

  return (
    <section id="stays-section" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
              <BedDouble className="w-3.5 h-3.5" />
              <span>Sanctuary Stays</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
              Where You'll Rest & Unwind
            </h2>
            <p className="mt-3 text-white/65 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Carefully vetted riverside ryokans, imperial onsen villas, and minimalist high-rise sanctuaries that transform rest into an architectural memory.
            </p>
          </div>

          <div className="text-right text-xs text-white/60">
            <span>Selected Stays: </span>
            <strong className="text-amber-300 font-semibold">
              {currentTrip.stays.filter((s) => s.selected).length} of {currentTrip.stays.length}
            </strong>
          </div>
        </div>

        {/* Stays Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentTrip.stays.map((stay) => (
            <div
              key={stay.id}
              className={`rounded-3xl border overflow-hidden transition-all duration-500 group flex flex-col justify-between ${
                stay.selected
                  ? 'bg-[#0e1422] border-amber-400/40 shadow-2xl'
                  : 'bg-[#090c14] border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Hotel Imagery */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1422] via-black/20 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1.5 text-xs text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span className="font-semibold">{stay.rating}</span>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs text-amber-300/90 font-medium uppercase tracking-wider">{stay.style}</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">{stay.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {stay.location}
                  </span>
                  <span>{stay.nights} Nights Reserved</span>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white/40 block font-light">ESTIMATED RATE</span>
                    <span className="font-serif text-2xl font-bold text-white">
                      ${stay.pricePerNight}
                      <span className="text-xs text-white/50 font-normal font-sans"> / night</span>
                    </span>
                  </div>

                  <button
                    onClick={() => toggleStay(stay.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      stay.selected
                        ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20'
                        : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
                    }`}
                  >
                    {stay.selected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Included in Trip</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Trip</span>
                      </>
                    )}
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
