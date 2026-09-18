import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createAdminUser(email: string, password: string, name: string, role: string = 'manager') {
  const hashedPassword = await hashPassword(password)
  return prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  })
}

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({
    where: { email },
  })

  if (!admin || !admin.active) {
    return null
  }

  const isValid = await verifyPassword(password, admin.password)
  if (!isValid) {
    return null
  }

  // Update last login
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { lastLogin: new Date() },
  })

  return admin
}

export async function createAuditLog(adminId: string | null, action: string, entity: string, entityId?: string, details?: any) {
  return prisma.auditLog.create({
    data: {
      adminId,
      action,
      entity,
      entityId,
      details: details ? JSON.stringify(details) : null,
    },
  })
}
