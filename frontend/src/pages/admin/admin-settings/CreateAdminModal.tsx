import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  Mail,
  Lock,
  User,
  Check,
  EyeOff,
  Eye,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import type { CreateAdminAccount } from "../../../types/auth.type";
import { useAuthStore } from "../../../store/user.store";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { calculatePasswordStrength } from "../../../utils/calculatePasswordStrength.util";
import toast from "react-hot-toast";
import type { CreateActivityLog } from "../../../types/activity.type";
import { useActivityLogStore } from "../../../store/activity.store";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateAdminModal({
  isOpen,
  onClose,
}: CreateAdminModalProps) {
  const initialFormData = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    createAdminAccount,
    createAdminAccountLoading,
    getAllAdminAccount,
    authUser,
  } = useAuthStore();

  const { createActivityLog, createActivityLogLoading } = useActivityLogStore();

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullname.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (passwordStrength.label === "Weak") {
      setErrors((prev) => ({ ...prev, password: "Password is too weak" }));
      return toast.error("Use a stronger password");
    }
    if (validateForm()) {
      try {
        const payload: CreateAdminAccount = {
          fullname: formData.fullname,
          email: formData.email,
          phone: "",
          password: formData.password,
          role: formData.role as "admin" | "super_admin",
        };

        const accountCreated = await createAdminAccount(payload);

        if (accountCreated) {
          if (!authUser) return;
          const activityLogPayload: CreateActivityLog = {
            actorId: authUser?.id,
            actorName: authUser?.fullname,
            actorRole: authUser?.role,
            action: `created a new admin account for ${formData.fullname} (${formData.role})`,
          };

          await createActivityLog(activityLogPayload);
        }

        // Reset inputs, errors
        setFormData(initialFormData);
        setErrors({});
        onClose();
        getAllAdminAccount();
      } catch (error) {
        console.log("Unexpected error occured: ", error);
        toast.error(
          error ? "Unexpected error occured" : "Failed to create admin account"
        );
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
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
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-white text-white p-6 rounded-t-2xl relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-200 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-blue-700" />
                  </div>
                  <div>
                    <h2 className="text-gray-800 text-2xl font-bold">
                      Create Admin Account
                    </h2>
                    <p className="text-gray-800 text-opacity-90 text-sm">
                      Add a new administrator to the platform
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) => handleChange("fullname", e.target.value)}
                      placeholder="Enter full name"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="admin@powertrack.com"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group mr-2">
                      <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-[#4A90E2] cursor-help transition-colors" />
                      <div className="absolute bottom-full right-0 mb-2 w-56 sm:w-64 p-3 bg-gray-800 text-white text-[10px] sm:text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <div className="font-semibold mb-1.5">
                          Password Requirements:
                        </div>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>At least 8 characters</li>
                          <li>Uppercase & lowercase letters</li>
                          <li>At least one number</li>
                          <li>Special character (!@#$%^&*)</li>
                        </ul>
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.password
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                  {formData.password && (
                    <div className="space-y-1.5 mt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs text-gray-500">
                          Password strength
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs font-semibold ${
                            passwordStrength.label === "Weak"
                              ? "text-red-500"
                              : passwordStrength.label === "Fair"
                              ? "text-orange-500"
                              : passwordStrength.label === "Good"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(passwordStrength.strength / 5) * 100}%`,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`h-full ${passwordStrength.color} transition-colors`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      placeholder="Re-enter password"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.confirmPassword
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white cursor-pointer transition-all"
                    >
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {formData.role === "super_admin"
                      ? "Full access to all platform features and settings"
                      : "Standard administrative access with limited permissions"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl cursor-pointer font-semibold hover:bg-gray-300 transition-all"
                    disabled={createAdminAccountLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl cursor-pointer font-semibold hover:from-slate-700 hover:to-gray-900 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    disabled={
                      createAdminAccountLoading || createActivityLogLoading
                    }
                  >
                    {createAdminAccountLoading || createActivityLogLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        {" "}
                        <Check className="w-5 h-5" />
                        Create
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
