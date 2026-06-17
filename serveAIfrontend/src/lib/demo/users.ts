import type { AuthUser } from "@/types/auth";

export const mockUsers: AuthUser[] = [
  {
    id: "user-admin-001",
    name: "Admin User",
    email: "admin@serveai.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "user-chef-001",
    name: "Chef User",
    email: "chef@serveai.com",
    password: "chef123",
    role: "chef",
  },
  {
    id: "user-waiter-001",
    name: "Waiter User",
    email: "waiter@serveai.com",
    password: "waiter123",
    role: "waiter",
  },
];
