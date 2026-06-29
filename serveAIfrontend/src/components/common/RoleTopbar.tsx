"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  ChefHat,
  LogOut,
  Menu as MenuIcon,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/cn";
import { generateInitials } from "@/utils/generateInitials";
import {buttonVariants, Button} from "@/components/ui/button";

export function RoleTopbar({ title, subtitle }: { title: string; subtitle: string }) {
  const pathname = usePathname();
  const { role, user, logout } = useAuth();
  const links = role === "chef"
    ? [{ href: "/kitchen", label: "Kitchen", icon: ChefHat }]
    : role === "waiter"
      ? [
          { href: "/order", label: "Order", icon: ShoppingBag },
          { href: "/delivery", label: "Delivery", icon: Truck },
        ]
      : [
          { href: "/admin/dashboard", label: "Admin", icon: BarChart3 },
          { href: "/kitchen", label: "Kitchen", icon: ChefHat },
          { href: "/delivery", label: "Delivery", icon: Truck },
          { href: "/order", label: "Order", icon: ShoppingBag },
        ];

  return (
    <header className="sticky top-0 z-30 border-b border-charcoal-100 bg-white/90 px-4 py-3 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-lime-400 text-charcoal-950"><ChefHat className="size-5" /></span>
          <div>
            <p className="text-sm font-black text-charcoal-950">{title}</p>
            <p className="text-xs font-semibold text-charcoal-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={cn("inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold", pathname === href ? "bg-charcoal-950 text-white" : "bg-white text-charcoal-600 ring-1 ring-charcoal-100")}>
              <Icon className="size-4" /> {label}
            </Link>
          ))}
          <div className="grid size-10 place-items-center rounded-2xl bg-charcoal-950 text-sm font-black text-white">{generateInitials(user?.name ?? "User")}</div>
          <Button variant="ghost" onClick={logout}><LogOut className="size-4" /> Logout</Button>
        </div>
      </div>
    </header>
  );
}