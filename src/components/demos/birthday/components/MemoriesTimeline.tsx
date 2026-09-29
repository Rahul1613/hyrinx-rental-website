"use client";

import { History, MapPin, Milestone } from "lucide-react";
import { TimelineEvent } from "@/lib/birthdayConfig";

interface MemoriesTimelineProps {
  timeline: TimelineEvent[];
  name: string;
}

export default function MemoriesTimeline({ timeline, name }: MemoriesTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-[#060910]">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
            <History className="h-3.5 w-3.5 text-amber-400" />
            <span>Chronological Memoir</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            The Years That Shaped {name.split(" ")[0]}
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Real pivotal turns, quiet milestones, and the defining seasons leading up to this celebration.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="relative border-l border-white/15 ml-4 sm:ml-28 space-y-10">
          {timeline.map((item, index) => {
            const isLast = index === timeline.length - 1;
            return (
              <div key={item.year} className="relative pl-6 sm:pl-10 group">
                {/* Year Marker on the Left */}
                <div className="hidden sm:flex absolute -left-28 top-0.5 w-20 justify-end">
                  <span className="font-mono text-base font-bold text-amber-300">
                    {item.year}
                  </span>
                </div>

                {/* Node Bullet on Spine */}
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-[#060910] bg-amber-400 transition-transform group-hover:scale-125" />

                {/* Mobile Year Badge */}
                <div className="sm:hidden mb-2 inline-flex items-center gap-2 rounded-md bg-amber-400/10 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-300 border border-amber-400/20">
                  {item.year}
                </div>

                {/* Card Container */}
                <div className="rounded-xl border border-white/10 bg-[#0C1220] p-5 sm:p-6 transition-colors hover:border-white/20">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <span className="rounded-md bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-slate-300 border border-white/5">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.story}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
