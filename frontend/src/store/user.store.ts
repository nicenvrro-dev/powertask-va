import { createNewAccountApi, loginAccountApi } from "../api/user.api";
import type { UserAuthStore } from "../types/auth.type";
import { AxiosError } from "axios";

import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist<UserAuthStore>(
    (set) => ({
      createNewAccountLoading: false,
      loginAccountLoading: false,
      authUser: null,

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
              toast.error(error.response.data.message || "Failed to create user account");
            } else {
              toast.error(error.message || "Failed to create user account");
            }
          } else {
            toast.error("An unexpected error occurred while creating user account");
          }
        } finally {
          set({ createNewAccountLoading: false });
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
              toast.error(error.response.data.message || "Failed to login user account");
            } else {
              toast.error(error.message || "Failed to login user account");
            }
          } else {
            toast.error("An unexpected error occurred while logging in user account");
          }
        } finally {
          set({ loginAccountLoading: false });
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
