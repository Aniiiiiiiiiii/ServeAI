"use client";

import { useState } from "react";
import { FilterBar, OrderCard, SearchInput, StatusBadge } from "@/components/app-components";
import {DataTable} from "@/components/common/DataTable";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  InlineStatusSelect,
} from "@/components/ui/select";
import {PageHeader} from "@/components/common/PageHeader";

import { orders as demoOrders } from "@/lib/demo/orders";
import type { OrderStatus } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { orderStatuses } from "@/utils/orderStatus";

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OrderStatus | "All">("All");
  const [orders, setOrders] = useState(demoOrders);
  const filtered = orders.filter((order) =>
    `${order.id} ${order.room} ${order.guest}`.toLowerCase().includes(query.toLowerCase()) &&
    (status === "All" || order.status === status),
  );

  return (
    <div className="grid gap-6">
      <PageHeader title="Orders" description="Search, filter, and update live order states inline without modal friction." />
      <FilterBar>
        <SearchInput value={query} onChange={setQuery} placeholder="Search orders, rooms, guests" />
        <select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus | "All")} className="h-11 rounded-2xl border border-charcoal-100 px-4 text-sm font-bold">
          <option>All</option>
          {orderStatuses.map((item) => <option key={item}>{item}</option>)}
        </select>
      </FilterBar>
      <DataTable
        headers={["Order", "Guest", "Status", "Payment", "Total", "Edit"]}
        rows={filtered.map((order) => [
          <strong key="id">{order.id}<br /><span className="text-xs text-charcoal-400">{order.room}</span></strong>,
          order.guest,
          <StatusBadge key="status" status={order.status} />,
          order.paymentStatus,
          formatCurrency(order.total),
          <InlineStatusSelect key="edit" value={order.status} onChange={(next) => setOrders((prev) => prev.map((item) => item.id === order.id ? { ...item, status: next } : item))} />,
        ])}
      />
      <div className="grid gap-4 md:hidden">{filtered.map((order) => <OrderCard key={order.id} order={order} editable />)}</div>
    </div>
  );
}
