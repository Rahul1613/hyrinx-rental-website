"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  LayoutDashboard,
  Globe,
  Sliders,
  Eye,
  BarChart3,
  Settings,
  ArrowUpRight,
  TrendingUp,
  MessageCircle,
  Users,
  Eye as EyeIcon,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useBuilder } from "@/lib/builderStore";

const MOCK_METRICS = [
  { label: "Website Views", value: "14,280", change: "+18.4%", icon: EyeIcon, color: "text-blue-600" },
  { label: "Unique Visitors", value: "8,940", change: "+12.1%", icon: Users, color: "text-indigo-600" },
  { label: "Form Inquiries", value: "142", change: "+24.5%", icon: FileText, color: "text-emerald-600" },
  { label: "WhatsApp Clicks", value: "89", change: "+31.2%", icon: MessageCircle, color: "text-emerald-600" },
];

const RECENT_LEADS = [
  { name: "Priya Sharma", email: "priya@zenithtech.in", service: "Table Booking for 4", date: "12 mins ago", status: "New" },
  { name: "Vikram Malhotra", email: "v.malhotra@gmail.com", service: "Catering Inquiry (50 pax)", date: "2 hours ago", status: "Contacted" },
  { name: "Aakash Patel", email: "aakash.patel@horizon.co", service: "Private Workshop Hall", date: "5 hours ago", status: "Closed" },
  { name: "Natasha Rao", email: "nrao@designstudio.com", service: "Wholesale Coffee Supply", date: "Yesterday", status: "New" },
];

const WEEKLY_TRAFFIC = [
  { day: "Mon", views: 1450, height: "45%" },
  { day: "Tue", views: 1820, height: "60%" },
  { day: "Wed", views: 2100, height: "72%" },
  { day: "Thu", views: 1980, height: "68%" },
  { day: "Fri", views: 2650, height: "88%" },
  { day: "Sat", views: 3200, height: "100%" },
  { day: "Sun", views: 2480, height: "82%" },
];

export default function DashboardPage() {
  const { config, savedWebsites } = useBuilder();

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between shrink-0 p-5">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-base text-slate-900">
              BusinessSite
            </span>
          </Link>

          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/my-websites"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>My Websites ({savedWebsites.length})</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Templates</span>
            </Link>
            <Link
              href="/builder"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Sliders className="w-4 h-4" />
              <span>Website Editor</span>
            </Link>
            <Link
              href="/preview"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Live Preview</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* User Card */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span className="block text-slate-700 font-bold">Pro Trial Workspace</span>
          <span className="text-[11px]">Free Tier Demo</span>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-900">
              Overview Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active project: <strong>{config.name}</strong> ({config.category})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/builder" className="btn-primary-blue text-xs py-2.5 px-4">
              Open in Studio Editor
            </Link>
            <Link href="/preview" className="btn-secondary-white text-xs py-2.5 px-4 flex items-center gap-1.5">
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="pro-card p-6 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{metric.label}</span>
                  <div className={`p-2 rounded-lg bg-slate-50 ${metric.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {metric.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Traffic Chart & Quick Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Weekly Traffic Bar Visual (8 Cols) */}
          <div className="lg:col-span-8 pro-card p-6 sm:p-7 space-y-6 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Weekly Visitor Traffic
                </h3>
                <span className="text-xs text-slate-500">Live analytics simulation (last 7 days)</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">+22.4% Overall Growth</span>
            </div>

            {/* Simple Clean Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
              {WEEKLY_TRAFFIC.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-mono font-medium text-slate-400">
                    {item.views}
                  </span>
                  <div
                    className="w-full max-w-[48px] rounded-t-md bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer"
                    style={{ height: item.height }}
                    title={`${item.day}: ${item.views} views`}
                  />
                  <span className="text-xs font-semibold text-slate-600">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Domain Status & Actions (4 Cols) */}
          <div className="lg:col-span-4 pro-card p-6 space-y-5 bg-white flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
                Live Deployment Status
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Custom Domain:</span>
                  <span className="font-mono text-slate-900 font-semibold truncate max-w-[150px]">
                    {config.name.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">SSL Certificate:</span>
                  <span className="text-emerald-700 font-bold">Active & Encrypted</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Active Template:</span>
                  <span className="text-slate-800 font-semibold">{config.templateId}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Sections Enabled:</span>
                  <span className="text-slate-800 font-semibold">
                    {Object.values(config.sections).filter(Boolean).length} / 10
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <Link
                href="/builder"
                className="btn-primary-blue w-full text-center text-xs py-2.5"
              >
                Customize Layout in Studio
              </Link>
            </div>
          </div>

        </div>

        {/* Recent Inquiries Table */}
        <div className="pro-card p-6 space-y-5 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-display font-bold text-base text-slate-900">
              Recent Customer Inquiries
            </h3>
            <span className="text-xs text-slate-500">Simulated contact form leads</span>
          </div>

          <div className="overflow-x-auto">
            <table className="corp-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Email</th>
                  <th>Service Requested</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_LEADS.map((lead, idx) => (
                  <tr key={idx}>
                    <td className="font-bold text-slate-900">{lead.name}</td>
                    <td className="text-slate-600 font-mono text-xs">{lead.email}</td>
                    <td className="text-slate-700 text-xs">{lead.service}</td>
                    <td className="text-slate-500 text-xs">{lead.date}</td>
                    <td>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          lead.status === "New"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : lead.status === "Contacted"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
