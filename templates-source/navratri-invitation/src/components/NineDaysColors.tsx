"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Heart, Shield, Copy, Check, ChevronRight, ChevronLeft, Sun } from "lucide-react";
import { navratriAudio } from "@/lib/navratriAudio";

interface DayDetails {
  dayNumber: number;
  tithi: string;
  avatar: string;
  hindiAvatar: string;
  dressColor: string;
  colorHex: string;
  colorNameHindi: string;
  mantra: string;
  mantraEnglish: string;
  bhog: string;
  chakra: string;
  story: string;
  whatHappens: string;
  image: string;
}

const NAVRATRI_DAYS: DayDetails[] = [
  {
    dayNumber: 1,
    tithi: "Pratipada (प्रतिपदा)",
    avatar: "Maa Shailaputri",
    hindiAvatar: "माँ शैलपुत्री",
    dressColor: "Auspicious Orange",
    colorHex: "#EA580C",
    colorNameHindi: "नारंगी",
    mantra: "वन्दे वाञ्छितलाभाय चन्द्रार्धकृतशेखराम्। वृषारूढां शूलधरां शैलपुत्रीं यशस्विनीम्॥",
    mantraEnglish: "Vande Vanchhitlabhaya Chandrardhakritashekharam, Vrisharudham Shuldharam Shailaputrim Yashasvinim.",
    bhog: "Pure Desi Cow Ghee (शुद्ध गाय का घी)",
    chakra: "Muladhara (Root Chakra) — Stability & Grounding",
    story: "Daughter of the Himalayas, seated atop a sacred royal bull with a divine trident and lotus. She personifies patience and supreme devotion.",
    whatHappens: "Ghatasthapana (Kalash Sthapana) in morning Muhurat, sowing of sacred Jowar (barley) seeds, and lighting of the Akhand Jyot.",
    image: "https://images.unsplash.com/photo-1609137144822-4467c69992f9?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 2,
    tithi: "Dwitiya (द्वितीया)",
    avatar: "Maa Brahmacharini",
    hindiAvatar: "माँ ब्रह्मचारिणी",
    dressColor: "Pure Divine White",
    colorHex: "#64748B",
    colorNameHindi: "श्वेत",
    mantra: "दधाना करपद्माभ्यामक्षमालाकमण्डलू। देवी प्रसीदतु मयि ब्रह्मचारिण्यनुत्तमा॥",
    mantraEnglish: "Dadhana Karapadmabhyamakshamalakamandalu, Devi Prasidatu Mayi Brahmacharinyanuttama.",
    bhog: "Sugar, Mishri & Panchamrit (शर्करा एवं पंचामृत)",
    chakra: "Swadhisthana (Sacral Chakra) — Penance & Self-Discipline",
    story: "Walking barefoot with a Japa Mala and holy Kamandalu, embodying thousands of years of unwavering penance and spiritual wisdom.",
    whatHappens: "Prayers for mental focus and longevity of family members. Chanting of Navarna Mahamantra with white sandalwood beads.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 3,
    tithi: "Tritiya (तृतीया)",
    avatar: "Maa Chandraghanta",
    hindiAvatar: "माँ चंद्रघंटा",
    dressColor: "Passionate Crimson Red",
    colorHex: "#DC2626",
    colorNameHindi: "लाल",
    mantra: "पिण्डजप्रवरारूढा चण्डकोपास्त्रकैर्युता। प्रसीदं तनुते मह्यं चन्द्रघण्टेति विश्रुता॥",
    mantraEnglish: "Pindajapravararudha Chandakopastrakairyuta, Prasidam Tanute Mahyam Chandraghanteti Vishruta.",
    bhog: "Milk Kheer & Mawa Sweets (दूध की खीर)",
    chakra: "Manipura (Solar Plexus) — Fearlessness & Bravery",
    story: "Adorned with a bell-shaped crescent moon on her brow, riding a fierce tigress with ten weapons, ready to destroy evil while radiating maternal warmth.",
    whatHappens: "Ringing of temple bells to sanctify homes and dispel negative energy. Invoking courage to overcome fears.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 4,
    tithi: "Chaturthi (चतुर्थी)",
    avatar: "Maa Kushmanda",
    hindiAvatar: "माँ कूष्माण्डा",
    dressColor: "Royal Deep Blue",
    colorHex: "#1D4ED8",
    colorNameHindi: "नीला",
    mantra: "सुरासम्पूर्णकलशं रुधिराप्लुतमेव च। दधाना हस्तपद्माभ्यां कूष्माण्डा शुभदास्तु मे॥",
    mantraEnglish: "Surasampurnakalasham Rudhiraplutameva Cha, Dadhana Hastapadmabhyam Kushmanda Shubhadastu Me.",
    bhog: "Cardamom Malpua (मालपुआ)",
    chakra: "Anahata (Heart Chakra) — Joy & Universal Radiance",
    story: "Her luminous smile illuminated the primordial darkness to create the universe. She resides at the core of the Sun, radiating cosmic life-force.",
    whatHappens: "Offering sweet Malpua and performing Surya Arghya to pray for glowing vitality and healing for loved ones.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 5,
    tithi: "Panchami (पंचमी)",
    avatar: "Maa Skandamata",
    hindiAvatar: "माँ स्कन्दमाता",
    dressColor: "Bright Pitambari Yellow",
    colorHex: "#D97706",
    colorNameHindi: "पीला",
    mantra: "सिंहासनगता नित्यं पद्माश्रितकरद्वया। शुभदास्तु सदा देवी स्कन्दमाता यशस्विनी॥",
    mantraEnglish: "Sinhasangata Nityam Padmashritakaradvaya, Shubhadastu Sada Devi Skandamata Yashasvini.",
    bhog: "Ripe Bananas & Honey (केला एवं शहद)",
    chakra: "Vishuddha (Throat Chakra) — Maternal Compassion",
    story: "Seated on a celestial lotus, she tenderly holds the infant Lord Skanda (Kartikeya). Worshipping her automatically brings the blessings of Kartikeya.",
    whatHappens: "Upang Lalita Vrat observed for family harmony and progeny. Pandal Garba dances gain peak rhythm.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 6,
    tithi: "Shashthi (षष्ठी)",
    avatar: "Maa Katyayani",
    hindiAvatar: "माँ कात्यायनी",
    dressColor: "Lush Emerald Green",
    colorHex: "#059669",
    colorNameHindi: "हरा",
    mantra: "चन्द्रहासोज्ज्वलकरा शार्दूलवरवाहना। कात्यायनी शुभं दद्याद् देवी दानवघातिनी॥",
    mantraEnglish: "Chandrahasojjvalakara Shardulavaravahana, Katyayani Shubham Dadyad Devi Danavaghatini.",
    bhog: "Pure Forest Honey (शुद्ध शहद)",
    chakra: "Ajna (Third Eye Chakra) — Intuition & Victory",
    story: "Born to Sage Katyayana, she slew the ferocious demon Mahishasura with her Chandrahasa sword atop a roaring golden lion.",
    whatHappens: "Durga Puja Bodhon (unveiling of idols in Bengal) begins. Prayers for harmonious marriage and clearing obstacles.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 7,
    tithi: "Saptami (सप्तमी)",
    avatar: "Maa Kalaratri",
    hindiAvatar: "माँ कालरात्रि",
    dressColor: "Mystic Ash Grey",
    colorHex: "#4B5563",
    colorNameHindi: "धूसर",
    mantra: "एकवेणी जपाकर्णपूरा नग्ना खरास्थिता। लम्बोष्ठी कर्णिकाकर्णी तैलाभ्यक्तशरीरिणी॥",
    mantraEnglish: "Ekaveni Japakarnapura Nagna Kharasthita, Lamboshthi Karnikakarni Tailabhyaktasharirini.",
    bhog: "Natural Jaggery / Gur (गुड़ का भोग)",
    chakra: "Sahasrara (Crown Chakra) — Vanquishing Fear & Ego",
    story: "With a complexion black as the cosmic night, unbound hair, and three blazing eyes, she destroyed demons Chanda, Munda, and Raktabija.",
    whatHappens: "Maha Saptami Saraswati Avahan and Navapatrika entrance. Midnight Dandiya Raas with full community participation.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 8,
    tithi: "Ashtami (दुर्गा अष्टमी)",
    avatar: "Maa Mahagauri",
    hindiAvatar: "माँ महागौरी",
    dressColor: "Royal Purple",
    colorHex: "#7C3AED",
    colorNameHindi: "बैंगनी",
    mantra: "श्वेते वृषे समारूढा श्वेताम्बरधरा शुचिः। महागौरी शुभं दद्यान्महादेवप्रमोददा॥",
    mantraEnglish: "Shwete Vrishe Samarudha Shwetambaradhara Shuchih, Mahagauri Shubham Dadyanmahadevpramodada.",
    bhog: "Fresh Coconut & Halwa (नारियल एवं हलवा)",
    chakra: "Soma Chakra — Absolute Purity & Forgiveness",
    story: "Bathed in the celestial Ganga by Lord Shiva, her body shines with incandescent moonlight purity, purifying the sins of all who seek her refuge.",
    whatHappens: "Maha Ashtami Sandhi Puja with 108 oil lamps. Start of Kanya Pujan (washing feet and revering young girls).",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  },
  {
    dayNumber: 9,
    tithi: "Navami (महानवमी)",
    avatar: "Maa Siddhidatri",
    hindiAvatar: "माँ सिद्धिदात्री",
    dressColor: "Peacock Ocean Blue",
    colorHex: "#0284C7",
    colorNameHindi: "मयूर नीला",
    mantra: "सिद्धगन्धर्वयक्षाद्यैरसुरैरमरैरपि। सेव्यमाना सदा भूयात् सिद्धिदा सिद्धिदायिनी॥",
    mantraEnglish: "Siddhagandharvayakshadyairasurairamarairapi, Sevyamana Sada Bhuyat Siddhida Siddhidayini.",
    bhog: "Til, Poha & Kheer Prasad (तिल एवं खीर)",
    chakra: "All Chakras Unified — Realization & Mastery",
    story: "Grantor of all 8 Siddhis (supernatural spiritual powers) and 9 Nidhis. Seated on a blooming lotus, she completes the Navratri spiritual journey.",
    whatHappens: "Sacred Navami Havan, grand Kanya Bhoj (Halwa, Puri, Chana feast), Ayudha Puja (worship of tools and books).",
    image: "/maa_durga.jpg",
  }
];

