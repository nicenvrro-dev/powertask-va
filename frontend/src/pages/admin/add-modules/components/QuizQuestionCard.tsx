import { Trash2 } from "lucide-react";
import type {
  QuizQuestion,
  QuizQuestionFieldValue,
} from "../types/add-module.type";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  index: number;
  onRemove: () => void;
  onUpdate: (field: keyof QuizQuestion, value: QuizQuestionFieldValue) => void;
  onUpdateOption: (optionIndex: number, value: string) => void;
}

export default function QuizQuestionCard({
  question,
  index,
  onRemove,
  onUpdate,
  onUpdateOption,
}: QuizQuestionCardProps) {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as "multiple-choice" | "true-false";
    // Parent handler will automatically update options and correctAnswer
    onUpdate("type", newType);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">
          Quiz #{index + 1}
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
            placeholder="Enter your quiz question..."
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question Type <span className="text-red-500">*</span>
            </label>
            <select
              value={question.type}
              onChange={handleTypeChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Points <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={question.points}
              onChange={(e) => onUpdate("points", e.target.value)}
              placeholder="e.g., 10"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Answer Options <span className="text-red-500">*</span>
          </label>

          {question.type === "multiple-choice" ? (
            <div className="space-y-3">
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={question.correctAnswer === option && option !== ""}
                    onChange={() => onUpdate("correctAnswer", option)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-700 w-16">
                    Option {String.fromCharCode(65 + optIndex)}:
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => onUpdateOption(optIndex, e.target.value)}
                    placeholder={`Enter option ${String.fromCharCode(
                      65 + optIndex
                    )}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              ))}
              <p className="text-xs text-gray-500 mt-2">
                Select the radio button next to the correct answer
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={question.correctAnswer === "True"}
                  onChange={() => onUpdate("correctAnswer", "True")}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-semibold text-gray-700 px-4 py-2 bg-white border border-gray-300 rounded-lg flex-1">
                  True
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={question.correctAnswer === "False"}
                  onChange={() => onUpdate("correctAnswer", "False")}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-semibold text-gray-700 px-4 py-2 bg-white border border-gray-300 rounded-lg flex-1">
                  False
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Select the correct answer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
