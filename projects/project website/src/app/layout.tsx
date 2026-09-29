import type { Metadata } from 'next';
import './globals.css';
import { ProjectProvider } from '@/lib/projectStore';
import AppNav from '@/components/AppNav';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
  title: 'PROJECTX // Aerospace & Engineering Showcase Platform',
  description: 'Ultra-premium, interactive engineering project showcase platform. Featuring F-22 Raptor RC Aircraft engineering evaluation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#05070b] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
        {/* Background Grid & Laser lines */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e1e2d15_1px,transparent_1px),linear-gradient(to_bottom,#0e1e2d15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,rgba(0,240,255,0.08),transparent)]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        </div>

        <ProjectProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <AppNav />
            <main className="flex-1">
              {children}
            </main>
            <AppFooter />
          </div>
        </ProjectProvider>
      </body>
    </html>
  );
}
