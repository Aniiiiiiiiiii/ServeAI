"use client";

import { useState } from "react";
import {
  SectionCard,
  StatusBadge,
  icons,
} from "@/components/app-components";
import {PageHeader} from "@/components/common/PageHeader";

import {buttonVariants, Button} from "@/components/ui/button";
import { tables as demoTables } from "@/lib/demo/tables";
import { Plus } from "lucide-react";

import { FormModal } from "@/components/common/FormModal";
import { tableFormConfig } from "@/features/tables/table-form.config";



export default function TablesPage() {
  const [tables, setTables] = useState(demoTables);
  const [openTableModal, setOpenTableModal] = useState(false);

  const handleAddTable = (values: Record<string, any>) => {
    const newTable = {
      id: `${values.type?.toLowerCase() || "table"}-${Date.now()}`,
      name: values.name,
      type: values.type,
      occupied: values.occupied || false,
      active: values.active ?? true,
      qrCode: values.qrCode,
      currentOrderId: undefined,
    };

    setTables((prev) => [newTable, ...prev]);
  };

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Tables"
        description="QR-ready locations with occupancy, active state, and live order references."
        action={
          <Button onClick={() => setOpenTableModal(true)}>
            <Plus className="size-4" />
            Add table
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tables.map((table) => (
          <SectionCard key={table.id}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black">{table.name}</h2>
                <p className="text-sm font-bold text-charcoal-400">
                  {table.type}
                </p>
              </div>

              <StatusBadge status={table.active ? "Active" : "Inactive"} />
            </div>

            <div className="mt-5 grid aspect-square place-items-center rounded-3xl border-2 border-dashed border-charcoal-200 bg-charcoal-50">
              <div className="text-center">
                <icons.QrCode className="mx-auto size-14 text-charcoal-500" />
                <p className="mt-2 font-black">{table.qrCode}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-sm font-bold">
              <span>{table.occupied ? "Occupied" : "Available"}</span>
              <span>{table.currentOrderId ?? "No active order"}</span>
            </div>
          </SectionCard>
        ))}
      </div>

      <FormModal
        open={openTableModal}
        onOpenChange={setOpenTableModal}
        title="Add Table"
        description="Create a new QR-ready table location."
        fields={tableFormConfig}
        defaultValues={{
          name: "",
          type: "Table",
          qrCode: "",
          occupied: false,
          active: true,
        }}
        onSubmit={handleAddTable}
      />
    </div>
  );
}