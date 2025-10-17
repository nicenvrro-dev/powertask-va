import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileQuestion,
  Plus,
} from "lucide-react";
import type {
  Lesson,
  QAQuestion,
  QuizQuestion,
  QAQuestionFieldValue,
  QuizQuestionFieldValue,
} from "../types/add-module.type";
import QAQuestionCard from "./QAQuestionCard";
import QuizQuestionCard from "./QuizQuestionCard";

interface AssessmentLessonCardProps {
  lesson: Lesson;
  isExpanded: boolean;
  onToggle: () => void;
  onAddQA: () => void;
  onRemoveQA: (questionId: string) => void;
  onUpdateQA: (
    questionId: string,
    field: keyof QAQuestion,
    value: QAQuestionFieldValue
  ) => void;
  onAddQuiz: () => void;
  onRemoveQuiz: (questionId: string) => void;
  onUpdateQuiz: (
    questionId: string,
    field: keyof QuizQuestion,
    value: QuizQuestionFieldValue
  ) => void;
  onUpdateQuizOption: (
    questionId: string,
    optionIndex: number,
    value: string
  ) => void;
}

export default function AssessmentLessonCard({
  lesson,
  isExpanded,
  onToggle,
  onAddQA,
  onRemoveQA,
  onUpdateQA,
  onAddQuiz,
  onRemoveQuiz,
  onUpdateQuiz,
  onUpdateQuizOption,
}: AssessmentLessonCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
        onClick={onToggle}
      >
        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {lesson.order}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 truncate">
            {lesson.title || `Lesson ${lesson.order}`}
          </h4>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-xs text-gray-500">
              {lesson.quizQuestions?.length || 0} Quiz ·{" "}
              {lesson.qaQuestions?.length || 0} Q&A
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="p-6 space-y-8">
              {/* Quiz Questions Section - First */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="w-5 h-5 text-purple-600" />
                    <h4 className="text-lg font-bold text-gray-800">
                      Quiz Questions
                    </h4>
                  </div>
                  <button
                    onClick={onAddQuiz}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg cursor-pointer hover:bg-purple-200 transition-all flex items-center gap-2 text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Quiz Question
                  </button>
                </div>
                {lesson.quizQuestions && lesson.quizQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {lesson.quizQuestions.map((question, index) => (
                      <QuizQuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        onRemove={() => onRemoveQuiz(question.id)}
                        onUpdate={(field, value) =>
                          onUpdateQuiz(question.id, field, value)
                        }
                        onUpdateOption={(optIndex, value) =>
                          onUpdateQuizOption(question.id, optIndex, value)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-purple-50 border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
                    <FileQuestion className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-600">
                      No quiz questions yet. Add your first quiz question.
                    </p>
                  </div>
                )}
              </div>

              {/* Reflective Q&A Section - Second */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-bold text-gray-800">
                      Reflective Q&A
                    </h4>
                  </div>
                  <button
                    onClick={onAddQA}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-all flex items-center gap-2 text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Q&A Question
                  </button>
                </div>
                {lesson.qaQuestions && lesson.qaQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {lesson.qaQuestions.map((question, index) => (
                      <QAQuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        onRemove={() => onRemoveQA(question.id)}
                        onUpdate={(field, value) =>
                          onUpdateQA(question.id, field, value)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
                    <HelpCircle className="w-12 h-12 text-blue-300 mx-auto mb-2" />
                    <p className="text-sm text-blue-600">
                      No Q&A questions yet. Add your first reflective question.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
