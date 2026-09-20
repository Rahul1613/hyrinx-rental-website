export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

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

    const websites = await prisma.website.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { orderItems: true },
        },
      },
    })

    return NextResponse.json({ websites })
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    )
  }
}
