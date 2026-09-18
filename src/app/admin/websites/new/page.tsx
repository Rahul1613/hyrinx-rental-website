'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewWebsitePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    description: '',
    shortDesc: '',
    featured: false,
    published: false,
    startingPrice: 49,
    liveDemoUrl: '',
    thumbnail: '',
    features: [] as string[],
    customization: [] as string[],
  })

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          startingPrice: parseInt(formData.startingPrice as any) || 49,
        }),
      })

      if (response.ok) {
        router.push('/admin/websites')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create website')
      }
    } catch (error) {
      console.error('Error creating website:', error)
      alert('Failed to create website')
    } finally {
      setLoading(false)
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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
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
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Add New Website</h1>
          <p className="text-slate-600">Create a new website template for the marketplace</p>
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
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                      slug: prev.slug || generateSlug(e.target.value),
                    }))
                  }}
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
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, shortDesc: e.target.value }))}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">Featured Website (Shows on Homepage)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">Publish Immediately</span>
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
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, startingPrice: parseInt(e.target.value) || 0 }))
                  }
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
                    onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))}
                    placeholder="https://example.com/thumbnail.jpg"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, liveDemoUrl: e.target.value }))}
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
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Customization Fields</h2>
            <p className="text-xs text-slate-500 mb-4">Select fields customers can configure during order</p>
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
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Website'}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  )
}
