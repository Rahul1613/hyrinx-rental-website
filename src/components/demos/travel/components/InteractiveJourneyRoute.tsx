'use client';

import React, { useState } from 'react';
import { useTrip } from '../lib/tripStore';
import { StopLocation } from '../lib/types';
import { MapPin, Navigation, ArrowRight, Compass, Calendar, Sparkles } from 'lucide-react';

export default function InteractiveJourneyRoute() {
  const { currentTrip, activeStopId, setActiveStopId, setActiveDayNumber } = useTrip();
  const [hoveredStop, setHoveredStop] = useState<string | null>(null);

  const selectedStop =
    currentTrip.stops.find((s) => s.id === activeStopId) || currentTrip.stops[0];

  const handleSelectStop = (stop: StopLocation) => {
    setActiveStopId(stop.id);
    if (stop.dayNumbers && stop.dayNumbers[0]) {
      setActiveDayNumber(stop.dayNumbers[0]);
    }
  };

  // Generate smooth SVG path connecting coordinates
  const generateSmoothPath = (stops: StopLocation[]) => {
    if (stops.length === 0) return '';
    const points = stops.map((s) => ({
      x: s.coordinates.x * 7.2 + 40,
      y: s.coordinates.y * 3.8 + 60,
    }));

    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;
      path += ` Q ${p0.x} ${p1.y} ${p1.x} ${p1.y}`;
    }
    return path;
  };

  return (
    <section id="route-overview" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Cartographic Route</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
              The Overland Journey
            </h2>
            <p className="mt-2 text-amber-200/90 text-sm sm:text-base font-light">
              {currentTrip.totalDays} Days Across {currentTrip.destinationName} • {currentTrip.stops.map((s) => s.name).join(' → ')}
            </p>
          </div>

          <p className="text-white/65 text-sm max-w-md leading-relaxed font-light">
            Select any stop along the map to explore the regional atmosphere, featured highlights, and day-by-day sequence.
          </p>
        </div>

        {/* Main Interactive Route & Map Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stylized Cartographic Map */}
          <div className="lg:col-span-7 bg-[#0d111a] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Top map info */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-white font-medium">Interactive Journey Map</span>
              </div>
              <span>{currentTrip.stops.length} Featured Stops</span>
            </div>

            {/* Stylized SVG Map Stage */}
            <div className="relative h-[360px] sm:h-[440px] w-full bg-[#0a0d14] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
              {/* Subtle Ambient Radial Lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(223,177,91,0.08),transparent_70%)]" />

              <svg viewBox="0 0 800 480" className="w-full h-full p-6 overflow-visible">
                <defs>
                  <linearGradient id="luxuryRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dfb15b" />
                    <stop offset="60%" stopColor="#e69d45" />
                    <stop offset="100%" stopColor="#f6ad55" />
                  </linearGradient>

                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Animated Connecting Journey Route Line */}
                {currentTrip.stops.length > 1 && (
                  <>
                    <path
                      d={generateSmoothPath(currentTrip.stops)}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="6"
                      opacity="0.5"
                    />
                    <path
                      d={generateSmoothPath(currentTrip.stops)}
                      fill="none"
                      stroke="url(#luxuryRouteGrad)"
                      strokeWidth="3"
                      strokeDasharray="6,6"
                      className="animate-route-flow"
                      filter="url(#softGlow)"
                    />
                  </>
                )}

                {/* Destination Waypoint Nodes */}
                {currentTrip.stops.map((stop, idx) => {
                  const x = stop.coordinates.x * 7.2 + 40;
                  const y = stop.coordinates.y * 3.8 + 60;
                  const isSelected = stop.id === selectedStop?.id;
                  const isHovered = stop.id === hoveredStop;

                  return (
                    <g
                      key={stop.id}
                      onClick={() => handleSelectStop(stop)}
                      onMouseEnter={() => setHoveredStop(stop.id)}
                      onMouseLeave={() => setHoveredStop(null)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse Ring when selected */}
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r="22"
                          fill="none"
                          stroke="#dfb15b"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                      )}

                      {/* Outer Ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? '12' : '9'}
                        fill={isSelected ? '#dfb15b' : '#141a26'}
                        stroke={isSelected ? '#ffffff' : '#dfb15b'}
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />

                      {/* Inner Dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r="3.5"
                        fill={isSelected ? '#07090e' : '#ffffff'}
                      />

                      {/* Waypoint Label */}
                      <text
                        x={x}
                        y={y - 18}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#cbd5e1'}
                        fontSize={isSelected ? '13' : '11'}
                        fontFamily="sans-serif"
                        fontWeight={isSelected ? '600' : 'normal'}
                      >
                        {stop.name}
                      </text>

                      {/* Days Tag */}
                      <text
                        x={x}
                        y={y + 22}
                        textAnchor="middle"
                        fill="#dfb15b"
                        fontSize="10"
                        fontFamily="sans-serif"
                        opacity={isSelected ? '1' : '0.75'}
                      >
                        Days {stop.dayNumbers.join(', ')}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom Interactive Prompt */}
              <div className="absolute bottom-4 inset-x-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Click any waypoint to view regional details</span>
                </span>
                <span className="text-amber-300 font-medium">{selectedStop?.name} Selected</span>
              </div>
            </div>

            {/* Quick Waypoint Pill Strip */}
            <div className="mt-6 flex flex-wrap gap-2">
              {currentTrip.stops.map((stop, idx) => {
                const isSelected = stop.id === selectedStop?.id;
                return (
                  <button
                    key={stop.id}
                    onClick={() => handleSelectStop(stop)}
                    className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/20'
                        : 'bg-white/[0.04] text-white/75 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <span className="text-[10px] opacity-70">0{idx + 1}</span>
                    <span>{stop.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Destination Inspection Dossier */}
          {selectedStop && (
            <div className="lg:col-span-5 bg-[#0d111a] border border-white/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              {/* Destination Image Preview */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 group">
                <img
                  src={selectedStop.image}
                  alt={selectedStop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-black/30 to-transparent" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-medium">
                  Days {selectedStop.dayNumbers.join(' & ')}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-amber-300/90 font-medium tracking-wider uppercase mb-1">
                    {selectedStop.subtitle}
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white leading-tight">
                    {selectedStop.name}
                  </h3>
                </div>
              </div>

              {/* Stop Narrative */}
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
                {selectedStop.description}
              </p>

              {/* Associated Activities Snapshot */}
              <div className="space-y-2 mb-6">
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider">
                  Highlights In This Region
                </div>
                {currentTrip.dailyPlans
                  .filter((p) => selectedStop.dayNumbers.includes(p.dayNumber))
                  .slice(0, 2)
                  .map((plan) => (
                    <div
                      key={plan.dayNumber}
                      className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-medium text-white">Day {plan.dayNumber}: {plan.title}</div>
                        <div className="text-white/50 text-[11px] mt-0.5">{plan.theme}</div>
                      </div>
                      <span className="text-amber-300 font-medium text-[11px]">
                        {plan.activities.length} moments
                      </span>
                    </div>
                  ))}
              </div>

              {/* Jump into day */}
              <a
                href="#daily-itinerary"
                onClick={() => setActiveDayNumber(selectedStop.dayNumbers[0] || 1)}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-amber-300 text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>View Day {selectedStop.dayNumbers[0]} Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
