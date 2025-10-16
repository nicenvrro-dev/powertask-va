export type Services = "sales" | "administrative-support" | "customer-service";

export type CreateUserAccount = {
  fullname: string;
  email: string;
  phone: string;
  serviceFocus: Services;
  password: string;
};

export type CreateAdminAccount = {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "super_admin";
};

export type LoginAccountPayload = {
  email: string;
  password: string;
};

export type BaseUserAccount = {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  serviceFocus?: Services;
  role: "user" | "admin" | "super_admin";
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthenticatedUser = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  serviceFocus: Services | null;
  role: "user" | "admin" | "super_admin";
  active: boolean;
};

export type UserAuthStore = {
  createNewAccountLoading: boolean;
  createAdminAccountLoading: boolean;
  loginAccountLoading: boolean;
  deleteAccountLoading: boolean;

  authUser: AuthenticatedUser | null;
  allUsers: BaseUserAccount[];
  allAdminUsers: BaseUserAccount[];

  getAllUserAccount: () => Promise<BaseUserAccount>;
  getAllAdminAccount: () => Promise<BaseUserAccount>;

  createNewAccount: (payload: CreateUserAccount) => Promise<void>;
  createAdminAccount: (payload: CreateAdminAccount) => Promise<BaseUserAccount>;
  loginAccount: (payload: LoginAccountPayload) => Promise<AuthenticatedUser>;
  deleteUserById: (id: string) => Promise<void>;
  logoutAccount: () => Promise<void>;
};
