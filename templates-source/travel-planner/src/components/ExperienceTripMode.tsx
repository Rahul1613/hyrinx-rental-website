'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTrip } from '@/lib/tripStore';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function ExperienceTripMode() {
  const { currentTrip, experienceMode, setExperienceMode } = useTrip();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Build slides from current trip data
  const buildSlides = () => [
    {
      type: 'hero',
      title: currentTrip.destinationName,
      subtitle: currentTrip.title,
      image: currentTrip.heroImage,
      tag: 'Prologue • The Expedition',
      body: `An unhurried ${currentTrip.totalDays}-day immersion across ${currentTrip.stops.map((s) => s.name).join(', ')}.`,
    },
    {
      type: 'route',
      title: 'The Journey Route',
      subtitle: `${currentTrip.stops.length} Regional Destinations`,
      image: currentTrip.stops[0]?.image || currentTrip.heroImage,
      tag: 'Chapter 01 • Geography & Movement',
      body: currentTrip.stops.map((s) => `${s.name} — ${s.subtitle}`).join('   ›   '),
    },
    ...currentTrip.dailyPlans.map((day) => ({
      type: 'day',
      title: `Day ${day.dayNumber}`,
      subtitle: `${day.locationName} — ${day.title}`,
      image: day.bgImage,
      tag: `Day ${day.dayNumber} • ${day.theme}`,
      body: day.activities
        .filter((a) => a.included)
        .slice(0, 3)
        .map((a) => `${a.time}  ${a.title}`)
        .join('   ·   '),
    })),
    {
      type: 'experiences',
      title: 'Signature Moments',
      subtitle: 'Memories etched in time',
      image: currentTrip.experiences[0]?.image || currentTrip.heroImage,
      tag: 'Encounters & Immersion',
      body: currentTrip.experiences
        .filter((e) => e.selected)
        .map((e) => e.title)
        .join('   ·   ') || 'Add experiences to your itinerary to see them here.',
    },
    {
      type: 'epilogue',
      title: 'Go somewhere extraordinary.',
      subtitle: 'Make every day of the journey count.',
      image: currentTrip.heroImage,
      tag: 'Epilogue • The Horizon',
      body: 'Plan the journey. Not just the destination.',
    },
  ];

  const slides = buildSlides();

  // Reset slide index and start audio whenever film mode opens
  useEffect(() => {
    if (experienceMode) {
      setCurrentSlide(0);
      setIsAudioOn(true);
      setIsFading(false);

      // Play ambient audio
      if (!audioRef.current) {
        // Use a royalty-free nature/ambient soundscape
        const audio = new Audio('https://www.soundjay.com/nature/sounds/rain-01.mp3');
        audio.loop = true;
        audio.volume = 0.18;
        audioRef.current = audio;
      }
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser — that's OK, user can toggle
        setIsAudioOn(false);
      });
    } else {
      // Stop audio when film closes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [experienceMode]);

  // Toggle audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isAudioOn ? 0.18 : 0;
    }
  }, [isAudioOn]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!experienceMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToSlide((prev: number) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSlide((prev: number) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experienceMode, slides.length]);

  const goToSlide = (updater: number | ((prev: number) => number)) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide(updater as any);
      setIsFading(false);
    }, 200);
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setExperienceMode(false);
  };

  if (!experienceMode) return null;

  const activeSlide = slides[currentSlide];
  if (!activeSlide) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col overflow-hidden select-none">
      {/* Fade transition overlay */}
      <div
        className="absolute inset-0 z-10 bg-black pointer-events-none transition-opacity duration-200"
        style={{ opacity: isFading ? 1 : 0 }}
      />

      {/* Cinematic Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-[1.04]"
        style={{
          backgroundImage: `url(${activeSlide.image})`,
          transition: 'background-image 0.6s ease-in-out',
        }}
      >
        {/* Multi-layer gradient for dramatic cinema feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* TOP BAR */}
      <div className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
            <span className="text-amber-300 text-xs font-bold">R</span>
          </div>
          <span className="font-serif text-base font-bold tracking-wider text-white">ROAM FILM</span>
          <span className="text-white/30 text-xs">•</span>
          <span className="text-xs text-white/70">{currentTrip.destinationName}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            onClick={() => setIsAudioOn((v) => !v)}
            className={`p-2.5 rounded-full border transition-all ${
              isAudioOn
                ? 'bg-amber-400/20 border-amber-300/40 text-amber-300'
                : 'bg-white/10 border-white/20 text-white/60'
            }`}
            title={isAudioOn ? 'Mute ambient audio' : 'Unmute ambient audio'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Exit */}
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white flex items-center gap-1.5 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Exit Film</span>
          </button>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 text-center">
        {/* Chapter Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-medium mb-6 sm:mb-8">
          {activeSlide.tag}
        </div>

        {/* Main Title */}
        <h2
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-white tracking-tight leading-tight drop-shadow-2xl max-w-5xl"
          style={{ textShadow: '0 4px 32px rgba(0,0,0,0.8)' }}
        >
          {activeSlide.title}
        </h2>

        {/* Subtitle */}
        <div className="mt-4 sm:mt-6 font-serif text-lg sm:text-2xl font-light text-amber-200/90 max-w-3xl">
          {activeSlide.subtitle}
        </div>

        {/* Body Text */}
        {activeSlide.body && (
          <p className="mt-5 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
            {activeSlide.body}
          </p>
        )}

        {/* Left/Right click zones */}
        <button
          onClick={() => goToSlide((p: number) => Math.max(p - 1, 0))}
          disabled={currentSlide === 0}
          className="absolute left-0 inset-y-0 w-1/5 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 disabled:pointer-events-none transition-opacity group"
          aria-label="Previous slide"
        >
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </div>
        </button>

        <button
          onClick={() => goToSlide((p: number) => Math.min(p + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-0 inset-y-0 w-1/5 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 disabled:pointer-events-none transition-opacity group"
          aria-label="Next slide"
        >
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-colors">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        {/* Slide Counter */}
        <div className="text-xs text-white/50 font-light">
          <span className="text-white font-medium">{currentSlide + 1}</span>
          <span> / {slides.length}</span>
          <span className="hidden sm:inline text-white/30 ml-3">(← → or Space to navigate, Esc to exit)</span>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-7 h-1.5 bg-amber-400'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Nav Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToSlide((p: number) => Math.max(p - 1, 0))}
            disabled={currentSlide === 0}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => goToSlide((p: number) => Math.min(p + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
