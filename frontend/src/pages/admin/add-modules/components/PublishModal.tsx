import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";

interface PublishModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function PublishModal({ isOpen, onCancel, onConfirm }: PublishModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[70] w-full max-w-md p-6"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Publish Training Module?</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to publish this module? Once published, it will be visible to all
            assigned users.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg cursor-pointer font-semibold hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-[#1A3D2D] hover:bg-green-900 text-white rounded-lg cursor-pointer font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              Yes, Publish
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
