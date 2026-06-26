"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Menu as MenuIcon,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/formatCurrency";
import {buttonVariants, Button} from "@/components/ui/button";

export function QuantitySelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-grid grid-cols-[36px_40px_36px] items-center rounded-xl border border-charcoal-100 bg-white">
      <button aria-label="Decrease quantity" className="grid h-9 place-items-center" onClick={() => onChange(value - 1)}>
        <Minus className="size-4" />
      </button>
      <span className="text-center text-sm font-black">{value}</span>
      <button aria-label="Increase quantity" className="grid h-9 place-items-center" onClick={() => onChange(value + 1)}>
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function CartSummary({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const subtotal = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  if (!lines.length) return null;

  return (
    <div className={cn("sticky bottom-4 z-30 mx-auto max-w-3xl rounded-2xl bg-charcoal-950 p-3 text-white shadow-strong", compact && "bottom-0 rounded-none")}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold">{count} items</p>
          <p className="text-lg font-black">{formatCurrency(subtotal)}</p>
        </div>
        <Button onClick={() => router.push("/order/cart")}>
          <ShoppingBag className="size-4" /> View cart
        </Button>
      </div>
    </div>
  );
}

export function CartItem({ id, name, price, quantity }: { id: string; name: string; price: number; quantity: number }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-charcoal-100 bg-white p-4">
      <div>
        <h3 className="font-black">{name}</h3>
        <p className="text-sm font-semibold text-charcoal-500">{formatCurrency(price)}</p>
      </div>
      <div className="flex items-center gap-3">
        <QuantitySelector value={quantity} onChange={(next) => updateQuantity(id, next)} />
        <button aria-label={`Remove ${name}`} onClick={() => { removeItem(id); toast.success("Item removed"); }} className="rounded-xl p-2 text-rose-500 hover:bg-rose-50">
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}