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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 sm:text-3xl">Websites</h1>
          <p className="text-sm text-slate-600 sm:text-base">Manage templates, featured items, and pricing in the marketplace</p>
        </div>
        <Link
          href="/admin/websites/new"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Website
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase tracking-wider text-slate-700 sm:text-xs">
              <tr>
                <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Website</th>
                <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Category</th>
                <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Price</th>
                <th className="px-3 py-3 text-center sm:px-5 sm:py-4">Featured</th>
                <th className="px-3 py-3 text-center sm:px-5 sm:py-4">Status</th>
                <th className="px-3 py-3 text-right sm:px-5 sm:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {websites.map((website) => (
                <tr key={website.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-3 sm:px-5 sm:py-4">
                    <div className="flex items-center gap-3">
                      {website.thumbnail ? (
                        <img
                          src={website.thumbnail}
                          alt={website.name}
                          className="h-9 w-12 rounded-md border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-12 items-center justify-center rounded-md bg-blue-100 text-[10px] font-bold text-blue-600">
                          {website.name[0]}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 font-semibold text-slate-900">
                          <span className="truncate max-w-[140px] sm:max-w-none">{website.name}</span>
                          {website.featured && (
                            <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[9px] font-bold text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-slate-500">/{website.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-5 sm:py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700 sm:text-xs">
                      {website.category}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-900 sm:px-5 sm:py-4">
                    {formatPrice(website.startingPrice || 0)}
                    <span className="ml-1 text-[10px] font-normal text-slate-500 sm:text-xs">/day</span>
                  </td>
                  <td className="px-3 py-3 text-center sm:px-5 sm:py-4">
                    <button
                      onClick={() => toggleStatus(website, 'featured')}
                      title={website.featured ? 'Remove from Featured' : 'Feature on Homepage'}
                      className="rounded-full p-1 transition-colors hover:bg-slate-100"
                    >
                      <Star
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          website.featured
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-slate-300 hover:text-slate-400'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-3 py-3 text-center sm:px-5 sm:py-4">
                    <button
                      onClick={() => toggleStatus(website, 'published')}
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold transition-colors sm:text-xs ${
                        website.published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {website.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-3 py-3 text-right sm:px-5 sm:py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/websites/${website.slug}`}
                        target="_blank"
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        title="Preview on site"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/websites/${website.id}/edit`}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        title="Edit template"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(website)}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
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
        </div>

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
