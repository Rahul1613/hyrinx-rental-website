import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateSchema, customRequestSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = validateSchema(customRequestSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const {
      name,
      email,
      phone,
      websiteType,
      preferredDuration,
      budget,
      description,
      referenceWebsite,
    } = validation.data

    const customRequest = await prisma.customRequest.create({
      data: {
        name,
        email,
        phone,
        websiteType,
        preferredDuration,
        budget,
        description,
        referenceWebsite,
        status: 'new',
      },
    })

    return NextResponse.json({ customRequest })
  } catch (error) {
    console.error('Error creating custom request:', error)
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    )
  }
}
