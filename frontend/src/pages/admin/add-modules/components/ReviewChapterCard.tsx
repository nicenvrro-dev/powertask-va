import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import type { Chapter } from "../types/add-module.type";

interface ReviewChapterCardProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ReviewChapterCard({
  chapter,
  isExpanded,
  onToggle,
}: ReviewChapterCardProps) {
  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition-all"
        onClick={onToggle}
      >
        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {chapter.order}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 truncate">
            {chapter.title || `Chapter ${chapter.order}`}
          </h4>
          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {chapter.duration} min
            </span>
            <span>•</span>
            <span>{chapter.contentSections?.length || 0} content section(s)</span>
            <span>•</span>
            <span>{chapter.qaQuestions?.length || 0} Q&A</span>
            <span>•</span>
            <span>{chapter.quizQuestions?.length || 0} Quiz</span>
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
            <div className="p-6 space-y-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Description
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {chapter.description || "No description"}
                </p>
              </div>

              {chapter.prerequisites && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Prerequisites
                  </label>
                  <p className="text-sm text-gray-800 mt-1">{chapter.prerequisites}</p>
                </div>
              )}

              {chapter.qaQuestions && chapter.qaQuestions.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                    Q&A Questions ({chapter.qaQuestions.length})
                  </label>
                  <div className="space-y-3">
                    {chapter.qaQuestions.map((qa, idx) => (
                      <div key={qa.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold flex-shrink-0">
                            Q{idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{qa.question}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>
                                Type: {qa.answerType === "short" ? "Short Answer" : "Paragraph"}
                              </span>
                              {qa.points && <span>• {qa.points} points</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {chapter.quizQuestions && chapter.quizQuestions.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                    Quiz Questions ({chapter.quizQuestions.length})
                  </label>
                  <div className="space-y-3">
                    {chapter.quizQuestions.map((quiz, idx) => (
                      <div key={quiz.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold flex-shrink-0">
                            Q{idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 mb-2">
                              {quiz.question}
                            </p>
                            <div className="text-xs text-gray-500 mb-2">
                              Type:{" "}
                              {quiz.type === "multiple-choice" ? "Multiple Choice" : "True/False"} •{" "}
                              {quiz.points} points
                            </div>
                            <div className="space-y-1">
                              {quiz.options.map(
                                (option, optIdx) =>
                                  option && (
                                    <div
                                      key={optIdx}
                                      className={`text-xs px-3 py-2 rounded ${
                                        quiz.correctAnswer === option
                                          ? "bg-green-50 border border-green-300 text-green-800 font-semibold"
                                          : "bg-gray-50 border border-gray-200 text-gray-700"
                                      }`}
                                    >
                                      {quiz.type === "multiple-choice" &&
                                        `${String.fromCharCode(65 + optIdx)}. `}
                                      {option}
                                      {quiz.correctAnswer === option && " ✓"}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        </div>
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
