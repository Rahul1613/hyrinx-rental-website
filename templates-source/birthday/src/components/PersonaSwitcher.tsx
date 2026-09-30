"use client";

import { useState } from "react";
import { Sliders, Sparkles, X, Check, Users } from "lucide-react";
import { BirthdayProfile, BIRTHDAY_PROFILES } from "@/lib/birthdayConfig";

interface PersonaSwitcherProps {
  currentProfile: BirthdayProfile;
  onSelectProfile: (profile: BirthdayProfile) => void;
}

export default function PersonaSwitcher({
  currentProfile,
  onSelectProfile,
}: PersonaSwitcherProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Custom persona draft state
  const [customName, setCustomName] = useState("Aarav Roy");
  const [customAge, setCustomAge] = useState(28);
  const [customRole, setCustomRole] = useState("The Adventurer & Filmmaker");
  const [customHeadline, setCustomHeadline] = useState(
    "Twenty-eight summits climbed. Here's to uncharted trails ahead."
  );
  const [customSubheadline, setCustomSubheadline] = useState(
    "Join us for rooftop barbecue, mountain travel stories, cold brews, and starry skies."
  );
  const [customInterests, setCustomInterests] = useState(
    "Trail Running, Drone Cinema, Vinyl Records, Black Coffee"
  );
  const [customDate, setCustomDate] = useState("Saturday, October 24, 2026");
  const [customVenue, setCustomVenue] = useState("Skyline Rooftop Lounge");
  const [customAddress, setCustomAddress] = useState("18 Residency Road, Indiranagar, Bangalore");
  const [customColor, setCustomColor] = useState("#F59E0B");

  const applyCustomPersona = (e: React.FormEvent) => {
    e.preventDefault();
    const pills = customInterests
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const customProfile: BirthdayProfile = {
      id: "custom-" + Date.now(),
      label: `Custom: ${customName} (${customAge})`,
      badgeRole: customRole,
      name: customName,
      age: customAge,
      headline: customHeadline,
      subheadline: customSubheadline,
      personalityPills: pills.length > 0 ? pills : ["Good Music", "Great Food", "Celebration"],
      theme: {
        accent: customColor,
        accentGlow: `${customColor}40`,
        badgeBg: "#161D2F",
        badgeText: customColor,
        borderAccent: customColor,
        primaryBtn: `bg-[${customColor}] text-[#090D16] hover:opacity-90`,
      },
      eventDetails: {
        date: customDate,
        time: "7:00 PM onwards",
        venue: customVenue,
        address: customAddress,
        dressCode: "Smart Casual & Cheerful Energy",
        mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(customVenue + " " + customAddress)}`,
        coordinates: { lat: 12.9784, lng: 77.6408 },
        calendarTitle: `${customName}'s ${customAge}th Birthday Celebration`,
        calendarDesc: `Celebrating ${customName} turning ${customAge}!`,
      },
      photos: currentProfile.photos,
      timeline: [
        {
          year: 2026 - customAge,
          title: "The Genesis",
          location: "Origins",
          story: `The world became considerably brighter the day ${customName.split(" ")[0]} was born.`,
          tag: "Origins",
        },
        {
          year: 2026 - Math.floor(customAge * 0.5),
          title: "First Major Breakthrough",
          location: "The Formative Years",
          story: "Discovered an enduring passion, lifelong companions, and a drive to build memorable stories.",
          tag: "Growth",
        },
        {
          year: 2024,
          title: "A Defining Milestone",
          location: "Uncharted Waters",
          story: "Stepped boldly outside the comfort zone and took pride in every hard-won stride.",
          tag: "Milestone",
        },
        {
          year: 2026,
          title: `Stepping into ${customAge}`,
          location: "The Next Era",
          story: `Celebrating ${customAge} memorable years surrounded by the people who believe in ${customName.split(" ")[0]} the most.`,
          tag: "Present Day",
        },
      ],
    };

    onSelectProfile(customProfile);
    setModalOpen(false);
  };

  return (
    <>
      {/* Top Banner Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#070A11]/85 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm tracking-wide text-white">
              {currentProfile.name.split(" ")[0]} turns {currentProfile.age}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Preset Badges */}
            <div className="hidden md:flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/10">
              {Object.values(BIRTHDAY_PROFILES).map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => onSelectProfile(profile)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    currentProfile.id === profile.id
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {profile.label.split("(")[0].trim()}
                </button>
              ))}
            </div>

            {/* Customizer Drawer Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Personalize Anyone</span>
            </button>
          </div>
        </div>
      </header>

      {/* Persona Customizer Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0C1220] p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Users className="h-3.5 w-3.5" />
                  <span>Celebration Personalizer</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  Tailor for Any Age, Relation & Profession
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close dialog"
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Instantly customize this celebration website for your boyfriend, girlfriend, child, teen, grandfather, mother, or best friend.
            </p>

            <form onSubmit={applyCustomPersona} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label htmlFor="custom-name" className="block text-xs font-mono text-slate-300 mb-1">
                    Birthday Star's Name *
                  </label>
                  <input
                    id="custom-name"
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="custom-age" className="block text-xs font-mono text-slate-300 mb-1">
                    Turning Age *
                  </label>
                  <input
                    id="custom-age"
                    type="number"
                    min={1}
                    max={120}
                    required
                    value={customAge}
                    onChange={(e) => setCustomAge(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="custom-role" className="block text-xs font-mono text-slate-300 mb-1">
                  Role / Persona Moniker
                </label>
                <input
                  id="custom-role"
                  type="text"
                  placeholder="e.g. The Lifelong Dreamer, Chief Architect, Rocker"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="custom-headline" className="block text-xs font-mono text-slate-300 mb-1">
                  Hero Headline
                </label>
                <input
                  id="custom-headline"
                  type="text"
                  value={customHeadline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="custom-interests" className="block text-xs font-mono text-slate-300 mb-1">
                  Personality Tags (comma separated)
                </label>
                <input
                  id="custom-interests"
                  type="text"
                  placeholder="e.g. Cricket, Filter Coffee, Vinyl, Himalayan Treks"
                  value={customInterests}
                  onChange={(e) => setCustomInterests(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="custom-date" className="block text-xs font-mono text-slate-300 mb-1">
                    Event Date
                  </label>
                  <input
                    id="custom-date"
                    type="text"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="custom-venue" className="block text-xs font-mono text-slate-300 mb-1">
                    Venue
                  </label>
                  <input
                    id="custom-venue"
                    type="text"
                    value={customVenue}
                    onChange={(e) => setCustomVenue(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="custom-address" className="block text-xs font-mono text-slate-300 mb-1">
                  Full Address
                </label>
                <input
                  id="custom-address"
                  type="text"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070A11] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-[#090D16] py-3 text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Check className="h-4 w-4" />
                  <span>Update Birthday Website Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
