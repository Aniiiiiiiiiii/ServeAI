import type { FormFieldConfig } from "@/types/form";

export const staffFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Staff Name",
    type: "text",
    placeholder: "Enter staff name",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Select role",
    required: true,
    options: [
      { label: "Admin", value: "Admin" },
      { label: "Manager", value: "Manager" },
      { label: "Kitchen", value: "Kitchen" },
      { label: "Delivery", value: "Delivery" },
      { label: "Waiter", value: "Waiter" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: [
      { label: "Active", value: "Active" },
      { label: "On Break", value: "On Break" },
      { label: "Offline", value: "Offline" },
    ],
  },
  {
    name: "shift",
    label: "Shift Timing",
    type: "text",
    placeholder: "08:00 - 17:00",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "+91 XXXXX XXXXX",
  },
];