'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProject } from '@/lib/projectStore';
import { EngineeringBranch } from '@/lib/types';
import {
  Sliders,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  Layers,
  Cpu,
  Gauge,
  Users,
  Sparkles,
  Info,
} from 'lucide-react';

export default function BuilderPage() {
  const {
    currentProject,
    updateProjectInfo,
    updateMetric,
    addHardwareNode,
    removeHardwareNode,
    toggleSensor,
    resetToDefault,
  } = useProject();

  const [activeTab, setActiveTab] = useState<'info' | 'performance' | 'hardware' | 'sensors' | 'team'>('info');
  const [saveToast, setSaveToast] = useState(false);

  // New hardware component modal state
  const [newHwName, setNewHwName] = useState('');
  const [newHwRole, setNewHwRole] = useState('');
  const [newHwSpecs, setNewHwSpecs] = useState('');
  const [newHwLocation, setNewHwLocation] = useState('');
  const [newHwCategory, setNewHwCategory] = useState<'propulsion' | 'power' | 'control' | 'airframe' | 'sensor'>('propulsion');

  const branches: EngineeringBranch[] = [
    'Mechanical Engineering',
    'Aerospace Engineering',
    'Civil Engineering',
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Automobile Engineering',
  ];

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleAddHardware = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHwName.trim()) return;
    addHardwareNode({
      name: newHwName,
      role: newHwRole || 'Component Function',
      specs: newHwSpecs || 'Nominal Specification',
      location: newHwLocation || 'Airframe Bay',
      category: newHwCategory,
    });
    setNewHwName('');
    setNewHwRole('');
    setNewHwSpecs('');
    setNewHwLocation('');
    handleSave();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentProject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentProject.id}-config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Builder Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-cyan-900/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>LIVE PROJECT BUILDER // CONFIGURATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
            Customize Project Dossier
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time configuration engine. Changes persist immediately to browser localStorage and update the showcase views.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={handleExportJSON}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={resetToDefault}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/40 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-400" />
            <span>Reset to F-22 Default</span>
          </button>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-bold flex items-center gap-1.5 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
          >
            <Eye className="w-4 h-4 text-black" />
            <span>View Live Showcase</span>
          </Link>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/60 text-emerald-200 font-mono text-xs flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>PROJECT UPDATES SAVED TO LOCAL STORAGE</span>
        </div>
      )}

      {/* Main Tabbed Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-1 font-mono text-xs">
          {[
            { id: 'info', label: '1. Project Info & College', icon: Layers },
            { id: 'performance', label: '2. Performance Data', icon: Gauge },
            { id: 'hardware', label: '3. Hardware Stack', icon: Cpu },
            { id: 'sensors', label: '4. Modular Sensors', icon: Sparkles },
            { id: 'team', label: '5. Student Team & Guide', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-200 font-bold shadow-lg shadow-cyan-950/60'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="p-4 rounded-xl bg-[#060b16] border border-cyan-950 text-[11px] text-slate-400 font-sans mt-6">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>Tip for Evaluators</span>
            </div>
            Switch between project presets or edit any parameter here to see it immediately reflected on the live aerospace showcase.
          </div>
        </div>

        {/* Right Tab Content Editor */}
        <div className="lg:col-span-9 bg-[#060c18] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* TAB 1: General Info */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-cyan-900/40">
                <h3 className="text-lg font-bold text-white font-sans">
                  Project Title, Airframe Model & Branch Preset
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Update primary identification for university and department submissions.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-bold">Project Full Title</label>
                  <input
                    type="text"
                    value={currentProject.title}
                    onChange={(e) => updateProjectInfo({ title: e.target.value })}
                    className="w-full bg-[#03060c] border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold">Aircraft / Model Name</label>
                    <input
                      type="text"
                      value={currentProject.modelName}
                      onChange={(e) => updateProjectInfo({ modelName: e.target.value })}
                      className="w-full bg-[#03060c] border border-slate-700 rounded-lg p-3 text-cyan-300 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold">Engineering Discipline / Branch</label>
                    <select
                      value={currentProject.branch}
                      onChange={(e) => updateProjectInfo({ branch: e.target.value as EngineeringBranch })}
                      className="w-full bg-[#03060c] border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none"
                    >
                      {branches.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold">Primary Airframe Material</label>
                    <input
                      type="text"
                      value={currentProject.material}
                      onChange={(e) => updateProjectInfo({ material: e.target.value })}
                      className="w-full bg-[#03060c] border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold">Academic Session / Year</label>
                    <input
                      type="text"
                      value={currentProject.academicYear}
                      onChange={(e) => updateProjectInfo({ academicYear: e.target.value })}
                      className="w-full bg-[#03060c] border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 font-bold">College / University Name</label>
                  <input
                    type="text"
                    value={currentProject.college}
                    onChange={(e) => updateProjectInfo({ college: e.target.value })}
                    className="w-full bg-[#03060c] border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Performance Metrics Editor */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-cyan-900/40">
                <h3 className="text-lg font-bold text-white font-sans">
                  Experimental Flight Benchmarks & Telemetry
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Replace <code className="text-amber-300">[Add Data]</code> placeholders with real test results once verified on test stand or GPS flight log.
                </p>
              </div>

              <div className="space-y-4">
                {currentProject.performance.map((metric) => (
                  <div
                    key={metric.id}
                    className="p-4 rounded-xl bg-[#03060c] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{metric.label}</div>
                      <div className="text-slate-400 text-[11px] font-sans mt-0.5">{metric.notes}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => updateMetric(metric.id, e.target.value)}
                        className="w-36 bg-[#070e1c] border border-cyan-700/60 rounded-lg p-2 text-amber-300 font-bold focus:border-cyan-400 focus:outline-none text-right"
                      />
                      <span className="text-slate-400 w-12">{metric.unit}</span>
                      <button
                        onClick={() => updateMetric(metric.id, '[Add Data]')}
                        className="text-[10px] text-slate-500 hover:text-amber-400 px-2 py-1 rounded bg-slate-900 border border-slate-800"
                        title="Reset to [Add Data] placeholder"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Hardware Stack Editor */}
          {activeTab === 'hardware' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-cyan-900/40">
                <h3 className="text-lg font-bold text-white font-sans">
                  Installed Hardware & Avionics Stack
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Manage the core components mounted to the 5 mm Depron airframe.
                </p>
              </div>

              {/* Hardware List */}
              <div className="space-y-3">
                {currentProject.hardware.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-4 rounded-xl bg-[#03060c] border border-slate-800 flex items-center justify-between gap-4 font-mono text-xs"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{hw.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {hw.category}
                        </span>
                      </div>
                      <div className="text-cyan-400 text-[11px] mt-1">{hw.specs}</div>
                      <div className="text-slate-400 text-[11px] font-sans mt-0.5">{hw.role}</div>
                    </div>

                    <button
                      onClick={() => removeHardwareNode(hw.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                      title="Remove component"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Hardware Item Form */}
              <form onSubmit={handleAddHardware} className="p-5 rounded-xl bg-[#040914] border border-cyan-950 space-y-4 font-mono text-xs">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add Hardware Node to Airframe</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Component Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Telemetry Radio 433MHz"
                      value={newHwName}
                      onChange={(e) => setNewHwName(e.target.value)}
                      className="w-full bg-[#02050a] border border-slate-700 rounded-lg p-2.5 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={newHwCategory}
                      onChange={(e) => setNewHwCategory(e.target.value as any)}
                      className="w-full bg-[#02050a] border border-slate-700 rounded-lg p-2.5 text-white"
                    >
                      <option value="propulsion">Propulsion</option>
                      <option value="power">Power</option>
                      <option value="control">Control</option>
                      <option value="airframe">Airframe</option>
                      <option value="sensor">Sensor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Specifications</label>
                    <input
                      type="text"
                      placeholder="e.g. 500mW 100kbps Baud"
                      value={newHwSpecs}
                      onChange={(e) => setNewHwSpecs(e.target.value)}
                      className="w-full bg-[#02050a] border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Mounting Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Dorsal Antenna Port"
                      value={newHwLocation}
                      onChange={(e) => setNewHwLocation(e.target.value)}
                      className="w-full bg-[#02050a] border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Engineering Role</label>
                  <input
                    type="text"
                    placeholder="Short description of function and interface"
                    value={newHwRole}
                    onChange={(e) => setNewHwRole(e.target.value)}
                    className="w-full bg-[#02050a] border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert Node</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Modular Sensors Editor */}
          {activeTab === 'sensors' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-cyan-900/40">
                <h3 className="text-lg font-bold text-white font-sans">
                  Modular Sensor Expansion Bay
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Toggle which optional sensors are proposed or integrated for future research phases.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentProject.modularSensors.map((sensor) => {
                  const isIntegrated = sensor.status === 'Integrated';
                  return (
                    <div
                      key={sensor.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isIntegrated
                          ? 'bg-[#08172c] border-cyan-400'
                          : 'bg-[#040810] border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm font-sans">{sensor.name}</span>
                        <button
                          onClick={() => toggleSensor(sensor.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                            isIntegrated
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold'
                              : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {sensor.status}
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 mb-1">BUS: {sensor.interface}</div>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">{sensor.purpose}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: Team & Faculty Guide Editor */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-cyan-900/40">
                <h3 className="text-lg font-bold text-white font-sans">
                  Research Team & Guide Details
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Set academic names, student roll numbers, and faculty guide details.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-bold">Faculty Project Guide / Advisor</label>
                  <input
                    type="text"
                    value={currentProject.guideName}
                    onChange={(e) => updateProjectInfo({ guideName: e.target.value })}
                    className="w-full bg-[#03060c] border border-slate-700 rounded-lg p-3 text-cyan-300 font-bold focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="font-bold text-white mb-3">Student Investigators:</div>
                  <div className="space-y-3">
                    {currentProject.team.map((m, idx) => (
                      <div key={idx} className="p-3 bg-[#03060c] rounded-lg border border-slate-800 flex items-center justify-between gap-4">
                        <span className="text-slate-400 font-mono">0{idx + 1}</span>
                        <input
                          type="text"
                          value={m.name}
                          onChange={(e) => {
                            const newTeam = [...currentProject.team];
                            newTeam[idx].name = e.target.value;
                            updateProjectInfo({ team: newTeam });
                          }}
                          className="flex-1 bg-transparent border-b border-slate-700 text-white font-bold p-1 focus:border-cyan-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={m.rollNo}
                          onChange={(e) => {
                            const newTeam = [...currentProject.team];
                            newTeam[idx].rollNo = e.target.value;
                            updateProjectInfo({ team: newTeam });
                          }}
                          placeholder="Roll No"
                          className="w-32 bg-transparent border-b border-slate-700 text-cyan-400 p-1 focus:border-cyan-400 focus:outline-none text-right"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
