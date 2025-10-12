import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, Clock, Star, BookOpen, Play, CheckCircle, Lock } from "lucide-react";
import {
  getModulesByCategory,
  getCategoryLabel,
  getCategoryDescription,
} from "../../../data/training-modules.data";
import type { TrainingModule } from "../../../data/training-modules.data";

import ModuleLearning from "./ModuleTraining";

interface TrainingProps {
  selectedCategory: "sales" | "admin" | "customer";
}

export default function Training({ selectedCategory }: TrainingProps) {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const modules = getModulesByCategory(selectedCategory);
  const categoryLabel = getCategoryLabel(selectedCategory);
  const categoryDescription = getCategoryDescription(selectedCategory);

  const totalModules = modules.length;
  const completedModules = modules.filter((m) => m.status === "completed").length;
  const remainingModules = totalModules - completedModules;
  const overallProgress =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  const getCategoryColors = () => {
    switch (selectedCategory) {
      case "sales":
        return {
          gradient: "from-emerald-500 to-teal-500",
          text: "text-emerald-600",
          bg: "bg-emerald-100",
          border: "border-emerald-500",
          progress: "bg-emerald-500",
        };
      case "admin":
        return {
          gradient: "from-blue-500 to-indigo-500",
          text: "text-blue-600",
          bg: "bg-blue-100",
          border: "border-blue-500",
          progress: "bg-blue-500",
        };
      case "customer":
        return {
          gradient: "from-orange-500 to-amber-500",
          text: "text-orange-600",
          bg: "bg-orange-100",
          border: "border-orange-500",
          progress: "bg-orange-500",
        };
    }
  };

  const colors = getCategoryColors();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-green-100 text-green-700";
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-700";
      case "ADVANCED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-300 text-gray-700";
    if (progress === 100) return "bg-green-500 text-white";
    return "bg-orange-500 text-white";
  };

  const handleStartModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };

  const handleBackToOverview = () => {
    setActiveModuleId(null);
  };

  // If a module is active, show the learning interface
  if (activeModuleId) {
    return (
      <ModuleLearning
        selectedCategory={selectedCategory}
        moduleId={activeModuleId}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-8 md:p-10 shadow-xl mb-8`}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-10 h-10 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">{categoryLabel}</h1>
          </div>
          <p className="text-white text-lg mb-6">{categoryDescription}</p>

          <div className="bg-white bg-opacity-20 rounded-xl p-1 mb-3">
            <div
              className="bg-white rounded-lg h-3 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-white text-sm font-medium">
            Overall Progress: {overallProgress}% ({completedModules}/{totalModules} modules
            completed)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className={`text-4xl font-bold ${colors.text} mb-2`}>{totalModules}</div>
            <div className="text-gray-600 font-medium">Total Modules</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{completedModules}</div>
            <div className="text-gray-600 font-medium">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className={`text-4xl font-bold ${colors.text} mb-2`}>{remainingModules}</div>
            <div className="text-gray-600 font-medium">Remaining</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{overallProgress}%</div>
            <div className="text-gray-600 font-medium">Progress</div>
          </div>
        </motion.div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Training Modules</h2>
          <p className="text-gray-600 mt-1">Continue your learning journey</p>
        </div>

        <div className="space-y-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              index={index}
              colors={colors}
              getLevelColor={getLevelColor}
              getProgressColor={getProgressColor}
              onStartModule={handleStartModule}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ModuleCardProps {
  module: TrainingModule;
  index: number;
  colors: {
    gradient: string;
    text: string;
    bg: string;
    border: string;
    progress: string;
  };
  getLevelColor: (level: string) => string;
  getProgressColor: (progress: number) => string;
  onStartModule: (moduleId: string) => void;
}

function ModuleCard({
  module,
  index,
  colors,
  getLevelColor,
  getProgressColor,
  onStartModule,
}: ModuleCardProps) {
  const completedChapters = module.chapters.filter((ch) => ch.completed).length;
  const totalChapters = module.chapters.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h3>
            <p className="text-gray-600 leading-relaxed">{module.description}</p>
          </div>
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg ml-4 flex-shrink-0 ${getProgressColor(
              module.progress
            )}`}
          >
            {module.progress}%
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6 flex-wrap">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-medium">{module.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="w-5 h-5" />
            <span className="font-medium">{module.points} points</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
              module.level
            )}`}
          >
            {module.level}
          </span>
        </div>

        {module.prerequisites && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded mb-6">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Prerequisites:</span> {module.prerequisites}
            </p>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-800">Topics Covered:</h4>
            <span className="text-sm text-gray-500">
              {completedChapters}/{totalChapters} completed
            </span>
          </div>
          <div className="space-y-2">
            {module.chapters.slice(0, 4).map((chapter) => (
              <div
                key={chapter.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  chapter.completed
                    ? "bg-green-50 border border-green-200"
                    : chapter.locked
                    ? "bg-gray-50 border border-gray-200"
                    : "bg-blue-50 border border-blue-200"
                }`}
              >
                <div className="flex-shrink-0">
                  {chapter.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : chapter.locked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      chapter.locked ? "text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {chapter.title}
                  </p>
                  {chapter.description && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">{chapter.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-500">{chapter.duration}min</span>
                  <span className="text-xs text-gray-500">{chapter.points}pts</span>
                </div>
              </div>
            ))}
            {module.chapters.length > 4 && (
              <div className="text-center">
                <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                  + {module.chapters.length - 4} more topics
                </button>
              </div>
            )}
          </div>
        </div>

        <motion.button
          onClick={() => onStartModule(module.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-gradient-to-r ${colors.gradient} text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300`}
        >
          <Play className="w-5 h-5" />
          <span>{module.progress > 0 ? "Continue Learning" : "Start Module"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
