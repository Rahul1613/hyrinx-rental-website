'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProjectConfig, EngineeringBranch, ProjectContextType, HardwareNode, ModularSensor } from './types';

const STORAGE_KEY = 'projectx_active_project';

export const F22_DEMO_PROJECT: ProjectConfig = {
  id: 'rc-aircraft-f22',
  projectId: 'MECH-F22-01',
  branch: 'Mechanical Engineering',
  title: 'DESIGN, DEVELOPMENT & PERFORMANCE EVALUATION OF REMOTE CONTROL AIRCRAFT',
  modelName: 'F-22 Raptor Scale Model',
  subTitle: 'F-22 Raptor Scale Model',
  subtitle: 'F-22 Raptor Scale Model',
  status: 'PROTOTYPE / TESTING',
  academicYear: '2025 – 2026',
  institution: 'Department of Mechanical Engineering',
  college: 'College of Engineering & Technology',
  guideName: 'Dr. V. K. Sharma',
  leadAuthor: 'Rahul Sisode',
  material: '5 mm Depron foam sheet',
  materialDetails: {
    name: '5 mm Depron foam sheet',
    attributes: ['High Strength-to-Weight Ratio', 'Easily Heat-Formable & Cut', 'Closed-Cell Water Resistant'],
    description: 'Extruded polystyrene (Depron) foam sheet of 5 mm nominal thickness. Selected for its minimal density (33 kg/m³), smooth aerodynamic surface skin, and ease of scoring for folded aerofoil leading edges.',
  },
  aircraftImage: 'https://images.unsplash.com/photo-1517976487502-57999dbb53f4?auto=format&fit=crop&w=1400&q=80',
  cadImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  videoUrl: '',

  challenge:
    'Design and fabricate a lightweight, high-thrust-to-weight ratio flying scale model of the F-22 Raptor airframe using 5 mm Depron foam sheet, achieving structural rigidity, aerodynamic lift, and stable radio-frequency pitch-and-roll authority under real flight envelope tests.',

  ideaNarrative:
    'The F-22 Raptor represents the pinnacle of modern stealth aerodynamics with clipped delta wings, leading edge root extensions (LERX), and canted vertical twin fins. This research tests the viability of replicating these high-lift aerodynamic characteristics using low-cost 5 mm extruded polystyrene (Depron) foam sheets with an electric brushless powertrain.',

  designNarrative:
    'CAD modeling and rib-former extraction using 2D tile blueprints scaled to a 750 mm wingspan. Center of Gravity (CG) calculated at 28% chord from the leading edge root intersection to guarantee longitudinal pitch stability without digital fly-by-wire.',

  buildNarrative:
    'Laser-guided knife scoring and bevel cuts on 5 mm Depron foam sheets. Internal carbon fiber spar (3 mm tube) epoxied through the wing fuselage junction to prevent high-G wing spar flexion during high-speed bank maneuvers.',

  systemNarrative:
    'A 2.4 GHz radio frequency link drives an electronic speed controller (ESC) regulating battery voltage to a high-RPM outrunner brushless motor, paired with dual micro servos linked via pushrods to elevated elevon flight surfaces.',

  testNarrative:
    'Systematic progression through static thrust bench-testing, dual-axis control surface centering, taxiing glide checks, and initial maiden hand-launch flight testing over an unobstructed perimeter.',

  nextStepNarrative:
    'Transforming the open airframe into an autonomous telemetry testbed through modular avionics integration, adding pitot-tube airspeed sensing, micro-FPV camera feeds, GPS geo-referencing, and 6-axis IMU gyro stabilization.',

  objectives: [
    { id: '1', num: '01', title: 'Aircraft Design', desc: 'Aerodynamic profiling and CAD scaling of the F-22 Raptor airframe with stable CG calculation.' },
    { id: '2', num: '02', title: 'Lightweight Construction', desc: 'Precision fabrication using 5 mm Depron foam sheet with carbon fiber spar reinforcement.' },
    { id: '3', num: '03', title: 'RC Propulsion', desc: 'Brushless motor and matched propeller integration powered by lithium-polymer chemistry.' },
    { id: '4', num: '04', title: 'Control Integration', desc: '2.4 GHz 6-channel receiver linking dual 9g servo motors to elevon control surfaces.' },
    { id: '5', num: '05', title: 'Flight Testing', desc: 'Systematic ground taxiing, glide trim calibration, and maiden powered flight trials.' },
    { id: '6', num: '06', title: 'Performance Evaluation', desc: 'Logging flight envelope data, thrust response, battery discharge rate, and structural integrity.' },
    { id: '7', num: '07', title: 'Sensor Expansion', desc: 'Prototyping future modular avionics (GPS, airspeed pitot, FPV camera, 6-DOF IMU).' },
  ],

  hardware: [
    {
      id: 'brushless-motor',
      name: 'Brushless Motor',
      category: 'propulsion',
      role: 'Primary Propulsion Unit',
      specs: '2212 2200KV Outrunner Brushless Motor',
      location: 'Mid-Fuselage Trailing Slot',
      xPercent: 88,
      yPercent: 50,
    },
    {
      id: 'esc',
      name: 'Electronic Speed Controller (ESC)',
      category: 'propulsion',
      role: 'Motor Throttle & Battery Regulation',
      specs: '30A Brushless ESC with 5V/2A BEC',
      location: 'Fuselage Electronics Bay',
      xPercent: 62,
      yPercent: 44,
    },
    {
      id: 'battery',
      name: 'LiPo Battery',
      category: 'power',
      role: 'High-Discharge Power Source',
      specs: '3S 11.1V 1500mAh 30C Lithium-Polymer',
      location: 'Forward Nose Compartment (for CG)',
      xPercent: 48,
      yPercent: 52,
    },
    {
      id: 'propeller',
      name: 'Propeller',
      category: 'propulsion',
      role: 'Aerodynamic Thrust Generation',
      specs: '6x4 Direct-Drive Composite Prop',
      location: 'Motor Shaft Coupling',
      xPercent: 96,
      yPercent: 50,
    },
    {
      id: 'receiver',
      name: '2.4 GHz Receiver',
      category: 'control',
      role: 'RF Signal Reception & PWM Distribution',
      specs: '6-Channel 2.4GHz FHSS Receiver',
      location: 'Center Avionics Deck',
      xPercent: 36,
      yPercent: 46,
    },
    {
      id: 'transmitter',
      name: 'Transmitter',
      category: 'control',
      role: 'Ground Command & Flight Control Interface',
      specs: '6-Channel Digital Radio Controller',
      location: 'Pilot Ground Station',
      xPercent: 12,
      yPercent: 50,
    },
    {
      id: 'servo-1',
      name: 'Port Elevon Servo',
      category: 'control',
      role: 'Port Flight Control Surface Actuation',
      specs: '9g Micro Analog Servo (1.6 kg-cm torque)',
      location: 'Left Inboard Wing Sub-Bay',
      xPercent: 68,
      yPercent: 28,
    },
    {
      id: 'servo-2',
      name: 'Starboard Elevon Servo',
      category: 'control',
      role: 'Starboard Flight Control Surface Actuation',
      specs: '9g Micro Analog Servo (1.6 kg-cm torque)',
      location: 'Right Inboard Wing Sub-Bay',
      xPercent: 68,
      yPercent: 72,
    },
  ],

  modularSensors: [
    {
      id: 'speed-sensor',
      name: 'Pitot Airspeed Sensor',
      status: 'OPTIONAL / FUTURE INTEGRATION',
      interface: 'I2C / Differential Pressure',
      purpose: 'Measures dynamic vs static air pressure to calculate calibrated airspeed (CAS) independent of ground wind.',
      specs: 'MPXV7002DP Dynamic Pressure Pitot Tube',
    },
    {
      id: 'camera',
      name: 'FPV Micro Camera & VTX',
      status: 'OPTIONAL / FUTURE INTEGRATION',
      interface: '5.8 GHz Analog / HD Video',
      purpose: 'Transmits live first-person view cockpit perspective to ground station goggles for piloting Beyond Visual Line of Sight (BVLOS).',
      specs: '1080p 60FPS Ultra-Lightweight Micro Cam',
    },
    {
      id: 'gps',
      name: 'GPS Telemetry Beacon',
      status: 'OPTIONAL / FUTURE INTEGRATION',
      interface: 'UART / NMEA Protocol',
      purpose: 'Logs exact flight coordinate breadcrumbs, altitude above ground level, ground speed, and return-to-home waypoint locking.',
      specs: 'U-blox NEO-M8N Dual Band GNSS',
    },
    {
      id: 'gyroscope',
      name: '3-Axis Gyroscope',
      status: 'OPTIONAL / FUTURE INTEGRATION',
      interface: 'I2C 400kHz Fast Bus',
      purpose: 'Monitors angular rate of change on pitch, roll, and yaw axes to counter aerodynamic turbulence and wind shear.',
      specs: '±2000 dps Full-Scale Range Sensor',
    },
    {
      id: 'accelerometer',
      name: '3-Axis Accelerometer',
      status: 'OPTIONAL / FUTURE INTEGRATION',
      interface: 'SPI / I2C Bus',
      purpose: 'Measures structural G-forces during high-speed bank turns and calculates gravitational down-vector for horizon leveling.',
      specs: '±16g Triaxial MEMS Transducer',
    },
    {
      id: 'altitude-sensor',
      name: 'Barometric Altitude Sensor',
      status: 'OPTIONAL / FUTURE INTEGRATION',
      interface: 'I2C / BMP280',
      purpose: 'High-precision barometric altimeter providing sub-meter vertical climb and descent rate (variometer) telemetry.',
      specs: '0.12 hPa RMS noise (~1 meter altitude resolution)',
    },
  ],

  performance: [
    {
      id: 'max-airspeed',
      label: 'Maximum Recorded Airspeed',
      value: '[Add Data]',
      unit: 'km/h',
      category: 'aerodynamics',
      isPlaceholder: true,
      notes: 'Awaiting radar gun or pitot tube telemetry flight test runs.',
    },
    {
      id: 'flight-time',
      label: 'Flight Endurance / Time',
      value: '[Add Data]',
      unit: 'min',
      category: 'power',
      isPlaceholder: true,
      notes: 'Dependent on throttle curve percentage and battery temperature.',
    },
    {
      id: 'total-weight',
      label: 'All-Up Weight (AUW)',
      value: '[Add Data]',
      unit: 'grams',
      category: 'structure',
      isPlaceholder: true,
      notes: 'Measured on digital precision scale with 3S LiPo pack installed.',
    },
    {
      id: 'static-thrust',
      label: 'Static Thrust Output',
      value: '[Add Data]',
      unit: 'grams',
      category: 'propulsion',
      isPlaceholder: true,
      notes: 'Measured on horizontal linear-bearing test stand at 100% PWM.',
    },
    {
      id: 'control-range',
      label: 'Effective RF Control Range',
      value: '[Add Data]',
      unit: 'meters',
      category: 'avionics',
      isPlaceholder: true,
      notes: 'Ground range-check performed at 2.4 GHz low-power transmitter mode.',
    },
    {
      id: 'battery-discharge',
      label: 'Discharge Current Draw',
      value: '[Add Data]',
      unit: 'Amperes (A)',
      category: 'power',
      isPlaceholder: true,
      notes: 'Awaiting in-line watt-meter telemetry logging during full-throttle bursts.',
    },
  ],

  timeline: [
    {
      id: 'phase-1',
      title: 'Aerodynamic Modeling & CAD Layout',
      status: 'completed',
      date: 'Aug 2025',
      description: '1:12 scale planform extraction of Lockheed Martin F-22 Raptor stealth geometry and calculation of 28% MAC Center of Gravity balance line.',
    },
    {
      id: 'phase-2',
      title: '5 mm Depron Foam Airframe Fabrication',
      status: 'completed',
      date: 'Oct 2025',
      description: 'Hand/laser slicing of virgin Depron sheets, carbon fiber spar embedding, and 45° bevel slicing for elevon flight surfaces.',
    },
    {
      id: 'phase-3',
      title: 'Avionics & Powertrain Bench Assembly',
      status: 'completed',
      date: 'Dec 2025',
      description: 'Mounting of 2212 brushless motor to plywood firewall, 30A ESC soldering, and servo pushrod linkage centering.',
    },
    {
      id: 'phase-4',
      title: 'Radio Control & Elevon Mixer Trimming',
      status: 'completed',
      date: 'Jan 2026',
      description: 'Programming transmitter elevon delta mixing, fail-safe throttle cut verification, and neutral surface alignment.',
    },
    {
      id: 'phase-5',
      title: 'Ground Taxiing & Unpowered Glide Trials',
      status: 'completed',
      date: 'Feb 2026',
      description: 'Hand-toss unpowered glide assessment over grassy field to confirm pitch stability and non-stalling angle of descent.',
    },
    {
      id: 'phase-6',
      title: 'Powered Maiden Flight & Telemetry Sortie',
      status: 'in-progress',
      date: 'Mar 2026',
      description: 'Field test sorties under clear wind conditions to calibrate thrust response, climb rate, and high-alpha control authority.',
    },
    {
      id: 'phase-7',
      title: 'Performance Logging & Modular Expansion',
      status: 'planned',
      date: 'Apr 2026',
      description: 'Replacing [Add Data] placeholders with verified GPS / pitot flight data and docking optional modular sensors.',
    },
  ],

  team: [
    {
      name: 'Rahul Sisode',
      rollNo: 'ME-2022-048',
      role: 'Project Lead & Aerodynamics Fabrication',
    },
    {
      name: 'Aditya Deshmukh',
      rollNo: 'ME-2022-051',
      role: 'Avionics & Powertrain Integration',
    },
    {
      name: 'Pooja Kulkarni',
      rollNo: 'ME-2022-063',
      role: 'CAD Modeling & Structural Analysis',
    },
    {
      name: 'Sanket Shinde',
      rollNo: 'ME-2022-077',
      role: 'Flight Testing & Telemetry Protocol',
    },
  ],
};

