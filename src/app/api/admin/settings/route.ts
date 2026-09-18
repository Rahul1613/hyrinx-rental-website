import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAuth()
    const settingsList = await prisma.settings.findMany()
    const settingsMap: Record<string, string> = {}
    settingsList.forEach((s) => {
      settingsMap[s.key] = s.value
    })
    return NextResponse.json({ settings: settingsMap, list: settingsList })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Settings object required' }, { status: 400 })
    }

    const updates = Object.entries(settings).map(([key, value]) => {
      const strVal = typeof value === 'string' ? value : JSON.stringify(value)
      let category = 'business'
      if (key.includes('order')) category = 'orders'
      if (key.includes('payment') || key === 'currency') category = 'payment'
      if (key.includes('website') || key.includes('hero')) category = 'website'

      return prisma.settings.upsert({
        where: { key },
        update: { value: strVal },
        create: {
          key,
          value: strVal,
          category,
        },
      })
    })

    await Promise.all(updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
