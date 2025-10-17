import type { Lesson } from "../types/add-module.type";

export const getCategoryLabel = (category: string): string => {
  switch (category) {
    case "sales":
      return "Sales & Lead Generation";
    case "admin":
      return "Administrative Support";
    case "customer":
      return "Customer Service";
    default:
      return category;
  }
};

export const calculateTotalDuration = (lessons: Lesson[]): number => {
  return lessons.reduce((total, lesson) => {
    const duration = parseInt(lesson.duration) || 0;
    return total + duration;
  }, 0);
};

export const getTotalQACount = (lessons: Lesson[]): number => {
  return lessons.reduce((total, lesson) => {
    return total + (lesson.qaQuestions?.length || 0);
  }, 0);
};

export const getTotalQuizCount = (lessons: Lesson[]): number => {
  return lessons.reduce((total, lesson) => {
    return total + (lesson.quizQuestions?.length || 0);
  }, 0);
};
