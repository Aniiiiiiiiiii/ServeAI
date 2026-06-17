"use client";

import { useState } from "react";
import { Button, OrderCard, PageHeader, RoleTopbar, StatusBadge } from "@/components/app-components";
import { orders as demoOrders } from "@/lib/demo/orders";
import type { OrderStatus } from "@/types";
import { toast } from "sonner";

const columns: { title: string; statuses: OrderStatus[]; next?: OrderStatus }[] = [
  { title: "New Orders", statuses: ["Placed", "Accepted"], next: "Preparing" },
  { title: "Preparing", statuses: ["Preparing"], next: "Ready" },
  { title: "Ready", statuses: ["Ready"], next: "Out For Delivery" },
  { title: "Delayed", statuses: ["Out For Delivery"] },
];

export default function KitchenPage() {
  const [orders, setOrders] = useState(demoOrders);

  function moveOrder(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
    toast.success(`Order moved to ${status}`);
  }

  return (
    <main className="min-h-screen bg-charcoal-50">
      <RoleTopbar title="Kitchen Board" subtitle="Chef-only prep workspace" />
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:p-8">
        <PageHeader title="Kitchen Display" description="Kanban-ready prep board with large, readable cards and one-tap movement." />
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => (
            <section key={column.title} className="rounded-3xl border border-charcoal-100 bg-white/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-black">{column.title}</h2>
                <StatusBadge status={String(orders.filter((order) => column.statuses.includes(order.status)).length)} />
              </div>
              <div className="grid gap-4">
                {orders.filter((order) => column.statuses.includes(order.status)).map((order) => (
                  <div key={order.id} className="grid gap-3">
                    <OrderCard order={order} />
                    {column.next ? <Button variant="secondary" onClick={() => moveOrder(order.id, column.next!)}>Move to {column.next}</Button> : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
