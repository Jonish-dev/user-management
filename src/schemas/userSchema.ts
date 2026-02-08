import type { UserSchema } from "@/types/user";

export const userSchema: UserSchema = {
    fields: [
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            placeholder: "Enter first name",
            rules: [
                { required: true, message: "First name is required" },
                { min: 2, message: "Minimum 2 characters" },
            ],
        },
        {
            name: "lastName",
            label: "Last Name",
            type: "text",
            placeholder: "Enter last name",
            rules: [
                { required: true, message: "Last name is required" },
                { min: 2, message: "Minimum 2 characters" },
            ],
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter email address",
            rules: [
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
            ],
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
            placeholder: "Enter phone number",
            rules: [
                { required: true, message: "Phone number is required" },
                { pattern: /^[0-9]+$/, message: "Please enter numbers only" },
                { len: 10, message: "Phone number must be exactly 10 digits" },
            ],
        },

    ],
};
