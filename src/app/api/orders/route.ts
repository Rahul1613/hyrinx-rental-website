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
            websiteId,
            pricingPlanId,
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
