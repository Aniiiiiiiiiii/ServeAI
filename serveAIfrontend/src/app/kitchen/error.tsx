"use client";

import { ErrorState } from "@/components/app-components";

export default function KitchenError() {
  return <div className="p-8"><ErrorState message="Kitchen board could not load." /></div>;
}
