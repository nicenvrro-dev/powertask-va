import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  GripVertical,
  Trash2,
} from "lucide-react";
import type { Lesson, LessonFieldValue } from "../types/add-module.type";

interface LessonCardProps {
  lesson: Lesson;
  isExpanded: boolean;
  isDragging: boolean;
  moduleTitle: string;
  onToggle: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onRemove: () => void;
  onUpdate: (field: keyof Lesson, value: LessonFieldValue) => void;
}

export default function LessonCard({
  lesson,
  isExpanded,
  isDragging,
  onToggle,
  onDragStart,
  onDragOver,
  onDragEnd,
  onRemove,
  onUpdate,
}: LessonCardProps) {
  const displayTitle = lesson.title || `Lesson ${lesson.order}`;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`bg-white border-2 rounded-xl overflow-hidden transition-all ${
        isDragging
          ? "border-emerald-500 opacity-50"
          : isExpanded
          ? "border-emerald-500 shadow-lg"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div
        onClick={onToggle}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">{displayTitle}</h3>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lesson.duration} min
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-emerald-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t-2 border-gray-100 bg-gray-50"
          >
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lesson Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => onUpdate("title", e.target.value)}
                  placeholder="e.g., Lesson 1.1.1 Welcome to the world of sales"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use descriptive titles like "Lesson 1.1.1" or "Lesson 1.1.2"
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={lesson.duration}
                  onChange={(e) => onUpdate("duration", e.target.value)}
                  placeholder="e.g., 15"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lesson Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={lesson.content}
                  onChange={(e) => onUpdate("content", e.target.value)}
                  placeholder="Write the complete lesson content here. You can include multiple paragraphs, explanations, examples, and detailed information that learners need to know..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y font-mono text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Write comprehensive content for this lesson. Include all
                  necessary information.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
