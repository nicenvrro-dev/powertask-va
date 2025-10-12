import { ArrowRight, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  modules: number;
  estimatedTime: string;
  buttonColor: string;
  buttonHoverColor: string;
  onStartLearning?: () => void;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  modules,
  estimatedTime,
  buttonColor,
  buttonHoverColor,
  onStartLearning,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-6`}
      >
        <Icon className={`w-8 h-8 text-white`} strokeWidth={2.5} />
      </motion.div>

      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{title}</h3>

      <p className="text-gray-600 leading-relaxed mb-8 min-h-[60px]">{description}</p>

      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
        <div className="text-center">
          <div className={`text-3xl font-bold ${iconColor} mb-1`}>{modules}</div>
          <div className="text-sm text-gray-500 font-medium">Modules</div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${iconColor} mb-1`}>{estimatedTime}</div>
          <div className="text-sm text-gray-500 font-medium">Est. Time</div>
        </div>
      </div>

      <motion.button
        onClick={onStartLearning}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full ${buttonColor} hover:${buttonHoverColor} text-white font-semibold py-4 px-6 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg`}
      >
        <ArrowRight className="w-5 h-5" />
        <span>Start Learning</span>
      </motion.button>
    </motion.div>
  );
}
