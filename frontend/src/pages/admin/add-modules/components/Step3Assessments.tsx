import { motion } from "framer-motion";
import { FileQuestion, ArrowLeft } from "lucide-react";
import type {
  Lesson,
  QAQuestion,
  QuizQuestion,
  QAQuestionFieldValue,
  QuizQuestionFieldValue,
} from "../types/add-module.type";
import AssessmentLessonCard from "./AssessmentLessonCard";

interface Step3AssessmentsProps {
  lessons: Lesson[];
  expandedLesson: string | null;
  onToggleLesson: (lessonId: string) => void;
  onAddQA: (lessonId: string) => void;
  onRemoveQA: (lessonId: string, questionId: string) => void;
  onUpdateQA: (
    lessonId: string,
    questionId: string,
    field: keyof QAQuestion,
    value: QAQuestionFieldValue
  ) => void;
  onAddQuiz: (lessonId: string) => void;
  onRemoveQuiz: (lessonId: string, questionId: string) => void;
  onUpdateQuiz: (
    lessonId: string,
    questionId: string,
    field: keyof QuizQuestion,
    value: QuizQuestionFieldValue
  ) => void;
  onUpdateQuizOption: (
    lessonId: string,
    questionId: string,
    optionIndex: number,
    value: string
  ) => void;
  onBack: () => void;
}

export default function Step3Assessments({
  lessons,
  expandedLesson,
  onToggleLesson,
  onAddQA,
  onRemoveQA,
  onUpdateQA,
  onAddQuiz,
  onRemoveQuiz,
  onUpdateQuiz,
  onUpdateQuizOption,
  onBack,
}: Step3AssessmentsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-1">
          Add Quiz Questions & Q&A to Your Lessons
        </h3>
        <p className="text-sm text-blue-700">
          Create quiz questions and reflective Q&A for each lesson to test
          learner comprehension and reinforce key concepts.
        </p>
      </div>

      {lessons.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            No Lessons Available
          </h3>
          <p className="text-gray-500 mb-6">
            Please add lessons in Step 2 before creating assessments
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back to Add Lessons
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <AssessmentLessonCard
              key={lesson.id}
              lesson={lesson}
              isExpanded={expandedLesson === lesson.id}
              onToggle={() => onToggleLesson(lesson.id)}
              onAddQA={() => onAddQA(lesson.id)}
              onRemoveQA={(questionId) => onRemoveQA(lesson.id, questionId)}
              onUpdateQA={(questionId, field, value) =>
                onUpdateQA(lesson.id, questionId, field, value)
              }
              onAddQuiz={() => onAddQuiz(lesson.id)}
              onRemoveQuiz={(questionId) => onRemoveQuiz(lesson.id, questionId)}
              onUpdateQuiz={(questionId, field, value) =>
                onUpdateQuiz(lesson.id, questionId, field, value)
              }
              onUpdateQuizOption={(questionId, optIndex, value) =>
                onUpdateQuizOption(lesson.id, questionId, optIndex, value)
              }
            />
          ))}
        </div>
      )}

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <h4 className="font-semibold text-amber-900 mb-1">Assessment Tips</h4>
        <p className="text-sm text-amber-700">
          Q&A questions encourage reflection and deeper understanding. Quiz
          questions provide measurable assessment of knowledge retention.
        </p>
      </div>
    </motion.div>
  );
}
