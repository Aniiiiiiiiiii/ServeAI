import { create } from "zustand";
import { orders as demoOrders } from "@/lib/demo/orders";
import type { OrderStatus } from "@/types";

type Order = (typeof demoOrders)[number] & {
  readyAt?: string;
  isDelayed?: boolean;
};

type OrderStore = {
  orders: Order[];
  updateOrderStatus: (ids: string[], status: OrderStatus) => void;
  markExpiredReadyOrdersAsDelayed: () => void;
};

const READY_DELAY_LIMIT = 2 * 60 * 1000; // testing: 10 sec

export const useOrderStore = create<OrderStore>((set) => ({
  orders: demoOrders.map((order) => ({
    ...order,
    readyAt: (order as any).readyAt || undefined,
    isDelayed: (order as any).isDelayed || false,
  })),

  updateOrderStatus: (ids, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        ids.includes(order.id)
          ? {
              ...order,
              status,
              readyAt: status === "Ready" ? new Date().toISOString() : order.readyAt,
              isDelayed: status === "Ready" ? false : order.isDelayed,
            }
          : order
      ),
    })),

  markExpiredReadyOrdersAsDelayed: () =>
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.status !== "Ready" || !order.readyAt) return order;

        const readyTime = new Date(order.readyAt).getTime();
        const isExpired = Date.now() - readyTime > READY_DELAY_LIMIT;

        return isExpired
          ? {
              ...order,
              isDelayed: true,
            }
          : order;
      }),
    })),
}));