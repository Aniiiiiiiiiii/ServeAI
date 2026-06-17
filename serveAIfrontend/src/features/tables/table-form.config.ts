import type { FormFieldConfig } from "@/types/form";

export const tableFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Room 502 / Table 08",
    required: true,
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    placeholder: "Select type",
    required: true,
    options: [
      {
        label: "Room",
        value: "Room",
      },
      {
        label: "Table",
        value: "Table",
      },
    ],
  },
  {
    name: "qrCode",
    label: "QR Code",
    type: "text",
    placeholder: "QR-001",
  },
  {
    name: "occupied",
    label: "Occupied",
    type: "switch",
  },
  {
    name: "active",
    label: "Active",
    type: "switch",
  },
];