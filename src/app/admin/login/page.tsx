import { notFound } from 'next/navigation'
import AdminLoginForm from '@/components/admin/AdminLoginForm'

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { key?: string }
}) {
  const providedKey = searchParams?.key ?? ''
  const requiredKey = process.env.ADMIN_ACCESS_KEY

  if (requiredKey && providedKey !== requiredKey) {
    notFound()
  }

  return <AdminLoginForm />
}
