import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DEFAULT_WEBSITES } from '@/lib/templates-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    let website: any = null

    try {
      website = await prisma.website.findUnique({
        where: { id },
      })
    } catch (dbError) {
      console.warn('Database query failed in api/websites/by-id, using static data:', dbError)
    }

    if (!website) {
      const template = DEFAULT_WEBSITES.find(w => w.id === id || w.slug === id)
      if (template) {
        website = {
          ...template,
          features: JSON.stringify(template.features),
          customization: JSON.stringify(template.customization),
        }
      }
    }

    if (!website) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 })
    }

    return NextResponse.json({ website })
  } catch (error) {
    console.error('Error fetching website by id:', error)
    return NextResponse.json({ error: 'Failed to fetch website' }, { status: 500 })
  }
}
