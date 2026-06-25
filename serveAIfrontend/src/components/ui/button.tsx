"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn"; // Aapne hard-coded component mein yahi path use kiya tha

const buttonVariants = cva(
  // Base styles (Aapke custom layout aur typography preferences ke sath balanced)
  "inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-lime-300 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        // Aapke purane variants ko cva mapping mein convert kiya hai:
        primary: "bg-lime-400 text-charcoal-950 shadow-soft hover:bg-lime-300",
        secondary: "bg-charcoal-950 text-white hover:bg-charcoal-800",
        ghost: "bg-white text-charcoal-800 ring-1 ring-charcoal-100 hover:bg-charcoal-50",
        danger: "bg-rose-500 text-white hover:bg-rose-600",
        
        // Shadcn default mapping fallback (agar kisi purane components mein ye references scale hon)
        default: "bg-lime-400 text-charcoal-950 shadow-soft hover:bg-lime-300",
        destructive: "bg-rose-500 text-white hover:bg-rose-600",
        outline: "bg-white text-charcoal-800 ring-1 ring-charcoal-100 hover:bg-charcoal-50",
        link: "underline-offset-4 hover:underline text-charcoal-950",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-2xl px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary", // Taaki aapka purane codes default automatic adjust ho jaayein
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };