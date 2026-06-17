"use client";

import { Button, CartItem, PageHeader, SectionCard } from "@/components/app-components";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const subtotal = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const taxes = Math.round(subtotal * 0.05);

  return (
    <main className="mx-auto grid max-w-5xl gap-6 p-4 md:p-8">
      <PageHeader title="Cart" description="Review items, adjust quantities, add special instructions, and place the order." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-3">
          {lines.map((line) => <CartItem key={line.item.id} id={line.item.id} name={line.item.name} price={line.item.price} quantity={line.quantity} />)}
          <textarea aria-label="Special instructions" placeholder="Special instructions for the kitchen" className="min-h-28 rounded-3xl border border-charcoal-100 bg-white p-4 outline-none focus:border-lime-400" />
        </div>
        <SectionCard>
          <h2 className="text-xl font-black">Order summary</h2>
          <div className="mt-4 grid gap-3 text-sm font-bold">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Taxes placeholder</span><span>{formatCurrency(taxes)}</span></div>
            <div className="flex justify-between border-t border-charcoal-100 pt-3 text-lg"><span>Total</span><span>{formatCurrency(subtotal + taxes)}</span></div>
          </div>
          <Button className="mt-6 w-full" disabled={!lines.length} onClick={() => { toast.success("Order placed"); router.push("/order/checkout"); }}>Place order</Button>
        </SectionCard>
      </div>
    </main>
  );
}
