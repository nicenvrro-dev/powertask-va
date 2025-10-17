import instance from "../axios/axios";
import type { CreateTrainingModulePayload } from "../pages/admin/add-modules/types/services.type";

export const createTrainingModuleApi = async (
  payload: CreateTrainingModulePayload
) => {
  const response = instance.post("/module/create-module", payload);
  return response;
};
