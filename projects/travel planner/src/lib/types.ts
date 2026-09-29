export interface StopLocation {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 for responsive SVG map
  description: string;
  dayNumbers: number[];
}

export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  category: 'culture' | 'food' | 'adventure' | 'relaxation' | 'sightseeing' | 'nature';
  duration: string;
  location: string;
  cost: number;
  image?: string;
  included: boolean;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  locationName: string;
  locationId: string;
  bgImage: string;
  theme: string;
  activities: ActivityItem[];
  tips: string;
}

export interface StayOption {
  id: string;
  name: string;
  location: string;
  style: string;
  pricePerNight: number;
  rating: number;
  image: string;
  nights: number;
  selected: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  origin: string;
  description: string;
  priceEstimate: number;
  image: string;
  selected: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  image: string;
  highlight: string;
  selected: boolean;
}

export interface TransportLeg {
  from: string;
  to: string;
  mode: string;
  duration: string;
  cost: number;
}

export interface DestinationData {
  id: string;
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  region: string;
  defaultDays: number;
  bestSeason: string;
  vibe: string[];
  description: string;
  sampleBudget: { low: number; moderate: number; luxury: number };
  stops: StopLocation[];
  sampleItinerary: DayPlan[];
  stays: StayOption[];
  foods: FoodItem[];
  experiences: ExperienceItem[];
  transports: TransportLeg[];
}

export interface PackingItem {
  id: string;
  item: string;
  category: 'Essentials' | 'Gear' | 'Clothing' | 'Health';
  packed: boolean;
}

export interface TripNote {
  id: string;
  text: string;
  date: string;
}

export interface TripConfig {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  heroImage: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  travelers: {
    type: 'solo' | 'couple' | 'friends' | 'family';
    adults: number;
    children: number;
  };
  styles: string[];
  budgetTier: 'low' | 'moderate' | 'premium' | 'luxury';
  stops: StopLocation[];
  dailyPlans: DayPlan[];
  stays: StayOption[];
  foods: FoodItem[];
  experiences: ExperienceItem[];
  transports: TransportLeg[];
  packingList: PackingItem[];
  notes: TripNote[];
  createdAt: string;
}
