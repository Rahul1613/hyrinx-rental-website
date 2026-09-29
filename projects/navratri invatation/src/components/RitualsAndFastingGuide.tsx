"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, BookOpen, Sparkles, Flame } from "lucide-react";

interface RitualItem {
  name: string;
  hindiName: string;
  day: string;
  meaning: string;
  howToDo: string;
  icon: string;
}

const RITUALS_LIST: RitualItem[] = [
  {
    name: "Ghatasthapana (Kalash Sthapana)",
    hindiName: "घटस्थापना एवं कलश पूजन",
    day: "Day 1 (Pratipada)",
    meaning: "Invoking Maa Shakti into a consecrated urn filled with sacred water, betel nut, and mango leaves.",
    howToDo: "Place on clean clay spread with barley seeds during morning Abhijit Muhurat. Wrap coconut in red chunri.",
    icon: "🏺",
  },
  {
    name: "Akhand Jyot (Continuous Sacred Flame)",
    hindiName: "अखण्ड पावन ज्योति",
    day: "All 9 Days & Nights",
    meaning: "Symbol of divine consciousness dispelling darkness, ignorance, and negative domestic energies.",
    howToDo: "Light pure cow's Desi Ghee or sesame oil diya in the temple corner. Keep sheltered from wind drafts.",
    icon: "🪔",
  },
  {
    name: "Khetri (Barley Sprout Growth)",
    hindiName: "जौ रोपण एवं खेतरी पूजन",
    day: "Day 1 to Day 9",
    meaning: "Green shoots of barley indicate the coming year's health, prosperity, and spiritual blessings.",
    howToDo: "Moisten soil gently with clean water daily. Distribute green shoots as blessings on Vijayadashami.",
    icon: "🌱",
  },
  {
    name: "Kanya Pujan (Kumari Puja)",
    hindiName: "कन्या पूजन (अष्टमी / नवमी)",
    day: "Day 8 & Day 9",
    meaning: "Worshipping 9 young girls representing the 9 living forms of the Goddess, honoring the divine feminine.",
    howToDo: "Wash feet in warm water, apply kumkum tilak, and serve traditional Desi Ghee Halwa, Puri, and Kale Chane.",
    icon: "👧",
  }
];

const FASTING_ALLOWED = [
  { name: "Kuttu Atta (Buckwheat)", desc: "Warm & energizing for puris and rotis" },
  { name: "Singhara Atta (Water Chestnut)", desc: "Light and digestible for pakodas and pancakes" },
  { name: "Sabudana (Tapioca Pearls)", desc: "Perfect for energy-rich khichdi and vadas" },
  { name: "Samak Rice (Barnyard Millet)", desc: "Sattvic grain substitute for pulao and kheer" },
  { name: "Sendha Namak (Rock Salt)", desc: "Purest natural mineral salt for all cooking" },
  { name: "Makhana & Dry Fruits", desc: "Fox nuts, roasted almonds, cashews, and walnuts" },
  { name: "Fresh Dairy & Desi Ghee", desc: "Pure cow milk, homemade paneer, curd, and ghee" },
];

const FASTING_RESTRICTED = [
  { name: "Onion & Garlic (Tamasic)", desc: "Strictly avoided to maintain peaceful, meditative focus" },
  { name: "Regular Wheat & White Rice", desc: "Common processed grains paused during the 9-day detox" },
  { name: "Table Salt (Iodized Salt)", desc: "Replaced exclusively with unprocessed Sendha Namak" },
  { name: "Non-Veg & Alcohol", desc: "Total abstention from meat, poultry, fish, and intoxicants" },
  { name: "Pulses & Lentils (Dals)", desc: "Standard lentils are excluded from traditional Vrat recipes" },
  { name: "Packaged Seed / Mustard Oils", desc: "Cook exclusively in pure Desi Ghee or groundnut oil" },
];

export default function RitualsAndFastingGuide() {
  const [activeTab, setActiveTab] = useState<"rituals" | "fasting">("fasting");

  return (
    <section id="vrat-guide" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] to-[#FFFDF9] text-[#2E1508] border-b border-amber-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            Vedic Traditions & Diet Guide
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rozha_One'] text-[#7F1D1D] tracking-tight">
            नवरात्रि विधि, अनुष्ठान एवं फलाहार नियम
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Everything you need for observing Navratri with devotion: step-by-step puja rituals and clear fasting dietary guidelines.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 rounded-2xl bg-amber-100/80 border border-amber-300 mt-2">
            <button
              onClick={() => setActiveTab("fasting")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "fasting"
                  ? "bg-[#7F1D1D] text-white shadow-xs"
                  : "text-amber-900 hover:bg-amber-200/60"
              }`}
            >
              🥗 Fasting Rules & Diet (फलाहार)
            </button>
            <button
              onClick={() => setActiveTab("rituals")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "rituals"
                  ? "bg-[#7F1D1D] text-white shadow-xs"
                  : "text-amber-900 hover:bg-amber-200/60"
              }`}
            >
              🛕 Four Pillar Rituals (अनुष्ठान)
            </button>
          </div>
        </div>

        {/* Tab Content 1: Fasting Rules (What to eat vs avoid) */}
        {activeTab === "fasting" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Permitted Foods (Green Box) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-green-300 shadow-md space-y-5">
              <div className="flex items-center gap-3 border-b border-green-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-green-950">
                    स्वीकार्य फलाहार (Foods Allowed)
                  </h3>
                  <p className="text-xs text-green-800">
                    Sattvic, easily digestible, prana-enriching nourishment
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {FASTING_ALLOWED.map((food) => (
                  <div key={food.name} className="p-3 rounded-xl bg-green-50/60 border border-green-200/80 flex items-start gap-2.5">
                    <span className="text-green-600 font-bold text-sm mt-0.5">✔</span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{food.name}</h4>
                      <p className="text-xs text-stone-600">{food.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avoided Foods (Red Box) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-red-200 shadow-md space-y-5">
              <div className="flex items-center gap-3 border-b border-red-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-red-950">
                    वर्जित आहार (Foods to Avoid)
                  </h3>
                  <p className="text-xs text-red-800">
                    Tamasic or heavy foods that agitate or distract focus
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {FASTING_RESTRICTED.map((food) => (
                  <div key={food.name} className="p-3 rounded-xl bg-red-50/60 border border-red-200/80 flex items-start gap-2.5">
                    <span className="text-red-600 font-bold text-sm mt-0.5">✖</span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{food.name}</h4>
                      <p className="text-xs text-stone-600">{food.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab Content 2: Four Pillar Rituals */}
        {activeTab === "rituals" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {RITUALS_LIST.map((r) => (
              <div
                key={r.name}
                className="p-6 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-[#7F1D1D]">
                      {r.day}
                    </span>
                    <h4 className="text-base font-bold font-serif text-[#7F1D1D] mt-0.5">
                      {r.name}
                    </h4>
                    <p className="text-xs text-stone-500 font-['Rozha_One']">
                      {r.hindiName}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF7F2] p-3 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-0.5">Spiritual Significance:</strong>
                  {r.meaning}
                </p>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-stone-800 leading-relaxed">
                  <strong className="text-amber-900 block mb-0.5 font-bold">How to Perform:</strong>
                  {r.howToDo}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
