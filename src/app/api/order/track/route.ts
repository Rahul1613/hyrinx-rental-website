import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')?.trim()

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: id },
          { id: id },
        ],
      },
      include: {
        orderItems: {
          include: {
            website: true,
            pricingPlan: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found. Please verify your Order ID.' }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Track order error:', error)
    return NextResponse.json({ error: 'Failed to look up order' }, { status: 500 })
  }
}
