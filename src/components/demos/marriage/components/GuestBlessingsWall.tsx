"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { divineAudio } from '@/lib/audio/weddingAudio';
import { Heart, Sparkles, Send, Flower2 } from "lucide-react";

interface Blessing {
  id: number;
  name: string;
  relation: string;
  message: string;
  stamp: string;
  date: string;
}

const SEED_BLESSINGS: Blessing[] = [
  {
    id: 1,
    name: "Uncle Vikram & Sunita Chachi",
    relation: "Family Elders",
    message: "सदा सुहागन रहो। May Lord Ganesha and Mata Lakshmi shower both of you with unceasing health, patience, and divine harmony. We cannot wait to dance at the Sangeet!",
    stamp: "🪔",
    date: "September 2026",
  },
  {
    id: 2,
    name: "Aditya & The College Friends",
    relation: "Groom's Friends",
    message: "From studying till dawn to seeing Kabir find his lifelong anchor and companion in Rhea. You two are a divine match made in heaven. Har Har Mahadev!",
    stamp: "🥂",
    date: "September 2026",
  },
  {
    id: 3,
    name: "Meera & Shreya",
    relation: "Bride's Bridesmaids",
    message: "Rhea, you will be the most angelic and radiant bride! Kabir is the luckiest man on earth. May your bond grow sweeter with every sunrise.",
    stamp: "🌸",
    date: "September 2026",
  },
];

export default function GuestBlessingsWall() {
  const [blessings, setBlessings] = useState<Blessing[]>(SEED_BLESSINGS);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Family Well-Wisher");
  const [message, setMessage] = useState("");
  const [selectedStamp, setSelectedStamp] = useState("🪔");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("divine_wedding_blessings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlessings(parsed);
        }
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    divineAudio.playAkshatShower();
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#F59E0B", "#FBBF24", "#DC2626", "#F43F5E", "#FEF08A"],
    });

    const newBlessing: Blessing = {
      id: Date.now(),
      name: name.trim(),
      relation: relation.trim(),
      message: message.trim(),
      stamp: selectedStamp,
      date: "Just now",
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    try {
      localStorage.setItem("divine_wedding_blessings", JSON.stringify(updated));
    } catch {}

    setMessage("");
  };

  return (
    <section id="blessings-section" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-4 py-1.5 text-xs font-serif font-bold text-amber-900 mb-4 shadow-xs">
            <Flower2 className="h-3.5 w-3.5 text-amber-600" />
            <span>आशीर्वाद एवं शुभकामनाएँ • Sacred Guest Registry</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#731924] tracking-tight">
            Bestow Your Holy Blessings 🪔
          </h2>
          <p className="mt-3 text-[#5A412A] text-base sm:text-lg max-w-xl mx-auto font-light">
            Offer your heartfelt prayers, love, and sacred aashirwaad for Rhea & Kabir as they embark upon their journey of marriage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-5 divine-card rounded-3xl p-6 sm:p-8 border-2 border-amber-300 bg-white shadow-md">
            <h3 className="font-serif text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Write Sacred Aashirwaad</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Uncle, Sharma Family..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-amber-50/50 border border-amber-300/80 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  Relation to Couple
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full rounded-xl bg-white border border-amber-300/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="Family Elders">Family Elders ❤️</option>
                  <option value="Bride's Family & Friends">Bride's Side 🌸</option>
                  <option value="Groom's Family & Friends">Groom's Side 🤜🤛</option>
                  <option value="Friend & Colleague">Friend & Colleague 💼</option>
                  <option value="Well Wisher">Devoted Well Wisher ✨</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  Select Auspicious Stamp
                </label>
                <div className="flex gap-2">
                  {["🪔", "🌸", "卐", "💍", "🕊️", "🥂", "✨"].map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setSelectedStamp(emoji)}
                      className={`h-9 w-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                        selectedStamp === emoji
                          ? "bg-amber-500 text-white scale-110 shadow-md font-bold"
                          : "bg-amber-50 hover:bg-amber-100 border border-amber-200"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                  Your Blessing Note
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your prayers and heartfelt blessings with Rhea & Kabir..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl bg-amber-50/50 border border-amber-300/80 p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-red-700 py-3 text-white font-serif font-bold text-base shadow-md shadow-amber-600/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <Send className="h-4 w-4" />
                <span>Bestow Blessings (आशीर्वाद भेजें)</span>
              </button>
            </form>
          </div>

          {/* Wall */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif font-bold text-lg text-amber-950">
                Recorded Aashirwaad ({blessings.length})
              </span>
              <span className="text-xs font-serif text-amber-800">
                Live Divine Registry
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {blessings.map((b) => (
                <div
                  key={b.id}
                  className="divine-card rounded-2xl p-5 border border-amber-300 bg-white/95 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{b.stamp}</span>
                      <div>
                        <h4 className="font-serif font-bold text-[#801826] text-base leading-tight">
                          {b.name}
                        </h4>
                        <span className="text-[11px] font-serif text-amber-800 font-semibold">
                          {b.relation}
                        </span>
                      </div>
                    </div>

                    <p className="font-serif italic text-sm text-slate-800 mt-2">
                      &ldquo;{b.message}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-amber-100 flex items-center justify-between text-[10px] text-amber-900 font-serif">
                    <span>{b.date}</span>
                    <span className="text-red-700 font-bold flex items-center gap-1">
                      <Heart className="h-3 w-3 fill-red-600" /> Auspicious
                    </span>
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
