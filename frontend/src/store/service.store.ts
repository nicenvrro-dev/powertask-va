import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  createTrainingModuleApi,
  fetchServicesDataApi,
} from "../api/module.api";
import type { ServicesStore } from "../pages/admin/add-modules/types/services.type";

export const useServiceStore = create(
  persist<ServicesStore>(
    (set) => ({
      createTrainingModuleLoading: false,
      fetchServicesDataLoading: false,

      servicesData: null,

      createTrainingModule: async (payload) => {
        set({ createTrainingModuleLoading: true });

        try {
          const response = await createTrainingModuleApi(payload);
          console.log("Created training module:", response.data.data);
          console.log("Category:", response.data.category);
          toast.success("Training module created successfully");
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

      fetchServicesData: async () => {
        set({ fetchServicesDataLoading: true });

        try {
          const response = await fetchServicesDataApi();
          console.log("Fetched all training modules:", response.data.data);
          return response.data.data;
        } catch (error) {
          console.error("Failed to fetch service collection", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message ||
                  "Failed to fetch service collection"
              );
            } else {
              toast.error(
                error.message || "Failed to fetch service collection"
              );
            }
          } else {
            toast.error(
              "An unexpected error occurred while fetching service collection"
            );
          }
        } finally {
          set({ fetchServicesDataLoading: false });
        }
      },
    }),
    {
      name: "service-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
