// Service Categories
export type ServiceCategory =
  | "sales"
  | "administrativeSupport"
  | "customerService";

export const SERVICE_CATEGORIES = {
  SALES: "sales" as const,
  ADMINISTRATIVE_SUPPORT: "administrativeSupport" as const,
  CUSTOMER_SERVICE: "customerService" as const,
};

export const SERVICE_LABELS: Record<ServiceCategory, string> = {
  sales: "Sales & Lead Generation",
  administrativeSupport: "Administrative Support",
  customerService: "Customer Service",
};

// Lesson Question Types
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
  createdAt: string;
  updatedAt: string;
}

export interface ModuleMetadata {
  totalDuration: number;
  totalLessons: number;
  totalQAQuestions: number;
  totalQuizQuestions: number;
  createdBy: string;
}

// Service with Modules
export interface ServiceWithModules {
  modules: TrainingModule[];
}

export interface CreateTrainingModulePayload {
  moduleInfo: {
    title: string;
    description: string;
    category: "sales" | "admin" | "customer";
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    duration: string;
    prerequisites: string;
    learningObjectives: string[];
    tags: string[];
    language: string;
  };
  lessons: Lesson[];
  metadata: {
    totalDuration: number;
    totalLessons: number;
    totalQAQuestions: number;
    totalQuizQuestions: number;
    createdAt: string;
    createdBy: string;
  };
}

// Main Services Collection Schema
export interface ServicesCollection {
  _id: string;
  sales: ServiceWithModules;
  administrativeSupport: ServiceWithModules;
  customerService: ServiceWithModules;
  createdAt: string;
  updatedAt: string;
}

export type ServicesStore = {
  createTrainingModuleLoading: boolean;
  fetchServicesDataLoading: boolean;

  servicesData: ServicesCollection | null;

  createTrainingModule: (
    payload: CreateTrainingModulePayload
  ) => Promise<TrainingModule>;

  fetchServicesData: () => Promise<ServicesCollection>;
};
