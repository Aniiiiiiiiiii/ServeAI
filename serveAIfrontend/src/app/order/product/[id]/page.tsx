import Link from "next/link";
import { ProductCard, SectionCard, StatusBadge } from "@/components/app-components";
import {buttonVariants, Button} from "@/components/ui/button";

import { menuItems } from "@/lib/demo/menu";
import { formatCurrency } from "@/utils/formatCurrency";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = menuItems.find((menuItem) => menuItem.id === id) ?? menuItems[0];

  return (
    <main className="mx-auto grid max-w-5xl gap-6 p-4 md:grid-cols-[1fr_360px] md:p-8">
      <section className="overflow-hidden rounded-3xl bg-white shadow-soft">
        <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-charcoal-950">{item.name}</h1>
              <p className="mt-3 text-charcoal-500">{item.description}</p>
            </div>
            <StatusBadge status={item.available ? "Available" : "Unavailable"} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-charcoal-600">
            <span>{formatCurrency(item.price)}</span>
            <span>{item.prepTime}</span>
            <span>{item.rating}/5 rating</span>
          </div>
          <Link href="/order" className="mt-6 inline-flex"><Button>Add from menu</Button></Link>
        </div>
      </section>
      <SectionCard>
        <h2 className="text-xl font-black">Guests also like</h2>
        <div className="mt-4"><ProductCard item={menuItems.find((menuItem) => menuItem.id !== item.id) ?? item} /></div>
      </SectionCard>
    </main>
  );
}
