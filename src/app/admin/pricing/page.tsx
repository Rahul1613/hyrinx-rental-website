'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { Plus, Edit, Trash2, Star, Check, X } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    durationDays: 1,
    price: 149,
    description: '',
    popular: false,
    active: true,
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/admin/pricing-plans')
      if (res.ok) {
        const data = await res.json()
        setPlans(data.plans || [])
      }
    } catch (err) {
      console.error('Failed to load plans', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenAdd = () => {
    setEditingPlan(null)
    setFormData({
      name: '',
      duration: '',
      durationDays: 1,
      price: 149,
      description: '',
      popular: false,
      active: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (plan: any) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      duration: plan.duration,
      durationDays: plan.durationDays,
      price: plan.price,
      description: plan.description || '',
      popular: plan.popular || false,
      active: plan.active !== false,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingPlan) {
        const res = await fetch('/api/admin/pricing-plans', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPlan.id, ...formData }),
        })
        if (res.ok) {
          setIsModalOpen(false)
          fetchPlans()
        }
      } else {
        const res = await fetch('/api/admin/pricing-plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          setIsModalOpen(false)
          fetchPlans()
        }
      }
    } catch (err) {
      console.error('Failed to save plan', err)
    }
  }

  const toggleStatus = async (plan: any, field: 'active' | 'popular') => {
    try {
      const res = await fetch('/api/admin/pricing-plans', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: plan.id,
          [field]: !plan[field],
        }),
      })
      if (res.ok) {
        fetchPlans()
      }
    } catch (err) {
      console.error('Failed to update status', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return
    try {
      const res = await fetch(`/api/admin/pricing-plans?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchPlans()
      }
    } catch (err) {
      console.error('Failed to delete plan', err)
    }
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Pricing Plans</h1>
          <p className="text-slate-600">Manage rental durations and pricing across the platform</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Pricing Plan
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-64 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all relative ${
                plan.popular ? 'border-blue-600' : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <button
                  onClick={() => toggleStatus(plan, 'popular')}
                  title={plan.popular ? 'Unmark Popular' : 'Mark as Popular'}
                  className="p-1 text-slate-400 hover:text-yellow-500 transition-colors"
                >
                  <Star className={`h-5 w-5 ${plan.popular ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                </button>
              </div>

              <p className="text-slate-600 text-sm mb-4 min-h-[40px]">{plan.description || 'No description'}</p>

              <div className="mb-4">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-slate-500 text-xs ml-1.5">/ {plan.duration}</span>
              </div>

              <div className="space-y-2 mb-5 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">{plan.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration Days:</span>
                  <span className="font-semibold text-slate-800">{plan.durationDays} days</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-500">Status</span>
                <button
                  onClick={() => toggleStatus(plan, 'active')}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                    plan.active
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {plan.active ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenEdit(plan)}
                  className="flex-1 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="flex-1 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., 7 Days"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration Label *</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 7 Days"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration Days *</label>
                  <input
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Perfect for events & campaigns"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Mark as Popular</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Active</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {editingPlan ? 'Save Changes' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
