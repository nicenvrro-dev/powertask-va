import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ActivityLogStore } from "../types/activity.type";
import {
  fetchActivityLogsApi,
  createActivityLogApi,
} from "../api/activity.api";

export const useActivityLogStore = create(
  persist<ActivityLogStore>(
    (set) => ({
      createActivityLogLoading: false,
      fetchActivityLogLoading: false,
      activityLogs: [],

      fetchActivityLogs: async () => {
        set({ fetchActivityLogLoading: true });

        try {
          const response = await fetchActivityLogsApi();
          const activityLogs = response.data.data;
          set({ activityLogs: activityLogs });
          return activityLogs;
        } catch (error) {
          console.error("Failed to fetch activity logs", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              console.error(
                error.response.data.message || "Failed to fetch activity logs"
              );
            } else {
              console.error(error.message || "Failed to fetch activity logs");
            }
          } else {
            console.error(
              "An unexpected error occurred while fetchin activity logs"
            );
          }
        } finally {
          set({ fetchActivityLogLoading: false });
        }
      },

      createActivityLog: async (payload) => {
        set({ createActivityLogLoading: true });

        try {
          const response = await createActivityLogApi(payload);
          const newActivityLog = response.data.data;
          set((state) => ({
            activityLogs: [...state.activityLogs, newActivityLog],
          }));
          return newActivityLog;
        } catch (error) {
          console.error("Failed to create activity", error);
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(
                error.response.data.message || "Failed to create activity"
              );
            } else {
              toast.error(error.message || "Failed to create activity");
            }
          } else {
            toast.error(
              "An unexpected error occurred while logging new activity"
            );
          }
        } finally {
          set({ createActivityLogLoading: false });
        }
      },
    }),
    {
      name: "activityLogs",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
