import type { Rule } from "antd/es/form";

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export type UserFormData = Omit<User, "id">;

export type FieldType = "text" | "number" | "email" | "date" | "textarea";

export interface FormFieldConfig {
    name: string;
    label: string;
    type: FieldType;
    rules?: Rule[];
    placeholder?: string;
}

export interface UserSchema {
    fields: FormFieldConfig[];
}
