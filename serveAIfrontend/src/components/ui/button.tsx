"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-100 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-lime-400 text-charcoal-950 hover:bg-lime-300",
        destructive: "bg-rose-600 text-white hover:bg-rose-500",
        outline:
          "border border-charcoal-100 bg-transparent text-charcoal-950 hover:bg-charcoal-50",
        secondary: "bg-charcoal-50 text-charcoal-950 hover:bg-charcoal-100",
        ghost: "hover:bg-charcoal-50",
        link: "underline-offset-4 hover:underline text-charcoal-950",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-3xl px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    // Keep it simple: for now we don't support Slot to avoid extra dependency.
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

