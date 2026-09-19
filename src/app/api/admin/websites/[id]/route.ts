import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params
    const website = await prisma.website.findUnique({
      where: { id },
    })

    if (!website) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 })
    }

    return NextResponse.json({ website })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth()
    const { id } = await params
    const body = await request.json()

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
    } = body

    const existing = await prisma.website.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 })
    }

    // Check slug collision
    if (slug && slug !== existing.slug) {
      const slugMatch = await prisma.website.findUnique({
        where: { slug },
      })
      if (slugMatch) {
        return NextResponse.json({ error: 'Slug already taken by another website' }, { status: 400 })
      }
    }

    const updated = await prisma.website.update({
      where: { id },
      data: {
        name,
        slug,
        category,
        description,
        shortDesc,
        featured: Boolean(featured),
        published: Boolean(published),
        startingPrice: parseInt(startingPrice) || 149,
        liveDemoUrl: liveDemoUrl || '',
        thumbnail: thumbnail || '',
        features: typeof features === 'string' ? features : JSON.stringify(features || []),
        customization: typeof customization === 'string' ? customization : JSON.stringify(customization || []),
      },
    })

    await createAuditLog(session.adminId, 'update', 'Website', id, { name: updated.name })

    return NextResponse.json({ website: updated })
  } catch (error) {
    console.error('Error updating website:', error)
    return NextResponse.json({ error: 'Failed to update website' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth()
    const { id } = await params

    const existing = await prisma.website.findUnique({
      where: { id },
      include: {
        _count: {
          select: { orderItems: true, rentals: true },
        },
      },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 })
    }

    if (existing._count.orderItems > 0 || existing._count.rentals > 0) {
      return NextResponse.json(
        { error: 'Cannot delete website with existing orders or rentals. Consider unpublishing instead.' },
        { status: 400 }
      )
    }

    await prisma.website.delete({
      where: { id },
    })

    await createAuditLog(session.adminId, 'delete', 'Website', id, { name: existing.name })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting website:', error)
    return NextResponse.json({ error: 'Failed to delete website' }, { status: 500 })
  }
}
