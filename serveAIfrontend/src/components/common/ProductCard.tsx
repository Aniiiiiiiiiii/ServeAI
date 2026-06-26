"use client";

import {
  Menu as MenuIcon,
  Plus,
} from "lucide-react";
import { ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";
import type { MenuItem } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import {buttonVariants, Button} from "@/components/ui/button";

export function ProductCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft">
      <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} aria-label={item.name} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-charcoal-950">{item.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-charcoal-500">{item.description}</p>
          </div>
          <span className="rounded-full bg-lime-100 px-2 py-1 text-xs font-black text-lime-700">{item.rating}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-black">{formatCurrency(item.price)}</p>
            <p className="text-xs font-semibold text-charcoal-400">{item.prepTime}</p>
          </div>
          <Button
            disabled={!item.available}
            onClick={() => {
              addItem(item);
              toast.success(`${item.name} added to cart`);
            }}
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}