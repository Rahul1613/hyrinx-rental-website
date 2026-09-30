"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { divineAudio } from '@/lib/audio/weddingAudio';
import { Calendar, MapPin, Sparkles, X, Heart, ExternalLink, Scroll } from "lucide-react";

export default function InteractiveWeddingInvite() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPatrika = () => {
    divineAudio.playAkshatShower();
    setIsOpen(!isOpen);
  };

  return (
    <section id="patrika-ceremony" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-4 py-1.5 text-xs font-serif font-bold text-amber-900 mb-4 shadow-xs">
          <Scroll className="h-3.5 w-3.5 text-amber-700" />
          <span>शाही निमंत्रण पत्र • The Royal Wedding Patrika</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#731924] tracking-tight">
          Unfold The Wedding Patrika 📜
        </h2>
        <p className="mt-3 text-[#5A412A] text-base sm:text-lg max-w-lg mx-auto font-light">
          Tap the royal golden wax seal below to unseal the holy wedding invitation and family blessings.
        </p>

        {/* 3D Envelope Container */}
        <div className="relative mt-12 flex justify-center items-center">
          {!isOpen ? (
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenPatrika}
              className="cursor-pointer group flex flex-col items-center select-none"
            >
              {/* Royal Vermilion & Gold Envelope Body */}
              <div className="relative w-80 sm:w-[26rem] h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-[#801826] via-[#941C2D] to-[#600F1B] border-4 border-amber-400 shadow-[0_20px_50px_rgba(180,50,60,0.3)] p-6 flex flex-col justify-between overflow-hidden">
                {/* Triangular Flap */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#A82236] to-transparent clip-triangle border-b-2 border-amber-300" />

                <div className="relative z-10 flex justify-between items-center text-xs font-serif font-bold tracking-widest text-amber-200 uppercase">
                  <span>॥ शुभ विवाह ॥</span>
                  <span>12 . 12 . 2026</span>
                </div>

                {/* Golden Wax Seal Center */}
                <div className="relative z-20 mx-auto my-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 shadow-xl border-2 border-yellow-100 group-hover:scale-110 transition-transform">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-800/40 bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950 font-serif font-bold text-xl tracking-widest shadow-inner">
                    卐
                  </div>
                </div>

                <div className="relative z-10 text-center font-serif italic text-sm text-amber-100 font-medium">
                  Tap to break the golden seal and read ✦
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-500 text-white px-6 py-2.5 text-xs font-serif font-bold tracking-widest uppercase shadow-md shadow-amber-600/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Tap to Open Royal Patrika</span>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl rounded-3xl bg-[#FFFDF9] text-[#2B1B17] p-8 sm:p-12 shadow-[0_25px_70px_rgba(180,120,50,0.25)] border-4 border-amber-500/90 text-center relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 rounded-full bg-amber-100 hover:bg-amber-200 p-2 text-amber-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Gilded Double Border Motif */}
                <div className="absolute inset-3 border border-amber-500/40 rounded-2xl pointer-events-none" />

                {/* Auspicious Ganesha Emblem */}
                <div className="relative z-10 mb-4">
                  <span className="font-serif font-bold text-amber-800 text-sm tracking-widest uppercase block">
                    ॥ श्री गणेशाय नमः ॥
                  </span>
                  <p className="font-serif italic text-xs text-amber-900/80 mt-1">
                    वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
                  </p>

                  <h3 className="font-calligraphy text-6xl sm:text-7xl text-[#841926] mt-4 leading-none">
                    Rhea & Kabir
                  </h3>

                  <p className="font-serif text-sm text-slate-700 mt-3 max-w-md mx-auto leading-relaxed">
                    With the divine blessings of our beloved elders and ancestors, we cordially invite you and your family to celebrate the auspicious wedding ceremony of our children.
                  </p>
                </div>

                {/* Ceremony Specifications */}
                <div className="my-8 py-6 border-y border-amber-300 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div className="space-y-1">
                    <span className="font-serif text-xs uppercase tracking-wider text-amber-900 font-bold block">
                      Auspicious Date & Muhurat
                    </span>
                    <p className="font-serif text-lg font-bold text-red-900">
                      Saturday, December 12, 2026
                    </p>
                    <p className="text-xs text-slate-600 font-sans">
                      Holy Pheras & Saptapadi: 10:30 AM Lagna
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-serif text-xs uppercase tracking-wider text-amber-900 font-bold block">
                      Sacred Mandap Venue
                    </span>
                    <p className="font-serif text-lg font-bold text-red-900">
                      The Riverbank Sacred Pavilion
                    </p>
                    <p className="text-xs text-slate-600 font-sans">
                      Riverside Promenade, Lane 7, Koregaon Park, Pune
                    </p>
                  </div>
                </div>

                {/* Dress Code & Vibe */}
                <div className="rounded-xl bg-amber-50 border border-amber-300 p-4 text-xs text-amber-950 font-sans mb-8">
                  <span className="font-serif font-bold text-amber-900 text-sm block mb-1">
                    पोशाक (Dress Code): Festive Indian Traditional Splendor
                  </span>
                  Rich silks, joyful pastels, and dancing shoes. We celebrate with sacred mantras, live shehnai, and feasts!
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://calendar.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold px-5 py-2.5 text-sm transition-all shadow-md shadow-amber-600/20"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Add to Google Calendar</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Koregaon+Park+Pune"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-950 font-serif font-bold px-5 py-2.5 text-sm transition-all"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Open Maps Navigation</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
