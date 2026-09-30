"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  Sliders,
  Eye,
  Rocket,
  Palette,
  Smartphone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import InteractiveHeroDemo from "@/components/home/InteractiveHeroDemo";
import { TEMPLATES } from "@/lib/templatesData";

const HOW_IT_WORKS = [
  { step: "01", title: "Choose your business", desc: "Select your category from 20+ specialized industries (Café, Salon, Realty, Tech, etc.)." },
  { step: "02", title: "Add your details", desc: "Type your business name, phone, address, and WhatsApp contact in seconds." },
  { step: "03", title: "Customize your design", desc: "Select custom colors, typography pairings, button styles, and toggle sections." },
  { step: "04", title: "Preview your website", desc: "Inspect live responsive layouts across desktop, tablet, and mobile frames." },
  { step: "05", title: "Publish when ready", desc: "Share your professional demo link with clients, investors, or your team instantly." },
];

const CATEGORIES_LIST = [
  "Restaurant",
  "Café",
  "Hotel",
  "Salon",
  "Gym",
  "Real Estate",
  "Construction",
  "IT Company",
  "Digital Agency",
  "Clothing Brand",
  "Retail Shop",
  "Clinic",
  "Consultant",
  "Freelancer",
  "Photography",
  "Travel",
  "Automotive",
  "Education",
  "Manufacturing",
];

export default function LandingPage() {
  return (
    <div className="space-y-24 py-8">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>The No-Code Website Engine for Real Businesses</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.08]">
            Build a Website That Looks Like <span className="text-blue-600">YOUR</span> Business
          </h1>

          <p className="text-slate-600 text-base sm:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
            Choose a design, add your business details, upload your images, and instantly see how your website could look.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/builder"
              className="btn-primary-blue text-sm py-3.5 px-7 shadow-md"
            >
              <span>Create My Website</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/templates"
              className="btn-secondary-white text-sm py-3.5 px-6"
            >
              Explore 12+ Templates
            </Link>
          </div>

        </div>

        {/* 2. Interactive Live Demo Component */}
        <div className="pt-4">
          <InteractiveHeroDemo />
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono-spec text-xs uppercase tracking-wider text-blue-700 font-bold">
            Simple 5-Step Process
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
            How BusinessSite Studio Works
          </h2>
          <p className="text-slate-600 text-sm">
            Everything happens instantly in your browser with zero coding and zero wait time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.step}
              className="pro-card p-6 flex flex-col justify-between space-y-4 bg-white"
            >
              <span className="font-mono-spec text-2xl font-bold text-blue-600">
                {step.step}
              </span>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-base text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Supported Business Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono-spec text-xs uppercase tracking-wider text-blue-700 font-bold">
              Versatile Taxonomy
            </span>
            <h2 className="font-display font-bold text-3xl text-slate-900">
              Built for Every Business Category
            </h2>
          </div>
          <Link href="/templates" className="text-xs font-semibold text-blue-700 hover:underline">
            View All Specialized Templates →
          </Link>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES_LIST.map((cat) => (
            <Link
              key={cat}
              href={`/templates?category=${encodeURIComponent(cat)}`}
              className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50/50 transition-all shadow-2xs"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured Template Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="font-mono-spec text-xs uppercase tracking-wider text-blue-700 font-bold">
              Professionally Crafted Designs
            </span>
            <h2 className="font-display font-bold text-3xl text-slate-900">
              Popular Website Templates
            </h2>
          </div>
          <Link href="/templates" className="btn-secondary-white text-xs py-2 px-4">
            View All 12+ Templates
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMPLATES.slice(0, 3).map((template) => (
            <div
              key={template.id}
              className="pro-card overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {template.badge && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white shadow-sm">
                    {template.badge}
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono-spec font-bold text-blue-700">
                    {template.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-slate-900">
                    {template.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/builder?template=${template.id}`}
                    className="btn-primary-blue text-xs py-2 px-4 w-full text-center"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Bottom Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 sm:p-14 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white text-center space-y-6 shadow-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono-spec font-semibold border border-blue-400/30">
            START FOR FREE • NO ACCOUNT REQUIRED
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl max-w-2xl mx-auto leading-tight">
            See your business website come to life in the next 60 seconds.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of modern business owners who preview and customize their digital storefront before spending thousands on agencies.
          </p>
          <div className="pt-2">
            <Link
              href="/builder"
              className="btn-primary-blue text-sm py-4 px-8 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold shadow-lg"
            >
              Open Website Creator Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
