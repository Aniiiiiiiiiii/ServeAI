"use client";


import { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-lime-700">AI Hotel POS</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-charcoal-950 md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-charcoal-500 md:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}