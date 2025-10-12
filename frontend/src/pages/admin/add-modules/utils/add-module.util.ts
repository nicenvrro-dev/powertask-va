import type { Chapter } from "../types/add-module.type";

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

export const calculateTotalDuration = (chapters: Chapter[]): number => {
  return chapters.reduce((total, chapter) => {
    const duration = parseInt(chapter.duration) || 0;
    return total + duration;
  }, 0);
};

export const getTotalQACount = (chapters: Chapter[]): number => {
  return chapters.reduce((total, chapter) => {
    return total + (chapter.qaQuestions?.length || 0);
  }, 0);
};

export const getTotalQuizCount = (chapters: Chapter[]): number => {
  return chapters.reduce((total, chapter) => {
    return total + (chapter.quizQuestions?.length || 0);
  }, 0);
};
