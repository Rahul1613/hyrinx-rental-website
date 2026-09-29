"use client";

import { useState } from "react";
import { X, Sparkles, User, Calendar, Heart } from "lucide-react";
import { celebrationAudio } from "@/lib/celebrationAudio";

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    name: string;
    age: number;
    nickname: string;
    tagline: string;
  };
  onSave: (newData: {
    name: string;
    age: number;
    nickname: string;
    tagline: string;
  }) => void;
}

const PRESETS = [
  {
    label: "Best Bro / Buddy 🤜🤛",
    name: "Rahul",
    age: 24,
    nickname: "Brother & Legend",
    tagline: "To the truest brother, the wildest laughter, and the most loyal soul. Here's to making this year legendary!",
  },
  {
    label: "Partner / Love ❤️",
    name: "Maya",
    age: 23,
    nickname: "My Entire World",
    tagline: "Happy Birthday to the one who makes every ordinary day feel like pure magic. Thank you for your love and warmth.",
  },
  {
    label: "Sister / Brother 🌟",
    name: "Aanya",
    age: 20,
    nickname: "Chief Partner-in-Crime",
    tagline: "From childhood fights to sharing all our secrets. Happy Birthday to the most amazing sibling ever!",
  },
  {
    label: "Junior / Kiddo 🚀",
    name: "Leo",
    age: 8,
    nickname: "Junior Astronaut",
    tagline: "Eight full orbits around the sun! May your year be packed with rockets, giant cakes, and adventures!",
  },
];

export default function PersonalizeModal({
  isOpen,
  onClose,
  currentData,
  onSave,
}: PersonalizeModalProps) {
  const [name, setName] = useState(currentData.name);
  const [age, setAge] = useState(currentData.age);
  const [nickname, setNickname] = useState(currentData.nickname);
  const [tagline, setTagline] = useState(currentData.tagline);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    celebrationAudio.playMagicChime();
    setName(preset.name);
    setAge(preset.age);
    setNickname(preset.nickname);
    setTagline(preset.tagline);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    celebrationAudio.playFanfare();
    onSave({
      name: name.trim() || "Birthday Star",
      age: Number(age) || 21,
      nickname: nickname.trim() || "The Legend",
      tagline: tagline.trim() || "Wishing you infinite joy and adventures!",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-400/40 p-6 sm:p-8 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full bg-white/10 hover:bg-white/20 p-2 text-slate-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2 text-amber-300 font-display font-extrabold text-2xl">
          <Sparkles className="h-6 w-6" />
          <span>Personalize Birthday Website</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Customize the name, age, and wishes to create the perfect birthday celebration for your friend, partner, or family!
        </p>

        {/* Fast Presets */}
        <div className="mb-6">
          <label className="block text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
            Quick Character Presets:
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="rounded-lg bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Name of Birthday Person
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Age Turning
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  placeholder="e.g. 24"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Title / Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. Brother & Legend, Queen, Rockstar"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Headline Greeting Message
            </label>
            <textarea
              rows={3}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Heartfelt greeting text..."
              className="w-full rounded-xl bg-white/5 border border-white/15 p-3 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 px-6 py-2.5 text-sm font-display font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-transform"
            >
              Apply to Website ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
