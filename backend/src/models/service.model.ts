import mongoose, { Schema } from "mongoose";
import {
  QAQuestion,
  QuizQuestion,
  Lesson,
  TrainingModule,
  ServiceWithModules,
  ServicesCollectionDoc,
} from "../types/services.types";

/** ===== ENUMS ===== */
const ANSWER_TYPE = ["short", "paragraph"] as const;
const QUIZ_TYPE = ["multiple-choice", "true-false"] as const;
const MODULE_LEVEL = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
const SERVICE_CATEGORIES = [
  "sales",
  "administrativeSupport",
  "customerService",
] as const;

/** ===== SUB-SCHEMAS ===== */

const QAQuestionSchema = new Schema<QAQuestion>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    answerType: { type: String, enum: ANSWER_TYPE, required: true },
    points: { type: String, required: true },
  },
  { _id: false }
);

const QuizQuestionSchema = new Schema<QuizQuestion>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    type: { type: String, enum: QUIZ_TYPE, required: true },
    options: { type: [String], default: [] },
    correctAnswer: { type: String, required: true },
    points: { type: String, required: true },
  },
  { _id: false }
);

const LessonSchema = new Schema<Lesson>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    order: { type: Number, required: true },
    content: { type: String, required: true },
    qaQuestions: { type: [QAQuestionSchema], default: [] },
    quizQuestions: { type: [QuizQuestionSchema], default: [] },
  },
  { _id: false }
);

const ModuleMetadataSchema = new Schema(
  {
    totalDuration: { type: Number, required: true },
    totalLessons: { type: Number, required: true },
    totalQAQuestions: { type: Number, required: true },
    totalQuizQuestions: { type: Number, required: true },
    createdBy: { type: String, required: true },
  },
  { _id: false }
);

/** ===== TRAINING MODULE ===== */
const TrainingModuleSchema = new Schema<TrainingModule>(
  {
    title: { type: String, required: true, index: "text" },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: SERVICE_CATEGORIES,
      required: true,
      index: true,
    },
    level: { type: String, enum: MODULE_LEVEL, required: true },
    duration: { type: String, required: true },
    prerequisites: { type: String, required: true },
    learningObjectives: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    language: { type: String, required: true },
    lessons: { type: [LessonSchema], default: [] },
    metadata: { type: ModuleMetadataSchema, required: true },
  },
  { timestamps: true }
);

/** ===== SERVICE WRAPPER ===== */
const ServiceWithModulesSchema = new Schema<ServiceWithModules>(
  {
    modules: { type: [TrainingModuleSchema], default: [] },
  },
  { _id: false }
);

/** ===== ROOT COLLECTION ===== */
const ServicesCollectionSchema = new Schema<ServicesCollectionDoc>(
  {
    sales: { type: ServiceWithModulesSchema, default: { modules: [] } },
    administrativeSupport: {
      type: ServiceWithModulesSchema,
      default: { modules: [] },
    },
    customerService: {
      type: ServiceWithModulesSchema,
      default: { modules: [] },
    },
  },
  { timestamps: true, collection: "services" }
);

ServicesCollectionSchema.set("toJSON", { versionKey: false });

/** ===== MODEL EXPORT ===== */
const ServicesModel = mongoose.model<ServicesCollectionDoc>(
  "services",
  ServicesCollectionSchema
);

export default ServicesModel;
