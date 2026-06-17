import type { FormFieldConfig } from "@/types/form";

export const categoryFormConfig: FormFieldConfig[] = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    placeholder: "Enter category name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter category description",
  },
  {
    name: "accent",
    label: "Accent Color",
    type: "select",
    placeholder: "Choose accent color",
    options: [
      { label: "Yellow", value: "bg-yellow-100 text-yellow-800" },
      { label: "Emerald", value: "bg-emerald-100 text-emerald-800" },
      { label: "Orange", value: "bg-orange-100 text-orange-800" },
      { label: "Pink", value: "bg-pink-100 text-pink-800" },
      { label: "Cyan", value: "bg-cyan-100 text-cyan-800" },
      { label: "Purple", value: "bg-purple-100 text-purple-800" },
    ],
  },
];