"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { celebrationAudio } from "@/lib/celebrationAudio";
import { Heart, Camera, MapPin, Calendar, Sparkles, X } from "lucide-react";

interface PolaroidItem {
  id: string;
  image: string;
  caption: string;
  date: string;
  location: string;
  category: "all" | "adventures" | "laughs" | "golden";
  rotation: string;
}

const MEMORIES: PolaroidItem[] = [
  {
    id: "m1",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    caption: "Golden hour glow & endless smiles ✨",
    date: "October 2025",
    location: "Khandala Ghats",
    category: "golden",
    rotation: "-rotate-2",
  },
  {
    id: "m2",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    caption: "The midnight chai run that turned into a 4 AM adventure!",
    date: "December 2025",
    location: "Marine Promenade",
    category: "adventures",
    rotation: "rotate-3",
  },
  {
    id: "m3",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    caption: "Right before the cake smash began 😂🎂",
    date: "Last Birthday",
    location: "Studio 304",
    category: "laughs",
    rotation: "-rotate-3",
  },
  {
    id: "m4",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    caption: "Vintage Kodachrome moments & sunset talks",
    date: "January 2026",
    location: "Old Fort Town",
    category: "golden",
    rotation: "rotate-2",
  },
  {
    id: "m5",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    caption: "Standing at the edge of the world, feeling unstoppable 🏔️",
    date: "April 2026",
    location: "Valley of Winds",
    category: "adventures",
    rotation: "-rotate-1",
  },
  {
    id: "m6",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    caption: "Guitar chords & 3 AM terrible harmonies 🎸",
    date: "June 2026",
    location: "Rooftop Lounge",
    category: "laughs",
    rotation: "rotate-2",
  },
];

export default function PolaroidMemories({ name }: { name: string }) {
  const [filter, setFilter] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<PolaroidItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    m1: 34,
    m2: 52,
    m3: 41,
    m4: 29,
    m5: 67,
    m6: 45,
  });

  const filteredMemories =
    filter === "all" ? MEMORIES : MEMORIES.filter((m) => m.category === filter);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    celebrationAudio.playMagicChime();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="memories-section" className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 mb-4 backdrop-blur-md">
          <Camera className="h-4 w-4" />
          <span>Interactive Polaroid Wall</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Treasured Snapshots of {name} 📸
        </h2>
        <p className="mt-2 text-slate-300 text-base sm:text-lg max-w-lg mx-auto">
          Every photo carries a story, a burst of laughter, and a memory worth holding on to forever.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "All Snapshots 📸" },
            { id: "golden", label: "Golden Hour ☀️" },
            { id: "adventures", label: "Adventures ✈️" },
            { id: "laughs", label: "Unfiltered Laughs 😂" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                filter === cat.id
                  ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30 scale-105"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Polaroid Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredMemories.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.04, y: -6, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePhoto(item)}
              className={`cursor-pointer group relative p-4 pb-6 bg-[#FCFBF7] rounded-sm shadow-2xl transition-all duration-300 ${item.rotation} hover:rotate-0`}
            >
              {/* Tape Effect on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/50 backdrop-blur-sm border-l border-r border-amber-300/40 rotate-1 shadow-sm" />

              {/* Photo Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 rounded-xs">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.25)] pointer-events-none" />
              </div>

              {/* Handwritten Note Area */}
              <div className="mt-3 flex items-start justify-between gap-2 text-left">
                <div className="flex-1">
                  <p className="font-handwriting text-xl sm:text-2xl text-slate-900 leading-tight">
                    {item.caption}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Like Button on Polaroid */}
                <button
                  onClick={(e) => handleLike(e, item.id)}
                  className="flex items-center gap-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1 text-xs font-bold text-rose-600 transition-colors shadow-xs"
                  title="Send love"
                >
                  <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                  <span>{likes[item.id] || 0}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl shadow-2xl text-slate-900 animate-scale-up"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 rounded-full bg-black/10 hover:bg-black/20 p-2 text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-lg bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-handwriting text-3xl text-slate-900">
                  {activePhoto.caption}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs font-mono text-slate-600">
                  <span>📅 {activePhoto.date}</span>
                  <span>📍 {activePhoto.location}</span>
                </div>
              </div>

              <button
                onClick={(e) => handleLike(e, activePhoto.id)}
                className="self-start sm:self-center flex items-center gap-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2 text-sm shadow-md transition-all active:scale-95"
              >
                <Heart className="h-4 w-4 fill-white" />
                <span>Love this memory ({likes[activePhoto.id] || 0})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
