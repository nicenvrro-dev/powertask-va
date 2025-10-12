import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Lock,
  Award,
  ArrowLeft,
} from "lucide-react";
import { getModulesByCategory, getCategoryLabel } from "../../../data/training-modules.data";
import type { TrainingChapter } from "../../../data/training-modules.data";

interface ModuleLearningProps {
  selectedCategory: "sales" | "admin" | "customer";
  moduleId: string;
  onBack: () => void;
}

interface ChapterProgress {
  [key: string]: {
    completed: boolean;
    contentViewed: boolean;
    qaAnswers: { [questionId: string]: string };
    quizAnswers: { [questionId: string]: string };
  };
}

export default function ModuleLearning({
  selectedCategory,
  moduleId,
  onBack,
}: ModuleLearningProps) {
  const modules = getModulesByCategory(selectedCategory);
  const module = modules.find((m) => m.id === moduleId);
  const categoryLabel = getCategoryLabel(selectedCategory);

  const [expandedModules, setExpandedModules] = useState<string[]>([moduleId]);
  const [activeChapter, setActiveChapter] = useState<string | null>(
    module?.chapters[0]?.id || null
  );
  const [chapterProgress, setChapterProgress] = useState<ChapterProgress>({});
  const [totalPoints] = useState(70);

  if (!module) {
    return <div>Module not found</div>;
  }

  const getCategoryColors = () => {
    switch (selectedCategory) {
      case "sales":
        return {
          gradient: "from-emerald-500 to-teal-500",
          bg: "bg-emerald-500",
          text: "text-emerald-600",
          hover: "hover:bg-emerald-600",
        };
      case "admin":
        return {
          gradient: "from-blue-500 to-indigo-500",
          bg: "bg-blue-500",
          text: "text-blue-600",
          hover: "hover:bg-blue-600",
        };
      case "customer":
        return {
          gradient: "from-orange-500 to-amber-500",
          bg: "bg-orange-500",
          text: "text-orange-600",
          hover: "hover:bg-orange-600",
        };
    }
  };

  const colors = getCategoryColors();

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const handleChapterClick = (chapterId: string, locked: boolean) => {
    if (locked) return;
    setActiveChapter(chapterId);
  };

  const handleQAAnswer = (chapterId: string, questionId: string, answer: string) => {
    setChapterProgress((prev) => ({
      ...prev,
      [chapterId]: {
        ...prev[chapterId],
        qaAnswers: {
          ...prev[chapterId]?.qaAnswers,
          [questionId]: answer,
        },
      },
    }));
  };

  const handleQuizAnswer = (chapterId: string, questionId: string, answer: string) => {
    setChapterProgress((prev) => ({
      ...prev,
      [chapterId]: {
        ...prev[chapterId],
        quizAnswers: {
          ...prev[chapterId]?.quizAnswers,
          [questionId]: answer,
        },
      },
    }));
  };

  const handleSubmitAnswer = (chapterId: string, type: "qa" | "quiz") => {
    console.log(`Submitted ${type} answers for chapter ${chapterId}`, chapterProgress[chapterId]);
    // Here you would typically send this to your backend/Supabase
  };

  const activeChapterData = module.chapters.find((ch) => ch.id === activeChapter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Sidebar - Module Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-gray-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Training</span>
          </button>
          <h2 className="text-xl font-bold mb-1">{categoryLabel}</h2>
          <p className="text-sm text-white text-opacity-90">Interactive Learning Modules</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Current Module */}
          <div className="mb-4">
            <button
              onClick={() => toggleModule(module.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${colors.bg} text-white transition-all`}
            >
              <span className="font-semibold">Module 1</span>
              {expandedModules.includes(module.id) ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence>
              {expandedModules.includes(module.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 space-y-1"
                >
                  {module.chapters.map((chapter) => {
                    const isActive = activeChapter === chapter.id;
                    const isCompleted = chapterProgress[chapter.id]?.completed || chapter.completed;

                    return (
                      <button
                        key={chapter.id}
                        onClick={() => handleChapterClick(chapter.id, chapter.locked)}
                        disabled={chapter.locked}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                          isActive
                            ? `${colors.bg} text-white`
                            : chapter.locked
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {chapter.locked ? (
                            <Lock className="w-4 h-4" />
                          ) : isCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{chapter.title}</div>
                          <div
                            className={`text-xs mt-0.5 ${
                              isActive ? "text-white text-opacity-80" : "text-gray-500"
                            }`}
                          >
                            {chapter.duration}min
                          </div>
                        </div>
                        {isCompleted && !chapter.locked && (
                          <div
                            className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                              isActive
                                ? "bg-white bg-opacity-20 text-white"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            Done
                          </div>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Modules (Locked) */}
          <div className="mb-4">
            <button
              className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
              disabled
            >
              <span className="font-semibold">Module 2</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
              <span className="text-white font-bold">👤</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {activeChapterData?.title || "Select a chapter"}
              </h3>
              {activeChapterData && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {chapterProgress[activeChapterData.id]?.completed ||
                  activeChapterData.completed ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  ) : (
                    <span className="text-gray-500">In Progress</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-full font-semibold shadow-lg`}
          >
            <Award className="w-5 h-5" />
            <span>{totalPoints} Points</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeChapterData ? (
            <ChapterContent
              chapter={activeChapterData}
              colors={colors}
              progress={
                chapterProgress[activeChapterData.id] || {
                  completed: false,
                  contentViewed: false,
                  qaAnswers: {},
                  quizAnswers: {},
                }
              }
              onQAAnswer={handleQAAnswer}
              onQuizAnswer={handleQuizAnswer}
              onSubmitAnswer={handleSubmitAnswer}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">Select a chapter to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ChapterContentProps {
  chapter: TrainingChapter;
  colors: {
    gradient: string;
    bg: string;
    text: string;
    hover: string;
  };
  progress: {
    completed: boolean;
    contentViewed: boolean;
    qaAnswers: { [questionId: string]: string };
    quizAnswers: { [questionId: string]: string };
  };
  onQAAnswer: (chapterId: string, questionId: string, answer: string) => void;
  onQuizAnswer: (chapterId: string, questionId: string, answer: string) => void;
  onSubmitAnswer: (chapterId: string, type: "qa" | "quiz") => void;
}

function ChapterContent({
  chapter,
  colors,
  progress,
  onQAAnswer,
  onQuizAnswer,
  onSubmitAnswer,
}: ChapterContentProps) {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  // Mock content data
  const getChapterContent = () => {
    if (chapter.title.includes("Test") || chapter.title.includes("What is Sales")) {
      return `Sales is the process of selling products or services to customers. It's not just about closing deals, but building relationships and understanding customer needs.

Key aspects of sales include:
• Identifying potential customers
• Understanding their pain points
• Presenting solutions
• Building trust and rapport
• Closing deals effectively

Sales professionals must be excellent communicators, problem solvers, and relationship builders.`;
    } else if (chapter.title.includes("Key Components")) {
      return `The key components of successful sales include:

1. Product Knowledge - Understanding what you're selling inside and out
2. Customer Understanding - Knowing your target audience and their needs
3. Communication Skills - Clearly articulating value propositions
4. Active Listening - Truly hearing what customers are saying
5. Problem Solving - Addressing customer pain points effectively
6. Relationship Building - Creating long-term customer connections

Each component is essential for sales success.`;
    } else if (chapter.title.includes("Sales Process")) {
      return `The sales process is a systematic approach to selling:

1. Prospecting - Finding potential customers
2. Qualifying - Determining if they're a good fit
3. Presenting - Showing your solution
4. Handling objections - Addressing concerns
5. Closing - Finalizing the deal
6. Follow-up - Maintaining the relationship

Understanding and following this process increases your success rate significantly.`;
    }

    return (
      chapter.description || "This chapter covers important concepts for your learning journey."
    );
  };

  // Mock Q&A questions
  const getQAQuestions = () => {
    if (chapter.title.includes("Test") || chapter.title.includes("What is Sales")) {
      return [
        {
          id: "qa-1",
          question: "What is the main concept we discussed?",
          answerType: "paragraph" as const,
          placeholder: "Answer in full English sentences (min 8 words)",
        },
      ];
    } else if (chapter.title.includes("Sales Process")) {
      return [
        {
          id: "qa-2",
          question: "What did you learn from this section? Please share your thoughts.",
          answerType: "paragraph" as const,
          placeholder: "Answer in full English sentences (min 8 words)",
        },
      ];
    }
    return [];
  };

  // Mock Quiz questions
  const getQuizQuestions = () => {
    if (chapter.title.includes("Test") || chapter.title.includes("What is Sales")) {
      return [
        {
          id: "quiz-1",
          question: "What is the primary purpose of sales?",
          options: [
            "Making money quickly",
            "Building relationships and solving customer problems",
            "Convincing people to buy",
            "Reaching sales targets",
          ],
          correctAnswer: "Building relationships and solving customer problems",
        },
        {
          id: "quiz-2",
          question: "Which skill is most important in sales?",
          options: ["Product knowledge", "Communication", "All of the above", "Closing techniques"],
          correctAnswer: "All of the above",
        },
      ];
    }
    return [];
  };

  const qaQuestions = getQAQuestions();
  const quizQuestions = getQuizQuestions();

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Content Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center text-white flex-shrink-0`}
            >
              👤
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">{chapter.title}:</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {getChapterContent()}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-4">{getCurrentTime()}</div>
        </div>
      </motion.div>

      {/* Q&A Section */}
      {qaQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {qaQuestions.map((qa, index) => (
            <div key={qa.id} className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0">
                  ❓
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Question {index + 1}: {qa.question}
                  </h4>
                  <textarea
                    value={progress.qaAnswers[qa.id] || ""}
                    onChange={(e) => onQAAnswer(chapter.id, qa.id, e.target.value)}
                    placeholder={qa.placeholder}
                    className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none bg-white"
                    rows={4}
                  />
                  <button
                    onClick={() => onSubmitAnswer(chapter.id, "qa")}
                    className={`mt-3 px-6 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-lg font-semibold ${colors.hover} transition-all shadow-md hover:shadow-lg`}
                  >
                    Submit Answer
                  </button>
                  <p className="text-xs text-amber-700 mt-2">{qa.placeholder}</p>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-4">{getCurrentTime()}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Quiz Section */}
      {quizQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          {quizQuestions.map((quiz, index) => (
            <div key={quiz.id} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                  📝
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Quiz {index + 1}: {quiz.question}
                  </h4>
                  <div className="space-y-2">
                    {quiz.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          progress.quizAnswers[quiz.id] === option
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={quiz.id}
                          value={option}
                          checked={progress.quizAnswers[quiz.id] === option}
                          onChange={(e) => onQuizAnswer(chapter.id, quiz.id, e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => onSubmitAnswer(chapter.id, "quiz")}
            className={`px-6 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-lg font-semibold ${colors.hover} transition-all shadow-md hover:shadow-lg`}
          >
            Submit Quiz
          </button>
        </motion.div>
      )}
    </div>
  );
}
