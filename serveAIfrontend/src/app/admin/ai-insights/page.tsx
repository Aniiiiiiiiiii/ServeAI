import { AIInsightCard, DashboardCard, PageHeader } from "@/components/app-components";
import { insights } from "@/lib/demo/insights";

export default function AIInsightsPage() {
  return (
    <div className="grid gap-6">
      <PageHeader title="AI Insights" description="Decision-ready suggestions for sales, prep risk, combos, and review sentiment." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{insights.map((insight) => <AIInsightCard key={insight.id} insight={insight} />)}</div>
      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardCard title="Revenue Insights"><div className="h-64 rounded-3xl bg-[repeating-linear-gradient(90deg,#0d1726_0_42px,#202a3a_42px_84px)] p-6 text-white"><p className="text-4xl font-black">+18%</p><p className="mt-2 text-sm text-white/70">Lunch peak uplift from combo purchases.</p></div></DashboardCard>
        <DashboardCard title="Combo Suggestions"><div className="grid gap-3">{["Biryani + Cold Coffee", "Thali + Lava Cake", "Wrap + Mint Cooler"].map((item) => <div key={item} className="rounded-2xl bg-lime-50 p-4 font-black text-lime-800">{item}</div>)}</div></DashboardCard>
      </div>
    </div>
  );
}
