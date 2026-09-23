'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Send, Check } from 'lucide-react'

export default function CustomWebsitePage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    websiteType: '',
    preferredDuration: '',
    budget: '',
    description: '',
    referenceWebsite: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms) {
      alert('Please agree to the Terms & Conditions and Privacy Policy before submitting your request.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/custom-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to submit request')
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Request Submitted!
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for your interest. We'll review your request and get back to you within 24-48 hours.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest block mb-3">
              Custom Request
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-6">
              Can't Find What You're Looking For?
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              Tell us what you need and we'll create a website around your requirements.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Website Type *
                  </label>
                  <select
                    value={formData.websiteType}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteType: e.target.value }))}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Business">Business Website</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Blog">Blog</option>
                    <option value="Event">Event Website</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Preferred Duration *
                  </label>
                  <select
                    value={formData.preferredDuration}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredDuration: e.target.value }))}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="1 Day">1 Day</option>
                    <option value="3 Days">3 Days</option>
                    <option value="7 Days">7 Days</option>
                    <option value="15 Days">15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                    <option value="Longer">Longer than 1 year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Budget (₹) *
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="e.g., 5000-10000"
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300 resize-none"
                  placeholder="Describe your requirements, features you need, design preferences, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Reference Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.referenceWebsite}
                  onChange={(e) => setFormData(prev => ({ ...prev, referenceWebsite: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                />
              </div>

              {/* TERMS & CONDITIONS AGREEMENT */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5">
                <label className="flex cursor-pointer items-start gap-4">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="text-sm leading-6 text-slate-600">
                    I have read and agree to the{' '}
                    <Link
                      href="/terms"
                      target="_blank"
                      className="font-semibold text-blue-600 underline hover:text-blue-700"
                    >
                      Terms & Conditions, User Agreement & Rules of Usage
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="font-semibold text-blue-600 underline hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                    . I understand that websites are provided under a temporary rental model and confirm that my intended use is lawful.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !agreedToTerms}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 px-8 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 text-lg mb-6 font-medium">
              Prefer to talk directly? Reach out to us:
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:contact@hyrinx.com"
                className="text-blue-600 hover:text-blue-700 text-lg font-bold transition-colors"
              >
                contact@hyrinx.com
              </a>
              <a
                href="tel:+919730213645"
                className="text-blue-600 hover:text-blue-700 text-lg font-bold transition-colors"
              >
                +91 97302 13645
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
