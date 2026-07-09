export type OrderStatus =
  | "Placed"
  | "Accepted"
  | "Preparing"
  | "Ready"
  | "Delayed"
  | "Out For Delivery"
  | "Delivered"
  | "Feedback Pending";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  room: string;
  guest: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  eta: string;
  readyAt?: string;
  paymentStatus: "Paid" | "Pending" | "Room Charge";
}
