import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAuth()
    const plans = await prisma.pricingPlan.findMany({
      orderBy: [
        { order: 'asc' },
        { durationDays: 'asc' },
      ],
    })
    return NextResponse.json({ plans })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { name, duration, durationDays, price, description, popular, active } = body

    if (!name || !duration || !durationDays || price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const plan = await prisma.pricingPlan.create({
      data: {
        name,
        duration,
        durationDays: parseInt(durationDays),
        price: parseInt(price),
        description: description || '',
        popular: Boolean(popular),
        active: active !== undefined ? Boolean(active) : true,
      },
    })

    return NextResponse.json({ plan })
  } catch (error) {
    console.error('Error creating plan:', error)
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { id, name, duration, durationDays, price, description, popular, active } = body

    if (!id) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 })
    }

    const dataToUpdate: any = {}
    if (name !== undefined) dataToUpdate.name = name
    if (duration !== undefined) dataToUpdate.duration = duration
    if (durationDays !== undefined) dataToUpdate.durationDays = parseInt(durationDays)
    if (price !== undefined) dataToUpdate.price = parseInt(price)
    if (description !== undefined) dataToUpdate.description = description
    if (popular !== undefined) dataToUpdate.popular = Boolean(popular)
    if (active !== undefined) dataToUpdate.active = Boolean(active)

    const updated = await prisma.pricingPlan.update({
      where: { id },
      data: dataToUpdate,
    })

    return NextResponse.json({ plan: updated })
  } catch (error) {
    console.error('Error updating plan:', error)
    return NextResponse.json({ error: 'Failed to update pricing plan' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 })
    }

    await prisma.pricingPlan.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting plan:', error)
    return NextResponse.json({ error: 'Failed to delete pricing plan' }, { status: 500 })
  }
}
