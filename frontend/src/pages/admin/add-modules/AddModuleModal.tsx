import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import type {
  AddModuleModalProps,
  Chapter,
  ModuleFormData,
  QAQuestion,
  QuizQuestion,
  ChapterFieldValue,
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
import Step2AddChapters from "./components/Step2AddChapters";
import Step3Assessments from "./components/Step3Assessments";
import Step4Review from "./components/Step4Review";
import PublishModal from "./components/PublishModal";
import SuccessToast from "./components/SuccessToast";

export default function AddModuleModal({ isOpen, onClose, category }: AddModuleModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ModuleFormData>({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: category,
    level: "BEGINNER",
    duration: "",
    prerequisites: "",
    learningObjectives: ["", "", ""],
    status: "DRAFT",
    tags: "",
    language: "English",
  });

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [draggedChapter, setDraggedChapter] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        handleAutoSave();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isOpen, formData]);

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

  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: "",
      description: "",
      duration: "",
      order: chapters.length + 1,
      prerequisites: "",
      contentSections: [{ id: `section-${Date.now()}`, type: "text" as const, content: "" }],
    };
    setChapters([...chapters, newChapter]);
    setExpandedChapter(newChapter.id);
    console.log("Added new chapter:", newChapter);
  };

  const handleRemoveChapter = (chapterId: string) => {
    const updatedChapters = chapters
      .filter((ch) => ch.id !== chapterId)
      .map((ch, idx) => ({ ...ch, order: idx + 1 }));
    setChapters(updatedChapters);
    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    }
    console.log("Removed chapter:", chapterId);
  };

  const handleUpdateChapter = (
    chapterId: string,
    field: keyof Chapter,
    value: ChapterFieldValue
  ) => {
    const updatedChapters = chapters.map((ch) =>
      ch.id === chapterId ? { ...ch, [field]: value } : ch
    );
    setChapters(updatedChapters);
  };

  const handleAddContentSection = (chapterId: string) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          contentSections: [
            ...ch.contentSections,
            { id: `section-${Date.now()}`, type: "text" as const, content: "" },
          ],
        };
      }
      return ch;
    });
    setChapters(updatedChapters);
    console.log("Added content section to chapter:", chapterId);
  };

  const handleRemoveContentSection = (chapterId: string, sectionId: string) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          contentSections: ch.contentSections.filter((s) => s.id !== sectionId),
        };
      }
      return ch;
    });
    setChapters(updatedChapters);
    console.log("Removed content section:", sectionId);
  };

  const handleUpdateContentSection = (chapterId: string, sectionId: string, content: string) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          contentSections: ch.contentSections.map((s) =>
            s.id === sectionId ? { ...s, content } : s
          ),
        };
      }
      return ch;
    });
    setChapters(updatedChapters);
  };

  const handleDragStart = (chapterId: string) => {
    setDraggedChapter(chapterId);
    console.log("Drag started:", chapterId);
  };

  const handleDragOver = (e: React.DragEvent, targetChapterId: string) => {
    e.preventDefault();
    if (!draggedChapter || draggedChapter === targetChapterId) return;

    const draggedIndex = chapters.findIndex((ch) => ch.id === draggedChapter);
    const targetIndex = chapters.findIndex((ch) => ch.id === targetChapterId);

    const newChapters = [...chapters];
    const [removed] = newChapters.splice(draggedIndex, 1);
    newChapters.splice(targetIndex, 0, removed);

    const reorderedChapters = newChapters.map((ch, idx) => ({ ...ch, order: idx + 1 }));
    setChapters(reorderedChapters);
  };

  const handleDragEnd = () => {
    setDraggedChapter(null);
    console.log(
      "Drag ended. New order:",
      chapters.map((ch) => ch.title)
    );
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const handleAddQAQuestion = (chapterId: string) => {
    const newQuestion: QAQuestion = {
      id: `qa-${Date.now()}`,
      question: "",
      answerType: "short",
      points: "",
    };

    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          qaQuestions: [...(ch.qaQuestions || []), newQuestion],
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    console.log("Added Q&A question to chapter:", chapterId);
  };

  const handleRemoveQAQuestion = (chapterId: string, questionId: string) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          qaQuestions: (ch.qaQuestions || []).filter((q) => q.id !== questionId),
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    console.log("Removed Q&A question:", questionId);
  };

  const handleUpdateQAQuestion = (
    chapterId: string,
    questionId: string,
    field: keyof QAQuestion,
    value: QAQuestionFieldValue
  ) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          qaQuestions: (ch.qaQuestions || []).map((q) =>
            q.id === questionId ? { ...q, [field]: value } : q
          ),
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
  };

  const handleAddQuizQuestion = (chapterId: string) => {
    const newQuestion: QuizQuestion = {
      id: `quiz-${Date.now()}`,
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: "",
    };

    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          quizQuestions: [...(ch.quizQuestions || []), newQuestion],
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    console.log("Added quiz question to chapter:", chapterId);
  };

  const handleRemoveQuizQuestion = (chapterId: string, questionId: string) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          quizQuestions: (ch.quizQuestions || []).filter((q) => q.id !== questionId),
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    console.log("Removed quiz question:", questionId);
  };

  const handleUpdateQuizQuestion = (
    chapterId: string,
    questionId: string,
    field: keyof QuizQuestion,
    value: QuizQuestionFieldValue
  ) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          quizQuestions: (ch.quizQuestions || []).map((q) => {
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
      return ch;
    });

    setChapters(updatedChapters);
  };

  const handleUpdateQuizOption = (
    chapterId: string,
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          quizQuestions: (ch.quizQuestions || []).map((q) => {
            if (q.id === questionId) {
              const newOptions = [...q.options];
              newOptions[optionIndex] = value;
              return { ...q, options: newOptions };
            }
            return q;
          }),
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
  };

  const handlePublishModule = () => {
    setShowPublishModal(true);
  };

  const confirmPublish = () => {
    const moduleData = {
      moduleInfo: {
        title: formData.title,
        shortDescription: formData.shortDescription,
        detailedDescription: formData.detailedDescription,
        category: formData.category,
        level: formData.level,
        duration: formData.duration,
        prerequisites: formData.prerequisites,
        learningObjectives: formData.learningObjectives.filter((obj) => obj.trim() !== ""),
        status: formData.status,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        language: formData.language,
      },
      chapters: chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        duration: chapter.duration,
        order: chapter.order,
        prerequisites: chapter.prerequisites,
        contentSections: chapter.contentSections,
        qaQuestions:
          chapter.qaQuestions?.map((qa) => ({
            id: qa.id,
            question: qa.question,
            answerType: qa.answerType,
            points: qa.points,
          })) || [],
        quizQuestions:
          chapter.quizQuestions?.map((quiz) => ({
            id: quiz.id,
            question: quiz.question,
            type: quiz.type,
            options: quiz.options,
            correctAnswer: quiz.correctAnswer,
            points: quiz.points,
          })) || [],
      })),
      metadata: {
        totalDuration: calculateTotalDuration(chapters),
        totalChapters: chapters.length,
        totalQAQuestions: getTotalQACount(chapters),
        totalQuizQuestions: getTotalQuizCount(chapters),
        createdAt: new Date().toISOString(),
        createdBy: "Admin",
      },
    };

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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
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
                  <Step2AddChapters
                    chapters={chapters}
                    expandedChapter={expandedChapter}
                    draggedChapter={draggedChapter}
                    moduleTitle={formData.title}
                    onAddChapter={handleAddChapter}
                    onRemoveChapter={handleRemoveChapter}
                    onUpdateChapter={handleUpdateChapter}
                    onToggleChapter={toggleChapter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onAddContentSection={handleAddContentSection}
                    onRemoveContentSection={handleRemoveContentSection}
                    onUpdateContentSection={handleUpdateContentSection}
                  />
                )}

                {currentStep === 3 && (
                  <Step3Assessments
                    chapters={chapters}
                    expandedChapter={expandedChapter}
                    onToggleChapter={toggleChapter}
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
                    chapters={chapters}
                    expandedChapter={expandedChapter}
                    onToggleChapter={toggleChapter}
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
