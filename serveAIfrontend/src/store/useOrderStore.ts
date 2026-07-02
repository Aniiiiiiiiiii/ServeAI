import {create} from "zustand";
import { orders as demoOrders } from "@/lib/demo/orders";
import type { OrderStatus } from "@/types";



type Order = (typeof demoOrders)[number] & { readyAt?: string };

type OrderStore = {
    orders: Order[];
    updateOrderStatus: (id:string[], status:OrderStatus) => void;
}


export const useOrderStore  = create<OrderStore>((set) =>({
    orders: demoOrders.map((order) =>({
        ...order,
        readyAt: (order as any).readyAt || undefined,
    })),

    updateOrderStatus: (ids, status)=>
        set((state) => ({
            orders: state.orders.map((order) =>
                ids.includes(order.id)
                ? {
                    ...order,
                    status,
                    readyAt:
                        status === "Ready"
                        ? new Date().toISOString():order.readyAt,
                }
                :order
            ),
        })),

}));