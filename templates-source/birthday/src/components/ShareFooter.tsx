"use client";

import { useState, useEffect } from "react";
import { Share2, Copy, Check, MessageCircle, Send, Heart, ArrowUp } from "lucide-react";
import { BirthdayProfile } from "@/lib/birthdayConfig";

interface ShareFooterProps {
  profile: BirthdayProfile;
}

export default function ShareFooter({ profile }: ShareFooterProps) {
  const [copied, setCopied] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number>(20);

  useEffect(() => {
    // Calculate simple days difference or set celebration slot
    const targetDate = new Date("2026-10-17T19:30:00");
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff > 0) {
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    } else {
      setDaysLeft(0);
    }
  }, []);

  const shareText = `Join us in celebrating ${profile.name}'s ${profile.age}th birthday on ${profile.eventDetails.date}! Details & RSVP:`;

  const copyUrl = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "https://celebrate.local";
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const shareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`;
    window.open(waUrl, "_blank");
  };

  const shareTwitter = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText} ${url}`)}`;
    window.open(twUrl, "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-14 bg-[#05070D] border-t border-white/10 text-slate-400 text-xs">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 space-y-10">
        {/* Top Share Box */}
        <div className="rounded-2xl border border-white/10 bg-[#0A0E1A] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-amber-300 text-xs mb-1">
              <Share2 className="h-3.5 w-3.5" />
              <span>Spread The Word</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Pass along the invitation to mutual friends
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Make sure nobody in the circle misses out on the celebration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={shareWhatsApp}
              className="flex items-center gap-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-4 py-2.5 font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={shareTwitter}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 px-4 py-2.5 font-medium transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Share on X</span>
            </button>

            <button
              onClick={copyUrl}
              className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-400" />
                  <span>Copy Invite Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-white">
              {profile.name} • Turning {profile.age}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Celebration Countdown: {daysLeft} Days to go
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-rose-500 inline fill-rose-500" /> for milestones that matter
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
