'use client'

import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Heart,
  Sparkles,
  ArrowRight,
  Code,
  Download,
} from 'lucide-react'
import { BreadcrumbJsonLd, SoftwareAppJsonLd } from '@/components/seo/JsonLd'

const DEFAULT_TASKS = [
  { id: '1', category: 'Pre-Planning (4-8 Weeks Out)', text: 'Finalize couple love story and ceremony muhurat timings', completed: true },
  { id: '2', category: 'Pre-Planning (4-8 Weeks Out)', text: 'Collect high-resolution pre-wedding photos and portraits', completed: true },
  { id: '3', category: 'Pre-Planning (4-8 Weeks Out)', text: 'Confirm wedding venue Google Maps pin coordinates', completed: false },
  { id: '4', category: 'Ceremonies & Itinerary (2-4 Weeks Out)', text: 'Add Mehndi, Sangeet, Haldi, Phere & Reception schedule', completed: false },
  { id: '5', category: 'Ceremonies & Itinerary (2-4 Weeks Out)', text: 'Specify dress codes or color palettes for each function', completed: false },
  { id: '6', category: 'Digital RSVP (1-2 Weeks Out)', text: 'Set up WhatsApp RSVP number for instant guest tracking', completed: false },
  { id: '7', category: 'Digital RSVP (1-2 Weeks Out)', text: 'Choose traditional Shehnai or flute background music track', completed: false },
  { id: '8', category: 'Launch Week', text: 'Share royal digital invite link on WhatsApp wedding groups', completed: false },
  { id: '9', category: 'Launch Week', text: 'Display QR code on printed reception welcome easel', completed: false },
]

export default function WeddingChecklistTool() {
  const [tasks, setTasks] = useState(DEFAULT_TASKS)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const progressPercent = Math.round((completedCount / tasks.length) * 100)

  const embedCode = `<iframe src="https://hyrinx.in/tools/wedding-website-checklist" width="100%" height="600" frameborder="0"></iframe>\n<p style="font-size:12px;color:#666;">Tool provided by <a href="https://hyrinx.in" target="_blank" rel="noopener">Hyrinx Wedding Website Rentals</a></p>`

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2500)
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Free Tools', url: 'https://hyrinx.in/tools' },
    { name: 'Wedding Website Checklist', url: 'https://hyrinx.in/tools/wedding-website-checklist' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareAppJsonLd
        name="Indian Wedding Website Checklist Generator"
        description="Free interactive planning checklist for Indian wedding invitation websites, WhatsApp RSVPs, venue directions, and music."
        url="https://hyrinx.in/tools/wedding-website-checklist"
      />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" /> Free Interactive Tool
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Indian Wedding Website Checklist Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Ensure your digital wedding invitation website has everything your guests need — from 3D wax patrikas and Saat Phere vows to WhatsApp RSVPs and Google Maps pins.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-900">
              Checklist Readiness: {completedCount} of {tasks.length} Completed
            </span>
            <span className="text-sm font-extrabold text-rose-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-rose-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          <div className="space-y-4">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`w-full flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all ${
                  task.completed
                    ? 'border-emerald-200 bg-emerald-50/50 text-slate-700'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-900'
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    {task.category}
                  </span>
                  <span className={`text-sm sm:text-base font-medium ${task.completed ? 'line-through text-slate-500' : ''}`}>
                    {task.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Ready to launch your royal wedding website?
              </p>
              <p className="text-xs text-slate-500">
                Templates start at just ₹149/day. Live in 2–6 hours with RSVP included.
              </p>
            </div>
            <Link
              href="/categories/wedding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <span>Browse Wedding Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Embed Widget Box (White-Hat Link Magnet) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200">
              <Code className="w-4 h-4 text-rose-400" /> Embed this Checklist on Your Wedding Blog
            </h3>
            <button
              onClick={copyEmbed}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-rose-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmbed ? 'Copied HTML!' : 'Copy Embed Code'}</span>
            </button>
          </div>
          <pre className="text-xs bg-slate-950 p-3 rounded-xl overflow-x-auto text-slate-400 font-mono">
            {embedCode}
          </pre>
          <p className="text-[11px] text-slate-400 mt-2">
            Free to embed with attribution. Provided by{' '}
            <Link href="/" className="text-rose-400 underline font-semibold">
              Hyrinx Rental
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
