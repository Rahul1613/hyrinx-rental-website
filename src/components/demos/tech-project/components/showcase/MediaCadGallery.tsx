'use client';

import React, { useState } from 'react';
import {
  Maximize2,
  Layers,
  Image as ImageIcon,
  Compass,
  FileCode,
  Download,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'lucide-react';

export default function MediaCadGallery() {
  const [activeTab, setActiveTab] = useState<'cad' | 'schematic' | 'gallery'>('cad');
  const [selectedAngle, setSelectedAngle] = useState<'top' | 'isometric' | 'side'>('top');

  return (
    <section id="gallery" className="py-20 relative bg-[#040810] border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIGITAL ASSETS // CAD BLUEPRINTS & MEDIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              CAD Models & Airframe Orthographics
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl font-sans">
              Parametric drawings, foam cutting templates, and high-resolution CAD schematics of the F-22 Raptor scale aerostructure.
            </p>
          </div>

          {/* Asset View Tabs */}
          <div className="flex items-center gap-1.5 bg-[#08101e] p-1.5 rounded-xl border border-cyan-900/50 font-mono text-xs">
            <button
              onClick={() => setActiveTab('cad')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'cad'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              CAD Blueprints
            </button>
            <button
              onClick={() => setActiveTab('schematic')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'schematic'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              Wiring Schematic
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'gallery'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              Fabrication Gallery
            </button>
          </div>
        </div>

        {/* CAD Blueprint Viewer Container */}
        {activeTab === 'cad' && (
          <div className="bg-[#050914] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-cyan-900/40 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">PROJECTION VIEW:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedAngle('top')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      selectedAngle === 'top'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Top Planform
                  </button>
                  <button
                    onClick={() => setSelectedAngle('isometric')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      selectedAngle === 'isometric'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Isometric 3D
                  </button>
                  <button
                    onClick={() => setSelectedAngle('side')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      selectedAngle === 'side'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Side Elevation
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span>SCALE: <strong className="text-white">1:12 METRIC</strong></span>
                <span>•</span>
                <span>TOLERANCE: <strong className="text-cyan-400">±0.5mm</strong></span>
              </div>
            </div>

            {/* Blueprint Canvas SVG */}
            <div className="h-[360px] sm:h-[440px] w-full bg-[#03060c] rounded-xl border border-cyan-950 relative flex items-center justify-center overflow-hidden">
              {/* Millimeter Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0a_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff15_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff15_1px,transparent_1px)] bg-[size:80px_80px]" />

              {selectedAngle === 'top' && (
                <svg viewBox="0 0 600 400" className="w-full h-full max-h-[380px] p-4">
                  {/* Outer Dimension lines */}
                  <line x1="80" y1="360" x2="520" y2="360" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="300" y="375" fill="#00f0ff" fontSize="11" fontFamily="monospace" textAnchor="middle">
                    WINGSPAN: 720 mm (Depron 5mm)
                  </text>

                  {/* Fuselage Length line */}
                  <line x1="50" y1="40" x2="50" y2="340" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="40" y="190" fill="#00f0ff" fontSize="11" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 40 190)">
                    FUSELAGE LENGTH: 940 mm
                  </text>

                  {/* Main F-22 CAD Outline */}
                  <polygon
                    points="300,50 320,80 330,130 360,170 510,270 500,290 430,280 415,310 435,350 395,345 365,330 355,350 300,335 245,350 235,330 205,345 165,350 185,310 170,280 100,290 90,270 240,170 270,130 280,80"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2"
                  />

                  {/* Internal Spar */}
                  <line x1="180" y1="260" x2="420" y2="260" stroke="#f59e0b" strokeWidth="2.5" />
                  <text x="300" y="252" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    CARBON SPAR REINFORCEMENT
                  </text>

                  {/* Centerline */}
                  <line x1="300" y1="30" x2="300" y2="360" stroke="#00f0ff" strokeWidth="1" strokeDasharray="6,4" opacity="0.6" />
                </svg>
              )}

              {selectedAngle === 'isometric' && (
                <svg viewBox="0 0 600 400" className="w-full h-full max-h-[380px] p-4">
                  {/* Isometric Wireframe Box */}
                  <path
                    d="M 300,60 L 500,160 L 300,270 L 100,160 Z"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.3"
                  />
                  {/* F-22 3D Form */}
                  <polygon
                    points="300,90 350,140 470,210 390,230 360,280 300,250 240,280 210,230 130,210 250,140"
                    fill="#071728"
                    stroke="#00f0ff"
                    strokeWidth="2"
                  />
                  {/* Twin Fins */}
                  <polygon points="340,240 370,190 355,190 330,240" fill="#0e2a44" stroke="#00f0ff" strokeWidth="1.5" />
                  <polygon points="260,240 230,190 245,190 270,240" fill="#0e2a44" stroke="#00f0ff" strokeWidth="1.5" />
                  <text x="300" y="320" fill="#00f0ff" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    ISOMETRIC 3D CAD PERSPECTIVE
                  </text>
                </svg>
              )}

              {selectedAngle === 'side' && (
                <svg viewBox="0 0 600 400" className="w-full h-full max-h-[380px] p-4">
                  {/* Side Profile Outline */}
                  <path
                    d="M 60,230 L 140,210 L 220,195 L 300,190 L 380,200 L 460,210 L 520,205 L 530,230 L 480,235 L 420,238 L 300,240 L 180,238 L 60,230 Z"
                    fill="#081627"
                    stroke="#00f0ff"
                    strokeWidth="2"
                  />
                  {/* Twin vertical fin side elevation */}
                  <polygon points="420,205 450,130 480,130 490,205" fill="#0d243a" stroke="#00f0ff" strokeWidth="1.5" />
                  <text x="300" y="270" fill="#00f0ff" fontSize="11" fontFamily="monospace" textAnchor="middle">
                    SIDE ELEVATION // LOW RADAR CROSS-SECTION PROFILE
                  </text>
                </svg>
              )}
            </div>

            {/* Bottom CAD Metadata Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-3">
              <span>FORMAT: DXF / SVG VECTOR CUT SHEETS</span>
              <span className="text-cyan-300">AUTODESK FUSION / SOLIDWORKS EXPORT READY</span>
            </div>
          </div>
        )}

        {/* Wiring Schematic View */}
        {activeTab === 'schematic' && (
          <div className="bg-[#050914] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-900/40 font-mono text-xs">
              <span className="text-cyan-400 font-bold uppercase">
                CIRCUIT HARNESS // DC POWER & PWM WIRING SCHEMATIC
              </span>
              <span className="text-emerald-400">GROUND LOOP ISOLATED</span>
            </div>

            <div className="p-6 bg-[#03060c] rounded-xl border border-slate-800 text-xs font-mono space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#070e1c] border border-amber-500/30">
                  <div className="text-amber-400 font-bold mb-2">1. Main DC Power Rail</div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• LiPo Battery 3S (11.1V Nominal)</li>
                    <li>• Connector: XT60 Gold Plated</li>
                    <li>• ESC DC Input with 470µF Filter Cap</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#070e1c] border border-cyan-500/30">
                  <div className="text-cyan-400 font-bold mb-2">2. BEC 5V Avionics Rail</div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• Linear/Switching 5V/2A Regulator</li>
                    <li>• Feeds RX VCC + GND Pin Rails</li>
                    <li>• Feeds 2x Servo VCC + GND Lines</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#070e1c] border border-emerald-500/30">
                  <div className="text-emerald-400 font-bold mb-2">3. PWM Control Lines</div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• CH3 Throttle → ESC Signal Pin</li>
                    <li>• CH1 Elevon Left → Servo 1 Signal</li>
                    <li>• CH2 Elevon Right → Servo 2 Signal</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Wiring Protection:</strong> All wiring harnesses are routed through interior Depron channels with silicone insulation (18 AWG for motor phases, 26 AWG for signal lines) to prevent RF induction noise on the 2.4 GHz receiver.
              </div>
            </div>
          </div>
        )}

        {/* Fabrication Gallery View */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '5 mm Depron Sheet Knife Slicing',
                desc: 'Careful cutting of wing root contours and elevon bevel angles using surgical scalpels.',
                tag: 'FABRICATION',
              },
              {
                title: 'Motor Firewall Plywood Doubler',
                desc: '3 mm aircraft-grade birch plywood mount bonded with slow-cure epoxy to distribute motor torque.',
                tag: 'PROPULSION',
              },
              {
                title: 'Elevon Control Horns & Pushrods',
                desc: '1.2 mm piano wire pushrods with Z-bends connected directly to 9g servo output arms.',
                tag: 'AVIONICS',
              },
              {
                title: 'Bench Thrust Stand Assembly',
                desc: 'Digital scale cantilever jig for measuring static thrust vs throttle percentage.',
                tag: 'TESTING',
              },
              {
                title: 'Center of Gravity Balance Check',
                desc: 'Fingertip pivot at 32% Mean Aerodynamic Chord with full battery and electronics load.',
                tag: 'INSPECTION',
              },
              {
                title: 'Completed Stealth Camo Finishing',
                desc: 'Water-based acrylic livery applied without dissolving the sensitive polystyrene foam core.',
                tag: 'FINAL ASSEMBLY',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-[#060b14] border border-slate-800 hover:border-cyan-500/40 transition-all group"
              >
                <div className="h-44 bg-[#0a1222] rounded-xl border border-cyan-950 flex flex-col items-center justify-center p-4 text-center mb-4 group-hover:border-cyan-800 transition-colors">
                  <ImageIcon className="w-8 h-8 text-cyan-500/40 mb-2 group-hover:text-cyan-400 transition-colors" />
                  <span className="font-mono text-xs text-cyan-300 font-semibold">{item.title}</span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">Photo Log Ref: #LAB-0{i+1}</span>
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">{item.tag}</span>
                  <span className="text-[10px] font-mono text-slate-500">2026 LOG</span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
