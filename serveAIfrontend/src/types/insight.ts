export interface AIInsight {
  id: string;
  title: string;
  value: string;
  description: string;
  tone: "success" | "warning" | "danger" | "info";
  action: string;
}
