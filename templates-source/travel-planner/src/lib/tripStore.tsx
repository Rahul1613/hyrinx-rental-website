'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TripConfig, DestinationData, DayPlan, StayOption, FoodItem, ExperienceItem, PackingItem, TripNote } from './types';
import { DESTINATIONS } from './destinations';

const SAVED_TRIPS_KEY = 'roam_saved_trips';
const ACTIVE_TRIP_KEY = 'roam_active_trip';

interface TripContextType {
  currentTrip: TripConfig;
  destinations: DestinationData[];
  selectedDestination: DestinationData;
  activeDayNumber: number;
  activeStopId: string;
  savedTrips: TripConfig[];
  experienceMode: boolean;
  isPlanningModalOpen: boolean;

  // Actions
  selectDestination: (destinationId: string) => void;
  setActiveDayNumber: (day: number) => void;
  setActiveStopId: (stopId: string) => void;
  updateTripDetails: (details: Partial<TripConfig>) => void;
  toggleStay: (stayId: string) => void;
  toggleFood: (foodId: string) => void;
  toggleExperience: (experienceId: string) => void;
  toggleActivity: (dayNumber: number, activityId: string) => void;
  togglePackingItem: (itemId: string) => void;
  addNote: (text: string) => void;
  deleteNote: (noteId: string) => void;
  saveCurrentTrip: () => void;
  loadTrip: (trip: TripConfig) => void;
  deleteSavedTrip: (tripId: string) => void;
  duplicateSavedTrip: (tripId: string) => void;
  setExperienceMode: (active: boolean) => void;
  setIsPlanningModalOpen: (open: boolean) => void;
  calculateBudgetBreakdown: () => {
    staysTotal: number;
    experiencesTotal: number;
    foodTotal: number;
    transportTotal: number;
    total: number;
  };
}

const defaultPackingList: PackingItem[] = [
  { id: 'pack-1', item: 'Passport & International Driving Permit', category: 'Essentials', packed: true },
  { id: 'pack-2', item: 'Universal Travel Power Adapter (Type A/C)', category: 'Gear', packed: true },
  { id: 'pack-3', item: 'Mirrorless Camera & Prime 35mm Lens', category: 'Gear', packed: false },
  { id: 'pack-4', item: 'Lightweight Weatherproof Windbreaker', category: 'Clothing', packed: false },
  { id: 'pack-5', item: 'Comfortable Walking Sneakers / Slip-ons', category: 'Clothing', packed: true },
  { id: 'pack-6', item: '20,000mAh Fast-Charging Power Bank', category: 'Gear', packed: true },
  { id: 'pack-7', item: 'Travel Insurance Documents & IC Cards', category: 'Essentials', packed: false },
];

