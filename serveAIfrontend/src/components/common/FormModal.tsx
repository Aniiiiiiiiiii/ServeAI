"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormFieldConfig } from "@/types/form";
import { DynamicFormField } from "./DynamicFormField";

type FormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  defaultValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
};

export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  fields,
  defaultValues = {},
  onSubmit,
}: FormModalProps) {
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setValues(defaultValues);
    }
  }, [open, defaultValues]);

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit(values);
      toast.success(`${title} saved successfully`);
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4">
          {fields.map((field) => (
            <DynamicFormField
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}