'use client';

import React from 'react';
import { useTrip } from '@/lib/tripStore';
import {
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  Lightbulb,
  Compass,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function DailyItineraryStory() {
  const { currentTrip, activeDayNumber, setActiveDayNumber, toggleActivity } = useTrip();

  const activeDay =
    currentTrip.dailyPlans.find((d) => d.dayNumber === activeDayNumber) ||
    currentTrip.dailyPlans[0] ||
    null;

  return (
    <section id="daily-itinerary" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20 overflow-hidden">
      {/* Dynamic Background Image Shift */}
      {activeDay && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 opacity-15 pointer-events-none scale-105"
          style={{ backgroundImage: `url(${activeDay.bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-[#07090e]" />
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Curated Daily Chapters</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
            The Daily Storyline
          </h2>
          <p className="mt-3 text-white/65 text-sm sm:text-base font-light leading-relaxed">
            Each day is planned around a deliberate rhythm. Switch between days to explore local rituals, temple mornings, and culinary stops.
          </p>
        </div>

        {/* Day Selector Pill Navigation */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start lg:justify-center">
          {currentTrip.dailyPlans.map((day) => {
            const isSelected = day.dayNumber === activeDayNumber;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayNumber(day.dayNumber)}
                className={`px-4 py-2.5 rounded-2xl border text-left shrink-0 transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/20 font-semibold'
                    : 'bg-[#0e131d] text-white/70 hover:text-white border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-[10px] tracking-wide uppercase opacity-75">Day {day.dayNumber.toString().padStart(2, '0')}</div>
                <div className="text-xs truncate max-w-[120px] font-medium mt-0.5">{day.locationName.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Display */}
        {activeDay && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Day Overview & Atmospheric Card */}
            <div className="lg:col-span-4 bg-[#0d121c] border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-amber-300 font-medium mb-4">
                <span>Day {activeDay.dayNumber} of {currentTrip.totalDays}</span>
                <span>{activeDay.locationName}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                {activeDay.title}
              </h3>

              <div className="inline-block px-3 py-1 rounded-full bg-white/[0.06] text-white/80 text-xs font-medium mb-6">
                Theme: {activeDay.theme}
              </div>

              {/* Local Curated Travel Tip */}
              {activeDay.tips && (
                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-100 text-xs leading-relaxed space-y-1.5 mb-6 font-light">
                  <div className="font-semibold flex items-center gap-1.5 text-amber-300 text-xs">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Insider Recommendation</span>
                  </div>
                  <p>{activeDay.tips}</p>
                </div>
              )}

              {/* Day Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs text-white/60 pt-4 border-t border-white/10">
                <div>
                  <span className="block text-[11px] text-white/40">PLANNED MOMENTS</span>
                  <span className="text-white font-semibold text-sm">
                    {activeDay.activities.filter((a) => a.included).length} Active
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-white/40">ESTIMATED BUDGET</span>
                  <span className="text-amber-300 font-semibold text-sm">
                    ${activeDay.activities.filter((a) => a.included).reduce((acc, a) => acc + a.cost, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Time-Stamped Chronological Activities */}
            <div className="lg:col-span-8 space-y-4">
              {activeDay.activities.map((act) => (
                <div
                  key={act.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 ${
                    act.included
                      ? 'bg-[#0f1422] border-white/15 hover:border-amber-400/40 shadow-xl'
                      : 'bg-[#080b12] border-white/5 opacity-55 hover:opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3.5">
                      {/* Time Badge */}
                      <div className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-300/20 text-amber-300 text-xs font-semibold shrink-0">
                        {act.time}
                      </div>

                      <div>
                        <h4 className="font-serif text-lg font-bold text-white">
                          {act.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-white/40" />
                            {act.duration}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-white/40" />
                            {act.location}
                          </span>
                          <span>•</span>
                          <span className="capitalize px-2 py-0.5 rounded-full bg-white/[0.05] text-amber-200 text-[11px]">
                            {act.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cost & Toggle Switch */}
                    <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                      <span className="text-xs font-medium text-amber-200">
                        {act.cost > 0 ? `$${act.cost}` : 'Included'}
                      </span>
                      <button
                        onClick={() => toggleActivity(activeDay.dayNumber, act.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                          act.included
                            ? 'bg-amber-400 text-black font-semibold hover:bg-amber-300'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        {act.included ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>In Itinerary</span>
                          </>
                        ) : (
                          <span>+ Add</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
