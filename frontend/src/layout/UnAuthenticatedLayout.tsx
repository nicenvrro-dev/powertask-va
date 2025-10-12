import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/user.store";

const UnAuthenticatedLayout = () => {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to="/user-page" replace />;
  }

  return <Outlet />;
};

export default UnAuthenticatedLayout;
