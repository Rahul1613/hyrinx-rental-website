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

    let websites: any[] = []

    try {
      const where: any = {
        published: true,
      }

      if (category && category !== 'All') {
        where.category = category
      }

      if (featured === 'true') {
        where.featured = true
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { shortDesc: { contains: search, mode: 'insensitive' } },
        ]
      }

      websites = await prisma.website.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { orderItems: true },
          },
        },
      })
    } catch (dbError) {
      console.warn('Database query failed in api/websites, falling back to static templates:', dbError)
    }

    // If database returned 0 websites, use default templates catalog
    if (!websites || websites.length === 0) {
      let filtered = DEFAULT_WEBSITES.filter(w => w.published)

      if (category && category !== 'All') {
        filtered = filtered.filter(w => w.category.toLowerCase() === category.toLowerCase())
      }

      if (featured === 'true') {
        filtered = filtered.filter(w => w.featured)
      }

      if (search) {
        const s = search.toLowerCase()
        filtered = filtered.filter(w =>
          w.name.toLowerCase().includes(s) ||
          w.description.toLowerCase().includes(s) ||
          w.shortDesc.toLowerCase().includes(s)
        )
      }

      websites = filtered.map(w => ({
        ...w,
        features: JSON.stringify(w.features),
        customization: JSON.stringify(w.customization),
      }))
    }

    return NextResponse.json({ websites })
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    )
  }
}
