"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { WebsiteConfig, DeviceMode } from "./types";
import { TEMPLATES } from "./templatesData";

const STORAGE_KEY = "businesssite_active_config";
const WEBSITES_LIST_KEY = "businesssite_saved_websites";

export const DEFAULT_WEBSITE_CONFIG: WebsiteConfig = {
  id: "site-rahuls-cafe",
  name: "Rahul's Café",
  category: "Café",
  templateId: "local-artisan",
  tagline: "Artisanal Brews, Sourdough Bakes & Community",
  description: "A neighborhood gathering space serving single-origin pour overs, twice-baked artisan pastries, and warm hospitality from sunrise to dusk.",
  phone: "+91 98201 55420",
  email: "hello@rahulscafe.com",
  address: "42 Indiranagar 100ft Road, Bengaluru 560038",
  whatsapp: "+919820155420",
  ctaText: "Order for Pickup",
  ctaLink: "#contact",
  branding: {
    primaryColor: "#c2410c", // Burnt amber orange
    secondaryColor: "#1c1917",
    accentColor: "#f97316",
    fontFamily: "serif",
    buttonStyle: "rounded",
    logoUrl: "",
  },
  images: {
    hero: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    about: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    ],
  },
  sections: {
    hero: true,
    about: true,
    services: true,
    products: true,
    gallery: true,
    testimonials: true,
    team: true,
    faq: true,
    contact: true,
    footer: true,
  },
  sectionOrder: [
    "hero",
    "about",
    "services",
    "products",
    "gallery",
    "testimonials",
    "team",
    "faq",
    "contact",
  ],
  servicesList: [
    { id: "1", title: "Single Origin Pour Over", description: "Ethiopian Yirgacheffe notes of bergamot, orange blossom & wild honey.", price: "₹280", badge: "Signature" },
    { id: "2", title: "Velvet Flat White", description: "Double ristretto with silky microfoam over organic dairy or oat milk.", price: "₹240" },
    { id: "3", title: "Cardamom Pistachio Croissant", description: "Flaky French butter pastry with slow-roasted pistachio frangipane.", price: "₹220", badge: "Fresh Daily" },
    { id: "4", title: "Cold Brew Tonic & Citrus", description: "18-hour cold steeped roast with sparkling Indian tonic and candied orange.", price: "₹260" },
  ],
  productsList: [
    { id: "p1", name: "House Blend Whole Bean (250g)", description: "Medium-dark roast with chocolate, hazelnut, and dark cherry notes.", price: "₹550", image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=500&q=80" },
    { id: "p2", name: "Monsooned Malabar AA (250g)", description: "Spicy earthy body with zero acidity and velvety crema.", price: "₹620", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80" },
    { id: "p3", name: "Ceramic Coffee Dripper", description: "Handmade matte ceramic dripper for consistent home extraction.", price: "₹1,200", image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=500&q=80" },
  ],
  testimonialsList: [
    { id: "t1", quote: "The best flat white in Indiranagar. The sunlight through the glass and the aroma of freshly pulled espresso make this my everyday morning ritual.", author: "Pooja Hegde", role: "Product Designer", rating: 5 },
    { id: "t2", quote: "Rahul's sourdough croissants are unmatched. Crispy exterior, airy honeycomb crumb, and incredible pistachio filling. Simply 10/10.", author: "Arjun Verma", role: "Architect", rating: 5 },
    { id: "t3", quote: "Great wifi, exceptional hospitality, and beans roasted with true passion. A gem for Bangalore coffee culture.", author: "Sneha Rao", role: "Author & Founder", rating: 5 },
  ],
  teamList: [
    { id: "tm1", name: "Rahul Deshpande", role: "Founder & Head Roaster", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { id: "tm2", name: "Maya Sen", role: "Head Pastry Chef", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { id: "tm3", name: "Karan Nair", role: "Lead Barista & Sensory Trainer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  ],
  faqList: [
    { id: "f1", q: "Do you offer non-dairy milk options?", a: "Yes, we carry barista-grade Oatly oat milk, organic almond milk, and soy milk at no extra charge." },
    { id: "f2", q: "Can I host private workshops or book tables?", a: "Yes! We host coffee cupping workshops every Saturday and accept table reservations for parties of 6 or more." },
    { id: "f3", q: "Do you ship freshly roasted beans nationwide?", a: "Yes, we roast every Tuesday and ship within 24 hours across India with complimentary grind-to-order options." },
  ],
  updatedAt: new Date().toISOString(),
};

interface BuilderContextType {
  config: WebsiteConfig;
  updateConfig: (updater: Partial<WebsiteConfig> | ((prev: WebsiteConfig) => WebsiteConfig)) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  loadTemplate: (templateId: string) => void;
  resetToDefault: () => void;
  savedWebsites: WebsiteConfig[];
  saveCurrentWebsite: () => void;
  loadWebsiteById: (id: string) => void;
  deleteWebsiteById: (id: string) => void;
  duplicateWebsiteById: (id: string) => void;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<WebsiteConfig>(DEFAULT_WEBSITE_CONFIG);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [savedWebsites, setSavedWebsites] = useState<WebsiteConfig[]>([]);

  // Load from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setConfig(JSON.parse(stored));
        }
        const storedList = localStorage.getItem(WEBSITES_LIST_KEY);
        if (storedList) {
          setSavedWebsites(JSON.parse(storedList));
        } else {
          // Pre-seed with sample websites
          const seedSites: WebsiteConfig[] = [
            DEFAULT_WEBSITE_CONFIG,
            {
              ...DEFAULT_WEBSITE_CONFIG,
              id: "site-sr-industries",
              name: "SR Industries",
              category: "Manufacturing",
              templateId: "modern-corporate",
              tagline: "Precision Heavy Metal Fabrication & Defense Tooling",
              description: "High-tolerance laser cutting, CNC milling, and certified metal assemblies supplying aerospace and rail infrastructure across India.",
              phone: "+91 20 2712 4400",
              email: "sales@srindustries.co.in",
              address: "Sector 10, Bhosari MIDC, Pune 411026",
              whatsapp: "+912027124400",
              branding: {
                primaryColor: "#1e3a8a",
                secondaryColor: "#0f172a",
                accentColor: "#3b82f6",
                fontFamily: "grotesk",
                buttonStyle: "sharp",
              },
              images: {
                hero: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
                about: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
                gallery: [],
              },
            },
            {
              ...DEFAULT_WEBSITE_CONFIG,
              id: "site-hyrinx-studio",
              name: "Hyrinx Studio",
              category: "Digital Agency",
              templateId: "creative-agency",
              tagline: "Interactive 3D Experiences & High-Growth Brand Systems",
              description: "An independent design studio helping global tech companies craft category-defining digital flagship platforms.",
              phone: "+91 99100 88219",
              email: "hello@hyrinx.design",
              address: "Cyber City DLF Phase 2, Gurugram 122002",
              whatsapp: "+919910088219",
              branding: {
                primaryColor: "#4f46e5",
                secondaryColor: "#0f172a",
                accentColor: "#6366f1",
                fontFamily: "grotesk",
                buttonStyle: "pill",
              },
              images: {
                hero: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
                about: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
                gallery: [],
              },
            },
          ];
          setSavedWebsites(seedSites);
          localStorage.setItem(WEBSITES_LIST_KEY, JSON.stringify(seedSites));
        }
      } catch (err) {
        console.error("Failed to read localStorage:", err);
      }
    }
  }, []);

  // Sync active config to localStorage
  const updateConfig = (updater: Partial<WebsiteConfig> | ((prev: WebsiteConfig) => WebsiteConfig)) => {
    setConfig((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      const updated = { ...next, updatedAt: new Date().toISOString() };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
  };

  const loadTemplate = (templateId: string) => {
    const tmpl = TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;

    updateConfig((prev) => ({
      ...prev,
      templateId,
      category: tmpl.defaults.category || prev.category,
      tagline: tmpl.defaults.tagline || prev.tagline,
      description: tmpl.defaults.description || prev.description,
      ctaText: tmpl.defaults.ctaText || prev.ctaText,
      branding: {
        ...prev.branding,
        ...(tmpl.defaults.branding || {}),
      },
      images: {
        ...prev.images,
        ...(tmpl.defaults.images || {}),
      },
      servicesList: tmpl.defaults.servicesList || prev.servicesList,
    }));
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_WEBSITE_CONFIG);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WEBSITE_CONFIG));
    }
  };

  const saveCurrentWebsite = () => {
    setSavedWebsites((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === config.id);
      let updated: WebsiteConfig[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = config;
      } else {
        updated = [config, ...prev];
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(WEBSITES_LIST_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const loadWebsiteById = (id: string) => {
    const target = savedWebsites.find((s) => s.id === id);
    if (target) {
      setConfig(target);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(target));
      }
    }
  };

  const deleteWebsiteById = (id: string) => {
    setSavedWebsites((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem(WEBSITES_LIST_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const duplicateWebsiteById = (id: string) => {
    const target = savedWebsites.find((s) => s.id === id);
    if (!target) return;
    const clone: WebsiteConfig = {
      ...target,
      id: `site-${Date.now()}`,
      name: `${target.name} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    setSavedWebsites((prev) => {
      const updated = [clone, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(WEBSITES_LIST_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        config,
        updateConfig,
        deviceMode,
        setDeviceMode,
        loadTemplate,
        resetToDefault,
        savedWebsites,
        saveCurrentWebsite,
        loadWebsiteById,
        deleteWebsiteById,
        duplicateWebsiteById,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
