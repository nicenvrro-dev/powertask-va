import { motion } from "framer-motion";
import { MessageSquare, Star, Send, Clock, User as UserIcon } from "lucide-react";
import { useState } from "react";
import EmployeeAutocomplete from "./EmployeeAutocomplete";

interface UserData {
  id: string;
  name: string;
}

interface Feedback {
  id: number;
  employeeName: string;
  message: string;
  rating: number;
  submittedBy: string;
  timestamp: string;
  department: string;
}

export default function AdminFeedback() {
  const [selectedEmployee, setSelectedEmployee] = useState<UserData | null>(null);
  const [department, setDepartment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");
  const [comments, setComments] = useState("");

  const recentFeedback: Feedback[] = [
    {
      id: 1,
      employeeName: "Test",
      message: "ang galing galing mo <3",
      rating: 4,
      submittedBy: "Admin",
      timestamp: "Aug 18, 2025 10:05 PM",
      department: "Sales",
    },
    {
      id: 2,
      employeeName: "Harvey",
      message: "Great progress on the recent project. Keep up the excellent work!",
      rating: 5,
      submittedBy: "Admin",
      timestamp: "Aug 17, 2025 3:22 PM",
      department: "Sales & Lead Generation",
    },
    {
      id: 3,
      employeeName: "Test",
      message:
        "Good improvement in communication skills. Continue to develop your technical knowledge.",
      rating: 4,
      submittedBy: "Admin",
      timestamp: "Aug 15, 2025 9:15 AM",
      department: "Sales",
    },
  ];

  const handleEmployeeSelect = (user: UserData) => {
    setSelectedEmployee(user);
  };

  const handleEmployeeClear = () => {
    setSelectedEmployee(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) {
      alert("Please select an employee");
      return;
    }
    console.log({
      employeeId: selectedEmployee.id,
      employeeName: selectedEmployee.name,
      department,
      rating,
      feedbackType,
      comments,
    });
    setSelectedEmployee(null);
    setDepartment("");
    setRating(0);
    setFeedbackType("");
    setComments("");
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`transition-all ${interactive ? "cursor-pointer hover:scale-110" : ""}`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (interactive ? hoverRating || rating : count)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
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
            <MessageSquare className="w-8 h-8 text-gray-800" strokeWidth={2.5} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Admin Feedback</h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg">
            Provide constructive feedback to employees and track performance reviews.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Submit Feedback</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Employee <span className="text-red-500">*</span>
                </label>
                <EmployeeAutocomplete
                  onSelect={handleEmployeeSelect}
                  selectedUser={selectedEmployee}
                  onClear={handleEmployeeClear}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service/Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
                  required
                >
                  <option value="">Sales</option>
                  <option value="sales">Sales</option>
                  <option value="sales-lead">Sales & Lead Generation</option>
                  <option value="customer-support">Customer Support</option>
                  <option value="admin-support">Admin Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Performance Rating
                </label>
                {renderStars(rating, true)}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Feedback Type
                </label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
                  required
                >
                  <option value="">Select type</option>
                  <option value="positive">Positive</option>
                  <option value="constructive">Constructive</option>
                  <option value="performance-review">Performance Review</option>
                  <option value="improvement">Needs Improvement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Feedback Comments
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Provide detailed feedback about the employee's performance..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1A3D2D] hover:bg-green-800 text-white rounded-xl cursor-pointer font-semibold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Submit Feedback
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Recent Feedback</h2>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto">
              {recentFeedback.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-lg">
                          {feedback.employeeName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{feedback.employeeName}</h3>
                        <p className="text-sm text-gray-500">{feedback.department}</p>
                      </div>
                    </div>
                    {renderStars(feedback.rating)}
                  </div>

                  <div className="mb-4 pl-15">
                    <p className="text-gray-700 leading-relaxed border-l-4 border-gray-200 pl-4 py-2">
                      {feedback.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 pl-15">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      <span>By: {feedback.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{feedback.timestamp}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {recentFeedback.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No feedback yet</h3>
                <p className="text-gray-500">Submit your first feedback to get started</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Total Feedback</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">{recentFeedback.length}</div>
            <p className="text-sm text-gray-500 mt-2">Submitted this month</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Average Rating</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">4.3</div>
            <p className="text-sm text-gray-500 mt-2">Out of 5 stars</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Employees Reviewed</h3>
            </div>
            <div className="text-4xl font-bold text-gray-800">2</div>
            <p className="text-sm text-gray-500 mt-2">Unique employees</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
