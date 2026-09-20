import AdminSidebar from './AdminSidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 lg:flex-row lg:items-stretch">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-3 py-4 sm:px-5 sm:py-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="max-w-full">{children}</div>
      </main>
    </div>
  )
}
