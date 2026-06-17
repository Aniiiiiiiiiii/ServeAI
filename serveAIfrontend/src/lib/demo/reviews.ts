import type { Review } from "@/types";

export const reviews: Review[] = [
  { id: "r-1", guest: "Aarav Mehta", room: "Room 502", rating: 5, sentiment: "Positive", comment: "Food arrived hot and the wrap was excellent.", suggestion: "Offer wrap + cold coffee as a room service combo.", createdAt: "2026-05-29T11:12:00+05:30" },
  { id: "r-2", guest: "Nisha Shah", room: "Room 208", rating: 4, sentiment: "Neutral", comment: "Breakfast was good but toast could be warmer.", suggestion: "Flag toast items for immediate dispatch after plating.", createdAt: "2026-05-28T20:45:00+05:30" },
  { id: "r-3", guest: "Kabir Rao", room: "Pool Deck", rating: 3, sentiment: "Negative", comment: "Dessert took longer than expected.", suggestion: "Show dessert prep delay warning during peak hours.", createdAt: "2026-05-28T18:10:00+05:30" },
];
