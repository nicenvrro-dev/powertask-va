import instance from "../axios/axios";
import type { CreateTrainingModulePayload } from "../pages/admin/add-modules/types/services.type";

export const createTrainingModuleApi = async (
  payload: CreateTrainingModulePayload
) => {
  const response = instance.post("/module/create-module", payload);
  return response;
};

export const fetchServicesDataApi = async () => {
  const response = instance.get("/module/fetch-services-data");
  return response;
};
