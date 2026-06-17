"use client";

import * as React from "react";

import { cn } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-12 w-full rounded-2xl border border-charcoal-100 bg-white px-4 text-sm font-bold text-charcoal-950 outline-none placeholder:text-charcoal-400 focus:border-lime-400 focus:ring-4 focus:ring-lime-100",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

