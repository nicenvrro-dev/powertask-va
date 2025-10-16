import {
  getAllUserAccountApi,
  createNewAccountApi,
  loginAccountApi,
  deleteUserByIdApi,
} from "../api/user.api";
import type { UserAuthStore } from "../types/auth.type";
import { AxiosError } from "axios";

import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getAllAdminAccountApi, createAdminAccountApi } from "../api/admin.api";

export const useAuthStore = create(
  persist<UserAuthStore>(
    (set) => ({
      createNewAccountLoading: false,
      createAdminAccountLoading: false,
      loginAccountLoading: false,
      deleteAccountLoading: false,

      authUser: null,
      allUsers: [],
      allAdminUsers: [],

      getAllUserAccount: async () => {
        try {
          const response = await getAllUserAccountApi();
          set({ allUsers: response.data.data });
          return response.data.data;
        } catch (error) {
          console.error("Failed to fetch users", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message || "Failed to fetch users"
              );
            } else {
              toast.error(error.message || "Failed to fetch users");
            }
          } else {
            toast.error("An unexpected error occurred while fetchin users");
          }
        }
      },

      getAllAdminAccount: async () => {
        try {
          const response = await getAllAdminAccountApi();
          set({ allAdminUsers: response.data.data });
          return response.data.data;
        } catch (error) {
          console.error("Failed to fetch admins", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message || "Failed to fetch admins"
              );
            } else {
              toast.error(error.message || "Failed to fetch admins");
            }
          } else {
            toast.error("An unexpected error occurred while fetchin admins");
          }
        }
      },

      createNewAccount: async (payload) => {
        set({ createNewAccountLoading: true });

        try {
          const response = await createNewAccountApi(payload);
          toast.success(response.data.message);
          return response.data.data;
        } catch (error) {
          console.error("Failed to create user account", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message || "Failed to create user account"
              );
            } else {
              toast.error(error.message || "Failed to create user account");
            }
          } else {
            toast.error(
              "An unexpected error occurred while creating user account"
            );
          }
        } finally {
          set({ createNewAccountLoading: false });
        }
      },

      createAdminAccount: async (payload) => {
        set({ createAdminAccountLoading: true });

        try {
          const response = await createAdminAccountApi(payload);
          toast.success(response.data.message);
          return response.data.data;
        } catch (error) {
          console.error("Failed to create admin account", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message || "Failed to create admin account"
              );
            } else {
              toast.error(error.message || "Failed to create admin account");
            }
          } else {
            toast.error(
              "An unexpected error occurred while creating admin account"
            );
          }
        } finally {
          set({ createAdminAccountLoading: false });
        }
      },

      loginAccount: async (payload) => {
        set({ loginAccountLoading: true });

        try {
          const response = await loginAccountApi(payload);
          set({ authUser: response.data.data });
          toast.success(response.data.message);
          return response.data.data;
        } catch (error) {
          console.error("Failed to login user account", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message || "Failed to login user account"
              );
            } else {
              toast.error(error.message || "Failed to login user account");
            }
          } else {
            toast.error(
              "An unexpected error occurred while logging in user account"
            );
          }
        } finally {
          set({ loginAccountLoading: false });
        }
      },

      deleteUserById: async (id) => {
        set({ deleteAccountLoading: true });

        try {
          const response = await deleteUserByIdApi(id);
          set((state) => ({
            allAdminUsers: state.allAdminUsers.filter(
              (admin) => admin._id !== id
            ),
          }));
          toast.success(response.data.message);
        } catch (error) {
          console.error("Failed to login user account", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message || "Failed to login user account"
              );
            } else {
              toast.error(error.message || "Failed to login user account");
            }
          } else {
            toast.error(
              "An unexpected error occurred while logging in user account"
            );
          }
        } finally {
          set({ deleteAccountLoading: false });
        }
      },

      logoutAccount: async () => {
        try {
          set({ authUser: null });
          toast.success("Logout successfully!");
        } catch (error) {
          console.error("Error logging out", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error(error.message);
            }
          } else {
            toast.error("An unexpected error occurred.");
          }
        }
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
