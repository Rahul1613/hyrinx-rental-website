"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, X, Globe, Sparkles, QrCode } from "lucide-react";

export default function PublishModal({
  isOpen,
  onClose,
  businessName,
  subdomain,
  onViewLive,
}: {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  subdomain: string;
  onViewLive: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const liveUrl = `https://${subdomain.toLowerCase().replace(/[^a-z0-9]/g, "") || "mybusiness"}.businesssite.com`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-2xl text-slate-900">
            Your Website Is Ready
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Published for <strong>{businessName}</strong>. Ready to share with clients, customers, and partners.
          </p>
        </div>

        {/* Live URL Card */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Status: <strong className="text-emerald-700">Demo Ready</strong>
            </span>
            <span className="text-[11px] font-mono-spec">SSL Secured</span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-mono text-xs text-slate-800 truncate select-all">
              {liveUrl}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors shrink-0"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={onViewLive}
            className="btn-primary-blue w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>View Fullscreen Website</span>
          </button>

          <button
            onClick={onClose}
            className="btn-secondary-white w-full py-2.5 text-xs text-slate-600"
          >
            Continue Editing in Studio
          </button>
        </div>

      </div>
    </div>
  );
}
