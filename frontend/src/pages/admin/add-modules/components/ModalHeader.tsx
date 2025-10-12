import { X } from "lucide-react";

interface ModalHeaderProps {
  currentStep: number;
  onClose: () => void;
}

const stepTitles = ["Module Information", "Add Chapters", "Q&A & Quizzes", "Review & Publish"];

export default function ModalHeader({ currentStep, onClose }: ModalHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 md:px-8 py-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Create New Training Module</h2>
        <p className="text-emerald-50 text-sm mt-1">
          Step {currentStep} of 4 — {stepTitles[currentStep - 1]}
        </p>
      </div>
      <button
        onClick={onClose}
        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg cursor-pointer flex items-center justify-center transition-all"
      >
        <X className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
