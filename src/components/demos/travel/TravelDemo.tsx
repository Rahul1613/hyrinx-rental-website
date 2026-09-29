'use client';

import React, { useState } from 'react';
import { TripProvider } from './lib/tripStore';
import AppNav from './components/AppNav';
import CinematicHero from './components/CinematicHero';
import InteractiveJourneyRoute from './components/InteractiveJourneyRoute';
import DailyItineraryStory from './components/DailyItineraryStory';
import StaysSection from './components/StaysSection';
import FoodSection from './components/FoodSection';
import ExperiencesSection from './components/ExperiencesSection';
import TransportSection from './components/TransportSection';
import BudgetVisualization from './components/BudgetVisualization';
import PackingAndNotesSection from './components/PackingAndNotesSection';
import MoodDiscoverySection from './components/MoodDiscoverySection';
import DestinationGallery from './components/DestinationGallery';
import AppFooter from './components/AppFooter';
import TripPlannerModal from './components/TripPlannerModal';
import ExperienceTripMode from './components/ExperienceTripMode';
import MyTripsModal from './components/MyTripsModal';
import ShareModal from './components/ShareModal';
import TripCustomizerModal from './components/TripCustomizerModal';

function TravelDemoContent() {
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations-gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-white overflow-x-hidden">
      {/* 1. Floating Luxury Navigation */}
      <AppNav
        onOpenMyTrips={() => setIsMyTripsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* 2. Full-Screen Cinematic Hero */}
      <CinematicHero onExploreClick={scrollToDestinations} />

      {/* 3. Interactive Journey Route & Stylized Map */}
      <InteractiveJourneyRoute />

      {/* 4. Daily Itinerary Story (Timeline & Activities) */}
      <DailyItineraryStory />

      {/* 5. Where You'll Stay (Ryokans & Design Hotels) */}
      <StaysSection />

      {/* 6. What's Worth Tasting (Culinary Counters) */}
      <FoodSection />

      {/* 7. Don't Just See It. Do It. (Bucket Experiences) */}
      <ExperiencesSection />

      {/* 8. How You Move (Bullet Trains & Scenic Corridors) */}
      <TransportSection />

      {/* 9. Dynamic Financial Architecture & Budget */}
      <BudgetVisualization />

      {/* 10. Packing Checklist & Scratchpad Notes */}
      <PackingAndNotesSection />

      {/* 11. Psychography & Mood Travel Discovery */}
      <MoodDiscoverySection />

      {/* 12. Global Destination Portfolio */}
      <DestinationGallery />

      {/* 13. High-Impact Footer */}
      <AppFooter />

      {/* Modals & Fullscreen Presentation Modes */}
      <TripPlannerModal />
      <ExperienceTripMode />
      <MyTripsModal isOpen={isMyTripsOpen} onClose={() => setIsMyTripsOpen(false)} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <TripCustomizerModal isOpen={isCustomizerOpen} onClose={() => setIsCustomizerOpen(false)} />
    </div>
  );
}

export default function TravelDemo() {
  return (
    <TripProvider>
      <TravelDemoContent />
    </TripProvider>
  );
}
