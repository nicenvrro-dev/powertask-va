import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export default function TrainingProgressCard() {
  const progressData = [
    {
      title: "Introduction to Sales",
      lastAccessed: "Aug 6, 2025",
      progress: 25,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-br from-[#5c72e0] to-[#6952ad] p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Training Progress</h2>
        <button className="px-5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 font-medium">
          <Eye className="w-4 h-4" />
          View All
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
              className="text-5xl md:text-6xl font-bold text-indigo-600 mb-2"
            >
              25%
            </motion.div>
            <div className="text-gray-500 font-medium">Average Progress</div>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
              className="text-5xl md:text-6xl font-bold text-indigo-600 mb-2"
            >
              1
            </motion.div>
            <div className="text-gray-500 font-medium">Total Modules</div>
          </div>
        </div>

        <div className="space-y-6">
          {progressData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">Last accessed: {item.lastAccessed}</p>
                </div>
                <div className="text-2xl font-bold text-indigo-600">{item.progress}%</div>
              </div>
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 1.2 + index * 0.1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
