import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthenticatedLayout from "./layout/AuthenticatedLayout";
import UnAuthenticatedLayout from "./layout/UnAuthenticatedLayout";

import AuthPage from "./pages/AuthPage";
import UserMainPage from "./pages/user/UserMainPage";
import AdminMainPage from "./pages/admin/AdminMainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UnAuthenticatedLayout />,
      children: [{ index: true, element: <AuthPage /> }],
    },

    {
      path: "/user-page",
      element: <AuthenticatedLayout />,
      children: [{ index: true, element: <UserMainPage /> }],
    },

    {
      path: "/admin-page",
      element: <AuthenticatedLayout />,
      children: [{ index: true, element: <AdminMainPage /> }],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
