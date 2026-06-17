export interface Review {
  id: string;
  guest: string;
  room: string;
  rating: number;
  comment: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  suggestion: string;
  createdAt: string;
}
