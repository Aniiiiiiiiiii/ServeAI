"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingState } from "@/components/app-components";
import { canAccessRoute, getCurrentUser, getDefaultRouteByRole } from "@/lib/auth";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    setMounted(true);
  }, []);

  const isLoginRoute = pathname === "/" || pathname.startsWith("/auth");

  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      if (!isLoginRoute) {
        toast.error("Please log in to continue");
        router.replace("/auth/login");
      }
      return;
    }

    if (isLoginRoute) {
      router.replace(getDefaultRouteByRole(user.role));
      return;
    }

    if (!canAccessRoute(user.role, pathname)) {
      toast.error("You do not have access to that area");
      router.replace(getDefaultRouteByRole(user.role));
    }
  }, [mounted, isLoginRoute, pathname, router, user]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <LoadingState label="Checking access" />
      </div>
    );
  }

  const allowed = user
    ? !isLoginRoute && canAccessRoute(user.role, pathname)
    : isLoginRoute;

  if (!allowed) {
    return (
      <div className="min-h-screen bg-background p-4">
        <LoadingState label="Checking access" />
      </div>
    );
  }

  return children;
}