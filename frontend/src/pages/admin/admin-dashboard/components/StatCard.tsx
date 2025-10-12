import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color: string;
  bgColor: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color, bgColor, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${color}`} strokeWidth={2.5} />
        </div>
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-2">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </motion.div>
  );
};

export default StatCard;
