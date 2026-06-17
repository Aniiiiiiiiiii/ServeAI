import Link from "next/link";
import { Button, PageHeader, SectionCard, StatusBadge } from "@/components/app-components";

export default function CheckoutPage() {
  return (
    <main className="mx-auto grid max-w-3xl gap-6 p-4 md:p-8">
      <PageHeader title="Order confirmed" description="Your request has reached the hotel kitchen. Track every step from prep to delivery." />
      <SectionCard>
        <StatusBadge status="Placed" />
        <h2 className="mt-4 text-2xl font-black">Order ORD-2406</h2>
        <p className="mt-2 text-charcoal-500">ETA 24 minutes · Room 502 · Payment added to room charge</p>
        <Link href="/order/tracking" className="mt-6 inline-flex"><Button>Track order</Button></Link>
      </SectionCard>
    </main>
  );
}
