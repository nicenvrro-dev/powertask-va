import { motion } from "framer-motion";
import { Trophy, GraduationCap, TrendingUp } from "lucide-react";
import TrainingProgressCard from "./components/TrainingProgressCard";
import WeeklyActivityCard from "./components/WeeklyActivityCard";
import RecentPointsCard from "./components/RecentPointsCard";
import RecentActivitiesCard from "./components/RecentActivitiesCard";

export default function UserDashboard() {
  const stats = [
    {
      icon: Trophy,
      value: "70",
      label: "Total Points",
      color: "text-yellow-500",
      bgColor: "from-yellow-100 to-amber-100",
    },
    {
      icon: GraduationCap,
      value: "0/1",
      label: "Completed",
      color: "text-orange-500",
      bgColor: "from-orange-100 to-red-100",
    },
    {
      icon: TrendingUp,
      value: "0%",
      label: "Completion Rate",
      color: "text-blue-500",
      bgColor: "from-blue-100 to-cyan-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-[#5c72e0] to-[#6952ad] rounded-3xl p-8 md:p-10 text-white overflow-hidden shadow-2xl mb-8"
        >
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dashboard-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dashboard-grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-3"
            >
              <h1 className="text-3xl md:text-4xl font-bold">Welcome back, Test!</h1>
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                className="text-3xl md:text-4xl"
              >
                👋
              </motion.span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/90 text-base md:text-lg mb-8"
            >
              Here's what's happening with your training progress today.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <stat.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/80 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TrainingProgressCard />
          </div>
          <div>
            <WeeklyActivityCard />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentPointsCard />
          <RecentActivitiesCard />
        </div>
      </div>
    </div>
  );
}
