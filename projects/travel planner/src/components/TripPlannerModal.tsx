'use client';

import React, { useState } from 'react';
import { useTrip } from '@/lib/tripStore';
import { DESTINATIONS } from '@/lib/destinations';
import {
  X,
  MapPin,
  Calendar,
  Users,
  Compass,
  Wallet,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
} from 'lucide-react';

export default function TripPlannerModal() {
  const { isPlanningModalOpen, setIsPlanningModalOpen, selectDestination, updateTripDetails } = useTrip();

  const [step, setStep] = useState<number>(1);
  const [selectedDestId, setSelectedDestId] = useState<string>('japan');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [durationDays, setDurationDays] = useState<number>(7);
  const [startDate, setStartDate] = useState<string>('2026-05-10');
  const [travelerType, setTravelerType] = useState<'solo' | 'couple' | 'friends' | 'family'>('couple');
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Culture', 'Food', 'Photography']);
  const [budgetTier, setBudgetTier] = useState<'low' | 'moderate' | 'premium' | 'luxury'>('moderate');

  // Cinematic generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationPhase, setGenerationPhase] = useState<number>(0);

  if (!isPlanningModalOpen) return null;

  const filteredDestinations = DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styleOptions = [
    'Culture & Heritage',
    'Gastronomy & Food',
    'Photography',
    'Nature & Wilderness',
    'Relaxation & Spa',
    'Adventure & Hikes',
    'Luxury Stays',
    'Nightlife & Energy',
    'Scenic Rail',
  ];

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleFinish = () => {
    setIsGenerating(true);
    setGenerationPhase(1);

    setTimeout(() => setGenerationPhase(2), 500);
    setTimeout(() => setGenerationPhase(3), 1000);
    setTimeout(() => setGenerationPhase(4), 1500);
    setTimeout(() => {
      selectDestination(selectedDestId);
      updateTripDetails({
        totalDays: durationDays,
        travelers: {
          adults: adultsCount,
          children: 0,
          type: travelerType,
        },
        styles: selectedStyles,
      });
      setIsGenerating(false);
      setIsPlanningModalOpen(false);
      setStep(1);
    }, 2000);
  };

  const chosenDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0e15] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090c13]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-amber-300">Plan Your Journey</span>
            <span className="text-white/30">•</span>
            <span className="text-xs text-white/60">
              Step {step} of 5
            </span>
          </div>

          <button
            onClick={() => setIsPlanningModalOpen(false)}
            className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          {isGenerating ? (
            <div className="min-h-[380px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
                <Compass className="w-7 h-7 text-amber-300 absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Crafting Your Journey
                </h3>
                <p className="text-xs text-amber-300 font-light">
                  {generationPhase === 1 && `Mapping destination stops across ${chosenDest.name}...`}
                  {generationPhase === 2 && 'Orchestrating scenic rail connections and transfers...'}
                  {generationPhase === 3 && 'Curating boutique stays, local tastings, and key rituals...'}
                  {generationPhase === 4 && 'Finalizing your personalized daily schedule...'}
                </p>
              </div>

              {/* Progress milestones */}
              <div className="w-full max-w-md bg-white/[0.04] border border-white/10 p-4 rounded-2xl text-xs space-y-2 text-left">
                <div className={`flex items-center justify-between ${generationPhase >= 1 ? 'text-emerald-400' : 'text-white/30'}`}>
                  <span>1. Destination Geography & Stops</span>
                  {generationPhase >= 1 && <Check className="w-4 h-4" />}
                </div>
                <div className={`flex items-center justify-between ${generationPhase >= 2 ? 'text-emerald-400' : 'text-white/30'}`}>
                  <span>2. Rail & Scenic Route Waypoints</span>
                  {generationPhase >= 2 && <Check className="w-4 h-4" />}
                </div>
                <div className={`flex items-center justify-between ${generationPhase >= 3 ? 'text-emerald-400' : 'text-white/30'}`}>
                  <span>3. Stays, Tasting Menus & Moments</span>
                  {generationPhase >= 3 && <Check className="w-4 h-4" />}
                </div>
                <div className={`flex items-center justify-between ${generationPhase >= 4 ? 'text-emerald-400' : 'text-white/30'}`}>
                  <span>4. Financial & Timeline Architecture</span>
                  {generationPhase >= 4 && <Check className="w-4 h-4" />}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: WHERE TO? */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
                      Where would you like to go?
                    </h2>
                    <p className="text-sm text-white/70 font-light">
                      Select your destination from our curated journeys or search directly.
                    </p>
                  </div>

                  <input
                    type="text"
                    placeholder="Search by country or region (e.g. Japan, Italy, Bali)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#121824] border border-white/15 rounded-2xl px-5 py-3.5 text-white placeholder-white/40 focus:border-amber-400 focus:outline-none text-sm"
                  />

                  {/* Destination Selection Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDestinations.map((d) => {
                      const isSelected = selectedDestId === d.id;
                      return (
                        <div
                          key={d.id}
                          onClick={() => setSelectedDestId(d.id)}
                          className={`relative h-44 rounded-2xl overflow-hidden cursor-pointer group transition-all border-2 ${
                            isSelected
                              ? 'border-amber-400 ring-2 ring-amber-400/20 scale-[1.02]'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <img
                            src={d.heroImage}
                            alt={d.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-amber-300 font-medium">
                            {d.defaultDays} Days • {d.country}
                          </div>

                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="font-serif text-xl font-bold text-white leading-tight">
                              {d.name}
                            </h4>
                            <p className="text-[11px] text-white/60 truncate font-light mt-0.5">
                              {d.tagline}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: WHEN & DURATION */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
                      When and for how long?
                    </h2>
                    <p className="text-sm text-white/70 font-light">
                      Choose your approximate start date and target trip length for {chosenDest.name}.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-[#121824] border border-white/10 space-y-4">
                      <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider block">Target Start Date</span>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-[#090d14] border border-white/20 rounded-xl p-3 text-white focus:border-amber-400 focus:outline-none text-sm"
                      />
                      <p className="text-xs text-white/50 font-light">
                        Recommended season for {chosenDest.name}: <strong className="text-white">{chosenDest.bestSeason}</strong>
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#121824] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-300 text-xs uppercase font-semibold tracking-wider">Trip Duration</span>
                        <span className="font-serif text-2xl font-bold text-white">{durationDays} Days</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {[5, 7, 10, 14].map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setDurationDays(days)}
                            className={`py-3 rounded-xl text-xs font-semibold border transition-all ${
                              durationDays === days
                                ? 'bg-amber-400 text-black border-amber-300 shadow-md'
                                : 'bg-[#090d14] text-white/70 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {days} Days
                          </button>
                        ))}
                      </div>

                      <p className="text-xs text-white/50 font-light">
                        Standard curated itinerary for {chosenDest.name} is {chosenDest.defaultDays} days.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: WHO'S GOING */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
                      Who is traveling?
                    </h2>
                    <p className="text-sm text-white/70 font-light">
                      Tailor pacing and room reservations for your travel group.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { id: 'solo', label: 'Solo Traveler', desc: 'Freedom & unhurried solitude', icon: '👤' },
                      { id: 'couple', label: 'Couple / Duo', desc: 'Romantic retreats & fine dining', icon: '✨' },
                      { id: 'friends', label: 'Friends', desc: 'Food crawls & shared memories', icon: '🥂' },
                      { id: 'family', label: 'Family Travel', desc: 'Spacious stays & balanced pace', icon: '🌿' },
                    ].map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setTravelerType(t.id as any)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          travelerType === t.id
                            ? 'bg-[#151c2a] border-amber-400 shadow-xl'
                            : 'bg-[#0f141e] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="text-2xl mb-2">{t.icon}</div>
                        <div className="font-semibold text-white text-base">{t.label}</div>
                        <div className="text-xs text-white/60 mt-1 font-light">{t.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-[#121824] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/80">Number of Adult Travelers:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-white text-base">{adultsCount}</span>
                      <button
                        onClick={() => setAdultsCount(adultsCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: TRAVEL STYLE */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
                      What is your travel style?
                    </h2>
                    <p className="text-sm text-white/70 font-light">
                      Pick the core ingredients you want prioritized in your daily recommendations.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {styleOptions.map((st) => {
                      const isSelected = selectedStyles.includes(st);
                      return (
                        <div
                          key={st}
                          onClick={() => toggleStyle(st)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-white font-semibold'
                              : 'bg-[#121824] border-white/10 text-white/70 hover:border-white/30'
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{st}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: BUDGET TIER */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
                      Target comfort tier?
                    </h2>
                    <p className="text-sm text-white/70 font-light">
                      Choose your comfort tier to balance stays, private transfers, and omakase tastings.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      { id: 'low', label: 'Essential', est: chosenDest.sampleBudget.low, desc: 'Boutique hostels & local transit' },
                      { id: 'moderate', label: 'Comfortable', est: chosenDest.sampleBudget.moderate, desc: 'Design hotels & bullet trains' },
                      { id: 'premium', label: 'Signature', est: Math.round(chosenDest.sampleBudget.moderate * 1.5), desc: 'Ryokan suites & private guides' },
                      { id: 'luxury', label: 'Grand Luxury', est: chosenDest.sampleBudget.luxury, desc: 'Aman & Michelin 3-star counters' },
                    ].map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setBudgetTier(b.id as any)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          budgetTier === b.id
                            ? 'bg-[#151c2a] border-amber-400 shadow-xl'
                            : 'bg-[#0f141e] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs text-amber-400 uppercase font-semibold">{b.label}</div>
                        <div className="font-serif text-2xl font-bold text-white mt-1">~${b.est}</div>
                        <div className="text-[11px] text-white/40 mt-0.5">Est. per person</div>
                        <div className="text-xs text-white/60 mt-3 font-light">{b.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-white/60 text-xs">
                    <strong>Note:</strong> Estimates reflect historical seasonal averages and live mock selections. No real-time booking charges are made.
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Bottom Navigation */}
        {!isGenerating && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#090c13]">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-amber-300 flex items-center gap-1.5 transition-all shadow-lg"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-black font-semibold text-xs sm:text-sm hover:shadow-xl hover:shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Build My Journey</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
