'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { Plus, Trash2, Tag, Check, X, Globe } from 'lucide-react'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data.categories || [])
      }
    } catch (err) {
      console.error('Failed to load categories', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return
    setError('')
    setAdding(true)

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      })

      const data = await res.json()
      if (res.ok) {
        setNewCategoryName('')
        fetchCategories()
      } else {
        setError(data.error || 'Failed to add category')
      }
    } catch (err) {
      setError('An error occurred while adding category')
    } finally {
      setAdding(false)
    }
  }

  const toggleEnabled = async (cat: any) => {
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cat.id, enabled: !cat.enabled }),
      })
      if (res.ok) {
        fetchCategories()
      }
    } catch (err) {
      console.error('Failed to toggle category', err)
    }
  }

  const handleDelete = async (cat: any) => {
    if (cat.websiteCount > 0) {
      alert(`Cannot delete "${cat.name}" because it currently has ${cat.websiteCount} website(s) assigned to it.`)
      return
    }

    if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) return

    try {
      const res = await fetch(`/api/admin/categories?id=${cat.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchCategories()
      }
    } catch (err) {
      console.error('Failed to delete category', err)
    }
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Categories</h1>
        <p className="text-slate-600">Organize and manage website categories shown on the main marketplace</p>
      </div>

      {/* Add Category Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-600" />
          Add New Category
        </h2>
        <form onSubmit={handleAddCategory} className="flex gap-4 items-start">
          <div className="flex-1">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g., Anniversary, Hackathon, Real Estate"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
            {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={adding}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {adding ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3.5 text-left">Category Name</th>
              <th className="px-6 py-3.5 text-left">URL Slug</th>
              <th className="px-6 py-3.5 text-center">Websites</th>
              <th className="px-6 py-3.5 text-center">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <Tag className="h-4 w-4" />
                  </div>
                  {cat.name}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-600">
                  /websites?category={cat.slug}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {cat.websiteCount || 0} template{cat.websiteCount !== 1 ? 's' : ''}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleEnabled(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      cat.enabled
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {cat.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <Tag className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">No categories found.</p>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
