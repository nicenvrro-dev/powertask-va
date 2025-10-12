import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import type { ModuleFormData } from "../types/add-module.type";
import { getCategoryLabel } from "../utils/add-module.util";

interface Step1ModuleInfoProps {
  formData: ModuleFormData;
  onUpdate: (data: Partial<ModuleFormData>) => void;
  onAddObjective: () => void;
  onRemoveObjective: (index: number) => void;
  onObjectiveChange: (index: number, value: string) => void;
}

export default function Step1ModuleInfo({
  formData,
  onUpdate,
  onAddObjective,
  onRemoveObjective,
  onObjectiveChange,
}: Step1ModuleInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-1">Module Information</h3>
        <p className="text-sm text-blue-700">
          Start by providing basic information about your training module. This will help learners
          understand what to expect.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Module Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g., Advanced Sales Techniques"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.shortDescription}
            onChange={(e) => onUpdate({ shortDescription: e.target.value })}
            placeholder="Brief one-line description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.detailedDescription}
            onChange={(e) => onUpdate({ detailedDescription: e.target.value })}
            placeholder="Provide a comprehensive overview of what this module covers..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={getCategoryLabel(formData.category)}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Level <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.level}
            onChange={(e) => onUpdate({ level: e.target.value as ModuleFormData["level"] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estimated Duration (minutes) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => onUpdate({ duration: e.target.value })}
            placeholder="e.g., 60"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => onUpdate({ status: e.target.value as ModuleFormData["status"] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
          >
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prerequisites (Optional)
          </label>
          <textarea
            value={formData.prerequisites}
            onChange={(e) => onUpdate({ prerequisites: e.target.value })}
            placeholder="List any skills or knowledge required before taking this module..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Learning Objectives <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {formData.learningObjectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => onObjectiveChange(index, e.target.value)}
                  placeholder={`Learning objective ${index + 1}`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                {formData.learningObjectives.length > 1 && (
                  <button
                    onClick={() => onRemoveObjective(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {formData.learningObjectives.length < 5 && (
            <button
              onClick={onAddObjective}
              className="mt-3 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg cursor-pointer hover:bg-emerald-200 transition-all flex items-center gap-2 text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Learning Objective
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags / Keywords (Optional)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => onUpdate({ tags: e.target.value })}
            placeholder="e.g., communication, negotiation, closing"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Language (Optional)
          </label>
          <select
            value={formData.language}
            onChange={(e) => onUpdate({ language: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Mandarin">Mandarin</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
