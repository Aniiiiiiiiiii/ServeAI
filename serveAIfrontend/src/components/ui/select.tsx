"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/utils/cn"; // Aapke project configuration ke hisab se absolute path
import type { OrderStatus } from "@/types";
import { orderStatuses } from "@/utils/orderStatus";

export const Select = SelectPrimitive.Root;

export function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-12 w-full items-center justify-between gap-2 rounded-2xl border border-charcoal-100 bg-white px-4 text-sm font-bold text-charcoal-950 outline-none focus:border-lime-400 focus:ring-4 focus:ring-lime-100 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-70" />
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: SelectPrimitive.SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "z-50 max-h-96 overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-1 shadow-soft",
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export const SelectViewport = SelectPrimitive.Viewport;

export function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-xl px-3 py-2 pr-9 text-sm font-bold text-charcoal-950 outline-none focus:bg-charcoal-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {/* pr-9 padding right ensure karta hai ki text checkbox icon ke upar overlap na ho */}
      <span className="absolute right-3 inline-flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export const SelectLabel = SelectPrimitive.Label;
export const SelectSeparator = SelectPrimitive.Separator;

export function SelectValue({
  placeholder,
  ...props
}: SelectPrimitive.SelectValueProps) {
  return <SelectPrimitive.Value placeholder={placeholder} {...props} />;
}

/* ==========================================
   MERGED WRAPPER FOR INLINE STATUS SELECT
   ========================================== */
interface InlineStatusSelectProps {
  value: OrderStatus;
  onChange: (value: OrderStatus) => void;
}

export function InlineStatusSelect({ value, onChange }: InlineStatusSelectProps) {
  const handleValueChange = (newValue: string) => {
    onChange(newValue as OrderStatus);
    toast.success("Order status updated");
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="h-10 rounded-xl text-xs text-charcoal-800 border-charcoal-100 bg-white px-3 font-bold outline-none focus:border-lime-400 focus:ring-4 focus:ring-lime-100">
        <SelectValue placeholder="Update order status" />
      </SelectTrigger>
      
      <SelectContent className="rounded-xl border-charcoal-100 bg-white p-1 shadow-soft">
        {orderStatuses.map((status) => (
          <SelectItem 
            key={status} 
            value={status} 
            className="text-xs font-bold text-charcoal-950 focus:bg-charcoal-50"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}