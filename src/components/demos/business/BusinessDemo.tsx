"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import InteractiveHeroDemo from "./components/home/InteractiveHeroDemo";
import { BuilderProvider } from "./lib/builderStore";
import { TEMPLATES } from "./lib/templatesData";

const HOW_IT_WORKS = [
  { step: "01", title: "Choose your business", desc: "Select your category from 20+ specialized industries (Café, Salon, Realty, Tech, etc.)." },
  { step: "02", title: "Add your details", desc: "Type your business name, phone, address, and WhatsApp contact in seconds." },
  { step: "03", title: "Customize your design", desc: "Select custom colors, typography pairings, button styles, and toggle sections." },
  { step: "04", title: "Preview your website", desc: "Inspect live responsive layouts across desktop, tablet, and mobile frames." },
  { step: "05", title: "Publish when ready", desc: "Share your professional demo link with clients, investors, or your team instantly." },
];

const CATEGORIES_LIST = [
  "Restaurant", "Café", "Hotel", "Salon", "Gym", "Real Estate",
  "Construction", "IT Company", "Digital Agency", "Clothing Brand",
  "Retail Shop", "Clinic", "Consultant", "Freelancer", "Photography",
  "Travel", "Automotive", "Education", "Manufacturing"
];

function BusinessDemoContent() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="space-y-16 py-8">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center max-w-4xl mx-auto space-y-5 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Business & Startup Platform</span>
            </div>

            <h1 className="font-bold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
              Build a Website That Looks Like <span className="text-blue-600">YOUR</span> Business
            </h1>

            <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Test and customize your business site in real time. Switch industries, toggle color schemes, and inspect responsive views.
            </p>
          </div>

          {/* Interactive Live Demo Component */}
          <div className="pt-2">
            <InteractiveHeroDemo />
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-wider text-blue-700 font-bold">
              Simple 5-Step Process
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-slate-900">
              How Business Platform Works
            </h2>
            <p className="text-slate-600 text-sm">
              Everything happens instantly in your browser with zero coding and zero wait time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 bg-white"
              >
                <span className="text-2xl font-bold text-blue-600">
                  {step.step}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-slate-900">
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

        {/* Supported Business Types */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs uppercase tracking-wider text-blue-700 font-bold">
              Versatile Taxonomy
            </span>
            <h2 className="font-bold text-3xl text-slate-900">
              Built for Every Business Category
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES_LIST.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-xs"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function BusinessDemo() {
  return (
    <BuilderProvider>
      <BusinessDemoContent />
    </BuilderProvider>
  );
}
