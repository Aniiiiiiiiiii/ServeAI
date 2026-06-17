export type FormFieldType =
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "select"
  | "switch";

export type FormOption = {
  label: string;
  value: string;
};

export type FormFieldConfig = {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: FormOption[];
  required?: boolean;
};