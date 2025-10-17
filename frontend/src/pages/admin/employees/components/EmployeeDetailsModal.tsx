import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Star,
  Activity,
} from "lucide-react";
import type { BaseUserAccount } from "../../../../types/auth.type";

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: BaseUserAccount | null;
}

export default function EmployeeDetailsModal({
  isOpen,
  onClose,
  employee,
}: EmployeeDetailsModalProps) {
  if (!employee) return null;

  const getStatusColor = (isActice: boolean) => {
    const status = isActice ? "Active" : "Inactive";
    return status === "Active"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-red-100 text-red-700 border-red-200";
  };

  // Mock additional data - in real app, this would come from database
  const employeeDetails = {
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinedDate: "Aug 15, 2025",
    department: employee.serviceFocus !== "sales" ? "Sales" : "Unassigned",
    manager: "John Doe",
    completedModules: [
      {
        id: 1,
        name: "Introduction to Sales",
        completedDate: "Oct 5, 2025",
        score: 95,
      },
      {
        id: 2,
        name: "Lead Generation Basics",
        completedDate: "Oct 8, 2025",
        score: 88,
      },
      {
        id: 3,
        name: "Customer Communication",
        completedDate: "Oct 10, 2025",
        score: 92,
      },
    ],
    inProgressModules: [
      {
        id: 4,
        name: "Advanced Sales Techniques",
        progress: 60,
        estimatedCompletion: "Oct 20, 2025",
      },
      {
        id: 5,
        name: "CRM Management",
        progress: 30,
        estimatedCompletion: "Oct 25, 2025",
      },
    ],
    achievements: [
      {
        id: 1,
        name: "Fast Learner",
        description: "Completed 3 modules in first week",
        date: "Oct 10, 2025",
      },
      {
        id: 2,
        name: "Top Performer",
        description: "Scored 90+ on all modules",
        date: "Oct 12, 2025",
      },
    ],
    recentActivity: [
      {
        id: 1,
        action: 'Completed "Customer Communication" module',
        timestamp: "2 days ago",
      },
      {
        id: 2,
        action: 'Started "Advanced Sales Techniques" module',
        timestamp: "3 days ago",
      },
      {
        id: 3,
        action: 'Earned "Top Performer" achievement',
        timestamp: "5 days ago",
      },
    ],
    performanceMetrics: {
      averageScore: 91.7,
      completionRate: 85,
      timeSpent: 24,
      rank: 3,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-700 to-gray-900 text-white p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-3xl">
                      {employee.fullname.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">
                      {employee.fullname}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{employee.phone ? employee.phone : "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{employeeDetails.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                          employee.active
                        )}`}
                      >
                        {employee.active ? "Active" : "Inactive"}
                      </span>
                      <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 text-white border-2 border-white border-opacity-40">
                        {employeeDetails.department}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Performance Stats */}
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <p className="text-xs font-semibold text-gray-600">
                          Avg. Score
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-800">
                        {employeeDetails.performanceMetrics.averageScore}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">out of 100</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        <p className="text-xs font-semibold text-gray-600">
                          Completion
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-800">
                        {employeeDetails.performanceMetrics.completionRate}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        completion rate
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-amber-600" />
                        <p className="text-xs font-semibold text-gray-600">
                          Time Spent
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-800">
                        {employeeDetails.performanceMetrics.timeSpent}h
                      </p>
                      <p className="text-xs text-gray-500 mt-1">this month</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <p className="text-xs font-semibold text-gray-600">
                          Rank
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-800">
                        #{employeeDetails.performanceMetrics.rank}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        in department
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Employee Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Employment Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Joined Date:
                          </span>
                          <span className="text-gray-800 font-semibold">
                            {employeeDetails.joinedDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Manager:
                          </span>
                          <span className="text-gray-800 font-semibold">
                            {employeeDetails.manager}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Last Active:
                          </span>
                          <span className="text-gray-800 font-semibold">
                            N/A
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        Training Progress
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Modules Completed:
                          </span>
                          <span className="text-gray-800 font-semibold">
                            0 / 0
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Overall Progress:
                          </span>
                          <span className="text-gray-800 font-semibold">
                            0%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">
                            Points Earned:
                          </span>
                          <span className="text-gray-800 font-semibold">
                            10 pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Completed Modules */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                    <div className="bg-green-50 px-6 py-4 border-b border-green-200">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        Completed Modules
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {employeeDetails.completedModules.map((module) => (
                        <div
                          key={module.id}
                          className="px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Star className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  {module.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Completed: {module.completedDate}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {module.score}%
                              </div>
                              <p className="text-xs text-gray-500">Score</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Progress Modules */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                    <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        In Progress
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {employeeDetails.inProgressModules.map((module) => (
                        <div
                          key={module.id}
                          className="px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">
                              {module.name}
                            </h4>
                            <span className="text-sm font-semibold text-blue-600">
                              {module.progress}%
                            </span>
                          </div>
                          <div className="mb-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${module.progress}%` }}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            Est. completion: {module.estimatedCompletion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      Achievements
                    </h3>
                    <div className="space-y-3">
                      {employeeDetails.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="bg-white rounded-lg p-4 shadow-sm border border-amber-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Award className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">
                                {achievement.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {achievement.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {achievement.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gray-600" />
                        Recent Activity
                      </h3>
                    </div>
                    <div className="p-6 space-y-3">
                      {employeeDetails.recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-gray-700">{activity.action}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Edit Employee
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
