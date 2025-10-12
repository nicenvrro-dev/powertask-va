import { motion } from "framer-motion";
import { useAuthStore } from "../../../store/user.store";

export default function WelcomeBanner() {
  const { authUser } = useAuthStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-2xl p-8 md:p-12 text-white overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Welcome to
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            PowerTask, {authUser?.fullname}!
          </h2>
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
            className="text-4xl md:text-5xl"
          >
            👋
          </motion.span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg max-w-3xl leading-relaxed"
        >
          Choose your specialization to begin your learning journey. Each service offers
          comprehensive Training modules designed to enhance your skills.
        </motion.p>
      </div>
    </motion.div>
  );
}
