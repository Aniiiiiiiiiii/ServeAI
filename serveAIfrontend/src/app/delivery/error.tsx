"use client";

import { ErrorState } from "@/components/app-components";

export default function DeliveryError() {
  return <div className="p-8"><ErrorState message="Delivery board could not load." /></div>;
}
