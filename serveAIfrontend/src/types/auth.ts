export type UserRole = "admin" | "chef" | "waiter";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type SafeAuthUser = Omit<AuthUser, "password">;
