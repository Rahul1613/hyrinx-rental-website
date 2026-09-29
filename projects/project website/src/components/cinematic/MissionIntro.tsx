'use client';

import React, { useState, useEffect } from 'react';
import { useProject } from '@/lib/projectStore';
import { Plane, ShieldCheck } from 'lucide-react';

export default function MissionIntro() {
  const { currentProject } = useProject();
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Elegant mission sequence timings
    const t1 = setTimeout(() => setStep(1), 350); // Show ID & System
    const t2 = setTimeout(() => setStep(2), 1000); // Show Initializing status
    const t3 = setTimeout(() => setStep(3), 1800); // Fade out overlay
    const t4 = setTimeout(() => setShowIntro(false), 2400); // Remove from DOM

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!showIntro) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#03060a] flex items-center justify-center p-6 transition-opacity duration-700 pointer-events-none ${
        step >= 3 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-md w-full space-y-4 font-mono text-xs">
        {/* Reticle icon */}
        <div className="flex items-center gap-2 text-cyan-400">
          <Plane className="w-5 h-5 animate-pulse" />
          <span className="tracking-widest font-bold">PROJECTX AEROSPACE LAUNCH PROTOCOL</span>
        </div>

        {/* Telemetry rows */}
        <div className="space-y-1.5 border-l-2 border-cyan-500/50 pl-4 py-1 text-slate-400">
          <div>
            PROJECT ID: <span className="text-white font-bold">{currentProject.projectId}</span>
          </div>
          <div>
            SYSTEM: <span className="text-cyan-300 font-bold">REMOTE CONTROL AIRCRAFT</span>
          </div>
          <div>
            AIRFRAME: <span className="text-slate-200">{currentProject.modelName.toUpperCase()}</span>
          </div>
          <div>
            CORE MATERIAL: <span className="text-amber-400">{currentProject.material.toUpperCase()}</span>
          </div>
          <div>
            STATUS: <span className="text-emerald-400 font-bold">AERODYNAMIC PROTOTYPE // READY</span>
          </div>
        </div>

        {/* Status Line */}
        <div className="pt-2 flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 tracking-wider">
            {step >= 2 ? 'INITIALIZING FLIGHT EXPERIENCE...' : 'ESTABLISHING AVIONICS LINK...'}
          </span>
        </div>
      </div>
    </div>
  );
}
