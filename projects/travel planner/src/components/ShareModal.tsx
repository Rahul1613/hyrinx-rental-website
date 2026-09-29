'use client';

import React, { useState } from 'react';
import { useTrip } from '@/lib/tripStore';
import { X, Copy, Check, Share2, Globe, Sparkles } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { currentTrip } = useTrip();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `https://roam.demo/trips/${currentTrip.destinationId}-${currentTrip.totalDays}-days`;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#0c1018] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 text-white space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-white">Share Journey</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 mx-auto flex items-center justify-center">
            <Globe className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-2xl font-normal text-white">
            Your Journey Is Ready
          </h2>

          <p className="text-xs text-white/70 font-light leading-relaxed">
            Anyone with this link can experience your curated {currentTrip.totalDays}-day {currentTrip.destinationName} itinerary, ryokans, and daily rituals.
          </p>
        </div>

        {/* Share Link Input */}
        <div className="p-2.5 rounded-2xl bg-[#121824] border border-white/10 flex items-center justify-between gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-white/80 text-xs px-2 focus:outline-none flex-1 truncate"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-amber-400 text-black font-semibold text-xs hover:bg-amber-300 flex items-center gap-1.5 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="text-center">
          <span className="text-[11px] text-white/40 font-light">
            Pure client-side state share URL for offline travel previews
          </span>
        </div>

      </div>
    </div>
  );
}
