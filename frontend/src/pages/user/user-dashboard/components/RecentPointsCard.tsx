import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";

export default function RecentPointsCard() {
  const recentPoints = [
    { date: "Oct 9, 2025", points: 10, description: "Completed module", icon: Star },
    { date: "Oct 8, 2025", points: 15, description: "Quiz passed", icon: Trophy },
    { date: "Oct 7, 2025", points: 20, description: "Perfect score", icon: Star },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-6">
        <h2 className="text-xl font-bold text-white">Recent Points</h2>
      </div>

      <div className="p-6">
        {recentPoints.length > 0 ? (
          <div className="space-y-4">
            {recentPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">
                    {item.description}
                  </div>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <div className="text-lg font-bold text-indigo-600">+{item.points}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No points earned yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
