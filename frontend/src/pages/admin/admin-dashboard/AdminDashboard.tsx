import { motion } from "framer-motion";
import { Users, Activity, TrendingUp, Headphones, UserCog, Clock, Eye, Shield } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color: string;
  bgColor: string;
  delay: number;
}

function StatCard({ icon: Icon, value, label, color, bgColor, delay }: StatCardProps) {
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
}

interface ActivityItem {
  id: number;
  userName: string;
  action: string;
  module?: string;
  timestamp: string;
  type: "training" | "completion" | "login" | "points";
}

export default function AdminDashboard() {
  const stats = [
    {
      icon: Users,
      value: 4,
      label: "Total Employees",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Activity,
      value: 3,
      label: "Active This Week",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: TrendingUp,
      value: 3,
      label: "Sales & Lead Generation",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Headphones,
      value: 0,
      label: "Customer Support",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: UserCog,
      value: 0,
      label: "Admin Support",
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: 1,
      userName: "Test",
      action: "Started training module",
      module: "Sales & Lead Generation",
      timestamp: "2 hours ago",
      type: "training",
    },
    {
      id: 2,
      userName: "Test",
      action: "Earned 5 points",
      module: "Sales Module Quiz",
      timestamp: "3 hours ago",
      type: "points",
    },
    {
      id: 3,
      userName: "Harvey",
      action: "Logged in",
      timestamp: "5 hours ago",
      type: "login",
    },
    {
      id: 4,
      userName: "Test",
      action: "Completed module",
      module: "Introduction to Sales",
      timestamp: "1 day ago",
      type: "completion",
    },
    {
      id: 5,
      userName: "Test",
      action: "Started training module",
      module: "Advanced Sales Techniques",
      timestamp: "1 day ago",
      type: "training",
    },
    {
      id: 6,
      userName: "Test",
      action: "Earned 10 points",
      module: "Lead Generation Quiz",
      timestamp: "2 days ago",
      type: "points",
    },
  ];

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "training":
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "completion":
        return <Activity className="w-5 h-5 text-green-600" />;
      case "login":
        return <Users className="w-5 h-5 text-purple-600" />;
      case "points":
        return <TrendingUp className="w-5 h-5 text-orange-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityBgColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "training":
        return "bg-blue-50";
      case "completion":
        return "bg-green-50";
      case "login":
        return "bg-purple-50";
      case "points":
        return "bg-orange-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-text-gray-800" strokeWidth={2.5} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg">
            Monitor system statistics, track employee engagement, and view recent platform
            activities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} delay={0.1 + index * 0.05} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Recent User Activities</h2>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors flex items-center gap-1">
                  View All
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 ${getActivityBgColor(
                        activity.type
                      )} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-800">{activity.userName}</span>
                            <span className="text-gray-600">{activity.action}</span>
                          </div>
                          {activity.module && (
                            <div className="text-sm text-gray-500 mb-2">{activity.module}</div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Engagement Rate</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-gray-800 mb-2">75%</div>
                <div className="text-sm text-gray-600">Active users this week</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-700 h-3 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Module Distribution</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Sales & Lead Gen</span>
                    <span className="text-sm font-bold text-gray-800">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Customer Support</span>
                    <span className="text-sm font-bold text-gray-800">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Admin Support</span>
                    <span className="text-sm font-bold text-gray-800">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Total Points Earned</span>
                  <span className="font-bold text-xl">20 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Modules Completed</span>
                  <span className="font-bold text-xl">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Avg. Completion</span>
                  <span className="font-bold text-xl">25%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
