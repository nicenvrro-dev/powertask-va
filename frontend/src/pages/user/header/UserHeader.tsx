import React, { useEffect, useRef, useState } from "react";
import type { UserNavItem } from "../UserMainPage";
import {
  BookOpen,
  ChevronDown,
  LogOut,
  RefreshCw,
  Sparkles,
  Target,
  User,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../../../store/user.store";
import { getNameInitials } from "../../../utils/getNameInitials.util";
import powertaskLogo from "../../../assets/images/powertask-logo.png";

interface UserHeaderProps {
  activeNav: UserNavItem;
  onNavChange: (nav: UserNavItem) => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ activeNav, onNavChange }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { logoutAccount, authUser } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    logoutAccount();
  };

  const menuItems = [
    { icon: User, label: "Profile", action: () => console.log("Profile clicked") },
    {
      icon: RefreshCw,
      label: "Change Services",
      action: () => console.log("Change Services clicked"),
    },
    {
      icon: LogOut,
      label: "Sign out",
      action: handleLogoutClick,
      danger: true,
    },
  ];

  const navItems = [
    { id: "dashboard" as UserNavItem, icon: Target, label: "Dashboard" },
    { id: "training" as UserNavItem, icon: BookOpen, label: "Training" },
    { id: "services" as UserNavItem, icon: Wrench, label: "Services" },
    { id: "feedback" as UserNavItem, icon: Sparkles, label: "Feedback" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="w-auto h-14">
            <img
              src={powertaskLogo}
              alt="power-task-logo"
              className="w-full h-full overflow-contain"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`flex items-center gap-2 transition-colors cursor-pointer ${
                  activeNav === item.id
                    ? "text-[#6953ad] font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-full cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 bg-[#6854b2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {getNameInitials(authUser?.fullname)}
                </span>
              </div>
              <span className="font-medium text-[#6854b2]">{authUser?.fullname}</span>
              <motion.div
                animate={{ rotate: isPopoverOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-[#6854b2]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isPopoverOpen && (
                <motion.div
                  ref={popoverRef}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          item.action();
                          setIsPopoverOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${
                          item.danger
                            ? "text-red-600 hover:bg-red-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default UserHeader;
