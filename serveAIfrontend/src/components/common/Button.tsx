"use client";

import { cn } from "@/utils/cn";


export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-lime-300 disabled:cursor-not-allowed disabled:opacity-50 ",
        variant === "primary" && "bg-lime-400 text-charcoal-950 shadow-soft hover:bg-lime-300",
        variant === "secondary" && "bg-charcoal-950 text-white hover:bg-charcoal-800",
        variant === "ghost" && "bg-white text-charcoal-800 ring-1 ring-charcoal-100 hover:bg-charcoal-50",
        variant === "danger" && "bg-rose-500 text-white hover:bg-rose-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}