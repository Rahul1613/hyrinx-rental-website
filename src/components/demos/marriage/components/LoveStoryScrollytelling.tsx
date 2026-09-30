"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin } from "lucide-react";
import { divineAudio } from '@/lib/audio/weddingAudio';

interface StoryChapter {
  id: string;
  year: string;
  chapterNumber: string;
  location: string;
  title: string;
  lead: string;
  quote: string;
  image: string;
  alt: string;
}

const CHAPTERS: StoryChapter[] = [
  {
    id: "c1",
    year: "2018",
    chapterNumber: "अध्याय १ • The First Glance",
    location: "National Library Portico, Calcutta",
    title: "A Sudden Monsoon Downpour & Two Paper Cups",
    lead: "Kabir was balancing a damp folder of blueprints on his knee while sheltering under the library arches. Rhea stepped under the portico with two piping hot cups of ginger tea from the street vendor. She offered him one without hesitation, and a fifteen-minute rainstorm turned into a three-hour conversation about tram bells, ancient temple architecture, and lifelong dreams.",
    quote: "Neither of us took down a phone number, but destiny brought both of us to the very same tea stall the following Tuesday.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
    alt: "Couple talking under warm ambient rain light",
  },
  {
    id: "c2",
    year: "2020",
    chapterNumber: "अध्याय २ • Six Hundred Miles",
    location: "Studio 402, Bandra West, Bombay",
    title: "Distance That Strengthened Our Devotion",
    lead: "Eighteen months of lockdown separation tested our patience and deepened our bond. Kabir learned how to temper cumin dal over WhatsApp video calls from Rhea's grandmother's handwritten notebook. When state boundaries finally reopened, Rhea took the first overnight train with four cardboard cartons of books. We built our first bookshelf from spare reclaimed pine planks.",
    quote: "That small sunlit apartment held our longest work nights, our loudest dinners, and our deepest gratitude for each other.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    alt: "Cozy sunlit apartment with books and green foliage",
  },
  {
    id: "c3",
    year: "2023",
    chapterNumber: "अध्याय ३ • The Mountain Faith",
    location: "Chopta Ridge, High Himalayas",
    title: "The Stalled Jeep at Nine Thousand Feet",
    lead: "A dead alternator left our rental jeep stranded on a frozen gravel bend three kilometers short of Tungnath. Instead of panicking, Kabir unpacked two enamel mugs and hot thermos ginger water. We sat on the warm hood under an ocean of stars watching the mist roll over the sacred Chaukhamba peaks. In that divine silence, we both knew we could weather any storm in life together.",
    quote: "When everything around us breaks down, we find ourselves getting quiet, steady, and completely certain of our bond.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    alt: "Golden alpine mountain ridge with valley mist",
  },
  {
    id: "c4",
    year: "2025",
    chapterNumber: "अध्याय ४ • The Sunset Promise",
    location: "Gokarna Cliffs, Arabian Sea",
    title: "No Prepared Script, Just the Horizon & A Sacred Ring",
    lead: "Walking along the red laterite headland past Om Beach, Kabir had carried a sacred silver band in his windbreaker pocket for four weeks waiting for the right moment. With the afternoon waves crashing gently below and the horizon turning golden amber, he turned and asked Rhea if she would build a sacred home with him for the rest of their lives. Her 'Yes' was whispered through happy tears.",
    quote: "The tide came in, the lighthouse beacon blinked to life across the bay, and our sacred journey toward marriage began.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    alt: "Rocky ocean headland bathed in late sunset glow",
  },
];

export default function LoveStoryScrollytelling() {
  const [likes, setLikes] = useState<Record<string, number>>({
    c1: 184,
    c2: 219,
    c3: 312,
    c4: 489,
  });

  const handleLike = (id: string) => {
    divineAudio.playAkshatShower();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="story-section" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-4 py-1.5 text-xs font-serif font-bold text-amber-900 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>दैवीय प्रेम गाथा • The Sacred Path to Marriage</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#731924] tracking-tight">
            How Destiny United Two Souls ✨
          </h2>
          <p className="mt-3 text-[#5A412A] text-base sm:text-lg max-w-xl mx-auto font-light">
            Serendipity, patience, and unwavering faith. Here are the sacred chapters that brought Rhea and Kabir to their wedding mandap.
          </p>
        </div>

        {/* Story Chapters Cards */}
        <div className="space-y-16">
          {CHAPTERS.map((chap, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={chap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`divine-card rounded-3xl p-6 sm:p-10 border-2 border-amber-300/80 bg-white/95 flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center shadow-lg`}
              >
                {/* Photo Aspect */}
                <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-md group">
                  <Image
                    src={chap.image}
                    alt={chap.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />

                  {/* Year Tag on Image */}
                  <span className="absolute top-4 left-4 rounded-full bg-amber-500 text-white border border-amber-300 px-4 py-1 text-xs font-serif font-bold shadow-md">
                    {chap.year}
                  </span>
                </div>

                {/* Narrative Details */}
                <div className="w-full lg:w-1/2 text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-serif font-bold text-amber-800 uppercase tracking-widest mb-2">
                      <span>{chap.chapterNumber}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#6A4E32]">
                        <MapPin className="h-3 w-3 text-red-600" />
                        {chap.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#781B26] font-normal leading-snug">
                      {chap.title}
                    </h3>

                    <p className="mt-4 text-[#473426] text-sm sm:text-base leading-relaxed font-sans font-light">
                      {chap.lead}
                    </p>

                    <blockquote className="mt-6 border-l-2 border-amber-500 pl-4 py-1 font-serif italic text-sm sm:text-base text-slate-800">
                      &ldquo;{chap.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Bottom reaction bar */}
                  <div className="mt-8 pt-4 border-t border-amber-200/80 flex items-center justify-between">
                    <span className="text-xs font-serif font-medium text-amber-900">
                      अध्याय {idx + 1} of 4
                    </span>

                    <button
                      onClick={() => handleLike(chap.id)}
                      className="flex items-center gap-2 rounded-full bg-red-50 hover:bg-red-100 border border-red-300 px-4 py-1.5 text-xs font-serif font-bold text-red-800 transition-all hover:scale-105 active:scale-95 shadow-xs"
                    >
                      <Heart className="h-3.5 w-3.5 fill-red-600 text-red-600" />
                      <span>Blessed Moment ({likes[chap.id] || 0})</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
