import { motion } from "framer-motion";
import { Plus, BookOpen } from "lucide-react";
import type { Lesson, LessonFieldValue } from "../types/add-module.type";
import LessonCard from "./LessonCard";

interface Step2AddLessonsProps {
  lessons: Lesson[];
  expandedLesson: string | null;
  draggedLesson: string | null;
  moduleTitle: string;
  onAddLesson: () => void;
  onRemoveLesson: (lessonId: string) => void;
  onUpdateLesson: (
    lessonId: string,
    field: keyof Lesson,
    value: LessonFieldValue
  ) => void;
  onToggleLesson: (lessonId: string) => void;
  onDragStart: (lessonId: string) => void;
  onDragOver: (e: React.DragEvent, targetLessonId: string) => void;
  onDragEnd: () => void;
}

export default function Step2AddLessons({
  lessons,
  expandedLesson,
  draggedLesson,
  moduleTitle,
  onAddLesson,
  onRemoveLesson,
  onUpdateLesson,
  onToggleLesson,
  onDragStart,
  onDragOver,
  onDragEnd,
}: Step2AddLessonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-1">
          Organize Your Module into Lessons
        </h3>
        <p className="text-sm text-blue-700">
          Break down your training module into manageable lessons. Each lesson
          can contain detailed content and learning materials.
        </p>
      </div>

      {lessons.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            No Lessons Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start building your module by adding your first lesson
          </p>
          <button
            onClick={onAddLesson}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg cursor-pointer font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Add First Lesson
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isExpanded={expandedLesson === lesson.id}
              isDragging={draggedLesson === lesson.id}
              moduleTitle={moduleTitle}
              onToggle={() => onToggleLesson(lesson.id)}
              onDragStart={() => onDragStart(lesson.id)}
              onDragOver={(e) => onDragOver(e, lesson.id)}
              onDragEnd={onDragEnd}
              onRemove={() => onRemoveLesson(lesson.id)}
              onUpdate={(field, value) =>
                onUpdateLesson(lesson.id, field, value)
              }
            />
          ))}

          <button
            onClick={onAddLesson}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Another Lesson
          </button>
        </div>
      )}

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <h4 className="font-semibold text-amber-900 mb-1">Pro Tip</h4>
        <p className="text-sm text-amber-700">
          Drag lessons to reorder them. Use descriptive lesson titles like
          "Lesson 1.1.1 Introduction to Sales".
        </p>
      </div>
    </motion.div>
  );
}
