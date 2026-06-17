"use client";

import * as React from "react";

import { cn } from "./utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[120px] w-full rounded-2xl border border-charcoal-100 bg-white px-4 py-3 text-sm font-bold text-charcoal-950 outline-none placeholder:text-charcoal-400 focus:border-lime-400 focus:ring-4 focus:ring-lime-100",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

