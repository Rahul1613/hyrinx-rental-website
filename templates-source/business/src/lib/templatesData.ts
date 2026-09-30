import { TemplateDefinition, WebsiteConfig } from "./types";

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "modern-restaurant",
    name: "Modern Restaurant",
    category: "Restaurant",
    description: "Vibrant visual layout with signature menu specials, table booking CTA, and kitchen story.",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    defaults: {
      category: "Restaurant",
      tagline: "Woodfired Flavors & Crafted Hospitality",
      description: "An artisanal culinary space celebrating locally sourced ingredients, seasonal small plates, and natural wines in an inviting urban atmosphere.",
      ctaText: "Reserve a Table",
      branding: {
        primaryColor: "#c2410c", // Warm burnt orange
        secondaryColor: "#1c1917",
        accentColor: "#f97316",
        fontFamily: "serif",
        buttonStyle: "rounded",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80",
        ],
      },
      servicesList: [
        { id: "1", title: "Woodfired Napoletana", description: "48-hour fermented sourdough crust with San Marzano tomatoes and fior di latte.", price: "$22" },
        { id: "2", title: "Seasonal Hand-Rolled Pasta", description: "Tagliolini with black summer truffles and aged Parmigiano Reggiano butter.", price: "$28" },
        { id: "3", title: "Smoked Wagyu Ribeye", description: "Charcoal-kissed cuts paired with charred scallion chimichurri.", price: "$46" },
        { id: "4", title: "Botanical Cocktail Bar", description: "House amaro blends, low-intervention pet-nats, and botanical spritzes.", price: "$16" },
      ],
    },
  },
  {
    id: "luxury-restaurant",
    name: "Luxury Dining Room",
    category: "Restaurant",
    description: "High-contrast dark-mode elegance with gold highlights, tasting flight tiers, and sommelier notes.",
    thumbnail: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "Restaurant",
      tagline: "The Art of Tasting & Timeless Elegance",
      description: "An intimate 12-table dining sanctuary presenting multi-course omakase and French tasting menus with rare cellar pairings.",
      ctaText: "Request Private Booking",
      branding: {
        primaryColor: "#d97706", // Amber gold
        secondaryColor: "#0f172a",
        accentColor: "#f59e0b",
        fontFamily: "serif",
        buttonStyle: "sharp",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=600&q=80",
        ],
      },
    },
  },
  {
    id: "creative-agency",
    name: "Creative Agency",
    category: "Digital Agency",
    description: "Bold editorial layout, large kinetic typography, client roster, and case study grid.",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    defaults: {
      category: "Digital Agency",
      tagline: "We Design Brands That Shape Culture",
      description: "A multidisciplinary brand and interactive design studio collaborating with venture-backed startups and cultural leaders across the globe.",
      ctaText: "Start a Project",
      branding: {
        primaryColor: "#4f46e5", // Indigo
        secondaryColor: "#0f172a",
        accentColor: "#6366f1",
        fontFamily: "grotesk",
        buttonStyle: "pill",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
        ],
      },
      servicesList: [
        { id: "1", title: "Brand Identity & Positioning", description: "Design systems, voice, guidelines, and visual strategy for modern companies." },
        { id: "2", title: "Web & Digital Product Design", description: "High-conversion web platforms and iOS/Android applications built for speed." },
        { id: "3", title: "Creative Art Direction & 3D", description: "Motion design, 3D brand assets, and interactive web experiences." },
      ],
    },
  },
  {
    id: "digital-agency",
    name: "Tech & Digital Studio",
    category: "IT Company",
    description: "Sleek tech aesthetic with architectural grids, capability matrices, and enterprise badges.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "IT Company",
      tagline: "Engineering Modern Digital Infrastructure",
      description: "Cloud architectures, full-stack software systems, and data pipelines built for high-scale enterprise operations.",
      ctaText: "Schedule Consultation",
      branding: {
        primaryColor: "#0284c7", // Sky blue
        secondaryColor: "#0f172a",
        accentColor: "#38bdf8",
        fontFamily: "sans",
        buttonStyle: "rounded",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        ],
      },
    },
  },
  {
    id: "modern-realty",
    name: "Modern Realty",
    category: "Real Estate",
    description: "Clean property presentation with high-res galleries, neighborhood guides, and booking forms.",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "Real Estate",
      tagline: "Architectural Homes & Prime Urban Living",
      description: "Representing visionary architectural properties, luxury lofts, and waterfront developments across premier metropolitan centers.",
      ctaText: "Browse Listings",
      branding: {
        primaryColor: "#0f766e", // Teal
        secondaryColor: "#111827",
        accentColor: "#14b8a6",
        fontFamily: "grotesk",
        buttonStyle: "rounded",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
        ],
      },
    },
  },
  {
    id: "luxury-property",
    name: "Luxury Property Estates",
    category: "Real Estate",
    description: "Editorial real-estate showcase with full-bleed imagery, floor plans, and VIP concierge contact.",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "Real Estate",
      tagline: "Exclusive Residences for Discerning Lifestyles",
      description: "Ultra-luxury penthouse estates, private islands, and heritage mansions curated with utmost confidentiality.",
      ctaText: "Request Private Dossier",
      branding: {
        primaryColor: "#1e293b",
        secondaryColor: "#0f172a",
        accentColor: "#ca8a04",
        fontFamily: "serif",
        buttonStyle: "sharp",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
        gallery: [],
      },
    },
  },
  {
    id: "premium-salon",
    name: "Premium Salon & Spa",
    category: "Salon",
    description: "Soft calming tones, beauty treatment menu, stylist bios, and instant booking modal.",
    thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    defaults: {
      category: "Salon",
      tagline: "Holistic Hair, Skin & Wellness Rituals",
      description: "A restorative sanctuary offering bespoke color transformations, organic skin therapies, and master hair styling.",
      ctaText: "Book an Appointment",
      branding: {
        primaryColor: "#be185d", // Deep rose
        secondaryColor: "#18181b",
        accentColor: "#f472b6",
        fontFamily: "serif",
        buttonStyle: "pill",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80",
        ],
      },
    },
  },
  {
    id: "beauty-studio",
    name: "Aesthetic Clinic & Studio",
    category: "Salon",
    description: "Modern minimalist layout emphasizing clean aesthetics, certified practitioners, and treatments.",
    thumbnail: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "Salon",
      tagline: "Clinical Precision Meets Radiant Care",
      description: "Advanced dermatological therapies, non-invasive facial rejuvenation, and medical wellness under expert care.",
      ctaText: "Explore Treatments",
      branding: {
        primaryColor: "#9333ea", // Purple
        secondaryColor: "#1e1b4b",
        accentColor: "#c084fc",
        fontFamily: "sans",
        buttonStyle: "rounded",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1512290900672-1f02a0a86be9?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        gallery: [],
      },
    },
  },
  {
    id: "modern-corporate",
    name: "Modern Corporate Enterprise",
    category: "Corporate" as unknown as TemplateDefinition["category"],
    description: "Executive layout with trust badges, leadership roster, financial reports, and corporate governance.",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "Consultant",
      tagline: "Strategic Capital & Enterprise Advisory",
      description: "Guiding institutional investors, multinational boards, and growth enterprises through complex mergers and market expansion.",
      ctaText: "Request Briefing",
      branding: {
        primaryColor: "#1e3a8a", // Navy
        secondaryColor: "#0f172a",
        accentColor: "#3b82f6",
        fontFamily: "grotesk",
        buttonStyle: "rounded",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        gallery: [],
      },
    },
  },
  {
    id: "tech-company",
    name: "Technology & SaaS Hub",
    category: "IT Company",
    description: "Product-led growth framework with interactive feature highlights, API docs link, and customer metrics.",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "IT Company",
      tagline: "The Modern Cloud Platform for Agile Teams",
      description: "Unified developer analytics, real-time collaboration, and continuous deployment workflows in a single lightweight interface.",
      ctaText: "Start 14-Day Trial",
      branding: {
        primaryColor: "#059669", // Emerald
        secondaryColor: "#064e3b",
        accentColor: "#10b981",
        fontFamily: "sans",
        buttonStyle: "pill",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        gallery: [],
      },
    },
  },
  {
    id: "local-artisan",
    name: "Artisan Café & Roastery",
    category: "Café",
    description: "Warm organic palette, single-origin bean menu, cafe ambiance gallery, and order pickup.",
    thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    badge: "Staff Pick",
    defaults: {
      category: "Café",
      tagline: "Small-Batch Roasted Beans & Fresh Bakes",
      description: "Direct-trade coffee ethically sourced from mountain estates, roasted fresh every Tuesday and served alongside sourdough pastries.",
      ctaText: "Order for Pickup",
      branding: {
        primaryColor: "#78350f", // Deep coffee amber
        secondaryColor: "#292524",
        accentColor: "#d97706",
        fontFamily: "serif",
        buttonStyle: "rounded",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80",
        ],
      },
      servicesList: [
        { id: "1", title: "Single Origin Pour Over", description: "Ethiopian Yirgacheffe with notes of bergamot, jasmine, and citrus honey.", price: "$6.50" },
        { id: "2", title: "Oat Milk Velvet Flat White", description: "Double ristretto over silky micro-foamed oat milk.", price: "$5.75" },
        { id: "3", title: "Cardamom Pistachio Croissant", description: "Twice-baked flaky butter pastry filled with roasted pistachio cream.", price: "$5.25" },
      ],
    },
  },
  {
    id: "service-pro",
    name: "Professional Consultant",
    category: "Consultant",
    description: "Clean credentials, audit services, testimonial carousels, and Calendly-style consultation booking.",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    defaults: {
      category: "Consultant",
      tagline: "Tax, Legal & Financial Growth Guidance",
      description: "Advising founders and family offices on cross-border tax structures, compliance, and wealth preservation.",
      ctaText: "Book Discovery Call",
      branding: {
        primaryColor: "#2563eb",
        secondaryColor: "#0f172a",
        accentColor: "#60a5fa",
        fontFamily: "sans",
        buttonStyle: "rounded",
      },
      images: {
        hero: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
        about: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        gallery: [],
      },
    },
  },
];
