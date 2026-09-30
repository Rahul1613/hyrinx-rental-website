"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, Download, RotateCcw, Check, ShieldCheck, Database, Laptop } from "lucide-react";
import { useBuilder } from "@/lib/builderStore";

export default function SettingsPage() {
  const { config, resetToDefault } = useBuilder();
  const [exported, setExported] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${config.name.toLowerCase().replace(/\s+/g, "-")}-website-config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset current website configuration back to factory default?")) {
      resetToDefault();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5 text-blue-600" />
          <span>STUDIO PREFERENCES</span>
        </div>
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
          Application & Data Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage local storage retention, JSON export backups, and runtime environment.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6">
        
        {/* Card 1: Data Backup */}
        <div className="pro-card p-6 sm:p-8 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Export Website Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download a complete, offline JSON blueprint of your active site configuration.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportJson}
              className="btn-primary-blue text-xs py-2 px-4 flex items-center gap-1.5 shrink-0"
            >
              {exported ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Exported JSON</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200/80 text-slate-600 truncate">
            Config ID: {config.id} • Active: {config.name} ({config.category}) • Last Modified: {config.updatedAt}
          </div>
        </div>

        {/* Card 2: Local Storage Management */}
        <div className="pro-card p-6 sm:p-8 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Reset Workspace to Defaults
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Restores the initial sample business ("Rahul's Café") and clears current custom drafts.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary-white text-xs py-2 px-4 hover:border-rose-400 hover:text-rose-600 flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {resetDone && (
            <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded border border-emerald-200">
              Workspace successfully reset to default sample business.
            </p>
          )}
        </div>

        {/* Card 3: Architecture Info */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Laptop className="w-4 h-4 text-blue-600" />
            <span>Frontend-Only Zero-Backend Architecture</span>
          </div>
          <p className="leading-relaxed">
            BusinessSite Studio runs 100% inside your client browser memory using HTML5 LocalStorage and object URL image streams. No external tracking, no backend database required, and zero network latency.
          </p>
        </div>

      </div>

    </div>
  );
}
