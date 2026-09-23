import { z } from 'zod'

// Admin validation schemas
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Website validation schemas
export const websiteSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDesc: z.string().min(10, 'Short description must be at least 10 characters').max(200),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  startingPrice: z.number().min(0, 'Price must be non-negative'),
  liveDemoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  thumbnail: z.string().url('Invalid URL').optional().or(z.literal('')),
  features: z.array(z.string()).optional(),
  customization: z.array(z.string()).optional(),
})

// Order validation schemas
export const orderSchema = z.object({
  websiteId: z.string().min(1, 'Website is required'),
  pricingPlanId: z.string().min(1, 'Pricing plan is required'),
  customerInfo: z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters').max(15),
    companyEventName: z.string().max(100).optional(),
    websiteTitle: z.string().min(2, 'Website title must be at least 2 characters').max(100),
    preferredSubdomain: z.union([
      z.string()
        .min(3, 'Subdomain must be at least 3 characters')
        .max(50)
        .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens allowed'),
      z.literal(''),
    ]).optional(),
    requiredLaunchDate: z.string().optional(),
  }),
  totalAmount: z.number().min(0, 'Amount must be non-negative'),
})

// Custom request validation schemas
export const customRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters').max(15),
  websiteType: z.string().min(1, 'Website type is required'),
  preferredDuration: z.string().min(1, 'Preferred duration is required'),
  budget: z.string().min(1, 'Budget is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  referenceWebsite: z.string().url('Invalid URL').optional().or(z.literal('')),
})

// Pricing plan validation schemas
export const pricingPlanSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  duration: z.string().min(1, 'Duration is required'),
  durationDays: z.number().min(1, 'Duration must be at least 1 day'),
  price: z.number().min(0, 'Price must be non-negative'),
  description: z.string().max(200).optional(),
  popular: z.boolean().optional(),
  active: z.boolean().optional(),
  order: z.number().min(0).optional(),
})

// Category validation schemas
export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  order: z.number().min(0).optional(),
  enabled: z.boolean().optional(),
})

// Helper function to validate data against schema
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ')
      return { success: false, error: errorMessage }
    }
    return { success: false, error: 'Validation failed' }
  }
}

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (basic validation for Indian numbers)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
