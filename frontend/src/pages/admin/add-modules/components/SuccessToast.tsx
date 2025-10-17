import { motion } from "framer-motion";

interface SuccessToastProps {
  isVisible: boolean;
}

export default function SuccessToast({ isVisible }: SuccessToastProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl z-[80] flex items-center gap-3"
    >
      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <span className="text-2xl">🎉</span>
      </div>
      <div>
        <p className="font-bold text-lg">Module Published Successfully!</p>
        <p className="text-sm text-green-100">
          Your training module is now live
        </p>
      </div>
    </motion.div>
  );
}
