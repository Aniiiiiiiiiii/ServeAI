"use client";

import { ReactNode, useMemo, useState } from "react";

export function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft">
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-charcoal-50 text-xs uppercase text-charcoal-500">
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-black">{header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-charcoal-100">
          {rows.map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-4 align-middle">{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <div className="grid gap-3 p-3 md:hidden">
        {rows.map((row, index) => (
          <div key={index} className="rounded-2xl border border-charcoal-100 p-4">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="flex justify-between gap-4 py-2 text-sm">
                <span className="font-bold text-charcoal-400">{headers[cellIndex]}</span>
                <span className="text-right">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}