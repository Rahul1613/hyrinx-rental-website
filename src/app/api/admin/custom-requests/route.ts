import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAuth()
    const requests = await prisma.customRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ requests })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 })
    }

    const updated = await prisma.customRequest.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ request: updated })
  } catch (error) {
    console.error('Error updating custom request:', error)
    return NextResponse.json({ error: 'Failed to update custom request' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.customRequest.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting custom request:', error)
    return NextResponse.json({ error: 'Failed to delete custom request' }, { status: 500 })
  }
}
