export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_PRICING_PLANS } from '@/lib/templates-data'

export async function GET() {
  try {
    let plans: any[] = []

    try {
      plans = await prisma.pricingPlan.findMany({
        where: { active: true },
        orderBy: [
          { order: 'asc' },
          { durationDays: 'asc' },
        ],
      })
    } catch (dbError) {
      console.warn('Database query failed in api/pricing-plans, using default plans:', dbError)
    }

    if (!plans || plans.length === 0) {
      plans = DEFAULT_PRICING_PLANS.filter(p => p.active)
    }

    return NextResponse.json({ plans })
  } catch (error) {
    console.error('Error fetching pricing plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    )
  }
}
