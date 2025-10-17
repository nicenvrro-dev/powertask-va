import { Save, ArrowRight, ArrowLeft } from "lucide-react";

interface ModalFooterProps {
  currentStep: number;
  onCancel: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
  onPublish: () => void;
}

export default function ModalFooter({
  currentStep,
  onCancel,
  onBack,
  onSaveDraft,
  onNext,
  onPublish,
}: ModalFooterProps) {
  return (
    <div className="border-t bg-gray-50 px-6 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg cursor-pointer font-semibold hover:bg-gray-100 transition-all"
        >
          Cancel
        </button>
        {currentStep > 1 && (
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg cursor-pointer font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSaveDraft}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg cursor-pointer font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Draft
        </button>
        {currentStep < 4 ? (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg cursor-pointer font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Next Step
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onPublish}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg cursor-pointer font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>✓</span>
            Publish Module
          </button>
        )}
      </div>
    </div>
  );
}
