import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/auth'

export async function GET() {
  try {
    await requireAuth()
    const content = await prisma.homepageContent.findFirst({
      where: { section: 'hero', enabled: true },
    })

    if (content && content.content) {
      try {
        const parsed = JSON.parse(content.content)
        // Normalize any legacy keys
        return NextResponse.json({
          content: {
            headline: parsed.headline || parsed.heading || 'Why Buy a Website? Rent One Instead.',
            subheadline: parsed.subheadline || parsed.subheading || 'Beautiful, ready-to-use websites for events, celebrations, businesses, portfolios and projects. Rent for a day, a week, a month or longer.',
            primaryCtaText: parsed.primaryCtaText || parsed.ctaText || 'Browse Websites',
            primaryCtaLink: parsed.primaryCtaLink || parsed.ctaLink || '/websites',
            secondaryCtaText: parsed.secondaryCtaText || 'View Live Demos',
            secondaryCtaLink: parsed.secondaryCtaLink || '/websites',
            badgeText: parsed.badgeText || 'Starting at ₹49 / day',
          },
        })
      } catch {
        return NextResponse.json({ content: null })
      }
    }

    return NextResponse.json({ content: null })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    let body: any = {}
    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      body = await request.json()
    } else {
      const formData = await request.formData()
      formData.forEach((val, key) => {
        body[key] = val.toString()
      })
    }

    const {
      headline,
      subheadline,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      badgeText,
    } = body

    const content = JSON.stringify({
      headline,
      subheadline,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      badgeText,
    })

    // Update or create homepage content
    const existing = await prisma.homepageContent.findFirst({
      where: { section: 'hero' },
    })

    if (existing) {
      await prisma.homepageContent.update({
        where: { id: existing.id },
        data: { content },
      })
    } else {
      await prisma.homepageContent.create({
        data: {
          section: 'hero',
          content,
          enabled: true,
          order: 1,
        },
      })
    }

    await createAuditLog(session.adminId, 'update', 'HomepageContent', 'hero', {
      headline,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to update homepage content' },
      { status: 500 }
    )
  }
}
