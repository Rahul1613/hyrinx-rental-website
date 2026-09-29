"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Send, MessageSquare, Check, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { navratriAudio } from "@/lib/navratriAudio";

interface BlessingMessage {
  id: string;
  name: string;
  city: string;
  offering: string;
  prayer: string;
  timeAgo: string;
  likes: number;
}

const DEFAULT_BLESSINGS: BlessingMessage[] = [
  {
    id: "1",
    name: "Aarav & Meera Patel",
    city: "Ahmedabad",
    offering: "🌺 Red Hibiscus Garland",
    prayer: "Maa Ambe, bless our family with wisdom, courage, and glowing health. Jai Mata Di!",
    timeAgo: "12 mins ago",
    likes: 42,
  },
  {
    id: "2",
    name: "Rohan Sharma",
    city: "Jaipur",
    offering: "🪔 Akhand Ghee Diya",
    prayer: "Seeking Maa Katyayani's divine light to dispel all anxiety and bring peace to our elders.",
    timeAgo: "28 mins ago",
    likes: 31,
  },
  {
    id: "3",
    name: "Pooja Desai",
    city: "Mumbai",
    offering: "🥥 Sacred Coconut & Chunri",
    prayer: "May the divine vibrations of Navratri unite every family with love, joy, and righteous dharma.",
    timeAgo: "1 hour ago",
    likes: 56,
  }
];

const OFFERING_OPTIONS = [
  { label: "🌺 Red Hibiscus Garland", icon: "🌺" },
  { label: "🪔 Pure Ghee Diya", icon: "🪔" },
  { label: "🥥 Sacred Coconut & Chunri", icon: "🥥" },
  { label: "🍬 Sweet Kheer Bhog", icon: "🍬" },
];

export default function PrasadBlessingsWall() {
  const [blessings, setBlessings] = useState<BlessingMessage[]>(DEFAULT_BLESSINGS);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [prayer, setPrayer] = useState("");
  const [selectedOffering, setSelectedOffering] = useState(OFFERING_OPTIONS[0].label);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [jaapCount, setJaapCount] = useState(27);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("navratri_blessings");
      if (saved) setBlessings(JSON.parse(saved));
      const savedJaap = localStorage.getItem("navratri_jaap_count");
      if (savedJaap) setJaapCount(parseInt(savedJaap, 10));
    } catch {}
  }, []);

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !prayer.trim()) return;

    const newPrayer: BlessingMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      city: city.trim() || "India",
      offering: selectedOffering,
      prayer: prayer.trim(),
      timeAgo: "Just now",
      likes: 1,
    };

    const updated = [newPrayer, ...blessings];
    setBlessings(updated);
    try {
      localStorage.setItem("navratri_blessings", JSON.stringify(updated));
    } catch {}

    setName("");
    setCity("");
    setPrayer("");
    setIsSubmitted(true);
    navratriAudio.playAartiChime();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#D97706", "#DC2626", "#F59E0B"],
    });

    setTimeout(() => setIsSubmitted(false), 3500);
  };

  const handleMantraChant = () => {
    const next = jaapCount + 1;
    setJaapCount(next);
    try {
      localStorage.setItem("navratri_jaap_count", next.toString());
    } catch {}
    navratriAudio.playAartiChime();
    if (next % 108 === 0) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#D97706", "#DC2626", "#FBBF24"],
      });
    }
  };

  return (
    <section id="blessings" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2E1508] border-b border-amber-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-red-600" />
            Devotee Community & Prayer Wall
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rozha_One'] text-[#7F1D1D] tracking-tight">
            माँ दुर्गा प्रार्थना एवं जन-आशीर्वाद
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Dedicate your prayers at Maa Durga's lotus feet, count your Navarna mantra japam, and join thousands of devotees in divine unity.
          </p>
        </div>

        {/* 108 Japam Mala Counter Card */}
        <div className="max-w-xl mx-auto p-6 sm:p-7 rounded-3xl bg-white border border-amber-300 shadow-md text-center space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-amber-100 pb-2">
            <span className="font-bold uppercase tracking-wider text-[#7F1D1D] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Navarna Mahamantra (नवार्ण महामंत्र)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold">
              {jaapCount % 108}/108 Chants
            </span>
          </div>

          <p className="font-['Rozha_One'] text-2xl sm:text-3xl text-[#7F1D1D] font-bold">
            "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे"
          </p>
          <p className="text-xs text-stone-500 font-mono">
            Om Aim Hreem Kleem Chamundayai Vichche
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleMantraChant}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#991B1B] to-[#B45309] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>📿</span>
              <span>Chant Once (+1 Japam)</span>
            </button>
            <button
              onClick={() => {
                setJaapCount(0);
                try { localStorage.removeItem("navratri_jaap_count"); } catch {}
              }}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Prayer Form & Community Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Left */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-amber-300 shadow-md space-y-4">
            <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
              <MessageSquare className="w-5 h-5 text-[#7F1D1D]" />
              <h3 className="text-base font-bold font-serif text-stone-900">
                Write Your Prayer to Maa
              </h3>
            </div>

            <form onSubmit={handleSubmitPrayer} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Suman & Rajesh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-[#7F1D1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Surat, Gujarat"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-[#7F1D1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Chadhawa Offering
                </label>
                <select
                  value={selectedOffering}
                  onChange={(e) => setSelectedOffering(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-[#7F1D1D]"
                >
                  {OFFERING_OPTIONS.map((opt) => (
                    <option key={opt.label} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Prayer / Sankalpa *
                </label>
                <textarea
                  required
                  rows={3}
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  placeholder="May Maa Durga bless all with good health, happiness, and peace..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-amber-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-[#7F1D1D] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#7F1D1D] hover:bg-[#991B1B] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Sacred Prayer</span>
              </button>

              {isSubmitted && (
                <div className="p-2.5 rounded-xl bg-green-50 border border-green-300 text-green-800 text-xs flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Your prayer has been inscribed on the wall with blessings!</span>
                </div>
              )}
            </form>
          </div>

          {/* Devotee Feed Right */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center justify-between">
              <span>Devotee Prayers Stream</span>
              <span className="text-stone-500 font-semibold">{blessings.length} Inscribed</span>
            </h4>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {blessings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-bold text-stone-900 text-xs sm:text-sm">{b.name}</h5>
                      <span className="text-[10px] text-stone-500">{b.city} • {b.timeAgo}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-bold border border-amber-200 shrink-0">
                      {b.offering}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{b.prayer}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px]">
                    <span className="font-bold text-[#7F1D1D]">🚩 Jai Mata Di!</span>
                    <button
                      onClick={() => {
                        setBlessings((prev) =>
                          prev.map((item) =>
                            item.id === b.id ? { ...item, likes: item.likes + 1 } : item
                          )
                        );
                      }}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Heart className="w-3 h-3 fill-red-100" />
                      <span>{b.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
