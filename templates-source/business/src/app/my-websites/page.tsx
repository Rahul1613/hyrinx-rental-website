"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  Sliders,
  Eye,
  Copy,
  Trash2,
  Plus,
  ArrowRight,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { useBuilder } from "@/lib/builderStore";

export default function MyWebsitesPage() {
  const router = useRouter();
  const {
    savedWebsites,
    config,
    loadWebsiteById,
    deleteWebsiteById,
    duplicateWebsiteById,
    updateConfig,
  } = useBuilder();

  const handleEdit = (id: string) => {
    loadWebsiteById(id);
    router.push("/builder");
  };

  const handlePreview = (id: string) => {
    loadWebsiteById(id);
    router.push("/preview");
  };

  const handleCreateNew = () => {
    const newId = `site-${Date.now()}`;
    updateConfig({
      id: newId,
      name: "New Business Brand",
      category: "Restaurant",
      tagline: "Quality & Service You Can Trust",
      description: "Welcome to our brand new business. We offer premium services and dedicated customer care.",
      updatedAt: new Date().toISOString(),
    });
    router.push("/builder");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>MY WEBSITES WORKSPACE</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Your Created & Saved Websites
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your businesses, duplicate existing blueprints, or launch a new concept.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="btn-primary-blue text-xs py-2.5 px-4 flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Website</span>
        </button>
      </div>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedWebsites.map((site) => {
          const isCurrentlyActive = config.id === site.id;

          return (
            <div
              key={site.id}
              className={`pro-card p-6 flex flex-col justify-between space-y-5 bg-white transition-all ${
                isCurrentlyActive ? "border-blue-600 ring-2 ring-blue-600/20" : ""
              }`}
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {site.category}
                  </span>
                  {isCurrentlyActive && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Active In Editor
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-xl text-slate-900 truncate">
                  {site.name}
                </h3>

                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {site.tagline || site.description}
                </p>
              </div>

              {/* Meta Specs */}
              <div className="space-y-2 text-xs border-y border-slate-100 py-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Template Engine:</span>
                  <strong className="text-slate-800 font-mono text-[11px]">{site.templateId}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Primary Color:</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: site.branding.primaryColor }}
                    />
                    <span className="font-mono text-[11px] text-slate-700">{site.branding.primaryColor}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(site.id)}
                    className="btn-primary-blue text-xs py-2 px-3 flex items-center justify-center gap-1"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePreview(site.id)}
                    className="btn-secondary-white text-xs py-2 px-3 flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 text-slate-500 text-xs">
                  <button
                    type="button"
                    onClick={() => duplicateWebsiteById(site.id)}
                    className="hover:text-blue-700 transition-colors flex items-center gap-1"
                    title="Duplicate website configuration"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Duplicate</span>
                  </button>

                  {savedWebsites.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteWebsiteById(site.id)}
                      className="hover:text-rose-600 transition-colors flex items-center gap-1"
                      title="Delete website"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
