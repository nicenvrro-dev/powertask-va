import instance from "../axios/axios";
import type { CreateAccountPayload, LoginAccountPayload } from "../types/auth.type";

export const createNewAccountApi = async (payload: CreateAccountPayload) => {
  const response = instance.post("/user/create-user-account", payload);
  return response;
};

export const loginAccountApi = async (payload: LoginAccountPayload) => {
  const response = instance.post("/user/login", payload);
  return response;
};
