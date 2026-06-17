import { mockUsers } from "@/lib/demo/users";
import type { SafeAuthUser, UserRole } from "@/types/auth";

const USER_KEY = "serveai:user";
const ROLE_KEY = "serveai:role";

const isBrowser = () => typeof window !== "undefined";

function withoutPassword(user: (typeof mockUsers)[number]): SafeAuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function getCurrentUser(): SafeAuthUser | null {
  if (!isBrowser()) return null;

  const stored = window.localStorage.getItem(USER_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as SafeAuthUser;
  } catch {
    logoutUser();
    return null;
  }
}

export function loginUser(email: string, password: string): SafeAuthUser | null {
  const user = mockUsers.find(
    (candidate) =>
      candidate.email.toLowerCase() === email.trim().toLowerCase() &&
      candidate.password === password,
  );

  if (!user || !isBrowser()) return null;

  const safeUser = withoutPassword(user);
  window.localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
  window.localStorage.setItem(ROLE_KEY, safeUser.role);
  return safeUser;
}

export function logoutUser() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(ROLE_KEY);
}

export function getDefaultRouteByRole(role: UserRole) {
  const routes: Record<UserRole, string> = {
    admin: "/admin/dashboard",
    chef: "/kitchen",
    waiter: "/order",
  };

  return routes[role];
}

export function canAccessRoute(role: UserRole, pathname: string) {
  if (pathname === "/" || pathname.startsWith("/auth")) return true;
  if (role === "admin") return true;
  if (role === "chef") return pathname === "/kitchen";
  if (role === "waiter") return pathname.startsWith("/order") || pathname === "/delivery";
  return false;
}
