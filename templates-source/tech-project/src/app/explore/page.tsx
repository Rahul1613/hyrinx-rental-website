'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProject } from '@/lib/projectStore';
import { EngineeringBranch } from '@/lib/types';
import {
  Layers,
  Plane,
  Building2,
  Cpu,
  Car,
  Radio,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export default function ExplorePage() {
  const { savedProjects, switchProject } = useProject();
  const router = useRouter();

  const handleSelectPreset = (projectId: string) => {
    switchProject(projectId);
    router.push('/#overview');
  };

  const branchShowcases = [
    {
      branch: 'Mechanical & Aerospace' as EngineeringBranch,
      projectId: 'rc-aircraft-f22',
      title: 'Design, Development & Performance Evaluation of Remote Control Aircraft',
      model: 'F-22 Raptor Scale Model',
      material: '5 mm Depron Foam Sheet',
      icon: Plane,
      highlights: ['Brushless Propulsion', 'Dual Elevon Servos', 'High-Alpha Aerodynamics'],
      tag: 'FLAGSHIP DEMO',
    },
    {
      branch: 'Civil Engineering' as EngineeringBranch,
      projectId: 'civil-smart-concrete',
      title: 'Structural Health Monitoring of Smart Pre-Stressed Concrete Beams',
      model: 'Fiber-Optic Sensor Concrete Girder',
      material: 'M40 High-Performance Concrete with Carbon Fibers',
      icon: Building2,
      highlights: ['Embedded FBG Sensors', 'Cyclic Load Deflection', 'Micro-Crack Telemetry'],
      tag: 'CIVIL PRESET',
    },
    {
      branch: 'Computer Science & Engineering' as EngineeringBranch,
      projectId: 'ai-edge-rover',
      title: 'Edge AI Autonomous Navigation & Real-Time Hazard Avoidance Rover',
      model: 'Autonomous Sub-Surface Explorer',
      material: 'CNC Carbon Fiber Plate Chassis & 3D Printed PETG',
      icon: Cpu,
      highlights: ['YOLOv8 Edge Acceleration', 'LiDAR SLAM Mapping', 'ROS2 Micro-Nodes'],
      tag: 'AI / CS PRESET',
    },
    {
      branch: 'Automobile Engineering' as EngineeringBranch,
      projectId: 'auto-bms-telemetry',
      title: 'Formula Student Electric Vehicle Battery Management & CAN Bus Telemetry',
      model: 'Formula SAE EV Powertrain',
      material: 'Aerospace Grade 6061-T6 Aluminum Monocoque',
      icon: Car,
      highlights: ['400V Pack Thermal Model', 'Dual Inverter Vectoring', 'Live Pit Telemetry'],
      tag: 'AUTOMOTIVE PRESET',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>MULTI-DISCIPLINARY ARCHITECTURE // UNIVERSAL ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight">
          Explore Projects Across All Engineering Branches
        </h1>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed font-sans">
          PROJECTX is engineered as a universal exhibition engine. Whether you are validating a scale aeronautical wing, an edge AI vision pipeline, or a smart structural concrete specimen, your project gets cinema-grade interactive presentation.
        </p>
      </div>

      {/* Grid of Branch Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {branchShowcases.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.projectId}
              className="p-7 rounded-2xl bg-[#060c18] border border-cyan-900/50 hover:border-cyan-400/80 transition-all duration-300 group flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-semibold">
                    {card.tag}
                  </span>
                </div>

                <div className="text-xs font-mono text-cyan-400 font-bold mb-1">
                  DISCIPLINE: {card.branch.toUpperCase()}
                </div>

                <h3 className="text-xl font-black text-white font-sans tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                <div className="text-sm font-mono text-slate-300 mb-4">
                  Model: <span className="text-white font-bold">{card.model}</span>
                </div>

                <div className="p-3 rounded-lg bg-[#03060c] border border-slate-800 text-xs font-mono text-slate-400 mb-5">
                  <span className="text-slate-500">Substrate Material: </span>
                  <span className="text-slate-200">{card.material}</span>
                </div>

                {/* Subsystem Highlights */}
                <div className="space-y-1.5 mb-6">
                  {card.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPreset(card.projectId)}
                className="w-full py-3 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-400 text-cyan-300 hover:text-black font-mono text-xs font-bold border border-cyan-500/40 flex items-center justify-center gap-2 transition-all"
              >
                <span>Load Live Project Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Build Your Own CTA banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#060e1d] to-[#040810] border border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>CUSTOMIZE FOR YOUR INSTITUTION</span>
          </div>
          <h2 className="text-2xl font-black text-white font-sans uppercase">
            Have a different engineering capstone project?
          </h2>
          <p className="text-xs text-slate-400 font-sans max-w-xl mt-1">
            Open the Live Builder to configure your own team members, faculty guide, bill of materials, circuit flow diagrams, and testing logs in seconds.
          </p>
        </div>

        <Link
          href="/builder"
          className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold whitespace-nowrap shadow-xl shadow-cyan-400/20 transition-all transform hover:-translate-y-0.5"
        >
          Open Project Builder →
        </Link>
      </div>
    </div>
  );
}
