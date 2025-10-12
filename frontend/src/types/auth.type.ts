export type CreateAccountPayload = {
  fullname: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginAccountPayload = {
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: "user" | "admin";
};

export type UserAuthStore = {
  createNewAccountLoading: boolean;
  loginAccountLoading: boolean;

  authUser: AuthenticatedUser | null;

  createNewAccount: (payload: CreateAccountPayload) => Promise<void>;
  loginAccount: (payload: LoginAccountPayload) => Promise<AuthenticatedUser>;
  logoutAccount: () => Promise<void>;
};
