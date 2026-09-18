'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { Mail, Phone, ExternalLink, Trash2, Clock, CheckCircle2, AlertCircle, Calendar } from 'lucide-react'

export default function AdminCustomRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/admin/custom-requests')
      if (res.ok) {
        const data = await res.json()
        setRequests(data.requests || [])
      }
    } catch (err) {
      console.error('Failed to load custom requests', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/custom-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        fetchRequests()
      }
    } catch (err) {
      console.error('Failed to update status', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom request?')) return
    try {
      const res = await fetch(`/api/admin/custom-requests?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchRequests()
      }
    } catch (err) {
      console.error('Failed to delete custom request', err)
    }
  }

  const filteredRequests = requests.filter((r) => {
    if (filterStatus === 'all') return true
    return r.status === filterStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-purple-100 text-purple-800'
      case 'quoted':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-teal-100 text-teal-800'
      case 'completed':
        return 'bg-emerald-100 text-emerald-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Custom Website Requests</h1>
          <p className="text-slate-600">Review and follow up on bespoke website rental inquiries</p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'contacted', 'quoted', 'approved', 'in_progress', 'completed', 'rejected'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {status.replace('_', ' ')}
                {status === 'all' && ` (${requests.length})`}
                {status !== 'all' && ` (${requests.filter((r) => r.status === status).length})`}
              </button>
            )
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-36 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <p className="text-slate-600 font-medium">No custom requests found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-lg font-bold text-slate-900">{req.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusBadge(
                        req.status
                      )}`}
                    >
                      {req.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <a
                      href={`mailto:${req.email}`}
                      className="flex items-center gap-1.5 text-blue-600 hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {req.email}
                    </a>
                    <a
                      href={`tel:${req.phone}`}
                      className="flex items-center gap-1.5 text-blue-600 hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {req.phone}
                    </a>
                    <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      Type: {req.websiteType}
                    </span>
                    <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      Duration: {req.preferredDuration}
                    </span>
                    <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      Budget: ₹{req.budget}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">Mark New</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="quoted">Mark Quoted</option>
                    <option value="approved">Mark Approved</option>
                    <option value="in_progress">Mark In Progress</option>
                    <option value="completed">Mark Completed</option>
                    <option value="rejected">Mark Rejected</option>
                  </select>

                  <button
                    onClick={() => handleDelete(req.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Request"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 border border-slate-100 mb-3">
                <p className="font-medium text-xs text-slate-500 uppercase tracking-wider mb-1">Requirements</p>
                <p className="whitespace-pre-wrap">{req.description}</p>
              </div>

              {req.referenceWebsite && (
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  Reference Website:
                  <a
                    href={req.referenceWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    {req.referenceWebsite}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
