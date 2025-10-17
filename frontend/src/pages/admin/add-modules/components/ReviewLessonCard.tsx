import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  FileQuestion,
  HelpCircle,
} from "lucide-react";
import type { Lesson } from "../types/add-module.type";

interface ReviewLessonCardProps {
  lesson: Lesson;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ReviewLessonCard({
  lesson,
  isExpanded,
  onToggle,
}: ReviewLessonCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            {lesson.order}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              {lesson.title || `Lesson ${lesson.order}`}
            </h4>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.duration} min
              </span>
              {lesson.quizQuestions && lesson.quizQuestions.length > 0 && (
                <span className="text-xs text-purple-600 flex items-center gap-1">
                  <FileQuestion className="w-3 h-3" />
                  {lesson.quizQuestions.length} Quiz
                </span>
              )}
              {lesson.qaQuestions && lesson.qaQuestions.length > 0 && (
                <span className="text-xs text-blue-600 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  {lesson.qaQuestions.length} Q&A
                </span>
              )}
            </div>
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
            className="border-t border-gray-200 bg-white"
          >
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">
                  Lesson Content
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {lesson.content || "No content provided"}
                  </p>
                </div>
              </div>

              {lesson.quizQuestions && lesson.quizQuestions.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block flex items-center gap-2">
                    <FileQuestion className="w-4 h-4 text-purple-600" />
                    Quiz Questions ({lesson.quizQuestions.length})
                  </label>
                  <div className="space-y-2">
                    {lesson.quizQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="bg-purple-50 rounded-lg p-3 border border-purple-200"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {idx + 1}. {q.question || "No question text"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Type: {q.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lesson.qaQuestions && lesson.qaQuestions.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    Reflective Q&A ({lesson.qaQuestions.length})
                  </label>
                  <div className="space-y-2">
                    {lesson.qaQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="bg-blue-50 rounded-lg p-3 border border-blue-200"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {idx + 1}. {q.question || "No question text"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Answer type: {q.answerType}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
