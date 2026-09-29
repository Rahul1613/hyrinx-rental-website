"use client";

import React from "react";
import { Lock, RotateCw, Monitor, Tablet, Smartphone, ExternalLink, Maximize2 } from "lucide-react";
import { DeviceMode } from "../../lib/types";

export default function BrowserFrame({
  children,
  url = "https://rahulscafe.com",
  deviceMode = "desktop",
  onDeviceChange,
  onFullscreen,
}: {
  children: React.ReactNode;
  url?: string;
  deviceMode?: DeviceMode;
  onDeviceChange?: (mode: DeviceMode) => void;
  onFullscreen?: () => void;
}) {
  const containerWidth =
    deviceMode === "mobile"
      ? "max-w-[390px]"
      : deviceMode === "tablet"
      ? "max-w-[768px]"
      : "w-full";

  return (
    <div className="flex flex-col h-full w-full bg-slate-100 rounded-xl border border-slate-300/80 shadow-xl overflow-hidden transition-all duration-300">
      {/* Top Browser Bar */}
      <div className="h-11 bg-slate-200/80 border-b border-slate-300 px-4 flex items-center justify-between gap-4 select-none shrink-0">
        
        {/* Traffic Light Dots */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/30" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/30" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/30" />
        </div>

        {/* Address URL Pill */}
        <div className="flex-1 max-w-md bg-white rounded-md border border-slate-300/80 px-3 py-1 flex items-center justify-between text-xs text-slate-600 shadow-2xs">
          <div className="flex items-center gap-1.5 truncate">
            <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate font-mono text-[11px] text-slate-800">{url}</span>
          </div>
          <RotateCw className="w-3 h-3 text-slate-400 shrink-0 hover:text-slate-600 cursor-pointer" />
        </div>

        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onDeviceChange && (
            <div className="hidden sm:flex items-center bg-slate-300/60 p-0.5 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => onDeviceChange("desktop")}
                className={`p-1.5 rounded-md transition-all ${
                  deviceMode === "desktop"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeviceChange("tablet")}
                className={`p-1.5 rounded-md transition-all ${
                  deviceMode === "tablet"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeviceChange("mobile")}
                className={`p-1.5 rounded-md transition-all ${
                  deviceMode === "mobile"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {onFullscreen && (
            <button
              type="button"
              onClick={onFullscreen}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-300/50 transition-colors"
              title="Fullscreen Preview"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Browser Viewport Area */}
      <div className="flex-1 bg-slate-300/40 p-2 sm:p-4 overflow-y-auto flex justify-center items-start">
        <div
          className={`${containerWidth} h-full min-h-[500px] bg-white rounded-lg shadow-sm border border-slate-200 overflow-y-auto transition-all duration-300`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
