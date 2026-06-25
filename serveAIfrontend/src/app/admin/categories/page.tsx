"use client";

import { useState } from "react";
import { ConfirmDialog, MenuCard } from "@/components/app-components";
import {PageHeader} from "@/components/common/PageHeader";

import {buttonVariants, Button} from "@/components/ui/button";
import { categories as demoCategories } from "@/lib/demo/categories";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import { FormModal } from "@/components/common/FormModal";
import { categoryFormConfig } from "@/features/categories/category-form.config";



export default function CategoriesPage() {
  const [categories, setCategories] = useState(demoCategories);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const handleAddCategory = (values: Record<string, any>) => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      name: values.name,
      description: values.description,
      accent: values.accent || "bg-slate-100 text-slate-800",
      itemCount: 0,
    };

    setCategories((prev) => [newCategory, ...prev]);
  };

  return (
    <div className="grid gap-6">
      <PageHeader title="Categories" description="Card-based category management with inline names and protected delete confirmation." action={<Button onClick={() => setOpenCategoryModal(true)}><Plus className="size-4" /> Add category</Button>} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="grid gap-3">
            <MenuCard category={category} />
            <div className="flex gap-3">
              <input aria-label={`${category.name} name`} defaultValue={category.name} className="min-w-0 flex-1 rounded-2xl border border-charcoal-400 px-4 font-bold" />
              <ConfirmDialog label={category.name} onConfirm={() => setCategories((prev) => prev.filter((item) => item.id !== category.id))} />
            </div>
          </div>
        ))}
      </div>

        <FormModal
          open={openCategoryModal}
          onOpenChange={setOpenCategoryModal}
          title="Add Category"
          description="Create a new menu category for rooms and tables."
          fields={categoryFormConfig}
          defaultValues={{
            name: "",
            description: "",
            accent: "bg-yellow-100 text-yellow-800",
          }}
          onSubmit={handleAddCategory}
        />

    </div>
  );
}
