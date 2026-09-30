"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Monitor, Tablet, Smartphone, ArrowLeft, Rocket, Globe } from "lucide-react";
import WebsiteRenderer from "@/components/preview/WebsiteRenderer";
import PublishModal from "@/components/modals/PublishModal";
import { useBuilder } from "@/lib/builderStore";
import { DeviceMode } from "@/lib/types";

export default function FullscreenPreviewPage() {
  const { config, deviceMode, setDeviceMode } = useBuilder();
  const [publishOpen, setPublishOpen] = useState(false);

  const containerWidth =
    deviceMode === "mobile"
      ? "max-w-[390px] shadow-2xl rounded-2xl border-4 border-slate-800 my-8"
      : deviceMode === "tablet"
      ? "max-w-[768px] shadow-2xl rounded-xl border-4 border-slate-800 my-8"
      : "w-full";

  const slug = (config.name || "business").toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      
      {/* Floating Viewport Controls Header */}
      <header className="sticky top-0 z-50 h-14 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between text-slate-300">
        
        {/* Left: Back to Editor */}
        <Link
          href="/builder"
          className="flex items-center gap-2 text-xs font-semibold hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Editor</span>
        </Link>

        {/* Center: Device Switcher */}
        <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded-md transition-all ${
              deviceMode === "desktop"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded-md transition-all ${
              deviceMode === "tablet"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded-md transition-all ${
              deviceMode === "mobile"
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Site Name & Publish */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">
            {config.name}
          </span>
          <button
            type="button"
            onClick={() => setPublishOpen(true)}
            className="btn-primary-blue text-xs py-1.5 px-3.5 flex items-center gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>

      </header>

      {/* Main Viewport Container */}
      <main className="flex-1 flex justify-center items-start overflow-y-auto">
        <div className={`${containerWidth} bg-white transition-all duration-300 overflow-hidden`}>
          <WebsiteRenderer config={config} interactive={true} />
        </div>
      </main>

      {/* Publish Modal Simulation */}
      <PublishModal
        isOpen={publishOpen}
        onClose={() => setPublishOpen(false)}
        businessName={config.name}
        subdomain={slug}
        onViewLive={() => setPublishOpen(false)}
      />

    </div>
  );
}
