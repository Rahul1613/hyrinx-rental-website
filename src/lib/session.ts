import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'hyrinx_admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export interface SessionData {
  adminId: string
  email: string
  name: string
  role: string
  exp: number
}

function getSessionSecret() {
  return process.env.ADMIN_ACCESS_KEY || 'hyrinx-local-dev-secret'
}

function encodeSessionPayload(payload: SessionData) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', getSessionSecret())
    .update(encoded)
    .digest('base64url')

  return `${encoded}.${signature}`
}

function decodeSessionPayload(token: string): SessionData | null {
  try {
    const [encodedPayload, signature] = token.split('.')
    if (!encodedPayload || !signature) {
      return null
    }

    const expectedSignature = createHmac('sha256', getSessionSecret())
      .update(encodedPayload)
      .digest('base64url')

    if (
      signature.length !== expectedSignature.length ||
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return null
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString()) as SessionData

    if (!payload.adminId || !payload.email || !payload.name || !payload.role || !payload.exp) {
      return null
    }

    if (Date.now() > payload.exp) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export async function createSession(admin: any) {
  const sessionData: SessionData = {
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    exp: Date.now() + SESSION_DURATION,
  }

  const sessionToken = encodeSessionPayload(sessionData)

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

  const sessionData = decodeSessionPayload(sessionToken)

  if (!sessionData) {
    await destroySession()
    return null
  }

  return sessionData
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
