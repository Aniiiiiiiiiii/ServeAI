import type { AIInsight } from "@/types";

export const insights: AIInsight[] = [
  { id: "ai-1", title: "Top Selling Items", value: "Biryani + Thali", description: "Main course revenue is up 18% during lunch windows.", tone: "success", action: "Promote chef combo from 12 PM to 3 PM." },
  { id: "ai-2", title: "Low Selling Items", value: "Desserts", description: "Dessert attach rate is 7% below the weekly target.", tone: "warning", action: "Bundle lava cake with cold coffee." },
  { id: "ai-3", title: "Delayed Order Risks", value: "3 orders", description: "Kitchen prep queue may breach SLA in the next 15 minutes.", tone: "danger", action: "Prioritize ready-to-dispatch room orders." },
  { id: "ai-4", title: "Review Sentiment Summary", value: "82% positive", description: "Guests praise temperature and packaging, mention toast delay.", tone: "info", action: "Add hot-hold alert for breakfast dispatch." },
];
