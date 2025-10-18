import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/user.store";

const AuthenticatedLayout = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    // Redirect unauthenticated users to login/signup page
    return <Navigate to="/" replace />;
  }

  if (authUser.role === "user" && window.location.pathname === "/admin-page") {
    // Redirect user to their page if they try to access the admin page
    return <Navigate to="/user-page" replace />;
  }

  if (authUser.role === "admin" && window.location.pathname === "/user-page") {
    // Redirect admin to admin page if they try to access the user page
    return <Navigate to="/admin-page" replace />;
  }

  return (
    <div className="h-screen w-screen overflow-auto">
      <Outlet />
    </div>
  );
};

export default AuthenticatedLayout;
