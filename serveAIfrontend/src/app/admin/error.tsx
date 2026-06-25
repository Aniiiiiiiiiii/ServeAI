"use client";

import { ErrorState } from "@/components/common/State";

export default function AdminError() {
  return <div className="p-8"><ErrorState message="Admin workspace could not load." /></div>;
}
