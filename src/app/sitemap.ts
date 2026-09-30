import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { DEFAULT_WEBSITES, DEFAULT_CATEGORIES } from '@/lib/templates-data'
import { PROGRAMMATIC_PAGES } from '@/lib/programmatic-data'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hyrinx.in'
  const now = new Date()

  // Static core routes
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/websites`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/custom-website`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/founders`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/order/track`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    // Free Tools
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/wedding-website-checklist`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/college-fest-planner`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/website-cost-calculator`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/qr-code-invitation-generator`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/rent-vs-build-calculator`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    // Comparison Pages
    { url: `${baseUrl}/vs/rent-vs-custom-website`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/vs/hyrinx-vs-wix`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    // Programmatic Hub
    { url: `${baseUrl}/rent`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Category Pages
  const categoryPages: MetadataRoute.Sitemap = DEFAULT_CATEGORIES.filter((c) => c.enabled).map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Database + Static Templates
  let dbWebsites: any[] = []
  try {
    dbWebsites = await prisma.website.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
  } catch {}

  const allSlugs = new Map<string, Date>()
  DEFAULT_WEBSITES.filter((w) => w.published).forEach((w) => allSlugs.set(w.slug, now))
  dbWebsites.forEach((w) => allSlugs.set(w.slug, w.updatedAt || now))

  const websitePages: MetadataRoute.Sitemap = Array.from(allSlugs.entries()).map(([slug, date]) => ({
    url: `${baseUrl}/websites/${slug}`,
    lastModified: date,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Programmatic Location Landing Pages
  const programmaticPages: MetadataRoute.Sitemap = PROGRAMMATIC_PAGES.filter((p) => !p.thinFallback).map((p) => ({
    url: `${baseUrl}/rent/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...websitePages, ...programmaticPages]
}
