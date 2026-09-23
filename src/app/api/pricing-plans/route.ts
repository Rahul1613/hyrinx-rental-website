export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_PRICING_PLANS } from '@/lib/templates-data'

export async function GET() {
  try {
    // Always start with all static plans as the guaranteed base
    const staticPlans = DEFAULT_PRICING_PLANS.filter(p => p.active)
    let merged: any[] = staticPlans

    try {
      const dbPlans = await prisma.pricingPlan.findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { durationDays: 'asc' }],
      })

      if (dbPlans.length > 0) {
        // DB plans override static ones with same name; keep remaining static plans
        const dbNames = new Set(dbPlans.map((p: any) => p.name.toLowerCase()))
        const staticOnly = staticPlans.filter(p => !dbNames.has(p.name.toLowerCase()))
        // Sort merged by durationDays
        merged = [...dbPlans, ...staticOnly].sort((a: any, b: any) => (a.durationDays ?? 0) - (b.durationDays ?? 0))
      }
    } catch (dbError) {
      console.warn('DB query failed, using static pricing plans:', dbError)
    }

    return NextResponse.json({ plans: merged })
  } catch (error) {
    console.error('Error fetching pricing plans:', error)
    return NextResponse.json({ error: 'Failed to fetch pricing plans' }, { status: 500 })
  }
}
