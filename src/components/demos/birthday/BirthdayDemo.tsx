"use client";

import React, { useState } from "react";
import BirthdayMusicBar from "./components/BirthdayMusicBar";
import FireworksCanvas from "./components/FireworksCanvas";
import FloatingBalloons from "./components/FloatingBalloons";
import BirthdayHero from "./components/BirthdayHero";
import InteractiveCake from "./components/InteractiveCake";
import SurpriseGiftBox from "./components/SurpriseGiftBox";
import BirthdayVideoPlayer from "./components/BirthdayVideoPlayer";
import InteractiveLoveLetter from "./components/InteractiveLoveLetter";
import PolaroidMemories from "./components/PolaroidMemories";
import WishingWell from "./components/WishingWell";
import FloatingReactions from "./components/FloatingReactions";
import PersonalizeModal from "./components/PersonalizeModal";

export default function BirthdayDemo() {
  const [person, setPerson] = useState({
    name: "Rahul",
    age: 24,
    nickname: "Brother & Legend",
    tagline:
      "To the truest brother, the wildest laughter, and the most loyal soul. May this year be your biggest, boldest, and happiest chapter yet!",
  });

  const [fireworksActive, setFireworksActive] = useState(false);
  const [personalizeOpen, setPersonalizeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070e] text-[#f1f5f9] relative pb-28 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Floating Music & Control Bar */}
      <BirthdayMusicBar
        onToggleFireworks={() => setFireworksActive(!fireworksActive)}
        onOpenPersonalize={() => setPersonalizeOpen(true)}
      />

      {/* Fullscreen Celebration Fireworks (when active) */}
      <FireworksCanvas
        isActive={fireworksActive}
        onClose={() => setFireworksActive(false)}
      />

      {/* Interactive Floating Colorful Balloons (Click to Pop with Confetti) */}
      <FloatingBalloons />

      {/* Grand Hero Section */}
      <BirthdayHero
        name={person.name}
        age={person.age}
        nickname={person.nickname}
        tagline={person.tagline}
        onLaunchFireworks={() => setFireworksActive(true)}
      />

      {/* Interactive Birthday Cake with Blowable Candles & Wish Ceremony */}
      <InteractiveCake name={person.name} age={person.age} />

      {/* 3D Mystery Gift Unboxing Surprise */}
      <SurpriseGiftBox name={person.name} age={person.age} />

      {/* Cinematic Birthday Video Reel Player */}
      <BirthdayVideoPlayer name={person.name} />

      {/* Wax-Sealed Handwritten Birthday Love Letter */}
      <InteractiveLoveLetter name={person.name} age={person.age} />

      {/* Aesthetic Polaroid Memory Wall with Tilt & Like Effects */}
      <PolaroidMemories name={person.name} />

      {/* Virtual Wishing Well */}
      <WishingWell birthdayPersonName={person.name} />

      {/* Sticky Bottom Interactive Floating Reaction Emojis */}
      <FloatingReactions />

      {/* Personalize Modal to customize name, age, and wishes */}
      <PersonalizeModal
        isOpen={personalizeOpen}
        onClose={() => setPersonalizeOpen(false)}
        currentData={person}
        onSave={(newData) => setPerson(newData)}
      />

      {/* Warm Celebration Footer */}
      <footer className="mt-20 border-t border-white/10 py-10 text-center text-xs text-slate-400">
        <p className="font-display text-base font-bold text-white mb-1">
          Made with Love & Confetti for {person.name}’s Special Day 🎂
        </p>
        <p>Turn the music up, take plenty of photos, and make every single moment count.</p>
      </footer>
    </div>
  );
}
