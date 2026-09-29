"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Eye, ArrowRight, Check, X, Layers } from "lucide-react";
import { TEMPLATES } from "@/lib/templatesData";
import { useBuilder } from "@/lib/builderStore";
import BrowserFrame from "@/components/preview/BrowserFrame";
import WebsiteRenderer from "@/components/preview/WebsiteRenderer";
import { TemplateDefinition } from "@/lib/types";

const CATEGORY_TABS = [
  "All",
  "Restaurant",
  "Digital Agency",
  "Real Estate",
  "Salon",
  "Corporate",
  "Café",
  "Consultant",
  "IT Company",
];

function TemplatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { config, loadTemplate } = useBuilder();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  const filteredTemplates =
    selectedCategory === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleUseTemplate = (templateId: string) => {
    loadTemplate(templateId);
    router.push(`/builder?template=${templateId}`);
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>TEMPLATE MARKETPLACE</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">
          Explore 12+ Industry-Tailored Website Templates
        </h1>
        <p className="text-slate-600 text-base max-w-2xl leading-relaxed">
          Every template is designed around the real commercial workflow of its business category—from table bookings to portfolio grids and enterprise RFP inquiries.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedCategory(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="pro-card overflow-hidden flex flex-col justify-between group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(template)}
                  className="px-4 py-2 rounded-lg bg-white/95 text-slate-900 text-xs font-bold shadow-md hover:bg-white flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Preview</span>
                </button>
              </div>

              {template.badge && (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white shadow-sm">
                  {template.badge}
                </span>
              )}
            </div>

            {/* Content */}
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

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(template)}
                  className="btn-secondary-white text-xs py-2 px-3 flex-1 flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleUseTemplate(template.id)}
                  className="btn-primary-blue text-xs py-2 px-4 flex-1 flex items-center justify-center gap-1"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {previewTemplate.name}
                </h3>
                <span className="text-xs text-slate-500">{previewTemplate.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleUseTemplate(previewTemplate.id);
                    setPreviewTemplate(null);
                  }}
                  className="btn-primary-blue text-xs py-2 px-4"
                >
                  Use This Template Now
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Live Renderer inside Modal */}
            <div className="flex-1 overflow-y-auto bg-slate-200 p-4">
              <BrowserFrame url={`https://${previewTemplate.id}.businesssite.com`}>
                <WebsiteRenderer
                  config={{
                    ...config,
                    name: `${previewTemplate.name}`,
                    category: previewTemplate.category,
                    tagline: previewTemplate.defaults.tagline || config.tagline,
                    description: previewTemplate.defaults.description || config.description,
                    branding: {
                      ...config.branding,
                      ...(previewTemplate.defaults.branding || {}),
                    },
                    images: {
                      ...config.images,
                      ...(previewTemplate.defaults.images || {}),
                    },
                    servicesList: previewTemplate.defaults.servicesList || config.servicesList,
                  }}
                  interactive={false}
                />
              </BrowserFrame>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-mono-spec">Loading templates marketplace...</div>}>
      <TemplatesContent />
    </Suspense>
  );
}
