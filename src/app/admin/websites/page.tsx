'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'
import { Plus, Edit, Eye, Trash2, Star, CheckCircle, ExternalLink } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function AdminWebsitesPage() {
  const [websites, setWebsites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWebsites()
  }, [])

  const fetchWebsites = async () => {
    try {
      const res = await fetch('/api/admin/websites')
      if (res.ok) {
        const data = await res.json()
        setWebsites(data.websites || [])
      }
    } catch (err) {
      console.error('Failed to load websites', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (website: any, field: 'published' | 'featured') => {
    try {
      const res = await fetch(`/api/admin/websites/${website.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...website,
          [field]: !website[field],
        }),
      })
      if (res.ok) {
        fetchWebsites()
      }
    } catch (err) {
      console.error('Failed to update status', err)
    }
  }

  const handleDelete = async (website: any) => {
    if (!confirm(`Are you sure you want to delete "${website.name}"?`)) return

    try {
      const res = await fetch(`/api/admin/websites/${website.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchWebsites()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to delete website')
      }
    } catch (err) {
      alert('Error deleting website')
    }
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Websites</h1>
          <p className="text-slate-600">Manage templates, featured items, and pricing in the marketplace</p>
        </div>
        <Link
          href="/admin/websites/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Website
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Website Template</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Starting Price</th>
              <th className="px-6 py-4 text-center">Featured</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {websites.map((website) => (
              <tr key={website.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {website.thumbnail ? (
                      <img
                        src={website.thumbnail}
                        alt={website.name}
                        className="w-12 h-9 rounded-md object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-9 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {website.name[0]}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        {website.name}
                        {website.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">/{website.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                    {website.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-900 font-semibold">
                  {formatPrice(website.startingPrice || 0)}
                  <span className="text-xs font-normal text-slate-500">/day</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleStatus(website, 'featured')}
                    title={website.featured ? 'Remove from Featured' : 'Feature on Homepage'}
                    className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        website.featured
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-slate-300 hover:text-slate-400'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleStatus(website, 'published')}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                      website.published
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {website.published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/websites/${website.slug}`}
                      target="_blank"
                      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Preview on site"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/websites/${website.id}/edit`}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit template"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(website)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete template"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {websites.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No websites in marketplace yet.</p>
            <Link
              href="/admin/websites/new"
              className="text-blue-600 hover:underline font-medium text-sm"
            >
              Add your first website template
            </Link>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
