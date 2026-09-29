"use client";

import React from "react";
import CinematicExperience from "./components/cinematic/CinematicExperience";
import { ProjectProvider } from "./lib/projectStore";

export default function TechProjectDemo() {
  return (
    <ProjectProvider>
      <div className="w-full min-h-screen bg-slate-950 text-white">
        <CinematicExperience />
      </div>
    </ProjectProvider>
  );
}
