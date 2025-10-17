import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type {
  AddModuleModalProps,
  Lesson,
  ModuleFormData,
  QAQuestion,
  QuizQuestion,
  LessonFieldValue,
  QAQuestionFieldValue,
  QuizQuestionFieldValue,
} from "./types/add-module.type";

import {
  calculateTotalDuration,
  getTotalQACount,
  getTotalQuizCount,
} from "./utils/add-module.util";

import ModalHeader from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import StepProgress from "./components/StepProgress";
import Step1ModuleInfo from "./components/Step1ModuleInfo";
import Step2AddLessons from "./components/Step2AddChapters";
import Step3Assessments from "./components/Step3Assessments";
import Step4Review from "./components/Step4Review";
import PublishModal from "./components/PublishModal";
import SuccessToast from "./components/SuccessToast";
import type { CreateTrainingModulePayload } from "./types/services.type";
import { useServiceStore } from "../../../store/service.store";

export default function AddModuleModal({
  isOpen,
  onClose,
  category,
}: AddModuleModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ModuleFormData>({
    title: "",
    description: "",
    category: category,
    level: "BEGINNER",
    duration: "",
    prerequisites: "",
    learningObjectives: ["", "", ""],
    tags: "",
    language: "English",
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [draggedLesson, setDraggedLesson] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { createTrainingModule } = useServiceStore();

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        handleAutoSave();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isOpen, formData]);

  useEffect(() => {
    if (category) {
      setFormData((prev) => ({ ...prev, category }));
    }
  }, [category]);

  const handleAutoSave = () => {
    console.log("Auto-saving draft...", formData);
  };

  const updateFormData = (updates: Partial<ModuleFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleAddObjective = () => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, ""],
    }));
  };

  const handleRemoveObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index),
    }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newObjectives = [...prev.learningObjectives];
      newObjectives[index] = value;
      return { ...prev, learningObjectives: newObjectives };
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      console.log(`Moving to step ${currentStep + 1}`);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    console.log("Going back to previous step");
    setCurrentStep(currentStep - 1);
  };

  const handleCancel = () => {
    console.log("Cancelling module creation");
    onClose();
  };

  const handleAddLesson = () => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "",
      duration: "",
      order: lessons.length + 1,
      content: "",
    };
    setLessons([...lessons, newLesson]);
    setExpandedLesson(newLesson.id);
    console.log("Added new lesson:", newLesson);
  };

  const handleRemoveLesson = (lessonId: string) => {
    const updatedLessons = lessons
      .filter((lesson) => lesson.id !== lessonId)
      .map((lesson, idx) => ({ ...lesson, order: idx + 1 }));
    setLessons(updatedLessons);
    if (expandedLesson === lessonId) {
      setExpandedLesson(null);
    }
    console.log("Removed lesson:", lessonId);
  };

  const handleUpdateLesson = (
    lessonId: string,
    field: keyof Lesson,
    value: LessonFieldValue
  ) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
    );
    setLessons(updatedLessons);
  };

  const handleDragStart = (lessonId: string) => {
    setDraggedLesson(lessonId);
    console.log("Drag started:", lessonId);
  };

  const handleDragOver = (e: React.DragEvent, targetLessonId: string) => {
    e.preventDefault();
    if (!draggedLesson || draggedLesson === targetLessonId) return;

    const draggedIndex = lessons.findIndex(
      (lesson) => lesson.id === draggedLesson
    );
    const targetIndex = lessons.findIndex(
      (lesson) => lesson.id === targetLessonId
    );

    const newLessons = [...lessons];
    const [removed] = newLessons.splice(draggedIndex, 1);
    newLessons.splice(targetIndex, 0, removed);

    const reorderedLessons = newLessons.map((lesson, idx) => ({
      ...lesson,
      order: idx + 1,
    }));
    setLessons(reorderedLessons);
  };

  const handleDragEnd = () => {
    setDraggedLesson(null);
    console.log(
      "Drag ended. New order:",
      lessons.map((lesson) => lesson.title)
    );
  };

  const toggleLesson = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const handleAddQAQuestion = (lessonId: string) => {
    const newQuestion: QAQuestion = {
      id: `qa-${Date.now()}`,
      question: "",
      answerType: "short",
      points: "",
    };

    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          qaQuestions: [...(lesson.qaQuestions || []), newQuestion],
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
    console.log("Added Q&A question to lesson:", lessonId);
  };

  const handleRemoveQAQuestion = (lessonId: string, questionId: string) => {
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          qaQuestions: (lesson.qaQuestions || []).filter(
            (q) => q.id !== questionId
          ),
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
    console.log("Removed Q&A question:", questionId);
  };

  const handleUpdateQAQuestion = (
    lessonId: string,
    questionId: string,
    field: keyof QAQuestion,
    value: QAQuestionFieldValue
  ) => {
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          qaQuestions: (lesson.qaQuestions || []).map((q) =>
            q.id === questionId ? { ...q, [field]: value } : q
          ),
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
  };

  const handleAddQuizQuestion = (lessonId: string) => {
    const newQuestion: QuizQuestion = {
      id: `quiz-${Date.now()}`,
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: "",
    };

    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          quizQuestions: [...(lesson.quizQuestions || []), newQuestion],
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
    console.log("Added quiz question to lesson:", lessonId);
  };

  const handleRemoveQuizQuestion = (lessonId: string, questionId: string) => {
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          quizQuestions: (lesson.quizQuestions || []).filter(
            (q) => q.id !== questionId
          ),
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
    console.log("Removed quiz question:", questionId);
  };

  const handleUpdateQuizQuestion = (
    lessonId: string,
    questionId: string,
    field: keyof QuizQuestion,
    value: QuizQuestionFieldValue
  ) => {
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          quizQuestions: (lesson.quizQuestions || []).map((q) => {
            if (q.id === questionId) {
              const updatedQuestion = { ...q, [field]: value };

              // When type changes, automatically update options and reset correctAnswer
              if (field === "type") {
                if (value === "true-false") {
                  updatedQuestion.options = ["True", "False"];
                  updatedQuestion.correctAnswer = "";
                } else if (value === "multiple-choice") {
                  updatedQuestion.options = ["", "", "", ""];
                  updatedQuestion.correctAnswer = "";
                }
              }

              return updatedQuestion;
            }
            return q;
          }),
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
  };

  const handleUpdateQuizOption = (
    lessonId: string,
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          quizQuestions: (lesson.quizQuestions || []).map((q) => {
            if (q.id === questionId) {
              const newOptions = [...q.options];
              newOptions[optionIndex] = value;
              return { ...q, options: newOptions };
            }
            return q;
          }),
        };
      }
      return lesson;
    });

    setLessons(updatedLessons);
  };

  const handlePublishModule = () => {
    setShowPublishModal(true);
  };

  const validateModuleData = () => {
    // --- Module level checks ---
    if (!formData.title.trim()) {
      toast.error("Module title is required.");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Module description is required.");
      return false;
    }
    if (!formData.level) {
      toast.error("Module level is required.");
      return false;
    }
    if (!formData.duration.trim()) {
      toast.error("Module duration is required.");
      return false;
    }
    const validObjectives = formData.learningObjectives.filter(
      (o) => o.trim() !== ""
    );
    if (validObjectives.length < 1) {
      toast.error("At least one learning objective is required.");
      return false;
    }

    // --- Lessons ---
    for (const lesson of lessons) {
      if (!lesson.title.trim()) {
        toast.error("Each lesson must have a title.");
        return false;
      }
      if (!lesson.duration.trim()) {
        toast.error(
          `Lesson "${lesson.title || "Untitled"}" must have a duration.`
        );
        return false;
      }
      if (!lesson.content.trim()) {
        toast.error(
          `Lesson "${lesson.title || "Untitled"}" must have content.`
        );
        return false;
      }

      // --- Quiz Questions ---
      for (const quiz of lesson.quizQuestions || []) {
        if (!quiz.question.trim()) {
          toast.error("Each quiz question must have a question text.");
          return false;
        }
        if (!quiz.type) {
          toast.error("Each quiz question must have a type.");
          return false;
        }
        if (!quiz.points.trim()) {
          toast.error("Each quiz question must have points assigned.");
          return false;
        }
        if (
          !quiz.options ||
          quiz.options.length === 0 ||
          quiz.options.some((o) => !o.trim())
        ) {
          toast.error("Each quiz question must have valid answer options.");
          return false;
        }
      }

      // --- Reflective Q&A ---
      for (const qa of lesson.qaQuestions || []) {
        if (!qa.question.trim()) {
          toast.error("Each Q&A must have a question.");
          return false;
        }
        if (!qa.answerType) {
          toast.error("Each Q&A must specify an answer type.");
          return false;
        }
      }
    }

    return true;
  };

  const confirmPublish = async () => {
    if (!validateModuleData()) return; // <-- prevent submission if invalid
    const moduleData: CreateTrainingModulePayload = {
      moduleInfo: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        level: formData.level,
        duration: formData.duration,
        prerequisites: formData.prerequisites,
        learningObjectives: formData.learningObjectives.filter(
          (obj) => obj.trim() !== ""
        ),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        language: formData.language,
      },
      lessons: lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        order: lesson.order,
        content: lesson.content,
        qaQuestions:
          lesson.qaQuestions?.map((qa) => ({
            id: qa.id,
            question: qa.question,
            answerType: qa.answerType,
            points: qa.points,
          })) || [],
        quizQuestions:
          lesson.quizQuestions?.map((quiz) => ({
            id: quiz.id,
            question: quiz.question,
            type: quiz.type,
            options: quiz.options,
            correctAnswer: quiz.correctAnswer,
            points: quiz.points,
          })) || [],
      })),
      metadata: {
        totalDuration: calculateTotalDuration(lessons),
        totalLessons: lessons.length,
        totalQAQuestions: getTotalQACount(lessons),
        totalQuizQuestions: getTotalQuizCount(lessons),
        createdAt: new Date().toISOString(),
        createdBy: "Admin",
      },
    };

    await createTrainingModule(moduleData);

    console.log("==========================================");
    console.log("📦 PUBLISHING TRAINING MODULE");
    console.log("==========================================");
    console.log(JSON.stringify(moduleData, null, 2));
    console.log("==========================================");
    console.log("✅ Module data structure complete!");
    console.log("==========================================");

    setShowPublishModal(false);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <ModalHeader currentStep={currentStep} onClose={onClose} />

            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              <div className="max-w-4xl mx-auto">
                <StepProgress currentStep={currentStep} />

                {currentStep === 1 && (
                  <Step1ModuleInfo
                    formData={formData}
                    onUpdate={updateFormData}
                    onAddObjective={handleAddObjective}
                    onRemoveObjective={handleRemoveObjective}
                    onObjectiveChange={handleObjectiveChange}
                  />
                )}

                {currentStep === 2 && (
                  <Step2AddLessons
                    lessons={lessons}
                    expandedLesson={expandedLesson}
                    draggedLesson={draggedLesson}
                    moduleTitle={formData.title}
                    onAddLesson={handleAddLesson}
                    onRemoveLesson={handleRemoveLesson}
                    onUpdateLesson={handleUpdateLesson}
                    onToggleLesson={toggleLesson}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                  />
                )}

                {currentStep === 3 && (
                  <Step3Assessments
                    lessons={lessons}
                    expandedLesson={expandedLesson}
                    onToggleLesson={toggleLesson}
                    onAddQA={handleAddQAQuestion}
                    onRemoveQA={handleRemoveQAQuestion}
                    onUpdateQA={handleUpdateQAQuestion}
                    onAddQuiz={handleAddQuizQuestion}
                    onRemoveQuiz={handleRemoveQuizQuestion}
                    onUpdateQuiz={handleUpdateQuizQuestion}
                    onUpdateQuizOption={handleUpdateQuizOption}
                    onBack={handleBack}
                  />
                )}

                {currentStep === 4 && (
                  <Step4Review
                    formData={formData}
                    lessons={lessons}
                    expandedLesson={expandedLesson}
                    onToggleLesson={toggleLesson}
                  />
                )}
              </div>
            </div>

            <ModalFooter
              currentStep={currentStep}
              onCancel={handleCancel}
              onBack={handleBack}
              onSaveDraft={handleAutoSave}
              onNext={handleNext}
              onPublish={handlePublishModule}
            />
          </motion.div>

          <PublishModal
            isOpen={showPublishModal}
            onCancel={() => setShowPublishModal(false)}
            onConfirm={confirmPublish}
          />

          <SuccessToast isVisible={showSuccessToast} />
        </>
      )}
    </AnimatePresence>
  );
}
