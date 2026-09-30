"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { divineAudio } from '@/lib/audio/weddingAudio';
import { Sparkles, Flame, Heart, ChevronRight, ChevronLeft } from "lucide-react";

interface SacredVow {
  number: number;
  sanskrit: string;
  hindiName: string;
  englishTitle: string;
  promise: string;
  blessing: string;
}

const SEVEN_PHERAS: SacredVow[] = [
  {
    number: 1,
    sanskrit: "ॐ एकमिषे विष्णुस्त्वान्वेतु",
    hindiName: "प्रथम फेरा • पोषण एवं स्वास्थ्य",
    englishTitle: "The First Vow — Nourishment & Pure Living",
    promise: "We promise to walk together to provide nourishment, wholesome health, and pure food for our home with shared devotion and care.",
    blessing: "May the divine grace always fill your home with abundance, health, and contentment.",
  },
  {
    number: 2,
    sanskrit: "ॐ द्वे ऊर्जे विष्णुस्त्वान्वेतु",
    hindiName: "द्वितीय फेरा • शक्ति एवं संबल",
    englishTitle: "The Second Vow — Inner Strength & Courage",
    promise: "We promise to stand by each other in body, mind, and spirit—growing stronger together through every joy and life trial.",
    blessing: "May you be each other's unwavering pillar of strength in all changing tides of life.",
  },
  {
    number: 3,
    sanskrit: "ॐ त्रीणि रायस्पोषाय विष्णुस्त्वान्वेतु",
    hindiName: "तृतीय फेरा • समृद्धि एवं धर्म",
    englishTitle: "The Third Vow — Righteous Prosperity & Wisdom",
    promise: "We promise to earn wealth honestly, spend wisely, and uphold spiritual wisdom and righteousness in our household.",
    blessing: "May prosperity and moral clarity illuminate every doorway you step through together.",
  },
  {
    number: 4,
    sanskrit: "ॐ चत्वारि मायोभवाय विष्णुस्त्वान्वेतु",
    hindiName: "चतुर्थ फेरा • प्रेम एवं सामंजस्य",
    englishTitle: "The Fourth Vow — Harmony, Joy & Respect",
    promise: "We promise to cherish mutual trust, respecting our elders and bringing harmony, music, and laughter to our family.",
    blessing: "May sweet understanding and heartfelt respect forever grace your conversations.",
  },
  {
    number: 5,
    sanskrit: "ॐ पञ्च पशुभ्यो विष्णुस्त्वान्वेतु",
    hindiName: "पञ्चम फेरा • भावी पीढ़ी एवं करुणा",
    englishTitle: "The Fifth Vow — Compassion & Lineage",
    promise: "We promise to nurture kind, noble values and extend our love and shelter to all living beings with boundless compassion.",
    blessing: "May your lineage be blessed with noble wisdom, sweet laughter, and gentle hearts.",
  },
  {
    number: 6,
    sanskrit: "ॐ षड् ऋतुभ्यो विष्णुस्त्वान्वेतु",
    hindiName: "षष्ठ फेरा • ऋतुओं में सहचारिता",
    englishTitle: "The Sixth Vow — Steadfast Companionship Across All Seasons",
    promise: "We promise to celebrate every season together—the radiant sun, the torrential monsoons, and the quiet winters of life hand-in-hand.",
    blessing: "May time only deepen your admiration and joyful warmth for one another.",
  },
  {
    number: 7,
    sanskrit: "ॐ सखे सप्तपदा भव",
    hindiName: "सप्तम फेरा • अमर सख्य एवं समर्पण",
    englishTitle: "The Seventh Vow — Eternal Friendship & One Soul",
    promise: "Having walked seven sacred steps together, we have become true lifelong companions. You are mine and I am yours for eternity.",
    blessing: "॥ सखा सप्तपदा बभूव ॥ May your souls remain united in eternal, unbreakable divine friendship.",
  },
];

