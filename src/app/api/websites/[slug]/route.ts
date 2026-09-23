import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_WEBSITES, DEFAULT_PRICING_PLANS } from '@/lib/templates-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    let website: any = null
    let pricingPlans: any[] = []

    try {
      website = await prisma.website.findUnique({
        where: { slug },
        include: {
          _count: {
            select: { orderItems: true },
          },
        },
      })

      pricingPlans = await prisma.pricingPlan.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      })
    } catch (dbError) {
      console.warn('Database query failed in api/websites/[slug], using static data:', dbError)
    }

    if (!website) {
      const template = DEFAULT_WEBSITES.find(w => w.slug === slug)
      if (template) {
        website = {
          ...template,
          features: JSON.stringify(template.features),
          customization: JSON.stringify(template.customization),
          _count: { orderItems: 0 },
        }
      }
    }

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      )
    }

    // Always merge static plans with DB — never show partial list
    const staticPlans = DEFAULT_PRICING_PLANS.filter(p => p.active)
    if (!pricingPlans || pricingPlans.length === 0) {
      pricingPlans = staticPlans
    } else {
      const dbNames = new Set(pricingPlans.map((p: any) => p.name.toLowerCase()))
      const staticOnly = staticPlans.filter(p => !dbNames.has(p.name.toLowerCase()))
      pricingPlans = [...pricingPlans, ...staticOnly].sort((a: any, b: any) => (a.durationDays ?? 0) - (b.durationDays ?? 0))
    }

    return NextResponse.json({ website, pricingPlans })
  } catch (error) {
    console.error('Error fetching website:', error)
    return NextResponse.json(
      { error: 'Failed to fetch website' },
      { status: 500 }
    )
  }
}
