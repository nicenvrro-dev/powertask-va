import { motion } from "framer-motion";
import { MessageSquare, Star, ThumbsUp, Award, TrendingUp, Sparkles, Clock } from "lucide-react";
import { useState } from "react";

interface FeedbackItem {
  id: number;
  message: string;
  rating: number;
  submittedBy: string;
  timestamp: string;
  department: string;
  feedbackType: "positive" | "constructive" | "performance-review" | "improvement";
}

export default function UserFeedback() {
  const [filter, setFilter] = useState<
    "all" | "positive" | "constructive" | "performance-review" | "improvement"
  >("all");

  // Mock data - this would come from the database aligned with AdminFeedback
  const feedbackData: FeedbackItem[] = [
    {
      id: 1,
      message: "ang galing galing mo <3",
      rating: 4,
      submittedBy: "Admin",
      timestamp: "Aug 18, 2025 10:05 PM",
      department: "Sales",
      feedbackType: "positive",
    },
    {
      id: 2,
      message: "Great progress on the recent project. Keep up the excellent work!",
      rating: 5,
      submittedBy: "Admin",
      timestamp: "Aug 17, 2025 3:22 PM",
      department: "Sales & Lead Generation",
      feedbackType: "positive",
    },
    {
      id: 3,
      message:
        "Good improvement in communication skills. Continue to develop your technical knowledge.",
      rating: 4,
      submittedBy: "Admin",
      timestamp: "Aug 15, 2025 9:15 AM",
      department: "Sales",
      feedbackType: "constructive",
    },
  ];

  const filteredFeedback =
    filter === "all" ? feedbackData : feedbackData.filter((f) => f.feedbackType === filter);

  const totalFeedback = feedbackData.length;
  const averageRating = feedbackData.reduce((sum, f) => sum + f.rating, 0) / totalFeedback;
  const positiveFeedback = feedbackData.filter((f) => f.feedbackType === "positive").length;

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-700 border-green-200";
      case "constructive":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "performance-review":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "improvement":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <ThumbsUp className="w-4 h-4" />;
      case "constructive":
        return <MessageSquare className="w-4 h-4" />;
      case "performance-review":
        return <Award className="w-4 h-4" />;
      case "improvement":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getFeedbackTypeLabel = (type: string) => {
    switch (type) {
      case "positive":
        return "Positive Feedback";
      case "constructive":
        return "Constructive Feedback";
      case "performance-review":
        return "Performance Review";
      case "improvement":
        return "Areas for Improvement";
      default:
        return "Feedback";
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= count ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Feedback</h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg">
            Review feedback from your managers and track your performance growth.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Total Feedback</h3>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1">{totalFeedback}</div>
            <p className="text-sm text-gray-500">Received this month</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Average Rating</h3>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1">{averageRating.toFixed(1)}</div>
            <div className="flex gap-1 mt-2">{renderStars(Math.round(averageRating))}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Positive Feedback</h3>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1">{positiveFeedback}</div>
            <p className="text-sm text-gray-500">Keep up the great work!</p>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-4 mb-8"
        >
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Feedback
            </button>
            <button
              onClick={() => setFilter("positive")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                filter === "positive"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              Positive
            </button>
            <button
              onClick={() => setFilter("constructive")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                filter === "constructive"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Constructive
            </button>
            <button
              onClick={() => setFilter("performance-review")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                filter === "performance-review"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Award className="w-4 h-4" />
              Reviews
            </button>
            <button
              onClick={() => setFilter("improvement")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                filter === "improvement"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Growth Areas
            </button>
          </div>
        </motion.div>

        {/* Feedback List */}
        <div className="space-y-6">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-white font-bold text-xl">
                          {feedback.submittedBy.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {feedback.submittedBy}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getFeedbackTypeColor(
                              feedback.feedbackType
                            )} flex items-center gap-1.5`}
                          >
                            {getFeedbackTypeIcon(feedback.feedbackType)}
                            {getFeedbackTypeLabel(feedback.feedbackType)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <span className="font-medium">{feedback.department}</span>
                          <span className="text-gray-300">•</span>
                          <Clock className="w-4 h-4" />
                          {feedback.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {renderStars(feedback.rating)}
                      <span className="text-sm font-semibold text-gray-600">
                        {feedback.rating}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Feedback Message */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <p className="text-gray-800 leading-relaxed text-lg">{feedback.message}</p>
                  </div>

                  {/* Footer - Motivational Element */}
                  {feedback.rating >= 4 && (
                    <div className="mt-6 flex items-center gap-2 text-green-600">
                      <Award className="w-5 h-5" />
                      <span className="text-sm font-semibold">Excellent work! Keep it up!</span>
                    </div>
                  )}
                  {feedback.rating === 3 && (
                    <div className="mt-6 flex items-center gap-2 text-blue-600">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-semibold">You're making progress!</span>
                    </div>
                  )}
                  {feedback.feedbackType === "improvement" && (
                    <div className="mt-6 flex items-center gap-2 text-orange-600">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-semibold">Growth opportunities ahead!</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <MessageSquare className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No feedback found</h3>
              <p className="text-gray-500">
                {filter === "all"
                  ? "You haven't received any feedback yet."
                  : `No ${getFeedbackTypeLabel(filter).toLowerCase()} at this time.`}
              </p>
            </motion.div>
          )}
        </div>

        {/* Motivational Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Keep Growing!</h2>
            </div>
            <p className="text-lg text-white text-opacity-90 max-w-3xl">
              Every piece of feedback is an opportunity to learn and improve. Your dedication to
              growth is what makes you exceptional. Continue to embrace feedback and watch yourself
              excel!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
