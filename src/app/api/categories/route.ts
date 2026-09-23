export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_CATEGORIES } from '@/lib/templates-data'

export async function GET() {
  try {
    // Always start with static defaults as the base
    const staticCats = DEFAULT_CATEGORIES.filter(c => c.enabled)

    let merged: any[] = staticCats

    try {
      const dbCats = await prisma.category.findMany({
        where: { enabled: true },
        orderBy: { order: 'asc' },
      })

      if (dbCats.length > 0) {
        const dbNames = new Set(dbCats.map((c: any) => c.name.toLowerCase()))
        // Keep static categories not already in DB, then append DB ones
        const staticOnly = staticCats.filter(c => !dbNames.has(c.name.toLowerCase()))
        merged = [...dbCats, ...staticOnly]
      }
    } catch (dbError) {
      console.warn('DB query failed, using static categories:', dbError)
    }

    return NextResponse.json({ categories: merged })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
