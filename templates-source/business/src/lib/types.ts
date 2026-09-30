export type BusinessCategory =
  | "Restaurant"
  | "Café"
  | "Hotel"
  | "Salon"
  | "Gym"
  | "Real Estate"
  | "Construction"
  | "IT Company"
  | "Digital Agency"
  | "Clothing Brand"
  | "Retail Shop"
  | "Clinic"
  | "Consultant"
  | "Freelancer"
  | "Photography"
  | "Travel"
  | "Automotive"
  | "Education"
  | "Manufacturing"
  | "Other";

export type DeviceMode = "desktop" | "tablet" | "mobile";

export type FontChoice = "sans" | "grotesk" | "serif" | "mono";
export type ButtonStyle = "pill" | "rounded" | "sharp" | "outline";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  badge?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar?: string;
}

export interface TeamItem {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface WebsiteConfig {
  id: string;
  name: string;
  category: BusinessCategory;
  templateId: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  ctaText: string;
  ctaLink: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: FontChoice;
    buttonStyle: ButtonStyle;
    logoUrl?: string;
  };
  images: {
    hero: string;
    about: string;
    gallery: string[];
  };
  sections: {
    hero: boolean;
    about: boolean;
    services: boolean;
    products: boolean;
    gallery: boolean;
    testimonials: boolean;
    team: boolean;
    faq: boolean;
    contact: boolean;
    footer: boolean;
  };
  sectionOrder: string[];
  servicesList: ServiceItem[];
  productsList: ProductItem[];
  testimonialsList: TestimonialItem[];
  teamList: TeamItem[];
  faqList: FaqItem[];
  updatedAt: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  thumbnail: string;
  defaults: Partial<WebsiteConfig>;
  badge?: string;
}