export default function SevenSacredVows() {
  const [activePheraIndex, setActivePheraIndex] = useState(0);

  const currentVow = SEVEN_PHERAS[activePheraIndex];

  const handleSelectPhera = (idx: number) => {
    divineAudio.playAkshatShower();
    setActivePheraIndex(idx);
  };

  const handleNext = () => {
    divineAudio.playAkshatShower();
    setActivePheraIndex((prev) => (prev + 1) % SEVEN_PHERAS.length);
  };

  const handlePrev = () => {
    divineAudio.playAkshatShower();
    setActivePheraIndex((prev) => (prev - 1 + SEVEN_PHERAS.length) % SEVEN_PHERAS.length);
  };

  return (
    <section id="seven-vows-section" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-4 py-1.5 text-xs font-serif font-bold text-amber-900 mb-4 shadow-xs">
          <Flame className="h-4 w-4 text-orange-600" />
          <span>पवित्र सप्तपदी • The Sacred Seven Steps Around The Agni Kund</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#731924] tracking-tight">
          Saat Phere — The 7 Divine Vows 🪔
        </h2>
        <p className="mt-3 text-[#5A412A] text-base sm:text-lg max-w-xl mx-auto font-light">
          Circumambulating the holy sacrificial fire, the bride and groom take seven eternal steps that seal their companionship for seven lifetimes.
        </p>

        {/* Holy Agni Kund Stage */}
        <div className="relative mt-12 mb-8 flex flex-col items-center justify-center">
          {/* Flame Ambient Glow */}
          <div className="absolute -inset-6 bg-gradient-to-t from-orange-400/25 via-amber-300/25 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Holy Flame Illustration */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Flickering Agni Flame */}
            <div className="animate-holy-flame h-14 w-8 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-red-600 via-orange-400 to-yellow-200 shadow-[0_0_25px_#f97316]" />
            {/* Brass Havan Kund Base */}
            <div className="w-24 sm:w-28 h-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 rounded-sm shadow-md border-t border-yellow-200 mt-0.5" />
            <div className="w-32 sm:w-36 h-4 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 rounded-b-md shadow-lg" />
          </div>

          <span className="mt-3 text-xs font-serif font-bold text-amber-900 tracking-widest uppercase">
            ॥ पवित्र अग्नि साक्षी ॥
          </span>
        </div>

        {/* Phera Stepper Tabs (1 to 7) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {SEVEN_PHERAS.map((vow, idx) => (
            <button
              key={vow.number}
              onClick={() => handleSelectPhera(idx)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-serif font-bold transition-all shadow-xs ${
                activePheraIndex === idx
                  ? "bg-gradient-to-r from-amber-500 to-red-700 text-white scale-105 shadow-md shadow-amber-600/20"
                  : "bg-white/80 border border-amber-300/80 text-amber-950 hover:bg-amber-100/60"
              }`}
            >
              <span>फेरा {vow.number}</span>
            </button>
          ))}
        </div>

        {/* Active Phera Display Card */}
        <div className="relative mx-auto max-w-2xl divine-card rounded-3xl p-8 sm:p-12 border-2 border-amber-400/80 text-center shadow-xl bg-white/95">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVow.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-serif text-amber-800 font-bold text-sm tracking-widest uppercase block mb-1">
                {currentVow.hindiName}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#801826] mt-2 mb-4">
                {currentVow.englishTitle}
              </h3>

              {/* Sanskrit Mantra Shloka */}
              <div className="my-6 rounded-2xl bg-amber-50/90 border border-amber-300/60 p-4 font-serif text-lg sm:text-xl font-bold text-amber-950 tracking-wide">
                {currentVow.sanskrit}
              </div>

              {/* Promise */}
              <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed max-w-lg mx-auto">
                &ldquo;{currentVow.promise}&rdquo;
              </p>

              {/* Blessing */}
              <div className="mt-6 pt-4 border-t border-amber-200/80 text-xs sm:text-sm text-red-900 font-serif font-medium flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 fill-red-600 text-red-600" />
                <span>{currentVow.blessing}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation */}
          <div className="mt-8 pt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 rounded-xl bg-amber-100 hover:bg-amber-200 px-4 py-2 text-xs font-serif font-bold text-amber-950 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>पिछला फेरा (Prev)</span>
            </button>

            <span className="font-serif font-bold text-xs text-amber-900">
              {currentVow.number} of 7 Vows
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-xs font-serif font-bold transition-colors shadow-xs"
            >
              <span>अगला फेरा (Next)</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
