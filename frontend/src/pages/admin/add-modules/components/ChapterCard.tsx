import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Clock, GripVertical, Plus, Trash2 } from "lucide-react";
import type { Chapter, ChapterFieldValue } from "../types/add-module.type";

interface ChapterCardProps {
  chapter: Chapter;
  isExpanded: boolean;
  isDragging: boolean;
  moduleTitle: string;
  onToggle: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onRemove: () => void;
  onUpdate: (field: keyof Chapter, value: ChapterFieldValue) => void;
  onAddContentSection: () => void;
  onRemoveContentSection: (sectionId: string) => void;
  onUpdateContentSection: (sectionId: string, content: string) => void;
}

export default function ChapterCard({
  chapter,
  isExpanded,
  isDragging,
  moduleTitle,
  onToggle,
  onDragStart,
  onDragOver,
  onDragEnd,
  onRemove,
  onUpdate,
  onAddContentSection,
  onRemoveContentSection,
  onUpdateContentSection,
}: ChapterCardProps) {
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
        className="flex items-center gap-4 p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
        onClick={onToggle}
      >
        <div className="cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {chapter.order}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 truncate">
            {chapter.title || `Chapter ${chapter.order}`}
          </h4>
          <p className="text-sm text-gray-500 truncate">
            {chapter.description || "No description yet"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {chapter.duration && (
            <div className="flex items-center gap-1 text-sm text-gray-600 bg-white px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>{chapter.duration} min</span>
            </div>
          )}
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
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chapter Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={chapter.title}
                    onChange={(e) => onUpdate("title", e.target.value)}
                    placeholder={`e.g., Introduction to ${moduleTitle || "the Topic"}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description / Objective <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={chapter.description}
                    onChange={(e) => onUpdate("description", e.target.value)}
                    placeholder="What will learners accomplish in this chapter?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={chapter.duration}
                    onChange={(e) => onUpdate("duration", e.target.value)}
                    placeholder="e.g., 30"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={chapter.order}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Drag to reorder chapters</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prerequisites (Optional)
                  </label>
                  <textarea
                    value={chapter.prerequisites}
                    onChange={(e) => onUpdate("prerequisites", e.target.value)}
                    placeholder="Any specific knowledge or previous chapters required..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-800">Content Sections</h4>
                  <button
                    onClick={onAddContentSection}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg cursor-pointer hover:bg-emerald-200 transition-all flex items-center gap-2 text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Text Block
                  </button>
                </div>

                <div className="space-y-4">
                  {chapter.contentSections.map((section, sectionIndex) => (
                    <div
                      key={section.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                            Text Block {sectionIndex + 1}
                          </span>
                        </div>
                        {chapter.contentSections.length > 1 && (
                          <button
                            onClick={() => onRemoveContentSection(section.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <textarea
                        value={section.content}
                        onChange={(e) => onUpdateContentSection(section.id, e.target.value)}
                        placeholder="Enter your content here... You can add multiple text blocks to organize your chapter content."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Rich text editor will be available in future updates. For now, use plain
                        text formatting.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
