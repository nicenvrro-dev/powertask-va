import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Users,
  Search,
  Plus,
  Mail,
  Shield,
  Calendar,
  Trash2,
  Edit,
} from "lucide-react";
import { useEffect, useState } from "react";
import CreateAdminModal from "./CreateAdminModal";
import { useAuthStore } from "../../../store/user.store";
import { formatCreatedAtDate } from "../../../utils/formatCreatedAtDate.util";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import type { BaseUserAccount } from "../../../types/auth.type";
import toast from "react-hot-toast";
import { useActivityLogStore } from "../../../store/activity.store";
import { formatTimeAgo } from "../../../utils/formatTimeAgo.util";

type SettingsTab = "general" | "admin-management";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("admin-management");
  const [searchQuery, setSearchQuery] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showConfirmationDeleteModal, setShowConfirmationDeleteModal] =
    useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<BaseUserAccount | null>(null);

  const { allAdminUsers, deleteUserById, getAllAdminAccount, authUser } =
    useAuthStore();
  const { activityLogs, fetchActivityLogs } = useActivityLogStore();

  useEffect(() => {
    fetchActivityLogs();
  }, [fetchActivityLogs]);

  const recentActivityLogs = activityLogs
    .filter(
      (log) => log.actorRole === "admin" || log.actorRole === "super_admin"
    )
    .slice(-5)
    .reverse();

  const superAdminTotal = allAdminUsers.filter(
    (admin) => admin.role === "super_admin"
  ).length;

  const adminTotal = allAdminUsers.filter(
    (admin) => admin.role === "admin"
  ).length;

  const totalActiveAccount = allAdminUsers.filter(
    (admin) => admin.active
  ).length;

  const filteredAdmins = allAdminUsers.filter(
    (admin) =>
      admin.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    const adminRole = role === "admin" ? "Admin" : "Super Admin";

    return adminRole === "Super Admin"
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-blue-100 text-blue-700 border-blue-200";
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";
  };

  const onDelete = (selectedId: string) => {
    const selectedUser = allAdminUsers.find((user) => user._id === selectedId);

    if (selectedUser) {
      setSelectedAccount(selectedUser);
      setShowConfirmationDeleteModal(true);
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedAccount) return;
    try {
      await deleteUserById(selectedAccount._id);
      setSelectedAccount(null);
      setShowConfirmationDeleteModal(false);
      getAllAdminAccount();
    } catch (error) {
      console.log("Unexpected error occured on deleting account", error);
      toast.error("Unexpected error occured on deleting account");
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
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <SettingsIcon
                className="w-8 h-8 text-gray-800"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Settings
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Manage platform configuration and access controls
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === "general"
                  ? "bg-slate-50 text-slate-900 border-b-2 border-slate-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              General Settings
            </button>
            <button
              onClick={() => setActiveTab("admin-management")}
              className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "admin-management"
                  ? "bg-slate-50 text-slate-900 border-b-2 border-slate-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users className="w-5 h-5" />
              Admin Management
            </button>
          </div>
        </motion.div>

        {activeTab === "general" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <SettingsIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              General Settings
            </h3>
            <p className="text-gray-500">Configuration options coming soon</p>
          </motion.div>
        )}

        {activeTab === "admin-management" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#f31b8a]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Total Admins
                    </h3>
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  {adminTotal}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Active</h3>
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  {totalActiveAccount}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Super Admins
                    </h3>
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  {superAdminTotal}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl cursor-pointer font-semibold hover:from-slate-700 hover:to-gray-900 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Admin
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Role
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Created
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAdmins
                      .filter((admin) => admin._id !== authUser?.id)
                      .map((admin, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#f31b8a] rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-sm">
                                  {admin.fullname.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-semibold text-gray-800">
                                {admin.fullname}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{admin.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(
                                admin.role
                              )}`}
                            >
                              {admin.role === "admin" ? "Admin" : "Super Admin"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                admin.active ? "Active" : "Inactive"
                              )}`}
                            >
                              {admin.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">
                                {formatCreatedAtDate(admin.createdAt)}
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDelete(admin._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>

                {filteredAdmins.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No admins found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-slate-600" />
                Recent Admin Activities
              </h3>
              <div className="space-y-3">
                {recentActivityLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">
                        <strong>{log.actorName}</strong> (
                        {log.actorRole === "super_admin"
                          ? "Super Admin"
                          : "Admin"}
                        ) {log.action}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(log.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        <CreateAdminModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        <DeleteConfirmationModal
          showDeleteConfirmationModal={showConfirmationDeleteModal}
          setShowDeleteConfirmationModal={setShowConfirmationDeleteModal}
          selectedAccount={selectedAccount}
          onConfirmDelete={onConfirmDelete}
        />
      </div>
    </div>
  );
}
