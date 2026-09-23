export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_CATEGORIES } from '@/lib/templates-data'

export async function GET() {
  try {
    let categories: any[] = []

    try {
      categories = await prisma.category.findMany({
        where: { enabled: true },
        orderBy: { order: 'asc' },
      })
    } catch (dbError) {
      console.warn('Database query failed in api/categories, using default categories:', dbError)
    }

    if (!categories || categories.length === 0) {
      categories = DEFAULT_CATEGORIES
    }

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
