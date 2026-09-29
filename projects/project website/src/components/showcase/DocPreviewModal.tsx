'use client';

import React from 'react';
import { useProject } from '@/lib/projectStore';
import {
  X,
  Printer,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Plane,
} from 'lucide-react';

interface DocPreviewModalProps {
  onClose: () => void;
}

export default function DocPreviewModal({ onClose }: DocPreviewModalProps) {
  const { currentProject } = useProject();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#070d18] border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/40 bg-[#040810] font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-bold tracking-wider">PROJECT DOSSIER // TECHNICAL REPORT</span>
            <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              ACADEMIC YEAR: {currentProject.academicYear}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Document Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-300 font-sans text-sm leading-relaxed">
          {/* Document Cover / Header Block */}
          <div className="text-center pb-8 border-b border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              DEPARTMENT OF {currentProject.branch.toUpperCase()}
            </div>
            <div className="text-xs font-mono text-slate-400">
              {(currentProject.college || 'College of Engineering & Technology').toUpperCase()}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-3">
              {currentProject.title}
            </h1>
            <div className="text-lg font-mono text-cyan-300 font-bold">
              {currentProject.modelName}
            </div>
            <div className="text-xs text-slate-400 font-mono pt-2">
              Primary Construction Material: <strong className="text-slate-200">{currentProject.material}</strong>
            </div>
          </div>

          {/* Section 1: Executive Abstract */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
              1. Executive Abstract
            </h2>
            <p className="text-slate-300">
              This technical investigation presents the design, aerodynamic construction, and preliminary performance evaluation of a radio-controlled scale replica of the Lockheed Martin F-22 Raptor stealth fighter. To achieve exceptional strength-to-weight ratios at economical cost, virgin 5 mm closed-cell Depron extruded polystyrene sheet was chosen as the primary monocoque airframe substrate. Actuation is governed by dual elevon control surfaces actuated by two 9g micro-servos, providing mixed pitch and roll moments. Propulsion is delivered by an electric brushless outrunner motor coupled to a matched propeller and regulated via an Electronic Speed Controller (ESC) powered by a 3-Cell Lithium Polymer (LiPo) battery.
            </p>
          </div>

          {/* Section 2: Bill of Materials (BOM) */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
              2. Bill of Materials (BOM) & Avionics Inventory
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-[#040810] text-slate-400">
                  <tr>
                    <th className="p-3 border-b border-slate-800">Item</th>
                    <th className="p-3 border-b border-slate-800">Specification</th>
                    <th className="p-3 border-b border-slate-800">Qty</th>
                    <th className="p-3 border-b border-slate-800">Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-[#060b14]">
                  {currentProject.hardware.map((hw) => (
                    <tr key={hw.id}>
                      <td className="p-3 font-bold text-white">{hw.name}</td>
                      <td className="p-3 text-cyan-300">{hw.specs}</td>
                      <td className="p-3 text-slate-400">
                        {hw.name.includes('Servo') ? '2' : '1'}
                      </td>
                      <td className="p-3 text-slate-300">{hw.role}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-3 font-bold text-white">Depron Foam Sheet</td>
                    <td className="p-3 text-cyan-300">5 mm thickness, 1000 x 700 mm</td>
                    <td className="p-3 text-slate-400">2 Sheets</td>
                    <td className="p-3 text-slate-300">Primary fuselage & lifting surfaces</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Carbon Fiber Spar</td>
                    <td className="p-3 text-cyan-300">3 mm x 1 mm x 600 mm strip</td>
                    <td className="p-3 text-slate-400">1</td>
                    <td className="p-3 text-slate-300">Transverse wing span rigidity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Performance & Flight Testing Protocol */}
          <div>
            <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
              3. Experimental Flight Evaluation Protocol
            </h2>
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs font-mono space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <ShieldCheck className="w-4 h-4" /> SCIENTIFIC RIGOR CLAUSE
              </div>
              <p>
                In accordance with departmental academic guidelines, fabricated or simulated aerodynamic metrics have been strictly omitted. Experimental readings are cataloged as uncalibrated placeholders [Add Data] awaiting static bench scale readings and telemetry sorties:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pt-1">
                <li>Static Bench Thrust: <strong>[Add Data] grams</strong></li>
                <li>All-Up Flight Weight (AUW): <strong>[Add Data] grams</strong></li>
                <li>Maximum Recorded Airspeed: <strong>[Add Data] km/h</strong></li>
                <li>Flight Endurance (at 60% cruise): <strong>[Add Data] minutes</strong></li>
                <li>Operational Control Radius: <strong>[Add Data] meters</strong></li>
              </ul>
            </div>
          </div>

          {/* Section 4: Sign-off & Signatures */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-8 text-xs font-mono">
            <div>
              <div className="text-slate-400 uppercase">Principal Student Investigator:</div>
              <div className="font-bold text-white mt-1">{currentProject.team[0]?.name || 'Rahul Sisode'}</div>
              <div className="text-slate-500">Department of Mechanical Engineering</div>
            </div>

            <div>
              <div className="text-slate-400 uppercase">Approved by Project Guide:</div>
              <div className="font-bold text-white mt-1">{currentProject.guideName}</div>
              <div className="text-slate-500">Associate Professor // Faculty Guide</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#040810] border-t border-cyan-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
          <div>DOCUMENT CODE: RC-F22-MECH-2026-FINAL</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
