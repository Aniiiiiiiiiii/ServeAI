"use client";

import { create } from "zustand";
import type { MenuItem } from "@/types";

export interface CartLine {
  item: MenuItem;
  quantity: number;
  instructions?: string;
}

interface CartState {
  lines: CartLine[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setInstructions: (id: string, instructions: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.lines.find((line) => line.item.id === item.id);
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
          ),
        };
      }

      return { lines: [...state.lines, { item, quantity: 1 }] };
    }),
  removeItem: (id) => set((state) => ({ lines: state.lines.filter((line) => line.item.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      lines: quantity <= 0
        ? state.lines.filter((line) => line.item.id !== id)
        : state.lines.map((line) => (line.item.id === id ? { ...line, quantity } : line)),
    })),
  setInstructions: (id, instructions) =>
    set((state) => ({
      lines: state.lines.map((line) => (line.item.id === id ? { ...line, instructions } : line)),
    })),
  clear: () => set({ lines: [] }),
}));
