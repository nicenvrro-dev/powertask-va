import { useEffect, useState } from "react";

import UserHeader from "./header/UserHeader";
import Services from "./services/Services";
import UserDashboard from "./user-dashboard/UserDashboard";
import Training from "./training/Training";
import UserFeedback from "./feedback/UserFeedback";
import { useAuthStore } from "../../store/user.store";

export type UserNavItem = "dashboard" | "training" | "services" | "feedback";

const UserMainPage = () => {
  const [activeNav, setActiveNav] = useState<UserNavItem>("services");
  const [selectedCategory, setSelectedCategory] = useState<
    "sales" | "admin" | "customer"
  >("sales");

  const { getAllUserAccount } = useAuthStore();

  useEffect(() => {
    getAllUserAccount();
  }, [getAllUserAccount]);

  const handleStartLearning = (category: "sales" | "admin" | "customer") => {
    setSelectedCategory(category);
    setActiveNav("training");
  };

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <UserDashboard />;
      case "training":
        return <Training selectedCategory={selectedCategory} />;

      case "services":
        return <Services onStartLearning={handleStartLearning} />;
      case "feedback":
        return <UserFeedback />;
      default:
        return <Services onStartLearning={handleStartLearning} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#8B7EC8] to-[#E85D9A]">
      <UserHeader activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Make the main content area scrollable */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {renderContent()}
      </main>
    </div>
  );
};

export default UserMainPage;
