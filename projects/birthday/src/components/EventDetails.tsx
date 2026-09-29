"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Download,
} from "lucide-react";
import { BirthdayProfile } from "@/lib/birthdayConfig";

interface EventDetailsProps {
  event: BirthdayProfile["eventDetails"];
  name: string;
}

export default function EventDetails({ event, name }: EventDetailsProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${event.venue}, ${event.address}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Google Calendar URL generation
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.calendarTitle);
    const details = encodeURIComponent(
      `${event.calendarDesc}\n\nVenue: ${event.venue}\nAddress: ${event.address}\nDress Code: ${event.dressCode}`
    );
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    // Default celebration slot: 20261017T140000Z / 20261017T180000Z
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Download .ics file
  const downloadIcs = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Birthday Celebration//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${event.calendarTitle}`,
      `DESCRIPTION:${event.calendarDesc} - Dress code: ${event.dressCode}`,
      `LOCATION:${event.venue}, ${event.address}`,
      "DTSTART:20261017T140000Z",
      "DTEND:20261017T183000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name.replace(/\s+/g, "_")}_Birthday_Invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="event-details" className="py-16 md:py-24 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Header */}
        <div className="mb-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Event Dossier</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            When & Where We Gather
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            All the logistics in one spot. Save the date to your calendar and grab directions below.
          </p>
        </div>

        {/* Boarding Pass / Ticket Pass Layout */}
        <div className="rounded-2xl border border-white/10 bg-[#0A0E1A] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Ticket Main Section */}
            <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Admission Pass
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">
                    {name}'s Milestone Night
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20">
                    Confirmed
                  </span>
                </div>
              </div>

              {/* Grid of Key Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    <span className="font-medium text-slate-300">Date</span>
                  </div>
                  <div className="text-base font-semibold text-white">
                    {event.date}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <span className="font-medium text-slate-300">Timing</span>
                  </div>
                  <div className="text-base font-semibold text-white">
                    {event.time}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <MapPin className="h-4 w-4 text-rose-400" />
                    <span className="font-medium text-slate-300">Venue & Coordinates</span>
                  </div>
                  <div className="text-base font-semibold text-white">
                    {event.venue}
                  </div>
                  <div className="text-sm text-slate-400 mt-0.5">
                    {event.address}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-300 font-medium">Attire & Vibe: </strong>
                    {event.dressCode}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <a
                  href={createGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 text-xs font-semibold text-white transition-colors"
                >
                  <Calendar className="h-4 w-4 text-amber-300" />
                  <span>Google Calendar</span>
                </a>

                <button
                  onClick={downloadIcs}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 px-4 py-2.5 text-xs font-medium text-slate-200 transition-colors"
                >
                  <Download className="h-4 w-4 text-slate-400" />
                  <span>Download .ics</span>
                </button>

                <button
                  onClick={copyAddress}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 px-4 py-2.5 text-xs font-medium text-slate-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Perforated Map Section */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-dashed border-white/15 bg-[#0D1424] p-6 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  Map & Navigation
                </span>

                {/* Stylized Visual Map Card */}
                <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#070B14] p-4 text-center">
                  <div className="my-6 flex justify-center">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-full bg-rose-500/20 flex items-center justify-center animate-ping absolute inset-0" />
                      <div className="relative h-14 w-14 rounded-full bg-rose-500/30 border border-rose-400 flex items-center justify-center text-white">
                        <MapPin className="h-6 w-6 text-rose-300" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Lat: {event.coordinates.lat} • Lng: {event.coordinates.lng}
                  </div>
                  <div className="text-sm font-semibold text-white mt-1">
                    {event.venue.split("&")[0].trim()}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#090D16] py-3 text-xs font-bold transition-all active:scale-[0.98]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
