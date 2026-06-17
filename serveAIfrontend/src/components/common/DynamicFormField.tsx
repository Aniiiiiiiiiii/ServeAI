import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormFieldConfig as FormField } from "@/types/form";

type Props = {
  field: FormField;
  value: any;
  onChange: (name: string, value: any) => void;
};

export function DynamicFormField({ field, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <Label>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {["text", "email", "number"].includes(field.type) && (
        <Input
          type={field.type}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={(e) =>
            onChange(
              field.name,
              field.type === "number" ? Number(e.target.value) : e.target.value
            )
          }
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}

      {field.type === "select" && (
        <Select
          value={value ?? ""}
          onValueChange={(val) => onChange(field.name, val)}
        >
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {field.type === "switch" && (
        <Switch
          checked={Boolean(value)}
          onCheckedChange={(checked) => onChange(field.name, checked)}
        />
      )}
    </div>
  );
}