"use client";

import { useState } from "react";
import { AddItemDialog, DataTable, FilterBar, SearchInput, StatusBadge } from "@/components/app-components";
import {PageHeader} from "@/components/common/PageHeader";

import { categories } from "@/lib/demo/categories";
import { menuItems as demoMenu } from "@/lib/demo/menu";
import { toast } from "sonner";

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState(demoMenu);
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === "All" || item.categoryId === category),
  );

  return (
    <div className="grid gap-6">
      <PageHeader title="Menu" description="Manage menu pricing, availability, category filters, and item creation." action={<AddItemDialog />} />
      <FilterBar>
        <SearchInput value={query} onChange={setQuery} placeholder="Search menu items" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-2xl border border-charcoal-100 px-4 text-sm font-bold">
          <option value="All">All categories</option>
          {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </FilterBar>
      <DataTable
        headers={["Item", "Category", "Price", "Prep", "Availability", "Inline Edit"]}
        rows={filtered.map((item) => [
          <strong key="name">{item.name}<br /><span className="text-xs text-charcoal-400">{item.tags.join(", ")}</span></strong>,
          categories.find((cat) => cat.id === item.categoryId)?.name ?? "Unmapped",
          <input key="price" aria-label={`Price for ${item.name}`} defaultValue={item.price} className="h-10 w-24 rounded-xl border border-charcoal-100 px-3 font-bold" />,
          item.prepTime,
          <StatusBadge key="avail" status={item.available ? "Available" : "Unavailable"} />,
          <label key="toggle" className="inline-flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={item.available} onChange={() => { setItems((prev) => prev.map((row) => row.id === item.id ? { ...row, available: !row.available } : row)); toast.success("Availability updated"); }} /> Active</label>,
        ])}
      />
    </div>
  );
}
