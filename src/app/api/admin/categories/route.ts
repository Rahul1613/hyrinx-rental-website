import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAuth()
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
    })

    // Count websites per category
    const categoryCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await prisma.website.count({
          where: { category: cat.name },
        })
        return { ...cat, websiteCount: count }
      })
    )

    return NextResponse.json({ categories: categoryCounts })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { name } = body

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Category name must be at least 2 characters' }, { status: 400 })
    }

    const trimmedName = name.trim()
    const slug = trimmedName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ name: trimmedName }, { slug }],
      },
    })

    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
    }

    const maxOrder = await prisma.category.aggregate({ _max: { order: true } })
    const nextOrder = (maxOrder._max.order || 0) + 1

    const category = await prisma.category.create({
      data: {
        name: trimmedName,
        slug,
        order: nextOrder,
        enabled: true,
      },
    })

    return NextResponse.json({ category })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { id, enabled, name, order } = body

    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
    }

    const dataToUpdate: any = {}
    if (enabled !== undefined) dataToUpdate.enabled = Boolean(enabled)
    if (order !== undefined) dataToUpdate.order = parseInt(order)
    if (name !== undefined) {
      dataToUpdate.name = name.trim()
      dataToUpdate.slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    }

    const category = await prisma.category.update({
      where: { id },
      data: dataToUpdate,
    })

    return NextResponse.json({ category })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
