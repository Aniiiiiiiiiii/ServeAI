import { OrderCard, PageHeader, SectionCard, Timeline } from "@/components/app-components";
import { orders } from "@/lib/demo/orders";
import { orderStatuses } from "@/utils/orderStatus";

export default function TrackingPage() {
  const order = orders[0];
  return (
    <main className="mx-auto grid max-w-5xl gap-6 p-4 md:p-8">
      <PageHeader title="Tracking" description="Live ETA, order details, and progress from placed to feedback pending." />
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <SectionCard><h2 className="text-xl font-black">ETA {order.eta}</h2><div className="mt-5"><Timeline statuses={orderStatuses} current={order.status} /></div></SectionCard>
        <OrderCard order={order} />
      </div>
    </main>
  );
}
