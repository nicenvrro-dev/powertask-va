import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Eye,
  Mail,
  TrendingUp,
  ClipboardCheck,
  Headphones,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../../store/user.store";
import { formatServiceFocus } from "../../../utils/formatServiceFocus.util";
import type { BaseUserAccount } from "../../../types/auth.type";

import EmployeeDetailsModal from "./components/EmployeeDetailsModal";

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<BaseUserAccount | null>(null);

  const { allUsers, getAllUserAccount } = useAuthStore();

  useEffect(() => {
    getAllUserAccount();
  }, [getAllUserAccount]);

  const filteredEmployees = allUsers.filter((user) => {
    const matchesSearch =
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService =
      serviceFilter === "all" || user.serviceFocus === serviceFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (user.active ? "active" : "inactive") === statusFilter;
    return matchesSearch && matchesService && matchesStatus;
  });

  /**
   * Returns the appropriate icon component based on the service focus.
   * @param {string} serviceFocus - One of: "sales", "administrative-support", "customer-service"
   * @returns {JSX.Element} Corresponding icon component
   */
  function getServiceFocusIcon(serviceFocus: string): React.ReactNode {
    const iconMap: Record<string, React.ReactNode> = {
      sales: <TrendingUp className="w-4 h-4" />,
      "administrative-support": <ClipboardCheck className="w-4 h-4" />,
      "customer-service": <Headphones className="w-4 h-4" />,
    };

    return iconMap[serviceFocus] || <HelpCircle className="w-4 h-4" />;
  }

  const handleViewEmployee = (employee: BaseUserAccount) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
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
            <Users className="w-8 h-8 text-gray-700" strokeWidth={2} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Employee Management
            </h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg">
            View and manage all employee accounts, track progress, and monitor
            performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Services</option>
                <option value="sales">Sales & Lead Generation</option>
                <option value="administrative-support">
                  Administrative Support
                </option>
                <option value="customer-service">Customer Service</option>
                <option value="Not Assigned">Not Assigned</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-800" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Employee Directory
              </h2>
            </div>
            <div className="px-4 py-2 bg-[#1A3D2D] text-white rounded-full text-sm font-semibold">
              {filteredEmployees.length} Total
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Employee
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Service Focus
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Progress
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Points
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map((employee, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {employee.fullname.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {employee.fullname}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{employee.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm flex items-center gap-2">
                          {employee.serviceFocus &&
                            getServiceFocusIcon(employee.serviceFocus)}
                          {employee.serviceFocus
                            ? formatServiceFocus(employee.serviceFocus)
                            : "Not Assigned"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2 min-w-[120px]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">
                            0%
                          </span>
                          <span className="text-xs text-gray-500">
                            0/0 modules
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `50%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800">5 pts</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {employee.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewEmployee(employee)}
                        className="p-3 bg-slate-100 text-slate-700 rounded-lg cursor-pointer hover:bg-slate-200 transition-all flex items-center justify-center group"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No employees found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>

        <EmployeeDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          employee={selectedEmployee}
        />
      </div>
    </div>
  );
}
