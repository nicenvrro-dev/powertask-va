import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, FileQuestion, Plus } from "lucide-react";
import type {
  Chapter,
  QAQuestion,
  QuizQuestion,
  QAQuestionFieldValue,
  QuizQuestionFieldValue,
} from "../types/add-module.type";
import QAQuestionCard from "./QAQuestionCard";
import QuizQuestionCard from "./QuizQuestionCard";

interface AssessmentChapterCardProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onAddQA: () => void;
  onRemoveQA: (questionId: string) => void;
  onUpdateQA: (questionId: string, field: keyof QAQuestion, value: QAQuestionFieldValue) => void;
  onAddQuiz: () => void;
  onRemoveQuiz: (questionId: string) => void;
  onUpdateQuiz: (
    questionId: string,
    field: keyof QuizQuestion,
    value: QuizQuestionFieldValue
  ) => void;
  onUpdateQuizOption: (questionId: string, optionIndex: number, value: string) => void;
}

export default function AssessmentChapterCard({
  chapter,
  isExpanded,
  onToggle,
  onAddQA,
  onRemoveQA,
  onUpdateQA,
  onAddQuiz,
  onRemoveQuiz,
  onUpdateQuiz,
  onUpdateQuizOption,
}: AssessmentChapterCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
        onClick={onToggle}
      >
        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {chapter.order}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 truncate">
            {chapter.title || `Chapter ${chapter.order}`}
          </h4>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-xs text-gray-500">
              {chapter.qaQuestions?.length || 0} Q&A · {chapter.quizQuestions?.length || 0} Quiz
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
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-bold text-gray-800">Reflective Q&A</h4>
                  </div>
                  <button
                    onClick={onAddQA}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-all flex items-center gap-2 text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Q&A Question
                  </button>
                </div>

                {!chapter.qaQuestions || chapter.qaQuestions.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-500">
                      No Q&A questions yet. Add your first question to assess learner understanding.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chapter.qaQuestions.map((qa, qaIndex) => (
                      <QAQuestionCard
                        key={qa.id}
                        question={qa}
                        index={qaIndex}
                        onRemove={() => onRemoveQA(qa.id)}
                        onUpdate={(field, value) => onUpdateQA(qa.id, field, value)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-lg font-bold text-gray-800">Quiz Questions</h4>
                  </div>
                  <button
                    onClick={onAddQuiz}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg cursor-pointer hover:bg-emerald-200 transition-all flex items-center gap-2 text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Quiz Question
                  </button>
                </div>

                {!chapter.quizQuestions || chapter.quizQuestions.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-500">
                      No quiz questions yet. Add your first quiz to test knowledge.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chapter.quizQuestions.map((quiz, quizIndex) => (
                      <QuizQuestionCard
                        key={quiz.id}
                        question={quiz}
                        index={quizIndex}
                        onRemove={() => onRemoveQuiz(quiz.id)}
                        onUpdate={(field, value) => onUpdateQuiz(quiz.id, field, value)}
                        onUpdateOption={(optIndex, value) =>
                          onUpdateQuizOption(quiz.id, optIndex, value)
                        }
                      />
                    ))}
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
