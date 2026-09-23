import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, generateAccessToken } from '@/lib/utils'
import { validateSchema, orderSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = validateSchema(orderSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { websiteId, pricingPlanId, customerInfo, totalAmount } = validation.data

    // Ensure website exists in DB for foreign key constraint
    let dbWebsite = await prisma.website.findUnique({ where: { id: websiteId } })
    if (!dbWebsite) {
      const template = (await import('@/lib/templates-data')).DEFAULT_WEBSITES.find(
        w => w.id === websiteId || w.slug === websiteId
      )
      if (template) {
        dbWebsite = await prisma.website.upsert({
          where: { slug: template.slug },
          update: {},
          create: {
            id: template.id,
            name: template.name,
            slug: template.slug,
            category: template.category,
            description: template.description,
            shortDesc: template.shortDesc,
            featured: template.featured,
            published: true,
            startingPrice: template.startingPrice,
            features: JSON.stringify(template.features),
            customization: JSON.stringify(template.customization),
            liveDemoUrl: template.liveDemoUrl,
          },
        })
      }
    }

    // Ensure pricing plan exists in DB
    let dbPlan = await prisma.pricingPlan.findUnique({ where: { id: pricingPlanId } })
    if (!dbPlan) {
      const defaultPlan = (await import('@/lib/templates-data')).DEFAULT_PRICING_PLANS.find(
        p => p.id === pricingPlanId || p.name === pricingPlanId
      )
      if (defaultPlan) {
        dbPlan = await prisma.pricingPlan.upsert({
          where: { name: defaultPlan.name },
          update: {},
          create: {
            id: defaultPlan.id,
            name: defaultPlan.name,
            duration: defaultPlan.duration,
            durationDays: defaultPlan.durationDays,
            price: defaultPlan.price,
            description: defaultPlan.description,
            popular: defaultPlan.popular,
            active: true,
          },
        })
      }
    }

    const finalWebsiteId = dbWebsite ? dbWebsite.id : websiteId
    const finalPlanId = dbPlan ? dbPlan.id : pricingPlanId

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        companyEventName: customerInfo.companyEventName,
        websiteTitle: customerInfo.websiteTitle,
        preferredSubdomain: customerInfo.preferredSubdomain,
        requiredLaunchDate: customerInfo.requiredLaunchDate ? new Date(customerInfo.requiredLaunchDate) : null,
        totalAmount,
        status: 'pending',
        paymentStatus: 'pending',
        accessToken: generateAccessToken(),
        orderItems: {
          create: {
            websiteId: finalWebsiteId,
            pricingPlanId: finalPlanId,
            price: totalAmount,
            customizationData: JSON.stringify(customerInfo),
          },
        },
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
