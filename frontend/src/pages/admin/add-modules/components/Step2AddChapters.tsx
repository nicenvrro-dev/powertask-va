import { motion } from "framer-motion";
import { Plus, BookOpen } from "lucide-react";
import type { Chapter, ChapterFieldValue } from "../types/add-module.type";
import ChapterCard from "./ChapterCard";

interface Step2AddChaptersProps {
  chapters: Chapter[];
  expandedChapter: string | null;
  draggedChapter: string | null;
  moduleTitle: string;
  onAddChapter: () => void;
  onRemoveChapter: (chapterId: string) => void;
  onUpdateChapter: (chapterId: string, field: keyof Chapter, value: ChapterFieldValue) => void;
  onToggleChapter: (chapterId: string) => void;
  onDragStart: (chapterId: string) => void;
  onDragOver: (e: React.DragEvent, targetChapterId: string) => void;
  onDragEnd: () => void;
  onAddContentSection: (chapterId: string) => void;
  onRemoveContentSection: (chapterId: string, sectionId: string) => void;
  onUpdateContentSection: (chapterId: string, sectionId: string, content: string) => void;
}

export default function Step2AddChapters({
  chapters,
  expandedChapter,
  draggedChapter,
  moduleTitle,
  onAddChapter,
  onRemoveChapter,
  onUpdateChapter,
  onToggleChapter,
  onDragStart,
  onDragOver,
  onDragEnd,
  onAddContentSection,
  onRemoveContentSection,
  onUpdateContentSection,
}: Step2AddChaptersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-1">Organize Your Module into Chapters</h3>
        <p className="text-sm text-blue-700">
          Break down your training module into manageable chapters. Each chapter can contain
          multiple content sections with text, media, and interactive elements.
        </p>
      </div>

      {chapters.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-700 mb-2">No Chapters Yet</h3>
          <p className="text-gray-500 mb-6">
            Start building your module by adding your first chapter
          </p>
          <button
            onClick={onAddChapter}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg cursor-pointer font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Add First Chapter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              isExpanded={expandedChapter === chapter.id}
              isDragging={draggedChapter === chapter.id}
              moduleTitle={moduleTitle}
              onToggle={() => onToggleChapter(chapter.id)}
              onDragStart={() => onDragStart(chapter.id)}
              onDragOver={(e) => onDragOver(e, chapter.id)}
              onDragEnd={onDragEnd}
              onRemove={() => onRemoveChapter(chapter.id)}
              onUpdate={(field, value) => onUpdateChapter(chapter.id, field, value)}
              onAddContentSection={() => onAddContentSection(chapter.id)}
              onRemoveContentSection={(sectionId) => onRemoveContentSection(chapter.id, sectionId)}
              onUpdateContentSection={(sectionId, content) =>
                onUpdateContentSection(chapter.id, sectionId, content)
              }
            />
          ))}

          <button
            onClick={onAddChapter}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Another Chapter
          </button>
        </div>
      )}

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <h4 className="font-semibold text-amber-900 mb-1">Pro Tip</h4>
        <p className="text-sm text-amber-700">
          Drag chapters to reorder them. Each chapter can have multiple content sections for better
          organization.
        </p>
      </div>
    </motion.div>
  );
}
