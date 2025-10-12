import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/user.store";

const AuthenticatedLayout = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    // Redirect unauthenticated users to home
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen w-screen overflow-auto">
      <Outlet />
    </div>
  );
};

export default AuthenticatedLayout;
