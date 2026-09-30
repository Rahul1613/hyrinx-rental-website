"use client";

import { Calendar, Clock, MapPin, Sparkles, Music, Heart, Utensils, Compass } from "lucide-react";

interface WeddingEvent {
  id: string;
  hindiName: string;
  name: string;
  tagline: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  icon: typeof Calendar;
  color: string;
}

const EVENTS: WeddingEvent[] = [
  {
    id: "e1",
    hindiName: "हल्दी एवं मेहंदी उत्सव",
    name: "Haldi & Mehendi Sunshine Utsav",
    tagline: "Sacred turmeric paste, live dhol beats, intricate henna rituals, and poolside delicacies.",
    date: "Friday, December 11, 2026",
    time: "11:00 AM – 3:00 PM",
    venue: "The Mango Grove Courtyard",
    dressCode: "Sunshine Yellow, Marigold & Floral Chic",
    icon: Sparkles,
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: "e2",
    hindiName: "संगीत संध्या",
    name: "The Grand Sangeet & Musical Evening",
    tagline: "Choreographed family dance performances, soulful melodies, and joyous celebration under the stars.",
    date: "Friday, December 11, 2026",
    time: "7:30 PM Onwards",
    venue: "The Starlight Glasshouse & Lawns",
    dressCode: "Festive Shimmer, Royal Velvet & Dancing Shoes",
    icon: Music,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "e3",
    hindiName: "शुभ विवाह एवं सप्तपदी",
    name: "The Sacred Muhurat & Pheras",
    tagline: "Holy Vedic mantras, the sacred fire, kanyadaan, and the seven rounds of eternal companionship.",
    date: "Saturday, December 12, 2026",
    time: "10:30 AM Auspicious Lagna",
    venue: "The Riverbank Sacred Mandap",
    dressCode: "Traditional Regal Silks, Banarasi & Festive Pastels",
    icon: Heart,
    color: "from-red-600 to-rose-700",
  },
  {
    id: "e4",
    hindiName: "विवाह प्रीतिभोज",
    name: "The Royal Reception & Banquet",
    tagline: "An evening of gratitude, live classical sitar and jazz, and a royal feast to celebrate the newlyweds.",
    date: "Saturday, December 12, 2026",
    time: "7:30 PM Onwards",
    venue: "The Heritage Grand Ballroom",
    dressCode: "Formal Indian Festive / Elegant Black Tie",
    icon: Utensils,
    color: "from-amber-500 to-yellow-600",
  },
];

export default function WeddingEventsSchedule() {
  return (
    <section id="schedule-section" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-4 py-1.5 text-xs font-serif font-bold text-amber-900 mb-4 shadow-xs">
            <Compass className="h-3.5 w-3.5 text-amber-600" />
            <span>शुभ कार्यक्रम तालिका • Auspicious Wedding Events</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#731924] tracking-tight">
            Wedding Ceremonies & Itinerary 🪔
          </h2>
          <p className="mt-3 text-[#5A412A] text-base sm:text-lg max-w-xl mx-auto font-light">
            Two blessed days of sacred rituals, joyous music, and celebration. We eagerly look forward to your gracious presence.
          </p>
        </div>

        {/* 4 Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.id}
                className="divine-card rounded-3xl p-8 border-2 border-amber-300/80 bg-white/95 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${event.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-serif font-bold text-amber-800 tracking-wider">
                      {event.hindiName}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#781B26] font-normal group-hover:text-amber-700 transition-colors">
                    {event.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#5C4533] font-light leading-relaxed">
                    {event.tagline}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-amber-200/80 space-y-2.5 text-xs sm:text-sm text-[#453124]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="font-medium">{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-600 shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{event.venue}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-center justify-between text-xs text-amber-900 font-serif">
                    <span className="font-medium">✨ {event.dressCode}</span>
                    <a
                      href="https://maps.google.com/?q=Pune"
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-bold text-red-800 hover:text-red-950 transition-colors"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
