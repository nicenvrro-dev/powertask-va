import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock } from "lucide-react";

export default function RecentActivitiesCard() {
  const recentActivities = [
    {
      title: "Started Sales Module",
      time: "2 hours ago",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Completed Introduction",
      time: "1 day ago",
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Enrolled in Training",
      time: "2 days ago",
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-6">
        <h2 className="text-xl font-bold text-white">Recent Activities</h2>
      </div>

      <div className="p-6">
        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">
                    {activity.title}
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No recent activities</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
