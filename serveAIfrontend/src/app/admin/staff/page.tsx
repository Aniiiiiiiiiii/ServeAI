"use client";

import { useState } from "react";
import {
  FilterBar,
  SearchInput,
  StatusBadge,
} from "@/components/app-components";
import {DataTable} from "@/components/common/DataTable";
import {PageHeader} from "@/components/common/PageHeader";

import {buttonVariants, Button} from "@/components/ui/button";
import { staff as demoStaff } from "@/lib/demo/staff";
import { Plus } from "lucide-react";

import { FormModal } from "@/components/common/FormModal";
import { staffFormConfig } from "@/features/staff/staff-form.config";

export default function StaffPage() {
  const [query, setQuery] = useState("");
  const [staff, setStaff] = useState(demoStaff);
  const [openStaffModal, setOpenStaffModal] = useState(false);

  const handleAddStaff = (values: Record<string, any>) => {
    const newStaff = {
      id: `staff-${Date.now()}`,
      name: values.name,
      role: values.role,
      status: values.status || "Active",
      shift: values.shift,
      phone: values.phone,
    };

    setStaff((prev) => [newStaff, ...prev]);
  };

  const filtered = staff.filter((member) =>
    `${member.name} ${member.role}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Staff"
        description="Operational staff directory with role badges, shifts, and availability."
        action={
          <Button onClick={() => setOpenStaffModal(true)}>
            <Plus className="size-4" />
            Add staff
          </Button>
        }
      />

      <FilterBar>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search staff or role"
        />
      </FilterBar>

      <DataTable
        headers={["Name", "Role", "Status", "Shift", "Phone"]}
        rows={filtered.map((member) => [
          member.name,
          <StatusBadge key="role" status={member.role} />,
          <StatusBadge key="status" status={member.status} />,
          member.shift,
          member.phone,
        ])}
      />

      <FormModal
        open={openStaffModal}
        onOpenChange={setOpenStaffModal}
        title="Add Staff"
        description="Create a new staff member with role, shift, and availability."
        fields={staffFormConfig}
        defaultValues={{
          name: "",
          role: "Waiter",
          status: "Active",
          shift: "",
          phone: "",
        }}
        onSubmit={handleAddStaff}
      />
    </div>
  );
}