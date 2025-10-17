export interface ContentSection {
  id: string;
  type: "text";
  content: string;
}

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

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  order: number;
  content: string;
  qaQuestions?: QAQuestion[];
  quizQuestions?: QuizQuestion[];
}

export interface ModuleFormData {
  title: string;
  description: string;
  category: "sales" | "admin" | "customer";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: string;
  prerequisites: string;
  learningObjectives: string[];
  tags: string;
  language: string;
}

export interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: "sales" | "admin" | "customer";
}

export type LessonFieldValue = string | number | QAQuestion[] | QuizQuestion[];

export type QAQuestionFieldValue = string | "short" | "paragraph";

export type QuizQuestionFieldValue =
  | string
  | "multiple-choice"
  | "true-false"
  | string[];
