import instance from "../axios/axios";
import type { CreateAdminAccount } from "../types/auth.type";

export const createAdminAccountApi = async (payload: CreateAdminAccount) => {
  const response = instance.post("/admin/create-admin-account", payload);
  return response;
};

export const getAllAdminAccountApi = async () => {
  const response = instance.get("/admin/get-all-admin");
  return response;
};
