'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle2, Camera } from 'lucide-react'

export default function ContactPage() {
  const [settings, setSettings] = useState({
    business_email: 'hyrinxofficial@gmail.com',
    business_phone: '+91 9730213645',
    business_whatsapp: '+91 9730213645',
    business_location: 'India',
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        if (data.settings) {
          setSettings((prev) => ({
            ...prev,
            business_email: data.settings.business_email || prev.business_email,
            business_phone: data.settings.business_phone || prev.business_phone,
            business_whatsapp: data.settings.business_whatsapp || prev.business_whatsapp,
            business_location: data.settings.business_location || prev.business_location,
          }))
        }
      }
    } catch {}
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Save contact request via custom-requests API
      const res = await fetch('/api/custom-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '0000000000',
          websiteType: formData.subject || 'General Inquiry',
          preferredDuration: '1 Month',
          budget: 'Standard',
          description: formData.message,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        alert('Failed to send message. Please reach out via email or phone.')
      }
    } catch {
      alert('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest block mb-3">
              Get In Touch
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-6 tracking-tight">
              Let's Build Something Temporary
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Need a website for your next event, project or idea? Get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-8">Get in Touch</h2>

              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mail className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Email</h3>
                    <a href={`mailto:${settings.business_email}`} className="text-blue-600 hover:text-blue-700 hover:underline text-base font-medium transition-colors">
                      {settings.business_email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Phone className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Phone</h3>
                    <div className="space-y-2">
                      <a href="tel:+919730213645" className="block text-blue-600 hover:text-blue-700 hover:underline text-base font-medium transition-colors">
                        +91 9730213645
                      </a>
                      <a href="tel:+917020072239" className="block text-blue-600 hover:text-blue-700 hover:underline text-base font-medium transition-colors">
                        +91 7020072239
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">WhatsApp</h3>
                    <div className="space-y-2">
                      <a
                        href="https://wa.me/919730213645"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:underline text-base font-medium transition-colors"
                      >
                        <span>+91 9730213645</span>
                        <span className="text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">Rahul</span>
                      </a>
                      <a
                        href="https://wa.me/917020072239"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:underline text-base font-medium transition-colors"
                      >
                        <span>+91 7020072239</span>
                        <span className="text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">Harshal</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Camera className="h-7 w-7 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Instagram</h3>
                    <div className="space-y-2">
                      <a
                        href="https://www.instagram.com/_rahulsisode/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-pink-600 hover:text-pink-700 hover:underline text-base font-medium transition-colors"
                      >
                        @_rahulsisode
                      </a>
                      <a
                        href="https://www.instagram.com/hxrshxl_07/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-pink-600 hover:text-pink-700 hover:underline text-base font-medium transition-colors"
                      >
                        @hxrshxl_07
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MapPin className="h-7 w-7 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Headquarters</h3>
                    <p className="text-slate-600 text-base font-medium">{settings.business_location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Need a tailored solution?</h3>
                <p className="text-slate-600 text-base mb-6 leading-relaxed">
                  Fill out our detailed custom website specification form to get a personalized quote within 24 hours.
                </p>
                <Link
                  href="/custom-website"
                  className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1"
                >
                  Request Custom Website
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-slate-200">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="p-10 text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-200">
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Message Received!</h3>
                  <p className="text-green-700 text-base mb-6 leading-relaxed">
                    Thank you for reaching out. We will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-base font-bold text-green-800 underline hover:text-green-900 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Subject / Event Type *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Wedding Website, College Fest, Startup Launch"
                      className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Message *</label>
                    <textarea
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements or question..."
                      className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 px-8 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
