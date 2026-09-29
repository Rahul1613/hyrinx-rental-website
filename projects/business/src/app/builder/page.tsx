"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Save,
  Rocket,
  ArrowLeft,
  Upload,
  Check,
  RotateCcw,
  Palette,
  Briefcase,
  Image as ImageIcon,
  Sliders,
  ChevronUp,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import BrowserFrame from "@/components/preview/BrowserFrame";
import WebsiteRenderer from "@/components/preview/WebsiteRenderer";
import PublishModal from "@/components/modals/PublishModal";
import { useBuilder } from "@/lib/builderStore";
import { BusinessCategory, FontChoice, ButtonStyle } from "@/lib/types";
import { TEMPLATES } from "@/lib/templatesData";

const CATEGORIES: BusinessCategory[] = [
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
  "Other",
];

const COLOR_PRESETS = [
  { name: "Coffee Amber", primary: "#c2410c", accent: "#f97316" },
  { name: "Cobalt Blue", primary: "#1d4ed8", accent: "#3b82f6" },
  { name: "Emerald Forest", primary: "#059669", accent: "#10b981" },
  { name: "Velvet Indigo", primary: "#4f46e5", accent: "#6366f1" },
  { name: "Luxury Gold", primary: "#d97706", accent: "#f59e0b" },
  { name: "Rose Noir", primary: "#be185d", accent: "#f472b6" },
  { name: "Teal Modern", primary: "#0f766e", accent: "#14b8a6" },
  { name: "Deep Charcoal", primary: "#1e293b", accent: "#64748b" },
];

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");

  const {
    config,
    updateConfig,
    deviceMode,
    setDeviceMode,
    loadTemplate,
    resetToDefault,
    saveCurrentWebsite,
  } = useBuilder();

  const [activeTab, setActiveTab] = useState<"business" | "branding" | "images" | "sections">("business");
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  useEffect(() => {
    if (templateParam) {
      loadTemplate(templateParam);
    }
  }, [templateParam]);

  const handleSave = () => {
    saveCurrentWebsite();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleFileUpload = (field: "hero" | "about", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      updateConfig((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          [field]: localUrl,
        },
      }));
    }
  };

  // Section toggle
  const toggleSection = (key: keyof typeof config.sections) => {
    updateConfig((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [key]: !prev.sections[key],
      },
    }));
  };

  // Move section in order
  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= config.sectionOrder.length) return;

    const newOrder = [...config.sectionOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    updateConfig({ sectionOrder: newOrder });
  };

  const slug = (config.name || "business").toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100">
      
      {/* Top Application Toolbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-30 shadow-2xs">
        
        {/* Brand & Active Site Indicator */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-700 hover:text-slate-900 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              <Layers className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-sm tracking-tight text-slate-900 block">
                BusinessSite Studio
              </span>
              <span className="text-[10px] text-slate-400 font-mono-spec -mt-0.5 block">
                EDITOR MODE
              </span>
            </div>
          </Link>

          <span className="text-slate-300 hidden sm:inline">/</span>

          {/* Active Site Name Tag */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 truncate max-w-[140px] sm:max-w-[200px]">
              {config.name}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium hidden md:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Synced locally
            </span>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded-md transition-all ${
              deviceMode === "desktop"
                ? "bg-white text-blue-700 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded-md transition-all ${
              deviceMode === "tablet"
                ? "bg-white text-blue-700 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded-md transition-all ${
              deviceMode === "mobile"
                ? "bg-white text-blue-700 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/preview"
            className="btn-secondary-white text-xs py-2 px-3 sm:px-4 hidden sm:inline-flex items-center gap-1.5"
            title="View Fullscreen"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Fullscreen</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            className="btn-secondary-white text-xs py-2 px-3 sm:px-4 flex items-center gap-1.5"
          >
            {savedNotification ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-slate-600" />
                <span>Save</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setPublishModalOpen(true)}
            className="btn-primary-blue text-xs py-2 px-4 sm:px-5 flex items-center gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>

      </header>

      {/* Main Split Builder Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT CONTROL PANEL (400px fixed width on desktop) */}
        <aside className="w-full sm:w-[420px] bg-white border-r border-slate-200 flex flex-col shrink-0 z-20 shadow-xs">
          
          {/* Editor Tabs Navigation */}
          <div className="grid grid-cols-4 border-b border-slate-200 text-xs font-semibold text-slate-600 shrink-0 bg-slate-50/50">
            <button
              onClick={() => setActiveTab("business")}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-all ${
                activeTab === "business"
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Business</span>
            </button>
            <button
              onClick={() => setActiveTab("branding")}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-all ${
                activeTab === "branding"
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent hover:text-slate-900"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Branding</span>
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-all ${
                activeTab === "images"
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent hover:text-slate-900"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Images</span>
            </button>
            <button
              onClick={() => setActiveTab("sections")}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-all ${
                activeTab === "sections"
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent hover:text-slate-900"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Sections</span>
            </button>
          </div>

          {/* Tab Content Panels (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            
            {/* TAB 1: BUSINESS DETAILS */}
            {activeTab === "business" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-sm text-slate-900">General Information</h3>
                  <p className="text-xs text-slate-500">Core details shown across your site headers & contact cards.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => updateConfig({ name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={config.category}
                    onChange={(e) => updateConfig({ category: e.target.value as BusinessCategory })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => updateConfig({ tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={config.description}
                    onChange={(e) => updateConfig({ description: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={config.phone}
                      onChange={(e) => updateConfig({ phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp</label>
                    <input
                      type="text"
                      value={config.whatsapp}
                      onChange={(e) => updateConfig({ whatsapp: e.target.value })}
                      placeholder="+91..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => updateConfig({ email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => updateConfig({ address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Button CTA Label</label>
                  <input
                    type="text"
                    value={config.ctaText}
                    onChange={(e) => updateConfig({ ctaText: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: BRANDING */}
            {activeTab === "branding" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-sm text-slate-900">Color Palette & Styling</h3>
                  <p className="text-xs text-slate-500">Pick signature brand accents, typography, and button geometries.</p>
                </div>

                {/* Preset Palettes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Preset Brand Harmonizers</label>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() =>
                          updateConfig((prev) => ({
                            ...prev,
                            branding: {
                              ...prev.branding,
                              primaryColor: preset.primary,
                              accentColor: preset.accent,
                            },
                          }))
                        }
                        className="p-2 rounded-lg border border-slate-200 text-left hover:border-slate-300 bg-white flex items-center gap-2"
                      >
                        <span
                          className="w-4 h-4 rounded-full shrink-0 border border-slate-300"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span className="text-[11px] font-medium text-slate-700 truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Pickers */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Brand Accent</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.branding.primaryColor}
                        onChange={(e) =>
                          updateConfig((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, primaryColor: e.target.value },
                          }))
                        }
                        className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer overflow-hidden p-0"
                      />
                      <input
                        type="text"
                        value={config.branding.primaryColor}
                        onChange={(e) =>
                          updateConfig((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, primaryColor: e.target.value },
                          }))
                        }
                        className="w-28 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Typography Pairing</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "serif", label: "Editorial Serif", sample: "Playfair / Georgia" },
                        { id: "grotesk", label: "Modern Grotesk", sample: "Space Grotesk" },
                        { id: "sans", label: "Clean Corporate", sample: "Inter / Sans" },
                        { id: "mono", label: "Technical Mono", sample: "JetBrains Mono" },
                      ].map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() =>
                            updateConfig((prev) => ({
                              ...prev,
                              branding: { ...prev.branding, fontFamily: font.id as FontChoice },
                            }))
                          }
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                            config.branding.fontFamily === font.id
                              ? "bg-blue-50 border-blue-600 text-blue-900 font-bold"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <span className="block font-medium">{font.label}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{font.sample}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Button Edge Geometry</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "rounded", label: "Rounded" },
                        { id: "pill", label: "Pill" },
                        { id: "sharp", label: "Sharp" },
                      ].map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() =>
                            updateConfig((prev) => ({
                              ...prev,
                              branding: { ...prev.branding, buttonStyle: style.id as ButtonStyle },
                            }))
                          }
                          className={`py-2 text-center text-xs font-medium rounded-lg border transition-all ${
                            config.branding.buttonStyle === style.id
                              ? "bg-blue-50 border-blue-600 text-blue-900 font-bold"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: IMAGES */}
            {activeTab === "images" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-sm text-slate-900">Photography & Media</h3>
                  <p className="text-xs text-slate-500">Upload your own real business photos or use curated presets.</p>
                </div>

                {/* Hero Image */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">Hero Section Photo</label>
                  <div className="relative aspect-16/9 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={config.images.hero}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:border-blue-600 hover:bg-blue-50/50 cursor-pointer text-xs font-semibold text-slate-700 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Upload New Hero Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("hero", e)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* About Image */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-semibold text-slate-700">About Section Photo</label>
                  <div className="relative aspect-16/9 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={config.images.about || config.images.hero}
                      alt="About preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:border-blue-600 hover:bg-blue-50/50 cursor-pointer text-xs font-semibold text-slate-700 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Upload New About Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("about", e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* TAB 4: SECTIONS */}
            {activeTab === "sections" && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-sm text-slate-900">Page Structure & Order</h3>
                  <p className="text-xs text-slate-500">Enable, disable, and reorder website sections.</p>
                </div>

                <div className="space-y-2">
                  {config.sectionOrder.map((secKey, idx) => {
                    const isEnabled = config.sections[secKey as keyof typeof config.sections];
                    const label = secKey.charAt(0).toUpperCase() + secKey.slice(1);

                    return (
                      <div
                        key={secKey}
                        className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleSection(secKey as keyof typeof config.sections)}
                            className="text-slate-500 hover:text-blue-600"
                          >
                            {isEnabled ? (
                              <ToggleRight className="w-6 h-6 text-blue-600" />
                            ) : (
                              <ToggleLeft className="w-6 h-6 text-slate-300" />
                            )}
                          </button>
                          <span
                            className={`text-xs font-semibold ${
                              isEnabled ? "text-slate-900" : "text-slate-400 line-through"
                            }`}
                          >
                            {label}
                          </span>
                        </div>

                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSection(idx, "up")}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === config.sectionOrder.length - 1}
                            onClick={() => moveSection(idx, "down")}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </aside>

        {/* RIGHT LIVE PREVIEW CANVAS */}
        <main className="flex-1 bg-slate-200/60 p-3 sm:p-6 overflow-hidden flex flex-col">
          <BrowserFrame
            url={`https://${slug}.com`}
            deviceMode={deviceMode}
            onDeviceChange={setDeviceMode}
            onFullscreen={() => window.open("/preview", "_blank")}
          >
            <WebsiteRenderer config={config} interactive={true} />
          </BrowserFrame>
        </main>

      </div>

      {/* Publish Modal */}
      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        businessName={config.name}
        subdomain={slug}
        onViewLive={() => {
          setPublishModalOpen(false);
          window.open("/preview", "_blank");
        }}
      />

    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-mono-spec">Loading studio editor...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
