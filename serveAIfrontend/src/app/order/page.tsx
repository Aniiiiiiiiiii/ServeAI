"use client";

import { useState } from "react";
import { SearchInput } from "@/components/app-components";
import {CartSummary} from "@/components/common/Cart";
import {ProductCard} from "@/components/common/ProductCard";
import {buttonVariants, Button} from "@/components/ui/button";
import { categories } from "@/lib/demo/categories";
import { menuItems } from "@/lib/demo/menu";
import { cn } from "@/utils/cn";

export default function GuestMenuPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = menuItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === "All" || item.categoryId === category),
  );

  return (
    <main>
      <header className="sticky top-0 z-30 border-b border-charcoal-100 bg-white/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase text-lime-700">Room 502 · QR ordering</p>
          <h1 className="mt-1 text-2xl font-black text-charcoal-950">What would you like?</h1>
          <div className="mt-4"><SearchInput value={query} onChange={setQuery} placeholder="Search biryani, coffee, dessert" /></div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {["All", ...categories.map((item) => item.id)].map((id) => {
              const label = id === "All" ? "All" : categories.find((item) => item.id === id)?.name;
              return <button key={id} onClick={() => setCategory(id)} className={cn("whitespace-nowrap rounded-full px-4 py-2 text-sm font-black", category === id ? "bg-charcoal-950 text-white" : "bg-charcoal-50 text-charcoal-600")}>{label}</button>;
            })}
          </div>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => <ProductCard key={item.id} item={item} />)}
      </section>
      <CartSummary />
    </main>
  );
}
