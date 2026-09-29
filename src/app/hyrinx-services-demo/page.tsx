"use client";

import React, { useState } from "react";
import CinematicEntrance from "@/components/services-demo/CinematicEntrance";
import CinematicCursor from "@/components/services-demo/CinematicCursor";
import CinematicBookshelfShowcase from "@/components/services-demo/CinematicBookshelfShowcase";
import CinematicPosterShowcase from "@/components/services-demo/CinematicPosterShowcase";
import ServiceDetailModal from "@/components/services-demo/ServiceDetailModal";
import ServiceInquiryModal from "@/components/services-demo/ServiceInquiryModal";
import {
  HYRINX_SERVICE_CATEGORIES,
  ServiceCategory
} from "@/components/services-demo/servicesData";

export default function HyrinxServicesDemoPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [viewMode, setViewMode] = useState<"bookshelf" | "poster">("bookshelf");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryServiceTitle, setInquiryServiceTitle] = useState("");

  const handleOpenDetails = (catId: string) => {
    const found = HYRINX_SERVICE_CATEGORIES.find((c) => c.id === catId);
    if (found) {
      setSelectedCategory(found);
    }
  };

  const handleDeploy = (title: string) => {
    setInquiryServiceTitle(title);
    setInquiryModalOpen(true);
  };

  const handleStartProject = () => {
    setInquiryServiceTitle("New Client Enterprise Project");
    setInquiryModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* 1. Cinematic Movie Opening Title Sequence */}
      {!hasEntered && (
        <CinematicEntrance onComplete={() => setHasEntered(true)} />
      )}

      {/* 2. Cinematic Magnetic Desktop Cursor */}
      <CinematicCursor />

      {/* 3. Floating View Mode Switcher: Bookshelf (default) vs Poster */}
      <div className="fixed bottom-6 right-6 z-40 bg-neutral-950/90 backdrop-blur-md border border-amber-500/30 rounded-full p-1.5 flex items-center gap-1 shadow-2xl">
        <button
          onClick={() => setViewMode("bookshelf")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
            viewMode === "bookshelf"
              ? "bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/30"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <span>📚</span>
          <span>Bookshelf View</span>
        </button>
        <button
          onClick={() => setViewMode("poster")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
            viewMode === "poster"
              ? "bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/30"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <span>🎬</span>
          <span>Poster View</span>
        </button>
      </div>

      {/* 4. Showcase View */}
      {viewMode === "bookshelf" ? (
        <CinematicBookshelfShowcase
          onOpenDetails={handleOpenDetails}
          onDeploy={handleDeploy}
          onStartProject={handleStartProject}
          onReplayIntro={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setHasEntered(false);
          }}
        />
      ) : (
        <CinematicPosterShowcase
          onOpenDetails={handleOpenDetails}
          onDeploy={handleDeploy}
          onStartProject={handleStartProject}
          onReplayIntro={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setHasEntered(false);
          }}
        />
      )}

      {/* 5. Deep Technical Blueprint Dossier Modal (Preserves all 13 service categories & data) */}
      <ServiceDetailModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onStartProject={(serviceTitle) => {
          setSelectedCategory(null);
          handleDeploy(serviceTitle);
        }}
      />

      {/* 5. Consultation & WhatsApp Direct Modal */}
      <ServiceInquiryModal
        isOpen={inquiryModalOpen}
        serviceTitle={inquiryServiceTitle}
        onClose={() => setInquiryModalOpen(false)}
      />
    </main>
  );
}
