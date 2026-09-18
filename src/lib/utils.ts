import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString()}`
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `HYX-${timestamp}-${random}`
}

export function generateAccessToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random().toString(36).substring(2)}`).toString('base64')
}
