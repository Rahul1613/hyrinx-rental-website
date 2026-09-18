import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/auth'
import { generateOrderNumber } from '@/lib/utils'
import { validateSchema, websiteSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    const body = await request.json()
    
    // Validate input
    const validation = validateSchema(websiteSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const {
      name,
      slug,
      category,
      description,
      shortDesc,
      featured,
      published,
      startingPrice,
      liveDemoUrl,
      thumbnail,
      features,
      customization,
    } = validation.data

    // Check if slug already exists
    const existing = await prisma.website.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Website with this slug already exists' },
        { status: 400 }
      )
    }

    const website = await prisma.website.create({
      data: {
        name,
        slug,
        category,
        description,
        shortDesc,
        featured: featured || false,
        published: published || false,
        startingPrice: startingPrice || 49,
        liveDemoUrl,
        features: Array.isArray(features) ? JSON.stringify(features) : (features || null),
        customization: Array.isArray(customization) ? JSON.stringify(customization) : (customization || null),
      },
    })

    await createAuditLog(session.adminId, 'create', 'Website', website.id, {
      name: website.name,
      slug: website.slug,
    })

    return NextResponse.json({ website })
  } catch (error) {
    console.error('Error creating website:', error)
    return NextResponse.json(
      { error: 'Failed to create website' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await requireAuth()

    const websites = await prisma.website.findMany({
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
