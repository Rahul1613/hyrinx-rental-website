import { cookies } from 'next/headers'
import { prisma } from './prisma'

const SESSION_COOKIE_NAME = 'hyrinx_admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export interface SessionData {
  adminId: string
  email: string
  name: string
  role: string
}

export async function createSession(admin: any) {
  const sessionData: SessionData = {
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  }
  
  const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString('base64')
  
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  })
  
  return sessionData
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  
  if (!sessionToken) {
    return null
  }
  
  try {
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    
    // Verify admin still exists and is active
    const admin = await prisma.adminUser.findUnique({
      where: { id: sessionData.adminId },
    })
    
    if (!admin || !admin.active) {
      await destroySession()
      return null
    }
    
    return sessionData
  } catch {
    await destroySession()
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  return session
}

export async function requireRole(role: string): Promise<SessionData> {
  const session = await requireAuth()
  
  if (session.role !== role && session.role !== 'super_admin') {
    throw new Error('Forbidden')
  }
  
  return session
}
