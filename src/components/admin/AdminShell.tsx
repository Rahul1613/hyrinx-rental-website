import AdminSidebar from './AdminSidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:ml-64 lg:p-8">
        {children}
      </main>
    </div>
  )
}
