"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X, Camera } from "lucide-react";
import { PhotoItem } from "@/lib/birthdayConfig";

interface PhotoCarouselProps {
  photos: PhotoItem[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);

  if (!photos || photos.length === 0) return null;

  const current = photos[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="py-16 md:py-20 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <Camera className="h-3.5 w-3.5 text-amber-400" />
              <span>Snapshot Archive</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Moments Caught on Film
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {activeIndex + 1} of {photos.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                aria-label="Previous snapshot"
                className="h-10 w-10 rounded-xl border border-white/10 bg-[#0F172A] flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-colors active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next snapshot"
                className="h-10 w-10 rounded-xl border border-white/10 bg-[#0F172A] flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-colors active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Display Card */}
        <div className="relative rounded-2xl border border-white/10 bg-[#0B0F19] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Visual Frame */}
            <div className="relative lg:col-span-8 min-h-[340px] sm:min-h-[420px] bg-black">
              <img
                src={current.url}
                alt={current.caption}
                className="w-full h-full object-cover select-none"
                loading="eager"
              />

              {/* Expand Lightbox Button */}
              <button
                onClick={() => setLightboxPhoto(current)}
                aria-label="Open fullscreen photo"
                className="absolute top-4 right-4 rounded-xl border border-white/20 bg-black/60 p-2.5 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Year Stamp Ribbon */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/75 px-3 py-1 text-xs font-mono font-medium text-amber-300 border border-white/10 backdrop-blur-md">
                Captured {current.year} • {current.location}
              </div>
            </div>

            {/* Narrative Story Panel */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0D1322]">
              <div>
                <span className="text-xs font-mono text-slate-400">Archival Log</span>
                <p className="mt-3 text-lg font-medium text-white leading-relaxed">
                  "{current.caption}"
                </p>
                <div className="mt-4 text-xs text-slate-400">
                  Location: <span className="text-slate-200">{current.location}</span>
                </div>
              </div>

              {/* Thumbnail Quick Strip */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">
                  All Rolls
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {photos.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative h-12 w-14 flex-shrink-0 rounded-lg overflow-hidden border transition-all ${
                        idx === activeIndex
                          ? "border-amber-400 scale-105"
                          : "border-white/10 opacity-50 hover:opacity-90"
                      }`}
                    >
                      <img
                        src={item.url}
                        alt="thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close dialog"
              className="absolute -top-12 right-0 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.caption}
              className="max-h-[75vh] w-auto rounded-xl object-contain border border-white/15"
            />
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-white">{lightboxPhoto.caption}</p>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {lightboxPhoto.location} • {lightboxPhoto.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
