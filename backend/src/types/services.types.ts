import type { Types } from "mongoose";

/** ===== Frontend-aligned unions & interfaces ===== */

// Service Categories (exactly as frontend)
export type ServiceCategory =
  | "sales"
  | "administrativeSupport"
  | "customerService";

export const SERVICE_CATEGORIES = {
  SALES: "sales",
  ADMINISTRATIVE_SUPPORT: "administrativeSupport",
  CUSTOMER_SERVICE: "customerService",
} as const;

export const SERVICE_LABELS: Record<ServiceCategory, string> = {
  sales: "Sales & Lead Generation",
  administrativeSupport: "Administrative Support",
  customerService: "Customer Service",
};

// Lesson Question Types (exactly as frontend)
export interface QAQuestion {
  id: string;
  question: string;
  answerType: "short" | "paragraph";
  points: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false";
  options: string[];
  correctAnswer: string;
  points: string;
}

// Lesson Structure
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  order: number;
  content: string;
  qaQuestions?: QAQuestion[];
  quizQuestions?: QuizQuestion[];
}

// Module Metadata
export interface ModuleMetadata {
  totalDuration: number;
  totalLessons: number;
  totalQAQuestions: number;
  totalQuizQuestions: number;
  createdBy: string;
}

// Module Structure
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: string;
  prerequisites: string;
  learningObjectives: string[];
  tags: string[];
  language: string;
  lessons: Lesson[];
  metadata: ModuleMetadata;
  updatedAt: string; // only keep updatedAt for FE timestamp
}

// Service with Modules
export interface ServiceWithModules {
  modules: TrainingModule[];
}

// Main Services Collection
export interface ServicesCollection {
  _id: string;
  sales: ServiceWithModules;
  administrativeSupport: ServiceWithModules;
  customerService: ServiceWithModules;
  createdAt: string;
  updatedAt: string;
}

/** ===== DTO from frontend Add Module modal ===== */
export interface ModuleFormData {
  title: string;
  description: string;
  category: "sales" | "admin" | "customer";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: string;
  prerequisites: string;
  learningObjectives: string[];
  tags: string; // comma/space separated in UI
  language: string;
}

/** ===== Backend-only: Mongo document types ===== */
export interface ServicesCollectionDoc {
  _id: Types.ObjectId;
  sales: ServiceWithModules;
  administrativeSupport: ServiceWithModules;
  customerService: ServiceWithModules;
  createdAt: Date;
  updatedAt: Date;
}

/** Lean/plain JSON returned to client (dates → ISO strings) */
export type ServicesCollectionLean = ServicesCollection;
