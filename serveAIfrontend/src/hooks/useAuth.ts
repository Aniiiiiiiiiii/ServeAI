"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  getCurrentUser,
  getDefaultRouteByRole,
  loginUser,
  logoutUser,
} from "@/lib/auth";
import type { SafeAuthUser } from "@/types/auth";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<SafeAuthUser | null>(() => getCurrentUser());

  const login = useCallback((email: string, password: string) => {
    const loggedInUser = loginUser(email, password);
    if (!loggedInUser) {
      toast.error("Invalid email or password");
      return false;
    }

    setUser(loggedInUser);
    toast.success(`Welcome back, ${loggedInUser.name}`);
    router.replace(getDefaultRouteByRole(loggedInUser.role));
    return true;
  }, [router]);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    toast.success("Logged out successfully");
    router.replace("/auth/login");
  }, [router]);

  return { user, role: user?.role, isReady: true, login, logout };
}
