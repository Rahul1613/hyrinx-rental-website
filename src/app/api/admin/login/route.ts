import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, createAuditLog } from '@/lib/auth'
import { createSession } from '@/lib/session'
import { validateSchema, adminLoginSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = validateSchema(adminLoginSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    const admin = await verifyAdminCredentials(email, password)

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    await createSession(admin)
    // Fire audit log without blocking the response
    createAuditLog(admin.id, 'login', 'AdminUser', admin.id).catch(() => {})

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
