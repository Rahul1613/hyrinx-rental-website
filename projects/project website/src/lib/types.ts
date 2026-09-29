export type EngineeringBranch =
  | "Mechanical Engineering"
  | "Aerospace Engineering"
  | "Automobile Engineering"
  | "Civil Engineering"
  | "Computer Science & Engineering"
  | "AI & Machine Learning"
  | "Electronics & Communication"
  | "Electronics & Telecommunication"
  | "Electrical Engineering"
  | "Robotics & Mechatronics"
  | "Chemical Engineering"
  | "Biomedical Engineering"
  | "Architecture"
  | "Other";

export type ProjectTheme = "aerospace" | "engineering" | "dark-technical" | "minimal";

export interface HardwareNode {
  id: string;
  name: string;
  role: string;
  specs: string;
  category?: 'propulsion' | 'power' | 'control' | 'airframe' | 'sensor' | string;
  location?: string;
  xPercent?: number;
  yPercent?: number;
}

export interface ModularSensor {
  id: string;
  name: string;
  status: "OPTIONAL / FUTURE INTEGRATION" | "Integrated" | "Pending" | string;
  purpose?: string;
  description?: string;
  interface?: string;
  specs?: string;
}

export interface PerformanceMetric {
  id: string;
  label: string;
  value: string; // e.g. "[Add Data]" or user entered
  unit: string;
  category?: string;
  isPlaceholder?: boolean;
  notes?: string;
  benchmark?: string;
}

export interface ProjectTeamMember {
  id?: string;
  name: string;
  rollNo?: string;
  branch?: string;
  role: string;
  contribution?: string;
}

export interface TimelineStage {
  id?: string;
  step?: string;
  title: string;
  status: "completed" | "in-progress" | "planned" | "COMPLETED" | "CURRENT" | "PLANNED" | string;
  date?: string;
  description: string;
}

export interface ProjectConfig {
  id: string;
  projectId: string; // e.g. "MECH-F22-01"
  branch: EngineeringBranch;
  title: string;
  modelName: string; // "F-22 Raptor Scale Model" (Do NOT call it Predator)
  subTitle?: string;
  subtitle?: string;
  status: string;
  academicYear: string;
  institution?: string;
  college?: string;
  guideName: string;
  leadAuthor: string;
  material: string; // "5 mm Depron foam sheet"
  materialDetails?: {
    name: string;
    attributes: string[];
    description: string;
  };
  aircraftImage?: string;
  cadImage?: string;
  videoUrl?: string;

  // Narrative Story
  challenge?: string;
  ideaNarrative?: string;
  designNarrative?: string;
  buildNarrative?: string;
  systemNarrative?: string;
  testNarrative?: string;
  nextStepNarrative?: string;

  // Structured Sections
  objectives?: { id: string; num: string; title: string; desc: string }[];
  hardware: HardwareNode[];
  modularSensors: ModularSensor[];
  sensors?: ModularSensor[];
  performance: PerformanceMetric[];
  timeline: TimelineStage[];
  team: ProjectTeamMember[];
  theme?: ProjectTheme;
}

export interface ProjectContextType {
  project: ProjectConfig;
  currentProject: ProjectConfig;
  savedProjects: ProjectConfig[];
  updateProject: (projectOrUpdater: ProjectConfig | ((prev: ProjectConfig) => ProjectConfig)) => void;
  updateProjectInfo: (info: Partial<ProjectConfig>) => void;
  updateMetric: (metricId: string, value: string) => void;
  addHardwareNode: (node: Omit<HardwareNode, 'id'>) => void;
  removeHardwareNode: (nodeId: string) => void;
  toggleSensor: (sensorId: string) => void;
  switchProject: (projectId: string) => void;
  loadPreset: (branch: EngineeringBranch) => void;
  loadBranchPreset: (branch: EngineeringBranch) => void;
  resetToDefault: () => void;
  resetProject: () => void;
}