// Additional presets for other engineering branches
export const BRANCH_PRESETS: ProjectConfig[] = [
  F22_DEMO_PROJECT,
  {
    ...F22_DEMO_PROJECT,
    id: 'civil-smart-concrete',
    projectId: 'CIVIL-STR-01',
    branch: 'Civil Engineering',
    title: 'STRUCTURAL HEALTH MONITORING OF PRE-STRESSED CONCRETE BEAMS USING EMBEDDED OPTICAL SENSORS',
    modelName: 'Fiber-Optic Smart Girder Specimen',
    subTitle: 'Fiber-Optic Smart Girder Specimen',
    subtitle: 'Fiber-Optic Smart Girder Specimen',
    material: 'M40 Grade High-Performance Self-Compacting Concrete',
    leadAuthor: 'Vikram Joshi',
    guideName: 'Dr. Anand Raman',
    hardware: [
      { id: 'fbg', name: 'Fiber Bragg Grating (FBG) Strain Sensors', role: 'Internal Concrete Strain Telemetry', specs: '1550nm wavelength array', category: 'sensor', location: 'Tension Zone Rebar' },
      { id: 'lvdts', name: 'Linear Variable Differential Transformers', role: 'Mid-Span Dynamic Deflection', specs: '±50mm range, 0.01mm resolution', category: 'control', location: 'Mid-Span Underside' },
      { id: 'actuator', name: '100-Ton Dynamic Hydraulic Actuator', role: 'Cyclic Fatigue Loading', specs: 'Servo-hydraulic closed-loop cylinder', category: 'power', location: 'Top Load Point' },
    ],
    performance: [
      { id: 'flexural-load', label: 'Ultimate Flexural Load', value: '[Add Data]', unit: 'kN', category: 'structural', isPlaceholder: true, notes: 'Awaiting hydraulic test rig load failure test.' },
      { id: 'deflection', label: 'Maximum Mid-Span Deflection', value: '[Add Data]', unit: 'mm', category: 'structural', isPlaceholder: true, notes: 'Measured via LVDT transducers.' },
      { id: 'crack-width', label: 'First Crack Width', value: '[Add Data]', unit: 'mm', category: 'structural', isPlaceholder: true, notes: 'Optical microscope crack gauge reading.' },
    ],
  },
  {
    ...F22_DEMO_PROJECT,
    id: 'ai-edge-rover',
    projectId: 'AIML-VISION-01',
    branch: 'Computer Science & Engineering',
    title: 'REAL-TIME EDGE AI HAZARD DETECTION & AUTONOMOUS PATHFINDING ROVER',
    modelName: 'Autonomous Sub-Surface Explorer',
    subTitle: 'Autonomous Sub-Surface Explorer',
    subtitle: 'Autonomous Sub-Surface Explorer',
    material: 'CNC Carbon Fiber Chassis with PETG 3D Printed Enclosures',
    leadAuthor: 'Ananya Sharma',
    guideName: 'Dr. Priya Mehta',
    hardware: [
      { id: 'npu', name: 'Edge Neural Processing Unit (NPU)', role: 'Low-Latency Neural Inference', specs: '26 TOPS INT8 Accelerating YOLOv8', category: 'control', location: 'Central Avionics Bay' },
      { id: 'lidar', name: '360° 2D Solid-State LiDAR', role: 'Real-Time Point Cloud SLAM', specs: '12m range, 10Hz scan rate', category: 'sensor', location: 'Top Turret' },
      { id: 'motors', name: '4x Planetary Geared DC Motors with Encoders', role: 'Skid-Steer Drive Traction', specs: '12V 350 RPM with Hall Encoders', category: 'propulsion', location: 'Wheel Hubs' },
    ],
    performance: [
      { id: 'fps', label: 'Real-Time Inference Framerate', value: '[Add Data]', unit: 'FPS', category: 'computation', isPlaceholder: true, notes: 'Measured with quantized INT8 model on Edge NPU.' },
      { id: 'slam-drift', label: 'Localization Drift Rate', value: '[Add Data]', unit: '% of distance', category: 'navigation', isPlaceholder: true, notes: 'Odometry vs LiDAR loop closure.' },
      { id: 'obstacle-latency', label: 'Obstacle Evasion Response Time', value: '[Add Data]', unit: 'ms', category: 'control', isPlaceholder: true, notes: 'From camera frame capture to motor brake command.' },
    ],
  },
  {
    ...F22_DEMO_PROJECT,
    id: 'auto-bms-telemetry',
    projectId: 'AUTO-EV-01',
    branch: 'Automobile Engineering',
    title: 'FORMULA STUDENT ELECTRIC POWERTRAIN & DISTRIBUTED CAN-BUS BMS',
    modelName: 'Formula SAE EV Monocoque Pack',
    subTitle: 'Formula SAE EV Monocoque Pack',
    subtitle: 'Formula SAE EV Monocoque Pack',
    material: 'Aerospace Grade 6061-T6 Aluminum Spaceframe with Carbon Bodywork',
    leadAuthor: 'Rohit Kadam',
    guideName: 'Prof. Ramesh Verma',
    hardware: [
      { id: 'bms', name: 'Distributed Battery Management System', role: 'Cell Balancing & Thermal Telemetry', specs: 'Active CAN-bus balancing for 96S pack', category: 'control', location: 'Battery Container' },
      { id: 'inverter', name: 'Dual Silicon-Carbide (SiC) Inverters', role: 'Phase Switching & Torque Vectoring', specs: '400V 150kW combined peak rating', category: 'propulsion', location: 'Rear Subframe' },
      { id: 'pdu', name: 'Power Distribution Unit', role: 'High-Voltage Isolation & Precharge', specs: 'Automotive contactors with interlock circuit', category: 'power', location: 'Tractive System Bay' },
    ],
    performance: [
      { id: '0-100', label: '0 to 100 km/h Acceleration', value: '[Add Data]', unit: 'seconds', category: 'dynamics', isPlaceholder: true, notes: 'Awaiting track timing gate trials.' },
      { id: 'thermal-grad', label: 'Peak Cell Temperature Gradient', value: '[Add Data]', unit: '°C', category: 'thermal', isPlaceholder: true, notes: 'Under continuous 2C endurance discharge.' },
      { id: 'regen-eff', label: 'Regenerative Braking Energy Recovery', value: '[Add Data]', unit: '%', category: 'energy', isPlaceholder: true, notes: 'Measured across decelerations > 0.8G.' },
    ],
  },
];

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<ProjectConfig>(F22_DEMO_PROJECT);
  const [savedProjects, setSavedProjects] = useState<ProjectConfig[]>(BRANCH_PRESETS);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          setProject(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load project from localStorage:', e);
    }
  }, []);

  // Save changes to localStorage
  const saveProject = (newProject: ProjectConfig) => {
    setProject(newProject);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProject));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  };

  const updateProject = (projectOrUpdater: ProjectConfig | ((prev: ProjectConfig) => ProjectConfig)) => {
    setProject((prev) => {
      const next = typeof projectOrUpdater === 'function' ? projectOrUpdater(prev) : projectOrUpdater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateProjectInfo = (info: Partial<ProjectConfig>) => {
    updateProject((prev) => ({
      ...prev,
      ...info,
      modelName: info.modelName || prev.modelName,
      subTitle: info.modelName || prev.modelName,
      subtitle: info.modelName || prev.modelName,
    }));
  };

  const updateMetric = (metricId: string, value: string) => {
    updateProject((prev) => ({
      ...prev,
      performance: prev.performance.map((m) =>
        m.id === metricId ? { ...m, value, isPlaceholder: value === '[Add Data]' } : m
      ),
    }));
  };

  const addHardwareNode = (node: Omit<HardwareNode, 'id'>) => {
    const id = `node-${Date.now()}`;
    updateProject((prev) => ({
      ...prev,
      hardware: [...prev.hardware, { ...node, id }],
    }));
  };

  const removeHardwareNode = (nodeId: string) => {
    updateProject((prev) => ({
      ...prev,
      hardware: prev.hardware.filter((h) => h.id !== nodeId),
    }));
  };

  const toggleSensor = (sensorId: string) => {
    updateProject((prev) => ({
      ...prev,
      modularSensors: prev.modularSensors.map((s) =>
        s.id === sensorId
          ? {
              ...s,
              status: s.status === 'Integrated' ? 'OPTIONAL / FUTURE INTEGRATION' : 'Integrated',
            }
          : s
      ),
    }));
  };

  const switchProject = (projectId: string) => {
    const found = savedProjects.find((p) => p.id === projectId) || F22_DEMO_PROJECT;
    saveProject(found);
  };

  const loadPreset = (branch: EngineeringBranch) => {
    const found = savedProjects.find((p) => p.branch === branch) || F22_DEMO_PROJECT;
    saveProject(found);
  };

  const loadBranchPreset = (branch: EngineeringBranch) => {
    loadPreset(branch);
  };

  const resetToDefault = () => {
    saveProject(F22_DEMO_PROJECT);
  };

  const resetProject = () => {
    resetToDefault();
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        currentProject: project,
        savedProjects,
        updateProject,
        updateProjectInfo,
        updateMetric,
        addHardwareNode,
        removeHardwareNode,
        toggleSensor,
        switchProject,
        loadPreset,
        loadBranchPreset,
        resetToDefault,
        resetProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
}
