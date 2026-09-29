"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles, MessageSquareHeart } from "lucide-react";
import { BirthdayProfile } from "@/lib/birthdayConfig";

interface HeroProps {
  profile: BirthdayProfile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/10">
      {/* Subtle architectural background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        {/* Subtle status indicator */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Celebration Hub</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {profile.eventDetails.date.split(",")[0]} • {profile.eventDetails.venue.split("&")[0].trim()}
          </span>
        </div>

        {/* The One Orchestrated Entrance */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.95]">
              {profile.name}
            </h1>
          </motion.div>

          {/* Age Milestone Stamp Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="self-start md:self-end"
          >
            <div
              className="inline-flex items-center gap-3 rounded-2xl px-5 py-3 border border-white/15 shadow-2xl backdrop-blur-md"
              style={{
                backgroundColor: profile.theme.badgeBg,
                color: profile.theme.badgeText,
              }}
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Milestone
                </span>
                <span className="font-display text-3xl sm:text-4xl font-black leading-none">
                  {profile.age} Years
                </span>
              </div>
              <Sparkles className="h-5 w-5 opacity-80" />
            </div>
          </motion.div>
        </div>

        {/* Personality & Headline Narrative */}
        <div className="mt-4 max-w-2xl">
          <p className="text-xl sm:text-2xl text-slate-200 font-medium leading-snug">
            {profile.headline}
          </p>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            {profile.subheadline}
          </p>

          {/* Personality Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.personalityPills.map((pill) => (
              <span
                key={pill}
                className="rounded-lg border border-white/10 bg-[#0F172A]/70 px-3 py-1 text-xs text-slate-300 font-medium"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Key Event Hooks & Action CTAs */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-400" />
              <span>{profile.eventDetails.date}</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>{profile.eventDetails.venue}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#rsvp-section"
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${profile.theme.primaryBtn}`}
            >
              RSVP for the Party
            </a>
            <a
              href="#guestbook-section"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors"
            >
              <MessageSquareHeart className="h-4 w-4" />
              <span>Guestbook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
