import { Trash2 } from "lucide-react";
import type {
  QAQuestion,
  QAQuestionFieldValue,
} from "../types/add-module.type";

interface QAQuestionCardProps {
  question: QAQuestion;
  index: number;
  onRemove: () => void;
  onUpdate: (field: keyof QAQuestion, value: QAQuestionFieldValue) => void;
}

export default function QAQuestionCard({
  question,
  index,
  onRemove,
  onUpdate,
}: QAQuestionCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
          Q&A #{index + 1}
        </span>
        <button
          onClick={onRemove}
          className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Question <span className="text-red-500">*</span>
          </label>
          <textarea
            value={question.question}
            onChange={(e) => onUpdate("question", e.target.value)}
            placeholder="Enter your reflective question..."
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Answer Type <span className="text-red-500">*</span>
            </label>
            <select
              value={question.answerType}
              onChange={(e) => onUpdate("answerType", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="short">Short Answer</option>
              <option value="paragraph">Paragraph</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Points (Optional)
            </label>
            <input
              type="number"
              value={question.points}
              onChange={(e) => onUpdate("points", e.target.value)}
              placeholder="e.g., 5"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
