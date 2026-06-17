"use client";

import { useState } from "react";
import { Button, OrderCard, PageHeader, RoleTopbar } from "@/components/app-components";
import { orders as demoOrders } from "@/lib/demo/orders";
import { toast } from "sonner";

export default function DeliveryPage() {
  const [orders, setOrders] = useState(demoOrders);
  const sections = [
    { title: "Ready for Pickup", filter: (status: string) => status === "Ready", action: "Start delivery", next: "Out For Delivery" },
    { title: "Active Deliveries", filter: (status: string) => status === "Out For Delivery", action: "Mark delivered", next: "Delivered" },
    { title: "Completed Deliveries", filter: (status: string) => status === "Delivered" },
  ];

  return (
    <main className="min-h-screen bg-charcoal-50">
      <RoleTopbar title="Delivery Board" subtitle="Pickup, active delivery, and completion tracking" />
      <div className="mx-auto grid max-w-6xl gap-6 p-4 md:p-8">
        <PageHeader title="Delivery" description="Pickup, active delivery, and completion lanes optimized for staff on the move." />
        <div className="grid gap-5 lg:grid-cols-3">
          {sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-charcoal-100 bg-white p-4 shadow-soft">
              <h2 className="text-xl font-black">{section.title}</h2>
              <div className="mt-4 grid gap-4">
                {orders.filter((order) => section.filter(order.status)).map((order) => (
                  <div key={order.id} className="grid gap-3">
                    <OrderCard order={order} />
                    {section.next ? <Button onClick={() => { setOrders((prev) => prev.map((item) => item.id === order.id ? { ...item, status: section.next as never } : item)); toast.success(section.action); }}>{section.action}</Button> : null}
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
