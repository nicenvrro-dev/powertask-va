import { motion } from "framer-motion";
import {
  GraduationCap,
  Search,
  Plus,
  Clock,
  Calendar,
  User,
  Eye,
  BookOpen,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import AddModuleModal from "../add-modules/AddModuleModal";

interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  duration: number;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
}

type ServiceTab = "sales" | "admin" | "customer";

const MODULES_DATA: Record<ServiceTab, Module[]> = {
  sales: [
    {
      id: "1",
      title: "Introduction to Sales",
      description: "Learn the fundamentals of sales and customer interaction",
      category: "SALES",
      level: "BEGINNER",
      status: "ACTIVE",
      duration: 120,
      createdBy: "Admin",
      createdDate: "Aug 05, 2025",
      updatedDate: "Aug 06, 2025",
    },
    {
      id: "2",
      title: "Lead Generation Strategies",
      description: "Master modern lead generation techniques and tools",
      category: "SALES",
      level: "INTERMEDIATE",
      status: "ACTIVE",
      duration: 180,
      createdBy: "Admin",
      createdDate: "Aug 06, 2025",
      updatedDate: "Aug 06, 2025",
    },
  ],
  admin: [
    {
      id: "5",
      title: "Administrative Fundamentals",
      description: "Essential administrative skills and best practices",
      category: "ADMIN",
      level: "BEGINNER",
      status: "ACTIVE",
      duration: 100,
      createdBy: "Admin",
      createdDate: "Aug 01, 2025",
      updatedDate: "Aug 02, 2025",
    },
    {
      id: "6",
      title: "Document Management Systems",
      description: "Learn to organize and manage documents efficiently",
      category: "ADMIN",
      level: "INTERMEDIATE",
      status: "ACTIVE",
      duration: 120,
      createdBy: "Admin",
      createdDate: "Aug 03, 2025",
      updatedDate: "Aug 04, 2025",
    },
  ],
  customer: [
    {
      id: "9",
      title: "Customer Service Excellence",
      description: "Deliver outstanding customer service experiences",
      category: "CUSTOMER",
      level: "BEGINNER",
      status: "ACTIVE",
      duration: 110,
      createdBy: "Admin",
      createdDate: "Jul 28, 2025",
      updatedDate: "Jul 29, 2025",
    },
    {
      id: "10",
      title: "Handling Difficult Customers",
      description: "Techniques for managing challenging customer interactions",
      category: "CUSTOMER",
      level: "INTERMEDIATE",
      status: "ACTIVE",
      duration: 135,
      createdBy: "Admin",
      createdDate: "Jul 30, 2025",
      updatedDate: "Aug 01, 2025",
    },
  ],
};

export default function Modules() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("sales");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const currentModules = MODULES_DATA[activeTab];

  const filteredModules = currentModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || module.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-orange-100 text-orange-700";
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-700";
      case "ADVANCED":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "DRAFT":
        return "bg-blue-100 text-blue-700";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "SALES":
        return "bg-blue-100 text-blue-700";
      case "ADMIN":
        return "bg-indigo-100 text-indigo-700";
      case "CUSTOMER":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap
              className="w-8 h-8 text-gray-800"
              strokeWidth={2.5}
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Training Module Management
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Create, edit, and manage training modules for all services
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setActiveTab("sales")}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "sales"
                  ? "bg-[#1A3D2D] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Sales
              </span>
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "admin"
                  ? "bg-[#1A3D2D] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Admin
              </span>
            </button>
            <button
              onClick={() => setActiveTab("customer")}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "customer"
                  ? "bg-[#1A3D2D] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Total Modules
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {currentModules.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Active Modules
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {currentModules.filter((m) => m.status === "ACTIVE").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Total Duration
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {Math.round(
                      currentModules.reduce((acc, m) => acc + m.duration, 0) /
                        60
                    )}
                    h
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all sm:min-w-[150px]"
            >
              <option value="all">All Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-[#1A3D2D] text-white rounded-xl cursor-pointer font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Module
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {module.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                        module.category
                      )}`}
                    >
                      {module.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                        module.level
                      )}`}
                    >
                      {module.level}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        module.status
                      )}`}
                    >
                      {module.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{module.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{module.createdBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{module.createdDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{module.updatedDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer font-semibold hover:from-gray-800 hover:to-black transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                    <BookOpen className="w-4 h-4" />
                    Manage Chapters
                  </button>
                  <button className="px-4 py-2.5 bg-gray-100 text-white rounded-lg cursor-pointer font-semibold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                    <Settings className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg cursor-pointer font-semibold hover:from-red-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <GraduationCap className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No modules found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        <AddModuleModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          category={activeTab}
        />
      </div>
    </div>
  );
}
