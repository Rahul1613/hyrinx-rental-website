"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BuilderProvider } from "@/lib/builderStore";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioView = pathname === "/builder" || pathname === "/preview";

  return (
    <BuilderProvider>
      {!isStudioView && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isStudioView && <Footer />}
    </BuilderProvider>
  );
}
