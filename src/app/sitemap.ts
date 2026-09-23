import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hyrinx.in'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/websites`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/custom-website`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]

  // Include both static templates and any DB websites
  const { DEFAULT_WEBSITES } = await import('@/lib/templates-data')
  const staticSlugs = new Set(DEFAULT_WEBSITES.filter(w => w.published).map(w => w.slug))

  let dbWebsites: any[] = []
  try {
    dbWebsites = await prisma.website.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
  } catch {}

  const allSlugs = new Map<string, Date>()
  DEFAULT_WEBSITES.filter(w => w.published).forEach(w => allSlugs.set(w.slug, new Date()))
  dbWebsites.forEach(w => allSlugs.set(w.slug, w.updatedAt || new Date()))

  const websitePages: MetadataRoute.Sitemap = Array.from(allSlugs.entries()).map(([slug, date]) => ({
    url: `${baseUrl}/websites/${slug}`,
    lastModified: date,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...websitePages]
}
