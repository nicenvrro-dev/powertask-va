import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createTrainingModuleApi } from "../api/module.api";
import type { ServicesStore } from "../pages/admin/add-modules/types/services.type";

export const useServiceStore = create(
  persist<ServicesStore>(
    (set) => ({
      createTrainingModuleLoading: false,

      createTrainingModule: async (payload) => {
        set({ createTrainingModuleLoading: true });

        try {
          const response = await createTrainingModuleApi(payload);
          toast.success(response.data.message);
          return response.data.data;
        } catch (error) {
          console.error("Failed to create training module", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message ||
                  "Failed to create training module"
              );
            } else {
              toast.error(error.message || "Failed to create training module");
            }
          } else {
            toast.error(
              "An unexpected error occurred while creating new training module"
            );
          }
        } finally {
          set({ createTrainingModuleLoading: false });
        }
      },
    }),
    {
      name: "service-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