export default function NineDaysColors() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [copiedMantra, setCopiedMantra] = useState(false);

  const currentDay = NAVRATRI_DAYS.find((d) => d.dayNumber === selectedDay) || NAVRATRI_DAYS[0];

  const handleSelectDay = (dayNum: number) => {
    setSelectedDay(dayNum);
    navratriAudio.playAartiChime();
  };

  const copyMantraToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(currentDay.mantra);
      setCopiedMantra(true);
      setTimeout(() => setCopiedMantra(false), 2000);
    }
  };

  return (
    <section id="nine-days" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#2E1508] border-b border-amber-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Daily Dress Code & Divine Guide
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rozha_One'] text-[#7F1D1D] tracking-tight">
            ९ दिन, ९ पावन रंग एवं नवदुर्गा स्वरूप
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Click on any day below to find what color to wear today, which avatar is worshipped, the sacred Sanskrit mantra, and the traditional prasad.
          </p>
        </div>

        {/* 9-Day Horizontal Selector (Clean & Super Easy to Click) */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-3">
          {NAVRATRI_DAYS.map((d) => {
            const isSelected = selectedDay === d.dayNumber;
            return (
              <button
                key={d.dayNumber}
                onClick={() => handleSelectDay(d.dayNumber)}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer shadow-xs ${
                  isSelected
                    ? "bg-white border-[#7F1D1D] shadow-md ring-3 ring-amber-300/50 scale-105"
                    : "bg-white/80 border-amber-200 hover:border-amber-400 hover:bg-white"
                }`}
              >
                {/* Large Color Dot */}
                <div
                  className="w-7 h-7 rounded-full shadow-inner mb-2 border border-black/10"
                  style={{ backgroundColor: d.colorHex }}
                />
                
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Day {d.dayNumber}
                </span>

                <span className="text-xs font-bold text-[#7F1D1D] font-['Rozha_One'] mt-0.5 line-clamp-1">
                  {d.hindiAvatar.replace("माँ ", "")}
                </span>

                <span className="text-[10px] text-stone-600 font-medium mt-0.5 truncate">
                  {d.colorNameHindi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Interactive Day View Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.dayNumber}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl bg-white border border-amber-300 shadow-xl overflow-hidden"
          >
            {/* Header Banner in Today's Sacred Color */}
            <div
              className="p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ backgroundColor: currentDay.colorHex }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/25 backdrop-blur-md">
                  {currentDay.tithi} • Day {currentDay.dayNumber} of 9
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-['Rozha_One'] mt-2 tracking-wide">
                  {currentDay.avatar} ({currentDay.hindiAvatar})
                </h3>
              </div>

              {/* What Color to Wear Pill */}
              <div className="bg-white text-stone-900 px-5 py-3 rounded-2xl shadow-md flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border border-black/10 shadow-inner shrink-0"
                  style={{ backgroundColor: currentDay.colorHex }}
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">
                    Today's Dress Color
                  </span>
                  <span className="text-sm font-extrabold text-[#7F1D1D]">
                    {currentDay.dressColor} ({currentDay.colorNameHindi})
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Body Information */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Portrait & Highlights */}
              <div className="lg:col-span-4 space-y-4">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-amber-200 shadow-sm">
                  <Image
                    src={currentDay.image}
                    alt={currentDay.avatar}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-center">
                    <span className="text-xs font-bold text-amber-300">
                      {currentDay.tithi}
                    </span>
                    <h4 className="text-base font-bold font-['Rozha_One']">
                      {currentDay.hindiAvatar}
                    </h4>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <span className="text-[11px] font-bold text-[#7F1D1D] uppercase tracking-wider block">
                    🍯 Sacred Prasad / Bhog
                  </span>
                  <p className="text-sm font-bold text-stone-900">
                    {currentDay.bhog}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    ☸️ Associated Chakra
                  </span>
                  <p className="text-xs font-bold text-stone-800">
                    {currentDay.chakra}
                  </p>
                </div>
              </div>

              {/* Right Column: Mantra, Legend & Key Ritual */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Dhyana Mantra */}
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7F1D1D] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Sacred Dhyana Mantra (ध्यान मंत्र)
                    </span>
                    <button
                      onClick={copyMantraToClipboard}
                      className="text-xs font-bold text-amber-800 hover:text-[#7F1D1D] flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-xs"
                    >
                      {copiedMantra ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMantra ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="font-['Rozha_One'] text-base sm:text-lg text-[#7F1D1D] font-bold leading-relaxed">
                    "{currentDay.mantra}"
                  </p>
                  <p className="text-xs text-stone-600 font-mono italic">
                    {currentDay.mantraEnglish}
                  </p>
                </div>

                {/* Divine Story */}
                <div className="space-y-1.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Significance & Form of the Avatar
                  </h5>
                  <p className="text-sm text-stone-700 leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-stone-200">
                    {currentDay.story}
                  </p>
                </div>

                {/* Key Ritual On This Day */}
                <div className="space-y-1.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Key Ritual & Observance
                  </h5>
                  <div className="p-4 rounded-xl bg-amber-100/50 border border-amber-300 flex items-start gap-3">
                    <span className="text-xl">🪔</span>
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                      {currentDay.whatHappens}
                    </p>
                  </div>
                </div>

                {/* Previous / Next Day Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-amber-200 text-xs font-bold">
                  <button
                    onClick={() => handleSelectDay(selectedDay > 1 ? selectedDay - 1 : 9)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#7F1D1D] flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Day ({selectedDay > 1 ? selectedDay - 1 : 9})
                  </button>

                  <span className="text-stone-500 font-semibold">
                    Day {selectedDay} of 9
                  </span>

                  <button
                    onClick={() => handleSelectDay(selectedDay < 9 ? selectedDay + 1 : 1)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#7F1D1D] flex items-center gap-1 transition-colors"
                  >
                    Next Day ({selectedDay < 9 ? selectedDay + 1 : 1})
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
