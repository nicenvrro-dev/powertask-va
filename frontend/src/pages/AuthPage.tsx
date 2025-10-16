import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, HelpCircle, LogIn, UserPlus } from "lucide-react";
import type {
  CreateUserAccount,
  LoginAccountPayload,
  Services,
} from "../types/auth.type";
import { useAuthStore } from "../store/user.store";

import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { calculatePasswordStrength } from "../utils/calculatePasswordStrength.util";

export default function AuthPage() {
  const [isEmailFocused, setIsEmailFocused] = useState(true); // active border initially
  const emailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    createNewAccount,
    createNewAccountLoading,
    loginAccount,
    loginAccountLoading,
  } = useAuthStore();

  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceFocus, setServiceFocus] = useState<Services>("sales");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // auto-focus email input
    }
  }, []);

  const passwordStrength = calculatePasswordStrength(password);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password are required.");
    }

    try {
      const payload: LoginAccountPayload = {
        email,
        password,
      };

      const authenticatedUser = await loginAccount(payload);
      if (authenticatedUser) {
        if (
          authenticatedUser.role === "admin" ||
          authenticatedUser.role === "super_admin"
        ) {
          navigate("/admin-page");
        } else {
          navigate("/user-page");
        }
      }
    } catch (error) {
      console.log("Unexpected error occured: ", error);
    } finally {
      clearFormInputs();
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullname || !email || !password || !confirmPassword) {
      return toast.error("Missing required fields");
    }

    if (password && passwordStrength.label === "Weak") {
      return toast.error("Use a stronger password");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const payload: CreateUserAccount = {
        fullname,
        email,
        phone: phoneNumber,
        serviceFocus,
        password,
      };
      await createNewAccount(payload);
    } catch (error) {
      console.log("Unexpected error occured: ", error);
    } finally {
      clearFormInputs();
      setIsSignUp(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    clearFormInputs();
  };

  const clearFormInputs = () => {
    setEmail("");
    setPassword("");
    setFullname("");
    setPhoneNumber("");
    setConfirmPassword("");
    setRememberMe(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4A90E2] via-[#8B7EC8] to-[#E85D9A] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[1000px] h-auto min-h-[500px] md:h-[600px] lg:h-[650px] bg-white rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden"
      >
        {/* Sign In Form - Left Side (Desktop) / Full Width (Mobile) */}
        <div
          className={`absolute left-0 top-0 w-full md:w-[45%] h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 bg-white z-10 ${
            isSignUp ? "md:block hidden" : "block"
          }`}
        >
          <AnimatePresence mode="wait">
            {!isSignUp && (
              <motion.div
                key="signin-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="py-8 md:py-0"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <LogIn className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Welcome Back
                  </h1>
                </div>
                <p className="text-gray-500 text-center mb-5 sm:mb-6 text-xs sm:text-sm">
                  Sign in to continue your learning journey
                </p>

                <form
                  onSubmit={handleSignInSubmit}
                  className="space-y-3 sm:space-y-3.5"
                >
                  <input
                    ref={emailInputRef}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                      isEmailFocused
                        ? "ring-2 ring-blue-400"
                        : "focus:ring-2 focus:ring-blue-400"
                    }`}
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-400"
                      />
                      <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        Remember me
                      </span>
                    </label>

                    <button
                      type="button"
                      className="text-xs sm:text-sm text-[#4A90E2] hover:text-[#3A7BC8] transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#4A90E2] text-white py-2.5 sm:py-3 rounded-lg cursor-pointer font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#3A7BC8] transition-colors shadow-lg shadow-blue-200 mt-4 sm:mt-5"
                    disabled={loginAccountLoading}
                  >
                    {loginAccountLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                        SIGN IN
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Mobile Toggle Button */}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="md:hidden mt-6 text-sm text-gray-600 hover:text-gray-800 transition-colors text-center w-full"
                >
                  Don't have an account?{" "}
                  <span className="text-[#4A90E2] font-semibold">Sign Up</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sign Up Form - Right Side (Desktop) / Full Width (Mobile) */}
        <div
          className={`absolute right-0 top-0 w-full md:w-[45%] h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 bg-white z-10 ${
            isSignUp ? "block" : "md:block hidden"
          }`}
        >
          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="py-8 md:py-0 max-h-full"
              >
                <div className="flex items-center gap-2 mb-2">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Create Account
                  </h1>
                </div>
                <p className="text-gray-500 mb-4 sm:mb-5 text-xs sm:text-sm">
                  Join PowerTask and start your learning journey
                </p>

                <form
                  onSubmit={handleSignupSubmit}
                  className="space-y-2.5 sm:space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="Phone Number (Optional)"
                    value={phoneNumber}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
                      setPhoneNumber(onlyNums);
                    }}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />

                  <div className="space-y-2 mt-2">
                    <label className="text-[10px] sm:text-xs text-gray-600 font-medium block">
                      Service Focus
                    </label>
                    <select
                      value={serviceFocus}
                      onChange={(e) =>
                        setServiceFocus(e.target.value as Services)
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">Select your focus area</option>
                      <option value="sales">Sales and Lead Generation</option>
                      <option value="administrative-support">
                        Administrative Support
                      </option>
                      <option value="customer-service">Customer Service</option>
                    </select>
                  </div>

                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] sm:text-xs text-gray-600 font-medium">
                        Password
                      </label>
                      <div className="relative group">
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
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      />

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {password && (
                      <div className="space-y-1.5">
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
                              width: `${
                                (passwordStrength.strength / 5) * 100
                              }%`,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`h-full ${passwordStrength.color} transition-colors`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#4A90E2] text-white py-2.5 sm:py-3 rounded-lg cursor-pointer font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#3A7BC8] transition-colors shadow-lg shadow-blue-200 mt-3 sm:mt-4"
                    disabled={createNewAccountLoading}
                  >
                    {createNewAccountLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                        CREATE ACCOUNT
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Mobile Toggle Button */}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="md:hidden mt-5 text-sm text-gray-600 hover:text-gray-800 transition-colors text-center w-full"
                >
                  Already have an account?{" "}
                  <span className="text-[#4A90E2] font-semibold">Sign In</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sliding Overlay Panel - Hidden on Mobile */}
        <motion.div
          animate={{
            left: isSignUp ? 0 : "45%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`hidden md:flex absolute top-0 w-[55%] h-full bg-gradient-to-br from-[#8B7EC8] via-[#A87EC8] to-[#E85D9A] flex-col items-center justify-center px-8 lg:px-16 z-30 ${
            isSignUp
              ? "rounded-r-[60px] lg:rounded-r-[80px]"
              : "rounded-l-[60px] lg:rounded-l-[80px]"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "welcome-back-overlay" : "hello-friend-overlay"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-white"
            >
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-5">
                {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
              </h2>
              <p className="text-white/95 mb-8 lg:mb-10 leading-relaxed max-w-md text-sm lg:text-base px-4">
                {isSignUp
                  ? "Already have an account? Sign in to continue your learning journey and track your progress."
                  : "Register with your personal details to start your journey with PowerTask and unlock all features."}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAuthMode}
                className="border-2 border-white text-white px-8 lg:px-10 py-2.5 lg:py-3 rounded-lg cursor-pointer font-semibold text-xs lg:text-sm flex items-center justify-center gap-2 mx-auto hover:bg-white/10 transition-all"
              >
                {isSignUp ? (
                  <>
                    <LogIn className="w-4 h-4 lg:w-5 lg:h-5" />
                    SIGN IN
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 lg:w-5 lg:h-5" />
                    SIGN UP
                  </>
                )}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
