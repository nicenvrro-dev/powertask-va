import instance from "../axios/axios";
import type {
  CreateUserAccount,
  LoginAccountPayload,
} from "../types/auth.type";

export const getAllUserAccountApi = async () => {
  const response = instance.get("/user/get-all-user");
  return response;
};

export const createNewAccountApi = async (payload: CreateUserAccount) => {
  const response = instance.post("/user/create-user-account", payload);
  return response;
};

export const loginAccountApi = async (payload: LoginAccountPayload) => {
  const response = instance.post("/user/login", payload);
  return response;
};

export const deleteUserByIdApi = async (id: string) => {
  const response = instance.delete(`/user/delete/${id}`);
  return response;
};
