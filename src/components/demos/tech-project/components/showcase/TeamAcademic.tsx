'use client';

import React, { useState } from 'react';
import { useProject } from '../../lib/projectStore';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  FileText,
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import DocPreviewModal from './DocPreviewModal';

export default function TeamAcademic() {
  const { currentProject } = useProject();
  const [docModalOpen, setDocModalOpen] = useState(false);

  return (
    <section id="team" className="py-20 relative bg-[#03060c] border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC AFFILIATION & RESEARCH SQUAD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            Research Team & Faculty Supervision
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed font-sans">
            Conducted under the Department of Mechanical Engineering as part of the Senior Capstone Research & Aerodynamics Evaluation Program.
          </p>
        </div>

        {/* Academic Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Faculty Guide Card */}
          <div className="lg:col-span-4 bg-[#060b16] border border-cyan-500/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />

            <div className="flex items-center justify-between mb-4 font-mono text-xs text-slate-400">
              <span className="uppercase text-[10px] text-cyan-400 font-bold">PROJECT GUIDE & MENTOR</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-900 to-blue-900 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xl font-bold font-mono mb-4">
              DR
            </div>

            <h3 className="text-xl font-black text-white font-sans">
              {currentProject.guideName}
            </h3>
            <div className="text-xs font-mono text-cyan-400 mt-1">
              Associate Professor // Aerodynamics & Fluid Dynamics
            </div>
            <p className="text-xs text-slate-400 mt-3 font-sans leading-relaxed">
              Supervising airframe structural analysis, control surface Reynolds calculations, and flight trial safety protocols.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
              <div className="flex justify-between">
                <span>DEPARTMENT:</span>
                <span className="text-slate-200">{currentProject.branch}</span>
              </div>
              <div className="flex justify-between">
                <span>YEAR:</span>
                <span className="text-cyan-300">{currentProject.academicYear}</span>
              </div>
            </div>
          </div>

          {/* Student Researchers Team List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="text-cyan-400 font-bold">PROJECT INVESTIGATORS // STUDENT RESEARCHERS</span>
              <span>4-MEMBER ENGINEERING SQUAD</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentProject.team.map((member, i) => (
                <div
                  key={member.name}
                  className="p-5 rounded-xl bg-[#060b14] border border-slate-800 hover:border-cyan-800/80 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-sm font-bold text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                      0{i + 1}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                      {member.role}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h4>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    ROLL: {member.rollNo}
                  </div>
                </div>
              ))}
            </div>

            {/* University & Department Accreditation Strip */}
            <div className="p-4 rounded-xl bg-[#070e1c] border border-cyan-900/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>INSTITUTION: <strong className="text-white">{currentProject.college}</strong></span>
              </div>

              <button
                onClick={() => setDocModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold flex items-center gap-1.5 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
              >
                <FileText className="w-4 h-4 text-black" />
                <span>Read Full Technical Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Technical Report Preview */}
        {docModalOpen && (
          <DocPreviewModal onClose={() => setDocModalOpen(false)} />
        )}
      </div>
    </section>
  );
}
