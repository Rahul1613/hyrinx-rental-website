'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditWebsitePage() {
  const router = useRouter()
  const params = useParams()
  const websiteId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    description: '',
    shortDesc: '',
    featured: false,
    published: false,
    startingPrice: 149,
    liveDemoUrl: '',
    thumbnail: '',
    features: [] as string[],
    customization: [] as string[],
  })

  const availableFeatures = [
    'Gallery',
    'RSVP',
    'Countdown',
    'Contact',
    'Map',
    'Social Links',
    'Animations',
    'Custom Branding',
    'SEO',
    'Registration',
    'Wishes',
    'Schedule',
    'Speakers',
    'Sponsors',
    'Team Section',
    'Product Showcase',
    'Investor Info',
    'Resume Download',
    'Live Updates',
  ]

  const availableCustomization = [
    'Event Name',
    'Event Date',
    'Venue',
    'Logo',
    'Gallery',
    'Instagram',
    'WhatsApp',
    'Theme Colors',
    'Birthday Person Name',
    'Company Name',
    'Product Name',
    'Team Members',
    'Investor Info',
    'Contact Details',
    'Social Links',
    'Resume',
    'Speakers',
    'Schedule',
    'Sponsors',
    'Registration Form',
  ]

  useEffect(() => {
    fetchCategories()
    if (websiteId) {
      fetchWebsite()
    }
  }, [websiteId])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories((data.categories || []).map((c: any) => c.name))
      }
    } catch (err) {
      console.error('Failed to load categories', err)
    }
  }

  const fetchWebsite = async () => {
    try {
      const res = await fetch(`/api/admin/websites/${websiteId}`)
      if (res.ok) {
        const data = await res.json()
        const w = data.website
        let parsedFeatures: string[] = []
        let parsedCustomization: string[] = []
        try {
          parsedFeatures = w.features ? JSON.parse(w.features) : []
        } catch {}
        try {
          parsedCustomization = w.customization ? JSON.parse(w.customization) : []
        } catch {}

        setFormData({
          name: w.name,
          slug: w.slug,
          category: w.category,
          description: w.description,
          shortDesc: w.shortDesc,
          featured: Boolean(w.featured),
          published: Boolean(w.published),
          startingPrice: w.startingPrice || 149,
          liveDemoUrl: w.liveDemoUrl || '',
          thumbnail: w.thumbnail || '',
          features: parsedFeatures,
          customization: parsedCustomization,
        })
      }
    } catch (err) {
      console.error('Failed to load website', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/websites/${websiteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/websites')
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to update website')
      }
    } catch (err) {
      alert('Failed to update website')
    } finally {
      setSaving(false)
    }
  }

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const toggleCustomization = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      customization: prev.customization.includes(field)
        ? prev.customization.filter((f) => f !== field)
        : [...prev.customization, field],
    }))
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="p-8 animate-pulse text-slate-500">Loading website details...</div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/websites"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-3 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Websites
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Edit Website: {formData.name}</h1>
          <p className="text-slate-600">Update template details, pricing, features and availability</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Website Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Short Description *</label>
                <input
                  type="text"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">Featured Website (Shows on Homepage)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">Published</span>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing & Media */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Pricing & Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Starting Price (₹/day) *</label>
                <input
                  type="number"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Thumbnail Image URL</label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://example.com/thumb.jpg"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    placeholder="https://example.com/demo"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Included Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableFeatures.map((feature) => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Customization */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Customization Fields Available to Customer</h2>
            <p className="text-xs text-slate-500 mb-4">Fields the client can modify during checkout</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableCustomization.map((field) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.customization.includes(field)}
                    onChange={() => toggleCustomization(field)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{field}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              href="/admin/websites"
              className="px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  )
}
