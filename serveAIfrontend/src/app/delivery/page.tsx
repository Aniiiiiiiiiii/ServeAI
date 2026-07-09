"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/app-components";
import { PageHeader } from "@/components/common/PageHeader";
import { RoleTopbar } from "@/components/common/RoleTopbar";
import { OrderCard } from "@/components/common/OrderCard";

import { Button } from "@/components/ui/button";
import { orders as demoOrders } from "@/lib/demo/orders";
import type { OrderStatus } from "@/types";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useOrderStore } from "@/store/useOrderStore";


// Delivery Workflow Columns Definition matching enterprise standards
const columns: {
  title: string;
  statuses: OrderStatus[];
  actionLabel: string;
  next?: OrderStatus;
}[] = [
  { 
    title: "Ready for Pickup", 
    statuses: ["Ready"], 
    actionLabel: "Start Delivery", 
    next: "Out For Delivery" 
  },
  { 
    title: "Active Deliveries", 
    statuses: ["Out For Delivery"], 
    actionLabel: "Mark Delivered", 
    next: "Delivered" 
  },
  { 
    title: "Completed Deliveries", 
    statuses: ["Delivered"],
    actionLabel: "Completed"
  },
];

export default function DeliveryPage() {
  // Demo orders extended type locally mapping if readyAt exists
  // const [orders, setOrders] = useState(() => 
  //   demoOrders.map(order => ({ ...order, readyAt: (order as any).readyAt || undefined }))
  // );

  const orders = useOrderStore((state) => state.orders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);


  // Track selected order IDs globally at the parent level
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // Individual toggle function passed down to OrderCard (Same as Kitchen)
  function toggleOrderSelection(id: string) {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  // Handle Select All click logic for a specific delivery column
  function handleSelectAllToggle(columnStatuses: OrderStatus[], currentOrdersInColumn: typeof orders) {
    const columnOrderIds = currentOrdersInColumn.map((o) => o.id);
    const areAllSelected = columnOrderIds.every((id) => selectedOrderIds.includes(id));

    if (areAllSelected) {
      // Uncheck all in this column
      setSelectedOrderIds((prev) => prev.filter((id) => !columnOrderIds.includes(id)));
    } else {
      // Check all in this column safely maintaining previous column selections
      setSelectedOrderIds((prev) => {
        const uniqueIds = new Set([...prev, ...columnOrderIds]);
        return Array.from(uniqueIds);
      });
    }
  }

  // Bulk move workflow for the single footer button callout
  function handleColumnMove(columnStatuses: OrderStatus[], nextStatus: OrderStatus, successMessage: string) {
    const currentOrdersInColumn = orders.filter((order) => columnStatuses.includes(order.status));
    const orderIdsInColumn = currentOrdersInColumn.map((o) => o.id);

    // Determine target items: chosen individuals, or fallback to moving everything in this column
    const selectedInColumn = orderIdsInColumn.filter((id) => selectedOrderIds.includes(id));
    // const idsToMove = selectedInColumn.length > 0 ? selectedInColumn : orderIdsInColumn;
    const idsToMove = selectedInColumn;


    if (idsToMove.length === 0) {
      toast.error("No orders to move in this column.");
      return;
    }

    // setOrders((prev) =>
    //   prev.map((order) => {
    //     if (idsToMove.includes(order.id)) {
    //       return { 
    //         ...order, 
    //         status: nextStatus 
    //       };
    //     }
    //     return order;
    //   })
    // );

    updateOrderStatus(idsToMove, nextStatus);

    // Clear moved selections from state array
    setSelectedOrderIds((prev) => prev.filter((id) => !idsToMove.includes(id)));
    toast.success(`${successMessage} for ${idsToMove.length} order(s)`);
  }

  return (
    <main className="min-h-screen bg-charcoal-50">
      {/* Role Topbar aligned with core delivery workflow */}
      <RoleTopbar title="Delivery Board" subtitle="Fulfillment & dispatch tracking workspace" />
      
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:p-8">
        <PageHeader
          title="Delivery Dispatch"
          description="Track active shipments, complete guest order dispatch queues, and trigger bulk updates."
        />
        
        {/* Adjusted to 3 grid columns to perfectly match delivery stages */}
        <div className="grid gap-4 xl:grid-cols-3 items-start">
          {columns.map((column) => {
            // Filter down orders matching this column's status scope
            const ordersInColumn = orders.filter((order) =>
              column.statuses.includes(order.status)
            );

            // Calculate if the column's select-all box should look checked
            const columnOrderIds = ordersInColumn.map((o) => o.id);
            const isSelectAllChecked =
              columnOrderIds.length > 0 &&
              columnOrderIds.every((id) => selectedOrderIds.includes(id));

            // Determine if individual selections exist to rename button content dynamically
            const directSelectionsCount = columnOrderIds.filter((id) => selectedOrderIds.includes(id)).length;

            return (
              <section
                key={column.title}
                className="flex flex-col rounded-3xl border border-charcoal-100 bg-white/70 p-4 h-fit"
              >
                {/* Column Title Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-black">{column.title}</h2>
                  <StatusBadge status={String(ordersInColumn.length)} />
                </div>

                {/* Select All Action Bar */}
                {ordersInColumn.length > 0 && (
                  <FieldGroup className=" w-56 mb-4">
                    <Field orientation="horizontal" className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        id={`selectAll-${column.title}`}
                        checked={isSelectAllChecked}
                        onCheckedChange={() => handleSelectAllToggle(column.statuses, ordersInColumn)}
                        className="border-gray-600"
                      />
                      <FieldLabel htmlFor={`selectAll-${column.title}`} className="cursor-pointer font-medium select-none">
                        Select All
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                )}

                {/* Card Flow Container */}
                <div className="grid gap-4 align-top content-start">
                  {ordersInColumn.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isSelected={selectedOrderIds.includes(order.id)}
                      onSelectToggle={() => toggleOrderSelection(order.id)}
                    />
                  ))}

                  {ordersInColumn.length === 0 && (
                    <div className="text-center py-8 text-sm text-charcoal-400 font-medium italic">
                      No orders in this stage
                    </div>
                  )}
                </div>

                {/* Single Footer Column Action Button */}
                {column.next && ordersInColumn.length > 0 && ordersInColumn.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-charcoal-100/50">
                    <Button
                      className="w-full shadow-sm font-bold"
                      onClick={() => handleColumnMove(column.statuses, column.next!, column.actionLabel)}
                    >
                      {directSelectionsCount > 0
                        ? `${column.actionLabel} Selected (${directSelectionsCount})`
                        : `${column.actionLabel} All`}
                    </Button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}