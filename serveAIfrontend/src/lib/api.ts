import axios from "axios";
import { categories } from "@/lib/demo/categories";
import { insights } from "@/lib/demo/insights";
import { menuItems } from "@/lib/demo/menu";
import { orders } from "@/lib/demo/orders";
import { reviews } from "@/lib/demo/reviews";
import { rooms } from "@/lib/demo/tables";
import { staff } from "@/lib/demo/staff";
import type { MenuItem, OrderStatus } from "@/types";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 10000,
});

const wait = <T>(data: T) =>
  new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), 120);
  });

export const getOrders = () => wait(orders);
export const getOrderById = (id: string) => wait(orders.find((order) => order.id === id));
export const updateOrderStatus = (id: string, status: OrderStatus) =>
  wait({ ...orders.find((order) => order.id === id), status });

export const getMenuItems = () => wait(menuItems);
export const createMenuItem = (item: Omit<MenuItem, "id" | "rating">) =>
  wait({ ...item, id: `m-${Date.now()}`, rating: 4.5 });
export const updateMenuItem = (id: string, item: Partial<MenuItem>) =>
  wait({ ...menuItems.find((menuItem) => menuItem.id === id), ...item });
export const deleteMenuItem = (id: string) => wait({ id, deleted: true });

export const getCategories = () => wait(categories);
export const getReviews = () => wait(reviews);
export const getStaff = () => wait(staff);
export const getRooms = () => wait(rooms);
export const getInsights = () => wait(insights);
