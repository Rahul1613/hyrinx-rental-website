export interface TimelineEvent {
  year: number;
  title: string;
  location: string;
  story: string;
  tag: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  year: number;
  location: string;
}

export interface BirthdayProfile {
  id: string;
  label: string;
  badgeRole: string;
  name: string;
  age: number;
  headline: string;
  subheadline: string;
  personalityPills: string[];
  theme: {
    accent: string;
    accentGlow: string;
    badgeBg: string;
    badgeText: string;
    borderAccent: string;
    primaryBtn: string;
  };
  eventDetails: {
    date: string;
    time: string;
    venue: string;
    address: string;
    dressCode: string;
    mapsUrl: string;
    coordinates: { lat: number; lng: number };
    calendarTitle: string;
    calendarDesc: string;
  };
  photos: PhotoItem[];
  timeline: TimelineEvent[];
}

export const BIRTHDAY_PROFILES: Record<string, BirthdayProfile> = {
  maya: {
    id: "maya",
    label: "Young Adult (Creative & Indie)",
    badgeRole: "The Storyteller",
    name: "Maya Sharma",
    age: 24,
    headline: "Twenty-four chapters written. The next volume begins tonight.",
    subheadline: "An evening of analog photos, acoustic playlists, slow-cooked dinner, and the warmest humans in the city.",
    personalityPills: ["Indie Folk", "35mm Film", "V60 Pour-Overs", "Monsoon Drives", "Used Bookstores"],
    theme: {
      accent: "#F6D062",
      accentGlow: "rgba(246, 208, 98, 0.25)",
      badgeBg: "#1E1A11",
      badgeText: "#F6D062",
      borderAccent: "#F6D062",
      primaryBtn: "bg-[#F6D062] text-[#090D16] hover:bg-[#ffe380]",
    },
    eventDetails: {
      date: "Saturday, October 17, 2026",
      time: "7:30 PM onwards",
      venue: "The Glasshouse Conservatory & Courtyard",
      address: "Lane 4, Koregaon Park South, Pune",
      dressCode: "Autumn Warmth & Comfortable Shoes (we dance on grass)",
      mapsUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
      coordinates: { lat: 18.5362, lng: 73.8939 },
      calendarTitle: "Maya's 24th Birthday Celebration",
      calendarDesc: "Celebrating Maya turning 24 with food, acoustic music, and old friends.",
    },
    photos: [
      {
        id: "p1",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        caption: "Golden hour at the hillside observatory, October afternoon.",
        year: 2024,
        location: "Khandala Ghats",
      },
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
        caption: "Mid-laugh right before blowing out 22 candles in our first tiny studio.",
        year: 2024,
        location: "Studio 304",
      },
      {
        id: "p3",
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
        caption: "The unedited chaos of the late-night seaside chai run with the gang.",
        year: 2025,
        location: "Marine Drive",
      },
      {
        id: "p4",
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
        caption: "Catching the sunset light through vintage Kodachrome film.",
        year: 2025,
        location: "Fort Precinct",
      },
      {
        id: "p5",
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
        caption: "Basement jam session that stretched till sunrise.",
        year: 2026,
        location: "Band Room",
      },
    ],
    timeline: [
      {
        year: 2002,
        title: "The First Rainstorm",
        location: "Pune, Maharashtra",
        story: "Arrived into this world during a torrential October monsoon thunderstorm. Has loved the smell of wet earth and paperbacks ever since.",
        tag: "Origins",
      },
      {
        year: 2012,
        title: "The Bicycle Chronicles",
        location: "St. Anne's Academy",
        story: "Won the district creative writing medal with a 12-page hand-illustrated story about a red bicycle that refused to stop downhill.",
        tag: "Milestone",
      },
      {
        year: 2018,
        title: "First Chords Learned at 2 AM",
        location: "Basement Studio",
        story: "Borrowed an acoustic guitar, blistered three fingertips, and wrote the first terrible four-chord ballad with childhood best friends.",
        tag: "Creative",
      },
      {
        year: 2022,
        title: "Keys to the Sunlit Studio",
        location: "Bandra West",
        story: "Graduated with honors in comparative literature. Packed two suitcases, three cartons of books, and set up a home with zero furniture except floor cushions.",
        tag: "Independence",
      },
      {
        year: 2025,
        title: "Debut Essay in Print",
        location: "Literary Review",
        story: "Saw her prose printed on physical paper for the first time; celebrated with a midnight V60 pour-over and a marathon call with mom.",
        tag: "Breakthrough",
      },
      {
        year: 2026,
        title: "Twenty-Four & Fearlessly Grounded",
        location: "Here & Now",
        story: "Stepping into this year with clearer boundaries, deeper belly laughs, cherished family, and an unshakeable inner compass.",
        tag: "Present Day",
      },
    ],
  },

  leo: {
    id: "leo",
    label: "Kid / Child (Space & Dinosaurs)",
    badgeRole: "Junior Astronaut",
    name: "Leo Verma",
    age: 7,
    headline: "Seven orbits around the sun! Ignition sequence ready.",
    subheadline: "Join us for rocket-building stations, planet cupcakes, bouncy launchpads, and high-energy playground games.",
    personalityPills: ["Saturn Rockets", "T-Rex Facts", "Lego Master", "Chocolate Milkshake", "Trampolines"],
    theme: {
      accent: "#38BDF8",
      accentGlow: "rgba(56, 189, 248, 0.25)",
      badgeBg: "#0C2333",
      badgeText: "#38BDF8",
      borderAccent: "#38BDF8",
      primaryBtn: "bg-[#38BDF8] text-[#081520] hover:bg-[#7dd3fc]",
    },
    eventDetails: {
      date: "Sunday, November 8, 2026",
      time: "4:00 PM – 7:30 PM",
      venue: "Starlight Adventure Park & Lawn",
      address: "Plot 12, Green Glen Gardens, Sector 4, Bangalore",
      dressCode: "Astronaut Suits, Capes or Comfy Sneakers!",
      mapsUrl: "https://maps.google.com/?q=Bangalore+Playpark",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      calendarTitle: "Leo's 7th Space Cadet Birthday Party",
      calendarDesc: "Rocket launches, giant cakes, and space games for Leo's 7th birthday.",
    },
    photos: [
      {
        id: "l1",
        url: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80",
        caption: "Testing the cardboard space helmet in the backyard.",
        year: 2024,
        location: "Home Base",
      },
      {
        id: "l2",
        url: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1000&q=80",
        caption: "First day riding a two-wheeler with zero training wheels.",
        year: 2025,
        location: "Park Avenue",
      },
      {
        id: "l3",
        url: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1000&q=80",
        caption: "Explaining why Velociraptors were actually feathered to grandma.",
        year: 2025,
        location: "Living Room Floor",
      },
      {
        id: "l4",
        url: "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1000&q=80",
        caption: "Summer water balloon championship winner.",
        year: 2026,
        location: "Backyard Splashzone",
      },
    ],
    timeline: [
      {
        year: 2019,
        title: "Liftoff: Arrival on Earth",
        location: "Bangalore",
        story: "Weighed 3.2 kg with eyes wide open from minute one. Never slept through anything interesting.",
        tag: "Origins",
      },
      {
        year: 2021,
        title: "The Toddler Sprint Champion",
        location: "Cubbon Park",
        story: "Decided running at full speed into pigeons was significantly more efficient than walking.",
        tag: "Milestone",
      },
      {
        year: 2023,
        title: "The 100-Piece Lego Falcon",
        location: "Bedroom Carpet",
        story: "Refused bedtime until the wings were symmetrical. Declared himself chief spaceship designer.",
        tag: "Curiosity",
      },
      {
        year: 2025,
        title: "First Science Fair Star",
        location: "Greenwood Primary",
        story: "Built a baking-soda volcano that erupted pink foam all over the teacher's grade sheet.",
        tag: "Discovery",
      },
      {
        year: 2026,
        title: "Official Grade 2 Astronaut",
        location: "Mission Control",
        story: "Ready to conquer seven years of wonder with his whole crew cheering him on.",
        tag: "Present Day",
      },
    ],
  },

  ramesh: {
    id: "ramesh",
    label: "Milestone / Elder (60s – 70s)",
    badgeRole: "The Architect & Mentor",
    name: "Devendra Ramesh",
    age: 65,
    headline: "Sixty-five years of wisdom, steadfast love, and timeless foundations.",
    subheadline: "Gathering generations of family, lifelong colleagues, and old friends for an evening of classical sitar, old stories, and feast.",
    personalityPills: ["Structural Engineering", "Hindustani Classical", "Orchid Gardening", "Filter Coffee", "Morning Walks"],
    theme: {
      accent: "#EAB308",
      accentGlow: "rgba(234, 179, 8, 0.25)",
      badgeBg: "#1F1B0A",
      badgeText: "#EAB308",
      borderAccent: "#EAB308",
      primaryBtn: "bg-[#EAB308] text-[#120F05] hover:bg-[#facc15]",
    },
    eventDetails: {
      date: "Saturday, November 21, 2026",
      time: "6:30 PM onwards",
      venue: "The Heritage Verandah & Banquets",
      address: "Old Cantonment Road, Near Cubbon Pavilion, Bangalore",
      dressCode: "Traditional Elegance / Festive Smart",
      mapsUrl: "https://maps.google.com/?q=Cantonment+Bangalore",
      coordinates: { lat: 12.9822, lng: 77.6048 },
      calendarTitle: "Devendra Ramesh's 65th Milestone Celebration",
      calendarDesc: "Celebrating 65 years of Ramesh Uncle with family, music, and banquet dinner.",
    },
    photos: [
      {
        id: "r1",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
        caption: "Reviewing blueprint sketches on the wooden garden table.",
        year: 2023,
        location: "Home Office",
      },
      {
        id: "r2",
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
        caption: "With three generations gathered for the annual Diwali feast.",
        year: 2024,
        location: "Family Homestead",
      },
      {
        id: "r3",
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80",
        caption: "At the opening dedication of the community library he designed.",
        year: 2025,
        location: "Civic Center",
      },
    ],
    timeline: [
      {
        year: 1961,
        title: "Roots in the Old Quarter",
        location: "Mysore",
        story: "Grew up in a joint household surrounded by draftsman paper, Carnatic concerts, and endless copper filter tumblers.",
        tag: "Origins",
      },
      {
        year: 1983,
        title: "First Bridge Design Approved",
        location: "State Infrastructure Board",
        story: "Calculated beam moments by hand on graph sheets; the bridge stands proud to this day across the river.",
        tag: "Craft",
      },
      {
        year: 1996,
        title: "Building the Family Sanctuary",
        location: "Bangalore",
        story: "Laid every brick of the home that would shelter laughter, homework tears, weddings, and grandbabies.",
        tag: "Family",
      },
      {
        year: 2014,
        title: "Master of the Verandah Garden",
        location: "The Green Balcony",
        story: "Successfully nurtured 40 varieties of native orchids after retirement, becoming the neighborhood's botanical oracle.",
        tag: "Patience",
      },
      {
        year: 2026,
        title: "A Life in Full Bloom at 65",
        location: "Surrounded by Love",
        story: "Revered by students, cherished by family, and ready to enjoy every leisurely morning cup with deep gratitude.",
        tag: "Present Day",
      },
    ],
  },
};