export const createDefaultTrip = (dest: DestinationData): TripConfig => {
  return {
    id: `trip-${dest.id}-${Date.now()}`,
    title: `${dest.name} Discovery Journey`,
    destinationId: dest.id,
    destinationName: dest.name,
    heroImage: dest.heroImage,
    startDate: '2026-05-10',
    endDate: '2026-05-17',
    totalDays: dest.defaultDays,
    travelers: {
      type: 'couple',
      adults: 2,
      children: 0,
    },
    styles: ['Culture', 'Food', 'Photography'],
    budgetTier: 'moderate',
    stops: dest.stops,
    dailyPlans: dest.sampleItinerary,
    stays: dest.stays,
    foods: dest.foods,
    experiences: dest.experiences,
    transports: dest.transports,
    packingList: defaultPackingList,
    notes: [
      { id: 'note-1', text: 'Reserve Michelin-star omakase counter 3 weeks prior.', date: 'May 10' },
      { id: 'note-2', text: 'Pick up pocket Wi-Fi at Narita / Haneda airport terminal.', date: 'May 10' },
      { id: 'note-3', text: 'Wake early for Fushimi Inari torii walk at sunrise.', date: 'May 14' },
    ],
    createdAt: new Date().toISOString(),
  };
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [destinations] = useState<DestinationData[]>(DESTINATIONS);
  const [selectedDestination, setSelectedDestination] = useState<DestinationData>(DESTINATIONS[0]);
  const [currentTrip, setCurrentTrip] = useState<TripConfig>(createDefaultTrip(DESTINATIONS[0]));
  const [activeDayNumber, setActiveDayNumberState] = useState<number>(1);
  const [activeStopId, setActiveStopId] = useState<string>('tokyo');
  const [savedTrips, setSavedTrips] = useState<TripConfig[]>([]);
  const [experienceMode, setExperienceMode] = useState<boolean>(false);
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState<boolean>(false);

  // Load saved trips on mount
  useEffect(() => {
    try {
      const storedTrips = localStorage.getItem(SAVED_TRIPS_KEY);
      if (storedTrips) {
        setSavedTrips(JSON.parse(storedTrips));
      }
      const storedActive = localStorage.getItem(ACTIVE_TRIP_KEY);
      if (storedActive) {
        const parsed = JSON.parse(storedActive);
        setCurrentTrip(parsed);
        const matchDest = DESTINATIONS.find((d) => d.id === parsed.destinationId);
        if (matchDest) setSelectedDestination(matchDest);
      }
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
  }, []);

  // Save active trip automatically
  const persistActiveTrip = (trip: TripConfig) => {
    setCurrentTrip(trip);
    try {
      localStorage.setItem(ACTIVE_TRIP_KEY, JSON.stringify(trip));
    } catch (e) {}
  };

  const selectDestination = (destId: string) => {
    const dest = DESTINATIONS.find((d) => d.id === destId) || DESTINATIONS[0];
    setSelectedDestination(dest);
    const newTrip = createDefaultTrip(dest);
    persistActiveTrip(newTrip);
    setActiveDayNumberState(1);
    if (dest.stops[0]) setActiveStopId(dest.stops[0].id);
  };

  const setActiveDayNumber = (day: number) => {
    setActiveDayNumberState(day);
    const dayPlan = currentTrip.dailyPlans.find((p) => p.dayNumber === day);
    if (dayPlan) {
      setActiveStopId(dayPlan.locationId);
    }
  };

  const updateTripDetails = (details: Partial<TripConfig>) => {
    const updated = { ...currentTrip, ...details };
    persistActiveTrip(updated);
  };

  const toggleStay = (stayId: string) => {
    const updatedStays = currentTrip.stays.map((s) => (s.id === stayId ? { ...s, selected: !s.selected } : s));
    updateTripDetails({ stays: updatedStays });
  };

  const toggleFood = (foodId: string) => {
    const updatedFoods = currentTrip.foods.map((f) => (f.id === foodId ? { ...f, selected: !f.selected } : f));
    updateTripDetails({ foods: updatedFoods });
  };

  const toggleExperience = (expId: string) => {
    const updatedExps = currentTrip.experiences.map((e) => (e.id === expId ? { ...e, selected: !e.selected } : e));
    updateTripDetails({ experiences: updatedExps });
  };

  const toggleActivity = (dayNumber: number, activityId: string) => {
    const updatedDays = currentTrip.dailyPlans.map((d) => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          activities: d.activities.map((a) => (a.id === activityId ? { ...a, included: !a.included } : a)),
        };
      }
      return d;
    });
    updateTripDetails({ dailyPlans: updatedDays });
  };

  const togglePackingItem = (itemId: string) => {
    const updatedPacking = currentTrip.packingList.map((p) => (p.id === itemId ? { ...p, packed: !p.packed } : p));
    updateTripDetails({ packingList: updatedPacking });
  };

  const addNote = (text: string) => {
    if (!text.trim()) return;
    const newNote: TripNote = {
      id: `note-${Date.now()}`,
      text,
      date: 'Just now',
    };
    updateTripDetails({ notes: [newNote, ...currentTrip.notes] });
  };

  const deleteNote = (noteId: string) => {
    updateTripDetails({ notes: currentTrip.notes.filter((n) => n.id !== noteId) });
  };

  const saveCurrentTrip = () => {
    const exists = savedTrips.some((t) => t.id === currentTrip.id);
    let updated: TripConfig[];
    if (exists) {
      updated = savedTrips.map((t) => (t.id === currentTrip.id ? currentTrip : t));
    } else {
      updated = [currentTrip, ...savedTrips];
    }
    setSavedTrips(updated);
    try {
      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const loadTrip = (trip: TripConfig) => {
    persistActiveTrip(trip);
    const matchDest = DESTINATIONS.find((d) => d.id === trip.destinationId);
    if (matchDest) setSelectedDestination(matchDest);
    setActiveDayNumberState(1);
    if (trip.stops[0]) setActiveStopId(trip.stops[0].id);
  };

  const deleteSavedTrip = (tripId: string) => {
    const updated = savedTrips.filter((t) => t.id !== tripId);
    setSavedTrips(updated);
    try {
      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const duplicateSavedTrip = (tripId: string) => {
    const found = savedTrips.find((t) => t.id === tripId);
    if (!found) return;
    const duplicated: TripConfig = {
      ...found,
      id: `trip-${found.destinationId}-${Date.now()}`,
      title: `${found.title} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    const updated = [duplicated, ...savedTrips];
    setSavedTrips(updated);
    try {
      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const calculateBudgetBreakdown = () => {
    const multiplier = currentTrip.travelers.adults + currentTrip.travelers.children * 0.5;
    const staysTotal = currentTrip.stays.filter((s) => s.selected).reduce((acc, s) => acc + s.pricePerNight * s.nights, 0);
    const experiencesTotal = currentTrip.experiences
      .filter((e) => e.selected)
      .reduce((acc, e) => acc + e.price * multiplier, 0);
    const foodTotal = currentTrip.foods
      .filter((f) => f.selected)
      .reduce((acc, f) => acc + f.priceEstimate * multiplier * (currentTrip.totalDays / 2), 0);
    const transportTotal = currentTrip.transports.reduce((acc, t) => acc + t.cost * multiplier, 0);

    const total = Math.round(staysTotal + experiencesTotal + foodTotal + transportTotal);
    return {
      staysTotal: Math.round(staysTotal),
      experiencesTotal: Math.round(experiencesTotal),
      foodTotal: Math.round(foodTotal),
      transportTotal: Math.round(transportTotal),
      total,
    };
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        destinations,
        selectedDestination,
        activeDayNumber,
        activeStopId,
        savedTrips,
        experienceMode,
        isPlanningModalOpen,
        selectDestination,
        setActiveDayNumber,
        setActiveStopId,
        updateTripDetails,
        toggleStay,
        toggleFood,
        toggleExperience,
        toggleActivity,
        togglePackingItem,
        addNote,
        deleteNote,
        saveCurrentTrip,
        loadTrip,
        deleteSavedTrip,
        duplicateSavedTrip,
        setExperienceMode,
        setIsPlanningModalOpen,
        calculateBudgetBreakdown,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within TripProvider');
  }
  return context;
}
