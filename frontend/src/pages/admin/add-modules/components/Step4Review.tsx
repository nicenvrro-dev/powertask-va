import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { Chapter, ModuleFormData } from "../types/add-module.type";
import {
  getCategoryLabel,
  calculateTotalDuration,
  getTotalQACount,
  getTotalQuizCount,
} from "../utils/add-module.util";

import ReviewChapterCard from "./ReviewChapterCard";

interface Step4ReviewProps {
  formData: ModuleFormData;
  chapters: Chapter[];
  expandedChapter: string | null;
  onToggleChapter: (chapterId: string) => void;
}

export default function Step4Review({
  formData,
  chapters,
  expandedChapter,
  onToggleChapter,
}: Step4ReviewProps) {
  const totalDuration = calculateTotalDuration(chapters);
  const totalQA = getTotalQACount(chapters);
  const totalQuiz = getTotalQuizCount(chapters);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-1">Review Your Training Module</h3>
        <p className="text-sm text-blue-700">
          Review your training module details before publishing. You can go back to edit if needed.
        </p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Module Overview</h3>
            <p className="text-sm text-gray-500">General information and metadata</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Module Title
            </label>
            <p className="text-base font-semibold text-gray-800 mt-1">
              {formData.title || "Not provided"}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Category
            </label>
            <p className="text-base font-semibold text-gray-800 mt-1">
              {getCategoryLabel(formData.category)}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Level
            </label>
            <p className="text-base font-semibold text-gray-800 mt-1">{formData.level}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Total Duration
            </label>
            <p className="text-base font-semibold text-gray-800 mt-1">{totalDuration} minutes</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Status
            </label>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                formData.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : formData.status === "DRAFT"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {formData.status}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Language
            </label>
            <p className="text-base font-semibold text-gray-800 mt-1">{formData.language}</p>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Short Description
            </label>
            <p className="text-base text-gray-800 mt-1">
              {formData.shortDescription || "Not provided"}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Detailed Description
            </label>
            <p className="text-base text-gray-800 mt-1">
              {formData.detailedDescription || "Not provided"}
            </p>
          </div>

          {formData.prerequisites && (
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Prerequisites
              </label>
              <p className="text-base text-gray-800 mt-1">{formData.prerequisites}</p>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Learning Objectives
            </label>
            <ul className="mt-2 space-y-1">
              {formData.learningObjectives
                .filter((obj) => obj.trim() !== "")
                .map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-base text-gray-800">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
            </ul>
          </div>

          {formData.tags && (
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.split(",").map(
                  (tag, idx) =>
                    tag.trim() && (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag.trim()}
                      </span>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapters Summary</h3>
              <p className="text-sm text-gray-500">
                {chapters.length} chapter(s) · {totalQA} Q&A · {totalQuiz} Quiz
              </p>
            </div>
          </div>
        </div>

        {chapters.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No chapters added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <ReviewChapterCard
                key={chapter.id}
                chapter={chapter}
                isExpanded={expandedChapter === chapter.id}
                onToggle={() => onToggleChapter(chapter.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-1">Ready to Publish?</h4>
        <p className="text-sm text-green-700">
          Once you publish this module, it will be visible to all assigned users. You can always
          edit it later.
        </p>
      </div>
    </motion.div>
  );
}
