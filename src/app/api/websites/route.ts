export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_WEBSITES } from '@/lib/templates-data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    // Always start with ALL static templates as the base
    let allWebsites: any[] = DEFAULT_WEBSITES.filter(w => w.published).map(w => ({
      ...w,
      features: JSON.stringify(w.features),
      customization: JSON.stringify(w.customization),
      _source: 'static',
    }))

    // Merge in any DB websites (admin-created ones), overriding static if same slug
    try {
      const dbWebsites = await prisma.website.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { orderItems: true } } },
      })

      if (dbWebsites.length > 0) {
        // Build a set of slugs from DB
        const dbSlugs = new Set(dbWebsites.map((w: any) => w.slug))
        // Keep static entries whose slug is NOT in DB (i.e. not overridden)
        const staticOnly = allWebsites.filter(w => !dbSlugs.has(w.slug))
        allWebsites = [...dbWebsites.map((w: any) => ({ ...w, _source: 'db' })), ...staticOnly]
      }
    } catch (dbError) {
      console.warn('DB query failed, using static templates only:', dbError)
    }

    // Apply filters
    let filtered = allWebsites

    if (category && category !== 'All') {
      filtered = filtered.filter(w => w.category.toLowerCase() === category.toLowerCase())
    }

    if (featured === 'true') {
      filtered = filtered.filter(w => w.featured)
    }

    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(w =>
        w.name?.toLowerCase().includes(s) ||
        w.description?.toLowerCase().includes(s) ||
        w.shortDesc?.toLowerCase().includes(s)
      )
    }

    return NextResponse.json({ websites: filtered })
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    )
  }
}
