import { useEffect, useState } from "react";

import AdminHeader from "./header/AdminHeader";
import Employees from "./employees/Employees";
import AdminDashboard from "./admin-dashboard/AdminDashboard";
import AdminFeedback from "./feedback/AdminFeedback";
import Modules from "./modules/Modules";
import Settings from "./admin-settings/Settings";
import { useAuthStore } from "../../store/user.store";

export type AdminNavItem =
  | "dashboard"
  | "employees"
  | "feedback"
  | "modules"
  | "settings";

const AdminMainPage = () => {
  const [activeNav, setActiveNav] = useState<AdminNavItem>("dashboard");
  const { getAllAdminAccount } = useAuthStore();

  useEffect(() => {
    getAllAdminAccount();
  }, [getAllAdminAccount]);

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <AdminDashboard />;
      case "employees":
        return <Employees />;
      case "feedback":
        return <AdminFeedback />;
      case "modules":
        return <Modules />;
      case "settings":
        return <Settings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminHeader activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Make the main content area scrollable */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminMainPage;
