"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { celebrationAudio } from '@/lib/audio/celebrationAudio';
import { Sparkles, Heart, Coins, MessageCircle } from "lucide-react";

interface WishMessage {
  id: number;
  name: string;
  relation: string;
  message: string;
  emoji: string;
  created_at: string;
}

const DEFAULT_WISHES: WishMessage[] = [
  {
    id: 1,
    name: "Kavya & Rohan",
    relation: "College Gang",
    message: "Happy Birthday legend! Save us front-row seats for the cake cutting! Love you!",
    emoji: "🥂",
    created_at: "Just now",
  },
  {
    id: 2,
    name: "Uncle Suresh",
    relation: "Family",
    message: "Wishing you another year filled with great health, laughter, and relentless curious energy. Keep shining!",
    emoji: "✨",
    created_at: "Today",
  },
  {
    id: 3,
    name: "Tara & The Crew",
    relation: "Best Friends",
    message: "To the person who makes every roadtrip memorable and brings unmatched energy to every room. Let the party begin!",
    emoji: "🎉",
    created_at: "Today",
  },
  {
    id: 4,
    name: "Aanya",
    relation: "Sister",
    message: "Happy Birthday to the most annoying yet most loving sibling in the galaxy. Have the sweetest year ahead!",
    emoji: "💖",
    created_at: "Today",
  },
];

export default function WishingWell({ birthdayPersonName }: { birthdayPersonName: string }) {
  const [messages, setMessages] = useState<WishMessage[]>(DEFAULT_WISHES);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Best Friend");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tossEffect, setTossEffect] = useState(false);

  // Pure frontend persistence using localStorage
  useEffect(() => {
    // // BACKEND FETCH COMMENTED OUT:
    // fetch("/api/guestbook")
    //   .then((res) => res.json())
    //   .then((json) => { if (json.success) setMessages(json.messages); });

    try {
      const saved = localStorage.getItem("birthday_wishes_frontend");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Use defaults
    }
  }, []);

  const handleTossWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTossEffect(true);
    celebrationAudio.playMagicChime();

    // Pure frontend state creation (No backend needed)
    const newWish: WishMessage = {
      id: Date.now(),
      name: name.trim(),
      relation: relation.trim(),
      message: message.trim(),
      emoji: selectedEmoji,
      created_at: "Just now",
    };

    // // BACKEND POST COMMENTED OUT:
    // fetch("/api/guestbook", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newWish),
    // });

    const updated = [newWish, ...messages];
    setMessages(updated);

    try {
      localStorage.setItem("birthday_wishes_frontend", JSON.stringify(updated));
    } catch {}

    setMessage("");
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#FBBF24", "#EC4899", "#8B5CF6"],
    });

    setIsSubmitting(false);
    setTimeout(() => setTossEffect(false), 800);
  };

  return (
    <section id="wishing-well-section" className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 mb-4 backdrop-blur-md">
            <Coins className="h-4 w-4" />
            <span>Virtual Wishing Well</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Toss A Wish Coin For {birthdayPersonName} 🪙
          </h2>
          <p className="mt-2 text-slate-300 text-base sm:text-lg max-w-lg mx-auto">
            Drop your warmest prayer, joke, or blessing into the well. It will light up on the celebration wall instantly!
          </p>
        </div>

        {/* Input Form & Wishing Well Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wish Input Card */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-white/15 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
            <div className="flex items-center gap-2 mb-4 text-amber-300 font-display font-bold text-lg">
              <Sparkles className="h-5 w-5" />
              <span>Write Your Birthday Wish</span>
            </div>

            <form onSubmit={handleTossWish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex, Mom, Bestie..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Relation / Tag
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Best Friend">Best Friend 🤜🤛</option>
                  <option value="Family">Family ❤️</option>
                  <option value="Sister / Brother">Sister / Brother 🌟</option>
                  <option value="Colleague / Partner">Colleague / Partner 💼</option>
                  <option value="Partner / Love">Partner / Soulmate 💖</option>
                  <option value="Fan">Number One Fan 🚀</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Pick A Stamp
                </label>
                <div className="flex items-center gap-2">
                  {["🎉", "🎂", "💖", "🚀", "👑", "✨", "🍻"].map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`h-9 w-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                        selectedEmoji === emoji
                          ? "bg-amber-400 text-slate-950 scale-110 shadow-md font-bold"
                          : "bg-white/5 hover:bg-white/15"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={`Write your heart out to ${birthdayPersonName}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 py-3 text-slate-950 font-display font-bold text-base shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform ${
                  tossEffect ? "scale-95 animate-ping" : ""
                }`}
              >
                <Coins className="h-5 w-5" />
                <span>{isSubmitting ? "Tossing Coin..." : "Toss Wish Into Well 🪙"}</span>
              </button>
            </form>
          </div>

          {/* Glowing Wishes Wall Display */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                <MessageCircle className="h-5 w-5 text-pink-400" />
                <span>Live Birthday Wishes ({messages.length})</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Pure Frontend Mode
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-white/10 p-4 hover:border-amber-400/40 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.emoji || "🎉"}</span>
                        <div>
                          <h4 className="font-display font-bold text-sm text-white leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-amber-400 font-medium">
                            {item.relation || "Friend"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-200 leading-snug font-sans">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{item.created_at}</span>
                    <span className="text-rose-400 flex items-center gap-1 font-semibold">
                      <Heart className="h-3 w-3 fill-rose-500" /> Blessed
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
