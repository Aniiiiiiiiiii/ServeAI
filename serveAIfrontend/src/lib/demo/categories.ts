import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "cat-breakfast", name: "Breakfast", itemCount: 18, accent: "bg-yellow-100 text-yellow-800", description: "Morning staples, fresh juice, and coffee." },
  { id: "cat-main", name: "Main Course", itemCount: 32, accent: "bg-emerald-100 text-emerald-800", description: "Indian, continental, and chef specials." },
  { id: "cat-snacks", name: "Snacks", itemCount: 21, accent: "bg-orange-100 text-orange-800", description: "Fast-moving bites for rooms and tables." },
  { id: "cat-dessert", name: "Desserts", itemCount: 12, accent: "bg-pink-100 text-pink-800", description: "Cakes, ice creams, and plated sweets." },
  { id: "cat-drinks", name: "Beverages", itemCount: 24, accent: "bg-cyan-100 text-cyan-800", description: "Mocktails, tea, coffee, and coolers." },
];
