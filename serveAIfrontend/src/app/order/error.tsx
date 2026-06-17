"use client";

import { ErrorState } from "@/components/app-components";

export default function OrderError() {
  return <div className="p-4"><ErrorState message="Ordering screen could not load." /></div>;
}
