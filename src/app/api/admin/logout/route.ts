import { NextRequest, NextResponse } from 'next/server'
import { destroySession, requireAuth } from '@/lib/session'
import { createAuditLog } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()
    await createAuditLog(session.adminId, 'logout', 'AdminUser', session.adminId)
    await destroySession()

    return NextResponse.json({ success: true })
  } catch (error) {
    await destroySession()
    return NextResponse.json({ success: true })
  }
}
