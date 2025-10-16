import instance from "../axios/axios";
import type { CreateActivityLog } from "../types/activity.type";

export const fetchActivityLogsApi = async () => {
  const response = instance.get("/activity/fetch");
  return response;
};

export const createActivityLogApi = async (payload: CreateActivityLog) => {
  const response = instance.post("/activity/create", payload);
  return response;
};
