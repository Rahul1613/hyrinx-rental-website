"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Sliders, Image as ImageIcon, ArrowRight, Check, Upload, Wand2 } from "lucide-react";
import BrowserFrame from "@/components/preview/BrowserFrame";
import WebsiteRenderer from "@/components/preview/WebsiteRenderer";
import { WebsiteConfig, BusinessCategory } from "@/lib/types";
import { DEFAULT_WEBSITE_CONFIG, useBuilder } from "@/lib/builderStore";

const QUICK_COLORS = [
  { name: "Coffee Amber", hex: "#c2410c" },
  { name: "Royal Blue", hex: "#1d4ed8" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Velvet Indigo", hex: "#4f46e5" },
  { name: "Deep Rose", hex: "#be185d" },
  { name: "Noir Slate", hex: "#0f172a" },
];

const CATEGORIES: BusinessCategory[] = [
  "Café",
  "Restaurant",
  "Salon",
  "Digital Agency",
  "Real Estate",
  "Gym",
  "IT Company",
  "Consultant",
  "Manufacturing",
];

const PRESET_IMAGES: Record<string, string> = {
  "Café": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
  "Restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "Salon": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  "Digital Agency": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  "Real Estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  "Gym": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  "IT Company": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "Consultant": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "Manufacturing": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
};

export default function InteractiveHeroDemo() {
  const { config, updateConfig } = useBuilder();

  const handleNameChange = (name: string) => {
    updateConfig({ name });
  };

  const handleTaglineChange = (tagline: string) => {
    updateConfig({ tagline });
  };

  const handleCategoryChange = (category: BusinessCategory) => {
    const newImage = PRESET_IMAGES[category] || config.images.hero;
    updateConfig({
      category,
      images: {
        ...config.images,
        hero: newImage,
      },
    });
  };

  const handleColorChange = (hex: string) => {
    updateConfig({
      branding: {
        ...config.branding,
        primaryColor: hex,
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      updateConfig({
        images: {
          ...config.images,
          hero: localUrl,
        },
      });
    }
  };

  const slug = (config.name || "mybusiness").toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Live Input Controls (5 Cols) */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-lg space-y-6">
        
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="font-mono-spec text-xs uppercase tracking-wider text-blue-700 font-bold">
              Instant Live Demo
            </span>
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900">
            Customize & Watch It Change Live
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Every keystroke instantly renders in the browser frame on the right.
          </p>
        </div>

        {/* Input: Business Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Rahul's Café"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Input: Category */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Business Category
          </label>
          <select
            value={config.category}
            onChange={(e) => handleCategoryChange(e.target.value as BusinessCategory)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Input: Tagline */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Hero Tagline
          </label>
          <input
            type="text"
            value={config.tagline}
            onChange={(e) => handleTaglineChange(e.target.value)}
            placeholder="e.g. Artisanal Brews, Sourdough Bakes & Community"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Input: Primary Brand Color */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Primary Brand Accent
          </label>
          <div className="flex flex-wrap gap-2.5 items-center">
            {QUICK_COLORS.map((col) => {
              const isSelected = config.branding.primaryColor === col.hex;
              return (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => handleColorChange(col.hex)}
                  className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center border ${
                    isSelected ? "scale-115 ring-2 ring-blue-500 ring-offset-2" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
            <input
              type="color"
              value={config.branding.primaryColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-7 h-7 rounded-full border border-slate-300 cursor-pointer overflow-hidden p-0"
              title="Custom hex color"
            />
          </div>
        </div>

        {/* Input: Upload or Change Image */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Hero Photo (Upload Local File)
          </label>
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 cursor-pointer text-xs font-semibold text-slate-700 transition-colors">
            <Upload className="w-4 h-4 text-blue-600" />
            <span>Click to upload your own photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Action Button to Open Full Builder */}
        <div className="pt-2 border-t border-slate-100">
          <Link
            href="/builder"
            className="btn-primary-blue w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            <span>Open in Full Website Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Right Live Realistic Browser Frame (7 Cols) */}
      <div className="lg:col-span-7 h-[680px]">
        <BrowserFrame
          url={`https://${slug}.com`}
          deviceMode="desktop"
        >
          <div className="scale-[0.88] origin-top transform-gpu">
            <WebsiteRenderer config={config} interactive={false} />
          </div>
        </BrowserFrame>
      </div>

    </div>
  );
}
