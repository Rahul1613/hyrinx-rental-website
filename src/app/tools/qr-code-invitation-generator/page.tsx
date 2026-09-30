'use client'

import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  QrCode,
  Share2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Code,
  Download,
} from 'lucide-react'
import { BreadcrumbJsonLd, SoftwareAppJsonLd } from '@/components/seo/JsonLd'

export default function QrCodeInvitationGeneratorTool() {
  const [eventName, setEventName] = useState('Rahul & Priya Wedding')
  const [targetUrl, setTargetUrl] = useState('https://hyrinx.in/websites/royal-wedding')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  const encodedUrl = encodeURIComponent(targetUrl || 'https://hyrinx.in')
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}&format=png`

  const copyUrl = () => {
    navigator.clipboard.writeText(targetUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const embedCode = `<iframe src="https://hyrinx.in/tools/qr-code-invitation-generator" width="100%" height="600" frameborder="0"></iframe>\n<p style="font-size:12px;color:#666;">QR Generator by <a href="https://hyrinx.in" target="_blank" rel="noopener">Hyrinx Invitation Rentals</a></p>`

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2500)
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Free Tools', url: 'https://hyrinx.in/tools' },
    { name: 'QR Code Invitation Generator', url: 'https://hyrinx.in/tools/qr-code-invitation-generator' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareAppJsonLd
        name="Free Digital Invitation QR Code Generator"
        description="Generate instant high-resolution QR codes and WhatsApp share links for wedding and event websites."
        url="https://hyrinx.in/tools/qr-code-invitation-generator"
      />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <QrCode className="w-3.5 h-3.5 text-purple-600" /> Free QR &amp; Link Tool
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Digital Invitation QR Code &amp; Link Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Generate high-resolution printable QR codes for wedding welcome boards, invitation cards, and WhatsApp event sharing.
          </p>
        </div>

        {/* Generator Workstation */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Inputs */}
            <div>
              <div className="mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Event / Celebration Title
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. Royal Wedding Invitation"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Website / Invitation URL
                </label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://yourname.hyrinx.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-600 focus:outline-none font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Enter your rented Hyrinx website link or any event URL.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={copyUrl}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-xs transition-all"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Invitation Link'}</span>
                </button>

                <a
                  href={qrImageUrl}
                  download="hyrinx-invitation-qr.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Res QR</span>
                </a>
              </div>
            </div>

            {/* QR Preview Card */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-3">
                <img
                  src={qrImageUrl}
                  alt={`${eventName} invitation QR code`}
                  className="w-48 h-48 rounded-lg"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{eventName}</h3>
              <p className="text-[11px] text-slate-500 truncate max-w-[240px] mt-0.5">
                {targetUrl}
              </p>
              <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                Scan to Open Invitation &amp; RSVP
              </span>
            </div>
          </div>
        </div>

        {/* Embed Widget Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200">
              <Code className="w-4 h-4 text-purple-400" /> Embed this QR Tool on Your Event Blog
            </h3>
            <button
              onClick={copyEmbed}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-purple-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmbed ? 'Copied HTML!' : 'Copy Embed Code'}</span>
            </button>
          </div>
          <pre className="text-xs bg-slate-950 p-3 rounded-xl overflow-x-auto text-slate-400 font-mono">
            {embedCode}
          </pre>
          <p className="text-[11px] text-slate-400 mt-2">
            Provided by{' '}
            <Link href="/" className="text-purple-400 underline font-semibold">
              Hyrinx Rental
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
