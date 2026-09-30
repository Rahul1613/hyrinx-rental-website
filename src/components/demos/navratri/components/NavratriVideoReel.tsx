"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, Image as ImageIcon, X, Maximize2, Sparkles } from "lucide-react";
import { navratriAudio } from '@/lib/audio/navratriAudio';

interface VideoHighlight {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  thumbnail: string;
  videoUrl: string;
  tag: string;
}

const HIGHLIGHT_VIDEOS: VideoHighlight[] = [
  {
    id: "garba-ground",
    title: "Vadodara Royal Garba Raas",
    subtitle: "Over 50,000 dancers in synchronized concentric circles",
    location: "Vadodara, Gujarat",
    thumbnail: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-over-the-night-sky-4148-large.mp4",
    tag: "World Record Garba",
  },
  {
    id: "maha-aarti",
    title: "Ambaji Temple 1008 Diya Maha Aarti",
    subtitle: "Sacred twilight invocation with holy conch and temple bells",
    location: "Gabbar Hill, Ambaji",
    thumbnail: "https://images.unsplash.com/photo-1609137144822-4467c69992f9?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-candle-in-the-dark-42416-large.mp4",
    tag: "Divine Darshan",
  },
  {
    id: "dandiya-clash",
    title: "High-Energy Raas Dandiya Beats",
    subtitle: "Dhol beats crescendo as colorful dandiya sticks strike in sync",
    location: "Mumbai Dome Arena",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-carnival-lights-spinning-fast-at-night-42426-large.mp4",
    tag: "Raas Dandiya",
  },
];

const PHOTO_GALLERY = [
  {
    title: "Divine Maa Durga Idol",
    category: "Devotion",
    url: "/maa_durga.jpg",
    caption: "Sculpted with organic clay from holy river banks.",
  },
  {
    title: "Authentic Chaniya Choli",
    category: "Attire",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    caption: "Gujarati hand-embroidered Kutch mirrorwork.",
  },
  {
    title: "Garba Circle in Harmony",
    category: "Dance",
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    caption: "Graceful 3-tali steps around the sacred Garbha deep.",
  },
  {
    title: "Akhand Jyot Illuminations",
    category: "Rituals",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    caption: "Ghee lamps illuminating the sacred mandir through 9 nights.",
  },
];

export default function NavratriVideoReel() {
  const [selectedVideo, setSelectedVideo] = useState(HIGHLIGHT_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalImage, setModalImage] = useState<typeof PHOTO_GALLERY[0] | null>(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    navratriAudio.playDholBeat();
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2E1508] border-b border-amber-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-amber-600" />
            Celebration Moments & Videos
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rozha_One'] text-[#7F1D1D] tracking-tight">
            महोत्सव झलकियाँ: दृश्य एवं ध्वनियाँ
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Experience the vibrant colors, rhythmic dandiya beats, and tranquil sacred darshan from celebrated pandals across the country.
          </p>
        </div>

        {/* Video Player + Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Cinema Box */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-amber-300 bg-white shadow-xl relative">
            <div className="relative aspect-video w-full bg-stone-900 flex items-center justify-center">
              {isPlaying ? (
                <video
                  src={selectedVideo.videoUrl}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full group">
                  <Image
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Big Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={handlePlayVideo}
                      className="w-18 h-18 rounded-full bg-[#7F1D1D] p-1 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-white"
                      title="Play celebration clip"
                    >
                      <Play className="w-8 h-8 fill-white translate-x-0.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#7F1D1D] text-amber-100">
                      {selectedVideo.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-amber-200 mt-1">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-xs text-stone-200">
                      {selectedVideo.subtitle} • <span className="text-amber-400 font-semibold">{selectedVideo.location}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Footer */}
            <div className="p-3.5 bg-amber-50/80 border-t border-amber-200 flex items-center justify-between text-xs">
              <span className="font-bold text-[#7F1D1D]">
                {isPlaying ? "▶ Playing Celebration Video" : "Click play to watch video highlight"}
              </span>
              {isPlaying && (
                <button
                  onClick={() => setIsPlaying(false)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-stone-700 font-bold hover:bg-amber-100"
                >
                  Close Video
                </button>
              )}
            </div>
          </div>

          {/* Playlist Clips Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Select Celebration Clip:
            </h4>
            <div className="space-y-3">
              {HIGHLIGHT_VIDEOS.map((item) => {
                const isSelected = selectedVideo.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedVideo(item);
                      setIsPlaying(false);
                    }}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex gap-3 items-center ${
                      isSelected
                        ? "bg-white border-[#7F1D1D] shadow-sm ring-2 ring-amber-300/50"
                        : "bg-white/80 border-amber-200 hover:border-amber-400 hover:bg-white"
                    }`}
                  >
                    <div className="relative w-18 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-white">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-stone-900 truncate">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-stone-500 truncate">
                        {item.location}
                      </p>
                      <span className="text-[9px] font-bold text-[#7F1D1D] uppercase">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Photo Gallery Grid */}
        <div className="space-y-4 pt-4 border-t border-amber-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif text-[#7F1D1D] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>Festive Photo Moments</span>
            </h3>
            <span className="text-xs text-stone-500">
              Click photo to enlarge
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PHOTO_GALLERY.map((photo) => (
              <div
                key={photo.title}
                onClick={() => setModalImage(photo)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-amber-300 shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h5 className="text-xs font-bold truncate">
                      {photo.title}
                    </h5>
                    <p className="text-[10px] text-amber-200/90 truncate">
                      {photo.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setModalImage(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={modalImage.url}
                  alt={modalImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex items-center justify-between gap-4 bg-[#FAF7F2]">
                <div>
                  <h4 className="text-base font-bold font-serif text-[#7F1D1D]">
                    {modalImage.title}
                  </h4>
                  <p className="text-xs text-stone-600">
                    {modalImage.caption}
                  </p>
                </div>
                <button
                  onClick={() => setModalImage(null)}
                  className="p-2 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
